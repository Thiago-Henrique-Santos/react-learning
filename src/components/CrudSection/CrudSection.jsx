import './crud.css';

function CrudSection({title}) {
    return (
      <section class='CrudSection'>
        <h1>{title}</h1>
        <Update/>
      </section>
    );
}

/*function Create() {
    return (
        <form class='insert-data-form'>
            <div>
                <label>Primeiro nome:</label>
                <input type='text' placeholder='Nome'/>
            </div>
            <div>
                <label>Sobrenome:</label>
                <input type='text' placeholder='Sobrenome'/>
            </div>
            <div>
                <label>Data de nascimento:</label>
                <input type='date'/>
            </div>
            <div>
                <label>Altura:</label>
                <input type='text' placeholder='Ex: 1.80'/>
            </div>
            <div>
                <label>Peso:</label>
                <input type='text' placeholder='Ex: 79.1'/>
            </div>
        </form>
    );
}*/

function Update() {
    return (
        <form class='insert-data-form'>
            <div>
                <label>Primeiro nome:</label>
                <select>
                    <option value="default">Selecione</option>
                    <option value="uuid-1">Yuri Lemos</option>
                    <option value="uuid-1">Pedro Souza</option>
                </select>
            </div>
            <div>
                <label>Sobrenome:</label>
                <input type='text' placeholder='Sobrenome'/>
            </div>
            <div>
                <label>Data de nascimento:</label>
                <input type='date'/>
            </div>
            <div>
                <label>Altura:</label>
                <input type='text' placeholder='Ex: 1.80'/>
            </div>
            <div>
                <label>Peso:</label>
                <input type='text' placeholder='Ex: 79.1'/>
            </div>
        </form>
    );
}

export default CrudSection;