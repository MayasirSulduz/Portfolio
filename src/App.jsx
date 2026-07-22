import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

function App() {
    return (
        <div className="app-main-wrapper">
            <Navbar />
            <main>
                <Home />
                <About />
                <Skills />
                <Projects />
                <Contact />
            </main>
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
    );
}

export default App;