export class ListTemplate {
    constructor(container) {
        this.container = container;
    }
    render(item, heading, pos) {
        const li = document.createElement('li');
        const strong = document.createElement('strong');
        strong.innerText = heading.slice(0, 1).toUpperCase() + heading.slice(1);
        li.append(strong);
        const p = document.createElement('p');
        p.innerText = item.format();
        li.append(p);
        if (pos === 'start') {
            this.container.prepend(li);
        }
        else {
            this.container.append(li);
        }
    }
}
