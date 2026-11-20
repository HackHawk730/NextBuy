@echo off
title BigData Recommender - FastAPI Backend
echo ========================================================
echo Starting BigData Recommender AI FastAPI Backend...
echo ========================================================
cd /d "%~dp0\.."
.\venv\Scripts\python.exe -m uvicorn src.api_server:app --host 127.0.0.1 --port 8000 --reload
pause

