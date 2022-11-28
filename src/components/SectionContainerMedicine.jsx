import right from '../Assets/Images/right.svg';
import left from '../Assets/Images/left.svg';
import { useHistory } from 'react-router-dom';
function SectionContainerMedicine(props) {
    const history = useHistory();
    const redirectTo = (e, location) => {
        e.preventDefault();
        history.push(location, props.data);
        // window.history.pushState(JSON.stringify(state), "", getSecuredURL(location));
    }

   
    return (
        <div className="md:flex flex-col lg:ml-0 justify-between mt-4">
            <p className="text-lg sm:text-lg md:text-xl lg:text-xl font-bold text-gray-700 mb-0 flex justify-center mt-4" style={props?.style}>{props.title}</p>
            <div className="flex flex-col md:flex-col  justify-between lg:mt-8">
                {/* <p className="text-sm text-gray-500 font-semibold">{props.subtitle}</p> */}
                {props.seeAll !== 'hide' && <div className="flex lg:pb-3 justify-end items-center">
                    
                </div>}
            </div>
        </div>
    )
}
export default SectionContainerMedicine;
