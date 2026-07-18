from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db
from app.schemas.incident import (
    IncidentCreate,
    IncidentResponse,
    IncidentUpdate,
)
from app.services.incident_service import IncidentService

router = APIRouter(prefix="/incidents", tags=["Incidents"])


@router.post(
    "",
    response_model=IncidentResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_incident(
    incident: IncidentCreate,
    db: AsyncSession = Depends(get_db),
):
    service = IncidentService(db)
    return await service.create_incident(incident)


@router.get(
    "",
    response_model=list[IncidentResponse],
)
async def get_incidents(
    db: AsyncSession = Depends(get_db),
):
    service = IncidentService(db)
    return await service.get_incidents()


@router.get(
    "/{incident_id}",
    response_model=IncidentResponse,
)
async def get_incident(
    incident_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    service = IncidentService(db)

    try:
        return await service.get_incident(incident_id)
    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )


@router.patch(
    "/{incident_id}",
    response_model=IncidentResponse,
)
async def update_incident(
    incident_id: UUID,
    incident: IncidentUpdate,
    db: AsyncSession = Depends(get_db),
):
    service = IncidentService(db)

    try:
        return await service.update_incident(
            incident_id,
            incident,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )


@router.delete(
    "/{incident_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_incident(
    incident_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    service = IncidentService(db)

    try:
        await service.delete_incident(incident_id)
    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )