from uuid import UUID

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.notification import Notification
from app.repositories.notification_repository import NotificationRepository
from app.schemas.notification import NotificationCreate, NotificationUpdate


class NotificationService:
    def __init__(self, db: AsyncSession):
        self.repository = NotificationRepository(db)

    async def create_notification(
        self,
        notification: NotificationCreate,
    ) -> Notification:
        return await self.repository.create(notification)

    async def get_notifications(self) -> list[Notification]:
        return await self.repository.get_all()

    async def get_user_notifications(self, user_id: UUID) -> list[Notification]:
        return await self.repository.get_by_user(user_id)

    async def get_notification(self, notification_id: UUID) -> Notification:
        notification = await self.repository.get_by_id(notification_id)
        if notification is None:
            raise ValueError("Notification not found.")
        return notification

    async def update_notification(
        self,
        notification_id: UUID,
        notification_update: NotificationUpdate,
    ) -> Notification:
        notification = await self.get_notification(notification_id)
        return await self.repository.update(notification, notification_update)

    async def delete_notification(self, notification_id: UUID) -> None:
        notification = await self.get_notification(notification_id)
        await self.repository.delete(notification)
