from sqlalchemy.orm import Session

from api.database import crud, models
from .securety_module import create_access_token, verify_password
from .auth_constants import ACCESS_COOKIE_NAME, ACCESS_TOKEN_EXPIRE_MINUTES
from .token_model import TokenData


def authenticate_ched(db: Session, login_email: str, password: str) -> models.Ched | None:
    ched = crud.find_ched(db, login_email)
    if not ched:
        return None

    passwd = crud.get_ched_passowrd(db, ched.ched_id)
    if passwd and not verify_password(password, passwd.passwd_hash):
        return None

    return ched


def add_auth_cookie_to_response(response, cur_ched):
    token = TokenData(ched_id=cur_ched.ched_id, ched_name=cur_ched.name)
    access_token = create_access_token(data=token.dict())

    response.set_cookie(
        ACCESS_COOKIE_NAME,
        value=f"{access_token}",
        httponly=True,
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        expires=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )
    return response
