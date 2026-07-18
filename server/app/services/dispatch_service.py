from uuid import UUID

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.dispatch import Dispatch
from app.repositories.dispatch_repository import DispatchRepository
from app.repositories.incident_repository import IncidentRepository
from app.repositories.resource_repository import ResourceRepository
from app.schemas.dispatch import DispatchCreate, DispatchUpdate


class DispatchService:
    def __init__(self, db: AsyncSession):
        self.dispatch_repository = DispatchRepository(db)
        self.incident_repository = IncidentRepository(db)
        self.resource_repository = ResourceRepository(db)

    async def create_dispatch(
        self,
        dispatch: DispatchCreate,
    ) -> Dispatch:

        incident = await self.incident_repository.get_by_id(
            dispatch.incident_id
        )

        if incident is None:
            raise ValueError("Incident not found.")

        resource = await self.resource_repository.get_by_id(
            dispatch.resource_id
        )

        if resource is None:
            raise ValueError("Resource not found.")

        if not resource.is_active:
            raise ValueError("Resource is inactive.")

        if resource.available_units <= 0:
            raise ValueError("No available units.")

        resource.available_units -= 1

        if resource.available_units == 0:
            resource.status = "Busy"

        await self.resource_repository.update(
            resource,
            type("ResourceUpdate", (), {})()
        )

        return await self.dispatch_repository.create(dispatch)

    async def get_dispatches(self) -> list[Dispatch]:
        return await self.dispatch_repository.get_all()

    async def get_dispatch(
        self,
        dispatch_id: UUID,
    ) -> Dispatch:

        dispatch = await self.dispatch_repository.get_by_id(
            dispatch_id
        )

        if dispatch is None:
            raise ValueError("Dispatch not found.")

        return dispatch

    async def get_dispatches_by_incident(
        self,
        incident_id: UUID,
    ) -> list[Dispatch]:

        return await self.dispatch_repository.get_by_incident(
            incident_id
        )

    async def get_dispatches_by_resource(
        self,
        resource_id: UUID,
    ) -> list[Dispatch]:

        return await self.dispatch_repository.get_by_resource(
            resource_id
        )

    async def update_dispatch(
        self,
        dispatch_id: UUID,
        dispatch_update: DispatchUpdate,
    ) -> Dispatch:

        dispatch = await self.get_dispatch(dispatch_id)

        return await self.dispatch_repository.update(
            dispatch,
            dispatch_update,
        )

    async def delete_dispatch(
        self,
        dispatch_id: UUID,
    ) -> None:

        dispatch = await self.get_dispatch(dispatch_id)

        await self.dispatch_repository.delete(dispatch)