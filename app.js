const defaultSkills = [
  {
    id: 1,
    name: "Web Development",
    category: "Technology",
    owner: "Ali Ahmed",
    avatar: "👨🏻‍💻",
    exchange: "Graphic Design",
    description:
      "I can teach HTML, CSS, JavaScript and responsive website development.",
  },
  {
    id: 2,
    name: "Graphic Design",
    category: "Design",
    owner: "Sara Khan",
    avatar: "👩🏻‍🎨",
    exchange: "Web Development",
    description:
      "Learn Canva, Photoshop basics, branding and social media designs.",
  },
  {
    id: 3,
    name: "English Speaking",
    category: "Language",
    owner: "Ahmed Raza",
    avatar: "👨🏽",
    exchange: "Video Editing",
    description: "Practice conversational English and improve your confidence.",
  },
  {
    id: 4,
    name: "Digital Marketing",
    category: "Business",
    owner: "Ayesha Noor",
    avatar: "👩🏻",
    exchange: "Content Writing",
    description:
      "Learn social media marketing, SEO and digital marketing strategies.",
  },
  {
    id: 5,
    name: "Video Editing",
    category: "Design",
    owner: "Usman Ali",
    avatar: "🎬",
    exchange: "English Speaking",
    description:
      "Learn editing basics, transitions and short-form video creation.",
  },
  {
    id: 6,
    name: "Python Programming",
    category: "Technology",
    owner: "Hassan Malik",
    avatar: "👨🏾‍💻",
    exchange: "Business Skills",
    description:
      "Start programming with Python and understand coding fundamentals.",
  },
  {
    id: 7,
    name: "Content Writing",
    category: "Other",
    owner: "Mina Khan",
    avatar: "✍️",
    exchange: "Digital Marketing",
    description:
      "Learn blog writing, creative writing and writing for the web.",
  },
  {
    id: 8,
    name: "Photography",
    category: "Other",
    owner: "Zain Abbas",
    avatar: "📸",
    exchange: "Graphic Design",
    description: "Learn photography composition, lighting and photo editing.",
  },
];

function loadData(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

let skills = loadData("skillswap_skills", defaultSkills);
let requests = loadData("skillswap_requests", []);
let activeCategory = "All";
let searchText = "";

function saveData() {
  localStorage.setItem("skillswap_skills", JSON.stringify(skills));
  localStorage.setItem("skillswap_requests", JSON.stringify(requests));
}

const grid = document.getElementById("skillGrid");
const searchInput = document.getElementById("searchInput");

function getIcon(category) {
  const icons = {
    Technology: "💻",
    Design: "🎨",
    Language: "🌍",
    Business: "📈",
    Other: "✨",
  };
  return icons[category] || "💡";
}

function renderSkills() {
  const filtered = skills.filter((skill) => {
    const matchesCategory =
      activeCategory === "All" || skill.category === activeCategory;

    const text = (
      skill.name +
      " " +
      skill.owner +
      " " +
      skill.description +
      " " +
      skill.exchange
    ).toLowerCase();

    return matchesCategory && text.includes(searchText.toLowerCase());
  });

  grid.innerHTML = "";

  document.getElementById("emptyState").hidden = filtered.length > 0;

  filtered.forEach((skill) => {
    const card = document.createElement("article");
    card.className = "skill-card";

    const top = document.createElement("div");
    top.className = "skill-top";

    const icon = document.createElement("div");
    icon.className = "skill-icon";
    icon.textContent = getIcon(skill.category);

    const category = document.createElement("span");
    category.className = "category-label";
    category.textContent = skill.category;

    top.append(icon, category);

    const title = document.createElement("h3");
    title.textContent = skill.name;

    const description = document.createElement("p");
    description.textContent = skill.description;

    const person = document.createElement("div");
    person.className = "person";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = skill.avatar || "👤";

    const ownerInfo = document.createElement("div");
    const owner = document.createElement("strong");
    owner.textContent = skill.owner;

    const role = document.createElement("small");
    role.textContent = "Skill Contributor";

    ownerInfo.append(owner, role);
    person.append(avatar, ownerInfo);

    const exchange = document.createElement("div");
    exchange.className = "exchange-info";
    exchange.textContent = "Wants to learn: ";

    const exchangeStrong = document.createElement("strong");
    exchangeStrong.textContent = skill.exchange;
    exchange.append(exchangeStrong);

    const actions = document.createElement("div");
    actions.className = "card-actions";

    const view = document.createElement("button");
    view.className = "view-btn";
    view.textContent = "View Profile";
    view.addEventListener("click", () => showProfile(skill.id));

    const request = document.createElement("button");
    request.className = "request-btn";
    request.textContent = "Request Exchange";
    request.addEventListener("click", () => sendRequest(skill.id));

    actions.append(view, request);

    card.append(top, title, description, person, exchange, actions);
    grid.appendChild(card);
  });

  document.getElementById("skillStat").textContent = skills.length;
}

function showProfile(id) {
  const skill = skills.find((item) => item.id === id);
  if (!skill) return;

  const content = document.getElementById("profileContent");
  content.innerHTML = "";

  const avatar = document.createElement("div");
  avatar.className = "profile-avatar";
  avatar.textContent = skill.avatar || "👤";

  const tag = document.createElement("span");
  tag.className = "tagline";
  tag.textContent = "SKILL CONTRIBUTOR";

  const title = document.createElement("h2");
  title.textContent = skill.owner;

  const skillBox = document.createElement("div");
  skillBox.className = "profile-detail";
  skillBox.textContent = "Offering: " + skill.name;

  const exchangeBox = document.createElement("div");
  exchangeBox.className = "profile-detail";
  exchangeBox.textContent = "Interested in learning: " + skill.exchange;

  const description = document.createElement("p");
  description.textContent = skill.description;
  description.style.marginTop = "18px";

  const button = document.createElement("button");
  button.className = "btn primary full-btn";
  button.textContent = "Send Exchange Request";
  button.onclick = () => {
    sendRequest(skill.id);
    closeProfile();
  };

  content.append(
    avatar,
    tag,
    title,
    skillBox,
    exchangeBox,
    description,
    button,
  );

  document.getElementById("profileModal").classList.add("show");
}

function closeProfile() {
  document.getElementById("profileModal").classList.remove("show");
}

function openOffer() {
  document.getElementById("offerModal").classList.add("show");
}

function closeOffer() {
  document.getElementById("offerModal").classList.remove("show");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function sendRequest(id) {
  const skill = skills.find((item) => item.id === id);
  if (!skill) return;

  const alreadySent = requests.some((request) => request.skillId === id);

  if (alreadySent) {
    showToast("You have already requested this skill!");
    return;
  }

  requests.unshift({
    id: Date.now(),
    skillId: skill.id,
    skillName: skill.name,
    owner: skill.owner,
    exchange: skill.exchange,
    status: "Pending",
    date: new Date().toLocaleDateString(),
  });

  saveData();
  renderRequests();
  showToast("Exchange request sent successfully!");
}

function renderRequests() {
  const list = document.getElementById("requestList");
  list.innerHTML = "";

  document.getElementById("requestCount").textContent = requests.length;

  if (!requests.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent =
      "No exchange requests yet. Explore skills to get started!";
    list.appendChild(empty);
    return;
  }

  requests.forEach((request) => {
    const item = document.createElement("div");
    item.className = "request-item";

    const info = document.createElement("div");
    const title = document.createElement("h4");
    title.textContent = request.skillName + " — " + request.owner;

    const detail = document.createElement("p");
    detail.textContent =
      "Your exchange offer: " + request.exchange + " · " + request.date;

    info.append(title, detail);

    const status = document.createElement("span");
    status.className = "status";
    status.textContent = request.status;

    item.append(info, status);
    list.appendChild(item);
  });
}

document
  .getElementById("skillForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("userName").value.trim();
    const skillName = document.getElementById("skillName").value.trim();
    const category = document.getElementById("skillCategory").value;
    const exchange = document.getElementById("wantSkill").value.trim();
    const description = document
      .getElementById("skillDescription")
      .value.trim();

    if (!name || !skillName || !category || !exchange || !description) {
      showToast("Please fill in all fields.");
      return;
    }

    skills.unshift({
      id: Date.now(),
      name: skillName,
      category,
      owner: name,
      avatar: "🧑🏻",
      exchange,
      description,
    });

    saveData();
    renderSkills();
    closeOffer();
    this.reset();

    showToast("Your skill has been published!");
    document.getElementById("explore").scrollIntoView({ behavior: "smooth" });
  });

searchInput.addEventListener("input", (event) => {
  searchText = event.target.value;
  renderSkills();
});

document.getElementById("filters").addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  activeCategory = button.dataset.category;

  document.querySelectorAll(".filter").forEach((filter) => {
    filter.classList.toggle("active", filter === button);
  });

  renderSkills();
});

// Close modals when clicking outside
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("show");
    }
  });
});

// Initial page render
renderSkills();
renderRequests();
