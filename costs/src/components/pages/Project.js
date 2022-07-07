import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styles from './Project.module.css'


function Project () {

    let { id } = useParams()
   
    const [project, setProject ] = useState([]);

    useEffect(() => {
        getProject()
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
  
    return <div>{project.name}</div>
}    


export default Project;