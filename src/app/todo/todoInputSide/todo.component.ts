import { Component, EventEmitter, Output } from '@angular/core';

@Component({
   selector: 'todo-add',
   templateUrl: './todo.component.html',
   styleUrls: ['./todo.component.scss'],
})

export class TodoComponent {
   todoName: string;
   @Output() createTodo = new EventEmitter();
   constructor() {}

   AddTodo() {
   if (this.todoName === '') return;
   this.createTodo.emit({id: (Math.random() * 100) + 10, title: this.todoName.trim(),done:false});
   this.todoName = '';
   }
}
