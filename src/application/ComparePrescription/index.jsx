import React from 'react'
import { useState } from 'react';
import CompareDiagnosisPrescription from "../../components/cartCompare/compareDiagonstics";
import CompareDrugPrescription from "../../components/cartCompare/compareDrugs";

function ComparePrescriptions() {

    const [addedToCart, setAddedToCart] = useState(false);

    const refreshCart = () => {
        console.log('Refresh Called');
        setAddedToCart(true);
    }

    return (
        <div>
            <CompareDrugPrescription
            addedToCart={addedToCart}
            cartRefresh={refreshCart}
            ></CompareDrugPrescription>
            <CompareDiagnosisPrescription
            addedToCart={addedToCart}
            cartRefresh={refreshCart}>
            </CompareDiagnosisPrescription>
        </div>
    );
}
export default ComparePrescriptions;