"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PenLine, ArrowDown } from "lucide-react";

const WHATSAPP_NUMBER = "594694136273";
const WHATSAPP_MESSAGE =
  "Bonjour%20EBG%20GROUP,%20je%20souhaite%20un%20devis%20pour%20la%20location%20de%20mat%C3%A9riel.";

const PARTICLES = [
  { x: 60, y: 72, s: 2.5, d: 9, dl: 0.0 },
  { x: 74, y: 28, s: 3.0, d: 12, dl: 1.5 },
  { x: 87, y: 55, s: 2.0, d: 8, dl: 0.8 },
  { x: 66, y: 14, s: 1.5, d: 14, dl: 2.3 },
  { x: 79, y: 82, s: 2.5, d: 10, dl: 0.3 },
  { x: 93, y: 40, s: 1.5, d: 11, dl: 3.1 },
  { x: 57, y: 91, s: 2.0, d: 7, dl: 1.9 },
  { x: 70, y: 62, s: 3.0, d: 13, dl: 0.6 },
  { x: 89, y: 20, s: 1.5, d: 9, dl: 2.7 },
  { x: 76, y: 77, s: 2.0, d: 11, dl: 1.2 },
  { x: 95, y: 66, s: 1.5, d: 8, dl: 3.5 },
  { x: 63, y: 47, s: 2.5, d: 10, dl: 0.9 },
  { x: 82, y: 35, s: 2.0, d: 9, dl: 4.1 },
  { x: 71, y: 88, s: 1.5, d: 13, dl: 2.0 },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.5 } },
};

const slideUp = {
  hidden: { y: 70, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

const fadeSlide = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="accueil"
      className="relative min-h-screen flex flex-col overflow-hidden bg-ebg-black"
    >
      {/* ═══ PARALLAX BACKGROUND ═══════════════════════════════════════ */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 will-change-transform"
      >
        {/* Atmospheric base gradient — golden hour chantier */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 90% 80% at 78% 48%, rgba(160,70,0,0.38) 0%, rgba(80,30,0,0.18) 40%, transparent 72%),
              radial-gradient(ellipse 55% 65% at 85% 42%, rgba(244,180,0,0.16) 0%, transparent 55%),
              radial-gradient(ellipse 40% 40% at 65% 60%, rgba(100,40,0,0.12) 0%, transparent 60%),
              linear-gradient(105deg, #0a0a0a 30%, rgba(10,10,10,0.7) 58%, rgba(10,8,0,0.45) 100%)
            `,
          }}
        />

        {/* Dot grid overlay */}
        <div className="absolute inset-0 bg-dot-grid opacity-20" />

        {/* Primary golden glow pulse */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            top: "12%", right: "4%",
            width: "50vw", height: "50vw",
            background:
              "radial-gradient(circle, rgba(244,180,0,0.13) 0%, rgba(200,90,0,0.07) 38%, transparent 68%)",
          }}
          animate={{ scale: [1, 1.14, 1], opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Secondary warm bloom */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            top: "32%", right: "18%",
            width: "32vw", height: "32vw",
            background:
              "radial-gradient(circle, rgba(255,110,0,0.08) 0%, transparent 60%)",
          }}
          animate={{ scale: [1.08, 1, 1.08], opacity: [0.45, 0.75, 0.45] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        />

        {/* Ground darkness (horizon fog) */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "35%",
            background:
              "linear-gradient(to top, rgba(8,3,0,0.9) 0%, rgba(6,2,0,0.5) 40%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* ═══ SCAN LINE ══════════════════════════════════════════════════ */}
      <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none z-[5]"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, rgba(244,180,0,0.18) 35%, rgba(244,180,0,0.35) 50%, rgba(244,180,0,0.18) 65%, transparent 100%)",
        }}
        animate={{ top: ["-2%", "102%"] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatDelay: 6,
          ease: "linear",
        }}
      />

      {/* ═══ PARTICLES ══════════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[4]">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.s,
              height: p.s,
              background: "rgba(244,180,0,0.55)",
              boxShadow: `0 0 ${p.s * 3}px rgba(244,180,0,0.25)`,
            }}
            animate={{ y: [0, -55, 0], opacity: [0, 0.85, 0], scale: [0.4, 1, 0.4] }}
            transition={{
              duration: p.d,
              delay: p.dl,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ═══ EXCAVATOR SCENE (desktop right side) ══════════════════════ */}
      <motion.div
        className="absolute right-0 top-0 h-full w-full lg:w-[60%] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      >
        <ExcavatorScene />
      </motion.div>

      {/* ═══ MAIN CONTENT ═══════════════════════════════════════════════ */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 flex-1 flex items-center will-change-transform"
      >
        <div className="max-w-[1400px] mx-auto px-6 xl:px-10 w-full pt-28 pb-32">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-[610px]"
          >
            {/* ── Animated badge ── */}
            <motion.div variants={fadeSlide} className="mb-8">
              <span className="inline-flex items-center gap-3 px-4 py-2 border border-ebg-yellow/28 bg-ebg-yellow/[0.06] backdrop-blur-sm">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-ebg-yellow"
                  animate={{ opacity: [1, 0.15, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                <span className="text-ebg-yellow text-[10px] tracking-[0.42em] uppercase font-bold">
                  Guyane Française &middot; BTP &middot; Construction
                </span>
              </span>
            </motion.div>

            {/* ── Main headline ── */}
            <div className="mb-6 overflow-hidden">
              <motion.div variants={slideUp}>
                <p
                  className="font-bebas text-white leading-[0.86] tracking-[0.06em] select-none"
                  style={{ fontSize: "clamp(5.5rem, 13.5vw, 11rem)" }}
                >
                  EBG
                </p>
              </motion.div>
              <motion.div variants={slideUp}>
                <p
                  className="font-bebas text-ebg-yellow leading-[0.86] tracking-[0.06em] select-none"
                  style={{ fontSize: "clamp(5.5rem, 13.5vw, 11rem)" }}
                >
                  GROUP
                </p>
              </motion.div>
            </div>

            {/* ── Animated yellow divider ── */}
            <motion.div className="mb-8" variants={fadeSlide}>
              <motion.div
                className="h-[3px] bg-ebg-yellow"
                initial={{ width: 0 }}
                animate={{ width: 88 }}
                transition={{ duration: 1, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>

            {/* ── Subtitle ── */}
            <motion.h2
              variants={fadeSlide}
              className="font-sans font-black text-white uppercase leading-snug mb-4"
              style={{ fontSize: "clamp(0.95rem, 1.9vw, 1.3rem)", letterSpacing: "0.045em" }}
            >
              Location de matériel &amp; solutions chantier en Guyane
            </motion.h2>

            {/* ── Description ── */}
            <motion.p
              variants={fadeSlide}
              className="text-gray-400 text-[0.9rem] leading-relaxed mb-11 max-w-[420px]"
            >
              Du matériel performant, un service réactif et des solutions
              adaptées à tous vos projets de construction et terrassement
              en Guyane française.
            </motion.p>

            {/* ── CTA Buttons ── */}
            <motion.div variants={fadeSlide} className="flex flex-wrap gap-4">
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-ebg-yellow text-ebg-black text-[11px] font-black tracking-[0.22em] uppercase"
                whileHover={{ scale: 1.03, backgroundColor: "#ffc929" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
              >
                <PenLine size={14} strokeWidth={2.5} />
                Demander un devis
              </motion.a>

              <motion.a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 border border-white/18 bg-white/[0.04] backdrop-blur-sm text-white text-[11px] font-semibold tracking-[0.22em] uppercase"
                whileHover={{
                  scale: 1.03,
                  borderColor: "rgba(244,180,0,0.45)",
                  color: "#f4b400",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
              >
                <WhatsAppIcon />
                WhatsApp
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* ═══ SCROLL INDICATOR ═══════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.9 }}
        style={{ opacity }}
        className="absolute bottom-9 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2.5"
      >
        <span className="text-gray-600 text-[9px] tracking-[0.45em] uppercase">
          Défiler
        </span>
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} strokeWidth={1.5} className="text-ebg-yellow" />
        </motion.div>
      </motion.div>

      {/* ═══ BOTTOM FADE ════════════════════════════════════════════════ */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ebg-black to-transparent z-[3] pointer-events-none" />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   EXCAVATOR SCENE — SVG silhouette mini-pelle + atmosphère dorée
   ───────────────────────────────────────────────────────────────────────── */
function ExcavatorScene() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Horizontal light beam */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: "42%",
          right: 0,
          height: "1px",
          width: "100%",
          background:
            "linear-gradient(to left, rgba(244,180,0,0.22), rgba(244,180,0,0.06) 50%, transparent 80%)",
        }}
        animate={{ opacity: [0.5, 1, 0.5], scaleX: [1, 1.04, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Sun core glow */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          top: "20%",
          right: "10%",
          width: "180px",
          height: "180px",
          background:
            "radial-gradient(circle, rgba(244,180,0,0.22) 0%, rgba(255,140,0,0.1) 45%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Main SVG scene ── */}
      <svg
        viewBox="0 0 650 750"
        className="absolute bottom-0 right-0 w-full h-full"
        preserveAspectRatio="xMidYMax meet"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="heroSunGlow" cx="72%" cy="42%" r="45%">
            <stop offset="0%" stopColor="#f4b400" stopOpacity="0.28" />
            <stop offset="35%" stopColor="#ff6b00" stopOpacity="0.12" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="heroGround" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#160900" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0a0400" stopOpacity="1" />
          </linearGradient>

          <radialGradient id="heroGroundHaze" cx="50%" cy="0%" r="80%">
            <stop offset="0%" stopColor="#c85000" stopOpacity="0.09" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Sun atmospheric halo */}
        <ellipse cx="475" cy="310" rx="210" ry="190" fill="url(#heroSunGlow)" />

        {/* ── GROUND ── */}
        <path
          d="M0 638 Q120 618 230 626 Q340 634 450 622 Q540 612 650 617 L650 750 L0 750Z"
          fill="url(#heroGround)"
        />
        {/* Ground texture / cracks */}
        <path
          d="M40 645 Q180 632 300 638 Q430 644 580 636"
          stroke="#f4b400"
          strokeWidth="0.5"
          fill="none"
          opacity="0.14"
        />
        <path
          d="M0 662 Q200 650 380 656 Q500 660 650 650"
          stroke="#1a0a00"
          strokeWidth="3"
          fill="none"
          opacity="0.6"
        />

        {/* Ground haze/dust */}
        <ellipse cx="380" cy="640" rx="220" ry="42" fill="url(#heroGroundHaze)" />

        {/* ── ANIMATED EXCAVATOR GROUP ── */}
        <motion.g
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "380px 570px" }}
          // framer-motion on SVG group: needs transform attribute
        >
          {/* ── TRACKS ── */}
          {/* Outer track body */}
          <rect x="220" y="514" width="295" height="54" rx="27" fill="#0d0d0d" />
          {/* Inner track detail */}
          <rect x="234" y="522" width="268" height="38" rx="17" fill="#111" />
          {/* Drive sprocket (rear/right) */}
          <circle cx="492" cy="541" r="26" fill="#0a0a0a" stroke="#181818" strokeWidth="2.5" />
          <circle cx="492" cy="541" r="14" fill="#0d0d0d" />
          {/* Idler wheel (front/left) */}
          <circle cx="243" cy="541" r="26" fill="#0a0a0a" stroke="#181818" strokeWidth="2.5" />
          <circle cx="243" cy="541" r="14" fill="#0d0d0d" />
          {/* Mid road wheels */}
          <circle cx="315" cy="541" r="13" fill="#0d0d0d" stroke="#161616" strokeWidth="1.5" />
          <circle cx="367" cy="541" r="13" fill="#0d0d0d" stroke="#161616" strokeWidth="1.5" />
          <circle cx="418" cy="541" r="13" fill="#0d0d0d" stroke="#161616" strokeWidth="1.5" />
          {/* Track guide horns */}
          <rect x="292" y="524" width="8" height="16" rx="2" fill="#0a0a0a" />
          <rect x="335" y="524" width="8" height="16" rx="2" fill="#0a0a0a" />
          <rect x="395" y="524" width="8" height="16" rx="2" fill="#0a0a0a" />
          {/* Yellow track accent stripe */}
          <rect x="240" y="522" width="258" height="2.5" rx="1" fill="#f4b400" opacity="0.28" />

          {/* ── UNDERCARRIAGE ── */}
          <rect x="238" y="480" width="260" height="42" rx="4" fill="#0f0f0f" />

          {/* ── SWING BEARING / TURNTABLE ── */}
          <ellipse cx="380" cy="481" rx="108" ry="12" fill="#151515" />
          <ellipse cx="380" cy="481" rx="92" ry="8" fill="#111" />

          {/* ── UPPER BODY / HOUSING ── */}
          <path
            d="M268 430 L268 483 L492 483 L492 430 Q478 418 278 418 Z"
            fill="#0d0d0d"
          />
          {/* Rear housing curve */}
          <path
            d="M430 420 Q492 408 492 430"
            fill="none"
            stroke="#0a0a0a"
            strokeWidth="2"
          />
          {/* Side panel detail */}
          <line x1="300" y1="430" x2="300" y2="483" stroke="#141414" strokeWidth="1.5" />
          <line x1="340" y1="427" x2="340" y2="483" stroke="#141414" strokeWidth="1" />

          {/* ── COUNTERWEIGHT (rear) ── */}
          <path
            d="M445 420 Q495 406 495 430 L492 483 L445 483 Z"
            fill="#0a0a0a"
          />

          {/* ── CAB ── */}
          {/* Cab body */}
          <rect x="272" y="358" width="130" height="72" rx="5" fill="#0d0d0d" />
          {/* Front windshield (angled) */}
          <path
            d="M272 358 L338 358 L338 390 L272 405 Z"
            fill="#0f0800"
            opacity="0.85"
          />
          {/* Windshield glare (subtle highlight) */}
          <path
            d="M278 362 L318 362 L314 374 L278 380 Z"
            fill="#f4b400"
            opacity="0.04"
          />
          {/* Side window */}
          <rect x="280" y="364" width="48" height="34" rx="3" fill="#0f0800" opacity="0.8" />
          {/* Rear window */}
          <rect x="356" y="366" width="34" height="26" rx="2" fill="#0c0600" opacity="0.7" />
          {/* Cab roof */}
          <rect x="272" y="350" width="130" height="12" rx="3" fill="#0a0a0a" />
          {/* Door handle */}
          <rect x="340" y="378" width="3.5" height="20" rx="1.5" fill="#1a1a1a" />
          {/* Steps */}
          <rect x="268" y="415" width="14" height="4" rx="1" fill="#151515" />
          <rect x="268" y="425" width="14" height="4" rx="1" fill="#151515" />

          {/* ── YELLOW ACCENT LINES ── */}
          {/* Cab roof yellow stripe */}
          <rect x="272" y="350" width="130" height="3" fill="#f4b400" opacity="0.6" />
          {/* Body panel yellow stripe */}
          <rect x="270" y="430" width="222" height="2" rx="1" fill="#f4b400" opacity="0.22" />

          {/* ── BOOM ARM (animated rotation) ── */}
          <motion.g
            animate={{ rotate: [-0.8, 0.8, -0.8] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "305px 375px" }}
          >
            {/* Boom structural body */}
            <path
              d="M305 375 L148 212"
              stroke="#0d0d0d"
              strokeWidth="32"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M305 375 L148 212"
              stroke="#131313"
              strokeWidth="22"
              strokeLinecap="round"
              fill="none"
            />
            {/* Boom yellow edge highlight */}
            <path
              d="M305 375 L148 212"
              stroke="#f4b400"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.55"
            />
            {/* Boom hydraulic cylinder */}
            <path
              d="M298 370 L214 298"
              stroke="#1a1a1a"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M298 370 L214 298"
              stroke="#f4b400"
              strokeWidth="0.8"
              strokeLinecap="round"
              fill="none"
              opacity="0.3"
            />

            {/* ── DIPPER ARM ── */}
            <path
              d="M148 212 L55 345"
              stroke="#0f0f0f"
              strokeWidth="26"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M148 212 L55 345"
              stroke="#161616"
              strokeWidth="17"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M148 212 L55 345"
              stroke="#f4b400"
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
              opacity="0.42"
            />
            {/* Dipper cylinder */}
            <path
              d="M143 218 L102 262"
              stroke="#1a1a1a"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
            />

            {/* ── BUCKET ── */}
            <motion.g
              animate={{ rotate: [2, -2, 2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              style={{ transformOrigin: "55px 345px" }}
            >
              <path
                d="M58 338 L14 392 Q6 416 22 422 L74 408 L88 374 Z"
                fill="#0d0d0d"
              />
              {/* Bucket teeth */}
              <path d="M15 419 L10 438 L19 438 Z" fill="#0f0f0f" />
              <path d="M30 423 L25 442 L34 442 Z" fill="#0f0f0f" />
              <path d="M46 426 L41 445 L50 445 Z" fill="#0f0f0f" />
              <path d="M62 424 L57 443 L66 443 Z" fill="#0f0f0f" />
              {/* Bucket curl cylinder */}
              <path
                d="M76 366 L52 382"
                stroke="#1a1a1a"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />
              {/* Bucket yellow accent */}
              <path
                d="M58 338 L14 392"
                stroke="#f4b400"
                strokeWidth="0.8"
                strokeLinecap="round"
                fill="none"
                opacity="0.35"
              />
            </motion.g>

            {/* ── PIN JOINTS ── */}
            <circle cx="148" cy="212" r="8" fill="#141414" stroke="#1e1e1e" strokeWidth="2" />
            <circle cx="148" cy="212" r="3" fill="#f4b400" opacity="0.55" />
            <circle cx="55" cy="345" r="7" fill="#141414" stroke="#1e1e1e" strokeWidth="2" />
            <circle cx="55" cy="345" r="2.5" fill="#f4b400" opacity="0.45" />
          </motion.g>

          {/* Boom base pin (on body) */}
          <circle cx="305" cy="375" r="10" fill="#111" stroke="#1c1c1c" strokeWidth="2.5" />
          <circle cx="305" cy="375" r="3.5" fill="#f4b400" opacity="0.6" />

          {/* ── EBG GROUP BADGE ON MACHINE ── */}
          <text
            x="390"
            y="458"
            textAnchor="middle"
            fill="#f4b400"
            fontSize="10"
            fontWeight="bold"
            letterSpacing="3"
            opacity="0.32"
            fontFamily="Arial, sans-serif"
          >
            EBG GROUP
          </text>
        </motion.g>

        {/* Dust cloud under tracks */}
        <ellipse cx="378" cy="630" rx="200" ry="38" fill="rgba(140,55,0,0.07)" />
        <ellipse cx="378" cy="642" rx="140" ry="25" fill="rgba(90,35,0,0.05)" />

        {/* Subtle horizon light glow */}
        <ellipse
          cx="450"
          cy="310"
          rx="160"
          ry="12"
          fill="rgba(244,180,0,0.07)"
        />
      </svg>

      {/* Left gradient — blends into dark content area */}
      <div
        className="absolute inset-y-0 left-0 w-2/3 pointer-events-none"
        style={{
          background: "linear-gradient(to right, #0a0a0a 10%, rgba(10,10,10,0.7) 50%, transparent 100%)",
        }}
      />
      {/* Top fade */}
      <div
        className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, #0a0a0a, transparent)",
        }}
      />
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] fill-current shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
