import React , {useMemo} from 'react';
import NavBarSearch from '../../components/navbarSearch';
import DoctorsList from '../../components/Doctors';
import Speciality from '../../components/speciality';
import CHC from '../../components/commonHealthconcern';
import Membership from '../../components/membership';
import HIWDoctor from '../../components/HIWdoctor';
import FAQ from '../../components/collapse_doctor';
import Benifits from '../../components/benefits_doctors';
import { useHistory, useLocation } from 'react-router-dom';

// function useQuery() {
// 	const { search } = useLocation();
  
// 	return useMemo(() => new URLSearchParams(search), [search]);
//   }
function Doctors() {
  const [screen, setscreen] = React.useState(window.innerWidth);
  	// let query = useQuery();
	return (
		<>
			<DoctorsList  />
			<Speciality />
			<CHC />
			<Membership screen={screen}/>
			<div className="lg:bg-white rounded-3xl py-2 content-center lg:shadow-sm m-4 px-3 justify-center">
				<HIWDoctor />
				<Benifits />
				<FAQ />
			</div>
		</>
	);
}
export default Doctors;
