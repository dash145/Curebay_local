import React, { useEffect, useState} from 'react'
import { youtubeDetails, PrintMedia} from '../../src/helper/youtubeDetails';
import priyadarshi_mohapatra from '../Assets/Images/priyadarshi-mohapatra.png';

import media1 from '../Assets/footerImages/media1.jpg';
import media2 from '../Assets/footerImages/media2.png';
import media3 from '../Assets/footerImages/media3.png';
import media4 from '../Assets/footerImages/media4.jpeg';
import media5 from '../Assets/footerImages/media5.jpg';
import media6 from '../Assets/footerImages/media6.jpg';
import media7 from '../Assets/footerImages/media7.jpg';
import media8 from '../Assets/footerImages/media8.jpg';
import media9 from '../Assets/footerImages/media9.jpg';
import media10 from '../Assets/footerImages/media10.jpg';
import media11 from '../Assets/footerImages/media11.jpg';

import patientService from "../Redux/services/patientService";

const Media = () => {

  const [title, setTitle] = useState('Electronic Media');
  const [media, setMedia] = useState(true);
  const [blog, setblog] = useState(false);


  const [mediaData, setMediaData] = useState([]);
  const [printMediaData, setPrintMediaData] = useState([]);
  const [mediaSelected, setSelectedMedia] = useState("e");

  useEffect(() => {
     window.scrollTo({
         top: 0,
         left: 0,
         behavior: 'smooth'
     })
  });


  useEffect(()=>{
    apiCallingForMedia("e")
  },[mediaSelected])

 const  apiCallingForMedia=(medial)=>{
    setSelectedMedia(medial)
    patientService.getPrintMediaData(medial).then(res =>{
        if(res.data){

            if(medial==="e"){
                setMediaData(res.data)
            }else{
                setPrintMediaData(res.data)
            }
          
        }
      }).catch(err =>{
      })

  }

  const pressessSelection= (e, sel) => {
     if(sel === 'Electronic') {
         setTitle('Electronic Media');
         apiCallingForMedia("e")
         setMedia(true);
     } else if(sel === 'Print'){
        setTitle('Print Media');
        apiCallingForMedia("p")
        setMedia(false);
        setblog(false);
     } else if(sel === 'Blog') {
        setMedia(false);
        setblog(true);
        setTitle('Article, Blogs');
     }
  }
  return (
    <div className='flex flex-col justify-center content-center mb-5'>
        <div className='mt-5 flex gap-2 justify-center'>
             <button className='px-5 py-2 bg-blue-500 font-medium rounded' onClick={(e) => {pressessSelection(e, 'Electronic')}}>Electonic Media</button>
             <button className='px-5 py-2 bg-blue-500 font-medium rounded' onClick={(e) => {pressessSelection(e, 'Print')}}>Print Media</button>
             {/* <button className='px-5 py-2 bg-blue-500 font-medium rounded' onClick={(e) => {pressessSelection(e, 'Blog')}}>Article, Blogs</button> */}
        </div>
        <div>
             <h1 className='fotn-bold text-2xl text-gray-secondary text-center mt-10'> {title} </h1>
        </div>
        { title === "Electronic Media" ?
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3 items-center justify-center content-center my-10'>
                {
                    mediaData.map((items, i) => (
                       <div className='flex flex-col w-full justify-center content-center items-center' key={i}>
                       <iframe height="250" src={items?.url} width="100%"></iframe>
                           <h1 className=' mt-5 text-brand-secondary text-lg font-medium'> {items?.description} </h1>
                       </div>
                   ))
                }
            </div> : 
        <div className='mx-4 md:mx-8'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 my-10'>

           { printMediaData.map((items, i) => (

                <div className='mt-5 flex flex-col justify-center content-center items-center w-full rounded-lg'>
                    <a href={'http://bwdisrupt.businessworld.in/article/CureBay-Is-Building-Healthcare-Ecosystem-For-Underserved/26-02-2022-421457/'} target="_blank">
                        <img className='w-full' src={items.url} alt=""/>
                    </a>
                    <h1 className='mt-5  text-brand-secondary text-lg font-medium'>
                        <a href={items?.linkUrl} target="_blank">{items?.description}</a>
                    </h1>
                </div>
            ))}
            </div>
            </div>
            }

            
               

                


            </div>
           


   
    
  )
}

export default Media;
