// *** Variables ***
const IN_width = document.querySelector('#img_width'),
      IN_height = document.querySelector('#img_height'),
      IN_gap = document.querySelector('#img_gap'),
      UI_form = document.querySelector('.form-table'),
      UI_paperContainer = document.querySelector('.paper-container'),
      UI_paperBox = UI_paperContainer.querySelectorAll('.box');

let IN_val = {
  width: [IN_width, Number(IN_width.value) || 10],
  height: [IN_height, Number(IN_height.value) || 10],
  gap: [IN_gap, Number(IN_gap.value) || 0]
}

// *** Init ***
document.addEventListener('DOMContentLoaded', init);


// *** Global Functions ***
function init() {

  // Paper Init
  addPaper();

  // Arrow Buttons
  UI_form.addEventListener('click', arrowFun);
  // Width Input
  IN_width.addEventListener('input', fieldsIn);
  IN_width.addEventListener('keyup', fieldsIn);
  IN_width.addEventListener('blur', validateIn);
  // Height Input
  IN_height.addEventListener('input', fieldsIn);
  IN_height.addEventListener('keyup', fieldsIn);
  IN_height.addEventListener('blur', validateIn);
  // Gap Input
  IN_gap.addEventListener('input', fieldsIn);
  IN_gap.addEventListener('keyup', fieldsIn);
  IN_gap.addEventListener('blur', validateIn);

}

// Arrow Buttons
function arrowFun(e) {
  let btn = e.target.closest('.arrow-btn:not(.disabled)');
  if (btn) {
    let prevBtn = btn.classList.contains('left-arrow')? btn : btn.parentElement.querySelector('.left-arrow'),
        nextBtn = btn.classList.contains('right-arrow')? btn : btn.parentElement.querySelector('.right-arrow'),
        IN_ele = btn.parentElement.querySelector('input');

    // Check for disabled buttons
    if (btn.classList.contains('right-arrow') && prevBtn.classList.contains('disabled')) {
      prevBtn.classList.remove('disabled');
    }

    // Assign Input Value
    if (btn.classList.contains('left-arrow')) {
      for (let x in IN_val) {
        if (IN_ele === IN_val[x][0] && Number(IN_ele.value) - 1 >= IN_val[x][1]) {
          IN_ele.value = Number(IN_ele.value) - 1
          if (Number(IN_ele.value) - 1  < IN_val[x][1]) {
            prevBtn.classList.add('disabled');
          }
        }
      }
    } else {
      IN_ele.value = Number(IN_ele.value) + 1;
    }
  }
}

// Fields Inputs
function fieldsIn(e) {
  for (let x in IN_val) {
    if (this === IN_val[x][0] && Number(this.value) < IN_val[x][1]) {
      if (e.keycode === 40 || e.which === 40) {
        this.value = IN_val[x][1];
      }
      this.parentElement.querySelector('.left-arrow').classList.add('disabled');
    } else if (this === IN_val[x][0] && (Number(this.value) > IN_val[x][1] && this.parentElement.querySelector('.left-arrow').classList.contains('disabled'))) {
      this.parentElement.querySelector('.left-arrow').classList.remove('disabled');
    }
  } 
}

// Validate Inputs
function validateIn() {  
  for (let x in IN_val) {
    if (
      this === IN_val[x][0] && Number(this.value) < IN_val[x][1] ||
      this === IN_val[x][0] && Number(this.value) === 0
    ) {
      this.value = IN_val[x][1];
      this.parentElement.querySelector('.left-arrow').classList.add('disabled');
    }
  }
  this.value = parseFloat(this.value);
}

// Add Paper Elements

function addPaper() {
  UI_paperBox.forEach((item) => {
    let boxWidth = Number(item.getAttribute('data-width')),
        boxHeight = Number(item.getAttribute('data-height')),
        boxMargin = Number(item.getAttribute('data-margin')),
        safeWidth = boxWidth - boxMargin,
        safeHeight = boxHeight - boxMargin,
        gap = Number(IN_val['gap'][1]),
        getWidth = parseInt(safeWidth / (IN_val['width'][1] + gap)),
        getHeight = parseInt(safeHeight / (IN_val['height'][1] + gap)),
        innerContent = item.querySelector('.inner .content'),
        imgWidth = ((IN_val['width'][1] / safeWidth) * 100).toFixed(2),
        imgHeight = (IN_val['height'][1]),

        pos = 'Horizontal', paperLen;

    if (getWidth === 0) { // Vertical
      getWidth = 1;
      imgWidth = 100;
      pos = 'Vertical';
    } else if (getHeight === 0) { // Horizontal
      getHeight = 1;
      imgHeight = 100;
      pos = 'Horizontal';
    }

    paperLen = getWidth * getHeight

    for (let i = 0; i < paperLen; i++) {
      let div = document.createElement('div');
      div.className = 'paper';
      div.style.width = imgWidth + '%';
      div.style.flex =  '0 0 ' + imgWidth + '%';
      div.style.height = imgHeight + 'px';
      div.style.marginRight = gap + 'px';
      div.style.marginBottom = gap + 'px';
      innerContent.appendChild(div);
    }


    
  });
}