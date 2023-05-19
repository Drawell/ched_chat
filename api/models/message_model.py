from datetime import datetime
from pydantic import BaseModel
from sqlalchemy import Boolean, Column,  Integer, String, Text, DateTime
from sqlalchemy.sql import func

from api.database import Base


class TMessage(Base):
    __tablename__ = 'tb_message'

    message_id = Column(Integer, primary_key=True,
                        autoincrement=True, nullable=False)
    ched_id = Column(Integer, nullable=False)
    chat_id = Column(Integer, nullable=False)
    content = Column(String, nullable=False)
    cr_date = Column(DateTime, default=func.now())


class Message(BaseModel):
    class Config:
        orm_mode = True

    message_id: int
    ched_id: int
    chat_id: int
    content: str
    cr_date: datetime
