import React, { useEffect, useState } from 'react';
import CustomButton from "@/components/custom/CustomButton";
import SolarSystem from "@/components/custom/SolarSystem";
import detectIcon from "@/images/tl.svg";
import classifyIcon from "@/images/tl3.svg";

const Sidenavbar = ({ setMode }) => {
  const [activeTab, setActiveTab] = useState(window.location.pathname);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleTabClick = (path) => {
    setActiveTab(path);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 768;
      setIsMobile(mobileView);
      setIsOpen(!mobileView);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

      <div className={`z-40 fixed left-0 top-0 h-full w-[min(90vw,350px)] bg-slate-950 flex flex-col transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform md:translate-x-0`}>

        <div className="flex flex-col h-full overflow-y-auto px-4 py-6 space-y-6">
          <SolarSystem />
          <h2 className="text-white text-[clamp(1.1rem,1.7vw,1.6rem)] leading-tight p-2">
            EXPERIMENTAL RESULTS & ANALYTICS
          </h2>

          <div className="space-y-3">
            <a
              className={`tab block text-white py-2 px-3 rounded border border-white/30 hover:bg-white/10 transition ${activeTab === '/resnet' ? 'bg-white/10' : ''}`}
              href="/resnet"
              onClick={() => handleTabClick('/resnet')}
            >
              ResNet
            </a>
            <a
              className={`tab block text-white py-2 px-3 rounded border border-white/30 hover:bg-white/10 transition ${activeTab === '/efficientnet' ? 'bg-white/10' : ''}`}
              href="/efficientnet"
              onClick={() => handleTabClick('/efficientnet')}
            >
              EfficientNet
            </a>
            <a
              className={`tab block text-white py-2 px-3 rounded border border-white/30 hover:bg-white/10 transition ${activeTab === '/vgg' ? 'bg-white/10' : ''}`}
              href="/vgg"
              onClick={() => handleTabClick('/vgg')}
            >
              VGG
            </a>
          </div>

          <div className="mt-auto space-y-4 w-full">
            <CustomButton
              text="Classification demo"
              icon={classifyIcon}
              onClick={() => {
                setMode("classification");
                window.location.href = "/";
              }}
            />
            <CustomButton
              text="Object Detection demo"
              icon={detectIcon}
              onClick={() => {
                setMode("detection");
                window.location.href = "/detection";
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidenavbar;
