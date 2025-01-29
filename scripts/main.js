const $bookshelfelem=document.getElementById("bookshelf");
const $libraryheadelem=document.getElementById("libraryhead");
const $showformelem=document.getElementById("showform");
const $closeformelem=document.getElementById("closeform");
const $addbuttonelem=document.getElementById("addbook");
const $addbookformelem=document.getElementById("addbookform");
const $bookcopy = document.querySelector(".book");
const $inputelements=document.querySelectorAll(".forminput");

class BookshelfUI {

  bookshelfarr=[];
  static bookshelfUI=$bookshelfelem;
  static libraryheader=$libraryheadelem;
  static showform=$showformelem;
  static closeform=$closeformelem;
  static addbook=$addbuttonelem;
  static addbookform=$addbookformelem;
  static inputfields=$inputelements;

  constructor(user) {
    this.user=user;
    this.setupUI();
  }

  setupUI() {
    //Set formatting and event listeners
    BookshelfUI.libraryheader.innerHTML=this.user +"'s Library";
    BookshelfUI.showform.addEventListener("click", () => {
      BookshelfUI.addbookform.classList.remove("hidden")
    });
    BookshelfUI.closeform.addEventListener("click", (event) => {
      BookshelfUI.addbookform.classList.add("hidden");
      event.preventDefault();
    });
    BookshelfUI.addbook.addEventListener("click", (event) => {
      let inputarray=Array.from(BookshelfUI.inputfields);
      let bookargs=inputarray.map((node) => node.id !== "readcheck" ? node.value : node.checked);
      const book=new Book(bookargs[0], bookargs[1], bookargs[2], bookargs[3], this);
      this.addBookToLibrary(book);
      BookshelfUI.addbookform.reset();
      event.preventDefault();
    }); 
  }

  addBookToLibrary(book) {
    this.bookshelfarr.push(book);
    BookshelfUI.bookshelfUI.appendChild(book.bookelem);
  }

  removeBookFromLibrary(book) {
    const index = this.bookshelfarr.indexOf(book);
    const splicedarray = this.bookshelfarr.splice(index, 1);
    this.bookshelfarr = splicedarray;
    BookshelfUI.bookshelfUI.removeChild(book.bookelem);
  }
}

class Book {

  static bookUI = $bookcopy;
  bookelem;
  
  constructor(title, author, numPages, read, library) {
    this.title=title;
    this.author=author;
    this.numPages=numPages;
    this.read=read;
    this.library=library;
    this.createBookElem();
  }

  createBookElem() {
    this.bookelem=Book.bookUI.cloneNode(true);
    this.bookelem.classList.remove("hidden");
    this.bookelem.classList.add("seen");
    const bookstring = [this.title, "by " + this.author, this.numPages 
                        + (this.numPages == 1 ? " pg" : " pgs")];
    for (let i = bookstring.length-1; i >= 0; i--){
      const textnode=document.createTextNode(bookstring[i]);
      const breaknode=document.createElement("br");
      this.bookelem.insertBefore(textnode, this.bookelem.firstChild);
      this.bookelem.insertBefore(breaknode, this.bookelem.firstChild);
    }
    this.bookelem.classList.add(this.read ? "read" : null);
    const readbutton=this.bookelem.children[3].children[0];
    readbutton.addEventListener("click", (event) => {
      this.bookelem.classList.contains("read") ? this.bookelem.classList.remove("read") : 
                                                 this.bookelem.classList.add("read");
      event.preventDefault();
    });
    const deletebutton=this.bookelem.children[3].children[1];
    deletebutton.addEventListener("click", (event) => {
      this.library.removeBookFromLibrary(this);
      event.preventDefault();
    })
  }

}

function main() {
  newbookshelf=new BookshelfUI("Cabruh");
}
main();
