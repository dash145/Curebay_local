/* This example requires Tailwind CSS v2.0+ */
import React from 'react'
import Userprofilesidebar from '../userprofilesidebar';
import { useHistory, useLocation } from 'react-router-dom';

function Bloodpressure() {

    const userData = useSelector(state => state.authReducer.patientData)
    console.log("userData", userData)

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (userData?.id) {
            console.log("patientinfo", userData.code)
        }
        else {
            history.push({ pathname: APP_ROUTES.LOGIN, state: { background: location, login: true } });
        }

    }, []);
    return (
        <>


            <div className="flex justify-between ">


                <div className="w-full mr-12  ">

                    <div className="rounded-lg shadow-lg bg-white-600 w-full h-112 p-5 antialiased justify-between border border-gray-200">

                        <div className="flex justify-between">

                            <p className="text-medium font-medium text-2xl   ">Blood Pressure</p>

                            <p className="text-sm text-brand-secondary font-medium pr-4 py-4">x</p>
                        </div>

                        <hr classname="border-dash text-black w-10 mt-4 h-20 my-2"></hr>

                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Entry Date
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Syst
                                    </th>


                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Dia
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">

                                <tr >
                                    <td className="px-6 py-4 whitespace-nowrap flex items-center  flex space-x-6 text-sm font-medium text-gray-500 ">
                                        12/07/1997
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500 "> 120</div>

                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-500 ">
                                            80
                                        </span>
                                    </td>



                                </tr>



                                <tr >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">

                                            <div className=" flex space-x-6">

                                                <div className="text-sm font-medium text-gray-500 ">12/07/1997</div>

                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500 "> 120</div>

                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-500 ">
                                            80
                                        </span>
                                    </td>



                                </tr>






                            </tbody>
                        </table>




                    </div>

                </div>
            </div>

        </>
    )
}
export default Bloodpressure;
