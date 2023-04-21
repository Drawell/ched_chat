from sqlalchemy import and_, or_
from sqlalchemy.orm import Session

from .models import Ched, ChedPasswd


def get_ched(db: Session, ched_id: int) -> Ched | None:
    return db.query(Ched).get(ched_id)


def find_ched(db: Session, login_email: str) -> Ched | None:
    return db.query(Ched).filter(or_(Ched.email == login_email, Ched.name == login_email)).first()


def get_ched_passowrd(db: Session, ched_id: int) -> ChedPasswd | None:
    return db.query(ChedPasswd).filter(and_(ChedPasswd.ched_id == ched_id,
                                            ChedPasswd.edate == None)).order_by(ChedPasswd.sdate.desc()).first()
