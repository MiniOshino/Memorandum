"use client";
import React, { use, useEffect, useMemo, useState, useRef } from "react";
import { load } from "./actions/load";
import Image from 'next/image';
import TextBoxx from './components/TextBox.png';
import Darkness from './components/Darkness.png'
import { Bagel_Fat_One } from "next/font/google";
import Combat from "./Combat.js";


if (localStorage.getItem('Savestate') === null){
  //------------------------------------------General Things--------------------------------------------
  localStorage.setItem('Savestate', 'true');
  localStorage.setItem('Username', '');
  localStorage.setItem('Password', '');
  localStorage.setItem('StoryProgress', '0');
  localStorage.setItem('CurrentChapter', "Library0");
  localStorage.setItem('CurrentPart', "Begining");
  localStorage.setItem('Warptablet', "false");
  //------------------------------------------Events--------------------------------------------
//NS: NOT STARTED, //1,2,3,4: CONVERSATION/EVENTPROGRESS //FIN: FINISHED
  localStorage.setItem('EventFV', "NS"); // First Visit Event:  / 1: Starting / 2: Finished talk with Lyz / 3: Finished talk with Architect  / 4: First Warp to Nexus Core /5: Finsihed fist convo with Nexus /6: Inquired about Story
  localStorage.setItem('EventPR', "NS"); // Password Restriction Event / 1: Starting / 2:
  localStorage.setItem('EventSC', "NS"); // Slime Connection Event
  //------------------------------------------STATS--------------------------------------------
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
  localStorage.setItem('SlimeInterest', "0"); //+1: Is Inquiry by asking it at the start //+1 First trying PR event //+1 Finding it in table
  localStorage.setItem('Spydent', "false"); //LSC: If all spydents are on 1, aka found, set this true -> sets up the event
  //------------------------------------------Choice Answers--------------------------------------------
  localStorage.setItem('true', "true");
  localStorage.setItem('Error', "false"); //You cannot go back to the Story if this is true
  //------------------------------------------CAGLIOSTRO QUESTIONS--------------------------------------
  //false: Not unlocked true: Unlocked read: read
  localStorage.setItem('NQuestionWITP', "true");
  localStorage.setItem('NQuestionHDIL', "true");
  localStorage.setItem('NQuestionArchitect', "true");
  localStorage.setItem('NQuestionNexus', "true");
  localStorage.setItem('NQuestionCagliostro', "false");
  localStorage.setItem('NQuestionSlime', "false");
  localStorage.setItem('NQuestionMist', "false");
  localStorage.setItem('NQuestionInBetween', "false");
  //Story question in spirit
  //Finaish Convo in spirit
  //------------------------------------------Architect QUESTIONS--------------------------------------
  localStorage.setItem('AQuestionUnlockID', "false");
  //-------------------------------------------Chronological infromation---------------------------------
  localStorage.setItem('InformationWLNB', "0"); //1: Checked the book on the table /2: Reached the end of a released chapter
  localStorage.setItem('InformationCagliostro', '0'); // 1: Asked about Cagliostro to Nexus
  localStorage.setItem('InformationInBetween', '0'); //1: Interacted with the Mist / 2: Asked about The Inbetwen to Nexus
  //-------------------------------------------RoomUnlocks---------------------------------
  localStorage.setItem('Hall7L', "false"); // 1: Lyzzy will tell you the room in PR event //: true -> you got the unlock //: unlock -> You have it in your device
  //-------------------------------------------CharacterUnlocks---------------------------------
  localStorage.setItem('SlimeName', "false"); //Imma be honesty this is hardly useful as of right now but ig i keep it.
  localStorage.setItem('InbetweenVibe', ''); // Either Analytical, Scaredy Cat, Friendly
  localStorage.setItem('GreenTourGuide', 'false');
  localStorage.setItem('Yellow', "0"); // 1: Finding yellow //2:
  localStorage.setItem('Cyan', "0"); // 1: Finding Cyan //2:
  localStorage.setItem('Magenta', "0"); // 1: Finding Magenta //2:
  //---------------------------------------------LibraryInteractables------------------------------------------
  localStorage.setItem('RCPot', "false");
  localStorage.setItem('RCSoul', "false");
  localStorage.setItem('RCCell', "false");
  localStorage.setItem('NCTables', "false");
  localStorage.setItem('NCRoof', "false");
  localStorage.setItem('NCInfoWall', "false");
  localStorage.setItem('H7Table', "false");

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
       {sprites?.center &&  ( sprites?.movementC || sprites?.effectC ? <Image className={` ${sprites.movementC === "fadeout" || sprites.movementC === "blink" ? "opacity-0" : "animate-[delay_3s]"} absolute z-10 w-[45%] h-[100%] top-[0%] left-[27%]`}
          src={require(`./components/${sprites.center}.png`)}
          alt={sprites.center}/> :
        <Image className=" absolute z-10 w-[45%] h-[100%] top-[0%] left-[27%]"
          src={require(`./components/${sprites.center}.png`)}
          alt={sprites.center}
        />
      )}
      {sprites?.movementC && (
        <Image className={`absolute z-10 w-[45%] h-[100%] top-[0%] left-[27%] ${sprites.movementC === "fade" ? "animate-[vibe_2s]" : sprites.movementC === "fadeout" ? " opacity-0 animate-[vibeout_2s]" : sprites.movementC === "blink" ? " opacity-0 animate-[blink_0.1s]" : sprites.movementC === "RTC" ? "animate-[RTC_1s]" : sprites.movementC === "LTC" ? "animate-[LTC_1s]" : sprites.movementC === "SLTC" ? "animate-[SLTC_1s]" : sprites.movementC === "SRTC" ? "animate-[SRTC_1s]" : sprites.movementC === "RRTC" ? "animate-[RRTC_1s]" : sprites.movementC === "LLTC" ? "animate-[LLTC_1s]" : sprites.movementC === "RRRTC" ? "animate-[RRRTC_1s]" : "animate-[LLLTC_1s]"}`}
        src={require(`./components/${sprites.center}.png`)}
        alt={sprites.center}
      />
      )}
      {sprites?.effectC && (
        <Image className={`absolute z-10 w-[45%] h-[100%] top-[0%] left-[27%] ${sprites.effectC === "shake" ? "animate-[shake_0.5s]" : sprites.effectC === "wiggle" ? "animate-[wiggle_1s]" : sprites.effectC === "jump" ? "animate-[jump_0.5s]" : sprites.effectC === "crash" ? "animate-[crash_0.5s]" : null }`}
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
        <Image className={`absolute z-0 w-[45%] h-[100%] top-[0%] left-[45%] ${sprites.movementR === "fade" ? "animate-[vibe_2s]" : sprites.movementR === "fadeout" ? " opacity-0 animate-[vibeout_2s]" : sprites.movementR === "CTR" ? "animate-[CTR_1s]" : sprites.movementR === "LTR" ? "animate-[LTR_1s]" : sprites.movementR === "LLTR" ? "animate-[LLTR_1s]" : sprites.movementR === "SLTR" ? "animate-[SLTR_1s]" : sprites.movementR === "SRTR" ? "animate-[SRTR_1s]" : sprites.movementR === "RRTR" ? "animate-[RRTR_1s]" : sprites.movementR === "LLLTR" ? "animate-[LLLTR_1s]" : "animate-[RRRTR_1s]"}`}
        src={require(`./components/${sprites.right}.png`)}
        alt={sprites.right}
      />
      )}
      {sprites?.effectR && (
        <Image className={`absolute z-0 w-[45%] h-[100%] top-[0%] left-[45%] ${sprites.effectR === "shake" ? "animate-[shake_0.5s]" : sprites.effectR === "wiggle" ? "animate-[wiggle_1s]" : sprites.effectR === "jump" ? "animate-[jump_0.5s]" : sprites.effectR === "crash" ? "animate-[crash_0.5s]" : null }`}
        src={require(`./components/${sprites.right}.png`)}
        alt={sprites.right}
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
        <Image className={`absolute z-0 w-[45%] h-[100%] top-[0%] left-[10%] ${sprites.movementL === "fade" ? "animate-[vibe_2s]" : sprites.movementL === "fadeout" ? " opacity-0 animate-[vibeout_2s]" : sprites.movementL === "CTL" ? "animate-[CTL_1s]" : sprites.movementL === "RTL" ? "animate-[RTL_1s]" : sprites.movementL === "RRTL" ? "animate-[RRTL_1s]" : sprites.movementL === "SLTL" ? "animate-[SLTL_1s]" : sprites.movementL === "SRTL" ? "animate-[SRTL_1s]" : sprites.movementL === "LLTL" ? "animate-[LLTL_1s]" : sprites.movementL === "RRRTL" ? "animate-[RRRTL_1s]" : "animate-[LLLTL_1s]"}`}
        src={require(`./components/${sprites.left}.png`)}
        alt={sprites.left}
      />
      )}
      {sprites?.effectL && (
        <Image className={`absolute z-0 w-[45%] h-[100%] top-[0%] left-[10%] ${sprites.effectL === "shake" ? "animate-[shake_0.5s]" : sprites.effectL === "wiggle" ? "animate-[wiggle_1s]" : sprites.effectL === "jump" ? "animate-[jump_0.5s]" : sprites.effectL === "crash" ? "animate-[crash_0.5s]" : null }`}
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
        <Image className={`absolute -z-10 w-[45%] h-[100%] top-[0%] left-[55%] ${sprites.movementRR === "fade" ? "animate-[vibe_2s]" : sprites.movementRR === "fadeout" ? " opacity-0 animate-[vibeout_2s]" : sprites.movementRR === "DTRR" ? "animate-[DTRR_2s]" : sprites.movementRR === "SLTRR" ? "animate-[SLTRR_1s]" : sprites.movementRR === "SRTRR" ? "animate-[SRTRR_1s]" : sprites.movementRR === "RTRR" ? "animate-[RTRR_1s]" : sprites.movementRR === "CTRR" ? "animate-[CTRR_1s]" : sprites.movementRR === "LTRR" ? "animate-[LTRR_1s]" : sprites.movementRR === "LLTRR" ? "animate-[LLTRR_1s]" : sprites.movementRR === "LLLTRR" ? "animate-[LLLTRR_1s]" : "animate-[RRRTRR_1s]"}`}
        src={require(`./components/${sprites.rright}.png`)}
        alt={sprites.rright}
      />  
      )}
      {sprites?.effectRR && (
        <Image className={`absolute -z-10 w-[45%] h-[100%] top-[0%] left-[55%] ${sprites.effectRR === "shake" ? "animate-[shake_0.5s]" : sprites.effectRR === "wiggle" ? "animate-[wiggle_1s]" : sprites.effectRR === "jump" ? "animate-[jump_0.5s]" : sprites.effectRR === "crash" ? "animate-[crash_0.5s]" : null }`}
        src={require(`./components/${sprites.rright}.png`)}
        alt={sprites.rright}
      />
      )}
      {/* ---------------------------------------------------------------SPECIALRIGHT------------------------------------------------------------------ */}
      {sprites?.sright &&  ( sprites?.movementSR || sprites?.effectSR ? <Image className={` ${sprites.movementSR === "fadeout" ? "opacity-0" : "animate-[delay_3s]"} absolute z-10 w-[45%] h-[100%] top-[0%] left-[65%]`}
          src={require(`./components/${sprites.sright}.png`)}
          alt={sprites.sright}/> :
        <Image className=" absolute z-10 w-[45%] h-[100%] top-[0%] left-[65%]"
          src={require(`./components/${sprites.sright}.png`)}
          alt={sprites.sright}
        />  
      )}
      {sprites?.movementSR && (
        <Image className={`absolute z-10 w-[45%] h-[100%] top-[0%] left-[65%] ${sprites.movementSR === "fade" ? "animate-[vibe_2s]" : sprites.movementSR === "fadeout" ? " opacity-0 animate-[vibeout_2s]" : sprites.movementSR === "SLTSR" ? "animate-[SLTSR_1s]" : sprites.movementSR === "RTSR" ? "animate-[RTSR_1s]" : sprites.movementSR === "CTSR" ? "animate-[CTSR_1s]" : sprites.movementSR === "LTSR" ? "animate-[LTSR_1s]" : sprites.movementSR === "LLTSR" ? "animate-[LLTSR_1s]" : sprites.movementSR === "RRTSR" ? "animate-[RRTSR_1s]" : sprites.movementSR === "LLLTSR" ? "animate-[LLLTSR_1s]" : "animate-[RRRTSR_1s]"}`}
        src={require(`./components/${sprites.sright}.png`)}
        alt={sprites.sright}
      />  
      )}
      {sprites?.effectSR && (
        <Image className={`absolute z-10 w-[45%] h-[100%] top-[0%] left-[65%] ${sprites.effectSR === "shake" ? "animate-[shake_0.5s]" : sprites.effectSR === "wiggle" ? "animate-[wiggle_1s]" : sprites.effectSR === "jump" ? "animate-[jump_0.5s]" : sprites.effectSR === "crash" ? "animate-[crash_0.5s]" : null }`}
        src={require(`./components/${sprites.sright}.png`)}
        alt={sprites.sright}
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
        <Image className={`absolute -z-10 w-[45%] h-[100%] top-[0%] left-[0%] ${sprites.movementLL === "fade" ? "animate-[vibe_2s]" : sprites.movementLL === "fadeout" ? " opacity-0 animate-[vibeout_2s]" : sprites.movementLL === "RTLL" ? "animate-[RTLL_1s]" : sprites.movementLL === "SLTLL" ? "animate-[SLTLL_1s]" : sprites.movementLL === "SRTLL" ? "animate-[SRTLL_1s]" : sprites.movementLL === "CTLL" ? "animate-[CTLL_1s]" : sprites.movementLL === "LTLL" ? "animate-[LTLL_1s]" : sprites.movementLL === "RRTLL" ? "animate-[RRTLL_1s]" : sprites.movementLL === "LLLTLL" ? "animate-[LLLTLL_1s]" : "animate-[RRRTLL_1s]"}`}
        src={require(`./components/${sprites.lleft}.png`)}
        alt={sprites.lleft}
      />
      )}
      {sprites?.effectLL && (
        <Image className={`absolute -z-10 w-[45%] h-[100%] top-[0%] left-[0%] ${sprites.effectLL === "shake" ? "animate-[shake_0.5s]" : sprites.effectLL === "wiggle" ? "animate-[wiggle_1s]" : sprites.effectLL === "jump" ? "animate-[jump_0.5s]" : sprites.effectLL === "crash" ? "animate-[crash_0.5s]" : null }`}
        src={require(`./components/${sprites.lleft}.png`)}
        alt={sprites.lleft}
      />
      )}
      {/* ---------------------------------------------------------------SPECIAL LEFT------------------------------------------------------------------ */}
      {sprites?.sleft &&  ( sprites?.movementSL || sprites?.effectSL ? <Image className={` ${sprites.movementSL === "fadeout" ? "opacity-0" : "animate-[delay_3s]"} absolute z-0 w-[45%] h-[100%] top-[0%] left-[-10%]`}
          src={require(`./components/${sprites.sleft}.png`)}
          alt={sprites.sleft}/> :
        <Image className=" absolute z-0 w-[45%] h-[100%] top-[0%] left-[-10%]"
          src={require(`./components/${sprites.sleft}.png`)}
          alt={sprites.sleft}
        />
      )}
      {sprites?.movementSL && (
        <Image className={`absolute z-0 w-[45%] h-[100%] top-[0%] left-[-10%] ${sprites.movementSL === "fade" ? "animate-[vibe_2s]" : sprites.movementSL === "fadeout" ? " opacity-0 animate-[vibeout_2s]" : sprites.movementSL === "LLTSL" ? "animate-[LLTSL_1s]" : sprites.movementSL === "LTSL" ? "animate-[LTSL_1s]" : sprites.movementSL === "CTSL" ? "animate-[CTSL_1s]" : sprites.movementSL === "RTSL" ? "animate-[RTSL_1s]" : sprites.movementSL === "RRTSL" ? "animate-[RRTSL_1s]" : sprites.movementSL === "SRTSL" ? "animate-[SRTSL_1s]" : sprites.movementSL === "RRRTSL" ? "animate-[RRRTSL_1s]" : "animate-[LLLTSL_1s]"}`}
        src={require(`./components/${sprites.sleft}.png`)}
        alt={sprites.sleft}
      />
      )}
      {sprites?.effectSL && (
        <Image className={`absolute z-0 w-[45%] h-[100%] top-[0%] left-[-10%] ${sprites.effectSL === "shake" ? "animate-[shake_0.5s]" : sprites.effectSL === "wiggle" ? "animate-[wiggle_1s]" : sprites.effectSL === "jump" ? "animate-[jump_0.5s]" : sprites.effectSL === "crash" ? "animate-[crash_0.5s]" : null }`}
        src={require(`./components/${sprites.sleft}.png`)}
        alt={sprites.sleft}
      />
      )}
      {/* ---------------------------------------------------------------RightRightRight------------------------------------------------------------------ */}
      {sprites?.movementRRR && (
        <Image className={`absolute -z-20 w-[45%] h-[100%] top-[0%] left-[105%] ${sprites.movementRRR === "RTRRR" ? "animate-[RTRRR_1s]" : sprites.movementRRR === "CTRRR" ? "animate-[CTRRR_1s]" : sprites.movementRRR === "LTRRR" ? "animate-[LTRRR_1s]" : sprites.movementRRR === "SLTRRR" ? "animate-[SLTRRR_1s]" : sprites.movementRRR === "SRTRRR" ? "animate-[SRTRRR_1s]" : sprites.movementRRR === "LLTRRR" ? "animate-[LLTRRR_1s]" : sprites.movementRRR === "LLLTRRR" ? "animate-[LLLTRRR_1s]" : "animate-[RRTRRR_1s]"}`}
        src={require(`./components/${sprites.rrright}.png`)}
        alt={sprites.rrright}
      />
      )}
      {/* ---------------------------------------------------------------LeftLeftLeft------------------------------------------------------------------ */}
      {sprites?.movementLLL && (
        <Image className={`absolute -z-20 w-[45%] h-[100%] top-[0%] left-[-50%] ${sprites.movementLLL === "RTLLL" ? "animate-[RTLLL_1s]" : sprites.movementLLL === "CTLLL" ? "animate-[CTLLL_1s]" : sprites.movementLLL === "LTLLL" ? "animate-[LTLLL_1s]" : sprites.movementLLL === "SLTLLL" ? "animate-[SLTLLL_1s]" : sprites.movementLLL === "SRTLLL" ? "animate-[SRTLLL_1s]" : sprites.movementLLL === "RRTLLL" ? "animate-[RRTLLL_1s]" : sprites.movementLLL === "LLTLLL" ? "animate-[LLTLLL_1s]" : "animate-[RRRTLLL_1s]"}`}
        src={require(`./components/${sprites.llleft}.png`)}
        alt={sprites.llleft}
      />
      )}
       {/* ---------------------------------------------------------------Down?------------------------------------------------------------------ */}
      {sprites?.movementD && (
        <Image className={`absolute -z-20 w-[45%] h-[100%] top-[100%] left-[27%] ${sprites.movementD === "CTD" ? "animate-[CTD_4s]" : null}`}
        src={require(`./components/${sprites.down}.png`)}
        alt={sprites.down}
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
      { background.effect && (<div className={` z-30 absolute ${background.effectstyle === "lingering" ? "opacity-0 animate-[lingering_2s]" : background.effectstyle === "vibeout" ? "opacity-0 animate-[vibeout_2s]" : background.effectstyle === "svibeout" ? "opacity-0 animate-[svo_1s]" : background.effectstyle === "vibe" ? "opacity-1 animate-[vibe_2s]" : null} w-[200%] h-[200%]`}>
        { background.effect === "bitch" ? null :
        <Image
        className=" z-40 w-[50%] h-[50%]"
        src={require(`./components/${background.effect}.gif`)}
        alt={background.effect}
      />}
      </div>
      )}
        { background.grain && (<div className={` z-30 absolute w-[200%] h-[200%]`}>
        { background.grain === "bitch" ? null :
        <Image
        className=" z-30 w-[50%] h-[50%]"
        src={require(`./components/G${background.grain}.png`)}
        alt={background.grain}
      />}
      </div>
      )}
      <div className={` absolute -z-50 w-full h-full ease-in`}>
        { background.bg === "bitch" ? null :
       <Image
        className=" z-0 w-full h-full"
        src={require(`./components/BG${background.bg}.png`)}
        alt={'background.bg'}
      />}
      </div>

      { background.pbg && (<div className=" absolute -z-40 w-full h-full opacity-0 animate-[vibeout_2s] ease-in">
        { background.pbg === "bitch" ? null :
       <Image
        className=" -z-40 w-full h-full"
        src={require(`./components/BG${background.pbg}.png`)}
        alt={'background.pgb'}
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
        src={require(`./components/Item${items.item}.png`)}
        alt={items.item}
      />}
      </div>
    </div>
  );
};
//---------------------------------------------------------------------TEXTBOX--------------------------------------------------------------------------------------

const TextBox = ({ name, text, speeed, show, tb}) => {
//   const [rename, setRename] = useState(name);
const [voice, setVoice] = useState([
  ["Innkeeper","Slime"],
  ["Zayn", "(Zayn)","..R?","Rlz?","Z...","Zayn...","{you}"],
  ["Nora","{Nora}","Nora?","Z5R15-3","Z5R15-3?","Architect","(Architect)","Lyz"],
  ["Scarlett","Nexus","(Nexus)", "{Nexus}","Lyzzy","Table?"],
  ["Roy","Luna","(Luna)","{Luna}","”Ally”","”Ally”?"],
  ["Green", "(Green)","Yellow","(Yellow)"]]);
//   const [speach, setSpeach] = useState('TextingNeutral');
// console.log(speach);
//   const VoiceCheck = () => {
//     Object.entries(voice).map(([key, eq]) => {
//       if (eq.includes(rename)){
//         setSpeach(speach + key);
//       }
//     });
//   };
//   if (speach === "TextingNeutral"){
//     VoiceCheck();
//   }
// console.log(speach);
  
  const Texting = ({ text, speed, ps }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [name, setName] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const playAudio = () => {
      //console.log('Im played');
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    };
  
    const stopAudio = () => {
      if (audioRef.current && text !== '') {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };

    // playAudio();
    // setTimeout(() => {
    //   stopAudio();
    // }, text.length * speed);

    useEffect(() => {
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          const char = text[currentIndex];
          
          if (((text === "...") || text === '(...)' || text === '...!' || text === '...?' || text.includes('*'))) {
            if (currentIndex === 0) {
              console.log('Do it once');
              playAudio();
            setTimeout(() => {
              playAudio();
            }, 500);
            setTimeout(() => {
              playAudio();
            }, 1000);
            }
          } else {
          if ((text.slice(currentIndex, currentIndex + 1) === ' ' || currentIndex === 0) && (((text.slice(currentIndex + 2, currentIndex + 3) === ' '||text.slice(currentIndex).length <= 2) && text.slice(currentIndex + 1, currentIndex + 2) !== ' ') || ((text.slice(currentIndex + 3, currentIndex + 4) === ' '||text.slice(currentIndex).length <= 3) && text.slice(currentIndex + 1, currentIndex + 2) !== ' '))){
            playAudio();
            //console.log('1');
            //console.log(text.slice(currentIndex));
          } else 
          if ((text.slice(currentIndex, currentIndex + 1) === ' ' || currentIndex === 0) && ((((text.slice(currentIndex + 4, currentIndex + 5) === ' '||text.slice(currentIndex).length <= 4)&& text.slice(currentIndex + 1, currentIndex + 2) !== ' ') || ((text.slice(currentIndex + 5, currentIndex + 6) === ' '||text.slice(currentIndex).length <= 5)&& text.slice(currentIndex + 1, currentIndex + 2) !== ' ')) || text.slice(currentIndex + 1, currentIndex + 2) === '{')){
            playAudio();
            setTimeout(() => {
              playAudio();
            }, 100);
            //console.log('2');
            //console.log(text.slice(currentIndex));

          } else 
          if ((text.slice(currentIndex, currentIndex + 1) === ' ' || currentIndex === 0) && (((text.slice(currentIndex + 6, currentIndex + 7) === ' '||text.slice(currentIndex).length <= 6)&& text.slice(currentIndex + 1, currentIndex + 2) !== ' ') || ((text.slice(currentIndex + 7, currentIndex + 8) === ' '||text.slice(currentIndex).length <= 7)&& text.slice(currentIndex + 1, currentIndex + 2) !== ' '))){
            playAudio();
            setTimeout(() => {
              playAudio();
            }, 100);
            setTimeout(() => {
              playAudio();
            }, 200);
            //console.log('3');
            //console.log(text.slice(currentIndex));

          } else 
          if ((text.slice(currentIndex, currentIndex + 1) === ' ' || currentIndex === 0) && (((text.slice(currentIndex + 8, currentIndex + 9) === ' '||text.slice(currentIndex).length <= 8)&& text.slice(currentIndex + 1, currentIndex + 2) !== ' ') || ((text.slice(currentIndex + 9, currentIndex + 10) === ' '||text.slice(currentIndex).length <= 9)&& text.slice(currentIndex + 1, currentIndex + 2) !== ' '))){
            playAudio();
            setTimeout(() => {
              playAudio();
            }, 100);
            setTimeout(() => {
              playAudio();
            }, 200);
            setTimeout(() => {
              playAudio();
            }, 300);
            //console.log('3');
            //console.log(text.slice(currentIndex));

          } else 
          if ((text.slice(currentIndex, currentIndex + 1) === ' ' || currentIndex === 0) && text.slice(currentIndex + 1, currentIndex + 2) !== ' ') {  
            playAudio();
            setTimeout(() => {
              playAudio();
            }, 100);
            setTimeout(() => {
              playAudio();
            }, 200);
            setTimeout(() => {
              playAudio();
            }, 300);
            setTimeout(() => {
              playAudio();
            }, 400);
            //console.log('4');
            //console.log(text.slice(currentIndex));

          }
        }
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
          } else if (char === '{' && text.slice(currentIndex, currentIndex + 6) === '{name}') {
            setName(true);
            setCurrentIndex(currentIndex + 5); 
          } else if (char === '{' && text.slice(currentIndex, currentIndex + 7) === '{/name}') {
            setName(false);
            setCurrentIndex(currentIndex + 6);
          } else {
            setDisplayText(prevText => {
              const nextText = (name ? localStorage.getItem('Username') : '') + (bold ? '<strong>' : '') + (italic ? '<em>' : '') + char + (italic ? '</em>' : '') + (bold ? '</strong>' : '');
              return prevText + nextText;
            });
            setCurrentIndex(prevIndex => prevIndex + 1);
          }
        } else {
          clearInterval(interval);
        }
      }, speed);
  
      return () => clearInterval(interval);
    }, [text, speed, ps, currentIndex, bold, italic, name]);
  
    return (
      <div>
        <span dangerouslySetInnerHTML={{ __html: displayText.replace(/[{}]/g, '') }} />
        {text !== '' && ps !== '' && (<audio ref={audioRef}>
             <source src={(`/${voice[0].includes(tb.name) ? "TextingNeutral0" : voice[1].includes(tb.name) ? "TextingNeutral1" : voice[2].includes(tb.name) ? "TextingNeutral2" : voice[3].includes(tb.name) ? "TextingNeutral3" : voice[4].includes(tb.name) ? "TextingNeutral4" : voice[5].includes(tb.name) ? "TextingNeutral5" : null }.mp3`)} type="audio/mpeg"></source>
          </audio>)}
      </div>
        
    )
  };
  
  //console.log(show);
  return (
    <div className={`z-20`}>
      {show === "true" &&

        <Image className={`absolute bottom-0 h-[28%] w-[100%] z-20 ${tb.effect === 'shake' ? "animate-[wiggle_1s]" : null}`} alt="textbox" src={TextBoxx} />
      }
    <div className=" z-20 flex flex-col absolute place-content-center place-items-center top-[70%] h-[30%] w-[100%]">
      <div className="h-[45%] text-2xl font-semibold">
          {name.includes("(") ? "???" : name.includes("{") ? "" : (name === "Lyz" && localStorage.getItem("SlimeName") === 'false') || (name === "Lyzzy" && localStorage.getItem("SlimeName") === 'false')? "???" : name}
        </div>
      <div className=" z-20 text-xl text-white h-[40%]">
      <Texting text={text} speed={speeed} ps={name}/>
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
  const [pagetype, setPagetype] = useState(0);
  return (
    <div className="">
      <div className="absolute z-40 w-[100%] h-[100%] top-[0%] left-[0%]">
        {(page === 100 || page === 99 || page === 98 || page === 97) && (<div className="absolute flex place-items-start place-content-center flex-col w-[15%] h-[69%] top-[11%] left-[22%]">
          {(entry.entry >= 1 && page === 100) && (
            <button className=" z-50 text-2xl font-bold text-black" onClick={async () => {setPage(99)}}>Log</button>
          )}
          {(entry.entry >= 3 && page === 100) && (
            <button className=" z-50 text-2xl font-bold text-black" onClick={async () => {setPage(98)}}>Information</button>
          )}
          {(entry.entry >= 5 && page === 100) && (
            <button className=" z-50 text-2xl font-bold text-black" onClick={async () => {setPage(97)}}>People</button>
          )}
         {/* ----------------------------------------------------------DIARY---------------------------------------------------------------------------- */}
          
          {(entry.entry >= 1 && page === 99) && (
            <button className=" z-50 text-xl font-bold text-black" onClick={async () => {setPage(1)}}>{entry.entry === 1 && entry.update ? "Entry 1 *" : "Entry 1" }</button>
          )}
          {(entry.entry >= 2 && page === 99) && (
            <button className=" z-50 text-xl font-bold text-black" onClick={async () => {setPage(2)}}>{(entry.entry === 2 || entry.entry === 4) && entry.update ? "Entry 2 *" : "Entry 2" }</button>
          )}
          {(entry.entry >= 5 && page === 99) && (
            <button className=" z-50 text-xl font-bold text-black" onClick={async () => {setPage(3)}}>{entry.entry === 5 && entry.update ? "Entry 3 *" : "Entry 3" }</button>
          )}
         {/* ----------------------------------------------------------INFORMATION---------------------------------------------------------------------------- */}

          {(entry.entry >= 3 && page === 98) && (
            <button className=" z-50 text-xl font-bold text-black" onClick={async () => {setPage(60)}}>{entry.entry === 3 && entry.update ? "World *" : "World" }</button>
          )}
          {(entry.entry >= 3 && page === 98) && (
            <button className=" z-50 text-xl font-bold text-black" onClick={async () => {setPage(61)}}>{entry.entry === 3 && entry.update ? "Magic *" : "Magic" }</button>
          )}
         {/* ----------------------------------------------------------PEOPLE---------------------------------------------------------------------------- */}
         {(entry.entry >= 5 && page === 97) && (
            <button className=" z-50 text-xl font-bold text-black" onClick={async () => {setPage(80)}}>{entry.entry === 5 && entry.update ? "Nora *" : "Nora" }</button>
          )}
          {(entry.entry >= 5 && page === 97) && (
            <button className=" z-50 text-xl font-bold text-black" onClick={async () => {setPage(81)}}>{entry.entry === 5 && entry.update ? "Zayn *" : "Zayn" }</button>
          )}
        </div>)}
      </div>
      {(page !== entry.newpage) && (<button className="absolute z-50 top-[85%] left-[51%] w-[5%] h-[11%]" onClick={async () => {setPage(entry.newpage)}}></button>)}
      {(page !== 100) && (<button className="absolute z-50 top-[86%] left-[43%] w-[6%] h-[7%]" onClick={async () => {setPage(100)}}></button>)}
         {/* ----------------------------------------------------------PAGE DESIGN---------------------------------------------------------------------------- */}

      {(page === 100 || page === 99 || page === 98 || page === 97) && (<Image
         className=" absolute z-30 top-[-1%] left-[8%] w-[85%] h-[100%]"
         src={require(`./components/LogbookFP.png`)}
         alt={"Logbook"}
         />
      )}
      {(page === entry.newpage) && (<Image
         className=" absolute z-30 top-[-1%] left-[8%] w-[85%] h-[100%]"
         src={require(`./components/LogbookHP.png`)}
         alt={"Logbook"}
         />
      )}
      {(page !== 100 && page !== 99 && page !== 98 && page !== 97 && page !== entry.newpage) && (<Image
          className=" absolute z-30 top-[-1%] left-[8%] w-[85%] h-[100%]"
          src={require(`./components/LogbookGP.png`)}
          alt={"LogbookLog1"}
          />
      )}
         {/* ----------------------------------------------------------PEOPLE---------------------------------------------------------------------------- */}
         {(page === 80) && (<Image
         className=" absolute z-30 top-[-1%] left-[8%] w-[85%] h-[100%]"
         src={require(`./components/PNora1.png`)}
         alt={"Logbook"}
         />
      )}
      {(page === 81) && (<Image
         className=" absolute z-30 top-[-1%] left-[8%] w-[85%] h-[100%]"
         src={require(`./components/PZayn1.png`)}
         alt={"Logbook"}
         />
      )}
         {/* ----------------------------------------------------------INFORMATION---------------------------------------------------------------------------- */}


      {(page === 61) && (<Image
         className=" absolute z-30 top-[-1%] left-[8%] w-[85%] h-[100%]"
         src={require(`./components/IMagic.png`)}
         alt={"Logbook"}
         />
      )}
      {(page === 60) && (<Image
         className=" absolute z-30 top-[-1%] left-[8%] w-[85%] h-[100%]"
         src={require(`./components/IWorld.png`)}
         alt={"Logbook"}
         />
      )}
         {/* ----------------------------------------------------------DIARY---------------------------------------------------------------------------- */}
      {(page === 3) && (<Image
         className=" absolute z-30 top-[-1%] left-[8%] w-[85%] h-[100%]"
         src={require(`./components/Diary3.png`)}
         alt={"Logbook"}
         />
      )}
      {(page === 2 && entry.entry >= 4) && (<Image
         className=" absolute z-30 top-[-1%] left-[8%] w-[85%] h-[100%]"
         src={require(`./components/Diary2_1.png`)}
         alt={"Logbook"}
         />
      )}
      {(page === 2 && entry.entry <= 3 ) && (<Image
         className=" absolute z-30 top-[-1%] left-[8%] w-[85%] h-[100%]"
         src={require(`./components/Diary2.png`)}
         alt={"Logbook"}
         />
      )}
      {(page === 1) && (<Image
         className=" absolute z-30 top-[-1%] left-[8%] w-[85%] h-[100%]"
         src={require(`./components/Diary1.png`)}
         alt={"Logbook"}
         />
      )}
    </div>
  );
};

//---------------------------------------------------------------------TEMP EVENT LOCALSTORAGE CHECKER--------------------------------------------------------------------------------------
const LSC = () => {
  //Thigsn like IF CURIOUS >= 6 SETITEM QUESTION 8 TRUE or some shit.
  if (localStorage.getItem('EventFV') === '3' && localStorage.getItem('Warptablet') === 'false'){
    localStorage.setItem('Warptablet', 'true');
  }
  //---------------------------------------------------Nexus Cagliostro Question-----------------------------------
  if (parseInt(localStorage.getItem('SlimeInterest' as string)|| '0') >= 1 && localStorage.getItem('NQuestionSlime') === 'false'){
    localStorage.setItem('NQuestionSlime', 'true');
  }
  if (localStorage.getItem('InformationInBetween') === '1' && localStorage.getItem('NQuestionMist') === 'false'){
    localStorage.setItem('NQuestionMist', 'true');
  }
  if (localStorage.getItem('NQuestionMist') === 'read' && localStorage.getItem('NQuestionInBetween') === 'false'){
    localStorage.setItem('NQuestionInBetween', 'true');
    localStorage.setItem('NQuestionMist', "false");
  }
  if (localStorage.getItem('NQuestionNexus') === 'read' && localStorage.getItem('NQuestionCagliostro') === 'false'){
    localStorage.setItem('NQuestionCagliostro', 'true');
  }
  //--------------------------------------------------Information Checks-------------------------------------------
  if (localStorage.getItem('NQuestionCagliostro') === 'read' && localStorage.getItem('InformationCagliostro') === '0'){
    localStorage.setItem('InformationCagliostro', '1');
  }
  if (localStorage.getItem('NQuestionInBetween') === 'read' && localStorage.getItem('InformationInBetween') === '1'){
    localStorage.setItem('InformationInBetween', '2');
  }
  //--------------------------------------------------Bonus Unlocks-------------------------------------------
  if ((parseInt(localStorage.getItem('Analytical' as string)|| '0') >= 3 || parseInt(localStorage.getItem("Silly" as string)|| '0') > parseInt(localStorage.getItem('Confused' as string)|| '0') || parseInt(localStorage.getItem("Curious" as string)|| '0') >= 3) && localStorage.getItem('Hall7L') === 'false'){
    localStorage.setItem('Hall7L', "1");
  }
  //--------------------------------------------------IN BETWEEN MOOD UPDATES-----------------------------------
  if (parseInt(localStorage.getItem('Scaredy cat' as string)|| '0') >= (parseInt(localStorage.getItem('Friendly' as string)|| '0') && parseInt(localStorage.getItem('Analytical' as string)|| '0'))){
  localStorage.setItem('InbetweenVibe', 'Scaredy cat');
  } else if (parseInt(localStorage.getItem('Analytical' as string)|| '0') >= parseInt(localStorage.getItem('Friendly' as string)|| '0') && parseInt(localStorage.getItem('Analytical' as string)|| '0') > parseInt(localStorage.getItem('Scaredy cat' as string)|| '0')){
    localStorage.setItem('InbetweenVibe', 'Analytical');
  } else { //Friendly > Analytical & Scaredy Cat
    localStorage.setItem('InbetweenVibe', 'Friendly');
  }
  //----------------------------------------------------Event checks-----------------------------------
  if (localStorage.getItem('Yellow') === '1' && localStorage.getItem('Cyan') === '1' && localStorage.getItem('Magenta') === '1' && localStorage.getItem('Spydent') === 'false'){
    localStorage.setItem('Spydent', "true");
  }
  return (
    <div>

    </div>
  );
};

//---------------------------------------------------------------------DISPLAY--------------------------------------------------------------------------------------
export const Scene = ({ initial_content }) => {
  const [scene, setContent] = useState(initial_content);
  const [frame, setFrame] = useState(0);
  // console.log(scene.frames[frame]?.te)
  const [hud, setHud] = useState(0);
  const [room, setRoom] = useState(0);
  const [input, setInput] = useState('');
  const [day, setDay] = useState(new Date());


  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div>
    <div className=" overflow-hidden overflow-x-hidden overflow-y-hidden overscroll-none absolute w-[100%] h-[100%]">
      <div className="">
         {/* ----------------------------------------------------------EventChecker---------------------------------------------------------------------------- */}
      {frame === 0 && (
        <LSC></LSC>
      )}
         {/* ----------------------------------------------------------Script ELEMENTS---------------------------------------------------------------------------- */}
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
        <button className={`absolute z-50 ${scene.logbook.update ? "[&:not(:hover)]:animate-[Rbanner_10s]" : "[&:not(:hover)]:animate-[Rbanner_2s]"} animate-[vibe_2s] top-[-5%] right-[0%] w-[10%] h-[20%] hover:animate-[banner_1s] hover:top-[0%]`} onClick={async () => {
          if (hud === 0){
            setHud(1);
          } else {
            setHud(0);
          }
        }}>
        {scene.logbook.update === false && (<Image
          className=" absolute z-50  w-[100%] h-[100%] top-[-10%]"
          src={require(`./components/Logbookbanner.png`)}
          alt={"Logbookbanner"}
          />)}
          {scene.logbook.update === true && (<Image
          className=" absolute z-50  w-[100%] h-[100%] top-[-10%]"
          src={require(`./components/LogbookbannerS.png`)}
          alt={"LogbookbannerS"}
          />)}
        </button>
         </div>
      )}
      {hud === 1 && (
        <Logbook entry={scene.logbook}></Logbook>
      )}
    {/* ----------------------------------------------------------ID ROOM DEVICE---------------------------------------------------------------------------- */}
      {(hud === 2 || hud === 3) && (
        <div className="absoulte z-40 animate-[vibe_0.5s]">
          <div className="absolute z-40 w-[100%] h-[100%] top-[0%] left-[0%]">
          {hud === 3 && (<div className="absolute w-[100%] h-[100%] z-40">
          <input
            type="text"
            spellCheck='false'
            className=" absolute text-cyan-600 outline-none shadow-none bg-transparent border-transparent border-0 border-solid p-2 top-[41%] left-[35.6%] w-[25%] h-[5%]"
            placeholder="..."
            value={input}
            onChange={handleInputChange}
            maxLength={7}
          />
          <button
            className=" absolute px-4 py-2 rounded-md bg-transparent top-[57.8%] left-[42.8%] w-[10.6%] h-[7.5%]"
            onClick={async () => {
              if (input === ''){
                setHud(2);
              } else if (input === 'Ha11-7L'){
                if (localStorage.getItem('Hall7L') === 'unlock'){
                  setContent(await load("Extra", "IDDeviceRepeatRoom"));
                  setFrame(0);
                  setRoom(0);
                  setHud(0);
                } else {
                  localStorage.setItem('Hall7L', 'unlock');
                  setContent(await load("Extra", "IDDeviceCorrectRoom"));
                  setFrame(0);
                  setRoom(0);
                  setHud(0);
                }
              } else if (input === 'Nxus-CR' || input === 'Rdng-BC'){
                  setContent(await load("Extra", "IDDeviceRepeatRoom"));
                  setFrame(0);
                  setRoom(0);
                  setHud(0);
              } else {
                setContent(await load("Extra", "IDDeviceUnlistedRoom"));
                  setFrame(0);
                  setRoom(0);
                  setHud(0);
              }


              setInput('');
            }}
          ></button>
        </div>)}
          {hud === 2 && (<div className="absolute flex flex-wrap place-content-start place-items-start z-50 top-[26%] left-[24%] w-[49%] h-[52%]">
          {localStorage.getItem('EventFV') === 'FIN' &&(<button className=" w-[21%] h-[21%] m-2" onClick={async () =>{
              setHud(3);
            }}><Image
            className="w-[108%] h-[100%] top-[0%] left-[0%]"
            src={require(`./components/IDAR.png`)}
            alt={"InputPrompt"}
              /></button>)}
            <button className=" w-[21%] h-[21%] m-2" onClick={async () =>{
              setContent(await load("ReadingChambers", "ReadingChambersV"));
              setFrame(0);
              setRoom(0);
              setHud(0);
            }}><Image
            className="w-[108%] h-[100%] top-[0%] left-[0%]"
            src={require(`./components/IDRC.png`)}
            alt={"InputPrompt"}
              /></button>
            <button className=" w-[21%] h-[21%] m-2" onClick={async () =>{
              if (localStorage.getItem('EventFV') === '3'){
                setContent(await load("NexusCore", "FirstVisit"));
                setFrame(0);
                setRoom(0);
                setHud(0);
              } else {
                setContent(await load("NexusCore", "NexusCoreV"));
                setFrame(0);
                setRoom(0);
                setHud(0);
              }
            }}><Image
            className="w-[108%] h-[100%] top-[0%] left-[0%]"
            src={require(`./components/IDNC.png`)}
            alt={"InputPrompt"}
              /></button>
            {localStorage.getItem('Hall7L') === 'unlock' &&(<button className=" w-[21%] h-[21%] m-2" onClick={async () =>{
              if (localStorage.getItem('Password') === ''){ //----------------------------------------------------Rework needed when acc is made------------
                setContent(await load("Ha117L", "FirstVisit"));
                setFrame(0);
                setRoom(0);
                setHud(0);
              } else {
                setContent(await load("Ha117L", "Ha117LV"));
                setFrame(0);
                setRoom(0);
                setHud(0);
              }
            }}><Image
            className="w-[108%] h-[100%] top-[0%] left-[0%]"
            src={require(`./components/IDH7.png`)}
            alt={"InputPrompt"}
              /></button>)}
          </div>)}
        </div>
        <Image
            className=" absolute z-30 top-[4%] left-[7%] w-[80%] h-[90%]"
            src={require(`./components/IDROOMDEVICE.png`)}
            alt={"IDROOMDEVICE"}
        />
        <Image
            className=" absolute z-40 top-[26.9%] left-[65%] w-[4%] h-[6.3%]"
            src={require(`./components/IDwhy.png`)}
            alt={"IDROOMDEVICE"}
        />
        {hud === 3 && (<Image
            className=" absolute z-30 top-[30%] left-[33%] w-[30%] h-[40%]"
            src={require(`./components/RoomIDCheck.png`)}
            alt={"IDROOMDEVICE"}
         />)}
      </div>
      )}
      {scene.hud === "StoryHud5" && (
        <div>
        <button className={`absolute z-50 animate-[shatter_0.8s] top-[0%] left-[0%] w-[22%] h-[30%]`} onClick={async () => {
          setContent(await load("ReadingChambers", "ReadingChambersFA"));
          setFrame(0);
          setRoom(0);
          setHud(0);
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
          setContent(await load("ReadingChambers", "ReadingChambersFA"));
          setFrame(0);
          setRoom(0);
          setHud(0);
        }}>
          <Image
          className=" absolute z-50  w-[100%] h-[100%] top-[0%]"
          src={require(`./components/ShatterText.png`)}
          alt={"ShatterText"}
          />
        </button>
         </div>
      )}
      {(scene.hud === "StoryHud3") && (
        <div>
        <button className={`absolute z-50 hover:animate-[shatter_5s] top-[0%] left-[0%] w-[22%] h-[30%]`} onClick={async () => {
          setContent(await load("ReadingChambers", "ReadingChambers"));
          setFrame(0);
          setRoom(0);
          setHud(0);
        }}>
          <Image
          className=" absolute z-50  w-[100%] h-[100%] top-[0%]"
          src={require(`./components/Shatter.png`)}
          alt={"Shatter"}
          />
        </button>
         </div>
      )}
      {(scene.hud === "StoryHud1" ) && (
        <div>
        <button className={`absolute z-50 hover:animate-[crack_1s] top-[0%] left-[0%] w-[15%] h-[20%]`} onClick={async () => {
          setContent(await load("ReadingChambers", "ReadingChambers"));
          setFrame(0);
          setRoom(0);
          setHud(0);
        }}>
          <Image
          className=" absolute -z-30  w-[100%] h-[100%] top-[0%]"
          src={require(`./components/Shatter.png`)}
          alt={"Shatter"}
          />
        </button>
         </div>
      )}
      {(scene.hud === "StoryHud6" && localStorage.getItem('Warptablet') === 'true' && room === 1) && (
        <div>
        <button className={`absolute z-50 animate-[Rbanner_1s] top-[-5%] right-[0%] w-[10%] h-[20%] hover:animate-[banner_1s] hover:top-[0%]`} onClick={async () => {
          if (hud === 0){
            setHud(2);
          } else {
            setHud(0);
          }
        }}>
          <Image
          className=" absolute z-50  w-[100%] h-[100%] top-[-10%]"
          src={require(`./components/IDBanner.png`)}
          alt={"IDBanner"}
          />
        </button>
         </div>
      )}
    {/* ----------------------------------------------------------Imput---------------------------------------------------------------------------- */}
      {(scene.next.type === "input" && frame >= scene.frames.length - 1 ) && (
        <div className="absolute w-[100%] h-[100%] z-40">
          <input
            type="text"
            spellCheck='false'
            className=" absolute p-4 z-50 bg-transparent outline-none text-cyan-600 top-[36%] left-[32.5%] w-[36%] h-[7%]"
            placeholder="..."
            value={input}
            onChange={handleInputChange}
            maxLength={15}
          />
          <button
            className=" absolute px-4 py-2 z-50 rounded-md bg-transparent top-[57.5%] left-[43%] w-[15%] h-[9.5%]"
            onClick={async () => {
              //-----------------Username Input-------------------------------
              if(scene.next.sceneID === 'Lost2'){
                localStorage.setItem('Username', input);
                setInput('');
                setContent(await load(scene.next.target, scene.next.sceneID));
                setFrame(0);
              }
              if (scene.next.sceneID === 'FScene4'){
                localStorage.setItem('Password', input);
                setInput('');
                setContent(await load(scene.next.target, scene.next.sceneID));
                setFrame(0);
              }
            }}
          ></button>
          <Image
            className=" absolute z-30 top-[20%] left-[28%] w-[45%] h-[55%]"
            src={require(`./components/InputPrompt.png`)}
            alt={"InputPrompt"}
        />
        <div className="absolute w-[100%] place-content-start place-items-center bottom-0 h-[15%] flex flex-col">
            <div className="text-white text-2xl font-bold">{scene.next.sceneID === 'Lost2' ? "(What’s your Identifier or Name?)" : "(As long as it is remembered.)"}</div>
          </div>
        </div>

      )}
      {/* ----------------------------------------------------------CrystalLogPW---------------------------------------------------------------------------- */}
      {(scene.next.type === "CL" && frame >= scene.frames.length - 1 ) && (
        <div className="absolute w-[100%] h-[100%] z-40">
          <input
            type="text"
            spellCheck='false'
            className=" absolute animate-[vibe_4s] border-transparent bg-transparent text-black p-2 top-[34.5%] left-[40.5%] w-[16.7%] h-[4.8%]"
            placeholder="..."
            value={input}
            onChange={handleInputChange}
            maxLength={15}
          />
          <button
            className=" absolute bg-transparent text-white px-4 py-2 rounded-md top-[42%] left-[40.5%] w-[7%] h-[5%]"
            onClick={async () => {
              //-----------------Username Input-------------------------------
              if (input === 'Luna' || input === 'luna'){
                if (localStorage.getItem('EventPR') === 'NS'){
                  setInput('');
                  localStorage.setItem('EventPR', 'FIN');
                  localStorage.setItem('CurrentPart', "Log1");
                  var tempSP = parseInt(localStorage.getItem('Analytical' as string)|| '0');
                  tempSP += 2;
                  localStorage.setItem('Analytical', tempSP.toString());
                  var tempSPs = parseInt(localStorage.getItem('SlimeInterest' as string)|| '0');
                  tempSPs += 1;
                  localStorage.setItem('SlimeInterest', tempSPs.toString());
                setContent(await load('ReadingChambers', 'PRFirstTry'));
                setFrame(0);
                } else {
                  setInput('');
                  setContent(await load('CrystalLog', 'Log1'));
                  setFrame(0);
                  localStorage.setItem('Hall7L', 'true');
                  localStorage.setItem('CurrentPart', "Log1");
                }
              } else {
                setInput('');
                setContent(await load('Extra', 'BlueScreen'));
                setFrame(0);
              }

            }}
          ></button>
        </div>
      )}
    {/* ----------------------------------------------------------Choice---------------------------------------------------------------------------- */}
      {(scene.next.type === "choice" && frame >= scene.frames.length - 1 ) && (
        <div className="absolute w-[100%] h-[100%] z-40">
          <div className="w-[100%] place-content-center place-items-center h-[72%] flex flex-col">
            {(scene.next.one && localStorage.getItem(scene.next.one.compare) === scene.next.one.with ) && (<button className="w-[80%] h-[10%] mb-1 flex flex-col place-content-center place-items-center text-white text-xl" onClick={async () => {
              if (scene.next.one.stats){
              var tempSP = parseInt(localStorage.getItem(scene.next.one.stats as string)|| '0');
              tempSP += 1;
              localStorage.setItem(scene.next.one.stats, tempSP.toString());
              }
              if (scene.next.one.stats === 'Interested'){
                localStorage.setItem(scene.next.one.compare, 'read');
              }
              setContent(await load(scene.jayson, scene.next.one.path));
              setFrame(0);
            }}><div className="z-40 translate-y-[110%]">{scene.next.one.text}</div>
            <Image
            className=" w-[100%] z-30 h-[130%] top-0 translate-y-[-25%]"
            src={require(`./components/ChoiceBanner.png`)}
            alt={"InputPrompt"}
              /></button>)}

            {(scene.next.oneB && localStorage.getItem(scene.next.oneB.compare) === scene.next.oneB.with ) && (<button className="w-[80%] h-[10%] mb-1 flex flex-col place-content-center place-items-center text-white text-xl" onClick={async () => {
              setContent(await load(scene.jayson, scene.next.oneB.path));
              setFrame(0);
            }}><div className="z-40 translate-y-[110%]">{scene.next.oneB.text}</div>
            <Image
            className=" w-[100%] z-30 h-[130%] top-0 translate-y-[-25%]"
            src={require(`./components/ChoiceBanner.png`)}
            alt={"InputPrompt"}
              /></button>)}

            {(scene.next.two && localStorage.getItem(scene.next.two.compare) === scene.next.two.with ) && (<button className="w-[80%] h-[10%] mb-1 flex flex-col place-content-center place-items-center text-white text-xl" onClick={async () => {
              if (scene.next.two.stats){
                var tempSP = parseInt(localStorage.getItem(scene.next.two.stats as string)|| '0');
                tempSP += 1;
                localStorage.setItem(scene.next.two.stats, tempSP.toString());
              }
              if (scene.next.two.stats === 'Interested'){
                localStorage.setItem(scene.next.two.compare, 'read');
              }
              setContent(await load(scene.jayson, scene.next.two.path));
              setFrame(0);
            }}><div className="z-40 translate-y-[110%]">{scene.next.two.text}</div>
            <Image
            className=" w-[100%] z-30 h-[130%] top-0 translate-y-[-25%]"
            src={require(`./components/ChoiceBanner.png`)}
            alt={"InputPrompt"}
              /></button>)}

             {(scene.next.twoB && localStorage.getItem(scene.next.twoB.compare) === scene.next.twoB.with ) && (<button className="w-[80%] h-[10%] mb-1 flex flex-col place-content-center place-items-center text-white text-xl" onClick={async () => {
              setContent(await load(scene.jayson, scene.next.twoB.path));
              setFrame(0);
            }}><div className="z-40 translate-y-[110%]">{scene.next.twoB.text}</div>
            <Image
            className=" w-[100%] z-30 h-[130%] top-0 translate-y-[-25%]"
            src={require(`./components/ChoiceBanner.png`)}
            alt={"InputPrompt"}
              /></button>)}

            {(scene.next.three && localStorage.getItem(scene.next.three.compare) === scene.next.three.with ) && (<button className="w-[80%] h-[10%] mb-1 flex flex-col place-content-center place-items-center text-white text-xl" onClick={async () => {
              if (scene.next.three.stats){
              var tempSP = parseInt(localStorage.getItem(scene.next.three.stats as string)|| '0');
              tempSP += 1;
              localStorage.setItem(scene.next.three.stats, tempSP.toString());
              }
              if (scene.next.three.stats === 'Interested'){
                localStorage.setItem(scene.next.three.compare, 'read');
              }
              setContent(await load(scene.jayson, scene.next.three.path));
              setFrame(0);
            }}><div className="z-40 translate-y-[110%]">{scene.next.three.text}</div>
            <Image
            className=" w-[100%] z-30 h-[130%] top-0 translate-y-[-25%]"
            src={require(`./components/ChoiceBanner.png`)}
            alt={"InputPrompt"}
              /></button>)}
             {(scene.next.threeB && localStorage.getItem(scene.next.threeB.compare) === scene.next.threeB.with ) && (<button className="w-[80%] h-[10%] mb-1 flex flex-col place-content-center place-items-center text-white text-xl" onClick={async () => {
              setContent(await load(scene.jayson, scene.next.threeB.path));
              setFrame(0);
            }}><div className="z-40 translate-y-[110%]">{scene.next.threeB.text}</div>
            <Image
            className=" w-[100%] z-30 h-[130%] top-0 translate-y-[-25%]"
            src={require(`./components/ChoiceBanner.png`)}
            alt={"InputPrompt"}
              /></button>)}

            {(scene.next.four && localStorage.getItem(scene.next.four.compare) === scene.next.four.with ) && (<button className="w-[80%] h-[10%] mb-1 flex flex-col place-content-center place-items-center text-white text-xl" onClick={async () => {
              if (scene.next.four.stats){
             var tempSP = parseInt(localStorage.getItem(scene.next.four.stats as string)|| '0');
             tempSP += 1;
             localStorage.setItem(scene.next.four.stats, tempSP.toString());
              }
              if (scene.next.four.stats === 'Interested'){
                localStorage.setItem(scene.next.four.compare, 'read');
              }
              setContent(await load(scene.jayson, scene.next.four.path));
              setFrame(0);
            }}><div className="z-40 translate-y-[110%]">{scene.next.four.text}</div>
            <Image
            className=" w-[100%] z-30 h-[130%] top-0 translate-y-[-25%]"
            src={require(`./components/ChoiceBanner.png`)}
            alt={"InputPrompt"}
              /></button>)}
             {(scene.next.fourB && localStorage.getItem(scene.next.fourB.compare) === scene.next.fourB.with ) && (<button className="w-[80%] h-[10%] mb-1 flex flex-col place-content-center place-items-center text-white text-xl" onClick={async () => {
              setContent(await load(scene.jayson, scene.next.fourB.path));
              setFrame(0);
            }}><div className="z-40 translate-y-[110%]">{scene.next.fourB.text}</div>
            <Image
            className=" w-[100%] z-30 h-[130%] top-0 translate-y-[-25%]"
            src={require(`./components/ChoiceBanner.png`)}
            alt={"InputPrompt"}
              /></button>)}

            {(scene.next.five && localStorage.getItem(scene.next.five.compare) === scene.next.five.with ) && (<button className="w-[80%] h-[10%] mb-1 flex flex-col place-content-center place-items-center text-white text-xl" onClick={async () => {
              if (scene.next.five.stats){
              var tempSP = parseInt(localStorage.getItem(scene.next.five.stats as string)|| '0');
              tempSP += 1;
              localStorage.setItem(scene.next.five.stats, tempSP.toString());
              }
              if (scene.next.five.stats === 'Interested'){
                localStorage.setItem(scene.next.five.compare, 'read');
              }
              setContent(await load(scene.jayson, scene.next.five.path));
              setFrame(0);
            }}><div className="z-40 translate-y-[110%]">{scene.next.five.text}</div>
            <Image
            className=" w-[100%] z-30 h-[130%] top-0 translate-y-[-25%]"
            src={require(`./components/ChoiceBanner.png`)}
            alt={"InputPrompt"}
              /></button>)}
             {(scene.next.fiveB && localStorage.getItem(scene.next.fiveB.compare) === scene.next.fiveB.with ) && (<button className="w-[80%] h-[10%] mb-1 flex flex-col place-content-center place-items-center text-white text-xl" onClick={async () => {
              setContent(await load(scene.jayson, scene.next.fiveB.path));
              setFrame(0);
            }}><div className="z-40 translate-y-[110%]">{scene.next.fiveB.text}</div>
            <Image
            className=" w-[100%] z-30 h-[130%] top-0 translate-y-[-25%]"
            src={require(`./components/ChoiceBanner.png`)}
            alt={"InputPrompt"}
              /></button>)}

            {(scene.next.six && localStorage.getItem(scene.next.six.compare) === scene.next.six.with ) && (<button className="w-[80%] h-[10%] mb-1 flex flex-col place-content-center place-items-center text-white text-xl" onClick={async () => {
              if (scene.next.six.stats){
              var tempSP = parseInt(localStorage.getItem(scene.next.six.stats as string)|| '0');
              tempSP += 1;
              localStorage.setItem(scene.next.six.stats, tempSP.toString());
              }
              if (scene.next.six.stats === 'Interested'){
                localStorage.setItem(scene.next.six.compare, 'read');
              }
              setContent(await load(scene.jayson, scene.next.six.path));
              setFrame(0);
            }}><div className="z-40 translate-y-[110%]">{scene.next.six.text}</div>
            <Image
            className=" w-[100%] z-30 h-[130%] top-0 translate-y-[-25%]"
            src={require(`./components/ChoiceBanner.png`)}
            alt={"InputPrompt"}
              /></button>)}
             {(scene.next.sixB && localStorage.getItem(scene.next.sixB.compare) === scene.next.sixB.with ) && (<button className="w-[80%] h-[10%] mb-1 flex flex-col place-content-center place-items-center text-white text-xl" onClick={async () => {
              setContent(await load(scene.jayson, scene.next.sixB.path));
              setFrame(0);
            }}><div className="z-40 translate-y-[110%]">{scene.next.sixB.text}</div>
            <Image
            className=" w-[100%] z-30 h-[130%] top-0 translate-y-[-25%]"
            src={require(`./components/ChoiceBanner.png`)}
            alt={"InputPrompt"}
              /></button>)}

            {(scene.next.seven && localStorage.getItem(scene.next.seven.compare) === scene.next.seven.with ) && (<button className="w-[80%] h-[10%] mb-1 flex flex-col place-content-center place-items-center text-white text-xl" onClick={async () => {
              if (scene.next.seven.stats){
              var tempSP = parseInt(localStorage.getItem(scene.next.seven.stats as string)|| '0');
              tempSP += 1;
              localStorage.setItem(scene.next.seven.stats, tempSP.toString());
              }
              if (scene.next.seven.stats === 'Interested'){
                localStorage.setItem(scene.next.seven.compare, 'read');
              }
              setContent(await load(scene.jayson, scene.next.seven.path));
              setFrame(0);
            }}><div className="z-40 translate-y-[110%]">{scene.next.seven.text}</div>
            <Image
            className=" w-[100%] z-30 h-[130%] top-0 translate-y-[-25%]"
            src={require(`./components/ChoiceBanner.png`)}
            alt={"InputPrompt"}
              /></button>)}
             {(scene.next.sevenB && localStorage.getItem(scene.next.sevenB.compare) === scene.next.sevenB.with ) && (<button className="w-[80%] h-[10%] mb-1 flex flex-col place-content-center place-items-center text-white text-xl" onClick={async () => {
              setContent(await load(scene.jayson, scene.next.sevenB.path));
              setFrame(0);
            }}><div className="z-40 translate-y-[110%]">{scene.next.sevenB.text}</div>
            <Image
            className=" w-[100%] z-30 h-[130%] top-0 translate-y-[-25%]"
            src={require(`./components/ChoiceBanner.png`)}
            alt={"InputPrompt"}
              /></button>)}

            {(scene.next.eight && localStorage.getItem(scene.next.eight.compare) === scene.next.eight.with ) && (<button className="w-[80%] h-[10%] mb-1 flex flex-col place-content-center place-items-center text-white text-xl" onClick={async () => {
              if (scene.next.eight.stats){
              var tempSP = parseInt(localStorage.getItem(scene.next.eight.stats as string)|| '0');
              tempSP += 1;
              localStorage.setItem(scene.next.eight.stats, tempSP.toString());
              }
              if (scene.next.eight.stats === 'Interested'){
                localStorage.setItem(scene.next.eight.compare, 'read');
              }
              setContent(await load(scene.jayson, scene.next.eight.path));
              setFrame(0);
            }}><div className="z-40 translate-y-[110%]">{scene.next.eight.text}</div>
            <Image
            className=" w-[100%] z-30 h-[130%] top-0 translate-y-[-25%]"
            src={require(`./components/ChoiceBanner.png`)}
            alt={"InputPrompt"}
              /></button>)}
             {(scene.next.eightB && localStorage.getItem(scene.next.eightB.compare) === scene.next.eightB.with ) && (<button className="w-[80%] h-[10%] mb-1 flex flex-col place-content-center place-items-center text-white text-xl" onClick={async () => {
              setContent(await load(scene.jayson, scene.next.eightB.path));
              setFrame(0);
            }}><div className="z-40 translate-y-[110%]">{scene.next.eightB.text}</div>
            <Image
            className=" w-[100%] z-30 h-[130%] top-0 translate-y-[-25%]"
            src={require(`./components/ChoiceBanner.png`)}
            alt={"InputPrompt"}
              /></button>)}

            {(scene.next.nine && localStorage.getItem(scene.next.nine.compare) === scene.next.nine.with ) && (<button className="w-[80%] h-[10%] mb-1 flex flex-col place-content-center place-items-center text-white text-xl" onClick={async () => {
              if (scene.next.nine.stats){
              var tempSP = parseInt(localStorage.getItem(scene.next.nine.stats as string)|| '0');
              tempSP += 1;
              localStorage.setItem(scene.next.nine.stats, tempSP.toString());
              }
              if (scene.next.nine.stats === 'Interested'){
                localStorage.setItem(scene.next.nine.compare, 'read');
              }
              setContent(await load(scene.jayson, scene.next.nine.path));
              setFrame(0);
            }}><div className="z-40 translate-y-[110%]">{scene.next.nine.text}</div>
            <Image
            className=" w-[100%] z-30 h-[130%] top-0 translate-y-[-25%]"
            src={require(`./components/ChoiceBanner.png`)}
            alt={"InputPrompt"}
              /></button>)}
             {(scene.next.nineB && localStorage.getItem(scene.next.nineB.compare) === scene.next.nineB.with ) && (<button className="w-[80%] h-[10%] mb-1 flex flex-col place-content-center place-items-center text-white text-xl" onClick={async () => {
              setContent(await load(scene.jayson, scene.next.nineB.path));
              setFrame(0);
            }}><div className="z-40 translate-y-[110%]">{scene.next.nineB.text}</div>
            <Image
            className=" w-[100%] z-30 h-[130%] top-0 translate-y-[-25%]"
            src={require(`./components/ChoiceBanner.png`)}
            alt={"InputPrompt"}
              /></button>)}

            {(scene.next.ten && localStorage.getItem(scene.next.ten.compare) === scene.next.ten.with ) && (<button className="w-[80%] h-[10%] mb-1 flex flex-col place-content-center place-items-center text-white text-xl" onClick={async () => {
              if (scene.next.ten.stats){
              var tempSP = parseInt(localStorage.getItem(scene.next.ten.stats as string)|| '0');
              tempSP += 1;
              localStorage.setItem(scene.next.ten.stats, tempSP.toString());
              }
              if (scene.next.ten.stats === 'Interested'){
                localStorage.setItem(scene.next.ten.compare, 'read');
              }
              setContent(await load(scene.jayson, scene.next.ten.path));
              setFrame(0);
            }}><div className="z-40 translate-y-[110%]">{scene.next.ten.text}</div>
            <Image
            className=" w-[100%] z-30 h-[130%] top-0 translate-y-[-25%]"
            src={require(`./components/ChoiceBanner.png`)}
            alt={"InputPrompt"}
              /></button>)}
             {(scene.next.tenB && localStorage.getItem(scene.next.tenB.compare) === scene.next.tenB.with ) && (<button className="w-[80%] h-[10%] mb-1 flex flex-col place-content-center place-items-center text-white text-xl" onClick={async () => {
              setContent(await load(scene.jayson, scene.next.tenB.path));
              setFrame(0);
            }}><div className="z-40 translate-y-[110%]">{scene.next.tenB.text}</div>
            <Image
            className=" w-[100%] z-30 h-[130%] top-0 translate-y-[-25%]"
            src={require(`./components/ChoiceBanner.png`)}
            alt={"InputPrompt"}
              /></button>)}
          </div>
          <div className="w-[100%] place-content-center place-items-center top-[80%] h-[28%] flex flex-col">
            <div className="text-white text-2xl font-bold">{scene.next.question}</div>
          </div>
        </div>
      )}
    {/* ----------------------------------------------------------READING CHAMBERS---------------------------------------------------------------------------- */}
      {scene.name === "ReadingChambers" && (
        <div>
          {/* -----------------------------------------------------Door------------------------------------------------------------*/}
          {(room === 1 && hud === 0 ) && (
            <button className="absolute w-[20%] h-[55.3%] top-[0%] left-[62.9%] z-10 [&:not(:hover)]:opacity-0 hover:opacity-1 hover:animate-[vibe_1s]" onClick={async () =>{
              if (localStorage.getItem('EventFV') === "2"){
                setContent(await load('ReadingChambers', 'DoorF'));
                setFrame(0);
              } else {
                setContent(await load('ReadingChambers', 'DoorN'));
                setFrame(0);
              }
            }}>
               <Image
            className=" absolute w-[108%] h-[103%] top-[0%] left-[-3%]"
            src={require(`./components/LB_RCDoor.png`)}
            alt={"InputPrompt"}
              />
            </button>
          )}
          {/* -----------------------------------------------------WLNB------------------------------------------------------------*/}
          {(room === 1 && hud === 0 ) && (
            <button className="absolute w-[11.2%] h-[15%] top-[66.5%] left-[54.5%] z-10 [&:not(:hover)]:opacity-0 hover:opacity-1 hover:animate-[vibe_1s]" onClick={async () =>{
              if (localStorage.getItem('EventFV') === "FIN"){
                setContent(await load('ReadingChambers', 'WLNBN'));
                setFrame(0);
              }  else if (localStorage.getItem('Error') === 'true'){
                setContent(await load('ReadingChambers', 'WLNBE'));
                setFrame(0);
              } else if (localStorage.getItem('EventFV') === '6'){
                localStorage.setItem('EventFV', 'FIN');
                localStorage.setItem('InformationWLNB', '1'); //After this you for sure know the title
                setContent(await load('ReadingChambers', 'WLNBN'));
                setFrame(0);
              } else if (localStorage.getItem('InformationWLNB') === '0'){
                setContent(await load('ReadingChambers', 'WLNBF'));
                setFrame(0);
              } else {
                setContent(await load('ReadingChambers', 'WLNBFN'));
                setFrame(0);
              }
            }}><Image
            className=" absolute w-[100%] h-[100%] top-[0%] left-[0%]"
            src={require(`./components/LB_RCWLNB.png`)}
            alt={"InputPrompt"}
              />
              </button>
          )}
          {/* -----------------------------------------------------Vase / POT------------------------------------------------------------*/}
          {(room === 1 && hud === 0 ) && (
            <button className="absolute w-[7.6%] h-[16.8%] top-[18%] left-[83.7%] z-10 [&:not(:hover)]:opacity-0 hover:opacity-1 hover:animate-[vibe_1s]" onClick={async () =>{
              if (localStorage.getItem('RCPot') === "false"){
                setContent(await load('ReadingChambers', 'Pot'));
                setFrame(0);
              } else {
                if ((day.getDay() === 2 || day.getDay() === 6) && localStorage.getItem('Yellow') === '0'){
                  setContent(await load('ReadingChambers', 'Potdent'));
                  setFrame(0);
                } else {
                  setContent(await load('ReadingChambers', 'Pot3'));
                  setFrame(0);
                }
              }
            }}>

               <Image
            className=" absolute w-[100%] h-[100%] top-[0%] left-[0%]"
            src={require(`./components/LB_RCPot.png`)}
            alt={"InputPrompt"}
              />
              {((day.getDay() === 2 || day.getDay() === 6) && localStorage.getItem('Yellow') === '0' && localStorage.getItem('RCPot') === "true" && 
            <Image
            className=" absolute w-[94.2%] h-[95%] top-[2%] left-[0.5%]"
            src={require(`./components/LB_RCPotSD.png`)}
            alt={"InputPrompt"}
              />
            )}
            </button>
          )}
          {/* -----------------------------------------------------Cell block------------------------------------------------------------*/}
          {(room === 1 && hud === 0 ) && (
            <button className="absolute w-[65%] h-[61.2%] top-[0%] left-[0%] z-10 [&:not(:hover)]:opacity-0 hover:opacity-1 hover:animate-[vibe_1s]" onClick={async () =>{
              if (localStorage.getItem('RCCell') === "false"){
                setContent(await load('ReadingChambers', 'Cell'));
                setFrame(0);
              } else {
                setContent(await load('ReadingChambers', 'Cell4'));
                setFrame(0);
              }
            }}>
               <Image
            className=" absolute w-[100%] h-[100%] top-[0%] left-[0%]"
            src={require(`./components/LB_RCCellBlock.png`)}
            alt={"InputPrompt"}
              />
            </button>
          )}
          {/* -----------------------------------------------------Souls------------------------------------------------------------*/}
          {(room === 1 && hud === 0 ) && (
            <button className="absolute w-[21.5%] h-[33.5%] top-[3.6%] left-[1%] z-20 [&:not(:hover)]:opacity-0 hover:opacity-1 hover:animate-[vibe_1s]" onClick={async () =>{
              if (localStorage.getItem('RCSoul') === "false"){
                setContent(await load('ReadingChambers', 'Souls'));
                setFrame(0);
              } else {
                setContent(await load('ReadingChambers', 'Souls4'));
                setFrame(0);
              }
            }}>
               <Image
            className=" absolute w-[100%] h-[100%] top-[0%] left-[0%]"
            src={require(`./components/LB_RCSouls.png`)}
            alt={"InputPrompt"}
              />
            </button>
          )}
        {room === 0 && (<button className="absolute w-[100%] h-[100%] z-40" onClick={async () =>{
          //------------------------------------------------------------First ARRIVAL EVENT CHECK------------------------------------
          if (localStorage.getItem('EventFV') === 'NS' || localStorage.getItem('EventFV') === '1'){
            localStorage.setItem('EventFV', '1');
            setContent(await load('ReadingChambers', 'FirstArrival'));
            setFrame(0);
          }
           //------------------------------------------------------------Password Restriction EVENT CHECK------------------------------------
           if ((localStorage.getItem('EventPR') === 'NS' || localStorage.getItem('EventPR') === '1') && localStorage.getItem('StoryProgress') === '14'){
            localStorage.setItem('EventPR', '1');
            setContent(await load('ReadingChambers', 'PasswordRestriction'));
            setFrame(0);
          }
          //------------------------------------------------------------------------------------------------------------------------
          setRoom(1);
        }}>
          <div className="absolute w-[100%] h-[10%] z-50 bottom-0 text-3xl font-bold text-white animate-[vibe_1s]">Reading Chambers</div>
          <Image
            className=" absolute w-[50%] z-40 h-[15%] bottom-0 translate-x-[50%] animate-[vibe_2s]"
            src={require(`./components/RoomBanner.png`)}
            alt={"InputPrompt"}
              />
        </button>)}
        </div>
      )}
    {/* ----------------------------------------------------------NEXUS CORE---------------------------------------------------------------------------- */}
      {scene.name === "NexusCore" && (
        <div>
          {/* -----------------------------------------------------Desk------------------------------------------------------------*/}
          {(room === 1 && hud === 0 ) &&  (
            <div>
            <button className="absolute w-[17%] h-[30%] top-[16.5%] left-[47.3%] z-10 [&:not(:hover)]:opacity-0 hover:opacity-1 hover:animate-[vibe_1s]" onClick={async () =>{
              if (localStorage.getItem('EventFV') === "4"){
                if (localStorage.getItem('Analytical') === '2' || parseInt(localStorage.getItem('Questioning' as string)|| '0') > 2){
                  setContent(await load('NexusCore', 'NCA'));
                  setFrame(0);
                } else if (parseInt(localStorage.getItem('Confused' as string)|| '0') > 3){
                  setContent(await load('NexusCore', 'NCC'));
                  setFrame(0);
                } else {
                  setContent(await load('NexusCore', 'NCN'));
                  setFrame(0);
                }
              } else {
                setContent(await load('NexusCore', 'NexusInit'));
                setFrame(0);
              }
            }}>
              <Image
            className=" absolute w-[100%] h-[100%] top-[0%] left-[0%]"
            src={require(`./components/LB_NCNexusH.png`)}
            alt={"InputPrompt"}
              />
              </button>
              <Image
            className=" absolute w-[17%] h-[30%] top-[16.5%] left-[47.3%] animate-[vibe_2s]"
            src={require(`./components/LB_NCNexus.png`)}
            alt={"InputPrompt"}
              />
              </div>
          )}
           {/* -----------------------------------------------------Table------------------------------------------------------------*/}
           {(room === 1 && hud === 0 ) && (
            <button className="absolute w-[53.5%] h-[32.5%] bottom-0 left-[23.2%] z-10 [&:not(:hover)]:opacity-0 hover:opacity-1 hover:animate-[vibe_1s]" onClick={async () =>{
              if (localStorage.getItem('NCTables') === "false"){
                setContent(await load('NexusCore', 'Tables'));
                setFrame(0);
              } else {
                setContent(await load('NexusCore', 'Tables4'));
                setFrame(0);
              }
            }}>
               <Image
            className=" absolute w-[100%] h-[100%] top-[0%] left-[0%]"
            src={require(`./components/LB_NCTables.png`)}
            alt={"InputPrompt"}
              />
            </button>
          )}
          {/* -----------------------------------------------------Ceiling------------------------------------------------------------*/}
          {(room === 1 && hud === 0 ) && (
            <button className="absolute w-[100%] h-[15%] top-0 left-0 z-10 [&:not(:hover)]:opacity-0 hover:opacity-1 hover:animate-[vibe_1s]" onClick={async () =>{
              if (localStorage.getItem('NCRoof') === "false"){
                setContent(await load('NexusCore', 'Roof'));
                setFrame(0);
              } else {
                setContent(await load('NexusCore', 'Roof2'));
                setFrame(0);
              }
            }}>
               <Image
            className=" absolute w-[100%] h-[100%] top-[0%] left-[0%]"
            src={require(`./components/LB_NCCeiling.png`)}
            alt={"InputPrompt"}
              />
            </button>
          )}
          {/* -----------------------------------------------------InfoWall------------------------------------------------------------*/}
          {(room === 1 && hud === 0 ) && (
            <button className="absolute w-[7.2%] h-[59.9%] top-0 left-[12.4%] z-10 [&:not(:hover)]:opacity-0 hover:opacity-1 hover:animate-[vibe_1s]" onClick={async () =>{
              if (localStorage.getItem('NCInfoWall') === "false"){
                setContent(await load('NexusCore', 'InfoWall'));
                setFrame(0);
              } else {
                setContent(await load('NexusCore', 'InfoWall4'));
                setFrame(0);
              }
            }}>
               <Image
            className=" absolute w-[100%] h-[100%] top-[0%] left-[0%]"
            src={require(`./components/LB_NCInfoWall.png`)}
            alt={"InputPrompt"}
              />
            </button>
          )}
        {room === 0 && (<button className="absolute w-[100%] h-[100%] z-40" onClick={async () =>{
          //------------------------------------------------------------EVENT CHECK------------------------------------
          
          //------------------------------------------------------------------------------------------------------------------------
          setRoom(1);
        }}>
          <div className="absolute w-[100%] h-[10%] z-50 bottom-0 text-3xl font-bold text-white animate-[vibe_1s]">Nexus Core</div>
          <Image
            className=" absolute w-[50%] z-40 h-[15%] bottom-0 translate-x-[50%] animate-[vibe_2s]"
            src={require(`./components/RoomBanner.png`)}
            alt={"InputPrompt"}
              />
        </button>)}
        </div>
      )}
     {/* ----------------------------------------------------------Ha11-7L---------------------------------------------------------------------------- */}
     {scene.name === "Ha11-7L" && (
        <div>
          {/* -----------------------------------------------------Table------------------------------------------------------------*/}
          {(room === 1 && hud === 0 ) && (
            <button className="absolute w-[17.2%] h-[33.4%] top-[60.9%] left-[16.6%] z-10 [&:not(:hover)]:opacity-0 hover:opacity-1 hover:animate-[vibe_1s]" onClick={async () =>{
              if (localStorage.getItem('H7Table') === "false"){
                setContent(await load('Ha117L', 'Table'));
                setFrame(0);
              } else {
                if ((day.getDay() === 5) && localStorage.getItem('H7Table') === 'true'){
                  setContent(await load('Ha117L', 'TableL'));
                  setFrame(0);
                } else {
                  setContent(await load('Ha117L', 'Table6'));
                  setFrame(0);
                }
              }
            }}>
               <Image
            className=" absolute w-[100%] h-[100%] top-[0%] left-[0%]"
            src={require(`./components/LB_H7Table.png`)}
            alt={"InputPrompt"}
              />
              {(day.getDay() === 5 && localStorage.getItem('H7Table') === "true" && 
            <Image
            className=" absolute w-[112%] h-[99.5%] top-[1%] left-[0%]"
            src={require(`./components/LB_H7TableL.png`)}
            alt={"InputPrompt"}
              />
            )}
            </button>
          )}
          {/* -----------------------------------------------------Mist------------------------------------------------------------*/}
          
        {room === 0 && (<button className="absolute w-[100%] h-[100%] z-40" onClick={async () =>{
          //------------------------------------------------------------Event Checks------------------------------------
          
          //------------------------------------------------------------------------------------------------------------------------
          setRoom(1);
        }}>
          <div className="absolute w-[100%] h-[10%] z-50 bottom-0 text-3xl font-bold text-white animate-[vibe_1s]">Ha11-7L</div>
          <Image
            className=" absolute w-[50%] z-40 h-[15%] bottom-0 translate-x-[50%] animate-[vibe_2s]"
            src={require(`./components/RoomBanner.png`)}
            alt={"InputPrompt"}
              />
        </button>)}
        </div>
      )}
      {(scene.type === 'Combt' || scene.type === 'CombtT') && (
        <Combat scene={scene} setScene={async (trgt, id) => {
              setContent(await load(trgt, id));
              setFrame(0);
        }}></Combat>
      )}
      </div>
      </div>
      <div>
      {(scene.type !== 'PNC' && scene.type !== 'Combt')  && (<button className="absolute w-[100%] h-[100%] z-30"
        onClick={async () => {
          if (frame >= scene.frames.length - 1) {
            // -------------------------------------------------------------- WHERE ARE YOU IN THE STORY????--------------------------------------
            
            //Chapter 0: 1
            //Chapter 1: 2
            //Dream 1: 5
            //Chapter 2: 6
            //Chapter 2.1 Interlude: 7
            //Chapter 2.1 Continuation: 7
            //Chapter 0, Part 2: 10
            //Chapter 3: 11
            //Crystal log 1: 14

            //var tempSP = +localStorage.getItem?('StoryProgress'): '';
            var tempSP = parseInt(localStorage.getItem('StoryProgress')|| '0');
            console.log(tempSP);
            if (scene.storyProgressID > tempSP){
              localStorage.setItem('CurrentChapter', scene.next.target);
              localStorage.setItem('CurrentPart', scene.next.sceneID);
              localStorage.setItem('StoryProgress', scene.storyProgressID);
            }
            // -------------------------------------------------------------- WHERE ARE YOU IN THE STORY????--------------------------------------


            console.log("get next scene");
            if (scene.next.type === "fixed") {//-------------------Normal condition (With Event updates)---------------------------

              if (scene.next.event){
                localStorage.setItem(scene.next.event, scene.next.eventupdate);
              }

              setContent(await load(scene.next.target, scene.next.sceneID));
              //setContent(await load(scene.scene_id + 1));
              setFrame(0);
            } else if (scene.next.type === 'statcheck') {//-------------------Simple Stat condition (Currently only with "if higher then X")---------------------------
              if (parseInt(localStorage.getItem(scene.next.stat as string)|| '0') >= scene.next.higher){
                setContent(await load(scene.next.targetA,  scene.next.sceneIDA));
                setFrame(0);
              } else { //Maybe add is LOWER & Is higher then "other stat"
                setContent(await load(scene.next.target, scene.next.sceneID));
                setFrame(0);
              }
            } else if (scene.next.type === 'special'){//-------------------Special condition (Compares a fixed localStorage check)---------------------------
              // ------------------------------------------------ First VISIT--------------------------------
              if (scene.next.target === 'Chapter2' && scene.next.sceneID === 'Scene5' && localStorage.getItem('EventFV') !== 'FIN'){
                setContent(await load(scene.next.target, 'Scene2'));
                setFrame(0);
              } 
              // ------------------------------------------------ Password Restriction--------------------------------
              else if (scene.next.target === 'CrystalLog' && scene.next.sceneID === 'Log1' && localStorage.getItem('EventPR') !== 'FIN'){
                setContent(await load(scene.next.target, 'CLPW'));
                setFrame(0);
                localStorage.setItem('CurrentPart', 'CLPW');
              }
              // -------------------------------------------------- Hall-7 Unlock--------------------------
              else if (scene.next.target === 'ReadingChambers' && scene.next.sceneID === 'PRScene4' && localStorage.getItem('Hall7L') === '1'){
                setContent(await load(scene.next.target, 'PRHall7U'));
                setFrame(0);
              } //-----------------------------------------------First time End of Chapter----------------------------
              else if (scene.next.target === "Extra" && scene.next.sceneID === "NoNewContent" && localStorage.getItem('InformationWLNB') === '1'){
                setContent(await load(scene.next.target, "FNoNewContent"));
                setFrame(0);
              } else {
                setContent(await load(scene.next.target, scene.next.sceneID));
                setFrame(0);
              }

            } else if (scene.next.type === 'TIB'){//-------------------The Inbetween condition (Go where the mood demands)---------------------------
              //--------------------------------------------------------THE INBETWEEN MODES---------------------------------------------
              if (localStorage.getItem('InbetweenVibe') === 'Analytical'){
                if (scene.next.sceneID === 'GreenHypo'){
                  setContent(await load(scene.next.target, 'GreenHypoA'));
                  setFrame(0);
                }
              } else if (localStorage.getItem('InbetweenVibe') === 'Friendly'){
                if (scene.next.sceneID === 'GreenHypo'){
                  setContent(await load(scene.next.target, 'GreenHypoF'));
                  setFrame(0);
                }
              } else if (localStorage.getItem('InbetweenVibe') === 'Scaredy cat'){
                if (scene.next.sceneID === 'GreenHypo'){
                  setContent(await load(scene.next.target, 'GreenHypoS'));
                  setFrame(0);
                }
              }

            } else if (scene.next.type === 'continue'){//-------------------Continue condition (Continuzes with story accordnig to where u max were)---------------------------
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
            } else if (scene.next.type === "random") {//-------------------Random condition (Its random)---------------------------
              const min = 1;
              const max = scene.RNG.amount;
              const rand = Math.round(min + Math.random() * (max - min));
              var bar = '' + rand;
              console.log(bar);
              setContent(await load(scene.next.target, bar));
              //setContent(await load(scene.scene_id + 1));
              setFrame(0);
            } else if (scene.next.type === "start"){//-------------------Website bootup / reload condition (You land where you are supposed to at story start)---------------------------

              //const trgt = localStorage.getItem('CurrentChapter');
              //onst scn = localStorage.getItem('CurrentPart');
              //const trgt = JSON.parse(localStorage.getItem('CurrentChapter')!);
              //const scn = JSON.parse(localStorage.getItem('CurrentPart')!);

              if (localStorage.getItem('EventFV') !== 'NS'){
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

              if (trgt === 'Chapter2' && scn === 'Scene5' && localStorage.getItem('EventFV') !== 'FIN'){
                setContent(await load(trgt, 'Scene2'));
                setFrame(0);
              } else {
                setContent(await load(trgt, scn));
                //setContent(await load(scene.scene_id + 1));
                setFrame(0);
              }
            }
            }
          } else {
            setFrame(frame + 1);
            console.log("Next frame please");
          }
        }}
        >
      </button>
      )}
        </div>
    </div>
  );
};

export default Scene;
