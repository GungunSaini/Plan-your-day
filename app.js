let inp = document.querySelector("#task-input");
let btn = document.querySelector("#add-task-btn");
let ul = document.querySelector("ul");
let theme = document.getElementById("switch");
let time = document.getElementById("clock");
let timeformat = document.getElementById("timeformat");


// Save dark mode state
theme.addEventListener("change", () => {
    document.querySelector(".todo").classList.toggle("dark");
    document.querySelector("#clock").classList.toggle("white");
    document.querySelector("#timeformat").classList.toggle("white");
    document.body.classList.toggle("background");
    localStorage.setItem("darkMode", theme.checked);
});



// Apply dark mode on load
window.addEventListener("load", () => {
    let isDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    if (isDarkMode) {
        document.body.classList.add("body-dark");
        theme.checked = true;
    }
});



// display the current date
function displayCurrentDate() {
    let now = new Date();

    let date = now.getDate();
    let month = now.getMonth()+1;
    let year = now.getFullYear();

    date = date<10 ? `0${date}` : date;
    month = month<10 ? `0${month}` : month; 

    let formattedDate = `${date}-${month}-${year}`;

    let dateElement = document.getElementById("current-date");
    dateElement.innerHTML = ` <img src="assets/calendar.svg" class="calendar" > ${formattedDate}`;
}

displayCurrentDate();

document.addEventListener("DOMContentLoaded", ()=>{
    setInterval(showTime , 1000)
})

let showTime = () => {
    let date = new Date();

    let hr = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();


    hr = hr<10 ? `0${hr}` : hr;
    mins = mins<10 ? `0${mins}` : mins;
    secs = secs<10 ? `0${secs}` : secs;
    
    clock.innerHTML = ` <img src="assets/clock.svg" class="clock">${hr} : ${mins} : ${secs}`;
    timeformat.innerText = hr>12 ? "pm" : "am";
}



// Create a Remove button
let dlt = document.createElement("button");
dlt.innerHTML = '<i class="fa-solid fa-trash-can"></i>  Clear Completed';
dlt.classList.add("remove");
document.querySelector(".todo").append(dlt);


// Load tasks from localStorage on page load
window.addEventListener("load", () => {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach((task) => {
        addTaskToDOM(task.text, task.checked);
    });
});


// Add new task
btn.addEventListener("click", function () {
    let taskText = inp.value.trim();
    if (taskText === "") return; 

    addTaskToDOM(taskText, false);
    inp.value = ""; 
});



// Function to add a task to the DOM
function addTaskToDOM(taskText, isChecked) {
    let task = document.createElement("li");
    task.innerText = taskText;

    // Create a checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isChecked;
    checkbox.classList.add("checkbox");


    let hr = document.createElement("hr");


    // Append elements to the task
    task.prepend(checkbox);
    ul.appendChild(task);
    task.appendChild(hr);



    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            task.style.textDecoration = "line-through";
        } else {
            task.style.textDecoration = "none";
        }
        saveTasksToLocalStorage(); 
    });


    if (isChecked) {
        task.style.textDecoration = "line-through";
    }

    saveTasksToLocalStorage();
}



// Remove checked tasks
dlt.addEventListener("click", () => {
    let tasks = ul.querySelectorAll("li"); 
    tasks.forEach((task) => {
        let checkbox = task.querySelector("input[type='checkbox']");
        if (checkbox.checked) {
            task.remove(); 
        }
    });
    saveTasksToLocalStorage();
});



// Save tasks to localStorage
function saveTasksToLocalStorage() {
    let tasks = [];
    ul.querySelectorAll("li").forEach((task) => {
        let checkbox = task.querySelector("input[type='checkbox']");
        tasks.push({
            text: task.innerText.trim(),
            checked: checkbox.checked,
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}








