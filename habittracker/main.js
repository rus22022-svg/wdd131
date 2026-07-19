let habits = [];

const STORAGE_KEY = "habitTracker.habits";


const STARTER_HABITS = [
  { id: 1, name: "Drink water", streak: 0, done: false, lastDone: null },
  { id: 2, name: "Read 10 pages", streak: 0, done: false, lastDone: null },
  { id: 3, name: "Go for a walk", streak: 0, done: false, lastDone: null },
];

function today() {
  return new Date().toISOString().slice(0, 10);
}

function makeHabit(name) {
  return {
    id: Date.now(),
    name: name,
    streak: 0,
    done: false,
    lastDone: null,
  };
}


function saveHabits() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}

function loadHabits() {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored) {
    habits = JSON.parse(stored);
  } else {
    habits = STARTER_HABITS;
  }

  habits.forEach(function (habit) {
    if (habit.lastDone !== today()) {
      habit.done = false;
    }
  });
}

function countDone() {
  return habits.reduce(function (total, habit) {
    return habit.done ? total + 1 : total;
  }, 0);
}

function updateSummary() {
  const doneCount = countDone();
  const total = habits.length;

  const countEl = document.getElementById("summary-count");
  countEl.textContent = doneCount + " of " + total + " habits done";

  const percent = total === 0 ? 0 : Math.round((doneCount / total) * 100);
  const fill = document.getElementById("progress-fill");
  fill.style.width = percent + "%";
}

function renderHabits() {
  const list = document.getElementById("habit-list");
  list.textContent = "";

  const emptyNote = document.getElementById("empty-note");
  emptyNote.hidden = habits.length !== 0;

  habits.forEach(function (habit) {
    list.appendChild(createHabitElement(habit));
  });

  updateSummary();
}

function createHabitElement(habit) {
  const li = document.createElement("li");
  li.className = "habit" + (habit.done ? " done" : "");
  li.dataset.id = habit.id;

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "toggle-btn";
  toggle.dataset.action = "toggle";
  toggle.setAttribute(
    "aria-label",
    (habit.done ? "Mark not done: " : "Mark done: ") + habit.name
  );
  toggle.innerHTML =
    '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">' +
    '<path class="check" d="M3 8.5l3 3 6-7"></path></svg>';

  const name = document.createElement("span");
  name.className = "habit-name";
  name.textContent = habit.name;

  const streak = document.createElement("span");
  streak.className = "streak";
  streak.innerHTML = '<span class="flame" aria-hidden="true">&#128293;</span>';
  const streakText = document.createElement("span");
  streakText.textContent = habit.streak;
  streak.appendChild(streakText);

  const del = document.createElement("button");
  del.type = "button";
  del.className = "delete-btn";
  del.dataset.action = "delete";
  del.setAttribute("aria-label", "Delete habit: " + habit.name);
  del.textContent = "\u00D7";

  li.append(toggle, name, streak, del);
  return li;
}

function toggleDone(id) {
  const habit = habits.find(function (h) {
    return h.id === id;
  });
  if (!habit) return;

  if (habit.done === false) {
    habit.done = true;
    habit.streak = habit.streak + 1;
    habit.lastDone = today();
  } else {
    habit.done = false;
    habit.streak = habit.streak > 0 ? habit.streak - 1 : 0;
  }

  saveHabits();
  renderHabits();
}

function addHabit(name) {
  const trimmed = name.trim();

  if (trimmed === "") {
    return false;
  }

  habits.push(makeHabit(trimmed));
  saveHabits();
  renderHabits();
  return true;
}

function deleteHabit(id) {
  habits = habits.filter(function (h) {
    return h.id !== id;
  });
  saveHabits();
  renderHabits();
}


function setupEvents() {
  const form = document.getElementById("add-form");
  const input = document.getElementById("habit-name");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const added = addHabit(input.value);
    if (added) {
      input.value = "";
      input.focus();
    }
  });

  const list = document.getElementById("habit-list");
  list.addEventListener("click", function (event) {
    const button = event.target.closest("button");
    if (!button) return;

    const li = button.closest(".habit");
    const id = Number(li.dataset.id);

    if (button.dataset.action === "toggle") {
      toggleDone(id);
    } else if (button.dataset.action === "delete") {
      deleteHabit(id);
    }
  });
}

function init() {
  loadHabits();
  renderHabits();
  setupEvents();
}

init();