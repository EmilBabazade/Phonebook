import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

export const getPersons = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

export const getPerson = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
};

export const addPerson = async (person) => {
    const response = await axios.post(baseUrl, person);
    if(response.status !== 201) throw 'Something went wrong when creating a new person!';
};

export const updatePerson = async (person) => {
    const response = await axios.put(`${baseUrl}/${person.id}`, person);
    if(response.status !== 200) throw 'Something went wrong when updating a person!';
};

export const deletePerson = async (id) => {
    const res = await axios.delete(`${baseUrl}/${id}`);
    if(res.status !== 200) throw 'Something went wrong when deleting a person!';
};