import Styles from './NewProject.module.css'
import ProjectForm from '../project/ProjectForm';

function NewProject() {
    return (
        <div className={Styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Criar seu projeto para depois adicionar um serviço </p>
            <ProjectForm/>
        </div>
    )
}
export default NewProject;