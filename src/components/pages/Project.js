import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { parse , v4 as uuidv4 } from 'uuid';
import Loading from '../layout/Loading'
import Container from '../layout/Container';    
import styles from './Project.module.css';
import ProjectForm from '../project/ProjectForm';
import Message from '../layout/Message';
import ServiceForm from '../service/ServiceForm';



function Project () {

    let { id } = useParams();
   
    const [ project, setProject ] = useState([]);
    const [ showProjectForm, setShowProjectForm ] = useState(false);
    const [ showServiceForm, setShowServiceForm ] = useState(false);

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
        setShowProjectForm(!showProjectForm);
   }


   function toggleServiceForm () {
    setShowServiceForm(!showServiceForm);
   }


   function createService (project) {
        
    // last service
        setMessage('')
        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4()
        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)
        
        // maximum value validation
        if (newCost > parseFloat(project.budget)) {
          setMessage('Orçamento ultrapassado, verifique o valor do serviço!')
          setType('error')
          project.services.pop()
          return false
        }

        //add services
        project.cost = newCost;

        fetch(`http://localhost:5001/projects/${project.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        }).then((resp) => resp.json())
          .then((data) => {
            console.log(data)
          })  
        .catch(error => console.log(error))

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

            setShowProjectForm(!showProjectForm);

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

                                <div className= { styles.project_info }>

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

                        <div className={ styles.service_form_container }>
                            <h2>Adicione um serviço</h2>
                            <button onClick={ toggleServiceForm } className={ styles.btn }>
                                { !showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
                            </button>
                            <div className= { styles.project_info }>
                                { showServiceForm && (
                                    <ServiceForm
                                        handleSubmit={ createService }
                                        btnText='Adicionar Serviço'
                                        projectData={project} 
                                    />
                                )}
                            </div>
                            <h2>Serviços</h2>
                            <Container customClass='start'>
                                <p>Exibição de serviçõs </p>                                    
                            </Container>
                        </div>

                    </Container>
                </div> ) : (
                <Loading/>) }
        </React.Fragment>
    )
}     


export default Project;

