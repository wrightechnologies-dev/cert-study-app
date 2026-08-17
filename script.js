// A LIST (array) of questions. Each one is an object like before.
// Add as many as you want here — just keep the same shape.
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
    {
      id: 1, name: "Security & Risk Management",
      intro: {
        overview: "The governance backbone of the exam: the CIA triad, security control types, the (ISC)² Code of Ethics, risk management concepts (quantitative and qualitative analysis, risk treatment), compliance and legal considerations, and business continuity planning fundamentals.",
        why: "It's the largest domain at 15% — and the most conceptual. The mindset it establishes (manage risk, think like a manager, ethics and legality override convenience) is the lens the entire exam expects you to reason through. Weakness here shows up everywhere.",
        tips: "Memorize the quantitative risk formulas cold: SLE = Asset Value × Exposure Factor, ALE = SLE × ARO. Know the four risk responses (mitigate, transfer, accept, avoid) and that risk acceptance is a legitimate management decision you document rather than override. When ethics and business advantage conflict, the (ISC)² canons always win."
      }
    },
    {
      id: 2, name: "Asset Security",
      intro: {
        overview: "Protecting data across its lifecycle: classification and labeling, ownership roles (owner, custodian, processor), data states (at rest, in transit, in use), data remanence and secure disposal, and retention requirements.",
        why: "Weighted at 10%. This domain is where abstract policy meets concrete handling — it tests whether you can assign the right responsibility to the right role and choose the right protection for the right data state.",
        tips: "Nail the roles: the data owner (a senior business official) is accountable for classification and access decisions; the custodian merely implements what the owner specifies. Match protection to state — TLS for data in transit, encryption for data at rest. For media leaving the organization, remember data remanence means degaussing or physical destruction, not just deletion or formatting."
      }
    },
    {
      id: 3, name: "Security Architecture & Engineering",
      intro: {
        overview: "The engineering core: security models (Bell-LaPadula, Biba, Clark-Wilson), secure design principles, cryptography (symmetric vs. asymmetric, hashing, PKI, digital signatures), and the security capabilities of systems and their vulnerabilities.",
        why: "Weighted at 13% and one of the most technically demanding domains. Cryptography alone accounts for a heavy share of questions, and the concepts here (least privilege, defense in depth, trust models) recur across the network and IAM domains.",
        tips: "For security models, remember the direction of protection: Bell-LaPadula protects confidentiality (no read up, no write down), Biba protects integrity (no read down, no write up). Distinguish what each crypto tool provides — a digital signature gives authenticity and integrity, not confidentiality. Know the tradeoffs of symmetric (fast, key distribution problem) vs. asymmetric (slow, solves key exchange)."
      }
    },
    {
      id: 4, name: "Communication & Network Security",
      intro: {
        overview: "Securing networks and their transmissions: the OSI and TCP/IP models, secure protocols, network segmentation, common network attacks, and the design of secure network architectures including wireless and remote access.",
        why: "Weighted at 13%. Network fundamentals underpin much of security operations and architecture — you're expected to map threats and controls to the right layer of the model and reason about where a control belongs.",
        tips: "Be fluent in the OSI layers and what operates at each — logical addressing and routing at Layer 3, transport and end-to-end delivery at Layer 4. Know your secure-vs-insecure protocol pairs (SSH over Telnet, TLS-protected services over their plaintext equivalents). Understand segmentation and zero-trust concepts as network design choices, not just buzzwords."
      }
    },
    {
      id: 5, name: "Identity & Access Management",
      intro: {
        overview: "Controlling who can access what: identification, authentication, authorization, and accountability; the access control models (DAC, MAC, RBAC, ABAC); federation and single sign-on; and the identity lifecycle from provisioning to deprovisioning.",
        why: "Weighted at 13%. IAM is where access decisions are actually enforced, and the exam leans hard on distinguishing the access control models and understanding multi-factor authentication factors.",
        tips: "Keep the access control models straight: MAC uses system-enforced labels and clearances (the owner can't override), DAC leaves decisions to the data owner, RBAC grants by job role. Know the three authentication factor types (something you know / have / are) and that true MFA combines different types, not two of the same. Don't confuse authentication (proving identity) with authorization (what you're permitted to do)."
      }
    },
    {
      id: 6, name: "Security Assessment & Testing",
      intro: {
        overview: "Verifying that controls work: assessment and test strategies, vulnerability assessments and penetration testing, log reviews and analysis, code review and testing methods (SAST vs. DAST), and reporting to management.",
        why: "Weighted at 12%. This domain tests whether you can choose the right assessment technique for the goal and interpret results — distinguishing, for example, a scan that finds known weaknesses from a test that actively exploits them.",
        tips: "Separate the testing methods clearly: SAST analyzes source code without running it, DAST tests a running application, and penetration testing actively exploits weaknesses to prove impact. Know the difference between a vulnerability assessment (identifies) and a penetration test (exploits). Understand why independent, objective assessment matters for trustworthy results."
      }
    },
    {
      id: 7, name: "Security Operations",
      intro: {
        overview: "Running security day to day: incident response, logging and monitoring (SIEM), the principles of least privilege and separation of duties, personnel controls like mandatory vacations and job rotation, backup strategies, and disaster recovery metrics.",
        why: "Weighted at 13% and one of the broadest domains in practice. It's where governance concepts become operational reality — you're expected to know both the people-and-process controls and the recovery metrics that drive continuity planning.",
        tips: "Memorize the recovery metrics and don't swap them: RTO is maximum tolerable downtime (time to restore), RPO is maximum tolerable data loss (measured as a point in time). Know the 3-2-1 backup rule (three copies, two media types, one offsite). Understand why mandatory vacations and job rotation are detective/deterrent controls against fraud that depends on one person's exclusive control."
      }
    },
    {
      id: 8, name: "Software Development Security",
      intro: {
        overview: "Building security into software: the secure SDLC, common application vulnerabilities (SQL injection, buffer overflow, XSS), secure coding practices like input validation, and managing third-party and supply-chain risk with tools like a software bill of materials.",
        why: "Weighted at 11% — the second-smallest domain, but increasingly emphasized. It rewards understanding why security belongs early in development rather than bolted on at the end.",
        tips: "Match each vulnerability to its primary defense: SQL injection → input validation and parameterized queries; buffer overflow → bounds checking and memory-safe functions; unchecked file uploads → input validation. Remember the economic argument — flaws caught early in the SDLC are far cheaper to fix than those found after release. Know that an SBOM plus regular vulnerability checks addresses third-party/supply-chain risk."
      }
    }
  ],
 securityPlus: [
    {
      id: 1, name: "General Security Concepts",
      intro: {
        overview: "This domain sets the vocabulary the rest of the exam relies on: the types and functions of security controls, the CIA triad plus authenticity and non-repudiation, the AAA framework, zero trust, physical security, and change management.",
        why: "It's weighted at 12% — the smallest domain by percentage, but the widest in scope. The terms defined here show up in questions across every other domain, so a shaky grasp here quietly costs you points everywhere.",
        tips: "Master the two-axis control classification: every control has a type (technical, managerial, operational, physical) AND a function (preventive, detective, corrective, deterrent, compensating). Also expect zero trust — it's new emphasis in SY0-701 — and remember the third A in AAA is Accounting, not Availability."
      }
    },
    {
      id: 2, name: "Threats, Vulnerabilities & Mitigations",
      intro: {
        overview: "The threat landscape in depth: threat actors and their motivations, attack vectors and surfaces, the full range of vulnerability types (application, hardware, cloud, supply-chain, cryptographic), indicators of malicious activity, and the mitigation techniques used to reduce risk.",
        why: "This is the second-largest domain on the exam at 22%. It's also the most scenario-heavy, expecting you to recognize an attack or vulnerability from a described situation and pick the right defense, not just define terms.",
        tips: "Learn to profile threat actors by motivation and resources — an APT is nation-state and stealthy; a script kiddie uses tools they don't understand. Match each attack to its primary mitigation (DDoS → availability defenses, on-path → encryption, privilege escalation → least privilege). Know your mitigation toolkit cold: segmentation, hardening, patching, and least privilege recur constantly."
      }
    },
    {
      id: 3, name: "Security Architecture",
      intro: {
        overview: "Designing secure systems across environments: cloud, on-premises, and hybrid architectures; the security implications of different infrastructure models; data protection strategies including encryption and classification; and resilience concepts like high availability and recovery.",
        why: "Weighted at 18%. This domain tests architectural judgment — choosing the right protection for the right environment and understanding the tradeoffs of each design, rather than memorizing isolated facts.",
        tips: "Understand the shared responsibility model — what the cloud provider secures versus what you secure — since it shifts across IaaS, PaaS, and SaaS. Match data protection to state and context: encryption for data at rest and in transit, classification to drive handling. Know resilience terms (high availability, redundancy, RTO/RPO) and how architecture choices affect them."
      }
    },
    {
      id: 4, name: "Security Operations",
      intro: {
        overview: "Security in day-to-day practice: applying hardening and secure configurations, identity and access management, vulnerability management, monitoring and alerting, incident response, and the automation that ties it together.",
        why: "This is the heaviest domain on the exam at 28% — roughly a quarter of your questions, and the biggest single shift when CompTIA moved to SY0-701. It's operations-focused and heavily scenario-based, testing what security teams actually do day to day.",
        tips: "Know the identity and access controls — MFA factor types, least privilege, provisioning and deprovisioning. Understand the vulnerability management cycle (identify, analyze, remediate, validate) and the phases of incident response (preparation, detection, containment, eradication, recovery, lessons learned). Recognize what a SIEM does and why centralized monitoring matters."
      }
    },
    {
      id: 5, name: "Security Program Management & Oversight",
      intro: {
        overview: "The governance layer: security policies, standards, and procedures; risk management processes; third-party and vendor risk; compliance and audits; and security awareness practices that shape organizational behavior.",
        why: "Weighted at 20% — the third-largest domain, and the most managerial in tone. It asks you to think like a security leader making risk and governance decisions, not a technician configuring a device.",
        tips: "Get comfortable with risk management vocabulary — risk appetite, tolerance, and the four responses (mitigate, transfer, accept, avoid). Know the governance hierarchy: policies (high-level intent) → standards (mandatory rules) → procedures (step-by-step). Third-party/vendor risk and compliance auditing are recurring themes, so understand due diligence and the purpose of an audit."
      }
    }
  ],
    microsoft: [
    {
      id: 1, name: "Security, Compliance & Identity Concepts",
      intro: {
        overview: "The conceptual foundation: the shared responsibility model, defense in depth, the Zero Trust model, encryption and hashing, and Governance/Risk/Compliance (GRC) concepts — plus core identity concepts including authentication, authorization, identity providers, directory services, and federation.",
        why: "Weighted at 10–15% — the smallest domain, but it establishes the vocabulary every later domain reuses. Zero Trust in particular threads through the entire exam, so a shaky grasp here quietly costs points elsewhere.",
        tips: "Know that identity is the primary security perimeter in cloud thinking, and keep authentication (proving who you are) separate from authorization (what you're allowed to do). Understand the three Zero Trust principles (verify explicitly, use least privilege, assume breach) and that the shared responsibility split shifts across IaaS, PaaS, and SaaS."
      }
    },
    {
      id: 2, name: "Capabilities of Microsoft Entra",
      intro: {
        overview: "Microsoft's identity platform: Microsoft Entra ID and its identity types (including agent ID), hybrid identity, authentication methods and MFA, password protection, Conditional Access, Entra roles and RBAC, and identity protection and governance features like access reviews, Privileged Identity Management, and ID Protection.",
        why: "Weighted at 25–30%. This is the identity heart of the exam and the gateway to the role-based SC-300 and AZ-500 tracks. Expect heavy emphasis on how Entra enforces access.",
        tips: "Distinguish the access-management tools: Conditional Access sets the policies that decide when access is granted, MFA adds a second verification factor, and RBAC assigns permissions by role. Know that Privileged Identity Management provides just-in-time elevated access, and that Entra ID is the rebranded Azure AD."
      }
    },
    {
      id: 3, name: "Capabilities of Microsoft Security Solutions",
      intro: {
        overview: "Microsoft's security product portfolio: core Azure infrastructure security (DDoS Protection, Azure Firewall, WAF, NSGs, Bastion, Key Vault, network segmentation), security management via Microsoft Defender for Cloud and CSPM, Microsoft Sentinel (SIEM/SOAR), and threat protection across the Microsoft Defender XDR family.",
        why: "The largest domain at 35–40% — roughly a third of the exam. It's the most product-name-heavy section, and most candidates lose marks here by confusing which Defender product covers what.",
        tips: "Build a mental map of the Defender family: Defender for Endpoint (devices), for Office 365 (email/collaboration), for Identity (on-prem AD signals), for Cloud Apps (SaaS). Know that Sentinel is the cloud-native SIEM/SOAR for collection and correlation, while Defender for Cloud handles posture management (CSPM). Match each Azure tool to its job — Key Vault for secrets, NSGs for subnet traffic rules, Bastion for secure VM access."
      }
    },
    {
      id: 4, name: "Capabilities of Microsoft Compliance Solutions",
      intro: {
        overview: "Microsoft's compliance and data-governance tooling: the Service Trust Portal and Microsoft's privacy principles, compliance management through Microsoft Purview (Compliance Manager and compliance score), information protection and data lifecycle management (classification, sensitivity labels, DLP, records and retention), and insider risk, eDiscovery, and audit capabilities.",
        why: "Weighted at 20–25%. This domain is underrepresented in a lot of study material, so it's where prepared candidates gain an edge. It's Purview-centric and concept-focused rather than configuration-focused.",
        tips: "Anchor everything to Microsoft Purview: Compliance Manager measures your posture and produces a compliance score, sensitivity labels classify and protect data, and DLP prevents unauthorized sharing. Know that retention policies govern how long data is kept, and keep insider risk management, eDiscovery, and audit as three distinct Purview capabilities."
      }
    }
  ],
  networkPlus: [
    { id: 1, name: "Networking Concepts" },
    { id: 2, name: "Network Implementation" },
    { id: 3, name: "Network Operations" },
    { id: 4, name: "Network Security" },
    { id: 5, name: "Network Troubleshooting" }
  ],
  aPlusCore1: [
    { id: 1, name: "Mobile Devices" },
    { id: 2, name: "Networking" },
    { id: 3, name: "Hardware" },
    { id: 4, name: "Virtualization & Cloud Computing" },
    { id: 5, name: "Hardware & Network Troubleshooting" }
  ],
  aPlusCore2: [
    { id: 1, name: "Operating Systems" },
    { id: 2, name: "Security" },
    { id: 3, name: "Software Troubleshooting" },
    { id: 4, name: "Operational Procedures" }
  ]
};

// ---- Optional exam-version label per track ----
// A track listed here shows its version note on the domain screen.
// A track not listed here simply shows no label.
const trackVersions = {
  cissp: "Based on the current (ISC)² CISSP exam outline",
  securityPlus: "Based on CompTIA Security+ SY0-701 objectives",
  microsoft: "Based on Microsoft SC-900 exam objectives (updated July 2026)",
  networkPlus: "Based on CompTIA Network+ N10-009 objectives",
  aPlusCore1: "Based on CompTIA A+ Core 1 (220-1201) objectives",
  aPlusCore2: "Based on CompTIA A+ Core 2 (220-1202) objectives"
};

//---- Load a track's questions from its JSON file ----
async function loadQuestions(trackName) {
  const response = await fetch("data/" + trackName + ".json");
  const data = await response.json();
  return data;
}
// ---- STATE: what the app needs to remember as you play ----
let currentTrack = "cissp";  //Which exam track is active 
let pendingTrack = null;   // track chosen, waiting for primer "Start quiz"
let pendingDomain = null;  // domain chosen, waiting for primer "Start quiz"
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
const versionNoteEl = document.getElementById("version-note");
const newQuizBtn = document.getElementById("new-quiz-btn");
const primerScreenEl = document.getElementById("primer-screen");
const primerTitleEl = document.getElementById("primer-title");
const primerOverviewEl = document.getElementById("primer-overview");
const primerWhyEl = document.getElementById("primer-why");
const primerTipsEl = document.getElementById("primer-tips");
const primerStartBtn = document.getElementById("primer-start-btn");
const primerBackBtn = document.getElementById("primer-back-btn");


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
  restartBtn.style.display = "inline-block"; // show the restart button
  newQuizBtn.style.display = "inline-block";  //Allow user to go back to the track selection screen

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

// When "Choose another quiz" is clicked, return to the track-selection screen.
  newQuizBtn.addEventListener("click", function () {
    // Hide the quiz area and the results-screen buttons
    quizArea.style.display = "none";
    restartBtn.style.display = "none";
    newQuizBtn.style.display = "none";

    // Restore the quiz UI so it's ready for next time
    nextBtn.style.display = "inline-block";
    answerButtons.forEach(function (button) {
      button.style.display = "block";
    });

    // Show the track-selection screen
    trackSelectEl.style.display = "block";
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
// find the chosen domain's config object
function showPrimer(trackName, domainId) {
  const domains = trackDomains[trackName];
  const domainObj = domains.find(function (d) {
    return d.id === domainId;
  });
  // If this domain has no primer, skip straight to the quiz
  if (!domainObj || !domainObj.intro) {
    startQuiz(trackName, domainId);
    return;
  }

  // Remember the selection so "Start quiz" knows what to launch
  pendingTrack = trackName;
  pendingDomain = domainId;

  // Fill the primer screen from the intro object
  primerTitleEl.textContent = domainObj.name;
  primerOverviewEl.textContent = domainObj.intro.overview;
  primerWhyEl.textContent = domainObj.intro.why;
  primerTipsEl.textContent = domainObj.intro.tips;

  // Show the primer, hide the domain screen
  domainSelectEl.style.display = "none";
  primerScreenEl.style.display = "block";
}
// "Start quiz" on the primer launches the pending selection
primerStartBtn.addEventListener("click", function () {
  primerScreenEl.style.display = "none";
  startQuiz(pendingTrack, pendingDomain);
});

// "Back to domains" returns to the domain screen
primerBackBtn.addEventListener("click", function () {
  primerScreenEl.style.display = "none";
  domainSelectEl.style.display = "block";
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
  if (trackVersions[trackName]) {
    versionNoteEl.textContent = trackVersions[trackName];
  } else {
    versionNoteEl.textContent = "";          // Show the exam-version note if this track has one, otherwise clear it
  }

  const domains = trackDomains[trackName];  // the array of {id, name} for this track

  // Build one button per domain, from the config data
  domains.forEach(function (domain) {
    const btn = document.createElement("button");
    btn.className = "domain-btn";
    btn.textContent = domain.id + ". " + domain.name;
    btn.addEventListener("click", function () {
      showPrimer(trackName, domain.id);      // start quiz filtered to this domain
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