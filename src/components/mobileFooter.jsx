import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import StethoScope from '../Assets/Images/m-stethoscope.svg';
import GStethoScope from '../Assets/Images/mg-stethoscope.svg';

import Pill from '../Assets/Images/m-pill.svg';
import Tube from '../Assets/Images/m-tube.svg';
import hospitalB from '../Assets/Images/hospital-building.svg';
import hospitalg from '../Assets/Images/hospital-buildingg.svg';

import Service from '../Assets/Images/m-service.svg';
import Records from '../Assets/Images/m-records.svg';
import { APP_ROUTES } from '../application/Router/constants/AppRoutes';
export default function MobileFooter() {
    const location = useLocation();

    const bottomList = [
        {
            route: APP_ROUTES.DOCTORS,
            text: 'Doctors',
            img: StethoScope,
            gimg: GStethoScope
        },
        {
          route: APP_ROUTES.HOSPITAL,
          text: 'Hospitals',
          img: hospitalB,
          gimg: hospitalg,
        },
        {
            route: APP_ROUTES.PHARMACY_CATEGOTY,
            text: 'Medicines',
            img: Pill,
            gimg: Pill,
        },
        {
            route: APP_ROUTES.DIAGNOSIS,
            text: 'Diagnostics',
            img: Tube,
            gimg: Tube,
        },

        {
            route: APP_ROUTES.COMINGSOON,
            text: 'Services',
            img: Service,
            gimg: Service
        },
    ]

    return (
        <div className={`${location.pathname === APP_ROUTES.SIEBAR ? 'hidden' : 'lg:hidden block w-full '}`}>
            <section id="bottom-navigation" className="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
                <section id="bottom-navigation" className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow-2xl">
                    <div id="tabs" className="flex justify-around mb-2">
                        {bottomList.map((data, i) => (

                            <Link key={i} to={data.route} className="w-full content-center focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
                                <img src={(location.pathname === data.route) ? data.gimg : data.img} className="h-8 w-8 mx-auto mb-1 " />
                                <p className='text-xs font-semibold font-sans text-brand-lightgreen'>{data.text}</p>
                                {/* <span className={`tab tab-home  ${location.pathname === data.route ? 'text-green-500 ' : 'text-brand-primary '} block text-xs`}>{data.text}</span> */}
                            </Link>
                        ))}
                    </div>
                </section>
            </section>
        </div >
    );
}
