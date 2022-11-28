import React from 'react'
import Uploadpres from '../../components/Upload_pres';
import CovidBasic from '../../components/CovidBasic';
import AllProducts from '../../components/AllProducts';

function MedicineCategory() {
    return (
        
        <div>
            <Uploadpres documentType={'Prescription'} title={'Quick Order with E-Prescription'} subTitle={'Upload e-prescription & tell us what you need. We do the rest'} />
            <CovidBasic />
            <AllProducts />
            
        </div>


    );
}
export default MedicineCategory;