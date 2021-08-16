"use strict";

// Data from table table will load after everything else is loaded
window.onload = () => {
  loadTableData(tableDataStructure);
  loadOptionsData(options);
};

// The array of objects with the main data
let tableDataStructure = [
  // {
  //   poradi: 1,
  //   nazevPrace: "JavaScript",
  //   druhPrace: "Programovani",
  //   od: "15. 7. 2021 10:53",
  //   do: "14. 8. 2021 12:16",
  //   celkemDoba: "30 dní 22 hodin 15 minut",
  // },
  // {
  //   poradi: 2,
  //   nazevPrace: "Guláš",
  //   druhPrace: "Vaření",
  //   od: "1. 3. 2021 9:23",
  //   do: "5. 3. 2021 18:56",
  //   celkemDoba: "4 dny 9 hodin 33 minut",
  // },
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

    return `${hours} hodin ${minutes} minut`;
  }
};

let order = 0;

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
      datumOd: new Date(inputFromDateTime.value),
      datumDo: new Date(inputTillDateTime.value),
      od: styledDateTime(inputFromDateTime.value),
      do: styledDateTime(inputTillDateTime.value),
      celkemDoba: workDuration(timeStampFrom, timeStampTill),
      celkemDobaNumber: timeStampTill - timeStampFrom,
    });

    inputTaskName.value = "";

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

// Sorting the table columns

function sortNumberColumn(sort, columnName) {
  tableDataStructure = tableDataStructure.sort((a, b) => {
    return sort ? a[columnName] - b[columnName] : b[columnName] - a[columnName];
  });
}

function sortStringColumn(sort, columnName) {
  tableDataStructure = tableDataStructure.sort((a, b) => {
    if (sort) {
      if (a[columnName] < b[columnName]) return 1;
      if (a[columnName] > b[columnName]) return -1;
    } else {
      if (a[columnName] < b[columnName]) return -1;
      if (a[columnName] > b[columnName]) return 1;
    }
  });
}

let sortDirection = false;

function sortColumn(columnName) {
  const dataType = typeof tableDataStructure[0][columnName];

  switch (dataType) {
    case "number":
      sortDirection = !sortDirection;
      sortNumberColumn(sortDirection, columnName);
      break;
    case "string":
      sortDirection = !sortDirection;
      sortStringColumn(sortDirection, columnName);
      break;
    case "object":
      sortDirection = !sortDirection;
      sortStringColumn(sortDirection, columnName);
      break;
  }

  sortNumberColumn(sortDirection, columnName);
  sortStringColumn(sortDirection, columnName);
  loadTableData(tableDataStructure);
}
