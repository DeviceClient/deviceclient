const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const tabContent = {
  visuals: {
    title: "Visual modules",
    subtitle: "Choose what you want to see",
    rows: [
      ["◉", "Target ESP", "Target highlight", true],
      ["⌁", "Motion Trails", "Movement effects", true],
      ["◎", "Jump Circle", "Landing indicator", false],
      ["◇", "Custom Sky", "Sky appearance", false]
    ]
  },
  hud: {
    title: "Your HUD",
    subtitle: "Make the interface yours",
    rows: [
      ["▤", "FPS Counter", "Frames per second", true],
      ["⌖", "Coordinates", "World position", true],
      ["▣", "Target HUD", "Target information", true],
      ["⌨", "Keystrokes", "Show pressed keys", false]
    ]
  },
  utilities: {
    title: "Useful tools",
    subtitle: "Extra options for your game",
    rows: [
      ["ϟ", "FullBright", "Brighter surroundings", true],
      ["⇧", "Toggle Sprint", "Sprint assistance", false],
      ["◌", "No Hurt Camera", "Reduce camera shake", true],
      ["⌑", "Pearl Throw", "Quick pearl keybind", true]
    ]
  }
};

const preview = document.querySelector("#modulePreview");
const tabs = document.querySelectorAll(".tab");

function renderTab(name) {
  const data = tabContent[name];
  preview.innerHTML = `
    <div class="preview-title">
      <span>${name.toUpperCase()}</span>
      <b>${data.title}</b>
      <small>${data.subtitle}</small>
    </div>
    ${data.rows.map(([symbol, title, subtitle, enabled]) => `
      <div class="preview-row">
        <span class="preview-symbol">${symbol}</span>
        <span><b>${title}</b><small>${subtitle}</small></span>
        <button class="switch ${enabled ? "on" : ""}" type="button"
          role="switch" aria-checked="${enabled}" aria-label="Переключить ${title}"></button>
      </div>
    `).join("")}
  `;
}

// Переключатели в демонстрации работают при нажатии.
preview.addEventListener("click", (event) => {
  const toggle = event.target.closest(".switch");
  if (!toggle) return;

  const isEnabled = toggle.classList.toggle("on");
  toggle.setAttribute("aria-checked", String(isEnabled));
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    renderTab(tab.dataset.tab);
  });
});
