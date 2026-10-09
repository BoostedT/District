// ---------------------------------------------------------------------------
// DISTRICT recruitment site settings — edit this file to change departments,
// requirements, links and FAQ. Every department gets its own page at
// department.html?d=<id>.
// ---------------------------------------------------------------------------

window.SITE = {
  name: "DISTRICT",

  // Discord invite link
  discordUrl: "https://discord.gg/YOUR-INVITE",

  // Discord server ID. If the server widget is turned on (Server Settings →
  // Widget → Enable Server Widget) the site shows how many members are online.
  discordGuildId: "1268796397126422528",

  // Server connect link (cfx.re/join/xxxxxx) — leave empty to hide the button.
  // When set, the site also shows the live player count.
  connectUrl: "",

  // Used for any department that doesn't have its own applyUrl
  // (e.g. a Discord applications channel or a general Google Form).
  defaultApplyUrl: "https://discord.gg/YOUR-INVITE",

  socials: {
    facebook: "",
    instagram: "",
    twitter: "",
  },

  // "Why play here" cards on the home page
  // icon: bolt | trophy | chat | staff | users | police | ems | mechanic
  highlights: [
    { icon: "bolt", title: "Serious roleplay", text: "Story-driven RP where your character's choices actually shape the city." },
    { icon: "trophy", title: "Real careers", text: "Join a department, train up and climb the ranks with proper promotions." },
    { icon: "staff", title: "Fair, active staff", text: "A staff team that answers tickets and keeps the city fair for everyone." },
    { icon: "users", title: "Tight community", text: "A Discord full of people who love roleplay as much as you do." },
  ],

  // Requirements that apply to every department
  generalRequirements: [
    "18 years or older",
    "A working, clear microphone",
    "Member of the DISTRICT Discord",
    "Read and agree to the server rules",
    "No active bans or recent warnings",
  ],

  // Default application process — a department can override it with its own `process`
  process: [
    { title: "Apply", text: "Fill out the department's application. Be detailed and honest." },
    { title: "Review", text: "Department leadership reviews applications, usually within a few days." },
    { title: "Interview", text: "If accepted, you'll be invited to an interview in Discord." },
    { title: "Training", text: "Complete training with a field trainer, then hit the streets." },
  ],

  // status: "open" | "limited" | "closed"
  // accent: the department's colour, used on its page
  // icon: police | sheriff | ems | dispatch | doj | mechanic | staff
  // applyUrl: this department's application form; empty = defaultApplyUrl
  departments: [
    {
      id: "lspd",
      name: "Los Santos Police Department",
      short: "LSPD",
      icon: "police",
      accent: "#3b82f6",
      status: "open",
      applyUrl: "",
      tagline: "Protect and serve the streets of Los Santos.",
      about:
        "The LSPD patrols the city of Los Santos, responding to everything from traffic stops to armed robberies. Officers are expected to lead with realistic, fair roleplay and create great scenes for everyone involved.",
      duties: [
        "City patrol and emergency response",
        "Traffic enforcement and pursuits",
        "Investigations, arrests and report writing",
        "Specialised divisions once you're settled in",
      ],
      requirements: [
        "Basic knowledge of police procedure (we'll teach the rest)",
        "Able to stay calm and professional in heated RP",
        "Active in city at least a few times a week",
      ],
      ranks: ["Cadet", "Officer", "Senior Officer", "Corporal", "Sergeant", "Lieutenant", "Captain", "Commander", "Assistant Chief", "Chief of Police"],
    },
    {
      id: "bcso",
      name: "Blaine County Sheriff's Office",
      short: "BCSO",
      icon: "sheriff",
      accent: "#d4a017",
      status: "open",
      applyUrl: "",
      tagline: "Keep the peace across Blaine County.",
      about:
        "The BCSO covers Sandy Shores, Paleto Bay and everything in between. Deputies handle rural patrol, wildlife and backcountry calls, and back up the LSPD when the city gets busy.",
      duties: [
        "County patrol from Sandy Shores to Paleto Bay",
        "Rural, highway and off-road response",
        "Supporting other agencies on major incidents",
      ],
      requirements: [
        "Comfortable patrolling solo in the county",
        "Good communication over radio",
        "Active in city at least a few times a week",
      ],
      ranks: ["Deputy Trainee", "Deputy", "Senior Deputy", "Corporal", "Sergeant", "Lieutenant", "Captain", "Undersheriff", "Sheriff"],
    },
    {
      id: "ems",
      name: "Fire & EMS",
      short: "EMS",
      icon: "ems",
      accent: "#ef4444",
      status: "open",
      applyUrl: "",
      tagline: "Save lives when it matters most.",
      about:
        "Fire & EMS responds to injuries, fires and rescues across the whole state. Medics bring the city back to life after shootouts, crashes and everything else DISTRICT throws at them.",
      duties: [
        "Emergency medical response and patient care",
        "Hospital treatment and check-ups",
        "Fire response and rescue operations",
      ],
      requirements: [
        "Interest in medical roleplay (no real-world experience needed)",
        "Neutral: medics don't take sides",
        "Active in city at least a few times a week",
      ],
      ranks: ["EMT Trainee", "EMT", "Paramedic", "Senior Paramedic", "Lieutenant", "Captain", "Deputy Chief", "Fire Chief"],
    },
    {
      id: "dispatch",
      name: "Communications & Dispatch",
      short: "Dispatch",
      icon: "dispatch",
      accent: "#22c55e",
      status: "limited",
      applyUrl: "",
      tagline: "The voice behind every call.",
      about:
        "Dispatchers keep emergency services organised: taking 911 calls, assigning units and keeping everyone updated during chaotic scenes. A great dispatcher makes the whole city run smoother.",
      duties: [
        "Taking and relaying 911 calls",
        "Assigning and tracking units",
        "Coordinating radio traffic during major incidents",
      ],
      requirements: [
        "Clear voice and a quality microphone",
        "Able to multitask under pressure",
      ],
      ranks: ["Trainee Dispatcher", "Dispatcher", "Senior Dispatcher", "Dispatch Supervisor", "Communications Director"],
    },
    {
      id: "doj",
      name: "Department of Justice",
      short: "DOJ",
      icon: "doj",
      accent: "#a78bfa",
      status: "limited",
      applyUrl: "",
      tagline: "Uphold the law in the courtroom.",
      about:
        "The DOJ runs the legal side of DISTRICT: court cases, warrants, lawyers and judges. It's for players who love detailed, serious roleplay and know how to argue a case.",
      duties: [
        "Representing clients as a defence attorney or prosecutor",
        "Hearing cases and signing warrants as a judge",
        "Keeping the city's laws and records up to date",
      ],
      requirements: [
        "Strong writing and speaking skills",
        "Solid understanding of the server's penal code",
      ],
      ranks: ["Paralegal", "Public Defender", "Attorney", "District Attorney", "Judge", "Federal Judge", "Chief Justice"],
    },
    {
      id: "mechanics",
      name: "Mechanics",
      short: "Mechanics",
      icon: "mechanic",
      accent: "#f97316",
      status: "open",
      applyUrl: "",
      tagline: "Keep the city's wheels turning.",
      about:
        "Mechanics repair, tune and tow the city's vehicles. It's a civilian job with plenty of RP: running the shop, building customer relationships and handling roadside calls.",
      duties: [
        "Repairs, upgrades and custom tuning",
        "Towing and roadside assistance",
        "Running and growing the shop",
      ],
      requirements: [
        "Friendly, customer-facing attitude",
        "Active in city at least a few times a week",
      ],
      ranks: ["Apprentice", "Mechanic", "Senior Mechanic", "Shop Manager", "Owner"],
    },
    {
      id: "staff",
      name: "Staff Team",
      short: "Staff",
      icon: "staff",
      accent: "#ff2e9a",
      status: "closed",
      applyUrl: "",
      tagline: "Help run DISTRICT behind the scenes.",
      about:
        "The staff team keeps DISTRICT fair and fun: handling reports, answering tickets and making sure everyone follows the rules. Staff are trusted members of the community who lead by example.",
      duties: [
        "Responding to in-game reports and Discord tickets",
        "Enforcing server rules fairly and consistently",
        "Helping new players get settled in",
      ],
      requirements: [
        "Active member of the community for at least 1 month",
        "Excellent knowledge of the server rules",
        "Mature, patient and unbiased",
      ],
      ranks: ["Trial Moderator", "Moderator", "Senior Moderator", "Admin", "Senior Admin", "Head Admin"],
    },
  ],

  faq: [
    {
      q: "Can I be in more than one department?",
      a: "You can only be in one emergency service (police, sheriff, EMS or dispatch) at a time. Civilian jobs like Mechanics can be held on a different character.",
    },
    {
      q: "How long do applications take?",
      a: "Most departments review applications within a few days. You'll be contacted in Discord, so keep your DMs open.",
    },
    {
      q: "I was denied. Can I re-apply?",
      a: "Yes, usually after 2 weeks. Use the time to get more RP experience in the city and take on any feedback you were given.",
    },
    {
      q: "Do I need real-world experience?",
      a: "No. Every department trains new members from the ground up. We care more about attitude and roleplay than real-life knowledge.",
    },
  ],
};
