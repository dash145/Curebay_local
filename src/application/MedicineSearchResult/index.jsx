import React from 'react'
import Uploadpres from '../../components/Upload_pres';
import DisinfectantSearch from '../../components/DisinfectantSearch';

function MedicineSearchresult() {
    return (
        <div>
            <Uploadpres documentType={'Prescription'} title={'Quick Order with E-Prescription ' } subTitle={'Upload e-prescription & tell us what you need. We do the rest'} />
            <DisinfectantSearch />
        </div>


    );
}
export default MedicineSearchresult;