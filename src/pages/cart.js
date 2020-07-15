import React, { useState, useCallback } from 'react'
import Img from 'gatsby-image'

import Layout from '../components/layout'
import SEO from '../components/seo'

import { getCart, addToCart, cartSubtotal, cartTotal } from '../utils/cart'
import { formatPrice } from '../utils/format'

export default () => {
    const cart = getCart()
    const [shipping, setShipping] = useState(0)
    const [inputShipping, setInputShipping] = useState(0)
    const [, updateState] = useState()
    const forceUpdate = useCallback(() => updateState({}), [])

    const transferShipping = () => {
        setShipping(inputShipping)
    }

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
            <h3>Subtotal: {formatPrice(cartSubtotal(cart))} </h3>
            <div>
                <h4>Shipping:
                 <input
                        type="number"
                        value={inputShipping}
                        onChange={(event) => setInputShipping(event.target.value)}
                    />
                    <button onClick={transferShipping}>+ shipping</button>
                </h4>
            </div>
            <h3>Total: {formatPrice(cartTotal(cart, shipping))} </h3>
        </Layout>
    )
}