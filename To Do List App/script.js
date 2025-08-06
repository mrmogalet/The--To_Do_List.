const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const toggleBtn = document.getElementById("toggleEventsBtn");

document.addEventListener("DOMContentLoaded", () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  if (savedTasks.length > 0 && toggleBtn) {
    toggleBtn.style.display = "inline-block";
  }
});


if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const isVisible = taskList.style.display === "block";
    taskList.innerHTML = ""; // Clear before rendering

    if (!isVisible) {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(task => renderTask(task));
      taskList.style.display = "block";
      toggleBtn.textContent = "📂 Hide Upcoming Events";
    } else {
      taskList.style.display = "none";
      toggleBtn.textContent = "📅 Upcoming Events";
    }

    if (tasks.length === 0) {
  const li = document.createElement("li");
  li.textContent = "No upcoming events found.";
  taskList.appendChild(li);
}

  });
}


if (addBtn) {
  addBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    const taskDate = document.getElementById("dateInput").value;
    const taskTime = document.getElementById("timeInput").value;

    if (taskText === "" || taskDate === "" || taskTime === "") {
      alert("Please fill in all fields.");
      return;
    }

    const task = {
      text: taskText,
      date: taskDate,
      time: taskTime
    };

   
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    toggleBtn.style.display = "inline-block"; // Show button if hidden

    taskInput.value = "";
    document.getElementById("dateInput").value = "";
    document.getElementById("timeInput").value = "";
    taskInput.focus();

    alert("✅ Task saved! Click 'Upcoming Events' to view.");
  });
}


function renderTask(task) {
  const li = document.createElement("li");

  const taskContent = document.createElement("div");
  taskContent.innerHTML = `
    <strong>${task.text}</strong><br />
    <small>${task.date} at ${task.time}</small>
  `;

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
  });

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.className = "remove-btn";
  removeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    taskList.removeChild(li);

 
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => !(t.text === task.text && t.date === task.date && t.time === task.time));
    localStorage.setItem("tasks", JSON.stringify(tasks));

    if (tasks.length === 0) {
      toggleBtn.style.display = "none";
      taskList.style.display = "none";
    }
  });

  li.appendChild(taskContent);
  li.appendChild(removeBtn);
  taskList.appendChild(li);
}
