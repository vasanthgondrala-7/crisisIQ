from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.notification import Notification
from app.schemas.notification import NotificationCreate, NotificationUpdate


class NotificationRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, notification: NotificationCreate) -> Notification:
        db_notification = Notification(**notification.model_dump())
        self.db.add(db_notification)
        await self.db.commit()
        await self.db.refresh(db_notification)
        return db_notification

    async def get_all(self) -> list[Notification]:
        result = await self.db.execute(
            select(Notification).order_by(Notification.created_at.desc())
        )
        return result.scalars().all()

    async def get_by_id(self, notification_id: UUID) -> Notification | None:
        result = await self.db.execute(
            select(Notification).where(Notification.id == notification_id)
        )
        return result.scalar_one_or_none()

    async def get_by_user(self, user_id: UUID) -> list[Notification]:
        result = await self.db.execute(
            select(Notification)
            .where(Notification.user_id == user_id)
            .order_by(Notification.created_at.desc())
        )
        return result.scalars().all()

    async def update(
        self,
        db_notification: Notification,
        notification: NotificationUpdate,
    ) -> Notification:
        for key, value in notification.model_dump(exclude_unset=True).items():
            setattr(db_notification, key, value)
        await self.db.commit()
        await self.db.refresh(db_notification)
        return db_notification

    async def delete(self, db_notification: Notification) -> None:
        await self.db.delete(db_notification)
        await self.db.commit()
