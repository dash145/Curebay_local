import { useLocation } from "react-router-dom"


const NavBarBackground = () =>{
    const location = useLocation()
      const isBackgroundPresent = () => {
        let banner = location.pathname
    if (banner == "/" || banner == "/sidebar" || banner == "/menu"  || banner == "/medicine" || banner == "/medicineproduct"  || banner == "/comingSoon" || banner == "/medicinedeliveryorderdetails" ||
      banner == "/profile/mydetails" || banner == "/cart" || banner == "/our-team" || banner == "/patientforgetpassword" || banner == "/login" || banner == "/seeallallergy" || banner == "/seeallmedicalhistory  " || banner == "/seeallsurgicalhistory" || banner == "/seeallfamilyhistory" || banner == "/seeallsocialhistory" || banner == "/seeallmedication" || banner == "/seeallmedicalhistory" ||
      banner == "/contact-with-us" || banner == "/Media" || banner == "/aboutus" ||
      banner == "/privacy-policy" || banner == "/terms-and-condition" || banner == "/refund-policy" || banner == "/profile" ||
      banner == "/post_consultation" || banner == "/doctors/:doctid" || banner == "/profile/manageprofile" ||
      banner == "/profile/mymedicalhistory" || banner == "/profile/myreports" || banner == "/profile/mypriscription" ||
      banner == "/profile/labreport" || banner == "/profile/myvitals" || banner == "/profile/appointments" ||
      banner == "/profile/myrequests" || banner == "/profile/laborders" || banner == "/profile/mediceineorders" || banner == "/profile/packagesineorders" || banner == "/profile/payments" || banner == "/profile/wallet" || banner == "/profile/addressbook" || banner == "/profile/changepassword" || banner == "/profile/feedback" || banner == "/profile/notifications/:type" || banner == "/support" || banner == "/labDetails" ) {
      return false
    }else {
      return true
    }
    // banner !== "/" && banner !== "/pharmacycategory" && banner !=="/sidebar" && !scroll ?  "scrolleffect" : banner !== "/" && banner !== "/pharmacycategory" && banner !=="/sidebar" && banner == "/profile/mydetails" ? "noscrolleffect" : ""
  }
    return(
        <div className={isBackgroundPresent() ? " scrolleffect" : "hidden"} style={{marginRight: "-16px" , marginLeft: "-16px"}}>

        </div>
    )
}


export default NavBarBackground
