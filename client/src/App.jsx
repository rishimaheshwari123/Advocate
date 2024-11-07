import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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

const App = () => {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div>
      {!isAdminRoute && <SubNavbar />}
      {!isAdminRoute && <Navbar />}

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
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/addGallery"
            element={
              <PrivateRoute>
                <AddGallery />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/getGallery"
            element={
              <PrivateRoute>
                <GetGallery />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/addCompany"
            element={
              <PrivateRoute>
                <CreateCompany />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>

      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default App;
