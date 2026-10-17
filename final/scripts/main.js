document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Footer Dates
  const yearSpan = document.getElementById('currentyear');
  const lastModifiedSpan = document.getElementById('lastModified');

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  if (lastModifiedSpan) {
    // Fixed: Used template literals (backticks) for the string interpolation
    lastModifiedSpan.textContent = `Last Modification: ${document.lastModified}`;
  }

  // 2. Interactive Course Preview Component (DOM interaction & events)
  const completeBtn = document.getElementById('complete-btn');
  const progressBar = document.getElementById('progress-bar');
  const completionStatus = document.getElementById('completion-status');

  if (completeBtn && progressBar && completionStatus) {
    let isCompleted = false;

    completeBtn.addEventListener('click', () => {
      isCompleted = !isCompleted; // Conditional branching logic

      if (isCompleted) {
        progressBar.style.width = '100%';
        completionStatus.textContent = 'Completed ✓';
        completionStatus.style.color = '#16A34A';
        completeBtn.textContent = 'Mark Incomplete';
        completeBtn.style.backgroundColor = '#64748B';
      } else {
        progressBar.style.width = '45%';
        completionStatus.textContent = 'In Progress';
        completionStatus.style.color = 'var(--text-light)';
        completeBtn.textContent = 'Mark Lesson Complete';
        completeBtn.style.backgroundColor = 'var(--secondary)';
      }
    });
  }
}); // Fixed: Added missing closing bracket and parenthesis for the DOMContentLoaded listener