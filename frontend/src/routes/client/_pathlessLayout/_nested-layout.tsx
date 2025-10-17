import { createFileRoute } from "@tanstack/react-router";
import { Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/client/_pathlessLayout/_nested-layout")({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <div>
      <div>I'm a nested pathless layout</div>
      <div className="flex gap-2 border-b">
        <Link
          to="/client/route-a"
          activeProps={{
            className: "font-bold",
          }}
        >
          Go to route A
        </Link>
        <Link
          to="/client/route-b"
          activeProps={{
            className: "font-bold",
          }}
        >
          Go to route B
        </Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
