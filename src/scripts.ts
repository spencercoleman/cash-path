import { Invoice } from "./classes/Invoice.js";
import { ListTemplate } from "./classes/ListTemplate.js";
import { Payment } from "./classes/Payment.js";
import { HasFormatter } from './interfaces/HasFormatter.js';

const form = document.querySelector('.new-item-form') as HTMLFormElement;
const type = document.querySelector('#type') as HTMLSelectElement;
const tofrom = document.querySelector('#tofrom') as HTMLInputElement;
const details = document.querySelector('#details') as HTMLInputElement;
const amount = document.querySelector('#amount') as HTMLInputElement;

const ul = document.querySelector('ul')!;
const itemList = new ListTemplate(ul);

type docDetails = {tofrom: string, details: string, amount: number};

const LOCAL_STORAGE_KEY: string = 'cash_path_txs';

const txs: string | null = localStorage.getItem(LOCAL_STORAGE_KEY);
const txArr: {
    details: docDetails,
    type: string
}[] = txs ? JSON.parse(txs) : [];

const createDoc = (docDetails: docDetails, type: string) => {
    let doc: HasFormatter;
    
    let values: [string, string, number];
    values = [docDetails.tofrom, docDetails.details, docDetails.amount];

    if (type === 'invoice') {
        doc = new Invoice(...values);
    } else {
        doc = new Payment(...values);
    }

    return doc;
}

form.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    
    const docDetails = {
        tofrom: tofrom.value,
        details: details.value,
        amount: amount.valueAsNumber
    }

    const doc = createDoc(docDetails, type.value);

    itemList.render(doc, type.value, 'end');

    txArr.push({
        details: docDetails,
        type: type.value
    });

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(txArr));

    tofrom.value = '';
    details.value = '';
    amount.value = '';
});

txArr.forEach(tx => {
    const doc = createDoc(tx.details, tx.type);
    itemList.render(doc, tx.type, 'end');
})