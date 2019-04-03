class Scroller {
    constructor() {
        this.points =[];
        this.prevScrollPos = 0;
        this.headerShowing = true;
        this.handleScroll = this.handleScroll.bind(this);

        this.navbar = document.querySelector('.header')

        window.addEventListener('scroll', this.handleScroll);
    }

    addPoint(point) {
        /*
        {
            element : 
            removeOnReached : true/false,
            fn : function () {occurs when reached}
        }
        */
        point.offsetTop = point.element.getBoundingClientRect().top + window.pageYOffset;
        this.points.push(point);
        //.getBoundingClientRect().top + window.pageYOffset
        
        //order points by y point (REVERSE ORDER SO CAN REMOVE IN LOOP LATER)
        this.points = this.points.sort((a,b)=>{return (point.offsetTop < b.offsetTop) ? 1 : -1})
       
    }


    handleScroll(e) {

        



        //header 
        const currentScrollPos = window.pageYOffset;
        
        if (this.headerShowing === false) {
            if (this.prevScrollPos > currentScrollPos) {
                this.navbar.style.transform = "translateY(0)";
                this.headerShowing = true;
            }
        } else {
            if (this.prevScrollPos <= currentScrollPos) {
                this.navbar.style.transform = "translateY(-45px)";
                this.headerShowing = false;
            }
        }
        this.prevScrollPos = window.pageYOffset;
    }

}

export default Scroller;