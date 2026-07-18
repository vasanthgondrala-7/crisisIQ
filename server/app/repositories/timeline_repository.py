from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.timeline import TimelineEvent
from app.schemas.timeline import TimelineEventCreate


class TimelineRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(
        self,
        event: TimelineEventCreate,
    ) -> TimelineEvent:

        event_data = event.model_dump()
        event_data["event_metadata"] = event_data.pop("metadata", {})
        db_event = TimelineEvent(**event_data)

        self.db.add(db_event)
        await self.db.commit()
        await self.db.refresh(db_event)

        return db_event

    async def get_all(self) -> list[TimelineEvent]:

        result = await self.db.execute(
            select(TimelineEvent)
            .order_by(TimelineEvent.created_at.desc())
        )

        return result.scalars().all()

    async def get_by_id(
        self,
        event_id: UUID,
    ) -> TimelineEvent | None:

        result = await self.db.execute(
            select(TimelineEvent).where(
                TimelineEvent.id == event_id
            )
        )

        return result.scalar_one_or_none()

    async def get_by_incident(
        self,
        incident_id: UUID,
    ) -> list[TimelineEvent]:

        result = await self.db.execute(
            select(TimelineEvent)
            .where(
                TimelineEvent.incident_id == incident_id
            )
            .order_by(TimelineEvent.created_at.asc())
        )

        return result.scalars().all()

    async def delete(
        self,
        event: TimelineEvent,
    ) -> None:

        await self.db.delete(event)
        await self.db.commit()
