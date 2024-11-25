// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: false },
    css: ['~/assets/main.scss'],
    app: {
        head: {
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css',
                },
                {
                    rel: 'stylesheet',
                    href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css',
                },
            ],
        },
    },
});
