const openvideo = document.getElementById('openvideo');
const vid = openvideo.querySelector('video');


function PlayVideo(e) {
    console.log(e.target);
    /* 
    add class to video to make full screen
    -play video
    -show controls
    -show close btn (thru css parent)

    */

    //set video to #openvideo vid
    //show
    let src;
    if (e.target.nodeName==='VIDEO') {
        src = e.target.src;
    } else if (e.target.nodeName==='IMG') {
        src = e.target.previousElementSibling.src;
    } else {
        src = e.target.querySelector('video').src;
    }
    vid.src = src;
    openvideo.style.display="block";
    setTimeout(()=>{
        openvideo.style.opacity="1";
        openvideo.style.zIndex = "2";
        setTimeout(()=>{
            vid.play();
        }, 1000);
    }, 50);
    
}


function stopVideo(e) {
    //check that e is the outer not video etc
    if (e.target.nodeName==='VIDEO') return;
    openvideo.style.display="none";
    openvideo.style.opacity="0";
    openvideo.style.zIndex = "0";
    vid.pause();
}


openvideo.addEventListener('click', stopVideo);

export default PlayVideo;