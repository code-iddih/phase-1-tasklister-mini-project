document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-task-form");

  form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Select input fields and retrieve values
    const descriptionInput = document.getElementById("new-task-description");
    const prioritySelect = document.getElementById("priority");
    const userInput = document.getElementById("user");
    const durationInput = document.getElementById("duration");
    const dateDueInput = document.getElementById("date-due");

    const taskDescription = descriptionInput.value;
    const taskPriority = prioritySelect.value;
    const taskUser = userInput.value;
    const taskDuration = durationInput.value;
    const taskDateDue = dateDueInput.value;

    // Clear input fields after retrieving values
    descriptionInput.value = "";
    userInput.value = "";
    durationInput.value = "";
    dateDueInput.value = "";

    // Create new <li> element with the task details
    const taskItem = createTaskElement(taskDescription, taskPriority, taskUser, taskDuration, taskDateDue);

    // Append <li> to <ul> element and sort tasks
    const tasksList = document.getElementById("tasks");
    tasksList.appendChild(taskItem);
    sortTasks();
  });

  function createTaskElement(description, priority, user, duration, dateDue) {
    const taskItem = document.createElement("li");
    updateTaskItem(taskItem, description, priority, user, duration, dateDue);

    // Create edit button for the task
    const editButton = createEditButton(taskItem, description, priority, user, duration, dateDue);

    // Create delete button for the task
    const deleteButton = createDeleteButton(taskItem);

    // Append edit and delete buttons to <li> element
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);

    // Set priority as a data attribute for sorting
    taskItem.setAttribute("data-priority", priority);

    return taskItem;
  }

  function updateTaskItem(taskItem, description, priority, user, duration, dateDue) {
    // Preserve existing buttons
    const existingEditButton = taskItem.querySelector(".edit-button");
    const existingDeleteButton = taskItem.querySelector(".delete-button");

    taskItem.innerHTML = ""; // Clear existing content
    taskItem.innerHTML = `
      <strong>Description:</strong> ${description}<br>
      <strong>Priority:</strong> ${priority}<br>
      <strong>User:</strong> ${user}<br>
      <strong>Duration:</strong> ${duration}<br>
      <strong>Date Due:</strong> ${dateDue}<br>
    `;

    // Re-append existing buttons
    if (existingEditButton) {
      taskItem.appendChild(existingEditButton);
    }
    if (existingDeleteButton) {
      taskItem.appendChild(existingDeleteButton);
    }

    // Set color based on priority
    if (priority === "high") {
      taskItem.style.color = "red";
    } else if (priority === "medium") {
      taskItem.style.color = "blue";
    } else if (priority === "low") {
      taskItem.style.color = "green";
    }
  }

  function createEditButton(taskItem, description, priority, user, duration, dateDue) {
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-button"); // Add a class for identification
    editButton.addEventListener("click", () => {
      const newDescription = prompt("Enter new description:", description);
      if (newDescription !== null) {
        updateTaskItem(taskItem, newDescription, priority, user, duration, dateDue);
        sortTasks();
      }
    });
    return editButton;
  }

  function createDeleteButton(taskItem) {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button"); // Add a class for identification
    deleteButton.addEventListener("click", () => {
      taskItem.remove();
    });
    return deleteButton;
  }

  function sortTasks() {
    const tasksList = document.getElementById("tasks");
    const items = Array.from(tasksList.getElementsByTagName("li"));

    // Sort items based on priority: high > medium > low
    items.sort((a, b) => {
      const priorityA = a.getAttribute("data-priority");
      const priorityB = b.getAttribute("data-priority");

      if (priorityA === "high" && priorityB !== "high") {
        return -1;
      } else if (priorityA === "medium" && (priorityB === "low" || priorityB === "medium")) {
        return -1;
      } else if (priorityA === "low" && priorityB !== "low") {
        return 1;
      } else {
        return 0;
      }
    });

    // Re-append sorted items to tasksList
    tasksList.innerHTML = "";
    items.forEach(item => tasksList.appendChild(item));
  }
});
