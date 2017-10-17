export const GET_TODOS = 'GET_TODOS';
export const ADD_TODOS = 'ADD_TODOS';
export const DEL_TODOS = 'DEL_TODOS';
export const DONE_TOOGLE = 'DONE_TOOGLE';

export function getTodos() {
  return {type: GET_TODOS};
}

export function addTodos(val) {
  return {type: ADD_TODOS, payload: val };
}

export function delTodos(index: number) {
  return {type: DEL_TODOS, id: index};
}

export function toogleDoneTodos(index: number) {
  return {type: DONE_TOOGLE, id:index};
}

const initialState = {data: []};

export function todos( state = initialState, { type, payload, id} ) {
  switch( type ) {
   case GET_TODOS:
   return Object.assign({}, state, {});
   case DONE_TOOGLE:
   return Object.assign({},state,{data: state.data.map(todo => {
   if(todo.id !== id) {
   return todo;
   }
   return Object.assign({}, todo, {done: !todo.done});
   })});
   case ADD_TODOS:
   return Object.assign({}, state,{data: state.data.concat(payload)});
   case DEL_TODOS:
   return Object.assign({},state,{data: state.data.filter( item => item.id !== id)});
   default:
   return state;
   }
}
