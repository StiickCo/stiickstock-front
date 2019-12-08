<template>
  <form>
    <v-text-field label="Nome do produto"/>
    <v-text-field label="Descrição sobre o produto"/>
    <v-text-field type="number" min="0" step=".01" label="Preço/cada"/>
    <v-text-field type="number" min="0" label="Quantidade em estoque"/>
    <v-btn @click="submit">Adicionar Produto</v-btn>
  </form>
</template>

<script>
export default {
    name: "addProduct"
}
</script>

<style scoped>

form{
    padding: 10px;
}
</style>