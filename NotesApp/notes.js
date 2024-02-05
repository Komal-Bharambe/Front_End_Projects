console.log("welcome to notes app");

let addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", function (e) {
    let addtxt = document.getElementById("addtxt");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addtxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addtxt.value = " ";
    console.log(notesObj);
    showNotes();
})
// function to show elements from localstorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard mx-2 my-2 card" style="width: 18rem;">

        <div class="card-body">
            <h5 class="card-title">Notes ${index+1}</h5>
            <p class = "card-text"> ${element}</p>
            <button id = "${index}" onclick = "deleteNode(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
        </div>`
    });

    let notesElm = document.getElementById("notes");
    if(notesObj.length != 0){
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML = `Nothing to show you use add notes function and add your notes.`;
    }
}
// function to delete a node

function deleteNode(index){
    console.log('Iam deleting', index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}
// function to search the nodes

let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value;
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})
