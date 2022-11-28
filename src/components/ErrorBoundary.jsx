import React from 'react';
import ErrorImage from "../Assets/Images/errorImage.png"
export default class ErrorBoundary extends React.Component { 
  constructor(props) {
  super(props);
  this.state = { hasError: false };
}

static getDerivedStateFromError(error) {
  // Update state so the next render will show the fallback UI.
  return { hasError: true };
}

componentDidCatch(error, errorInfo) {
  // You can also log the error to an error reporting service
  console.error('Uncaught error:', error, errorInfo);
}

render() {
  if (this.state.hasError) {
    // You can render any custom fallback UI
    return <div className='flex items-center flex-col pt-32 h-screen bg-white'> <div>
      <img src = {ErrorImage} />
      </div>
       <h1 className=' text-xl' >Aaah! something went wrong</h1>
       <p className=' text-md'>Brace yourself till we get the error fixed.</p>
       <p className=' text-md'>You may also refresh the page or try again later</p>
       <button className='bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-6 mr-2 mt-6 cursor-pointer' onClick={() => window.location.reload(true)} >Refresh</button>
       </div>;
  }

  return this.props.children; 
}
}