from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db
from app.schemas.dispatch import (
    DispatchCreate,
    DispatchResponse,
    DispatchUpdate,
)
from app.services.dispatch_service import DispatchService

router = APIRouter(
    prefix="/dispatch",
    tags=["Dispatch"],
)


@router.post(
    "",
    response_model=DispatchResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_dispatch(
    dispatch: DispatchCreate,
    db: AsyncSession = Depends(get_db),
):
    service = DispatchService(db)

    try:
        return await service.create_dispatch(dispatch)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )


@router.get(
    "",
    response_model=list[DispatchResponse],
)
async def get_dispatches(
    db: AsyncSession = Depends(get_db),
):
    service = DispatchService(db)
    return await service.get_dispatches()


@router.get(
    "/incident/{incident_id}",
    response_model=list[DispatchResponse],
)
async def get_dispatches_by_incident(
    incident_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    service = DispatchService(db)
    return await service.get_dispatches_by_incident(
        incident_id
    )


@router.get(
    "/resource/{resource_id}",
    response_model=list[DispatchResponse],
)
async def get_dispatches_by_resource(
    resource_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    service = DispatchService(db)
    return await service.get_dispatches_by_resource(
        resource_id
    )


@router.get(
    "/{dispatch_id}",
    response_model=DispatchResponse,
)
async def get_dispatch(
    dispatch_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    service = DispatchService(db)

    try:
        return await service.get_dispatch(dispatch_id)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )


@router.patch(
    "/{dispatch_id}",
    response_model=DispatchResponse,
)
async def update_dispatch(
    dispatch_id: UUID,
    dispatch: DispatchUpdate,
    db: AsyncSession = Depends(get_db),
):
    service = DispatchService(db)

    try:
        return await service.update_dispatch(
            dispatch_id,
            dispatch,
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )


@router.delete(
    "/{dispatch_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_dispatch(
    dispatch_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    service = DispatchService(db)

    try:
        await service.delete_dispatch(dispatch_id)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )
