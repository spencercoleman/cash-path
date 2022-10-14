import { HasFormatter } from "../interfaces/HasFormatter.js"

export class Payment implements HasFormatter {
    constructor(
        readonly recipient: string, 
        private details: string, 
        public amount: number
    ) {}

    format() {
        return `${this.recipient.slice(0,1).toUpperCase() + this.recipient.slice(1)} is owed $${this.amount.toLocaleString()} for ${this.details}.`
    }
}