import { transform } from "next/dist/build/swc";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Scene.tsx",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
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
          from: { transform: 'translate(47%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        LLTC: {
          from: { transform: 'translate(-57%, 0)'},
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
        RRTR: {
          from: { transform: 'translate(10%, 0)'},
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
        LLTL: {
          from: { transform: 'translate(-10%, 0)'},
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
        LTLL: {
          from: { transform: 'translate(22%, 0)'},
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
        RTRR: {
          from: { transform: 'translate(-22%, 0)'},
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
        LTLLL: {
          from: { transform: 'translate(60%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        RRRTLLL: {
          from: { transform: 'translate(320%, 0)'},
          to: { transform: 'translate(0, 0)'},
        },
        LLTLLL: {
          from: { transform: 'translate(50%, 0)'}, 
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
        RTRRR: {
          from: { transform: 'translate(-60%, 0)'},
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
        vibe: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        vibeout: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        lingering: {
          '0%, 25%' : { opacity: '1'},
          '100%' : { opacity: '0'},
        }
      },
      animation: {
        shake: 'shake 0.5s infinite', // Apply the shake animation infinitely
      },
    },
  },
  plugins: [],
};
export default config;
