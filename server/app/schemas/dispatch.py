from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from app.models.dispatch import DispatchStatus


class DispatchBase(BaseModel):
    incident_id: UUID
    resource_id: UUID

    vehicle_name: str = Field(..., max_length=100)
    vehicle_type: str = Field(..., max_length=50)
    driver_name: str = Field(..., max_length=100)

    eta: int = Field(..., ge=0)
    distance: float = Field(..., ge=0)

    progress: int = Field(default=0, ge=0, le=100)

    status: DispatchStatus = DispatchStatus.PENDING


class DispatchCreate(DispatchBase):
    pass


class DispatchUpdate(BaseModel):
    vehicle_name: str | None = Field(default=None, max_length=100)
    vehicle_type: str | None = Field(default=None, max_length=50)
    driver_name: str | None = Field(default=None, max_length=100)

    eta: int | None = Field(default=None, ge=0)
    distance: float | None = Field(default=None, ge=0)

    progress: int | None = Field(default=None, ge=0, le=100)

    status: DispatchStatus | None = None

    started_at: datetime | None = None
    arrived_at: datetime | None = None
    completed_at: datetime | None = None


class DispatchResponse(DispatchBase):
    id: UUID

    started_at: datetime | None
    arrived_at: datetime | None
    completed_at: datetime | None

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )


class DispatchListResponse(BaseModel):
    items: list[DispatchResponse]
    total: int