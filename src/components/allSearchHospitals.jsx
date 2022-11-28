import rooms1 from "../Assets/Images/room1.svg";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";
import { Link, useHistory } from "react-router-dom";
import SectionContainer from "./SectionContainer";
import bethanyhospital from "../Assets/Images/bethanyhospital.svg";
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';  
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

function AllHospitals(props) {
  const history = useHistory();

  const viewDetails = (e, hosp) => {
    e.preventDefault();
    console.log(hosp.code);

    history.push({ pathname: `/hospitaldetails/${hosp.locationCode}`, state: hosp });
    // history.push({
    //   pathname: `/hospitaldetails/${hosp.hospitalCode}`,
    //   state: hosp,
    // });
  };

  const handleImgError = (e) => {
    e.target.src = bethanyhospital;
  };

  return (
    <>
      <div className="flex flex-col m-auto px-4 ">
        {!props.isLoading && props.data && props.data.length != 0 && (
          <SectionContainer
            link={APP_ROUTES.HOSPITAL_SEARCH}
            title={"Available Hospitals"}
            subtitle={"Get treatment from the best hospitals"}
            seeAll={"Hospitals"}
          />
        )}

        <div className="w-full lg:max-w-full lg:flex ">
          <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
            <div className="flex flex-nowrap space-x-3">
              {props.data.map((hosp,i) => {
                // let link = hosp?._source ? hosp._source : {};
                return (
                  <div onClick={(e) => viewDetails(e, hosp)} className="hos_slide_list translate-x-0 border  leading-normal bg-white shadow-sm flex-none bg-cover overflow-hidden " style={{ width: "230px", height: "263px" }} key={i}>
                                        <div className="flex text-center justify-center content-center">
                                            <img className="" style={{ width: "228px", height: "153px" }} src={hosp.hospitalPhoto ? `${process.env.REACT_APP_IMG_BASEURL}${hosp.hospitalPhoto}` : rooms1} alt="rooms1"
                                                onError={handleImgError}



                                            />
                                            {/* <div className="absolute bottom-0 right-0 h-16 w-16">₹ 1500/bed</div> */}
                                        </div>
                                        <div className=" lg:my-3">
                                            <div className="flex justify-center text-base lg:text-gray-700 h-6 lg:h-auto text-gray-800  text-md mt-2">
                                                <h5 className="truncate font-bold">{hosp.hospitalName}</h5>
                                            </div>
                                            <div className="lg:flex md:flex justify-center lg:mt-2">
                                                <div className="flex justify-center items-center">
                                                    <RoomOutlinedIcon style={{ height: "18.28px", color: "#66B889" }} />
                                                    <p className="text-gray-500 font-normal text-sm md:text-xs lg:text-sm">{hosp.city ? hosp.city : 'NA'} </p>
                                                </div>

                                            </div>
                                            <div className="flex lg:my-2 my-2">
                                                <button onClick={
                                                    (e) => viewDetails(e, hosp)
                                                }
                                                    className="lg:bg-transparent md:bg-white lg:bg-white w-full text-xs md:text-sm lg:text-xs font-medium  text-white lg:px-4 py-2  hover:border-transparent " style={{ background: "#EAF8FF", color: "#18406D" }}>View Details <span><ArrowForwardIosOutlinedIcon style={{ color: "#18406D", height: "10.62px" }} /></span>
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                );
              })}
            </div>
          </div>
        </div>
        {!props.isLoading && props.data && props.data.length === 0 && <p>No Hospitals available</p>}
        {props.isLoading && (
          <div className="flex flex-wrap justify-center">
            <div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20" />
          </div>
        )}
      </div>
    </>
  );
}
export default AllHospitals;
