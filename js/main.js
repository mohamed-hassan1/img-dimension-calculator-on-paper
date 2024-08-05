// *** Variables ***
const IN_width = document.querySelector('#img_width'),
      IN_height = document.querySelector('#img_height'),
      IN_gap = document.querySelector('#img_gap'),
      UI_form = document.querySelector('.form-table')

let val = {
  width: Number(IN_width.value) || 10,
  height: Number(IN_height.value) || 10,
  gap: Number(IN_gap.value) || 0
}

// *** Init ***
document.addEventListener('DOMContentLoaded', init);


// *** Global Functions ***
function init() {

  // Arrow Buttons
  UI_form.addEventListener('click', arrowFun);


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
      if (
        IN_ele.id === 'img_width' && Number(IN_ele.value) > val.width ||
        IN_ele.id === 'img_height' && Number(IN_ele.value) > val.height ||
        IN_ele.id === 'img_gap' && Number(IN_ele.value) > val.gap
      ) {
        IN_ele.value = Number(IN_ele.value) - 1;
      } else {
        // Add Disabled
        prevBtn.classList.add('disabled');
      }
      
    } else {
      IN_ele.value = Number(IN_ele.value) + 1;
    }
    
  }
}


