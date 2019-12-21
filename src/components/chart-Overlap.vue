<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  data(){
      return{
          chart:{
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      datasets: this.data
    }
 }
  },
  mounted () {
    this.renderChart(this.chart, {responsive: true, maintainAspectRatio: false})
  },
  props:['data']
}
</script>