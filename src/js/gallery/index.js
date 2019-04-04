


function scrollToItem(itemPosition, numItems, scroller) {
    const position = Math.floor(scroller.scrollWidth * (itemPosition / numItems));
    scroller.scrollTo({
        left: position,
        behavior: 'smooth'
    })
    
}

const gallery = document.querySelector('.tips .items');
const items = document.querySelectorAll('.tips .item');
const arrows = document.querySelectorAll('.tips .arrow');
let index = 0;

let itemWidth = items[0].getBoundingClientRect().width;

function arrowClicks() {
    arrows[0].addEventListener('click', ()=>{
        index = gallery.scrollLeft / itemWidth;
        let newindex = index -1;
        if (newindex < 0) {
            newindex = items.length - 1;
        }
        index = newindex;
        scrollToItem(newindex, items.length, gallery);
    });
    
    arrows[1].addEventListener('click', ()=>{
        index = gallery.scrollLeft / itemWidth;
        let newindex = index + 1;
        if (newindex >= items.length) {
            newindex = 0;
        }
        index = newindex;
        scrollToItem(newindex, items.length, gallery);
    });
}



export default arrowClicks;