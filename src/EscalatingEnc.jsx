import React, { useState } from "react";

const otherWitchEncounters = [
  "A black cat crosses your path. Attempts to lead you to the Witch's Kitchen (p.17).",
  "Sounds of someone sweeping as you enter the next room. An animated broom is sweeping the floor. It falls inert if touched, raising the Stress Level by 1.",
  "Sweeping sounds again, this time an overweight naked old lady stands sweeping the floor. Holds a finger up to shush the party, which douses all the lights in this room.",
  "The black cat appears. Follows the party until another encounter appears, then turns into the witch & attacks.",
];

const animatedArmorEncounters = [
  "A wooden stand meant for a suit of armor rests bare in the room. Metallic clinking can be heard in the distance.",
  "Nails on a chalkboard screech as you enter the room. A thin groove scratched into the floor from something heavy & sharp as a dented crimson helmet adorned with golden angel wings rolls toward you from the darkness, raising the Stress Level by 1.",
  "Metallic footsteps slowly approach you. A suit of crimson animated armor steps into the light holding an oversized greatsword & attacks. Falls apart if struck. The pieces disperse in all directions on their own after a pause.",
  "Slow metallic footsteps increase in intensity. The armor rushes the party in an attempt to fuse itself with a PC. Strength save or be fused with the armor, which swings wildly & attempts to break your arm/leg by hyperextending. Save each turn. Fail results in armor also having an action on your turn. Success gets you out of armor. Armor retreats if able. If destroyed, falls apart and can be worn as +1 plate. At Midnight, the armor reanimates & attempts to snap the neck of its wearer.",
];

const spiderQueenEncounters = [
  "Dozens of little spiders scurry from the cracks within the walls and beneath the furniture, raising the Stress Level by 1 while in this room.",
  "A strange orb completely made up of webbing in the corner of the room, a corpse that looks like one of your PCs. Wisdom Save by the one opening it or have the Stress Level raise by 1. Inside is that PC's preferred mundane weapon.",
  "Call for a marching order. Whoever is in the back must make a Strength Save or be lifted off the ground by a strand of thick webbing from the ceiling, followed by a bite for the throat. Whether she hits or misses, a thin woman with too many arms scampers away on the ceiling, dropping the PC.",
  "Casts web on the party, a torrent of spiders crawl from the shadows/cracks biting for 1d6 damage, followed by Dorothy rushing on her four spidery legs. Retreats once a PC is free from web. If killed, turns into a swarm of tiny spiders which scamper to her coffin. Several spiders try to carry away an iron key (p.33)",
];

const fallenNunEncounters = [
  "Black pentagram star streaked on the wall/floor, a holy symbol in the center begins to smoke, then alights on fire & falls off the wall, charred.",
  "Various holy symbols pinned to the walls, all of which slowly invert upside-down. Dark blood oozes from the symbols.",
  "Perception check or turn a corner and meet a pale woman dressed in a black robe & habit in a silent stare, eyes black and void. Failure results in save vs Wisdom or Hold Person as she silently floats away, increasing the Stress by 1. Silently floats into the next room regardless.",
  "Portraits of the Sister sitting on an easel/hanging on the walls, +1 portrait per repeat encounter. Lights go out if approached, holy symbols heat and smoke, 1d6 fire unless dropped. Once covered in darkness, she flies out from one of the portraits and bites. Mundane weapons pass right through her unless they are Cleric weapons. Destroying the portraits or attacking her with a spell causes her to flee. If killed, turns into a pillar of salt, which crumbles and drifts towards her coffin. An iron key (p.33) rests in the salt pile.",
];

const seductressEncounters = [
  "Pink waft of mist. Strong scent of flowery perfume, a flirty giggle echoes down the halls.",
  "Sounds of kissing before you enter the room, followed by screaming that is sharply silenced. Inside the next room is a corpse of what appears to be one of you lying on satin covers & plush pillows-face completely blank as if erased off, as well as an open wound near the jugular. Raises the Stress Level by 1.",
  "Call for a marching order. The one in the lead must make a Charisma Save to notice one of the other PCs (the copy missing their face from the above result) is acting notably different before they sprout fangs & attempt to bite you. The traitor turns into a pale woman, terribly beautiful were it not for the contorting face as she scampers away like an insect. The original PC walks in from where you came.",
  "Appears as Matilda (p.26), even if the real Matilda is with the party. Is lost & looking for someone to rescue her. Very clingy. Very flirtatious. Very touchy until she can easily get a bite. If killed, turns into a pink mist with wilted rose petals that trail to her coffin. Leaves an iron key (p.33) which clangs on the ground.",
];

const countEncounters = [
  "A sealed note rests under a wine glass filled with blood. Inside is a letter of mock apology as well as a peace offering: drinking the blood in this glass allows you to choose which Vampiric Trait (p.5) to receive.",
  "Lightning strikes, a long shadow of a winged creature flashes in the lights, raising the Stress Level by 1.",
  "Quiet peeps can be heard up ahead. A single bat flutters towards the party, followed by a cacophony of large bats battering the party as they fly past, raising the Stress Level by 1.",
  "The Count appears, taunting the party. Will retaliate if attacked once, then flee as a swarm of bats.",
];

const encounters = [
  { name: "The Other Witch (p.34)", table: otherWitchEncounters },
  { name: "The Count's Animated Armor (p.35)", table: animatedArmorEncounters },
  { name: "Dorothy, the Spider Queen (p.36)", table: spiderQueenEncounters },
  {
    name: "Sister Geraldine, Fallen Nun (p.37)",
    table: fallenNunEncounters,
  },
  { name: "Christina, the Seductress (p.38)", table: seductressEncounters },
  { name: "The Count (p.39)", table: countEncounters },
];

function EscalatingEncounters() {
  const [sceneList, setSceneList] = useState([]);

  const handleGenerate = () => {
    const count = 24; // 6 encounters x 4 scenes each
    const newSceneList = [];
    const newSceneCounts = {};
    // Filter encounters to only those with remaining scenes
    let availableEncounters = encounters.filter((enc) => {
      const shown = newSceneCounts[enc.name] || 0;
      return shown < enc.table.length;
    });
    for (let i = 0; i < count; i++) {
      if (availableEncounters.length === 0) break;
      const idx = Math.floor(Math.random() * availableEncounters.length);
      const encounter = availableEncounters[idx];
      // Track how many scenes have been shown for this encounter
      if (!newSceneCounts[encounter.name]) newSceneCounts[encounter.name] = 0;
      const sceneIdx = newSceneCounts[encounter.name];
      // Get the next scene
      const scene = encounter.table[sceneIdx];
      newSceneList.push({ name: encounter.name, scene });
      newSceneCounts[encounter.name] = sceneIdx + 1;
      // Remove encounter if all scenes have been shown
      if (newSceneCounts[encounter.name] >= encounter.table.length) {
        availableEncounters = availableEncounters.filter(
          (e) => e.name !== encounter.name
        );
      }
    }
    setSceneList(newSceneList);
  };

  return (
    <div style={{ margin: "24px" }}>
      <button
        onClick={handleGenerate}
        style={{ padding: "8px 16px", fontSize: "1.1rem" }}
      >
        Generate Escalating Encounters
      </button>
      <ul style={{ marginTop: "18px", paddingLeft: 0, listStyle: "none" }}>
        {sceneList.map((item, i) => {
          // Find total and remaining scenes for this encounter
          const encounter = encounters.find((e) => e.name === item.name);
          const totalScenes = encounter ? encounter.table.length : 0;
          // Find the index of this scene in the encounter's table
          const encounterScenes = encounter ? encounter.table : [];
          const sceneIdx = encounterScenes.indexOf(item.scene);
          const shownCount = sceneIdx >= 0 ? sceneIdx + 1 : 1;
          return (
            <li key={i} style={{ marginBottom: "16px", textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span
                  style={{
                    fontWeight: "bold",
                    color: "grey",
                    fontSize: "1.05rem",
                    marginRight: "10px",
                  }}
                >
                  {i + 1}:
                </span>
                <span
                  className="encounter-name"
                  style={{
                    fontWeight: "bold",
                    color: "#fff",
                    marginRight: "10px",
                    padding: "4px 8px",
                    border: "1px solid #555",
                  }}
                >
                  {item.name} &nbsp;
                  <span
                    style={{
                      fontWeight: "normal",
                      color: "#ccc",
                      fontSize: "0.95em",
                    }}
                  >
                    {shownCount}/{totalScenes}
                  </span>
                </span>
                <span
                  className="scene-text"
                  style={{ fontStyle: "italic", color: "#fff" }}
                >
                  {item.scene}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default EscalatingEncounters;
