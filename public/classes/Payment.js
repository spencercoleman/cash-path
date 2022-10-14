export class Payment {
    constructor(recipient, details, amount) {
        this.recipient = recipient;
        this.details = details;
        this.amount = amount;
    }
    format() {
        return `${this.recipient.slice(0, 1).toUpperCase() + this.recipient.slice(1)} is owed $${this.amount.toLocaleString()} for ${this.details}.`;
    }
}
