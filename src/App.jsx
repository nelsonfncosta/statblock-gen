import "./App.css";

import { useState, useEffect } from "react";
import ItemBlock from "./Item";
import CreatureBlock from "./Creature";
import markdownIcon from "./assets/markdown.svg";
import EscalatingEncounters from "./EscalatingEnc";

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

const DemoNPC = {
  name: "Goblin Scout",
  description:
    "A small, green-skinned humanoid with sharp features and a mischievous grin.",
  armorClass: "15 (leather)",
  hitPoints: "27",
  attack: "1 spear (close/near) +3 (1d6)",
  movement: "near (climb)",
  S: "-1",
  D: "+2",
  C: "+0",
  I: "+0",
  W: "-1",
  Ch: "-1",
  AL: "C",
  LV: "1",
  feats: [
    {
      id: 1,
      name: "Nimble.",
      description: " Move up to near. 2/day",
    },
  ],
};

const emptyCreature = {
  name: "",
  description: "",
  armorClass: "",
  hitPoints: "",
  attack: "",
  movement: "",
  S: "",
  D: "",
  C: "",
  I: "",
  W: "",
  Ch: "",
};

const LS_ITEMS_KEY = "statblock-gen-items";
const LS_CREATURES_KEY = "statblock-gen-creatures";

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

const creatureToMarkdown = (creature) => {
  let md = `### ${wrapText(creature.name || "Creature Name")}`;
  if (creature.description) md += `\n${wrapText(creature.description)}  `;
  if (creature.armorClass)
    md += `\n**Armor Class:** ${wrapText(creature.armorClass)}`;
  if (creature.hitPoints)
    md += `\n**Hit Points:** ${wrapText(creature.hitPoints)}`;
  if (creature.attack) md += `\n**Attack:** ${wrapText(creature.attack)}`;
  if (creature.movement) md += `\n**Movement:** ${wrapText(creature.movement)}`;
  const stats = ["S", "D", "C", "I", "W", "Ch", "AL", "LV"]
    .map((stat) => (creature[stat] ? `${stat}: ${creature[stat]}` : null))
    .filter(Boolean)
    .join(", ");
  if (stats) md += `\n**Stats:** ${wrapText(stats)}`;

  if (creature.feats && creature.feats.length > 0) {
    md += "  ";
    creature.feats.forEach((feat, i) => {
      if (
        (feat.name && feat.name.trim()) ||
        (feat.description && feat.description.trim())
      ) {
        md += `\n**${wrapText(feat.name || "Feat")}:** ${wrapText(
          feat.description || "",
        )}  `; // two spaces for soft break
      }
    });
  }
  return md.trim() + "\n";
};

function App() {
  const [activeScreen, setActiveScreen] = useState("statblocks");

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

  const [creatures, setCreatures] = useState(() => {
    const saved = localStorage.getItem(LS_CREATURES_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [DemoNPC];
      }
    }
    return [DemoNPC];
  });

  useEffect(() => {
    localStorage.setItem(LS_ITEMS_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem(LS_CREATURES_KEY, JSON.stringify(creatures));
  }, [creatures]);

  const handleItemChange = (idx, newItem) => {
    setItems((items) => items.map((item, i) => (i === idx ? newItem : item)));
  };

  const handleAddItem = () => {
    setItems((items) => [...items, emptyItem]);
  };

  const handleAddCreature = () => {
    setCreatures((creatures) => [...creatures, emptyCreature]);
  };

  const handleRemoveItem = (idx) => {
    const updatedItems = items.filter((_, i) => i !== idx);
    setItems(updatedItems);
  };

  const handleRemoveCreature = (idx) => {
    const updatedCreatures = creatures.filter((_, i) => i !== idx);
    setCreatures(updatedCreatures);
  };

  const handleCopyMarkdown = (idx) => {
    const md = itemToMarkdown(items[idx]);
    navigator.clipboard.writeText(md);
  };

  const handleCopyCreatureMarkdown = (idx) => {
    const md = creatureToMarkdown(creatures[idx]);
    navigator.clipboard.writeText(md);
  };

  return (
    <>
      <nav className="app-nav" aria-label="Main navigation">
        <div className="app-nav-main">
          <button
            className={
              activeScreen === "statblocks" ? "nav-btn active" : "nav-btn"
            }
            onClick={() => setActiveScreen("statblocks")}
          >
            Statblocks
          </button>
          <button
            className={
              activeScreen === "encounters" ? "nav-btn active" : "nav-btn"
            }
            onClick={() => setActiveScreen("encounters")}
          >
            Escalating Encounters
          </button>
        </div>

        <div className="app-nav-links" aria-label="Project links">
          <a
            href="https://ko-fi.com/nelsoncosta"
            target="_blank"
            rel="noreferrer"
            title="Support the project on Ko-fi"
          >
            <img src="/statblock-gen/coffee.svg" alt="" />
            Support
          </a>
          <a
            href="https://github.com/nelsonfncosta/statblock-gen/issues"
            target="_blank"
            rel="noreferrer"
            title="Report a bug or request a feature"
          >
            <img
              src="/statblock-gen/bug.svg"
              alt=""
              style={{ filter: "invert(1)" }}
            />
            Issues
          </a>
        </div>
      </nav>

      {activeScreen === "statblocks" && (
        <div className="statblock-layout">
          <div className="statblock-grid">
            {items.map((item, idx) => (
              <div key={`item-${item.name}-${idx}`} className="statblock-card">
                <div className="statblock-card-toolbar">
                  <button
                    onClick={() => handleCopyMarkdown(idx)}
                    className="copy-markdown-btn"
                    title="Copy as Markdown"
                    aria-label="Copy item as Markdown"
                  >
                    <img
                      src={markdownIcon}
                      alt="Markdown"
                      style={{
                        width: "18px",
                        height: "18px",
                        filter: "invert(1) brightness(2)",
                      }}
                    />
                  </button>
                  <button
                    onClick={() => handleRemoveItem(idx)}
                    className="remove-item-btn"
                    title="Remove Item"
                    aria-label="Remove item"
                  >
                    &times;
                  </button>
                </div>
                <ItemBlock
                  item={item}
                  onChange={(newItem) => handleItemChange(idx, newItem)}
                />
              </div>
            ))}
            {creatures.map((creature, idx) => (
              <div
                key={`creature-${creature.name}-${idx}`}
                className="statblock-card"
              >
                <div className="statblock-card-toolbar">
                  <button
                    onClick={() => handleCopyCreatureMarkdown(idx)}
                    className="copy-markdown-btn"
                    title="Copy as Markdown"
                    aria-label="Copy creature as Markdown"
                  >
                    <img
                      src={markdownIcon}
                      alt="Markdown"
                      style={{
                        width: "18px",
                        height: "18px",
                        filter: "invert(1) brightness(2)",
                      }}
                    />
                  </button>
                  <button
                    onClick={() => handleRemoveCreature(idx)}
                    className="remove-item-btn"
                    title="Remove Creature"
                    aria-label="Remove creature"
                  >
                    &times;
                  </button>
                </div>
                <CreatureBlock
                  creature={creature}
                  onChange={(newCreature) => {
                    setCreatures((prev) =>
                      prev.map((c, i) => (i === idx ? newCreature : c)),
                    );
                  }}
                />
              </div>
            ))}
          </div>

          <div className="statblock-actions">
            <button
              onClick={handleAddItem}
              style={{ margin: "20px 0", padding: "8px 16px" }}
            >
              Add Item
            </button>
            <button
              onClick={handleAddCreature}
              style={{ margin: "20px 0", padding: "8px 16px" }}
            >
              Add Creature
            </button>
          </div>
        </div>
      )}

      {activeScreen === "encounters" && <EscalatingEncounters />}
    </>
  );
}

export default App;
