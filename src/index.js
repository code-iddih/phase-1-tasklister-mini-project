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
    const taskItem = document.createElement("li");
    updateTaskItem(taskItem, taskDescription, taskPriority, taskUser, taskDuration, taskDateDue);

    // Create edit button for the task
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      // Implement edit functionality as per your requirement
      // For simplicity, let's assume editing the description here
      const newDescription = prompt("Enter new description:", taskDescription);
      if (newDescription) {
        // Update the task description within the <li> element
        updateTaskItem(taskItem, newDescription, taskPriority, taskUser, taskDuration, taskDateDue);
      }
    });

    // Create delete button for the task
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      taskItem.remove(); // Remove task item when delete button is clicked
    });

    // Append edit and delete buttons to <li> element
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);

    // Append <li> to <ul> element
    const tasksList = document.getElementById("tasks");
    tasksList.appendChild(taskItem);
  });

  function updateTaskItem(taskItem, description, priority, user, duration, dateDue) {
    taskItem.textContent = ""; // Clear existing content
    taskItem.innerHTML = `
      <strong>Description:</strong> ${description}<br>
      <strong>Priority:</strong> ${priority}<br>
      <strong>User:</strong> ${user}<br>
      <strong>Duration:</strong> ${duration}<br>
      <strong>Date Due:</strong> ${dateDue}<br>
    `;

    // Set color based on priority
    if (priority === "high") {
      taskItem.style.color = "red";
    } else if (priority === "medium") {
      taskItem.style.color = "yellow";
    } else if (priority === "low") {
      taskItem.style.color = "green";
    }
  }
});

