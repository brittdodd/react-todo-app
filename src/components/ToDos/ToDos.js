import React, {useState, useEffect} from 'react';
import axios from 'axios'
import SingleToDos from './SingleToDos'
import {Container} from 'react-bootstrap'
import FilterCat from './FilterCat';
import './ToDos.css'


export default function ToDos() {
  const [todos, setTodos] = useState([]);

  const [filter, setFilter] = useState(0);

  const getToDos = () => {
    axios.get(`https://localhost:7101/api/Todoes`).then(response => {
      // console.clear()
      // console.log(response?.data)
      setTodos(response.data)
  })
  }
  useEffect(() => {
    getToDos()
  }, []);


  return (
    <section className='todos'>
        <article className='bg-info p-5'>
            <h1 className='text-center'>ToDos List</h1>
        </article>

        <FilterCat setFilter={setFilter} />
      <Container> 
          <article className='toDosGallery row justify-content-center'>
          
              {filter === 0 ? todos.map(x =>
              
                <SingleToDos key={x.toDoId} todos={x} getToDos={getToDos} />
              ) :
              todos.filter(x => x.toDoId === filter).map(x =>
                  <SingleToDos key={x.toDoId} todos={x} getToDos={getToDos} />
              )} 
              {filter !== 0 && todos.filter(x => x.toDoId === filter)
              .length === 0 &&
                  <h2 className='alert alert-warning text-dark'>
                    There are no results for this category.
                  </h2>
              }
          </article>
      </Container>
    </section>
  )
}
