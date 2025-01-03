import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import TopMenu  from './TopMenu';
import DodecahedronDisplay from './DodecahedronRotatable';

// Example page components
const Home = () => <DodecahedronDisplay/>;
const About = () => <div className="p-4">About Page</div>;
const Services = () => <div className="p-4">Services Page</div>;
const Contact = () => <div className="p-4">Contact Page</div>;

// Navigation wrapper component
const Navigation = () => {
  const navigate = useNavigate();
  
  return (
    <TopMenu 
      onNavigate={(path:string) => navigate(path)}
    />
  );
};

const Layout = () => {
  return (
    <div className="min-h-screen flex justify-center">
      {/* Container to limit width and center content */}
      <div className="w-full max-w-7xl">
        {/* Persistent Header */}
        <header className="fixed top-0 left-0 right-0 bg-white shadow z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-xl font-bold">My App</h1>
              <Navigation />
            </div>
          </div>
        </header>
        {/* Main content with padding for header */}
        <main className="pt-16 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default App;