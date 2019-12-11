<template>
  <v-card>
    <v-card-title>
      <!-- Estoque -->
      <v-spacer></v-spacer>
      <v-text-field v-model="search" label="Procurar" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="products" :search="search"  :single-expand=true show-expand>  

    <template v-slot:top>
        <div class="text-right mr-4">
            <v-dialog v-model="dialogAdd" width="500">
            <template v-slot:activator="{ on }">
                <v-btn color="green darken-2" dark v-on="on" @click="clear()">Adicionar novo produto</v-btn>
            </template>
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>Adicionar novo produto</v-card-title>

                <v-card-text>
                <v-text-field required label="Nome do produto" v-model='product.name'></v-text-field>
                <v-text-field type='number' step='0.01' label="Preço unitário" prefix="R$" v-model='product.price'></v-text-field>
                <v-text-field type='number' label="Quantidade de produtos em estoque" v-model='product.quantity'></v-text-field>
                <v-text-field label="Descrição do produto (opcional)" v-model='product.details'></v-text-field>
                </v-card-text>
                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-2" @click="addProduct(product)" text>Adicionar produto</v-btn>
                <v-btn color="red" text @click="dialogAdd = false">Cancelar</v-btn>
                </v-card-actions>
                
                
            </v-card>
            </v-dialog>
    </div>
    
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
            <span>{{ item.total = (item.price * item.quantity).toLocaleString() }}</span>
        </template>

        <template v-slot:expanded-item="{ item }">
            <td :colspan="headers.length" class="pa-4"> {{ item.details}} </td>
        </template>

        <template v-slot:item.actions="{ item }">
            <v-btn icon :to="`/productInfo/${item.id}`"> <v-icon color="blue darken-1">info</v-icon> </v-btn>
            <v-btn icon @click="getProduct(item);dialogEdit = true;"> <v-icon>edit</v-icon> </v-btn>
            <v-btn icon @click="getDelete(item)"> <v-icon color="red lighten-1 "> delete</v-icon> </v-btn>
        </template>
    </v-data-table>

    <!-- ********** DIALOGS ********** -->
        <!-- Delete -->
        <v-dialog v-model="dialogDelete" width="500">
            <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>Deletar produto</v-card-title>
    
            <v-card-text class="subtitle-1">Deseja mesmo deletar o produto "{{ prodDeleteName }}"?</v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="red" text @click="removeProduct(prodDeleted)">Deletar</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-2" text @click="dialogDelete = false">Cancelar</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Edit -->
        <v-dialog v-model="dialogEdit" width="500">
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>Editar produto</v-card-title>
                <v-card-text>
                <v-text-field required label="Nome do produto" v-model='product.name'></v-text-field>
                <v-text-field type='number' step='0.01' label="Preço unitário" prefix="R$" v-model='product.price'></v-text-field>
                <v-text-field type='number' label="Quantidade de produtos em estoque" v-model='product.quantity'></v-text-field>
                <v-text-field label="Descrição do produto (opcional)" v-model='product.details'></v-text-field>
                </v-card-text>
                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-2" text @click="addProduct(product)">Salvar</v-btn>
                <v-btn color="red" text @click="dialogEdit = false">Cancelar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
  </v-card>
</template>
<script>
import { APIService } from "@/resources/products.js";
const api = new APIService();

export default {
    name: "ProductList",
    mounted () {
      this.getProducts();
      this.getWindow();
    },
    data () {
      return {
        dialogEdit: false,
        dialogDelete: false,
        dialogAdd: false,
        prodDeleteName: '',
        wHeight: 0,
        wWidth: 0,
        product: {
          id: "",
          name: "",
          price: "",
          quantity: "",
          details: "",
        },
        prodDeleted: 0,
        search: '',
        headers: [{ text: 'Nome do produto', value: 'name'},
          { text: 'Preço por item', value: 'price' },
          { text: '', value: 'plus', align:'end', width:'150'},
          { text: 'Estoque atual', value: 'quantity', align: 'center', width:'130 '},
          { text: '', value: 'minus', align:'start', width:'150'},
          { text: 'Valor total', value: 'total' },
          { text: 'Ações', align: 'center', sortable: false, value: 'actions'},
        ],
        products: []
      }
    },
    methods:{
        getDelete(item){
            this.prodDeleteName = item.name;
            this.prodDeleted = item;
            this.dialogDelete = true;
        },

        async removeProduct(item) {
          console.log(item)
          let res = await api.deleteProduct(item).then(data => {
            if (data.status == 200) {
              this.getProducts();
            }
          })
          this.dialogDelete = false;
        },

        getProduct(item){
            this.product.name = item.name;
            this.product.price = item.price;
            this.product.quantity = item.quantity;
            this.product.details = item.details;
            this.product.id = item.id

        },
        async addProduct(item){
            let res = await api.save(item).then(data => {
              if (data.status == '200') {
                this.getProducts();
                this.dialogAdd = false;
                this.dialogEdit = false;
              }
            })
        },
        getProducts() {
          let res = api.findAllProduct().then(data => {
            this.products = data;
          });
        },
        clear(){
            this.product.name = '',
            this.product.price = '',
            this.product.quantity =  '',
            this.product.details = ''
        },
        addOne(item){
            this.getProduct(item);
            this.product.quantity++;
            this.addProduct(this.product);
        },
        removeOne(item){
            this.getProduct(item);
            this.product.quantity--;
            this.addProduct(this.product);
        },
        getWindow(){
            this.wWidth = window.innerWidth;
            this.wHeight = window.innerHeight;
        }
    },
    props:{
        item: Object
    }
}
</script>

<style scoped>

form{
    padding: 10px;
}
</style>