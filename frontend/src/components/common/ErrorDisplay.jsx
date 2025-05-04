import React from 'react';

const ErrorDisplay = ({ message, error, retry }) => {
  // If a direct message is provided, use it (comes from our App component)
  let errorMessage = message || "An unknown error occurred.";
  let errorDetails = null;
  let troubleshootingSteps = null;
  
  // Handle error objects if passed directly
  if (error) {
    // Network error (no response)
    if (error.message === 'Network Error') {
      errorMessage = "Network Error: Could not connect to server.";
      errorDetails = "The server might be offline or unreachable. Please check your internet connection and make sure the backend server is running.";
      troubleshootingSteps = [
        "Make sure the backend server is running (either Python or .NET)",
        "Check if port 5000 or 5001 is being used by another application",
        "Verify your firewall isn't blocking the connection"
      ];
    } 
    // Server error with response
    else if (error.response) {
      const { status } = error.response;
      errorMessage = `Server Error: ${status}`;
      
      if (status === 404) {
        errorDetails = "The requested resource was not found.";
      } else if (status === 403) {
        errorMessage = "Authentication Error (403 Forbidden)";
        errorDetails = "The application does not have permission to access the API.";
        troubleshootingSteps = [
          "Check if authentication is required in your backend configuration",
          "Verify CORS settings in your backend are allowing requests from localhost:3000",
          "Try restarting both the frontend and backend servers"
        ];
      } else if (status === 401) {
        errorDetails = "You need to be authenticated to access this resource.";
      } else if (status >= 500) {
        errorDetails = "The server encountered an error. Please try again later.";
      }
    } 
    // Other errors
    else {
      errorMessage = error.message || errorMessage;
    }
  }

  return (
    <div className="error-container" style={styles.container}>
      <h3 className="error-title" style={styles.title}>Error</h3>
      <p className="error-message" style={styles.message}>{errorMessage}</p>
      {errorDetails && <p className="error-details" style={styles.details}>{errorDetails}</p>}
      
      {troubleshootingSteps && (
        <div className="troubleshooting" style={styles.troubleshooting}>
          <h4>Troubleshooting Steps:</h4>
          <ul>
            {troubleshootingSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
      )}
      
      {retry && (
        <button className="error-retry-button" style={styles.button} onClick={retry}>
          Try Again
        </button>
      )}
    </div>
  );
};

// Inline styles for better default appearance
const styles = {
  container: {
    padding: '20px',
    margin: '20px auto',
    maxWidth: '600px',
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  title: {
    color: '#d32f2f',
    marginTop: 0
  },
  message: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '12px'
  },
  details: {
    marginBottom: '16px',
    color: '#555'
  },
  troubleshooting: {
    backgroundColor: '#f5f5f5',
    padding: '12px',
    borderRadius: '4px',
    marginBottom: '16px'
  },
  button: {
    backgroundColor: '#2196f3',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  }
};

export default ErrorDisplay;