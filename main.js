let displayButton = document.getElementById("butt");
let textInput = document.getElementById("myInput");
let changeColor = document.getElementById("changeColor")

displayButton.addEventListener("click", function() {
    if(textInput.value != ""){
    let newDiv = document.createElement("div");
    
    newDiv.textContent = textInput.value;
    newDiv.classList.add("it");

    textInput.value = ""

    let removeButton = document.createElement("button");
    removeButton.textContent = "-";
    removeButton.classList.add("removeButton");
    removeButton.onclick = function() {
        newDiv.remove();
    };

    newDiv.appendChild(removeButton);

    document.getElementById("list").appendChild(newDiv);
}
});

changeColor.addEventListener("click", function(){
    let color = document.body.style.backgroundColor

    if(color != "white"){
        document.body.style.backgroundColor = "white";
    }
    else{
        document.body.style.backgroundColor = "black";
    };
})

