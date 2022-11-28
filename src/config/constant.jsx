export const POST_CONSULTATION = "your prescription is in process, please wait for a while or You can check later in your profile";
export const APP_CONFIRMATION = "Appointment Confirmation";
export const FORGOTPASSWORDLINK = "Reset password link sent to your registered email and phone number";
export const NOEMAIL = "Provided Email is not registered with curebay";
export const ELASTIC_URL = "https://api.curebay.squareboat.info/api/v1/";
export const ELASTIC_SEARCH = "https://patient-api-stage.curebay.in/es/";
export const IMG_URL = "https://api-stage.curebay.in/dhpimages/";
export const IMG_URL_PROD = "https://storage.googleapis.com/curebay-prod-application-data/";
export const DICOM_URL = process.env.REACT_APP_DICOM_BASEURL;

export const memberColor = {
    Father: 'indigo',
    Mother: 'cerulean',
    Daughter: 'indigo',
    Self: 'indigo',
    Son: 'indigo',
    Brother: 'secondary',
   Sister: 'lightgreen',
   Relative: 'primary',
   Spouse: 'indigo',
   Grandparent: 'cerulean',
}

export const AddImgUrl = (img) => {
    return img ? process.env.REACT_APP_IMG_BASEURL + img : '';
}