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
