export class Task {
    constructor(name, description, due, importance) {
        // voulantarily choose not to be private
        this.id = crypto.randomUUID();
        this.name = name;
        this.description = description;
        this.due = due;
        this.importance = importance;
        this.done = false;
        const msPerDay = 1000 * 60 * 60 * 24;
    }

    //setHours:I'm setting the time to exactly midnight (00:00:00.000), which gives me the very start of the day


    isOverDue() {
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        let dueDate = new Date(this.due);
        return dueDate < today;
    }

    isToday() {
        let today = new Date();
        let dueDate = new Date(this.due);
        return dueDate.toDateString() === today.toDateString();
    }

    isThisWeek() {
        let today = new Date();
        let dueDate = new Date(this.due);

        let startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        let endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        return dueDate >= startOfWeek && dueDate <= endOfWeek;
    }

    isImportant() {
        return this.importance;
    }

    isDone() {
        return this.done;
    }
}