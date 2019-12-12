<template>
  <v-card class="mt-12" v-if="product">
    <v-card-title class="headline">{{product.name}}</v-card-title>

    <v-card-text>
      <v-layout row>
        <v-flex ml-3 xs2>
          <b>Preço por item:</b>
        </v-flex>

        <v-flex xs9>R$ {{product.price.toLocaleString()}}</v-flex>
      </v-layout>

      <v-layout row mt-3>
        <v-flex ml-3 xs2>
          <b>Quantidade em estoque:</b>
        </v-flex>

        <v-flex xs9>{{product.quantity}}</v-flex>
      </v-layout>

      <v-layout row mt-3>
        <v-flex ml-3 xs2>
          <b>Valor total em estoque:</b>
        </v-flex>

        <v-flex xs9>R$ {{(product.price * product.quantity).toLocaleString()}}</v-flex>
      </v-layout>

      <v-layout row mt-3>
        <v-flex ml-3 xs2>
          <b>Descrição do produto:</b>
        </v-flex>

        <v-flex xs9>{{product.details}}</v-flex>
      </v-layout>
      
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" dark to="/products">Voltar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { APIService } from "@/resources/products.js";
const api = new APIService();

export default {
    name: "ProductInfo",
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
    name: "ProductInfo",
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