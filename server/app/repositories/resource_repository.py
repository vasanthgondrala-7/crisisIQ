from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.resource import Resource
from app.schemas.resource import (
    ResourceCreate,
    ResourceUpdate,
)


class ResourceRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(
        self,
        resource: ResourceCreate,
    ) -> Resource:

        db_resource = Resource(**resource.model_dump())

        self.db.add(db_resource)
        await self.db.commit()
        await self.db.refresh(db_resource)

        return db_resource

    async def get_all(self) -> list[Resource]:
        result = await self.db.execute(
            select(Resource)
        )
        return result.scalars().all()

    async def get_by_id(
        self,
        resource_id: UUID,
    ) -> Resource | None:

        result = await self.db.execute(
            select(Resource).where(
                Resource.id == resource_id
            )
        )

        return result.scalar_one_or_none()

    async def get_by_type(
        self,
        resource_type: str,
    ) -> list[Resource]:

        result = await self.db.execute(
            select(Resource).where(
                Resource.type == resource_type
            )
        )

        return result.scalars().all()

    async def get_available(self) -> list[Resource]:

        result = await self.db.execute(
            select(Resource).where(
                Resource.status == "Available"
            )
        )

        return result.scalars().all()

    async def update(
        self,
        db_resource: Resource,
        resource: ResourceUpdate,
    ) -> Resource:

        update_data = resource.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(db_resource, key, value)

        await self.db.commit()
        await self.db.refresh(db_resource)

        return db_resource

    async def delete(
        self,
        db_resource: Resource,
    ) -> None:

        await self.db.delete(db_resource)
        await self.db.commit()