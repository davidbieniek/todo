var displayButton = document.getElementById("butt");
var textInput = document.getElementById("myInput");

displayButton.addEventListener("click", function() {
    if(textInput.value != ""){
    var newDiv = document.createElement("div");
    
    newDiv.textContent = textInput.value;
    newDiv.classList.add("it");

    textInput.value = ""

    var removeButton = document.createElement("button");
    removeButton.textContent = "-";
    removeButton.classList.add("removeButton");
    removeButton.onclick = function() {
        newDiv.remove();
    };

    newDiv.appendChild(removeButton);

    document.getElementById("list").appendChild(newDiv);
}
});