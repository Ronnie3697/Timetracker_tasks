"use strict";

// Data from table table will load after everything else is loaded
window.onload = () => {
  loadTableData(tableDataStructure);
  loadOptionsData(options);
};

// Sorting the table columns

let sortDirection = false;

// The array of objects with the main data
let tableDataStructure = [
  {
    poradi: [1],
    nazevPrace: ["JavaScript"],
    druhPrace: ["Programovani"],
    od: ["15. 7. 2021 10:53"],
    do: ["14. 8. 2021 12:16"],
    celkemDoba: ["30 dní 22 hodin 15 minut"],
  },
  {
    poradi: [2],
    nazevPrace: ["Guláš"],
    druhPrace: ["Vaření"],
    od: ["1. 3. 2021 9:23"],
    do: ["5. 3. 2021 18:56"],
    celkemDoba: ["4 dny 9 hodin 33 minut"],
  },
];

// Options for the select element
let options = ["Programováni", "Meetingy", "Zahradničení", "Vaření", "Jiné"];
const loadOptionsData = function (optionsData) {
  let selector = document.querySelector(".selecting");
  let htmlOptionsData = "";

  for (let i = 0; i < optionsData.length; i++) {
    htmlOptionsData += `<option>${optionsData[i]}</option>`;
  }

  console.log(selector);
  console.log(htmlOptionsData);
  selector.innerHTML = htmlOptionsData;
};

// Add option element to the select menu
const btnAddOption = document.querySelector(".btn-add-option");

// Function to load the data into the HTML table
const loadTableData = function (tableData) {
  const tableBody = document.querySelector(".table-data");
  let htmlData = "";

  for (let data of tableData) {
    htmlData += `<tr>
    <td><input type="checkbox" id="select" class="checkbox select" /></td>
    <td>${data.poradi}</td>
    <td>${data.nazevPrace}</td>
    <td>${data.druhPrace}</td>
    <td>${data.od}</td>
    <td>${data.do}</td>
    <td>${data.celkemDoba}</td>
    </tr>`;
  }

  tableBody.innerHTML = htmlData;
};

/*
// The Select All Checkbox
const selectAllCheckbox = document.querySelector(".checkbox-select-all");
const allSelectCheckboxes = document.querySelectorAll("#select");

console.log(selectAllCheckbox);
console.log(allSelectCheckboxes);

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
*/
