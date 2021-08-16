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
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const locale = navigator.language;

  return new Intl.DateTimeFormat(locale, options).format(date);
};

// Function to get a timestamp from a date
const getTimeStamp = function (date) {
  return new Date(date).getTime();
};

const workDuration = function (Tstamp1, Tstamp2) {
  if (Tstamp2 >= Tstamp1) {
    let duration = new Date(Tstamp2 - Tstamp1);
    let hours = Math.floor(duration / (1000 * 60 * 60));
    let minutes = Math.floor(((duration / (1000 * 60 * 60)) % 1) * 60);

    console.log(hours);
    console.log(minutes);

    return `${hours} hodin ${minutes} minut`;
  }
};

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  let timeStampFrom = getTimeStamp(inputFromDateTime.value);
  let timeStampTill = getTimeStamp(inputTillDateTime.value);
  if (timeStampFrom > timeStampTill) {
    alert("Datum 'Do' je dříve než datum 'Od'");
  } else {
    order++;
    tableDataStructure.push({
      poradi: order,
      nazevPrace: inputTaskName.value,
      druhPrace: inputJobName.value,
      od: styledDateTime(inputFromDateTime.value),
      do: styledDateTime(inputTillDateTime.value),
      celkemDoba: workDuration(timeStampFrom, timeStampTill),
    });

    console.log(getTimeStamp(inputFromDateTime.value));

    loadTableData(tableDataStructure);
  }
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
    alert("Vstupní hodnota je prázdná!");
  } else if (options.includes(optionValue)) {
    alert("Tato možnost již je v nabídce!");
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
    <td class="delete"><button class="btn-delete">Odstranit</button></td>
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

console.log("ahoj");
