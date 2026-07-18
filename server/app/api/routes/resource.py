from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db
from app.schemas.resource import (
    ResourceCreate,
    ResourceResponse,
    ResourceUpdate,
)
from app.services.resource_service import ResourceService

router = APIRouter(
    prefix="/resources",
    tags=["Resources"],
)


@router.post(
    "",
    response_model=ResourceResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_resource(
    resource: ResourceCreate,
    db: AsyncSession = Depends(get_db),
):
    service = ResourceService(db)
    return await service.create_resource(resource)


@router.get(
    "",
    response_model=list[ResourceResponse],
)
async def get_resources(
    db: AsyncSession = Depends(get_db),
):
    service = ResourceService(db)
    return await service.get_resources()


@router.get(
    "/available",
    response_model=list[ResourceResponse],
)
async def get_available_resources(
    db: AsyncSession = Depends(get_db),
):
    service = ResourceService(db)
    return await service.get_available_resources()


@router.get(
    "/type/{resource_type}",
    response_model=list[ResourceResponse],
)
async def get_resources_by_type(
    resource_type: str,
    db: AsyncSession = Depends(get_db),
):
    service = ResourceService(db)
    return await service.get_resources_by_type(resource_type)


@router.get(
    "/{resource_id}",
    response_model=ResourceResponse,
)
async def get_resource(
    resource_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    service = ResourceService(db)

    try:
        return await service.get_resource(resource_id)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )


@router.patch(
    "/{resource_id}",
    response_model=ResourceResponse,
)
async def update_resource(
    resource_id: UUID,
    resource: ResourceUpdate,
    db: AsyncSession = Depends(get_db),
):
    service = ResourceService(db)

    try:
        return await service.update_resource(
            resource_id,
            resource,
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )


@router.delete(
    "/{resource_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_resource(
    resource_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    service = ResourceService(db)

    try:
        await service.delete_resource(resource_id)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )
