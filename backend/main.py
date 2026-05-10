from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import base64
import uuid

# Import our custom Agents
from agents.detection_agent import DetectionAgent
from agents.recommendation_agent import RecommendationAgent

app = FastAPI(title="Krishi AI Multi-Agent Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

detection_agent = DetectionAgent()
recommendation_agent = RecommendationAgent()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

class AnalyzeRequest(BaseModel):
    image: str
    description: str = ""

@app.get("/")
def read_root():
    return {"message": "Krishi AI FastAPI Agent Ecosystem is running!"}

@app.post("/api/detect")
async def detect_disease(req: AnalyzeRequest):
    """
    1. Receives Base64 image from React frontend.
    2. Detection Agent predicts the disease.
    3. Recommendation Agent provides treatments based on the disease.
    """
    try:
        # Decode base64 to temp file
        base64_data = req.image.split(',')[1] if ',' in req.image else req.image
        temp_file_path = os.path.join(UPLOAD_DIR, f"{uuid.uuid4()}.jpg")
        
        with open(temp_file_path, "wb") as f:
            f.write(base64.b64decode(base64_data))
            
        # Agent 1: Detect Disease
        detection_result = detection_agent.detect_disease(temp_file_path)
        
        if "error" in detection_result:
            return {"success": False, "error": detection_result["error"]}
            
        disease_name = detection_result["disease"]
        
        # Agent 2: Get Recommendation based on disease
        recommendation = recommendation_agent.get_recommendation(disease_name)
        
        # Clean up temp file
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)
            
        # Return combined ecosystem result
        return {
            "success": True,
            "data": {
                "cropName": recommendation.get("crop", disease_name.split("___")[0]),
                "diseaseName": disease_name.replace("___", " "),
                "severity": "Medium", # Add logic for High/Low
                "confidence": detection_result["confidence"],
                "treatment": [recommendation["organic"], recommendation["chemical"]],
                "medicineAdvice": recommendation["fertilizer"]
            }
        }

    except Exception as e:
        return {"success": False, "error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
