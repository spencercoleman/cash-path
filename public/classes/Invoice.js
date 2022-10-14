export class Invoice {
    constructor(client, details, amount) {
        this.client = client;
        this.details = details;
        this.amount = amount;
    }
    format() {
        return `${this.client.slice(0, 1).toUpperCase() + this.client.slice(1)} owes $${this.amount.toLocaleString()} for ${this.details}.`;
    }
}
