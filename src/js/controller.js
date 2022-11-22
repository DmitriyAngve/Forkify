import * as model from './model.js'; // "*" - all
import recipeView from './views/recipeView.js';

import 'core-js/stable'; // for polyfiling everything else
import 'regenerator-runtime/runtime'; // for polyfiling async await

const recipeContainer = document.querySelector('.recipe');
// console.log(recipeContainer);

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

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
    console.log(err);
  }
};

// And function and data flow. As we start to programm then the init() runs and it will then immediately run addHandlerRender. AddHandlerRender listening for events in the "recipeView.js". As we call addHandlerRender we pass in the controller function (controlRecipes) / handler function that we want to get executed as soon as the event happens. Thenreceive that function as being called handler and so that's what we then call as soon as the event happens
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
