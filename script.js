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
// ---- Reversal variants (Stage 4) ----
// In review mode, if a question has a reversal, quiz the reversed direction
// instead of the original wording. Returns the fields to render; correctIndex
// and answers come from whichever variant is active. Records against the SAME
// id either way — a reversal is the same concept, one pool entry.
function activeView(q, isReview) {
  if (isReview && q.reversal) {
    return {
      text: q.reversal.text,
      answers: q.reversal.answers,
      correctIndex: q.reversal.correctIndex,
      explanation: q.reversal.explanation || ""
    };
  }
  return {
    text: q.text,
    answers: q.answers,
    correctIndex: q.correctIndex,
    explanation: q.explanation || ""
  };
}
// ---- localStorage helpers: wrap the stringify/parse so we don't repeat it ----
function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function loadData(key) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}
// ---- Missed-question tracking (Stage 3) ----
// Stored per track under "missed-<track>" as an array of { id, streak }.
// streak = consecutive correct answers IN REVIEW MODE; 2 retires the question.

// Add a miss, or reset an existing entry's streak back to 0.
function recordMiss(track, id) {
  const key = "missed-" + track;
  const list = loadData(key) || [];        // [] if nothing saved yet
  const entry = list.find(function (e) { return e.id === id; });
  if (entry) {
    entry.streak = 0;                      // seen it, missed it again — reset progress
  } else {
    list.push({ id: id, streak: 0 });      // first time missing this one
  }
  saveData(key, list);
}

// A correct answer during review: advance the streak, retire at 2.
function recordReviewCorrect(track, id) {
  const key = "missed-" + track;
  const list = loadData(key) || [];
  const entry = list.find(function (e) { return e.id === id; });
  if (!entry) return;                      // not in the pool; nothing to do
  entry.streak = entry.streak + 1;
  if (entry.streak >= 2) {
    // Retire it: keep every entry EXCEPT this id
    const remaining = list.filter(function (e) { return e.id !== id; });
    saveData(key, remaining);
  } else {
    saveData(key, list);
  }
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
    {
      id: 1, name: "Networking Concepts",
      intro: {
        overview: "The theory foundation: the OSI reference model, common ports and protocols, IP addressing and subnetting, cabling and connector types, network topologies and appliances, cloud concepts, and traffic types (unicast, broadcast, multicast).",
        why: "Weighted at 23% — the second-largest domain and the vocabulary the rest of the exam is built on. Ports, the OSI layers, and subnetting recur constantly in the implementation and troubleshooting domains, so gaps here quietly cost points everywhere.",
        tips: "Memorize the common ports cold (SSH 22, DNS 53, HTTP 80, HTTPS 443, RDP 3389, SNMP 161, Syslog 514) and which OSI layer each function lives at — logical addressing and routing at Layer 3, end-to-end delivery at Layer 4. Drill CIDR and subnetting daily until network, broadcast, and usable host ranges are automatic. Know the RFC 1918 private ranges and the 169.254.0.0/16 APIPA block on sight."
      }
    },
    {
      id: 2, name: "Network Implementation",
      intro: {
        overview: "Building the network: configuring switches and routers, VLANs and 802.1Q trunking, spanning tree, static and dynamic routing, wireless standards and deployment (SSIDs, bands, antennas), and choosing the right cabling and connectors for the job.",
        why: "Weighted at 20%. This is the hands-on configuration domain — it tests whether you can turn concepts into working infrastructure and pick the correct technology for a given requirement.",
        tips: "Know the difference between an access port (one VLAN, untagged) and a trunk port (many VLANs, 802.1Q-tagged). Understand when static routing fits (small/edge) versus a dynamic protocol like OSPF (adapts automatically). For wireless, match the scenario to the fix — a single SSID across APs for seamless roaming, fiber over copper for distance or EMI immunity. Remember PoE (802.3af/at) powers devices over the data cable."
      }
    },
    {
      id: 3, name: "Network Operations",
      intro: {
        overview: "Keeping the network running: monitoring with SNMP and Syslog, performance baselines, documentation and configuration management, high availability and failover, link aggregation, disaster-recovery metrics (RTO/RPO/MTBF), and port mirroring for analysis.",
        why: "Weighted at 19%. Operations gained weight in the N10-009 revision — it's where day-to-day management, redundancy, and business-continuity thinking are tested, not just device setup.",
        tips: "Separate the monitoring tools: SNMP (161) polls device health and sends traps, Syslog (514) centralizes log messages. Don't swap the recovery metrics — RTO is time to restore, RPO is tolerable data loss measured backward in time. Understand that a baseline is your reference for 'normal,' link aggregation (LACP) bundles links for bandwidth and redundancy, and failover provides automatic takeover for high availability."
      }
    },
    {
      id: 4, name: "Network Security",
      intro: {
        overview: "Defending the network: wireless security standards (WPA2/WPA3), access control lists, port security and 802.1X authentication, firewall rule design, network segmentation, and recognizing common Layer 2 attacks like MAC flooding, ARP poisoning, and DHCP starvation.",
        why: "Weighted at 14% — the smallest domain, and it lost a little weight in the N10-009 revision. But it overlaps heavily with Security+ concepts, so the payoff for studying it is high if you're pursuing both certs.",
        tips: "Know that WPA3 is the current strongest wireless standard and WEP is obsolete. Design firewall rules around implicit deny — block by default, permit only what's needed. Understand that 802.1X authenticates devices at the port (often via RADIUS) before granting access, and be able to name the common Layer 2 attacks and the switch features that mitigate them (port security, DHCP snooping, dynamic ARP inspection)."
      }
    },
    {
      id: 5, name: "Network Troubleshooting",
      intro: {
        overview: "Diagnosing and fixing problems: the CompTIA troubleshooting methodology, hardware and cabling tools (cable testers, toner probes), command-line utilities (ping, nslookup, ipconfig), and isolating connectivity, addressing, DNS, duplex, and wireless-interference faults.",
        why: "The largest domain on the exam at 24% — nearly a quarter of your questions, and heavily scenario- and PBQ-based. It rewards a disciplined, methodical approach over guessing.",
        tips: "Memorize the methodology in order: identify the problem, establish a theory, test the theory, establish a plan, implement, verify full functionality, then document — and know that documentation is always the final step. Learn the diagnostic signatures: works by IP but not by name = DNS; APIPA (169.254.x.x) = no DHCP response; on-subnet works but off-subnet fails = wrong default gateway; intermittent drops with duplicate IPs = address conflict."
      }
    }
  ],
  aPlusCore1: [
    {
      id: 1, name: "Mobile Devices",
      intro: {
        overview: "Laptop and mobile hardware: display components (LCD/OLED, backlight), batteries, storage upgrades, and the connectors and accessories that link devices together — USB-C, Lightning, docking stations, and short-range wireless like NFC and Bluetooth.",
        why: "Weighted at 13% — the smallest Core 1 domain, but it's quick-win territory. The concepts are concrete and physical, and much of it overlaps with everyday device support you likely already do.",
        tips: "Know your connectors on sight: USB-C is reversible and now standard, Micro/Mini-USB are the older non-reversible types, Lightning is Apple's legacy connector. Recognize the display fault signatures — a faint image means the backlight failed, not the whole panel. Treat a swollen lithium-ion battery as a safety hazard: never puncture it. Match short-range wireless to use: NFC for tap-to-pay, Bluetooth for peripherals."
      }
    },
    {
      id: 2, name: "Networking",
      intro: {
        overview: "Networking fundamentals from a support technician's angle: Wi-Fi standards and frequency bands, common ports and protocols, cabling and connectors (RJ45, fiber, coax), SOHO routers, DHCP and DNS, and connection types like DSL, cable, and fiber.",
        why: "Weighted at 23% — the third-largest domain, tied closely to real help-desk work. It overlaps with Network+ but stays at a practical, device-facing level rather than deep protocol theory.",
        tips: "Memorize the wireless bands and standards: 802.11ac is 5 GHz only, 802.11ax (Wi-Fi 6) adds 2.4/5 GHz with 6 GHz in Wi-Fi 6E; 2.4 GHz travels farther, 5/6 GHz go faster. Keep the common ports sharp (HTTPS 443, HTTP 80, DNS 53). Recognize a 169.254.x.x address as a DHCP failure (APIPA). Know the connectors — RJ45 for Ethernet, RJ11 for phone, SC/LC/ST for fiber."
      }
    },
    {
      id: 3, name: "Hardware",
      intro: {
        overview: "The physical PC: motherboards, CPUs and cooling, RAM types and form factors, power supplies, storage (HDD, SSD, NVMe) and RAID levels, expansion cards, display and power connectors, and printers (laser, inkjet, thermal, impact) with their maintenance.",
        why: "Weighted at 25% — the second-largest domain and the heart of A+. Hardware plus troubleshooting together make up more than half of Core 1, so this is where the bulk of your study hours belong.",
        tips: "Lock down the RAID levels: 0 is striping (speed, no redundancy), 1 is mirroring, 5 is striping with parity (min 3 drives), 10 is stripe+mirror (min 4). Match RAM to the system — SODIMM for laptops, DIMM for desktops, ECC for servers. Pair each printer type with its symptom and consumable (faded laser = toner, streaky inkjet = clogged nozzles). Always name the ESD wrist strap for static safety."
      }
    },
    {
      id: 4, name: "Virtualization & Cloud Computing",
      intro: {
        overview: "Cloud service models (IaaS, PaaS, SaaS) and deployment models (public, private, hybrid, community), plus local virtualization: hypervisor types, creating VMs, allocating resources, and using snapshots to save and restore VM state.",
        why: "Weighted at 11% — the smallest domain, but conceptually distinct and easy to score on once the models click. It also builds directly toward Cloud+ and other certs if you continue.",
        tips: "Order the cloud models by how much you manage: IaaS (you handle OS and up), PaaS (you handle just the app/code), SaaS (you handle nothing but using it). Distinguish hypervisor types — Type 1 runs bare-metal on hardware, Type 2 runs as an app on a host OS (VirtualBox, VMware Workstation). Remember a snapshot captures VM state so you can roll back after a risky change."
      }
    },
    {
      id: 5, name: "Hardware & Network Troubleshooting",
      intro: {
        overview: "Diagnosing physical and connectivity failures: POST beep codes, no-boot and no-power scenarios, overheating, RAM and drive faults, RAID recovery, display and projector issues, printer problems, and mobile-device symptoms — all approached through a structured methodology.",
        why: "The largest Core 1 domain at 28% — more than a quarter of the exam and heavily performance-based. It rewards a disciplined, change-first diagnostic approach over guessing.",
        tips: "Isolate by swapping the variable: if an external monitor works but the laptop screen is dark, the fault is the internal panel/backlight, not shared components. When a problem starts right after a change (new RAM won't boot), revert that change first. Learn the signatures — clicking drive = imminent mechanical failure, random errors with no pattern = failing RAM, thermal shutdowns = clogged cooling. RAID 5 survives one drive; replace and rebuild promptly."
      }
    }
  ],
  aPlusCore2: [
    {
      id: 1, name: "Operating Systems",
      intro: {
        overview: "Working with Windows, macOS, and Linux: file systems (NTFS, FAT32, exFAT, ext4, APFS), partitioning (GPT vs MBR), installation and upgrade methods, command-line tools, Windows features and settings, and the difference between domain and workgroup environments.",
        why: "Weighted at 28% — tied for the largest Core 2 domain. Windows administration is the backbone of help-desk work, and the command-line tools and file-system knowledge here reappear throughout the troubleshooting domain.",
        tips: "Match each file system to its use: NTFS is the Windows default (permissions, encryption, journaling), exFAT for large files across OSes, FAT32 for broad compatibility with a 4 GB file limit, ext4 for Linux. Know GPT (large drives, many partitions, UEFI) versus legacy MBR. Memorize the key commands — chkdsk (disk errors), sfc (system files), ipconfig (network/DNS), and the Linux basics ls, cd, sudo, chmod. Remember that combined NTFS and share permissions resolve to the most restrictive."
      }
    },
    {
      id: 2, name: "Security",
      intro: {
        overview: "Endpoint and account security: malware types and the SOHO removal process, authentication and MFA, the principle of least privilege, social engineering attacks, physical and logical controls, full-disk encryption (BitLocker), data destruction, and wireless security.",
        why: "Weighted at 28% — tied for the largest Core 2 domain, and the one that overlaps most directly with Security+ and your CISSP work. Time invested here pays off across multiple certs.",
        tips: "Be able to name each malware type by its behavior — ransomware encrypts for payment, a Trojan hides in legitimate-looking software, a rootkit conceals itself at a deep level, a keylogger captures keystrokes. Know the SOHO removal order: identify/verify symptoms, quarantine, disable System Restore, remediate, then re-enable System Restore. Recognize the social-engineering variants (phishing/vishing/smishing, tailgating) and pair MFA with 'something you know/have/are.'"
      }
    },
    {
      id: 3, name: "Software Troubleshooting",
      intro: {
        overview: "Diagnosing OS and application failures: blue screens and boot problems, application crashes and missing DLLs, performance issues from runaway processes, browser hijacking and pop-ups, driver rollback, and mobile app and OS troubleshooting — all approached methodically.",
        why: "Weighted at 23%. This domain is heavily scenario-based, testing whether you can pick the correct FIRST step and least-invasive fix rather than jumping straight to reinstalling or replacing.",
        tips: "Prefer the least drastic fix that fits the symptom: repair/reinstall the one failing app rather than the whole OS, roll back a bad driver rather than reimage. Learn the tools by scenario — Safe Mode to isolate driver/software issues, System Restore to undo a bad change, Startup Repair for boot failures, Task Manager to find a runaway process. Persistent browser redirects and pop-ups point to malware or a hijacker, not hardware."
      }
    },
    {
      id: 4, name: "Operational Procedures",
      intro: {
        overview: "The professional side of IT: backup types and rotation schemes (3-2-1, GFS), ESD and electrical safety, change management, documentation and policies (AUP, SDS), secure data disposal, environmental controls, communication, and professionalism.",
        why: "Weighted at 21% — the smallest Core 2 domain, but full of quick wins built on definitions and best practices rather than deep troubleshooting. It also reinforces the governance mindset shared with Security+ and CISSP.",
        tips: "Keep the backup concepts straight: 3-2-1 means three copies, two media types, one off-site; GFS rotates daily/weekly/monthly sets; differential grows from the last full, incremental captures changes since any last backup. Always test restores — an untested backup isn't a backup. For safety, name the ESD wrist strap and grounding, and lift with the legs. Change management means request, approve, document, and keep a rollback plan."
      }
    }
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
let currentDomain = "all";   // which domain is active (or "all"); used for saving scores
let reviewMode = false;   // true only during a "review missed" session
let reviewPoolAtStart = 0;   // pool size when the current review session began
let pendingTrack = null;   // track chosen, waiting for primer "Start quiz"
let pendingDomain = null;  // domain chosen, waiting for primer "Start quiz"
let currentView = null;   // the active question view (original or reversal) being shown
let questions = [];
let currentIndex = 0;   // which question we're on (starts at the first)
let score = 0;          // how many correct so far
let answered = false;   // has the user answered the current question yet?

// ---- Grab the page elements ----
const questionEl = document.getElementById("question");
const progressEl = document.getElementById("progress");
const answerButtons = document.querySelectorAll(".answer-btn");
const feedbackEl = document.getElementById("feedback");
const explanationEl = document.getElementById("explanation");
const bestScoreEl = document.getElementById("best-score");
const trendEl = document.getElementById("trend");
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
  bestScoreEl.textContent = "";
  explanationEl.textContent = "";
  explanationEl.classList.remove("has-text");

  const q = questions[currentIndex];      // the current question object
  currentView = activeView(q, reviewMode);  // original, or reversal if in review

  const correctText = currentView.answers[currentView.correctIndex];  // remember correct text
  currentView.answers = shuffle(currentView.answers.slice());  // shuffle a COPY — never mutate source
  currentView.correctIndex = currentView.answers.indexOf(correctText);  // find where it landed
  progressEl.textContent = "Question " + (currentIndex + 1) + " of " + questions.length;
  questionEl.textContent = currentView.text;

  answerButtons.forEach(function (button, index) {
    button.textContent = currentView.answers[index];
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
      if (reviewMode) recordReviewCorrect(currentTrack, q.id); // review-mode correct advances the streak

    } else {
      feedbackEl.textContent = "Not quite — the answer is: " + q.answers[q.correctIndex];
      feedbackEl.style.color = "red";
      button.style.background = "#fed7d7";
      answerButtons[q.correctIndex].style.background = "#c6f6d5";
      recordMiss(currentTrack, q.id);  // record the miss (both modes; a review miss resets the streak)
    }
    explanationEl.textContent = q.explanation || "";
    if (q.explanation) {
      explanationEl.classList.add("has-text");
    }
  });
});
// ---- Trend sparkline (Stage 2B) ----
// Takes a history array of { score, total, date } and returns an SVG string.
// Plots each attempt as a percentage (0–100) so quizzes of different lengths
// share one scale. Returns "" when there aren't at least 2 points to connect.
function buildSparkline(history) {
  if (!history || history.length < 2) return "";   // nothing to trend yet

  const w = 200;      // drawing width in px
  const h = 40;       // drawing height in px
  const pad = 4;      // keep dots/line off the very edge

  // Convert each attempt to a percentage (0..100)
  const pcts = history.map(function (a) {
    return (a.score / a.total) * 100;
  });

  // Map an index + percentage to an (x, y) point in the SVG box.
  // x spreads points evenly left→right; y inverts because SVG y grows downward.
  const n = pcts.length;
  function xAt(i) {
    return pad + (i / (n - 1)) * (w - 2 * pad);
  }
  function yAt(pct) {
    return pad + (1 - pct / 100) * (h - 2 * pad);
  }

  // Build the polyline "x,y x,y ..." points string
  const points = pcts.map(function (pct, i) {
    return xAt(i) + "," + yAt(pct);
  }).join(" ");

  // Highlight the latest attempt with a dot
  const lastX = xAt(n - 1);
  const lastY = yAt(pcts[n - 1]);

  return (
    '<svg viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h + '" ' +
    'role="img" aria-label="Score trend over last ' + n + ' attempts">' +
    '<polyline fill="none" stroke="#2b6cb0" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round" points="' + points + '" />' +
    '<circle cx="' + lastX + '" cy="' + lastY + '" r="3" fill="#2b6cb0" />' +
    '</svg>'
  );
}
// ---- Show the final score ----
function showResults() {
  questionEl.textContent = "Quiz complete!";
  progressEl.textContent = "";
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
  if (reviewMode) {
    trendEl.innerHTML = ""; 
    // ---- Review session: no best-score save; show pool progress instead ----
    const remaining = (loadData("missed-" + currentTrack) || []).length;
    const retired = reviewPoolAtStart - remaining;  // how many left the pool this session
    if (remaining === 0) {
      bestScoreEl.textContent = "🎉 Pool cleared! All missed questions retired.";
    } else {
      bestScoreEl.textContent = "Retired " + retired + " this session — " + remaining + " still to review.";
    }
  } else {
    // ---- Normal quiz: save best score for this track + domain ----
    // Review sessions don't count toward best scores — bail before saving.

    const scoreKey = "best-" + currentTrack + "-" + currentDomain;   // e.g. "best-cissp-3"
    const previousBest = loadData(scoreKey);   // null if we've never saved one here
    let isNewBest = false;                    // declare it, default to false

    if (previousBest === null || score > previousBest) {
      saveData(scoreKey, score);   // first time here, or a new personal best
      isNewBest = true;
    }
    // ---- Show the best score under the result ----
    const bestNow = loadData(scoreKey);   // re-read so it reflects any save we just made
    if (isNewBest) {
      bestScoreEl.textContent = "🎉 New best score! (" + bestNow + " of " + questions.length + ")";
    } else {
      bestScoreEl.textContent = "Your best here: " + bestNow + " of " + questions.length;
    }
    // ---- Record this attempt in the trend history (Stage 2) ----
    const historyKey = "history-" + currentTrack + "-" + currentDomain;
    const history = loadData(historyKey) || [];   // [] if first attempt here

    history.push({
      score: score,
      total: questions.length,
      date: Date.now()                 // raw timestamp; format only at display time
    });

    if (history.length > 20) {
      history.shift();                 // ring buffer: drop the oldest, keep last 20
    }

    saveData(historyKey, history);
    trendEl.innerHTML = buildSparkline(history);
  }
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
    reviewMode = false;   // a normal quiz is never review mode — reset in case we just reviewed
    currentDomain = domainId || "all";  // remember the domain too, defaulting to "all"

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
  // Start a REVIEW session: only the questions currently in this track's missed pool.
async function startReview(trackName, domainId) {
  domainSelectEl.style.display = "none";
  quizArea.style.display = "block";
  currentTrack = trackName;
  currentDomain = domainId || "all";     // review spans domains; not tied to one
  reviewMode = true;         // THIS is what makes correct answers count toward retirement

  const allQuestions = await loadQuestions(currentTrack);
  const missedList = loadData("missed-" + trackName) || [];
  const missedIds = missedList.map(function (e) { return e.id; });   // just the id strings
  reviewPoolAtStart = missedIds.length;   // snapshot full pool before this session retires any
  // Keep only questions whose id is in the missed pool
  questions = allQuestions.filter(function (q) {
    return missedIds.indexOf(q.id) !== -1;
  });
    // If a specific domain was requested, narrow to just that domain's misses.
  if (domainId) {
    questions = questions.filter(function (q) {
      return q.domain === domainId;
    });
  }

  // Guard: nothing to review (shouldn't happen if the button is gated, but be safe)
  if (questions.length === 0) {
    quizArea.style.display = "none";
    domainSelectEl.style.display = "block";
    alert("Nothing to review — you've cleared this track's missed questions!");
    reviewMode = false;
    return;
  }

  currentIndex = 0;
  score = 0;
  shuffle(questions);
  showQuestion();
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

    // "Review missed" button — ONCE, after All Domains
    const missedList = loadData("missed-" + trackName) || [];
    const reviewBtn = document.createElement("button");
    reviewBtn.className = "domain-btn";
    reviewBtn.textContent = "Review missed (" + missedList.length + ")";
    if (missedList.length === 0) {
      reviewBtn.disabled = true;    // nothing to review yet — greyed out
    } else {
      reviewBtn.addEventListener("click", function () {
        startReview(trackName);
      });
    }
    domainButtonsEl.appendChild(reviewBtn);
    // Per-domain review buttons — one per domain that actually has misses.
        if (domains) {
      // Count misses per domain by cross-referencing the pool against loaded questions.
      loadQuestions(trackName).then(function (allQuestions) {
        const missedIds = missedList.map(function (e) { return e.id; });

        domains.forEach(function (d) {
          // How many missed questions belong to THIS domain?
          const count = allQuestions.filter(function (q) {
            return q.domain === d.id && missedIds.indexOf(q.id) !== -1;
          }).length;

          if (count === 0) return;   // skip domains with nothing to review

          const btn = document.createElement("button");
          btn.className = "domain-btn";
          btn.textContent = "Review " + d.name + " (" + count + ")";
          btn.addEventListener("click", function () {
            startReview(trackName, d.id);   // d.id is a number — matches q.domain
          });
          domainButtonsEl.appendChild(btn);
        });
      });
    }
    domainSelectEl.style.display = "block";   // reveal the domain screen
  }
  quizArea.style.display = "none";