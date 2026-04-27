## Azure Weather App

A full-stack weather application built with Node.js and hosted on Microsoft Azure, 

 Live App: https://ahsm4-weather-app-fjaad7huerdcaycs.canadacentral-01.azurewebsites.net

## Overview

This app was built to allow users to search for real time weather data. It displays temperature, humidity, wind speed and weather conditions. 

It was built to demonstrate practical Azure admin and DevOps skills. 

## Architecture

User → Azure App Service (Node.js/Express)
│
├── OpenWeatherMap API (weather data)
│
├── Azure Key Vault (API secret storage)
│         └── Managed Identity (passwordless auth)
│
└── Application Insights (monitoring & logging)
GitHub (source code)
└── GitHub Actions (CI/CD pipeline)
└── OIDC Authentication (passwordless deployment)
└── Azure App Service (auto deploy on push)

---

## Tech Stack

### Frontend
- HTML5, CSS3, Vanilla JavaScript
- Responsive design with glassmorphism UI

### Backend
- Node.js with Express.js
- OpenWeatherMap API integration

### Azure Services
- **Azure App Service** — application hosting (Linux, Node 24 LTS)
- **Azure Key Vault** — secure API key storage
- **Azure Managed Identity** — passwordless authentication between services
- **Application Insights** — real-time monitoring, logging and analytics
- **Log Analytics Workspace** — centralised log storage

### DevOps
- **GitHub Actions** — automated CI/CD pipeline
- **OIDC Authentication** — passwordless deployment to Azure (zero stored credentials)

---

## Security Features

- API keys stored in **Azure Key Vault** — never in code or environment variables
- **Managed Identity** used for App Service to Key Vault authentication
- **OIDC** used for GitHub Actions to Azure authentication
- **Principle of least privilege** applied to all role assignments
- `.env` file excluded from version control via `.gitignore`

---

## Monitoring

- **Application Insights** integrated for real-time performance monitoring
- Request tracking, failure detection and response time analytics
- **KQL queries** available for custom log analysis

---

## CI/CD Pipeline

Every push to the `main` branch automatically:
1. Triggers GitHub Actions workflow
2. Installs Node.js dependencies
3. Authenticates to Azure using OIDC (no passwords)
4. Deploys updated code to Azure App Service

---

## Skills Demonstrated

- Azure App Service provisioning and configuration
- Azure Key Vault creation and secret management
- Managed Identity configuration
- Role Based Access Control (RBAC)
- Application Insights and Azure Monitor
- GitHub Actions CI/CD integration
- Resource Group organisation
- Environment variables and app configuration
- Zero trust security principles

---

## 🏃 Running Locally

### Prerequisites
- Node.js v24+
- OpenWeatherMap API key

### Setup
```bash
# Clone the repository
git clone https://github.com/ahsm4/azure-weather-app.git

# Navigate to project folder
cd azure-weather-app

# Install dependencies
npm install

# Create .env file
echo "OPENWEATHER_API_KEY=your_api_key_here" > .env

# Start the server
npm start
```

Then open your browser at `http://localhost:3000`

---