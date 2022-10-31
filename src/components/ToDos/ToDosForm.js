import React, {useState, useEffect} from 'react'
import { Formik, Field, Form } from 'formik'
import { todosSchema } from '../../utilities/validationSchema'
import axios from 'axios' 

export default function ToDosForm(props) {
  
   
    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        axios.get(`https:localhost:7101/api/Categories`).then
        (response => setCategories(response.data))
    }

    const handleSubmit = (values) => {
        console.log(values) 
        
        if(!props.todos) {
            const todosToCreate = values

            axios.post(`https://localhost:7101/api/ToDoes`, todosToCreate)
            .then(() => {
                props.getToDos() 
                props.SetShowCreate(false) 
            })
        }
        else{
            const todosToEdit ={
                todosId: props.todos.todosId,
                name: values.name, 
                done: values.done,
                categoryId: values.categoryId
            }

            axios.put(`https://localhost:7101/api/ToDoes/${props.todos.todosId}`, 
            todosToEdit).then(() => {
                props.getToDos()
                props.SetShowEdit(false)
            })
        }
    }

    useEffect(() => {
        getCategories()
    }, []);

    return (
        <Formik
        initialValues={{
            name: props.todos ? props.todos.name : '',
            done: props.todos ? props.todos.done : '',
            description: props.todos ? props.todos.description : '',
            categoryId: props.todos ? props.todos.categoryId : ''
        }}
        validationSchema={todosSchema}
        onSubmit={(values) => handleSubmit(values)}
    >
       
       
        {({errors, touched}) => (
            <Form id='todosForm'>
                <div className='form-group m-3'>
                    <Field name='name' className='form-control' placeholder='Name' />
                    {errors.name && touched.name ? (
                        <div className='text-danger'>{errors.name}</div>
                    ) : null}
                </div>

                <div className='form-group m-3'>
                    <Field name='url' className='form-control' placeholder='Url' />
                    {errors.url && touched.url ? (
                        <div className='text-danger'>{errors.url}</div>
                    ) : null}
                </div>

                <div className='form-group m-3'>
                    <Field name='linkText' className='form-control' placeholder='Link Text' />
                    {errors.linkText && touched.linkText ? (
                        <div className='text-danger'>{errors.linkText}</div>
                    ) : null}
                </div>

                <div className='form-group m-3'>
                    <Field name='description' className='form-control' placeholder='Description' />
                    {errors.description && touched.description ? (
                        <div className='text-danger'>{errors.description}</div>
                    ) : null}
                </div>

                <div className='form-group m-3'>
                    <Field as='select' name='categoryId' className='form-control' >
                        <option value='' disabled>[--Please Choose--]</option>
                        {categories.map(cat =>
                            <option key={cat.categoryId} value={cat.categoryId}>
                                {cat.catName}
                            </option>
                        )}
                    </Field>
                </div>
                <div className='form-group m-3'>
                    <button type='submit' className='btn btn-info m-3'>
                        Submit To Do to API
                    </button>
                </div>
            </Form>
        )}
    </Formik>
  )
}