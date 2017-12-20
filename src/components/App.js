import React from 'react';
import icon from '../fonts/iconfont.css';
//import style from './App.css';
import style from './App.scss';

// export default () => {
//     return ( 
//         <h1 className="title" >
//             Hello World！ 
//         </h1>
//     );
// };

// export default () => {
//     return ( 
//         <div className={style.title} >
//             Hello World！ 
//         </div>
//     );
// };


// export default () => {
//     return ( 
//         <img className={style.img1} />
//     );
// };

//多个className 可以拼接字符串
//<i className={`${icon.iconfont} ${icon["icon-edit"]}`} ></i>
export default () => {

    const onClick = (e) =>{
        console.log(e.target);
    }

    return (
        <div className={style.img1}>
            <a title="编辑" onClick={onClick}>
                <i className={[icon.iconfont,icon["icon-edit"]].join(" ")}
                    style={{ color:"red",fontSize:"20px",float:"right"}}
                ></i>
            </a>
        </div>
    );
};