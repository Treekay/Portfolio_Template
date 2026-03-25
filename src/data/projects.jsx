const projects = [
  {
    id: "project-1",
    title: "Title of Project 1",
    period: "Software Developer - 2003.5~2004.8",
    organization: "Microsoft Corporation (Redmond, USA)",
    description: [
      "· Developed and maintained features for a major software product, contributing to both frontend and backend components.",
      "· Collaborated with cross-functional teams to design and implement new functionalities, ensuring high performance and scalability.",
    ],
    image: "/project1.jpg",
    buttonText: "More",
    buttonLink: "https://project1.example.com",
    nextSectionId: "project-2",
  },
  {
    id: "project-2",
    title: "Title of Project 2",
    period: "Full-Stack Developer - 2004.9~2006.12",
    organization: "Google Inc. (Mountain View, USA)",
    description: [
      "· Led the development of a critical feature that improved user engagement by 20%, utilizing modern web technologies.",
      "· Implemented robust backend services and optimized database queries, resulting in a 30% reduction in response time.",
    ],
    image: "/project2.jpg",
    buttonText: "More",
    buttonLink: "https://project2.example.com",
    nextSectionId: "skills", //the last project should link to the skills section
  },
];

export default projects;
