import React, { useState, useEffect } from "react";
import Banner from '../../components/Banner';
import Header from '../../components/Header';
import RegisterForm from '../../components/RegisterForm';
import SearchBar from '../../components/Searchbar';
import StarDoctors from '../../components/StarDoctors';

//import { useHistory } from 'react-router-dom'



function HomePage() {



  

    return (
        <>
        <Header />
        <StarDoctors />
        <SearchBar />
        
        </>
    );
}
export default HomePage;