import * as model from './model.js'; // "*" - all
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

import 'core-js/stable'; // for polyfiling everything else
import 'regenerator-runtime/runtime'; // for polyfiling async await

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); // change the hash id with slice 2 first element
    // console.log(id);

    // guard clause (if no id)
    if (!id) return;
    recipeView.renderSpinner(); // Render spinner

    // 1) Loading recipe
    await model.loadRecipe(id);
    // async function and it is going to return a promise (here we have to avoid that promise before we can move on in the next step)

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

// And function and data flow. As we start to programm then the init() runs and it will then immediately run addHandlerRender. AddHandlerRender listening for events in the "recipeView.js". As we call addHandlerRender we pass in the controller function (controlRecipes) / handler function that we want to get executed as soon as the event happens. Then receive that function as being called handler and so that's what we then call as soon as the event happens
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
