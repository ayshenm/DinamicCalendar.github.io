const wrapper = document.querySelector(".wrapper");
const h2 = document.querySelector("h2");
const p = document.querySelector("p");
const weeks = document.querySelector(".weeks");
const days = document.querySelector(".days");
const icons = document.querySelectorAll(".icons span");
// const buttons = document.querySelector("#buttons");
const box = document.querySelector("#box");
const monthArea = document.querySelector("#months-area");
const buttonsArea = document.querySelector("#buttons-area");
// console.log(icons);

let date = new Date(); //date obyeti
let currentYear = date.getFullYear(); //cari il
let currentMonth = date.getMonth(); //cari ay
let currentDate = new Date().getDate(); // cari gun
console.log(currentMonth, currentDate);

const months = [
  { short: "Jan", long: "January" },
  { short: "Feb", long: "February" },
  { short: "Mar", long: "March" },
  { short: "Apr", long: "April" },
  { short: "May", long: "May" },
  { short: "Jun", long: "June" },
  { short: "Jul", long: "July" },
  { short: "Aug", long: "August" },
  { short: "Sep", long: "September" },
  { short: "Oct", long: "October" },
  { short: "Nov", long: "November" },
  { short: "Dec", long: "December" },
];

const daysOfWeek = [
  { short: "Sun", long: "Sunday" },
  { short: "Mon", long: "Monday" },
  { short: "Tue", long: "Tuesday" },
  { short: "Wed", long: "Wednesday" },
  { short: "Thu", long: "Thursday" },
  { short: "Fri", long: "Friday" },
  { short: "Sat", long: "Saturday" },
];

function headerChange() {
  yearOfMonth = months[date.getMonth()];
  h2.innerHTML = `${yearOfMonth.long}`;
  let dayOfWeek = daysOfWeek[date.getDay()];
  console.log(dayOfWeek);
  p.innerHTML = `${dayOfWeek.long} ${currentDate} ${yearOfMonth.long} ${currentYear}`;
}

function calendar(year, month, monthDay) {
  headerChange();
  const dayElements = daysOfWeek.map((day) => {
    const li = document.createElement("li");
    li.textContent = day.short;
    return li;
  });
  weeks.append(...dayElements);
  renderCalendar();
}


function renderCalendar() {

  let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  let lastDateofMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  let lastDayOfMonth = new Date(currentYear, currentMonth,lastDateofMonth).getDay();
  let lastDateofLastMonth = new Date(currentYear, currentMonth, 0).getDate();
//   const today = new Date();
  let liTag = "";

  for (let i = firstDayOfMonth; i > 0; i--) {
    liTag += `<li class="interactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    // active add
   let today = i === date.getDate() && currentMonth === new Date().getMonth()
              && currentYear === new Date().getFullYear() ? "active" : "";
    liTag += `<li class="${today}">${i}</li>`;        
  }

  for(let i = lastDayOfMonth; i<6; i++){
    liTag += `<li class="interactive">${i - lastDayOfMonth + 1}</li>`; 
  }
  days.innerHTML = liTag;

  
}

function updateCalendar() {
  const activeElements = days.querySelectorAll(".active");

  activeElements.forEach((element) => {
    element.classList.remove("active");
  });

  const dayElements = daysOfWeek.map((day) => {
    const li = document.createElement("li");
    li.textContent = day.short;
    return li;
  });
  weeks.append(...dayElements);
}

icons.forEach((icon) => {

  icon.addEventListener("click", () => {
  currentMonth = icon.id === "prev" ? currentMonth - 1 : currentMonth + 1;

    if (currentMonth === -1) {
      currentMonth = 11;
      currentYear--;
    } else if (currentMonth === 12) {
      currentMonth = 0;
      currentYear++;
    }
    weeks.innerHTML = "";
    renderCalendar()
    calendar();
    // removeActive();
    changeValue();
  });
});

calendar(currentYear, currentMonth, currentDate);

function removeActive() {
  const removeActive = document.querySelector(".days .active");
  //     console.log("remove", removeActive)
  removeActive ? removeActive.classList.remove("active") : "";
}

function changeValue() {
  const yearOfMonth = months[currentMonth];
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const dayOfWeek = daysOfWeek[firstDayOfMonth].long;
  p.innerHTML = `${dayOfWeek} 1 ${yearOfMonth.long} ${currentYear}`;
  h2.innerHTML = `${yearOfMonth.long}`;
  // renderCalendar();
}

months.forEach((month) => {
  const span = document.createElement("span");
  span.textContent = month.short;
  monthArea.appendChild(span);
});

for (let i = 1; i <= 12; i++) {
  const button = document.createElement("button");
  button.style.width = "20px";
  button.style.height = "20px";
  button.style.cursor = "pointer";
  button.style.borderRadius = "50%";
  buttonsArea.appendChild(button);
}

// all buttonsArea elements
const buttons = document.querySelectorAll("button");

buttons.forEach((button, index) => {

  button.addEventListener("click", () => {
    const clickedMonth = index;
    currentMonth = clickedMonth;
    //  active class sil
    buttons.forEach((button) => {
      button.classList.remove("active");
    });
    button.classList.add("active");
    weeks.innerHTML = "";
    renderCalendar();
    calendar();
    // removeActive();
    changeValue();
    // headerChange()
  });
});
