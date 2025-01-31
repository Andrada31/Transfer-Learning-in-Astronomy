import React, { useState } from 'react';
import CustomButton from "@/components/custom/CustomButton";

const Sidenavbar = () => {
    const [activeTab, setActiveTab] = useState(window.location.pathname);

    const handleTabClick = (path) => {
        setActiveTab(path);
    };

    return (
        <div className="fixed left-0 top-0 h-full w-[350px] bg-slate-950 flex flex-col px-5">
            <div className="p-4">
                <h2 className="text-2xl pt-15">EXPERIMENTAL RESULTS & ANALYTICS</h2>
            </div>
            <div>
                <a
                    className={`tab ${activeTab === '/resnet' ? 'active' : ''}`}
                    href="/resnet"
                    onClick={() => handleTabClick('/resnet')}
                >
                    ResNet
                </a>
                <a
                    className={`tab ${activeTab === '/efficientnet' ? 'active' : ''}`}
                    href="/efficientnet"
                    onClick={() => handleTabClick('/efficientnet')}
                >
                    EfficientNet
                </a>
                <a
                    className={`tab ${activeTab === '/vgg' ? 'active' : ''}`}
                    href="/vgg"
                    onClick={() => handleTabClick('/vgg')}
                >
                    VGG
                </a>
                <a
                    className="tool-tab"
                    href="/frontend/public"
                >
                    &gt; Start classification
                </a>
            </div>
        </div>
    );
}

export default Sidenavbar;