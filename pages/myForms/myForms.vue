<template>
	<view class="content">
		<u-button type="primary" >G</u-button>
		<u-button type="primary" >GG</u-button>
		<u-button type="primary" >GGG11</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username:"",
				form:{//展示表单需要的数据都在这里
					managename:"",
					clientname:"",
					clientStuid:"",
					reserveid:"",//预约id号
					timeslot:"",
				},
			};
		},
		onLoad(params){
			let that = this
			this.username = params["username"]
			this.$u.api.getMyAppointment(this.username).then(res=>{
				console.log("test is beginningg")
				console.log(res.data.username)
				for(let i=0;i<res.data.appointments.length;i++)	
				{
					console.log(res.data.appointments[i])
				}
				
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
