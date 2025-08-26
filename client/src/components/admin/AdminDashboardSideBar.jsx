import React from "react";
import { NavLink } from "react-router-dom";
import { FiArrowDown, FiBox, FiFileText, FiUsers, FiX } from "react-icons/fi";

const AdminDashboardSideBar = ({ sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    {
      label: "Products",
      icon: <FiBox />,
      subItems: [
        {
          label: "📄 Get All Products",
          href: "/admin/products/manage-products",
        },
        { label: "➕ Create Product", href: "/admin/products/create-product" },
        { label: "✏️ Update Product", href: "/admin/products/edit/:id" },
        { label: "🗑️ Delete Product", href: "/admin/products/delete/:id" },
      ],
    },
    {
      label: "Blogs",
      icon: <FiFileText />,
      subItems: [
        { label: "📄 Get All Blogs", href: "/admin/blogs/get-all" },
        { label: "➕ Create Blog", href: "/admin/blogs/create" },
        { label: "✏️ Update Blog", href: "/admin/blogs/edit/:id" },
        { label: "🗑️ Delete Blog", href: "/admin/blogs/delete/:id" },
      ],
    },
    {
      label: "Users",
      icon: <FiUsers />,
      subItems: [
        { label: "📄 Get All Users", href: "/admin/users/manage-users" },
        { label: "➕ Create User", href: "/admin/users/create-user" },
        { label: "✏️ Update User", href: "/admin/users/edit/:id" },
        { label: "🗑️ Delete User", href: "/admin/users/delete/:id" },
      ],
    },
  ];

  const renderMenu = () => (
    <ul className="space-y-4 text-white text-sm mt-4">
      {menuItems.map((item, idx) => (
        <li key={idx}>
          <details className="group">
            <summary className="flex items-center justify-between w-full px-4 py-2 cursor-pointer font-semibold rounded-lg hover:bg-blue-500/70 transition">
              <span className="flex items-center gap-2">
                {item.icon} {item.label}
              </span>
              <span className="transition-transform group-open:rotate-180">
                <FiArrowDown />
              </span>
            </summary>

            <ul className="mt-1 space-y-1">
              {item.subItems.map((sub, subIdx) => (
                <li key={subIdx}>
                  <NavLink
                    to={sub.href}
                    className={({ isActive }) =>
                      `block w-full px-4 py-2 rounded-lg transition ${
                        isActive
                          ? "bg-blue-500 text-white font-medium"
                          : "hover:bg-blue-400/60"
                      }`
                    }
                  >
                    {sub.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </details>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-gradient-to-b from-blue-700 to-blue-600 text-white shadow-xl sticky top-0">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 tracking-wide">
            ⚙️ Admin Panel
          </h2>
          {renderMenu()}
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity lg:hidden ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <aside
          className={`absolute left-0 top-0 min-h-screen w-64 bg-gradient-to-b from-blue-700 to-blue-600 text-white transform transition-transform shadow-xl ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">⚙️ Admin Panel</h2>
              <button onClick={() => setSidebarOpen(false)}>
                <FiX size={26} />
              </button>
            </div>
            {renderMenu()}
          </div>
        </aside>
      </div>
    </>
  );
};

export default AdminDashboardSideBar;
