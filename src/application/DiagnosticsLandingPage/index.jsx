import React from 'react';
import Uploadpres from '../../components/Upload_pres';
import Lab from '../../components/Lab';
import Membership from '../../components/membership';
import HIWDiagnostic from '../../components/HIWDiagnostic';
import Benefits from '../../components/benefits_diagnostics';
import Collapse from '../../components/collapse_diagnostics';
import NavBarSearch from '../../components/navbarSearch';

function DiagnosticsLandingpage() {
    const [screen, setscreen] = React.useState(window.innerWidth);

    React.useEffect(() => {
        const updateWindowDimensions = () => {
            const newWidth = window.innerWidth;

            setscreen(newWidth);
        };

        window.addEventListener("resize", updateWindowDimensions);
        return () => window.removeEventListener("resize", updateWindowDimensions);
    }, []);

    return (
        <>
            {/* <NavBarSearch /> */}
            {/* <ul className="flex text-brand-secondary text-sm lg:text-base px-4 pt-5">
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
                    <a href="/diagnosis">Diagnotics</a>
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
            {/* <Uploadpres documentType={'Lab Reports'} title={'Quick Order with E-Prescription'} subTitle={'Upload e-prescription & get recommended test packages in a budget.'} /> */}
            <Lab />
            {/* <DiagnosticsHealthpackage /> */}
            <Membership screen={screen} />
            {/* <MostbookRadiologytest /> */}
            {/* <FrequentlybookPathologytest /> */}
            {/* <Specialtiy /> */}
            <div className="lg:bg-white lg:rounded-3xl py-1 content-center lg:shadow-sm  m-4 justify-center">
                <HIWDiagnostic />
                <Benefits />
                <Collapse />
            </div>
        </>
    );
}
export default DiagnosticsLandingpage;