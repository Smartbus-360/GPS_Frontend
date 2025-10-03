import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const role = localStorage.getItem("role");

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <Sidebar role={role} />
      </aside>

      {/* Main content */}
      <main className="main-content">{children}</main>
    </div>
  );
}
