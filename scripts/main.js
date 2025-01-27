const $bookshelf = document.getElementById("bookshelf")

const mybookshelf = new Bookshelf("Cabruh", $bookshelf);

const book1 = new Book("The Lion, the Witch, and the Wardrobe", "C.S. Lewis", 300, true, mybookshelf);
const book2 = new Book("The Very Hungry Caterpillar", "Eric Carle", 34, false, mybookshelf);

function Bookshelf(user, element) {
  this.user=user;
  this.element=element;
  this.libraryheader=document.getElementById("libraryhead");
  this.libraryheader.innerHTML=user +"'s Library";
  this.showForm=document.getElementById("showform");
  this.showForm.addEventListener("click", () => {
    this.addbookform.classList.remove("hidden")
  });
  this.closeButton=document.getElementById("closeform");
  this.closeButton.addEventListener("click", (event) => {
    this.addbookform.classList.add("hidden");
    event.preventDefault();
  });
  this.addButton=document.getElementById("addbook");
  this.addButton.addEventListener("click", (event) => {
    inputfields=document.querySelectorAll(".forminput");
    inputarray=Array.from(inputfields)
    bookargs=inputarray.map((node) => node.id !== "readcheck" ? node.value : node.checked);
    book=new Book(bookargs[0], bookargs[1], bookargs[2], bookargs[3], this);
    this.addBookToLibrary(book);
    event.preventDefault();
  }); 
  this.addbookform=document.getElementById("addbookform");
  this.bookshelf=[];
  this.bookshelfelem=document.getElementById("bookshelf");
}

function Book(title, author, numPages, read, library) {
  this.title=title;
  this.author=author;
  this.numPages=numPages;
  this.read=read;
  this.library=library;
}

Book.prototype.bookElem = function () {
  const bookcopy = document.querySelector(".book");
  const booknode = bookcopy.cloneNode(true);
  this.bookelem=booknode;
  booknode.classList.remove("hidden");
  booknode.classList.add("seen")
  const bookstring = [this.title, "by " + this.author, this.numPages + (this.numPages == 1 ? " pg" : " pgs")];
  for (i = bookstring.length; i >= 0; i--){
    textnode=document.createTextNode(bookstring[i]);
    breaknode=document.createElement("br");
    booknode.insertBefore(textnode, booknode.firstChild);
    booknode.insertBefore(breaknode, booknode.firstChild);
  }
  booknode.classList.add(this.read ? "read" : null);
  this.readbutton=booknode.children[4].children[0];
  this.readbutton.addEventListener("click", (event) => {
    this.bookelem.classList.contains("read") ? this.bookelem.classList.remove("read") : this.bookelem.classList.add("read");
    event.preventDefault();
  });
  this.deletebutton=booknode.children[4].children[1];
  this.deletebutton.addEventListener("click", (event) => {
    this.library.removeBookFromLibrary(this);
    event.preventDefault();
  })
  return booknode;
}

Bookshelf.prototype.addBookToLibrary = function (book) {
  this.bookshelf.push(book);
  this.bookshelfelem.appendChild(book.bookElem());
}

Bookshelf.prototype.removeBookFromLibrary = function (book) {
  const index = this.bookshelf.indexOf(book);
  const splicedarray= this.bookshelf.splice(index, 1);
  this.bookshelf = splicedarray;
  this.bookshelfelem.removeChild(book.bookelem);
}

function main() {
}

main();
