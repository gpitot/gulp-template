import Bricks from 'bricks.js';
import PlayVideo from './video';
/* 
get data from spredfast stream
the name and caption is encoded in the content !!!!



example content 
<p><strong>File:</strong> https://s3.amazonaws.com/...f6e42fedc.mov</p> <p><strong>Display Name:</strong> vid name</p> <p><strong>Video Caption:</strong> caasdfasdf</p>
*/



let posts = [];
let displayIndex = 0;
let loading = true;
let displaying = false;

const randomNum = Math.ceil((Math.random() * 1000)) + 1000;

//demo url 
const SPREDFASTSTREAM = `http://api.massrelevance.com/6nbck80kd6/nissan-topshot-wwos-2018-v3.json?tweet_mode=extended&status=1&limit=${randomNum}`

//const SPREDFASTSTREAM = `http://api.massrelevance.com/6nbck80kd6/suncorp-netball-2019.json?tweet_mode=extended&status=1&limit=${randomNum}`;

function decodeContent(content) {
    //get name
    //find display name:</strong> 
    //get all text until </p>
    
    const name = find_text("Display Name:</strong>", "</p>");
    const caption = find_text("Video Caption:</strong>", "</p>")

    return {
        name,
        caption
    }

    function find_text(firstvariable, secondvariable) {
        const reg = new RegExp("(?:"+firstvariable+")(.*?)(?:"+secondvariable+")", "ig");
        const x = reg.exec(content);
        if (x && x.length > 1) {
            return x[1].trim();
        }
        return '';
    }
}

function parseData(data) {
    
    for (let i=0;i<data.length;i++) {
        const enc = data[i].content ? data[i].content.encoded : '';
        let post = {
            ...decodeContent(enc),
            src : data[i].title
        }
        if (data[i].title) {
            posts.push(post);
        }
        
    }
    loading = false;
    display();
}


async function getData() {
    try {
        const resp = await window.fetch(SPREDFASTSTREAM, {});
        const data = await resp.json();
        
        parseData(data);
    } catch(err) {
        console.log(err);
    }
}




function display() {
    if (loading || displaying) return;
    displaying = true;
    setTimeout(() => {
        displaying = false;
    }, 500);
    loadmore.innerText = "load more"
    //add posts[displayIndex] - posts[displayIndex+10] to #posts area
    const postDiv = document.getElementById('posts');
    for (let i=displayIndex;i<displayIndex+10;i++) {

        if (i >= posts.length) break;

        let outer = document.createElement('div');
        outer.classList.add('post', 'loading');



        let videoOuter = document.createElement('div');
        videoOuter.classList.add('video-outer');
        
        let vid = document.createElement('video');
        vid.src = posts[i].src; 
        //add listener to vid for click
        videoOuter.addEventListener('click', PlayVideo);


        //play btn
        let playBtn = new Image();
        playBtn.src = 'images/playbtn.png';
        playBtn.classList.add('play-btn');

        videoOuter.appendChild(vid);
        videoOuter.appendChild(playBtn);


        //caption and name
        let subtext = document.createElement('div');
        subtext.classList.add('subtext');
        let name = document.createElement('div');
        name.classList.add('name');
        name.innerText = posts[i].name;

        let caption = document.createElement('div');
        caption.classList.add('caption');
        caption.innerText = posts[i].caption;

        subtext.appendChild(name);
        subtext.appendChild(caption);


        outer.appendChild(videoOuter);
        outer.appendChild(subtext);
        postDiv.appendChild(outer);

        brick.update();

        vid.addEventListener('loadeddata', ()=>{   
            vid.parentElement.parentElement.classList.remove('loading');
            brick.pack();
        });
    }

    displayIndex += 10;
}

const grid = document.querySelector('#posts');
const brick = Bricks({
    container : grid,
    packed : 'data-packed',
    sizes : [
        {columns : 1, gutter : 10},
        {mq : '475px', columns : 2, gutter : 10},
        {mq : '750px', columns : 3, gutter : 10},
    ],
    position: true
})

brick.pack()
const loadmore = document.getElementById('loadmore');
loadmore.addEventListener('click', display);



/* scroll to bottom trigger display */
window.addEventListener('scroll', function() {
    //check if loadmore button top is >= pageyoffset + height
    if (loadmore.getBoundingClientRect().top <=  window.innerHeight) {
        loadmore.innerText = "loading..."
        setTimeout(display, 500);
        //display();
    }
})



/* weekly winner play 
*/
const winner = document.getElementById('weekly-winner')
winner.addEventListener('click', PlayVideo);

export default getData;