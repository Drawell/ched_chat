from pydantic.main import BaseModel


class TokenData(BaseModel):
    ched_id: int | None = None
    ched_name: str | None = None
