{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            {
                content: newTaskContent,
            }];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], 
            done: !tasks[taskIndex].done, },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const allTasksDone = () => {
        tasks = tasks.map(task => ({
            ...task,
            done: true,
        }));
        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };

    const focusNewTaskInput = () => {
        const newTaskContent = document.querySelector(".js-newTask");
        newTaskContent.focus();
        newTaskContent.value = "";
    };

    const renderTasks = () => {
        const TaskToHtml = tasks.map(task => `

        <li class="list__item${task.done && hideDoneTasks ? " list__item--hidden" : ""} js-task">
            <button class="list__button list__button--done js-done">
                ${task.done ? "✔" : ""}
            </button>
                <span class="${task.done ? "list__item--done" : ""}">
                ${task.content}
                </span>
            <button class="list__button list__button--remove js-remove">
            🗑
            </button>
        </li>`);
        
        document.querySelector(".js-tasks").innerHTML = TaskToHtml.join("");
    };

    const renderButtons = () => {
        const containerTitleButtons = document.querySelector(".js-titleButtons");

        if (tasks.length === 0) {
            containerTitleButtons.innerHTML = "";
            return;
        }

        containerTitleButtons.innerHTML = `
        <button class="container__titleButtons js-hideDoneTasks">
        ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        
        </button>
        <button class="container__titleButtons js-allDone"
        ${tasks.every(({ done }) => done) ? "disabled" : ""}>
        Ukończ wszystkie
        </button>`
    };

    const bindButtonsEvents = () => {
        const allTasksDoneButton = document.querySelector(".js-allDone");
        const hideDoneTasksButton = document.querySelector(".js-hideDoneTasks");

        if (allTasksDoneButton) {
            allTasksDoneButton.addEventListener("click", allTasksDone);
        };

        if (hideDoneTasksButton) {
            hideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
        };
    };

    const clearInput = () => {
        const formInput = document.querySelector(".js-newTask");
    
        formInput.value = "";
        formInput.focus();
    };
    
    const render = () => {

        renderTasks();
        renderButtons();
        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();    
    };
    
    const onFormSubmit = (event) => {
        event.preventDefault();
    
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
    
        if (newTaskContent === "") {
            return;
        }
    
        addNewTask(newTaskContent);
        clearInput();
        focusNewTaskInput();
    };

    const init = () => {
        render();
    
        const form = document.querySelector(".js-form");
    
        form.addEventListener("submit", onFormSubmit);
    };
    
    init();
}