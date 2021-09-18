const deleteButton = document.getElementById("deleteButton");

const no = () => {
  alert("Hi! This is the 'no' button...");
}
const yes = () => {
  alert("Hi! This is the 'yes' button...");
}
const maxQuordleplean = () => {
  document.getElementById('douglasAdamsButton').textContent = "Please do not press this button again";
}

deleteButton.addEventListener('click',function() {
  const containerDiv = document.createElement('div');
  containerDiv.className = "container";
  document.body.insertBefore(containerDiv, document.body.firstElementChild);
  const areYouSureDiv = document.createElement('div');
  areYouSureDiv.className = "areYouSure";
  areYouSureDiv.textContent = "Some test text";
  containerDiv.appendChild(areYouSureDiv);
  areYouSureDiv.innerHTML = 
    `<p>Are you sure you want to delete this book?</p>
    <button id = "erMaybeNot" onClick="no()">... well, now that you mention it... no. CANCEL!!!</button>
    <button id = "jfdi" onClick="yes()">Shut up and do as you're told. DELETE!!!</button>
    <button id = "douglasAdamsButton" onClick="maxQuordleplean()">Douglas Adams button</button>
    `
});
