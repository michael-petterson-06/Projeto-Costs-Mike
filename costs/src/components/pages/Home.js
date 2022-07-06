import savings from '../../img/savings.svg'

function Home () {
    return (
        <section>
            <h1>Bem vindo ao <span>Cost</span></h1>
            <p>Começe a gerenciar seus projetos agora mesmo</p>
            <a href='/'>Criar projetos</a>
            <img src={ savings } alt='Cost'/>
        </section>
        
    )
        
}

export default Home;