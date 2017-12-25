import React from 'react';
import icon from 'iconfont';
//import style1 from 'appModuleCss';
import style from 'appModuleScss';
import { cube } from 'commonJs';

//多个className: https://www.npmjs.com/package/classnames 
//<i className={`${icon.iconfont} ${icon["icon-edit"]}`} ></i>
export default () => {

    const onClick = (e) =>{
        debugger;
        console.log(cube(5));
    }

    return (
        <div className={style.img1}>
            <a title="编辑" onClick={onClick}>
                <i className={[icon.iconfont,icon["icon-edit"]].join(" ")}
                    style={{ color:"blue",fontSize:"20px",float:"right"}}
                ></i>
            </a>
        </div>
    );
};