import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import http from '../Redux/services/http-common';
import { setLatLong, setAddressString, actioncustomPinCode } from '../Redux/Actions/userActions';
import { secureStorage } from "../Redux/Reducers/authReducer";

function Mapp(props) {
    const dispatch = useDispatch();
    const coords = useSelector(state => state.authReducer.coords);
    const [value , setValue] = useState(0);
    function LatLong(position) {
        const { latitude, longitude } = position;
        console.log("coords", coords)
        var coordsObj = {
            lat: latitude,
            long: longitude
        }
        secureStorage.setItem('coords', coordsObj);

        dispatch(setLatLong(coordsObj));

    }


    function loadMap() {
        var apiUrl = 'MMI/accesstoken'
        http.get(apiUrl).then(async (response) => {
            let data = response.data;
            console.log("res", data)
            await loadScript("https://apis.mapmyindia.com/advancedmaps/api/" + data.access_token + "/map_sdk_plugins");
            await loadScript("https://apis.mapmyindia.com/advancedmaps/v1/" + data.access_token + "/map_load?v=1.3");
            loadMapF();
        });
        function loadScript(src) {
            return new Promise((resolve) => {
                const script = document.createElement("script");
                script.src = src;
                script.onload = () => {
                    resolve(true)
                };
                document.head.appendChild(script);
            })
        }
        function loadMapF() {
            var centre = new window.L.LatLng(coords.lat ? coords.lat : '', coords.long ? coords.long : '');
            console.log("cener", centre)
            let map = new window.MapmyIndia.Map(document.getElementById("map"), {
                center: centre.lat ? centre : [20.2961 , 85.8245],
                zoom: 15,
                search: true,
                zoomControl: true,
                hybrid: true,
                location: true
            });
            let options = {
                map: map,
                callback: callback_method,
                search: true,
            };
            new window.MapmyIndia.placePicker(options);
            var optional_config={
                location: [20.2961 , 85.8245],
                pod:'City',
                bridge:true,
                distance:true,
                width:300,
                height:300
            };
            new window.MapmyIndia.search(document.getElementById("mmiSearch_map"),optional_config,callback_method);
            let marker;
            function callback_method(data) {
                console.log("TestingLocationjkbkjb", data)
                if (data ) {
                    let addressString = data?.city;
                    if(!data[0]){
                        props.onClose();
                    }
                    
                    dispatch(setAddressString(addressString));
                    dispatch(actioncustomPinCode({pincode: data.pincode , location:'map'}));
                    // secureStorage.setItem('address', addressString);
                }
                if (data && data.lat && data.lng) {
                    console.log("addressString", "Testinglocation");
                    let cor = { latitude: data.lat, longitude: data.lng };
                    elocData(cor);
                } if(data){
                    let dt=data[0];
                    if(!dt) return false;
                    let eloc=dt.eLoc;
                    let lat=dt.latitude,lng=dt.longitude;
                    
                    let place=dt.placeName+(dt.placeAddress?", "+dt.placeAddress:"");
                    /*Use elocMarker Plugin to add marker*/
                    if(marker) marker.remove();
                    if(eloc) marker=new window.MapmyIndia.elocMarker({map:map,eloc:lat?lat+","+lng:eloc,popupHtml:place,popupOptions:{openPopup:true}}).fitbounds();
                }
                else {
                    var elocObj = new window.MapmyIndia.getEloc({ map: map, eloc: data.eLoc, callback: elocData });
                }
            }
            function elocData(data) {
                console.log("convert data", data);
                LatLong(data);
            }
            document.getElementById('mmiPickerTop').style.visibility = "hidden";
            document.getElementById('Dv_mmiSearch_map').style.visibility = "visible";
           
            document.getElementById('mmiSearch_map').addEventListener('click' , (e) =>{
                document.getElementById('mmiSearch_map').focus();
            });
            document.getElementById('mmiSearch_map').addEventListener('keypress' , (e) =>{
                document.getElementById('mmiSearch_map').focus();
            })
            map.on("click", function (e) {

                var pt = e.latlng; //event returns lat lng of clicked point
                console.log("clikc", pt)
                centre = pt;
            });
        }
    }
    useEffect(() => {
        loadMap();
    }, [coords.lat])
    return (
        <>
        <div id="map" className="w-full mapContainer" style={{ height: '310px', zIndex: 50 }}></div>
        </>
    );
}
export default Mapp;