# 🚨 CrisisIQ – AI-Powered Emergency Response Management Platform

> **Smarter Decisions. Faster Response. Safer Communities.**

CrisisIQ is a modern, AI-powered Emergency Response Management Platform that helps organizations monitor, analyze, prioritize, and respond to emergencies in real time. It combines Artificial Intelligence, geospatial visualization, real-time communication, and intelligent resource management into a unified command center.

---

# 📖 Table of Contents

- Overview
- Problem Statement
- Solution
- Features
- System Architecture
- Technology Stack
- Project Structure
- Installation
- Environment Variables
- Running the Project
- API Documentation
- AI Features
- Security
- Future Scope
- Contributors
- License

---

# 📌 Overview

Emergency response organizations often rely on multiple disconnected systems, manual communication, and delayed decision-making during critical incidents.

CrisisIQ solves these challenges by providing an AI-powered command platform capable of:

- Managing emergency incidents
- Prioritizing incidents using AI
- Recommending emergency resources
- Dispatching responders
- Monitoring operations in real time
- Generating AI-powered incident reports
- Maintaining complete audit trails

The platform is designed for Smart Cities, Government Agencies, Universities, Hospitals, Industrial Facilities, Disaster Management Authorities, and Enterprise Security Operations Centers.

---

# 🚨 Problem Statement

Current emergency management systems suffer from:

- Manual incident prioritization
- Delayed emergency response
- Poor resource allocation
- Duplicate incident reports
- Lack of situational awareness
- Fragmented communication
- Limited operational visibility
- Manual report generation

These limitations often increase response times and reduce operational efficiency.

---

# 💡 Solution

CrisisIQ introduces an intelligent emergency response platform that combines Artificial Intelligence, Real-Time Communication, and Cloud Architecture.

The platform automatically:

- Receives emergency reports
- Classifies incidents
- Predicts severity
- Detects duplicate reports
- Suggests response actions
- Recommends emergency resources
- Dispatches responders
- Tracks missions
- Generates reports
- Synchronizes dashboards using WebSockets

---

# ✨ Core Features

## Incident Management

- Report incidents
- Update incident status
- Track incident history
- Priority classification
- Severity prediction
- Evidence management

---

## AI Incident Analysis

- Severity Prediction
- Risk Assessment
- Duplicate Detection
- AI Recommendations
- Confidence Score
- Incident Summaries

---

## Resource Management

Manage:

- Police Units
- Fire Stations
- Ambulances
- Medical Teams
- Rescue Teams
- Emergency Vehicles

Track:

- Availability
- Capacity
- Location
- Assignment Status

---

## Smart Dispatch

Automatically recommends:

- Best responder
- Closest responder
- Estimated arrival time
- Optimal resource allocation

---

## Mission Timeline

Automatically records:

- Incident Created
- AI Analysis
- Dispatch Started
- Team Arrived
- Incident Resolved

---

## Live Dashboard

Displays:

- Active Incidents
- Resource Availability
- AI Alerts
- Incident Statistics
- Mission Timeline
- Emergency Map

---

## Interactive Map

Supports:

- Live Incident Locations
- Resource Tracking
- Route Visualization
- Heat Maps
- Geofencing

---

## Notification Center

Real-time notifications using WebSockets.

Notifications include:

- New Incidents
- Dispatch Updates
- AI Recommendations
- Critical Alerts

---

## AI Report Generator

Automatically generates:

- Incident Summary
- Timeline
- Resource Utilization
- AI Recommendations
- Final Report

---

# 🏗 System Architecture

```
                React Frontend
                       │
          REST API / WebSockets
                       │
                 FastAPI Backend
                       │
               Business Services
                       │
                Repository Layer
                       │
                 PostgreSQL Database
                       │
                 AI Recommendation
```

---

# 💻 Technology Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- ShadCN UI
- React Query
- React Hook Form
- Zod
- Leaflet
- Framer Motion

---

## Backend

- FastAPI
- Python 3.12
- SQLAlchemy 2.0
- PostgreSQL
- Alembic
- JWT Authentication
- WebSockets

---

## AI

- OpenAI GPT
- Google Gemini
- Prompt Engineering

---

## DevOps

- Docker
- Docker Compose
- GitHub Actions
- Nginx

---

# 📁 Project Structure

```
CrisisIQ/

├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── app/
│   │   ├── ai/
│   │   ├── api/
│   │   ├── core/
│   │   ├── database/
│   │   ├── dependencies/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── websocket/
│   │   └── main.py
│   │
│   ├── tests/
│   ├── alembic/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── .env.example
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/crisisiq.git

cd crisisiq
```

---

## Backend Setup

```bash
cd server

python -m venv venv

source venv/bin/activate
```

Windows

```bash
venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

---

## Frontend Setup

```bash
cd client

npm install
```

---

# ⚙ Environment Variables

Create:

```
server/.env
```

```
APP_NAME=CrisisIQ

APP_ENV=development

DATABASE_URL=postgresql+asyncpg://postgres:password@localhost:5432/crisisiq

SECRET_KEY=your-secret-key

OPENAI_API_KEY=your-openai-key

GOOGLE_API_KEY=your-gemini-key
```

---

# ▶ Running Backend

```bash
cd server

alembic upgrade head

uvicorn app.main:app --reload
```

Swagger

```
http://localhost:8000/docs
```

---

# ▶ Running Frontend

```bash
cd client

npm run dev
```

---

# 🐳 Docker

Run everything

```bash
docker compose up --build
```

Stop

```bash
docker compose down
```

---

# 🤖 AI Features

- Incident Severity Prediction
- AI Recommendations
- Duplicate Detection
- AI Summary Generation
- Resource Recommendation
- Incident Report Generation

---

# 🔐 Security

- JWT Authentication
- Role-Based Access Control (RBAC)
- Password Hashing
- Input Validation
- Rate Limiting
- Audit Logging

---

# 📈 Future Scope

- Drone Integration
- IoT Sensors
- Predictive Analytics
- GIS Support
- Digital Twin
- Voice-Based Emergency Reporting
- Mobile Applications
- Multi-language Support
- Offline Disaster Mode

---

# 👨‍💻 Contributors

Developed as part of an AI-powered Emergency Response Management project.

---

# 📄 License

MIT License

---

# ⭐ Project Vision

CrisisIQ aims to become an intelligent emergency command platform that empowers responders with AI-assisted decision-making, real-time operational visibility, and seamless coordination during critical incidents.

**"Technology that helps save time, resources, and ultimately lives."**#
