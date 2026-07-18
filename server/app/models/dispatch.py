import uuid
from datetime import datetime
from enum import Enum

from sqlalchemy import DateTime, Enum as SqlEnum, Float, ForeignKey, Integer, String, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class DispatchStatus(str, Enum):
    PENDING = "Pending"
    ASSIGNED = "Assigned"
    DISPATCHED = "Dispatched"
    EN_ROUTE = "En Route"
    ON_SCENE = "On Scene"
    COMPLETED = "Completed"
    CANCELLED = "Cancelled"


class Dispatch(Base):
    __tablename__ = "dispatches"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    incident_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("incidents.id", ondelete="CASCADE"),
        nullable=False,
    )

    resource_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("resources.id", ondelete="CASCADE"),
        nullable=False,
    )

    vehicle_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    vehicle_type: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    driver_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    eta: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    distance: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    progress: Mapped[int] = mapped_column(
        Integer,
        default=0,
    )

    status: Mapped[DispatchStatus] = mapped_column(
        SqlEnum(DispatchStatus),
        default=DispatchStatus.PENDING,
        nullable=False,
    )

    started_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    arrived_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    completed_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )

    incident = relationship("Incident")
    resource = relationship("Resource")