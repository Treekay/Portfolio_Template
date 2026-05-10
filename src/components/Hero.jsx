import "./Hero.css";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";

const MotionDiv = motion.div;

export default function Hero({
  heroName,
  description,
  backgroundImage,
  nextSectionId,
  typingSpeed,
  aboutSectionId,
}) {
  const [displayedText, setDisplayedText] = useState("");
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.45], [0, 180]);
  const gridY = useTransform(scrollYProgress, [0, 0.45], [0, 90]);
  const fade = useTransform(scrollYProgress, [0, 0.28], [1, 0]);

  useEffect(() => {
    let index = 0;

    const timer = setInterval(() => {
      index += 1;
      setDisplayedText(description.slice(0, index));

      if (index >= description.length) {
        clearInterval(timer);
      }
    }, typingSpeed);

    return () => clearInterval(timer);
  }, [description, typingSpeed]);

  const handleScrollDown = () => {
    const nextSection = document.getElementById(nextSectionId);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="hero"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <MotionDiv className="hero-grid" style={{ y: gridY }} />
      <div className="hero-shade" />
      <div className="hero-accent-line hero-accent-line-left" />
      <div className="hero-accent-line hero-accent-line-right" />

      <div className="overlay">
        <MotionDiv
          className="content"
          style={{ y: heroY, opacity: fade }}
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-avatar-frame">
            <img src="/avatar.svg" alt={`${heroName} avatar`} />
          </div>
          <h1 className="hero-name">{heroName}</h1>
          <p className="hero-desc">
            {displayedText}
            <span className="typing-cursor">|</span>
          </p>
          <div className="hero-actions">
            {aboutSectionId && (
              <a
                className="hero-link hero-link-primary"
                href={`#${aboutSectionId}`}
              >
                About Me
              </a>
            )}
            <a className="hero-link hero-link-button" href="#project-1">
              View Work
            </a>
            <a className="hero-link" href="#skills">
              Skills
            </a>
          </div>
        </MotionDiv>
      </div>

      <button
        className="scroll-down-btn"
        onClick={handleScrollDown}
        aria-label="Scroll to next section"
      >
        <FaArrowDown className="arrow" />
      </button>
    </section>
  );
}
