// Course array data source
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the basic concepts of program development including data types, control structures, and functions.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to markup and formatting languages used to create web pages.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students become more proficient in writing programs by studying procedural programming and functions.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces the concepts of object-oriented programming using classes and objects.',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students learn to create dynamic websites using JavaScript to interact with the DOM.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Focuses on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

// Select DOM elements
const courseContainer = document.querySelector('.course-card-list');
const totalCreditsElement = document.querySelector('#total-credits');
const btnAll = document.querySelector('#btn-all');
const btnCse = document.querySelector('#btn-cse');
const btnWdd = document.querySelector('#btn-wdd');

// Render course cards dynamically
function displayCourses(filteredCourses) {
    courseContainer.innerHTML = ''; // Clear container

    filteredCourses.forEach(course => {
        const item = document.createElement('div');
        
        // Use custom non-framework class names
        item.classList.add('course-box');
        if (course.completed) {
            item.classList.add('completed-course');
        }
        
        item.innerHTML = `<h4>${course.subject} ${course.number}</h4>`;
        
        courseContainer.appendChild(item);
    });

    // Calculate total credits using reduce()
    calculateTotalCredits(filteredCourses);
}

// Calculate total credits for currently displayed courses
function calculateTotalCredits(courseList) {
    const totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);
    if (totalCreditsElement) {
        totalCreditsElement.textContent = `The total credits for courses listed above is ${totalCredits}`;
    }
}

// Event Listeners for Filter Buttons
btnAll.addEventListener('click', (e) => {
    e.preventDefault();
    displayCourses(courses);
});

btnCse.addEventListener('click', (e) => {
    e.preventDefault();
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    displayCourses(cseCourses);
});

btnWdd.addEventListener('click', (e) => {
    e.preventDefault();
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    displayCourses(wddCourses);
});

// Initial Page Load
displayCourses(courses);