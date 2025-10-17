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
function wrapText(text, width = 60) {
  if (!text) return "";
  return text
    .replace(new RegExp(`(.{1,${width}})(\\s+|$)`, "g"), "$1\n")
    .trim();
}

const itemToMarkdown = (item) => {
  let md = `### ${wrapText(item.name || "Item Name")}`;
  if (item.description) md += `\n${wrapText(item.description)}`;
  if (item.bonus) md += `\n**Bonus:** ${wrapText(item.bonus)}`;
  if (item.benefit) md += `\n**Benefit:** ${wrapText(item.benefit)}`;
  if (item.curse) md += `\n**Curse:** ${wrapText(item.curse)}`;
  if (item.personality)
    md += `\n**Personality:** ${wrapText(item.personality)}`;
  return md.trim() + "\n";
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
    const updatedItems = items.filter((_, i) => i !== idx);
    setItems(updatedItems);
  };

  const handleCopyMarkdown = (idx) => {
    const md = itemToMarkdown(items[idx]);
    navigator.clipboard.writeText(md);
  };

  return (
    <div>
      <h1>Items</h1>
      {items.map((item, idx) => (
        <div key={`item-${item.name}-${idx}`} style={{ position: "relative" }}>
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
