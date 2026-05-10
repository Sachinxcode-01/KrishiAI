"""
This requires installing CrewAI: 
pip install crewai langchain-google-genai

This script demonstrates how CrewAI orchestrates multiple agents to solve a complete problem.
"""
import os
from crewai import Agent, Task, Crew, Process

# You would normally import your custom tools/agents here
# from detection_agent import DetectionAgent
# from recommendation_agent import RecommendationAgent

# Set up Gemini or NVIDIA API Key for the Agent logic
os.environ["GEMINI_API_KEY"] = "YOUR_GEMINI_API_KEY"

# 1. Define the Detection Agent
detection_agent = Agent(
    role='Lead Plant Pathologist',
    goal='Analyze crop images and accurately identify any diseases present.',
    backstory='You are a world-renowned agricultural scientist expert in diagnosing plant diseases from visual symptoms.',
    verbose=True,
    allow_delegation=False
)

# 2. Define the Recommendation Agent
recommendation_agent = Agent(
    role='Agricultural Treatment Specialist',
    goal='Provide precise organic and chemical treatments based on the diagnosed disease.',
    backstory='You are an expert agronomist who helps farmers in India with practical, affordable medicine and fertilizer suggestions.',
    verbose=True,
    allow_delegation=False
)

# 3. Define the Voice/Translation Agent
voice_agent = Agent(
    role='Multilingual Farmer Liaison',
    goal='Translate complex agricultural advice into simple, spoken-friendly Kannada and English.',
    backstory='You are a friendly assistant dedicated to helping rural Indian farmers understand their crop health in their native language.',
    verbose=True,
    allow_delegation=False
)

def analyze_crop_workflow(image_description):
    """
    Creates tasks and runs the CrewAI process.
    (In a real app, the image_description comes from the detection_agent.py output)
    """
    
    # Task 1: Identify Disease
    task1 = Task(
        description=f'Analyze the following visual symptoms or model output and confirm the disease: {image_description}',
        expected_output='A clear statement of the crop name and the specific disease it suffers from.',
        agent=detection_agent
    )

    # Task 2: Prescribe Treatment
    task2 = Task(
        description='Based on the disease identified by the Lead Pathologist, recommend 1 chemical spray and 1 organic method.',
        expected_output='A short bulleted list of treatments including chemical and organic options.',
        agent=recommendation_agent
    )

    # Task 3: Translate to Kannada
    task3 = Task(
        description='Translate the prescribed treatments into simple Kannada suitable for a farmer.',
        expected_output='The final treatment plan written entirely in Kannada script.',
        agent=voice_agent
    )

    # Assemble the Crew
    krishi_crew = Crew(
        agents=[detection_agent, recommendation_agent, voice_agent],
        tasks=[task1, task2, task3],
        process=Process.sequential, # Run them one after another
        verbose=True
    )

    # Start the workflow
    result = krishi_crew.kickoff()
    return result

if __name__ == "__main__":
    print("--- Starting Krishi AI Crew Workflow ---")
    mock_model_output = "The model detected Tomato___Early_blight with 94% confidence."
    final_advice = analyze_crop_workflow(mock_model_output)
    
    print("\n--- Final output for Voice Agent to Speak ---")
    print(final_advice)
