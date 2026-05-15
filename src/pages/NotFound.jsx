import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <div className="container text-center py-5">
        <h1 className="display-4">404</h1>
        <p className="lead text-muted">Page not found. Use the button below to return to the landing page.</p>
        <Link className="btn btn-primary" to="/">Return Home</Link>
      </div>
    </div>
  );
}

export default NotFound;
