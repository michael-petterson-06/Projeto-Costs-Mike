import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Loading from '../layout/Loading'
import Container from '../layout/Container';
import styles from './Project.module.css';
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'


function Project () {

    let { id } = useParams()
   
    const [project, setProject ] = useState([]);
    const [ showProjectForm, setShowProject ] = useState(false);
    const [ message, setMessage ] = useState('');
    const [ type, setType ] = useState('');

    useEffect(() => {
        setTimeout(() => {
            getProject();
        }, 1000)
    }, [])

     
    const getProject = () => {
        fetch(`http://localhost:5001/projects/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((resp) => resp.json())
      .then((data) => {
        setProject(data)
      })   
      .catch((error) => console.log(error))
   }

   function toggleProjectForm () {
        setShowProject(!showProjectForm);
   }

   function editPost (project) {
        setMessage('')  
        if (project.budget < project.cost) {
            setMessage('Não há verba sufuciente para esse serviço')
            setType('error')
            return false
        }
        fetch(`http://localhost:5001/projects/${project.id}`,{
            method: 'PATCH', // só alterar oque for enviado
            headers: {
                'content-Type': 'application/json', // para json se comunicar com API
            },
            body: JSON.stringify(project), //mando o projeto com texto para atualizar
        }).then(resp => resp.json() )
          .then((data) => {
            setProject(data)
            setShowProject(!showProjectForm);
            setMessage('Projeto atualizado com sucesso!!!')
            setType('success')
          })   
          .catch((error) => console.log(error))
   }
  
   
    return (
        <React.Fragment>
            { project.name ? (
                <div className={ styles.project_details }>
                    <Container customClass='column'>
                        { message && <Message type={ type } msg={ message }/>}
                        <div className={ styles.details_container }>
                            <h1>Projeto: { project.name }</h1>
                            <button onClick={ toggleProjectForm } className={ styles.btn }>
                                { !showProjectForm ? 'Editar projeto' : 'Fechar'}
                            </button>
                            { !showProjectForm ? (
                                <div className= { styles.project_info}>
                                    <p>
                                        <span>Categoria: </span>{ project.category.name}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento: </span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total de Utilizado: </span> R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className= { styles.project_info}>
                                    <ProjectForm
                                        handleSubmit={ editPost }
                                        btnText='Concluir edição'
                                        projectData={ project }
                                    />
                                </div>
                            )}
                        </div>
                    </Container>
                </div> ) : (
                <Loading/>) }
        </React.Fragment>
    )
}     

export default Project
