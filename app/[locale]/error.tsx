'use client';

import '../../src/cssComponents/ErrorBoundary.css';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="error-boundary">
      <h1>Something went wrong.</h1>
      <p>Try going back or refreshing the page.</p>
      <button onClick={() => reset()} className="error-reset-button">
        Back
      </button>
    </div>
  );
}
