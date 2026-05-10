import "./SkillSection.css";
import { motion } from "framer-motion";
import SectionNav from "./SectionNav";

const MotionDiv = motion.div;
const MotionH2 = motion.h2;

const SkillTag = ({ name, index }) => {
  return (
    <MotionDiv
      className="skill-tag"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{
        duration: 0.38,
        delay: Math.min(index * 0.035, 0.18),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -3 }}
    >
      <span className="skill-tag-dot" />
      <span>{name}</span>
    </MotionDiv>
  );
};

const SkillsSection = ({ categories, id = "skills", prevSectionId, nextSectionId }) => {
  return (
    <section className="skills-section" id={id}>
      <div className="skills-shell">
        <MotionH2
          className="skills-section-title"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
        >
          Skills & Tools
        </MotionH2>

        <div className="skills-list">
          {categories.map((category, categoryIndex) => (
            <MotionDiv
              key={category.title}
              className="skills-row"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.5,
                delay: categoryIndex * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="skills-row-heading">
                <span className="skills-row-index">
                  {String(categoryIndex + 1).padStart(2, "0")}
                </span>
                <h3>{category.title}</h3>
              </div>

              <div className="skills-tags">
                {category.skills.map((skill, index) => (
                  <SkillTag key={skill.name} name={skill.name} index={index} />
                ))}
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
      <SectionNav
        prevSectionId={prevSectionId}
        nextSectionId={nextSectionId}
        previousLabel="Previous section before skills"
        nextLabel="Next section after skills"
      />
    </section>
  );
};

export default SkillsSection;
