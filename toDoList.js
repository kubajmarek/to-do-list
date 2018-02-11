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
        currentLength += 1;
        let addedDiv = document.querySelector('.to-do-element:last-of-type');
        addedDiv.querySelector('.index').innerText = currentLength;
        addedDiv.querySelector('.to-do-text').innerText = document.querySelector('.to-do-creator').querySelector('.creator-input').value;
        addedDiv.querySelector('.to-do-input').value = document.querySelector('.to-do-creator').querySelector('.creator-input').value;
        addListeners(addedDiv);
        toDoCreator.querySelector('.creator-input').value = '';
    }


    function addListeners(thisDiv) {``
        thisDiv.querySelector('input').addEventListener('keyup', (e) => {
            if (event.keyCode === 13) {
                save(thisDiv);
            }
        });

        thisDiv.querySelector('.text-wrapper').addEventListener('dblclick', (e) => {
            edit(thisDiv);
        });

        thisDiv.querySelector('.save-button').addEventListener('click', () => save(thisDiv));
        thisDiv.querySelector('.edit-button').addEventListener('click', () => edit(thisDiv));
        thisDiv.querySelector('.delete-button').addEventListener('click', () => deleteIt(thisDiv));
        thisDiv.querySelector('.cross-out-button').addEventListener('click', () =>crossOut(thisDiv));
        thisDiv.querySelector('.uncross-out-button').addEventListener('click', () => uncrossOut(thisDiv));
        thisDiv.querySelector('.move-up-button').addEventListener('click', () => moveUp(thisDiv));
        thisDiv.querySelector('.move-down-button').addEventListener('click', () => moveDown(thisDiv));


        thisDiv.addEventListener('dragover', (e) => {
           e.preventDefault();
        });

        thisDiv.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', e.target.innerText);
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
        const selectors = doSelectors(thisDiv);
        if (selectors.toDoInput.value.length===0) {
            alert('To Do element cannot be empty.');
            return false;
        }

        thisDiv.classList.remove("editing");
        thisDiv.classList.add("saved");
        selectors.toDoText.innerText = selectors.toDoInput.value;
    }

    function edit(thisDiv) {
        thisDiv.classList.remove("saved");
        thisDiv.classList.add("editing");
        thisDiv.querySelector('.to-do-input').addEventListener('blur', () => {
            save(thisDiv);
        });
    }

    function deleteIt(thisDiv) {
        thisDiv.remove();
        const selectors = doSelectors(thisDiv);
        currentLength -= 1;
        selectors.divs.forEach((element, index) => {
            element.querySelector('.index').innerText = index + 1;
        })
    }

    function crossOut(thisDiv) { 
        thisDiv.classList.add("crossed-out");
    }

    function uncrossOut(thisDiv) {
        thisDiv.classList.remove("crossed-out");
    }

    function moveUp(thisDiv) {
        const selectors = doSelectors(thisDiv);

        swapNodes(selectors.divs[selectors.index-2], selectors.divs[selectors.index-1]);
        selectors.divs[selectors.index-2].querySelector('.index').innerText = selectors.index;
        selectors.divs[selectors.index-1].querySelector('.index').innerText = selectors.index-1;
    }

    function moveDown(thisDiv) {
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
});

