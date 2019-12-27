<template>
    <div class="text-center">
        <v-card>
            <v-card-title class="headline">Estatísticas</v-card-title>
                <v-card-text>
                    <v-card-actions>
                        <v-layout row wrap class = "justify-center">
                            <v-flex xs9 md3 class= 'ma-1'>
                                <v-btn block elevation=1 color="green darken-1" dark @click="activateChart(0)">Produtos adicionados</v-btn>
                            </v-flex>
                            <v-flex xs9 md3 class= 'ma-1'>
                                <v-btn block elevation=1 color="green darken-1" dark @click="activateChart(1)">Produtos vendidos</v-btn>
                            </v-flex>
                            <v-flex xs9 md3 class= 'ma-1'>
                                <v-btn block elevation=1 color="green darken-1" dark @click="activateChart(2)">Emails registrados</v-btn>
                            </v-flex>
                            <v-flex xs9 md2 class= 'ma-1'>
                                <v-btn block elevation=1 color="green darken-1" dark @click="activateChart(3)">Gráfico geral</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card-actions>
                    
                <template v-for="(i,j) in charts" >
                    <Chart :key="j" :label="i.label" :background="i.backgroundColor" :values="i.data" v-if="i.show"/>
                </template>

                <chart-Overlap :data="charts" v-if="overlap"/>

            </v-card-text>
        </v-card>
    </div>
</template>

<script>

export default {
    data(){
        return{
            overlap: false,
            charts:[{
                show: true,
                label: 'Produtos adicionados',
                backgroundColor: '#890F0F99',
                data: [19, 33, 15, 39, 11, 9, 22, 50, 99, 20, 12, 11]
            },
            {
                show: false,
                label: 'Produtos vendidos',
                backgroundColor: '#7432C799',
                data: [60, 20, 21, 87, 12, 40, 32, 18, 40, 9, 12, 33]
            },
            {
                show: false,
                label: 'Emails registrados',
                backgroundColor: '#AA950899',
                data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
            }]
        }
    },
    methods:{
        activateChart(chart){
            this.charts[0].show= false;
            this.charts[1].show= false;
            this.charts[2].show= false;
            this.overlap = false;
            chart == 3 ? this.overlap = true : this.charts[chart].show = true;
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

