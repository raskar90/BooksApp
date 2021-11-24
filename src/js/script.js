{
    'use strict';
  
    const select = {
      templateOf: {
        templateBook: '#template-book',
      },
      containerOf: {
        bookList: '.books-list',
        filters: '.filters'
      },
      book: {
        image: 'book__image',
      }
    };
    const classNames = {
      favoriteBook: 'favorite',
      hidden: 'hidden',
    };
    const templates = {
      bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
    };
  
    class BooksList {
      constructor(){
        const thisBooksList = this;
        thisBooksList.initData();
        thisBooksList.getElements();
        thisBooksList.render();
        thisBooksList.initActions();
      }
  
      initData(){
        const thisBooksList = this;
        thisBooksList.data = dataSource.books;
        thisBooksList.favoriteBooks = [];
        thisBooksList.filters = [];
      }
  
      getElements(){
        const thisBooksList = this;
        thisBooksList.listContainer = document.querySelector(select.containerOf.bookList);
        thisBooksList.filtersWrapper = document.querySelector(select.containerOf.filters);
      }
  
      render() {
        const thisBooksList = this;
        for(let book of thisBooksList.data){
          const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
          const ratingWidth = book.rating * 10;
          const generatedHTML = templates.bookTemplate({
            id: book.id,
            price: book.price,
            name: book.name,
            image: book.image,
            rating: book.rating,
            ratingBgc,
            ratingWidth
          });
          const element = utils.createDOMFromHTML(generatedHTML);
          thisBooksList.listContainer.appendChild(element);
        }
      }
  
      filterBooks(){
        const thisBooksList = this;
        for(let hiddenBooks of thisBooksList.data){
          let shouldBeHidden = false;
          for(let filter of thisBooksList.filters){
            if(!hiddenBooks.details[filter]){
              shouldBeHidden = true;
              break;
            }
          }
          const book = document.querySelector('.book__image[data-id="' + hiddenBooks.id + '"]');
          if(shouldBeHidden){
            book.classList.add(classNames.hidden);
          }
          else {
            book.classList.remove(classNames.hidden);
          }
        }
      }
  
      determineRatingBgc(rating){
  
        let background = '';
  
        if(rating<6){
          background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
        }
        if(rating >6 && rating<=8){
          background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
        }
        if(rating>8 && rating<=9){
          background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
        }
        if(rating>9){
          background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
        }
  
        return background;
      }
  
      initActions(){
        const thisBooksList = this;
  
        thisBooksList.listContainer.addEventListener('dblclick', function(event){
  
          event.preventDefault();
  
          const clickedElement = event.target.offsetParent;
  
          if(clickedElement.classList.contains(select.book.image)) {
            const bookId = clickedElement.getAttribute('data-id');
  
            if(!clickedElement.classList.contains(classNames.favoriteBook)){
              thisBooksList.favoriteBooks.push(bookId);
              clickedElement.classList.add(classNames.favoriteBook);
            }
            else {
              thisBooksList.favoriteBooks.splice(thisBooksList.favoriteBooks.indexOf(bookId), 1);
              clickedElement.classList.remove(classNames.favoriteBook);
            }
          }
        });
  
        thisBooksList.filtersWrapper.addEventListener('click', function(event){
  
          const clickedElement = event.target;
  
          if(clickedElement.name === 'filter'){
            if(clickedElement.checked){
              thisBooksList.filters.push(clickedElement.value);
            }
            else {
              const filterId = thisBooksList.filters.indexOf(clickedElement.value);
              thisBooksList.filters.splice(thisBooksList.filters.indexOf(filterId), 1);
            }
          }
          thisBooksList.filterBooks();
        });
      }
    }
  
    const app = {
      initializeProject: function(){
        new BooksList();
      }
    };
    app.initializeProject();
  }  