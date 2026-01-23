import { Card } from "@/components/ui/card";
import { Store } from "lucide-react";
import { NavLink } from "react-router-dom";

export function Header() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium ${
      isActive ? "text-primary" : "text-muted-foreground"
    }`;

  return (
    <Card className="rounded-none border-x-0 border-t-0">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            <span className="text-lg font-semibold">
              Supermarket Profit System
            </span>
          </div>

          <nav className="flex gap-4">
            <NavLink to="/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/upload" className={linkClass}>
              Upload
            </NavLink>
            <NavLink to="/preview" className={linkClass}>
              Data Preview
            </NavLink>
          </nav>
        </div>

        <span className="text-sm text-muted-foreground">
          Phase 1 – UI Only
        </span>
      </div>
    </Card>
  );
}
