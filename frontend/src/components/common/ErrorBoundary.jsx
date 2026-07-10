import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error) {
    console.log(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950">

          <div className="text-center">

            <h1 className="text-4xl font-bold text-white">
              Something went wrong
            </h1>

            <button
              onClick={() => window.location.reload()}
              className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 text-white"
            >
              Reload
            </button>

          </div>

        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;