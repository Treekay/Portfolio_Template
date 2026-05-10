import "./AboutMePage.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionNav from "./SectionNav";

const MotionDiv = motion.div;
const goldenAngle = Math.PI * (3 - Math.sqrt(5));
const globeTilt = 0.42;
const globeSpeed = 0.16;
const detailSwitchMs = 3600;
const photoWallRowCount = 2;
const photoWallPixelsPerSecond = 60;

const hashText = (text) =>
  Array.from(text).reduce(
    (hash, char) => (hash * 31 + char.charCodeAt(0)) % 9973,
    17
  );

const shuffledPhotos = (photos) =>
  [...photos].sort(
    (first, second) =>
      hashText(first.caption + first.src) -
      hashText(second.caption + second.src)
  );

const getCoursePosition = (index, count, rotation) => {
  const latitudeBand = 0.74;
  const y = count <= 1 ? 0 : (1 - ((index + 0.5) / count) * 2) * latitudeBand;
  const radius = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = index * goldenAngle;
  const baseX = Math.cos(theta) * radius;
  const baseZ = Math.sin(theta) * radius;
  const rotatedX = baseX * Math.cos(rotation) + baseZ * Math.sin(rotation);
  const rotatedZ = -baseX * Math.sin(rotation) + baseZ * Math.cos(rotation);
  const tiltedY = y * Math.cos(globeTilt) - rotatedZ * Math.sin(globeTilt);
  const tiltedZ = y * Math.sin(globeTilt) + rotatedZ * Math.cos(globeTilt);

  return {
    x: rotatedX,
    y: tiltedY,
    z: tiltedZ,
  };
};

const CourseCloud = ({ items }) => {
  const [rotation, setRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const rotationRef = useRef(0);
  const manualHoldUntilRef = useRef(0);
  const positions = useMemo(
    () =>
      items.map((_, index) => getCoursePosition(index, items.length, rotation)),
    [items, rotation]
  );
  const activeCourse = items[activeIndex] ?? items[0];

  useEffect(() => {
    let frameId;
    const startTime = performance.now();

    const animate = (now) => {
      const nextRotation = ((now - startTime) / 1000) * globeSpeed;

      rotationRef.current = nextRotation;
      setRotation(nextRotation);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    const syncDetailToFront = () => {
      if (Date.now() < manualHoldUntilRef.current) {
        return;
      }

      let frontIndex = 0;
      let frontDepth = -Infinity;

      items.forEach((_, index) => {
        const { z } = getCoursePosition(
          index,
          items.length,
          rotationRef.current
        );

        if (z > frontDepth) {
          frontDepth = z;
          frontIndex = index;
        }
      });

      setActiveIndex(frontIndex);
    };

    const detailTimer = window.setInterval(syncDetailToFront, detailSwitchMs);

    return () => window.clearInterval(detailTimer);
  }, [items]);

  return (
    <div className="about-course-cloud">
      <div
        className="about-course-space"
        aria-label="University course selector"
      >
        {items.map((item, index) => {
          const { x, y, z } = positions[index];
          const depth = (z + 1) / 2;
          const scale = 0.7 + depth * 0.42;
          const opacity = 0.34 + depth * 0.66;
          const blur = z < -0.26 ? "blur(0.8px)" : "blur(0px)";

          return (
            <button
              className={`about-course-node ${
                activeIndex === index ? "active" : ""
              }`}
              key={item.name}
              type="button"
              style={{
                transform: `translate(-50%, -50%) translate3d(${x * 238}px, ${
                  y * 176
                }px, ${z * 210}px) scale(${scale})`,
                opacity,
                zIndex: Math.round(depth * 100),
                filter: blur,
              }}
              onClick={() => {
                manualHoldUntilRef.current = Date.now() + detailSwitchMs;
                setActiveIndex(index);
              }}
            >
              {item.name}
            </button>
          );
        })}
      </div>

      <MotionDiv
        className="about-course-detail"
        key={activeCourse.name}
        initial={{ opacity: 0.28, y: 14, scale: 0.985, filter: "blur(8px)" }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
        }}
        transition={{
          duration: 0.42,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <span>Course Detail</span>
        <h3>{activeCourse.name}</h3>
        <p>{activeCourse.detail}</p>
      </MotionDiv>
    </div>
  );
};

const PhotoWall = ({ photos, onOpenPhoto }) => {
  const [marqueeSeconds, setMarqueeSeconds] = useState(0);
  const [cycleWidths, setCycleWidths] = useState([]);
  const trackRefs = useRef([]);
  const rows = useMemo(() => {
    const mixedPhotos = shuffledPhotos(photos);
    const canSplitRows = mixedPhotos.length >= photoWallRowCount * 4;
    const rowStartStep = Math.max(
      1,
      Math.floor(mixedPhotos.length / photoWallRowCount)
    );

    return Array.from({ length: photoWallRowCount }, (_, rowIndex) => {
      const startIndex = (rowIndex * rowStartStep) % mixedPhotos.length;
      const rowPhotos = canSplitRows
        ? mixedPhotos.filter(
            (_, photoIndex) => photoIndex % photoWallRowCount === rowIndex
          )
        : mixedPhotos
            .slice(startIndex)
            .concat(mixedPhotos.slice(0, startIndex));

      return [...rowPhotos, ...rowPhotos];
    });
  }, [photos]);
  const rowCount = rows.length;

  useEffect(() => {
    const updateCycleWidths = () => {
      setCycleWidths(
        trackRefs.current.map((track) =>
          track ? Math.max(1, track.scrollWidth / 2) : 1
        )
      );
    };

    updateCycleWidths();

    const resizeObserver = new ResizeObserver(updateCycleWidths);
    trackRefs.current.forEach((track) => {
      if (track) {
        resizeObserver.observe(track);
      }
    });

    return () => resizeObserver.disconnect();
  }, [rows]);

  useEffect(() => {
    let frameId;
    const startTime = performance.now();

    const animate = (now) => {
      setMarqueeSeconds((now - startTime) / 1000);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div
      className="about-photo-wall"
      aria-label="Moving photo wall"
      style={{ "--photo-wall-row-count": rowCount }}
    >
      {rows.map((rowPhotos, rowIndex) => (
        <div className="about-photo-row" key={`photo-row-${rowIndex}`}>
          <div
            ref={(node) => {
              trackRefs.current[rowIndex] = node;
            }}
            className={`about-photo-track ${
              rowIndex % 2 === 1 ? "reverse" : ""
            }`}
            style={{
              transform: `translate3d(${(() => {
                const cycleWidth = cycleWidths[rowIndex] ?? 1;
                const distance =
                  (marqueeSeconds * photoWallPixelsPerSecond) % cycleWidth;

                return rowIndex % 2 === 1 ? -cycleWidth + distance : -distance;
              })()}px, 0, 0)`,
            }}
          >
            {rowPhotos.map((photo, index) => (
              <button
                className={`about-photo-card ${
                  photo.variant === "logo" ? "about-photo-card-logo" : ""
                }`}
                key={`${photo.src}-${rowIndex}-${index}`}
                type="button"
                onClick={() => onOpenPhoto(photo)}
                aria-label={`Open ${photo.caption}`}
              >
                <img src={photo.src} alt={photo.alt} />
                <span>{photo.caption}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const EducationList = ({ education }) => (
  <div className="about-education-list">
    {education.map((item) => (
      <article className="about-education-card" key={item.school}>
        <div>
          <span>{item.period}</span>
          <h3>{item.school}</h3>
          <p>{item.degree}</p>
        </div>
      </article>
    ))}
  </div>
);

const AboutMePage = ({ sections, id, title, prevSectionId, nextSectionId }) => {
  const [activePhoto, setActivePhoto] = useState(null);
  const showSectionIndex = sections.length > 1;
  const pageClassName = `about-page ${
    id === "life" ? "about-page-life" : "about-page-academic"
  }`;

  return (
    <section className={pageClassName} id={id}>
      <div className="about-grid" />

      <section className="about-hero">
        <MotionDiv
          className="about-hero-content"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1>{title}</h1>
        </MotionDiv>
      </section>

      <div className="about-sections">
        {sections.map((section, index) => (
          <MotionDiv
            className="about-section"
            key={section.id}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.24 }}
            transition={{
              duration: 0.58,
              delay: Math.min(index * 0.06, 0.18),
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="about-section-copy">
              {showSectionIndex && (
                <span className="about-section-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
              )}
              <h2>{section.title}</h2>
              <p className="about-section-summary">{section.summary}</p>
              {section.education ? (
                <EducationList education={section.education} />
              ) : (
                <div className="about-detail-list">
                  {section.details.map((detail) => (
                    <p key={detail}>{detail}</p>
                  ))}
                </div>
              )}
            </div>

            {section.items ? (
              <CourseCloud items={section.items} />
            ) : (
              <PhotoWall photos={section.photos} onOpenPhoto={setActivePhoto} />
            )}
          </MotionDiv>
        ))}
      </div>

      {activePhoto && (
        <div className="about-lightbox" onClick={() => setActivePhoto(null)}>
          <button
            className="about-lightbox-close"
            type="button"
            onClick={() => setActivePhoto(null)}
            aria-label="Close image preview"
          >
            ×
          </button>
          <figure
            className="about-lightbox-frame"
            onClick={(event) => event.stopPropagation()}
          >
            <img src={activePhoto.src} alt={activePhoto.alt} />
            <figcaption>{activePhoto.caption}</figcaption>
          </figure>
        </div>
      )}
      <SectionNav
        prevSectionId={prevSectionId}
        nextSectionId={nextSectionId}
        previousLabel={`Previous section before ${title}`}
        nextLabel={`Next section after ${title}`}
      />
    </section>
  );
};

export default AboutMePage;
