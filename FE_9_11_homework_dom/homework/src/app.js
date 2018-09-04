let isActiveCheckBox = false;
let itemCounter = 0;
const Max_Items_Quantity = 10;
let list = document.getElementById('list');
let inputField = document.getElementsByClassName('todo-cat-input')[itemCounter];
let addButton = document.getElementsByClassName('todo-cat-button')[itemCounter];

inputField.addEventListener('change', changeActivity);
inputField.addEventListener('keyup', changeActivity);
addButton.addEventListener('click', addTodo);

const createElement = (tag, attributes = {}, innerText = '') => {
  const element = document.createElement(tag);
  if (Object.keys(attributes).length) {
    for (let key in attributes) {
      if (attributes.hasOwnProperty(key)) {
        element.setAttribute(key, attributes[key]);
      }
    }
  }
  if (innerText) {
    element.appendChild(document.createTextNode(innerText));
  }
  return element;
};

function addTodo (){
	const checkIcon = createElement('i', {'class': 'material-icons'}, 'check_box_outline_blank' );
	const deleteIcon = createElement('i', {'class': 'material-icons'}, 'delete');
	const checkboxBtn = createElement('button', {'class': 'todo-cat-checkbox'});
	const deleteBtn = createElement('button', {'class': 'todo-cat-dlete'});
	const span = createElement('span', {'class': 'entered-text'}, inputField.value.trim());
	const newLi = createElement('li', {'class': 'li-todo-cat', 'draggable': true});

	checkboxBtn.appendChild(checkIcon);
	deleteBtn.appendChild(deleteIcon);
	newLi.appendChild(checkboxBtn);
	newLi.appendChild(span);
	newLi.appendChild(deleteBtn);	
	list.appendChild(newLi);

	checkboxBtn.addEventListener('click', function(){
		if (!isActiveCheckBox) {
			checkIcon.textContent = 'check_box'; 
			isActiveCheckBox = true; 	
		} else{
			checkIcon.textContent = 'check_box_outline_blank'; 
			isActiveCheckBox = false;
		}
	});
	deleteBtn.addEventListener('click', function(){
		newLi.remove();
		itemCounter--;
		inputField.disabled = false;
	});
	if (++itemCounter >= Max_Items_Quantity) {
		inputField.disabled = true;
	}
	inputField.value = '';
	addButton.disabled = true;
}
function changeActivity(event){
	const labeltext = inputField.value.trim();
	addButton.disabled = !labeltext;
	if(event.code === 'Enter' && labeltext){
		addTodo(labeltext);
	}
}
let dragging = null;
list.addEventListener('dragstart', function(event){
  dragging = event.target;
});
list.addEventListener('dragover', function(event){
  if (event.target.className === 'li-todo-cat') {
    event.preventDefault();
    const Two_Value = 2;
    const bounding = event.target.getBoundingClientRect();
    const offset = bounding.y + bounding.height / Two_Value;
    if (event.clientY - offset > itemCounter) {
      event.target.style['border-top'] = '';
    } else {
      event.target.style['border-bottom'] = '';
    }
  }
});
list.addEventListener('dragleave', function(event){
  event.target.style['border-bottom'] = '';
  event.target.style['border-top'] = '';
});
list.addEventListener('drop', function(event){
  if (event.target.className === 'li-todo-cat') {
    event.preventDefault();
    if (event.target.style['border-bottom']) {
      event.target.style['border-bottom'] = '';
      list.insertBefore(dragging, event.target.nextSibling);
    } else {
      event.target.style['border-top'] = '';
      list.insertBefore(dragging, event.target);
    }
  }
});