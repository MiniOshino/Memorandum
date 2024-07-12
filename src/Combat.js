import React, { use, useEffect, useMemo, useState } from "react";
import { load } from "./actions/load";
import Image from "next/image";

export const Combat = ({ scene, setScene }) => {
  const [initcombat, setInitcombat] = useState(0);
  const [combatstatus, setCombatstatus] = useState("Ongoing");
  const [enemyName, setEnemyName] = useState("");
  const [enemyHP, setEnemyHP] = useState(0);
  const [enemyHPC, setEnemyHPC] = useState(0);
  const [phase, setPhase] = useState(0);
  const [phasechange, setPhasechange] = useState(false);
  const [turn, setTurn] = useState(1);
  const [phaseturn, setPhaseturn] = useState(0); //Gets reset every phase to keep up with lore inputs.
  const [timer, setTimer] = useState(999);
  const [cycle, setCycle] = useState(0);
  const [powerlvl, setPowerlvl] = useState(4);
  const [cardlvl, setCardlvl] = useState(1);
  const [enemyrotation, setEnemyrotation] = useState([]);
  const [teambuild, setTeambuild] = useState([]);
  const [initteambuild, setInitteambuild] = useState([]);
  const [equiped, setEquiped] = useState([]);
  const [allyhud, setAllyhud] = useState(0); //0: Zayn Def /1: Zayn Atk /2: Nora /3: Roy /4: Scarlett
  //-----------------------------------------------Combat Stats that need to be tracked----------------------------------------------
  const [charlvl, setCharlvl] = useState([]); //Sets the lvl of each char at start of combat or durring to see what they can do.

  const [parriedIAR, setParriesIAR] = useState(0); //Zayn
  const [attacksIAR, setAttacksIAR] = useState(0); //Zayn
  const [compareIAR, setCompareIAR] = useState(0); //Zayn

  const [utilityU, setUtilityU] = useState(0); //Nora
  const [utilityactivation, setUtilityactivation] = useState([]); //Nora /0: Blaster used? /1: Utility used? /2: Parried? /3: Roy? /: Scarlett?

  const [lastEU, setLastEM] = useState([]); //Roy

  const [enemyblock, setEnemyblock] = useState([]);
  const [teamblock, setTeamblock] = useState([]);
  const [teamparry, setTeamparry] = useState([]);

  const [allyturn, setAllyturn] = useState([]);
  const [enemyturn, setEnemyturn] = useState([]);
  const [chronoturn, setChronoturn] = useState(0);

  const [combatsteps, setCombatsteps] = useState(0);

  const [anim, setAnim] = useState("");

  let stats;
  if (enemyHPC < 0) {
    stats = 0;
  } else {
    stats = 1000 * (((100 / enemyHP) * enemyHPC) / 100);
  }

  //-------------------------------------------------------------------------SET EQUIPED--------------------------------------------------------------
  const updateEquip = (x, y) => {
    setEquiped((prevEquiped) => {
      const newEquiped = [...prevEquiped];
      newEquiped[y] = x;
      return newEquiped;
    });
  };
  const checkcardlvl = () => {
    if (powerlvl >= 16) {
      setEquiped([]);
      updateEquip([], 0);
      updateEquip([], 1);
      setCardlvl(2);
      if (powerlvl >= 256) {
        updateEquip([], 2);
        setCardlvl(3);
        if (powerlvl >= 4096) {
          updateEquip([], 3);
          setCardlvl(4);
        }
      }
    } else {
      if (powerlvl === 1) {
        setEquiped([]);
        updateEquip([], 0);
        updateEquip([], 1);
        setCardlvl(2);
      } else {
        setEquiped([]);
        updateEquip([], 0);
        setCardlvl(1);
      }
    }
  };
  //--------------------------------------------------------------------------FIGHTS-------------------------------------------
  if (scene.fight === "Tutorial") {
    const TutorialInitE = () => {
      if (initcombat === 0) {
        setInitcombat(2);
        setEnemyName("Maggi");
        setEnemyHP(6);
        setEnemyHPC(6);
        updateEquip([], 0);
        setCharlvl([0, 0]);
        checkcardlvl();
        setEnemyrotation([
          [
            [["Attack", 1, "Melee"], ["”Readies blade1”"]],
            [["Attack", 2, "Melee"], ["”Readies blade2”"]],
            [["Attack", 3, "Melee"], ["”Readies blade3”"]],
          ],
          [
            [
              ["Attack", 2, "Melee"],
              ["Attack", 3, "Melee"],
              ["”Readies Themselves1”"],
            ],
            [["Defense", 2], ["Defense", 3], ["”Readies Themselves2”"]],
            [["Attack", 1, "Melee"], ["Defense", 1], ["”Readies Themselves3”"]],
          ],
        ]);
        setTeambuild([
          [
            ["Defense", "ZaynDagger", "always", 1, 2], //type, name, basic, parry, block
            ["Defense", "ZaynBlade", "always", 2, 3],
            ["Defense", "ZaynBroadsword", "always", 3, 1],
            ["Defense", "ZaynGuandoorAxe", "always", 4, 5],
            ["Defense", "ZaynScythe", "always", 5, 4],
          ],
          [
            ["Attack", "ZaynDagger", "always", "Melee", 1],
            ["Attack", "ZaynBlade", "always", "Melee", 2],
            ["Attack", "ZaynBroadsword", "always", "Melee", 3],
            ["Attack", "ZaynGuandoOrAXe", "always", "Melee", 4],
            ["Attack", "ZaynScythe", "always", "Melee", 5],
          ],
        ]);
        setInitteambuild([
          [
            ["Defense", "ZaynDagger", "always", 1, 2], //type, name, basic, parry, block
            ["Defense", "ZaynBlade", "always", 2, 3],
            ["Defense", "ZaynBroadsword", "always", 3, 1],
            ["Defense", "ZaynGuandoorAxe", "always", 4, 5],
            ["Defense", "ZaynScythe", "always", 5, 4],
          ],
          [
            ["Attack", "ZaynDagger", "always", "Melee", 1],
            ["Attack", "ZaynBlade", "always", "Melee", 2],
            ["Attack", "ZaynBroadsword", "always", "Melee", 3],
            ["Attack", "ZaynGuandoOrAXe", "always", "Melee", 4],
            ["Attack", "ZaynScythe", "always", "Melee", 5],
          ],
        ]);
      } else if (initcombat === 1) {
        if (phasechange) {
          setPhasechange(false);
          if (phase === 1) {
            // SEcnod phase
            setEnemyHP(200);
            setEnemyHPC(200);

            setScene("Fights", "Test1");
          }
        }
        if (combatstatus === "Victory") {
          console.log("Congratz -> Continue with Story accordingly");
        }
        console.log("*Checks script*");
        setInitcombat(2);
      }
    };

    if (initcombat === 0 || initcombat === 1) {
      TutorialInitE();
    }
  }
  //-------------------------------------------------------------------------SET ENEMYBLOCK--------------------------------------------------------------
  const addenemyblock = (x) => {
    setEnemyblock((temp) => [...temp, x]);
  };
  //-------------------------------------------------------------------------SET AllyBLOCK--------------------------------------------------------------
  const addallyblock = (x) => {
    setTeamblock((temp) => [...temp, x]);
  };
  //-------------------------------------------------------------------------SET ALLYPARRY--------------------------------------------------------------
  const addallyparry = (x) => {
    setTeamparry((temp) => [...temp, x]);
  };
  //-------------------------------------------------------------------------ADD ALLY TURN--------------------------------------------------------------
  const addallyturn = (x) => {
    setAllyturn((temp) => [...temp, x]);
  };
  //-------------------------------------------------------------------------ADD ENEMY TURN--------------------------------------------------------------
  const addenemyturn = (x) => {
    setEnemyturn((temp) => [...temp, x]);
  };
  //-------------------------------------------------------------------------ADD Teambuild--------------------------------------------------------------
  const addteambuild = (newItem, key) => {
    //key 0: Zayn Def etc.
    setTeambuild((temp) => {
      const addcard = structuredClone(temp);
      addcard[key].push(newItem);
      return addcard;
    });
  };
  //------------------------------------------------------------------------ANIMTION TOTATION ALLIES--------------------------------------------------------------
  const RotationOrder = () => {
    if (combatstatus === "W") {
      setCombatsteps(5);
    } else if (allyturn[chronoturn] === "Hit") {
      if (enemyHPC - powerlvl <= 0) {
        console.log("YOU BEAN THE PHASE");
        setCombatstatus("W");
        setEnemyHPC(0);
        setAnim("Attack");
        setChronoturn(chronoturn + 1);
      } else {
        console.log("You hit em");
        setEnemyHPC(enemyHPC - powerlvl);
        setAnim("Attack");
        setChronoturn(chronoturn + 1);
      }
    } else if (allyturn[chronoturn] === "Blocked") {
      console.log("Blocked!");
      setAnim("Block");
      setChronoturn(chronoturn + 1);
    } else if (allyturn[chronoturn] === "Fin") {
      console.log("That was the last order");
      setAnim("");
      setChronoturn(0);
      setCombatsteps(3);
    }
  };
  //------------------------------------------------------------------------ANIMTION TOTATION ENEMIES--------------------------------------------------------------
  const RotationOrderE = () => {
    if (combatstatus === "W" || combatstatus === "L") {
      setCombatsteps(5);
    } else if (enemyturn[chronoturn] === "Hit") {
      console.log("They hit you!");
      if (powerlvl / 2 === 0.5) {
        setCombatstatus("L");
        setPowerlvl(0);
        setAnim("Attack");
        setChronoturn(chronoturn + 1);
      } else {
        setPowerlvl(powerlvl / 2);
        checkcardlvl();
        setAnim("Attack");
        setChronoturn(chronoturn + 1);
      }
    } else if (enemyturn[chronoturn] === "Parried") {
      if (enemyHPC - powerlvl <= 0) {
        console.log("YOU BEAN THE PHASE");
        setCombatstatus("W");
        setEnemyHPC(0);
        setAnim("Parry");
        setParriesIAR(parriedIAR + 1);
        setChronoturn(chronoturn + 1);
      } else {
        console.log("Parried!");
        setEnemyHPC(enemyHPC - powerlvl);
        setAnim("Parry");
        setParriesIAR(parriedIAR + 1);
        setChronoturn(chronoturn + 1);
      }
    } else if (enemyturn[chronoturn] === "Blocked") {
      console.log("Blocked!");
      setAnim("Block");
      setChronoturn(chronoturn + 1);
    } else if (enemyturn[chronoturn] === "Fin") {
      console.log("That was the last order");
      setAnim("");
      setChronoturn(0);
      setCombatsteps(5);
    }
  };
  //-------------------------------------------------------------------------LOGIC 2 DO ALLY THINGS HIT?--------------------------------------------------------------

  const CombatLogic2 = () => {
    Object.entries(equiped).map(([key, eq]) => {
      console.log("Test 1");
      console.log(eq[0]);
      if (eq[0] === "Attack") {
        console.log("Is an attack");
        if (eq[3] === "Melee") {
          console.log("You did a melee");
          if (eq[1].includes("Zayn")) {
            //array.some(item => item.includes('bean'));
            console.log("get reset bisch");
            if (parriedIAR > 0) {
              setCompareIAR(0);
            }
            setParriesIAR(0);
          }
          if (enemyblock.includes(eq[4])) {
            console.log("Blocked");
            addallyturn("Blocked");
            if (eq.some((item) => item.includes("Zayn"))) {
              setAttacksIAR(0);
              setCompareIAR(0);
            }
          } else {
            console.log("Hit");
            addallyturn("Hit");
            if (eq.some((item) => item.includes("Zayn"))) {
              setAttacksIAR(attacksIAR + 1);
            }
          }
        } else if (eq[3] === "Ranged") {
          console.log("You did a ranged");
          if (enemyblock.includes(eq[4])) {
            console.log("Blocked");
            addallyturn("Blocked");
          } else {
            console.log("Hit");
            addallyturn("Hit");
          }
        }
      }
    });
    addallyturn("Fin");
    setCombatsteps(2);
  };
  //-------------------------------------------------------------------------LOGIC 3 DO ENEMY THINGS HIT?--------------------------------------------------------------

  const CombatLogic3 = () => {
    Object.entries(enemyrotation[phase][cycle]).map(([key, eq]) => {
      console.log("Test 1");
      console.log(eq[0]);
      if (eq[0] === "Attack") {
        console.log("Is an attack");
        if (eq[2] === "Melee") {
          console.log("Is melee");
          if (teamparry.includes(eq[1])) {
            console.log("Parried");
            addenemyturn("Parried");
          } else if (teamblock.includes(eq[1])) {
            console.log("Blocked");
            addenemyturn("Blocked");
          } else {
            console.log("Hit");
            addenemyturn("Hit");
            // setTimeout(() => {
            //   Hit();
            // }, 2000);
          }
        } else if (eq[2] === "Ranged") {
          console.log("its ranged");
        }
      }
    });
    addenemyturn("Fin");
    setCombatsteps(4);
  };
  //-----------------------------------------------------------------------------------LOGIC CONCLUSION-----------------------------------
  const CombatLogicConclusion = async () => {
    setTeambuild(initteambuild);

    if (parriedIAR > attacksIAR) {
      if (parriedIAR > compareIAR) {
        console.log("Nice Parry upkeep");
        console.log(parriedIAR / 3);
        console.log(compareIAR / 3);
        if (Math.floor(parriedIAR / 3) > Math.floor(compareIAR / 3)) {
          //Get Perfect parrie card
          console.log("Me here?");
          addteambuild(["Utility", "ZaynPerfectDefense", "once"], 0);
          console.log(teambuild);
        }
      } else {
        setParriesIAR(0);
      }
    } else {
      //IDK IF THIS CAN EVEN HAPPEN BUTJUST IN CASE
      console.log("ATTACK RESET ACTUALLY HAPPENED?!");
      if (attacksIAR > compareIAR) {
        console.log("Nice Attack upkeept");
      } else {
        setAttacksIAR(0);
      }
    }
    setCompareIAR(0);

    setCombatsteps(0);
    setTurn(turn + 1);
    setPhaseturn(phaseturn + 1);
    if (enemyrotation[phase].length === cycle + 1) {
      setCycle(0);
    } else {
      setCycle(cycle + 1);
    }

    setTeamblock([]);
    setTeamparry([]);
    setEnemyblock([]);
    setAllyturn([]);
    setEnemyturn([]);
    checkcardlvl();
    if (combatstatus === "W" || combatstatus === "L") {
      setAnim("");
      if (combatstatus === "W") {
        if (enemyrotation[phase + 1] === undefined) {
          setCombatstatus("Victory");
          console.log("You winz");
          //Run the victory condition in the thingy.
        } else {
          console.log("Phase change");
          setCycle(0);
          setPhaseturn(0);
          setPhase(phase + 1);
          setPhasechange(true);
          setCombatstatus("");
          setChronoturn(0);
          setInitcombat(1);
          setCombatstatus("Ongoing");
        }
      }
      if (combatstatus === "L") {
        //You lose, Restart or Go back to Library.
        console.log("Massive L");
      }
    } else {
      setInitcombat(1);
      setCombatstatus("Ongoing");
    }

    console.log("This is the end");
  };
  //-------------------------------------------------------------------------LOAD WHATEVER IS NEEDED BC SHIT DOESNT RESET--------------------------------------------------------------
  useEffect(() => {
    if (combatsteps === 1) {
      CombatLogic2();
    } else if (combatsteps === 2) {
      if (chronoturn === 0) {
        RotationOrder();
      } else {
        if (allyturn[chronoturn - 1] === "Hit") {
          console.log("Chronoturn Hit");
          setTimeout(() => {
            RotationOrder();
          }, 1800);
        } else if (allyturn[chronoturn - 1] === "Blocked") {
          console.log("Chronoturn Blocked");
          setTimeout(() => {
            RotationOrder();
          }, 4000);
        } else {
          console.log("Chronoturn Neutral");

          setTimeout(() => {
            RotationOrder();
          }, 2000);
        }
      }
    } else if (combatsteps === 3) {
      CombatLogic3();
    } else if (combatsteps === 4) {
      if (chronoturn === 0) {
        RotationOrderE();
      } else {
        if (enemyturn[chronoturn - 1] === "Hit") {
          console.log("Chronoturn Hit");
          setTimeout(() => {
            RotationOrderE();
          }, 1800);
        } else if (enemyturn[chronoturn - 1] === "Blocked") {
          console.log("Chronoturn Blocked");
          setTimeout(() => {
            RotationOrderE();
          }, 4000);
        } else {
          console.log("Chronoturn Neutral");

          setTimeout(() => {
            RotationOrderE();
          }, 2000);
        }
      }
    } else if (combatsteps === 5) {
      CombatLogicConclusion();
    }
  });

  //-------------------------------------------------------------------------LOGIC 1 WHO HAS WHAT BLOCKED?!--------------------------------------------------------------

  const CombatLogic = async () => {
    if (parriedIAR > attacksIAR) {
      setCompareIAR(parriedIAR);
    } else {
      setCompareIAR(attacksIAR);
    }

    Object.entries(enemyrotation[phase][cycle]).map(([key, er]) => {
      console.log("Rotation time");
      if (er[0] === "Defense") {
        console.log("Defense spoted!");
        addenemyblock(er[1]);
      }
    });

    Object.entries(equiped).map(([key, eq]) => {
      console.log("Rotation time ally");
      if (eq[0] === "Defense") {
        if (eq[1].includes("Zayn")) {
          console.log("im here?");
          if (attacksIAR > 0) {
            setCompareIAR(0);
          }
          setAttacksIAR(0);
          addallyparry(eq[3]);
        }
        console.log("Defense spoted!");
        addallyblock(eq[4]);
      } else if (eq[0] === "Utility") {
        if (eq[1] === "ZaynPerfectDefense") {
          setPowerlvl(powerlvl * 2);
          addallyparry(1);
          addallyparry(2);
          addallyparry(3);
          addallyparry(4);
          addallyparry(5);
        }
      }
    });

    setCombatsteps(1);
  };
  //-------------------------------------------------------------------------VISUALS--------------------------------------------------------------

  return (
    <div>
      <div>
        <button
          className="absolute border-solid border-4 border-green-600 w-[5%] h-[5%] z-30"
          onClick={async () => {
            setScene("Fights", "Test1");
          }}
        ></button>
        {anim === "Attack" ? (
          <Image
            className=" z-40 w-[50%] h-[50%] animate-[vibeout_2s]"
            src={`snacknanachi.gif`}
            alt={"snackachi"}
          />
        ) : null}
        {anim === "Block" ? (
          <Image
            className=" z-40 w-[50%] h-[50%] animate-[vibeout_2s]"
            src={`shibainusideeye.gif`}
            alt={"snackachi"}
          />
        ) : null}
        {anim === "Parry" ? (
          <Image
            className=" z-40 w-[50%] h-[50%] animate-[vibeout_2s]"
            src={`Whitescreen.gif`}
            alt={"snackachi"}
          />
        ) : null}
        {combatstatus === "Ongoing" ? null : (
          <div className="absolute z-40 w-full h-full"></div>
        )}
      </div>
      <div className="absolute border-solid flex flex-col p-4 place-content-start place-items-center border-4 border-blue-600 w-[100%] h-[30%] top-0 left-0">
        <div className="text-xl font-semibold p-4 text-white">{enemyName}</div>
        <div>
          <div
            className={`absolute h-[40px] w-[1000px] translate-x-[-500px] bg-red-800`}
            style={{
              width: stats,
            }}
          ></div>
          <div
            className={`absolute flex h-[40px] w-[1000px] translate-x-[-500px] place-content-center place-items-center rounded border-4 border-solid border-white bg-transparent`}
          >
            <div className=" text-xl font-semibold text-white">
              {enemyHPC}/{enemyHP}
            </div>
          </div>
        </div>
        <div className="text-xl translate-y-[100%] italic p-4 text-white">
          {enemyrotation &&
            enemyrotation.length > 0 &&
            enemyrotation[phase] &&
            enemyrotation[phase][cycle][phase + 1]}
        </div>
      </div>
      <div className="absolute border-solid flex place-content-center place-items-center border-4 border-purple-600 w-[100%] h-[30%] top-[50%] translate-y-[-50%] left-0">
        <div className=" border-solid border-4 border-yellow-400 w-[10%] h-[100%] flex flex-col place-content-center place-items-center p-2">
          {(teambuild[0]?.length !== undefined ||
            teambuild[1]?.length !== undefined) && (
            <button
              className="border-4 border-solid w-[100%] h-[20%] mt-1 mb-1 border-white"
              onClick={async () => {
                if (allyhud === 0) {
                  setAllyhud(1);
                } else {
                  if (attacksIAR > parriedIAR && allyhud !== 1) {
                    setAllyhud(1);
                  } else {
                    setAllyhud(0);
                  }
                }
              }}
            >
              Zayn: {parriedIAR > attacksIAR ? parriedIAR : attacksIAR}
            </button>
          )}
          {teambuild[2]?.length !== undefined && (
            <button
              className="border-4 border-solid w-[100%] h-[20%]  mt-1 mb-1 border-white"
              onClick={async () => {
                setAllyhud(2);
              }}
            >
              Nora
            </button>
          )}
          {teambuild[3]?.length !== undefined && (
            <button
              className="border-4 border-solid w-[100%] h-[20%]  mt-1 mb-1 border-white"
              onClick={async () => {
                setAllyhud(3);
              }}
            >
              Roy
            </button>
          )}
          {teambuild[4]?.length !== undefined && (
            <button
              className="border-4 border-solid w-[100%] h-[20%]  mt-1 mb-1 border-white"
              onClick={async () => {
                setAllyhud(4);
              }}
            >
              Scarlett
            </button>
          )}
        </div>
        <div className=" border-solid border-4 border-yellow-400 w-[80%] h-[100%] flex place-content-center place-items-center">
          {equiped &&
            equiped.length > 0 &&
            equiped &&
            Object.entries(equiped).map(([key, eq]) => (
              <button
                key={key}
                className=" flex h-[100%] w-[15%] ml-1 flex-col border-4 border-solid border-blue-400 place-items-center text-white hover:border-yellow-300 active:border-gray-500"
                onClick={async () => {
                  console.log("ayo");
                  updateEquip([], key);
                }}
              >
                <div className="my-2 text-xl font-semibold ">{eq[0]}</div>
                <div className="my-2 text-xl font-semibold ">{eq[1]}</div>
              </button>
            ))}
        </div>
        <div className=" border-solid border-4 border-yellow-400 w-[10%] h-[100%] flex flex-col place-content-center place-items-center p-2">
          <div className="border-solid border-4 text-xl font-bold border-white w-[100%] h-[20%] flex place-content-center place-items-center">
            Turn: {turn}/{timer}
          </div>
          <div className="border-solid border-4 text-xl font-bold border-white w-[100%] h-[20%] flex place-content-center place-items-center">
            {powerlvl}x
          </div>
          <button
            className="border-solid border-4 border-white w-[100%] h-[20%]"
            onClick={async () => {
              if (equiped[cardlvl - 1].length >= 1) {
                console.log("Ok good");
                setCombatstatus("paused");
                CombatLogic();
              } else {
                console.log("wtf are u doin?");
              }
            }}
          >
            End Turn
          </button>
        </div>
      </div>
      <div className="absolute border-solid flex place-items-end border-4 border-red-600 w-[100%] h-[30%] bottom-0 left-0">
        {teambuild &&
          teambuild.length > 0 &&
          teambuild[allyhud] &&
          Object.entries(teambuild[allyhud]).map(([key, tb]) => (
            <button
              key={key}
              className=" flex h-[85%] w-[11%] ml-1 flex-col border-4 border-solid border-blue-400 place-items-center text-white hover:border-yellow-300 active:border-gray-500"
              onClick={async () => {
                console.log("ayo");

                if (equiped[0].length === 0) {
                  if (tb[2] === "special" && equiped.includes(tb[1])) {
                    console.log("Cant duplucate shit");
                  } else {
                    updateEquip([tb[0], tb[1], tb[2], tb[3], tb[4]], 0);
                    console.log("Test1");
                  }
                } else if (cardlvl >= 2) {
                  if (equiped[1].length === 0) {
                    if (tb[2] === "special" && equiped.includes(tb[1])) {
                      console.log("Cant duplucate shit");
                    } else {
                      updateEquip([tb[0], tb[1], tb[2], tb[3], tb[4]], 1);
                      console.log("Test2");
                    }
                  }
                } else if (cardlvl >= 3) {
                  if (equiped[2].length === 0) {
                    if (tb[2] === "special" && equiped.includes(tb[1])) {
                      console.log("Cant duplucate shit");
                    } else {
                      console.log("Test3");
                      updateEquip([tb[0], tb[1], tb[2], tb[3], tb[4]], 2);
                    }
                  }
                } else if (cardlvl >= 4) {
                  if (equiped[3].length === 0) {
                    if (tb[2] === "special" && equiped.includes(tb[1])) {
                      console.log("Cant duplucate shit");
                    } else {
                      updateEquip([tb[0], tb[1], tb[2], tb[3], tb[4]], 3);
                    }
                  }
                } else if (cardlvl >= 5) {
                  if (equiped[4].length === 0) {
                    if (tb[2] === "special" && equiped.includes(tb[1])) {
                      console.log("Cant duplucate shit");
                    } else {
                      updateEquip([tb[0], tb[1], tb[2], tb[3], tb[4]], 4);
                    }
                  }
                }
              }}
            >
              <div className="my-2 text-xl font-semibold ">{tb[0]}</div>
              <div className="my-2 text-xl font-semibold ">{tb[1]}</div>
            </button>
          ))}
      </div>
    </div>
  );
};

export default Combat;
