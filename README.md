# WebStore Project

## Overview
WebStore is a full-stack web application that features a React frontend and a .NET backend, utilizing SQL Server for data storage. The application provides CRUD functionality for products, search capabilities by product code, name, and price, an order addition feature, and a dashboard for viewing daily, monthly, quarterly, and yearly statistics.

## Project Structure
The project is organized into two main directories: `frontend` and `backend`.

### Frontend
- **Framework**: React
- **Build Tool**: Vite
- **Main Files**:
  - `public/index.html`: Entry point for the React application.
  - `src/App.jsx`: Main application component.
  - `src/components`: Contains all React components for products, orders, and the dashboard.
  - `src/services`: Contains API service files for handling requests to the backend.

### Backend
- **Framework**: .NET
- **Database**: SQL Server
- **Main Files**:
  - `Controllers`: Contains controllers for handling API requests related to products, orders, and dashboard statistics.
  - `Models`: Contains data models for products and orders.
  - `Data`: Contains the database context and migrations.
  - `Services`: Contains business logic for products, orders, and dashboard statistics.

## Features
- **Product Management**: Create, Read, Update, and Delete (CRUD) operations for products.
- **Product Search**: Search products by code, name, and price.
- **Order Management**: Add new orders and view existing orders.
- **Dashboard**: View statistics for daily, monthly, quarterly, and yearly data.

## Getting Started
1. **Clone the Repository**: 
   ```
   git clone <repository-url>
   cd WebStore
   ```

2. **Frontend Setup**:
   - Navigate to the `frontend` directory.
   - Install dependencies:
     ```
     npm install
     ```
   - Start the development server:
     ```
     npm run dev
     ```

3. **Backend Setup**:
   - Navigate to the `backend/WebStore.API` directory.
   - Restore dependencies:
     ```
     dotnet restore
     ```
   - Update the database (if migrations are present):
     ```
     dotnet ef database update
     ```
   - Start the backend server:
     ```
     dotnet run
     ```

4. **Access the Application**:
   - Frontend: Open your browser and go to `http://localhost:3000`.
   - Backend: The API will be available at `http://localhost:5000`.

## Technologies Used
- **Frontend**: React, Vite, CSS
- **Backend**: .NET, Entity Framework Core, SQL Server
- **Testing**: xUnit for .NET tests

## License
This project is licensed under the MIT License. See the LICENSE file for details.