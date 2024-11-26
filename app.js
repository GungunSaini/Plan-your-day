let inp = document.querySelector("input");
let btn = document.querySelector("button");
let ul = document.querySelector("ul");


// display the current date
function displayCurrentDate() {
    let now = new Date();
    let options = { year: "numeric", month: "long", day: "numeric" }; 
    let formattedDate = now.toLocaleDateString(undefined, options);

    let dateElement = document.getElementById("current-date");
    dateElement.innerHTML = `<i class="fa-regular fa-calendar-days"></i>  ${formattedDate}`;
}

displayCurrentDate();



// Create a Remove button
let dlt = document.createElement("button");
dlt.innerText = "X";
dlt.classList.add("remove");
document.querySelector("div").append(dlt);


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

    addTaskToDOM(taskText, false); // Add task to DOM
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
        saveTasksToLocalStorage(); // Update tasks in localStorage
    });


    if (isChecked) {
        task.style.textDecoration = "line-through";
    }

    saveTasksToLocalStorage(); // Save tasks after adding
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
    saveTasksToLocalStorage(); // Update localStorage after removal
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








