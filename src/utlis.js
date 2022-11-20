export function getItemsCount(cartItems) {
    return cartItems.reduce((count, cartItem) => cartItem.quantity + count, 0); // initial value of "count" is zero
}

export function getSubTotal(cartItems) {
    return cartItems.reduce((sum, { product, quantity }) => (product.price * quantity) + sum, 0);
}