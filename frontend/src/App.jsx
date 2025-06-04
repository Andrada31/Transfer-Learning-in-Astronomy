import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ModeProvider } from "@/lib/ModeContext";
import Layout from "./Layout";
import Home from "./pages/Home";
import ResNet from "./pages/ResNet";
import EfficientNet from "./pages/EfficientNet";
import VGG from "./pages/VGG";
import Yolo from "./pages/Yolo";

function App() {
  return (
    <ModeProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/detection" element={<Home mode="detection" />} />
            <Route path="/resnet" element={<ResNet />} />
            <Route path="/efficientnet" element={<EfficientNet />} />
            <Route path="/vgg" element={<VGG />} />
            <Route path="/yolo" element={<Yolo />} />
          </Route>
        </Routes>
      </Router>
    </ModeProvider>
  );
}

export default App;
