document.addEventListener('DOMContentLoaded', function() {

    let allToDoElements = [];

    function retrievingList() {
        if (localStorage.length !== 0) {
            if (confirm('Do you want to retrieve previous To Do List?')) {
                localStorage.previousList.split(',').forEach((element) => {
                    addAnother(element);
                });
            } else {
                localStorage.removeItem('previousList');
            }
        }
    }

    function addCreatorListeners() {
        let toDoCreator = document.querySelector('.to-do-creator');

        toDoCreator.querySelector('input').addEventListener('keyup', (e) => {
            if (e.keyCode === 13) {
                if (toDoCreator.querySelector('.creator-input').value.length === 0) {
                    alert('Can\'t add empty element');
                    return false;
                }
                addAnother(toDoCreator.querySelector('.creator-input').value);
                toDoCreator.querySelector('.creator-input').value = '';
            }
        });

        toDoCreator.querySelector('.add-button').addEventListener('click', (e) => {
            if (toDoCreator.querySelector('.creator-input').value.length === 0) {
                alert('Can\'t add empty element');
                return false;
            }
            addAnother(toDoCreator.querySelector('.creator-input').value);
            toDoCreator.querySelector('.creator-input').value = '';
        });

        toDoCreator.addEventListener('drop', (e) => {
            e.preventDefault();
        });
    }

    function saveList() {
        let arrayOfContents = [];
        allToDoElements.forEach((element) => {
           arrayOfContents.push(element.content);
        });
        localStorage.setItem('previousList', arrayOfContents);
    }

    function addAnother(arg) {
        const divPrototype = document.querySelector("#temp").content.cloneNode(true);
        document.querySelector('#to-do-list').appendChild(divPrototype);
        allToDoElements.push(new toDoElement(arg));
        allToDoElements.slice(-1).pop().addNew();
        saveList();
    }

    function swapNodes(node1, node2) {
        node1.parentNode.replaceChild(node1, node2);
        node1.parentNode.insertBefore(node2, node1);
    }

    function fixingIndex() {
        document.querySelectorAll('.to-do-element').forEach((element, ind) => {
            element.querySelector('.index').innerText = ind + 1;
            allToDoElements[ind].index = (ind + 1);
        });
    }

    class toDoElement {
        constructor(arg) {
            this.content = arg;
            this.index = allToDoElements.length + 1;
            this.element = document.querySelector('.to-do-element:last-of-type');
            this.addNew();
            this.addListeners();
        }

        addNew() {
                this.element.querySelector('.index').innerText = this.index;
                this.element.querySelector('.to-do-text').innerText = this.content;
                this.element.querySelector('.to-do-input').value = this.content;
        }

        addListeners() {
            this.addClickListeners();
            this.addDragListeners();
        }

        addClickListeners() {
            this.element.querySelector('input').addEventListener('keyup', (e) => {
                if (e.keyCode === 13) {
                    this.save();
                }
            });

            this.element.querySelector('.text-wrapper').addEventListener('dblclick', () => {
                this.edit();
            });
            this.element.querySelector('.save-button').addEventListener('click', () => {
                this.save();
            });
            this.element.querySelector('.edit-button').addEventListener('click', () => {
                this.edit();
            });
            this.element.querySelector('.delete-button').addEventListener('click', () => {
                this.delete();
            });
            this.element.querySelector('.cross-out-button').addEventListener('click', () => {
                this.crossOut();
            });
            this.element.querySelector('.uncross-out-button').addEventListener('click', () => {
                this.uncrossOut();
            });
            this.element.querySelector('.move-up-button').addEventListener('click', () => {
                this.moveUp();
            });
            this.element.querySelector('.move-down-button').addEventListener('click', () => {
                this.moveDown();
            });
        }

        addDragListeners() {
            this.element.addEventListener('dragover', (e) => {
                e.preventDefault();
            });

            this.element.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text', this.index);
                e.dataTransfer.setDragImage(this.element, 0, 0);
            });

            this.element.addEventListener('drop', (e) => {
                let index1 = e.dataTransfer.getData('text');
                let index2 = this.index;
                if (index1 > index2) {
                    document.querySelector('#to-do-list').insertBefore(allToDoElements[index1 - 1].element, this.element);
                    allToDoElements.splice(index2 - 1, -1, allToDoElements[index1 - 1]);
                    allToDoElements.splice(index1, 1);
                } else {
                    document.querySelector('#to-do-list').insertBefore(allToDoElements[index1 - 1].element, this.element.nextSibling);
                    allToDoElements.splice(index2, -1, allToDoElements[index1 - 1]);
                    allToDoElements.splice(index1 - 1 , 1);
                }
                fixingIndex();
                saveList();
            });
        }

        save() {
            if (this.selectors().toDoInput.value.length===0) {
                alert('To Do element cannot be empty.');
                return false;
            }
            this.element.classList.remove("editing");
            this.element.classList.add("saved");
            this.content = this.selectors().toDoInput.value;
            this.selectors().toDoText.innerText = this.content;
            saveList();
        }

        edit() {
            this.element.classList.remove("saved");
            this.element.classList.add("editing");
            this.selectors().toDoInput.addEventListener('blur', () => {
                this.save();
            });
        }

        delete() {
            this.element.remove();
            allToDoElements.splice(this.index - 1, 1);
            fixingIndex();
            saveList();
        }

        crossOut() {
            this.element.classList.add("crossed-out");
        }

        uncrossOut() {
            this.element.classList.remove("crossed-out");
        }

        moveUp() {
            swapNodes(allToDoElements[this.index-2].element, this.element);
            allToDoElements.splice(this.index-2, 0, this);
            allToDoElements.splice(this.index, 1);
            fixingIndex();
            saveList();
        }

        moveDown() {
            swapNodes(this.element, allToDoElements[this.index].element);
            allToDoElements.splice(this.index-1, 0, allToDoElements[this.index]);
            allToDoElements.splice(this.index+1, 1);
            fixingIndex();
            saveList();
        }

        selectors() {
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
    }

    addCreatorListeners();
    retrievingList();
});

