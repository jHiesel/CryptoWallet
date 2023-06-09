app.component('purchase-form', {
    props: {
        loadedData:{
            type: Function
        },
    },
    template:
    /*html*/
        `

<form class="wallet-form" v-on:submit="postData">
    <h2>Cryptowährung Kaufen</h2>
    <p>{{test}}</p>
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
            amount: 0,
            currency : 0,
            typeCurrency:null,
            test:null,
            courses:null,



        }
    },
    methods: {

        async updateAmount() {
            var currentSelection = document.getElementById("currency");
            var ruffCut = currentSelection.options[currentSelection.selectedIndex].value;
            this.typeCurrency = ruffCut.substring(0, ruffCut.indexOf(" "));
            this.currency = await this.courses[ruffCut.substring(0, ruffCut.indexOf(" "))]["EUR"] * this.amount;

        },
        postData(){
            fetch("http://localhost/CryptoWallet/server/api.php?r=purchase",{
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
    async mounted() {
        this.courses = await this.loadedData();
    },
    computed: {



    }

})
