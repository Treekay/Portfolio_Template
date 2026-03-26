import ProjectSection from "./ProjectSection";
import projects from "../data/projects";

const ProjectsPage = () => {
  return (
    <>
      {projects.map((project, index) => (
        <ProjectSection
          key={project.id}
          {...project}
          index={index}
          prevSectionId={index > 0 ? projects[index - 1].id : "hero"}
          nextSectionId={
            index < projects.length - 1 ? projects[index + 1].id : "skills"
          }
        />
      ))}
    </>
  );
};

export default ProjectsPage;
