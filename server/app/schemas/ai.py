from pydantic import BaseModel, Field


class AIRecommendationRequest(BaseModel):
    incident_type: str = Field(..., max_length=100)
    severity: int = Field(..., ge=1, le=10)
    priority: int = Field(..., ge=1, le=10)
    location: str
    available_resources: list[str] = Field(default_factory=list)


class AIRecommendationResponse(BaseModel):
    risk_score: int
    summary: str
    recommended_actions: list[str]
    recommended_resources: list[str]
    model_provider: str
