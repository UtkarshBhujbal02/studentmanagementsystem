# Student Management System

A production-ready Full Stack web application featuring a pure vanilla HTML/CSS/JS frontend and an ASP.NET Core 8 Web API backend.

## Prerequisites
- .NET 8 SDK
- SQL Server (LocalDB or standard instance)
- Visual Studio / VS Code

## Backend Setup
1. Navigate to `backend/StudentManagementSystem.API`
2. Run `dotnet restore`
3. Generate migrations and create database:
   ```bash
   dotnet ef migrations add Init
   dotnet ef database update
   ```
4. Run the API:
   ```bash
   dotnet run
   ```
   The backend will be available at `http://localhost:5000` (ensure this matches `Properties/launchSettings.json`).

## Frontend Setup
1. Open the `frontend` folder using VS Code.
2. Launch using **Live Server** plugin on port `5500`.
3. Open `http://127.0.0.1:5500/index.html`.

## Default Credentials
- **Username:** `admin`
- **Password:** `admin123`

## API Endpoints
- `POST /api/auth/login`
- `GET /api/students` (Requires JWT)
- `GET /api/students/{id}` (Requires JWT)
- `POST /api/students` (Requires JWT)
- `PUT /api/students/{id}` (Requires JWT)
- `DELETE /api/students/{id}` (Requires JWT)
