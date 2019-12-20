<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  data(){
      return{
          chart:{
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      datasets: [
        {
          label: 'Produtos adicionados',
          backgroundColor: '#3F897A',
          data: [19, 33, 15, 39, 11, 9, 22, 50, 99, 20, 12, 11]
        }
      ]
    }
 }
  },
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart(this.chart, {responsive: true, maintainAspectRatio: false})
  }
}
</script>