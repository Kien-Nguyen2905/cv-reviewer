// Mock data for Model 1 (Evidence)
export const MOCK_EVIDENCE = {
  strongSkills: [],
  mediumSkills: ["gitlab"],
  weakClaims: [
    "html",
    "css",
    "javascript",
    "typescript",
    "reactjs",
    "nextjs",
    "nodejs",
    "expressjs",
    "nestjs",
    "mongodb",
    "postgresql",
    "ci/cd",
    "githubactions",
    "vps",
    "tailwindcss",
  ],
  experienceHighlights: [
    "Built interface user for websites, including Enso and Genkin.",
  ],
  missingSignals: {
    impact: true,
    metrics: true,
  },
};

// Mock data for Model 2 (Insight)
export const MOCK_INSIGHT = {
  summary: {
    overallProfile:
      "A recent Information Technology graduate with foundational full-stack development skills, focusing on frontend technologies and some backend exposure.",
    keyStrengths: [
      "Solid understanding of frontend technologies (HTML, CSS, JavaScript, TypeScript, React.js, Next.js)",
      "Experience with backend technologies (Node.js, Express.js, NestJS)",
      "Familiarity with databases (MongoDB, PostgreSQL)",
      "Practical internship experience in a team environment using Agile Scrum",
    ],
    mainWeaknesses: [
      "Limited detail on project outcomes or technical contributions",
      "Weak evidence of depth in backend or database skills",
      "Minimal clarity on CI/CD and deployment experience",
      "No mention of version control practices beyond tool usage",
    ],
  },
  skillOverview: {
    strong: ["HTML", "CSS", "JavaScript", "TypeScript", "React.js", "Next.js"],
    medium: [
      "Node.js",
      "Express.js",
      "NestJS",
      "MongoDB",
      "PostgreSQL",
      "GitLab",
    ],
    weak: ["GitHub Actions", "VPS deployment", "Agile Scrum"],
  },
  improvementSuggestions: [
    "Clarify the intent behind 'chasing become a Software Developer' to reflect current career goals",
    "Provide specific examples of projects or contributions during the internship",
    "Quantify or qualify the level of experience with backend technologies and databases",
    "Expand on CI/CD and deployment experience with specific workflows or challenges",
    "Standardize skill naming and formatting for consistency",
  ],
};
