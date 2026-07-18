from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import hash_password
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate


class UserRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, user: UserCreate) -> User:
        data = user.model_dump(exclude={"password"})
        db_user = User(**data, hashed_password=hash_password(user.password))
        self.db.add(db_user)
        await self.db.commit()
        await self.db.refresh(db_user)
        return db_user

    async def get_all(self) -> list[User]:
        result = await self.db.execute(select(User).order_by(User.created_at.desc()))
        return result.scalars().all()

    async def get_by_id(self, user_id: UUID) -> User | None:
        result = await self.db.execute(select(User).where(User.id == user_id))
        return result.scalar_one_or_none()

    async def get_by_email(self, email: str) -> User | None:
        result = await self.db.execute(select(User).where(User.email == email.lower()))
        return result.scalar_one_or_none()

    async def update(self, db_user: User, user: UserUpdate) -> User:
        data = user.model_dump(exclude_unset=True)
        password = data.pop("password", None)
        if password:
            db_user.hashed_password = hash_password(password)
        for key, value in data.items():
            setattr(db_user, key, value)
        await self.db.commit()
        await self.db.refresh(db_user)
        return db_user

    async def delete(self, db_user: User) -> None:
        await self.db.delete(db_user)
        await self.db.commit()
