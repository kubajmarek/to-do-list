document.addEventListener('DOMContentLoaded', function() {

    let currentLength = 0;

    function addAnother() {
        const divPrototype = document.querySelector("#temp").content.cloneNode(true);
        currentLength += 1;
        divPrototype.querySelector('.index').querySelector('span').innerText = currentLength ;
        addListeners(divPrototype);
        document.querySelector('#to-do-list').appendChild(divPrototype);
    }

    function addListeners(thisDiv) {
        thisDiv.querySelectorAll('button').forEach((elegiggle) => {
            elegiggle.addEventListener('click', (e) => {
                switch (e.target.dataset.button) {
                    case "save":
                        save(e.target.parentElement.parentElement);
                        break;
                    case "edit":
                        edit(e.target.parentElement.parentElement);
                        break;
                    case "delete":
                        deleteIt(e.target.parentElement.parentElement);
                        break;
                    case "cross-out":
                        crossOut(e.target.parentElement.parentElement);
                        break;
                    case "uncross-out":
                        uncrossOut(e.target.parentElement.parentElement);
                        break;
                    case "move-up":
                        moveUp(e.target.parentElement.parentElement);
                        break;
                    case "move-down":
                        moveDown(e.target.parentElement.parentElement);
                        break;
                }
            })
        })
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

        if (selectors.index==currentLength) {
            addAnother();
        }
    }

    function edit(thisDiv) {
        thisDiv.classList.remove("saved");
        thisDiv.classList.add("editing");
    }

    function deleteIt(thisDiv) {
        thisDiv.remove();
        const selectors = doSelectors(thisDiv);
        currentLength -= 1;
        console.log(selectors.divs);
        selectors.divs.forEach((element, index) => {
            element.querySelector('.index').querySelector('span').innerText = index + 1;
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
        selectors.divs[selectors.index-2].querySelector('.index').querySelector('span').innerText = selectors.index;
        selectors.divs[selectors.index-1].querySelector('.index').querySelector('span').innerText = selectors.index-1;
    }

    function moveDown(thisDiv) {
        const selectors = doSelectors(thisDiv);

        swapNodes(selectors.divs[selectors.index-1], selectors.divs[selectors.index]);
        selectors.divs[selectors.index].querySelector('.index').querySelector('span').innerText = selectors.index;
        selectors.divs[selectors.index-1].querySelector('.index').querySelector('span').innerText = parseInt(selectors.index)+1;
    }

    function swapNodes(node1, node2) {

        node1.parentNode.replaceChild(node1, node2);
        node1.parentNode.insertBefore(node2, node1);
    }

    function doSelectors(div) {
        return {
            divs: document.querySelectorAll('.to-do-element'),
            index: div.querySelector('.index').querySelector('span').innerText,
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

    addAnother();
});

