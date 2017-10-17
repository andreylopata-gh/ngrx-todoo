import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* Dev Imports */
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

/* Feature Modules */
import { CoreModule } from './core/core.module';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';

/* Devtools etc */
import { ENV_PROVIDERS } from './environment';
/* Root routing module */
import { CoreRoutingModule } from './core/core-routing.module';

import '../styles/vendor.scss';
/* App Root */
import { AppComponent } from './app.component';
import { IAppState, STATE_REPLACE_ACTION } from './store/store.types';
import { Store, Action, StoreModule } from '@ngrx/store';
import { TodoComponent } from './todo/todoInputSide/todo.component';
import { TodoList } from './todo/todoListSide/todos.component';
import { todos } from './todo/reducer/todo.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
	imports: [
		HomeModule,
		AuthModule,
		BrowserModule,
		CoreModule,
		SharedModule,
		ModalModule.forRoot(),
		BootstrapModalModule,
		CoreRoutingModule,
		StoreModule.forRoot({ todos }),
		StoreDevtoolsModule.instrument({maxAge: 5}),
	],
	declarations: [
		AppComponent, TodoComponent, TodoList,
	],
	bootstrap: [AppComponent],
	providers: [ENV_PROVIDERS],
})
export class AppModule {

	constructor(
		public appRef: ApplicationRef,
		private store: Store<IAppState>) {
	}

	hmrOnInit(store) {
		if (!store || !store.state$) return;
		// console.log('HMR store', store);
		// console.log('store.state.data:', store.state.data)

		// inject AppStore here and update it
		store.state$.subscribe(state => {
			this.store.dispatch({
				type: STATE_REPLACE_ACTION,
				data: state,
			} as Action);
		});
		if ('restoreInputValues' in store) {
			setTimeout(store.restoreInputValues);
		}
		// change detection
		this.appRef.tick();
		delete store.state$;
		delete store.restoreInputValues;
	}

	hmrOnDestroy(store) {
		const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
		// recreate elements
		store.disposeOldHosts = createNewHosts(cmpLocation);
		// inject your AppStore and grab state then set it on store
		// var appState = this.AppStore.get()
		// const state = this.store.getState();
		// store.state = { ...state };
		store.state$ = this.store.select(state => state);
		// save input values
		store.restoreInputValues = createInputTransfer();
		// remove styles
		removeNgStyles();
	}

	hmrAfterDestroy(store) {
		// display new elements
		store.disposeOldHosts();
		delete store.disposeOldHosts;
		// anything you need done the component is removed
	}
}
