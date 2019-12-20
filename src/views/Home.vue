<template>
    <div class="text-center">
        <h5 class="text-center headline mb-2">Estatísticas</h5>
            <v-list>
                <v-btn @click="activateChart('chartAdded')">Produtos adicionados</v-btn>
                <v-btn class="mx-8" @click="activateChart('chartSold')">Produtos vendidos</v-btn>
                <v-btn @click="activateChart('chartEmail')">Emails registrados</v-btn>
            </v-list>
        <chart-ProductAdded v-if="chartAdded"/>
        <chart-ProductSold v-if="chartSold"/>
        <chart-Emails v-if="chartEmail"/>
    </div>
</template>

<script>

export default {
    data(){
        return{
            chartAdded: true,
            chartSold: false,
            chartEmail: false,
        }
    },
    methods:{
        activateChart(chart){
            this.chartAdded= false;
            this.chartSold= false;
            this.chartEmail= false;
            this[chart] = !this[chart];            
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

