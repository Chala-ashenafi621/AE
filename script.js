const departments = ["All", "Software", "school of elec.", "Mechanical", "Civil","CSE","ECE","POWER","ARCH."];

let students = [
  { id: 1, name: "Abel", dept: "school of elec.", year: 2 },
  { id: 2, name: "Chala", dept: "Electrical", year: 3 },
  { id: 3, name: "nasre", dept: "Software", year: 3 },
];

let currentFilter = "All";
let nextId = 5;

const $ = (id) => document.getElementById(id);

function renderFilters() {
  $("filters").innerHTML = departments
    .map(
      (d) =>
        `<button type="button" class="f ${d === currentFilter ? "on" : ""}" data-d="${d}">${d}</button>`
    )
    .join("");
}

function render() {
  // .filter() by department
  const shown =
    currentFilter === "All"
      ? students
      : students.filter((s) => s.dept === currentFilter);

  // .map() into cards, with destructuring + ternary badge
  $("list").innerHTML = shown.length
    ? shown
        .map(({ id, name, dept, year }) => {
          const level = year >= 5 ? "GC" : "Senior";
          return `
            <li class="s">
              <div class="av">${name[0].toUpperCase()}</div>
              <div class="info">
                <b>${name}</b>
                <span>${dept} · Y${year}</span>
              </div>
              <span class="badge ${level.toLowerCase()}">${level}</span>
              <button class="x" data-id="${id}" aria-label="Remove ${name}">✕</button>
            </li>`;
        })
        .join("")
    : `<li class="empty">No students here yet. Add one above.</li>`;

  $("count").textContent = `Showing ${shown.length} of ${students.length} students`;
}

// Add a student
$("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("name").value.trim();
  if (!name) return;

  students = [
    ...students,
    { id: nextId++, name, dept: $("dept").value, year: Number($("year").value) },
  ];
  $("name").value = "";

  // Show everyone so the new student is never hidden by an active filter
  currentFilter = "All";
  renderFilters();
  render();
});

// Filter buttons
$("filters").addEventListener("click", (e) => {
  const d = e.target.dataset.d;
  if (!d) return;
  currentFilter = d;
  renderFilters();
  render();
});

// Remove a student
$("list").addEventListener("click", (e) => {
  const id = Number(e.target.dataset.id);
  if (!id) return;
  students = students.filter((s) => s.id !== id);
  render();
});

// Dark / light mode
$("theme").addEventListener("click", () => {
  const root = document.documentElement;
  const isLight = root.dataset.theme === "light";
  root.dataset.theme = isLight ? "dark" : "light";
  $("theme").textContent = isLight ? "☀️ Light" : "🌙 Dark";
});

renderFilters();
render();