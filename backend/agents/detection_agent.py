import os
import json
import torch
import torchvision.transforms as transforms
from PIL import Image
import timm
import logging

logging.basicConfig(level=logging.INFO)

class DetectionAgent:
    def __init__(self, model_name='efficientnet_b3'):
        self.logger = logging.getLogger("DetectionAgent")
        self.model_path = os.path.join(os.path.dirname(__file__), '../model/best_model.pth')
        self.class_names_path = os.path.join(os.path.dirname(__file__), '../model/class_names.json')
        
        with open(self.class_names_path) as f:
            self.class_names = json.load(f)
            
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ])
        
        self.logger.info("Loading model...")
        self.model = timm.create_model(model_name, pretrained=False, num_classes=len(self.class_names))
        if os.path.exists(self.model_path):
            self.model.load_state_dict(torch.load(self.model_path, map_location='cpu'))
        else:
            self.logger.warning("No pre-trained weights found! Predictions will be random until Trained.")
        self.model.eval()

    def detect_disease(self, image_path):
        """Predicts disease from a leaf image."""
        if not os.path.exists(image_path):
            return {"error": "Image not found"}

        try:
            img = Image.open(image_path).convert('RGB')
            tensor = self.transform(img).unsqueeze(0)
            
            with torch.no_grad():
                probs = torch.softmax(self.model(tensor), dim=1)[0]
                confidence, idx = probs.max(0)
                
            prediction_label = self.class_names[idx.item()]
            
            return {
                "disease": prediction_label,
                "confidence": round(confidence.item() * 100, 2),
                "isHealthy": 'healthy' in prediction_label.lower()
            }
        except Exception as e:
            self.logger.error(f"Detection failed: {e}")
            return {"error": str(e)}

if __name__ == "__main__":
    agent = DetectionAgent()
    # print(agent.detect_disease("../test_images/leaf.jpg"))
