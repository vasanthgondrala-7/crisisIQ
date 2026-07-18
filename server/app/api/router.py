from fastapi import APIRouter

from app.api.routes.ai import router as ai_router
from app.api.routes.auth import router as auth_router
from app.api.routes.dispatch import router as dispatch_router
from app.api.routes.health import router as health_router
from app.api.routes.incident import router as incident_router
from app.api.routes.notification import router as notification_router
from app.api.routes.resource import router as resource_router
from app.api.routes.timeline import router as timeline_router
from app.api.routes.user import router as user_router
from app.api.routes.websocket import router as websocket_router

api_router = APIRouter(prefix="/api")

api_router.include_router(health_router)
api_router.include_router(auth_router)
api_router.include_router(user_router)
api_router.include_router(incident_router)
api_router.include_router(resource_router)
api_router.include_router(dispatch_router)
api_router.include_router(timeline_router)
api_router.include_router(notification_router)
api_router.include_router(ai_router)
api_router.include_router(websocket_router)
