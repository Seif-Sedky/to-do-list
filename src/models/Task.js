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


    isOverDue(date) {
        let today = new Date();
        return date < today;
    }

    isToday(date) {
        let today = new Date();
        return today === date;

    }

    isThisWeek(date) {
        let today = new Date();

        return (date - today) <= (msPerDay * 7);
    }

    isImportant(date) {
        return this.importance;
    }

    isDone(date) {
        return this.done;
    }

}