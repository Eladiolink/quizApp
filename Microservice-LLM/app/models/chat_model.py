from pydantic import BaseModel

class ChatRequest(BaseModel):
    user: str
    message: str

class ChatMessage(BaseModel):
    message: str