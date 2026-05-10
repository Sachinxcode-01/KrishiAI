import json

class RecommendationAgent:
    def __init__(self):
        # We can load this from a database or a JSON file
        self.treatment_db = {
            "Tomato___Early_blight": {
                "organic": "Use Neem Oil Spray (5ml/L) and ensure proper ventilation.",
                "chemical": "Spray Mancozeb (2g/L) or Copper Oxychloride.",
                "fertilizer": "Avoid high nitrogen fertilizers. Ensure adequate potassium.",
                "kannada": "ಬೇವು ಎಣ್ಣೆ ಸಿಂಪಡಿಸಿ. ಮ್ಯಾಂಕೋಜೆಬ್ ಬಳಸಿ."
            },
            "Paddy___Blast": {
                "organic": "Pseudomonas fluorescens spray.",
                "chemical": "Spray Tricyclazole (0.6g/L).",
                "fertilizer": "Apply nitrogen in 3 split doses.",
                "kannada": "ಟ್ರೈಸೈಕ್ಲಾಜೋಲ್ ಸಿಂಪಡಿಸಿ."
            }
        }

    def get_recommendation(self, disease_name):
        """Returns treatment recommendations for the specific disease."""
        if disease_name in self.treatment_db:
            return self.treatment_db[disease_name]
        elif "healthy" in disease_name.lower():
            return {
                "organic": "Crop is healthy! Maintain regular watering and basic nutrition.",
                "chemical": "No chemicals needed.",
                "fertilizer": "Apply regular NPK based on soil test.",
                "kannada": "ಬೆಳೆ ಆರೋಗ್ಯವಾಗಿದೆ!"
            }
        else:
            return {
                "organic": "Isolate the plant if possible. Apply broad-spectrum Neem spray.",
                "chemical": "Consult local agriculture officer for specific fungicide.",
                "fertilizer": "Ensure balanced nutrition.",
                "kannada": "ಸ್ಥಳೀಯ ಕೃಷಿ ಅಧಿಕಾರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ."
            }

if __name__ == "__main__":
    agent = RecommendationAgent()
    print(agent.get_recommendation("Tomato___Early_blight"))
