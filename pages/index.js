import { useState, useEffect } from 'react';
import data from '../data';
let cn = require('classnames');

export default ({ }) => {
  const toggleExpand = className => document.getElementById(className).classList.contains('expand') ? document.getElementById('cat1').classList.remove('expand') : document.getElementById('cat1').classList.add('expand')
  return(
    <div className='app'>
      <nav className='sc--sidebar'>
        <ul>
          {Object.keys(data).map((item, index) => {
            data[item].isArray()
            ? <li id={`cat_${index}`}>
                <div className='row-fs-c' onClick={() => toggleExpand(`cat_${index}`)}><div className='col-c-c'>▶︎</div>category</div>
                <li className='active row-fs-c'>test</li>
                <li className='row-fs-c'>test</li>
                <li className='row-fs-c'>test</li>
              </li>
            : <li className='row-fs-c'>{item}</li>
          })}
        </ul>
      </nav>
      <section className='sc--main col'>

      </section>
    </div>
  )
}
