import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const Component1A = lazy(() => import("./1a.jsx"));
const Component1B = lazy(() => import("./1b.jsx"));
const Component1Ideal = lazy(() => import("./1ideal.jsx"));
const Component2A = lazy(() => import("./40921_1a.jsx"));
const Component2B = lazy(() => import("./40921_1b.jsx"));
const Component2Ideal = lazy(() => import(".//40921_1ideal.jsx"));

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
            <Route
              path="/"
              element={
                <div>
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
                    <ul>
                      <li>
                        <Link to="/40921_1a">Go to 40921_1A</Link>
                      </li>
                      <li>
                        <Link to="/40921_1b">Go to 40921_1B</Link>
                      </li>
                      <li>
                        <Link to="/40921_1ideal">Go to 40921_1ideal</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              }
            />
            <Route path="/1a" element={<Component1A />} />
            <Route path="/1b" element={<Component1B />} />
            <Route path="/1ideal" element={<Component1Ideal />} />
            <Route path="/40921_1a" element={<Component2A />} />
            <Route path="/40921_1b" element={<Component2B />} />
            <Route path="/40921_1ideal" element={<Component2Ideal />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
