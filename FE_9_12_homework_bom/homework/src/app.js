const rootNode = document.getElementById('root');
let todoItems = [];
let zero = 0;
let minusOne = -1;

const createElement = (tag, attributes = {}, innerTEXT = '') => {
  const element = document.createElement(tag);
  if (Object.keys(attributes).length) {
    for (let key in attributes) {
      if (attributes.hasOwnProperty(key)) {
        element.setAttribute(key, attributes[key]);
      }
    }
  }
  if (innerTEXT) {
    element.appendChild(document.createTextNode(innerTEXT));
  }
  return element;
};

const storage = {
  add(description) {
    const id = ':item_' + +new Date();
    const item = {description, id, isDone: false};
    todoItems.push(item);
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
    return todoItems;
  },
  getAll() {
    return JSON.parse(localStorage.getItem('todoItems'));
  },
  getById(id) {
    return this.getAll().find(item => item.id === id);
  },
  getDone() {
    return this.getAll().filter(item => item.isDone === true);
  },
  getUndone() {
    return this.getAll().filter(item => item.isDone === false);
  },
  getSorted() {
    return this.getUndone().concat(this.getDone());
  },
  setAsDoneById(id) {
    const updatedList = this.getAll().map(item => {
      if (item.id === id) {
        item.isDone = true;
      }
      return item;
    });
    localStorage.setItem('todoItems', JSON.stringify(updatedList));
    return todoItems;
  },
  changeDescription(id, description) {
    const updatedList = this.getAll().map(item => {
      if (item.id === id) {
        item.description = description;
      }
      return item;
    });
    localStorage.setItem('todoItems', JSON.stringify(updatedList));
    return todoItems;
  },
  removeById(id) {
    const updatedList = this.getAll().filter(item => item.id !== id);
    localStorage.setItem('todoItems', JSON.stringify(updatedList));
    return todoItems;
  }
};

const route = {
  load() {
	const hash = window.location.hash;
    if (hash.endsWith('/add')) {
		document.title = 'Add new task';
		rootNode.innerHTML = '';
		rootNode.appendChild(template.add());
		autocomplete(document.getElementById('myInput'), tasks);
    } else if ((/\/modify\/:item_\d+$/).test(hash)) {
		const id = hash.slice(hash.lastIndexOf('/') + 1);
		const item = storage.getById(id);
		document.title = `Modify ${item.description}`;
		rootNode.innerHTML = '';
		rootNode.appendChild(template.modify(item));
		autocomplete(document.getElementById('myInput'), tasks);
    } else {
		window.history.pushState('', '/', window.location.pathname);
		document.title = 'Main page';
		rootNode.innerHTML = '';
		rootNode.appendChild(template.main(todoItems)); 
    }
  }
};

window.onload = window.onhashchange = () => {
  if (localStorage.getItem('todoItems')) {
    todoItems = storage.getSorted();
  }
  route.load();
};

const template = {
main(todoItems){
	const section = createElement('section', {'id': 'sectionWelcome'});
	const header = createElement('h1', {}, 'Simple TODO application');
	const AddTaskButton = createElement('button', {'id': 'button-main'}, 'Add new task');
	const emptyList = createElement('p',{'class': 'empty-todo'}, 'TODO is empty');
	const list = createElement('ul', {'id': 'list'});

	AddTaskButton.onclick = () => {
      window.location.hash = '/add';
	};

	section.appendChild(header);
	section.appendChild(AddTaskButton);
	section.appendChild(list);
	section.appendChild(emptyList);

	if (todoItems.length) {
      for (let item of todoItems) {
		const li = createElement('li', {'id': item.id});
		const checkbox = createElement('button', {
			'class': item.isDone ? 'checkbox-done' : 'checkbox-undone'
		});
		const todoText = createElement('button', {'class': 'todo-text'}, item.description);
		const remove = createElement('button', {'class': 'remove'});

		checkbox.onclick = () => {
			if (checkbox.className === 'checkbox-undone') {
			checkbox.className = 'checkbox-done';
			storage.setAsDoneById(item.id);
			list.appendChild(li);
			}
		};

        todoText.onclick = () => {
          window.location.hash = `/modify/${item.id}`;
        };

        remove.onclick = () => {
          li.remove();
          storage.removeById(item.id);
        };

        li.appendChild(checkbox);
        li.appendChild(todoText);
        li.appendChild(remove);
        list.appendChild(li);
      }
    }
    return section;
},

add() {
    const section = createElement('section', {'id': 'add-section'});
    const header = createElement('h1', {}, 'Add task');
    const mainDiv = createElement( 'div', {'class': 'dropdown'});
    const form = createElement('form', {'autocomplete': 'off'});
    const div = createElement('div', {'class': 'autocomplete'});
    const input = createElement('input', {'type': 'text',
	'id': 'myInput'
	});
    const buttons = createElement('div', {'class': 'buttons-wrapper'});
    const cancel = createElement('button', {'class': 'cancel-btn'}, 'Cancel');
    const save = createElement('button', {
      'class': 'save-changes-btn',
      'disabled': 'true'
    }, 'Save changes');

	input.onchange = input.onkeyup = () => {
		const description = input.value.trim();
		save.disabled = !description;
		if (event.code === 'Enter' && description) {
		save.click();
		}
	};

    cancel.onclick = () => {
      window.location.hash = '';
    };

    save.onclick = () => {
      storage.add(input.value.trim());
      window.location.hash = '';
    };
    section.appendChild(header);
	buttons.appendChild(cancel);
    buttons.appendChild(save);
    section.appendChild(mainDiv);
    mainDiv.appendChild(form);
    form.appendChild(div);
    div.appendChild(input);
    form.appendChild(buttons);
    return section;
  },

  modify(item) {
    const section = this.add();
    section.id = 'modify-section';
    section.querySelector('h1').textContent = 'Modify item';
    section.querySelector('input').value = item.description;
    section.querySelector('.save-changes-btn').onclick = () => {
      storage.changeDescription(item.id, section.querySelector('input').value.trim());
      window.location.hash = '';
    };
    return section;
  }
};
function autocomplete(inp, arr) {
  let currentFocus;
  inp.addEventListener('input', function(e) {
      let a, b, i, val = this.value;
      closeAllLists();
      if (!val) {
		return false;
      }
      currentFocus = minusOne;
      a = document.createElement('DIV');
      a.setAttribute('id', this.id + 'autocomplete-list');
      a.setAttribute('class', 'autocomplete-items');
      this.parentNode.appendChild(a);
      for (i = zero; i < arr.length; i++) {
        if (arr[i].substr(zero, val.length).toUpperCase() === val.toUpperCase()) {
          b = document.createElement('DIV');
          b.innerHTML = '<strong>' + arr[i].substr(zero, val.length) + '</strong>';
          b.innerHTML += arr[i].substr(val.length);
          b.innerHTML += '<input type="hidden" value="' + arr[i] + '">';
          b.addEventListener('click', function(e) {
              inp.value = this.getElementsByTagName('input')[zero].value;
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  function addActive(x) {
    if (!x) {
		return false;
    } removeActive(x);
    if (currentFocus >= x.length) {
		currentFocus = zero;
    }
    if (currentFocus < zero) {
		currentFocus = x.length - minusOne;
    }
    x[currentFocus].classList.add('autocomplete-active');
  }
  function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove('autocomplete-active');
    }
  }
  function closeAllLists(elmnt) {
    let x = document.getElementsByClassName('autocomplete-items');
    for (let i = 0; i < x.length; i++) {
      if (elmnt !== x[i] && elmnt !== inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener('click', function (e) {
      closeAllLists(e.target);
  });
}
let tasks = ['Task 1', 'Task 2', 'task 2', 'Task 3', 'Task 4'];