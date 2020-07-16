import React, { useContext, useState } from 'react'
// import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/CartContext'
import { API_URL } from '../utils/url'
// import axios from 'axios'


const generateInput = (label, value, setOnChange) => {
    return (
        <div style={{ margin: '5px' }} >
            <label htmlFor={label}>{label}</label>
            <input style={{ marginLeft: '9px' }}
                id={label}
                value={value}
                onChange={(e) => setOnChange(e.target.value)}
            />
        </div>
    )
}

export default (props) => {

    const { cart } = useContext(CartContext)
    // const [token, setToken] = useState(null)
    // const [total, setTotal] = useState('loading')

    const [plaza, setPlaza] = useState('select')
    const [clientName, setClientName] = useState('')
    const [clientTel, setClientTel] = useState('###-###-####')
    const [clientAddress, setClientAddress] = useState('')
    const [colony, setColony] = useState('')
    const [zip, setZip] = useState('')
    const [seller, setSeller] = useState('')
    const [coordinator, setCoordinator] = useState('')
    const [shipping, setShipping] = useState(props.shipping)
    const [invoice, setInvoice] = useState('no')

    const valid = () => {
        if (plaza === 'select' || !clientName || !clientTel || !clientAddress || (!colony && !zip) || (!seller && !coordinator)) {
            return false
        }

        return true
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log("handleSubmit(event),", event)
        console.log("handleSubmit(), cart", cart)

        const data = {
            plaza,
            clientName,
            clientTel,
            clientAddress,
            colony,
            zip,
            seller,
            coordinator,
            shipping,
            invoice,
            cart
        }

        console.log("data object to be sent,", data)


        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        // const response = await axios({
        //     method: 'POST',
        //     url: 'http://localhost:1337/orders',
        //     data
        // })

        const order = await response.json()

        console.log('handleSubmit, response', response)
        console.log('handleSubmit, order', order)


    }

    // useEffect(() => {
    //     const loadToken = async () => {
    //         const response = await fetch('http://localhost:1337/orders/payment', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 cart: cart.map(product => (
    //                     { ...product, ...{ id: product.strapiId } }
    //                 ))
    //             })
    //         })
    //         const data = await response.json()

    //         console.log('data,', data)

    //         setToken(data.client_secret)
    //         setTotal(data.amount)
    //     }
    //     loadToken()
    // }, [cart])

    // if (token) {

    return (
        <form style={{ margin: '10px 10px' }} onSubmit={handleSubmit}>
            <div>
                <span>Plaza </span>
                <select onChange={(e) => setPlaza(e.target.value)} name="plaza" value={plaza}>
                    <option value='select'>select</option>
                    <option value='cdmx'>CDMX</option>
                    <option value='edomex'>EDOMEX</option>
                    <option value='monterrey'>Monterrey</option>
                    <option value='puebla'>Puebla</option>
                    <option value='queretaro'>Queretaro</option>
                    <option value='Cancun'>Cancun</option>
                    <option value='playa-tulum'>Playa/Tulum</option>
                </select>
            </div>
            {generateInput("Client Name", clientName, setClientName)}
            {generateInput("Client Tel", clientTel, setClientTel)}
            {generateInput("Client Address", clientAddress, setClientAddress)}
            {generateInput("Colony", colony, setColony)}
            {generateInput("Zip", zip, setZip)}
            {generateInput("Seller", seller, setSeller)}
            {generateInput("Coordinator", coordinator, setCoordinator)}
            {generateInput("Shipping: $", shipping, setShipping)}
            <div>
                <span>Invoice?</span>
                <select onChange={(e) => setInvoice(e.target.value)} name="invoice" value={invoice}>
                    <option value={true}>Yes</option>
                    <option value={false}>no</option>
                </select>
            </div>

            <div>
                <button
                    onClick={handleSubmit}
                    style={{ fontSize: '20px', padding: '8px 12px', margin: '10px 10px' }}
                    disabled={!valid()}
                >Submit
                </button>

            </div>
        </form>

    )

    // }

}
