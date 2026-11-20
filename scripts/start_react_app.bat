@echo off
title BigData Recommender - Launch Full Stack (React + FastAPI)
echo ========================================================
echo Launching Big Data Recommender AI (FastAPI + React)...
echo ========================================================

cd /d "%~dp0\.."

echo Starting FastAPI Backend on port 8000...
start "FastAPI Backend" cmd /k ".\venv\Scripts\python.exe -m uvicorn src.api_server:app --host 127.0.0.1 --port 8000"

echo Waiting 3 seconds for backend to initialize...
timeout /t 3 /nobreak > nul

echo Starting React Frontend on port 3000...
cd frontend
start "React Frontend" cmd /k "npm run dev"

echo Opening browser at http://localhost:3000...
timeout /t 2 /nobreak > nul
start http://localhost:3000

echo ========================================================
echo Both services are running!
echo Backend:  http://localhost:8000/docs
echo Frontend: http://localhost:3000
echo ========================================================
pause

