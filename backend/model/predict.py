import sys, json, torch, os
import torchvision.transforms as transforms
from PIL import Image
import timm

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'best_model.pth')
CLASS_NAMES_PATH = os.path.join(os.path.dirname(__file__), 'class_names.json')

with open(CLASS_NAMES_PATH) as f:
    class_names = json.load(f)

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

model = timm.create_model('efficientnet_b3', pretrained=False, num_classes=len(class_names))
if os.path.exists(MODEL_PATH):
    model.load_state_dict(torch.load(MODEL_PATH, map_location='cpu'))
model.eval()

def predict(image_path):
    img = Image.open(image_path).convert('RGB')
    tensor = transform(img).unsqueeze(0)
    with torch.no_grad():
        probs = torch.softmax(model(tensor), dim=1)[0]
        top5 = probs.topk(5)
    results = []
    for prob, idx in zip(top5.values, top5.indices):
        label = class_names[idx.item()]
        parts = label.split('___')
        results.append({
            'label': label,
            'crop': parts[0].replace('_', ' '),
            'disease': parts[1].replace('_', ' ') if len(parts) > 1 else 'Unknown',
            'confidence': round(prob.item() * 100, 2),
            'isHealthy': 'healthy' in label.lower()
        })
    return results

if __name__ == '__main__':
    print(json.dumps(predict(sys.argv[1])))
