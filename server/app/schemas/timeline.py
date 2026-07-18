from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from app.models.timeline import TimelineEventType


class TimelineEventBase(BaseModel):
    incident_id: UUID

    title: str = Field(..., max_length=150)

    description: str

    event_type: TimelineEventType

    created_by: str = Field(default="System", max_length=100)

    metadata: dict = Field(default_factory=dict, validation_alias="event_metadata")


class TimelineEventCreate(TimelineEventBase):
    model_config = ConfigDict(populate_by_name=True)


class TimelineEventResponse(TimelineEventBase):
    id: UUID

    created_at: datetime

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)


class TimelineEventListResponse(BaseModel):
    items: list[TimelineEventResponse]

    total: int
