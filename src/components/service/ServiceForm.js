import { useState } from 'react';
import Input from '../form/input';
import SubmitButton from '../form/SubmitButton';

import styles from '../project/ProjectForm.module.css';

function ServiceForm ({ handleSubmit, btnText, projectData }) {

    function submit () {

    }


    function handleChange () {

    }


    return (
        <form onSumit={ submit } className={styles.form}>
            <Input
                type='text'
                text='Nome do Serviço'
                name='name'
                placeholder='Insira o nome do serviço'
                handleOnChange={ handleChange }
            />
            <Input
                type='Number'
                text='Custo do Serviço'
                name='cost'
                placeholder='Insira o valor total'
                handleOnChange={ handleChange }
            />
            <Input
                type='text'
                text='Descrição do Serviço'
                name='description'
                placeholder='Descreva o serviço'
                handleOnChange={ handleChange }
            />
            <SubmitButton text= { btnText }/>
        </form>
    )
}

export default ServiceForm;