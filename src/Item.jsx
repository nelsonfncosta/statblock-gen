// Utility to select all content in contenteditable
function selectAllContent(ref) {
  const el = ref.current;
  if (el) {
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    range.setStart(el, 0);
    range.setEnd(el, el.childNodes.length);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
}
import React, { useState } from "react";
import "./Item.css";

function ItemBlock({ item, onChange }) {
  const [hovered, setHovered] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);
  const [nameInput, setNameInput] = useState(item.name || "");
  const [descInput, setDescInput] = useState(item.description || "");
  const [addingField, setAddingField] = useState(null); // 'bonus', 'benefit', 'curse', 'personality'
  // Inline editing for bonus, benefit, curse, personality
  const [editingBonus, setEditingBonus] = useState(false);
  const [editingBenefit, setEditingBenefit] = useState(false);
  const [editingCurse, setEditingCurse] = useState(false);
  const [editingPersonality, setEditingPersonality] = useState(false);
  const [bonusInput, setBonusInput] = useState(item.bonus || "");
  const [benefitInput, setBenefitInput] = useState(item.benefit || "");
  const [curseInput, setCurseInput] = useState(item.curse || "");
  const [personalityInput, setPersonalityInput] = useState(
    item.personality || ""
  );
  // Refs for focusing contenteditable fields
  const bonusRef = React.useRef(null);
  const benefitRef = React.useRef(null);
  const curseRef = React.useRef(null);
  const personalityRef = React.useRef(null);

  const fieldConfig = {
    bonus: {
      setInput: setBonusInput,
      setEditing: setEditingBonus,
      ref: bonusRef,
    },
    benefit: {
      setInput: setBenefitInput,
      setEditing: setEditingBenefit,
      ref: benefitRef,
    },
    curse: {
      setInput: setCurseInput,
      setEditing: setEditingCurse,
      ref: curseRef,
    },
    personality: {
      setInput: setPersonalityInput,
      setEditing: setEditingPersonality,
      ref: personalityRef,
    },
  };

  const handleAddField = (field) => {
    if (onChange) {
      onChange({ ...item, [field]: "enter text here" });
    }
    const config = fieldConfig[field];
    if (config) {
      config.setInput("enter text here");
      config.setEditing(true);
      setTimeout(() => {
        if (config.ref.current) {
          config.ref.current.focus();
          selectAllContent(config.ref);
        }
      }, 0);
    }
  };

  // Save edits if mouse leaves while editing
  const handleCardMouseLeave = () => {
    setHovered(false);
    setAddingField(null);
    if (editingName) {
      setEditingName(false);
      if (nameInput !== item.name && onChange) {
        onChange({ ...item, name: nameInput });
      }
    }
    if (editingDesc) {
      setEditingDesc(false);
      if (descInput !== item.description && onChange) {
        onChange({ ...item, description: descInput });
      }
    }
    if (editingBonus) {
      setEditingBonus(false);
      if (bonusInput !== item.bonus && onChange) {
        onChange({ ...item, bonus: bonusInput });
      }
    }
    if (editingBenefit) {
      setEditingBenefit(false);
      if (benefitInput !== item.benefit && onChange) {
        onChange({ ...item, benefit: benefitInput });
      }
    }
    if (editingCurse) {
      setEditingCurse(false);
      if (curseInput !== item.curse && onChange) {
        onChange({ ...item, curse: curseInput });
      }
    }
    if (editingPersonality) {
      setEditingPersonality(false);
      if (personalityInput !== item.personality && onChange) {
        onChange({ ...item, personality: personalityInput });
      }
    }
  };

  const canAddMoreFields =
    !item.bonus || !item.benefit || !item.curse || !item.personality;

  return (
    <div className="item-container">
      <div
        className="item-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleCardMouseLeave}
      >
        <div className="item-card-header">
          <span
            className="item-card-name"
            style={{ cursor: "pointer" }}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => {
              setEditingName(false);
              const newValue = e.target.innerText;
              setNameInput(newValue);
              if (newValue !== item.name && onChange) {
                onChange({ ...item, name: newValue });
              }
            }}
            // onInput removed to prevent cursor jump
            onFocus={() => setEditingName(true)}
            tabIndex={0}
          >
            {nameInput || <span style={{ color: "#888" }}>Item Name</span>}
          </span>
        </div>
        <div
          className={`item-card-body${
            hovered ? " item-card-body-expanded" : ""
          }`}
          style={{ position: "relative" }}
        >
          <span
            className="item-card-description"
            style={{ cursor: "pointer", display: "block" }}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => {
              setEditingDesc(false);
              const newValue = e.target.innerText;
              setDescInput(newValue);
              if (newValue !== item.description && onChange) {
                onChange({ ...item, description: newValue });
              }
            }}
            // onInput removed to prevent cursor jump
            onFocus={() => setEditingDesc(true)}
            tabIndex={0}
          >
            {descInput || (
              <span style={{ color: "#888", fontStyle: "italic" }}>
                Item description goes here.
              </span>
            )}
          </span>
          {item.bonus && (
            <div className="item-card-section">
              <span className="item-card-section-title">Bonus.</span>
              <span
                className="item-card-section-input"
                style={{ cursor: "pointer" }}
                contentEditable
                suppressContentEditableWarning
                ref={bonusRef}
                onBlur={(e) => {
                  setEditingBonus(false);
                  const newValue = e.target.innerText;
                  setBonusInput(newValue);
                  if (newValue !== item.bonus && onChange) {
                    onChange({ ...item, bonus: newValue });
                  }
                }}
                onFocus={() => setEditingBonus(true)}
                tabIndex={0}
              >
                {bonusInput}
              </span>
            </div>
          )}
          {item.benefit && (
            <div className="item-card-section">
              <span className="item-card-section-title">Benefit.</span>
              <span
                className="item-card-section-input"
                style={{ cursor: "pointer" }}
                contentEditable
                suppressContentEditableWarning
                ref={benefitRef}
                onBlur={(e) => {
                  setEditingBenefit(false);
                  const newValue = e.target.innerText;
                  setBenefitInput(newValue);
                  if (newValue !== item.benefit && onChange) {
                    onChange({ ...item, benefit: newValue });
                  }
                }}
                onFocus={() => setEditingBenefit(true)}
                tabIndex={0}
              >
                {benefitInput}
              </span>
            </div>
          )}
          {item.curse && (
            <div className="item-card-section">
              <span className="item-card-section-title">Curse.</span>
              <span
                className="item-card-section-input"
                style={{ cursor: "pointer" }}
                contentEditable
                suppressContentEditableWarning
                ref={curseRef}
                onBlur={(e) => {
                  setEditingCurse(false);
                  const newValue = e.target.innerText;
                  setCurseInput(newValue);
                  if (newValue !== item.curse && onChange) {
                    onChange({ ...item, curse: newValue });
                  }
                }}
                onFocus={() => setEditingCurse(true)}
                tabIndex={0}
              >
                {curseInput}
              </span>
            </div>
          )}
          {item.personality && (
            <div className="item-card-section">
              <span className="item-card-section-title">Personality.</span>
              <span
                className="item-card-section-input"
                style={{ cursor: "pointer" }}
                contentEditable
                suppressContentEditableWarning
                ref={personalityRef}
                onBlur={(e) => {
                  setEditingPersonality(false);
                  const newValue = e.target.innerText;
                  setPersonalityInput(newValue);
                  if (newValue !== item.personality && onChange) {
                    onChange({ ...item, personality: newValue });
                  }
                }}
                onFocus={() => setEditingPersonality(true)}
                tabIndex={0}
              >
                {personalityInput}
              </span>
            </div>
          )}
          {canAddMoreFields && (
            <div
              className={`item-card-add-field${
                hovered ? " item-card-body-expanded" : ""
              }`}
              style={{ marginTop: "12px", textAlign: "center" }}
            >
              <div
                style={{
                  opacity: hovered && !addingField ? 1 : 0,
                  pointerEvents: hovered && !addingField ? "auto" : "none",
                  transition: "opacity 0.35s",
                }}
              >
                <button
                  className="item-card-add-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  +
                </button>
                <div
                  className={`item-card-add-options${hovered ? " show" : ""}`}
                  style={{ marginTop: "8px" }}
                >
                  {!item.bonus && (
                    <span
                      className="opt-field-option"
                      onClick={() => handleAddField("bonus")}
                    >
                      Bonus
                    </span>
                  )}
                  {!item.benefit && (
                    <span
                      className="opt-field-option"
                      onClick={() => handleAddField("benefit")}
                    >
                      Benefit
                    </span>
                  )}
                  {!item.curse && (
                    <span
                      className="opt-field-option"
                      onClick={() => handleAddField("curse")}
                    >
                      Curse
                    </span>
                  )}
                  {!item.personality && (
                    <span
                      className="opt-field-option"
                      onClick={() => handleAddField("personality")}
                    >
                      Personality
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemBlock;
