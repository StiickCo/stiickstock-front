<template>
    <div class="text-center">
        <h5 class="text-center headline mb-2">Estatísticas</h5>
            <v-list>
                <v-btn @click="activateChart('chartAdded')">Produtos adicionados</v-btn>
                <v-btn class="mx-8" @click="activateChart('chartSold')">Produtos vendidos</v-btn>
                <v-btn @click="activateChart('chartEmail')">Emails registrados</v-btn>
            </v-list>
        <chart-ProductAdded :background="chartAdded.color" :values="chartAdded.data" v-if="chartAdded.show"/>
        <chart-ProductSold :background="chartSold.color" :values="chartSold.data" v-if="chartSold.show"/>
        <chart-Emails :background="chartEmail.color" :values="chartEmail.data" v-if="chartEmail.show"/>
    </div>
</template>

<script>

export default {
    data(){
        return{
            chartAdded:{
                show: true,
                color: '#890F0F99',
                data: []
            },
            chartSold:{
                show: false,
                color: '#890F0F99',
                data: []
            },
            chartEmail:{
                show: false,
                color: '#890F0F99',
                data: []
            }
        }
    },
    methods:{
        activateChart(chart){
            this.chartAdded.show= false;
            this.chartSold.show= false;
            this.chartEmail.show= false;
            this[chart].show = !this[chart].show;
        },
    }
};
</script>

<style>
.container{
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 0px;
}
</style>

