from fastapi import APIRouter
from app.models.chat_model import ChatMessage, ChatRequest
from app.services.chat_service import get_mock_response

router = APIRouter()

@router.post("/", response_model=ChatMessage)
def send_message(request: ChatRequest):
    return get_mock_response(request)

@router.get("/hello", response_model=ChatMessage)
def send_message():
    return ChatMessage(message="{'a':1}")
