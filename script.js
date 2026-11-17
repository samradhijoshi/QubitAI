// ==========================================
// 1. QUBITAI AI CHAT SYSTEM
// ==========================================

const chatInput = document.querySelector(".chat-input input");
const sendButton = document.querySelector(".chat-input button");
const assistantCard = document.querySelector(".assistant-card");

function sendMessage() {
    if (!chatInput || !assistantCard) return;

    const message = chatInput.value.trim();

    if (message === "") {
        alert("Please enter a message!");
        return;
    }

    const userMessage = document.createElement("div");
    userMessage.classList.add("chat-message");
    userMessage.textContent = message;

    assistantCard.insertBefore(userMessage, document.querySelector(".chat-input"));

    chatInput.value = "";

    setTimeout(() => {
        const aiMessage = document.createElement("div");
        aiMessage.classList.add("chat-message");
        aiMessage.textContent = getAIResponse(message);

        assistantCard.insertBefore(aiMessage, document.querySelector(".chat-input"));
    }, 500);
}

function getAIResponse(message) {
    const text = message.toLowerCase();

    if (text.includes("hello") || text.includes("hi")) {
        return "Hello! 👋 Welcome to QubitAI. How can I help you?";
    }

    if (text.includes("python")) {
        return "Python is a powerful programming language. Keep practicing!";
    }

    if (text.includes("study")) {
        return "Make a daily study plan and complete your tasks one by one.";
    }

    if (text.includes("career")) {
        return "Keep improving your technical skills and building projects!";
    }

    return "I'm QubitAI! I'm here to help you with your learning journey.";
}

if (sendButton) {
    sendButton.addEventListener("click", sendMessage);
}


// ==========================================
// 2. MANUAL PROGRESS TRACKER
// ==========================================

const progressInput = document.getElementById("progressInput");
const progressCircle = document.getElementById("progressCircle");
const progressPercentage = document.getElementById("progressPercentage");
const updateProgressBtn = document.getElementById("updateProgressBtn");
const progressMessage = document.getElementById("progressMessage");

if (updateProgressBtn) {
    updateProgressBtn.addEventListener("click", function () {

        const value = Number(progressInput.value);

        if (
            !progressInput ||
            progressInput.value.trim() === "" ||
            value < 0 ||
            value > 100
        ) {
            if (progressMessage) {
                progressMessage.textContent = "Enter a number between 0 and 100.";
            }
            return;
        }

        if (progressPercentage) {
            progressPercentage.textContent = value + "%";
        }

        if (progressCircle) {
            progressCircle.style.background =
                `conic-gradient(#8b5cf6 ${value}%, #252b46 ${value}% 100%)`;
        }

        if (progressMessage) {
            progressMessage.textContent =
                "Your progress has been updated! Keep going! 🚀";
        }
    });
}


// ==========================================
// 3. QUIZ PERFORMANCE SYSTEM
// ==========================================

let quizCount = Number(localStorage.getItem("quizCount")) || 0;
let totalScore = Number(localStorage.getItem("totalScore")) || 0;

let quizSubjects = JSON.parse(localStorage.getItem("quizSubjects")) || {
    HTML: 0,
    CSS: 0,
    JavaScript: 0
};

let answered = false;

function updateDashboard() {

    const percentage = quizCount === 0
        ? 0
        : Math.round(totalScore / quizCount);

    const overallScore = document.getElementById("overallScore");

    if (overallScore) {
        overallScore.textContent = percentage + "%";
    }

    const circle = document.querySelector(".performance-circle");

    if (circle) {
        circle.style.background =
            `conic-gradient(#8b5cf6 ${percentage * 3.6}deg, #252b45 0deg)`;
    }

    const quizCountElement = document.getElementById("quizCount");

    if (quizCountElement) {
        quizCountElement.textContent = quizCount;
    }

    const levelElement = document.getElementById("learningLevel");

    if (levelElement) {
        levelElement.textContent =
            percentage >= 80 ? "Advanced" :
            percentage >= 50 ? "Intermediate" : "Beginner";
    }

    const rankElement = document.getElementById("estimatedRank");

    if (rankElement) {
        rankElement.textContent =
            percentage >= 90 ? "Top Performer" :
            percentage >= 70 ? "Good" : "Keep Improving";
    }

    const subjectProgress = document.getElementById("subjectProgress");

    if (subjectProgress) {
        let html = "";

        for (let subject in quizSubjects) {
            html += `
                <div class="subject-item">
                    <p>${subject}: ${quizSubjects[subject]}%</p>
                    <div class="progress-track">
                        <div class="progress-fill"
                             style="width:${quizSubjects[subject]}%">
                        </div>
                    </div>
                </div>
            `;
        }

        subjectProgress.innerHTML = html;
    }

    const suggestion = document.getElementById("suggestionText");

    if (suggestion) {
        suggestion.textContent =
            percentage >= 80
                ? "Excellent! Try advanced challenges."
                : percentage >= 50
                ? "Good progress! Practice daily."
                : "Revise your basics and attempt more quizzes.";
    }
}

function checkAnswer(selected) {

    if (answered) return;

    answered = true;

    const result = document.getElementById("quizResult");

    quizCount++;

    if (selected === 0) {
        totalScore += 100;

        quizSubjects.HTML = Math.min(100, quizSubjects.HTML + 10);

        if (result) {
            result.textContent = "Correct Answer! Great Job! 🎉";
        }
    } else {
        if (result) {
            result.textContent = "Incorrect Answer. Keep Practicing!";
        }
    }

    localStorage.setItem("quizCount", quizCount);
    localStorage.setItem("totalScore", totalScore);
    localStorage.setItem("quizSubjects", JSON.stringify(quizSubjects));

    updateDashboard();
}


// ==========================================
// 4. SUBJECT ASSESSMENT SYSTEM
// ==========================================

const assessmentQuestions = {

    python: [
        {
            q: "Which keyword defines a function?",
            options: ["function", "def", "fun", "var"],
            answer: 1
        },
        {
            q: "Which symbol is used for comments?",
            options: ["//", "#", "/*", "<!--"],
            answer: 1
        },
        {
            q: "Which is a Boolean value?",
            options: ["Hello", "10", "True", "2.5"],
            answer: 2
        }
    ],

    dbms: [
        {
            q: "Which command retrieves data?",
            options: ["INSERT", "SELECT", "DELETE", "UPDATE"],
            answer: 1
        },
        {
            q: "Which key uniquely identifies a record?",
            options: ["Foreign", "Primary", "Alternate", "None"],
            answer: 1
        },
        {
            q: "What does DBMS stand for?",
            options: [
                "Database Management System",
                "Data Backup System",
                "Digital Base System",
                "None"
            ],
            answer: 0
        }
    ],

    cyber: [
        {
            q: "What is phishing?",
            options: [
                "Programming",
                "Online information theft",
                "Database",
                "Hardware"
            ],
            answer: 1
        },
        {
            q: "What does HTTPS provide?",
            options: ["Encryption", "Storage", "CPU", "RAM"],
            answer: 0
        },
        {
            q: "Which is a strong password?",
            options: [
                "123456",
                "password",
                "Sam123",
                "R@nd0m#92X!"
            ],
            answer: 3
        }
    ]
};

let subjectScores = JSON.parse(
    localStorage.getItem("verifiedScores")
) || {
    python: 0,
    dbms: 0,
    cyber: 0
};

let activeSubject = "";

function updateAcademicProgress() {

    const subjects = {
        python: ["pythonCircle", "pythonPercent"],
        dbms: ["dbmsCircle", "dbmsPercent"],
        cyber: ["cyberCircle", "cyberPercent"]
    };

    for (let subject in subjects) {

        const circle = document.getElementById(subjects[subject][0]);
        const percentage = document.getElementById(subjects[subject][1]);

        const score = subjectScores[subject];

        if (circle) {
            circle.style.setProperty("--progress", score + "%");
        }

        if (percentage) {
            percentage.textContent = score + "%";
        }
    }

    const overall = Math.round(
        Object.values(subjectScores).reduce((a, b) => a + b, 0) / 3
    );

    const overallCircle = document.getElementById("overallCircle");
    const overallPercent = document.getElementById("overallPercent");

    if (overallCircle) {
        overallCircle.style.setProperty("--progress", overall + "%");
    }

    if (overallPercent) {
        overallPercent.textContent = overall + "%";
    }

    localStorage.setItem("verifiedScores", JSON.stringify(subjectScores));
}

function startAssessment(subject) {

    if (!assessmentQuestions[subject]) return;

    activeSubject = subject;

    const area = document.getElementById("assessmentArea");

    if (!area) return;

    let html = `
        <div class="progress-card">
            <h2>${subject.toUpperCase()} Assessment</h2>
            <form id="assessmentForm">
    `;

    assessmentQuestions[subject].forEach((question, index) => {

        html += `
            <div class="question">
                <p>${index + 1}. ${question.q}</p>
        `;

        question.options.forEach((option, i) => {
            html += `
                <label>
                    <input type="radio" name="q${index}" value="${i}" required>
                    ${option}
                </label><br>
            `;
        });

        html += `</div>`;
    });

    html += `
        <button type="submit">Submit Assessment</button>
        </form>
        <div id="assessmentResult"></div>
        </div>
    `;

    area.innerHTML = html;

    document.getElementById("assessmentForm")
        .addEventListener("submit", evaluateAssessment);
}

function evaluateAssessment(event) {

    event.preventDefault();

    const form = document.getElementById("assessmentForm");

    let correct = 0;

    assessmentQuestions[activeSubject].forEach((question, index) => {

        const selected = form.querySelector(
            `input[name="q${index}"]:checked`
        );

        if (selected && Number(selected.value) === question.answer) {
            correct++;
        }
    });

    const total = assessmentQuestions[activeSubject].length;

    const score = Math.round((correct / total) * 100);

    subjectScores[activeSubject] = score;

    updateAcademicProgress();

    document.getElementById("assessmentResult").innerHTML =
        `Assessment Completed!<br>
         Correct Answers: ${correct}/${total}<br>
         Performance: ${score}%`;

    form.querySelectorAll("input, button").forEach(element => {
        element.disabled = true;
    });
}


// ==========================================
// 5. SIGNUP BACKEND CONNECTION
// ==========================================

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const studentData = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            password: document.getElementById("password").value,
            branch: document.getElementById("branch").value
        };

        const message = document.getElementById("signupMessage");

        try {

            const response = await fetch(
                "http://127.0.0.1:5000/api/signup",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(studentData)
                }
            );

            const result = await response.json();

            if (message) {
                message.textContent = result.message;
            }

            if (response.ok) {

                signupForm.reset();

                setTimeout(function() {

                    const loginSection = document.getElementById("login");

                    if (loginSection) {
                        loginSection.scrollIntoView({
                            behavior: "smooth"
                        });
                    }

                }, 1000);

            }

        } catch (error) {

            console.error("Signup Error:", error);

            if (message) {
                message.textContent = "Backend connection failed!";
            }

        }

    });

}
// ==========================================
// 6. LOGIN BACKEND CONNECTION
// ==========================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const loginData = {
            email: document.getElementById("loginEmail").value,
            password: document.getElementById("loginPassword").value
        };

        try {

            const response = await fetch(
                "http://127.0.0.1:5000/api/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(loginData)
                }
            );

            const result = await response.json();

            document.getElementById("loginMessage").textContent =
                result.message;

            if (response.ok) {

                localStorage.setItem("studentName", result.name);
                localStorage.setItem("studentBranch", result.branch || "");

                showStudentDashboard(result.name, result.branch);
            }

        } catch (error) {

            document.getElementById("loginMessage").textContent =
                "Backend connection failed!";
        }
    });
}


// ==========================================
// 7. SHOW STUDENT DASHBOARD
// ==========================================

function showStudentDashboard(name, branch) {

    const dashboard = document.getElementById("student-dashboard");
    const login = document.getElementById("login");
    const register = document.getElementById("register");

    if (login) login.style.display = "none";
    if (register) register.style.display = "none";

    if (dashboard) {

        dashboard.style.display = "block";

        const studentName = document.getElementById("studentName");
        const studentBranch = document.getElementById("studentBranch");

        if (studentName) studentName.textContent = name;
        if (studentBranch) studentBranch.textContent = branch || "Not Provided";

        dashboard.scrollIntoView({ behavior: "smooth" });

    } else {
        alert("Dashboard section not found. Please check its HTML ID.");
    }
}


// ==========================================
// 8. LOGOUT SYSTEM
// ==========================================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function() {

        localStorage.removeItem("studentName");
        localStorage.removeItem("studentBranch");

        const dashboard = document.getElementById("student-dashboard");
        const login = document.getElementById("login");
        const register = document.getElementById("register");

        if (dashboard) dashboard.style.display = "none";
        if (login) login.style.display = "block";
        if (register) register.style.display = "block";

        if (login) {
            login.scrollIntoView({ behavior: "smooth" });
        }
    });
}


// ==========================================
// 9. INITIALIZE QUBITAI
// ==========================================

document.addEventListener("DOMContentLoaded", function() {

    const dashboard = document.getElementById("student-dashboard");

    if (dashboard) {
        dashboard.style.display = "none";
    }

    updateDashboard();
    updateAcademicProgress();

});// SMART STUDY PLANNER

function generatePlan() {

    const subjects = document.getElementById("subjects")
        .value.split(",")
        .map(s => s.trim())
        .filter(s => s !== "");

    const hours = Number(
        document.getElementById("studyHours").value
    );

    const days = Number(
        document.getElementById("studyDays").value
    );

    const result = document.getElementById("studyResult");

    if (subjects.length === 0 || hours < 1 ||
        hours > 16 || days < 1 || days > 30) {

        result.innerHTML = "Please enter valid details!";
        return;
    }

    let html = "<h2>Your Study Timetable 📚</h2>";

    for (let day = 1; day <= days; day++) {

        html += `<div class="study-day">
        <h3>Day ${day}</h3>`;

        subjects.forEach(subject => {

            html += `<p>📖 ${subject} -
            ${(hours / subjects.length).toFixed(1)} hours</p>`;

        });

        html += "</div>";
    }

    result.innerHTML = html;
}
// === QubitAI Live Chat Code ===
const API_KEY = "YOUR_GEMINI_API_KEY_HERE"; 
const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");


if (userInput) {
    userInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });
}

// सेंड बटन (↑) दबाने पर मैसेज भेजें
if (sendBtn) {
    sendBtn.addEventListener("click", sendMessage);
}

async function sendMessage() {
    const text = userInput.value.trim();
    if (text === "" || !chatBox) return;

    appendMessage(text, "user");
    userInput.value = "";

    const loadingId = appendMessage("QubitAI सोच रहा है... ⏳", "ai");

    // यह नियम आपके AI को ChatGPT से खास और अलग बनाएगा
    const specialRules = "You are QubitAI, an ultra-smart personal student companion. Always give structured, point-by-point answers. Help with study plans, placement mock interviews, and detecting scam messages.";

    try {
        const response = await fetch(`https://googleapis.com{API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: specialRules + "\n\nUser Question: " + text }]
                }]
            })
        });

        const data = await response.json();
        const aiReply = data.candidates[0].content.parts[0].text;
        
        document.getElementById(loadingId).innerText = aiReply;

    } catch (error) {
        document.getElementById(loadingId).innerText = "Error: Check API Key or Internet";
    }

function appendMessage(text, sender) {
    const msgDiv = document.createElement("div");
    const uniqueId = "msg-" + Date.now();
    msgDiv.id = uniqueId;
    
    msgDiv.style.padding = "10px 14px";
    msgDiv.style.margin = "8px 0";
    msgDiv.style.borderRadius = "10px";
    msgDiv.style.maxWidth = "85%";
    msgDiv.style.color = "white";
    msgDiv.style.fontSize = "14px";
    
    if (sender === "user") {
        msgDiv.style.backgroundColor = "#3b82f6";
        msgDiv.style.marginLeft = "auto";
    } else {
        msgDiv.style.backgroundColor = "#334155";
        msgDiv.style.marginRight = "auto";
    }

    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return uniqueId;
}