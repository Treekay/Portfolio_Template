import "./Hero.css";
import { useEffect, useState } from "react";

export default function Hero({
  heroName,
  description,
  backgroundImage,
  nextSectionId,
  typingSpeed,
}) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayedText("");

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
      id={"hero"}
      className="hero"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="overlay">
        <div className="content">
          <h1 className="hero-name">{heroName}</h1>
          <p className="hero-desc">
            {displayedText}
            <span className="typing-cursor">|</span>
          </p>
        </div>
      </div>
      <button
        className="scroll-down-btn"
        onClick={handleScrollDown}
        aria-label="Scroll to next section"
      >
        <span className="arrow">↓</span>
      </button>
    </section>
  );
}
