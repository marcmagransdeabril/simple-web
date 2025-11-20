export class Counter {
    constructor(initialValue = 0) {
        this.value = initialValue;
    }

    increment() {
        this.value++;
        return this.value;
    }

    getValue() {
        return this.value;
    }
}