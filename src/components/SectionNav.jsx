import "./SectionNav.css";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const scrollToSection = (sectionId) => {
  if (!sectionId) return;
  const section = document.getElementById(sectionId);

  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const SectionNav = ({
  prevSectionId,
  nextSectionId,
  previousLabel = "Previous section",
  nextLabel = "Next section",
  className = "",
}) => {
  if (!prevSectionId && !nextSectionId) return null;

  return (
    <div className={`section-nav ${className}`}>
      {prevSectionId && (
        <button
          className="section-nav-btn"
          type="button"
          onClick={() => scrollToSection(prevSectionId)}
          aria-label={previousLabel}
        >
          <FaArrowUp />
        </button>
      )}

      {nextSectionId && (
        <button
          className="section-nav-btn"
          type="button"
          onClick={() => scrollToSection(nextSectionId)}
          aria-label={nextLabel}
        >
          <FaArrowDown />
        </button>
      )}
    </div>
  );
};

export default SectionNav;
