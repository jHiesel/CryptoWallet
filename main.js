const app = Vue.createApp({
    data() {
        return {

        }
    },
    methods: {
        async loadData() {
            //TODO export the method to childern maybe try to export vars so you don't need to call the methods
            const response = await fetch("https://api.bitpanda.com/v1/ticker");
            const json =  JSON.stringify(await response.json());
            this.courses = JSON.parse(json);
        }
    },
    mounted() {

    },
})
