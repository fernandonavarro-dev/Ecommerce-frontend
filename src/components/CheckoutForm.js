import React, { useContext, useState } from 'react'
// import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/CartContext'

const generateInput = (label, value, setOnChange) => {
    return (
        <div>
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
    const [clientAddress, setClientAddress] = useState('')
    const [colony, setColony] = useState('')
    const [zip, setZip] = useState('')
    const [seller, setSeller] = useState('')
    const [coordinator, setCoordinator] = useState('')
    const [shipping, setShipping] = useState(props.shipping)
    const [invoice, setInvoice] = useState('no')

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("handleSubmit(event),", event);
        console.log("handleSubmit(), cart", cart);

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
        <form onSubmit={handleSubmit}>
            <div>
                <span>Plaza</span>
                <select onChange={() => setPlaza({ plaza })} name="plaza" value={plaza}>
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
            {generateInput("Client Address", clientAddress, setClientAddress)}
            {generateInput("Colony", colony, setColony)}
            {generateInput("Zip", zip, setZip)}
            {generateInput("Seller", seller, setSeller)}
            {generateInput("Coordinator", coordinator, setCoordinator)}
            {generateInput("Shipping", shipping, setShipping)}
            <div>
                <span>Invoice?</span>
                <select onChange={() => setInvoice({ invoice })} name="invoice" value={invoice}>
                    <option value='yes'>Yes</option>
                    <option value='no'>no</option>
                </select>
            </div>

            <button onClick={handleSubmit} >Submit</button>
        </form>

    )

    // }

}
