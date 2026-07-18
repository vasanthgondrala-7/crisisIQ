from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from app.models.notification import NotificationType


class NotificationBase(BaseModel):
    title: str = Field(..., max_length=150)
    message: str
    type: NotificationType = NotificationType.INFO
    user_id: UUID | None = None
    incident_id: UUID | None = None


class NotificationCreate(NotificationBase):
    pass


class NotificationUpdate(BaseModel):
    title: str | None = Field(default=None, max_length=150)
    message: str | None = None
    type: NotificationType | None = None
    is_read: bool | None = None


class NotificationResponse(NotificationBase):
    id: UUID
    is_read: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
