import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="notice">
      <h1>This page isn't on the menu</h1>
      <p>The link may be old or mistyped.</p>
      <Link to="/" className="btn btn--primary">Go to today's menu</Link>
    </div>
  );
}
