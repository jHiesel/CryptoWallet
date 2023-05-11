app.component('purchase-form', {
    props: {
        currency:{
            required: true
        }
    },
    template:
    /*html*/
        `
<form class="wallet-form" v-on:submit.prevent="postData">
    <h2>Cryptowährung Kaufen</h2>
        
            <label for="currency">Cryptowährung</label>
            <select id="currency" v-on:change="updateAmount()">
                <option v-for="(course, index) in courses">{{index}} {{course["EUR"]}}€</option>
            </select>
             <label for="amount">Menge :</label>
            <input class="input"
             type="number"
             step="0.01"
             name="amount"
             id="amount"
             v-on:change="updateAmount()"
             required
             v-model="amount"
            >
            <p> Wert: {{currency}}€</p>
            <input type="submit" class="button" name="submit" value="Kaufen">
            
        </form>
        `
  ,
    data() {
        return {
            courses: null,
            amount: 0,
            currency : 0,
            typeCurrency:null,


        }
    },
    methods: {
        async test() {
            const response = await fetch("https://api.bitpanda.com/v1/ticker");
            const json =  JSON.stringify(await response.json());
            this.courses = JSON.parse(json);
        },
        updateAmount (){
            var currentSelection = document.getElementById( "currency" );
            var ruffCut = currentSelection.options[currentSelection.selectedIndex ].value;
            this.typeCurrency = ruffCut.substring(0,ruffCut.indexOf(" "));
            this.currency = this.courses[ruffCut.substring(0,ruffCut.indexOf(" "))]["EUR"]*this.amount;
        },
        postData(){
            fetch("http://localhost/01_PHP_code_SWPP/CryptoWallet/server/api.php?r=purchase",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: this.purchase(),
            });
        },
        purchase(){
            let localDate
            localDate = new Date();

            localDate = localDate.toISOString().slice(0, 19).replace('T', ' ');
            
            let output = {
                date:localDate,
                amount: this.amount,
                price:this.currency,
                currency: this.typeCurrency
            };
            return JSON.stringify(output);
        }

    },
    mounted() {
        this.test();
    },
    computed: {

    }

})
