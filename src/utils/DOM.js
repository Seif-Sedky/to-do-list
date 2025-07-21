class DoneZoElements {
    constructor() {
        // Header Elements
        this.header = document.querySelector('#header');
        this.headerContent = document.querySelector('.header-content');
        this.websiteLogo = document.querySelector('#website-logo');
        this.websiteName = document.querySelector('#website-name');

        // Sidebar Elements
        this.sidebar = document.querySelector('#sidebar');
        this.tasksFilters = document.querySelector('#tasks-filters');

        // Individual Task Filters (by ID)
        this.allTasksFilter = document.querySelector('#all-tasks');
        this.todayTasksFilter = document.querySelector('#today-tasks');
        this.weekTasksFilter = document.querySelector('#week-tasks');
        this.importantTasksFilter = document.querySelector('#important-tasks');
        this.doneTasksFilter = document.querySelector('#done-tasks');
        this.overdueTasksFilter = document.querySelector('#overdue-tasks');

        // All Task Filter elements (by class)
        this.allTasksFilterLogos = document.querySelectorAll('.tasks-filter-logo');
        this.allTasksFilterNames = document.querySelectorAll('.tasks-filter-name');
        this.allTasksFilters = document.querySelectorAll('.tasks-filter'); // Collection of all filter divs

        // Projects Elements
        this.projects = document.querySelector('#projects');
        this.projectsHeader = document.querySelector('#projects-header');
        this.projectsTitle = document.querySelector('#projects-title');
        this.addProjectButton = document.querySelector('#add-project-button');

        // Main Content Area
        this.content = document.querySelector('#content');

  
    }
}