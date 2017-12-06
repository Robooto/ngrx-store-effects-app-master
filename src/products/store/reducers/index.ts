import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromPizzas from './pizzas.reducer';

export interface ProductsState {
    pizzas: fromPizzas.PizzaState
}

export const reducers: ActionReducerMap<ProductsState> = {
    pizzas: fromPizzas.reducer
};

export const getProductsState = createFeatureSelector<ProductsState>('products');

// pizzas state
export const getPizzaState = createSelector(
    getProductsState, 
    (state: ProductsState) => state.pizzas
);

export const getAllPizzasEntities = createSelector(getPizzaState, fromPizzas.getPizzasEntities);
export const getAllPizzas = createSelector(getAllPizzasEntities, entities => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
  });
export const getPizzasLoaded = createSelector(getPizzaState, fromPizzas.getPizzasLoaded);
export const getPizzasLoading = createSelector(getPizzaState, fromPizzas.getPizzasLoading);
