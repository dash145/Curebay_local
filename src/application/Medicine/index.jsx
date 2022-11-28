import React from 'react';
import Membership from '../../components/membership';
import Uploadpres from '../../components/Upload_pres';
import Pharmacy from '../../components/Pharmacy';
import Orderedmed from '../../components/Ordered_med';
import HealthCondition from '../../components/HealthCondition';
import Topprod from '../../components/Top_prod';
import CategoryShop from '../../components/CategoryShop';
import NavBarSearch from '../../components/navbarSearch';

function Medicine() {
    return (
        <>
            <NavBarSearch />
            <ul className="flex text-brand-secondary text-sm lg:text-base mx-4  pt-5">
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
                    <a href="/pharmacycategory">Medicine</a>
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

            </ul>
            <Uploadpres documentType={'Prescription'} title={'Quick Order with E-Prescription'} subTitle={'Upload e-prescription & tell us what you need. We do the rest'} />
            <Pharmacy />
            {/* <Orderedmed /> */}
            {/* <HealthCondition /> */}
            <Membership />
            {/* <CategoryShop /> */}
            {/* <Topprod /> */}
            {/* <div className="lg:bg-white rounded-3xl py-6 content-center lg:shadow-sm  m-10 justify-center">
                <HIW />
                <Benifits />
                <FAQ />
            </div> */}
        </>
    );
}
export default Medicine;