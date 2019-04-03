import 'whatwg-fetch'
import ArrowClicks from './js/gallery/index';
import {DisplaySection} from './js/upload/index';
import getData from './js/stream/index';
import smoothscroll from 'smoothscroll-polyfill';
import Scroller from './js/scroller';

// kick off the polyfill!
smoothscroll.polyfill();

ArrowClicks();
getData();

DisplaySection();

new Scroller();