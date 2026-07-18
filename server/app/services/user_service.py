from uuid import UUID

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import verify_password
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate, UserUpdate


class UserService:
    def __init__(self, db: AsyncSession):
        self.repository = UserRepository(db)

    async def create_user(self, user: UserCreate) -> User:
        existing = await self.repository.get_by_email(user.email)
        if existing:
            raise ValueError("A user with this email already exists.")
        user.email = user.email.lower()
        return await self.repository.create(user)

    async def get_users(self) -> list[User]:
        return await self.repository.get_all()

    async def get_user(self, user_id: UUID) -> User:
        user = await self.repository.get_by_id(user_id)
        if user is None:
            raise ValueError("User not found.")
        return user

    async def authenticate(self, email: str, password: str) -> User:
        user = await self.repository.get_by_email(email.lower())
        if user is None or not verify_password(password, user.hashed_password):
            raise ValueError("Invalid email or password.")
        if not user.is_active:
            raise ValueError("User account is inactive.")
        return user

    async def update_user(self, user_id: UUID, user_update: UserUpdate) -> User:
        user = await self.get_user(user_id)
        return await self.repository.update(user, user_update)

    async def delete_user(self, user_id: UUID) -> None:
        user = await self.get_user(user_id)
        await self.repository.delete(user)
