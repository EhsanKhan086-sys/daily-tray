import { useMenu } from "../context/MenuContext.jsx";

function SkeletonGrid() {
  return (
    <div className="grid" aria-hidden="true">
      {Array.from({ length: 6 }, (_, i) => (
        <div className="skeleton" key={i}>
          <div className="skeleton__media" />
          <div className="skeleton__line" />
          <div className="skeleton__line skeleton__line--short" />
        </div>
      ))}
    </div>
  );
}

/** Shows loading / error states, otherwise renders children once menu.json is ready. */
export default function DataGate({ children }) {
  const { status, error, retry } = useMenu();

  if (status === "loading") {
    return (
      <div aria-busy="true">
        <p className="status status--loading" role="status">Loading today's menu…</p>
        <SkeletonGrid />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="notice notice--error" role="alert">
        <h2>The menu didn't load</h2>
        <p>{error}</p>
        <p>Check your connection, then try again.</p>
        <button type="button" className="btn btn--primary" onClick={retry}>Try again</button>
      </div>
    );
  }

  return children;
}
