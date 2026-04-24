# Student Management System

A beautiful, full-stack student management application built with a modern React frontend and a robust C# .NET API backend. This project allows you to seamlessly manage student records (add, edit, delete, search) with an aesthetic "Tally.so" style interface.

---

## 🔑 Demo Credentials

To quickly review the project, you can use the following pre-configured admin account on the login page:

- **Username:** `admin`
- **Password:** `admin123`

---

## 🌟 Key Features

- **Full CRUD Operations:** Add, Edit, Delete, and View student records.
- **Real-time Search:** Instantly filter students by name or email.
- **Secure Authentication:** JWT-based login system.
- **Responsive Design:** Optimized for various screen sizes with fluid layouts.
- **Robust Backend:** Built with ASP.NET Core Web API, Entity Framework Core, and SQL Server.
- **API Documentation:** Swagger UI with JWT authorization support.
- **Structured Architecture:** Built using Controller, Service, and Repository layers.
- **Global Error Handling:** Middleware-based exception handling with logging.

---

## 🚀 Prerequisites

Before you run the project, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/) (v16 or higher)
- [.NET SDK](https://dotnet.microsoft.com/en-us/download) / Visual Studio 2022
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (Express or LocalDB)

---

## 📁 Project Structure

```bash
studentmanagementsystem/
│
├── backend/
│   └── StudentManagementSystem.API/
│
└── frontend/
```

---

## 💻 Running the Backend (.NET C#)

The backend handles authentication, student APIs, database access, logging, and Swagger documentation.

### Option 1: Using Visual Studio 2022 (Recommended)

1. Open the folder `backend/StudentManagementSystem.API`.
2. Open the `StudentManagementSystem.API.csproj` file in Visual Studio.
3. Restore NuGet packages if prompted.
4. Open **Tools → NuGet Package Manager → Package Manager Console**.
5. Run the following command:

   ```powershell
   Update-Database
   ```

6. This will create the SQL Server database and required tables.
7. Click the **green "Start" button** (labeled `StudentManagementSystem.API`) at the top.
8. The server will launch and a browser window will open showing the Swagger documentation.
9. Keep this backend server running while using the frontend.

### Option 2: Using the Command Line

1. Open your terminal.
2. Navigate to the backend project folder:

   ```bash
   cd backend/StudentManagementSystem.API
   ```

3. Restore dependencies:

   ```bash
   dotnet restore
   ```

4. Apply the database migration:

   ```bash
   dotnet ef database update
   ```

5. Run the backend:

   ```bash
   dotnet run
   ```

6. The API will start and listen on the configured ports, such as:

   ```bash
   https://localhost:61506
   http://localhost:61507
   ```

7. Open Swagger in your browser:

   ```bash
   https://localhost:61506/swagger
   ```

---

## 🔐 Using Swagger with JWT

1. Run the backend and open Swagger.
2. Use the login endpoint to authenticate with the demo credentials:
   - **Username:** `admin`
   - **Password:** `admin123`
3. Copy the JWT token returned from the login API.
4. Click the **Authorize** button in Swagger.
5. Enter the token in this format:

   ```bash
   Bearer your_token_here
   ```

6. Now you can test the protected student endpoints.

---

## 🎨 Running the Frontend (React + Vite)

1. Open a **new terminal**.
2. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the frontend development server:

   ```bash
   npm run dev
   ```

5. Open your browser to:

   ```bash
   http://localhost:5173
   ```

6. Login using the demo credentials:

   - **Username:** `admin`
   - **Password:** `admin123`

---

## ⚙️ Configuration Notes

### Backend Port
If your backend port changes, update the frontend API base URL in:

```bash
frontend/src/utils/api.js
```

### Database Connection
If your SQL Server / LocalDB instance name is different, update the connection string in:

```bash
backend/StudentManagementSystem.API/appsettings.json
```

Example:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=StudentManagementDB;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

---

## 🖼️ Frontend Assets

Make sure these image files exist inside:

```bash
frontend/src/assets/
```

Required files:
- `smart.png`
- `click-plus.png`
- `designed-for-you.png`

If these files are missing or named differently, the frontend may fail to load properly.

---

## ✅ Assignment Coverage

This project includes the required features from the assignment:

- Student CRUD APIs
- JWT Authentication
- Global Exception Handling Middleware
- Logging
- Swagger API Documentation
- Layered Architecture (Controller, Service, Repository)
- SQL Server Integration
- Basic React UI (Bonus)

---

## 📬 Submission

- **Repository:** [studentmanagementsystem](https://github.com/UtkarshBhujbal02/studentmanagementsystem.git)

---

## 👨‍💻 Author

**Utkarsh Bhujbal**  
**Email:** [utkarshbhujbal02@gmail.com](mailto:utkarshbhujbal02@gmail.com)
