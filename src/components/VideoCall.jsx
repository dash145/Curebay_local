import React, { useEffect, useState } from 'react'
// import videophoto from '../Assets/Images/videophoto.svg';
// import vc from '../Assets/Images/vc.svg';
// import share from '../Assets/Images/share.svg';
// import chaat from '../Assets/Images/chaat.svg';
// import cloud from '../Assets/Images/cloud.svg';
import { APP_ROUTES } from '../application/Router/constants/AppRoutes';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
function VideoCall() {
    const userData = useSelector(state => state.authReducer.patientData)
    const [url, setUrl] = useState('');
    const location = useLocation();
    const history = useHistory();
    const { state } = location;
    const getLink = () => {

      console.log('dcmc',JSON.stringify(location))
        const header = {
            secretKey: process.env.REACT_APP_MAGGIEPLUS_SECRET_KEY
        }
        const data = {
            "clientCode": "CCM@@202!",
            "userType": "HOST",
            "meetingKey": state.id,
            "memberName": userData.firstName,
            "memberEmail": userData.email,
            "memberMobile": userData.mobile
        }
        axios.post(`${process.env.REACT_APP_MAGGIEPLUS}`,
             data, { headers: header }).then(result => {
                    if (state?.consultationsType == "A") {
                      setUrl(result.data.response.url + "/1");
                    } else {
                      setUrl(result.data.response.url);
                    }

            setTimeout(() => {
                document.getElementById("videoframe").style.display = "none";
                document.getElementById("videoload").style.display = "block";
              }, 100);
              setTimeout(() => {
                document.getElementById("videoframe").style.display = "block";
                document.getElementById("videoload").style.display = "none";
              }, 6000);

        }).catch(err => {
            console.log("Err", err)
        })
    }
    useEffect(() => {
        getLink();
    }, [])
    if (!url) {
        return (<p>
            Loading...
        </p>
        )
    }

    const endconsultation = () => {
        history.push(APP_ROUTES.DASHBOARD);
      };

    return (
        <>
         <div className="p-3 md:p-10 flex-col">
             <div className="flex space-x-4 flex-col">
                 <div className="w-full">
                    <div className="relative">
                      <div
                          id="videoload"
                          style={{
                            width: "100px",
                            height: "100px",
                            margin: "auto",
                            textAlign: "center",
                            display: "none",
                          }}
                        >
                  Loading .....
              </div>
              <div id="videoframe">
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<iframe class="myframe"  allow="camera; microphone;" sandbox = "allow-scripts allow-same-origin allow-modals allow-top-navigation" style="width: 100%; height:500px" src=${url} frameborder="0" allowfullscreen showControls ></iframe>`,
                  }}
                ></div>
              </div>
              {/* <img src={vc} alt="vc" className="absolute top-0 right-0" /> */}
            </div>
          </div>


          <div className='self-center mt-8 text-brand-primary'>

          
          {`To view and download your prescription please go to My Profile-->Click on My Health Records-->Click on My Prescription`}

         

          </div>

          <div className="w-full bottom-0 flex justify-center mt-5">
            <button
              onClick={endconsultation}
              className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2"
            >
             { url  &&   ` End Consultation` }
            </button>
            <br />
          </div>
        </div>
      </div>
        </>
    )
}
export default VideoCall;
