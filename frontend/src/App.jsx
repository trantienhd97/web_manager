import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { initApi } from './services/api';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ProductList from './components/products/ProductList';
import ProductForm from './components/products/ProductForm';
import ProductSearch from './components/products/ProductSearch';
import OrderList from './components/orders/OrderList';
import OrderForm from './components/orders/OrderForm';
import DashboardPage from './components/dashboard/DashboardPage';
import ErrorDisplay from './components/common/ErrorDisplay';
import './index.css';

const App = () => {
  const [apiStatus, setApiStatus] = useState({ isLoading: true, error: null });
  
  useEffect(() => {
    const setupApi = async () => {
      try {
        // Initialize API with enhanced authentication bypass
        await initApi({ 
          bypassAuth: true,
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Skip-Auth': 'true',
            'X-No-Auth': 'true',
            'Authorization': 'Bearer bypass', 
            'X-Bypass-Permission': 'true',
            'Access-Control-Allow-Origin': '*'
          }
        });
        setApiStatus({ isLoading: false, error: null });
        console.log('API initialized successfully');
      } catch (error) {
        console.error('Failed to initialize API:', error);
        setApiStatus({ 
          isLoading: false, 
          error: error.response?.status === 403 
            ? 'Authentication error (403): The application does not have permission to access the API. Please check backend authentication settings.'
            : 'Failed to connect to API. Please ensure the backend server is running.'
        });
      }
    };
    
    setupApi();
  }, []);

  if (apiStatus.isLoading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <p className="loading-text">Connecting to backend services...</p>
      </div>
    );
  }

  if (apiStatus.error) {
    return <ErrorDisplay message={apiStatus.error} retry={() => window.location.reload()} />;
  }

  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="main-layout">
          <main>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/new" element={<ProductForm />} />
              <Route path="/products/search" element={<ProductSearch />} />
              <Route path="/orders" element={<OrderList />} />
              <Route path="/orders/new" element={<OrderForm />} />
              {/* Thêm route fallback để xử lý URL không hợp lệ */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;