@echo off
echo Starting React and FastAPI app...

:: Start Backend
start "Backend" cmd /k "cd backend && py -m uvicorn main:app --reload"

:: Start Frontend
start "Frontend" cmd /k "npm run dev -- --open"

echo App is starting...
