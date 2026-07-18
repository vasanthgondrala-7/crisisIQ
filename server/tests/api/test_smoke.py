from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_root_returns_welcome_message():
    response = client.get("/")

    assert response.status_code == 200
    assert response.json()["message"] == "Welcome to CrisisIQ API"


def test_health_returns_healthy_status():
    response = client.get("/api/health")

    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


def test_ai_recommendation_uses_rules_fallback():
    response = client.post(
        "/api/ai/recommend",
        json={
            "incident_type": "Fire",
            "severity": 9,
            "priority": 8,
            "location": "Sector 7",
            "available_resources": ["Engine 4", "Ambulance 2"],
        },
    )

    body = response.json()

    assert response.status_code == 200
    assert body["model_provider"] == "rules-fallback"
    assert body["risk_score"] == 87
    assert "Engine 4" in body["recommended_resources"]
