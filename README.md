# Student Management System

A beautiful, full-stack student management application built with a modern React frontend and a robust C# .NET API backend. This project allows you to seamlessly manage student records (add, edit, delete, search) with an aesthetic "Tally.so" style interface.

---

## 🔑 Demo Credentials

To quickly review the project, you can use the following pre-configured admin account on the login page:

- **Username:** `admin`
- **Password:** `admin123`

---

## 🌟 Key Features

- **Modern Aesthetic:** Clean, "Tally.so" inspired light theme with beautiful decorative assets.
- **Full CRUD Operations:** Add, Edit, Delete, and View student records.
- **Real-time Search:** Instantly filter students by name or email.
- **Secure Authentication:** JWT-based login system.
- **Responsive Design:** Optimized for various screen sizes with fluid layouts.
- **Robust Backend:** Built with ASP.NET Core, Entity Framework Core, and SQL Server.

---

## 🚀 Prerequisites

Before you run the project, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/en/) (v16 or higher)
- [.NET 10.0 SDK](https://dotnet.microsoft.com/en-us/download) (or Visual Studio 2022)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (Express or LocalDB)

---

## 💻 Running the Backend (.NET C#)

The backend handles the database, authentication, and API endpoints.

### Option 1: Using Visual Studio 2022 (Recommended)
1. Open the folder `backend/StudentManagementSystem.API`.
2. Open the `StudentManagementSystem.API.csproj` file.
3. In Visual Studio, click the **green "Start" button** (labeled `StudentManagementSystem.API`) at the top.
4. The server will launch and a browser window will open showing the Swagger documentation.
5. **Important:** Keep this running in the background!

### Option 2: Using the Command Line
1. Open your terminal.
2. Navigate to the backend project folder:
   ```bash
   cd backend/StudentManagementSystem.API
   ```
3. Run the backend:
   ```bash
   dotnet run
   ```
4. The server will listen on `https://localhost:61506`.

---

## 🎨 Running the Frontend (React Vite)

1. Open a **new** terminal (do not close the backend terminal!).
2. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
3. Install dependencies (only required for the first time):
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser to: **`http://localhost:5173`**

---

## ⚙️ Troubleshooting

- **CORS or Connection Refused:** 
  Ensure the backend is running at `https://localhost:61506`. If you changed the backend port, you must update `frontend/src/utils/api.js`.
  
- **Database Connection:** 
  Update the connection string in `backend/StudentManagementSystem.API/appsettings.json` if your SQL Server instance name is different from the default.

---

**Made by:** Utkarsh Bhujbal  
**Email:** utkarshbhujbal02@gmail.com
