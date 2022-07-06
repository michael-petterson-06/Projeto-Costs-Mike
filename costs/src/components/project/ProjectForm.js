import React, { useState, useEffect } from 'react';
import Styles from './ProjectForm.module.css'
import Input from '../form/input.js'
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';

function ProjectForm  ({btnText}) {

    const [categories, setCategories ] = useState([]);

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
    


    return (
        <form className={ Styles.form }>
            <Input
                type='text'
                text='Nome do Projeto'
                name='name'
                placeholder='Insira o nome do projeto'
            />
            <Input
                type='number'
                text='Orçamento do Projeto'
                name='budget'
                placeholder='Insira o orçamento total'
            />
            <Select
                name='category_id'
                text='Selecione uma categoria'
                options={categories}
            />
            <SubmitButton text={ btnText }/>
        </form>
    )
}

export default ProjectForm;