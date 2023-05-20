from sqlalchemy.orm import Session

from api.models.message_model import MessageForCreate, TMessage, VWMessage


def get_chat_messages(db: Session, chat_id: int, offset: int = 0, limit: int = 30) -> list[VWMessage]:
    return db.query(VWMessage).filter(VWMessage.chat_id == chat_id).order_by(VWMessage.cr_date.desc()).offset(offset).limit(limit).all()


def create_message(db: Session, message: MessageForCreate) -> VWMessage:
    message = TMessage(chat_id=message.chat_id,
                       ched_id=message.ched_id,
                       content=message.content)
    db.add(message)
    db.commit()
    message_veiw = db.query(VWMessage).get(message.message_id)
    return message_veiw
