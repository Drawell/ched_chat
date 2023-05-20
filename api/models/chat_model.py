import enum
from pydantic import BaseModel
from sqlalchemy import Boolean, Column,  Integer, String, Text, DateTime
from sqlalchemy.sql import func

from api.database import Base


class EChatLeftSign(enum.Enum):
    LEAVED = 1
    EXCLUDED = 2
    DELETE_CHAT = 3


class EChatPermission(enum.Enum):
    CREATOR = 1
    ADMIN = 2
    WRITER = 3
    READER = 4


class EChatTypes(enum.Enum):
    TET_A_TET = 1
    GROUP = 2


class TChat(Base):
    __tablename__ = 'tb_chat'

    chat_id = Column(Integer, primary_key=True,
                     autoincrement=True, nullable=False)
    name = Column(String(50), nullable=False)
    image_id = Column(Integer)
    type_id = Column(Integer, nullable=False)


class TChedChat(Base):
    __tablename__ = 'tb_ched_chat'

    ched_chat_id = Column(Integer, primary_key=True,
                          autoincrement=True, nullable=False)
    ched_id = Column(Integer, nullable=False)
    chat_id = Column(Integer, nullable=False)
    permission_id = Column(Integer, nullable=False)
    notify = Column(Boolean, nullable=False)
    join_date = Column(DateTime, default=func.now(), nullable=False)
    leave_date = Column(DateTime)
    leave_sign_id = Column(Integer)


class VWChedChat(Base):
    __tablename__ = 'vw_ched_chat'

    ched_chat_id = Column(Integer, primary_key=True)
    chat_id = Column(Integer)
    cur_ched_id = Column(Integer)
    name = Column(String(50))
    type_id = Column(Integer)
    other_ched_id = Column(Integer)
    notify = Column(Boolean)


class ChedChat(BaseModel):
    class Config:
        orm_mode = True

    ched_chat_id: int
    chat_id: int
    cur_ched_id: int
    name: str
    type_id: int
    other_ched_id: int | None
    notify: bool
