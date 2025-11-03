// WDD 231 - Course Array for Certificate Display
const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands-on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
    technology: ['HTML', 'CSS'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
    technology: ['C#'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: false
  }
];

// Get DOM elements
const coursesContainer = document.querySelector('.course-grid');
const allButton = document.querySelector('#all');
const cseButton = document.querySelector('#cse');
const wddButton = document.querySelector('#wdd');
const creditsDisplay = document.querySelector('#credits');

// Display courses function
function displayCourses(filteredCourses) {
  coursesContainer.innerHTML = '';
  
  filteredCourses.forEach(course => {
    const courseCard = document.createElement('div');
    courseCard.classList.add('course-card');
    
    // Add completed class if the course is completed
    if (course.completed) {
      courseCard.classList.add('completed');
    }
    
    courseCard.innerHTML = `
      <h3>${course.subject} ${course.number}</h3>
      <p>${course.title}</p>
      <p class="credits">${course.credits} Credits</p>
    `;
    
    coursesContainer.appendChild(courseCard);
  });
  
  // Update credits display
  updateCredits(filteredCourses);
}

// Calculate and display total credits using reduce
function updateCredits(filteredCourses) {
  const totalCredits = filteredCourses.reduce((total, course) => {
    return total + course.credits;
  }, 0);
  
  creditsDisplay.textContent = totalCredits;
}

// Filter courses by subject
function filterCourses(subject) {
  if (subject === 'all') {
    displayCourses(courses);
  } else {
    const filtered = courses.filter(course => course.subject === subject.toUpperCase());
    displayCourses(filtered);
  }
}

// Event listeners for filter buttons
allButton.addEventListener('click', () => {
  filterCourses('all');
  setActiveButton(allButton);
});

cseButton.addEventListener('click', () => {
  filterCourses('cse');
  setActiveButton(cseButton);
});

wddButton.addEventListener('click', () => {
  filterCourses('wdd');
  setActiveButton(wddButton);
});

// Set active button styling
function setActiveButton(activeBtn) {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  activeBtn.classList.add('active');
}

// Initialize - display all courses on page load
displayCourses(courses);

