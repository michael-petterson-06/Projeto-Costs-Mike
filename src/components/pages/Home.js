import Styles from './Home.module.css'

import savings from '../../img/savings.svg'
import LinkButton from '../layout/LinkButton';

function Home () {
    return (
        <section className={ Styles.home_container}>
            <h1>Bem vindo ao <span>Cost</span></h1>
            <p>Começe a gerenciar seus projetos agora mesmo</p>
            <LinkButton to='/newproject' text='Criar Projeto'/>
            <img src={ savings } alt='Cost'/>
        </section>
        
    )
        
}

export default Home;