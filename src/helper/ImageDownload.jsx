import { saveAs } from 'file-saver'
export const DownloadImage = (image) => {
    // console.log("image", image)
    // fetch(process.env.REACT_APP_IMG_BASEURL + image, {
    //     method: "GET",
    //     headers: {}
    // })
    //     .then((response) => {
    //         response.arrayBuffer().then(function (buffer) {
    //             const url = window.URL.createObjectURL(new Blob([buffer]));
    //             const link = document.createElement("a");
    //             link.href = url;
    //             link.setAttribute("download", image); //or any other extension
    //             document.body.appendChild(link);
    //             link.click();
    //         }); 
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });

    saveAs(process.env.REACT_APP_IMG_BASEURL+image, image)
};


export const viewImage = (image) => {
    window.open(process.env.REACT_APP_IMG_BASEURL + image, 'Image', 'width=largeImage.stylewidth,height=largeImage.style.height,resizable=1');
}

