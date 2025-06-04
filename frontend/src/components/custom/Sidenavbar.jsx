import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import CustomButton from "@/components/custom/CustomButton";
import SolarSystem from "@/components/custom/SolarSystem";
import detectIcon from "@/images/eye2.svg";
import classifyIcon from "@/images/tl3.svg";
import { useMode } from "@/lib/ModeContext"; // <- import context safely

const Sidenavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Use context if available (only safe on Home routes)
  let setMode = null;
  try {
    ({ setMode } = useMode());
  } catch (e) {
    // If useMode fails outside context, ignore it gracefully
    setMode = null;
  }

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 768;
      setIsMobile(mobileView);
      setIsOpen(!mobileView);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTabClick = (path) => {
    setActiveTab(path);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-md"
          onClick={toggleSidebar}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      )}

      <div
        className={`z-40 fixed left-0 top-0 h-full w-[min(90vw,350px)] bg-slate-950 flex flex-col transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform md:translate-x-0`}
      >
        <div className="flex flex-col h-full overflow-y-auto px-4 pt-5 space-y-6 custom-scrollbar">
          <SolarSystem />
          <h2 className="text-white text-[clamp(1.1rem,1.7vw,1.6rem)] leading-tight p-2 flex items-center">
            EXPERIMENTAL RESULTS & ANALYTICS
          </h2>

          <div className="space-y-3">
            <a
              className={`tab block text-white py-2 px-3 rounded border border-white/30 hover:bg-white/10 transition ${
                activeTab === '/resnet' ? 'bg-white/10' : ''
              }`}
              href="/resnet"
              onClick={() => handleTabClick('/resnet')}
            >
              ResNet
            </a>
            <a
              className={`tab block text-white py-2 px-3 rounded border border-white/30 hover:bg-white/10 transition ${
                activeTab === '/efficientnet' ? 'bg-white/10' : ''
              }`}
              href="/efficientnet"
              onClick={() => handleTabClick('/efficientnet')}
            >
              EfficientNet
            </a>
            <a
              className={`tab block text-white py-2 px-3 rounded border border-white/30 hover:bg-white/10 transition ${
                activeTab === '/vgg' ? 'bg-white/10' : ''
              }`}
              href="/vgg"
              onClick={() => handleTabClick('/vgg')}
            >
              VGG
            </a>
            <a
              className={`tab block text-white py-2 px-3 rounded border border-white/30 hover:bg-white/10 transition ${
                activeTab === '/yolo' ? 'bg-white/10' : ''
              }`}
              href="/yolo"
              onClick={() => handleTabClick('/yolo')}
            >
              YOLO
            </a>
          </div>

          <div className="flex flex-col h-full">
            <div className="mt-auto w-full pb-0">
              <CustomButton
                text="Classification >>"
                icon={classifyIcon}
                active={activeTab === '/'}
                onClick={() => {
                  if (setMode) setMode("classification");
                  navigate("/");
                  setActiveTab("/");
                }}
              />

              <CustomButton
                text="Object Detection >>"
                icon={detectIcon}
                active={activeTab === '/detection'}
                onClick={() => {
                  if (setMode) setMode("detection");
                  navigate("/detection");
                  setActiveTab("/detection");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidenavbar;
