const uploadVid = document.getElementById('upload-video')
const submitBtn = uploadVid.querySelector('input[type="submit"]');

function beginUpload(e) {
    
    submitBtn.value = "Uploading...";
    submitBtn.parentElement.classList.add('uploading');
    
    /*
    formstack doesnt accept client side requests!!

    const form = new FormData();
    const video = uploadVid.querySelector('input[type="file"]');
    const name = uploadVid.querySelector('input[name="field75867600"]');
    const UID = uploadVid.querySelector('input[name="field75867602"]');

    form.append('form', '3400925');
    form.append('viewkey', 'Bzac7p0VOy');
    form.append('_submit', '1');
    form.append('field75867599', video);
    form.append('field75867600', name);
    form.append('field75867602', UID);

    const url = 'https://ninedigital.formstack.com/forms/index.php';
    const config = {
        method : 'POST',
        body : form
    }

    fetch(url, config)
        .then((res) => {
            console.log(res);
        });
    */
}

function LoadingAnim() {
    submitBtn.addEventListener('click', beginUpload);

}


export default LoadingAnim;