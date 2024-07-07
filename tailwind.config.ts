import { transform } from "next/dist/build/swc";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Scene.tsx",
    "./src/Combat.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '20%': { transform: 'translate(-5px, 0)' },
          '40%': { transform: 'translate(5px, 0)' },
          '60%': { transform: 'translate(-5px, 0)' },
          '80%': { transform: 'translate(5px, 0)' },
        },
        shake: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '20%': { transform: 'translate(2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, -2px)' },
          '80%': { transform: 'translate(-2px, 2px)' },
        },
        crash: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '20%': { transform: 'translate(10px, 10px)' },
          '40%': { transform: 'translate(-10px, -10px)' },
          '60%': { transform: 'translate(10px, -10px)' },
          '80%': { transform: 'translate(-10px, 10px)' },
        },
        blink: {
          '0%' : { transform: 'translate(0, 0)', opacity: '1'},
          '50%': { transform: 'translate(-5px, 0)', opacity: '1'},
          '99%': {transform: 'translate(5px, 0)', opacity: '1'},
          '100%': {transform: 'translate(5px, 0)', opacity: '0'},
        },
        delay: {
          '0%, 75%' : { opacity: '0'},
          '100%' : { opacity: '1'},
        },   //------------------------------------POSITION MOVEMENT TO POSITION C-----------------------------------
        RTC: {
          from: { transform: 'translate(39%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        LTC: {
          from: { transform: 'translate(-37%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        RRTC: {
          from: { transform: 'translate(60%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        SRTC: {
          from: { transform: 'translate(80%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        LLTC: {
          from: { transform: 'translate(-57%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        SLTC: {
          from: { transform: 'translate(-80%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        RRRTC: {
          from: { transform: 'translate(160%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        LLLTC: {
          from: { transform: 'translate(-160%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        //------------------------------------POSITION MOVEMENT TO POSITION R-----------------------------------
        CTR: {
          from: { transform: 'translate(-38%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        LTR: {
          from: { transform: 'translate(-75%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        LLTR: {
          from: { transform: 'translate(-100%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        SLTR: {
          from: { transform: 'translate(-120%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        RRTR: {
          from: { transform: 'translate(22%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        SRTR: {
          from: { transform: 'translate(44%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        LLLTR: {
          from: { transform: 'translate(-200%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        RRRTR: {
          from: { transform: 'translate(100%, 0)'},
          to: { transform: 'translate(0, 0)'},
        }, //------------------------------------POSITION MOVEMENT TO POSITION L-----------------------------------
        CTL: {
          from: { transform: 'translate(37%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        RTL: {
          from: { transform: 'translate(75%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        RRTL: {
          from: { transform: 'translate(100%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        SRTL: {
          from: { transform: 'translate(120%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        LLTL: {
          from: { transform: 'translate(-22%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        SLTL: {
          from: { transform: 'translate(-45%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        RRRTL: {
          from: { transform: 'translate(200%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        LLLTL: {
          from: { transform: 'translate(-100%, 0)'}, 
          to: { transform: 'translate(0, 0)'},
        },
        //------------------------------------POSITION MOVEMENT TO POSITION lL-----------------------------------
        CTLL: {
          from: { transform: 'translate(57%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        RTLL: {
          from: { transform: 'translate(85%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        RRTLL: {
          from: { transform: 'translate(120%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        SRTLL: {
          from: { transform: 'translate(140%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        LTLL: {
          from: { transform: 'translate(22%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        SLTLL: {
          from: { transform: 'translate(-22%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        RRRTLL: {
          from: { transform: 'translate(200%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        LLLTLL: {
          from: { transform: 'translate(-100%, 0)'}, 
          to: { transform: 'translate(0, 0)'},
        },
        //------------------------------------POSITION MOVEMENT TO POSITION SL-----------------------------------
        CTSL: {
          from: { transform: 'translate(77%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        RTSL: {
          from: { transform: 'translate(115%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        RRTSL: {
          from: { transform: 'translate(140%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        SRTSL: {
          from: { transform: 'translate(160%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        LTSL: {
          from: { transform: 'translate(44%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        LLTSL: {
          from: { transform: 'translate(22%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        RRRTSL: {
          from: { transform: 'translate(200%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        LLLTSL: {
          from: { transform: 'translate(-100%, 0)'}, 
          to: { transform: 'translate(0, 0)'},
        },
        //------------------------------------POSITION MOVEMENT TO POSITION SR-----------------------------------
        CTSR: {
          from: { transform: 'translate(-78%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        RTSR: {
          from: { transform: 'translate(-44%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        RRTSR: {
          from: { transform: 'translate(-22%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        SLTSR: {
          from: { transform: 'translate(-160%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        LTSR: {
          from: { transform: 'translate(-120%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        LLTSR: {
          from: { transform: 'translate(-140%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        RRRTSR: {
          from: { transform: 'translate(100%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        LLLTSR: {
          from: { transform: 'translate(-200%, 0)'}, 
          to: { transform: 'translate(0, 0)'},
        },
        //------------------------------------POSITION MOVEMENT TO POSITION RR-----------------------------------
        CTRR: {
          from: { transform: 'translate(-62%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        LTRR: {
          from: { transform: 'translate(-85%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        LLTRR: {
          from: { transform: 'translate(-120%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        SLTRR: {
          from: { transform: 'translate(-140%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        RTRR: {
          from: { transform: 'translate(-22%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        SRTRR: {
          from: { transform: 'translate(22%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        LLLTRR: {
          from: { transform: 'translate(-200%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        RRRTRR: {
          from: { transform: 'translate(100%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        DTRR: {
          from: { transform: 'translate(0, 100%)'},
          to: { transform: 'translate(0, 0)'},
        },
         //------------------------------------POSITION MOVEMENT TO POSITION lLL-----------------------------------
         CTLLL: {
          from: { transform: 'translate(167%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        RTLLL: {
          from: { transform: 'translate(205%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        RRTLLL: {
          from: { transform: 'translate(230%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        SRTLLL: {
          from: { transform: 'translate(255%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        LTLLL: {
          from: { transform: 'translate(130%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        RRRTLLL: {
          from: { transform: 'translate(320%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        LLTLLL: {
          from: { transform: 'translate(110%, 0)'}, 
          to: { transform: 'translate(0, 0)'},
        },
        SLTLLL: {
          from: { transform: 'translate(90%, 0)'}, 
          to: { transform: 'translate(0, 0)'},
        },
        //------------------------------------POSITION MOVEMENT TO POSITION RRR-----------------------------------
        CTRRR: {
          from: { transform: 'translate(-168%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        LTRRR: {
          from: { transform: 'translate(-205%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        LLTRRR: {
          from: { transform: 'translate(-230%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        SLTRRR: {
          from: { transform: 'translate(-255%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        RTRRR: {
          from: { transform: 'translate(-130%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        LLLTRRR: {
          from: { transform: 'translate(-320%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        RRTRRR: {
          from: { transform: 'translate(-110%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        SRTRRR: {
          from: { transform: 'translate(-90%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        //-----------------------------------------?????????????----------------------------
        CTD: {
          from: { transform: 'translate(0, -100%)'},
          to: { transform: 'translate(0, 0)'},
        },
        vibe: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        vibeout: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        svo: {
          from: { opacity: '0.2' },
          to: { opacity: '0' },
        },
        lingering: {
          '0%, 25%' : { opacity: '1'},
          '100%' : { opacity: '0'},
        },
        jump: {
          '0%, 100%' : {transform: 'translate(0, 0)'},
          '50%' : {transform: 'translate(0, -10px)'},
        },
        banner: {
          from: { transform: 'translate(0, -25%)'},
          to: {transform: 'translate(0, 0%)'},
        },
        Rbanner: {
          from: { transform: 'translate(0, 25%)'},
          to: {transform: 'translate(0, 0%)'},
        },
        shatter: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%, 60%': { transform: 'translate(-4px, 0)' },
          '20%, 70%': { transform: 'translate(0, -4px)' },
          '30%, 80%': { transform: 'translate(-4px, -4px)' },
          '40%, 90%': { transform: 'translate(0, -4px)' },
          '50%': { transform: 'translate(0, 0)' },
        },
        crack: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '20%': { transform: 'translate(-4px, 0)' },
          '40%': { transform: 'translate(0, -4px)' },
          '60%': { transform: 'translate(-4px, -4px)' },
          '80%': { transform: 'translate(0, -4px)' },
        },
      },
      animation: {
        shake: 'shake 0.5s infinite', // Apply the shake animation infinitely
      },
    },
  },
  plugins: [],
};
export default config;
