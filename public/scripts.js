import { Invoice } from "./classes/Invoice.js";
import { ListTemplate } from "./classes/ListTemplate.js";
import { Payment } from "./classes/Payment.js";
const form = document.querySelector('.new-item-form');
const type = document.querySelector('#type');
const tofrom = document.querySelector('#tofrom');
const details = document.querySelector('#details');
const amount = document.querySelector('#amount');
const ul = document.querySelector('ul');
const itemList = new ListTemplate(ul);
const LOCAL_STORAGE_KEY = 'cash_path_txs';
const txs = localStorage.getItem(LOCAL_STORAGE_KEY);
const txArr = txs ? JSON.parse(txs) : [];
const createDoc = (docDetails, type) => {
    let doc;
    let values;
    values = [docDetails.tofrom, docDetails.details, docDetails.amount];
    if (type === 'invoice') {
        doc = new Invoice(...values);
    }
    else {
        doc = new Payment(...values);
    }
    return doc;
};
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const docDetails = {
        tofrom: tofrom.value,
        details: details.value,
        amount: amount.valueAsNumber
    };
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
});
