from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from app.websocket.manager import manager

router = APIRouter(tags=["WebSocket"])


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            message = await websocket.receive_json()
            event = message.get("event", "message.received")
            payload = message.get("payload", {})
            await manager.broadcast(event, payload)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
