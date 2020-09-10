export default {
    methods: {
        displayToast(variant, message) {
            this.$root.$bvToast.toast(message, {
                title: variant,
                variant: variant,
                solid: true,
                toaster: 'b-toaster-top-center'
            })
        }
    }
 }