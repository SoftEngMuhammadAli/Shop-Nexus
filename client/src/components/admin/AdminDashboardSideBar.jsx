// src/components/admin/AdminDashboardSideBar.jsx
import React from "react";
import { FiBox, FiFileText, FiX } from "react-icons/fi";

const AdminDashboardSideBar = ({ sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    {
      label: "Products",
      icon: <FiBox />,
      subItems: [
        { label: "📄 Get All Products", href: "/admin/manage-products" },
        { label: "➕ Create Product", href: "/admin/create-product" },
        {
          label: "✏️ Update Product",
          href: "/admin/products/edit/:id",
        },
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
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-blue-600 rounded-tr-[50px] text-white p-6 space-y-6">
        <h2 className="text-xl font-bold">Admin Menu</h2>
        <ul className="space-y-6 text-white text-sm">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <div className="flex items-center gap-2 font-semibold">
                {item.icon} {item.label}
              </div>
              <ul className="ml-6 mt-2 space-y-2">
                {item.subItems.map((sub, subIdx) => (
                  <li key={subIdx}>
                    <a href={sub.href} className="block hover:underline">
                      {sub.label}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity lg:hidden ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <aside
          className={`absolute left-0 top-0 h-full w-64 bg-blue-600 text-white p-6 space-y-6 transform transition-transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Admin Menu</h2>
            <button onClick={() => setSidebarOpen(false)}>
              <FiX size={26} />
            </button>
          </div>

          {/* Menu List */}
          <ul className="space-y-6 text-white text-sm mt-6">
            {menuItems.map((item, idx) => (
              <li key={idx}>
                <div className="flex items-center gap-2 font-semibold">
                  {item.icon} {item.label}
                </div>
                <ul className="ml-6 mt-2 space-y-2">
                  {item.subItems.map((sub, subIdx) => (
                    <li key={subIdx}>
                      <a href={sub.href} className="block hover:underline">
                        {sub.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
};

export default AdminDashboardSideBar;
