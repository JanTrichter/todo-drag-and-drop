import './style.css';

let countId = 0;

const doneDropzone = document.querySelector('#done') as HTMLElement;
const todoDropzone = document.querySelector('#todo') as HTMLElement;
let items = document.querySelectorAll('.todo-item') as NodeListOf<HTMLElement>;
const addTodo = document.querySelector('#add') as HTMLElement;

const refreshList = () => {
  items = document.querySelectorAll('.todo-item') as NodeListOf<HTMLElement>;

  items.forEach((item) => {
    item.addEventListener('dragstart', (e: any) => {
      e.dataTransfer.setData('text/plain', e.target.id);
    });

    item.addEventListener('dblclick', () => {
      item.style.color = getComputedStyle(
        document.documentElement
      ).getPropertyValue('--secondary');
      item.contentEditable = 'true';
      item.draggable = false;
      item.style.cursor = 'text';

      item.addEventListener('keypress', (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          item.style.color = getComputedStyle(
            document.documentElement
          ).getPropertyValue('--paragraph');
          item.contentEditable = 'false';
          item.draggable = true;
          item.style.cursor = 'pointer';
        }
      });
    });
  });
};

addTodo.addEventListener('click', async () => {
  todoDropzone.insertAdjacentHTML(
    'beforeend',
    `
    <div
    id="todo${countId}"
    class="todo-item"
    draggable="true">Doubleclick to edit</div>
    `
  );
  countId++;
  refreshList();
});

doneDropzone.addEventListener('dragover', (e: Event) => {
  e.preventDefault();
});

doneDropzone.addEventListener('drop', (e: any) => {
  const id = e.dataTransfer.getData('text');
  const draggable = document.getElementById(id) as Node;
  doneDropzone.appendChild(draggable);
  e.dataTransfer.clearData();
});

todoDropzone.addEventListener('dragover', (e: Event) => {
  e.preventDefault();
});

todoDropzone.addEventListener('drop', (e: any) => {
  const id = e.dataTransfer.getData('text');
  const draggable = document.getElementById(id) as Node;
  todoDropzone.appendChild(draggable);
  e.dataTransfer.clearData();
});

// Delete Item
addTodo.addEventListener('dragover', (e: Event) => {
  e.preventDefault();
  addTodo.innerText = 'Delete';
  addTodo.style.backgroundColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--secondary');
});

addTodo.addEventListener('drop', (e: any) => {
  const id = e.dataTransfer.getData('text');
  const draggable = document.getElementById(id) as HTMLElement;
  draggable.remove();
  e.dataTransfer.clearData();
  addTodo.innerText = 'Add Todo';
  addTodo.style.backgroundColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--button');
});

addTodo.addEventListener('dragleave', (e: Event) => {
  e.preventDefault();
  addTodo.innerText = 'Add Todo';
  addTodo.style.backgroundColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--button');
});
