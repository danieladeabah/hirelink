import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="HireLink"
            width={36}
            height={36}
            decoding="async"
            fetchPriority="high"
            className="h-9 w-auto rounded-xl"
          />
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              Jobs
            </Button>
          </Link>
          <Link to="/recruiter">
            <Button variant="outline" size="sm">
              Recruiter
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
