<template>
	<div>
		<v-menu offset-x transition="slide-y-transition" :close-on-content-click="false">
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
				<v-list-item v-for="(label, i) in computedLabels" :key="i" @click='updateFunction(item, label)'>
					<v-list-item-icon class="mx-0" pa-0>
						<v-icon v-if="item.labels.includes(label)" color="black">check</v-icon>
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

  },
  data(){
    return{
      search:'',
    }
  },
  methods:{
    
  },
  computed:{
	computedLabels(){
		return this.labelList.filter(labelList => labelList.name.toLowerCase().includes(this.search.toLowerCase()));
	}
  },
  props:['labelList', 'item','updateFunction']
}
</script>