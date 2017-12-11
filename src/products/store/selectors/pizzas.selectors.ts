import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromPizzas from '../reducers/pizzas.reducer';
import * as fromToppings from './toppings.selectors';
import { Pizza } from '../../models/pizza.model';

export const getPizzaState = createSelector(
    fromFeature.getProductsState, 
    (state: fromFeature.ProductsState) => state.pizzas
);



export const getAllPizzasEntities = createSelector(getPizzaState, fromPizzas.getPizzasEntities);

export const getSelectedPizza = createSelector(getAllPizzasEntities, fromRoot.getRouterState, (entities, router): Pizza => {
    return router.state && entities[router.state.params.pizzaId];
});


export const getAllPizzas = createSelector(getAllPizzasEntities, entities => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
  });
export const getPizzasLoaded = createSelector(getPizzaState, fromPizzas.getPizzasLoaded);
export const getPizzasLoading = createSelector(getPizzaState, fromPizzas.getPizzasLoading);

// selecting toppings for pizza
export const getPizzaVisualised = createSelector(
    getSelectedPizza,
    fromToppings.getToppingEntities,
    fromToppings.getSelectedToppings,
    (pizza, toppingEntities, selectedToppings) => {
        const toppings = selectedToppings.map(id => toppingEntities[id]);
        // merge selected toppings into the selected pizza
        return { ...pizza, toppings };
    }

)