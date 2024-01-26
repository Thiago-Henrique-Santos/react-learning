import './crud.css';
import { useEffect, useState } from 'react';
import { getAll, getPersonById, createPerson } from '../../resources/api-requests';

function CrudSection({type, title}) {
    const crudComponent = getCrudComponent(type);
    return (
      <section className='CrudSection'>
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
    async function handleClick() {
        let firstName = document.getElementById('firstName').value;
        let lastName = document.getElementById('lastName').value;
        let birthdate = document.getElementById('birthdate').value;
        let height = document.getElementById('height').value;
        let weight = document.getElementById('weight').value;

        const data = {
            "firstName": firstName,
            "lastName": lastName,
            "birthdate": birthdate,
            "height": height,
            "weight": weight
        }

        try {
            const person = await createPerson(data);

            alert(`${person.firstName} ${person.lastName} cadastrado com sucesso!`);
            window.location.reload();
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    return (
        <section className='InsertData'>
            <div>
                <label htmlFor='firstName'>Primeiro nome:</label>
                <input name='firstName' id='firstName' type='text' placeholder='Nome'/>
            </div>
            <div>
                <label htmlFor='lastName'>Sobrenome:</label>
                <input name='lastName' id='lastName' type='text' placeholder='Sobrenome'/>
            </div>
            <div>
                <label htmlFor='birthdate'>Data de nascimento:</label>
                <input name='birthdate' id='birthdate' type='date'/>
            </div>
            <div>
                <label htmlFor='height'>Altura:</label>
                <input name='height' id='height' type='text' placeholder='Ex: 1.80'/>
            </div>
            <div>
                <label htmlFor='weight'>Peso:</label>
                <input name='weight' id='weight' type='text' placeholder='Ex: 79.1'/>
            </div>
            <center>
                <button className='CallToAction CTABig' onClick={async ()=>{await handleClick()}}>REGISTRAR</button>
            </center>
        </section>
    );
}

function Update() {
    const [selectedPerson, setSelectedPerson] = useState(null);

    function handleSelectPerson(selectedPersonId) {
        setSelectedPerson(selectedPersonId);
    }

    return (
        <form className='InsertData'>
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
        <div className='InfoBox'>
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
        <div className='SearchPerson'>
            <SelectPerson onSelectPerson={handleSelectPerson}/>
            <div className='InfoBox IBSmall'>
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
        <div className='InsertData'>
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
                <div className='DoubleInput'>
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
                <div className='DoubleInput'>
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
                <button className='CallToAction'>DELETAR PESSOA</button>
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