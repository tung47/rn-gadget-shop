export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch) => {
    const response = await fetch(
      'https://rn-gadget-shop-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, imageUrl, price }),
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: { items: cartItems, amount: totalAmount },
    });
  };
};
