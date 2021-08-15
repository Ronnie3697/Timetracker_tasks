"use strict";

// The Select All Checkbox
const selectAllCheckbox = document.querySelector(".checkbox-select-all");
const allSelectCheckboxes = document.querySelectorAll(".select");

selectAllCheckbox.addEventListener("click", () => {
  if (selectAllCheckbox.checked == true) {
    for (let i = 0; i < allSelectCheckboxes.length; i++) {
      allSelectCheckboxes[i].checked = true;
    }
  } else {
    for (let i = 0; i < allSelectCheckboxes.length; i++) {
      allSelectCheckboxes[i].checked = false;
    }
  }
});
