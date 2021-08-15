"use strict";

// Data from table table will load after everything else is loaded
window.onload = () => {
  loadTableData(tableDataStructure);
  loadOptionsData(options);
};

// Sorting the table columns

let sortDirection = false;
let order = 2;

// The array of objects with the main data
let tableDataStructure = [
  {
    poradi: 1,
    nazevPrace: "JavaScript",
    druhPrace: "Programovani",
    od: "15. 7. 2021 10:53",
    do: "14. 8. 2021 12:16",
    celkemDoba: "30 dní 22 hodin 15 minut",
  },
  {
    poradi: 2,
    nazevPrace: "Guláš",
    druhPrace: "Vaření",
    od: "1. 3. 2021 9:23",
    do: "5. 3. 2021 18:56",
    celkemDoba: "4 dny 9 hodin 33 minut",
  },
];

// Storing the required inputs when the Submit button is clicked
const btnSubmit = document.querySelector(".btn-submit-all");
const inputTaskName = document.querySelector(".input-task-name");
const inputJobName = document.querySelector(".input-job-name");
const inputFromDateTime = document.querySelector(".input-from-date-time");
const inputTillDateTime = document.querySelector(".input-till-date-time");

// Function to get the propper style of Date and Time
const styledDateTime = function (dateAndTime) {
  const date = new Date(dateAndTime);

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();

  return `${day}. ${month}. ${year} ${hour}:${minute}`;
};

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  order++;
  tableDataStructure.push({
    poradi: order,
    nazevPrace: inputTaskName.value,
    druhPrace: inputJobName.value,
    od: styledDateTime(inputFromDateTime.value),
    do: styledDateTime(inputTillDateTime.value),
    celkemDoba: "Zatim nefunguje",
  });

  loadTableData(tableDataStructure);
});

// Options for the select element
let options = ["Programování", "Meetingy", "Zahradničení", "Vaření", "Jiné"];
const loadOptionsData = function (optionsData) {
  let selector = document.querySelector(".selecting");
  let htmlOptionsData = "";

  for (let i = 0; i < optionsData.length; i++) {
    htmlOptionsData += `<option>${optionsData[i]}</option>`;
  }

  selector.innerHTML = htmlOptionsData;
};

// Add option element to the select menu
const btnAddOption = document.querySelector(".btn-add-option");
const inputAddOption = document.querySelector(".input-add-option");
btnAddOption.addEventListener("click", () => {
  let optionValue = inputAddOption.value;

  if (optionValue == "") {
    alert("The input field is empty!");
  } else if (options.includes(optionValue)) {
    alert("This option has been already added");
  } else {
    options.unshift(optionValue);
    inputAddOption.value = "";
    loadOptionsData(options);
  }
});

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
