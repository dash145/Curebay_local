import React from 'react'

import mark from '../Assets/Images/mark.png';
import dact from '../Assets/Images/dact.jpg';
import Stethoscope from '../Assets/Images/stethoscope.png';

function Payment() {
    return (
      <>

{/* component to select patient for Payment */}

        <div className="container doctorpayment-content">
            <div className="row">
                <div className="col-md-8">
                <div className="card" style={{borderRadius:'15px',padding:'10px'}}>
                    <div className="card-body">                    
                        <img src={mark} alt="greenicon" className="crdtxt" style={{width:'15px',paddingTop:'4px'}}/>
                        <h6 className="card-title crdtxt" style={{paddingLeft:'10px'}}>Select a Patient</h6>                    
                        <p className="card-text" style={{float:'right',fontSize:'12px',color:'#005d8d',fontWeight:'bold'}}>Add a Patient</p>
                    </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card" style={{borderRadius:'15px'}}>
                                    <div className="card-body text-left smallcard">
                                    
                                  <form action="/action_page.php">
                                    <input type="radio" id="html" name="fav_language" value="HTML" checked/>
                                    </form> 
                                    <img src={dact} alt="Avatar" className="avvt"></img>
                                    <span ><p className="nam">Vijay Sharma</p>
                                        <p style={{fontSize:'10px',color:'#8E9AAB'}}>Myself</p>
                                    </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card" style={{borderRadius:'15px'}}>
                                <div className="card-body text-left smallcard">
                                    
                                    <form action="/action_page.php">
                                      <input type="radio" id="html" name="fav_language" value="HTML"/>
                                      </form> 
                                      <img src={dact} alt="Avatar" className="avvt"></img>
                                      <span ><p className="nam">Vijay Sharma</p>
                                          <p style={{fontSize:'10px',color:'#8E9AAB'}}>Myself</p>
                                      </span>
                                      </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card" style={{borderRadius:'15px'}}>
                                <div className="card-body text-left smallcard">
                                    
                                    <form action="/action_page.php">
                                      <input type="radio" id="html" name="fav_language" value="HTML"/>
                                      </form> 
                                      <img src={dact} alt="Avatar" className="avvt"></img>
                                      <span ><p className="nam">Vijay Sharma</p>
                                          <p style={{fontSize:'10px',color:'#8E9AAB'}}>Myself</p>
                                      </span>
                                      </div>
                                </div>
                                <br/>
                                <button className="btn btn-sm" style={{backgroundColor:'#005d8d',color:'white',float:'right'}}>Pay Now</button>
                            </div>
                            <br/>

                        </div>
                </div>

                </div>

                <div className="col-md-4">
                <div className="card" style={{borderRadius:'15px',padding:'5px'}}>
                    <div className="card-body"> 
                    <h6 className="pd"><b>Price Detail</b> </h6>
                    <hr/>
                            <div className="row">
                                <div className="col-md-2">
                                    <div className="apb" >
                                        <img src={Stethoscope} alt="" style={{width:'20px'}}/>

                                    </div>
                                </div>
                                <div className="col-md-10">
                                    <div className="apc">
                                        <div >
                                            <p className="app" >Dr Pooja Pawar</p>
                                            <div style={{display:'flex', justifyContent:'space-between'}}>
                                            
                                          <div className="ddd" >
                                                <span className="apm">Mother</span>
                                                
                                            </div> 
                                            <p style={{fontSize:'12px'}}>Online</p>
                                            </div>
                                        </div>
                                        <div>
                                        <p className="apo" >Today</p>
                                            <p className="apt"><b>3.30 PM</b></p>
                                            
                                        </div>
                                    </div>
                                </div>
                                
                               
                          </div>
                          <hr />
                          <div className="row">
                          <div className="col-md-12">
                                <button className="btn btn-lg ecc" >
                                    Enter Coupon Code</button>
                            </div>
                            </div>
                           <hr/>
                            <div style={{display:'flex', justifyContent:'space-between'}}>
                                <p style={{marginBottom:'0%',fontSize:'13px'}}>Consultation Fee</p>
                                <p style={{marginBottom:'0%',fontSize:'13px'}}>₹ 3,900/-</p>
                            </div>
                            <div style={{display:'flex', justifyContent:'space-between'}}>
                                <p style={{marginBottom:'0%',fontSize:'13px',color:'#005D8D'}}><b>Discount</b></p>
                                <p style={{marginBottom:'0%',fontSize:'13px',color:'#005D8D'}}><b>-₹ 900/-</b></p>
                            </div>
                            <hr/>
                            <div style={{display:'flex', justifyContent:'space-between'}}>
                                <p style={{marginBottom:'0%',fontSize:'13px',color:'#005D8D'}}><b>Total</b></p>
                                <p style={{marginBottom:'0%',fontSize:'13px',color:'#005D8D'}}><b>₹ 3,000/-</b></p>
                            </div>

                        </div>

                    </div>
                </div>
               

            </div>
            <br/><br/>
        </div>
       
        </>
    );
}
export default Payment;
