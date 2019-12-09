<template>
  <v-card>
    <v-card-title>
      Estoque
      <v-spacer></v-spacer>
      <v-text-field v-model="search" label="Procurar" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table hide-default-footer :headers="headers" :items="products" :search="search"  :single-expand=true show-expand>  
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
            <v-btn icon> <v-icon>edit</v-icon> </v-btn>
            <v-btn icon> <v-icon>delete</v-icon> </v-btn>
        </template>
        <!-- Todo: dialog box when clicking edit/delete -->
    </v-data-table>
  </v-card>
</template>
<script>
export default {
    name: "ProductList",
    data () {
      return {
        search: '',
        headers: [{ text: 'ID', align: 'left', value: 'id'},
          { text: 'Nome do produto', value: 'productName'},
          { text: 'Preço por item', value: 'productPrice' },
          { text: 'Estoque atual', value: 'productQtd' },
          { text: 'Valor total', value: 'productTotal' },
          { text: 'Ações', align: 'center', sortable: false, value: 'actions'},
        //   { text: '', value: 'productDescription'}
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
}
</script>

<style scoped>

form{
    padding: 10px;
}
</style>