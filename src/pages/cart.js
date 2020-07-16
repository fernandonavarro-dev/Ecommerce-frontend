import React, { useState, useCallback, useContext } from 'react'
import Img from 'gatsby-image'

import { CartContext } from '../context/CartContext'

import Layout from '../components/layout'
import SEO from '../components/seo'
import CheckoutForm from '../components/CheckoutForm'

import { cartSubtotal, cartTotal } from '../utils/cart'
import { formatPrice } from '../utils/format'

export default () => {
    const { cart, addToCart } = useContext(CartContext)
    console.log('Cart.render context,', cart)

    const [, updateState] = useState()
    const forceUpdate = useCallback(() => updateState({}), [])

    const [showCheckout, setShowCheckout] = useState(false)

    const [shipping, setShipping] = useState(0)
    const [inputShipping, setInputShipping] = useState(0)
    const transferShipping = () => {
        setShipping(inputShipping)
    }

    const subtotal = cartSubtotal(cart)
    const total = cartTotal(cart, shipping)

    return (
        <Layout>
            <SEO title='cart' />
            <h2>Cart</h2>
            <table>
                <thead>
                    <tr>
                        <th>
                            Product
                    </th>
                        <th>
                            Price
                    </th>
                        <th>
                            Quantity
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(product => (
                        <tr>
                            <td>
                                <Img
                                    style={{ width: '100px', height: '100px', verticalAlign: 'middle' }}
                                    fixed={product.thumbnail.childImageSharp.fixed} />
                                <span style={{ marginLeft: '14px', whiteSpace: 'nowrap' }} >{product.name} </span>
                            </td>
                            <td>
                                {formatPrice(product.price_in_cent)}
                            </td>
                            <td style={{ textAlign: 'center' }} >
                                <button onClick={() => {
                                    addToCart(product, -1)
                                    forceUpdate()
                                }} >-</button>
                                <span style={{ fontStyle: 'bold', marginLeft: '8px', marginRight: '8px' }} >{product.qty}</span>
                                <button onClick={() => {
                                    addToCart(product, 1)
                                    forceUpdate()
                                }} >+</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            <h3>Subtotal: {formatPrice(subtotal)} </h3>
            <div>
                <h4>Shipping: $
                 <input
                        type="number"
                        value={inputShipping}
                        onChange={(event) => setInputShipping(event.target.value)}
                        style={{ marginLeft: '0px', marginRight: '0px', width: '150px' }}
                    />
                    <button onClick={transferShipping}>+ shipping </button>
                </h4>
            </div>
            <h3>Total: {formatPrice(total)} </h3>

            <div>
                {cart && cart.length > 0 &&
                    <button onClick={() => setShowCheckout(true)} style={{ fontSize: '24px', padding: '12px 24px' }} >
                        Initiate Checkout
                    </button>
                }
            </div>

            {showCheckout &&
                <CheckoutForm
                    total={total}
                    subtotal={subtotal}
                    shipping={shipping}
                />
            }

        </Layout>
    )
}