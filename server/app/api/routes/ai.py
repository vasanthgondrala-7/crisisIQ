from fastapi import APIRouter

from app.schemas.ai import AIRecommendationRequest, AIRecommendationResponse
from app.services.ai_service import AIService

router = APIRouter(prefix="/ai", tags=["AI"])


@router.post("/recommend", response_model=AIRecommendationResponse)
async def recommend_response(
    request: AIRecommendationRequest,
):
    service = AIService()
    return await service.recommend_response(request)
from fastapi import APIRouter

from app.schemas.ai import AIRecommendationRequest, AIRecommendationResponse
from app.services.ai_service import AIService

router = APIRouter(prefix="/ai", tags=["AI"])


@router.post("/recommend", response_model=AIRecommendationResponse)
async def recommend_response(
    request: AIRecommendationRequest,
):
    service = AIService()
    return await service.recommend_response(request)
