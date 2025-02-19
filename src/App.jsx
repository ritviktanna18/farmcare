import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PlantAnalysis from './components/PlantAnalysis';
import PestAnalysis from './pages/PestAnalysis';
import News from './pages/News';
import Forum from './pages/Forum';
import VegetablePricePrediction from './pages/VegetablePricePrediction';
import LandLease from './pages/LandLease';
import SoilAnalysis from './pages/SoilAnalysis';
import FarmerSupport from './pages/FarmerSupport';
import EquipmentLease from './pages/EquipmentLease';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-900 via-green-950 to-green-900">
        <Navbar />
        <main className="flex-grow overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plant-analysis" element={<PlantAnalysis />} />
            <Route path="/pest-analysis" element={<PestAnalysis />} />
            <Route path="/soil-analysis" element={<SoilAnalysis />} />
            <Route path="/price-prediction" element={<VegetablePricePrediction />} />
            <Route path="/farmer-support" element={<FarmerSupport />} />
            <Route path="/land-lease" element={<LandLease />} />
            <Route path="/equipment-lease" element={<EquipmentLease />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;