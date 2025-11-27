import { defineStore } from 'pinia';

export interface Match {
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
  venue?: string;
  formation?: string;
}

// بيانات ثابتة للمباريات حسب ID
const staticMatchesData: { [key: number]: Match } = {
  1: {
    id: 1,
    slug: "al-hilal-vs-al-nassr",
    championsLogo: "https://via.placeholder.com/50/FF0000/FFFFFF?text=SPL",
    homeTeamName: "الهلال",
    awayTeamName: "النصر",
    homeTeamLogoUrl: "https://via.placeholder.com/100/0066CC/FFFFFF?text=HIL",
    awayTeamLogoUrl: "https://via.placeholder.com/100/FFD700/000000?text=NAS",
    championshipName: "دوري المحترفين السعودي",
    homeScore: 2,
    awayScore: 1,
    matchStatusName: "ended",
    startAt: new Date().toISOString().split('T')[0] + "T18:00:00",
    timeLeftToStart: 0,
    tvChannelName: "قناة بي إن سبورت",
    tvChannelId: 1,
    venue: "ملعب الملك فهد الدولي",
    formation: "4-3-3"
  },
  2: {
    id: 2,
    slug: "real-madrid-vs-barcelona",
    championsLogo: "https://via.placeholder.com/50/0000FF/FFFFFF?text=LaLiga",
    homeTeamName: "ريال مدريد",
    awayTeamName: "برشلونة",
    homeTeamLogoUrl: "https://via.placeholder.com/100/FFFFFF/000000?text=RMA",
    awayTeamLogoUrl: "https://via.placeholder.com/100/FF0000/FFFFFF?text=FCB",
    championshipName: "الدوري الإسباني",
    homeScore: null,
    awayScore: null,
    matchStatusName: "live",
    startAt: new Date().toISOString().split('T')[0] + "T20:00:00",
    timeLeftToStart: 0,
    tvChannelName: "قناة بي إن سبورت",
    tvChannelId: 1,
    venue: "ملعب سانتياغو برنابيو",
    formation: "4-4-2"
  },
  3: {
    id: 3,
    slug: "manchester-city-vs-liverpool",
    championsLogo: "https://via.placeholder.com/50/000000/FFFFFF?text=EPL",
    homeTeamName: "مانشستر سيتي",
    awayTeamName: "ليفربول",
    homeTeamLogoUrl: "https://via.placeholder.com/100/6CABDD/FFFFFF?text=MCI",
    awayTeamLogoUrl: "https://via.placeholder.com/100/FF0000/FFFFFF?text=LIV",
    championshipName: "الدوري الإنجليزي الممتاز",
    homeScore: null,
    awayScore: null,
    matchStatusName: "not_started",
    startAt: new Date().toISOString().split('T')[0] + "T22:30:00",
    timeLeftToStart: 9000,
    tvChannelName: "قناة الكأس",
    tvChannelId: 2,
    venue: "ملعب الاتحاد",
    formation: "4-3-3"
  },
  4: {
    id: 4,
    slug: "al-ittihad-vs-al-ahli",
    championsLogo: "https://via.placeholder.com/50/FF0000/FFFFFF?text=SPL",
    homeTeamName: "الاتحاد",
    awayTeamName: "الأهلي",
    homeTeamLogoUrl: "https://via.placeholder.com/100/FFD700/000000?text=ITD",
    awayTeamLogoUrl: "https://via.placeholder.com/100/FF0000/FFFFFF?text=AH",
    championshipName: "دوري المحترفين السعودي",
    homeScore: 3,
    awayScore: 2,
    matchStatusName: "ended",
    startAt: (() => {
      const date = new Date();
      date.setDate(date.getDate() - 1);
      return date.toISOString().split('T')[0] + "T18:00:00";
    })(),
    timeLeftToStart: 0,
    tvChannelName: "قناة الكأس",
    tvChannelId: 2,
    venue: "ملعب الملك عبدالله الرياضي",
    formation: "4-2-3-1"
  },
  5: {
    id: 5,
    slug: "psg-vs-marseille",
    championsLogo: "https://via.placeholder.com/50/0000FF/FFFFFF?text=Ligue1",
    homeTeamName: "باريس سان جيرمان",
    awayTeamName: "مارسيليا",
    homeTeamLogoUrl: "https://via.placeholder.com/100/0000FF/FFFFFF?text=PSG",
    awayTeamLogoUrl: "https://via.placeholder.com/100/0000FF/FFFFFF?text=OM",
    championshipName: "الدوري الفرنسي",
    homeScore: 1,
    awayScore: 0,
    matchStatusName: "ended",
    startAt: (() => {
      const date = new Date();
      date.setDate(date.getDate() - 1);
      return date.toISOString().split('T')[0] + "T20:00:00";
    })(),
    timeLeftToStart: 0,
    tvChannelName: "قناة بي إن سبورت",
    tvChannelId: 1,
    venue: "ملعب بارك دي برينس",
    formation: "4-3-3"
  },
  6: {
    id: 6,
    slug: "al-shabab-vs-al-fateh",
    championsLogo: "https://via.placeholder.com/50/FF0000/FFFFFF?text=SPL",
    homeTeamName: "الشباب",
    awayTeamName: "الفتح",
    homeTeamLogoUrl: "https://via.placeholder.com/100/000000/FFFFFF?text=SHB",
    awayTeamLogoUrl: "https://via.placeholder.com/100/FF0000/FFFFFF?text=FTH",
    championshipName: "دوري المحترفين السعودي",
    homeScore: null,
    awayScore: null,
    matchStatusName: "not_started",
    startAt: (() => {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      return date.toISOString().split('T')[0] + "T18:00:00";
    })(),
    timeLeftToStart: 86400,
    tvChannelName: "قناة الرياضية السعودية",
    tvChannelId: 5,
    venue: "ملعب الملك فهد الدولي",
    formation: "4-4-2"
  },
  7: {
    id: 7,
    slug: "bayern-vs-dortmund",
    championsLogo: "https://via.placeholder.com/50/FF0000/FFFFFF?text=Bundesliga",
    homeTeamName: "بايرن ميونخ",
    awayTeamName: "بوروسيا دورتموند",
    homeTeamLogoUrl: "https://via.placeholder.com/100/FF0000/FFFFFF?text=FCB",
    awayTeamLogoUrl: "https://via.placeholder.com/100/FFD700/000000?text=BVB",
    championshipName: "الدوري الألماني",
    homeScore: null,
    awayScore: null,
    matchStatusName: "not_started",
    startAt: (() => {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      return date.toISOString().split('T')[0] + "T20:30:00";
    })(),
    timeLeftToStart: 95400,
    tvChannelName: "قناة بي إن سبورت",
    tvChannelId: 1,
    venue: "أليانز أرينا",
    formation: "4-2-3-1"
  },
  8: {
    id: 8,
    slug: "juventus-vs-inter",
    championsLogo: "https://via.placeholder.com/50/0000FF/FFFFFF?text=SerieA",
    homeTeamName: "يوفنتوس",
    awayTeamName: "إنتر ميلان",
    homeTeamLogoUrl: "https://via.placeholder.com/100/000000/FFFFFF?text=JUV",
    awayTeamLogoUrl: "https://via.placeholder.com/100/0000FF/FFFFFF?text=INT",
    championshipName: "الدوري الإيطالي",
    homeScore: null,
    awayScore: null,
    matchStatusName: "not_started",
    startAt: (() => {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      return date.toISOString().split('T')[0] + "T22:00:00";
    })(),
    timeLeftToStart: 100800,
    tvChannelName: "قناة بي إن سبورت",
    tvChannelId: 1,
    venue: "أليانز ستاديوم",
    formation: "3-5-2"
  }
};

export const useMatchStore = defineStore('match', {
  state: () => ({
    match: null as Match | null,
    loading: false,
    error: null as string | null
  }),

  getters: {
    getMatchStatus: (state) => {
      if (!state.match) return '';
      
      switch (state.match.matchStatusName) {
        case 'ended': return 'انتهت';
        case 'live': return 'جارية الآن';
        default: return 'لم تبدأ';
      }
    },

    getFormattedTime: (state) => {
      if (!state.match) return '';
      
      return new Date(state.match.startAt).toLocaleTimeString('ar-EG', {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  },

  actions: {
    async fetchMatchById(matchId: number) {
      this.loading = true;
      this.error = null;

      try {
        // محاكاة تأخير بسيط للواقعية
        await new Promise(resolve => setTimeout(resolve, 300));

        // البحث عن المباراة في البيانات الثابتة
        const matchData = staticMatchesData[matchId];
        
        if (matchData) {
          this.match = matchData;
        } else {
          this.error = "المباراة غير موجودة";
        }
      } catch (error: any) {
        this.error = 'حدث خطأ في تحميل بيانات المباراة';
        console.error('Error fetching match:', error);
      } finally {
        this.loading = false;
      }
    },

    clearMatch() {
      this.match = null;
      this.error = null;
    }
  }
}); 