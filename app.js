// create empty  array
let tasks=[];

window.onload=function(){
    const storedTasks=localStorage.getItem("tasks");
    if(storedTasks){
        tasks=JSON.parse(storedTasks);
    } 

    showTasks();
};

//  Add task function
function addTask(){
const input = document.getElementById("taskInput");
const dateInput= document.getElementById("taskDate");
const priority= document.getElementById("taskPriority");
const taskValue= input.value.trim();
const dueDate= dateInput.value;
const priorityValue=priority.value.trim();
if(taskValue ===""){
    alert("please enter a task.");
    return;
}
const newTask = {
    text: taskValue,
    completed:false,
    date: dueDate || "No due date",
    priority: priorityValue
};
tasks.push(newTask);
saveTask();

showTasks();
input.value="";
dateInput.value="";
};


function saveTask(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}


// display tasks on the screen

function showTasks(filter = "all"){
const taskList = document.getElementById("taskList");
taskList.innerHTML="";
let filteredTasks=[];
// if(filter === "all"){
//     filteredTasks = tasks;
// }
// else if (filter === "active"){
// filteredTasks=tasks.filter(task => !task.completed);
// }
// else if(filter === "completed"){
//     filteredTasks=tasks.filter(task => task.completed);
// }
switch(filter){
    case "all":
    filteredTasks=tasks;
    break;
    case "active":
        filteredTasks=tasks.filter(task => !task.completed);
        break;
    case "completed":
        filteredTasks=tasks.filter(task=> task.completed);
        break;
    case "Low":
        filteredTasks=tasks.filter(task=>task.priority === "Low");
        break;
    case "Medium":
        filteredTasks=tasks.filter(task=>task.priority === "Medium");
        break;
    case "High":
        filteredTasks=tasks.filter(task=>task.priority === "High");
        break;
};

filteredTasks.forEach((task,index ) => {
    const li = document .createElement("li");
    if(task.completed)li.classList.add("completed");

    li.innerHTML=` <input type="checkbox" onchange="toggleComplete(${index})"  ${task.completed ? "checked" : ""}>
    <div class="task-text">
    <span> ${task.text}</span>
     <small>📅 Due: ${task.date} | 🚦Priority: ${task.priority}</small>
    </div>
    <div class="task-action">
    <button onclick="editTask(${index})"> Edit</button>
    <button onclick="deleteTask(${index})">Delete</button></div>`;

    taskList.appendChild(li);
});

updateCounter();
}


//  Toggle Task as Complete / Incomplete


function toggleComplete(index){
    tasks[index].completed= !tasks[index].completed;  

    saveTask();
    showTasks();
}

//Delete a Task

function deleteTask(index){
    const confirmation = confirm("Are you sure you want to delete this task? ");
    if(!confirmation){
        return ;
    }
    tasks.splice(index,1);
    saveTask();
    showTasks();
}


// Edit a Task

function editTask(index){
    const currentText=tasks[index].text;
    const newText = prompt("Edit your task: ", currentText);

    if(newText === null)reutn ; //user pressed cancel


    if(newText.trim()===""){
        alert("please text cannot be empty.");
        return;
    }

    tasks[index].text=newText.trim();
    saveTask();
    showTasks();
}

// filter tasks
function filterTasks(type){
    showTasks(type);
}


// clear completed tasks

function clearCompleted(){
    const isCompleted = tasks.some(tasks => tasks.completed);


    if(!isCompleted){
        alert("NO completed tasks to clear.");
        return;
    }

    tasks = tasks.filter(task => !tasks.completed);
saveTask();
showTasks();
}

// task counter
function updateCounter(){
    const total= tasks.length;
    const completed= tasks.filter(task=> task.completed).length;
    const active = total - completed;
    const low= tasks.filter(task=>task.priority === "Low").length;
    const medium = tasks.filter(task=> task.priority === "Medium").length;
    const high= tasks.filter(task => task.priority === "High").length;

    const counter = document.getElementById('taskCounter');
    counter.textContent=` Task Summary: Total = ${total} | Active = ${active} | Completed = ${completed} | Low = ${low} | Medium =${medium} | High = ${high}`; 
};