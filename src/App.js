import { useState } from 'react'

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

const Numbers = ({persons}) => (
  <div>
    {persons.map(p => <p>{p.name} {p.phone}</p>)}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '12-232-2324234' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

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
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons([...persons, {name: newName, phone: newPhone}]);
    setNewName('');
    setNewPhone('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Add a new</h3>
      <AddNewPerson
        handleNameChange={handleInputChange(setNewName)}
        handlePhoneChange={handleInputChange(setNewPhone)}
        handleSubmit={addNewPerson}
        name={newName}
        phone={newPhone} />      
      <h3>Numbers</h3>
      <Numbers persons={persons} />
    </div>
  )
}

export default App
