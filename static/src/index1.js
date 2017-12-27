//import _ from 'lodash';
//import math from './math';

function component(){
    var element = document.createElement('div');
    var button = document.createElement('button');
    var br = document.createElement('br');
    button.innerHTML = 'Click me and look at the console!';

    element.innerHTML = "hhhhh"; // _.join(['hello','chunk'],' ');
    element.appendChild(br);
    element.appendChild(button);

    button.onclick = e => {
        return import(/* webpackChunkName: "print"*/ './print').then(module => {
            var print = module.default; //获取print函数;
            print();
        });
    };

    return element;
    
}

function component1(){
    var element = document.createElement('div');
    var button = document.createElement('button');
    var br = document.createElement('br');
    button.innerHTML = 'Click me and look at the console!';

    element.innerHTML = "bbbb"; //_.join(['hello','chunk1'],' ');
    element.appendChild(br);
    element.appendChild(button);

    button.onclick = e => {
        return import(/* webpackChunkName: "print1"*/ './print1').then(module => {
            var print = module.default; //获取print函数;
            print();
        });
    };

    //当print模块已经被加载 则访问浏览器缓存文件 否则发起请求
    button.onmouseover = e => {
        return import(/* webpackChunkName: "print"*/ './print').then(module => {
            var print = module.default; //获取print函数;
            print();
        });
    };

    return element;
    
}

document.body
    .appendChild(component())
    .appendChild(component1());


    // async function getComponent() {  
    //     var element = document.createElement('div');
    //     //const _ = await import(/*webpackChunkName:"lodash" */ 'lodash');
    //     element.innerHTML = "cccccc"; //_.join(['aa','bbb'],'ccc');
    //     return element;
    // }
    
    // getComponent().then(component=>{
    //     document.body.appendChild(component);
    // });