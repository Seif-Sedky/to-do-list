import './style.css';
import { contentDisplayer } from './view/Content';
import './view/sidebar.css';
import './view/content.css';
import cozyImg from './imgs/cozy-anime.png';

import { createProjectPopup, createTaskPopup } from './view/Popup.js';
import { DoneZoElements } from './utils/DOM.js';
import { Project } from './models/Project.js'
import { Task } from './models/Task.js'

import { sidebarDisplayer } from './view/Sidebar.js';

let projects = [];
const sidebarDispl = sidebarDisplayer();
const elements = new DoneZoElements();
let contentDispl = contentDisplayer();

function start() {

    elements.addProjectButton.addEventListener('click', () => {

        let objects = createProjectPopup();
        let submitBtn = objects.submitBtn;
        let input = objects.input;
        let overlay = objects.overlay;
        addSubmitEvent(objects, submitBtn, input, overlay);
        addFilterEvent();
    });

    function addFilterEvent() {
        elements.tasksFilters.addEventListener('click', (e) => {
            if (!e.target.closest('.tasks-filter'))//not a child
                return;

            let projectContainer = document.querySelector('.selected');
            if (!projectContainer) {
                return;
            }
            let taskId = e.target.closest('.tasks-filter').id;
            let project = getProj(projectContainer.dataset.id);
            let taskList = filterTaskList(taskId, project.tasks);
            contentDispl.displayTasks(taskList, project, true);
        });
    }

    function filterTaskList(taskId, tasks) {
        switch (taskId) {
            case 'all-tasks':
                return tasks;
            case 'today-tasks':
                return tasks.filter((task) => task.isToday());
            case 'week-tasks':
                return tasks.filter((task) => task.isThisWeek());
            case 'important-tasks':
                return tasks.filter((task) => task.isImportant());
            case 'done-tasks':
                return tasks.filter((task) => task.isDone());
            case 'overdue-tasks':
                return tasks.filter((task) => task.isOverDue());

            default:
                return tasks;
        }
    }

    function addSubmitEvent(objects, submitBtn, input, overlay) {


        submitBtn.addEventListener('click', () => {

            if (input.value) {

                //create new project
                let project = new Project(input.value);
                projects.push(project);
                console.log(projects);

                //add project to local storage TO-DO


                //display new project and get delete button
                let projectContainer = sidebarDispl.addProject(project.id, project.name);
                projectContainer.addEventListener('click', (e) => {
                    if (e.target.classList.contains('project-delete'))
                        deleteProject(e.target);
                    else {
                        //remove all selections from all projects
                        let projects = elements.projects;
                        const projectElements = projects.children;
                        for (let i = 1; i < projectElements.length; i++) {
                            const project = projectElements[i];
                            if (project.classList.contains('selected')) {
                                project.classList.remove('selected')
                            }
                        }
                        // add selected class
                        projectContainer.classList.add('selected');

                        //show content associated with project
                        displayContent(projectContainer.dataset.id);
                    }
                });

                //remove popup
                overlay.remove();
            }

        });

    }

    function getProj(id) {
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].id === id) {
                return projects[i];
            }
        }
    }

    function displayContent(id) {
        //get project from backend
        let project = getProj(id);


        // Clear existing content
        while (content.firstChild) {
            content.removeChild(content.firstChild);
        }

        // Add the + button at the top
        const addButton = document.createElement('button');
        addButton.className = 'add-task-btn';
        addButton.textContent = '+';
        addButton.addEventListener('click', () => {
            addTaskEvent(createTaskPopup('Add'), project);//create task popup will return the objects of the popup
        });
        content.appendChild(addButton);



        // Display all tasks in the project
        if (project && project.tasks && project.tasks.length > 0) {
            project.tasks.forEach(task => {
                contentDispl.addTask(task, project);
            });
        }

    }

    function addTaskEvent(objects, project) {
        objects.submitBtn.addEventListener('click', () => {
            // Get values from the input fields
            const taskName = objects.nameInput.value.trim();
            const taskDescription = objects.descInput.value.trim();
            const taskDueDate = objects.dateInput.value;
            const isImportant = objects.checkboxContainer.querySelector('.modal-checkbox').checked;

            // Validate required fields
            if (taskName && taskDueDate) {
                // Determine importance level
                const important = isImportant ? true : false;

                // Create new Task object using the constructor
                const newTask = new Task(taskName, taskDescription, taskDueDate, important);

                // Add the task to the project's tasks array
                project.tasks.push(newTask);

                // Display all tasks again to adjust for adding while applying a filter 
                contentDispl.displayTasks(project.tasks, project, true);

                // Close the modal by removing the overlay
                objects.overlay.remove();
            }
        });
    }

    function deleteProject(deleteBtn) {


        //delete from array
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].id === deleteBtn.parentElement.dataset.id) {
                //delete tasks of project
                if (deleteBtn.parentElement.classList.contains('selected')) {
                    contentDispl.deleteTasks(projects[i]);
                }
                else {
                    projects[i].tasks = [];
                }
                projects.splice(i, 1);
                console.log("Deleted from array");
            }
        }

        //delete from localStorage TO-DO

        //delete from front end
        sidebarDispl.removeProject(deleteBtn.parentElement.dataset.id);

        if (!document.querySelector('selected')) {
            //no project is selected so return image 
            //nothing is selected so return image
            let img = document.createElement("img");
            img.setAttribute('src', cozyImg);
            img.classList.add('cozy-img');
            elements.content.appendChild(img);
        }
    }
}



start();
