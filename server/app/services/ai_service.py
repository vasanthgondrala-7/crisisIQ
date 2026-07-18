from app.schemas.ai import AIRecommendationRequest, AIRecommendationResponse


class AIService:
    async def recommend_response(
        self,
        request: AIRecommendationRequest,
    ) -> AIRecommendationResponse:
        risk_score = min(100, request.severity * 7 + request.priority * 3)
        resource_hints = request.available_resources or [
            "Nearest ambulance",
            "Fire response unit",
            "Police patrol",
        ]
        actions = [
            "Validate caller location and incident category.",
            "Dispatch closest suitable responders.",
            "Open a live timeline and notify command staff.",
        ]
        if request.severity >= 8:
            actions.insert(1, "Escalate to major incident protocol.")

        return AIRecommendationResponse(
            risk_score=risk_score,
            summary=(
                f"{request.incident_type} incident near {request.location} "
                f"requires priority {request.priority} coordination."
            ),
            recommended_actions=actions,
            recommended_resources=resource_hints[:5],
            model_provider="rules-fallback",
        )
