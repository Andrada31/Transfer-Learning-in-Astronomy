import React, {useEffect, useState} from 'react';

const Sidenavbar = () => {
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
            setIsOpen(!mobileView); // Close on mobile, open on desktop
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div>
            {/* Toggle Button for Mobile */}
            {isMobile && (
                <button
                    className="fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-md"
                    onClick={toggleSidebar}
                >
                    {isOpen ? "✕" : "☰"}
                </button>
            )}
            <div className={`z-9 fixed left-0 top-0 h-full w-sm bg-slate-950 flex flex-col px-5 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform md:translate-x-0`}>
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
                        className="text-white text-lg mt-10 block transition-colors duration-300 border-none bg-[#5298e3] hover:bg-[#6ac9ca] p-2 rounded"
                        href="/"
                    >
                        &gt; Start classification
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Sidenavbar;