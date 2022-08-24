import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addhandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPage
    );

    // Page 1, and ther are other pages
    if (curPage === 1 && numPages > 1) {
      // console.log(this._generateMarkupNextButton);
      return `
      ${this._generateMarkupNextButton(curPage)}
      `;
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
      ${this._generateMarkupPrevButton(curPage)}
      `;
    }
    // Other page
    if (curPage < numPages) {
      return `
      ${this._generateMarkupPrevButton(curPage)}
      ${this._generateMarkupNextButton(curPage)}
      `;
    }
    // Page 1, and ther are No other pages
    return '';
  }

  _generateMarkupPrevButton(curPage) {
    return `
    <button data-goto='${
      curPage - 1
    }' class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
    `;
  }

  _generateMarkupNextButton(curPage) {
    return `
    <button data-goto='${
      curPage + 1
    }' class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
    `;
  }

  // _generateMarkupButton(curPage, dir) {
  //   return `
  //   <button class="btn--inline pagination__btn--${
  //     dir === 'r' ? 'next' : 'left'
  //   }">
  //         <span>Page ${dir === 'r' ? curPage + 1 : curPage - 1}</span>
  //         <svg class="search__icon">
  //           <use href="${icons}#icon-arrow-${
  //     dir === 'r' ? 'right' : 'left'
  //   }"></use>
  //         </svg>
  //       </button>
  //   `;
  // }
}

export default new PaginationView();
