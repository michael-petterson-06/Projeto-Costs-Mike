import { useState, useEffect } from 'react'; 
import { useLocation } from 'react-router-dom';
import Message from '../layout/Message.js';
import styles from './Projects.module.css';
import Container from '../layout/Container.js'
import LinkButton from '../layout/LinkButton.js';
import ProjectCard from '../project/ProjectCard.js';
import Loading from '../layout/Loading'

function Projects() {

    const [ projects, setProjects ] = useState([])
    const [ removeLoading, setRemoveLoading] = useState(false)
    const [ projectMessage, setProjectMessage ] = useState('')
    
    const location = useLocation()
    
    let message = ''
    
    if (location.state){
        message = location.state.message
    }

   
    useEffect(() => {
        setTimeout(() => {
            getProducts()
        }, 1000)
    }, [])

   
    const getProducts =()=>{
        fetch('http://localhost:5001/projects',{
            method:'GET',
            header:{
                'content-Type':'application/json',
            },
        }).then((resp) => resp.json())
          .then((data) => {
            setProjects(data)
            setRemoveLoading(true)
         })
          .catch((error) => console.log(error))
    }


    function removeProject(id) {
        fetch(`http://localhost:5001/projects/${id}`,{
            method: 'DELETE',
            headers: {
               'Content-Type': 'application/json',
            },
        }).then(resp => resp.json())
          .then(data => {
                setProjects(projects.filter((project) => project.id !== id))
                setProjectMessage('Projeto removido com sucesso!!!')
          })  
    }

    return (
        <div className={ styles.project_container }>
            <div className={ styles.title_container }>
                <h1>Projetos</h1>
                <LinkButton to='/newproject' text='Criar Projeto'/>
            </div>
            { message && <Message msg={ message } type='sucess'/> }
            {projectMessage && <Message msg={projectMessage} type='sucess'  />}
            <Container  customClass='start'>
                { projects.length > 0 &&
                 projects.map((project) =>(
                    <ProjectCard
                        id={ project.id}
                        name={ project.name }
                        budget={ project.budget }
                        category= { project.category.name}
                        key={project.id}
                        handleRemove={ removeProject }
                    />
                ))}
                { !removeLoading && <Loading />}
                { removeLoading && projects.length === 0 &&
                    <p>Não há projetos cadastrados</p>
                }
            </Container>
        </div>
    ) 
}


export default Projects;