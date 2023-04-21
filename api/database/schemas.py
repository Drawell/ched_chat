from pydantic import BaseModel
from pydantic.fields import Field


class BaseChed(BaseModel):
    ched_id: int
    name: str

    class Config:
        orm_mode = True


class CurrentChed(BaseChed):
    email: str


class LoginInfo(BaseModel):
    email: str = Field(None, max_length=50)
    password: str = Field(None, max_length=30)


class RegisterInfo(LoginInfo):
    second_password: str
    name: str
