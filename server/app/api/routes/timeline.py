from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db
from app.schemas.timeline import (
    TimelineEventCreate,
    TimelineEventResponse,
)
from app.services.timeline_service import TimelineService

router = APIRouter(
    prefix="/timeline",
    tags=["Timeline"],
)


@router.post(
    "",
    response_model=TimelineEventResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_event(
    event: TimelineEventCreate,
    db: AsyncSession = Depends(get_db),
):
    service = TimelineService(db)
    return await service.create_event(event)


@router.get(
    "",
    response_model=list[TimelineEventResponse],
)
async def get_events(
    db: AsyncSession = Depends(get_db),
):
    service = TimelineService(db)
    return await service.get_events()


@router.get(
    "/incident/{incident_id}",
    response_model=list[TimelineEventResponse],
)
async def get_incident_timeline(
    incident_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    service = TimelineService(db)

    return await service.get_incident_timeline(
        incident_id
    )


@router.get(
    "/{event_id}",
    response_model=TimelineEventResponse,
)
async def get_event(
    event_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    service = TimelineService(db)

    try:
        return await service.get_event(event_id)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )


@router.delete(
    "/{event_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_event(
    event_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    service = TimelineService(db)

    try:
        await service.delete_event(event_id)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )
