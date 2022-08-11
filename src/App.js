import { useEffect, useState } from 'react'
import { addPerson, deletePerson, getPersons } from './api';
import './App.css';

const AddNewPerson = ({
  name, handleNameChange,
  phone, handlePhoneChange,
  handleSubmit
}) => (
  <form>
    <div>
      name: <input value={name} onChange={handleNameChange} />
    </div>
    <div>
      phone: <input value={phone} onChange={handlePhoneChange} />
    </div>
    <div>
      <button type="submit" onClick={handleSubmit}>add</button>
    </div>
  </form>
)

const Numbers = ({persons, remove}) => (
  <div>
    {persons.map(p => <p>{p.name} {p.number} <button onClick={remove(p)}>delete</button></p>)}
  </div>
)

const Notification = ({message, isError}) => {
  const styleClass = isError ? 'error' : 'success';
  return <div className={styleClass}>
    {message}
  </div>
}

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [notif, setNotif] = useState(null);

  useEffect(() => {
    getPersons().then(persons => setPersons(persons))
  }, []);

  const createNotif = (message, isError = false) => {
    setNotif({message, isError});
    setTimeout(() => setNotif(null), 5000);
  }

  const handleInputChange = (setter) => {
    return evt => {
      const value = evt.target.value;
      setter(value);
    }
  }

  const addNewPerson = evt => {
    evt.preventDefault();
    const isDuplicate = persons.find(p => p.name.toLowerCase().trim() === newName.toLowerCase().trim());
    if(isDuplicate) {
      createNotif(`${newName} is already added to phonebook`, true);
      return;
    }
    addPerson({
      name: newName,
      number: newPhone
    }).then(() => {
      getPersons().then(persons => setPersons(persons))
      setNewName('');
      setNewPhone('');
      createNotif('success');
    }).catch(() => createNotif('something went wrong', true));
  }

  const remove = (person) => {
    return evt => {
      evt.preventDefault();
      if(!window.confirm(`Are you sure you want to delete ${person.name} ?`)) return;
      deletePerson(person.id)
        .then(() => {
          getPersons().then(persons => setPersons(persons));
          setNewName('');
        setNewPhone('');
        createNotif('success');
      }).catch(() => createNotif('something went wrong', true));
    }
  }

  return (
    <div>
      {notif && <Notification isError={notif.isError} message={notif.message} />}
      <h2>Phonebook</h2>
      <h3>Add a new</h3>
      <AddNewPerson
        handleNameChange={handleInputChange(setNewName)}
        handlePhoneChange={handleInputChange(setNewPhone)}
        handleSubmit={addNewPerson}
        name={newName}
        phone={newPhone} />      
      <h3>Numbers</h3>
      <Numbers persons={persons} remove={remove} />
    </div>
  )
}

export default App
