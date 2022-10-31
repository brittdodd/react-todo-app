import React, { useState} from 'react'
import {useAuth} from '../../contexts/AuthContext'
import {FaTrashAlt, FaEdit} from 'react-icons/fa'
import ToDosEdit from './ToDosEdit';
import axios from 'axios'

export default function SingleToDos(props) {

  const {currentUser} = useAuth()

  const  [showEdit, setShowEdit] = useState(false);

  const deleteToDos =(id) => {
    if(window.confirm(`Are you sure you want to delete${props.todos.name}?`)) {
      axios.delete(`https://localhost:7101/api/ToDoes/${id}`).then(() => {props.getToDos()})
    }
  }

  return (
    <div className='singleToDos col-md-5 m-4'>
  
      {
        currentUser.email === process.env.REACT_APP_EMAIL_ADMIN && 
        <div>
          <button id='editLink' onClick={() => setShowEdit(true)}>
            <FaEdit />
          </button>
          <button className='m-1 rounded' id='deleteLink' onClick={() => deleteToDos(props.todos.todosId)}>
              <FaTrashAlt />
            </button>

          {showEdit &&
            <ToDosEdit
              todos={props.todos}
              showEdit={showEdit}
              setShowEdit={setShowEdit}
              getToDos={props.getToDos} />
          }
        </div>
      }
        <h3>{props.todos.name}</h3>
        {props.todos.description !==null ?
            <p>{props.todos.description}</p> :
            <p>No Description Provided</p>
        }
        <a href={props.todos.url} target='_blank' rel='noreferrer' className='btn btn-info'>
            Visit {props.todos.linkText}
        </a>
    </div>
  )

//   return (
//     <div className="singleToDos col-md-5 m-4">
//         <h3>
//             {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN && (
//                 <div style={{ border: "1px solid white", padding: "2px 5px", background: "pink" }}>
//                     <button id="editLink" onClick={() => setShowEdit(true)}>
//                         <FaEdit />
//                     </button>
//                 </div>
//             )}
            
//             {props.todos.name}

//             {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN && (
//                 <div style={{ border: "1px solid white", padding: "2px 5px", background: "pink" }}>
//                     <button className="m-1 rounded" id="deleteLink" onClick={() => deleteToDos(props.todos.toDosId)}>
//                         <FaTrashAlt />
//                     </button>
//                 </div>
//             )}
            
//         </h3>
//         {showEdit && <ToDosEdit todos={props.todos} showEdit={showEdit} setShowEdit={setShowEdit} getToDos={props.getToDos} />}
//         {props.todos.description !== null ? <p>{props.todos.description}</p> : <p>No Description Provided</p>}
//         <a href={props.todos.url} target="_blank" rel="noreferrer" className="btn btn-info">
//             Visit {props.todos.linkText}
//         </a>
//     </div>
// );
}
