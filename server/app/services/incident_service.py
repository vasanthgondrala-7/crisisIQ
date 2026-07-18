from uuid import UUID

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.incident import Incident
from app.repositories.incident_repository import IncidentRepository
from app.schemas.incident import IncidentCreate, IncidentUpdate


class IncidentService:
    def __init__(self, db: AsyncSession):
        self.repository = IncidentRepository(db)

    async def create_incident(
        self,
        incident: IncidentCreate,
    ) -> Incident:
        return await self.repository.create(incident)

    async def get_incidents(self) -> list[Incident]:
        return await self.repository.get_all()

    async def get_incident(
        self,
        incident_id: UUID,
    ) -> Incident:
        incident = await self.repository.get_by_id(incident_id)

        if incident is None:
            raise ValueError("Incident not found.")

        return incident

    async def update_incident(
        self,
        incident_id: UUID,
        incident_update: IncidentUpdate,
    ) -> Incident:

        incident = await self.get_incident(incident_id)

        return await self.repository.update(
            incident,
            incident_update,
        )

    async def delete_incident(
        self,
        incident_id: UUID,
    ) -> None:

        incident = await self.get_incident(incident_id)

        await self.repository.delete(incident)