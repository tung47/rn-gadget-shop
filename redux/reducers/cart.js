import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import { ADD_ORDER } from '../actions/orders';
import CartItem from '../../models/cart-item';

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        // item in cart already
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProduct.id].sum + productPrice
        );
      } else {
        // new item added
        updatedOrNewCartItem = new CartItem(
          1,
          productPrice,
          productTitle,
          productPrice
        );
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + productPrice,
      };

    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.productId];
      const currentQty = selectedCartItem.quantity;

      let updatedCartItems;

      if (currentQty > 1) {
        // need to reduce quantity, not remove
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = {
          ...state.items,
          [action.productId]: updatedCartItem,
        };
      } else {
        const updatedCartItems = { ...state.items };
        delete updatedCartItems[action.productId];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      };
    case ADD_ORDER:
      return initialState;
  }
  return state;
};
