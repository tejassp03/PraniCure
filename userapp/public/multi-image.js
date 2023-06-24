let fileInput = document.getElementById("file-input");
let imageContainer = document.getElementById("images");
let numOfFiles = document.getElementById("num-of-files");
let files = [];

function preview() {
  numOfFiles.textContent = `${fileInput.files.length} Files Selected`;

  for (let i = 0; i < fileInput.files.length; i++) {
    let file = fileInput.files[i];
    let reader = new FileReader();
    let figure = document.createElement("figure");
    let figCap = document.createElement("figcaption");
    figCap.innerText = file.name;
    figure.appendChild(figCap);
    reader.onload = (event) => {
      let img = document.createElement("img");
      img.setAttribute("src", event.target.result);
      figure.insertBefore(img, figCap);
    };
    reader.readAsDataURL(file);
    imageContainer.appendChild(figure);
  }
}

fileInput.addEventListener("change", preview);