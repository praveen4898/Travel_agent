import logging
import os
import sys
# pyrefly: ignore [missing-import]
from fastapi import FastAPI, HTTPException, status
# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv

# Ensure backend directory is in python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from agent.travel_agent import ask_travel_agent

load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("travel_assistant_backend")

app = FastAPI(
    title="AI Travel Assistant API",
    description="FastAPI Backend for LangChain Travel Assistant",
    version="1.0.0"
)

# CORS configuration allowing React dev servers
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1):\d+",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TravelRequest(BaseModel):
    query: str = Field(..., min_length=1, description="The user's travel request query")


class TravelResponse(BaseModel):
    response: str


@app.get("/")
def read_root():
    return {"status": "ok", "message": "AI Travel Assistant Backend API is running."}


@app.post("/api/travel", response_model=TravelResponse)
def handle_travel_request(request: TravelRequest):
    """
    Endpoint to process travel requests using the LangChain Travel Agent.
    """
    user_query = request.query.strip()
    if not user_query:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Query string cannot be empty."
        )

    try:
        logger.info(f"Processing travel query: {user_query}")
        result = ask_travel_agent(user_query)
        return TravelResponse(response=result)
    except Exception as e:
        logger.error(f"Error executing travel agent: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Sorry, I couldn't process your request. Please try again."
        )
