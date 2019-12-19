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
          label: 'Produtos vendidos',
          backgroundColor: '#7432C7',
          data: [60, 20, 21, 87, 12, 40, 32, 18, 40, 9, 12, 33]
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