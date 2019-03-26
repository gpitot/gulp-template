/*
upload two seperate forms
1 with confidential info 

1 with video info

video info is put into rss feed and spredfast gets this.

url = https://ninedigital.formstack.com/forms/index.php

PERSONAL DETAILS 
{
    form : 3400892,
    viewkey : YoTDi6niGO
    _submit : 1,
    field75865925-first : firstname,
    field75865925-last : lastname,
    field75865926 : email,
    field75865927 : mobile,
    field75865928 : checkbox t&c
}


VIDEO 
{
    form : 3400925,
    viewkey : Bzac7p0VOy
    _submit : 1,
    field75867599 : videofile,
    field75867600 : video name,
    field75867601 : caption
}
*/


function formstack() {
    const FORMSTACKURL = 'https://ninedigital.formstack.com/forms/index.php';


    const toUrlEncoded = obj => Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&');
    
    async function submit(e) {
        e.preventDefault();
    
        const firstname = document.querySelector('#upload input[name="firstname"]').value;
        const lastname = document.querySelector('#upload input[name="lastname"]').value;
        const email = document.querySelector('#upload input[name="email"]').value;
        const phone = document.querySelector('#upload input[name="phone"]').value;
        const tc = document.querySelector('#upload input[name="tc"]').checked;
    
        const personal = {
            form : 3400892,
            viewkey : 'YoTDi6niGO',
            _submit : 1,
            "field75865925-first" : firstname,
            "field75865925-last" : lastname,
            field75865926 : email,
            field75865927 : phone,
            field75865928 : true
        }
        console.log(personal);
        
        const personal_data = toUrlEncoded(personal);
        const config = {
            method : 'post',
            body : personal_data
        }
    
        const res = await fetch(FORMSTACKURL, config);
        console.log(res.status);
        console.log(res);
    }
    
    console.log('submit listen')
    document.getElementById('submit').addEventListener('click', submit);
}


console.log('hello');
export default formstack;