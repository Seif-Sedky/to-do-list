import './style.css';
import { createProjectPopup, createTaskPopup } from './view/Popup.js';
import { DoneZoElements } from './utils/DOM.js';
import { Project } from './models/Project.js'
import { sidebarDisplayer } from './view/Sidebar.js';

let projects = [];

function start() {


    const elements = new DoneZoElements();
    elements.addProjectButton.addEventListener('click', () => {

        let objects = createProjectPopup();
        let submitBtn = objects.submitBtn;
        let input = objects.input;
        let overlay=objects.overlay;



        submitBtn.addEventListener('click', () => {
            console.log(input.textContent);
            if (input.value) {

                //create new project
                let project = new Project(input.value);
                projects.push(project);
                console.log(projects);
                //add project to local storage


                //display new project and get delete button
                let deleteBtn = sidebarDisplayer().addProject(project.id, project.name);
                deleteBtn.addEventListener('click', () => {
                    deleteProject(deleteBtn);
                });


                //remove popup
                overlay.remove();
            }

        });

    });
}

function deleteProject(deleteBtn) {

}
start();