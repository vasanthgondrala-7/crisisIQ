from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.incident import Incident
from app.schemas.incident import IncidentCreate, IncidentUpdate


class IncidentRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, incident: IncidentCreate) -> Incident:
        db_incident = Incident(**incident.model_dump())

        self.db.add(db_incident)
        await self.db.commit()
        await self.db.refresh(db_incident)

        return db_incident

    async def get_all(self) -> list[Incident]:
        result = await self.db.execute(select(Incident))
        return result.scalars().all()

    async def get_by_id(self, incident_id: UUID) -> Incident | None:
        result = await self.db.execute(
            select(Incident).where(Incident.id == incident_id)
        )
        return result.scalar_one_or_none()

    async def update(
        self,
        db_incident: Incident,
        incident: IncidentUpdate,
    ) -> Incident:

        update_data = incident.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(db_incident, key, value)

        await self.db.commit()
        await self.db.refresh(db_incident)

        return db_incident

    async def delete(self, db_incident: Incident) -> None:
        await self.db.delete(db_incident)
        await self.db.commit()