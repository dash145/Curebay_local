import { useHistory } from 'react-router-dom';
function SectionContainer(props) {
    const history = useHistory();
    const redirectTo = (e, location, data) => {
        e.preventDefault();
        history.push(location, data);
    }
    return (
        <>
           
                <p class="text-xl font-medium text-gray-700">{props.title}</p>
                <div class="flex justify-between ">
                    <p class="text-sm text-gray-400">{props.subtitle}</p>
                    {props.seeAll && <div class="flex pb-3">
                        {/* <span onClick={(e) => redirectTo(e, props.link, props.sendData)} class="flex text-md text-brand-primary font-medium lg:mt-1 mr-1 cursor-pointer mr-12 ">See all&nbsp;<span class="lg:block hidden">{props.seeAll}</span>
                        </span> */}
                        {/* <div class="lg:flex hidden  pl-6">
                            <img src={right} alt="right arrow" />
                            <img src={left} alt="right left" class="pl-6" />
                        </div> */}
                    </div>}
                </div>
         
        </>
    )
}
export default SectionContainer;