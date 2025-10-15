import "./App.css";

import { useState, useEffect } from "react";
import ItemBlock from "./Item";
import markdownIcon from "./assets/markdown.svg";

const DemoItem = {
  name: "Dev Toolbox",
  description:
    "A compact toolbox that contains all the essential tools a developer might need.",
  bonus: "+2 shield when debugging code.",
  benefit: "Grants advantage on all coding-related skill checks.",
  curse:
    "Occasionally, the tools rearrange themselves, causing a minor inconvenience.",
  personality:
    "The toolbox is eager to assist and often offers unsolicited advice on best coding practices.",
};

const emptyItem = {
  name: "",
  description: "",
  bonus: "",
  benefit: "",
  curse: "",
  personality: "",
};

const LS_ITEMS_KEY = "statblock-gen-items";

// Markdown generator for item
const itemToMarkdown = (item) => {
  let md = `### ${item.name || "Item Name"}\n`;
  if (item.description) md += `${item.description}\n`;
  if (item.bonus) md += `**Bonus:** ${item.bonus}\n`;
  if (item.benefit) md += `**Benefit:** ${item.benefit}\n`;
  if (item.curse) md += `**Curse:** ${item.curse}\n`;
  if (item.personality) md += `**Personality:** ${item.personality}\n`;
  return md;
};

function App() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem(LS_ITEMS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [DemoItem, emptyItem];
      }
    }
    return [DemoItem, emptyItem];
  });

  useEffect(() => {
    localStorage.setItem(LS_ITEMS_KEY, JSON.stringify(items));
  }, [items]);

  const handleItemChange = (idx, newItem) => {
    setItems((items) => items.map((item, i) => (i === idx ? newItem : item)));
  };

  const handleAddItem = () => {
    setItems((items) => [...items, emptyItem]);
  };

  const handleRemoveItem = (idx) => {
    setItems((items) => items.filter((_, i) => i !== idx));
  };

  const handleCopyMarkdown = (idx) => {
    const md = itemToMarkdown(items[idx]);
    navigator.clipboard.writeText(md);
  };

  return (
    <div>
      <h1>Items</h1>
      {items.map((item, idx) => (
        <div key={idx} style={{ position: "relative" }}>
          <ItemBlock
            item={item}
            onChange={(newItem) => handleItemChange(idx, newItem)}
          />
          <button
            onClick={() => handleCopyMarkdown(idx)}
            className="copy-markdown-btn"
            title="Copy as Markdown"
          >
            <img
              src={markdownIcon}
              alt="Markdown"
              style={{
                width: "24px",
                height: "24px",
                filter: "invert(1) brightness(2)",
              }}
            />
          </button>
          <button
            onClick={() => handleRemoveItem(idx)}
            className="remove-item-btn"
            title="Remove Item"
          >
            &times;
          </button>
        </div>
      ))}
      <button
        onClick={handleAddItem}
        style={{ margin: "20px 0", padding: "8px 16px" }}
      >
        Add Item
      </button>
    </div>
  );
}

export default App;
