@echo off
title BigData Product Recommender UI
echo ========================================================
echo Launching Big Data Product Recommendation System UI...
echo ========================================================
cd /d "%~dp0\.."
.\venv\Scripts\python.exe -m streamlit run ui\app.py
pause
