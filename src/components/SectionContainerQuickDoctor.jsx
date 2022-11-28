import right from '../Assets/Images/right.svg';
import left from '../Assets/Images/left.svg';
import { useHistory } from 'react-router-dom';

function SectionContainerQuickDoctor(props) {
    const history = useHistory();
    const redirectTo = (e, location) => {
        e.preventDefault();
        history.push(location, props.data);
    }
  return (
    <div className="flex justify-between mt-2">
            <p className="text-lg lg:text-xl font-bold md:font-bold text-gray-700">{props.title}</p>
            <div className="flex flex-col md:flex-col justify-between">
                {/* <p className="text-sm text-gray-500 font-semibold">{props.subtitle}</p> */}
                {props.seeAll !== 'hide' && <div className="flex pb-3 justify-end">
                    {/* <span onClick={(e) => redirectTo(e, props.link)} className="flex text-md  text-brand-primary font-medium lg:mt-1 mr-1 cursor-pointer">See all&nbsp;<span className="lg:block hidden">{props.seeAll}</span>
                    </span> */}
                    <div className="lg:flex hidden pl-6">
                        <img src={right} alt="right arrow" onClick={(event) => { props.handelSroll(event, 'leftArrow')}}/>
                        <img src={left} alt="right left" className="pl-6" onClick={(event) => { props.handelSroll(event, 'rightArrow')}}/>
                    </div>
                </div>}
            </div>
        </div>
  )
}

export default SectionContainerQuickDoctor;
