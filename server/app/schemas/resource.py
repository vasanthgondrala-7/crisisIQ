from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class ResourceBase(BaseModel):
    name: str = Field(..., max_length=150)
    type: str = Field(..., max_length=50)
    status: str = Field(default="Available", max_length=30)

    latitude: float
    longitude: float

    address: str
    phone: str

    capacity: int = Field(..., ge=1)
    available_units: int = Field(..., ge=0)

    is_active: bool = True


class ResourceCreate(ResourceBase):
    pass


class ResourceUpdate(BaseModel):
    name: str | None = Field(default=None, max_length=150)
    type: str | None = Field(default=None, max_length=50)
    status: str | None = Field(default=None, max_length=30)

    latitude: float | None = None
    longitude: float | None = None

    address: str | None = None
    phone: str | None = None

    capacity: int | None = Field(default=None, ge=1)
    available_units: int | None = Field(default=None, ge=0)

    is_active: bool | None = None


class ResourceResponse(ResourceBase):
    id: UUID

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )


class ResourceListResponse(BaseModel):
    items: list[ResourceResponse]
    total: int