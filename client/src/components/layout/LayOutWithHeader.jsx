// import React from "react";
// import HeaderNav from "../components/HeaderNav";

// export const LayoutWithHeader = ({ children }) => {
//   return (
//     <>
//       <HeaderNav />
//       <main className="p-4">{children}</main>
//     </>
//   );
// };

// export const NoHeaderLayout = ({ children }) => {
//   return <main className="p-4">{children}</main>;
// };

// export const PublicLayout = ({ children }) => {
//   return (
//     <>
//       <HeaderNav />
//       <main className="p-4">{children}</main>
//     </>
//   );
// };

// import { Routes, Route } from "react-router-dom";
// import LayoutWithHeader from "./layouts/LayoutWithHeader";
// import HomePage from "./pages/HomePage";
// import AboutPage from "./pages/AboutPage";
// import LoginPage from "./pages/LoginPage";
// import Dashboard from "./pages/Dashboard";

// function App() {
//   return (
//     <Routes>
//       {/* Routes with Header */}
//       <Route
//         path="/"
//         element={
//           <LayoutWithHeader>
//             <HomePage />
//           </LayoutWithHeader>
//         }
//       />
//       <Route
//         path="/about"
//         element={
//           <LayoutWithHeader>
//             <AboutPage />
//           </LayoutWithHeader>
//         }
//       />

//       {/* Routes without Header */}
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/dashboard" element={<Dashboard />} />
//     </Routes>
//   );
// }

// export default App;
