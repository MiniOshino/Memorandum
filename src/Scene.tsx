"use client";
import React, { use, useEffect, useMemo, useState } from "react";
import { load } from "./actions/load";
import Image from 'next/image';
import TextBoxx from './components/TextBox.png';
import Darkness from './components/Darkness.png'
import { Bagel_Fat_One } from "next/font/google";

console.log("Local storrage test:");
console.log(localStorage.getItem('Savestate'));

if (localStorage.getItem('Savestate') === null){
  localStorage.setItem('Savestate', 'true');
  localStorage.setItem('StoryProgress', '0');
  localStorage.setItem('CurrentChapter', "Library0");
  localStorage.setItem('CurrentPart', "Begining");
  localStorage.setItem('EventFV', "NS"); //NS: NOT STARTED, //1,2,3,4: CONVERSATION/EVENTPROGRESS //FIN: FINISHED
  localStorage.setItem('Curious', "0");
  localStorage.setItem('Interested', "0");
  localStorage.setItem('Scaredy cat', "0");
  localStorage.setItem('Analytical', "0");
  localStorage.setItem('Friendly', "0");
  localStorage.setItem('Empathetic', "0");
  localStorage.setItem('Self Interest', "0");
  localStorage.setItem('Confused', "0");
  localStorage.setItem('Silly', "0");
  localStorage.setItem('Trusting', "0");
  localStorage.setItem('Questioning', "0");
  localStorage.setItem('SlimeInterest', "0");
  localStorage.setItem('Spydent', "0");


} 


//---------------------------------------------------------------------SPRITES--------------------------------------------------------------------------------------

const SpriteBox = ({ sprites }) => {
  //RTL RRTL RTLL LTLL RRRTR etc
  const [key, setKey] = useState(0);
  
  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [sprites]);
  return (
    <div className="" key={key}>
      {/* ---------------------------------------------------------------CENTER------------------------------------------------------------------ */}
       {sprites?.center &&  ( sprites?.movementC || sprites?.effectC ? <Image className={` ${sprites.movementC === "fadeout" ? "opacity-0" : "animate-[delay_3s]"} absolute z-10 w-[45%] h-[100%] top-[0%] left-[27%]`}
          src={require(`./components/${sprites.center}.png`)}
          alt={sprites.center}/> :
        <Image className=" absolute z-10 w-[45%] h-[100%] top-[0%] left-[27%]"
          src={require(`./components/${sprites.center}.png`)}
          alt={sprites.center}
        />
      )}
      {sprites?.movementC && (
        <Image className={`absolute z-10 w-[45%] h-[100%] top-[0%] left-[27%] ${sprites.movementC === "fade" ? "animate-[vibe_2s]" : sprites.movementC === "fadeout" ? " opacity-0 animate-[vibeout_2s]" : sprites.movementC === "RTC" ? "animate-[RTC_1s]" : sprites.movementC === "LTC" ? "animate-[LTC_1s]" : sprites.movementC === "RRTC" ? "animate-[RRTC_1s]" : sprites.movementC === "LLTC" ? "animate-[LLTC_1s]" : sprites.movementC === "RRRTC" ? "animate-[RRRTC_1s]" : "animate-[LLLTC_1s]"}`}
        src={require(`./components/${sprites.center}.png`)}
        alt={sprites.center}
      />
      )}
      {sprites?.effectC && (
        <Image className={`absolute z-10 w-[45%] h-[100%] top-[0%] left-[27%] ${sprites.effectC === "shake" ? "animate-[shake_0.5s]" : sprites.effectC === "jump" ? "animate-[jump_0.5s]" : sprites.effectC === "crash" ? "animate-[crash_0.5s]" : null }`}
        src={require(`./components/${sprites.center}.png`)}
        alt={sprites.center}
      />
      )}
      {/* ---------------------------------------------------------------Right------------------------------------------------------------------ */}
      {sprites?.right &&  ( sprites?.movementR || sprites?.effectR ? <Image className={` ${sprites.movementR=== "fadeout" ? "opacity-0" : "animate-[delay_3s]"} absolute z-0 w-[45%] h-[100%] top-[0%] left-[45%]`}
          src={require(`./components/${sprites.right}.png`)}
          alt={sprites.right}/> :
        <Image className=" absolute z-0 w-[45%] h-[100%] top-[0%] left-[45%]"
          src={require(`./components/${sprites.right}.png`)}
          alt={sprites.right}
        />
      )}
      {sprites?.movementR && (
        <Image className={`absolute z-0 w-[45%] h-[100%] top-[0%] left-[45%] ${sprites.movementR === "fade" ? "animate-[vibe_2s]" : sprites.movementR === "fadeout" ? " opacity-0 animate-[vibeout_2s]" : sprites.movementR === "CTR" ? "animate-[CTR_1s]" : sprites.movementR === "LTR" ? "animate-[LTR_1s]" : sprites.movementR === "LLTR" ? "animate-[LLTR_1s]" : sprites.movementR === "RRTR" ? "animate-[RRTR_1s]" : sprites.movementR === "LLLTR" ? "animate-[LLLTR_1s]" : "animate-[RRRTR_1s]"}`}
        src={require(`./components/${sprites.right}.png`)}
        alt={sprites.right}
      />
      )}
      {sprites?.effectR && (
        <Image className={`absolute z-0 w-[45%] h-[100%] top-[0%] left-[45%] ${sprites.effectR === "shake" ? "animate-[shake_0.5s]" : sprites.effectR === "jump" ? "animate-[jump_0.5s]" : sprites.effectR === "crash" ? "animate-[crash_0.5s]" : null }`}
        src={require(`./components/${sprites.center}.png`)}
        alt={sprites.center}
      />
      )}
      {/* ---------------------------------------------------------------Left------------------------------------------------------------------ */}
       {sprites?.left &&  ( sprites?.movementL || sprites?.effectL ? <Image className={` ${sprites.movementL === "fadeout" ? "opacity-0" : "animate-[delay_3s]"} absolute z-0 w-[45%] h-[100%] top-[0%] left-[10%]`}
          src={require(`./components/${sprites.left}.png`)}
          alt={sprites.left}/> :
        <Image className=" absolute z-0 w-[45%] h-[100%] top-[0%] left-[10%]"
          src={require(`./components/${sprites.left}.png`)}
          alt={sprites.left}  
        />
      )}
      {sprites?.movementL && (
        <Image className={`absolute z-0 w-[45%] h-[100%] top-[0%] left-[10%] ${sprites.movementL === "fade" ? "animate-[vibe_2s]" : sprites.movementL === "fadeout" ? " opacity-0 animate-[vibeout_2s]" : sprites.movementL === "CTL" ? "animate-[CTL_1s]" : sprites.movementL === "RTL" ? "animate-[RTL_1s]" : sprites.movementL === "RRTL" ? "animate-[RRTL_1s]" : sprites.movementL === "LLTL" ? "animate-[LLTL_1s]" : sprites.movementL === "RRRTL" ? "animate-[RRRTL_1s]" : "animate-[LLLTL_1s]"}`}
        src={require(`./components/${sprites.left}.png`)}
        alt={sprites.left}
      />
      )}
      {sprites?.effectL && (
        <Image className={`absolute z-0 w-[45%] h-[100%] top-[0%] left-[10%] ${sprites.effectL === "shake" ? "animate-[shake_0.5s]" : sprites.effectL === "jump" ? "animate-[jump_0.5s]" : sprites.effectL === "crash" ? "animate-[crash_0.5s]" : null }`}
        src={require(`./components/${sprites.left}.png`)}
        alt={sprites.left}
      />
      )}
      {/* ---------------------------------------------------------------RightRight------------------------------------------------------------------ */}
      {sprites?.rright &&  ( sprites?.movementRR || sprites?.effectRR ? <Image className={` ${sprites.movementRR === "fadeout" ? "opacity-0" : "animate-[delay_3s]"} absolute -z-10 w-[45%] h-[100%] top-[0%] left-[55%]`}
          src={require(`./components/${sprites.rright}.png`)}
          alt={sprites.rright}/> :
        <Image className=" absolute -z-10 w-[45%] h-[100%] top-[0%] left-[55%]"
          src={require(`./components/${sprites.rright}.png`)}
          alt={sprites.rright}
        />
      )}
      {sprites?.movementRR && (
        <Image className={`absolute -z-10 w-[45%] h-[100%] top-[0%] left-[55%] ${sprites.movementRR === "fade" ? "animate-[vibe_2s]" : sprites.movementRR === "fadeout" ? " opacity-0 animate-[vibeout_2s]" : sprites.movementRR === "RTRR" ? "animate-[RTRR_1s]" : sprites.movementRR === "CTRR" ? "animate-[CTRR_1s]" : sprites.movementRR === "LTRR" ? "animate-[LTRR_1s]" : sprites.movementRR === "LLTRR" ? "animate-[LLTRR_1s]" : sprites.movementRR === "LLLTRR" ? "animate-[LLLTRR_1s]" : "animate-[RRRTRR_1s]"}`}
        src={require(`./components/${sprites.rright}.png`)}
        alt={sprites.rright}
      />
      )}
      {sprites?.effectRR && (
        <Image className={`absolute -z-10 w-[45%] h-[100%] top-[0%] left-[55%] ${sprites.effectRR === "shake" ? "animate-[shake_0.5s]" : sprites.effectRR === "jump" ? "animate-[jump_0.5s]" : sprites.effectRR === "crash" ? "animate-[crash_0.5s]" : null }`}
        src={require(`./components/${sprites.rright}.png`)}
        alt={sprites.rright}
      />
      )}
      {/* ---------------------------------------------------------------LeftLeft------------------------------------------------------------------ */}
      {sprites?.lleft &&  ( sprites?.movementLL || sprites?.effectLL ? <Image className={` ${sprites.movementLL === "fadeout" ? "opacity-0" : "animate-[delay_3s]"} absolute -z-10 w-[45%] h-[100%] top-[0%] left-[0%]`}
          src={require(`./components/${sprites.lleft}.png`)}
          alt={sprites.lleft}/> :
        <Image className=" absolute -z-10 w-[45%] h-[100%] top-[0%] left-[0%]"
          src={require(`./components/${sprites.lleft}.png`)}
          alt={sprites.lleft}
        />
      )}
      {sprites?.movementLL && (
        <Image className={`absolute -z-10 w-[45%] h-[100%] top-[0%] left-[0%] ${sprites.movementLL === "fade" ? "animate-[vibe_2s]" : sprites.movementLL === "fadeout" ? " opacity-0 animate-[vibeout_2s]" : sprites.movementLL === "RTLL" ? "animate-[RTLL_1s]" : sprites.movementLL === "CTLL" ? "animate-[CTLL_1s]" : sprites.movementLL === "LTLL" ? "animate-[LTLL_1s]" : sprites.movementLL === "RRTLL" ? "animate-[RRTLL_1s]" : sprites.movementLL === "LLLTLL" ? "animate-[LLLTLL_1s]" : "animate-[RRRTLL_1s]"}`}
        src={require(`./components/${sprites.lleft}.png`)}
        alt={sprites.lleft}
      />
      )}
      {sprites?.effectLL && (
        <Image className={`absolute -z-10 w-[45%] h-[100%] top-[0%] left-[0%] ${sprites.effectLL === "shake" ? "animate-[shake_0.5s]" : sprites.effectLL === "jump" ? "animate-[jump_0.5s]" : sprites.effectLL === "crash" ? "animate-[crash_0.5s]" : null }`}
        src={require(`./components/${sprites.lleft}.png`)}
        alt={sprites.lleft}
      />
      )}
      {/* ---------------------------------------------------------------RightRightRight------------------------------------------------------------------ */}
      {sprites?.movementRRR && (
        <Image className={`absolute -z-20 w-[45%] h-[100%] top-[0%] left-[105%] ${sprites.movementRRR === "RTRRR" ? "animate-[RTRRR_1s]" : sprites.movementRRR === "CTRRR" ? "animate-[CTRRR_1s]" : sprites.movementRRR === "LTRRR" ? "animate-[LTRRR_1s]" : sprites.movementRRR === "LLTRRR" ? "animate-[LLTRRR_1s]" : sprites.movementRRR === "LLLTRRR" ? "animate-[LLLTRRR_1s]" : "animate-[RRTRRR_1s]"}`}
        src={require(`./components/${sprites.rrright}.png`)}
        alt={sprites.rrright}
      />
      )}
      {/* ---------------------------------------------------------------LeftLeftLeft------------------------------------------------------------------ */}
      {sprites?.movementLLL && (
        <Image className={`absolute -z-20 w-[45%] h-[100%] top-[0%] left-[-50%] ${sprites.movementLLL === "RTLLL" ? "animate-[RTLLL_1s]" : sprites.movementLLL === "CTLLL" ? "animate-[CTLLL_1s]" : sprites.movementLLL === "LTLLL" ? "animate-[LTLLL_1s]" : sprites.movementLLL === "RRTLLL" ? "animate-[RRTLLL_1s]" : sprites.movementLLL === "LLTLLL" ? "animate-[LLTLLL_1s]" : "animate-[RRRTLLL_1s]"}`}
        src={require(`./components/${sprites.llleft}.png`)}
        alt={sprites.llleft}
      />
      )}
       
    </div>
  );
};
//---------------------------------------------------------------------BACKGROUND--------------------------------------------------------------------------------------
const Background = ({ background }) => {
  const [key, setKey] = useState(0);
  
  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [background]);

  return (
    <div key={key}>
      { background.effect && (<div className={` z-30 absolute ${background.effectstyle === "lingering" ? "opacity-0 animate-[lingering_2s]" : background.effectstyle === "vibeout" ? "opacity-0 animate-[vibeout_2s]" : background.effectstyle === "vibe" ? "opacity-1 animate-[vibe_2s]" : null} w-[200%] h-[200%]`}>
        { background.effect === "bitch" ? null :
        <Image
        className=" z-40 w-[50%] h-[50%]"
        src={require(`./components/${background.effect}.gif`)}
        alt={background.effect}
      />}
      </div>
      )}

      <div className={` absolute -z-50 w-full h-full ${background.pbg ? "animate-[vibe_2s]" : null} ease-in`}>
        { background.bg === "bitch" ? null :
       <Image
        className=" z-0 w-full h-full"
        src={require(`./components/${background.bg}.png`)}
        alt={background.bg}
      />}
      </div>

      { background.pbg && (<div className=" absolute -z-40 w-full h-full opacity-0 animate-[vibeout_2s] ease-in">
        { background.pbg === "bitch" ? null :
       <Image
        className=" -z-40 w-full h-full"
        src={require(`./components/${background.pbg}.png`)}
        alt={background.pgb}
      />}
      </div>
      )}
    </div>
  );
};
//---------------------------------------------------------------------ITEMS--------------------------------------------------------------------------------------

const Item = ({ items }) => {
  return (
    <div>
      <div className={` top-[15%] left-[34%] absolute z-20 w-[30%] h-[50%] ${items.show === "true" ? "animate-[vibe_2s]" : items.show === "false" ? " opacity-0 animate-[vibeout_2s]" : null}`}>
        { items.item === "bitch" ? null :
       <Image
        className=" z-20 w-[100%] h-[100%]"
        src={require(`./components/${items.item}.png`)}
        alt={items.item}
      />}
      </div>
    </div>
  );
};
//---------------------------------------------------------------------TEXTBOX--------------------------------------------------------------------------------------

const TextBox = ({ name, text, speeed, show, tb }) => {
  const Texting = ({ text, speed }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          const char = text[currentIndex];
          if (char === '{' && text.slice(currentIndex, currentIndex + 6) === '{bold}') {
            setBold(true);
            setCurrentIndex(currentIndex + 5); // Skip the (bold) tag
          } else if (char === '{' && text.slice(currentIndex, currentIndex + 7) === '{/bold}') {
            setBold(false);
            setCurrentIndex(currentIndex + 6); // Skip the (/bold) tag
          } else if (char === '{' && text.slice(currentIndex, currentIndex + 8) === '{italic}') {
            setItalic(true);
            setCurrentIndex(currentIndex + 7); // Skip the (italic) tag
          } else if (char === '{' && text.slice(currentIndex, currentIndex + 9) === '{/italic}') {
            setItalic(false);
            setCurrentIndex(currentIndex + 8); // Skip the (/italic) tag
          } else {
            setDisplayText(prevText => {
              const nextText = (bold ? '<strong>' : '') + (italic ? '<em>' : '') + char + (italic ? '</em>' : '') + (bold ? '</strong>' : '');
              return prevText + nextText;
            });
            setCurrentIndex(prevIndex => prevIndex + 1);
          }
        } else {
          clearInterval(interval);
        }
      }, speed);
  
      return () => clearInterval(interval);
    }, [text, speed, currentIndex, bold, italic]);
  
    return <span dangerouslySetInnerHTML={{ __html: displayText.replace(/[{}]/g, '') }} />;
  };
  
  //console.log(show);
  return (
    <div className="z-20">
      {show === "true" &&

        <Image className="absolute z-20" alt="textbox" src={TextBoxx} />
      }
    <div className=" z-20 flex flex-col absolute place-content-center place-items-center top-[70%] h-[30%] w-[100%]">
      <div className="h-[45%] text-2xl font-semibold">
          {name}
        </div>
      <div className=" z-20 text-xl text-white h-[40%]">
      <Texting text={text} speed={speeed} />
      </div>
        
      </div>
  
    </div>
  );
};
//---------------------------------------------------------------------SOUND--------------------------------------------------------------------------------------

const Sfx = ({sfx}) => {
  return (
      <audio autoPlay>
         <source src={(`/${sfx}.mp3`)} type="audio/mpeg"></source>
      </audio>
  );
};
//---------------------------------------------------------------------LOGBOOK--------------------------------------------------------------------------------------

const Logbook = ({entry}) => {
  const [page, setPage] = useState(100);
  return (
    <div>
      <div className="absolute z-40 w-[100%] h-[100%] top-[0%] left-[0%]">
        {(page === 100 || page === 99) && (<div className="absolute flex place-items-start place-content-center flex-col w-[15%] h-[69%] top-[11%] left-[22%]">
          {(entry.entry >= 1 && page === 100) && (
            <button className="text-2xl font-bold text-black" onClick={async () => {setPage(99)}}>Log</button>
          )}
          {(entry.entry >= 1 && page === 99) && (
            <button className="text-xl font-bold text-black" onClick={async () => {setPage(1)}}>{entry.entry === 1 ? "Entry 1 (new)" : "Entry 1" }</button>
          )}
          
        </div>)}
      </div>
      {(page === 100 || page === 99 ) && (<button className="absolute z-40 top-[85%] left-[51%] w-[5%] h-[11%]" onClick={async () => {setPage(entry.newpage)}}></button>)}
      {(page !== 100) && (<button className="absolute z-40 top-[86%] left-[43%] w-[6%] h-[7%]" onClick={async () => {setPage(100)}}></button>)}
      {(page === 100 || page === 99) && (<Image
         className=" absolute z-30 top-[-1%] left-[8%] w-[85%] h-[100%]"
         src={require(`./components/LogbookFP.png`)}
         alt={"Logbook"}
         />
      )}
      {page === 1 && (<Image
          className=" absolute z-30 top-[-1%] left-[8%] w-[85%] h-[100%]"
          src={require(`./components/LogbookLog1.png`)}
          alt={"LogbookLog1"}
          />
      )}
    </div>
  );
};

//---------------------------------------------------------------------DISPLAY--------------------------------------------------------------------------------------

export const Scene = ({ initial_content }) => {
  const [scene, setContent] = useState(initial_content);
  const [frame, setFrame] = useState(0);
  // console.log(scene.frames[frame]?.te)
  const [hud, setHud] = useState(0);


  return (
    <div>
    <div className=" overflow-hidden overflow-x-hidden overflow-y-hidden overscroll-none absolute w-[100%] h-[100%]">
      <div className="">
      {scene.frames[frame]?.textBox && (
        <TextBox
          name={scene.frames[frame]?.textBox.name}
          text={scene.frames[frame]?.textBox.text}
          speeed={scene.frames[frame]?.textBox.speed}
          show={scene.frames[frame]?.textBox.show}
          tb={scene.frames[frame]?.textBox}
        ></TextBox>
      )}
      {scene.frames[frame]?.sprites && (
        <SpriteBox
          sprites={scene.frames[frame]?.sprites}
        ></SpriteBox>
      )}
      {scene.frames[frame]?.background && (
        <Background background={scene.frames[frame]?.background}
        ></Background>
      )}
      {scene.frames[frame]?.items && (
        <Item items={scene.frames[frame]?.items}
        ></Item>
      )}
      {scene.frames[frame]?.sfx && (
        <Sfx sfx={scene.frames[frame]?.sfx}></Sfx>
      )}
      {(scene.hud === "StoryHud0" || scene.hud === "StoryHud1") && (
        <div>
        <button className={`absolute z-50 ${scene.logbook.update ? "animate-[Rbanner_10s]" : "[&:not(:hover)]:animate-[Rbanner_2s]"} animate-[vibe_2s] top-[-5%] right-[0%] w-[10%] h-[20%] hover:animate-[banner_1s] hover:top-[0%]`} onClick={async () => {
          if (hud === 0){
            setHud(1);
          } else {
            setHud(0);
          }
        }}>
          <Image
          className=" absolute z-50  w-[100%] h-[100%] top-[-10%]"
          src={require(`./components/Logbookbanner.png`)}
          alt={"Logbookbanner"}
          />
        </button>
         </div>
      )}
      {hud === 1 && (
        <Logbook entry={scene.logbook}></Logbook>
      )}
      {scene.hud === "StoryHud5" && (
        <div>
        <button className={`absolute z-50 animate-[shatter_0.8s] top-[0%] left-[0%] w-[22%] h-[30%]`} onClick={async () => {
          setContent(await load("ReadingChambers", "ReadingChambers"));
          setFrame(0);
        }}>
          <Image
          className=" absolute z-50  w-[100%] h-[100%] top-[0%]"
          src={require(`./components/Shatter.png`)}
          alt={"Shatter"}
          />
        </button>
         </div>
      )}
      {scene.hud === "StoryHud4" && (
        <div>
        <button className={`absolute z-50 animate-[shatter_5s] top-[0%] left-[0%] w-[22%] h-[30%]`} onClick={async () => {
          setContent(await load("ReadingChambers", "ReadingChambers"));
          setFrame(0);
        }}>
          <Image
          className=" absolute z-50  w-[100%] h-[100%] top-[0%]"
          src={require(`./components/ShatterText.png`)}
          alt={"ShatterText"}
          />
        </button>
         </div>
      )}
      {scene.hud === "StoryHud3" && (
        <div>
        <button className={`absolute z-50 hover:animate-[shatter_5s] top-[0%] left-[0%] w-[22%] h-[30%]`} onClick={async () => {
          setContent(await load("ReadingChambers", "ReadingChambers"));
          setFrame(0);
        }}>
          <Image
          className=" absolute z-50  w-[100%] h-[100%] top-[0%]"
          src={require(`./components/Shatter.png`)}
          alt={"Shatter"}
          />
        </button>
         </div>
      )}
      {(scene.next.type === "choice" && frame >= scene.frames.length - 1 ) && (
        <div className="absolute w-[100%] h-[100%] z-40">
          <div className="w-[100%] place-content-center place-items-center h-[80%] flex flex-col border-4 border-solid border-red-700">
            {scene.next.one &&  (<button className="w-[80%] h-[10%] border-solid border-4 border-blue-600 text-white text-xl" onClick={async () => {
              var tempSP = parseInt(localStorage.getItem(scene.next.one.stats as string)|| '0');
              tempSP += 1;
              localStorage.setItem(scene.next.one.stats, tempSP.toString());
              setContent(await load(scene.jayson, scene.next.one.path));
              setFrame(0);
            }}>{scene.next.one.text}</button>)}

            {scene.next.two &&  (<button className="w-[80%] h-[10%] border-solid border-4 border-blue-600 text-white text-xl" onClick={async () => {
              var tempSP = parseInt(localStorage.getItem(scene.next.two.stats as string)|| '0');
              tempSP += 1;
              localStorage.setItem(scene.next.two.stats, tempSP.toString());
              setContent(await load(scene.jayson, scene.next.two.path));
              setFrame(0);
            }}>{scene.next.two.text}</button>)}

            {scene.next.three &&  (<button className="w-[80%] h-[10%] border-solid border-4 border-blue-600 text-white text-xl" onClick={async () => {
              var tempSP = parseInt(localStorage.getItem(scene.next.three.stats as string)|| '0');
              tempSP += 1;
              localStorage.setItem(scene.next.three.stats, tempSP.toString());
              setContent(await load(scene.jayson, scene.next.three.path));
              setFrame(0);
            }}>{scene.next.three.text}</button>)}

            {scene.next.four &&  (<button className="w-[80%] h-[10%] border-solid border-4 border-blue-600 text-white text-xl" onClick={async () => {
             var tempSP = parseInt(localStorage.getItem(scene.next.four.stats as string)|| '0');
             tempSP += 1;
             localStorage.setItem(scene.next.four.stats, tempSP.toString());
              setContent(await load(scene.jayson, scene.next.four.path));
              setFrame(0);
            }}>{scene.next.four.text}</button>)}

          </div>
          <div className="w-[100%] place-content-center place-items-center top-[80%] h-[20%] flex flex-col border-4 border-solid border-green-700">
            <div className="text-white text-2xl font-bold">{scene.next.question}</div>
          </div>
        </div>
      )}
    {/* ----------------------------------------------------------READING CHAMBERS---------------------------------------------------------------------------- */}
      {scene.name === "ReadingChambers" && (
        <button className="absolute w-[100%] h-[100%] z-40" onClick={async () =>{
          if (localStorage.getItem('EventFV') === 'NS' || localStorage.getItem('EventFV') === '1'){
            localStorage.setItem('EventFV', '1');
            setContent(await load('ReadingChambers', 'FirstArrival'));
            setFrame(0);
            //localStorage.setItem('EventFV', 'OG');
          }
        }}>

        </button>
      )}

      </div>
      </div>
      <div>
      <button className="absolute w-[100%] h-[100%] z-30"
        onClick={async () => {
          if (frame >= scene.frames.length - 1) {
            // -------------------------------------------------------------- WHERE ARE YOU IN THE STORY????--------------------------------------
            
            //Chapter 0: 1
            //Chapter 1: 2
            //Dream 1: 5
            //Chapter 2: 6
            //Chapter 2.1 Interlude: 7
            //Chapter 2.1 Continuation: 7

            //var tempSP = +localStorage.getItem?('StoryProgress'): '';
            var tempSP = parseInt(localStorage.getItem('StoryProgress')|| '0');
            console.log(tempSP);
            if (scene.storyProgressID > tempSP){
              localStorage.setItem('CurrentChapter', scene.next.target);
              localStorage.setItem('CurrentPart', scene.next.sceneID);
            }
            // -------------------------------------------------------------- WHERE ARE YOU IN THE STORY????--------------------------------------



            console.log("get next scene");
            if (scene.next.type === "fixed") {
              setContent(await load(scene.next.target, scene.next.sceneID));
              //setContent(await load(scene.scene_id + 1));
              setFrame(0);
            } else if (scene.next.type === "random") {
              const min = 1;
              const max = scene.RNG.amount;
              const rand = Math.round(min + Math.random() * (max - min));
              var bar = '' + rand;
              console.log(bar);
              setContent(await load(scene.next.target, bar));
              //setContent(await load(scene.scene_id + 1));
              setFrame(0);
            } else if (scene.next.type === "start"){

              //const trgt = localStorage.getItem('CurrentChapter');
              //onst scn = localStorage.getItem('CurrentPart');
              //const trgt = JSON.parse(localStorage.getItem('CurrentChapter')!);
              //const scn = JSON.parse(localStorage.getItem('CurrentPart')!);

              if (localStorage.getItem('EventFV') === '1' || localStorage.getItem('EventFV') === '2' || localStorage.getItem('EventFV') === '3'){
                setContent(await load('ReadingChambers', 'ReadingChambers'));
                setFrame(0);
              } else {
                const CC = localStorage.getItem('CurrentChapter');
                const CP = localStorage.getItem('CurrentPart');
                let trgt: string;
                let scn: string;
                
                if (CC !== null) {
                trgt = CC;
              } else {
                // Handle the case where the value is null, maybe assign a default value
                trgt = ""; // Or whatever default value you want
              }
              if (CP !== null) {
                scn = CP;
              } else {
                // Handle the case where the value is null, maybe assign a default value
                scn = ""; // Or whatever default value you want
              }
              console.log(trgt);
              console.log(scn);
              setContent(await load(trgt, scn));
              //setContent(await load(scene.scene_id + 1));
              setFrame(0);
            }
            }
          } else {
            setFrame(frame + 1);
            console.log("Next frame please");
          }
        }}
        >
      </button>
        </div>
    </div>
  );
};

export default Scene;
