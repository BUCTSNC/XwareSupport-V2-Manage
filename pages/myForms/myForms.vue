<template>
	<view class="content">
		<u-toast ref="toast"></u-toast>
		<u-sticky>
			<u-tabs-swiper ref="uTabs" :list="tabList" :current="current" @change="tabsChange" :is-scroll="false"></u-tabs-swiper>
		</u-sticky>
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" :style="{height:swiperHeight+'px'}">
			<swiper-item>
				<u-empty text="无进行中工单" mode="list" v-if="doing.length === 0"></u-empty>
				<scroll-view scroll-y v-else enable-flex show-scrollbar :style="{height:swiperHeight+'px' }">
					<form-card
					v-for="(item, index) in doing" :key="item.id"
					:problemType="item.problemType"
					:name="item.sourcesInfo.name"
					:stuNO="item.sourcesInfo.stuNO"
					:timeSlot="item.applyTime"
					:status="item.dealStatus"
					></form-card>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<u-empty text="无完成工单" mode="list" v-if="finish.length === 0"></u-empty>
				<scroll-view scroll-y v-else enable-flex show-scrollbar :style="{height:swiperHeight+'px'}">
					<form-card
					v-for="(item, index) in finish" :key="item.id"
					:problemType="item.problemType"
					:name="item.sourcesInfo.name"
					:stuNO="item.sourcesInfo.stuNO"
					:timeSlot="item.applyTime"
					:status="item.dealStatus"
					></form-card>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import formCard from "../../component/formCard.vue";
	export default {
		components:{
			formCard,
		},
		data() {
			return {
				tabList:[
					{
						name:"进行中",
					},
					{
						name:"已完成",
					}
				],
				swiperCurrent:0,
				current:0,
				username:"",
				form:{//展示表单需要的数据都在这里
					managename:"",
					clientname:"",
					clientStuid:"",
					reserveid:"",//预约id号
					timeslot:"",
				},
				doing:[],
				finish:[],
				swiperHeight:0,
			};
		},
		onLoad(params){
			let that = this
			this.username = params["username"]
			this.$u.api.getMyAppointment(this.username).then(res=>{
				//console.log("test is beginningg")
				//console.log(res.data.username)
				for(let i=0;i<res.data.appointments.length;i++)	
				{
					console.log(res.data.appointments[i])
					if(res.data.appointments[i].dealStatus === 1){
						that.doing.push(res.data.appointments[i])
					}else if(res.data.appointments[i].dealStatus === 2){
						that.finish.push(res.data.appointments[i])
					}
				}
				//console.log(that.doing)
				//console.log("test is ending")
			})
		},
		onShow() {
			this.swiperHeight = uni.getSystemInfoSync().windowHeight - 40
		},
		methods: {
			tabsChange(index){
				this.swiperCurrent = index
			},
			transition(e){
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx)
			},
			animationfinish(e){
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.current = current;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		background-color: #F3F4F6;
	}
</style>