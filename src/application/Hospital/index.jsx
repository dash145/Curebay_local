import React from 'react';
import NavBarSearch from '../../components/navbarSearch';
import Membership from '../../components/membership';
import HIWHospital from '../../components/HIWhospital';
import FAQ from '../../components/collapse_hospital';
import Benifits from '../../components/benefits_hospital'
import RecommondedHospitals from '../../components/RecommondedHospitals';

function Hospital() {
    return (
        <>
        {/* <NavBarSearch /> */}
            {/* <ul className="flex text-brand-secondary text-sm lg:text-base  pt-5 px-4">
                <li className="inline-flex items-center">
                    <a href="/">Home</a>
                    <svg
                        className="h-5 w-auto text-brand-secondary"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </li>
                <li className="inline-flex items-center">
                    <a href="/hospital">Hospital</a>
                    <svg
                        className="h-5 w-auto text-brand-secondary"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </li>

            </ul> */}

            {/* <span onClick={(e)=>redirectTo(e,APP_ROUTES.HOSPITAL_DETAILS)}>go to Hosptial</span> */}
            <RecommondedHospitals></RecommondedHospitals>
            {/* <Doctors /> */}
            {/*<RecommondedSpeciality />*/}
            {/* <Package /> */}
            <Membership />

            <div className="lg:bg-white rounded-3xl pt-2 content-center lg:shadow-sm  m-4  justify-center">
                <HIWHospital />
                <Benifits />
                <FAQ />
            </div>
        </>
    );
}
export default Hospital;