from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db
from app.schemas.notification import (
    NotificationCreate,
    NotificationResponse,
    NotificationUpdate,
)
from app.services.notification_service import NotificationService

router = APIRouter(prefix="/notifications", tags=["Notifications"])


@router.post(
    "",
    response_model=NotificationResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_notification(
    notification: NotificationCreate,
    db: AsyncSession = Depends(get_db),
):
    service = NotificationService(db)
    return await service.create_notification(notification)


@router.get("", response_model=list[NotificationResponse])
async def get_notifications(
    db: AsyncSession = Depends(get_db),
):
    service = NotificationService(db)
    return await service.get_notifications()


@router.get("/user/{user_id}", response_model=list[NotificationResponse])
async def get_user_notifications(
    user_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    service = NotificationService(db)
    return await service.get_user_notifications(user_id)


@router.get("/{notification_id}", response_model=NotificationResponse)
async def get_notification(
    notification_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    service = NotificationService(db)
    try:
        return await service.get_notification(notification_id)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc


@router.patch("/{notification_id}", response_model=NotificationResponse)
async def update_notification(
    notification_id: UUID,
    notification: NotificationUpdate,
    db: AsyncSession = Depends(get_db),
):
    service = NotificationService(db)
    try:
        return await service.update_notification(notification_id, notification)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc


@router.delete("/{notification_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_notification(
    notification_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    service = NotificationService(db)
    try:
        await service.delete_notification(notification_id)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc
