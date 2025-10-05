// ================== COLORS ==================
let colorInput = document.querySelector(".color-input");
let colorBtn = document.querySelector(".color-btn");
let colorContainer = document.querySelector(".color-container");
let deleteBtn = document.querySelector(".delete-btn");

let selectedBox = null;

if (colorBtn && colorInput && colorContainer && deleteBtn) {
  // Add new color
  colorBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let selectedColor = colorInput.value;

    if (!selectedColor) return;

    let colorBox = document.createElement("div");
    let colorSubInput = document.createElement("input");

    colorBox.className = "color-box";
    colorBox.style.backgroundColor = selectedColor;

    colorSubInput.type = "hidden";
    colorSubInput.className = "color-input-code";
    colorSubInput.name = "product[colors][]";
    colorSubInput.value = selectedColor;

    colorBox.setAttribute("data-color", selectedColor);

    // Add click event to select
    colorBox.addEventListener("click", () => {
      let boxes = document.querySelectorAll(".color-box");
      for (let box of boxes) {
        box.classList.remove("selected");
      }
      colorBox.classList.add("selected");
      selectedBox = colorBox;
    });

    colorContainer.appendChild(colorBox);
    colorContainer.appendChild(colorSubInput);
  });

  // Delete selected color
  deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (selectedBox) {
      let removedColor = selectedBox.getAttribute("data-color");
      let colorSubInputs = document.querySelectorAll(".color-input-code");
      for (let colorSubInput of colorSubInputs) {
        if (removedColor === colorSubInput.value) {
          colorSubInput.remove();
        }
      }
      console.log("Removed color:", removedColor);
      selectedBox.remove();
      selectedBox = null;
    } else {
      alert("Please select a color first");
    }
  });
}

// ================== SIZES ==================
let sizeInput = document.querySelector(".size-input");
let sizeBtn = document.querySelector(".size-btn");
let sizeContainer = document.querySelector(".size-container");
let sizeDeleteBtn = document.querySelector(".size-delete-btn");

let selectedBoxs = null;

if (sizeBtn && sizeInput && sizeContainer && sizeDeleteBtn) {
  sizeBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (!sizeInput.value) return;

    let sizeBox = document.createElement("div");
    let sizeBoxInput = document.createElement("input");

    sizeBox.className = "size-box";
    sizeBox.innerText = sizeInput.value;
    sizeInput.value = "";

    sizeBoxInput.type = "hidden";
    sizeBoxInput.className = "size-input-text";
    sizeBoxInput.name = "product[sizes][]";
    sizeBoxInput.value = sizeBox.innerText;

    sizeBox.addEventListener("click", () => {
      let boxes = document.querySelectorAll(".size-box");
      for (let box of boxes) {
        box.classList.remove("selecteds");
      }
      sizeBox.classList.add("selecteds");
      selectedBoxs = sizeBox;
    });

    sizeContainer.appendChild(sizeBox);
    sizeContainer.appendChild(sizeBoxInput);
  });

  sizeDeleteBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (selectedBoxs) {
      let sizeInputTexts = document.querySelectorAll(".size-input-text");
      for (let sizeInputText of sizeInputTexts) {
        if (selectedBoxs.innerText === sizeInputText.value) {
          sizeInputText.remove();
        }
      }
      selectedBoxs.remove();
      selectedBoxs = null;
    } else {
      alert("Please select a size first");
    }
  });
}

// ================== SUB IMAGES ==================
let subImgBtn = document.querySelector(".sub-img-btn");
let subImgContainer = document.querySelector(".sub-img-container");
let subImgUrl = document.querySelector(".subImgUrl");
let subImgInputDeleteBtn = document.querySelector(".sub-img-delete-btn");
let click = 0;

let subImgValue = "";
let selectInput = null;

if (subImgBtn && subImgContainer && subImgUrl && subImgInputDeleteBtn) {
  subImgBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (!subImgUrl.value) return;

    let subImgInputUrl = document.createElement("input");
    subImgInputUrl.type = "text";
    subImgInputUrl.className = "sub-img-input form-control";
    subImgInputUrl.name = "product[subImages][]";
    subImgInputUrl.value = subImgUrl.value;

    subImgInputUrl.addEventListener("click", () => {
      subImgValue = subImgInputUrl.value;
      selectInput = "select";
    });
    click++;
    if(click >=5){
      subImgBtn.style.display = "none";
    }
    subImgContainer.appendChild(subImgInputUrl);
    subImgUrl.value = "";
  });

  subImgInputDeleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    let subImgInputs = document.querySelectorAll(".sub-img-input");
    for (let subImgInput of subImgInputs) {
      if (subImgInput.value === subImgValue) {
        subImgInput.remove();
      }
    }
    if (selectInput !== "select") {
      alert("Please first select a field to delete");
    }
    if(selectInput == "select"){
      if(click > 0){
      click--;
    }
    }
    selectInput = null;
    if(click<=4){
      subImgBtn.style.display = "block";
    }
  });
}

// ================== .SELECT VARIENT INPUTS ==================
let hiddenDiv = document.querySelector(".selected-varient");
let inputsdiv = document.querySelectorAll(".select-color-varient");
let colorValue = null;
let countColor = 0;
let colorHiddenInput = null;
if (inputsdiv.length > 0) {
  for (let color of inputsdiv) {
    color.addEventListener("click", function () {

      inputsdiv.forEach((c) => (c.style.border = "none"));

      this.style.border = "4px solid white";

      countColor++;
      if (countColor == 1) {
        colorHiddenInput = document.createElement("input");
        colorHiddenInput.type = "hidden";
        colorHiddenInput.name = "customer[color]";
        colorHiddenInput.value = this.value;
      }
      if (countColor > 1) {
        colorHiddenInput.value = this.value;
      }
      hiddenDiv.appendChild(colorHiddenInput);
    });
  }
}

let inputssize = document.querySelectorAll(".select-size-varient");
let sizeValue = null;
let sizeHiddenInput = null;
let sizeCount = 0;
if (inputssize.length > 0) {
  for (let size of inputssize) {
    size.addEventListener("click", function () {

      inputssize.forEach((s) => (s.style.boxShadow="none"));
      inputssize.forEach((s) => (s.style.border="none"));
      this.style.boxShadow = "0px 1px 19px deepskyblue";
      this.style.border = "1px solid white";

      sizeCount++;
      if (sizeCount == 1) {
        sizeHiddenInput = document.createElement("input");
        sizeHiddenInput.type = "hidden";
        sizeHiddenInput. name = "customer[size]"
        sizeHiddenInput.value = this.value;
      }
      if (sizeCount > 1) {
        sizeHiddenInput.value = this.value;
      }
      hiddenDiv.appendChild(sizeHiddenInput);
    });
  }
}

let quantityInput = document.querySelector(".input-box");
let minusBtn = document.querySelector(".minus");
let plusBtn = document.querySelector(".plus");
let quantity = quantityInput.value;
let quantityHiddenInput = null;


if (quantityInput && minusBtn && plusBtn) {

  quantityHiddenInput = document.createElement("input");
  quantityHiddenInput.type = "hidden";
  quantityHiddenInput.name = "customer[quantity]"
  quantityHiddenInput.value = quantity;
  quantityHiddenInput.value = quantity;
  hiddenDiv.appendChild(quantityHiddenInput);

  minusBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (quantity > 1) {
      quantity--;
      quantityHiddenInput.value = quantity;
      quantityInput.value = quantity;

    }
  });

  plusBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (quantity < 10) {
      quantity++;
      quantityHiddenInput.value = quantity;
      quantityInput.value = quantity;
    }
  });
}

// ================== .SELECT VARIENT INPUTS VALUE ==================
