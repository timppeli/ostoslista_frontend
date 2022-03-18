import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  
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
        <li>
          <div>Milk</div>
          <div>2</div>
          <div><a href="#">Delete</a></div>
        </li>
        <li>
          <div>Bread</div>
          <div>2</div>
          <div><a href="#">Delete</a></div>
        </li>
      </ul>
    </div>
  );
}

export default App;
