# PowerShell script to activate virtual environment and run the Big Data Recommender
# Usage: .\ACTIVATE_VENV.ps1

Write-Host "Activating Big Data Recommendation System Environment..." -ForegroundColor Green

# Activate virtual environment
& .\venv\Scripts\Activate.ps1
$env:PYTHONUTF8 = "1"

Write-Host "Virtual environment activated successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Available Commands:" -ForegroundColor Yellow
Write-Host "  1. Run Full Big Data Pipeline: python scripts\run_pipeline.py" -ForegroundColor Cyan
Write-Host "  2. Launch Streamlit Web UI:     streamlit run ui\app.py" -ForegroundColor Cyan
Write-Host "  3. Run Test Suite:              python -m unittest discover tests" -ForegroundColor Cyan
Write-Host ""
Write-Host "To deactivate, simply type: deactivate" -ForegroundColor Gray

