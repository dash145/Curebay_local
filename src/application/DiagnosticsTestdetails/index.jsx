import React from 'react';
import Banner from '../../components/Banner';
import Header from '../../components/Header';
import RegisterForm from '../../components/RegisterForm';
import SearchBar from '../../components/Searchbar';
import CompletebloodCounttest from '../../components/CompletebloodCounttest';
import RecommendAddons from '../../components/RecommendAddons';
import FrequentlybookPathologytest from '../../components/FrequentlybookPathologytest';
import Membership from '../../components/membership';
import MostbookRadiologytest from '../../components/MostbookRadiologytest';

import HIW from '../../components/HIW';
import Benefits from '../../components/benefits';
import Collapse from '../../components/Collapse';

function DiagnosticsTestdetails() {
    return (
        <>
        {/* <Header />
        <SearchBar />
        <Banner/> */}
        <CompletebloodCounttest/>
        <RecommendAddons/>
        <FrequentlybookPathologytest/>
        <Benefits />
        <Collapse />
        </>
    );
}
export default DiagnosticsTestdetails;