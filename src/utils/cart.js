export const TAX_RATE = process.env.TAX_RATE || 0

export const saveCart = (cart) => {
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

export const cartSubtotal = (cart) => {
    const subtotal = cart.reduce((counter, product) => {
        return counter + product.price_in_cent * product.qty
    }, 0)
    return subtotal
}

export const cartTotal = (cart, shipping) => {
    if (cart.length === 0) {
        return 0
    }
    const subtotal = cartSubtotal(cart)
    const total = subtotal + subtotal * TAX_RATE + shipping * 100

    return Math.round(total)
}