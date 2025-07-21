import './style.css';
import { createProjectPopup, createTaskPopup } from './view/Popup.js';
import { DoneZoElements } from './utils/DOM.js';


function start() {
    const elements = new DoneZoElements();
    elements.addProjectButton.addEventListener('click',()=> createProjectPopup());
}

start();