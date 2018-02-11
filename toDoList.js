document.addEventListener('DOMContentLoaded', function() {

    let currentLength = 0;
    let toDoCreator = document.querySelector('.to-do-creator');


    toDoCreator.querySelector('input').addEventListener('keyup', (e) => {
        if (event.keyCode === 13) {
            if (toDoCreator.querySelector('.creator-input').value.length===0) {
                alert('Can\'t add empty element');
                return false;
            }
            addAnother();
        }
    });

    toDoCreator.querySelector('.add-button').addEventListener('click', (e) => {
        if (toDoCreator.querySelector('.creator-input').value.length===0) {
            alert('Can\'t add empty element');
            return false;
        }
        addAnother();
    });

    toDoCreator.addEventListener('drop', (e) => {
        e.preventDefault();
    });

    function addAnother() {
        const divPrototype = document.querySelector("#temp").content.cloneNode(true);
        document.querySelector('#to-do-list').appendChild(divPrototype);
        toDos.push(new placeholderName(document.querySelector('.to-do-creator').querySelector('.creator-input').value));
        console.log(toDos);
        toDos.slice(-1).pop().addNew();
    }

    function swapNodes(node1, node2) {
        node1.parentNode.replaceChild(node1, node2);
        node1.parentNode.insertBefore(node2, node1);
    }


    function fixingIndex() {
        document.querySelectorAll('.to-do-element').forEach((element, ind) => {
            element.querySelector('.index').innerText = ind + 1;
            toDos[ind].index = (ind + 1);
        });

        console.log(toDos);
    }

    let toDos = [];

    function placeholderName(arg) {
        this.content = arg;
        this.index = toDos.length + 1;
        this.element = document.querySelector('.to-do-element:last-of-type');
        this.addNew();
        this.addListeners();
    }

    placeholderName.prototype = {
        addNew() {
                this.element.querySelector('.index').innerText = this.index;
                this.element.querySelector('.to-do-text').innerText = this.content;
                this.element.querySelector('.to-do-input').value = this.content;
                toDoCreator.querySelector('.creator-input').value = '';

        },
        addListeners() {
            console.log(this);
            this.element.querySelector('input').addEventListener('keyup', (e) => {
                if (e.keyCode === 13) {
                    this.save();
                }
            });

            this.element.querySelector('.text-wrapper').addEventListener('dblclick', () => {this.edit()});
            this.element.querySelector('.save-button').addEventListener('click', () => {this.save()});
            this.element.querySelector('.edit-button').addEventListener('click', () => {this.edit()});
            this.element.querySelector('.delete-button').addEventListener('click', () => {this.deleteIt()});
            this.element.querySelector('.cross-out-button').addEventListener('click', () => {this.crossOut()});
            this.element.querySelector('.uncross-out-button').addEventListener('click', () => {this.uncrossOut()});
            this.element.querySelector('.move-up-button').addEventListener('click', () => {this.moveUp()});
            this.element.querySelector('.move-down-button').addEventListener('click', () => {this.moveDown()});

            this.element.addEventListener('dragover', (e) => {
                e.preventDefault();
            });

            this.element.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text', this.index);
                e.dataTransfer.setDragImage(this.element, 0, 0);
            });

            this.element.addEventListener('drop', (e) => {
                console.log(toDos);
                let index1 = e.dataTransfer.getData('text');
                let index2 = this.index;
                console.log('this is index2');
                console.log(index2);
                console.log(index1 + index2);
                if (index1 > index2) {
                    document.querySelector('#to-do-list').insertBefore(document.querySelector('.to-do-element:nth-of-type(' + index1 + ')'), e.currentTarget);
                    toDos.splice(index2 - 1, -1, toDos[index1 - 1]);
                    toDos.splice(index1, 1);
                } else {
                    document.querySelector('#to-do-list').insertBefore(document.querySelector('.to-do-element:nth-of-type(' + index1 + ')'), e.currentTarget.nextSibling);
                    let xd = toDos;
                    console.log(xd);
                    toDos.splice(index2, -1, toDos[index1 - 1]);
                    toDos.splice(index1 - 1 , 1);
                }
                fixingIndex();
            });
        },
        save() {
            if (selectors.call(this).toDoInput.value.length===0) {
                alert('To Do element cannot be empty.');
                return false;
            }
            this.element.classList.remove("editing");
            this.element.classList.add("saved");
            this.content = selectors.call(this).toDoInput.value;
            selectors.call(this).toDoText.innerText = this.content;
        },
        edit() {
            this.element.classList.remove("saved");
            this.element.classList.add("editing");
            selectors.call(this).toDoInput.addEventListener('blur', () => {
                this.save();
            });
        },
        deleteIt() {
            this.element.remove();
            toDos.splice(this.index - 1, 1)
            console.log(toDos);
            fixingIndex();
        },

        crossOut() {
            this.element.classList.add("crossed-out");
        },

        uncrossOut(thisDiv) {
            this.element.classList.remove("crossed-out");
        },

        moveUp() {
            swapNodes(toDos[this.index-2].element, this.element);
            fixingIndex();
        },

        moveDown() {
            swapNodes(this.element, toDos[this.index].element);
            fixingIndex();
            console.log(toDos);
        },
    }

    function selectors() {
        return {
            index: this.element.querySelector('.index').innerText,
            toDoText: this.element.querySelector('.to-do-text'),
            toDoInput: this.element.querySelector('.to-do-input'),
            saveButton: this.element.querySelector('.save-button'),
            editButton: this.element.querySelector('.edit-button'),
            deleteButton: this.element.querySelector('.delete-button'),
            crossoutButton: this.element.querySelector('.cross-out-button'),
            uncrossoutButton: this.element.querySelector('.uncross-out-button'),
            moveUpButton: this.element.querySelector('.move-up-button'),
            moveDownButton: this.element.querySelector('.move-down-button')
        }
    }
});

