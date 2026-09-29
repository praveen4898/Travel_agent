import os
import requests
from langchain_core.tools import tool


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
        # The free tier of AviationStack does NOT support 'flight_date'
        # So we omit it and fetch today's current flights for this route instead.
    }

    response = requests.get(url, params=params)
    data = response.json()
    
    if "error" in data:
        return f"Flight API Error: {data['error'].get('message', 'Unknown error')}"
        
    return data
