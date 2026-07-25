import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import AIChatAssistant from "./components/AIChatAssistant";
import PetLeo from "./components/PetLeo";
import HuskyModelViewer from "./components/HuskyModelViewer";
import { PetProvider } from "./context/PetContext";

function App() {
    const [isHuskyViewerOpen, setIsHuskyViewerOpen] = useState(false);

    return (
        <PetProvider>
            <div className="app-main-wrapper">
                {/* 3D Pet Husky Leo Layer */}
                <PetLeo />

                <Navbar onOpenHuskyViewer={() => setIsHuskyViewerOpen(true)} />
                <main>
                    <Home />
                    <About />
                    <Skills />
                    <Projects />
                    <Contact />
                </main>

                {/* Standalone Interactive Features */}
                <AIChatAssistant />
                <HuskyModelViewer
                    isOpen={isHuskyViewerOpen}
                    onClose={() => setIsHuskyViewerOpen(false)}
                />

                <footer className="footer-bar">
                    <div className="container footer-content">
                        <p>© {new Date().getFullYear()} Siddavatam Sulduz. All rights reserved.</p>
                        <div className="footer-links">
                            <a href="https://github.com/MayasirSulduz" target="_blank" rel="noreferrer">GitHub</a>
                            <a href="https://www.linkedin.com/in/mayasir-sulduz" target="_blank" rel="noreferrer">LinkedIn</a>
                            <a href="#home">Back to Top ↑</a>
                        </div>
                    </div>
                </footer>
            </div>
        </PetProvider>
    );
}

export default App;