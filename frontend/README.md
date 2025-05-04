# WebStore Frontend Documentation

## Overview
This project is a web application built with React for the frontend and .NET for the backend, utilizing SQL Server for data storage. It provides a comprehensive solution for managing products and orders, featuring CRUD functionality, search capabilities, and a dashboard for statistics.

## Features
- **Product Management**: Create, Read, Update, and Delete (CRUD) products.
- **Product Search**: Search for products by code, name, and price.
- **Order Management**: Add and manage orders.
- **Dashboard**: View daily, monthly, quarterly, and yearly statistics.

## Getting Started

### Prerequisites
- Node.js and npm
- Vite
- .NET SDK
- SQL Server

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd WebStore
   ```

2. Navigate to the frontend directory:
   ```
   cd frontend
   ```

3. Install the frontend dependencies:
   ```
   npm install
   ```

4. Navigate to the backend directory:
   ```
   cd ../backend/WebStore.API
   ```

5. Restore the backend dependencies:
   ```
   dotnet restore
   ```

### Running the Application
1. Start the SQL Server database using Docker:
   ```
   docker-compose up -d
   ```

2. Run the backend API:
   ```
   dotnet run
   ```

3. In a new terminal, navigate to the frontend directory and start the React application:
   ```
   cd ../frontend
   npm run dev
   ```

### Accessing the Application
- Frontend: Open your browser and go to `http://localhost:3000`
- Backend API: Access the API at `http://localhost:5000/api`

## Folder Structure
- `public/`: Contains static files like `index.html` and favicon.
- `src/`: Contains all React components, assets, and services.
- `contexts/`: Contains context providers for state management.
- `hooks/`: Contains custom hooks for reusable logic.
- `services/`: Contains API service files for handling requests.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.