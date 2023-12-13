import './crud.css';

function CrudSection({type, title}) {
    const crudComponent = getCrudComponent(type);
    return (
      <section class='CrudSection'>
        <h1>{title}</h1>
        {crudComponent};
      </section>
    );
}

function getCrudComponent(type) {
    switch (type) {
        case "create":
            return(<Create/>);
        case "read":
            return (<SearchPerson/>);
        case "readAll":
            return(<ReadAll/>);
        case "update":
            return(<Update/>);
        case "delete":
            return(<Create/>);
        default:
            console.log("Non-developed yet!");
            break;
    }
}

function Create() {
    return (
        <form class='InsertData'>
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
}

function Update() {
    return (
        <form class='InsertData'>
            <div>
                <label>Nome completo:</label>
                <select>
                    <option value='default'>Selecione</option>
                    <option value='uuid-1'>Yuri Lemos</option>
                    <option value='uuid-2'>Pedro Souza</option>
                </select>
            </div>
            <div class='DoubleInput'>
                <div>
                    <label>Primeiro nome:</label>
                    <input type='text' placeholder='Nome'/>
                </div>
                <div>
                    <label>Sobrenome:</label>
                    <input type='text' placeholder='Sobrenome'/>
                </div>
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

function ReadAll() {
    return(
        <div class='InfoBox'>
            <ShowInformation firstName='Pedro' lastName='Souza' birthdate='10/01/2000' height='1.80' weight='75.9'/>
            <ShowInformation firstName='Yuri' lastName='Lemos' birthdate='12/05/2011' height='1.40' weight='39.8'/>
            <ShowInformation firstName='Wesley' lastName='Rocha' birthdate='25/01/1998' height='1.75' weight='71.2'/>
            <ShowInformation firstName='Guilherme' lastName='Mello' birthdate='02/07/1980' height='1.82' weight='80.1'/>
        </div>
    );
}

function SearchPerson() {
    return(
        <div class='SearchPerson'>
            <div class='InsertData'>
                <label>Nome completo:</label>
                <select>
                    <option value='default'>Selecione</option>
                    <option value='uuid-1'>Yuri Lemos</option>
                    <option value='uuid-2'>Pedro Souza</option>
                </select>
            </div>
            <div class='InfoBox IBSmall'>
                <ShowInformation firstName='Pedro' lastName='Souza' birthdate='10/01/2000' height='1.80' weight='75.9' />
            </div>
        </div>
    );
}

function ShowInformation({firstName, lastName, birthdate, height, weight}) {
    return(
        <section>
            <p><span>Primeiro nome:</span> {firstName}</p>
            <p><span>Sobrenome:</span> {lastName}</p>
            <p><span>Data de nascimento:</span> {birthdate}</p>
            <p><span>Altura:</span> {height}</p>
            <p><span>Peso:</span> {weight}</p>
            <button>DELETAR PESSOA</button>
        </section>
    );
}

export default CrudSection;