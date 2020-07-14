//credits to: https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string

// formats a Strapi decimal varialbe into a currency formated string

export const formatPrice = (priceWithDecimals) => {
    const displayPrice = parseInt(priceWithDecimals) / 100
    return displayPrice.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });

}
