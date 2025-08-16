import React from "react";

const AppFooter = () => {
  return (
    <footer className="bg-blue-600 text-white text-center py-4 mt-10">
      © {new Date().getFullYear()} Shop Nexus. All rights reserved.
    </footer>
  );
};

export default AppFooter;
