// Hamburger menu toggle and varriables storing
const navbutton = document.querySelector("#ham-btn");
const navlinks = document.querySelector("#nav-links");


navbutton.addEventListener("click", () => {
    navbutton.classList.toggle("show");
    navlinks.classList.toggle("show");
})

// Date update, current year and last modified
const currentYear = document.getElementById ("currentyear");
const lastModified = document.getElementById ("lastModified");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = "last Modified:" + document.lastModified;

// Courses, cards and buttons manipulation

// === Course Data from the Array ===
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        technology: ['HTML', 'CSS'],
        completed: true 
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

// === Referencing the elements to varriables ===
const courseContainer = document.querySelector("#course-cards");
const totalCreditsOut = document.querySelector("#total-credits");

// === Render Courses Function ===
function renderCourses(filter = "all") {

    // Filtering courses based in the filter, subject
    let filtered = courses;

    if (filter === "WDD") filtered = courses.filter(c => c.subject === "WDD");
    if (filter === "CSE") filtered = courses.filter(c => c.subject === "CSE");

    // Clearing container to leave room for next render
    courseContainer.innerHTML = "";

    // Build course cards and appending it to the container
    filtered.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course-card");

        if (course.completed) {
            card.classList.add("completed"); // will be used for styling
        }

        card.innerHTML = `
            <p><strong>${course.subject} ${course.number}</strong></p>
        `;

        courseContainer.appendChild(card);
    });

    // Calculating total credits of the filtered courses
    const totalCredits = filtered.reduce((sum, c) => sum + c.credits, 0);
    totalCreditsOut.textContent = `Total Credits: ${totalCredits}`;
}

// adding Event Listeners to buttons
document.querySelector(".filters button[data-filter='all']")
    .addEventListener("click", () => renderCourses("all"));

document.querySelector(".filters button[data-filter='cse']")
    .addEventListener("click", () => renderCourses("CSE"));

document.querySelector(".filters button[data-filter='wdd']")
    .addEventListener("click", () => renderCourses("WDD"));

// Initial Load every time the functions are called
renderCourses();
