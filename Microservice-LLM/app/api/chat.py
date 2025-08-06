from fastapi import APIRouter
from app.models.chat_model import ChatMessage, ChatRequest, User
from app.services.chat_service import get_mock_response, set_activity_correction

router = APIRouter()

@router.post("/", response_model=ChatMessage)
def send_message(request: ChatRequest):
    return get_mock_response()

@router.get("/hello", response_model=list[User])
def send_message():
    return get_mock_response()

# @router.get("/activity/{activity_id}/user/{user_id}")
# async def get_user_activity(activity_id: int, user_id: int):
#     return set_activity_correction(activity_id,user_id)

@router.get("/activity/{activity_id}/user/{user_id}/model/{model}")
async def get_user_activity(activity_id: int, user_id: int, model: str):
    return set_activity_correction(activity_id,user_id, model)
