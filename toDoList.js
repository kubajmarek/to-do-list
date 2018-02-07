document.addEventListener('DOMContentLoaded', function() {

    let currentLength = 0;

    function addAnother() {
        const divPrototype = document.querySelector("#temp").content.cloneNode(true);
        divPrototype.querySelector('.index').innerText = currentLength + 1;
        addListeners(divPrototype);
        document.querySelector('#to-do-list').appendChild(divPrototype);
        currentLength += 1;

        if (currentLength===1) {
            document.querySelector('.delete-button').style.display = 'none';
        } else if (currentLength==2) {
            document.querySelector('.delete-button').style.display = 'inline';
        }
    }

    function addListeners(thisDiv) {
        const selectors = doSelectors(thisDiv);

        selectors.saveButton.addEventListener("click", function(event)  {
            save(event.target.parentElement);
        });

        selectors.editButton.addEventListener("click", function(event)  {
            edit(event.target.parentElement);
        });

        selectors.deleteButton.addEventListener("click", function(event)  {
            deleteIt(event.target.parentElement);
        });

        selectors.crossoutButton.addEventListener("click", function(event)  {
            crossOut(event.target.parentElement);
        });

        selectors.uncrossoutButton.addEventListener("click", function(event)  {
            uncrossOut(event.target.parentElement);
        });

        selectors.moveUpButton.addEventListener("click", function(event)  {
            moveUp(event.target.parentElement);
        });

        selectors.moveDownButton.addEventListener("click", function(event)  {
            moveDown(event.target.parentElement);
        });
    }

    function save(thisDiv) {
        const selectors = doSelectors(thisDiv);

        if (selectors.toDoInput.value.length===0) {
            alert('To Do element cannot be empty.');
            return false;
        }
        selectors.toDoText.innerText = selectors.toDoInput.value;
        selectors.toDoText.style.display = "inline";
        selectors.toDoInput.style.display = "none";
        selectors.saveButton.style.display = "none";
        selectors.editButton.style.display = "inline";
        selectors.crossoutButton.style.display = 'inline';
        if (selectors.index==currentLength) {
            addAnother();
        }
    }

    function edit(thisDiv) {
        const selectors = doSelectors(thisDiv);

        selectors.toDoText.style.display = "none";
        selectors.toDoInput.style.display = "inline";
        selectors.saveButton.style.display = "inline";
        selectors.editButton.style.display = "none";
        selectors.crossoutButton.style.display = 'none';
        selectors.uncrossoutButton.style.display = 'none';
    }

    function deleteIt(thisDiv) {
        const selectors = doSelectors(thisDiv);

        thisDiv.remove();
        currentLength -= 1;
        selectors.divs.forEach((element, index) => {
            element.querySelector('.index').innerText = index + 1;
        })

        if (currentLength===1) {
            selectors.divs[0].querySelector('.delete-button').style.display = 'none';
        }
    }

    function crossOut(thisDiv) {
        const selectors = doSelectors(thisDiv);

        thisDiv.querySelector('.text-wrapper').style.textDecoration = 'line-through';
        selectors.crossoutButton.style.display = 'none';
        selectors.uncrossoutButton.style.display = 'inline';
    }

    function uncrossOut(thisDiv) {
        const selectors = doSelectors(thisDiv);

        thisDiv.querySelector('.text-wrapper').style.textDecoration = 'none';
        selectors.crossoutButton.style.display = 'inline';
        selectors.uncrossoutButton.style.display = 'none';
    }

    function moveUp(thisDiv) {
        const selectors = doSelectors(thisDiv);

        swapTest(selectors.divs[selectors.index-2], selectors.divs[selectors.index-1]);
        selectors.divs[selectors.index-2].querySelector('.index').innerText = selectors.index;
        selectors.divs[selectors.index-1].querySelector('.index').innerText = selectors.index-1;
    }

    function moveDown(thisDiv) {
        const selectors = doSelectors(thisDiv);

        swapTest(selectors.divs[selectors.index-1], selectors.divs[selectors.index]);
        selectors.divs[selectors.index].querySelector('.index').innerText = selectors.index;
        selectors.divs[selectors.index-1].querySelector('.index').innerText = parseInt(selectors.index)+1;
    }

    function swapTest(node1, node2) {

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

    addAnother();
});

