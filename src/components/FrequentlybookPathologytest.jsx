import React from 'react'
import checkmark from '../Assets/Images/checkmark.svg';
import SectionContainer from './SectionContainer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPathologyTestlist } from '../Redux/Actions/DiagnosticsActions';
import { APP_ROUTES } from '../application/Router/constants/AppRoutes';
import { useHistory } from 'react-router-dom';
function FrequentlybookPathologytest(props) {

  const dispatch = useDispatch();
  const history = useHistory();
  const pathListData = useSelector(state => state.pathoLogyReducer);
  const { pathlogyTestData } = pathListData

  useEffect(() => {
    dispatch(getPathologyTestlist());
  }, []);

  const redirectTo = (event, data) => {
    event.preventDefault();
    history.push({ pathname: APP_ROUTES.COMPLETEBLOOD_COUNTTEST, state: data });
  };

  const pathLogyTestFilter = () => {

    var map = {}, node, roots = [], i;

    for (i = 0; i < pathlogyTestData.length; i += 1) {
      map[pathlogyTestData[i].id] = i; // initialize the map
      pathlogyTestData[i]['children'] = []; // initialize the children
    }

    for (i = 0; i < pathlogyTestData.length; i += 1) {
      node = pathlogyTestData[i];
      if (node.parentId !== "0") {
        // if you have dangling branches check that map[node.parentId] exists
        pathlogyTestData[map[node.parentId]]?.children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }

  useEffect(() => {
    if (pathlogyTestData.id) {
      pathLogyTestFilter();
    }
  }, [pathlogyTestData])


  return (
    <>
      <div className="flex flex-col  ml-4 p-auto">
        <SectionContainer title={props.text ? props.text : 'Frequently Booked Pathology Tests'} subtitle={'Some recent and most booked tests by our users'} seeAll={'Specialities'} />
        <div className="w-full lg:max-w-full lg:flex ">
          <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
            <div className="flex flex-nowrap   space-x-6">
              {pathLogyTestFilter().slice(0, 8).map((res, i) => (
                <div key={i} className="w-3/12 p-4 h-58 bg-white border border-gray-100 shadow-sm rounded-lg m-auto flex-none bg-cover overflow-hidden">
                  <div className="font-medium text-gray-600   text-base ">
                    <p className="">{res.name}</p>
                    <p className="font-normal text-gray-500  text-sm ">
                      {res.description}</p>
                  </div>
                  <div className="mt-4 border-t"></div>
                  {res?.children.slice(0, 3).map((col, j) => (
                    <div key={j} className="flex py-2 pt-4 h-12" >
                      <img src={checkmark} alt="checkmark" className="h-3" />
                      <p className="text-brand-secondarylg:text-sm text-md font-medium  pl-6">{col.name}</p>
                    </div>
                  ))}
                  <div className="mt-6 border-t"></div>
                  <div className="m-2 ">
                    <button onClick={(e) => redirectTo(e, res)} className="bg-brand-secondary font-medium text-white py-2 px-4 rounded-lg w-full">Book Now</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default FrequentlybookPathologytest;