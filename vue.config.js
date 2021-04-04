module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                    @import "@/assets/scss/variables.scss";
                `
            }
        }
    },
    chainWebpack: config => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap(options => ({
                ...options,
                compilerOptions: {
                    isCustomElement: (tag) => tag === 'ion-icon'
                }
            }));
    }
};