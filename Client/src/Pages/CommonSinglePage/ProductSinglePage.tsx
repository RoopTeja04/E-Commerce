import React from 'react'
import { useLocation } from 'react-router-dom'

const ProductSinglePage = () => {

    const Location = useLocation();
    const { product } = Location.state || {};

    return (
        <>
            <h1>
                {product}
            </h1>
        </>
    )
}

export default ProductSinglePage