import { useState, useEffect } from 'react';
import data from '../data';
let cn = require('classnames');

export default ({ }) => {
  const toggleExpand = className => {
    console.log(className)
    document.getElementById('cat_' + className).classList.contains('expand') ? document.getElementById('cat_' + className).classList.remove('expand') : document.getElementById('cat_' + className).classList.add('expand')
  }
  return(
    <div className='app'>
      <nav className='sc--sidebar'>
        <ul>
          {Object.keys(data).map((x, index) => {
            return Array.isArray(data[x])
            ? <li id={`cat_${x}`}>
                <div className='row-fs-c' onClick={() => toggleExpand(x)}><div className='col-c-c'>▶︎</div>{x}</div>
                <ul>
                  {Object.keys(data[x]).map((y, index) => {
                    console.log(y)
                    return(
                      <li className='row-fs-c'>{data[x][y].name}</li>
                    )
                  }
                  )}
                </ul>
              </li>
            : <li className='row-fs-c'>{x}</li>
          })}
        </ul>
      </nav>
      <section className='sc--main col'>
        <h1>Category</h1>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <h2>Sub-category</h2>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </section>
    </div>
  )
}
