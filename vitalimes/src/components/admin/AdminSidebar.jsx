import { Link, NavLink } from "react-router-dom";
import { Menu, User, Package, ShoppingBag, Users } from "lucide-react";
import { useState } from "react";

export default function AdminTopNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full shadow-sm border-b bg-white sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <img src="/vitalogo.svg" className="w-36" alt="Vitalimes" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">

          <TopItem to="/admin/dashboard" label="Dashboard" icon={<User className="h-5 w-5" />} />
          <TopItem to="/admin/products" label="Products" icon={<Package className="h-5 w-5" />} />
          <TopItem to="/admin/categories" label="Categories" icon={<Users className="h-5 w-5" />} />

          <DropdownMenu
            label="Orders"
            icon={<ShoppingBag className="h-5 w-5" />}
            items={[
              { label: "Order List", to: "/admin/orders" },
              { label: "Order Details", to: "/admin/order-details" },
            ]}
          />

          <DropdownMenu
            label="Users"
            icon={<Users className="h-5 w-5" />}
            items={[
              { label: "Users", to: "/admin/users" },
              { label: "Create User", to: "/admin/user-create" },
            ]}
          />
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded border"
          onClick={() => setOpen(!open)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-white w-full">
          <MobileItem to="/admin/dashboard" label="Dashboard" />
          <MobileItem to="/admin/products" label="Products" />
          <MobileItem to="/admin/categories" label="Categories" />

          <MobileGroup title="Orders">
            <MobileItem to="/admin/orders" label="Order List" />
            <MobileItem to="/admin/order-details" label="Order Details" />
          </MobileGroup>

          <MobileGroup title="Users">
            <MobileItem to="/admin/users" label="Users" />
            <MobileItem to="/admin/user-create" label="Create User" />
          </MobileGroup>
        </div>
      )}
    </header>
  );
}

/* ---------------- REUSABLE COMPONENTS ---------------- */

function TopItem({ to, label, icon }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-2 text-sm px-3 py-2 rounded-md transition ${
            isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
          }`
        }
      >
        {icon}
        {label}
      </NavLink>
    </li>
  );
}

function DropdownMenu({ label, icon, items }) {
  return (
    <li className="group relative cursor-pointer">
      <div className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-sm">
        {icon}
        {label}
      </div>

      <div className="absolute left-0 top-full hidden group-hover:block bg-white border shadow-md rounded-md w-44 z-50">
        {items.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.to}
            className={({ isActive }) =>
              `block px-4 py-2 text-sm ${
                isActive ? "bg-primary text-white" : "hover:bg-gray-100"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </li>
  );
}

function MobileItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className="block px-4 py-3 border-b text-gray-700 text-sm hover:bg-gray-100"
    >
      {label}
    </NavLink>
  );
}

function MobileGroup({ title, children }) {
  return (
    <div className="border-b">
      <div className="bg-gray-50 px-4 py-2 text-xs uppercase font-semibold text-gray-500">
        {title}
      </div>
      {children}
    </div>
  );
}
