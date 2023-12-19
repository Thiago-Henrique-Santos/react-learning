import './crud.css';
import { useState } from 'react';
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
    const [selectedPerson, setSelectedPerson] = useState(null);

    function handleSelectPerson(selectedPersonId) {
        setSelectedPerson(selectedPersonId);
    }

    return (
        <form class='InsertData'>
            <SelectPerson onSelectPerson={handleSelectPerson}/>
            <DisplayInformation selectedPersonId={selectedPerson}/>
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

function SelectPerson ({onSelectPerson}) {
    function handleChange (event) {
        const selectedPersonId = event.target.value;
        onSelectPerson(selectedPersonId);
    }

    let everyone = [];
    jsonData.everyone.forEach((person) => {
        everyone.push(person);
    });

    let options = everyone.map(person =>
        <option key={person.id} value={person.id}>
            {person.firstName} {person.lastName}
        </option>
    );

    return (
        <div class='InsertData'>
            <label>Nome completo:</label>
            <select onChange={handleChange}>
                <option key={0} value='default'>Selecione</option>
                {options}
            </select>
        </div>
    );
}

function DisplayInformation({selectedPersonId}){
    let selectedPerson;
    jsonData.everyone.forEach((person) => {
        if(person.id === selectedPersonId) {
            selectedPerson = person;
        }
    });

    if (selectedPerson) {
        return (
            <>
                <div class='DoubleInput'>
                    <div>
                        <label>Primeiro nome:</label>
                        <input type='text' placeholder='Nome' value={selectedPerson.firstName}/>
                    </div>
                    <div>
                        <label>Sobrenome:</label>
                        <input type='text' placeholder='Sobrenome' value={selectedPerson.lastName}/>
                    </div>
                </div>
                <div>
                    <label>Data de nascimento:</label>
                    <input type='date' value={selectedPerson.birthdate.slice(0, 10)}/>
                </div>
                <div>
                    <label>Altura:</label>
                    <input type='text' placeholder='Ex: 1.80' value={selectedPerson.height}/>
                </div>
                <div>
                    <label>Peso:</label>
                    <input type='text' placeholder='Ex: 79.1' value={selectedPerson.weight}/>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div class='DoubleInput'>
                    <div>
                        <label>Primeiro nome:</label>
                        <input type='text' placeholder='Nome' value={''}/>
                    </div>
                    <div>
                        <label>Sobrenome:</label>
                        <input type='text' placeholder='Sobrenome' value={''}/>
                    </div>
                </div>
                <div>
                    <label>Data de nascimento:</label>
                    <input type='date' value={''}/>
                </div>
                <div>
                    <label>Altura:</label>
                    <input type='text' placeholder='Ex: 1.80' value={''}/>
                </div>
                <div>
                    <label>Peso:</label>
                    <input type='text' placeholder='Ex: 79.1' value={''}/>
                </div>
            </>
        );
    }
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