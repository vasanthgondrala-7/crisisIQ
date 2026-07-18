import uuid
from datetime import datetime
from enum import Enum

from sqlalchemy import DateTime, Enum as SqlEnum, Float, Integer, String, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class IncidentStatus(str, Enum):
    PENDING = "Pending"
    DISPATCHED = "Dispatched"
    EN_ROUTE = "En Route"
    ON_SCENE = "On Scene"
    RESOLVED = "Resolved"


class Incident(Base):
    __tablename__ = "incidents"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    title: Mapped[str] = mapped_column(String(200), nullable=False)

    description: Mapped[str] = mapped_column(Text, nullable=False)

    type: Mapped[str] = mapped_column(String(100), nullable=False)

    severity: Mapped[int] = mapped_column(Integer, nullable=False)

    priority: Mapped[int] = mapped_column(Integer, nullable=False)

    confidence: Mapped[float] = mapped_column(Float, nullable=False)

    status: Mapped[IncidentStatus] = mapped_column(
        SqlEnum(IncidentStatus),
        default=IncidentStatus.PENDING,
        nullable=False,
    )

    latitude: Mapped[float] = mapped_column(Float, nullable=False)

    longitude: Mapped[float] = mapped_column(Float, nullable=False)

    address: Mapped[str] = mapped_column(String(255), nullable=False)

    reported_by: Mapped[str] = mapped_column(String(100), nullable=False)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )