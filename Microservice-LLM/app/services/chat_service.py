from app.models.chat_model import ChatRequest, ChatMessage

def get_mock_response(request: ChatRequest) -> ChatMessage:
    return ChatMessage(
        user=request.user,
        message=request.message,
        response=f"Mocked response to: {request.message}"
    )
