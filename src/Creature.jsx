import React, { useState } from "react";
import "./Creature.css";

function CreatureBlock({ creature, onChange }) {
  const [name, setName] = useState(creature?.name || "");
  const [description, setDescription] = useState(creature?.description || "");
  const [armorClass, setArmorClass] = useState(creature?.armorClass || "");
  const [hitPoints, setHitPoints] = useState(creature?.hitPoints || "");
  const [attack, setAttack] = useState(creature?.attack || "");
  const [movement, setMovement] = useState(creature?.movement || "");
  const [stats, setStats] = useState({
    S: creature?.S || "",
    D: creature?.D || "",
    C: creature?.C || "",
    I: creature?.I || "",
    W: creature?.W || "",
    Ch: creature?.Ch || "",
    AL: creature?.AL || "",
    LV: creature?.LV || "",
  });
  const [feats, setFeats] = useState(creature?.feats || []);

  const handleAddField = (fieldType) => {
    if (fieldType === "feat") {
      setFeats((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: "feature name.",
          description: "feature description.",
        },
      ]);
    }
  };

  const handleStatChange = (stat, value) => {
    setStats((prev) => {
      const updated = { ...prev, [stat]: value };
      if (onChange) onChange({ ...creature, ...updated });
      return updated;
    });
  };

  // Dynamically generate stat fields from the initial stats object
  const statFields = Object.keys(stats).map((key) => ({ key, label: key }));

  return (
    <div className="creature-card">
      <div className="creature-header">
        <span
          className="creature-name"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => {
            const newValue = e.target.innerText;
            setName(newValue);
            if (onChange) onChange({ ...creature, name: newValue });
          }}
          tabIndex={0}
        >
          {name || <span style={{ color: "#888" }}>Creature Name</span>}
        </span>
      </div>
      <span
        className="creature-description"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          const newValue = e.target.innerText;
          setDescription(newValue);
          if (onChange) onChange({ ...creature, description: newValue });
        }}
        tabIndex={0}
        style={{ display: "block" }}
      >
        {description || (
          <span style={{ color: "#888", fontStyle: "italic" }}>
            Description
          </span>
        )}
      </span>
      <div className="creature-compact-row">
        <span className="creature-compact-field">
          <b>AC</b>
          <span
            className="creature-ac"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => {
              const newValue = e.target.innerText;
              setArmorClass(newValue);
              if (onChange) onChange({ ...creature, armorClass: newValue });
            }}
            tabIndex={0}
          >
            {armorClass || <span style={{ color: "#888" }}>--</span>}
          </span>
        </span>
        <span className="comma">,</span>
        <span className="creature-compact-field">
          <b>HP</b>
          <span
            className="creature-hp"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => {
              const newValue = e.target.innerText;
              setHitPoints(newValue);
              if (onChange) onChange({ ...creature, hitPoints: newValue });
            }}
            tabIndex={0}
          >
            {hitPoints || <span style={{ color: "#888" }}>--</span>}
          </span>
        </span>
        <span className="comma">,</span>
        <span className="creature-compact-field">
          <b>ATK</b>
          <span
            className="creature-attack"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => {
              const newValue = e.target.innerText;
              setAttack(newValue);
              if (onChange) onChange({ ...creature, attack: newValue });
            }}
            tabIndex={0}
          >
            {attack || <span style={{ color: "#888" }}>--</span>}
          </span>
        </span>
        <span className="comma">,</span>
        <span className="creature-compact-field">
          <b>MV</b>
          <span
            className="creature-movement"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => {
              const newValue = e.target.innerText;
              setMovement(newValue);
              if (onChange) onChange({ ...creature, movement: newValue });
            }}
            tabIndex={0}
          >
            {movement || <span style={{ color: "#888" }}>--</span>}
          </span>
        </span>
        <span className="comma">,</span>
        {statFields.map((stat, i) => (
          <React.Fragment key={stat.key}>
            <span className="creature-compact-field">
              <b>{stat.label}</b>
              <span
                className="creature-stat"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => {
                  const newValue = e.target.innerText;
                  handleStatChange(stat.key, newValue);
                }}
                tabIndex={0}
              >
                {stats[stat.key] || <span style={{ color: "#888" }}>--</span>}
              </span>
            </span>
            {i < statFields.length - 1 && <span className="comma">,</span>}
          </React.Fragment>
        ))}
      </div>
      {feats.length > 0 &&
        feats.map((feat, idx) => (
          <div className="creature-feat-section" key={feat.id || idx}>
            <span
              className="creature-feat-title"
              style={{ cursor: "pointer" }}
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => {
                const newValue = e.target.innerText.trim();
                let updatedFeats = feats.map((f, i) =>
                  i === idx ? { ...f, name: newValue } : f
                );
                // Remove if both name and description are empty
                updatedFeats = updatedFeats.filter(
                  (f) => f.name.trim() !== "" || f.description.trim() !== ""
                );
                setFeats(updatedFeats);
                if (onChange) onChange({ ...creature, feats: updatedFeats });
              }}
              tabIndex={0}
            >
              {feat.name}
            </span>
            <span
              className="creature-feat-input"
              style={{ cursor: "pointer" }}
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => {
                const newValue = e.target.innerText.trim();
                let updatedFeats = feats.map((f, i) =>
                  i === idx ? { ...f, description: newValue } : f
                );
                // Remove if both name and description are empty
                updatedFeats = updatedFeats.filter(
                  (f) => f.name.trim() !== "" || f.description.trim() !== ""
                );
                setFeats(updatedFeats);
                if (onChange) onChange({ ...creature, feats: updatedFeats });
              }}
              tabIndex={0}
            >
              {feat.description}
            </span>
          </div>
        ))}
      <div
        className="show-on-hover"
        style={{ marginTop: "12px", textAlign: "center" }}
      >
        <button
          className="card-add-btn"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          +
        </button>
        <div>
          <span
            className="opt-field-option"
            onClick={() => handleAddField("feat")}
          >
            Feature
          </span>
        </div>
      </div>
    </div>
  );
}

export default CreatureBlock;
