import math from './math';
console.log('The print.js module has loaded! See the network tab in dev tools...');

export default () => {
  math.aa();
  console.log('Button Clicked: Here\'s "some text"!');
}