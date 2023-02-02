import { useState } from 'react';
import './App.css';
import Form from './Components/Form';
import Table from './Components/Table';
import UpdateForm from './Components/UpdateForm';

function App() {
  const [id, setId] = useState("");
  return (
    <div className="App">
      <Table setId={setId}></Table>
      <Form></Form>
      <UpdateForm id={id} ></UpdateForm>
      
    </div>
  );
}

export default App;
