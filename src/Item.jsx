import React, { useState } from "react";
import "./Item.css";

function ItemBlock({ item, onChange }) {
  const [hovered, setHovered] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);
  const [nameInput, setNameInput] = useState(item.name || "");
  const [descInput, setDescInput] = useState(item.description || "");
  const [addingField, setAddingField] = useState(null); // 'bonus', 'benefit', 'curse', 'personality'
  const [fieldInput, setFieldInput] = useState("");
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

  const handleAddField = (field) => {
    setAddingField(field);
    setFieldInput("");
  };

  const handleFieldInputChange = (e) => {
    setFieldInput(e.target.value);
  };

  const handleFieldInputSave = () => {
    if (fieldInput.trim() && onChange) {
      onChange({ ...item, [addingField]: fieldInput });
    }
    setAddingField(null);
    setFieldInput("");
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
          {editingName ? (
            <input
              className="item-card-name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onBlur={() => {
                setEditingName(false);
                if (nameInput !== item.name && onChange) {
                  onChange({ ...item, name: nameInput });
                }
              }}
              autoFocus
            />
          ) : (
            <span
              className="item-card-name"
              style={{ cursor: "pointer" }}
              onClick={() => setEditingName(true)}
            >
              {item.name || <span style={{ color: "#888" }}>Item Name</span>}
            </span>
          )}
        </div>
        <div
          className={`item-card-body${
            hovered ? " item-card-body-expanded" : ""
          }`}
          style={{ position: "relative" }}
        >
          {editingDesc ? (
            <textarea
              className="item-card-description"
              value={descInput}
              onChange={(e) => setDescInput(e.target.value)}
              onBlur={() => {
                setEditingDesc(false);
                if (descInput !== item.description && onChange) {
                  onChange({ ...item, description: descInput });
                }
              }}
              autoFocus
              rows={2}
            />
          ) : (
            <span
              className="item-card-description"
              style={{ cursor: "pointer", display: "block" }}
              onClick={() => setEditingDesc(true)}
            >
              {item.description || (
                <span style={{ color: "#888", fontStyle: "italic" }}>
                  Item description goes here.
                </span>
              )}
            </span>
          )}
          {item.bonus && (
            <div className="item-card-section">
              <span className="item-card-section-title">Bonus.</span>
              {editingBonus ? (
                <input
                  className="item-card-section-input"
                  value={bonusInput}
                  onChange={(e) => setBonusInput(e.target.value)}
                  onBlur={() => {
                    setEditingBonus(false);
                    if (bonusInput !== item.bonus && onChange) {
                      onChange({ ...item, bonus: bonusInput });
                    }
                  }}
                  autoFocus
                />
              ) : (
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => setEditingBonus(true)}
                >
                  {item.bonus}
                </span>
              )}
            </div>
          )}
          {item.benefit && (
            <div className="item-card-section">
              <span className="item-card-section-title">Benefit.</span>
              {editingBenefit ? (
                <input
                  className="item-card-section-input"
                  value={benefitInput}
                  onChange={(e) => setBenefitInput(e.target.value)}
                  onBlur={() => {
                    setEditingBenefit(false);
                    if (benefitInput !== item.benefit && onChange) {
                      onChange({ ...item, benefit: benefitInput });
                    }
                  }}
                  autoFocus
                />
              ) : (
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => setEditingBenefit(true)}
                >
                  {item.benefit}
                </span>
              )}
            </div>
          )}
          {item.curse && (
            <div className="item-card-section">
              <span className="item-card-section-title">Curse.</span>
              {editingCurse ? (
                <input
                  className="item-card-section-input"
                  value={curseInput}
                  onChange={(e) => setCurseInput(e.target.value)}
                  onBlur={() => {
                    setEditingCurse(false);
                    if (curseInput !== item.curse && onChange) {
                      onChange({ ...item, curse: curseInput });
                    }
                  }}
                  autoFocus
                />
              ) : (
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => setEditingCurse(true)}
                >
                  {item.curse}
                </span>
              )}
            </div>
          )}
          {item.personality && (
            <div className="item-card-section">
              <span className="item-card-section-title">Personality.</span>
              {editingPersonality ? (
                <input
                  className="item-card-section-input"
                  value={personalityInput}
                  onChange={(e) => setPersonalityInput(e.target.value)}
                  onBlur={() => {
                    setEditingPersonality(false);
                    if (personalityInput !== item.personality && onChange) {
                      onChange({ ...item, personality: personalityInput });
                    }
                  }}
                  autoFocus
                />
              ) : (
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => setEditingPersonality(true)}
                >
                  {item.personality}
                </span>
              )}
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
                      style={{
                        marginRight: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                      onClick={() => handleAddField("bonus")}
                    >
                      Bonus
                    </span>
                  )}
                  {!item.benefit && (
                    <span
                      style={{
                        marginRight: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                      onClick={() => handleAddField("benefit")}
                    >
                      Benefit
                    </span>
                  )}
                  {!item.curse && (
                    <span
                      style={{
                        marginRight: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                      onClick={() => handleAddField("curse")}
                    >
                      Curse
                    </span>
                  )}
                  {!item.personality && (
                    <span
                      style={{ cursor: "pointer", fontWeight: "bold" }}
                      onClick={() => handleAddField("personality")}
                    >
                      Personality
                    </span>
                  )}
                </div>
              </div>
              {addingField && (
                <div
                  className="item-card-add-input"
                  style={{ marginTop: "12px", textAlign: "center" }}
                >
                  <input
                    type="text"
                    value={fieldInput}
                    onChange={handleFieldInputChange}
                    placeholder={`Enter ${addingField}...`}
                    style={{ width: "80%", padding: "6px", fontSize: "1em" }}
                  />
                  <button
                    onClick={handleFieldInputSave}
                    style={{
                      marginLeft: "8px",
                      marginTop: "8px",
                      padding: "6px 16px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemBlock;
