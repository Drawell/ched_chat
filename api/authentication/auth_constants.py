import os

SECRET_KEY = os.environ.get('SECRET_KEY', "Not_realy_secret_key")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

ACCESS_COOKIE_NAME = 'Authorization'
