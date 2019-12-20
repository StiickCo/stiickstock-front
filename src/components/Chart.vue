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
          label: this.label,
          backgroundColor: this.background,
          data: this.values
        }
      ]
    }
 }
  },
  mounted () {
    this.renderChart(this.chart, {responsive: true, maintainAspectRatio: false})
  },
  props:['label','background', 'values']
}
</script>