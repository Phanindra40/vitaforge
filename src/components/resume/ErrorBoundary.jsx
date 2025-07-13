// src/components/ErrorBoundary.jsx
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Something went wrong.</h2>
          <p>{this.state.error?.message || "Unknown error occurred."}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
