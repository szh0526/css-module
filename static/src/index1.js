import _ from 'lodash';

function component(){
    var element = document.createElement('div');
    var button = document.createElement('button');
    var br = document.createElement('br');
    button.innerHTML = 'Click me and look at the console!';

    element.innerHTML = _.join(['hello','webpack'],' ');
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

document.body.appendChild(component());