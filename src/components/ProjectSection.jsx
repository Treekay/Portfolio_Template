import React, { useEffect, useRef, useState } from "react";
import { FastAverageColor } from "fast-average-color";
import { motion, useScroll, useTransform } from "framer-motion";
import "./ProjectSection.css";
import SectionNav from "./SectionNav";

const MotionDiv = motion.div;

const ProjectSection = ({
  id,
  title,
  period,
  organization,
  techStack = [],
  description,
  image,
  buttonText = "More",
  buttonLink = "#",
  prevSectionId,
  nextSectionId,
  index = 0,
}) => {
  const sectionRef = useRef(null);
  const [bgStyle, setBgStyle] = useState({
    "--project-start": "#08121d",
    "--project-end": "#112430",
  });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const railScale = useTransform(scrollYProgress, [0.18, 0.78], [0, 1]);

  useEffect(() => {
    const fac = new FastAverageColor();
    const img = new Image();

    img.crossOrigin = "anonymous";
    img.src = image;

    img.onload = async () => {
      try {
        const color = await fac.getColorAsync(img);
        const [r, g, b] = color.value;
        const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
        const shade = brightness > 200 ? 0.52 : 0.72;
        const baseR = Math.round(r * shade);
        const baseG = Math.round(g * shade);
        const baseB = Math.round(b * shade);

        setBgStyle({
          "--project-start": `rgb(${Math.max(baseR - 80, 0)}, ${Math.max(
            baseG - 80,
            0,
          )}, ${Math.max(baseB - 80, 0)})`,
          "--project-end": `rgb(${Math.min(baseR + 12, 210)}, ${Math.min(
            baseG + 12,
            210,
          )}, ${Math.min(baseB + 12, 210)})`,
        });
      } catch (error) {
        console.error("Failed to extract image color:", error);
      }
    };

    return () => fac.destroy();
  }, [image]);

  const isReverse = index % 2 === 1;

  return (
    <section className="project-section" id={id} style={bgStyle} ref={sectionRef}>
      <div className="project-atmosphere" />
      <MotionDiv className="project-rail" style={{ scaleY: railScale }} />

      <div className={`project-inner ${isReverse ? "reverse" : ""}`}>
        <MotionDiv
          className="project-info"
          initial={{ opacity: 0, x: isReverse ? 56 : -56 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.38 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
          <h2 className="project-title">{title}</h2>

          <div className="project-meta">
            {period && <p className="project-period">{period}</p>}
            {organization && (
              <p className="project-organization">{organization}</p>
            )}
          </div>

          {techStack.length > 0 && (
            <div className="project-tech-stack" aria-label={`${title} tech stack`}>
              {techStack.map((tech) => (
                <span className="project-tech-chip" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="project-description">
            {Array.isArray(description) ? (
              description.map((item, i) => (
                <p key={i} className="project-desc-item">
                  {item}
                </p>
              ))
            ) : (
              <p className="project-desc-item">{description}</p>
            )}
          </div>

          <a
            className={`project-button ${isReverse ? "btn-right" : ""}`}
            href={buttonLink}
            target={buttonLink.startsWith("http") ? "_blank" : "_self"}
            rel={buttonLink.startsWith("http") ? "noreferrer" : undefined}
          >
            {buttonText}
          </a>
        </MotionDiv>

        <MotionDiv
          className="project-media"
          style={{ y: imageY }}
          initial={{ opacity: 0, scale: 0.94, rotate: isReverse ? -2 : 2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.36 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={image} alt={title} className="project-image" />
        </MotionDiv>
      </div>

      <SectionNav
        prevSectionId={prevSectionId}
        nextSectionId={nextSectionId}
        previousLabel={`Previous section before ${title}`}
        nextLabel={`Next section after ${title}`}
      />
    </section>
  );
};

export default ProjectSection;
