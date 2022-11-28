import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
let MapmyIndia;
let navigator;


function Mapp() {
    const coords = useSelector(state => state.authReducer.coords);
    function loadMap() {
        var apiUrl = 'http://3.138.190.64:8080/dhp/MMI/accesstoken';
        fetch(apiUrl).then(response => {
            return response.json();
        }).then(async (data) => {
            await loadScript("https://apis.mapmyindia.com/advancedmaps/api/" + data.access_token + "/map_sdk_plugins");
            await loadScript("https://apis.mapmyindia.com/advancedmaps/v1/" + data.access_token + "/map_load?v=1.3");
            loadMapF();

        }).catch(err => {
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
            var centre = new window.L.LatLng(coords.lat, coords.long);
            console.log("cener", centre)
            let map = new window.MapmyIndia.Map(document.getElementById("map"), {
                center: centre,
                zoom: 15,
                search: true,
                zoomControl: true,
                hybrid: true,
                location: true
            });

            // let options = {
            //     map: map,
            //     callback: callback_method,
            //     search: true,
            // };
            // let picker = new window.MapmyIndia.placePicker(options);

            // let options = {
            //     map: map,
            //     callback: callback_method,
            //     search: true,
            // };
            // let picker = new window.MapmyIndia.placePicker(options);
            let geoData={
                "type": "FeatureCollection",
                "features": [{
                "type": "Feature",
                "properties": {"htmlPopup":"noida"},
                "geometry": {"type": "Point",
                "coordinates": [28.544,77.5454]}
                },{
                "type": "Feature",
                "properties": {"htmlPopup":"faridabad"},
                "geometry": {"type": "Point",
                "coordinates": [28.27189158,77.2158203125]}
                },{
                "type": "Feature",
                "properties": {"htmlPopup":"delhi"},
                "geometry": {"type": "Point",
                "coordinates": [28.549511,77.2678250]}
                }]
            };
            let marker=MapmyIndia.Marker({map:map,position:geoData,icon_url:'https://apis.mapmyindia.com/map_v3/1.png',clusters:true,fitbounds:true,fitboundOptions:{padding: 120,duration:1000},popupOptions:{offset: {'bottom': [0, -20]}}});


        }
    }
    return (
        <div id="map" style={{ width: '100%', height: '310px', borderRadius:10 }}>{loadMap()}</div>
    );
}
export default Mapp;