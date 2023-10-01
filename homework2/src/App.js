import React, { useState, createContext, useContext } from 'react';
import './App.css';

// Компонент для добавления людей
const AddPersonForm = () => {
    const { addPerson } = usePeople();
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    const handleAddPerson = () => {
        if (name && age) {
            console.log(`Adding person: Name - ${name}, Age - ${age}`);
            addPerson({ name, age });
            setName('');
            setAge('');
        }
    };

    return (
        <div>
            <h2>Add a Person</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
            <button onClick={handleAddPerson}>Add Person</button>
        </div>
    );
};

// HOC для управления списком людей
const PeopleContext = createContext();

export const usePeople = () => {
    return useContext(PeopleContext);
};

const withPeople = (WrappedComponent) => {
    return (props) => {
        const [people, setPeople] = useState([]);

        const addPerson = (person) => {
            setPeople([...people, person]);
        };

        const removePerson = (index) => {
            const newPeople = [...people];
            newPeople.splice(index, 1);
            setPeople(newPeople);
        };

        return (
            <PeopleContext.Provider value={{ people, addPerson, removePerson }}>
                <WrappedComponent {...props} />
            </PeopleContext.Provider>
        );
    };
};

// Компонент для отображения списка людей
const PeopleList = () => {
    const { people, removePerson } = usePeople();

    return (
        <div>
            <h2>People List</h2>
            <ul>
                {people.map((person, index) => (
                    <li key={index}>
                        {person.name}, {person.age} years old{' '}
                        <button onClick={() => removePerson(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Основной компонент приложения
const App = () => {
    return (
        <div className="App">
            <h1>Add People to the System</h1>
            <AddPersonForm />
            <PeopleList />
        </div>
    );
};

export default withPeople(App);
