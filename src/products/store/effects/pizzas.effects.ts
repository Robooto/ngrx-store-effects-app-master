import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators/switchMap';

import * as pizzaActions from '../actions/pizzas.action';
import * as fromServices from '../../services';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators/map';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class PizzasEffects {
    constructor(
        private actions$: Actions,
        private pizzaService: fromServices.PizzasService
    ) {}

    // option to not dispatch {dispatch: false} probably not used much
    @Effect()
    loadPizzas$ = this.actions$.ofType(pizzaActions.LOAD_PIZZAS)
        .pipe(
            switchMap(() => {
                return this.pizzaService
                .getPizzas()
                .pipe(
                    map(pizzas => new pizzaActions.LoadPizzasSuccess(pizzas)),
                    catchError(error => of(new pizzaActions.LoadPizzasFail(error)))
                )
            })
        );

    @Effect()
    createPizza$ = this.actions$.ofType(pizzaActions.CREATE_PIZZA)
        .pipe(
            map((action: pizzaActions.CreatePizza) => action.payload),
            switchMap(pizza => {
                return this.pizzaService
                .createPizza(pizza)
                .pipe(
                    map(pizza => new pizzaActions.CreatePizzaSuccess(pizza)),
                    catchError(error => of(new pizzaActions.CreatePizzaFail(error)))
                )
            })
        );
    
    @Effect()
    updatePizza$ = this.actions$.ofType(pizzaActions.UPDATE_PIZZA)
        .pipe(
            map((action: pizzaActions.UpdatePizza) => action.payload),
            switchMap(pizza => {
                return this.pizzaService
                .updatePizza(pizza)
                .pipe(
                    map(pizza => new pizzaActions.UpdatePizzaSuccess(pizza)),
                    catchError(error => of(new pizzaActions.UpdatePizzaFail(error)))
                )
            })
        );
}