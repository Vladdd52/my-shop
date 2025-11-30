from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from .config import settings

engine = create_engine(
    url=settings.database_url,
    connect_args={"check_same_thread": False}
)

class Base(DeclarativeBase):
    pass


SessionLocal = sessionmaker(engine, autoflush=False)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    Base.metadata.create_all(bind=engine)

