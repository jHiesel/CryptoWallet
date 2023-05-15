app.component('wallet-list', {
    props: {
    },
    template:
    /*html*/
        `
        <p>All the purchases: {{allPurchases}}€</p>
       
`,
    data() {
        return {
            allPurchases: null,



        }
    },
    async mounted() {

            let old = 0;
            let current = 0;
            let output = 0;
            const response = await fetch("http://localhost/CryptoWallet/server/api.php?r=purchase");
            let data = await response.json();

            data.forEach(function (content){
                output += content.price * content.amount

            });

            this.allPurchases = Math.round(output * 100) / 100;

    }
})
