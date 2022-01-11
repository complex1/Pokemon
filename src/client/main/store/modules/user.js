import userApi from "@/api/userApi"
export default {
    namespaced: true,
    state: {
        userDetails: {}
    },
    getters: {
        userDetails(state) {
            return state.userDetails;
        }
    },
    mutations: {
        setUserDetails(state, userDetails) {
            state.userDetails = userDetails;
        }
    },
    actions: {
        getUserDetails({ commit }) {
            userApi.getUserDetails(
                (response) => {
                    commit("setUserDetails", response.data)
                },
                (error) => {
                    console.log(error)
                }
            )
        }
    }
}