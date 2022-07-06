import React, { useState, useEffect } from 'react';
import Styles from './ProjectForm.module.css'
import Input from '../form/input.js'
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';

function ProjectForm  ({ handleSubmit, btnText, projectData }) {

    const [categories, setCategories ] = useState([]);
    const [project, setProject] =useState(projectData || {})

    useEffect(() => {
        fetchCategories();
    },[])

    
    const fetchCategories = () => {
        fetch('http://localhost:5001/categories', {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    }).then((resp) => resp.json())
      .then((data) => {
        setCategories(data)
      })
      .catch((err) => console.log(err))
    }


    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
    }

    function handleOnChange(e) {
        setProject({...project, [e.target.name]: e.target.value})
    }


    function handleOnCategory(e) {
        setProject({...project,
            category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text  
            },
        })
    }


    return (
        <form onSubmit={ submit } className={ Styles.form }>
            <Input
                type='text'
                text='Nome do Projeto'
                name='name'
                placeholder='Insira o nome do projeto'
                handleOnChange={ handleOnChange }
                value={ project.name ? project.name : '' }
            />
            <Input
                type='number'
                text='Orçamento do Projeto'
                name='budget'
                placeholder='Insira o orçamento total'
                handleOnChange={ handleOnChange }
                value={ project.budget ? project.budget : ''}
            />
            <Select
                name='category_id'
                text='Selecione uma categoria'
                options={categories}
                handleOnChange={ handleOnCategory }
                value={ project.category ? project.category.id: ''}
            />
            <SubmitButton text={ btnText }/>
        </form>
    )
}

export default ProjectForm;