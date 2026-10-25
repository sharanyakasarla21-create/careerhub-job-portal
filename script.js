
const jobs = [
  { title: "Junior Web Developer", company: "BrightPixel", category: "Technology", location: "Hyderabad", type: "Full-time", salary: "₹3–5 LPA" },
  { title: "UI/UX Design Intern", company: "Creative Studio", category: "Design", location: "Remote", type: "Internship", salary: "₹10k–15k/month" },
  { title: "Digital Marketing Associate", company: "GrowthNest", category: "Marketing", location: "Warangal", type: "Full-time", salary: "₹2.5–4 LPA" },
  { title: "Data Analyst Trainee", company: "ClearView", category: "Technology", location: "Hyderabad", type: "Full-time", salary: "₹3–4.5 LPA" },
  { title: "Business Operations Intern", company: "LaunchPad", category: "Business", location: "Remote", type: "Internship", salary: "₹8k–12k/month" },
  { title: "Content Designer", company: "Mosaic Media", category: "Design", location: "Bengaluru", type: "Full-time", salary: "₹3–5 LPA" }
];

const jobList = document.getElementById("job-list");
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const resultsCount = document.getElementById("results-count");
const emptyState = document.getElementById("empty-state");

let activeFilter = "All";

function renderJobs() {
  const search = searchInput.value.toLowerCase().trim();

  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      (job.title + " " + job.company + " " + job.category + " " + job.location)
      .toLowerCase().includes(search);

    return matchesSearch &&
      (activeFilter === "All" || job.category === activeFilter);
  });

  jobList.innerHTML = "";
  resultsCount.textContent = filteredJobs.length + " opportunities";
  emptyState.hidden = filteredJobs.length > 0;

  filteredJobs.forEach(job => {
    const card = document.createElement("article");
    card.className = "job-card";

    const heading = document.createElement("h3");
    heading.textContent = job.title;

    const company = document.createElement("p");
    company.className = "company";
    company.textContent = job.company + " · " + job.location;

    const tags = document.createElement("div");
    tags.className = "job-tags";

    [job.category, job.type].forEach(text => {
      const tag = document.createElement("span");
      tag.textContent = text;
      tags.appendChild(tag);
    });

    const bottom = document.createElement("div");
    bottom.className = "job-bottom";

    const salary = document.createElement("span");
    salary.className = "salary";
    salary.textContent = job.salary;

    const applyButton = document.createElement("button");
    applyButton.textContent = "Apply";
    applyButton.type = "button";

    applyButton.addEventListener("click", () => {
      alert("Thank you for your interest in " + job.title +
        "! This is a demo; no real application was sent.");
    });

    bottom.append(salary, applyButton);
    card.append(heading, company, tags, bottom);
    jobList.appendChild(card);
  });
}

searchForm.addEventListener("submit", event => {
  event.preventDefault();
  renderJobs();
});

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    document.querySelectorAll(".filter").forEach(item => {
      item.classList.toggle("active", item === button);
    });

    renderJobs();
  });
});

renderJobs();

