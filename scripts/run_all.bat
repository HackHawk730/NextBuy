@echo off
title BigData Product Recommender - Full Pipeline
echo ========================================================
echo Running End-to-End Big Data Recommendation Pipeline...
echo ========================================================
cd /d "%~dp0\.."
.\venv\Scripts\python.exe scripts\run_pipeline.py
pause
