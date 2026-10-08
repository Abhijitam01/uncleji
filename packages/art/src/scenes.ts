export type SceneDef = {
  width: number;
  height: number;
  label: string;
  body: string;
};

export const scenes = {
  "living-room": {
    width: 900,
    height: 1100,
    label: "Sunlit living room with arched window and linen sofa",
    body: `<defs><linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eadfc9"/><stop offset="1" stop-color="#d9c8a9"/></linearGradient><linearGradient id="wall1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4efe6"/><stop offset="1" stop-color="#e9e2d4"/></linearGradient><filter id="grain1"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0.1 0 0 0 0 0.09 0 0 0 0 0.07 0 0 0 0.05 0"/><feComposite operator="over" in2="SourceGraphic"/></filter></defs>
       <rect width="900" height="1100" fill="url(#wall1)"/>
       <path d="M180 120 h340 a170 170 0 0 1 170 170 v430 h-680 v-430 a170 170 0 0 1 170 -170 z" fill="url(#sky1)"/>
       <circle cx="350" cy="330" r="72" fill="#f7ecd4"/>
       <rect y="720" width="900" height="380" fill="#ded2ba"/>
       <g filter="url(#grain1)">
         <rect x="150" y="520" width="600" height="200" rx="26" fill="#efe8da"/>
         <rect x="150" y="480" width="600" height="90" rx="30" fill="#f6f1e7"/>
         <rect x="190" y="540" width="240" height="80" rx="20" fill="#e3d9c6"/>
         <rect x="470" y="540" width="240" height="80" rx="20" fill="#e3d9c6"/>
         <rect x="130" y="700" width="640" height="34" rx="10" fill="#b99a68"/>
         <rect x="160" y="734" width="24" height="70" fill="#a98c5e"/>
         <rect x="716" y="734" width="24" height="70" fill="#a98c5e"/>
         <rect x="600" y="250" width="90" height="120" fill="#57493a"/><rect x="612" y="262" width="66" height="96" fill="#e9dcc0"/>
         <circle cx="645" cy="300" r="18" fill="#b08d57"/>
         <rect x="96" y="430" width="10" height="290" fill="#4a4237"/>
         <ellipse cx="101" cy="420" rx="52" ry="46" fill="#e9dcc0"/>
         <path d="M760 690 q10 -90 44 -128 M760 690 q-30 -70 -18 -120 M760 690 q36 -40 66 -30" stroke="#77704f" stroke-width="9" fill="none" stroke-linecap="round"/>
         <path d="M742 690 h56 l-10 74 h-36 z" fill="#c9b088"/>
         <ellipse cx="770" cy="768" rx="42" ry="10" fill="#b39a71"/>
       </g>`,
  },
  "reading-corner": {
    width: 520,
    height: 640,
    label: "Cosy reading corner with pendant lamp",
    body: `<defs><linearGradient id="w2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#efe7d8"/><stop offset="1" stop-color="#ddd0b8"/></linearGradient></defs>
       <rect width="520" height="640" fill="url(#w2)"/>
       <circle cx="260" cy="205" r="86" fill="#e8d5ae"/>
       <rect x="252" width="16" height="130" fill="#3a332a"/>
       <path d="M175 250 q85 62 170 0 l-16 60 q-69 44 -138 0 z" fill="#caa87a"/>
       <rect y="470" width="520" height="170" fill="#cbbfa4"/>
       <rect x="70" y="360" width="380" height="112" rx="22" fill="#f1ebdd"/>
       <rect x="94" y="386" width="160" height="58" rx="14" fill="#dfd3bc"/>
       <rect x="286" y="386" width="140" height="58" rx="14" fill="#dfd3bc"/>
       <rect x="54" y="472" width="412" height="26" rx="8" fill="#b99a68"/>
       <path d="M420 470 q8 -64 34 -92 M420 470 q-22 -52 -12 -88 M420 470 q26 -30 48 -22" stroke="#77704f" stroke-width="7" fill="none" stroke-linecap="round"/>
       <path d="M404 470 h44 l-8 58 h-28 z" fill="#b39a71"/>`,
  },
  "founder-portrait": {
    width: 640,
    height: 800,
    label: "Portrait of the studio founder in a warm interior",
    body: `<defs><linearGradient id="w3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e7ddca"/><stop offset="1" stop-color="#d5c6aa"/></linearGradient></defs>
       <rect width="640" height="800" fill="url(#w3)"/>
       <path d="M120 800 V560 q0 -210 200 -210 t200 210 v240 z" fill="#efe9dc"/>
       <ellipse cx="320" cy="350" rx="95" ry="118" fill="#caa87a"/>
       <path d="M228 300 q10 -120 92 -120 t92 120 q-30 -52 -92 -52 t-92 52" fill="#4a3d2c"/>
       <circle cx="284" cy="352" r="7" fill="#33291d"/><circle cx="356" cy="352" r="7" fill="#33291d"/>
       <path d="M296 402 q24 18 48 0" stroke="#33291d" stroke-width="6" fill="none" stroke-linecap="round"/>
       <path d="M60 120 h220 M60 156 h150" stroke="#b9ab8e" stroke-width="8" stroke-linecap="round"/>
       <circle cx="540" cy="140" r="60" fill="#f0e4c8"/>`,
  },
  "bedroom-calm": {
    width: 800,
    height: 1000,
    label: "Calm bedroom with soft morning light",
    body: `<defs><linearGradient id="br1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0ead9"/><stop offset="1" stop-color="#dccfb4"/></linearGradient></defs>
       <rect width="800" height="1000" fill="url(#br1)"/>
       <rect x="90" y="90" width="260" height="400" rx="130" fill="#ecdcb8"/>
       <rect y="640" width="800" height="360" fill="#cdbfa4"/>
       <rect x="180" y="480" width="440" height="200" rx="24" fill="#f4efe3"/>
       <rect x="210" y="430" width="380" height="90" rx="28" fill="#faf7ef"/>
       <rect x="230" y="500" width="160" height="70" rx="16" fill="#dfd3bc"/>
       <rect x="410" y="500" width="160" height="70" rx="16" fill="#dfd3bc"/>
       <rect x="150" y="680" width="500" height="30" rx="10" fill="#b99a68"/>
       <rect x="600" y="360" width="12" height="280" fill="#4a4237"/>
       <ellipse cx="606" cy="350" rx="46" ry="42" fill="#e9dcc0"/>`,
  },
  "bathroom-arch": {
    width: 800,
    height: 1000,
    label: "Stone bathroom with arched mirror",
    body: `<defs><linearGradient id="ba1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eeeae2"/><stop offset="1" stop-color="#d8d0c0"/></linearGradient></defs>
       <rect width="800" height="1000" fill="url(#ba1)"/>
       <path d="M250 520 V300 a150 150 0 0 1 300 0 V520 z" fill="#c8bda6"/>
       <path d="M285 520 V310 a115 115 0 0 1 230 0 V520 z" fill="#efe9db"/>
       <rect x="330" y="560" width="140" height="14" fill="#a98c5e"/>
       <ellipse cx="400" cy="620" rx="170" ry="34" fill="#f6f2e8"/>
       <rect x="240" y="640" width="320" height="180" rx="18" fill="#e4dcc9"/>
       <path d="M640 640 q10 -50 34 -70 M640 640 q-16 -40 -8 -66" stroke="#77704f" stroke-width="7" fill="none" stroke-linecap="round"/>
       <path d="M628 640 h32 l-6 44 h-20 z" fill="#b39a71"/>
       <rect y="850" width="800" height="150" fill="#cfc6b0"/>`,
  },
  "walk-closet": {
    width: 800,
    height: 1000,
    label: "Walk-in wardrobe with oak rails",
    body: `<defs><linearGradient id="wc1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#efe9dc"/><stop offset="1" stop-color="#d9cfba"/></linearGradient></defs>
       <rect width="800" height="1000" fill="url(#wc1)"/>
       <rect x="80" y="120" width="640" height="560" rx="20" fill="#57493a"/>
       <rect x="110" y="200" width="580" height="10" rx="5" fill="#b99a68"/>
       <rect x="110" y="380" width="580" height="10" rx="5" fill="#b99a68"/>
       <g fill="#efe7d4"><rect x="150" y="210" width="54" height="150" rx="10"/><rect x="220" y="210" width="54" height="150" rx="10"/><rect x="290" y="210" width="54" height="150" rx="10"/><rect x="430" y="210" width="54" height="150" rx="10"/><rect x="500" y="210" width="54" height="150" rx="10"/><rect x="570" y="210" width="54" height="150" rx="10"/></g>
       <g fill="#e2d6bd"><rect x="150" y="390" width="54" height="150" rx="10"/><rect x="220" y="390" width="54" height="150" rx="10"/><rect x="360" y="390" width="54" height="150" rx="10"/><rect x="500" y="390" width="54" height="150" rx="10"/><rect x="570" y="390" width="54" height="150" rx="10"/></g>
       <rect x="110" y="600" width="580" height="60" rx="12" fill="#6b5949"/>
       <rect y="750" width="800" height="250" fill="#cbbfa4"/>`,
  },
  "kids-room": {
    width: 800,
    height: 1000,
    label: "Playful kids room with bunting",
    body: `<defs><linearGradient id="kr1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3ecdc"/><stop offset="1" stop-color="#e0d2b6"/></linearGradient></defs>
       <rect width="800" height="1000" fill="url(#kr1)"/>
       <path d="M120 150 Q400 260 680 150" stroke="#b08d57" stroke-width="6" fill="none"/>
       <g><path d="M180 172 l30 44 30 -52 z" fill="#b4704f"/><path d="M300 196 l30 44 30 -52 z" fill="#8a9375"/><path d="M420 204 l30 44 30 -52 z" fill="#b08d57"/><path d="M540 186 l30 44 30 -52 z" fill="#c9b088"/></g>
       <rect y="660" width="800" height="340" fill="#d8cbaa"/>
       <rect x="140" y="520" width="300" height="140" rx="20" fill="#f4efe3"/>
       <rect x="170" y="470" width="240" height="80" rx="24" fill="#faf7ef"/>
       <circle cx="560" cy="560" r="70" fill="#e9dcc0"/>
       <rect x="554" y="560" width="12" height="120" fill="#4a4237"/>
       <circle cx="560" cy="700" r="26" fill="#c9b088"/>`,
  },
  "home-office": {
    width: 800,
    height: 1000,
    label: "Quiet home office desk by the window",
    body: `<defs><linearGradient id="ho1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#efe8d8"/><stop offset="1" stop-color="#dbcdae"/></linearGradient></defs>
       <rect width="800" height="1000" fill="url(#ho1)"/>
       <rect x="480" y="120" width="220" height="330" rx="110" fill="#ecdcb8"/>
       <rect y="600" width="800" height="400" fill="#cdbfa4"/>
       <rect x="120" y="560" width="480" height="26" rx="8" fill="#b99a68"/>
       <rect x="150" y="586" width="22" height="140" fill="#a98c5e"/>
       <rect x="550" y="586" width="22" height="140" fill="#a98c5e"/>
       <rect x="200" y="500" width="150" height="60" rx="8" fill="#57493a"/>
       <rect x="215" y="452" width="8" height="48" fill="#3a332a"/>
       <rect x="238" y="452" width="8" height="48" fill="#3a332a"/>
       <path d="M420 560 q6 -46 28 -64 M420 560 q-18 -36 -10 -62" stroke="#77704f" stroke-width="6" fill="none" stroke-linecap="round"/>
       <path d="M410 560 h30 l-6 40 h-18 z" fill="#b39a71"/>`,
  },
  "hallway-runner": {
    width: 800,
    height: 1000,
    label: "Gallery hallway with framed art",
    body: `<defs><linearGradient id="hr1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1ecdf"/><stop offset="1" stop-color="#ded2b8"/></linearGradient></defs>
       <rect width="800" height="1000" fill="url(#hr1)"/>
       <rect x="120" y="180" width="150" height="190" fill="#57493a"/><rect x="138" y="198" width="114" height="154" fill="#e9dcc0"/>
       <rect x="340" y="150" width="130" height="170" fill="#57493a"/><rect x="356" y="166" width="98" height="138" fill="#d9c9a8"/>
       <rect x="540" y="190" width="140" height="180" fill="#57493a"/><rect x="558" y="208" width="104" height="144" fill="#e3d9c6"/>
       <rect x="150" y="470" width="500" height="330" rx="14" fill="#a9885c"/>
       <path d="M150 640 h500 M150 570 h500 M150 710 h500" stroke="#8f7148" stroke-width="8"/>
       <rect y="800" width="800" height="200" fill="#cbbfa4"/>`,
  },
  "terrace-garden": {
    width: 800,
    height: 1000,
    label: "Terrace garden with planters at dusk",
    body: `<defs><linearGradient id="tg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e6e0cd"/><stop offset="1" stop-color="#c9bfa2"/></linearGradient></defs>
       <rect width="800" height="1000" fill="url(#tg1)"/>
       <circle cx="620" cy="220" r="70" fill="#f2e6c4"/>
       <rect x="80" y="380" width="640" height="30" fill="#b9a67f"/>
       <g><path d="M170 380 q-6 -70 30 -96 M200 380 q22 -60 8 -96 M185 380 q-30 -50 -20 -86" stroke="#77704f" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M158 380 h84 l-12 90 h-60 z" fill="#b39a71"/></g>
       <g><path d="M420 380 q-8 -80 34 -108 M452 380 q26 -66 12 -106 M436 380 q-36 -58 -24 -96" stroke="#8a9375" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M402 380 h100 l-14 110 h-72 z" fill="#a98c5e"/></g>
       <rect y="700" width="800" height="300" fill="#cfc3a6"/>
       <rect x="240" y="740" width="320" height="120" rx="16" fill="#a9c4c6"/>`,
  },
  "kitchen-marble": {
    width: 800,
    height: 1000,
    label: "Marble kitchen island with brass pendants",
    body: `<defs><linearGradient id="km1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#efeadd"/><stop offset="1" stop-color="#d9d0ba"/></linearGradient></defs>
       <rect width="800" height="1000" fill="url(#km1)"/>
       <circle cx="250" cy="180" r="46" fill="#e8cf9e"/>
       <circle cx="420" cy="220" r="36" fill="#e8cf9e"/>
       <rect x="245" y="0" width="9" height="136" fill="#3a332a"/>
       <rect x="415" y="0" width="9" height="186" fill="#3a332a"/>
       <rect y="700" width="800" height="300" fill="#cbbfa4"/>
       <rect x="140" y="520" width="520" height="60" rx="12" fill="#f6f2e8"/>
       <rect x="160" y="580" width="480" height="120" fill="#e4dcc9"/>
       <rect x="160" y="580" width="480" height="14" fill="#d3c7ac"/>
       <rect x="330" y="440" width="60" height="80" fill="#b4704f"/>
       <path d="M560 520 q-4 -40 22 -56" stroke="#77704f" stroke-width="6" fill="none" stroke-linecap="round"/>`,
  },
  "house-exterior": {
    width: 800,
    height: 1000,
    label: "Renovated colonial house among trees",
    body: `<defs><linearGradient id="p1s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dde3d2"/><stop offset="1" stop-color="#c2ccb4"/></linearGradient></defs>
       <rect width="800" height="1000" fill="url(#p1s)"/>
       <path d="M120 1000 q-20 -420 80 -640 q-60 -160 40 -280 q100 90 70 270 q120 240 90 650 z" fill="#8a9375"/>
       <rect x="380" y="430" width="300" height="570" fill="#f0e9da"/>
       <path d="M360 430 h340 l-170 -140 z" fill="#57503f"/>
       <rect x="420" y="500" width="70" height="90" fill="#4a4237"/>
       <rect x="570" y="500" width="70" height="90" fill="#4a4237"/>
       <rect x="495" y="700" width="80" height="300" fill="#3a332a"/>
       <circle cx="535" cy="850" r="5" fill="#d8c9a4"/>`,
  },
  "loft-windows": {
    width: 800,
    height: 1000,
    label: "Apartment interior with tall arched windows",
    body: `<defs><linearGradient id="p2s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#efe6d4"/><stop offset="1" stop-color="#dbcbb0"/></linearGradient></defs>
       <rect width="800" height="1000" fill="url(#p2s)"/>
       <rect x="90" y="120" width="180" height="560" rx="90" fill="#e6d3ac"/>
       <rect x="310" y="120" width="180" height="560" rx="90" fill="#e6d3ac"/>
       <rect x="530" y="120" width="180" height="560" rx="90" fill="#e6d3ac"/>
       <rect y="680" width="800" height="320" fill="#cdbfa2"/>
       <rect x="120" y="560" width="560" height="130" rx="24" fill="#f4efe3"/>
       <rect x="150" y="590" width="230" height="66" rx="18" fill="#ddd0b8"/>
       <rect x="420" y="590" width="230" height="66" rx="18" fill="#ddd0b8"/>`,
  },
  "cabin-dusk": {
    width: 800,
    height: 1000,
    label: "Mountain cabin glowing at dusk",
    body: `<defs><linearGradient id="p3s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dfe4e2"/><stop offset="1" stop-color="#c3cdc9"/></linearGradient></defs>
       <rect width="800" height="1000" fill="url(#p3s)"/>
       <path d="M0 640 L260 300 L520 640 Z" fill="#aab5ac"/>
       <path d="M420 700 L640 420 L800 640 Z" fill="#97a39a"/>
       <path d="M180 1000 V620 L420 460 L660 620 V1000 Z" fill="#4a4237"/>
       <path d="M180 620 L420 460 L660 620" stroke="#2f2921" stroke-width="18" fill="none"/>
       <rect x="360" y="700" width="120" height="180" fill="#e8cf9e"/>
       <rect x="240" y="740" width="80" height="80" fill="#e8cf9e"/>`,
  },
  "station-kitchen": {
    width: 800,
    height: 1000,
    label: "Converted station house kitchen",
    body: `<defs><linearGradient id="p4s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ece2ce"/><stop offset="1" stop-color="#d6c5a4"/></linearGradient></defs>
       <rect width="800" height="1000" fill="url(#p4s)"/>
       <rect y="700" width="800" height="300" fill="#b9a67f"/>
       <rect x="100" y="360" width="600" height="340" fill="#57493a"/>
       <rect x="140" y="400" width="520" height="60" rx="8" fill="#efe7d4"/>
       <rect x="140" y="490" width="520" height="60" rx="8" fill="#efe7d4"/>
       <rect x="140" y="580" width="520" height="80" rx="8" fill="#e2d6bd"/>
       <circle cx="400" cy="200" r="70" fill="#e9d6ac"/>
       <rect x="392" width="16" height="140" fill="#3a332a"/>`,
  },
  "dining-green": {
    width: 800,
    height: 1000,
    label: "Bright apartment dining space",
    body: `<defs><linearGradient id="p5s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0ebe0"/><stop offset="1" stop-color="#ddd3bf"/></linearGradient></defs>
       <rect width="800" height="1000" fill="url(#p5s)"/>
       <rect x="90" y="100" width="200" height="480" rx="100" fill="#e6d3ac"/>
       <rect x="440" y="100" width="200" height="480" rx="100" fill="#e6d3ac"/>
       <ellipse cx="400" cy="640" rx="260" ry="40" fill="#b99a68"/>
       <rect x="370" y="640" width="60" height="120" fill="#a98c5e"/>
       <path d="M250 560 q-30 -80 10 -120 M550 560 q30 -80 -10 -120" stroke="#77704f" stroke-width="8" fill="none" stroke-linecap="round"/>
       <ellipse cx="400" cy="560" rx="150" ry="26" fill="#f4eee0"/>`,
  },
  "villa-pool": {
    width: 800,
    height: 1000,
    label: "Minimal villa pool terrace",
    body: `<defs><linearGradient id="p6s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9e4d8"/><stop offset="1" stop-color="#d2c9b4"/></linearGradient></defs>
       <rect width="800" height="1000" fill="url(#p6s)"/>
       <rect x="120" y="260" width="560" height="360" fill="#f2ede1"/>
       <rect x="120" y="260" width="560" height="60" fill="#e3dbca"/>
       <rect x="200" y="380" width="120" height="240" fill="#b9c4c9"/>
       <rect x="480" y="380" width="120" height="240" fill="#b9c4c9"/>
       <rect x="360" y="440" width="80" height="180" fill="#4a4237"/>
       <rect y="700" width="800" height="300" fill="#cfc3a6"/>
       <rect x="140" y="740" width="520" height="140" rx="20" fill="#a9c4c6"/>
       <circle cx="680" cy="820" r="40" fill="#f4efdf"/>`,
  },
  "limewash-light": {
    width: 700,
    height: 480,
    label: "Morning light across a wooden table",
    body: `<rect width="700" height="480" fill="#e8dfcc"/>
       <path d="M0 0 h300 l-300 260 z" fill="#f2e9d4"/>
       <rect y="300" width="700" height="180" fill="#b99a68"/>
       <ellipse cx="360" cy="310" rx="180" ry="26" fill="#a98c5e"/>
       <path d="M300 250 q-20 -60 6 -96 M420 250 q20 -60 -6 -96" stroke="#77704f" stroke-width="7" fill="none" stroke-linecap="round"/>`,
  },
  "arch-door": {
    width: 700,
    height: 480,
    label: "Arched doorway between two rooms",
    body: `<rect width="700" height="480" fill="#ded2ba"/>
       <path d="M250 480 V240 a100 100 0 0 1 200 0 V480 z" fill="#efe7d4"/>
       <path d="M290 480 V250 a60 60 0 0 1 120 0 V480 z" fill="#c9b088"/>
       <rect y="430" width="700" height="50" fill="#a98c5e"/>`,
  },
  "dark-stairs": {
    width: 700,
    height: 480,
    label: "Pendant lamps glowing over a staircase",
    body: `<rect width="700" height="480" fill="#3a332a"/>
       <path d="M0 480 L260 200 h140 L700 480 z" fill="#4a4237"/>
       <circle cx="230" cy="140" r="44" fill="#e8cf9e"/>
       <circle cx="470" cy="180" r="34" fill="#e8cf9e"/>
       <rect x="226" y="0" width="8" height="100" fill="#2a251d"/>
       <rect x="466" y="0" width="8" height="148" fill="#2a251d"/>`,
  },
  "material-board": {
    width: 700,
    height: 480,
    label: "Flat lay of material samples",
    body: `<rect width="700" height="480" fill="#e9e2d0"/>
       <rect x="60" y="70" width="180" height="180" rx="12" fill="#b99a68" transform="rotate(-6 150 160)"/>
       <rect x="270" y="60" width="180" height="180" rx="12" fill="#efe7d4" transform="rotate(4 360 150)"/>
       <rect x="470" y="80" width="170" height="180" rx="12" fill="#57493a" transform="rotate(-3 555 170)"/>
       <rect x="130" y="290" width="200" height="120" rx="12" fill="#c9b088" transform="rotate(3 230 350)"/>
       <rect x="380" y="300" width="200" height="110" rx="12" fill="#8a9375" transform="rotate(-4 480 355)"/>`,
  },
  "swatch-linen": {
    width: 700,
    height: 480,
    label: "Linen swatches pinned to a board",
    body: `<rect width="700" height="480" fill="#ded2ba"/>
       <rect x="90" y="80" width="230" height="300" rx="10" fill="#f4efe3"/>
       <rect x="360" y="100" width="230" height="300" rx="10" fill="#dfd3bc"/>
       <circle cx="205" cy="80" r="10" fill="#57493a"/>
       <circle cx="475" cy="100" r="10" fill="#57493a"/>
       <path d="M120 200 h170 M120 240 h170 M120 280 h120 M390 220 h170 M390 260 h170 M390 300 h120" stroke="#c9bda2" stroke-width="8"/>`,
  },
  "honest-numbers": {
    width: 700,
    height: 480,
    label: "Project ledger with honest ranges",
    body: `<rect width="700" height="480" fill="#e9e2d0"/>
       <rect x="120" y="60" width="460" height="360" rx="14" fill="#f6f1e5" transform="rotate(-2 350 240)"/>
       <path d="M170 130 h300 M170 180 h260 M170 230 h320 M170 280 h220 M170 330 h290" stroke="#c9bda2" stroke-width="9" transform="rotate(-2 350 240)"/>
       <g stroke="#b08d57" stroke-width="7" stroke-linecap="round">
         <path d="M520 150 l14 14 24 -30"/><path d="M520 200 l14 14 24 -30"/><path d="M520 250 l14 14 24 -30"/>
       </g>
       <rect x="80" y="90" width="26" height="330" rx="12" fill="#57493a"/>`,
  },
  "city-map": {
    width: 900,
    height: 700,
    label: "Stylised neighbourhood map with studio location",
    body: `<rect width="900" height="700" fill="#efeade"/>
       <path d="M0 480 q220 -60 430 20 t470 -10 v210 H0 z" fill="#c5d2cc"/>
       <g stroke="#dcd5c2" stroke-width="14" fill="none">
         <path d="M60 0 v700 M240 0 v700 M470 0 v700 M700 0 v700"/>
         <path d="M0 120 h900 M0 300 h900 M0 560 h900"/>
       </g>
       <g stroke="#fff" stroke-width="4" fill="none">
         <path d="M60 0 v700 M240 0 v700 M470 0 v700 M700 0 v700"/>
         <path d="M0 120 h900 M0 300 h900 M0 560 h900"/>
       </g>
       <circle cx="470" cy="300" r="26" fill="#191510"/>
       <circle cx="470" cy="300" r="10" fill="#b08d57"/>
       <text x="500" y="292" font-family="DM Sans, sans-serif" font-size="22" fill="#191510">Kiah</text>
       <text x="500" y="318" font-family="DM Sans, sans-serif" font-size="17" fill="#6f6a5f">68 Java St, Greenpoint</text>`,
  },
  "team-elena": {
    width: 640,
    height: 800,
    label: "Portrait of Elena Voss",
    body: `<defs><linearGradient id="tp1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e7ddca"/><stop offset="1" stop-color="#d5c6aa"/></linearGradient></defs>
<rect width="640" height="800" fill="url(#tp1)"/>
<path d="M120 800 V580 q0 -220 200 -220 t200 220 v220 z" fill="#efe9dc"/>
<ellipse cx="320" cy="360" rx="95" ry="118" fill="#d9ab84"/>
<path d="M225 320 q5 -130 95 -130 t95 130 q-25 -60 -95 -60 t-95 60" fill="#3d2f20"/>
<circle cx="284" cy="362" r="7" fill="#33291d"/><circle cx="356" cy="362" r="7" fill="#33291d"/>
<path d="M298 410 q22 16 44 0" stroke="#33291d" stroke-width="6" fill="none" stroke-linecap="round"/>
<circle cx="250" cy="398" r="26" fill="none" stroke="#57493a" stroke-width="6"/>
<circle cx="390" cy="398" r="26" fill="none" stroke="#57493a" stroke-width="6"/>
<path d="M276 398 h38 M316 398 h38" stroke="#57493a" stroke-width="6"/>`,
  },
  "team-marcus": {
    width: 640,
    height: 800,
    label: "Portrait of Marcus Hale",
    body: `<defs><linearGradient id="tp2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dde4de"/><stop offset="1" stop-color="#c2ccc2"/></linearGradient></defs>
<rect width="640" height="800" fill="url(#tp2)"/>
<path d="M120 800 V580 q0 -220 200 -220 t200 220 v220 z" fill="#4a4237"/>
<ellipse cx="320" cy="360" rx="92" ry="115" fill="#b98a62"/>
<path d="M232 330 q0 -110 88 -110 t88 110 l0 -46 q-20 -70 -88 -70 t-88 70 z" fill="#20180f"/>
<rect x="228" y="300" width="184" height="18" rx="9" fill="#20180f"/>
<circle cx="284" cy="362" r="7" fill="#1d150c"/><circle cx="356" cy="362" r="7" fill="#1d150c"/>
<path d="M292 414 q28 20 56 0" stroke="#1d150c" stroke-width="7" fill="none" stroke-linecap="round"/>`,
  },
  "team-june": {
    width: 640,
    height: 800,
    label: "Portrait of June Okafor",
    body: `<defs><linearGradient id="tp3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#efe4d2"/><stop offset="1" stop-color="#dccbaa"/></linearGradient></defs>
<rect width="640" height="800" fill="url(#tp3)"/>
<path d="M120 800 V580 q0 -220 200 -220 t200 220 v220 z" fill="#b4704f"/>
<ellipse cx="320" cy="360" rx="90" ry="116" fill="#8a5a3b"/>
<path d="M230 380 q-16 -160 90 -160 t90 160 q10 60 -14 96 l0 -110 q-30 -66 -76 -66 t-76 66 l0 110 q-24 -36 -14 -96" fill="#191009"/>
<circle cx="284" cy="362" r="7" fill="#150e07"/><circle cx="356" cy="362" r="7" fill="#150e07"/>
<path d="M296 412 q24 18 48 0" stroke="#150e07" stroke-width="6" fill="none" stroke-linecap="round"/>
<circle cx="320" cy="452" r="12" fill="#e8cf9e"/>`,
  },
  "team-tomas": {
    width: 640,
    height: 800,
    label: "Portrait of Tomas Lindqvist",
    body: `<defs><linearGradient id="tp4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9e6dc"/><stop offset="1" stop-color="#cfccbd"/></linearGradient></defs>
<rect width="640" height="800" fill="url(#tp4)"/>
<path d="M120 800 V580 q0 -220 200 -220 t200 220 v220 z" fill="#8a9375"/>
<ellipse cx="320" cy="360" rx="93" ry="117" fill="#e0b48e"/>
<path d="M240 306 q10 -96 80 -96 t80 96 q-24 -44 -80 -44 t-80 44" fill="#caa25c"/>
<path d="M258 430 q62 26 124 0 l0 26 q-62 24 -124 0 z" fill="#caa25c"/>
<circle cx="284" cy="360" r="7" fill="#241a0e"/><circle cx="356" cy="360" r="7" fill="#241a0e"/>
<path d="M304 414 q16 8 32 0" stroke="#241a0e" stroke-width="6" fill="none" stroke-linecap="round"/>`,
  },
} as const satisfies Record<string, SceneDef>;

export type ArtName = keyof typeof scenes;
