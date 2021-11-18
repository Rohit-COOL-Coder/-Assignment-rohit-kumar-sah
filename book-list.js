const setEditModal = (booknumber) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", `http://localhost:3000/book/${booknumber}`, false);
    xhttp.send();

    const book = JSON.parse(xhttp.responseText);


    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('booknumber').value = book.booknumber;

    // setting up the action url for the book
    document.getElementById('editForm').action = `http://localhost:3000/book/${booknumber}`;

}

const deleteBook = (booknumber) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", `http://localhost:3000/book/${booknumber}`, false);
    xhttp.send();

    location.reload();
}

const loadBooks = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3000/book", false);
    xhttp.send();

    const books = JSON.parse(xhttp.responseText);

    for (let book of books) {
        const x = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${book.booknumber}</h6>

                        <div>Author: ${book.author}</div>
                        <hr>

                        <button types="button" class="btn btn-danger" data-toggle="modal" 
                             onClick="deleteBook(${book.booknumber})">
                            Delete
                        </button>
                        <button types="button" class="btn btn-primary" data-toggle="modal" 
                            data-target="#editBookModal" onClick="setEditModal(${book.booknumber})">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        `

        document.getElementById('books').innerHTML = document.getElementById('books').innerHTML + x;
    }
}

loadBooks();

document.querySelector("#searchBook").addEventListener("submit",e=>{
    e.preventDefault();
    const booknumber=document.getElementById("bn").value;
    searchBook(booknumber);
})

function searchBook(booknumber){
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", `http://localhost:3000/book/${booknumber}`, false);
    xhttp.send();
    let book=""
    try{
         book = JSON.parse(xhttp.responseText)
    }catch{
        book=undefined;
    }

  if(!book){
    document.getElementById('searchBookResult').innerHTML ='no record found'      
  }
  else{
    const x = `
    <div class="col-4">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${book.booknumber}</h6>

                <div>Author: ${book.author}</div>
                <hr>
            </div>
        </div>
    </div>
`

document.getElementById('searchBookResult').innerHTML =  x;

  }
}