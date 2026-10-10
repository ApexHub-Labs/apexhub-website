// Featured Projects content + screenshot galleries.
// Images live in /public/projects/<slug>/ (WebP). images[0] is the cover.
// width/height are the real pixel dimensions, passed to next/image so there's
// no layout shift. A link with an empty href renders as a plain label
// (e.g. "Case study" for the login-gated LMS).

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProjectLink = {
  href: string; // empty string => not clickable (plain label)
  label: string; // "Visit site" | "View source" | "Case study"
};

export type Project = {
  slug: string;
  name: string;
  type: string;
  summary: string;
  tech: string[];
  link: ProjectLink | null;
  badge?: string;
  /** Prepared, equal-dimension hero shown on the card. */
  cover: ProjectImage;
  /** Full screenshot walkthrough shown in the lightbox. */
  images: ProjectImage[];
};

export type FeaturedProject = {
  name: string;
  type: string;
  summary: string;
  deliverables: Project[];
};

export const featured: FeaturedProject = {
  name: "American Prep Academy",
  type: "Website and learning platform for a US K–12 tutoring provider",
  summary: "We built their public website and the platform behind it.",
  deliverables: [
    {
      slug: "apa-website",
      name: "Website",
      type: "Public website",
      summary:
        "Gave a growing education provider a fast, search-optimized site that turns visitors into enrollments and tutor applications.",
      tech: ["Next.js", "React", "SEO"],
      link: { href: "https://americanprepacademy.com", label: "Visit site" },
      cover: {
        src: "/projects/apa-website/main.webp",
        alt: "American Prep Academy homepage with the headline 'Helping every student learn, grow, and thrive' and an enroll call to action",
        width: 1350,
        height: 635,
      },
      images: [
        {
          src: "/projects/apa-website/cover.webp",
          alt: "American Prep Academy homepage with the headline 'Helping every student learn, grow, and thrive' and an enroll call to action",
          width: 1334,
          height: 647,
        },
        {
          src: "/projects/apa-website/01-about-banner.webp",
          alt: "About banner reading 'Empowering students, supporting schools, strengthening futures'",
          width: 1337,
          height: 642,
        },
        {
          src: "/projects/apa-website/02-services-overview.webp",
          alt: "Services section titled 'Comprehensive services for every student'",
          width: 1339,
          height: 646,
        },
        {
          src: "/projects/apa-website/03-service-areas.webp",
          alt: "'Four integrated service areas' with Math & Reading Support selected and its programs listed",
          width: 1341,
          height: 643,
        },
        {
          src: "/projects/apa-website/04-learning-model.webp",
          alt: "'How our learning model works' showing the five-step Assess, Personalize, Daily Practice, Support and Master & Grow flow",
          width: 1349,
          height: 638,
        },
        {
          src: "/projects/apa-website/05-enrollment-form.webp",
          alt: "Student enrollment form modal collecting student information",
          width: 1341,
          height: 645,
        },
        {
          src: "/projects/apa-website/06-team.webp",
          alt: "'Meet the team behind American Prep' with staff profile photos",
          width: 1334,
          height: 645,
        },
        {
          src: "/projects/apa-website/07-testimonials.webp",
          alt: "Student testimonials section 'Hear it straight from our students'",
          width: 1338,
          height: 644,
        },
      ],
    },
    {
      slug: "apa-lms",
      name: "Learning Platform",
      type: "Learning management system",
      summary:
        "Took the provider's courses, payments and live classes fully online. Students enroll, pay, attend live sessions and track progress in one place.",
      tech: ["Next.js", "PostgreSQL", "Azure"],
      link: { href: "", label: "Case study" },
      cover: {
        src: "/projects/apa-lms/main.webp",
        alt: "Admin dashboard with totals for students, teachers and courses and charts for enrollment growth and weekly sessions",
        width: 1350,
        height: 635,
      },
      images: [
        {
          src: "/projects/apa-lms/cover.webp",
          alt: "Student dashboard showing the enrolled program, active courses and a calendar",
          width: 1352,
          height: 645,
        },
        {
          src: "/projects/apa-lms/01-browse-programs.webp",
          alt: "Browse Programs catalog with course cards and prices",
          width: 1351,
          height: 647,
        },
        {
          src: "/projects/apa-lms/02-sessions.webp",
          alt: "Student Sessions page listing past live sessions with attendance status",
          width: 1358,
          height: 644,
        },
        {
          src: "/projects/apa-lms/03-worksheets.webp",
          alt: "Student Worksheets list showing an assignment marked not submitted",
          width: 1355,
          height: 644,
        },
        {
          src: "/projects/apa-lms/04-submit-assignment.webp",
          alt: "Worksheet detail with a file upload to submit an assignment",
          width: 1365,
          height: 644,
        },
        {
          src: "/projects/apa-lms/05-teacher-dashboard.webp",
          alt: "Teacher dashboard with active students, attendance and a weekly performance chart",
          width: 1346,
          height: 640,
        },
        {
          src: "/projects/apa-lms/06-teacher-worksheets.webp",
          alt: "Teacher Worksheets view listing worksheets and submission counts",
          width: 1346,
          height: 643,
        },
        {
          src: "/projects/apa-lms/07-admin-calendar.webp",
          alt: "Admin calendar showing scheduled classes across the month",
          width: 1346,
          height: 645,
        },
        {
          src: "/projects/apa-lms/08-sign-in.webp",
          alt: "Sign in page for the American Prep Academy learning portal",
          width: 1359,
          height: 645,
        },
        {
          src: "/projects/apa-lms/09-create-account.webp",
          alt: "Create account page for students joining American Prep Academy",
          width: 1346,
          height: 647,
        },
      ],
    },
  ],
};

export const projects: Project[] = [
  {
    slug: "maderia",
    name: "Maderia",
    type: "Booking platform for hotels and guesthouses in Ethiopia",
    summary:
      "Brought local hotels and guests online with bilingual (English/Amharic) booking, live availability and secure payments.",
    tech: ["Next.js", "Flutter", "PostgreSQL"],
    link: { href: "https://maderia-u537.vercel.app", label: "Visit site" },
    cover: {
      src: "/projects/maderia/main.webp",
      alt: "Maderia 'Room Reservation App' promo with phone screens of hotel search and a map",
      width: 1350,
      height: 635,
    },
    images: [
      {
        src: "/projects/maderia/cover.webp",
        alt: "Maderia 'Room Reservation App' promo with phone screens of hotel search and a map",
        width: 1748,
        height: 1240,
      },
      {
        src: "/projects/maderia/01-home-search.webp",
        alt: "App home screen to find a hotel, search by location, with city cards",
        width: 720,
        height: 1600,
      },
      {
        src: "/projects/maderia/02-hotel-detail.webp",
        alt: "Hotel detail for Kuriftu Resort with amenities and room types",
        width: 720,
        height: 1600,
      },
      {
        src: "/projects/maderia/03-hotels-map.webp",
        alt: "Map view showing hotel locations around Addis Ababa",
        width: 720,
        height: 1600,
      },
      {
        src: "/projects/maderia/04-payment.webp",
        alt: "Complete payment screen with a booking summary and payment method",
        width: 720,
        height: 1600,
      },
      {
        src: "/projects/maderia/05-my-bookings.webp",
        alt: "Bookings list showing confirmed and paid hotel reservations",
        width: 720,
        height: 1600,
      },
    ],
  },
  {
    slug: "soso",
    name: "Soso",
    type: "Internal tool for small and growing companies",
    summary:
      "Lets teams run daily tasks right inside Telegram instead of adopting yet another app, with a web dashboard for managers.",
    tech: ["Next.js", "PostgreSQL", "Telegram"],
    link: { href: "https://soso-tasks.vercel.app", label: "Visit site" },
    cover: {
      src: "/projects/soso/main.webp",
      alt: "Soso shown as a Telegram task bot next to the web task board",
      width: 1350,
      height: 635,
    },
    images: [
      {
        src: "/projects/soso/cover.webp",
        alt: "Soso task board with columns of tasks assigned to team members",
        width: 1366,
        height: 645,
      },
      {
        src: "/projects/soso/01-projects.webp",
        alt: "Projects view with an ApexHub Labs project card",
        width: 1366,
        height: 644,
      },
      {
        src: "/projects/soso/02-create-task.webp",
        alt: "Create task form with title, assignee and due date fields",
        width: 1348,
        height: 638,
      },
      {
        src: "/projects/soso/03-task-detail.webp",
        alt: "Task detail for 'write a minute' with assignee and activity history",
        width: 1351,
        height: 644,
      },
      {
        src: "/projects/soso/04-team.webp",
        alt: "Team members list with roles",
        width: 1365,
        height: 642,
      },
    ],
  },
  {
    slug: "working",
    name: "Working",
    type: "Job platform connecting job seekers and employers",
    summary:
      "Employers post jobs and manage applicants from their own dashboard, job seekers find and apply to roles, and an admin panel runs the whole platform. Built for subscription plans on both sides.",
    tech: ["Next.js", "React", "PostgreSQL"],
    link: { href: "https://prior-bet-02961929.figma.site/", label: "Visit site" },
    badge: "Demo",
    cover: {
      src: "/projects/working/main.webp",
      alt: "WorkLink Ethiopia homepage with the headline 'Find the right opportunity. Build your career.' and a job search bar",
      width: 1350,
      height: 635,
    },
    images: [
      {
        src: "/projects/working/cover.webp",
        alt: "WorkLink Ethiopia homepage with the headline 'Find the right opportunity. Build your career.' and a job search bar",
        width: 1366,
        height: 549,
      },
      {
        src: "/projects/working/01-featured-jobs.webp",
        alt: "Featured and latest job listings from verified employers",
        width: 1366,
        height: 647,
      },
      {
        src: "/projects/working/02-job-search.webp",
        alt: "Job search results with filters for work mode, job type and sector",
        width: 1364,
        height: 647,
      },
      {
        src: "/projects/working/03-job-detail.webp",
        alt: "Job detail for a Senior Backend Developer role with responsibilities and company info",
        width: 1366,
        height: 645,
      },
      {
        src: "/projects/working/04-application.webp",
        alt: "Job application flow reviewing the applicant's profile before submitting",
        width: 1366,
        height: 642,
      },
      {
        src: "/projects/working/05-employer-dashboard.webp",
        alt: "Employer dashboard showing active jobs, applications and recent applicants",
        width: 1366,
        height: 643,
      },
      {
        src: "/projects/working/06-post-job.webp",
        alt: "Post a Job form for employers to add a new listing",
        width: 1366,
        height: 637,
      },
      {
        src: "/projects/working/07-applicants.webp",
        alt: "Applicants management screen with candidates to review, shortlist or reject",
        width: 1366,
        height: 644,
      },
      {
        src: "/projects/working/08-company-profile.webp",
        alt: "Employer company profile settings",
        width: 1366,
        height: 643,
      },
    ],
  },
  {
    slug: "educonnect",
    name: "EduConnect",
    type: "Mobile app for schools and parents",
    summary:
      "Puts grades, attendance, homework and fees in parents' pockets, and gives school admins one app to manage students and messaging.",
    tech: ["Flutter", "Appwrite", "Bloc"],
    link: {
      href: "https://github.com/Miki-b/Edu-Connect",
      label: "View source",
    },
    cover: {
      src: "/projects/educonnect/main.webp",
      alt: "EduConnect 'E-Learning Platform' promo with phone screens of academic records, attendance and homework",
      width: 1350,
      height: 635,
    },
    images: [
      {
        src: "/projects/educonnect/cover.webp",
        alt: "EduConnect 'E-Learning Platform' promo with phone screens of academic records, attendance and homework",
        width: 1748,
        height: 1240,
      },
      {
        src: "/projects/educonnect/01-parent-home.webp",
        alt: "Parent home screen showing a child's profile and quick links to records, attendance, homework and fees",
        width: 284,
        height: 638,
      },
      {
        src: "/projects/educonnect/02-attendance.webp",
        alt: "Attendance screen showing a 95% rate and a monthly calendar",
        width: 284,
        height: 636,
      },
      {
        src: "/projects/educonnect/03-fee-status.webp",
        alt: "Fee status screen showing a zero balance and payment history",
        width: 279,
        height: 641,
      },
      {
        src: "/projects/educonnect/04-parent-overview.webp",
        alt: "Parent app screens for home, attendance, homework and fee status",
        width: 1748,
        height: 1240,
      },
      {
        src: "/projects/educonnect/05-admin-app.webp",
        alt: "Admin app screens for dashboard, bulk messaging and student records",
        width: 1748,
        height: 1240,
      },
    ],
  },
  {
    slug: "safe-light",
    name: "Safe Light Initiative",
    type: "Website for a mission-driven organization",
    summary:
      "Gave the organization a clear, accessible online presence that its own non-technical team can keep updated.",
    tech: ["WordPress", "Elementor"],
    link: { href: "https://home.safelightet.org", label: "Visit site" },
    cover: {
      src: "/projects/safe-light/main.webp",
      alt: "Safe Light Initiative homepage hero reading 'Inspire. Empower. Transform.'",
      width: 1350,
      height: 635,
    },
    images: [
      {
        src: "/projects/safe-light/cover.webp",
        alt: "Safe Light Initiative homepage hero reading 'Inspire. Empower. Transform.'",
        width: 1349,
        height: 643,
      },
      {
        src: "/projects/safe-light/01-background.webp",
        alt: "Background and history section about the organization",
        width: 1338,
        height: 640,
      },
      {
        src: "/projects/safe-light/02-focus.webp",
        alt: "'Our Focus' areas: leadership and diplomacy, entrepreneurship, peace building and digital literacy",
        width: 1347,
        height: 636,
      },
      {
        src: "/projects/safe-light/03-news-events.webp",
        alt: "News & events section with recent updates",
        width: 1344,
        height: 643,
      },
      {
        src: "/projects/safe-light/04-blog-listing.webp",
        alt: "Blog listing with articles on civic participation and voter education",
        width: 1324,
        height: 644,
      },
      {
        src: "/projects/safe-light/05-related-blogs.webp",
        alt: "National Sectoral Plan related blogs",
        width: 1336,
        height: 639,
      },
      {
        src: "/projects/safe-light/06-contact.webp",
        alt: "Contact page inviting visitors to send feedback",
        width: 1337,
        height: 643,
      },
    ],
  },
];
