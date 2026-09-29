import os
import requests
from langchain_core.tools import tool


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
