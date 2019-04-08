const heights = {
    upload_personal : [
        {
            window : 500,
            height : '580px'
        },
        {
            window : 1000,
            height : '385px'
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


    function uploadVideo(params) {
        //get unique id of personal details
        const id = params.id;
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

        const s = document.createElement('script');
        s.src = "//nexus.ensighten.com/suncorp/sun-bw-prod/Bootstrap.js";
        document.head.appendChild(s);

        setTimeout(()=>{
            document.getElementById('thanks').style.display="flex";
            
        }, 800); 
    }
    
    
    const beginUploadBtn = document.getElementById('begin-upload');
    beginUploadBtn.addEventListener('click', beginUpload);


    /*
    const view = (new URL(window.location.href)).searchParams.get('view');
    console.log(view);
    if (view === 'video-form') {
        uploadVideo();
        console.log('video form')
    } else if (view === 'complete') {
        console.log('thanks')
        thankYou();
    }

    */
    const params = getParams();
    console.log(params);
    if (params.view === 'video-form') {
        uploadVideo(params);
    } else if (params.view === 'complete') {
        thankYou();
    }
    
}

function getParams() {
    const url = window.location.href.split('?');
    let opts;
    let params = {};
    if (url.length > 1) {
        opts = url[1].split('&');
        for (let i=0;i<opts.length;i++) {
            const [name, value] = opts[i].split('=');
            params[name] = value;
        }
    }
    return params;
}



export default DisplaySection;