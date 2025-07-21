import './style.css';
import { contentDisplayer } from './view/Content';
import './view/sidebar.css';
import './view/content.css';

import { createProjectPopup, createTaskPopup } from './view/Popup.js';
import { DoneZoElements } from './utils/DOM.js';
import { Project } from './models/Project.js'
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
    });

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

    function displayContent(id) {


        // Clear existing content
        while (content.firstChild) {
            content.removeChild(content.firstChild);
        }

        // Add the + button at the top
        const addButton = document.createElement('button');
        addButton.className = 'add-task-btn';
        addButton.textContent = '+';
        addButton.addEventListener('click', createTaskPopup);
        content.appendChild(addButton);

        //get project from backend
        let project;
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].id === id) {
                project = projects[i];
                break;
            }
        }

        // Display all tasks in the project
        if (project && project.tasks && project.tasks.length > 0) {
            project.tasks.forEach(task => {
                contentDispl.addTask(task);
            });
        }

    }

    function deleteProject(deleteBtn) {
        //delete from array
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].id === deleteBtn.parentElement.dataset.id) {
                projects.splice(i, 1);
                console.log("Deleted from array");
            }
        }

        //delete from localStorage TO-DO

        //delete from front end
        sidebarDispl.removeProject(deleteBtn.parentElement.dataset.id);
    }
}



start();