'use client'
import React, { useState, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
  fallback: React.ReactNode;  // The fallback UI when an error occurs
}

const ErrorBoundary: React.FC<Props> = ({ children, fallback }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error: Error) => {
      setHasError(true);
      console.error('Caught an error:', error);
    };

    // Catch any uncaught errors
    window.addEventListener('error', (event) => handleError(event.error));

    return () => {
      window.removeEventListener('error', (event) => handleError(event.error));
    };
  }, []);

  if (hasError) {
    return <>{fallback}</>;  // Return the fallback UI when error occurs
  }

  return <>{children}</>;
};

export default ErrorBoundary;
