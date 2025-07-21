class Task {
    constructor(name, description, due, importance) {
        // voulantarily choose not to be private
        this.id = crypto.randomUUID();
        this.name = name;
        this.description = description;
        this.due = due;
        this.importance = importance;
        this.done = false;
    }

    isOverDue() {

    }

    isToday() {

    }

    isThisWeek() {

    }

    isImportant() {

    }

    isDone() {

    }

}