from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.dispatch import Dispatch
from app.schemas.dispatch import (
    DispatchCreate,
    DispatchUpdate,
)


class DispatchRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(
        self,
        dispatch: DispatchCreate,
    ) -> Dispatch:

        db_dispatch = Dispatch(**dispatch.model_dump())

        self.db.add(db_dispatch)
        await self.db.commit()
        await self.db.refresh(db_dispatch)

        return db_dispatch

    async def get_all(self) -> list[Dispatch]:
        result = await self.db.execute(
            select(Dispatch)
        )

        return result.scalars().all()

    async def get_by_id(
        self,
        dispatch_id: UUID,
    ) -> Dispatch | None:

        result = await self.db.execute(
            select(Dispatch).where(
                Dispatch.id == dispatch_id
            )
        )

        return result.scalar_one_or_none()

    async def get_by_incident(
        self,
        incident_id: UUID,
    ) -> list[Dispatch]:

        result = await self.db.execute(
            select(Dispatch).where(
                Dispatch.incident_id == incident_id
            )
        )

        return result.scalars().all()

    async def get_by_resource(
        self,
        resource_id: UUID,
    ) -> list[Dispatch]:

        result = await self.db.execute(
            select(Dispatch).where(
                Dispatch.resource_id == resource_id
            )
        )

        return result.scalars().all()

    async def update(
        self,
        db_dispatch: Dispatch,
        dispatch: DispatchUpdate,
    ) -> Dispatch:

        update_data = dispatch.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(db_dispatch, key, value)

        await self.db.commit()
        await self.db.refresh(db_dispatch)

        return db_dispatch

    async def delete(
        self,
        db_dispatch: Dispatch,
    ) -> None:

        await self.db.delete(db_dispatch)
        await self.db.commit()