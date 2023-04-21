from .database import SessionLocal


def db_dep():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
