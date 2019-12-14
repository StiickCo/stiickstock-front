<template>
    <v-card style="width: 100%; height: 85vh; padding: 1rem">
        <div class="text-right mr-4">
            <v-btn color="green darken-2" dark>Adicionar novo time</v-btn>
        </div>
    </v-card>
</template>

<script>
import { APIService } from "@/resources/products.js";
const api = new APIService();

export default {
    name: "Teams",
    mounted () {
      this.getProduct()
    },
    data () {
      return {
        product: []
      }
    },
    methods:{
        getProduct(){
			api.findByIdProduct(this.$route.params.id).then(data => {
				this.product = data;
			});
        }
    },

}
</script>
<script>
import { APIService } from "@/resources/products.js";
const api = new APIService();

export default {
    name: "Teams",
    mounted () {
      this.getProduct()
    },
    data () {
      return {
        product: []
      }
    },
    methods:{
        getProduct(){
			api.findByIdProduct(this.$route.params.id).then(data => {
				this.product = data;
			});
        }
    },

}
</script>