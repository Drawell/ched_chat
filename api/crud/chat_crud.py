from sqlalchemy.orm import Session

from api.models.chat_model import VWChedChat


def get_chats_list(db: Session, ched_id: int) -> list[VWChedChat]:
    return db.query(VWChedChat).filter(VWChedChat.cur_ched_id == ched_id).order_by(VWChedChat.ched_chat_id).all()
