document.addEventListener('DOMContentLoaded', () => {
  // Array of Objects representing educational resources
  const resources = [
    {
      id: 1,
      title: "Designing Inclusive Online Courses",
      category: "teachers",
      date: "2026-06-15",
      description: "Learn foundational accessibility standards and universal design for learning (UDL) frameworks to support diverse student needs."
    },
    {
      id: 2,
      title: "Maximizing Study Efficiency with LMS Tools",
      category: "students",
      date: "2026-07-02",
      description: "Discover actionable strategies for organizing digital assignments, tracking completion benchmarks, and collaborating in peer groups."
    },
    {
      id: 3,
      title: "Scaling Digital Learning Systems Across Campuses",
      category: "admin",
      date: "2026-08-10",
      description: "Best practices for IT administrators managing user role permissions, security protocols, and third-party tool integrations."
    },
    {
      id: 4,
      title: "Formative Assessment Strategies in Digital Spaces",
      category: "teachers",
      date: "2026-09-01",
      description: "How to use automated quizzes, rubrics, and interactive feedback loops to enhance student engagement."
    }
  ];

  const gridContainer = document.getElementById('resource-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');

  // Function to render resource cards exclusively using template literals
  function renderResources(filteredList) {
    if (!gridContainer) return;

    if (filteredList.length === 0) {
      gridContainer.innerHTML = `<p class="no-results">No resources found in this category.</p>`;
      return;
    }

    // Generating HTML exclusively with template literals
    gridContainer.innerHTML = filteredList.map(resource => `
      <div class="resource-card" data-category="${resource.category}">
        <span class="resource-badge">${resource.category.toUpperCase()}</span>
        <h3>${resource.title}</h3>
        <span class="resource-date">Published: ${resource.date}</span>
        <p>${resource.description}</p>
        <a href="#" class="read-more">Read Article &rarr;</a>
      </div>
    `).join('');
  }

  // Initial render of all resources
  renderResources(resources);

  // Event listeners for filtering buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');

      const filterValue = e.target.getAttribute('data-filter');

      // Conditional branching & array methods (.filter)
      if (filterValue === 'all') {
        renderResources(resources);
      } else {
        const filtered = resources.filter(res => res.category === filterValue);
        renderResources(filtered);
      }
    });
  });
});