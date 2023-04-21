from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Text, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .database import Base


class Ched(Base):
    __tablename__ = 'tb_ched'

    ched_id = Column(Integer, primary_key=True,
                     autoincrement=True, nullable=False)
    name = Column(String(50), nullable=False)
    email = Column(String(50), nullable=False)
    reg_date = Column(DateTime, default=func.now(), nullable=False)
    is_confirmed = Column(Boolean, nullable=False)
    confirm_date = Column(DateTime)
    last_seen_date = Column(DateTime)


class ChedPasswd(Base):
    __tablename__ = 'tb_ched_passwd'

    passwd_id = Column(Integer, primary_key=True,
                       autoincrement=True, nullable=False)
    ched_id = Column(Integer)
    passwd_hash = Column(Text, nullable=False)
    sdate = Column(DateTime, default=func.now(), nullable=False)
    edate = Column(DateTime)
