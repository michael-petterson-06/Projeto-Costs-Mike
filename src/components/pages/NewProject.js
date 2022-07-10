import Styles from './NewProject.module.css'
import ProjectForm from '../project/ProjectForm';
import { useNavigate } from 'react-router-dom';

function NewProject() {


    const navigate = useNavigate();


    function createPost (project) {
        project.cost = 0
        project.services = [];

        fetch('http://localhost:5001/projects', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
          })
            .then((resp) => resp.json())
            .then((data) => {
              navigate('/projects', { message: 'Projeto criado com sucesso!' })
            })
        }
     

    return (
        <div className={Styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Criar seu projeto para depois adicionar um serviço </p>
            <ProjectForm handleSubmit={ createPost } btnText='Criar projetos'/>
        </div>
    )
}
export default NewProject;