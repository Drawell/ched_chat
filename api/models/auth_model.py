from pydantic import BaseModel
from pydantic.fields import Field


class LoginInfo(BaseModel):
    email: str = Field(None, min_length=5, max_length=50)
    password: str = Field(None, min_length=5, max_length=30)


class RegistrationInfo(LoginInfo):
    second_password: str = Field(None, min_length=5, max_length=30)
    name: str = Field(None, min_length=5, max_length=50)
