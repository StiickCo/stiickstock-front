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
          label: 'Emails registrados',
          backgroundColor: '#AA9508',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
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