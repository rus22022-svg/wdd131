const recipes = [
  {
    author: 'Provo High Culinary Students',
    cookTime: '30 Min',
    datePublished: '2016-10-16',
    tags: ['Waffles', 'Sweet Potato', 'Side'],
    description: 'Savory waffles made with Sweet potato with a hint of Ginger',
    image: './images/sweet-potato-waffle-md.jpg',
    name: 'Sweet Potato Waffles',
    prepTime: '30 Min',
    recipeYield: '6 waffles',
    rating: 4
  },
  {
    author: 'Shane Thompson',
    cookTime: '20 min',
    tags: ['Chicken', 'Entree'],
    description: 'Delicious quick and easy creamy rice dish. The mustard, mushrooms, and lemon all blend together wonderfully',
    image: './images/escalopes-de-poulet-a-la-creme.webp',
    name: 'Escalope de Poulet a la Creme with steamed green beans (Chicken with Cream)',
    prepTime: '10 min',
    recipeYield: '3 servings',
    rating: 4.5
  },
  {
    author: 'Shane Thompson',
    cookTime: '30 min',
    datePublished: '2018-09-19',
    tags: ['Potatoes', 'Side'],
    description: 'Easy and delicious oven roasted potatoes that go great with almost anything.',
    image: './images/roasted-potatoes.webp',
    name: 'Oven Roasted Potato Slices',
    prepTime: '10 min',
    recipeYield: '',
    rating: 4
  },
  {
    author: 'Shane Thompson',
    cookTime: '20 min',
    datePublished: '2018-09-19',
    tags: ['Southwest', 'Entree'],
    description: 'Black beans and tomatoes served over a bed of rice. Top with cheese and scoop up with tortilla chips for maximum enjoyment.',
    image: './images/black-beans-and-rice.jpg',
    name: 'Black Beans and Rice',
    prepTime: '10 min',
    recipeYield: '4 servings',
    rating: 3
  },
  {
    author: 'Shane Thompson',
    cookTime: '30 min',
    datePublished: '2018-09-19',
    tags: ['Chicken', 'Entree', 'Indian'],
    description: 'Quick and easy Chicken curry recipe made with easy to find ingredients.',
    image: './images/chicken-curry.webp',
    name: 'Chicken Curry',
    prepTime: '10 min',
    recipeYield: '5 servings',
    rating: 5
  },
  {
    author: 'Shane Thompson',
    cookTime: '11 min',
    datePublished: '2018-09-19',
    tags: ['Dessert'],
    description: 'Delicious soft chocolate chip cookies with coconut.',
    image: './images/chocolate-chip-cookies.jpg',
    name: 'Chocolate Chip Cookies',
    prepTime: '15 min',
    recipeYield: '8 dozen',
    rating: 5
  },
  {
    author: 'Ester Kocht',
    cookTime: '45 min',
    datePublished: '2023-10-10',
    tags: ['Dessert', 'German'],
    description: "This gooseberry cake with crumble is easy to follow, a bit tart and not too sweet. Made up of a cake base, filled with fresh gooseberries and vanilla cream and finished off with crumble that's flavored with vanilla.",
    image: './images/german-gooseberry-cake.jpg',
    name: 'Gooseberry Cake with Vanilla Cream and Crumble',
    prepTime: '30 min',
    recipeYield: '12 servings',
    rating: 5
  },
  {
    author: 'AllRecipes',
    cookTime: '45 min',
    datePublished: '2023-10-10',
    tags: ['Dessert'],
    description: "This apple crisp recipe is a simple yet delicious fall dessert that's great served warm with vanilla ice cream.",
    image: './images/apple-crisp.jpg',
    name: 'Apple Crisp',
    prepTime: '30 min',
    recipeYield: '12 servings',
    rating: 4
  }
];

function buildStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return '★'.repeat(full) + (half ? '<span class="half">½</span>' : '') + '☆'.repeat(empty);
}

function randomIndex(max) {
  return Math.floor(Math.random() * max);
}

function buildFeaturedHTML(recipe) {
  const tagsHTML = recipe.tags.map(t => `<span class="tag">${t}</span>`).join('');
  return `
    <img class="card-image" src="${recipe.image}" alt="${recipe.name}"
      onerror="this.src='https://placehold.co/310x240/f5f5f5/999?text=No+Image'" />
    <div class="card-body">
      <div class="tags">${tagsHTML}</div>
      <h2 class="card-name">${recipe.name}</h2>
      <div class="rating">${buildStars(recipe.rating)}</div>
      <p class="card-description">${recipe.description}</p>
    </div>
  `;
}

function buildCardHTML(recipe) {
  const tagsHTML = recipe.tags.map(t => `<span class="tag">${t}</span>`).join('');
  return `
    <img class="card-image" src="${recipe.image}" alt="${recipe.name}"
      onerror="this.src='https://placehold.co/310x190/f5f5f5/999?text=No+Image'" />
    <div class="card-body">
      <div class="tags">${tagsHTML}</div>
      <h3 class="card-name">${recipe.name}</h3>
      <div class="rating">${buildStars(recipe.rating)}</div>
      <p class="card-description">${recipe.description}</p>
    </div>
  `;
}

function showRandomRecipe() {
  document.getElementById('featuredCard').innerHTML = buildFeaturedHTML(recipes[randomIndex(recipes.length)]);
}

function recipeMatchesKeyword(recipe, keyword) {
  const kw = keyword.toLowerCase();
  return recipe.name.toLowerCase().includes(kw)
    || recipe.description.toLowerCase().includes(kw)
    || recipe.tags.some(tag => tag.toLowerCase().includes(kw));
}

function filterAndSort(keyword) {
  return recipes
    .filter(r => recipeMatchesKeyword(r, keyword))
    .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
}

function renderResults(matches, keyword) {
  const recipeGrid      = document.getElementById('recipeGrid');
  const resultCount     = document.getElementById('resultCount');
  const featuredSection = document.getElementById('featuredSection');
  const resultsSection  = document.getElementById('resultsSection');

  if (matches.length === 0) {
    recipeGrid.innerHTML = `<p class="no-results">No recipes match "<em>${keyword}</em>". Try a different word.</p>`;
  } else {
    recipeGrid.innerHTML = matches
      .map(r => `<div class="recipe-card">${buildCardHTML(r)}</div>`)
      .join('');
  }

  const count = matches.length;
  resultCount.textContent = count === 0
    ? `No results for "${keyword}"`
    : `${count} recipe${count !== 1 ? 's' : ''} found for "${keyword}" — sorted A to Z`;

  featuredSection.classList.add('hidden');
  resultsSection.classList.remove('hidden');
}

function handleSearch() {
  const keyword = document.getElementById('searchInput').value.trim();
  if (keyword === '') {
    handleClear();
    return;
  }
  renderResults(filterAndSort(keyword), keyword);
}

function handleClear() {
  document.getElementById('searchInput').value = '';
  document.getElementById('resultCount').textContent = '';
  document.getElementById('featuredSection').classList.remove('hidden');
  document.getElementById('resultsSection').classList.add('hidden');
}

document.getElementById('searchBtn').addEventListener('click', handleSearch);
document.getElementById('searchInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') handleSearch();
});

showRandomRecipe();