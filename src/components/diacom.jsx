import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
function Diacom() {

    const location = useLocation();
    const { state } = location;
    const [url, setUrl] = useState();
    const authenticate = () => {
        let data = {
            "username": "integration",
            "password": "integration"
        }
        axios.post('http://34.93.208.217/integration/authenticate', data).then(result => {
            let token = result.data?.token;
            getDiacomUrl(token);
        }).catch(err => {
            console.log("Err", err);
        })
    }

    const getDiacomUrl = (token) => {
        let header = {
            "Authorization": "Bearer "+token
        }
        console.log("header",header)
        axios.post(`http://34.93.208.217/integration/viewer/${'20210813_123441974'}/`,{},{headers:header}).then(result => {
            let url = result.data?.details;
            let iframe = `<iframe height="465" style="width: 100%;"  src="${url}"></iframe>`;
            setUrl(iframe);
        }).catch(err => {
            console.log("err", err)
        })
    }

    useEffect(() => {
        authenticate();
    }, [])


    // lab-tests-order-report-controller


    return (
        <div style={{ marginTop: 10, marginBottom: 10, width: '00px', height: '650px', zIndex: -9999 }}>
            {!url ? <p className="w-48">Loading Diacom File ...</p> :
                <div className="bg-gray-100 lg:py-4">
                    <div dangerouslySetInnerHTML={{ __html: url }} />
                </div>
            }

        </div>
    );
}
export default Diacom;