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
const taskValue= input.value.trim();

if(taskValue ===""){
    alert("please enter a task.");
    return;
}
const newTask = {
    text: taskValue,
    completed:false
};
tasks.push(newTask);
saveTask();

showTasks();
input.value="";
};


function saveTask(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}


// display tasks on the screen

function showTasks(filter = "all"){
const taskList = document.getElementById("taskList");
taskList.innerHTML="";
let filteredTasks=[];
if(filter === "all"){
    filteredTasks = tasks;
}
else if (filter === "active"){
filteredTasks=tasks.filter(task => !task.completed);
}
else if(filter === "completed"){
    filteredTasks=tasks.filter(task => task.completed);
}

filteredTasks.forEach((task,index ) => {
    const li = document .createElement("li");
    if(task.completed)li.classList.add("completed");

    li.innerHTML=` <input type="checkbox" onchange="toggleComplete(${index})"  ${task.completed ? "checked" : ""}>
    <span> ${task.text}</span>
    <button onclick="editTask(${index})"> Edit</button>
    <button onclick="deleteTask(${index})">Delete</button>`;

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

    const counter = document.getElementById('taskCounter');
    counter.textContent=` Task Summary: Total = ${total} | Active = ${active} | Completed = ${completed}`; 
};