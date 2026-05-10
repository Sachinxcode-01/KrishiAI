import os
import json
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from torchvision import transforms, datasets
import timm
from tqdm import tqdm
import time
import argparse

# --- PATH NORMALIZATION ---
# Get the absolute path of the directory where this script is located
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

def get_args():
    parser = argparse.ArgumentParser(description="Krishi AI 'Perfect Working' Training")
    parser.add_argument("--epochs", type=int, default=20)
    parser.add_argument("--batch_size", type=int, default=32)
    parser.add_argument("--lr", type=float, default=0.001)
    parser.add_argument("--model", type=str, default='efficientnet_b3', 
                        help="Options: efficientnet_b3, convnext_tiny, vit_base_patch16_224")
    parser.add_argument("--label_smoothing", type=float, default=0.1)
    return parser.parse_args()

args = get_args()

# Normalize all paths relative to the script location
BASE_DIR = os.path.join(SCRIPT_DIR, 'dataset')
TRAIN_DIR = os.path.join(BASE_DIR, 'train')
VALID_DIR = os.path.join(BASE_DIR, 'valid')
MODEL_SAVE_PATH = os.path.join(SCRIPT_DIR, 'backend', 'model', 'best_model.pth')
CLASS_NAMES_PATH = os.path.join(SCRIPT_DIR, 'backend', 'model', 'class_names.json')

# Hyperparameters
IMG_SIZE = 224
BATCH_SIZE = args.batch_size
EPOCHS = args.epochs
LEARNING_RATE = args.lr
MODEL_NAME = args.model

def check_dataset():
    """Checks if dataset exists, creates mock data if missing for initial testing."""
    if not os.path.exists(TRAIN_DIR) or len(os.listdir(TRAIN_DIR)) == 0:
        print("[WARNING] Dataset directory is empty or missing.")
        print("Creating a temporary MOCK DATASET for training demonstration...")
        
        os.makedirs(TRAIN_DIR, exist_ok=True)
        os.makedirs(VALID_DIR, exist_ok=True)
        
        if not os.path.exists(CLASS_NAMES_PATH):
            # Create a basic class list if missing
            dummy_classes = ["Apple___healthy", "Paddy___Blast", "Tomato___Late_blight"]
            os.makedirs(os.path.dirname(CLASS_NAMES_PATH), exist_ok=True)
            with open(CLASS_NAMES_PATH, 'w') as f:
                json.dump(dummy_classes, f)
            
        with open(CLASS_NAMES_PATH, 'r') as f:
            classes = json.load(f)
            
        from PIL import Image
        for cls in classes[:10]: # Create a bit more for "perfect" test
            cls_path_train = os.path.join(TRAIN_DIR, cls)
            cls_path_valid = os.path.join(VALID_DIR, cls)
            os.makedirs(cls_path_train, exist_ok=True)
            os.makedirs(cls_path_valid, exist_ok=True)
            
            for i in range(3): # 3 images per class
                img = Image.new('RGB', (IMG_SIZE, IMG_SIZE), color=(i*50, 100, 150))
                img.save(os.path.join(cls_path_train, f'mock_{i}.jpg'))
            img_val = Image.new('RGB', (IMG_SIZE, IMG_SIZE), color=(200, 50, 50))
            img_val.save(os.path.join(cls_path_valid, 'mock_val.jpg'))
        
        print(f"Mock dataset created at: {BASE_DIR}")
        return True
    return True

def train():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"System: Krishi AI Intelligence Engine")
    print(f"Model: {MODEL_NAME}")
    print(f"Device: {device}")
    print("-" * 30)

    # 2. ADVANCED DATA AUGMENTATION (For 'Perfect' Generalization)
    train_transform = transforms.Compose([
        transforms.RandomResizedCrop(IMG_SIZE, scale=(0.8, 1.0)),
        transforms.RandomHorizontalFlip(),
        transforms.RandomVerticalFlip(),
        transforms.ColorJitter(brightness=0.2, contrast=0.2, saturation=0.2), # Field lighting
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])

    val_transform = transforms.Compose([
        transforms.Resize((IMG_SIZE, IMG_SIZE)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])

    # 3. Load Data
    check_dataset()
    
    train_dataset = datasets.ImageFolder(TRAIN_DIR, transform=train_transform)
    val_dataset = datasets.ImageFolder(VALID_DIR, transform=val_transform)

    train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=BATCH_SIZE, shuffle=False)

    num_classes = len(train_dataset.classes)
    print(f"Dataset: {num_classes} classes identified.")

    # 4. Build Model
    print(f"Loading pretrained weights for {MODEL_NAME}...")
    model = timm.create_model(MODEL_NAME, pretrained=True, num_classes=num_classes)
    model = model.to(device)

    # 5. Advanced Loss (Label Smoothing) & Optimizer
    criterion = nn.CrossEntropyLoss(label_smoothing=args.label_smoothing)
    optimizer = optim.AdamW(model.parameters(), lr=LEARNING_RATE, weight_decay=0.01)
    scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=EPOCHS)

    # 6. Training Loop
    best_acc = 0.0
    
    for epoch in range(EPOCHS):
        print(f"\n[Epoch {epoch+1}/{EPOCHS}]")
        
        # Training Phase
        model.train()
        running_loss = 0.0
        correct = 0
        total = 0
        
        pbar = tqdm(train_loader, desc=f"Scanning Leaves")
        for images, labels in pbar:
            images, labels = images.to(device), labels.to(device)
            
            optimizer.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            
            running_loss += loss.item()
            _, predicted = outputs.max(1)
            total += labels.size(0)
            correct += predicted.eq(labels).sum().item()
            
            pbar.set_postfix({
                'loss': f"{running_loss/len(train_loader):.4f}", 
                'acc': f"{100.*correct/total:.2f}%"
            })

        # Validation Phase
        model.eval()
        val_correct = 0
        val_total = 0
        
        with torch.no_grad():
            for images, labels in val_loader:
                images, labels = images.to(device), labels.to(device)
                outputs = model(images)
                _, predicted = outputs.max(1)
                val_total += labels.size(0)
                val_correct += predicted.eq(labels).sum().item()

        val_acc = 100. * val_correct / val_total
        print(f"Diagnostic Accuracy: {val_acc:.2f}%")
        
        scheduler.step()

        # Save Best Model
        if val_acc > best_acc:
            print(f"SAVING BEST MODEL --> {os.path.basename(MODEL_SAVE_PATH)}")
            best_acc = val_acc
            # Ensure model directory exists
            os.makedirs(os.path.dirname(MODEL_SAVE_PATH), exist_ok=True)
            torch.save(model.state_dict(), MODEL_SAVE_PATH)

    print("\nTraining complete!")
    print(f"Final Peak Accuracy: {best_acc:.2f}%")

if __name__ == "__main__":
    try:
        train()
    except KeyboardInterrupt:
        print("\nTraining stopped by user.")
    except Exception as e:
        print(f"\nSystem Error: {e}")
