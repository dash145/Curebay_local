import React, { lazy, Suspense }from 'react'
import { useLocation } from 'react-router';
// import PharmaProducts from '../../components/pharmaProducts';
const PharmaProducts = lazy(() => import('../../components/pharmaProducts'));

function PharmacyCategory() {
    const location = useLocation();
    const name = location?.state?.name;
    return (
        <div>
            <Suspense fallback={ <div>Loading...</div> }>
               <PharmaProducts />
            </Suspense>

        </div>


    );
}
export default PharmacyCategory;
