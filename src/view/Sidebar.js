import { DoneZoElements } from "../utils/DOM";

export function sidebarDisplayer() {
    let elements = new DoneZoElements();
    let projects = elements.projects;


    //container with the id 
    //put name and delete icon 
    //return the delete icon without adding an event listener to it 

    function addProject(id, name) {
        const projectContainer = document.createElement('div');
        projectContainer.classList.add('project-entry');
        projectContainer.setAttribute('data-id', id);

        const nameElement = document.createElement('p');
        nameElement.classList.add('project-name');
        nameElement.textContent = name;

        const deleteIcon = document.createElement('span');
        deleteIcon.classList.add('project-delete');
        deleteIcon.textContent = '🗑'; // or use an SVG if desired

        projectContainer.append(nameElement, deleteIcon);
        document.querySelector('#projects').appendChild(projectContainer);

        return deleteIcon;
    }




    function removeProject(id) {
        //search in projects for id 
    }
    return {addProject,removeProject};
}