import { DoneZoElements } from "../utils/DOM";
import { contentDisplayer } from './Content';
import './sidebar.css';
export function sidebarDisplayer() {
    let elements = new DoneZoElements();
    let projects = elements.projects;
    let contentDispl = contentDisplayer();

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

        projectContainer.addEventListener('click', (e) => {
            if (!e.target.classList.contains('project-delete')) {

                //remove all selections from all projects
                let projects = elements.projects;
                const projectElements = projects.children;
                for (let i = 1; i < projectElements.length; i++) {
                    const project = projectElements[i];
                    if (project.classList.contains('selected')) {
                        project.classList.remove('selected')
                    }
                }

                //select class
                projectContainer.classList.add('selected');

                //show content associated with project
                contentDispl.displayContent(projectContainer);
            }
        });


        document.querySelector('#projects').appendChild(projectContainer);


        return deleteIcon;
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