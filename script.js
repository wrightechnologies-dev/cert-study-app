// A LIST (array) of questions. Each one is an object like before.
// Add as many as you want here — just keep the same shape.
const quizzes = {
  cissp: [
    {
      text: "Which principle ensures that information is not disclosed to unauthorized individuals?",
      answers: ["Integrity", "Confidentiality", "Availability", "Non-repudiation"],
      correctIndex: 1,
      explanation: "Confidentiality is the CIA triad principle concerned with preventing unauthorized disclosure of information. Integrity addresses unauthorized alteration, and availability addresses access when needed."
    },
    {
      text: "Which principle ensures that data has not been altered by unauthorized parties?",
      answers: ["Confidentiality", "Availability", "Integrity", "Authentication"],
      correctIndex: 2,
      explanation: "Integrity ensures data has not been modified by unauthorized parties, preserving its accuracy and trustworthiness. Confidentiality concerns disclosure, and availability concerns access — neither addresses unauthorized alteration."
    },
    {
      text: "A CIA triad component that ensures systems and data are accessible when needed is:",
      answers: ["Availability", "Accounting", "Authorization", "Auditing"],
      correctIndex: 0,
      explanation: "Availability ensures that systems, data, and services are accessible to authorized users when needed. Accounting, authorization, and auditing relate to access control and tracking, not to the CIA triad's guarantee of access."
    },
    {
      text: "Which access control model uses labels and clearances (e.g., Top Secret) enforced by the system?",
      answers: ["Discretionary Access Control (DAC)", "Role-Based Access Control (RBAC)", "Mandatory Access Control (MAC)", "Rule-Based Access Control"],
      correctIndex: 2,
      explanation: "Mandatory Access Control (MAC) assigns security labels to subjects and objects, and the system — not the data owner — enforces access based on clearance levels. DAC leaves access decisions to the owner, and RBAC grants access based on job roles."

    },
    {
      text: "What does 'non-repudiation' provide?",
      answers: ["Proof that data is encrypted", "Assurance a party cannot deny performing an action", "Guaranteed uptime", "Faster authentication"],
      correctIndex: 1,
      explanation: "Non-repudiation ensures that a party cannot deny having performed an action, typically achieved through digital signatures and audit logs. It provides accountability, not encryption, uptime, or authentication speed."
    }
  ],
  securityPlus: [
    {
      text: "Which type of malware disguises itself as legitimate software to trick users into installing it?",
      answers: ["Worm", "Trojan", "Rootkit", "Ransomware"],
      correctIndex: 1,
      explanation: "A Trojan disguises itself as legitimate or desirable software to trick users into installing it, then carries out malicious actions. A worm spreads on its own, and a rootkit hides its presence to maintain access."
    },
    {
      text: "Which protocol provides encrypted remote command-line access to a device?",
      answers: ["Telnet", "SSH", "FTP", "SNMP"],
      correctIndex: 1,
      explanation: "SSH (Secure Shell) provides encrypted remote command-line access, protecting credentials and session data in transit. Telnet offers similar access but sends everything in plaintext, while FTP transfers files and SNMP manages network devices."
    },
    {
      text: "What does a firewall primarily use to allow or block traffic?",
      answers: ["Rules based on ports, protocols, and addresses", "Antivirus signatures", "User passwords", "CPU usage thresholds"],
      correctIndex: 0,
      explanation: "A firewall filters traffic using rules based on ports, protocols, and IP addresses, deciding what to allow or block. Antivirus signatures detect malware, not network traffic flow, and passwords and CPU thresholds are unrelated to filtering decisions."
    }
  ],
  aPlus: [
    {
      text: "Which connector is used to attach a modern internal SATA hard drive's data cable?",
      answers: ["7-pin SATA", "40-pin IDE", "15-pin power", "6-pin PCIe"],
      correctIndex: 0,
      explanation: "SATA data cables use a flat 7-pin connector. The 40-pin IDE connector belongs to older PATA drives, the 15-pin connector is SATA power (not data), and 6-pin PCIe is for graphics card power."
    },
    {
      text: "A user reports their laptop won't charge. Which component should you check first?",
      answers: ["The RAM", "The AC adapter and charging port", "The GPU", "The optical drive"],
      correctIndex: 1,
      explanation: "For a no-charge symptom, start with the AC adapter and charging port, since those are directly in the power path and the most common failure points. RAM, GPU, and optical drives are unrelated to charging."
    },
    {
      text: "Which Windows utility lets you view and manage startup programs, running processes, and performance?",
      answers: ["Disk Cleanup", "Task Manager", "Device Manager", "Event Viewer"],
      correctIndex: 1,
      explanation: "Task Manager shows running processes, startup items, and real-time performance. Device Manager handles hardware and drivers, Event Viewer shows logs, and Disk Cleanup frees storage space."
    }
  ],
  networkPlus: [
    {
      text: "Which layer of the OSI model is responsible for logical addressing and routing?",
      answers: ["Data Link (Layer 2)", "Network (Layer 3)", "Transport (Layer 4)", "Physical (Layer 1)"],
      correctIndex: 1,
      explanation: "The Network layer (Layer 3) handles logical addressing (IP) and routing between networks. Layer 2 handles physical (MAC) addressing on a local segment, Layer 4 manages end-to-end delivery, and Layer 1 moves raw bits."
    },
    {
      text: "Which port does HTTPS use by default?",
      answers: ["80", "22", "443", "53"],
      correctIndex: 2,
      explanation: "HTTPS uses port 443 by default. Port 80 is plain HTTP, port 22 is SSH, and port 53 is DNS."
    },
    {
      text: "Which device forwards traffic between different networks based on IP addresses?",
      answers: ["Switch", "Hub", "Router", "Repeater"],
      correctIndex: 2,
      explanation: "A router forwards traffic between separate networks using IP addresses. A switch forwards frames within a network using MAC addresses, a hub simply repeats signals to all ports, and a repeater extends a signal's range."
    }
  ],
  microsoft: [
    {
      text: "In Microsoft's cloud model, which service type provides virtual machines where you manage the OS and applications?",
      answers: ["SaaS", "PaaS", "IaaS", "FaaS"],
      correctIndex: 2,
      explanation: "Infrastructure as a Service (IaaS) provides virtualized compute like VMs, where you manage the OS and applications while the provider manages the hardware. PaaS abstracts the OS away, and SaaS delivers finished applications."
    },
    {
      text: "Which Microsoft Entra (Azure AD) feature adds a second verification step at sign-in?",
      answers: ["Single Sign-On", "Multi-Factor Authentication", "Conditional Access", "Self-Service Password Reset"],
      correctIndex: 1,
      explanation: "Multi-Factor Authentication (MFA) requires a second verification step beyond the password, such as a phone approval or code. Single Sign-On reduces repeated logins, and Conditional Access sets policies for when access is granted."
    },
    {
      text: "Which Microsoft 365 tool is primarily used for team chat, meetings, and collaboration?",
      answers: ["SharePoint", "Microsoft Teams", "OneDrive", "Outlook"],
      correctIndex: 1,
      explanation: "Microsoft Teams is the hub for chat, meetings, and collaboration. SharePoint manages sites and documents, OneDrive handles personal file storage, and Outlook is for email and calendar."
    }
  ]
};
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); //pick a random spot from 0..i
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array
}
// ---- Which tracks have domains, and what they're called ----
// A track listed here gets a domain-selection screen.
// A track NOT listed here just starts its quiz normally.
const trackDomains = {
  cissp: [
    { id: 1, name: "Security & Risk Management" },
    { id: 2, name: "Asset Security" },
    { id: 3, name: "Security Architecture & Engineering" },
    { id: 4, name: "Communication & Network Security" },
    { id: 5, name: "Identity & Access Management" },
    { id: 6, name: "Security Assessment & Testing" },
    { id: 7, name: "Security Operations" },
    { id: 8, name: "Software Development Security" }
  ]
};
//---- Load a track's questions from its JSON file ----
async function loadQuestions(trackName) {
  const response = await fetch("data/" + trackName + ".json");
  const data = await response.json();
  return data;
}
// ---- STATE: what the app needs to remember as you play ----
let currentTrack = "cissp";  //Which exam track is active 
let questions = [];
let currentIndex = 0;   // which question we're on (starts at the first)
let score = 0;          // how many correct so far
let answered = false;   // has the user answered the current question yet?

// ---- Grab the page elements ----
const questionEl = document.getElementById("question");
const progressE1 = document.getElementById("progress");
const answerButtons = document.querySelectorAll(".answer-btn");
const feedbackEl = document.getElementById("feedback");
const explanationEl = document.getElementById("explanation");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const quizArea = document.getElementById("quiz-area");
const trackSelectEl = document.getElementById("track-select");
const domainSelectEl = document.getElementById("domain-select");
const domainButtonsEl = document.getElementById("domain-buttons");
const domainBackBtn = document.getElementById("domain-back-btn");



// ---- Show a question on the page ----
function showQuestion() {
  answered = false;
  nextBtn.disabled = true;
  feedbackEl.textContent = "";
  explanationEl.textContent = "";
  explanationEl.classList.remove("has-text");

  const q = questions[currentIndex];      // the current question object
  const correctText = q.answers[q.correctIndex];  //Remember the correct answer text 
  shuffle(q.answers); // scramble the questions answer 
  q.correctIndex = q.answers.indexOf(correctText); //find where the text landed now 
  progressE1.textContent = "Question " + (currentIndex + 1) + " of " + questions.length;
  questionEl.textContent = q.text;

  answerButtons.forEach(function (button, index) {
    button.textContent = q.answers[index];
    button.style.background = "#f9f9f9";  // reset color from any previous question
    button.disabled = false;
  });
}

// ---- Handle a click on an answer ----
answerButtons.forEach(function (button, index) {
  button.addEventListener("click", function () {
    if (answered) return;   // ignore extra clicks after answering
    answered = true;
    answerButtons.forEach(function (btn) {
      btn.disabled = true;
    });
    nextBtn.disabled = false;

    const q = questions[currentIndex];

    if (index === q.correctIndex) {
      score = score + 1;
      feedbackEl.textContent = "Correct!";
      feedbackEl.style.color = "green";
      button.style.background = "#c6f6d5";  // light green on the button cliclked

    } else {
      feedbackEl.textContent = "Not quite — the answer is: " + q.answers[q.correctIndex];
      feedbackEl.style.color = "red";
      button.style.background = "#fed7d7";
      answerButtons[q.correctIndex].style.background = "#c6f6d5";
    }
    explanationEl.textContent = q.explanation || "";
    if (q.explanation) {
      explanationEl.classList.add("has-text");
    }
  });
});

// ---- Show the final score ----
function showResults() {
  questionEl.textContent = "Quiz complete!";
  progressE1.textContent = "";
  explanationEl.textContent = "";
  explanationEl.classList.remove("has-text")
  feedbackEl.style.color = "black";
  feedbackEl.textContent = "You scored " + score + " out of " + questions.length + ".";
  answerButtons.forEach(function (button) {
    button.style.display = "none";   // hide the answer buttons on the results screen
  });
  nextBtn.style.display = "none";   //hide next button on results screen
  restartBtn.style.display = "inline-block";  // show the restart button

}
////When the Next button is clicked, advance the quiz.
nextBtn.addEventListener("click", function () {
  currentIndex = currentIndex + 1;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
});
// When Restart is clicked, reset everything and start over.
restartBtn.addEventListener("click", function () {
  currentIndex = 0;
  score = 0;

  restartBtn.style.display = "none";
  nextBtn.style.display = "inline-block";

  answerButtons.forEach(function (button) {
    button.style.display = "block";
  });

  showQuestion();
});

// Start the quiz from a chosen path 
async function startQuiz(trackName, domainId) {
  domainSelectEl.style.display = "none";   // hide the domain screen if it was showing
  quizArea.style.display = "block";  // sets the display back to visible the moment a track is clicked, so the real question loads into a now-visible area.
  currentTrack = trackName;     //remember which track its on 
 
const allQuestions = await loadQuestions(currentTrack);   // load the whole track

// Filter to one domain, unless "all" (or no domain) was chosen
  if (domainId && domainId !== "all") {
    questions = allQuestions.filter(function (q) {
      return q.domain === domainId;
    });
  } else {
    questions = allQuestions;
  }
  // Guard: if this domain has no questions yet, bounce back instead of showing a broken quiz
  if (questions.length === 0) {
    quizArea.style.display = "none";
    domainSelectEl.style.display = "block";
    alert("No questions available for this domain yet. Check back soon!");
    return;
  }

  currentIndex = 0;
  score = 0;

  shuffle(questions); // scramble the question order 
  showQuestion(); //displays the first one 
}
// --- Wire each track to start its quiz---
const trackButtons = document.querySelectorAll(".track-btn");

trackButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const chosenTrack = button.dataset.track;   //read the data-track value 

    if (trackDomains[chosenTrack]) {  // This track HAS domains — show the domain screen.
      showDomainScreen(chosenTrack);
    } else {  // No domains — start the quiz directly, like before.
      startQuiz(chosenTrack); //start the quiz for that value
    }
    });
});
    // ---- Back button: return from domain screen to track screen ----
domainBackBtn.addEventListener("click", function () {
  domainSelectEl.style.display = "none";   // hide the domain screen
  trackSelectEl.style.display = "block";   // show the track buttons again
  });

  function showDomainScreen(trackName) {
  currentTrack = trackName;                 // remember which track we're in
  trackSelectEl.style.display = "none";     // hide the track buttons
  domainButtonsEl.innerHTML = "";           // clear any buttons from a previous visit

  const domains = trackDomains[trackName];  // the array of {id, name} for this track

  // Build one button per domain, from the config data
  domains.forEach(function (domain) {
    const btn = document.createElement("button");
    btn.className = "domain-btn";
    btn.textContent = domain.id + ". " + domain.name;
    btn.addEventListener("click", function () {
      startQuiz(trackName, domain.id);      // start quiz filtered to this domain
    });
    domainButtonsEl.appendChild(btn);
  });

  // Add the "All Domains" button
  const allBtn = document.createElement("button");
  allBtn.className = "domain-btn";
  allBtn.textContent = "All Domains (full quiz)";
  allBtn.addEventListener("click", function () {
    startQuiz(trackName, "all");            // "all" = no filter
  });
  domainButtonsEl.appendChild(allBtn);

  domainSelectEl.style.display = "block";   // reveal the domain screen
}
quizArea.style.display = "none";