import Hero from "./components/Hero";
import ProjectPage from "./components/ProjectPage";
import SkillSection from "./components/SkillSection";
import skillCategories from "./data/skills";
import Footer from "./components/Footer";
import profile from "./data/profile";

function App() {
  return (
    <>
      <Hero
        heroName={profile.name}
        description={profile.description}
        backgroundImage="/bg.jpg"
        nextSectionId="project-1"
        typingSpeed={35}
      />
      <ProjectPage />
      <SkillSection categories={skillCategories} id={"skills"} />
      <Footer />
    </>
  );
}

export default App;
