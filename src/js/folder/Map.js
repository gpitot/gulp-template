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