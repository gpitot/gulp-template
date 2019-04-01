

//get url params
//display correct section
function DisplaySection() {
    function beginUpload() {
        //hide details
        //shopw upload
        document.getElementById('details').style.display = "none";
        document.getElementById('upload').style.display = "block";
    
        document.getElementById('upload-personal').style.display = "flex";
    }


    function uploadVideo() {
        //get unique id of personal details
        const id = (new URL(window.location.href)).searchParams.get('id');
        document.getElementById('personal-entry-id').value = id;
        document.getElementById('details').style.display = "none";
        document.getElementById('upload').style.display = "block";
        document.getElementById('upload-personal').style.display = "none";
        document.getElementById('upload-video').style.display = "block";
    }

    function thankYou() {
        document.getElementById('details').style.display = "none";
    }
    
    
    const beginUploadBtn = document.getElementById('begin-upload');
    beginUploadBtn.addEventListener('click', beginUpload);

    const view = (new URL(window.location.href)).searchParams.get('view');
    console.log(view);
    if (view === 'video-form') {
        uploadVideo();
        console.log('video form')
    } else if (view === 'complete') {
        console.log('thanks')
        thankYou();
    }


    
}





export default DisplaySection;