class Map {
    constructor(data, sign, dimensions) {
        //data is coords and heat,
        //sign is heat of current mouse pos
        this.current = null;
        this.data = data;
        this.sign = sign;
        this.dimensions = dimensions;

        

        this.data.forEach((d)=>{
            d.color = this.getColorFromTemp(d.temp);
            d.image = this.loadImages(d);
        });
    }

    
    getColorFromTemp(temp) {
        //max temp for now is 80
        return 255 - Math.ceil(255 * (temp / 60));
    }

    loadImages(state) {
        const image = new Image();
        image.src = state.src;
        return image;
    }
    


    mouseMove(rgb) {
        const closest = this.getState(rgb);
        if (closest !== this.current) {
            this.current = closest;
            this.updateSign();

            if (this.current === null || this.current.image.complete) {
                this.drawHighlights(this.current);
            }
        } 


    }


    getState(rgb) {
        //gets state of current pos
        const data = this.data;
        for (let i=0;i<data.length;i++) {
            let c = data[i].detectColor;
            if (rgb === c) return data[i];
        }
        return null;
    }

    getClosestCity(coord) {
        let closest = null;
        let closestDist = null;
        const data = this.data;
        for (let i=0;i<data.length;i++) {
            let c = data[i].coords;
            let xDist = Math.abs(coord.x - c.x);
            let yDist = Math.abs(coord.y - c.y);
            if (xDist < 20 && yDist < 20) {
                if (closestDist > (xDist + yDist) || closestDist === null) {
                    closest = data[i];
                    closestDist = xDist + yDist;
                }
            }
            
        }

        return closest;
    }

    


    updateSign() {
        if (this.current === null) {
            this.sign.getElementsByClassName('.temp').innerHTML = '';
            this.sign.getElementsByClassName('.city').innerHTML = '';
            return;
        }
        this.sign.style.background = `rgb(${this.current.color}, 0, 0)`;
        //this.sign.style.background = `rgb(240, 0, 0)`;
        this.sign.getElementsByClassName('temp')[0].innerHTML = this.current.temp;
        this.sign.getElementsByClassName('city')[0].innerHTML = this.current.city;
    }
}



class Canvas {
    constructor(canvas, detectCanvas, map, mapimg, detectmapImg) {
        this.canvas = canvas;

        mapimg.onload = ()=>{
            this.canvas.width = mapimg.width;
            this.canvas.height = mapimg.height;
        }
        
        this.ctx = canvas.getContext('2d');

        this.detectCanvas = detectCanvas;
        
        this.detectCtx = detectCanvas.getContext('2d');
        
        this.map = map;
        

        


        this.mouseMove = this.mouseMove.bind(this);
        this.drawHighlights = this.drawHighlights.bind(this);
        this.mouseClick = this.mouseClick.bind(this);

        this.map.drawHighlights = this.drawHighlights;



        detectmapImg.onload = ()=>{
            console.log('MOve');
            this.detectCanvas.width = detectmapImg.width;
            this.detectCanvas.height = detectmapImg.height;
            this.origin = {
                x : this.canvas.getBoundingClientRect().x,
                y : this.canvas.getBoundingClientRect().y
            }
            detectmapImg.style.display = "none";
            this.detectCtx.drawImage(detectmapImg, 0, 0, this.detectCanvas.width, this.detectCanvas.height);
            this.canvas.addEventListener('mousemove', this.mouseMove);
            this.canvas.addEventListener('click', this.mouseMove);
        }
        
    }

    mouseClick(e) {
        /*
        const pos = {
            x : e.clientX - this.origin.x,
            y : e.clientY - this.origin.y
        }
        const xPercent = (e.clientX - this.origin.x) / 9;
        const yPercent = (e.clientY - this.origin.y) / 9;
        */
        console.log('mouse pos', e.clientX, e.clientY)
        const pos = {
            x : e.clientX - this.canvas.getBoundingClientRect().left,
            y : e.clientY - this.canvas.getBoundingClientRect().top
        }
        const data = this.detectCtx.getImageData(pos.x, pos.y, 1, 1).data
        console.log(data[0],data[1],data[2]);
    }


    mouseMove(e) {
        //give map coords of mouseover relative to 0 , 0
        const pos = {
            x : e.clientX - this.canvas.getBoundingClientRect().left,
            y : e.clientY - this.canvas.getBoundingClientRect().top
        }

        //send data of color of detect map
        const rgb = this.detectCtx.getImageData(pos.x, pos.y, 1, 1).data.slice(0, 3).join('');
       
        this.map.mouseMove(rgb)
    }


    drawHighlights(state) {
        //clear canvas
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (state !== null) {
            ctx.drawImage(state.image, 0, 0, this.canvas.width, this.canvas.height);
        }
        
    }


    
}





/*
Sydney 43.4
Canberra 41.6
Melbourne 42.8
Adelaide 46.6
Perth 402.1   
Darwin 34.5
Alice Springs 45.6    
Townsville 39.3
Hobart 37.9   
Brisbane 34.8
*/

///data 
const states = [
    {
        detectColor : '10000',
        state : 'wa',
        city : 'Perth',
        temp : 42.1,
        src : 'slices/wa.png'
    },

    {
        detectColor : '00200',
        state : 'nt',
        city : 'Darwin',
        temp : 34.5,
        coords_percent : {
            x1 : 38.7,
            y1: 3.3,
            x2 : 62, 
            y2: 45.3
        },
        src : 'slices/nt.png'
    },

    {
        detectColor : '20000',
        state : 'sa',
        city : 'Adelaide',
        temp : 46.6,
        src : 'slices/sa.png'
    },

    {
        detectColor: '2001000',
        state : 'qld',
        city : 'Brisbane',
        temp : 34.8,
        src : 'slices/qld.png'
    },

    {
        detectColor : '00100',
        state : 'nsw',
        city : 'Sydney',
        temp : 43.4,
        src : 'slices/nsw.png'
    },

    {
        detectColor : '02000',
        state : 'tas',
        city : 'Hobart',
        temp : 37.9,
        src : 'slices/tas.png'
    },

    {
        detectColor : '01000',
        state : 'vic',
        city : 'Melbourne',
        temp : 42.8,
        src : 'slices/vic.png'
    },

    {
        detectColor : '2550200',
        state : 'act',
        city : 'Canberra',
        temp : 42.8,
        src : 'slices/act.png'
    }
]
console.log('load');
const c = document.getElementById('heatmap');
const d = document.getElementById('detect-heatmap');


const sign = document.getElementById("sign");

const map = new Map(states, sign, {width: mapimg.width, height:mapimg.height});
const canvas = new Canvas(c, d, map, document.getElementById('mapimg'), document.getElementById('detect-mapimg'));