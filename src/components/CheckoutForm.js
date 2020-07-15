import React, { useContext, useEffect, useState } from 'react'

import { CartContext } from '../context/CartContext'

export default () => {

    const { cart } = useContext

    const [token, setToken] = useState(null)
    const [total, setTotal] = useState('loading')

    const handleSubmit = (event) => {
        console.log("handlesubmit(event),", event);

    }

    useEffect(() => {
        const loadToken = async () => {
            const response = await fetch('http://localhost:1337/orders/payment', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    cart: cart.map(product => (
                        { ...product, ...{ id: product.strapiId } }
                    ))
                })
            })
            const data = await response.json()

            console.log('data,', data)

            setToken(data.client_secret)
            setTotal(data.amount)
        }
        loadToken()
    }, [cart])

    if (token) {
        return (
            <form onSubmit={handleSubmit} >
                CardElements
                <button>Proceed</button>
            </form>
        )
    }

}
