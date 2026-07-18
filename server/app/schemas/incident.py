from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from app.models.incident import IncidentStatus


class IncidentBase(BaseModel):
    title: str = Field(..., max_length=200)
    description: str
    type: str = Field(..., max_length=100)
    severity: int = Field(..., ge=1, le=10)
    priority: int = Field(..., ge=1, le=10)
    confidence: float = Field(..., ge=0, le=100)
    latitude: float
    longitude: float
    address: str
    reported_by: str


class IncidentCreate(IncidentBase):
    pass


class IncidentUpdate(BaseModel):
    title: str | None = Field(default=None, max_length=200)
    description: str | None = None
    type: str | None = Field(default=None, max_length=100)
    severity: int | None = Field(default=None, ge=1, le=10)
    priority: int | None = Field(default=None, ge=1, le=10)
    confidence: float | None = Field(default=None, ge=0, le=100)
    status: IncidentStatus | None = None
    latitude: float | None = None
    longitude: float | None = None
    address: str | None = None
    reported_by: str | None = None


class IncidentResponse(IncidentBase):
    id: UUID
    status: IncidentStatus
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class IncidentListResponse(BaseModel):
    items: list[IncidentResponse]
    total: int