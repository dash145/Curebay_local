import right from '../Assets/Images/right.svg';
import left from '../Assets/Images/left.svg';
import { useHistory } from 'react-router-dom';
function SectionContainer(props) {
    const history = useHistory();
    const redirectTo = (e, location) => {
        e.preventDefault();
        history.push(location, props.data);
        // window.history.pushState(JSON.stringify(state), "", getSecuredURL(location));
    }

   
    return (
        <div className="md:flex flex-col lg:ml-0 justify-between mb-4">
            <p className="text-lg sm:text-lg md:text-xl lg:text-xl font-bold text-gray-700 mb-0 flex justify-center mt-4" style={props?.style}>{props.title}</p>
            <div className="flex flex-col md:flex-col  justify-between lg:mt-8">
                {/* <p className="text-sm text-gray-500 font-semibold">{props.subtitle}</p> */}
                {props.seeAll !== 'hide' && <div className="flex lg:pb-3 justify-end items-center">
                    <span onClick={(e) => redirectTo(e, props.link)} className="flex text-lg text-neutral-800 font-semibold mr-1 cursor-pointer border-b-2

border-black">See All
                    </span>


                    <div className={`lg:flex lg:pl-6 hidden`}>
                        <i style={{backgroundColor:"#4FAFD9",color:"#fff",padding:"4px",marginRight:"8px"}} className='pi pi-angle-left cursor-pointer'  onClick={(event) => { props.handelSroll(event, 'leftArrow')}}></i>
                        <i style={{backgroundColor:"#4FAFD9",color:"#fff",padding:"4px"}} className='pi pi-angle-right cursor-pointer' onClick={(event) => { props.handelSroll(event, 'rightArrow')}}></i>
                        {/* <img  className=" cursor-pointer" src={right} alt="right arrow"/>
                        <img src={left} alt="right left" className="pl-6 cursor-pointer" /> */}
                    </div>
                </div>}
            </div>
        </div>
    )
}
export default SectionContainer;
