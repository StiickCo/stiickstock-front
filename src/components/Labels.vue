<template>
	<div>
		<v-menu @input='af' v-model="isOpen" offset-x transition="slide-y-transition" :close-on-content-click="false">
			<template v-slot:activator="{ on }">
				<v-btn text v-on="on" @click="search=''">
					<v-icon>add_circle_outline</v-icon>
					Adicionar tag
				</v-btn>
			</template>
			<v-list dense>
				<v-list-item>
					<v-text-field label="Pesquisar tag" v-model="search"></v-text-field>
				</v-list-item>
				<v-divider></v-divider>
				<v-list-item v-for="(label, index) in computedLabels" :key="index" @click='updateLabel(label)'>
					<v-list-item-icon class="mx-0" pa-0>
						<v-icon v-show="labels.includes(label)" color="black">check</v-icon>
					</v-list-item-icon>
					
					<v-icon :color="label.color">label</v-icon> 
					<span>{{label.name}}</span>
				</v-list-item>
			</v-list>
		</v-menu>
	</div>
</template>
<script>
export default {
	mounted(){
		// this.getLabels();
  },
  data(){
    return{
      search:'',
      isOpen:false,
      labels:[],
    }
  },
  methods:{
	af(){
		if (this.isOpen){
			console.log("Menu is open");
		}else{
			console.log("Menu is closed");
			this.updateFunction(this.item, this.labels);
		}
	},
	updateLabel(label){
		let labelIndex = this.labels.indexOf(label);
		this.labels.includes(label) ? this.labels.splice(labelIndex, 1) : this.labels.push(label);
	},
    
  },
  computed:{
	computedLabels(){
		return this.labelList.filter(labelList => labelList.name.toLowerCase().includes(this.search.toLowerCase()));
	}
  },
  props:['labelList', 'item','updateFunction']
}
</script>