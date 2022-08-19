console.log('Library');
function Book(name,author,type){
    this.name=name
    this.author=author
    this.type=type
}

let submitBook=document.getElementById('submitBook')
submitBook.addEventListener('click', libraryFormSubmit)
function libraryFormSubmit(e){
    e.preventDefault()
    console.log('Form submitted');
    let name= document.getElementById('bookName').value
    let author=document.getElementById('author').value
    let type
 if (document.getElementById('Fiction').checked) {
    type=document.getElementById('Fiction').value
 }
else if(document.getElementById('Programming').checked){
    type=document.getElementById('Programming').value
}
else if(document.getElementById('Cooking').checked){
    type=document.getElementById('Cooking').value
}
let book= new Book(name, author, type)
let display= new Display()
if (display.validate(book)){
    display.add(book)
    display.clear()
    display.show('Success!!','.Your Book was successfully added.')
}
else{
    display.show('Error :(','.There was error while adding your book!')
}


let notes= localStorage.getItem("tableBody")
let notesObj= []
if (notes==null){
    notesObj = [];
}
else{
    notesObj=JSON.parse(notes)
}
notesObj.push(book)
localStorage.setItem("notes", JSON.stringify(notesObj));

}
function Display(){
    
}
Display.prototype.add =  function(book,index){
    tableBody=document.getElementById('tableBody')
    let uiString=`
    <tr>
    <th scope="row">${index+1}</th>
    <td>${book.name}</td>
    <td>${book.author}</td>
    <td>${book.type}</td>
  </tr>`
  let notes= localStorage.getItem("notes")
  let notesObj= []
  if (notes==null){
      notesObj = [];
    }
    else{
        notesObj=JSON.parse(notes)
    }
    if (notesObj.length!=0) {
        tableBody.innerHTML+=uiString
    }
    else{
        tableBody.innerHTML+=`
        <b style="color:red" There is no book in the library</b>
        `
    }
    console.log(notesObj);
}
Display.prototype.clear = function(){
    let name= document.getElementById('bookName')
    name.value=""
    let author=document.getElementById('author')
    author.value=""
}

Display.prototype.validate = function(book){
    if((book.name.length < 2) || (book.author.length <2) )
    return false
    else{
        return true
    }
}

Display.prototype.show = function(type, messsage){
   let message= document.getElementById('message')
   message.innerHTML=`
   <strong> ${type}</strong> ${messsage}
   <button type="button" class="close" data-dismiss="alert" aria-label="Close">
     <span aria-hidden="true">&times;</span>
   </button>
   `
   setTimeout(() => {
    document.getElementById('message').innerHTML=""
   }, 3000);
   
   if (document.getElementById('message').innerHTML.includes('Error')){
    document.getElementById('message').style.backgroundColor="red"
    document.getElementById('message').style.color="white"
   }
  else if (document.getElementById('message').innerHTML.includes('Success')) {
    document.getElementById('message').style.backgroundColor="green"
    document.getElementById('message').style.color="white"
   }

}
