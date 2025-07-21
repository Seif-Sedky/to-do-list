import "./popup-style.css";
import { Task } from './../models/Task';
import { Project } from './../models/Project';



export function createProjectPopup() {
    const overlay = document.createElement('div');
    overlay.classList.add('donezo-overlay');

    const modal = document.createElement('div');
    modal.classList.add('donezo-modal');

    const title = document.createElement('h2');
    title.textContent = 'Add Project';
    title.classList.add('modal-title');

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Project Name';
    input.classList.add('modal-input');
    input.required = true;

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('modal-buttons');

    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'OK';
    submitBtn.classList.add('modal-ok');
    submitBtn.classList.add('popup-button');


    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.classList.add('modal-cancel');
    cancelBtn.classList.add('popup-button');

    cancelBtn.addEventListener('click', () => overlay.remove());

    buttonContainer.append(submitBtn, cancelBtn);
    modal.append(title, input, buttonContainer);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    return { submitBtn, input, overlay };
}


export function createTaskPopup() {
    const overlay = document.createElement('div');
    overlay.classList.add('donezo-overlay');

    const modal = document.createElement('div');
    modal.classList.add('donezo-modal');

    const title = document.createElement('h2');
    title.textContent = 'Add Task';
    title.classList.add('modal-title');

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Task Name';
    nameInput.classList.add('modal-input');

    const descInput = document.createElement('textarea');
    descInput.placeholder = 'Description';
    descInput.classList.add('modal-textarea');

    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.classList.add('modal-date');

    const checkboxContainer = document.createElement('label');
    checkboxContainer.classList.add('modal-checkbox-label');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('modal-checkbox');

    const checkboxText = document.createElement('span');
    checkboxText.textContent = 'Important';

    checkboxContainer.append(checkbox, checkboxText);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('modal-buttons');

    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'OK';
    submitBtn.classList.add('modal-ok');
    submitBtn.classList.add('popup-button');



    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.classList.add('modal-cancel');
    cancelBtn.classList.add('popup-button');

    cancelBtn.addEventListener('click', () => overlay.remove());

    buttonContainer.append(submitBtn, cancelBtn);

    modal.append(title, nameInput, descInput, dateInput, checkboxContainer, buttonContainer);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    return { submitBtn, nameInput, descInput, dateInput, checkboxContainer, buttonContainer, overlay };
}