// Course List Array as specified by course guidelines
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will cover the fundamentals of programming, writing code, debugging, and test strategies.',
        technology: [
            'Python'
        ],
        completed: true // Set to true since you completed it
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually building and publishing web pages.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true // Set to true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students are taught more of programming, more about functions and solving large problems using abstraction and modular functions.',
        technology: [
            'Python'
        ],
        completed: true // Set to true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. Students will learn how to use classes and objects to solve problems.',
        technology: [
            'C#'
        ],
        completed: false // Not completed
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic web pages using JavaScript.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true // Set to true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Web Frontend Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Focuses on user experience, accessibility, compliance, performance optimization, and advanced JavaScript techniques.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true // Set to true (Currently taking)
    }
];

// DOM Element Selectors
const courseContainer = document.querySelector('#course-list');
const totalCreditsDisplay = document.querySelector('#total-credits');
const btnAll = document.querySelector('#all');
const btnCse = document.querySelector('#cse');
const btnWdd = document.querySelector('#wdd');

// Function to render courses and calculate credits dynamically
function displayCourses(filteredCourses) {
    courseContainer.innerHTML = '';

    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-card');
        
        // Add a specific class if completed for distinct styling
        if (course.completed) {
            card.classList.add('completed');
        }

        card.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title} (${course.credits} credits)</p>
        `;

        courseContainer.appendChild(card);
    });

    // Calculate total credits for the currently displayed courses using reduce()
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsDisplay.textContent = `The total credits for courses listed above is ${totalCredits}`;
}

// Event Listeners for Filtering Buttons
btnAll.addEventListener('click', () => {
    setActiveButton(btnAll);
    displayCourses(courses);
});

btnCse.addEventListener('click', () => {
    setActiveButton(btnCse);
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    displayCourses(cseCourses);
});

btnWdd.addEventListener('click', () => {
    setActiveButton(btnWdd);
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    displayCourses(wddCourses);
});

// Helper function to manage active button states
fnsetActiveButton = (activeBtn) => {
    [btnAll, btnCse, btnWdd].forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
};

function setActiveButton(activeBtn) {
    [btnAll, btnCse, btnWdd].forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

// Initial load: display all courses on page startup
displayCourses(courses);