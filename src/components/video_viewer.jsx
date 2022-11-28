import React from 'react'

function video_viewer() {

  
    const iframe = `<iframe height="465" style="width: 100%;"  src="https://support.maggieplus.com/admin/webevent/#/meeting/36595379"></iframe>`;
    return (
        <>
            <div className="bg-gray-100 lg:py-4">
                <div dangerouslySetInnerHTML={{ __html: iframe }} />
            </div>
        </>
    );
}
export default video_viewer;