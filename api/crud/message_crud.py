from sqlalchemy.orm import Session

from api.models.message_model import TMessage


def get_chat_messages(db: Session, chat_id: int, offset: int = 0, limit: int = 30) -> list[TMessage]:
    return db.query(TMessage).filter(TMessage.chat_id == chat_id).order_by(TMessage.cr_date.desc()).offset(offset).limit(limit).all()
