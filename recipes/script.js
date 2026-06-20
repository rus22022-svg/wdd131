const input = document.querySelector("#search-input");
const cards = document.querySelectorAll(".recipe-card");

input.addEventListener("input", () => {
  const term = input.value.trim().toLowerCase();
  cards.forEach((card) => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(term) ? "" : "none";
  });
});