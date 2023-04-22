from fastapi import Depends, HTTPException, status
from fastapi.param_functions import Depends
from fastapi.exceptions import HTTPException
from jose import JWTError
from sqlalchemy.orm.session import Session
from starlette.requests import Request

from api.database import db_dep
from api.crud import ched_crud
from .securety_module import decode_access_token
from .token_model import TokenData
from .auth_constants import ACCESS_COOKIE_NAME

CREDENTIALS_EXCEPTION = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail='Could not validate credentials',
)

COOKIE_EXPIRES_EXCEPTION = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail='Access token expires',
)


class CookieAuth():
    def __init__(self, cookie_name: str, auto_error: bool = True):
        self.cookie_name = cookie_name
        self.auto_error = auto_error

    async def __call__(self, request: Request) -> TokenData | None:
        token: str = request.cookies.get(self.cookie_name)
        if not token:
            if self.auto_error:
                raise CREDENTIALS_EXCEPTION
            else:
                return None
        try:
            payload = decode_access_token(token)
        except JWTError:
            raise COOKIE_EXPIRES_EXCEPTION

        return payload


auth_dep = CookieAuth(ACCESS_COOKIE_NAME)


async def get_cur_ched_dep(token: TokenData = Depends(auth_dep), db: Session = Depends(db_dep)):
    ched_id: int = token.ched_id
    if ched_id is None:
        raise CREDENTIALS_EXCEPTION

    ched = ched_crud.get_ched(db, ched_id)

    if ched is None:
        raise CREDENTIALS_EXCEPTION

    return ched
