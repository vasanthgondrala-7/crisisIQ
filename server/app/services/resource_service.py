from uuid import UUID

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.resource import Resource
from app.repositories.resource_repository import ResourceRepository
from app.schemas.resource import (
    ResourceCreate,
    ResourceUpdate,
)


class ResourceService:
    def __init__(self, db: AsyncSession):
        self.repository = ResourceRepository(db)

    async def create_resource(
        self,
        resource: ResourceCreate,
    ) -> Resource:
        return await self.repository.create(resource)

    async def get_resources(self) -> list[Resource]:
        return await self.repository.get_all()

    async def get_resource(
        self,
        resource_id: UUID,
    ) -> Resource:

        resource = await self.repository.get_by_id(resource_id)

        if resource is None:
            raise ValueError("Resource not found.")

        return resource

    async def get_resources_by_type(
        self,
        resource_type: str,
    ) -> list[Resource]:
        return await self.repository.get_by_type(resource_type)

    async def get_available_resources(self) -> list[Resource]:
        return await self.repository.get_available()

    async def update_resource(
        self,
        resource_id: UUID,
        resource_update: ResourceUpdate,
    ) -> Resource:

        resource = await self.get_resource(resource_id)

        return await self.repository.update(
            resource,
            resource_update,
        )

    async def delete_resource(
        self,
        resource_id: UUID,
    ) -> None:

        resource = await self.get_resource(resource_id)

        await self.repository.delete(resource)