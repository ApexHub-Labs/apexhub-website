// One-off: convert project screenshots to WebP (<=1920px wide, aspect kept)
// into public/projects/<slug>/. Prints a JSON manifest of final dimensions.
// Originals are never modified. Run: node scripts/convert-screenshots.mjs
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = (p) => path.join(ROOT, p);
const OUT = (slug, name) => path.join(ROOT, "public", "projects", slug, name);

// slug -> [ [sourceRelPath, destFileName], ... ] (first entry is the cover)
const MAP = {
  "apa-website": [
    ["APA screenshoots/american prep 1.png", "cover.webp"],
    ["APA screenshoots/american prep 3.png", "01-about-banner.webp"],
    ["APA screenshoots/american prep 2.png", "02-services-overview.webp"],
    ["APA screenshoots/american prep 4.png", "03-service-areas.webp"],
    ["APA screenshoots/american prep 7.png", "04-learning-model.webp"],
    ["APA screenshoots/american prep 6.png", "05-enrollment-form.webp"],
    ["APA screenshoots/american prep 5.png", "06-team.webp"],
    ["APA screenshoots/american prep 8.png", "07-testimonials.webp"],
  ],
  "apa-lms": [
    ["APA LMS Screenshots/APA 1.png", "cover.webp"],
    ["APA LMS Screenshots/APA 2.png", "01-browse-programs.webp"],
    ["APA LMS Screenshots/APA 4.png", "02-sessions.webp"],
    ["APA LMS Screenshots/APA 5.png", "03-worksheets.webp"],
    ["APA LMS Screenshots/APA 3.png", "04-submit-assignment.webp"],
    ["APA LMS Screenshots/APA 8.png", "05-teacher-dashboard.webp"],
    ["APA LMS Screenshots/APA 9.png", "06-teacher-worksheets.webp"],
    ["APA LMS Screenshots/APA 10.png", "07-admin-calendar.webp"],
    ["APA LMS Screenshots/APA 6.png", "08-sign-in.webp"],
    ["APA LMS Screenshots/APA 7.png", "09-create-account.webp"],
  ],
  maderia: [
    ["Maderia app screenshots/maderia app.png", "cover.webp"],
    ["Maderia app screenshots/maderia app 1.png", "01-home-search.webp"],
    ["Maderia app screenshots/maderia app 2.png", "02-hotel-detail.webp"],
    ["Maderia app screenshots/maderia app 3.png", "03-hotels-map.webp"],
    ["Maderia app screenshots/maderia app 4.png", "04-payment.webp"],
    ["Maderia app screenshots/maderia app 5.png", "05-my-bookings.webp"],
  ],
  soso: [
    ["Soso ScreenShots/soso 1.png", "cover.webp"],
    ["Soso ScreenShots/soso 2.png", "01-projects.webp"],
    ["Soso ScreenShots/soso 5.png", "02-create-task.webp"],
    ["Soso ScreenShots/soso 4.png", "03-task-detail.webp"],
    ["Soso ScreenShots/soso 3.png", "04-team.webp"],
  ],
  working: [
    ["WorkLink Ethiopia/WorkLink Ethiopia.png", "cover.webp"],
    ["WorkLink Ethiopia/WorkLink Ethiopia 2.png", "01-featured-jobs.webp"],
    ["WorkLink Ethiopia/Worklink 3.png", "02-job-search.webp"],
    ["WorkLink Ethiopia/worklink 4.png", "03-job-detail.webp"],
    ["WorkLink Ethiopia/worklink 5.png", "04-application.webp"],
    ["WorkLink Ethiopia/worklink 6.png", "05-employer-dashboard.webp"],
    ["WorkLink Ethiopia/worklink 7.png", "06-post-job.webp"],
    ["WorkLink Ethiopia/worklink 8.png", "07-applicants.webp"],
    ["WorkLink Ethiopia/worklink 9.png", "08-company-profile.webp"],
  ],
  educonnect: [
    ["Edu connect screenshots/edu connect.png", "cover.webp"],
    ["Edu connect screenshots/edu connect 1.png", "01-parent-home.webp"],
    ["Edu connect screenshots/edu connect 2.png", "02-attendance.webp"],
    ["Edu connect screenshots/edu connect 3.png", "03-fee-status.webp"],
    ["Edu connect screenshots/edu connect 5.png", "04-parent-overview.webp"],
    ["Edu connect screenshots/edu connect 4.png", "05-admin-app.webp"],
  ],
  "safe-light": [
    ["Safelight Screenshots/safelight.png", "cover.webp"],
    ["Safelight Screenshots/SAFE 3.png", "01-background.webp"],
    ["Safelight Screenshots/safe 2.png", "02-focus.webp"],
    ["Safelight Screenshots/safe 1.png", "03-news-events.webp"],
    ["Safelight Screenshots/safe 5.png", "04-blog-listing.webp"],
    ["Safelight Screenshots/safe 4.png", "05-related-blogs.webp"],
    ["Safelight Screenshots/safe 6.png", "06-contact.webp"],
  ],
};

const manifest = {};
for (const [slug, files] of Object.entries(MAP)) {
  await mkdir(path.join(ROOT, "public", "projects", slug), { recursive: true });
  manifest[slug] = {};
  for (const [srcRel, dest] of files) {
    const info = await sharp(SRC(srcRel))
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 95, effort: 6 })
      .toFile(OUT(slug, dest));
    manifest[slug][dest] = { w: info.width, h: info.height };
  }
}
console.log(JSON.stringify(manifest, null, 2));
