
import './App.css'

import { useState } from 'react';
import ItemBlock from './Item';



const DemoItem = {
    name: 'Dev Toolbox',
    description: 'A compact toolbox that contains all the essential tools a developer might need.',
    bonus: '+2 shield when debugging code.',
    benefit: 'Grants advantage on all coding-related skill checks.',
    curse: 'Occasionally, the tools rearrange themselves, causing a minor inconvenience.',
    personality: 'The toolbox is eager to assist and often offers unsolicited advice on best coding practices.',
};


const emptyItem = {
  name: '',
  description: '',
  bonus: '',
  benefit: '',
  curse: '',
  personality: '',
};

function App() {
  const [items, setItems] = useState([DemoItem,emptyItem]);

  const handleItemChange = (idx, newItem) => {
    setItems(items => items.map((item, i) => i === idx ? newItem : item));
  };

  const handleAddItem = () => {
    setItems(items => [...items, emptyItem]);
  };

  return (
    <div>
      <h1>Magic Items</h1>
      {items.map((item, idx) => (
        <ItemBlock
          key={idx}
          item={item}
          onChange={newItem => handleItemChange(idx, newItem)}
        />
      ))}
      <button onClick={handleAddItem} style={{margin: '20px 0', padding: '8px 16px'}}>Add Item</button>
    </div>
  );
}

export default App;
