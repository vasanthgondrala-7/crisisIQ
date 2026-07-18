from uuid import UUID

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.timeline import TimelineEvent
from app.repositories.timeline_repository import TimelineRepository
from app.schemas.timeline import TimelineEventCreate


class TimelineService:
    def __init__(self, db: AsyncSession):
        self.repository = TimelineRepository(db)

    async def create_event(
        self,
        event: TimelineEventCreate,
    ) -> TimelineEvent:
        return await self.repository.create(event)

    async def get_events(self) -> list[TimelineEvent]:
        return await self.repository.get_all()

    async def get_event(
        self,
        event_id: UUID,
    ) -> TimelineEvent:

        event = await self.repository.get_by_id(event_id)

        if event is None:
            raise ValueError("Timeline event not found.")

        return event

    async def get_incident_timeline(
        self,
        incident_id: UUID,
    ) -> list[TimelineEvent]:

        return await self.repository.get_by_incident(
            incident_id
        )

    async def delete_event(
        self,
        event_id: UUID,
    ) -> None:

        event = await self.get_event(event_id)

        await self.repository.delete(event)