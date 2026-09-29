import os
import requests

from dotenv import load_dotenv
from langchain_core.tools import tool
from langchain_community.tools import DuckDuckGoSearchRun
from langchain_openai import ChatOpenAI
from langchain.agents import create_agent


# --------------------------------------------------
# Load environment variables
# --------------------------------------------------

load_dotenv()


# --------------------------------------------------
# Search Tool
# --------------------------------------------------

search = DuckDuckGoSearchRun()


# --------------------------------------------------
# Weather Tool
# --------------------------------------------------

@tool
def get_weather(city: str):
    """
    Get the current weather of a city using Weatherstack.
    """

    api_key = os.getenv("WEATHERSTACK_API_KEY")

    url = "https://api.weatherstack.com/current"

    params = {
        "access_key": api_key,
        "query": city
    }

    response = requests.get(url, params=params)

    return response.json()


# --------------------------------------------------
# Flight Tool
# --------------------------------------------------

@tool
def get_flights(city_iata: str, date: str):
    """
    Get flights from Delhi to the destination airport
    using the airport IATA code and travel date.
    """

    api_key = os.getenv("AVIATIONSTACK_API_KEY")

    url = "http://api.aviationstack.com/v1/flights"

    params = {
        "access_key": api_key,
        "dep_iata": "DEL",
        "arr_iata": city_iata,
        "flight_date": date
    }

    response = requests.get(url, params=params)

    return response.json()


# --------------------------------------------------
# LLM
# --------------------------------------------------

llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0
)


# --------------------------------------------------
# Tools
# --------------------------------------------------

tools = [
    search,
    get_weather,
    get_flights
]


# --------------------------------------------------
# Agent
# --------------------------------------------------

agent = create_agent(
    model=llm,
    tools=tools,

    system_prompt="""
    You are an AI Travel Assistant.

    Your job is to help users plan their travel.

    Follow this process:

    STEP 1:
    Identify the state or country mentioned by the user.

    STEP 2:
    Use the search tool to find the capital city.

    STEP 3:
    If the user asks for weather, use the weather tool
    with the capital city.

    STEP 4:
    If the user asks for flights, a travel date is required.

    If the user wants flights but has not provided a travel date,
    ask the user to provide the travel date.

    STEP 5:
    When flights are requested, use the search tool to find
    the IATA airport code of the capital city.

    For example, if the capital is Chennai, search for:
    "Chennai airport IATA code"

    Do NOT use hardcoded city-to-IATA mappings.

    STEP 6:
    Use the flight tool with the IATA code and travel date.

    STEP 7:
    Give the user a clear final response.

    Never invent weather or flight information.
    Use the tools whenever external/current information is required.
    """
)


# --------------------------------------------------
# Welcome Message
# --------------------------------------------------

print("\n✈️ Welcome to AI Travel Assistant!")
print("----------------------------------")
print("I can help you find:")
print("• Capital city")
print("• Current weather")
print("• Flights from Delhi")
print()


# --------------------------------------------------
# User Input
# --------------------------------------------------

state_or_country = input(
    "🌍 Enter the state or country you want to travel to: "
)


# --------------------------------------------------
# Travel Date
# --------------------------------------------------

travel_date = input(
    "📅 Enter your travel date (YYYY-MM-DD), "
    "or press Enter if you don't need flights: "
)


# --------------------------------------------------
# Build User Query
# --------------------------------------------------

if travel_date.strip():

    user_query = f"""
    I want to travel to {state_or_country}
    on {travel_date}.

    Find the capital city,
    give me the current weather,
    and find available flights from Delhi.
    """

else:

    user_query = f"""
    I want to travel to {state_or_country}.

    Find the capital city and give me
    the current weather.
    """


# --------------------------------------------------
# Run Agent
# --------------------------------------------------

response = agent.invoke({
    "messages": [
        {
            "role": "user",
            "content": user_query
        }
    ]
})


# --------------------------------------------------
# Display Final Response
# --------------------------------------------------

final_message = response["messages"][-1].content

print("\n🤖 Travel Assistant:")
print(final_message)