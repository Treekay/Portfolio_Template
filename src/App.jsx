import "./App.css";
import AboutMePage from "./components/AboutMePage";
import Hero from "./components/Hero";
import ProjectPage from "./components/ProjectPage";
import SkillSection from "./components/SkillSection";
import skillCategories from "./data/skills";
import Footer from "./components/Footer";
import profile from "./data/profile";
import aboutMeSections from "./data/aboutMe";
import projects from "./data/projects";

function App() {
  const academicSections = aboutMeSections.filter(
    (section) => section.id === "courses"
  );
  const lifeSections = aboutMeSections.filter(
    (section) => section.id === "life"
  );
  const lastProjectId = projects[projects.length - 1]?.id ?? "project-1";

  return (
    <>
      <Hero
        heroName={profile.name}
        description={profile.description}
        backgroundImage="/bg.svg"
        nextSectionId="more-about"
        typingSpeed={35}
        aboutSectionId="more-about"
      />
      <AboutMePage
        sections={academicSections}
        id="more-about"
        title="About Me"
        prevSectionId="hero"
        nextSectionId="project-1"
      />
      <ProjectPage />
      <SkillSection
        categories={skillCategories}
        id="skills"
        prevSectionId={lastProjectId}
        nextSectionId="life"
      />
      <AboutMePage
        sections={lifeSections}
        id="life"
        title="Life Outside Work"
        prevSectionId="skills"
      />
      <Footer />
    </>
  );
}

export default App;
