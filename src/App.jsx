import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import ErrorBoundary from "./components/ErrorBoundary";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Hotel from "./components/Hotel";
import Sightseeing from './components/Sightseeing';
import Restaurant from "./components/Restaurant";
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/hotel" element={<Hotel/>} />
            <Route path="/sightseeing" element={<Sightseeing />} />
            <Route path="/restaurant" element={<Restaurant />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;