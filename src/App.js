import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

const URL = "http://localhost/_ostoslista/";

function App() {
  const [items, setItems] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        setItems(response.data);
      }).catch(error => {
        alert(error.response ? error.response.data.error : error);
      });
  }, [])

  function deleteItem(id) {
    const json = JSON.stringify({ id: id });
    axios.post(URL + "delete_item.php", json, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        const newItemList = items.filter((item) => item.id !== id);
        setItems(newItemList);
      }).catch(error => {
        alert(error.response ? error.response.data.error : error);
      });
  }

  function addItem(e) {
    e.preventDefault();
    const json = JSON.stringify({ description: description, amount: amount });
    axios.post(URL + 'add_item.php', json, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        setItems(items => [...items, response.data]);
        setDescription("");
        setAmount("");
      }).catch(error => {
        alert(error.response ? error.response.data.error : error);
      });
    document.getElementById("description").focus();
  }

  return (
    <div className="container">
      <h3>Shopping List</h3>
      <form onSubmit={addItem}>
        <label>New item: </label>
        <input id="description" value={description} onChange={e => setDescription(e.target.value)} type="text" name="description" placeholder="Type description" />
        <input value={amount} onChange={e => setAmount(e.target.value)} type="number" name="amount" placeholder="Type amount" />
        <input type="submit" value="Add" />
      </form>
      <ul className="items-container">
        {items?.map(item => (
          <li key={item.id}>
            <div>{item.description}</div>
            <div>{item.amount}</div>
            <div><a href="#" onClick={() => deleteItem(item.id)}>Delete</a></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
