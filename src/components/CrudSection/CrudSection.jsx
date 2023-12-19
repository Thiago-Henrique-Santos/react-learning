import './crud.css';
import jsonData from './../../data/database.json';

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
        default:
            console.log("Non-developed!");
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
            <SelectPerson/>
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
    let everyone = [];
    jsonData.everyone.forEach((person) => {
        everyone.push(person);
    });

    let showInformationList = everyone.map(person => 
        <ShowInformation firstName={person.firstName} lastName={person.lastName} birthdate={person.birthdate} height={person.height} weight={person.weight}/>
    );

    return(
        <div class='InfoBox'>
            {showInformationList}
        </div>
    );
}

function SearchPerson() {
    return(
        <div class='SearchPerson'>
            <SelectPerson/>
            <div class='InfoBox IBSmall'>
                <ShowInformation firstName='Pedro' lastName='Souza' birthdate='10/01/2000' height='1.80' weight='75.9' />
            </div>
        </div>
    );
}

function SelectPerson () {
    let everyone = [];
    jsonData.everyone.forEach((person) => {
        everyone.push(person);
    });

    let options = everyone.map(person =>
        <option value={person.id}>{person.firstName} {person.lastName}</option>
    );

    return (
        <div class='InsertData'>
            <label>Nome completo:</label>
            <select>
                <option value='default'>Selecione</option>
                {options}
            </select>
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