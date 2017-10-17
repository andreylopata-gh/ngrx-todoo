import { Component, Input , Output, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ITodoType } from '../iTodoType';

@Component({
  selector: 'todo-list',
   templateUrl: './todos.component.html',
   styleUrls: ['./todos.component.scss'],
})
export class TodoList {
  @Input() todoList: Observable<ITodoType>;
  @Output() deleteTodoById = new EventEmitter();
  @Output() todoToggle = new EventEmitter();
  constructor() {}

  deleteTodo(todoElem: ITodoType) {
   this.deleteTodoById.emit(todoElem.id);
  }

  toogleCheckBox(todoItem: ITodoType) {
   this.todoToggle.emit(todoItem.id);
  }

}
