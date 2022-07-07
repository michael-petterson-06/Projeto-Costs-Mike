import { useState, useEffect } from 'react'; 
import { useLocation } from 'react-router-dom';
import Message from '../layout/Message.js';
import styles from './Projects.module.css';
import Container from '../layout/Container.js'
import LinkButton from '../layout/LinkButton.js';
import ProjectCard from '../project/ProjectCard.js';

function Projects() {

    const [ projects, setProjects ] = useState([])
    const location = useLocation()
    let message = ''
    if (location.state){
        message = location.state.message
    }

    useEffect(() => {
        getProducts()
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
          })
          .catch((error) => console.log(error))
    }

    return (
        <div className={ styles.project_container }>
            <div className={ styles.title_container }>
                <h1>Projetos</h1>
                <LinkButton to='/newproject' text='Criar Projeto'/>
            </div>
            {message && <Message msg={ message } type='sucess'/>}
            <Container  customClass='start'>
                { projects.length > 0 &&
                projects.map((project) =>(
                    <ProjectCard
                        id={ project.id}
                        name={ project.name }
                        budget={ project.budget }
                        category= { project.category.name}
                        key={project.id}
                    />
                ))}
            </Container>
        </div>
    ) 
}


export default Projects;