import { defineStore } from "pinia";

interface Channel {
  id: number;
  name: string;
  logo: string;
  stream_url: string[];
  description: string;
  image1_url: string;
  image2_url: string;
  created_at: string;
  updated_at: string;
  tournaments_broadcast_by_the_channel: string[];
  sources: {
    url: string;
    title: string;
    type: 'hls' | 'dash';
    drm?: {
      clearKeys?: { [key: string]: string };
      servers?: { type: 'widevine'; url: string };
    };
  }[];
}

// بيانات ثابتة للقنوات بناءً على ID
const staticChannelsData: { [key: number]: Channel } = {
  1: {
    id: 1,
    name: "قناة بي إن سبورت",
    logo: "https://via.placeholder.com/150/000000/FFFFFF?text=beIN+Sport",
    stream_url: [],
    description: "قناة beIN Sports HD هي قناة رياضية رائدة تقدم تغطية شاملة لأهم البطولات والمباريات الرياضية حول العالم. تتميز القناة بجودة بث عالية وتقديم تحليلات متخصصة من قبل نخبة من الخبراء والمحللين الرياضيين.",
    image1_url: "https://via.placeholder.com/800/400/000000/FFFFFF?text=beIN+Sports+HD",
    image2_url: "https://via.placeholder.com/800/400/000000/FFFFFF?text=beIN+Sports+HD",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tournaments_broadcast_by_the_channel: [
      "دوري أبطال أوروبا",
      "الدوري الإنجليزي الممتاز",
      "الدوري الإسباني",
      "الدوري الفرنسي",
      "كأس العالم",
      "كأس آسيا",
      "دوري أبطال آسيا"
    ],
    sources: [
      {
        url: "https://example.com/stream1.m3u8",
        title: "سيرفر 1",
        type: "hls"
      },
      {
        url: "https://example.com/stream2.m3u8",
        title: "سيرفر 2",
        type: "hls"
      }
    ]
  },
  2: {
    id: 2,
    name: "قناة الكأس",
    logo: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Al+Kass",
    stream_url: [],
    description: "قناة الكأس هي قناة رياضية متخصصة في تغطية البطولات العربية والخليجية، مع تركيز خاص على كرة القدم والرياضات الشعبية في المنطقة.",
    image1_url: "https://via.placeholder.com/800/400/FF0000/FFFFFF?text=Al+Kass",
    image2_url: "https://via.placeholder.com/800/400/FF0000/FFFFFF?text=Al+Kass",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tournaments_broadcast_by_the_channel: [
      "دوري المحترفين السعودي",
      "كأس الملك",
      "دوري الخليج العربي",
      "كأس العرب"
    ],
    sources: [
      {
        url: "https://example.com/kass1.m3u8",
        title: "سيرفر 1",
        type: "hls"
      }
    ]
  },
  3: {
    id: 3,
    name: "قناة أبو ظبي الرياضية",
    logo: "https://via.placeholder.com/150/0066CC/FFFFFF?text=AD+Sports",
    stream_url: [],
    description: "قناة أبو ظبي الرياضية تقدم تغطية شاملة للرياضات المختلفة مع التركيز على البطولات المحلية والإقليمية والدولية.",
    image1_url: "https://via.placeholder.com/800/400/0066CC/FFFFFF?text=AD+Sports",
    image2_url: "https://via.placeholder.com/800/400/0066CC/FFFFFF?text=AD+Sports",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tournaments_broadcast_by_the_channel: [
      "دوري الخليج العربي",
      "كأس الاتحاد الآسيوي",
      "البطولات المحلية"
    ],
    sources: [
      {
        url: "https://example.com/adsports1.m3u8",
        title: "سيرفر 1",
        type: "hls"
      }
    ]
  },
  4: {
    id: 4,
    name: "قناة دبي الرياضية",
    logo: "https://via.placeholder.com/150/FF6600/FFFFFF?text=Dubai+Sports",
    stream_url: [],
    description: "قناة دبي الرياضية تقدم برامج رياضية متنوعة وتغطية حية للمباريات والبطولات المحلية والدولية.",
    image1_url: "https://via.placeholder.com/800/400/FF6600/FFFFFF?text=Dubai+Sports",
    image2_url: "https://via.placeholder.com/800/400/FF6600/FFFFFF?text=Dubai+Sports",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tournaments_broadcast_by_the_channel: [
      "دوري الخليج العربي",
      "البطولات المحلية"
    ],
    sources: [
      {
        url: "https://example.com/dubai1.m3u8",
        title: "سيرفر 1",
        type: "hls"
      }
    ]
  },
  5: {
    id: 5,
    name: "قناة الرياضية السعودية",
    logo: "https://via.placeholder.com/150/006600/FFFFFF?text=Saudi+Sports",
    stream_url: [],
    description: "القناة الرياضية السعودية هي القناة الرسمية للرياضة في المملكة العربية السعودية، تقدم تغطية شاملة للبطولات المحلية والدولية.",
    image1_url: "https://via.placeholder.com/800/400/006600/FFFFFF?text=Saudi+Sports",
    image2_url: "https://via.placeholder.com/800/400/006600/FFFFFF?text=Saudi+Sports",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tournaments_broadcast_by_the_channel: [
      "دوري المحترفين السعودي",
      "كأس الملك",
      "كأس ولي العهد",
      "دوري الدرجة الأولى"
    ],
    sources: [
      {
        url: "https://example.com/saudi1.m3u8",
        title: "سيرفر 1",
        type: "hls"
      }
    ]
  },
  6: {
    id: 6,
    name: "قناة أون سبورت",
    logo: "https://via.placeholder.com/150/990099/FFFFFF?text=On+Sport",
    stream_url: [],
    description: "قناة أون سبورت تقدم تغطية رياضية متنوعة مع التركيز على البطولات المصرية والعربية.",
    image1_url: "https://via.placeholder.com/800/400/990099/FFFFFF?text=On+Sport",
    image2_url: "https://via.placeholder.com/800/400/990099/FFFFFF?text=On+Sport",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tournaments_broadcast_by_the_channel: [
      "الدوري المصري",
      "كأس مصر",
      "البطولات العربية"
    ],
    sources: [
      {
        url: "https://example.com/onsport1.m3u8",
        title: "سيرفر 1",
        type: "hls"
      }
    ]
  },
  7: {
    id: 7,
    name: "قناة الرياضية السعودية",
    logo: "https://via.placeholder.com/150/006600/FFFFFF?text=Saudi+Sports",
    stream_url: [],
    description: "القناة الرياضية السعودية هي القناة الرسمية للرياضة في المملكة العربية السعودية، تقدم تغطية شاملة للبطولات المحلية والدولية.",
    image1_url: "https://via.placeholder.com/800/400/006600/FFFFFF?text=Saudi+Sports",
    image2_url: "https://via.placeholder.com/800/400/006600/FFFFFF?text=Saudi+Sports",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tournaments_broadcast_by_the_channel: [
      "دوري المحترفين السعودي",
      "كأس الملك",
      "كأس ولي العهد",
      "دوري الدرجة الأولى"
    ],
    sources: [
      {
        url: "https://example.com/saudi2.m3u8",
        title: "سيرفر 1",
        type: "hls"
      }
    ]
  },
  8: {
    id: 8,
    name: "قناة الرياضية السعودية",
    logo: "https://via.placeholder.com/150/006600/FFFFFF?text=Saudi+Sports",
    stream_url: [],
    description: "القناة الرياضية السعودية هي القناة الرسمية للرياضة في المملكة العربية السعودية، تقدم تغطية شاملة للبطولات المحلية والدولية.",
    image1_url: "https://via.placeholder.com/800/400/006600/FFFFFF?text=Saudi+Sports",
    image2_url: "https://via.placeholder.com/800/400/006600/FFFFFF?text=Saudi+Sports",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tournaments_broadcast_by_the_channel: [
      "دوري المحترفين السعودي",
      "كأس الملك",
      "كأس ولي العهد",
      "دوري الدرجة الأولى"
    ],
    sources: [
      {
        url: "https://example.com/saudi3.m3u8",
        title: "سيرفر 1",
        type: "hls"
      }
    ]
  },
  9: {
    id: 9,
    name: "قناة الرياضية السعودية",
    logo: "https://via.placeholder.com/150/006600/FFFFFF?text=Saudi+Sports",
    stream_url: [],
    description: "القناة الرياضية السعودية هي القناة الرسمية للرياضة في المملكة العربية السعودية، تقدم تغطية شاملة للبطولات المحلية والدولية.",
    image1_url: "https://via.placeholder.com/800/400/006600/FFFFFF?text=Saudi+Sports",
    image2_url: "https://via.placeholder.com/800/400/006600/FFFFFF?text=Saudi+Sports",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tournaments_broadcast_by_the_channel: [
      "دوري المحترفين السعودي",
      "كأس الملك",
      "كأس ولي العهد",
      "دوري الدرجة الأولى"
    ],
    sources: [
      {
        url: "https://example.com/saudi4.m3u8",
        title: "سيرفر 1",
        type: "hls"
      }
    ]
  },
  10: {
    id: 10,
    name: "قناة الرياضية السعودية",
    logo: "https://via.placeholder.com/150/006600/FFFFFF?text=Saudi+Sports",
    stream_url: [],
    description: "القناة الرياضية السعودية هي القناة الرسمية للرياضة في المملكة العربية السعودية، تقدم تغطية شاملة للبطولات المحلية والدولية.",
    image1_url: "https://via.placeholder.com/800/400/006600/FFFFFF?text=Saudi+Sports",
    image2_url: "https://via.placeholder.com/800/400/006600/FFFFFF?text=Saudi+Sports",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tournaments_broadcast_by_the_channel: [
      "دوري المحترفين السعودي",
      "كأس الملك",
      "كأس ولي العهد",
      "دوري الدرجة الأولى"
    ],
    sources: [
      {
        url: "https://example.com/saudi5.m3u8",
        title: "سيرفر 1",
        type: "hls"
      }
    ]
  },
  11: {
    id: 11,
    name: "قناة الرياضية السعودية",
    logo: "https://via.placeholder.com/150/006600/FFFFFF?text=Saudi+Sports",
    stream_url: [],
    description: "القناة الرياضية السعودية هي القناة الرسمية للرياضة في المملكة العربية السعودية، تقدم تغطية شاملة للبطولات المحلية والدولية.",
    image1_url: "https://via.placeholder.com/800/400/006600/FFFFFF?text=Saudi+Sports",
    image2_url: "https://via.placeholder.com/800/400/006600/FFFFFF?text=Saudi+Sports",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tournaments_broadcast_by_the_channel: [
      "دوري المحترفين السعودي",
      "كأس الملك",
      "كأس ولي العهد",
      "دوري الدرجة الأولى"
    ],
    sources: [
      {
        url: "https://example.com/saudi6.m3u8",
        title: "سيرفر 1",
        type: "hls"
      }
    ]
  },
  12: {
    id: 12,
    name: "قناة الرياضية السعودية",
    logo: "https://via.placeholder.com/150/006600/FFFFFF?text=Saudi+Sports",
    stream_url: [],
    description: "القناة الرياضية السعودية هي القناة الرسمية للرياضة في المملكة العربية السعودية، تقدم تغطية شاملة للبطولات المحلية والدولية.",
    image1_url: "https://via.placeholder.com/800/400/006600/FFFFFF?text=Saudi+Sports",
    image2_url: "https://via.placeholder.com/800/400/006600/FFFFFF?text=Saudi+Sports",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tournaments_broadcast_by_the_channel: [
      "دوري المحترفين السعودي",
      "كأس الملك",
      "كأس ولي العهد",
      "دوري الدرجة الأولى"
    ],
    sources: [
      {
        url: "https://example.com/saudi7.m3u8",
        title: "سيرفر 1",
        type: "hls"
      }
    ]
  },
  13: {
    id: 13,
    name: "قناة الرياضية السعودية",
    logo: "https://via.placeholder.com/150/006600/FFFFFF?text=Saudi+Sports",
    stream_url: [],
    description: "القناة الرياضية السعودية هي القناة الرسمية للرياضة في المملكة العربية السعودية، تقدم تغطية شاملة للبطولات المحلية والدولية.",
    image1_url: "https://via.placeholder.com/800/400/006600/FFFFFF?text=Saudi+Sports",
    image2_url: "https://via.placeholder.com/800/400/006600/FFFFFF?text=Saudi+Sports",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tournaments_broadcast_by_the_channel: [
      "دوري المحترفين السعودي",
      "كأس الملك",
      "كأس ولي العهد",
      "دوري الدرجة الأولى"
    ],
    sources: [
      {
        url: "https://example.com/saudi8.m3u8",
        title: "سيرفر 1",
        type: "hls"
      }
    ]
  },
  14: {
    id: 14,
    name: "قناة الرياضية السعودية",
    logo: "https://via.placeholder.com/150/006600/FFFFFF?text=Saudi+Sports",
    stream_url: [],
    description: "القناة الرياضية السعودية هي القناة الرسمية للرياضة في المملكة العربية السعودية، تقدم تغطية شاملة للبطولات المحلية والدولية.",
    image1_url: "https://via.placeholder.com/800/400/006600/FFFFFF?text=Saudi+Sports",
    image2_url: "https://via.placeholder.com/800/400/006600/FFFFFF?text=Saudi+Sports",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tournaments_broadcast_by_the_channel: [
      "دوري المحترفين السعودي",
      "كأس الملك",
      "كأس ولي العهد",
      "دوري الدرجة الأولى"
    ],
    sources: [
      {
        url: "https://example.com/saudi9.m3u8",
        title: "سيرفر 1",
        type: "hls"
      }
    ]
  },
  15: {
    id: 15,
    name: "قناة الرياضية السعودية",
    logo: "https://via.placeholder.com/150/006600/FFFFFF?text=Saudi+Sports",
    stream_url: [],
    description: "القناة الرياضية السعودية هي القناة الرسمية للرياضة في المملكة العربية السعودية، تقدم تغطية شاملة للبطولات المحلية والدولية.",
    image1_url: "https://via.placeholder.com/800/400/006600/FFFFFF?text=Saudi+Sports",
    image2_url: "https://via.placeholder.com/800/400/006600/FFFFFF?text=Saudi+Sports",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tournaments_broadcast_by_the_channel: [
      "دوري المحترفين السعودي",
      "كأس الملك",
      "كأس ولي العهد",
      "دوري الدرجة الأولى"
    ],
    sources: [
      {
        url: "https://example.com/saudi10.m3u8",
        title: "سيرفر 1",
        type: "hls"
      }
    ]
  },
  16: {
    id: 16,
    name: "قناة الرياضية السعودية",
    logo: "https://via.placeholder.com/150/006600/FFFFFF?text=Saudi+Sports",
    stream_url: [],
    description: "القناة الرياضية السعودية هي القناة الرسمية للرياضة في المملكة العربية السعودية، تقدم تغطية شاملة للبطولات المحلية والدولية.",
    image1_url: "https://via.placeholder.com/800/400/006600/FFFFFF?text=Saudi+Sports",
    image2_url: "https://via.placeholder.com/800/400/006600/FFFFFF?text=Saudi+Sports",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tournaments_broadcast_by_the_channel: [
      "دوري المحترفين السعودي",
      "كأس الملك",
      "كأس ولي العهد",
      "دوري الدرجة الأولى"
    ],
    sources: [
      {
        url: "https://example.com/saudi11.m3u8",
        title: "سيرفر 1",
        type: "hls"
      }
    ]
  },
  17: {
    id: 17,
    name: "قناة الرياضية السعودية",
    logo: "https://via.placeholder.com/150/006600/FFFFFF?text=Saudi+Sports",
    stream_url: [],
    description: "القناة الرياضية السعودية هي القناة الرسمية للرياضة في المملكة العربية السعودية، تقدم تغطية شاملة للبطولات المحلية والدولية.",
    image1_url: "https://via.placeholder.com/800/400/006600/FFFFFF?text=Saudi+Sports",
    image2_url: "https://via.placeholder.com/800/400/006600/FFFFFF?text=Saudi+Sports",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tournaments_broadcast_by_the_channel: [
      "دوري المحترفين السعودي",
      "كأس الملك",
      "كأس ولي العهد",
      "دوري الدرجة الأولى"
    ],
    sources: [
      {
        url: "https://example.com/saudi12.m3u8",
        title: "سيرفر 1",
        type: "hls"
      }
    ]
  },
  18: {
    id: 18,
    name: "قناة الرياضية السعودية",
    logo: "https://via.placeholder.com/150/006600/FFFFFF?text=Saudi+Sports",
    stream_url: [],
    description: "القناة الرياضية السعودية هي القناة الرسمية للرياضة في المملكة العربية السعودية، تقدم تغطية شاملة للبطولات المحلية والدولية.",
    image1_url: "https://via.placeholder.com/800/400/006600/FFFFFF?text=Saudi+Sports",
    image2_url: "https://via.placeholder.com/800/400/006600/FFFFFF?text=Saudi+Sports",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tournaments_broadcast_by_the_channel: [
      "دوري المحترفين السعودي",
      "كأس الملك",
      "كأس ولي العهد",
      "دوري الدرجة الأولى"
    ],
    sources: [
      {
        url: "https://example.com/saudi13.m3u8",
        title: "سيرفر 1",
        type: "hls"
      }
    ]
  },
  19: {
    id: 19,
    name: "قناة الرياضية السعودية",
    logo: "https://via.placeholder.com/150/006600/FFFFFF?text=Saudi+Sports",
    stream_url: [],
    description: "القناة الرياضية السعودية هي القناة الرسمية للرياضة في المملكة العربية السعودية، تقدم تغطية شاملة للبطولات المحلية والدولية.",
    image1_url: "https://via.placeholder.com/800/400/006600/FFFFFF?text=Saudi+Sports",
    image2_url: "https://via.placeholder.com/800/400/006600/FFFFFF?text=Saudi+Sports",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tournaments_broadcast_by_the_channel: [
      "دوري المحترفين السعودي",
      "كأس الملك",
      "كأس ولي العهد",
      "دوري الدرجة الأولى"
    ],
    sources: [
      {
        url: "https://example.com/saudi14.m3u8",
        title: "سيرفر 1",
        type: "hls"
      }
    ]
  },
  20: {
    id: 20,
    name: "قناة الرياضية السعودية",
    logo: "https://via.placeholder.com/150/006600/FFFFFF?text=Saudi+Sports",
    stream_url: [],
    description: "القناة الرياضية السعودية هي القناة الرسمية للرياضة في المملكة العربية السعودية، تقدم تغطية شاملة للبطولات المحلية والدولية.",
    image1_url: "https://via.placeholder.com/800/400/006600/FFFFFF?text=Saudi+Sports",
    image2_url: "https://via.placeholder.com/800/400/006600/FFFFFF?text=Saudi+Sports",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tournaments_broadcast_by_the_channel: [
      "دوري المحترفين السعودي",
      "كأس الملك",
      "كأس ولي العهد",
      "دوري الدرجة الأولى"
    ],
    sources: [
      {
        url: "https://example.com/saudi15.m3u8",
        title: "سيرفر 1",
        type: "hls"
      }
    ]
  }
};

export const useViewChannelStore = defineStore("viewChannel", {
  state: () => ({
    channel: null as Channel | null,
    loading: false,
    error: null as string | null,
    currentSourceIndex: 0,
  }),

  actions: {
    async fetchChannelById(channelId: number) {
      this.loading = true;
      this.error = null;
      this.currentSourceIndex = 0;

      try {
        // محاكاة تأخير بسيط للواقعية
        await new Promise(resolve => setTimeout(resolve, 300));

        // البحث عن القناة في البيانات الثابتة
        const channelData = staticChannelsData[channelId];
        
        if (channelData) {
          this.channel = channelData;
        } else {
          this.error = "القناة غير موجودة";
        }
      } catch (error: any) {
        this.error = "حدث خطأ في جلب بيانات القناة";
        console.error("Error fetching channel:", error);
      } finally {
        this.loading = false;
      }
    },

    setCurrentSource(index: number) {
      if (this.channel && this.channel.sources && index >= 0 && index < this.channel.sources.length) {
        this.currentSourceIndex = index;
      }
    },

    clearChannel() {
      this.channel = null;
      this.error = null;
      this.currentSourceIndex = 0;
    }
  },

  getters: {
    hasChannel: (state) => !!state.channel,
    getStreamUrl: (state) => {
      if (!state.channel) return null;
      return state.channel.sources?.[state.currentSourceIndex]?.url || null;
    },
    getCurrentDrm: (state) => {
      if (!state.channel) return null;
      return state.channel.sources?.[state.currentSourceIndex]?.drm || null;
    },
    getTournaments: (state) => state.channel?.tournaments_broadcast_by_the_channel || [],
  }
});
