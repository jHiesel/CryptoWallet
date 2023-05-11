app.component('wallet-list', {
    props: {
    },
    template:
    /*html*/
        `
        <p>All the purchases: {{allPurchases}}</p>
       
`,
    methods: {

    },
    computed: {
        async allPurchases() {
            let old = 0;
            let current = 0;
            const response = await fetch("http://localhost/01_PHP_code_SWPP/CryptoWallet/server/api.php?r=purchase");
            let outputs = await response.json();
            outputs.forEach(element =>
                element.amount  * element.price


                );
                console.log();

    }}
})
