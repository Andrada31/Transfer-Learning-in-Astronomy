
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ResNet from './pages/ResNet';
import EfficientNet from "@/pages/EfficientNet";
import VGG from "@/pages/VGG";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detection" element={<Home mode="detection" />} />
        <Route path="/resnet" element={<ResNet />} />
        <Route path="/efficientnet" element={<EfficientNet />} />
        <Route path="/vgg" element={<VGG />} />
      </Routes>
    </Router>
  );
}

export default App;
