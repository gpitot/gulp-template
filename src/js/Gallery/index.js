

class Gallery {
    constructor(el, rows, cols, time) {
        this.DOM = {canvas: el};
        this.DOM.canvas.width = 600;
        this.DOM.canvas.height = 600;
        this.DOM.ctx = el.getContext('2d');
        this.posts = [];
        this.index = 0;

        this.rows = rows;
        this.cols = cols;
        this.time = time;


        


        this.addPost = this.addPost.bind(this);
        this.drawPost = this.drawPost.bind(this);
        this.drawTile = this.drawTile.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMousedrawFullImageOver = this.drawFullImage.bind(this);

        this.DOM.canvas.addEventListener('mousemove', this.handleMouseOver);
    }

    addPost(src) {
        const img = new Image();
        img.src = src;
        img.onload = ()=>{
            this.posts.push(img);
        }
    }


    drawPost() {
        const {rows, cols, time, posts, index, DOM} = this;
        const post = posts[index];
        const rowHeight = DOM.canvas.height / rows;
        const colWidth = DOM.canvas.width / cols;

        const clipWidth = post.width / cols;
        const clipHeight = post.height / rows;

        const delay = time / (rows * cols);

        let x = 0;
        let y = 0;
        
        const drawTile = this.drawTile;
        const iterateTiles = function() {
            if (y >= rows) {
                y = 0;
                x += 1;
            }
            if (x >= cols) {
                return;
            }
            setTimeout(()=>{
                
                drawTile(post, x * clipWidth, y * clipHeight, clipWidth, clipHeight, x * colWidth, y * rowHeight, colWidth, rowHeight)
                y += 1;
                iterateTiles();
            }, delay);
        }
        iterateTiles();
    }


    drawTile(image, clipx, clipy, clipwidth, clipheight, x, y, width, height) {
        this.DOM.ctx.drawImage(image, clipx, clipy, clipwidth, clipheight, x, y, width, height);
    }


    handleMouseOver(e) {
        //get real pos
        const pos = {
            x : e.clientX - this.DOM.canvas.getBoundingClientRect().left,
            y : e.clientY - this.DOM.canvas.getBoundingClientRect().top
        }
        const post = this.posts[this.index];

        //get index of col/row
        const {cols, rows, DOM} = this;
        const rowHeight = DOM.canvas.height / rows;
        const colWidth = DOM.canvas.width / cols;

        const column = Math.floor(pos.x / colWidth);
        const row = Math.floor(pos.y / rowHeight);

        const clipWidth = post.width / cols;
        const clipHeight = post.height / rows;

        const rect = {
            clipx : column * clipWidth,
            clipy : row * clipHeight,
            clipwidth : clipWidth,
            clipheight : clipHeight,
            x : column * colWidth,
            y : row * rowHeight,
            width : colWidth,
            height : rowHeight
        }
        console.log(rect);
        return;
        this.drawFullImage(0.5, rect);
    }

    drawFullImage(opacity, rect=null) {
        const {ctx, canvas} = this.DOM;
        const post = this.posts[this.index];
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.globalAlpha = opacity;
        ctx.drawImage(post, 0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        if (rect) {
            console.log(rect.clipx * rect.clipwidth, rect.clipy * rect.clipheight, rect.clipwidth, rect.clipheight, rect.x * rect.width, rect.y * rect.height, rect.width, rect.height)
            this.drawTile(post, rect.clipx * rect.clipwidth, rect.clipy * rect.clipheight, rect.clipwidth, rect.clipheight, rect.x * rect.width, rect.y * rect.height, rect.width, rect.height);
        }
    }
}

const gallery=new Gallery(document.getElementById('canvas'), 5, 5, 1000);
gallery.addPost('https://images.pexels.com/photos/1020315/pexels-photo-1020315.jpeg');
gallery.addPost('https://img.freepik.com/free-psd/abstract-background-design_1297-73.jpg');

setTimeout(()=>{
    gallery.drawPost();
}, 750);