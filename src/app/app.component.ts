import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addTodos, delTodos, getTodos, toogleDoneTodos } from './todo/reducer/todo.reducer';
import { Observable } from 'rxjs/Observable';
import { ITodoType } from './todo/iTodoType';
import { IAppState } from './todo/iAppState';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent  {
  todos$: Observable<ITodoType>;

  constructor(private store: Store<IAppState>) {
   this.store.dispatch(getTodos());
   this.todos$ = this.store.select('todos');
   }

   addTodoToList(datas: ITodoType) {
   this.store.dispatch(addTodos(datas));
   }

   deleteTodoFromList(index: number) {
   this.store.dispatch(delTodos(index));
   }
   toogleDoneTodoList(index: number) {
   this.store.dispatch(toogleDoneTodos(index));
   }

}
