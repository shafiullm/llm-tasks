import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

// Lazy load the components
const Component1A = lazy(() => import("./1a.jsx"));
const Component1B = lazy(() => import("./1b.jsx"));
const Component1Ideal = lazy(() => import("./1ideal.jsx"));

// Error boundary to handle component errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong while loading the component.</div>;
    }
    return this.props.children;
  }
}

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading component...</div>}>
          <Routes>
            {/* Main page with links */}
            <Route
              path="/"
              element={
                <div>
                  <h1>Welcome to the App</h1>
                  <nav>
                    <ul>
                      <li>
                        <Link to="/1a">Go to 1A</Link>
                      </li>
                      <li>
                        <Link to="/1b">Go to 1B</Link>
                      </li>
                      <li>
                        <Link to="/1ideal">Go to 1Ideal</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              }
            />
            {/* Render components as separate pages */}
            <Route path="/1a" element={<Component1A />} />
            <Route path="/1b" element={<Component1B />} />
            <Route path="/1ideal" element={<Component1Ideal />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
