import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import data from '../data';
import Cell from '../components/cell';
let cn = require('classnames');

export default ({ }) => {
  const toggleExpand = className => document.getElementById('cat_' + className).classList.contains('expand') ? document.getElementById('cat_' + className).classList.remove('expand') : document.getElementById('cat_' + className).classList.add('expand')
  return(
    <div className='app'>
      <ul className='sc--sidebar'>
        {Object.keys(data).map((x, index) => {
          return !Array.isArray(data[x])
          ? <li id={`cat_${x}`}>
              <div className='row-fs-c' onClick={() => toggleExpand(x)}><div className='col-c-c'>▶︎</div><span>{x}</span></div>
              <ul>
                {Object.keys(data[x]).map((y, index) => <li className='row-fs-c'><span>{data[x][y].name}</span></li>)}
              </ul>
            </li>
          : <li className='row-fs-c'><span>{x}</span></li>
        })}
      </ul>
      <section className='sc--main col'>
        <h1>Category</h1>
        <ul>
          <li><Cell name="name" href="link" desc="desc"/></li>
          <li><Cell name="name" href="link" desc="desc"/></li>
        </ul>
        <ul>
          <li><Cell name="name" href="link" desc="desc"/></li>
          <li><Cell name="name" href="link" desc="desc"/></li>
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
