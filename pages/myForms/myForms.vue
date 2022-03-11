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
					:reverseid="item.id"
					:problemType="item.problemType"
					:UUID="item.uuid"
					:username="item.username"
					:name="item.sourcesInfo.name"
					:stuNO="item.sourcesInfo.stuNO"
					:timeSlot="item.applyTime"
					:status="item.dealStatus"
					@startFill="fillTicket"
					@modifyTicket="modifyTicket"
					@startCancel="startCancel"
					></form-card>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<u-empty text="无完成工单" mode="list" v-if="finish.length === 0"></u-empty>
				<scroll-view scroll-y v-else enable-flex show-scrollbar :style="{height:swiperHeight+'px'}">
					<form-card
					v-for="(item, index) in finish" :key="item.id"
					:reverseid="item.id"
					:problemType="item.problemType"
					:UUID="item.uuid"
					:username="item.username"
					:name="item.sourcesInfo.name"
					:stuNO="item.sourcesInfo.stuNO"
					:timeSlot="item.applyTime"
					:status="item.dealStatus"
					@startFill="fillTicket"
					@modifyTicket="modifyTicket"
					@startCancel="startCancel"
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
				uuid:[],
				form:{//展示表单需要的数据都在这里
					managename:"",//成员姓名
					clientname:"",//学生姓名
					clientStuid:"",//学生号
					reserveid:"",//预约id号
					timeslot:"",
				},
				doing:[],
				finish:[],
				swiperHeight:0,
			};
		},
		onLoad(params){
			//let that = this
			this.username = params["username"]
		},
		onShow() {
			this.swiperHeight = uni.getSystemInfoSync().windowHeight - 40
			this.loadList()
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
			},
			startCancel(uuid,username){
				uni.showModal({
					title:'确认取消用户预约？',
					success: (res) => {
						if(res.confirm){
							this.$u.api.cancelwork(uuid,username).then(res=>{
								//console.log(res)
							})
							uni.showToast({
								title:"取消预约成功！"
							})
							//console.log("成功取消预约")
							this.loadList()
						}
						//else if(res.cancel){
						//	console.log("取消点击")
						//}
					},
				})
				
			},
			loadList(){
				let that = this
				this.$u.api.getMyAppointment(this.username).then(res=>{
					this.doing = []
					this.finish = []
					for(let i=0;i<res.data.appointments.length;i++)	
					{
						//console.log(res.data.appointments[i])
						if(res.data.appointments[i].dealStatus === 1){
							that.doing.push(res.data.appointments[i])
						}else if(res.data.appointments[i].dealStatus === 2 || res.data.appointments[i].dealStatus === 0){
							that.finish.push(res.data.appointments[i])
						}
					}
				})
			},
			fillTicket(uuid,username){
				setTimeout(()=>{
					uni.navigateTo({
						url:"../fillTickets/fillTickets?uuid="+uuid+"&username="+username
					})
				},200)
				
			},
			modifyTicket(UUID,username){
				uni.showModal({
					title:'确认修改工单信息？',
					//content:"只有一次修改机会",
					success: (res) => {
						if(res.confirm){
							uni.navigateTo({
								url:"../fillTickets/fillTickets?uuid="+UUID+"&username="+username,
							})
							
						}
						// else if(res.cancel){
						// 	console.log("取消点击")
						// }
						
					},
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		background-color: #F3F4F6;
	}
</style>