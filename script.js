// Load portfolio projects and implement filtering
document.addEventListener("DOMContentLoaded", () => {
    const projectGrid = document.getElementById("projects-grid");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const themeToggle = document.getElementById("theme-toggle");

    let allProjects = [];
    let currentFilter = localStorage.getItem("selectedFilter") || "All";

    // Fetch projects from projects.json
    fetch("projects.json")
        .then(res => res.json())
        .then(data => {
            allProjects = data;
            renderProjects();
            highlightActiveFilter();
        })
        .catch(err => console.error("Error loading projects:", err));

    // Render projects based on filter
    function renderProjects() {
        projectGrid.innerHTML = "";
        let filteredProjects = allProjects.filter(project => {
            return currentFilter === "All" || project.techStack.includes(currentFilter);
        });

        filteredProjects.forEach(project => {
            const card = document.createElement("div");
            card.classList.add("project-card");

            card.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tech-stack">
                        ${project.techStack.map(tech => `<span>${tech}</span>`).join("")}
                    </div>
                    <div class="card-buttons">
                        <a href="${project.demoLink}" target="_blank">Live Demo</a>
                        <a href="${project.codeLink}" target="_blank">Code</a>
                    </div>
                </div>
            `;

            projectGrid.appendChild(card);
        });
    }

    // Filter button events
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            currentFilter = btn.dataset.filter;
            localStorage.setItem("selectedFilter", currentFilter);
            renderProjects();
            highlightActiveFilter();
        });
    });

    function highlightActiveFilter() {
        filterButtons.forEach(btn => {
            btn.classList.toggle("active", btn.dataset.filter === currentFilter);
        });
    }

    // Theme toggle functionality
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        themeToggle.textContent = document.body.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";
    });
});
