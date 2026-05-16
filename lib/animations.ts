// Shared animation primitives — EBG GROUP

export const EASE = [0.16, 1, 0.3, 1] as const;
export const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as const;

export const VP = { once: true, margin: "-80px" } as const;
export const VP_TIGHT = { once: true, margin: "-40px" } as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE, delay },
  }),
};

export const lineReveal = {
  hidden: { y: "105%" },
  visible: (delay = 0) => ({
    y: "0%",
    transition: { duration: 1.05, ease: EASE, delay },
  }),
};

export const staggerContainer = (delay = 0.1) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: delay, delayChildren: 0.05 },
  },
});
