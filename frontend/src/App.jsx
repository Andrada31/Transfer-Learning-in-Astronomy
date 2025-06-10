import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ModeProvider } from "@/lib/ModeContext";
import Sidenavbar from "@/components/custom/Sidenavbar";
import Home from "./pages/Home";
import ResNet from "./pages/ResNet";
import EfficientNet from "./pages/EfficientNet";
import VGG from "./pages/VGG";
import Yolo from "./pages/Yolo";

function App() {
  return (
    <ModeProvider>
      <Router>
        <div className="flex min-h-screen">
          <Sidenavbar />
          <div className="flex-grow px-4 md:px-8 pt-5 fade-in">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/detection" element={<Home mode="detection" />} />
              <Route path="/resnet" element={<ResNet />} />
              <Route path="/efficientnet" element={<EfficientNet />} />
              <Route path="/vgg" element={<VGG />} />
              <Route path="/yolo" element={<Yolo />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ModeProvider>
  );
}

export default App;
