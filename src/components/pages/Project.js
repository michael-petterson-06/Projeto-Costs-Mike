import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Loading from '../layout/Loading'
import Container from '../layout/Container';
import styles from './Project.module.css';


function Project () {

    let { id } = useParams()
   
    const [project, setProject ] = useState([]);
    const [ showProjectForm, setShowProject ] = useState(false);

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
  
    return (
        <React.Fragment>
            { project.name ? (
                <div className={ styles.project_details }>
                    <Container customClass='column'>
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
                                    <p>Form</p>
                                </div>
                            )}
                        </div>
                    </Container>
                </div> ) : (
                <Loading/>) }
        </React.Fragment>
    )
}     

export default Project;
