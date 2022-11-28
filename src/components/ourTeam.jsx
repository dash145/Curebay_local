import React, { useEffect } from "react";
import dummy from "../Assets/Images/dummy.png";
import chandrashekhar from "../Assets/Images/chandrashekhar.png";
import srijatmishra from "../Assets/Images/srijat-mishra.png";
import ramdasmullath from "../Assets/Images/ramdas-mullath.png";
import shikhasuman from "../Assets/Images/shikha-suman.png";
import shobhanmahapatra from "../Assets/Images/shobhan-mahapatra.png";
import priyadarshimohapatra from "../Assets/Images/priyadarshi-mohapatra.png";
import sanjay from "../Assets/Images/sanjay.jpg";
import prasunchatterjee from "../Assets/Images/prasun-chatterjee.jpg";
import vasantnangia from "../Assets/Images/vasant-nangia.jpg";
import birensahoo from "../Assets/Images/biren-sahoo.jpg";
import ashvannisrivastava from "../Assets/Images/ashvanni-srivastava.jpg";
import bidhandas from "../Assets/Images/bidhan-das.jpg";
import bhaskarpramanik from "../Assets/Images/bhaskar-pramanik.jpg";


const OurTeam = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });

  return (
    <div className="lg:block  mt-8 mb-5 pb-8 place-content-center z-20">
      <div className="flex flex-col items-center justify-items-center bg-brand-primary rounded-lg lg:mx-32 mx-6 mt-12">
        <h1 className="mt-5 text-medium font-medium text-white  text-2xl ">
          Meet The Dreamers
        </h1>
        <div className="mt-3 border-b-4 border-indigo-200 w-30 bg-white"></div>
      </div>

      <div className="md:flex flex-row mx-8 lg:mx-36 mt-6 justify-between">
        <img
          src={priyadarshimohapatra}
          alt="more"
          className="h-64 mt-3 md:hidden m-auto"
        />
        <div className="md:w-4/6">
          <h1 className="mt-3 text-medium font-medium text-2xl ">
            Priyadarshi Mohapatra
          </h1>
          <h3 className="mt-2 text-medium font-medium ">
            Founder & CEO
          </h3>
          <p className="mt-2 text-justify">
            Priyadarshi is an industry veteran with over two and half decades of
            experience in both enterprise and consumer space in India. His keen
            interest in engaging with customers has been the mantra of his
            success in the corporate world. His strategic thinking, execution
            and leadership have endeared him to clients and colleagues during
            his stints with Google, Microsoft, SAP, Avaya and Sun. He co-founded
            Oyzterbay, an early VC funded jewellery chain that went on to become
            a recognized lifestyle brand and the second largest branded
            jewellery retail chain before being acquired by Fossil. Priyadarshi
            started his career with Titan Industries and was part of the team
            responsible for establishing the brand Tanishq.
          </p>
        </div>
        <img
          src={priyadarshimohapatra}
          alt="more"
          className="w-1/4 h-64 mt-8 ml-8 hidden md:block rounded-tl-3xl rounded-br-3xl border-2 border-brand-lightgreen"
        />
      </div>

      <div className="md:flex flex-row mx-8 lg:mx-36 mt-6 justify-between">
        <img
          src={shobhanmahapatra}
          alt="More"
          className=" h-46 mt-3 md:hidden m-auto "
        />
        <img
          src={shobhanmahapatra}
          alt="More"
          className="w-1/4 h-64 mt-3 hidden md:block rounded-tr-3xl rounded-bl-3xl border-2 border-brand-lightgreen"
        />
        <div className="md:w-4/6">
          <h1 className="mt-3 text-medium font-medium text-2xl ">
            Shobhan Mahapatra
          </h1>
          <h3 className="mt-2 text-medium font-medium ">
            Co-Founder & Chief Revenue Officer
          </h3>
          <p className="mt-2 text-justify">
            Shobhan has more than twenty-ﬁve years of industry experience in
            manufacturing and IT service industry. He has led very large IT
            outsourcing programs involving multiple geographies and diversiﬁed
            business with annual revenue of USD 100 Mn. He has a rich experience
            in managing operations, driving business strategies, effecting
            organizational transformations and solution selling. In his last
            assignment as CIO at Birlasoft, he successfully led the IT
            integration and merged the IT systems of Birlasoft with KPIT IT
            services. Shobhan is an alumni of NIT Rourkela and XIM Bhubaneswar.
          </p>
        </div>
      </div>

      <div className="md:flex flex-row mx-8 lg:mx-36 mt-6 justify-between">
        <img
          src={sanjay}
          alt="more"
          className="h-72 mt-3 md:hidden m-auto "
        />
        <div className="md:w-4/6">
          <h1 className="mt-3 text-medium font-medium text-2xl ">
            Sanjay Swain
          </h1>
          <h3 className="mt-2 text-medium font-medium ">
            Co-Founder & CTO
          </h3>
          <p className="mt-2 text-justify">
            Sanjay has twenty years of experience in driving technology-led
            programs to deliver non-linear business outcome for customers and
            investors across six continents. With a strong blend of techno
            functional and leadership skills, guided by a sense of urgency, he
            has built and managed several teams that converted product ideas
            into reality. His area of expertise covers product engineering, data
            management, AI/ML and cloud adoption. He has a proven track record
            of building high performing teams that built large global platforms
            for operations, data science & clients in TCS, CISCO, TIBCO, Nielsen
            and NielsenIQ. Recently, Sanjay drove the creation of next-gen data
            science and data acquisition technology platforms in 100+ countries
            at Nielsen. In his previous stints, he has helped TIBCO’s largest
            customers adopt enterprise architecture principles and deploy
            pioneering health-tech solutions for various healthcare providers in
            North America.
          </p>
        </div>
        <img
          src={sanjay}
          alt="more"
          className="w-1/4 h-72 mt-3 hidden md:block rounded-tr-3xl rounded-bl-3xl border-2 border-brand-lightgreen"
        />
      </div>

      <div className="md:flex flex-row mx-8 lg:mx-36 mt-6 justify-between">
        <img
          src={shikhasuman}
          alt="more"
          className="h-64 mt-3 md:hidden m-auto "
        />
        <img
          src={shikhasuman}
          alt="more"
          className="w-1/4 h-64 mt-3 hidden md:block rounded-tr-3xl rounded-bl-3xl border-2 border-brand-lightgreen"
        />
        <div className="md:w-4/6">
          <h1 className="mt-3 text-medium font-medium text-2xl ">
            Dr. Shikha Suman
          </h1>
          <h3 className="mt-2 text-medium font-medium ">
            Chief Data Officer
          </h3>
          <p className="mt-2 text-justify">
            Dr Suman is a seasoned entrepreneur, having built two businesses
            from grounds up, scaling them and eventually getting an exit. She
            carries signiﬁcant expertise in product building, scaling, team
            building, raising ﬁnances and has an acknowledged presence in Indian
            start up network. She was the founder of Medimojo and Sampling
            Research, working on Data Analytics and Health Tech. In a career
            spanning 17+ years she has largely worked across Healthcare and
            Health Tech vertical and built scalable solutions for improving
            financial and operations outcomes for providers and pharma
            companies. She is a PhD from IIT Kanpur and a recipient of Axis Bank
            Digital Women Award.
          </p>
        </div>

      </div>



      <div className="md:flex flex-row mx-8 lg:mx-36 mt-6 justify-between">
        <img
          src={ramdasmullath}
          alt="More"
          className="h-64 mt-3 md:hidden m-auto"
        />

        <div className="md:w-4/6">
          <h1 className="mt-3 text-medium font-medium text-2xl ">
            Ramdas Mullath
          </h1>
          <h3 className="mt-2 text-medium font-medium ">
            Head Strategic Initiatives
          </h3>
          <p className="mt-2 text-justify">
            Ramdas comes with 20+ years of corporate and entrepreneurial
            experience primarily in UK and India selling technology solutions.
            He has worked across different industry segments like BFSI, Public
            Sector and retail and has focused on healthcare since 2013.
            <p className="mt-2">
              He is an MBA from London Business School, after starting his
              career with ITC right after graduation he worked with
              Dell,Mindtree, Capgemini, and TCSapart from his own (failed!)
              venture in the past. Ramdas has been part of transformational
              technologyprograms with substantial business benefits across
              India, UK and USA. He credits his empathy for clients and end
              users as major factor for his success. In his last role with Dell,
              he was program manager for digitization of population based
              screening in Non-communicable diseases segment of Ayushman Bharat.
            </p>
          </p>
        </div>
        <img
          src={ramdasmullath}
          alt="More"
          className="w-1/4 h-64 mt-3 hidden md:block rounded-tr-3xl rounded-bl-3xl border-2 border-brand-lightgreen"
        />
      </div>



      {/* ///////////////// our advisor //////////////////////////////*/}

      <div className="flex flex-col items-center justify-items-center bg-brand-primary rounded-lg lg:mx-32 mx-6 mt-12">
        <h1 className="mt-5 text-medium font-medium text-white  text-2xl ">
          Our Advisors
        </h1>
        <div className="mt-3 border-b-4 border-indigo-200 w-30 bg-white"></div>
      </div>

      <div className="md:flex flex-row mx-8 lg:mx-36 mt-6 justify-between">
        <img
          src={bhaskarpramanik}
          alt="more"
          className="h-64 mt-3 md:hidden m-auto "
        />
        <img
          src={bhaskarpramanik}
          alt="more"
          className="w-1/4 h-64 mt-3 hidden md:block rounded-tr-3xl rounded-bl-3xl border-2 border-brand-lightgreen"
        />
        <div className="md:w-4/6">
          <h1 className="mt-3 text-medium font-medium text-2xl ">
            Bhaskar Pramanik
          </h1>

          <p className="mt-2 text-justify">
            Mr. Bhaskar Pramanik is an accomplished management leader and professional from the
            Technology Industry. He has held National and Global Leadership positions in leading
            Multinational Technology Companies. He was on the Executive Committee of NASSCOM,
            the National Committee of CII and AMCHAM. He recently retired from the Board of SBI,
            India's largest Bank. He retired as Chairman of Microsoft India after a successful
            45 years career in the technology industry. Before this, he was the Managing Director
            of Oracle Corporation and Sun Microsystems in India. He was also the Global VP for
            Commercial Systems at Sun Microsystems Inc based out of Menlo Park, CA. Bhaskar
            holds a Btech from IIT Kanpur and is MEP from Stanford University.
          </p>
        </div>

      </div>

      <div className="md:flex flex-row mx-8 lg:mx-36 mt-6 justify-between">
        <img
          src={prasunchatterjee}
          alt="More"
          className="h-64 mt-3 md:hidden m-auto"
        />

        <div className="md:w-4/6">
          <h1 className="mt-3 text-medium font-medium text-2xl ">
            Dr. Prasun Chatterjee
          </h1>

          <p className="mt-2 text-justify">
            Dr. Chatterjee is one of the first qualified geriatrician in the country.
            Presently professor, clinician and researcher in the country’s premier
            institute AIIMS, New Delhi with multiple National and International Projects
            in his credit including NPA funded projects.
            <p className="mt-2">
              He has a vast administrative experience with WHO-SHEARO in the policy
              making capacity. Author of the book Health & Wellbeing for Medicos and
              Non Medicos which was inaugurated by the Vice President of India.
              He is an honorary advisor at CureBay.
            </p>
          </p>
        </div>
        <img
          src={prasunchatterjee}
          alt="More"
          className="w-1/4 h-64 mt-3 hidden md:block rounded-tr-3xl rounded-bl-3xl border-2 border-brand-lightgreen"
        />
      </div>

      <div className="md:flex flex-row mx-8 lg:mx-36 mt-6 justify-between">
        <img
          src={vasantnangia}
          alt="more"
          className="h-64 mt-3 md:hidden m-auto "
        />
        <img
          src={vasantnangia}
          alt="more"
          className="w-1/4 h-64 mt-3 hidden md:block rounded-tr-3xl rounded-bl-3xl border-2 border-brand-lightgreen"
        />
        <div className="md:w-4/6">
          <h1 className="mt-3 text-medium font-medium text-2xl ">
            Vasant Nangia
          </h1>

          <p className="mt-2 text-justify">
            Vasant Nangia is the CEO of Chumbak Design Private Ltd. Prior to this, he was Fossil Group’s
            Senior Vice-President, Asia-Pacific, managing some of the most diverse and complex markets
            in the world, including Japan, Korea, Australia and South East Asia, with a focus on building
            its e-commerce, omni-channel and analytics capabilities. Vasant is also the co-founder of
            Oyzterbay.com – the pioneer of contemporary, affordable jewellery. A graduate in Economics
            from St Stephens College Delhi, Vasant earned his MBA from IIM Calcutta. He is recognised
            as part of the core team that built market-leading Titan & Tanishq brands in the country.
            He is famously credited with the introduction of the Karat-meter - a device for quick measurement
            of the purity of gold- that marked a turning point for both Tanishq and the jewellery industry in India.
          </p>
        </div>

      </div>

      <div className="md:flex flex-row mx-8 lg:mx-36 mt-6 justify-between">
        <img
          src={birensahoo}
          alt="More"
          className="h-64 mt-3 md:hidden m-auto"
        />

        <div className="md:w-4/6">
          <h1 className="mt-3 text-medium font-medium text-2xl ">
            Dr. Biren Sahoo
          </h1>

          <p className="mt-2 text-justify">
            Dr. Sahoo is a postgraduate in medicine and has also been working in translational
            medical research. He has held positions in top management in global organizations
            like Terumo Corporation, Japan, Welch Allyn Inc, USA, amongst others and has lectured
            on research methodologies around the world.

          </p>
        </div>
        <img
          src={birensahoo}
          alt="More"
          className="w-1/4 h-64 mt-3 hidden md:block rounded-tr-3xl rounded-bl-3xl border-2 border-brand-lightgreen"
        />
      </div>


      <div className="md:flex flex-row mx-8 lg:mx-36 mt-6 justify-between">
        <img
          src={ashvannisrivastava}
          alt="more"
          className="h-64 mt-3 md:hidden m-auto "
        />
        <img
          src={ashvannisrivastava}
          alt="more"
          className="w-1/4 h-64 mt-3 hidden md:block rounded-tr-3xl rounded-bl-3xl border-2 border-brand-lightgreen"
        />
        <div className="md:w-4/6">
          <h1 className="mt-3 text-medium font-medium text-2xl ">
            Ashvanni Srivastava
          </h1>

          <p className="mt-2 text-justify">
            Ashvanni is a Global Healthcare Executive with over three decades of corporate and
            entrepreneurial work spanning strategy, growth and innovation across India, S Asia,
            USA, and the UK. His transformative work in Digital health, HealthTech Patient engagement,
            Medical devices, AI, and Analytics has been recognize globally.
            <p className="mt-2">
              Ashvanni was President of Strategic Initiatives and Board Director for strategy and
              execution at Apollo Hospitals Group, a $1.5BN. Healthcare Enterprise. As the Founder
              & CEO of HealthHiway, he built Asia’s first Health Information network that connected
              1200 Hospitals, 10,000+ Doctor Practices and Insurance. An avid learner, Ash, as
              he is fondly known, attended the Executive Management Program at The Wharton School
              of Business. He was awarded Certificate of Distinction in Innovation of Products and
              Services by MIT Sloan School of Management.
            </p>
            <p className="mt-2">
              Ashvanni is passionate about Health equity and affordable
              access to quality healthcare. He continues to engage with private
              health systems, public health agencies and Not for profit, across geographies,
              with the purpose of driving adoption of innovative next-generation technologies
              to transform and scale healthcare access.
            </p>
          </p>
        </div>

      </div>

      <div className="md:flex flex-row mx-8 lg:mx-36 mt-6 justify-between">
        <img
          src={bidhandas}
          alt="More"
          className="h-64 mt-3 md:hidden m-auto"
        />

        <div className="md:w-4/6">
          <h1 className="mt-3 text-medium font-medium text-2xl ">
            Dr. Bidhan Das
          </h1>
        
          <p className="mt-2 text-justify">
            Dr Bidhan Das is the Founder & Managing Director of Octavo Solution Pvt Ltd,
            having an experience of 30 years in the field of healthcare. He is well known
            in healthcare industry and healthcare quality as a Quality Expert. Besides being
            a MBBS from S.C.B Medical College, Cuttack, Odisha, he opted for a management
            degree of Hospital Management from AIIMS, New Delhi. He has an immense understanding
            of healthcare with wide spread domain expertise in hospital planning, project management,
            training and development, hospital management information system, Process flow mapping,
            Reengineering, Outcome Benchmarking and Scalability, healthcare financing, healthcare
            insurance, fundraising, costing, accreditation and quality assurance, patient safety,
            policy and regulatory environment, Global health etc.
          </p>
        </div>
        <img
          src={bidhandas}
          alt="More"
          className="w-1/4 h-64 mt-3 hidden md:block rounded-tr-3xl rounded-bl-3xl border-2 border-brand-lightgreen"
        />
      </div>


    </div>
  );
};

export default OurTeam;
