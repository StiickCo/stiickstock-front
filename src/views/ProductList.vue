<template>
  <v-card>
    <v-card-title>
      Estoque
      <v-spacer></v-spacer>
      <v-text-field v-model="search" label="Procurar" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table hide-default-footer :headers="headers" :items="products" :search="search">  

        <template v-slot:item.productTotal="{ item }">
            {{ item.productTotal = (item.productPrice * item.productQtd).toFixed(2) }}
        </template>
    </v-data-table>
  </v-card>
</template>
<script>
export default {
    name: "ProductList",
    data () {
      return {
        search: '',
        headers: [{
            text: 'ID',
            align: 'left',
            value: 'id',
          },
          { text: 'Nome do produto', value: 'productName'},
          { text: 'Preço por item', value: 'productPrice' },
          { text: 'Estoque atual', value: 'productQtd' },
          { text: 'Valor total', value: 'productTotal' }
        ],
        products: [{
            id: 1,
            productName: 'Produto1',
            productPrice: 50,
            productQtd: 6,
            productTotal: 0
          },
          {
            id: 2,
            productName: 'Produto2',
            productPrice: 15.75,
            productQtd: 9,
            productTotal: 0
          },
          {
            id: 3,
            productName: 'Produto3',
            productPrice: 6.99,
            productQtd: 16,
            productTotal: 0
          },
          {
            id: 4,
            productName: 'Produto4',
            productPrice: 150,
            productQtd: 3,
            productTotal: 0
          },
          {
            id: 5,
            productName: 'Produto5',
            productPrice: 20,
            productQtd: 4,
            productTotal: 0
          },
          {
            id: 6,
            productName: 'Produto6',
            productPrice: 37.58,
            productQtd: 11,
            productTotal: 0
          },
          {
            id: 7,
            productName: 'Produto7',
            productPrice: 22,
            productQtd: 66,
            productTotal: 0
          },
          {
            id: 8,
            productName: 'Produto8',
            productPrice: 40,
            productQtd: 32,
            productTotal: 0
          },
          {
            id: 9,
            productName: 'Produto9',
            productPrice: 25,
            productQtd: 25,
            productTotal: 0
          },
          {
            id: 10,
            productName: 'Produto10',
            productPrice: 5,
            productQtd: 150,
            productTotal: 0
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