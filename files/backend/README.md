# Todo API

## Setup

1. Install MySQL and create the database with `schema.sql`.
2. Create a virtual environment and install dependencies:

   ```powershell
   py -m venv .venv
   .\.venv\Scripts\Activate.ps1
   pip install -r requirements.txt
   ```

3. Copy `.env.example` to `.env` and set the MySQL credentials.
4. Start the API from the `backend` directory:

   ```powershell
   uvicorn main:app --reload
   ```

Interactive Swagger documentation is available at `http://localhost:8000/docs`.
