from typing import List
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy import Integer, String

from ..database import Base
from .product import Product

class Category(Base):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    slug: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)

    products: Mapped[List["Product"]] = relationship(
        back_populates="category"
    )
    
    def __repr__(self):
        return f"<Category(id={self.id}, name={self.name}, slug={self.slug})>"