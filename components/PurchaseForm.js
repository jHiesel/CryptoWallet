app.component('purchase-form', {
    props: {
        currency:{
            required: true
        }
    },
    template:
    /*html*/
        `
<form class="wallet-form">
    <h2>Cryptowährung Kaufen</h2>
        
            <label for="currency">Cryptowährung</label>
            <select id="currency">
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
            currency : 0

        }
    },
    methods: {
        async test() {

            const response = await fetch("https://api.bitpanda.com/v1/ticker");
            const json =  JSON.stringify(await response.json())  ;
            this.courses = JSON.parse(json);

        },
        updateAmount (){
            var currentSelection = document.getElementById( "currency" );
            var ruffCut= currentSelection.options[currentSelection.selectedIndex ].value;
            this.currency = this.courses[ruffCut.substring(0,3)]["EUR"]*this.amount;
        }

    },
    mounted() {
        this.test();
    },
    computed: {

    }

})
