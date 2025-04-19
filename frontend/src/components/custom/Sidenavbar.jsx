import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import CustomButton from "@/components/custom/CustomButton";
import SolarSystem from "@/components/custom/SolarSystem";
import detectIcon from "@/images/eye2.svg";
import classifyIcon from "@/images/tl3.svg";
import analyticsIcon from "@/images/exp3.svg";
import {ScanEye} from "lucide-react";

const Sidenavbar = ({ setMode }) => {
  const [activeTab, setActiveTab] = useState(window.location.pathname);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate(); // 🧭 Like a GPS but sassier


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

        <div className="flex flex-col h-full overflow-y-auto px-4 pt-6 space-y-6">
          <SolarSystem/>
          <h2 className="text-white text-[clamp(1.1rem,1.7vw,1.6rem)] leading-tight p-2 flex items-center">
            {/*<img*/}
            {/*    src={analyticsIcon}*/}
            {/*    alt="Analytics Icon"*/}
            {/*    className="w-19 h-19"*/}
            {/*/>*/}
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
            <a
                className={`tab block text-white py-2 px-3 rounded border border-white/30 hover:bg-white/10 transition ${activeTab === '/vgg' ? 'bg-white/10' : ''}`}
                href="/yolo"
                onClick={() => handleTabClick('/vgg')}
            >
              YOLO
            </a>
          </div>

          <div className="flex flex-col h-full">
            {/* Your existing content above */}

            <div className="mt-auto w-full pb-0">
              <CustomButton
                  text="Classification >>"
                  icon={classifyIcon}
                  onClick={() => {
                    setMode("classification");
                    navigate("/");
                  }}
              />
              <CustomButton
                  text="Object Detection >>"
                  icon={detectIcon}
                  onClick={() => {
                    setMode("detection");
                   navigate("/detection");
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
