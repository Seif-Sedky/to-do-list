import { Task } from "../models/Task";
import { DoneZoElements } from "../utils/DOM";


export function contentDisplayer() {
    let elements = new DoneZoElements();


    function displayTasks(tasks, project, clear = false) {
        if (clear) {
            let content = elements.content;
            const contentElements = Array.from(content.children); // Convert to static array

            // Remove all except first element (add button) from end
            for (let i = 1; i < contentElements.length; i++) {
                contentElements[i].remove();
            }
        }

        tasks.forEach(task => addTask(task, project));
    }
    function addTask(task, project) {
        let content = elements.content;

        // Create main task container
        const taskElement = document.createElement('div');
        taskElement.className = `task-container ${task.done ? 'done' : ''}`;
        taskElement.setAttribute('data-task-id', task.id);

        // Create task header
        const taskHeader = document.createElement('div');
        taskHeader.className = 'task-header';

        // Create checkbox
        const taskCheckbox = document.createElement('div');
        taskCheckbox.className = `task-checkbox ${task.done ? 'checked' : ''}`;
        taskCheckbox.addEventListener('click', () => toggleTaskDone(task.id, project));

        // Create task name
        const taskName = document.createElement('h3');
        taskName.className = 'task-name';
        taskName.textContent = task.name;

        // Assemble header
        taskHeader.appendChild(taskCheckbox);
        taskHeader.appendChild(taskName);

        // Create task description
        const taskDescription = document.createElement('div');
        taskDescription.className = 'task-description';
        taskDescription.textContent = task.description;

        // Create task footer
        const taskFooter = document.createElement('div');
        taskFooter.className = 'task-footer';

        // Create task info section
        const taskInfo = document.createElement('div');
        taskInfo.className = 'task-info';

        const taskDueDate = document.createElement('span');
        taskDueDate.className = 'task-due-date';
        taskDueDate.textContent = `📅 Due: ${new Date(task.due).toLocaleDateString()}`;

        taskInfo.appendChild(taskDueDate);

        // Create task actions section
        const taskActions = document.createElement('div');
        taskActions.className = 'task-actions';

        const taskImportance = document.createElement('span');
        let importance = task.isImportant() ? 'high' : 'low';
        taskImportance.className = `task-importance importance-${importance}`;
        taskImportance.textContent = importance.charAt(0).toUpperCase() + importance.substring(1);;

        const taskEditBtn = document.createElement('button');
        taskEditBtn.className = 'task-edit-btn';
        taskEditBtn.textContent = 'Edit';
        taskEditBtn.addEventListener('click', () => editTask(task.id));

        const taskDelBtn = document.createElement('button');
        taskDelBtn.className = 'task-delete-btn';
        taskDelBtn.textContent = 'Delete';
        taskDelBtn.addEventListener('click', () => deleteTask(task.id));

        taskActions.appendChild(taskImportance);
        taskActions.appendChild(taskEditBtn);
        taskActions.appendChild(taskDelBtn);

        // Assemble footer
        taskFooter.appendChild(taskInfo);
        taskFooter.appendChild(taskActions);

        // Assemble complete task element
        taskElement.appendChild(taskHeader);
        taskElement.appendChild(taskDescription);
        taskElement.appendChild(taskFooter);

        content.appendChild(taskElement);

    }

    function deleteTask(project, id) {
        const taskElement = document.querySelector(`[data-task-id="${id}"]`);
        taskElement.remove();
        for (let i = 0; i < project.tasks.length; i++) {
            if (project.tasks[i].id === id) {
                project.tasks.splice(i, 1);
            }
        }
    }

    function editTask(id) {

    }

    function toggleTaskDone(taskId, project) {
        const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
        const checkbox = taskElement.querySelector('.task-checkbox');

        // Toggle the done state visually
        const isDone = taskElement.classList.contains('done');

        if (isDone) {
            taskElement.classList.remove('done');
            checkbox.classList.remove('checked');
        } else {
            taskElement.classList.add('done');
            checkbox.classList.add('checked');
        }

        // update the task object's done property
        project.tasks.find(task => task.id === taskId).done = !isDone;
    }


    function deleteTasks(project) {
        let content = document.querySelector('#content');
        content.innerHTML = '';
        project.tasks = [];
    }


    return { addTask, displayTasks, deleteTask, deleteTasks, editTask, toggleTaskDone };
}