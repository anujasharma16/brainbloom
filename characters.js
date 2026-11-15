/* Mascots: Bruno the brown bear (teacher) and Pinky the pink bunny (curious learner).
   Hand-drawn SVG; animation is done in CSS (idle bob, blinking, ear wiggle, talking mouth, waving). */
const MASCOT = {
  bear: `<svg viewBox="0 0 200 235" xmlns="http://www.w3.org/2000/svg" focusable="false">
    <g class="body">
      <ellipse cx="100" cy="190" rx="52" ry="38" fill="#9c5f32"/>
      <ellipse cx="100" cy="196" rx="32" ry="26" fill="#e0b184"/>
      <g class="armL" style="transform-origin:56px 168px"><ellipse cx="50" cy="184" rx="14" ry="27" fill="#8a5129" transform="rotate(22 50 184)"/></g>
      <g class="armR" style="transform-origin:144px 168px"><ellipse cx="150" cy="184" rx="14" ry="27" fill="#8a5129" transform="rotate(-22 150 184)"/></g>
      <ellipse cx="78" cy="226" rx="19" ry="9" fill="#8a5129"/><ellipse cx="122" cy="226" rx="19" ry="9" fill="#8a5129"/>
    </g>
    <g class="head" style="transform-origin:100px 170px">
      <circle cx="46" cy="52" r="23" fill="#9c5f32"/><circle cx="46" cy="52" r="12" fill="#e0b184"/>
      <circle cx="154" cy="52" r="23" fill="#9c5f32"/><circle cx="154" cy="52" r="12" fill="#e0b184"/>
      <circle cx="100" cy="106" r="62" fill="#b06f3e"/>
      <ellipse cx="100" cy="126" rx="30" ry="23" fill="#ecc9a0"/>
      <ellipse cx="100" cy="113" rx="10" ry="7" fill="#3b2416"/>
      <g class="eyes" style="transform-origin:100px 94px">
        <circle cx="75" cy="94" r="7" fill="#2b1a10"/><circle cx="125" cy="94" r="7" fill="#2b1a10"/>
        <circle cx="77.5" cy="91.5" r="2.4" fill="#fff"/><circle cx="127.5" cy="91.5" r="2.4" fill="#fff"/>
      </g>
      <circle cx="58" cy="119" r="9" fill="#ff8fa3" opacity=".45"/><circle cx="142" cy="119" r="9" fill="#ff8fa3" opacity=".45"/>
      <path class="smile" d="M88 133 Q100 144 112 133" stroke="#3b2416" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <ellipse class="mouth" cx="100" cy="137" rx="9" ry="7" fill="#5a1f2a"/>
    </g></svg>`,
  bunny: `<svg viewBox="0 0 200 235" xmlns="http://www.w3.org/2000/svg" focusable="false">
    <g class="ears">
      <g class="earL" style="transform-origin:78px 90px"><ellipse cx="72" cy="42" rx="15" ry="46" fill="#ff9ec7" transform="rotate(-8 72 42)"/><ellipse cx="72" cy="44" rx="8" ry="32" fill="#ffc2dd" transform="rotate(-8 72 44)"/></g>
      <g class="earR" style="transform-origin:122px 90px"><ellipse cx="128" cy="42" rx="15" ry="46" fill="#ff9ec7" transform="rotate(8 128 42)"/><ellipse cx="128" cy="44" rx="8" ry="32" fill="#ffc2dd" transform="rotate(8 128 44)"/></g>
    </g>
    <g class="body">
      <circle cx="152" cy="208" r="12" fill="#fff"/>
      <ellipse cx="100" cy="192" rx="48" ry="36" fill="#ff9ec7"/>
      <ellipse cx="100" cy="198" rx="28" ry="24" fill="#ffd6e8"/>
      <g class="armL" style="transform-origin:58px 170px"><ellipse cx="54" cy="186" rx="13" ry="25" fill="#f58ab8" transform="rotate(22 54 186)"/></g>
      <g class="armR" style="transform-origin:142px 170px"><ellipse cx="146" cy="186" rx="13" ry="25" fill="#f58ab8" transform="rotate(-22 146 186)"/></g>
      <ellipse cx="76" cy="226" rx="20" ry="9" fill="#ffd6e8"/><ellipse cx="124" cy="226" rx="20" ry="9" fill="#ffd6e8"/>
    </g>
    <g class="head" style="transform-origin:100px 170px">
      <circle cx="100" cy="108" r="54" fill="#ffa9cf"/>
      <ellipse cx="100" cy="128" rx="23" ry="16" fill="#ffe3ef"/>
      <ellipse cx="100" cy="118" rx="7" ry="5" fill="#e0568f"/>
      <g class="eyes" style="transform-origin:100px 100px">
        <circle cx="77" cy="100" r="7" fill="#3a1c2c"/><circle cx="123" cy="100" r="7" fill="#3a1c2c"/>
        <circle cx="79.5" cy="97.5" r="2.4" fill="#fff"/><circle cx="125.5" cy="97.5" r="2.4" fill="#fff"/>
      </g>
      <circle cx="60" cy="121" r="9" fill="#ff6fa5" opacity=".35"/><circle cx="140" cy="121" r="9" fill="#ff6fa5" opacity=".35"/>
      <path class="smile" d="M90 133 Q100 142 110 133" stroke="#8a2250" stroke-width="3.2" fill="none" stroke-linecap="round"/>
      <rect class="teeth" x="95" y="136" width="10" height="9" rx="2" fill="#fff" stroke="#e9c3d4"/>
      <ellipse class="mouth" cx="100" cy="139" rx="8" ry="6" fill="#8a2250"/>
    </g></svg>`,
};

/* mascot('bear', 'wave small') -> HTML. Classes: wave, jump, talking, speaker, quiet, small, big */
function mascot(who, cls = '') {
  return `<div class="mascot ${who} ${cls}" aria-hidden="true">${MASCOT[who]}</div>`;
}
