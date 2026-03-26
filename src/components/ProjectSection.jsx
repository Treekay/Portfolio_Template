import React, { useEffect, useState } from "react";
import { FastAverageColor } from "fast-average-color";
import "./ProjectSection.css";

const ProjectSection = ({
  id,
  title,
  period,
  organization,
  description,
  image,
  buttonText = "More",
  buttonLink = "#",
  prevSectionId,
  nextSectionId,
  index = 0,
}) => {
  const [bgStyle, setBgStyle] = useState({
    background: "linear-gradient(120deg, #a9a198 0%, #d8d0c5 100%)",
  });

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

        let baseR = r;
        let baseG = g;
        let baseB = b;

        if (brightness > 200) {
          baseR = Math.round(r * 0.6);
          baseG = Math.round(g * 0.6);
          baseB = Math.round(b * 0.6);
        }

        const darkColor = `rgb(${Math.max(baseR - 35, 0)}, ${Math.max(
          baseG - 35,
          0
        )}, ${Math.max(baseB - 35, 0)})`;
        const lightColor = `rgb(${Math.min(baseR + 20, 255)}, ${Math.min(
          baseG + 20,
          255
        )}, ${Math.min(baseB + 20, 255)})`;

        setBgStyle({
          background: `linear-gradient(120deg, ${darkColor} 0%, ${lightColor} 100%)`,
        });
      } catch (error) {
        console.error("提取图片主色失败：", error);
      }
    };

    return () => fac.destroy();
  }, [image]);

  const handleScrollTo = (sectionId) => {
    if (!sectionId) return;
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isReverse = index % 2 === 1;

  return (
    <section className="project-section" id={id} style={bgStyle}>
      <div className={`project-inner ${isReverse ? "reverse" : ""}`}>
        <div className="project-info">
          <h2 className="project-title">{title}</h2>

          <div className="project-meta">
            {period && <p className="project-period">{period}</p>}
            {organization && (
              <p className="project-organization">{organization}</p>
            )}
          </div>

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
            className="project-button"
            href={buttonLink}
            target={buttonLink.startsWith("http") ? "_blank" : "_self"}
            rel={buttonLink.startsWith("http") ? "noreferrer" : undefined}
          >
            {buttonText}
          </a>
        </div>

        <div className="project-media">
          <img src={image} alt={title} className="project-image" />
        </div>
      </div>

      {(prevSectionId || nextSectionId) && (
        <div className="project-nav">
          {prevSectionId && (
            <button
              className="project-nav-btn"
              onClick={() => handleScrollTo(prevSectionId)}
              aria-label="Previous project"
            >
              <span className="project-nav-arrow">↑</span>
            </button>
          )}

          {nextSectionId && (
            <button
              className="project-nav-btn"
              onClick={() => handleScrollTo(nextSectionId)}
              aria-label="Next project"
            >
              <span className="project-nav-arrow">↓</span>
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default ProjectSection;
