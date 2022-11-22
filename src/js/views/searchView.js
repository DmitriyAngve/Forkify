class SearchView {
  #parentEl = document.querySelector('.search');

  // query (search and input field)
  getQuery() {
    const query = this.#parentEl.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parentEl.querySelector('.search__field').value = '';
  }

  // Event listener for click "Enter" button or search
  addHandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler(); // this handler function should be the control searchResult function
    });
  }
}

export default new SearchView();
