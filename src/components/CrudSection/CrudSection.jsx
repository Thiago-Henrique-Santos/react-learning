import './crud.css';
import { useEffect, useState } from 'react';
import { getAll, getPersonById } from '../../resources/api-requests';

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
            <center>
                <button className='CallToAction CTABig'>REGISTRAR</button>
            </center>
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
            <center>
                <button className='CallToAction CTABig'>ATUALIZAR</button>
            </center>
        </form>
    );
}

function ReadAll() {
    let [everyone, setEveryone] = useState([]);

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const data = await getAll();
                setEveryone(data);
            } catch (error) {
                console.error(`Erro ao receber dados: ${error}`);
            }
        }

        fetchData();
    }, []);

    const everyoneArray = everyone && everyone.data ? everyone.data : [];

    let showInformationList = everyoneArray.map(person => 
        <ShowInformation selectedPersonId={person.id}/>
    );

    return(
        <div class='InfoBox'>
            {showInformationList}
        </div>
    );
}

function SearchPerson() {
    const [selectedPerson, setSelectedPerson] = useState();

    function handleSelectPerson(selectedPersonId) {
        setSelectedPerson(selectedPersonId);
    }

    return(
        <div class='SearchPerson'>
            <SelectPerson onSelectPerson={handleSelectPerson}/>
            <div class='InfoBox IBSmall'>
                <ShowInformation selectedPersonId={selectedPerson}/>
            </div>
        </div>
    );
}

function SelectPerson ({onSelectPerson}) {
    let [everyone, setEveryone] = useState([]);

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const data = await getAll();
                setEveryone(data);
            } catch (error) {
                console.error(`Erro ao receber dados: ${error}`);
            }
        }

        fetchData();
    }, []);

    function handleChange (event) {
        const selectedPersonId = event.target.value;
        onSelectPerson(selectedPersonId);
    }

    const everyoneArray = everyone && everyone.data ? everyone.data : [];

    let options = everyoneArray.map(person =>
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
    let [selectedPerson, setSelectedPerson] = useState({});
    
    useEffect(()=>{
        try {
            const fetchData = async ()=>{
                let data = await getPersonById(selectedPersonId);
                data = data.data;
                setSelectedPerson(data);
            }

            fetchData();
        } catch (error) {
            console.error(`Erro ao receber dados: ${error}`);
        }
    }, [selectedPersonId]);

    if (selectedPerson) {
        return (
            <>
                <div class='DoubleInput'>
                    <div>
                        <label>Primeiro nome:</label>
                        <input type='text' placeholder='Nome' value={selectedPerson.firstname}/>
                    </div>
                    <div>
                        <label>Sobrenome:</label>
                        <input type='text' placeholder='Sobrenome' value={selectedPerson.lastname}/>
                    </div>
                </div>
                <div>
                    <label>Data de nascimento:</label>
                    <input type='date' value={selectedPerson.birthdate}/>
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

function ShowInformation({selectedPersonId}) {
    let [selectedPerson, setSelectedPerson] = useState({});

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const data = await getPersonById(selectedPersonId);
                setSelectedPerson(data);
            } catch (error) {
                console.error(`Erro ao receber dados: ${error}`);
            }
        };
        fetchData();
    }, [selectedPersonId]);

    if (selectedPerson && selectedPerson.data) {
        selectedPerson = selectedPerson.data;
        return(
            <section>
                <p><span>Primeiro nome:</span> {selectedPerson.firstname}</p>
                <p><span>Sobrenome:</span> {selectedPerson.lastname}</p>
                <p><span>Data de nascimento:</span> {formatAPIDate(selectedPerson.birthdate)}</p>
                <p><span>Altura:</span> {selectedPerson.height}</p>
                <p><span>Peso:</span> {selectedPerson.weight}</p>
                <button class='CallToAction'>DELETAR PESSOA</button>
            </section>
        );
    }
}

function formatAPIDate (date) {
    const formatedDate = date.split('-');
    date = `${formatedDate[2]}/${formatedDate[1]}/${formatedDate[0]}`;
    return date;
}

export default CrudSection;