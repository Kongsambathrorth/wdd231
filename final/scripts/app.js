/* ==========================================================================
   Initializing Application State & Query Params
   ========================================================================== */
const urlParams = new URLSearchParams(window.location.search);
let activeCourseIdx = parseInt(urlParams.get('course') || localStorage.getItem('finwise_active_course') || '0', 10);
let activeLessonIdx = parseInt(urlParams.get('lesson') || localStorage.getItem('finwise_active_lesson') || '0', 10);

if (isNaN(activeCourseIdx) || activeCourseIdx < 0 || activeCourseIdx >= COURSES_DATA.length) activeCourseIdx = 0;
if (isNaN(activeLessonIdx) || activeLessonIdx < 0 || activeLessonIdx >= COURSES_DATA[activeCourseIdx].lessons.length) activeLessonIdx = 0;

let completedLessonIds = JSON.parse(localStorage.getItem('finwise_vanilla_progress') || '[]');

/* ==========================================================================
   Notification Toast Helper
   ========================================================================== */
function notify(text) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = text;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 2200);
}

/* ==========================================================================
   Progress Calculation Functions
   ========================================================================== */
function calculateCourseProgress(cIdx) {
  const course = COURSES_DATA[cIdx];
  const total = course.lessons.length;
  const completed = course.lessons.filter(l => completedLessonIds.includes(l.id)).length;
  const pct = Math.round((completed / total) * 100);
  return { total, completed, pct };
}

function calculateOverallProgress() {
  let totalLessons = 0;
  let completedCount = 0;
  COURSES_DATA.forEach(c => {
    totalLessons += c.lessons.length;
    c.lessons.forEach(l => {
      if (completedLessonIds.includes(l.id)) completedCount++;
    });
  });
  const pct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  return { totalLessons, completedCount, pct };
}

function updateProgressUI() {
  const overall = calculateOverallProgress();
  const navPct = document.getElementById('nav-overall-pct');
  if (navPct) navPct.textContent = `${overall.pct}%`;

  // Update track cards in hero
  for (let i = 0; i < COURSES_DATA.length; i++) {
    const p = calculateCourseProgress(i);
    const label = document.getElementById(`track-p${i}`);
    const bar = document.getElementById(`track-b${i}`);
    if (label) label.textContent = `${p.pct}%`;
    if (bar) bar.style.width = `${p.pct}%`;
  }

  const trackerMsg = document.getElementById('hero-tracker-message');
  if (trackerMsg) {
    if (overall.pct === 0) trackerMsg.textContent = "Ready to begin Course 1, Lesson 1.1.";
    else if (overall.pct === 100) trackerMsg.textContent = "🎉 All 3 micro-courses completed! Grab your certificate.";
    else trackerMsg.textContent = `${overall.totalLessons - overall.completedCount} lessons remaining across 3 courses.`;
  }
}

/* ==========================================================================
   Rendering Course Catalog Grid
   ========================================================================== */
function renderCourseCatalog() {
  const container = document.getElementById('courses-grid');
  if (!container) return;

  container.innerHTML = COURSES_DATA.map((course, idx) => {
    const prog = calculateCourseProgress(idx);
    return `
      <div class="course-card">
        <div>
          <span class="course-badge">Course 0${idx + 1}</span>
          <h3>${course.title}</h3>
          <p class="course-desc">${course.description}</p>
          <ul class="course-module-list">
            ${course.lessons.map(l => {
              const isDone = completedLessonIds.includes(l.id);
              return `<li>${isDone ? '✓' : '○'} ${l.moduleTag}:${l.title}</li>`;
            }).join('')}
          </ul>
        </div>
        <a class="btn btn-secondary" href="lesson.html?course=${idx}&lesson=0">
          ${prog.pct === 100 ? 'Review Course' : `Study Course (${prog.pct}%)`}
        </a>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   Active Lesson Player Navigation & Content
   ========================================================================== */
function switchCourse(idx) {
  activeCourseIdx = idx;
  activeLessonIdx = 0;
  localStorage.setItem('finwise_active_course', activeCourseIdx);
  localStorage.setItem('finwise_active_lesson', activeLessonIdx);

  if (window.history.pushState) {
    const newurl = `${window.location.pathname}?course=${activeCourseIdx}&lesson=${activeLessonIdx}`;
    window.history.pushState({ path: newurl }, '', newurl);
  }

  document.querySelectorAll('.course-tab').forEach((tab, i) => {
    tab.classList.toggle('active', i === idx);
  });

  renderLessonSidebar();
  loadCurrentLesson();
}

function renderLessonSidebar() {
  const container = document.getElementById('lesson-items-container');
  if (!container) return;

  const course = COURSES_DATA[activeCourseIdx];
  const courseLabel = document.getElementById('player-course-label');
  const courseTitle = document.getElementById('player-course-title');
  const stepInd = document.getElementById('player-step-indicator');

  if (courseLabel) courseLabel.textContent = `Course ${activeCourseIdx + 1}`;
  if (courseTitle) courseTitle.textContent = course.title;
  if (stepInd) stepInd.textContent = `${activeLessonIdx + 1} of ${course.lessons.length}`;

  container.innerHTML = course.lessons.map((lesson, idx) => {
    const isActive = idx === activeLessonIdx;
    const isDone = completedLessonIds.includes(lesson.id);
    return `
      <button class="lesson-nav-btn ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}" onclick="selectLesson(${idx})">
        <span>${lesson.moduleTag}: ${lesson.title}</span>
        <span class="check-icon">${isDone ? '✓' : ''}</span>
      </button>
    `;
  }).join('');
}

function selectLesson(idx) {
  activeLessonIdx = idx;
  localStorage.setItem('finwise_active_lesson', activeLessonIdx);

  if (window.history.pushState) {
    const newurl = `${window.location.pathname}?course=${activeCourseIdx}&lesson=${activeLessonIdx}`;
    window.history.pushState({ path: newurl }, '', newurl);
  }

  renderLessonSidebar();
  loadCurrentLesson();
}

function loadCurrentLesson() {
  const heading = document.getElementById('lesson-heading');
  if (!heading) return;

  const course = COURSES_DATA[activeCourseIdx];
  const lesson = course.lessons[activeLessonIdx];
  const isDone = completedLessonIds.includes(lesson.id);

  document.getElementById('lesson-tag').textContent = lesson.moduleTag;
  heading.textContent = lesson.title;
  document.getElementById('lesson-article').innerHTML = lesson.content;
  document.getElementById('lesson-takeaway-text').textContent = lesson.takeaway;

  const statusBadge = document.getElementById('lesson-status-pill');
  const completeBtn = document.getElementById('btn-complete-lesson');

  if (isDone) {
    statusBadge.textContent = 'Completed';
    statusBadge.className = 'status-badge complete';
    completeBtn.textContent = 'Completed (Undo)';
  } else {
    statusBadge.textContent = 'Not Completed';
    statusBadge.className = 'status-badge';
    completeBtn.textContent = 'Mark as Complete';
  }

  const prevBtn = document.getElementById('btn-prev-lesson');
  if (prevBtn) {
    prevBtn.disabled = (activeCourseIdx === 0 && activeLessonIdx === 0);
  }

  renderQuiz(lesson);
}

function toggleLessonComplete() {
  const lesson = COURSES_DATA[activeCourseIdx].lessons[activeLessonIdx];
  const index = completedLessonIds.indexOf(lesson.id);

  if (index > -1) {
    completedLessonIds.splice(index, 1);
    notify('Lesson marked uncompleted.');
  } else {
    completedLessonIds.push(lesson.id);
    notify('Lesson marked complete! +1');
  }

  localStorage.setItem('finwise_vanilla_progress', JSON.stringify(completedLessonIds));
  updateProgressUI();
  renderLessonSidebar();
  loadCurrentLesson();
}

/* ==========================================================================
   Quiz Evaluation Logic
   ========================================================================== */
function renderQuiz(lesson) {
  const qEl = document.getElementById('quiz-question');
  if (!qEl) return;

  const q = lesson.quiz;
  qEl.textContent = q.question;
  const optionsContainer = document.getElementById('quiz-options');
  const feedback = document.getElementById('quiz-feedback');
  const statusLabel = document.getElementById('quiz-status');

  feedback.className = 'quiz-feedback hidden';
  statusLabel.textContent = 'Choose the best answer';
  statusLabel.style.color = '#cbd5e1';

  optionsContainer.innerHTML = q.options.map((opt, i) => `
    <button class="quiz-opt-btn" onclick="checkQuizAnswer(${i})">${opt}</button>
  `).join('');
}

function checkQuizAnswer(chosenIdx) {
  const lesson = COURSES_DATA[activeCourseIdx].lessons[activeLessonIdx];
  const q = lesson.quiz;
  const feedback = document.getElementById('quiz-feedback');
  const statusLabel = document.getElementById('quiz-status');

  feedback.classList.remove('hidden');

  if (chosenIdx === q.correctIndex) {
    feedback.className = 'quiz-feedback success';
    feedback.textContent = `Correct! ${q.explanation}`;
    statusLabel.textContent = '✓ Answered Correctly';
    statusLabel.style.color = '#34d399';

    if (!completedLessonIds.includes(lesson.id)) {
      completedLessonIds.push(lesson.id);
      localStorage.setItem('finwise_vanilla_progress', JSON.stringify(completedLessonIds));
      updateProgressUI();
      renderLessonSidebar();
      
      const statusBadge = document.getElementById('lesson-status-pill');
      const completeBtn = document.getElementById('btn-complete-lesson');
      if (statusBadge) {
        statusBadge.textContent = 'Completed';
        statusBadge.className = 'status-badge complete';
      }
      if (completeBtn) completeBtn.textContent = 'Completed (Undo)';
    }
  } else {
    feedback.className = 'quiz-feedback error';
    feedback.textContent = `Not quite: ${q.explanation}`;
    statusLabel.textContent = '✗ Try again';
    statusLabel.style.color = '#f87171';
  }
}

/* ==========================================================================
   Pure Canvas 50/30/20 Budget Drawing
   ========================================================================== */
function drawBudgetCanvas(income) {
  const canvas = document.getElementById('budgetCanvas');
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const centerX = w / 2;
  const centerY = h / 2;
  const radius = Math.min(centerX, centerY) - 20;
  const innerRadius = radius * 0.65;

  ctx.clearRect(0, 0, w, h);

  const slices = [
    { pct: 0.50, color: '#0284c7' },
    { pct: 0.30, color: '#f59e0b' },
    { pct: 0.20, color: '#10b981' }
  ];

  let startAngle = -0.5 * Math.PI;

  slices.forEach(slice => {
    const sliceAngle = slice.pct * 2 * Math.PI;
    const endAngle = startAngle + sliceAngle;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = slice.color;
    ctx.fill();

    startAngle = endAngle;
  });

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 22px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`$${Number(income).toLocaleString()}`, centerX, centerY - 6);

  ctx.font = '11px system-ui, sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.fillText('MONTHLY NET', centerX, centerY + 16);
}

function updateBudgetMetrics(income) {
  const needs = Math.round(income * 0.5);
  const wants = Math.round(income * 0.3);
  const savings = Math.round(income * 0.2);

  const nEl = document.getElementById('val-needs');
  const wEl = document.getElementById('val-wants');
  const sEl = document.getElementById('val-savings');

  if (nEl) nEl.textContent = `$${needs.toLocaleString()}`;
  if (wEl) wEl.textContent = `$${wants.toLocaleString()}`;
  if (sEl) sEl.textContent = `$${savings.toLocaleString()}`;

  // Update Tips & Legend amounts dynamically
  ['tip-needs', 'leg-needs'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = `$${needs.toLocaleString()}`;
  });
  ['tip-wants', 'leg-wants'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = `$${wants.toLocaleString()}`;
  });
  ['tip-savings', 'leg-savings'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = `$${savings.toLocaleString()}`;
  });

  drawBudgetCanvas(income);
}

/* ==========================================================================
   Glossary Search and Render
   ========================================================================== */
function renderGlossary(filter = '') {
  const container = document.getElementById('glossary-grid');
  if (!container) return;

  const matches = GLOSSARY_DATA.filter(item =>
    item.term.toLowerCase().includes(filter.toLowerCase()) ||
    item.def.toLowerCase().includes(filter.toLowerCase())
  );

  if (matches.length === 0) {
    container.innerHTML = '<p class="text-muted">No terms match your search filter.</p>';
    return;
  }

  container.innerHTML = matches.map(item => `
    <div class="glossary-card">
      <h4>${item.term}</h4>
      <p>${item.def}</p>
    </div>
  `).join('');
}

/* ==========================================================================
   Certificate Modal Handling
   ========================================================================== */
function openCertificateModal() {
  const overall = calculateOverallProgress();
  const modal = document.getElementById('cert-modal');
  if (!modal) return;

  const dateEl = document.getElementById('cert-date');
  const header = document.getElementById('cert-status-header');
  const countEl = document.getElementById('cert-lesson-count');

  if (dateEl) dateEl.textContent = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  if (countEl) countEl.textContent = `${overall.completedCount} / ${overall.totalLessons} lessons completed (${overall.pct}%)`;

  if (header) {
    if (overall.pct === 100) {
      header.textContent = "All 3 Courses Completed!";
      header.style.color = "#059669";
    } else {
      header.textContent = `Track In Progress: ${overall.pct}% Complete`;
      header.style.color = "#b45309";
    }
  }

  modal.classList.remove('hidden');
}

function closeCertificateModal() {
  const modal = document.getElementById('cert-modal');
  if (modal) modal.classList.add('hidden');
}

/* ==========================================================================
   Bootstrapping & Event Binding
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  updateProgressUI();

  // Page 1: Course Catalog (index.html)
  if (document.getElementById('courses-grid')) {
    renderCourseCatalog();

    const resetBtn = document.getElementById('btn-reset-data');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (completedLessonIds.length === 0) return;
        completedLessonIds = [];
        localStorage.removeItem('finwise_vanilla_progress');
        updateProgressUI();
        renderCourseCatalog();
        notify('All learning records reset.');
      });
    }

    document.querySelectorAll('.tracker-item').forEach(item => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.getAttribute('data-course-idx'), 10);
        window.location.href = `lesson.html?course=${idx}&lesson=0`;
      });
    });
  }

  // Page 2: Active Lesson Player (lesson.html)
  if (document.getElementById('player-section')) {
    document.querySelectorAll('.course-tab').forEach((tab, i) => {
      tab.classList.toggle('active', i === activeCourseIdx);
      tab.addEventListener('click', () => switchCourse(i));
    });

    renderLessonSidebar();
    loadCurrentLesson();

    const compBtn = document.getElementById('btn-complete-lesson');
    if (compBtn) compBtn.addEventListener('click', toggleLessonComplete);

    const prevBtn = document.getElementById('btn-prev-lesson');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (activeLessonIdx > 0) {
          selectLesson(activeLessonIdx - 1);
        } else if (activeCourseIdx > 0) {
          activeCourseIdx--;
          activeLessonIdx = COURSES_DATA[activeCourseIdx].lessons.length - 1;
          switchCourse(activeCourseIdx);
          selectLesson(activeLessonIdx);
        }
      });
    }

    const nextBtn = document.getElementById('btn-next-lesson');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const currentCourse = COURSES_DATA[activeCourseIdx];
        if (activeLessonIdx < currentCourse.lessons.length - 1) {
          selectLesson(activeLessonIdx + 1);
        } else if (activeCourseIdx < COURSES_DATA.length - 1) {
          switchCourse(activeCourseIdx + 1);
          notify(`Advanced to Course ${activeCourseIdx + 1}!`);
        } else {
          openCertificateModal();
        }
      });
    }
  }

  // Page 3: Budget Lab (budget-lab.html)
  if (document.getElementById('budgetCanvas')) {
    updateBudgetMetrics(4000);

    const numInput = document.getElementById('input-income');
    const rngInput = document.getElementById('range-income');

    if (numInput && rngInput) {
      numInput.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value) || 0;
        rngInput.value = val;
        updateBudgetMetrics(val);
      });

      rngInput.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value) || 0;
        numInput.value = val;
        updateBudgetMetrics(val);
      });
    }
  }

  // Page 4: Glossary (financial.html / index.html section)
  if (document.getElementById('glossary-grid')) {
    renderGlossary();

    const searchInput = document.getElementById('glossary-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        renderGlossary(e.target.value);
      });
    }
  }

  // Global Certificate Modal Events
  const openCertBtn = document.getElementById('btn-open-cert');
  const closeCertBtn = document.getElementById('btn-close-cert');
  const dismissBtn = document.getElementById('btn-modal-dismiss');
  const modalBackdrop = document.getElementById('cert-modal');

  if (openCertBtn) openCertBtn.addEventListener('click', openCertificateModal);
  if (closeCertBtn) closeCertBtn.addEventListener('click', closeCertificateModal);
  if (dismissBtn) dismissBtn.addEventListener('click', closeCertificateModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target.id === 'cert-modal') closeCertificateModal();
    });
  }
});