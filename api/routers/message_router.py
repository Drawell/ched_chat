from typing import Annotated
from fastapi import Depends,   APIRouter,  Query, Path

from sqlalchemy.orm import session

from api.database.database_dependency import db_dep
from api.models.message_model import Message, MessageForCreate
from api.crud import message_crud

message_router = APIRouter(prefix="/api", tags=["message"])


@message_router.get("/get_chat_messages/{chat_id}", response_model=list[Message])
async def get_chat_messages(
    chat_id: Annotated[int, Path()],
    offset: Annotated[int | None, Query()] = 0,
    limit: Annotated[int | None, Query()] = 30,
    db: session = Depends(db_dep)
):
    messages = message_crud.get_chat_messages(db, chat_id, offset, limit)
    return messages


@message_router.post("/create_message", response_model=Message)
async def get_chat_messages(
    message: MessageForCreate,
    db: session = Depends(db_dep)
):
    messages = message_crud.create_message(db, message)
    return messages
