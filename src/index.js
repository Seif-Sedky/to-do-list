import './style.css';
import { createProjectPopup, createTaskPopup } from './view/Popup.js';
import { DoneZoElements } from './utils/DOM.js';
import { Project } from './models/Project.js'
import { sidebarDisplayer } from './view/Sidebar.js';

let projects = [];
const sidebarDispl = sidebarDisplayer();
const elements = new DoneZoElements();


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
                let deleteBtn = sidebarDispl.addProject(project.id, project.name);
                deleteBtn.addEventListener('click', () => {
                    deleteProject(deleteBtn);
                });

                //remove popup
                overlay.remove();
            }

        });

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