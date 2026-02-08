

/* =========================
   LOGIN MODAL LOGIC
========================= */
function toggleLogin() {
    const modal = document.getElementById('loginModal');
    modal.style.display = (modal.style.display === "flex") ? "none" : "flex";
}

// Close if clicked outside
window.onclick = function(e) {
    const modal = document.getElementById('loginModal');
    if (e.target == modal) modal.style.display = "none";
}

/* =========================
   SMOOTH SCROLL
========================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
/* --- Simple Slider Logic --- */
const slides = document.querySelectorAll(".hero img");
let index = 0;

function rotateSlides() {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
}

if (slides.length > 0) {
    setInterval(rotateSlides, 4500);
}

/* --- Smooth Scrolling for Navigation --- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
/* =========================
   NEWS SEARCH FILTER
========================= */
const searchInput = document.getElementById('newsSearch');
if (searchInput) {
    searchInput.addEventListener('keyup', function() {
        let filter = searchInput.value.toLowerCase();
        let newsItems = document.querySelectorAll('.news-item');

        newsItems.forEach(item => {
            let title = item.querySelector('h3').innerText.toLowerCase();
            let summary = item.querySelector('p').innerText.toLowerCase();
            
            if (title.includes(filter) || summary.includes(filter)) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });
    });
}
/* =========================
   SIMULATED SIGN-UP/LOGIN
========================= */
const signupForm = document.querySelector('#signupForm form');
if(signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Registration Successful! Your details have been sent to the College Admin for approval.");
        togglePortal(); // Switch back to login
    });
}

const loginForm = document.querySelector('#loginForm form');
if(loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Just for demo purposes
        window.location.href = "index.html"; 
    });
}

if(username === "admin" && password === "college123") {
    window.location.href = "index.html";
} else {
    alert("Access Denied!");
}

window.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.querySelector('.login-btn'); // Matches your index.html class
    const savedName = localStorage.getItem('userName');

    if (savedName && loginBtn) {
        loginBtn.innerHTML = `<i class="fas fa-user"></i> ${savedName}`;
        loginBtn.href = "#"; // Disable the link to the login page
        
        // Optional: Add a logout option on click
        loginBtn.addEventListener('click', () => {
            if(confirm("Do you want to logout?")) {
                localStorage.clear();
                window.location.reload();
            }
        });
    }
});

function checkAuth() {
    // List pages that require a login
    const protectedPages = ['primary.html', 'secondary.html', 'al.html'];
    const currentPage = window.location.pathname.split("/").pop();

    if (protectedPages.includes(currentPage)) {
        if (!localStorage.getItem('userEmail')) {
            alert("Please login to access this section.");
            window.location.href = "login.html";
        }
    }
}
// Uncomment the line below to activate protection
// checkAuth();


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9sJFks83qlHq_81UMVaEl47UueEd7LZ0",
  authDomain: "school-974a5.firebaseapp.com",
  projectId: "school-974a5",
  storageBucket: "school-974a5.firebasestorage.app",
  messagingSenderId: "423029026810",
  appId: "1:423029026810:web:f32caa5b13721a58a3fe43",
  measurementId: "G-STYH47ME8H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

/* =========================
   DISPLAY BLOGS FROM STORAGE
========================= */
window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('dynamicNewsContainer');
    if (container) {
        const posts = JSON.parse(localStorage.getItem('schoolNews')) || [];
        
        if (posts.length === 0) {
            container.innerHTML = "<p style='text-align:center; grid-column: 1/-1;'>No recent updates available.</p>";
            return;
        }

        posts.forEach(post => {
            const article = document.createElement('article');
            article.className = 'news-item';
            article.innerHTML = `
                <div class="news-thumbnail">
                    <span class="category-tag">${post.category}</span>
                </div>
                <div class="news-content">
                    <span class="post-date"><i class="far fa-calendar-alt"></i> ${post.date}</span>
                    <h3>${post.title}</h3>
                    <p>${post.content.substring(0, 100)}...</p>
                    <a href="#" class="read-more-btn">Read Full Story</a>
                    allow read, write: if true;
                </div>
                rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}

            `;
            container.appendChild(article);
        });
    }
});


