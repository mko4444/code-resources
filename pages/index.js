import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import "isomorphic-fetch"

import data from '../data';
import Cell from '../components/cell';

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
  let [ projects, setProjects ] = useState({});

  useEffect(() => {
    console.log(query.cat);
    loadPage("audio");
    // expands the category that contains the active subcategory
    !!query.cat && document.getElementById(`cat_${query.cat}`).classList.add('expand')
  }, [])


  function loadPage(e){

    var projects = {}
    var parents = data.categories.filter(p => p.parent === e);
    
    for (var i = 0; i < parents.length; i++) {
      var d = data.projects.filter(p => p.category === parents[i].id)
      projects[parents[i].id] = [];
      for (var j = 0; j < parents.length; j++) {
        projects[parents[i].id].push(d[j]);
      }
    }

    console.log(projects);
    setProjects(projects);

  }


  let currentCat = data.categories.filter(x => x.id === query.id)[0] || false
  return(
    <div className='app'>
      <ul className='sc--sidebar'>
      {
        Object.keys(categories).map((item, index) => {
          let name = item.toLowerCase().replace(' ', '-') // we want to clean the strings for the url query
          return(
            <li id={`cat_${name}`}>
              {/* <div className='row-fs-c' onClick={() => router.push({pathname: '/', query: { cat: name }})}><span>{name}</span></div> */}
              <div className='row-fs-c' onClick={() => loadPage(name)}><span>{name}</span></div>
            </li>
          )
        })
        }
      </ul>
      <section className='sc--main col'>
        <h1>{currentCat.title || 'Projects'}</h1>
        {Object.keys(projects).map((p, i) => {

          return(
            <div>
              <p>{p}</p>
              <ul>
                {
                  projects[p].map((project, i) => {
                    if (project != undefined) {
                      return (
                        <li><Cell name={project.title} href={project.homepage} desc={project.description}/></li>
                      )
                    }
                  })
                }
              </ul>
            </div>
          )

        })
        }
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
