<template>
    <v-card style="width: 100%; height: 85vh; padding: 1rem">
        <div class="text-right mr-4">
            <v-btn color="green darken-2" dark>Adicionar novo time</v-btn>
        </div>
        
        <v-data-table style="padding: 1rem; margin: 1rem 0 0 0" :headers="computedHeaders" :items="computedProducts"  show-expand>  
            <template v-slot:top>
                <div class="text-right mr-4"></div>
            </template>
            <template v-slot:item.plus ="{ item }">
                <v-btn  v-if="wWidth < 600" @click="addOne(item)" class="mr-n4" icon> <v-icon color="green">add</v-icon></v-btn>
                <v-btn  v-else @click="addOne(item)" class="mr-n12" icon> <v-icon color="green">add</v-icon></v-btn>
            </template>

            <template v-slot:item.quantity ="{ item }">
                <span> {{ item.quantity }} </span>
            </template>

            <template v-slot:item.minus ="{ item }">
                <v-btn v-if="wWidth >= 600" @click="removeOne(item)" class="ml-n12" icon> <v-icon color="red">remove</v-icon> </v-btn> 
                <v-btn v-else @click="removeOne(item)" class="mr-n4" icon> <v-icon color="red">remove</v-icon> </v-btn> 
            </template>

            <template v-slot:item.total="{ item }">
                <span>{{ item.total = (item.price * item.quantity) }}</span>
            </template>

            <template v-slot:expanded-item="{ item }">
                <td :colspan="headers.length" class="pa-4"> {{ item.details}} </td>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-btn icon :to="`/productInfo/${item.id}`"> <v-icon color="blue darken-1">info</v-icon> </v-btn>
            </template>
        </v-data-table>
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
        product: [],
        headers: [
          { text: 'Nome do time', value: 'teamName'},
          { text: 'Administrador', value: 'admin'},
          { text: 'Participantes', value: 'participants',},
          { text: 'Ações', value: 'actions'},
        ],
      }
    },
    methods:{
        getProduct(){
			api.findByIdProduct(this.$route.params.id).then(data => {
				this.product = data;
			});
        }
    },
    computed: {
        computedProducts(){
            if (this.filterStock){
                return this.products.filter(products => products.quantity != 0);
            }
            return this.products;
        },
        computedHeaders(){
            if (this.filterID){
                return this.headers.filter(headers => headers.text != "ID");
            }
            return this.headers;
        }
    },
}
</script>