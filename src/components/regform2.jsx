import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { addRegistration } from '../Redux/Actions/registrationAction';
import { verifyRegOtp, setLoginModal, } from '../Redux/Actions/userActions';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup'
import { connect } from 'react-redux';
import { Dialog } from "primereact/dialog";
import { XIcon } from '@heroicons/react/outline'
import { data } from 'autoprefixer';

const validationSchema = Yup.object({
    firstName: Yup.string().min(3, 'Too Short!').required('Required'),
    email: Yup.string().email('Invalid Email Id').required('Email Id is Required'),
});


const RegForm = (props) => {

    const history = useHistory();
    const [msg, setMsg] = useState('');
    const [color, setColor] = useState('red');
    const [showLoader, setLoader] = useState(false);
    const [consent, setConsent] = useState(true);
    const [consentPrivacy, setConsentPrivacy] = useState(true);
    const [openConsent, setOpenConsent] = useState(false);
    const [openConsentPrivacy, setOpenConsentPrivacy] = useState(false);
    const dispatch = useDispatch();
    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            "address1": "",
            "city": "",
            "code": "",
            "country": "",
            "createdBy": "DHPADMIN",
            "dob": "",
            "email": "",
            "firstName": "",
            "gender": "",
            "isApproved": 1,
            "lastName": "",
            "mobile": props.mobileNo,
            "pinCode": "",
            "referredBy": "DHPADMIN",
            "modifiedBy": "DHPADMIN",
            "roleCode": "PATIENT",
            "salutation": "",
            "source": "",
            "state": "",
            "status": 1
        },
        validateOnChange: false,
        validationSchema,
        onSubmit(values) {
            setLoader(true);
            setMsg('');
            console.log("register call")
            // var code = values.email;
            // values.code = code
            dispatch(addRegistration(values)).then((result) => {
                console.log("result", result, result.statusCode);
                if (result && result?.details?.length > 0) {
                    // alert("hello")
                    setColor('red')
                    setLoader(false);
                    setMsg(result.details[0])



                    // alert("Something went wrong!")

                }
                else {
                    setColor('green');
                    setLoader(false);
                    setMsg("You are successfully registered!")
                    setTimeout(() => {
                        props.setLoginModal(false)
                    }, 2000)
                }
            }).catch((error) => {
                setLoader(false);
                setMsg(error.response.data.details[0]);
            });

            // await addRegistration(values).then((result) => {
            //     debugger
            //     console.log("result", result)
            //     if (result && result?.details?.length > 0) {
            //         setColor('red')
            //         setLoader(false);
            //         setMsg(result.details[0])
            //     }
            //     else {
            //         setColor('green');
            //         setLoader(false);
            //         setMsg("Registration successfully completed")
            //         setTimeout(()=>{
            //             props.setLoginModal(false)
            //         },2000)
            //     }
            // })
        }
    })
    console.log("err", errors)

    return (
        <>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-6">
                    <span className={` font-normal text-gray-secondary text-xs  tracking-widest`}>{'Enter Name *'}</span>
                    <div className="flex relative">
                        <input
                            type="text"
                            name="firstName"
                            id="sign-in-email-register"
                            className={`appearance-none text-sm  border-b  w-full py-1 bg-white placeholder-gray-secondary  focus:outline-none ${'border-gray-highlight'
                                }`}
                            placeholder="Enter Your Name"
                            value={values.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.firstName && <div style={{ color: 'red', fontSize: 12 }}>{errors.firstName}</div>}
                </div>
                <div className="flex flex-col mb-6">
                    <span className={` font-normal text-gray-secondary text-xs  tracking-widest`}>{'Enter Phone Number *'}</span>
                    <div className="flex relative">
                        <input
                            type="text"
                            name="mobileNo"
                            id="sign-in-email-register"
                            className={`appearance-none text-sm  border-b  w-full py-1 bg-white placeholder-gray-secondary  focus:outline-none ${'border-gray-highlight'
                                }`}
                            disabled
                            placeholder="Enter Your Phone Number"
                            value={props.mobileNo}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.mobile && <div style={{ color: 'red', fontSize: 12 }}>{errors.mobile}</div>}
                </div>
                <div className="flex flex-col mb-6">
                    <span className={` font-normal text-gray-secondary text-xs  tracking-widest`}>{'Enter Your Email Address*'}</span>
                    <div className="flex relative">
                        <input
                            type="text"
                            name="email"
                            id="sign-in-email-register"
                            className={`appearance-none text-sm  border-b  w-full py-1 bg-white placeholder-gray-secondary  focus:outline-none ${'border-gray-highlight'
                                }`}
                            placeholder="Enter Your Email Address"
                            value={props.email}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.email && <div style={{ color: 'red', fontSize: 12 }}>{errors.email}</div>}
                </div>
                <div className="flex items-start">
                    <input
                        className="mt-1"
                        onChange={() => setConsent(!consent)}
                        type="checkbox" />
                    <p className="ml-2  text-sm">I hereby accept and consent to be governed by these <span className="cursor-pointer text-brand-secondary font-medium" onClick={() => setOpenConsent(true)}>Terms of Use</span></p> 
                </div>

                <div className="flex items-start">
                    <input
                        className="mt-1"
                        onChange={() => setConsentPrivacy(!consentPrivacy)}
                        type="checkbox" />
                    <p className="ml-2  text-sm">I hereby accept and consent to be governed by these <span className="cursor-pointer text-brand-secondary font-medium" onClick={() => setOpenConsentPrivacy(true)}>Privacy & Policy</span></p> 
                </div>
                <div className="flex w-full my-5">
                    <button
                        disabled={consent || consentPrivacy}
                        type="submit"
                        className="p-2 bg-brand-secondary  text-white w-full  rounded-lg text-center text-base font-normal disabled:opacity-50"
                    >
                        Sign Up
                        {showLoader && <div className="loader float-right ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-5 w-5"></div>}
                    </button>
                </div>
                {msg && <div className="my-2" style={{ color: color, fontSize: 12 }}>{msg}</div>}
            </form>

            <Dialog
                header="Terms of Use"
                visible={openConsent}
                modal={true}
                // style={{ width: "800px", height: 'auto' }}
                className="w-11/12 md:w-8/12 lg:w-9/12 "
                onHide={() => setOpenConsent(false)}
            >
                <>
                    <div className=" mb-7 mt-4" >

                        <div className="mx-4 ">
                            

                            <p>
                                Thank you for visiting our application (the “<b>Platform</b>”). The Platform is owned and
                                operated by <b>CUREBAY TECHNOLOGIES PRIVATE LIMITED</b>, a company incorporated under Companies
                                Act, 2013 whose registered office is at Plot No. A-98, Budha Nagar, Laxmisagar,
                                Bhubaneswar Khordha, Odisha 751006. <b>CureBay</b> <b>we</b>, <b>our</b>, <b>us</b> which expression shall, unless
                                it be repugnant to the context or meaning thereof, include our successors and assigns.
                                <br />
                                Your access or use of this Platform, any transactions undertaken, and any services
                                availed through the Platform are governed by the terms of use provided herein (the “<b>Terms</b>”).
                                Alongside, our <b><span className='cursor-pointer' onClick={() => history.push('/privacy-policy')}>privacy policy</span></b> forms an integral part of the Terms. The
                                Terms are intended to create a binding contract between you and <b>CureBay</b>.
                                <br />
                                You are required to express your consent to these Terms before you access or use the Platform,
                                directly or indirectly through social media platforms like Facebook, Twitter, Google+ and
                                other similar social forums (the “<b>Social Media</b>”).
                                <br />
                                We reserve the right to amend the Terms herein, in whole or in part, from time to time and
                                provide notice to you upon such amendment. Your continued use of the Platform, post any
                                update to the Terms would mean your acceptance. If you do not agree to such amendments,
                                you must contact us at (<a className="text-blue-500" href="mailto: support@Curebay.com">Support@Curebay.com</a>). The amended Terms shall be made available
                                on the Platform promptly, and hence, you are required to review the Terms periodically to
                                keep yourself aware and up to date.
                            </p>
                            <p>These Terms include:</p>
                            <ul className="font-normal mb-4 ml-8" style={{ listStyleType: "circle" }}>
                                <li>Eligibility of users</li>
                                <li>How to use? </li>
                                <li>Services</li>
                                <li>Special terms for special Services </li>
                                <li>Why do we collect some information? </li>
                                <li>Data protection & Privacy</li>
                                <li>Payment</li>
                                <li>User conduct</li>
                                <li>Proprietary rights and license</li>
                                <li>Availability of the Platform</li>
                                <li>Reviews & feedback</li>
                                <li>Disclaimer of warranties</li>
                                <li>Limitation of liability</li>
                                <li>Indemnification</li>
                                <li>Termination</li>
                                <li>Governing law & dispute resolution</li>
                                <li>Severability & waiver</li>
                                <li>Contact us</li>
                            </ul>

                            <p>
                                <b>
                                    PLEASE READ THE TERMS OF USE AND REFERRED POLICIES CAREFULLY BEFORE YOU CONTINUE USING PLATFORM IN ANY MANNER. YOUR CONSENT
                                    IS REQUIRED TO THESE TERMS OF USE, WHICH UPON CONSENT WILL BE A BINDING CONTRACT BETWEEN YOU AND CUREBAY TECHNOLOGIES PRIVATE LIMITED. IF
                                    YOU DO NOT WISH TO CONSENT, YOU ARE ADVISED NOT TO USE THE PLATFORM. IF YOU DO NOT CONSENT BUT CONTINUE TO USE THE PLATFORM, AN IMPLIED CONSENT
                                    SHALL BE INFERRED FROM YOUR ACTION OF USING THE PLATFORM.
                                </b>
                            </p>


                            <ol className="font-normal mb-4 ml-6" style={{ listStyleType: "number" }}>
                                <li className="font-semibold">Eligibility of Users</li>
                                <p>
                                    In order to access, use, browse, view or perform any activities on the Platform, you must be above 18 years of age,
                                    and competent to contract in terms of the Indian Contract Act, 1872. By accessing, using, browsing, or performing any
                                    other activity on the Platform, you hereby agree and represent that you are of a legal age and competent to enter
                                    into a contract under the Indian Contracts Act, 1872 or you have the permission of your parent and/or guardian to do so.
                                </p>

                                <li className="font-semibold">How to use?</li>
                                <p>
                                    For using the Platform, you will be required to create a unique user id and password. You must ensure that the
                                    unique id and password are at all times kept confidential, and not disclosed to any third party without your
                                    free consent. We do not allow multiple users to use the same user id and password.
                                </p>

                                <p>During registration, you will be required to provide the following personal information:</p>

                                <ol className="font-normal mb-4 ml-6" style={{ listStyleType: "square" }}>
                                    <li>Name</li>
                                    <li>E-mail address</li>
                                    <li>Address</li>
                                    <li>Gender</li>
                                    <li>Age</li>
                                    <li>Phone number</li>
                                    <li>User ID and password that you create</li>
                                    <li>Payment information if required</li>
                                    <li>Other information as relevant or as you may voluntarily provide</li>

                                </ol>
                                <p>
                                    You are responsible for all activities that occur through your account and consequence thereof.
                                    If there is reason to believe that there is likely to be breach of security or misuse of your account,
                                    or breach of your privacy, we have the right to suspend it without any liability for such duration as we deem fit.
                                    <br />
                                    You undertake that the id and password shall be used by you or anyone who is authorized by you
                                    such as your primary caretaker. Where someone else logs in using the unique id and password,
                                    we will deem such person is authorized by you to access your profile, process your personal information,
                                    and is of legally competent age.
                                    <br />
                                    You undertake that you will provide accurate and complete information for registration,
                                    maintain and promptly update your information, maintain security of your account, and promptly
                                    write to us if you anticipate or become aware of a security breach.
                                </p>

                                <li className="font-semibold">Accessing through Social Media?</li>
                                <p>
                                    You may access the Platform and avail some Services (as defined below) using Social Media accounts,
                                    in which case these Terms along with terms of use and privacy policy of respective Social Media
                                    shall also be applicable to you. Further, we shall not be responsible for any kind of transmission,
                                    publication of any of your information on any such Social Media.
                                </p>

                                <li className="font-semibold">Services</li>
                                <p>
                                    Platform enables you to avail certain services, some of which are provided by
                                    CUREBAY TECHNOLOGIES PRIVATE LIMITED and some by third parties (Services):
                                </p>

                                <ol className="font-normal mb-4 ml-6" style={{ listStyleType: "square" }}>
                                    <li>
                                        provide an intermediary platform for interaction and commercial transactions between
                                        you and third party service providers in healthcare ecosystem
                                    </li>
                                    <li>
                                        online purchase of pharma products offered and sold by third party pharmacies
                                    </li>
                                    <li>
                                        ordering for and availing diagnostics, testing and laboratory services offered and
                                        sold by third party labs/diagnostic centers
                                    </li>
                                    <li>
                                        online telemedicine consultancy services offered by registered medical practitioners
                                    </li>
                                    <li>
                                        ordering and availing healthcare services from third party healthcare institutions
                                        such as clinics, nursing homes, hospitals
                                    </li>
                                    <li>
                                        facilitating online payments for availed services through third party payment gateway
                                    </li>
                                    <li>
                                        hosting of information on third party service providers, health and wellness matters,
                                        and other allied aspects for information purposes
                                    </li>
                                    <li>
                                        facilitating advertisements and promotion of third party services as described above
                                        by the third party service providers
                                    </li>
                                </ol>

                                <p>
                                    Third parties referred above who are providing services using Platform are hereinafter
                                    referred to as “<b>Third Party Service Providers</b>”.
                                    <br />
                                    You understand and agree that CureBay is merely providing hosting and intermediary services.
                                    Except as otherwise provided in these Terms, we have no control over the accuracy, sufficiency,
                                    fitness, professionalism, competency and quality of Services provided by Third Party Service
                                    Providers, which at all times be the sole responsibility of the Third Party Service Providers.
                                    They are solely responsible for obtaining necessary permits, providing correct information
                                    about themselves and Services offered on the Platform, maintaining resources and infrastructure
                                    required, comply with applicable laws, and perform the offered Services upon conclusion of a
                                    transaction. You agree that we shall have no liability on this count.
                                    <br />
                                    We act as a technology enabled service provider and as such when you avail Services from
                                    Third Party Service Providers, you agree that a separate contractual relationship is
                                    created between you and such Third Party Service Provider. Such contract by conduct does
                                    not supersede the Terms contained herein as the same is enabled through the Platform, and
                                    will apply to you as well as the Third Party Service Provider. We do not make any
                                    representation or warranty, express or implied for the Services provided by Third Party
                                    Service Provider, and are not responsible for non-performance of deficient performance of Services.
                                    <br />
                                    Listing of the Services on the Platform is an invitation to an offer for sale. When you choose to avail a
                                    Service, it constitutes an offer from your end to enter into a contract with Third Party Service Provider.
                                    Thereafter, the Third Party Service Provider must accept your offer for the transaction to proceed further.
                                    For this acceptance, Third Party Service Provider will abide by its own internal processes and applicable
                                    law. Until such time, there is no contract between you and the Third Party Service Provider. Reference to
                                    “offer for sale” or “offer and sale” in these Terms will only mean “invitation to an offer”. No liability
                                    can be ascribed to CureBay for refusal by the Third Party Service Provider to enter into a contract with you.
                                </p>

                                <li className="font-semibold">Special terms for special Services</li>

                                <ol className="font-normal mb-4 ml-6" style={{ listStyleType: "upper-alpha" }}>
                                    <li className="font-normal italic">Online pharma products and allied services</li>
                                    <p>When you avail services of online purchasing of pharmaceutical products offered and sold by
                                        Third Party Service Providers, your transaction is governed by the following:
                                    </p>

                                    <ol className="font-normal mb-4 ml-6" style={{ listStyleType: "square" }}>
                                        <li>Platform merely facilitates the transaction by providing hosting services.</li>
                                        <li>
                                            Items offered for sale and content are made available by the Third Party Service Provider, and we do
                                            not control it, neither do we originate or initiate transmission or decide recipients of the transmission.
                                        </li>
                                        <li>
                                            Third Party Service Provider is responsible for ensuring that descriptions, advertisements, promotion
                                            and any other content concerning offered pharma products and services is accurate, precise, not misleading
                                            and are descriptive of the actual condition of the involved goods and services.
                                        </li>
                                        <li>Third Party Service Provider is responsible for authenticity, utility, fitness, quality and
                                            genuineness of pharma products and allied services.
                                        </li>
                                        <li>
                                            Commercial terms such as price, shipping and delivery charges, payment methods and related terms, delivery means,
                                            warranties, after sale services are provided by Third Party Service Provider and we are not involved in these aspects.
                                        </li>
                                        <li>
                                            If you are purchasing a pharma product which under law can only be sold based on a valid medical prescription
                                            from a Third Party Service Provider, you shall upload a legible and scanned copy of the prescription on the Platform.
                                            You must keep the original handy which needs to be physically shown at the time of delivery. Without this, your
                                            order for prescription drugs cannot be routed or processed.
                                        </li>
                                        <li>
                                            For prescription drugs, the Third Party Service Provider shall verify the accuracy of the prescription,
                                            and if there are discrepancies, which will be determined by the Third Party Service Provider at its
                                            discretion, your order shall be cancelled.
                                        </li>
                                        <li>
                                            Your order for substitute of a prescription drug shall only be processed if there is specific mention
                                            of generic drug in the prescription and not otherwise.
                                        </li>
                                        <li>
                                            When your offer to purchase is accepted by the Third Party Service Provider, the purchased pharma
                                            product and allied services shall be dispensed at the brick and mortar premises of the Third Party
                                            Service Provider under the supervision of the pharmacist in such store. Sale is not concluded upon
                                            delivery but once the order is accepted.
                                        </li>
                                        <li>
                                            An invoice will be processed by the Third Party Service Provider to conclude this sale,
                                            after which delivery will take place.
                                        </li>
                                        <li>
                                            Property and title in the ordered pharma products is transferred to you when the order
                                            is accepted and invoice is generated.
                                        </li>
                                        <li>
                                            To fulfill delivery, you agree to appoint an individual as your agent who will collect
                                            the purchased pharma product from the Third Party Service Provider on your behalf and
                                            deliver it to your designated address.
                                        </li>
                                        <li>
                                            We do not make any representation or warranty, express or implied regarding legal title,
                                            quality, efficacy, utility, functionality, fit for consumption, or other attributes of the
                                            pharma products and allied services.
                                        </li>
                                        <li>
                                            We do not control or possess the inventory. Third Party Service Provider is responsible
                                            of maintaining adequate stocks and timely performing the contract with you.
                                        </li>
                                        <li>
                                            We do not assume any liability in contract, tort or equity for pharma products and allied
                                            services which are at all times with the Third Party Service Provider.
                                        </li>
                                        <li>
                                            We are not responsible for any unsatisfactory, delayed, non-performance or breach of the
                                            contract that you enter with the Third Party Service Provider.
                                        </li>
                                        <li>
                                            We are not responsible for obtaining any licenses or permits for the contract concluded between
                                            you and the Third Party Service Provider for the pharma transaction.
                                        </li>
                                        <li>
                                            We shall not mediate or resolve any dispute with respect to the transaction that you conclude
                                            with the Third Party Service Provider. If you make a written request after the transaction, we
                                            will put reasonable efforts to provide details of the Third Party Service Provider which will
                                            include the following: address of headquarters, its branches (if any), name and details of its
                                            website, e-mail address, and other available information provided it is necessary for dispute
                                            resolution between you and the Third Party Service Provider.
                                        </li>

                                    </ol>

                                    <li className="font-normal italic">Diagnostics, testing and lab services</li>
                                    <p>Platform merely facilitates the transaction by providing hosting services</p>

                                    <ol className="font-normal mb-4 ml-6" style={{ listStyleType: "square" }}>
                                        <li>Sample collection, testing, report generation, managing personal information contained in such
                                            reports, providing other related services for diagnostics and testing is controller and conducted
                                            by the Third Party Service Provider such as labs, centers, hospitals, etc.
                                        </li>

                                        <li>Third Party Service Provider shall be liable for its dealings, interaction, and delivery
                                            of Services to you.</li>
                                        <li>
                                            Services offered for sale and content are made available by the Third Party Service Provider,
                                            and we do not control it, neither do we originate or initiate transmission or decide recipients of the transmission.
                                        </li>
                                        <li>
                                            Third Party Service Provider is responsible for ensuring that descriptions, advertisements, promotion and any other
                                            content concerning testing, diagnostics, and allied services is accurate, precise, not misleading and are descriptive
                                            of the actual condition of the involved goods and services.
                                        </li>
                                        <li>
                                            Third Party Service Provider is responsible for authenticity, utility, fitness, quality and genuineness of the Services.
                                        </li>
                                        <li>
                                            Commercial terms such as price, time and formality of sample collection, required documentation, payment methods and related
                                            terms, format of reports, and other connected services are provided by Third Party Service Provider and we are not
                                            involved in these aspects.
                                        </li>
                                        <li>
                                            Third Party Service Provider is responsible for deploying personnel who are qualified and trained phlebotomists, healthcare workers,
                                            nurses and other similar personnel to perform and fulfill the Services
                                        </li>
                                        <li>
                                            We do not make any representation or warranty, express or implied regarding legal title, quality, efficacy, utility,
                                            functionality, fit for consumption, or other attributes of the Services provided or the equipment, goods, and
                                            other inputs used for performance of Services.
                                        </li>
                                        <li>
                                            We do not assume any liability in contract, tort or equity for performed Services which are at all
                                            times with the Third Party Service Provider.
                                        </li>
                                        <li>
                                            We are not responsible for any unsatisfactory, delayed, non-performance or breach of the
                                            contract that you enter with the Third Party Service Provider.
                                        </li>
                                        <li>We are not responsible for obtaining any licenses or permits for the contract
                                            concluded between you and the Third Party Service Provider for the Services.
                                        </li>
                                        <li>
                                            We shall not mediate or resolve any dispute with respect to the transaction that you conclude with the Third Party Service Provider.
                                            If you make a written request after the transaction, we will put reasonable efforts to provide details of the Third Party
                                            Service Provider which will include the following: address of headquarters, its branches (if any),
                                            name and details of its website, e-mail address, and other available information provided it is necessary
                                            for dispute resolution between you and the Third Party Service Provider
                                        </li>

                                    </ol>

                                    <li className="font-normal italic">Online telemedicine and telehealth consultancy</li>

                                    <ol className="font-normal mb-4 ml-6" style={{ listStyleType: "square" }}>
                                        <li>Platform merely facilitates the transaction by providing hosting services.</li>
                                        <li>We are not engaged with you in a doctor-patient relationship. We do not provide
                                            any telehealth services.
                                        </li>
                                        <li>
                                            Medical experts or healthcare experts who are the Third Party Service Providers
                                            in this context are independent professionals, and we do not employ them or engage
                                            them as our agents. They are not our representatives, and we are not directly or
                                            indirectly liable for the Service that they provide.
                                        </li>
                                        <li>
                                            Telemedicine services are not a substitute for in-person consultation. You avail
                                            these Services out of your own volition and please note that you must rely on in
                                            person consultations before making choices about your healthcare.
                                        </li>
                                        <li>
                                            Telehealth service are all other services which do not amount to doctor patient
                                            consultation but have a nexus with your health and wellbeing. You avail these
                                            Services at your own risk and out of your free will. We do not endorse or
                                            promote or advertise any particular Service.
                                        </li>
                                        <li>
                                            While availing this Service, you will comply with the requirements prescribed by
                                            the Third Party Service Providers, your physician alongside the requirements as stated herein..
                                        </li>
                                        <li>
                                            Merely because you have requested a consultation or made payments to the Third Party Service Provider,
                                            there is no assurance that Services will be provided to you if the Third Party Service Provider believes
                                            that the information provided by you or your physician is incorrect, or there is a need for physical
                                            examination, or you have not provided your free and informed consent, or further diagnosis, or in
                                            exercise of their discretion, they determine that the case is not befitting for telemedicine consultation.
                                        </li>
                                        <li>
                                            In such case, you shall have no claims or cause of action against us, and any and all action including
                                            breach of patient privacy, inaccuracy of your personal data, refund of amounts paid, non-performance of
                                            Services shall be the responsibility and liability of the Third Party Service Provider.
                                        </li>
                                        <li>
                                            E-prescriptions provided in course of these Services may not be considered as a valid prescription
                                            under applicable law, and may not be fruitful for dispensation of drugs prescribed. We assume no
                                            responsibility in such instances
                                        </li>
                                        <li>
                                            Certain kinds of consultation, diagnosis and treatment services cannot be provided by Third Party
                                            Service Providers in accordance with applicable law. The Services are not for use in emergencies or
                                            for critical health situations. They are not meant for any consultation that requires in-person
                                            meeting with a registered medical practitioner and you must seek immediate medical advice and will
                                            be responsible for any consequences arising for delay or neglect or wrong choices made.
                                        </li>
                                        <li>
                                            You are responsible for your dealings and interactions with Third Party Service provider and we
                                            shall not be liable in any manner.
                                        </li>
                                        <li>
                                            Exchanges with medical experts through chat or over telephone or video calling features and e-prescription
                                            would be accessible to CureBay for monitoring use of the Platform and enabling the Services.
                                        </li>
                                        <li>
                                            You understand that medical consultation requires a variety of information including your existing medical
                                            conditions, history, medications, and physical diagnosis. These may not be available to the Third Party
                                            Service Provider and this could affect the Services, and it is your responsibility to provide all details
                                            as required by the Third Party Service Provider.
                                        </li>
                                        <li>
                                            Services will be provided relying on information that you have provided.
                                        </li>
                                        <li>
                                            We do not recommend or endorse any Third Party Service Provider, tests, procedures, opinion or other
                                            information for these Services. Reliance on any information hosted on the Platform is at your own risk.
                                        </li>
                                        <li>
                                            We do not make any representation or warranty, express or implied regarding legal title, quality,
                                            efficacy, utility, functionality, fit for consumption, or other attributes of the Services provided
                                            or the equipment, goods, and other inputs used for performance of Services.
                                        </li>
                                        <li>
                                            We do not assume any liability in contract, tort or equity for performed Services which
                                            are at all times with the Third Party Service Provider.
                                        </li>
                                        <li>
                                            We are not responsible for any unsatisfactory, delayed, non-performance or breach of
                                            the contract that you enter with the Third Party Service Provider.
                                        </li>
                                        <li>
                                            We are not responsible for obtaining any licenses or permits for the contract concluded
                                            between you and the Third Party Service Provider for the Services.
                                        </li>
                                        <li>
                                            We shall not mediate or resolve any dispute with respect to the transaction that you
                                            conclude with the Third Party Service Provider. If you make a written request after the
                                            transaction, we will put reasonable efforts to provide details of the Third Party Service
                                            Provider which will include the following: registration number, address of headquarters,
                                            its branches (if any), name and details of its website, e-mail address, and other available
                                            information provided it is necessary for dispute resolution between you and the Third Party Service Provider.
                                        </li>
                                    </ol>

                                </ol>

                                <li className="font-semibold">Why do we collect and process some information?</li>
                                <p>
                                    When you avail the Services or access/use the Platform, we may need to access your specific data
                                    including personal data, identity information, contacts, device ID, payment details, financial
                                    and health data, etc. Information provided by you during the registration process and thereafter,
                                    helps rendering of Services, offer relevant content, customer service and network management, and
                                    all such information shall be used and accessed as per the terms of CureBay’s Privacy Policy. We
                                    store personal information including sensitive personal information such as your health and
                                    financial information by employing adequate security measures as required under applicable law.
                                </p>

                                <li className="font-semibold">Data protection & privacy</li>
                                <p>
                                    Your personal information supplied to us while using the Platform or availing the Services shall
                                    be used by us in accordance with our Privacy Policy. You must review our Privacy Policy which
                                    forms an integral part of these Terms before you continue to use or access the Platform.
                                </p>

                                <li className="font-semibold">Payment</li>
                                <p>
                                    Registration on the Platform is free. We may charge a subscription or facilitation fee for use
                                    and access of the Platform, which must be paid online through the payment facility on the Platform.
                                    These fees are non-refundable.
                                    <br />
                                    Any payment made for availing Services must be in Indian Rupees.
                                    <br />
                                    You understand and agree that the payment facility provided on the Platform is not banking
                                    or financial service, and CureBay is merely a facilitator to provide an online payment facility
                                    for the transaction on the Platform using existing third parties such as authorized banking
                                    infrastructure, credit card payment gateway networks, wallets, etc.
                                    <br />
                                    For Third Party Services, all payments are made directly to the Third Party Service Provider,
                                    and we do not charge anything for you to browse the Services through the Platform. Third Party
                                    Service Provider may choose to collect the payment personally or through collection agents.
                                    <br />
                                    All fees and payments are exclusive of applicable taxes, and you and the Third Party Service
                                    Provider shall be solely responsible for payment, legal compliances, and reporting under
                                    applicable law. We are not responsible for those taxes which are your legal obligation.
                                    <br />
                                    Refund, or return, or cancellation of orders places are decided as per the CureBay refund
                                    and return policy , which forms an integral part of the Terms, and you must make yourself
                                    aware of such terms before performing any transaction on the Platform.
                                    <br />
                                    We act as Third Party Service Provider’s payment agents for the limited purpose of
                                    accepting payments from you for the Services availed. We are responsible only for remitting
                                    such amounts to concerned Third Party Service Provider, and we are not liable for any
                                    amount that you may be charged by your bank regarding the transactions. Any claim for
                                    unauthorized deductions, refund, partial or total shall be between you and the Third
                                    Party Service Provider, and we are not responsible for any such claims.
                                    <br />
                                    We shall not be responsible or assume liability in respect of any loss or damage directly
                                    or indirectly arising to you while availing any payment methods including any due to lack
                                    of authorization for any transactions, payment issued, pre-set limits with banks, declined
                                    transaction, etc. We are not acting in any fiduciary or trustee capacity because we
                                    facilitated your payment. While third party payment gateway or your bank processes
                                    payment transactions, they are privy and process your personal information, and such
                                    processing will be solely their responsibility and we are not liable for any breach
                                    or harm or unauthorized use of personal information of any kind by such payment gateway or bank.
                                </p>

                                <li className="font-semibold">User conduct</li>
                                <p>You agree that</p>

                                <ol className="font-normal mb-4 ml-6" style={{ listStyleType: "square" }}>
                                    <li>you have reviewed and understood the Terms including the Privacy Policy
                                        and refund and return policy and expressly consented to the terms therein;
                                    </li>
                                    <li>
                                        all information provided by you is true, accurate and complete in all aspects;
                                    </li>
                                    <li>
                                        you will not allow any third party to use the Platform or Services in any manner on your behalf;
                                    </li>
                                    <li>
                                        you will immediately notify us of any unauthorized use of the Platform by any person using your
                                        device or your details or any other breach of security;
                                    </li>
                                    <li>
                                        you shall not use the Platform to use or share any information on the Platform that:
                                    </li>

                                    <ol className="font-normal mb-4 ml-6" style={{ listStyleType: "lower-alpha" }}>
                                        <li>belongs to another person and to which you do not have any right to access or use;</li>
                                        <li>is grossly harmful, harassing, blasphemous defamatory, obscene, pornographic, paedophilic,
                                            libelous, invasive of another's privacy including bodily privacy, insulting or harassing
                                            on the basis of gender, hateful, or racially, ethnically objectionable, disparaging,
                                            relating or encouraging money laundering or gambling, or otherwise unlawful in any manner whatever;
                                        </li>
                                        <li>
                                            harms minors (i.e., below 18 years of age) in any way;
                                        </li>
                                        <li>
                                            infringes any patent, trademark, copyright or other proprietary rights;
                                        </li>
                                        <li>
                                            violates any applicable law for the time being in force;
                                        </li>
                                        <li>
                                            is deceiving or misleading to any message or communication addressee about
                                            the origin of such messages or communicates information which is grossly
                                            offensive, menacing, or illegal in nature;
                                        </li>
                                        <li>
                                            impersonates another person;
                                        </li>
                                        <li>
                                            contains software viruses, or other computer codes, files, programs, malwares,
                                            bugs, trojans, designed to interrupt, destroy, limit the functionality of any
                                            computer resource or hack, gain illegal access, or steal data and information on computer resource; and/or
                                        </li>
                                        <li>
                                            threatens the unity, integrity, defence, security, or sovereignty of India, its friendly relations with
                                            foreign states, or public order, or causes incitement to commission of any offence or prevents investigation
                                            of any offence, or is insulting of any nation.
                                        </li>
                                    </ol>

                                    <li>
                                        you are accessing and using the Platform and/or the Services at your sole risk and are using your best and prudent
                                        judgment before accessing and using the Services and/or the Platform;
                                    </li>
                                    <li>
                                        the terms of agreement with your respective mobile network provider or internet service provider shall apply
                                        while accessing the Platform; as a result of this, you may be charged by the concerned mobile network provider
                                        or internet service provider for using network connection, and you agree to pay such charges, as applicable,
                                        when you access the Platform;
                                    </li>
                                    <li>
                                        we may update, revise, modify, delete, amend, or withdraw any feature, content, options, page, data hosted on
                                        the Platform without any prior notification to you, and you hereby consent to the same;
                                    </li>
                                    <li>
                                        you are availing the Services with your free consent and with full knowledge of the inherent limitations;
                                    </li>
                                    <li>
                                        you have consented with your free will and with all information that your personal information will be shared with third parties,
                                        which consent also allows transfer and storage of your sensitive personal information outside the country.
                                    </li>

                                </ol>

                                <li className="font-semibold">Proprietary rights and license</li>
                                <p>
                                    All content and materials, including, but not limited to description of Services, images, text, illustrations, designs, icons, photographs, names, logos, design marks,
                                    slogans, programs, software, music clips or downloads, video clips and written and other proprietary information
                                    (including page layout, or form) that are part of the Platform (the “Content”) are intended solely for personal, non-commercial use.
                                    <br />
                                    The Content is provided by us and you acknowledge that we and/or our affiliates and Third Party Service
                                    Providers are the sole and absolute owners of any proprietary right in the Content; and except as expressly
                                    authorized in these Terms, you shall not use, access, distribute, modify, copy, transmit, display,
                                    reproduce, license, create derivative works from, transfer, reverse engineer, or deal otherwise with the Content.
                                    <br />
                                    Any attempt to decompile, or reverse engineer, or to remove any proprietary declarations such as copyright,
                                    trademark from the Content, is strictly prohibited and will be considered as unauthorized use of the Content
                                    resulting in deregistration and debarment from accessing the Platform.
                                </p>

                                <li className="font-semibold">Availability of Platform</li>
                                <p>
                                    We will use reasonable efforts to make the Platform available at all times.
                                    <br />
                                    However, you acknowledge that the Platform and/or the Services may not be available
                                    due to reasons outside our control such as, without limitation, while under maintenance,
                                    limited internet or connectivity due to the services rendered by mobile service provider,
                                    etc. In such an event, you shall not hold us liable, including but not limited for any
                                    direct or indirect loss.
                                </p>

                                <li className="font-semibold">Reviews & feedback</li>
                                <p>
                                    We shall have proprietary rights over any review, comment, feedback, suggestion,
                                    complaint and other submission disclosed and submitted by you on the Platform
                                    (except any personal information), or otherwise disclosed and submitted in relation
                                    to the Services on any media including Social Media (the “<b>Feedback</b>”); and we shall
                                    have worldwide rights, titles and interests in all copyrights and other intellectual
                                    properties in such Feedback.
                                    <br />
                                    You expressly assign all proprietary rights including copyright in Feedback to us
                                    without any limitation and restriction as to use or ownership, without payment
                                    of any compensation. Thus, we shall exclusively own all such rights and titles,
                                    and use, reproduce, disclose, modify, adapt, create derivative works from, monitor,
                                    remove, edit, delete, publish, share in the Feedback and shall be entitled to use
                                    such Feedback in any way, commercial or otherwise.
                                    <br />
                                    You agree that we are under no obligation to maintain confidentiality of any Feedback,
                                    to respond to any Feedback, nor shall your Feedback cause violate the Terms or any right
                                    of any third party (including copyright, trademark, privacy or other personal or proprietary
                                    right(s)) and not cause injury to any person or entity.
                                </p>

                                <li className="font-semibold">Disclaimer of warranties</li>
                                <p>The Services provided on the Platform are provided on “as is” and “as available” basis.
                                    We do not make any representation or warranties in respect of the Third Party Service
                                    Provider or the intermediary services or the Platform whatsoever, and absolutely
                                    none for the Services provided by Third Party Service Providers.
                                </p>

                                <li className="font-semibold">Limitation of liability</li>
                                <p>
                                    In no event shall we be liable for any direct, indirect, punitive,
                                    incidental, special, consequential damages or any other damages resulting from
                                </p>

                                <ol className="font-normal mb-4 ml-6" style={{ listStyleType: "square" }}>
                                    <li>the use or the inability to use the Platform and/or the Services and/or the Content;</li>
                                    <li>unauthorized access to or alteration of your transmissions or data;</li>
                                    <li>any unauthorized, indecent, defamatory, false, seditious content uploaded or posted by
                                        anybody else, including audio-visual content infringing any third party’s intellectual
                                        property rights;
                                    </li>
                                    <li>any non-performance of deficit performance of Services provided or availed by
                                        you from Third Party Service Provider;</li>
                                    <li>any consequence which is not caused by any action or omission on our part.</li>
                                    <p>This will survive termination of these Terms.</p>
                                </ol>

                                <li className="font-semibold">Indenification</li>
                                <p>
                                    You agree to indemnify and hold us and (as applicable) our affiliates, partner organizations,
                                    officers, directors, agents, and employees, harmless from all losses, liabilities, claims,
                                    demands or expenses (including legal fees and disbursements in connection therewith and
                                    interest chargeable thereon), asserted against or incurred by us that arise out of, as a
                                    result from, or may be payable by virtue of, any breach or non-performance of any
                                    representation, warranty, covenant or agreement made or obligation to be performed by
                                    you pursuant to these Terms, your violation of any law, or violation of the rights of
                                    a third party, including the infringement by you of any intellectual property or other
                                    right of any person or entity. These obligations will survive any termination of these
                                    Terms. Accordingly, we hereby disclaim any warranties of Services or otherwise provided
                                    by the Third Party Service Providers and any issues of deficiency of Services of Third
                                    Party Service Providers shall be taken up by you directly with the Third Party Service Provider.
                                </p>

                                <li className="font-semibold">Termination</li>
                                <p>
                                    We reserve the right to suspend or terminate your access and use of the Platform, or any
                                    Service if we believe, in our sole and absolute discretion that you have breached,
                                    violated, abused, or unethically manipulated or exploited any term of these Terms
                                    or anyway otherwise acted unethically.
                                    <br />
                                    If we terminate access to the Platform, or any Service, we may, at our sole discretion,
                                    delete any and all of your content or other related data, information and materials
                                    and we will have no liability to you or any third party for doing so.
                                </p>

                                <li className="font-semibold">Governing law and dispute resolution</li>
                                <p>The present Terms shall be governed and construed in accordance with the laws of India,
                                    without regard to its conflict of law provisions. All disputes shall be decided by
                                    mediation under the aegis of Odisha High Court. If the parties fail to mediate within
                                    3 months from the date of a dispute as notified by a party in writing to the other,
                                    the dispute shall be adjudicated by competent courts in Bhubaneshwar, Odisha, India.
                                </p>

                                <li className="font-semibold">Severability & waiver</li>
                                <p>In case of non-compliance of these Terms, we reserve the right to take necessary
                                    action including but not limiting to termination of the Terms, and appropriate legal
                                    actions. Our failure to enforce any right or provision under these Terms will not be
                                    considered as waiver of those rights. If any provision of these Terms is held to be
                                    invalid or unenforceable, the remaining clauses of these Terms will continue to be
                                    binding and remain in effect. These Terms constitute the entire agreement between
                                    you and us regarding use of the Platform and the Services, and supersede and replace
                                    any prior agreements we might have with you.</p>

                                <li className="font-semibold">Contact us</li>
                                <p>If you have any questions about these Terms, please contact us at <a className="text-blue-500" href="mailto: amitava.paul@curebay.com">Amitava.paul@curebay.com</a>

                                    or write to us at CureBay, Plot No. A-98, Budha Nagar, Laxmisagar, Bhubaneswar Khordha, Odisha 751006</p>



                            </ol>

                        </div>

                    </div>
                    <div>

                        <button
                            onClick={() => setOpenConsent(false)}
                            className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2"
                        >
                            ok
                        </button>

                    </div>
                </>
            </Dialog>



            <Dialog
                header="Privacy & Policy"
                visible={openConsentPrivacy}
                modal={true}
                // style={{ width: "800px", height: 'auto' }}
                className="w-11/12 md:w-8/12 lg:w-9/12 "
                onHide={() => setOpenConsentPrivacy(false)}
            >
                <>
                <div className="px-4 py-12 " >
            <p className="font-semibold mb-6 text-brand-primary" >PRIVACY POLICY</p>
            <p className="font-normal mb-4">'This privacy policy ("<b className="font-medium">Privacy Policy</b>”) including the applicable
                policies which are incorporated herein by way of reference, along with any amendments / modifications
                made by the Company (as defined below) at its sole discretion and posted on the Website (as defined below),
                forms an integral part of our Terms of Use (“<b className="font-medium">Terms of Use</b>”) provided on this website. In addition to the
                terms stated in Terms of Use, we are committed to protecting your privacy. We constantly review our
                systems and data to secure your personal information. We will investigate any complaint or such actions
                with a view to resolving such issues and may also initiate prosecuting and/or taking civil proceedings
                to recover damages against those responsible. Any User (as defined below) who does not agree with any
                provisions of the same is required to leave the website immediately. Should you disagree with this Privacy
                Policy and still continue to access the website and provide your personal information, such act would
                constitute your consent and accordingly, we disclaim all the liabilities arising therefrom. '</p>

            <ol style={{ listStyleType: "number" }}>
                <li className=" mb-6 ml-4 font-semibold "><span className="font-semibold ">Purpose</span></li>
                <ol className="font-normal mb-4 ml-6" style={{ listStyleType: "lower-alpha" }}>
                    <li>This Privacy Policy applies to your use of the domain name <a className="text-blue-500 font-normal" href="https://curebay.com">https://curebay.com</a>, and
                        applications for mobile, tablet and other smart devices and application program
                        interfaces, if any, (collectively referred to as “<b className="font-medium">Website</b>”), owned and operated by
                        CureBay Technologies Private Limited a company duly incorporated under the provisions
                        of the Companies Act, 2013 (hereinafter, referred to as “<b  className="font-medium">CureBay</b>” or “<b className="font-medium">We</b>” or “<b className="font-medium">Our</b>” or “<b className="font-medium">Us</b>”
                        or “<b className="font-medium">Company</b>”).  </li>
                    <li>The Website is a platform that connects Users to the healthcare providers and other
                        key ecosystem players (“<b className="font-medium">Healthcare Providers</b>”) to avail the services provided over
                        the platform (“<b className="font-medium">Services</b>”). The arrangement between the User and CureBay shall be governed
                        in accordance with this Privacy Policy and the Terms of Use. The Services would be made
                        available to such natural persons who have agreed to become buyers on the Website after
                        obtaining due registration, in accordance with the procedure as determined by CureBay,
                        from time to time (referred to as “<b className="font-medium">You</b>” or “<b className="font-medium">Your</b>” or “<b className="font-medium">Yourself</b>” or “<b className="font-medium">User</b>”, which terms
                        shall also include natural persons who are accessing the Website, merely as visitors
                        and also the Healthcare Provides).  </li>
                    <li>By accepting this Privacy Policy, you understand and agree to the collection, use,
                        sharing and processing of information, as described herein. If you provide CureBay with
                        personal information about someone else, you confirm that they are aware that You have
                        provided their information and that they consent to CureBay’s use of their information
                        according to this Privacy Policy. This Privacy Policy applies to all the current and
                        former visitors, users and others who access the Website.  </li>
                    <li>For the purpose of providing the Services and for other purposes identified in this
                        Privacy Policy, CureBay will be required to collect and host certain data and information
                        of the Users, CureBay is committed to protecting the personal information of the Users
                        and takes all reasonable precautions for maintaining confidentiality of the User’s personal
                        information. This Privacy Policy has been designed and developed to help You understand
                        the following: </li>
                    <ol className="ml-8" style={{ listStyleType: "lower-roman" }}>
                        <li>The type of personal information (including sensitive personal data or information)
                            that CureBay collects from the Users; </li>
                        <li>The purpose of collection, means and modes of usage of such personal information by CureBay; </li>
                        <li>How and to whom CureBay will disclose such information; </li>
                        <li>How CureBay will protect the personal information including sensitive personal data or information that
                            is collected from the Users; and </li>
                        <li>How Users may access and/ or modify their personal information. </li>
                    </ol>

                    <li>This Privacy Policy shall apply to the use of the Website by all Users/Healthcare Providers. Accordingly,
                        a condition of each User's use of and access to the Website and to the other Services provided by CureBay
                        to Users is their acceptance of this Privacy Policy. Every User/Healthcare Provider is required to read and
                        understand the provisions set out herein prior to submitting any sensitive personal data or information
                        to CureBay, failing which they are required to leave the Website immediately.
                    </li>
                    <li>This Privacy Policy is published in compliance of the (Indian) Information Technology Act, 2000 and the rules,
                        regulations, guidelines and clarifications framed thereunder, including the (Indian) Information Technology
                        (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
                    </li>
                </ol>

                <li className=" mb-6 ml-4 font-semibold "><span className="font-semibold ">Method and manner of use of User information</span>  </li>

                <ol className="font-normal mb-4 ml-6" style={{ listStyleType: "lower-alpha" }}>
                    <li>A User may have limited access to the Website and utilize some of the services provided by CureBay without
                        creating an account on the Website. Unregistered Users can access some of the information and details
                        available on the Website. In order to have access to all the features and benefits on our Website, a
                        User may be required to first create an account on our website.
                    </li>
                    <li>In order to use the facilities and services available on the Website, the User may be required, from time
                        to time, to provide certain additional personal information after registration on the Website, which
                        information shall be collected only upon receiving the User’s express consent.
                    </li>
                    <li>When You use our Website, we collect and store Your personal information which is provided by You from time
                        to time. Our primary goal in doing so is to provide You a safe, efficient, smooth and customized experience.
                        This allows Us to provide services and features that most likely meet Your needs, and to customize our Website
                        to make Your experience safer and easier.
                    </li>
                    <li>In order to enhance our ability to provide valuable services and experiences to the User, we may:</li>
                    <ol className="ml-8" style={{ listStyleType: "lower-roman" }}>
                        <li>automatically receive, collect and analyze your location information which may be accessed through a
                            variety of methods including, inter alia, GPS, IP address, and cell tower location; and
                        </li>
                        <li>collect information pertaining to Your device and Your usage thereof, including, inter alia,
                            the names of the other applications on Your mobile device and how You use them, information about
                            Your device, and information about Your use of features or functions on Your device.
                        </li>
                    </ol>

                </ol>
                <li className="mb-6 ml-4 font-semibold "><span className="font-semibold ">Use of Information</span></li>
                <p className="font-normal mb-4">CureBay will retain User Information only to the extent it is necessary to provide Product to the Users.
                    We may hold and retain the information collected by Us and when we no longer need Your information collected,
                    we will remove the same from our systems. If We keep the information for a longer duration, it would be for
                    the sole purpose to satisfy the legal, contractual or regulatory obligations. The information which CureBay
                    collects from You may be utilized for various business and/or regulatory purposes including for the following
                    purposes:
                </p>
                <ol className="font-normal mb-4 ml-6" style={{ listStyleType: "lower-alpha" }}>
                    <li>Registration of the User on the Website; </li>
                    <li>Purchase and delivery of products and service: We use your personal orders to take and fulfil order,
                        deliver product and services, process payments, and communicate with You about orders, products and
                        services, and promotional offers.
                    </li>
                    <li>Processing the User’s orders/ requests and provision of Services; </li>
                    <li>Completing transactions with Users effectively and billing for the Services provided; </li>
                    <li>Complying with legal obligations;  </li>
                    <li>Technical administration and customization of Website; </li>
                    <li>Ensuring that the Website content is presented to the Users in an effective manner; </li>
                    <li>Dealing with requests, enquiries, complaints or disputes and other customer care related
                        activities including those arising out of the Users’ request of the Website and all other
                        general administrative and business purposes;
                    </li>
                    <li>Communicate any changes in our services or this Privacy Policy or the Terms of Use to the Users;
                    </li>
                    <li>Verification of identity of Users and perform checks to prevent frauds; and </li>
                    <li>When You send an email message or otherwise contact CureBay through its Website, CureBay may use
                        the information provided by You to respond to Your communication. CureBay may also archive such
                        information and/or use it for future communications with You to inform You regarding updates, newsletters,
                        offers, new services and promotions.
                    </li>
                </ol>
                <li className=" mb-6 ml-4 font-semibold "><span className="font-semibold ">Sharing of Information</span>  </li>
                <p className="font-normal mb-4">We will not use User information for any purpose other than in connection with
                    the Website. We will not rent, sell or share User information and will not disclose any of the User’s personally
                    identifiable information to third parties except Healthcare Providers and its representatives, unless:
                </p>

                <ol className="font-normal mb-4 ml-6" style={{ listStyleType: "lower-alpha" }}>
                    <li>it is pursuant to obtaining the User’s permission; </li>
                    <li>it is in connection with the services being rendered through the Website; </li>
                    <li>it is to help investigate, prevent or take action regarding unlawful and illegal activities; suspected
                        fraud, potential threat to the safety or security of any person, violations of CureBay’s terms and
                        conditions, or as defence against legal claims;
                    </li>
                    <li>it is a case of special circumstances such as compliance with court orders, requests/order, notices
                        from legal authorities or law enforcement agencies compel us to make such disclosure.
                    </li>
                </ol>

                <li className=" mb-6 ml-4 font-semibold "><span className="font-semibold ">Information security</span> </li>
                <ol className="font-normal mb-4 ml-6" style={{ listStyleType: "lower-alpha" }}>
                    <li>The information provided by the User is stored in access-controlled facilities with restricted access.
                        User information transmitted over the internet is protected through the use of encryption, using the
                        Secure Socket Layer (SSL) or equivalent protocols.
                    </li>
                    <li>If a password is used to help protect User accounts and account information, it is the responsibility
                        of the User to keep the password confidential. You have to ensure that You always log out, before sharing
                        the device with a third party and it is advised that the User utilize a service to protect access to
                        the User’s device.
                    </li>
                    <li>We shall use generally accepted industry standards to protect the User information submitted to Us,
                        both during transmission and upon receipt. However, please be advised that, no method of transmission
                        over the Internet, or method of electronic storage, is 100% secure. Therefore, even though We strive to
                        use commercially acceptable means to protect User information, we cannot guarantee its absolute security
                        and Your use of the Website is at Your sole risk and discretion. We also cannot warrant that such User
                        information may not be misused in the event our safeguards and protocols are breached by a malicious
                        third-party. Further, we are not liable to nor can We fully control the actions of other users with
                        whom You may choose to share Your information.
                    </li>
                    <li>The collection, usage, and sharing of User information by us shall be in compliance with the Information
                        Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules,
                        2011 and other applicable laws.
                    </li>
                </ol>

                <li className="mb-6 ml-4 font-semibold "><span className="font-semibold ">User's rights in relation to their personal information </span> </li>

                <ol className="font-normal mb-4 ml-6" style={{ listStyleType: "lower-alpha" }}>
                    <li>If and when a User is desirous of having his/her name and other details removed from our records, immediately
                        upon receiving the User’s written request to that effect We shall, subject to the terms hereof, remove
                        and/delete all such information subject to requirement under applicable laws.
                    </li>
                    <li>Users can access, modify, correct and delete the personal information provided by them which has been voluntarily
                        given by the User and collected by CureBay in accordance with this Privacy Policy and Terms of Use.
                    </li>
                    <li>You agree that You will not submit any false information or any illegal or damaging content to the Website. CureBay
                        reserves the right to terminate access to or the ability to interact with the Website in response to any concerns
                        CureBay may have about false, illegal, or damaging content, or for any other reason, in its sole discretion.
                    </li>
                    <li>CureBay would like to make sure You are fully aware of all Your data protection rights. Please note that You shall
                        have the sole ownership of Your personal information and by agreeing to this Privacy Policy and the Terms of Use,
                        you have authorised CureBay to process Your personal information for the relevant purposes.
                    </li>
                </ol>

                <li className="mb-6 ml-4 font-semibold "><span className="font-semibold ">User’s Responsibility: </span></li>
                <ol className="font-normal mb-4 ml-6" style={{ listStyleType: "lower-alpha" }}>
                    <li>The User is responsible for maintaining the confidentiality of the User's account access information and password.
                        The User shall be responsible for all uses of the User's account and password, whether or not authorized by the User.
                        The User shall immediately notify CureBay of any actual or suspected unauthorized use of the User's account or password.
                    </li>
                    <li>When the User uses social media platforms and communicates to CureBay or about CureBay, the personal information
                        and content You share is visible to other users and can be read, collected, or used by other users. You are responsible
                        for the personal information You choose to share or submit in these instances. For example, if You list Your name and
                        email address in a social media post, that information is public. Please take care while using these features.
                    </li>

                </ol>

                <li className="mb-6 ml-4 font-semibold "><span className="font-semibold ">Note For Healthcare Providers: </span> </li>

                <ol className="font-normal mb-4 ml-6" style={{ listStyleType: "lower-alpha" }}>
                    <li>As part of the registration as User as well as the application creation and submission process that is available to Healthcare
                        Providers on CureBay, certain information, including personal information or sensitive personal data or information is collected
                        from the Healthcare Providers.
                    </li>
                    <li>All the statements in this Privacy Policy apply to all Healthcare Providers, and all Healthcare Providers are therefore
                        required to read and understand the privacy statements set out herein prior to submitting any personal Information or sensitive
                        personal data or information to CureBay, failing which they are required to leave the Services, including the Website immediately.
                    </li>
                    <li>Healthcare Providers’ personally identifiable information, which they choose to provide to CureBay, is used to help the
                        Healthcare Providers describe and identify themselves. This information is exclusively owned by CureBay You will be
                        the owner of your information and you consent to CureBay collecting, using, processing and/or disclosing this information
                        for the purposes hereinafter stated. CureBay may use such information for commercial purposes and in an aggregated
                        or non-personally identifiable form for research, statistical analysis and business intelligence purposes, and may sell
                        or otherwise transfer such research, statistical or intelligence data in an aggregated or non-personally identifiable
                        form to third parties and affiliates. CureBay also reserves the right to use information provided by or about the
                        Healthcare Providers for the following purposes:
                    </li>
                    <ol className="font-normal mb-4 ml-8" style={{ listStyleType: "lower-roman" }}>
                        <li>Publishing such information on the Website. </li>
                        <li>Contacting Healthcare Providers for offering new products or services. </li>
                        <li>Contacting Healthcare Providers for taking product feedback. </li>
                        <li>Analysing software usage patterns for improving product design and utility. </li>
                        <li>Analysing anonymized practice information including financial, and inventory information for commercial use. </li>
                    </ol>

                    <li>CureBay automatically enables the listing of Healthcare Providers’ information on its Website for the Services
                        listed on its platform. The Healthcare Providers information listed on Website is displayed when Users search
                        for Healthcare Providers on Website, and the Healthcare Providers information listed on Website is used by
                        Users to request for services/appointments. Any personally identifiable information of the Healthcare
                        Providers listed on the Website is not generated by CureBay and is provided to CureBay by Healthcare
                        Providers who wish to enlist themselves on the Website, or is collected by CureBay from the public domain.
                        CureBay displays such information on its website on an as-is basis making no representation or warranty on
                        the accuracy or completeness of the information. As such, we strongly encourage Healthcare Providers s to
                        check the accuracy and completeness of their information from time to time, and inform us immediately of
                        any discrepancies, changes or updates to such information. Healthcare Providers will, however, take
                        reasonable steps to ensure the accuracy and completeness of this information.
                    </li>
                </ol>

                <li className="mb-6 ml-4 font-semibold "><span className="font-semibold "> Link to Third Party Websites: </span> </li>
                <ol className="font-normal mb-4 ml-6" style={{ listStyleType: "lower-alpha" }}>
                    <li>We may include third-party links to other websites and apps. We have no control over these websites
                        and they are subject to their own terms of use and privacy policies. As such, we do not endorse and
                        are not responsible for the availability of, or for any content, advertising, products, or other
                        materials on or available from, these third-party websites.
                    </li>
                    <li>By using the services, you agree that we will not be liable for any damage or loss caused by
                        your use of or reliance on any content, advertising, products, or other materials on or available
                        from these third-party websites.
                    </li>
                </ol>

                <li className=" mb-6 ml-4 font-semibold "><span className="font-semibold "> Applicability: </span></li>
                <ol className="font-normal mb-4 ml-6" style={{ listStyleType: "lower-alpha" }}>
                    <li>Notwithstanding anything to the contrary contained in this Privacy Policy and/or
                        the Terms of Use, in case of any conflict between any terms of this Privacy Policy
                        and/or the Terms of Use and/or and any other agreement that You may enter into with
                        CureBay for availing the services, the terms of the agreement executed with CureBay
                        shall prevail at all times.
                    </li>
                    <li>This Privacy Policy shall be supplementary to CureBay’s Terms of Use. Words and
                        expressions used in this Privacy Policy but not defined herein shall have the meanings
                        ascribed to them in the Terms of Use. To the extent any provision of this Privacy
                        Policy does not conflict with the Terms of Use, the Terms of Use shall apply to
                        this Privacy Policy. In the event of any conflict between this Privacy Policy
                        and the Terms of Use, the interpretation placed by CureBay shall be final and
                        binding on You.
                    </li>
                </ol>

                <li className=" mb-6 ml-4 font-semibold "><span className="font-semibold ">Grievance Officer </span> </li>
                <p className="font-normal mb-4 ml-6">In accordance with Information Technology Act 2000
                    and rules made there under, the name and contact details of our
                    Grievance Officer are provided below:
                </p>

                <div className="font-normal mb-4 ml-6">
                    <div className="flex m-2">
                        <p><span className="font-bold ">Grievance Officer:</span> Shobhan Mahapatra</p>
                     
                    </div>

                    <div className="flex m-2">
                        <p>Please contact us at <a href="mailto: Support@curebay.com" >Support@curebay.com</a> or write to use at Curebay, Plot No. A-98, Budha Nagar, Laxmisagar, Bhubaneswar Khordha, Odisha 751006</p>
                       
                      
                    </div>

                    {/* <div className="flex m-2">
                        <p>ADDRESS:CureBay Technologies Pvt Ltd, Plot No. A-98, Budha Nagar, Laxmisagar, Bhubaneswar, Khordha Odisha 751006</p>
                       
                      
                    </div>

                    <div className="flex m-2">
                        <p>TEL:+91 9040400108</p>
                       
                    </div>

                    <div className="flex m-2">
                        <p>EMAIL:support@curebay.com</p>
                       
                    </div> */}

                </div>

            </ol>

        </div>
                    <div>

                        <button
                            onClick={() => setOpenConsentPrivacy(false)}
                            className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2"
                        >
                            ok
                        </button>

                    </div>
                </>
            </Dialog>


        </>
    )
}


const mapDispatchToProps = (dispatch) => ({
    addRegistration: (data) => dispatch(addRegistration(data)),
    setLoginModal: () => dispatch(setLoginModal()),
});

export default connect(null, mapDispatchToProps,)(RegForm);