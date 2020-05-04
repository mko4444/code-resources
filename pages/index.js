import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import "isomorphic-fetch"
let cn = require('classnames');

const parseCategories = data => {
  let categories = {}

  // the following creates an object containing all 'parent' categories, with empty arrays as values
  data.map(c => !!c.parent ? categories[c.parent.toLowerCase().replace(' ', '-')] = [] : null)

  // fills those values with the proper categories
  Object.keys(categories).map(t => categories[t] = data.filter(c => !!c.parent && c.parent === t))

  return categories
}

const App = ({ data, query }) => {
  const toggleExpand = className => document.getElementById('cat_' + className).classList.contains('expand') ? document.getElementById('cat_' + className).classList.remove('expand') : document.getElementById('cat_' + className).classList.add('expand')
  let [ categories, setCategories ] = useState(parseCategories(data.categories)),
      router = useRouter();


  useEffect(() => {
    // expands the category that contains the active subcategory
    document.getElementById(`cat_${query.cat}`).classList.add('expand')
  }, [])

  return(
    <div className='app'>
      <ul className='sc--sidebar'>
      {
        Object.keys(categories).map((item, index) => {
          let name = item.toLowerCase().replace(' ', '-') // we want to clean the strings for the url query
          return(
            <li id={`cat_${name}`}>
              <div className='row-fs-c' onClick={() => toggleExpand(name)}><div className='col-c-c'>▶︎</div><span>{name}</span></div>
                <ul>
                  {categories[item].map((y, index) =>
                    <li
                      onClick={() => router.push({pathname: '/', query: { cat: name, id: y.id }})}
                      className={cn(['row-sb-c', {'active': query.id === y.id}])}
                    >
                      <span>{y.title}</span>
                      <span style={{opacity: .5}}>{data.projects.filter(x => x.category === y.id).length}</span>
                    </li>
                  )}
                </ul>
            </li>
          )
        })
        }
      </ul>
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

App.getInitialProps = async ({ query }) => {
  let res = await fetch('https://raw.githubusercontent.com/matteocrippa/awesome-swift/master/contents.json')
  let data = await res.json()
  return {
    data: data,
    query: query
  }
}

export default App
