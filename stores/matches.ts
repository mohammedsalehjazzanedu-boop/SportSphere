import { defineStore } from "pinia";
import Ac from '@/assets/teams/AC-Milan-Logo-768x432.png'
import barcelona from '@/assets/teams/Barcelona-Logo666-640x400.png'
import realmadrid from '@/assets/teams/Real-Madrid-logo-768x512.png'
import laliga from '@/assets/door/download (1).png'
import atletico from '@/assets/teams/Atletico-Madrid-Logo-640x400.png'
import sevilla from '@/assets/teams/Sevilla-Logo-640x400.png'
import Athletic_Bilbao from '@/assets/teams/Athletic-Bilbao-Logo-768x432.png'
import valencia from '@/assets/teams/Valencia-Logo-640x400.png'
import real_betis from '@/assets/teams/Real-Betis-Logo-tumb-1.png'
import real from '@/assets/teams/Real-Sociedad-Logo-tumb.png'
import prem_leg from '@/assets/door/download.png'
import Arsenal from '@/assets/teams/Arsenal-Logo.jpg'
import Chelsea from '@/assets/teams/Chelsea-Logo-640x400.png'
import Crystal from '@/assets/teams/Crystal-Palace-logo-768x432.png'
import Liverpool from '@/assets/teams/Logo-Liverpool-640x400.png'
import Manchester_City from '@/assets/teams/Manchester-City-Logo.jpg'
import Manchester_United from '@/assets/teams/Manchester-United-Logo.jpg'
import BVB from '@/assets/teams/BVB-Logo-768x650.png'
import Bayern_Munchen from '@/assets/teams/Bayern-Munchen-Logo-thumb-140x88.png'
import Tottenham from '@/assets/teams/Tottenham-Hotspur-Logo-tumb-140x88.png'
import Inter from '@/assets/teams/Inter-Milan-logo-768x432.png'
import Juventus from '@/assets/teams/Juventus-logo-768x432.png'
import Roma from '@/assets/teams/Roma-Logo-640x400.png'
import german from '@/assets/door/download (4).png'
import monaco from '@/assets/teams/as-monaco-logo.svg'
import PSG from '@/assets/teams/PSG-Logo-640x400.png'
import Olympique from '@/assets/teams/Olympique-de-Marseille-Logo-700x394.png'
import Lille from '@/assets/teams/Lille-Olympique-logo-768x512.png'
import france from '@/assets/door/download (3).png'
import italy from '@/assets/door/download (2).png' 






interface Match {
  id: number;
  slug: string;
  championsLogo: string;
  homeTeamName: string;
  awayTeamName: string;
  homeTeamLogoUrl: string;
  awayTeamLogoUrl: string;
  championshipName: string;
  homeScore: number | null;
  awayScore: number | null;
  matchStatusName: string;
  startAt: string;
  timeLeftToStart: number;
  tvChannelName: string | null;
  tvChannelId: number | null;
}

// بيانات ثابتة للمباريات حسب التاريخ
const getStaticMatches = (date: string): Match[] => {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayDate = yesterday.toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDate = tomorrow.toISOString().split('T')[0];

  // مباريات اليوم
  if (date === today) {
    return [
      {
        id: 33,
        slug: "psg-vs-marseille",
        championsLogo: france,
        homeTeamName: "باريس سان جيرمان",
        awayTeamName: "مارسيليا",
        homeTeamLogoUrl: PSG,
        awayTeamLogoUrl: Olympique,
        championshipName: "الدوري الفرنسي",
        homeScore: 1,
        awayScore: 0,
        matchStatusName: "ended",
        startAt: `${yesterdayDate}T17:00:00`,
        timeLeftToStart: 0,
        tvChannelName: "قناة بي إن سبورت",
        tvChannelId: 1
      },
      {
        id: 34,
        slug: "monaco-vs-lyon",
        championsLogo: france,
        homeTeamName: "موناكو",
        awayTeamName: "ليون",
        homeTeamLogoUrl: monaco,
        awayTeamLogoUrl: Lille,
        championshipName: "الدوري الفرنسي",
        homeScore: 2,
        awayScore: 1,
        matchStatusName: "ended",
        startAt: `${yesterdayDate}T18:00:00`,
        timeLeftToStart: 0,
        tvChannelName: "قناة بي إن سبورت",
        tvChannelId: 1
      },
   
      // الدوري الإسباني - 8 مباريات
      {
        id: 9,
        slug: "real-madrid-vs-barcelona",
        championsLogo: laliga,
        homeTeamName: "ريال مدريد",
        awayTeamName: "برشلونة",
        homeTeamLogoUrl: realmadrid,
        awayTeamLogoUrl: barcelona,
        championshipName: "الدوري الإسباني",
        homeScore: null,
        awayScore: null,
        matchStatusName: "live",
        startAt: `${today}T18:30:00`,
        timeLeftToStart: 0,
        tvChannelName: "قناة بي إن سبورت",
        tvChannelId: 1
      },
      {
        id: 10,
        slug: "atletico-vs-sevilla",
        championsLogo: "https://via.placeholder.com/50/0000FF/FFFFFF?text=LaLiga",
        homeTeamName: "أتلتيكو مدريد",
        awayTeamName: "إشبيلية",
        homeTeamLogoUrl: atletico,
        awayTeamLogoUrl: sevilla,
        championshipName: "الدوري الإسباني",
        homeScore: 2,
        awayScore: 0,
        matchStatusName: "ended",
        startAt: `${today}T17:00:00`,
        timeLeftToStart: 0,
        tvChannelName: "قناة بي إن سبورت",
        tvChannelId: 1
      },
      {
        id: 11,
        slug: "valencia-vs-villarreal",
        championsLogo: "https://via.placeholder.com/50/0000FF/FFFFFF?text=LaLiga",
        homeTeamName: "فالنسيا",
        awayTeamName: "اتليتيك بلباو",
        homeTeamLogoUrl: Athletic_Bilbao,
        awayTeamLogoUrl: valencia,
        championshipName: "الدوري الإسباني",
        homeScore: null,
        awayScore: null,
        matchStatusName: "not_started",
        startAt: `${today}T19:00:00`,
        timeLeftToStart: 3600,
        tvChannelName: "قناة بي إن سبورت",
        tvChannelId: 1
      },
      {
        id: 12,
        slug: "real-sociedad-vs-betis",
        championsLogo: "https://via.placeholder.com/50/0000FF/FFFFFF?text=LaLiga",
        homeTeamName: "ريال سوسيداد",
        awayTeamName: "ريال بيتيس",
        homeTeamLogoUrl: real_betis,
        awayTeamLogoUrl:real,
        championshipName: "الدوري الإسباني",
        homeScore: null,
        awayScore: null,
        matchStatusName: "not_started",
        startAt: `${today}T20:00:00`,
        timeLeftToStart: 7200,
        tvChannelName: "قناة بي إن سبورت",
        tvChannelId: 1
      },
            // الدوري الإيطالي - 8 مباريات
      {
        id: 57,
        slug: "juventus-vs-inter",
        championsLogo: italy,
        homeTeamName: "يوفنتوس",
        awayTeamName: "إنتر ميلان",
        homeTeamLogoUrl: Juventus,
        awayTeamLogoUrl: Inter,
        championshipName: "الدوري الإيطالي",
        homeScore: null,
        awayScore: null,
        matchStatusName: "not_started",
        startAt: `${tomorrowDate}T18:00:00`,
        timeLeftToStart: 93600,
        tvChannelName: "قناة بي إن سبورت",
        tvChannelId: 1
      },
      {
        id: 58,
        slug: "ac-milan-vs-napoli",
        championsLogo: "https://via.placeholder.com/50/0000FF/FFFFFF?text=SerieA",
        homeTeamName: "إيه سي ميلان",
        awayTeamName: "روما",
        homeTeamLogoUrl: Ac,
        awayTeamLogoUrl: Roma,
        championshipName: "الدوري الإيطالي",
        homeScore: null,
        awayScore: null,
        matchStatusName: "not_started",
        startAt: `${tomorrowDate}T19:00:00`,
        timeLeftToStart: 97200,
        tvChannelName: "قناة بي إن سبورت",
        tvChannelId: 1
      },
      // الدوري الإنجليزي الممتاز - 8 مباريات
      {
        id: 17,
        slug: "manchester-city-vs-liverpool",
        championsLogo: prem_leg,
        homeTeamName: "مانشستر سيتي",
        awayTeamName: "ليفربول",
        homeTeamLogoUrl: Manchester_City,
        awayTeamLogoUrl: Liverpool,
        championshipName: "الدوري الإنجليزي الممتاز",
        homeScore: null,
        awayScore: null,
        matchStatusName: "not_started",
        startAt: `${today}T19:30:00`,
        timeLeftToStart: 5400,
        tvChannelName: "قناة الكأس",
        tvChannelId: 2
      },
      {
        id: 18,
        slug: "arsenal-vs-chelsea",
        championsLogo: "https://via.placeholder.com/50/000000/FFFFFF?text=EPL",
        homeTeamName: "أرسنال",
        awayTeamName: "تشيلسي",
        homeTeamLogoUrl:Arsenal,
        awayTeamLogoUrl: Chelsea,
        championshipName: "الدوري الإنجليزي الممتاز",
        homeScore: 3,
        awayScore: 1,
        matchStatusName: "ended",
        startAt: `${today}T17:00:00`,
        timeLeftToStart: 0,
        tvChannelName: "قناة بي إن سبورت",
        tvChannelId: 1
      },
      {
        id: 19,
        slug: "manchester-united-vs-tottenham",
        championsLogo: "https://via.placeholder.com/50/000000/FFFFFF?text=EPL",
        homeTeamName: "مانشستر يونايتد",
        awayTeamName: "كريستال بالاس",
        homeTeamLogoUrl: Manchester_United,
        awayTeamLogoUrl: Crystal,
        championshipName: "الدوري الإنجليزي الممتاز",
        homeScore: null,
        awayScore: null,
        matchStatusName: "live",
        startAt: `${today}T18:00:00`,
        timeLeftToStart: 0,
        tvChannelName: "قناة بي إن سبورت",
        tvChannelId: 1
      },
  // الدوري الالماني الممتاز - 8 مباريات
      {
        id: 17,
        slug: "manchester-city-vs-liverpool",
        championsLogo: german,
        homeTeamName: " بايرن ميونخ",
        awayTeamName: "بوروسيا دورتموند",
        homeTeamLogoUrl: Bayern_Munchen,
        awayTeamLogoUrl: BVB,
        championshipName: "الدوري الالماني الممتاز",
        homeScore: null,
        awayScore: null,
        matchStatusName: "not_started",
        startAt: `${today}T19:30:00`,
        timeLeftToStart: 5400,
        tvChannelName: "قناة الكأس",
        tvChannelId: 2
      },
    ];
  }

  // مباريات الأمس
  if (date === yesterdayDate) {
    return [
            // الدوري الإيطالي - 8 مباريات
      {
        id: 57,
        slug: "juventus-vs-inter",
        championsLogo: italy,
        homeTeamName: "يوفنتوس",
        awayTeamName: "إنتر ميلان",
        homeTeamLogoUrl: Juventus,
        awayTeamLogoUrl: Inter,
        championshipName: "الدوري الإيطالي",
        homeScore: null,
        awayScore: null,
        matchStatusName: "not_started",
        startAt: `${tomorrowDate}T18:00:00`,
        timeLeftToStart: 93600,
        tvChannelName: "قناة بي إن سبورت",
        tvChannelId: 1
      },
      {
        id: 58,
        slug: "ac-milan-vs-napoli",
        championsLogo: "https://via.placeholder.com/50/0000FF/FFFFFF?text=SerieA",
        homeTeamName: "إيه سي ميلان",
        awayTeamName: "روما",
        homeTeamLogoUrl: Ac,
        awayTeamLogoUrl: Roma,
        championshipName: "الدوري الإيطالي",
        homeScore: null,
        awayScore: null,
        matchStatusName: "not_started",
        startAt: `${tomorrowDate}T19:00:00`,
        timeLeftToStart: 97200,
        tvChannelName: "قناة بي إن سبورت",
        tvChannelId: 1
      },
      // الدوري الفرنسي - 8 مباريات
      {
        id: 33,
        slug: "psg-vs-marseille",
        championsLogo: france,
        homeTeamName: "باريس سان جيرمان",
        awayTeamName: "مارسيليا",
        homeTeamLogoUrl: PSG,
        awayTeamLogoUrl: Olympique,
        championshipName: "الدوري الفرنسي",
        homeScore: 1,
        awayScore: 0,
        matchStatusName: "ended",
        startAt: `${yesterdayDate}T17:00:00`,
        timeLeftToStart: 0,
        tvChannelName: "قناة بي إن سبورت",
        tvChannelId: 1
      },
      {
        id: 34,
        slug: "monaco-vs-lyon",
        championsLogo: france,
        homeTeamName: "موناكو",
        awayTeamName: "ليون",
        homeTeamLogoUrl: monaco,
        awayTeamLogoUrl: Lille,
        championshipName: "الدوري الفرنسي",
        homeScore: 2,
        awayScore: 1,
        matchStatusName: "ended",
        startAt: `${yesterdayDate}T18:00:00`,
        timeLeftToStart: 0,
        tvChannelName: "قناة بي إن سبورت",
        tvChannelId: 1
      },
    ];
  }

  // مباريات الغد
  if (date === tomorrowDate) {
    return [

            // الدوري الإيطالي - 8 مباريات
      {
        id: 57,
        slug: "juventus-vs-inter",
        championsLogo:italy,
        homeTeamName: "يوفنتوس",
        awayTeamName: "إنتر ميلان",
        homeTeamLogoUrl: Juventus,
        awayTeamLogoUrl: Inter,
        championshipName: "الدوري الإيطالي",
        homeScore: null,
        awayScore: null,
        matchStatusName: "not_started",
        startAt: `${tomorrowDate}T18:00:00`,
        timeLeftToStart: 93600,
        tvChannelName: "قناة بي إن سبورت",
        tvChannelId: 1
      },
      {
        id: 58,
        slug: "ac-milan-vs-napoli",
        championsLogo: "https://via.placeholder.com/50/0000FF/FFFFFF?text=SerieA",
        homeTeamName: "إيه سي ميلان",
        awayTeamName: "روما",
        homeTeamLogoUrl: Ac,
        awayTeamLogoUrl: Roma,
        championshipName: "الدوري الإيطالي",
        homeScore: null,
        awayScore: null,
        matchStatusName: "not_started",
        startAt: `${tomorrowDate}T19:00:00`,
        timeLeftToStart: 97200,
        tvChannelName: "قناة بي إن سبورت",
        tvChannelId: 1
      },
      // الدوري الفرنسي - 8 مباريات
      {
        id: 33,
        slug: "psg-vs-marseille",
        championsLogo: france,
        homeTeamName: "باريس سان جيرمان",
        awayTeamName: "مارسيليا",
        homeTeamLogoUrl: PSG,
        awayTeamLogoUrl: Olympique,
        championshipName: "الدوري الفرنسي",
        homeScore: 1,
        awayScore: 0,
        matchStatusName: "ended",
        startAt: `${yesterdayDate}T17:00:00`,
        timeLeftToStart: 0,
        tvChannelName: "قناة بي إن سبورت",
        tvChannelId: 1
      },
      {
        id: 34,
        slug: "monaco-vs-lyon",
        championsLogo: france,
        homeTeamName: "موناكو",
        awayTeamName: "ليون",
        homeTeamLogoUrl: monaco,
        awayTeamLogoUrl: Lille,
        championshipName: "الدوري الفرنسي",
        homeScore: 2,
        awayScore: 1,
        matchStatusName: "ended",
        startAt: `${yesterdayDate}T18:00:00`,
        timeLeftToStart: 0,
        tvChannelName: "قناة بي إن سبورت",
        tvChannelId: 1
      },
    ];
  }

  // إذا لم يكن التاريخ أحد التواريخ المذكورة، نعيد قائمة فارغة
  return [];
};

export const useMatchesStore = defineStore("matches", {
  state: () => ({
    matches: [] as Match[],
    loading: false,
    error: null as string | null,
    selectedDate: new Date().toISOString().split('T')[0]
  }),

  getters: {
    groupedMatches: (state) => {
      // تجميع المباريات حسب البطولة
      return state.matches.reduce((groups, match) => {
        const group = groups[match.championshipName] || [];
        group.push(match);
        groups[match.championshipName] = group;
        return groups;
      }, {} as Record<string, Match[]>);
    },
    
    todayMatches: (state) => {
      const today = new Date().toISOString().split('T')[0];
      return state.matches.filter(match => match.startAt.split('T')[0] === today);
    },
    
    tomorrowMatches: (state) => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowDate = tomorrow.toISOString().split('T')[0];
      return state.matches.filter(match => match.startAt.split('T')[0] === tomorrowDate);
    },
    
    yesterdayMatches: (state) => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayDate = yesterday.toISOString().split('T')[0];
      return state.matches.filter(match => match.startAt.split('T')[0] === yesterdayDate);
    }
  },

  actions: {
    async fetchMatches(date: string) {
      this.loading = true;
      this.error = null;

      try {
        // محاكاة تأخير بسيط للواقعية
        await new Promise(resolve => setTimeout(resolve, 300));

        // استخدام البيانات الثابتة
        this.matches = getStaticMatches(date);
        this.selectedDate = date;
      } catch (err) {
        this.error = "حدث خطأ في تحميل المباريات";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    // دالة لجلب مباريات اليوم
    async fetchTodayMatches() {
      const today = new Date().toISOString().split('T')[0];
      await this.fetchMatches(today);
    },

    // دالة لجلب مباريات الغد
    async fetchTomorrowMatches() {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowDate = tomorrow.toISOString().split('T')[0];
      await this.fetchMatches(tomorrowDate);
    },

    // دالة لجلب مباريات الأمس
    async fetchYesterdayMatches() {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayDate = yesterday.toISOString().split('T')[0];
      await this.fetchMatches(yesterdayDate);
    }
  },
});
