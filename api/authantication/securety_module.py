from api.authantication.token_model import TokenData
from datetime import datetime, timedelta
from passlib.context import CryptContext
from jose import jwt

from .auth_constants import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def decode_access_token(token: str) -> TokenData:
    token_content = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    ched_id = token_content.get('ched_id')
    ched_name = token_content.get('ched_name')
    return TokenData(ched_id=ched_id, ched_name=ched_name)
