app.component('app-display', {
    template:
    /*html*/
        `
          <div class="wallet-container">

            <purchase-form :loadedData="loadData"></purchase-form>

        <div class="wallet-list">
            <h2>Wallet: </h2>
            <wallet-list></wallet-list>
        </div>
    </div>  
        `

   ,
    data() {
        return {

        }
    },
    methods: {
        async loadData() {
            //TODO export the method to childern maybe try to export vars so you don't need to call the methods
            const response = await fetch("https://api.bitpanda.com/v1/ticker");
            return await response.json()   ;

        }
    }
})
