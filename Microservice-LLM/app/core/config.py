from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "Mock Chat Service"

settings = Settings()
