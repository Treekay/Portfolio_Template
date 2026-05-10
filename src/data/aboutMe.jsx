// Put your images in public/about and reference them as /about/file-name.jpg.
// Each section can have any number of photos; the page duplicates them for a seamless moving wall.
const aboutMeSections = [
  {
    id: "courses",
    title: "Education & Experience",
    summary:
      "Use this section to introduce your study background, professional experience, certifications, or learning path.",
    education: [
      {
        school: "Your University or Organization",
        degree: "Degree, Program, or Role Title",
        period: "2022 - 2026",
        description:
          "Add one sentence about what you studied, built, researched, or contributed.",
        courses: [],
      },
      {
        school: "Another School, Company, or Community",
        degree: "Certificate, Internship, or Experience",
        period: "2024 - Present",
        description:
          "Describe another milestone that helps visitors understand your path.",
        courses: [],
      },
    ],
    items: [
      {
        name: "Programming",
        detail:
          "List languages, paradigms, and development practices that shape how you build software.",
      },
      {
        name: "Web Development",
        detail:
          "Summarize your frontend, backend, API, and deployment experience.",
      },
      {
        name: "Databases",
        detail:
          "Mention relational or document databases, schema design, querying, and data modeling.",
      },
      {
        name: "Cloud & DevOps",
        detail:
          "Add cloud platforms, CI/CD, hosting, containers, or infrastructure tools you have used.",
      },
      {
        name: "Product Thinking",
        detail:
          "Explain how you turn user needs into practical features and readable interfaces.",
      },
      {
        name: "Testing",
        detail:
          "Describe unit tests, integration tests, accessibility checks, or manual QA habits.",
      },
      {
        name: "Security",
        detail:
          "Mention secure coding, authentication, authorization, privacy, or threat modeling.",
      },
      {
        name: "Communication",
        detail:
          "Add teamwork, writing, mentoring, or presentation strengths.",
      },
    ],
    photos: [
      {
        src: "/template-preview.svg",
        alt: "Portfolio template preview",
        caption: "Portfolio",
      },
      {
        src: "/bg.svg",
        alt: "Homepage background",
        caption: "Workspace",
      },
      {
        src: "/react.svg",
        alt: "React logo",
        caption: "React",
        variant: "logo",
      },
    ],
  },
  {
    id: "life",
    title: "Outside Work",
    summary: "Use this section for hobbies, values, creative interests, or community work.",
    details: [
      "Share a hobby that gives your page some personality.",
      "Mention a community, club, sport, or creative practice you enjoy.",
      "Add a favorite way you keep learning outside formal work.",
      "Keep these lines short so the layout stays easy to scan.",
    ],
    photos: [
      {
        src: "/vite.svg",
        alt: "Vite logo",
        caption: "Fast builds",
        variant: "logo",
      },
      {
        src: "/react.svg",
        alt: "React logo",
        caption: "Components",
        variant: "logo",
      },
      {
        src: "/template-preview.svg",
        alt: "Portfolio template preview",
        caption: "Personal site",
      },
      {
        src: "/bg.svg",
        alt: "Abstract page background",
        caption: "Interests",
      },
      {
        src: "/template-preview.svg",
        alt: "Portfolio page animation",
        caption: "Projects",
      },
    ],
  },
];

export default aboutMeSections;
