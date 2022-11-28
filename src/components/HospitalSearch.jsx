import { useState } from "react";
import bethanyhospital from "../Assets/Images/bethanyhospital.svg";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { gethospitallist } from "../Redux/Actions/hospitalpageActions";
import InfiniteScroll from "react-infinite-scroller";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";

function HospitalSearch() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { data } = location;
  const [keyword, setKeyword] = useState("");
  const [hospitallistData, setHospitallist] = useState([]);
  const userData = useSelector((state) => state.authReducer.patientData);

  const [pageStart, setPageStart] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  //const hospitallist = useSelector((state) => state.hospitallist);
  const { coords } = useSelector((state) => state.authReducer);
  const paricularhospital = useSelector((state) => state.particularhospital);
  const { particularhospitalData, isLoading } = paricularhospital;
  // const {  total, currentPage, isLoading } = hospitallist;

  const viewDetails = (e, hosp) => {
    e.preventDefault();
    // console.log(hosp.code)
    history.push({
      pathname: `/hospitaldetails/${hosp.locationCode}`,
      state: hosp,
    });
  };

  const history = useHistory();

  const redirectTo = (event, location) => {
    event.preventDefault();
    history.push(location);
  };

  const loadFunc = async () => {
    dispatch(gethospitallist(coords, "", pageStart, 20)).then((res) => {
      if (res.length === 0) {
        setHasMore(false);
      } else {

        if (res.length) {
          setHospitallist([...hospitallistData, ...res]);
        } else {
          setHospitallist(res);
        }

        setPageStart(pageStart + 1);
        //setfetchingData(false);

        setHasMore(true);
      }
    });
  };

  const handleImgError = (e) => {
    e.target.src = bethanyhospital;
  };



  const onGotoEnquiryForm = (e) => {
    if (!userData.code) {
      redirectTo(e, { pathname: APP_ROUTES.LOGIN, state: { background: location, login: true } })
    } else {
      history.push({ pathname: APP_ROUTES.HOSPITAL_ENQUIRY, search: `hospitalcode=${particularhospitalData[0].hospitalCode}&code=${particularhospitalData[0].code}` })

    }




  }

  console.log(hospitallistData, "hospitallistData");
  return (
    <>
      <div className="">
        <div className="lg:block  ">{/* <SearchBar data={data} /> */}</div>
        <ul className="lg:flex hidden text-brand-secondary text-sm lg:text-base  pt-5">
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
            <a >Hospitals</a>
            
          </li>
          
        </ul>
        {/* <p className="text-base pt-3 pb-2 text-gray-primary">No Results found for {state}</p> */}
        {/* <p className="text-sm text-gray-secondary font-medium">Showing Results for “Bethany Hospital” instead</p> */}
        <div className="rounded-lg  bg-white-600 w-full  p-5 mt-3 antialiased justify-between border border-gray-200  lg:pb-4 mb-10 overflow-hidden">


          <div
            style={{
              overflow: "auto",
              display: "flex",
              flexDirection: "column-reverse overflow-hidden",
            }}
          >
            <InfiniteScroll
              pageStart={0}
              loadMore={(e) => loadFunc(e)}
              hasMore={hasMore}
              loader={
                <div className="flex flex-wrap justify-center pl-10 pr-10 pb-10 overflow-hidden">
                  <div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20 overflow-hidden" />
                </div>
              }
            >
              {hospitallistData &&
                hospitallistData.length > 0 &&
                hospitallistData.map((data, i) => {


                  return (
                    <>
                      <div className="md:flex  justify-center overflow-hidden" key={i}>

                        <div className="md:flex flex-1 ">
                          <img
                            src={
                              data.hospitalPhoto
                                ? `${process.env.REACT_APP_IMG_BASEURL}${data.hospitalPhoto}`
                                : bethanyhospital
                            }
                            alt="HospitalImage"
                            style={{objectFit: "fill"}}
                            className=" lg:w-56 w-11/12 h-44 lg:h-56 object-fill lg:rounded-xl rounded-md"
                            onError={handleImgError}
                          />


                          <div className="flex lg:ml-10 lg:w-8/12">
                            <div>

                            <p className="text-2xl font-semibold">
                              {data?.hospitalName}
                            </p>
                            <div className="flex pr-5"></div>


                            <div className="sm:flex flex-1 mt-5">
                            <p className="text-sm text-brand-secondary mr-2 ">
                                Location
                              </p>
                              <p className="text-sm text-gray-400 font-normal">
                                {data?.address1},{data?.address2},{data?.city}{" "}
                              </p>
                            </div>
                            <div className="sm:flex flex-1 mt-2">
                              <p className="text-sm text-brand-secondary mr-2">
                                Hours
                              </p>
                              <p className="text-sm text-gray-400 font-normal">
                                Open 24 hours{" "}
                              </p>
                              </div>

                              <div className="sm:flex flex-1 mt-2">
                              <p className="text-sm text-brand-secondary mr-2">
                                About
                              </p>
                              <p className="text-sm text-gray-400 font-normal">
                               {data.description}
                              </p>
                              </div>
                            </div>
                          </div>




                        </div>


                        <div className="m-auto h-min md:mt-0 mt-5 ">
                            <button
                              onClick={(e) => viewDetails(e, data)}
                              className="bg-white m-3 md:mr-10 border border-brand-primary font-semibold text-brand-secondary py-1 px-3 rounded-xl"
                            >
                              View Details
                            </button>
                            <button
                              onClick={(e) => {
                                if (!userData.code) {
                                  redirectTo(e, {
                                    pathname: APP_ROUTES.LOGIN,
                                    state: {
                                      background: location,
                                      login: true,
                                    },
                                  });
                                } else {

                                  history.push({ pathname: APP_ROUTES.HOSPITAL_ENQUIRY, search: `hospitalcode=${data.code}&code=${data.locationCode}` })

                                  // history.push({
                                  //   pathname: APP_ROUTES.HOSPITAL_ENQUIRY,
                                  //   state: data,
                                  // });
                                }
                              }}
                              className="bg-brand-secondary  text-white py-1 px-6 font-semibold rounded-xl"
                            >
                              Enquire{" "}
                            </button>
                          </div>

                      </div>
                      <hr className="my-4" />
                    </>
                  );
                })}
            </InfiniteScroll>
          </div>
        </div>

        <div className="mb-20"></div>
      </div>
    </>
  );
}

export default HospitalSearch;
