export const setCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart))
}

export const getCart = () => {
    try {
        const cart = JSON.parse(localStorage.getItem('cart'))
        if (cart) {
            return cart
        }

    } catch (err) {

    }

    return []
}

export const addToCart = (product, qty = 1) => {
    const cart = getCart()

    const indexOfProduct = cart.findIndex((alreadyInCart) =>
        alreadyInCart.strapiId === product.strapiId
    )

    if (indexOfProduct !== -1) {
        cart[indexOfProduct].qty += parseInt(qty)

        if (cart[indexOfProduct].qty === 0) {
            cart.splice(indexOfProduct, 1)
            // localStorage.removeItem(product)
        }

    } else {
        product.qty = parseInt(qty)
        cart.push(product)
    }

    setCart(cart)
}
