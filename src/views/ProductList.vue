<template>
  <v-card>
    <v-card-title>
      Estoque
      <v-spacer></v-spacer>
      <v-text-field v-model="search" label="Procurar" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="products" :search="search"  :single-expand=true show-expand>  

    <template v-slot:top>
        <div class="text-right mr-4">
            <v-dialog v-model="dialogAdd" width="500">
            <template v-slot:activator="{ on }">
                <v-btn color="blue darken-3" dark v-on="on" @click="clear()">Adicionar novo produto</v-btn>
            </template>
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>Adicionar novo produto</v-card-title>

                <v-card-text>
                <v-text-field required label="Nome do produto" v-model='prodEditName'></v-text-field>
                <v-text-field type='number' step='0.01' label="Preço unitário" prefix="R$" v-model='prodEditPrice'></v-text-field>
                <v-text-field type='number' label="Quantidade de produtos em estoque" v-model='prodEditQtd'></v-text-field>
                <v-text-field label="Descrição do produto (opcional)" v-model='prodEditDesc'></v-text-field>
                </v-card-text>
                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-2" text @click="addProduct()">Adicionar produto</v-btn>
                <v-btn color="red" text @click="dialogAdd = false">Cancelar</v-btn>
                </v-card-actions>
                
                
            </v-card>
            </v-dialog>
    </div>
    
    </template>

        <template v-slot:item.productQtd="{ item }">
            <v-btn icon> <v-icon >add</v-icon> </v-btn>
            <span> {{ item.productQtd }} </span>
            <v-btn icon> <v-icon>remove</v-icon> </v-btn> 
            
        </template>

        <template v-slot:item.productTotal="{ item }">
            {{ item.productTotal = (item.productPrice * item.productQtd).toFixed(2) }}
        </template>

        <template v-slot:expanded-item="{ item }">
            <td :colspan="headers.length" class="pa-4"> {{ item.productDescription}} </td>
        </template>

        <template v-slot:item.actions="{ item }">
            <v-btn icon> <v-icon>info</v-icon> </v-btn>
            <v-btn icon @click="getEditProdut(item)"> <v-icon>edit</v-icon> </v-btn>
            <v-btn icon @click="getDeleteProduct(item)"> <v-icon>delete</v-icon> </v-btn>
        </template>
        <!-- Todo: dialog box when clicking edit/delete -->
    </v-data-table>

    <!-- ********** DIALOGS ********** -->
        <!-- Delete -->
        <v-dialog v-model="dialogDelete" width="500">
            <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>Deletar produto</v-card-title>
    
            <v-card-text class="subtitle-1">Deseja mesmo deletar o produto "{{ prodDeleteName }}"?</v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="red" text @click="removeProduct()">Deletar</v-btn>
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
                <v-text-field required label="Nome do produto" v-model='prodEditName'></v-text-field>
                <v-text-field type='number' step='0.01' label="Preço unitário" prefix="R$" v-model='prodEditPrice'></v-text-field>
                <v-text-field type='number' label="Quantidade de produtos em estoque" v-model='prodEditQtd'></v-text-field>
                <v-text-field label="Descrição do produto (opcional)" v-model='prodEditDesc'></v-text-field>
                </v-card-text>
                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-2" text @click="saveEdit()">Salvar</v-btn>
                <v-btn color="red" text @click="dialogEdit = false">Cancelar</v-btn>
                </v-card-actions>
                
                
            </v-card>
        </v-dialog>
  </v-card>
</template>
<script>

export default {
    name: "ProductList",
    data () {
      return {
        dialogEdit: false,
        dialogDelete: false,
        dialogAdd: false,
        prodDeleteName: '',

        prodIndex: 0,
        
        prodEditName: '',
        prodEditPrice: 0,
        prodEditQtd: 0,
        prodEditDesc: '',
        search: '',
        headers: [{ text: 'ID', align: 'left', value: 'id'},
          { text: 'Nome do produto', value: 'productName'},
          { text: 'Preço por item', value: 'productPrice' },
          { text: 'Estoque atual', value: 'productQtd' },
          { text: 'Valor total', value: 'productTotal' },
          { text: 'Ações', align: 'center', sortable: false, value: 'actions'},
        ],
        products: [{
            id: 1,
            productName: 'Produto1',
            productPrice: 50,
            productQtd: 6,
            productTotal: 0,
            productDescription: "Descrição do produto 1"
          },
          {
            id: 2,
            productName: 'Produto2',
            productPrice: 15.75,
            productQtd: 9,
            productTotal: 0,
            productDescription: "Descrição do produto 2"
          },
          {
            id: 3,
            productName: 'Produto3',
            productPrice: 6.99,
            productQtd: 16,
            productTotal: 0,
            productDescription: "Descrição do produto 3"
          },
          {
            id: 4,
            productName: 'Produto4',
            productPrice: 150,
            productQtd: 3,
            productTotal: 0,
            productDescription: "Descrição do produto 4"
          },
          {
            id: 5,
            productName: 'Produto5',
            productPrice: 20,
            productQtd: 4,
            productTotal: 0,
            productDescription: "Descrição do produto 5"
          },
          {
            id: 6,
            productName: 'Produto6',
            productPrice: 37.58,
            productQtd: 11,
            productTotal: 0,
            productDescription: "Descrição do produto 6"
          },
          {
            id: 7,
            productName: 'Produto7',
            productPrice: 22,
            productQtd: 66,
            productTotal: 0,
            productDescription: "Descrição do produto 7"
          },
          {
            id: 8,
            productName: 'Produto8',
            productPrice: 40,
            productQtd: 32,
            productTotal: 0,
            productDescription: "Descrição do produto 8"
          },
          {
            id: 9,
            productName: 'Produto9',
            productPrice: 25,
            productQtd: 25,
            productTotal: 0,
            productDescription: "Descrição do produto 9"
          },
          {
            id: 10,
            productName: 'Produto10',
            productPrice: 5,
            productQtd: 150,
            productTotal: 0,
            productDescription: "Descrição do produto 10"
          },
        ],
      }
    },
    methods:{
        getDeleteProduct(item){
            this.prodDeleteName = item.productName;
            this.prodIndex = this.products.indexOf(item);
            this.dialogDelete = true;
        },

        removeProduct(){
            this.products.splice(this.prodIndex, 1);
            this.dialogDelete = false;
        },

        getEditProdut(item){
            this.prodEditName = item.productName;
            this.prodEditPrice = item.productPrice;
            this.prodEditQtd = item.productQtd;
            this.prodEditDesc = item.productDescription;
            this.prodIndex = this.products.indexOf(item);
            this.dialogEdit = true;
        },
        saveEdit(){
            this.products[this.prodIndex].productName = this.prodEditName;
            this.products[this.prodIndex].productPrice = this.prodEditPrice;
            this.products[this.prodIndex].productQtd = this.prodEditQtd;
            this.products[this.prodIndex].productDescription = this.prodEditDesc;
            this.dialogEdit = false;
        },
        addProduct(){
            let maxID = this.products.length+1;
            let newProd = {
                id: maxID,
                productName: this.prodEditName,
                productPrice: this.prodEditPrice,
                productQtd: this.prodEditQtd,
                productTotal: 0,
                productDescription: this.prodEditDesc
            }
            this.products.push(newProd);
            this.dialogAdd = false;
        },

        clear(){
            this.prodEditName = '',
            this.prodEditPrice = '',
            this.prodEditQtd =  '',
            this.prodEditDesc = ''
        }
    }
}
</script>

<style scoped>

form{
    padding: 10px;
}
</style>