//selecting Dom elements
const button = document.querySelector(".button");
const notelist = document.querySelector("#list");
const input = document.querySelector("#data");
const noteDiv = document.querySelector(".notes");


let noteTags;
let noteArray;
let i = 0;

function remove(e){
  let i = this.getAttribute("data-key");
  let key = document.querySelector(`.itemKey-${i}`);
  noteArray.splice(noteArray.indexOf(key.innerText),1);
  this.remove();
  key.remove();
  localStorage.setItem("notes",JSON.stringify(noteArray));
  if(noteArray.length == 0){
    noteDiv.style.display = "none";
  }
  input.focus();
}

function addNode(note){
  // notes
  let node = document.createElement("li");
  node.innerText = note;
  node.classList.add(`itemKey-${i}`);
  notelist.appendChild(node);

  //for remove button
  let buton = document.createElement("button");
  // buton.style.display = "inlineBlock";
  buton.innerText = "X";
  buton.setAttribute("data-key",`${i}`);
  buton.classList.add("rem-btn");
  buton.addEventListener("click",remove);
  node.appendChild(buton);
  i++;
}

function initialize(e){
  noteArray = JSON.parse(localStorage.getItem("notes"));
  if(!noteArray){
    localStorage.setItem("notes",JSON.stringify([]));
    noteArray = [];
  }
  if(noteArray.length != 0){
    noteDiv.style.display = "block";
    noteArray.forEach(note => {
      addNode(note);
    });
    console.log(noteArray);
  }
  else {
    noteArray = [];
    console.log(noteArray);
  }
}

window.addEventListener("load",initialize);
function addNote(e){
  if(input.value != ""){
    if(noteArray){
      noteDiv.style.display = "block";
    }
    noteArray.push(input.value);
    //creating a li node
    addNode(input.value);
    //resetting the input element
    input.value = '';
    localStorage.setItem("notes",JSON.stringify(noteArray));
  }
  input.focus();
}
button.addEventListener("click",addNote);
input.addEventListener("keydown",e => {
  if(e.keyCode == 13)
    addNote(e);
});
