import React, { useEffect } from "react";
import HIW from "../../components/HIW";
import CareScope from "../../components/CareScope";
import Benefits from "../../components/benefits";
import Membership from "../../components/membership";
import Collapse from "../../components/Collapse";
import Records from "../../components/PatientRecord";
import FamilyMember from "../../components/familyMember";
import { getMembershipList } from "../../Redux/Actions/packages";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../../components/Popup";
import DoctorBanner from "../../components/DoctorBanner";
import { useHistory, useLocation } from "react-router-dom";


function HomePage() {
  const [screen, setscreen] = React.useState(window.innerWidth);

  const dispatch = useDispatch();

  const location = useLocation();

  const history = useHistory();



  useEffect(() => {
    dispatch(getMembershipList());
  }, [dispatch]);

  React.useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;

      setscreen(newWidth);
    };

    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  const UserData = useSelector((state) => state.authReducer.patientData);
  return (
    <div style={{ marginTop: '-130px' }} >

      {/* <NavBarSearch />

            <StarDoctors /> */}

      <DoctorBanner screen={screen} />
      
      {screen >= 300 && <Membership screen={screen} />
      }

      {UserData?.id && (
        <>
          <FamilyMember />

          <Records />

         
        </>
      )}





      <div className="lg:bg-white lg:rounded-3xl py-6 content-center my-2  justify-center">
        <HIW />

        <CareScope/>

        <Benefits />

        {/* {screen > 500 ? <Popup /> : <PopupMobile />} */}
        <Popup />

        <Collapse />
      </div>
    </div>
  );
}

export default HomePage;
