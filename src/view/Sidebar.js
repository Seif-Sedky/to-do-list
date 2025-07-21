import { DoneZoElements } from "../utils/DOM";

export function sidebarDisplayer() {
    let elements = new DoneZoElements();
    let projects = elements.projects;

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


        return projectContainer;
    }




    function removeProject(id) {
        let projects = elements.projects;
        const projectElements = projects.children;
        for (let i = 1; i < projectElements.length; i++) {
            const project = projectElements[i];
            if (project.dataset.id === id) {
                project.remove();
                break; // Stop once it's found and removed
            }
        }
    }
    return { addProject, removeProject };
}