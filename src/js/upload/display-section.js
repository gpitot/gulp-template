const heights = {
    upload_personal : [
        {
            window : 450,
            height : '510px'
        },
        {
            window : 1000,
            height : '315px'
        }
    ],
    upload_video : [
        {
            window : 450,
            height : '510px'
        },
        {
            window : 1000,
            height : '415px'
        }
    ]
}


function getCorrectMaxHeight(section) {
    const options = heights[section];
    for (let i=0;i<options.length;i++) {
        if (window.innerWidth < options[i].window) return options[i].height;
    }
    return options[options.length-1].height;
}

//get url params
//display correct section
function DisplaySection() {
    function beginUpload() {
        //hide details
        //shopw upload
        document.getElementById('details').style.maxHeight = "0"

        setTimeout(()=>{
            document.getElementById('upload-personal').style.display="flex";
            document.getElementById('upload').style.maxHeight = getCorrectMaxHeight('upload_personal');
        }, 800);        
    }


    function uploadVideo() {
        //get unique id of personal details
        const id = (new URL(window.location.href)).searchParams.get('id');
        document.getElementById('personal-entry-id').value = id;
        document.getElementById('details').style.maxHeight = "0"

        setTimeout(()=>{
            document.getElementById('upload-video').style.display="flex";
            document.getElementById('upload').style.maxHeight = getCorrectMaxHeight('upload_video');
        }, 800); 
    }

    function thankYou() {
        window.history.pushState({}, "", "/thankyou");
        document.getElementById('details').style.maxHeight = "0"

        

        setTimeout(()=>{
            document.getElementById('thanks').style.display="flex";
            
        }, 800); 
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