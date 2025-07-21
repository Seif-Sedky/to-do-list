import { DoneZoElements } from "../utils/DOM";


export function contentDisplayer() {
    let elements = new DoneZoElements();

    function addTask() {

    }

    function removeTask() {

    }

    function editTask() {

    }

    function displayContent(projectContainer){
        elements.content.innerHTML='';
    }

    return {addTask,removeTask,editTask,displayContent};
}