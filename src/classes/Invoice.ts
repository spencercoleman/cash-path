import { HasFormatter } from "../interfaces/HasFormatter.js"

export class Invoice implements HasFormatter {
    constructor(
        readonly client: string, 
        private details: string, 
        public amount: number
    ) {}

    format() {
        return `${this.client.slice(0, 1).toUpperCase() + this.client.slice(1)} owes $${this.amount.toLocaleString()} for ${this.details}.`
    }
}