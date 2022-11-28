import React from 'react'

function Modal(props) {

    if(!props.show){
        return null
    }

  return (
    <div className="  items-center justify-center">

        <div className="">

            <div className="">
                <h1 className="">Modal Title</h1>
            </div>

            <div className="">
                This is modal content
            </div>

            <div className="">
                <button className="">Close</button>
            </div>

        </div>
      
    </div>
  )
}

export default Modal
