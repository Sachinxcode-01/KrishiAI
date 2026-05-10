import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.agents import initialize_agent, Tool, AgentType
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

# Load API Key
os.environ["GOOGLE_API_KEY"] = os.getenv("GEMINI_API_KEY", "YOUR_GEMINI_API_KEY")

# 1. Setup the Core LLM Brain
llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro", temperature=0.3)

# ---------------------------------------------------------
# AGENT 1: Market Price Agent (Using Tools)
# ---------------------------------------------------------
def get_mandi_prices(crop_name):
    """Fake tool to simulate fetching real-time market prices."""
    # In reality, this would hit a government API like e-NAM
    prices = {
        "Tomato": "₹20 - ₹25 per Kg in Bangalore Mandi",
        "Wheat": "₹2,800 - ₹3,100 per Quintal in Hubli",
        "Cotton": "₹7,000 per Quintal in Raichur"
    }
    return prices.get(crop_name, "Price data not available for this crop today.")

def get_weather_forecast(location):
    """Fake tool to check if it's safe to spray pesticides."""
    # This would hit your NVIDIA FourCastNet or OpenWeather API
    return "Heavy rain expected tomorrow. Do not spray chemicals today."

# Define Tools for the Agent
tools = [
    Tool(
        name="Market Price Search",
        func=get_mandi_prices,
        description="Useful for finding the current selling price of a crop."
    ),
    Tool(
        name="Weather Safety Check",
        func=get_weather_forecast,
        description="Useful for checking if it is safe to spray fertilizer/pesticides based on rain."
    )
]

# Initialize a LangChain ReAct Agent
farming_assistant_agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True
)

# ---------------------------------------------------------
# AGENT 2: RAG Knowledge Agent (For Deep Research)
# ---------------------------------------------------------
def create_rag_chain():
    """
    This agent uses a Prompt Template to act as an Agricultural Expert.
    You can later connect this to a Vector Database (like Pinecone/ChromaDB) 
    filled with PDF books on Indian Farming.
    """
    template = """
    You are a Master Agronomist for Krishi AI in India.
    Given the following farmer's problem, provide a step-by-step scientific solution.
    
    Farmer's Problem: {problem}
    
    Solution:
    """
    prompt = PromptTemplate(input_variables=["problem"], template=template)
    chain = LLMChain(llm=llm, prompt=prompt)
    return chain


if __name__ == "__main__":
    print("=== Testing LangChain Farming Assistant Agent ===")
    
    # 1. Testing the Tool-using Agent
    question = "I just harvested Tomatoes in Bangalore. What is the price? Also, is it safe to spray my other crops?"
    print(f"Farmer Asks: {question}")
    response = farming_assistant_agent.run(question)
    print(f"\nAgent Reply:\n{response}\n")
    
    print("=== Testing RAG Expert Chain ===")
    rag_chain = create_rag_chain()
    deep_answer = rag_chain.run("My cotton leaves are curling upwards and turning yellow. What should I do?")
    print(f"\nDeep Expert Reply:\n{deep_answer}")
