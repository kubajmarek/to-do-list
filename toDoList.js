document.addEventListener('DOMContentLoaded', function() {

    let currentLength = 0;

    function addAnother() {
        const divPrototype = document.querySelector("#temp").content.cloneNode(true);
        currentLength += 1;
        divPrototype.querySelector('.index').innerText = currentLength ;
        document.querySelector('#to-do-list').appendChild(divPrototype);
        addListeners(document.querySelector('.to-do-element:nth-of-type(' + currentLength + ')'));
    }

    function addListeners(thisDiv) {
        console.log(thisDiv);
        thisDiv.querySelector('input').addEventListener('keyup', (e) => {
            if (event.keyCode === 13) {
                save(thisDiv);
            }
        });

        thisDiv.querySelector('.text-wrapper').addEventListener('dblclick', (e) => {
            edit(thisDiv);
        });

        thisDiv.querySelector('.save-button').addEventListener('click', save.bind(thisDiv));
        thisDiv.querySelector('.edit-button').addEventListener('click', edit.bind(thisDiv));
        thisDiv.querySelector('.delete-button').addEventListener('click', deleteIt.bind(thisDiv));
        thisDiv.querySelector('.cross-out-button').addEventListener('click', crossOut.bind(thisDiv));
        thisDiv.querySelector('.uncross-out-button').addEventListener('click', uncrossOut.bind(thisDiv));
        thisDiv.querySelector('.move-up-button').addEventListener('click', moveUp.bind(thisDiv));
        thisDiv.querySelector('.move-down-button').addEventListener('click', moveDown.bind(thisDiv));


        thisDiv.addEventListener('dragover', (e) => {
           e.preventDefault();
        });

        thisDiv.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', e.target.innerText);
            console.log('how query selector looks:');
            e.dataTransfer.setDragImage(document.querySelector('.to-do-element:nth-of-type(' + e.target.innerText + ')'), 0, 0);
        });

        thisDiv.addEventListener('drop', (e) => {
            console.log('currentTarget test: ');
            console.log(e.currentTarget);
            let index1 = e.dataTransfer.getData('text');
            let index2 = e.currentTarget.querySelector('.index').innerText;
            if (index1 > index2) {
                document.querySelector('#to-do-list').insertBefore(document.querySelector('.to-do-element:nth-of-type(' + index1 + ')'), e.currentTarget);
            } else {
                document.querySelector('#to-do-list').insertBefore(document.querySelector('.to-do-element:nth-of-type(' + index1 + ')'), e.currentTarget.nextSibling);
            }
            fixingIndex();
        });
    }

    function save(thisDiv) {
        thisDiv = this;
        const selectors = doSelectors(thisDiv);
        if (selectors.toDoInput.value.length===0) {
            alert('To Do element cannot be empty.');
            return false;
        }

        thisDiv.classList.remove("editing");
        thisDiv.classList.add("saved");
        selectors.toDoText.innerText = selectors.toDoInput.value;
        if (parseInt(selectors.index) === currentLength) {
            addAnother();
        }
    }

    function edit(thisDiv) {
        thisDiv = this;
        thisDiv.classList.remove("saved");
        thisDiv.classList.add("editing");
        thisDiv.querySelector('.to-do-input').addEventListener('blur', () => {
            save(thisDiv);
        });
    }

    function deleteIt(thisDiv) {
        thisDiv = this;
        thisDiv.remove();
        const selectors = doSelectors(thisDiv);
        currentLength -= 1;
        selectors.divs.forEach((element, index) => {
            element.querySelector('.index').innerText = index + 1;
        })
    }

    function crossOut(thisDiv) {
        thisDiv = this;
        thisDiv.classList.add("crossed-out");
    }

    function uncrossOut(thisDiv) {
        thisDiv = this;
        thisDiv.classList.remove("crossed-out");
    }

    function moveUp(thisDiv) {
        thisDiv = this;
        const selectors = doSelectors(thisDiv);

        swapNodes(selectors.divs[selectors.index-2], selectors.divs[selectors.index-1]);
        selectors.divs[selectors.index-2].querySelector('.index').innerText = selectors.index;
        selectors.divs[selectors.index-1].querySelector('.index').innerText = selectors.index-1;
    }

    function moveDown(thisDiv) {
        thisDiv = this;
        const selectors = doSelectors(thisDiv);

        swapNodes(selectors.divs[selectors.index-1], selectors.divs[selectors.index]);
        selectors.divs[selectors.index].querySelector('.index').innerText = selectors.index;
        selectors.divs[selectors.index-1].querySelector('.index').innerText = parseInt(selectors.index)+1;
    }

    function swapNodes(node1, node2) {

        node1.parentNode.replaceChild(node1, node2);
        node1.parentNode.insertBefore(node2, node1);
    }

    function doSelectors(div) {
        return {
            divs: document.querySelectorAll('.to-do-element'),
            index: div.querySelector('.index').innerText,
            toDoText: div.querySelector('.to-do-text'),
            toDoInput: div.querySelector('.to-do-input'),
            saveButton: div.querySelector('.save-button'),
            editButton: div.querySelector('.edit-button'),
            deleteButton: div.querySelector('.delete-button'),
            crossoutButton: div.querySelector('.cross-out-button'),
            uncrossoutButton: div.querySelector('.uncross-out-button'),
            moveUpButton: div.querySelector('.move-up-button'),
            moveDownButton: div.querySelector('.move-down-button')
        }
    }

    function fixingIndex() {
        document.querySelectorAll('.to-do-element').forEach((element, index) => {
            element.querySelector('.index').innerText = (index + 1);
        });
    }

    addAnother();
});

