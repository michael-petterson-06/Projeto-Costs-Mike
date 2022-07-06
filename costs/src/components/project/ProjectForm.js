function ProjectForm  () {
    return (
        <form>
            <div>
                <input type='text' placeholder="Insira o nome do projeto"/>
            </div>
            <div>
                <input type='number' placeholder='Insira orçacmento total'/>
            </div>
            <div>
                <select name='categoy_id'>
                    <option disable selected>Selecione a categoria </option>
                </select>
            </div>
            <div>
                <input text='submit' value='Criar Projeto'/>
            </div>
        </form>
    )
}


export default ProjectForm;