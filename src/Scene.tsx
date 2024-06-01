"use client";
import React, { use, useEffect, useMemo, useState } from "react";
import { load } from "./actions/load";
import Image from 'next/image';
import TextBoxx from './components/TextBox.png';
import Darkness from './components/Darkness.png'
import { Bagel_Fat_One } from "next/font/google";

if (localStorage.getItem('Savestate') === null){
  //------------------------------------------General Things--------------------------------------------
  localStorage.setItem('Savestate', 'true');
  localStorage.setItem('Username', '');
  localStorage.setItem('StoryProgress', '0');
  localStorage.setItem('CurrentChapter', "Library0");
  localStorage.setItem('CurrentPart', "Begining");
  localStorage.setItem('Warptablet', "false");
  //------------------------------------------Events--------------------------------------------
//NS: NOT STARTED, //1,2,3,4: CONVERSATION/EVENTPROGRESS //FIN: FINISHED
  localStorage.setItem('EventFV', "NS"); // First Visit Event:  / 1: Starting / 2: Finished talk with Lyz / 3: Finished talk with Architect  / 4: First Warp to Nexus Core /5: Finsihed fist convo with Nexus /6: Inquired about Story
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
  localStorage.setItem('SlimeInterest', "0"); //1: Is Inquiry by asking or default by SC
  localStorage.setItem('Spydent', "0");
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

  //-------------------------------------------Chronological infromation---------------------------------
  localStorage.setItem('InformationWLNB', "0"); //1: Checked the book on the table
  localStorage.setItem('InformationCagliostro', '0'); // 1: Asked about Cagliostro to Nexus
  localStorage.setItem('InformationInBetween', '0') //1: Interacted with the Mist / 2: Asked about The Inbetwen to Nexus
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
        src={require(`./components/Item${items.item}.png`)}
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
    const [name, setName] = useState(false);
  
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
    }, [text, speed, currentIndex, bold, italic, name]);
  
    return <span dangerouslySetInnerHTML={{ __html: displayText.replace(/[{}]/g, '') }} />;
  };
  
  //console.log(show);
  return (
    <div className={`z-20`}>
      {show === "true" &&

        <Image className={`absolute z-20 ${tb.effect === 'shake' ? "animate-[wiggle_1s]" : null}`} alt="textbox" src={TextBoxx} />
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
  if (localStorage.getItem('SlimeInterest') === '1' && localStorage.getItem('NQuestionSlime') === 'false'){
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
      {hud === 2 && (
        <div className="absoulte z-40 animate-[vibe_0.5s]">
          <div className="absolute z-40 w-[100%] h-[100%] top-[0%] left-[0%]">
          <div className="absolute flex flex-wrap place-content-start place-items-start z-50 top-[26%] left-[23%] w-[50%] h-[52%] border-solid border-4 border-green-600">
            <button className=" w-[21%] h-[21%] border-solid border-4 border-red-500 m-2" onClick={async () =>{
              setContent(await load("ReadingChambers", "ReadingChambers"));
              setFrame(0);
              setRoom(0);
              setHud(0);
            }}>Reading Chambers</button>
            <button className=" w-[21%] h-[21%] border-solid border-4 border-red-500 m-2" onClick={async () =>{
              if (localStorage.getItem('EventFV') === '3'){
                setContent(await load("NexusCore", "FirstVisit"));
                setFrame(0);
                setRoom(0);
                setHud(0);
              } else {
                setContent(await load("NexusCore", "NexusCore"));
                setFrame(0);
                setRoom(0);
                setHud(0);
              }
            }}>Nexus Core</button>
          </div>
        </div>
        <Image
            className=" absolute z-30 top-[4%] left-[7%] w-[80%] h-[90%]"
            src={require(`./components/IDROOMDEVICE.png`)}
            alt={"IDROOMDEVICE"}
            />
      </div>
      )}
      {scene.hud === "StoryHud5" && (
        <div>
        <button className={`absolute z-50 animate-[shatter_0.8s] top-[0%] left-[0%] w-[22%] h-[30%]`} onClick={async () => {
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
      {scene.hud === "StoryHud4" && (
        <div>
        <button className={`absolute z-50 animate-[shatter_5s] top-[0%] left-[0%] w-[22%] h-[30%]`} onClick={async () => {
          setContent(await load("ReadingChambers", "ReadingChambers"));
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
            className=" absolute border-solid border-4 text-black bg-blue-400 border-gray-300 top-[30%] left-[30%] w-[20%] h-[10%]"
            placeholder="Your Identifier"
            value={input}
            onChange={handleInputChange}
            maxLength={15}
          />
          <button
            className=" absolute bg-blue-500 text-white px-4 py-2 rounded-md top-[30%] left-[60%] w-[20%] h-[10%]"
            onClick={async () => {
              //-----------------Username Input-------------------------------
              localStorage.setItem('Username', input);
              setInput('');
              setContent(await load(scene.next.target, scene.next.sceneID));
              setFrame(0);

            }}
          >Confirm</button>
        </div>
      )}
    {/* ----------------------------------------------------------Choice---------------------------------------------------------------------------- */}
      {(scene.next.type === "choice" && frame >= scene.frames.length - 1 ) && (
        <div className="absolute w-[100%] h-[100%] z-40">
          <div className="w-[100%] place-content-center place-items-center h-[80%] flex flex-col border-4 border-solid border-red-700">
            {(scene.next.one && localStorage.getItem(scene.next.one.compare) === scene.next.one.with ) && (<button className="w-[80%] h-[10%] border-solid border-4 border-blue-600 text-white text-xl" onClick={async () => {
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
            }}>{scene.next.one.text}</button>)}
            {(scene.next.oneB && localStorage.getItem(scene.next.oneB.compare) === scene.next.oneB.with ) && (<button className="w-[80%] h-[10%] border-solid border-4 border-blue-600 text-white text-xl" onClick={async () => {
              setContent(await load(scene.jayson, scene.next.oneB.path));
              setFrame(0);
            }}>{scene.next.oneB.text}</button>)}

            {(scene.next.two && localStorage.getItem(scene.next.two.compare) === scene.next.two.with ) && (<button className="w-[80%] h-[10%] border-solid border-4 border-blue-600 text-white text-xl" onClick={async () => {
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
            }}>{scene.next.two.text}</button>)}
             {(scene.next.twoB && localStorage.getItem(scene.next.twoB.compare) === scene.next.twoB.with ) && (<button className="w-[80%] h-[10%] border-solid border-4 border-blue-600 text-white text-xl" onClick={async () => {
              setContent(await load(scene.jayson, scene.next.twoB.path));
              setFrame(0);
            }}>{scene.next.twoB.text}</button>)}

            {(scene.next.three && localStorage.getItem(scene.next.three.compare) === scene.next.three.with ) && (<button className="w-[80%] h-[10%] border-solid border-4 border-blue-600 text-white text-xl" onClick={async () => {
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
            }}>{scene.next.three.text}</button>)}
             {(scene.next.threeB && localStorage.getItem(scene.next.threeB.compare) === scene.next.threeB.with ) && (<button className="w-[80%] h-[10%] border-solid border-4 border-blue-600 text-white text-xl" onClick={async () => {
              setContent(await load(scene.jayson, scene.next.threeB.path));
              setFrame(0);
            }}>{scene.next.threeB.text}</button>)}

            {(scene.next.four && localStorage.getItem(scene.next.four.compare) === scene.next.four.with ) && (<button className="w-[80%] h-[10%] border-solid border-4 border-blue-600 text-white text-xl" onClick={async () => {
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
            }}>{scene.next.four.text}</button>)}
             {(scene.next.fourB && localStorage.getItem(scene.next.fourB.compare) === scene.next.fourB.with ) && (<button className="w-[80%] h-[10%] border-solid border-4 border-blue-600 text-white text-xl" onClick={async () => {
              setContent(await load(scene.jayson, scene.next.fourB.path));
              setFrame(0);
            }}>{scene.next.fourB.text}</button>)}

            {(scene.next.five && localStorage.getItem(scene.next.five.compare) === scene.next.five.with ) && (<button className="w-[80%] h-[10%] border-solid border-4 border-blue-600 text-white text-xl" onClick={async () => {
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
            }}>{scene.next.five.text}</button>)}
             {(scene.next.fiveB && localStorage.getItem(scene.next.fiveB.compare) === scene.next.fiveB.with ) && (<button className="w-[80%] h-[10%] border-solid border-4 border-blue-600 text-white text-xl" onClick={async () => {
              setContent(await load(scene.jayson, scene.next.fiveB.path));
              setFrame(0);
            }}>{scene.next.fiveB.text}</button>)}

            {(scene.next.six && localStorage.getItem(scene.next.six.compare) === scene.next.six.with ) && (<button className="w-[80%] h-[10%] border-solid border-4 border-blue-600 text-white text-xl" onClick={async () => {
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
            }}>{scene.next.six.text}</button>)}
             {(scene.next.sixB && localStorage.getItem(scene.next.sixB.compare) === scene.next.sixB.with ) && (<button className="w-[80%] h-[10%] border-solid border-4 border-blue-600 text-white text-xl" onClick={async () => {
              setContent(await load(scene.jayson, scene.next.sixB.path));
              setFrame(0);
            }}>{scene.next.sixB.text}</button>)}

            {(scene.next.seven && localStorage.getItem(scene.next.seven.compare) === scene.next.seven.with ) && (<button className="w-[80%] h-[10%] border-solid border-4 border-blue-600 text-white text-xl" onClick={async () => {
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
            }}>{scene.next.seven.text}</button>)}
             {(scene.next.sevenB && localStorage.getItem(scene.next.sevenB.compare) === scene.next.sevenB.with ) && (<button className="w-[80%] h-[10%] border-solid border-4 border-blue-600 text-white text-xl" onClick={async () => {
              setContent(await load(scene.jayson, scene.next.sevenB.path));
              setFrame(0);
            }}>{scene.next.sevenB.text}</button>)}

            {(scene.next.eight && localStorage.getItem(scene.next.eight.compare) === scene.next.eight.with ) && (<button className="w-[80%] h-[10%] border-solid border-4 border-blue-600 text-white text-xl" onClick={async () => {
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
            }}>{scene.next.eight.text}</button>)}
             {(scene.next.eightB && localStorage.getItem(scene.next.eightB.compare) === scene.next.eightB.with ) && (<button className="w-[80%] h-[10%] border-solid border-4 border-blue-600 text-white text-xl" onClick={async () => {
              setContent(await load(scene.jayson, scene.next.eightB.path));
              setFrame(0);
            }}>{scene.next.eightB.text}</button>)}

            {(scene.next.nine && localStorage.getItem(scene.next.nine.compare) === scene.next.nine.with ) && (<button className="w-[80%] h-[10%] border-solid border-4 border-blue-600 text-white text-xl" onClick={async () => {
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
            }}>{scene.next.nine.text}</button>)}
             {(scene.next.nineB && localStorage.getItem(scene.next.nineB.compare) === scene.next.nineB.with ) && (<button className="w-[80%] h-[10%] border-solid border-4 border-blue-600 text-white text-xl" onClick={async () => {
              setContent(await load(scene.jayson, scene.next.nineB.path));
              setFrame(0);
            }}>{scene.next.nineB.text}</button>)}

            {(scene.next.ten && localStorage.getItem(scene.next.ten.compare) === scene.next.ten.with ) && (<button className="w-[80%] h-[10%] border-solid border-4 border-blue-600 text-white text-xl" onClick={async () => {
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
            }}>{scene.next.ten.text}</button>)}
             {(scene.next.tenB && localStorage.getItem(scene.next.tenB.compare) === scene.next.tenB.with ) && (<button className="w-[80%] h-[10%] border-solid border-4 border-blue-600 text-white text-xl" onClick={async () => {
              setContent(await load(scene.jayson, scene.next.tenB.path));
              setFrame(0);
            }}>{scene.next.tenB.text}</button>)}
          </div>
          <div className="w-[100%] place-content-center place-items-center top-[80%] h-[20%] flex flex-col border-4 border-solid border-green-700">
            <div className="text-white text-2xl font-bold">{scene.next.question}</div>
          </div>
        </div>
      )}
    {/* ----------------------------------------------------------READING CHAMBERS---------------------------------------------------------------------------- */}
      {scene.name === "ReadingChambers" && (
        <div>
          {/* -----------------------------------------------------Door------------------------------------------------------------*/}
          {(room === 1 && hud === 0 ) && (
            <button className="absolute w-[20%] h-[40%] top-[20%] left-[40%] z-10 border-4 border-white border-solid" onClick={async () =>{
              if (localStorage.getItem('EventFV') === "2"){
                setContent(await load('ReadingChambers', 'DoorF'));
                setFrame(0);
              } else {
                setContent(await load('ReadingChambers', 'DoorN'));
                setFrame(0);
              }
            }}></button>
          )}
          {/* -----------------------------------------------------WLNB------------------------------------------------------------*/}
          {(room === 1 && hud === 0 ) && (
            <button className="absolute w-[20%] h-[30%] top-[20%] left-[60%] z-10 border-4 border-purple-700 border-solid" onClick={async () =>{
              if (localStorage.getItem('EventFV') === "FIN"){
                setContent(await load('ReadingChambers', 'WLNBN'));
                setFrame(0);
              }  else if (localStorage.getItem('Error') === 'true'){
                setContent(await load('ReadingChambers', 'WLNBE'));
                setFrame(0);
              } else if (localStorage.getItem('EventFV') === '6'){
                localStorage.setItem('EventFV', 'FIN');
                setContent(await load('ReadingChambers', 'WLNBN'));
                setFrame(0);
              } else if (localStorage.getItem('InformationWLNB') === '0'){
                setContent(await load('ReadingChambers', 'WLNBF'));
                setFrame(0);
              } else {
                setContent(await load('ReadingChambers', 'WLNBFN'));
                setFrame(0);
              }
            }}></button>
          )}
          
        {room === 0 && (<button className="absolute w-[100%] h-[100%] z-40" onClick={async () =>{
          //------------------------------------------------------------First ARRIVAL EVENT CHECK------------------------------------
          if (localStorage.getItem('EventFV') === 'NS' || localStorage.getItem('EventFV') === '1'){
            localStorage.setItem('EventFV', '1');
            setContent(await load('ReadingChambers', 'FirstArrival'));
            setFrame(0);
          }
          //------------------------------------------------------------------------------------------------------------------------
          setRoom(1);
        }}>
          <div className="absolute w-[100%] h-[10%] z-50 bottom-0 text-3xl font-bold text-white animate-[vibe_1s]">Reading Chambers</div>
        </button>)}
        </div>
      )}
    {/* ----------------------------------------------------------NEXUS CORE---------------------------------------------------------------------------- */}
      {scene.name === "NexusCore" && (
        <div>
          {/* -----------------------------------------------------Desk------------------------------------------------------------*/}
          {(room === 1 && hud === 0 ) &&  (
            <button className="absolute w-[20%] h-[40%] top-[20%] left-[40%] z-10 border-4 border-blue-600 border-solid" onClick={async () =>{
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
            }}></button>
          )}
          
          
        {room === 0 && (<button className="absolute w-[100%] h-[100%] z-40" onClick={async () =>{
          //------------------------------------------------------------EVENT CHECK------------------------------------
          
          //------------------------------------------------------------------------------------------------------------------------
          setRoom(1);
        }}>
          <div className="absolute w-[100%] h-[10%] z-50 bottom-0 text-3xl font-bold text-white animate-[vibe_1s]">Nexus Core</div>
        </button>)}
        </div>
      )}
      </div>
      </div>
      <div>
      {scene.type !== 'PNC' && (<button className="absolute w-[100%] h-[100%] z-30"
        onClick={async () => {
          if (frame >= scene.frames.length - 1) {
            // -------------------------------------------------------------- WHERE ARE YOU IN THE STORY????--------------------------------------
            
            //Chapter 0: 1
            //Chapter 1: 2
            //Dream 1: 5
            //Chapter 2: 6
            //Chapter 2.1 Interlude: 7
            //Chapter 2.1 Continuation: 7
            //Chapter 0Part 2: 10
            //Chapter 3: 11

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
            if (scene.next.type === "fixed") {

              if (scene.next.event){
                localStorage.setItem(scene.next.event, scene.next.eventupdate);
              }

              setContent(await load(scene.next.target, scene.next.sceneID));
              //setContent(await load(scene.scene_id + 1));
              setFrame(0);
              
            } else if (scene.next.type === 'special'){
              if (scene.next.target === 'Chapter2' && scene.next.sceneID === 'Scene5' && localStorage.getItem('EventFV') !== 'FIN'){
                setContent(await load(scene.next.target, 'Scene2'));
                setFrame(0);
              } else {
                setContent(await load(scene.next.target, scene.next.sceneID));
                setFrame(0);
              }

            } else if (scene.next.type === 'continue'){
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
      )}
        </div>
    </div>
  );
};

export default Scene;
