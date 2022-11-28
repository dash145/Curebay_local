export const encodeBase64File = (file) => {
    return new Promise(resolve => {
        let fileInfo;
        let baseURL = "";
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            baseURL = reader.result;
            console.log(baseURL.split(',')[1]);
            resolve(baseURL.split(',')[1]);
        };
        console.log(fileInfo);
    });
}