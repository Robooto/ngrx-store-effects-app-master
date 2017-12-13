import * as fromPizzas from './pizzas.action';

describe('Pizzas Actions', () => {

    describe('LoadPizzas Actions', () => {
        describe('LoadPizzas', () => {
            it('should create an action', () => {
                const action = new fromPizzas.LoadPizzas();
                // spread into a new object
                expect({...action}).toEqual({ type: fromPizzas.LOAD_PIZZAS});
            });
        });

        describe('LoadPizzasFail', () => {
            it('should create an action', () => {
                const payload = { message: 'Load Error ' };
                const action = new fromPizzas.LoadPizzasFail(payload);
                // spread into a new object
                expect({...action}).toEqual({ type: fromPizzas.LOAD_PIZZAS_FAIL, payload});
            });
        });

        describe('LoadPizzasSuccess', () => {
            it('should create an action', () => {
                const payload = [
                    {
                      "name": "Blazin' Inferno",
                      "toppings": [
                        {
                          "id": 9,
                          "name": "pepper"
                        },
                        {
                          "id": 5,
                          "name": "mozzarella"
                        },
                        {
                          "id": 1,
                          "name": "anchovy"
                        },
                        {
                          "id": 2,
                          "name": "bacon"
                        },
                        {
                          "id": 6,
                          "name": "mushroom"
                        },
                        {
                          "id": 10,
                          "name": "pepperoni"
                        },
                        {
                          "id": 11,
                          "name": "sweetcorn"
                        },
                        {
                          "id": 8,
                          "name": "onion"
                        }
                      ],
                      "id": 1
                    }];
                const action = new fromPizzas.LoadPizzasSuccess(payload);
                // spread into a new object
                expect({...action}).toEqual({ type: fromPizzas.LOAD_PIZZAS_SUCCESS, payload});
            });
        });
    });

});