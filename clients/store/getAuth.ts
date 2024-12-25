// store/index.js
export const state = () => ({
    authUser: null,
});

export const mutations = {
    setAuthUser(state: any, user: any) {
        state.authUser = user;
    },
};
