import { defineStore } from "pinia";
import espn from '@/assets/channelLogos/aa6ixngxy.webp'

export const useChannelsStore = defineStore("channels", {
  state: () => ({
    channels: [] as { id: number; name: string; logo: string }[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchChannels() {
      this.loading = true;
      this.error = null;

      try {
        // بيانات ثابتة للقنوات
        const staticChannels = [
          {
            id: 1,
            name: "ESPN Channel",
            logo: espn
          },
               {
            id: 1,
            name: "ESPN Channel",
            logo: espn
          },
               {
            id: 1,
            name: "ESPN Channel",
            logo: espn
          },
               {
            id: 1,
            name: "ESPN Channel",
            logo: espn
          },
               {
            id: 1,
            name: "ESPN Channel",
            logo: espn
          },
               {
            id: 1,
            name: "ESPN Channel",
            logo: espn
          },
               {
            id: 1,
            name: "ESPN Channel",
            logo: espn
          },
               {
            id: 1,
            name: "ESPN Channel",
            logo: espn
          },
               {
            id: 1,
            name: "ESPN Channel",
            logo: espn
          },
               {
            id: 1,
            name: "ESPN Channel",
            logo: espn
          },
               {
            id: 1,
            name: "ESPN Channel",
            logo: espn
          },
               {
            id: 1,
            name: "ESPN Channel",
            logo: espn
          },
               {
            id: 1,
            name: "ESPN Channel",
            logo: espn
          },
               {
            id: 1,
            name: "ESPN Channel",
            logo: espn
          },
               {
            id: 1,
            name: "ESPN Channel",
            logo: espn
          },
               {
            id: 1,
            name: "ESPN Channel",
            logo: espn
          },
       

        ];

        // محاكاة تأخير بسيط للواقعية
        await new Promise(resolve => setTimeout(resolve, 500));
        
        this.channels = staticChannels; 
      } catch (err) {
        this.error = "حدث خطأ أثناء جلب القنوات";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
});

