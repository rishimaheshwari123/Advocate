import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Navbar from "./components/comman/Navbar";
import Contact from "./pages/Contact";
import Inquiry from "./pages/Inquiry";
import SubNavbar from "./components/comman/SubNavbar";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OpenRoute from "./components/admin/auth/OpenRoute";
import PrivateRoute from "./components/admin/auth/PrivateRoute";
import Layout from "./components/admin/page/Layout";
import Dashboard from "./components/admin/page/Dashboard";
import Footer from "./components/comman/Footer";
import AddGallery from "./components/admin/page/AddGallery";
import GetGallery from "./components/admin/page/GetGallery";
import Gallery from "./pages/Gallery";
import CreateCompany from "./components/admin/page/CreateCompany";
import GetComapny from "./components/admin/page/GetComapny";
import CompanyLogin from "./pages/CompanyLogin";

const App = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { company } = useSelector((state) => state.company);

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isCompanyRoute = location.pathname.startsWith("/company");

  return (
    <div>
      {!isAdminRoute && !isCompanyRoute && <SubNavbar />}
      {!isAdminRoute && !isCompanyRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="/companies-login"
          element={
            <OpenRoute>
              <CompanyLogin />
            </OpenRoute>
          }
        />
        <Route
          path="/register"
          element={
            <OpenRoute>
              <Register />
            </OpenRoute>
          }
        />

        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          {user?.role === "SuperAdmin" && (
            <>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/addGallery" element={<AddGallery />} />
              <Route path="/admin/getGallery" element={<GetGallery />} />
              <Route path="/admin/addCompany" element={<CreateCompany />} />
              <Route path="/admin/getCompany" element={<GetComapny />} />
            </>
          )}

          {company?.role === "Company" && (
            <>
              <Route path="/company/dashboard" element={<Dashboard />} />
            </>
          )}
        </Route>
      </Routes>

      {!isAdminRoute && !isCompanyRoute && <Footer />}
    </div>
  );
};

export default App;