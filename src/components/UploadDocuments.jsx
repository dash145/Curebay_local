import React from 'react';
import { useState } from 'react';

function UploadDocuments(props) {

    const [uploadData, setDoc] = useState({
        "createdBy": "aliquip Ut nulla Excepteur",
        "document": "Base64 String",
        "documentRequired": "irure fugiat enim",
        "documentType": "Duis incididunt",
        "enteredBy": "reprehenderit enim",
        "fromDate": "1942-04-11 13:58:17",
        "givenDate": "1961-04-14 14:35:05",
        "modifiedBy": "laborum cillum",
        "notes": "ut Lorem aliqua",
        "patientCode": "et adipisicing",
        "reportType": "consectetur sunt deserunt consequat Excepteur",
        "status": 1,
        "title": "Ut dolor dolore",
        "toDate": "1999-06-06 12:14:39",
        "userCode": "elit",
        "userName": "aute veniam dolor reprehenderit qui"
    })
    const changeHandler = async (file) => {
        setDoc({ ...uploadData, ['document']: b64File });
        let b64File = await encodeBase64File(file);
        setDoc({ ...uploadData, ['document']: b64File });
    }


    return (
        <div>
            <label className="cursor-pointer text-xs bg-brand-secondary text-white font-normal rounded">
                <input type='file' accept="image/*,.pdf" onChange={(e) => { changeHandler(e.target.files[0]) }} className="hidden" />
                <img src={camera} alt="camera" className="w-5" />
            </label>
        </div>
    );
}
export default UploadDocuments;