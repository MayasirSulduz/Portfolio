// function About() {
//     return (
//         <section id="about" className="section">
//             <h1>About Section</h1>
//             <p>Add your about content here.</p>
//         </section>
//     );
// }

// export default About;










import "../styling/About.css";

function About() {
    return (
        <div className="about-container container">

            {/* Left side – Text content */}
            {/* <section id="about" className="about section">
                <h2 className="about-title">About Me</h2>

                <p className="about-text">
                    I’m a front-end developer focused on building clean,
                    reliable, and user-friendly web interfaces.
                </p>

                <p className="about-text">
                    I enjoy problem-solving, debugging, and working with
                    modern web technologies to deliver thoughtful UI
                    solutions that are easy to use and maintain.
                </p>

                <div className="about-experience">
                    <h3 className="experience-title">Experience</h3>

                    <p className="company">
                        Tata Consultancy Services (TCS)
                    </p>

                    <p className="designation">
                        Front-End Developer
                    </p>

                    <p className="duration">
                        September 2023 — Present
                    </p>

                    <p className="experience-text">
                        Contributing to UI development, testing, and ongoing
                        product enhancements across multiple projects, with
                        an emphasis on quality, usability, and maintainability.
                    </p>
                </div>
            </section> */}

            <section id="about" class="about section">
                <header class="about-header">
                    <h2 class="about-title">About Me</h2>
                </header>

                <div class="about-content">
                    <p class="about-text">
                        I’m a front-end developer focused on building clean, reliable, and user-friendly web interfaces.
                    </p>

                    <p class="about-text">
                        I enjoy problem-solving, debugging, and working with modern web technologies to deliver thoughtful UI solutions that are easy to use and maintain.
                    </p>
                </div>

                <div class="about-experience">
                    <h3 class="experience-title">Experience</h3>

                    <article class="experience-item">
                        <h4 class="company">Tata Consultancy Services (TCS)</h4>
                        <p class="designation">Front-End Developer</p>
                        <p class="duration">September 2023 — Present</p>
                        <p class="experience-text">
                            Contributing to UI development, testing, and ongoing product enhancements across multiple projects, with an emphasis on quality, usability, and maintainability.
                        </p>
                    </article>
                </div>
            </section>


            {/* Right side – Anime / Illustration */}
            <div className="about-avatar">
                <img
                    src="src/assets/About.png"
                    alt="Anime Illustration"
                />
            </div>

        </div>
    );
}

export default About;
