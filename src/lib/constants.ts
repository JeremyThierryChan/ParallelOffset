export const CMYK = {
  C: "#00AEEF",
  M: "#EC008C",
  Y: "#FFD600",
  K: "#1A1A1A",
} as const;

export const NAV_LINKS = [
  { href: "#about",   label: "ABOUT"   },
  { href: "#music",   label: "MUSIC"   },
  { href: "#shows",   label: "SHOWS"   },
  { href: "#print",   label: "PRINT"   },
  { href: "#contact", label: "CONTACT" },
] as const;

export const RELEASES = [
  {
    title:  "REGISTRATION",
    type:   "EP",
    year:   "2024",
    color:  "C" as const,
    tracks: [
      { num: "01", name: "Misalignment",  time: "5:23", color: "C" as const },
      { num: "02", name: "Cyan Bleed",    time: "4:47", color: "M" as const },
      { num: "03", name: "Register Mark", time: "6:12", color: "Y" as const },
      { num: "04", name: "9/8 Overture",  time: "3:55", color: "K" as const },
      { num: "05", name: "Parallel Lines",time: "7:41", color: "C" as const },
    ],
  },
] as const;

export const SINGLES = [
  { title: "CMYK BREAKDOWN", year: "2023", color: "C" as const },
  { title: "OFFSET GROOVE",  year: "2023", color: "M" as const },
  { title: "POLYRHYTHM",     year: "2022", color: "Y" as const },
] as const;

export const SHOWS = [
  { month: "JUN", day: "14", venue: "MAO Livehouse",  city: "北京 · Beijing",    tag: "HEADLINER", color: "C" as const,  past: false },
  { month: "JUL", day: "02", venue: "Yuyintang",       city: "上海 · Shanghai",   tag: "METAL FEST",color: "M" as const,  past: false },
  { month: "AUG", day: "18", venue: "Tsen Studio",     city: "广州 · Guangzhou",  tag: "SUPPORT",   color: "Y" as const,  past: false },
  { month: "APR", day: "05", venue: "School Bar",       city: "北京 · Beijing",    tag: "PAST",      color: "K" as const,  past: true  },
] as const;

export const PRINT_SERVICES = [
  { label: "演出海报",   color: "C" as const },
  { label: "专辑封套",   color: "M" as const },
  { label: "丝网印刷",   color: "Y" as const },
  { label: "周边商品",   color: "K" as const },
] as const;

export const SOCIAL_LINKS = [
  { label: "WEIBO",     href: "#" },
  { label: "BILIBILI",  href: "#" },
  { label: "INSTAGRAM", href: "#" },
  { label: "SPOTIFY",   href: "#" },
  { label: "BANDCAMP",  href: "#" },
] as const;
