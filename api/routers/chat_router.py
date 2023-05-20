from fastapi import Depends, HTTPException, status, APIRouter

from sqlalchemy.orm import session

from api.database.database_dependency import db_dep
from api.models.chat_model import ChedChat
from api.crud import chat_crud

chat_router = APIRouter(prefix="/api", tags=["chat"])


@chat_router.post("/get_chats_list/{ched_id}", response_model=list[ChedChat])
async def get_chats_list(
    ched_id: int,
    db: session = Depends(db_dep)
):
    chats = chat_crud.get_chats_list(db, ched_id)
    return chats
