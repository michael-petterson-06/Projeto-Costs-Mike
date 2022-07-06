import { useLocation } from 'react-router-dom';
import Message from '../layout/Message.js';

function Projects() {

    const location = useLocation()
    let message = ''
    if (location.state){
        message = location.state.message
    }
    return (
        <div>
            <h1>Projetos</h1>
            {message && <Message msg={ message } type='sucess'/>}
        </div>
    ) 
}


export default Projects;