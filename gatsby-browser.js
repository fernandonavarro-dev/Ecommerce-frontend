/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react'
import CartContextProvider from './src/context/CartContext'

export const wrapRootElement = ({ element }) => (
    <CartContextProvider>
        {element}
    </CartContextProvider>
)