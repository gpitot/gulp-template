
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