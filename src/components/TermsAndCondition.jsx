import { useHistory } from 'react-router-dom';
import { EnglishText } from '../application/Router/constants/EnglishText';


const TermsAndCondition = () => {

    const history = useHistory();

    const createMarkup = (data) => {
        return { __html: data };
      };

    return (
        <div className="mx-4 py-12 " 
            dangerouslySetInnerHTML={createMarkup(
            EnglishText.TAC_PARA1
          )}>
            

            
            {/* <p>These Terms include:</p>
            <ul class="font-normal mb-4 ml-8" style={{ listStyleType: "circle" }}>
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

            <p class="mt-3 mb-2">
                <input class="mr-1" type="checkbox" />
                I UNDERSTAND THAT THE TERMS OF USE AND THE PRIVACY POLICY GOVERN MY USE AND/OR ACCESS OF THE PLATFROM AS A LAWFUL
                CONTRACT, BINDING AND ENFORCEABLE ON ME, AND I HEREBY ACCEPT AND CONSENT TO BE GOVERNED BY THESE TERMS OF USE.
            </p>

            <ol class="font-normal mb-4 ml-6" style= "listStyleType: number">
                <li class="font-semibold">Eligibility of Users</li>
                <p>
                    In order to access, use, browse, view or perform any activities on the Platform, you must be above 18 years of age,
                    and competent to contract in terms of the Indian Contract Act, 1872. By accessing, using, browsing, or performing any
                    other activity on the Platform, you hereby agree and represent that you are of a legal age and competent to enter
                    into a contract under the Indian Contracts Act, 1872 or you have the permission of your parent and/or guardian to do so.
                </p>

                <li class="font-semibold">How to use?</li>
                <p>
                    For using the Platform, you will be required to create a unique user id and password. You must ensure that the
                    unique id and password are at all times kept confidential, and not disclosed to any third party without your
                    free consent. We do not allow multiple users to use the same user id and password.
                </p>

                <p>During registration, you will be required to provide the following personal information:</p>

                <ol class="font-normal mb-4 ml-6" style={{ listStyleType: "square" }}>
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

                <li class="font-semibold">Accessing through Social Media?</li>
                <p>
                    You may access the Platform and avail some Services (as defined below) using Social Media accounts,
                    in which case these Terms along with terms of use and privacy policy of respective Social Media
                    shall also be applicable to you. Further, we shall not be responsible for any kind of transmission,
                    publication of any of your information on any such Social Media.
                </p>

                <li class="font-semibold">Services</li>
                <p>
                    Platform enables you to avail certain services, some of which are provided by
                    CUREBAY TECHNOLOGIES PRIVATE LIMITED and some by third parties (Services):
                </p>

                <ol class="font-normal mb-4 ml-6" style={{ listStyleType: "square" }}>
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
                    You understand and agree that Curebay is merely providing hosting and intermediary services.
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
                    can be ascribed to Curebay for refusal by the Third Party Service Provider to enter into a contract with you.
                </p>

                <li class="font-semibold">Special terms for special Services</li>

                <ol class="font-normal mb-4 ml-6" style={{ listStyleType: "upper-alpha" }}>
                    <li class="font-normal italic">Online pharma products and allied services</li>
                    <p>When you avail services of online purchasing of pharmaceutical products offered and sold by
                        Third Party Service Providers, your transaction is governed by the following:
                    </p>

                    <ol class="font-normal mb-4 ml-6" style={{ list-style-type: "square" }}>
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

                    <li class="font-normal italic">Diagnostics, testing and lab services</li>
                    <p>Platform merely facilitates the transaction by providing hosting services</p>

                    <ol class="font-normal mb-4 ml-6" style={{ listStyleType: "square" }}>
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

                    <li class="font-normal italic">Online telemedicine and telehealth consultancy</li>

                    <ol class="font-normal mb-4 ml-6" style="list-style-type: square" >
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
                            would be accessible to Curebay for monitoring use of the Platform and enabling the Services.
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

                <li class="font-semibold">Why do we collect and process some information?</li>
                <p>
                    When you avail the Services or access/use the Platform, we may need to access your specific data
                    including personal data, identity information, contacts, device ID, payment details, financial
                    and health data, etc. Information provided by you during the registration process and thereafter,
                    helps rendering of Services, offer relevant content, customer service and network management, and
                    all such information shall be used and accessed as per the terms of CureBay’s Privacy Policy. We
                    store personal information including sensitive personal information such as your health and
                    financial information by employing adequate security measures as required under applicable law.
                </p>

                <li  class="font-semibold">Data protection & privacy</li>
                <p>
                    Your personal information supplied to us while using the Platform or availing the Services shall
                    be used by us in accordance with our Privacy Policy. You must review our Privacy Policy which
                    forms an integral part of these Terms before you continue to use or access the Platform.
                </p>

                <li class="font-semibold">Payment</li>
                <p>
                    Registration on the Platform is free. We may charge a subscription or facilitation fee for use
                    and access of the Platform, which must be paid online through the payment facility on the Platform.
                    These fees are non-refundable.
                    <br />
                    Any payment made for availing Services must be in Indian Rupees.
                    <br />
                    You understand and agree that the payment facility provided on the Platform is not banking
                    or financial service, and Curebay is merely a facilitator to provide an online payment facility
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
                    Refund, or return, or cancellation of orders places are decided as per the Curebay refund
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

                <li class="font-semibold">User conduct</li>
                <p>You agree that</p>

                <ol class="font-normal mb-4 ml-6" style={{ listStyleType: "square" }}>
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

                    <ol class="font-normal mb-4 ml-6" style= "list-style-type: lower-alpha" >
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

                <li class="font-semibold">Proprietary rights and license</li>
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

                <li class="font-semibold">Availability of Platform</li>
                <p>
                    We will use reasonable efforts to make the Platform available at all times.
                    <br />
                    However, you acknowledge that the Platform and/or the Services may not be available
                    due to reasons outside our control such as, without limitation, while under maintenance,
                    limited internet or connectivity due to the services rendered by mobile service provider,
                    etc. In such an event, you shall not hold us liable, including but not limited for any
                    direct or indirect loss.
                </p>

                <li class="font-semibold">Reviews & feedback</li>
                <p>
                    We shall have proprietary rights over any review, comment, feedback, suggestion,
                    complaint and other submission disclosed and submitted by you on the Platform
                    (except any personal information), or otherwise disclosed and submitted in relation
                    to the Services on any media including Social Media (the “<b>Feedback</b>”); and we shall
                    have worldwide rights, titles and interests in all copyrights and other intellectual
                    properties in such Feedback.
                    <br />

//////////////////////////////////////////

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

                <li class="font-semibold">Disclaimer of warranties</li>
                <p>The Services provided on the Platform are provided on “as is” and “as available” basis.
                    We do not make any representation or warranties in respect of the Third Party Service
                    Provider or the intermediary services or the Platform whatsoever, and absolutely
                    none for the Services provided by Third Party Service Providers.
                </p>

                <li class="font-semibold">Limitation of liability</li>
                <p>
                    In no event shall we be liable for any direct, indirect, punitive,
                    incidental, special, consequential damages or any other damages resulting from
                </p>

                <ol class="font-normal mb-4 ml-6" style={{ listStyleType: "square" }}>
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

                <li class="font-semibold">Indenification</li>
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

                <li class="font-semibold">Termination</li>
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

                <li class="font-semibold">Governing law and dispute resolution</li>
                <p>The present Terms shall be governed and construed in accordance with the laws of India,
                    without regard to its conflict of law provisions. All disputes shall be decided by
                    mediation under the aegis of Odisha High Court. If the parties fail to mediate within
                    3 months from the date of a dispute as notified by a party in writing to the other,
                    the dispute shall be adjudicated by competent courts in Bhubaneshwar, Odisha, India.
                </p>

                <li class="font-semibold">Severability & waiver</li>
                <p>In case of non-compliance of these Terms, we reserve the right to take necessary
                    action including but not limiting to termination of the Terms, and appropriate legal
                    actions. Our failure to enforce any right or provision under these Terms will not be
                    considered as waiver of those rights. If any provision of these Terms is held to be
                    invalid or unenforceable, the remaining clauses of these Terms will continue to be
                    binding and remain in effect. These Terms constitute the entire agreement between
                    you and us regarding use of the Platform and the Services, and supersede and replace
                    any prior agreements we might have with you.</p>

                <li class="font-semibold">Contact us</li>
                <p>If you have any questions about these Terms, please contact us at <a class="text-blue-500" href="mailto: amitava.paul@curebay.com">Amitava.paul@curebay.com</a> 

                     or write to us at Curebay, Plot No. A-98, Budha Nagar, Laxmisagar, Bhubaneswar Khordha, Odisha 751006</p>

                <p>
                    <input class="mr-1" type="checkbox" />
                    I UNDERSTAND THAT THE TERMS OF USE CONTAINED HEREIN ALONG WITH ITS CONSTITUENT <b><span class='cursor-pointer font-semibold' onClick={() => history.push('/privacy-policy')}>PRIVACY POLICY</span></b>{" "}
                    GOVERN MY USE AND/OR ACCESS OF THE PLATFORM AS A LAWFUL CONTRACT,
                    BINDING AND ENFORCEABLE ON ME, AND I HEREBY ACCEPT AND CONSENT TO BE GOVERNED BY THESE TERMS OF USE.
                </p>

            </ol> */}

        </div>
    )
}

export default TermsAndCondition