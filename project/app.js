let tasks = [];

// Lưu task
saveTask = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Lấy task
getTask = () => {
  return JSON.parse(localStorage.getItem("tasks"));
};

// add task
addTask = () => {
  const btnAddTask = document.querySelector(".add-task");
  const inputTask = document.querySelector(".input-task");
  const alertBox = document.querySelector(".alert-box");
  btnAddTask.addEventListener("click", function () {
    let tasks = getTask() || [];

    if (this.getAttribute("data-index") === "") {
      if (inputTask.value.trim() === "") {
        alertBox.innerHTML = "Không để trống Task";
        setTimeout(() => {
          alertBox.innerHTML = "";
        }, 3000);
        return;
      }

      // Add task
      let newTask = {
        name: inputTask.value.trim(),
        status: false,
      };

      tasks.unshift(newTask);
      saveTask(tasks);
      inputTask.value = "";
      alertBox.innerHTML = `<div class="text-green-700"> Thêm Task thành công ^^</div>`;
      setTimeout(() => {
        alertBox.innerHTML = "";
      }, 3000);
      renderTask();
    }else{

      // edit Task
      tasks[this.getAttribute('data-index')].name = inputTask.value;
      btnAddTask.innerHTML = 'Add Task'
      this.setAttribute('data-index','');
      inputTask.value = '';
      saveTask(tasks);
      renderTask();
      alertBox.innerHTML = `<div class="text-green-700"> Cập nhật thành công ^^</div>`;
      setTimeout(() => {
        alertBox.innerHTML = "";
      }, 3000);
    }
  });
};

// destroy task
destroyTask = () => {
  const destroyBtn = document.querySelectorAll(".destroy-task");
  const alertBox = document.querySelector(".alert-box");
  let tasks = getTask() || [];

  for (let item of destroyBtn) {
    item.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      tasks.splice(index, 1);
      saveTask(tasks);
      countTask();
      renderTask();
      alertBox.innerHTML = `<div class="text-blue-600"> Xóa task thành công !</div>`;
      setTimeout(() => {
        alertBox.innerHTML = "";
      }, 5000);
    });
  }
};

// Task complete
taskComplete = () => {
  const taskName = document.querySelectorAll(".name-task");
  const taskCount = document.querySelector(".count-task-complete");
  let tasks = getTask() || [];
  for (let element of taskName) {
    element.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      if (tasks[index].status === true) {
        tasks[index].status = false;
        this.classList.remove("line-through");
      } else {
        tasks[index].status = true;
        this.classList.add("line-through");
      }

      let count = countTask();
      renderTask();
      saveTask(tasks);
      
    });
  }
};

// editTask
editTask = () => {
  const editTask = document.querySelectorAll(".edit-task");
  const btnAddTask = document.querySelector(".add-task");
  const inputTask = document.querySelector(".input-task");
  let tasks = getTask() || [];
  for (let element of editTask) {
    element.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      console.log(index);
      inputTask.value = tasks[index].name;
      btnAddTask.innerHTML = "Edit Task";
      btnAddTask.setAttribute("data-index", index);
    });
  }
};

// countTask
countTask = () =>{
  const countTask = document.querySelector('.count-task-complete');
  const tasks = getTask() || [];
  let count = 0;
  for(let element of tasks){
    if(element.status == true) count++;
  }
  countTask.innerHTML = `<span class="text-xs text-gray-500 font-semibold"> Đã hoàn thành ( ${count} ) </span>`
  return count;
}

// Render task
renderTask = () => {
  const taskList = document.querySelector(".task-list");
  let tasks = getTask() || [];
  let taskRender = tasks.map((element, index) => {
    return `
        <div class="py-2 flex justify-between items-center">
            <div class="hover:text-green-700 cursor-pointer name-task ${element.status == true ? "line-through" : ""}" data-index="${index}">${element.name}</div>
                <div class="flex gap-4">
                    <i class="fa-solid fa-eraser edit-task hover:text-green-700 cursor-pointer" data-index="${index}"></i>
                    <i class="fa-solid fa-xmark destroy-task hover:text-green-700 cursor-pointer" data-index="${index}"></i>
                </div>
            </div>
        </div>
        `;
  });
  taskList.innerHTML = taskRender.join("");

  destroyTask();
  taskComplete();
  editTask();
  taskComplete();
};

addTask();
renderTask();
countTask();
