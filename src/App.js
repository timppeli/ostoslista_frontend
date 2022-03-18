import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

const URL = "http://localhost/_ostoslista/";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        setItems(response.data);
      }).catch(error => {
        alert(error.response ? error.response.data.error : error);
      });
  }, [])

  function deleteItem(id) {
    const json = JSON.stringify({id:id});
    axios.post(URL + "delete_item.php",json,{
      headers: {
        "Content-Type" : "application/json"
      }
    })
    .then((response) => {
      const newListWithoutRemoved = items.filter((item) => item.id !== id);
      setItems(newListWithoutRemoved);
    }).catch(error => {
      alert(error.response ? error.response.data.error : error);
    });
  }

  return (
    <div className="container">
      <h3>Shopping List</h3>
      <form>
        <label>New item: </label>
        <input type="text" name="description" placeholder="Type description" />
        <input type="text" name="amount" placeholder="Type amount" />
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
