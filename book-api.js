const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname +"/"+ ""))

let books = [{
    booknumber:"101",
    title:"title one",
    author:"author one"

},
{
    booknumber:"102",
    title:"title two",
    author:"author two"
},
{
    booknumber:"103",
    title:"title three",
    author:"author three"
}];


app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/"+"index.html");
})

app.post('/book', (req, res) => {
    const book = req.body;
    books.push(book);
    res.sendFile(__dirname+"/"+"index.html");
});

app.get('/book', (req, res) => {
    res.json(books);
});

app.get('/book/:booknumber', (req, res) => {
    const booknumber = req.params.booknumber; 
    for (let book of books) {
        if (book.booknumber ===booknumber) {
            res.json(book);
            return;
        }
    }
    res.send('Book not found');
});

app.delete('/book/:booknumber', (req, res) => {
    const book=books.find(b=>b.booknumber===req.params.booknumber)
     
    if(!book){
   
    }else{
        const index=books.indexOf(book);
        books.splice(index,1);
        res.sendFile(__dirname+"/"+"index.html");
    }
});

app.post('/book/:booknumber', (req, res) => {
    const newBook = req.body;
    const book=books.find(b=>b.booknumber===req.params.booknumber)
     
    if(book){
        book.booknumber=newBook.booknumber;
        book.author=newBook.author;
        book.title=newBook.title;
       res.json(newBook);
        
    }else{
        console.log("post with id problem");
    }
    
    
   
});

app.listen(3000, () => console.log("server running(3000).."));