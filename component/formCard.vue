<template>
	<u-card padding="0">
		<view slot="head" class="head">
			<view class="left">{{problemType}}</view>
		</view>
		<view slot="body" class="body">
			<view class="info">
				<text class="title">预约号</text>
				<text class="detail">{{reverseid}}</text>
			</view>
			<view class="info">
				<text class="title">状态</text>
				<text class="detail" v-if="status === 1" style="color:#ff9900;">进行中</text>
				<text class="detail" v-else-if="status === 2" style="color:#19be6b;">已完成</text>
				<text class="detail" v-else-if="status === 0" >已取消</text>
			</view>
			<view class="info">
				<text class="title">时间段</text>
				<text class="detail">{{timeSlot}}</text>
			</view>
			<view class="info">
				<text class="title">申请人</text>
				<text class="detail">{{stuNO}} - {{name}}</text>
			</view>
		</view>
		<view slot="foot" class="foot">
			<u-button v-if="status==1" class="btn" type="primary" shape="circle" size="mini" plain ripple @click="startFills" >填写工单</u-button>
			<u-button v-if="status==1" class="btn" type="error" shape="circle" size="mini" plain ripple @click="cancel">取消预约</u-button>
			<u-button v-if="status==2" class="btn" type="info" shape="circle" size="mini" plain ripple @click="modifyTicket" >修改工单</u-button>
			<u-button v-if="status==2" class="btn" type="primary" shape="circle" size="mini" plain ripple @click="createPdf" >查看详情</u-button>
			<!-- <u-button>"primary""success""info""warning""error"</u-button> -->
		</view>
	</u-card>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			createPdf(){
				let res0 = null
				let that = this
				console.log(this.username+"::"+this.UUID)
				this.$u.api.pdfGeneration(this.UUID,this.username).then(res=>{
					// console.log(res)
					uni.downloadFile({
						url:"http://39.107.139.29:8000/manageAPI/download?username="+that.username+"&uuid="+that.UUID,
						//url:"http://127.0.0.1:8000/manageAPI/download?username="+that.username+"&uuid="+that.UUID,
						success: (data) => {
							if (data.statusCode === 200) {
								//文件保存到本地
								uni.saveFile({
									tempFilePath: data.tempFilePath, //临时路径
									success: function(res) {
										res0 = res.savedFilePath
										uni.showToast({
											icon: 'none',
											mask: true,
											title: '文件已保存：' + res.savedFilePath, //保存路径
											duration: 3000,
										});
										console.log("文档已经保存"+res0)
										setTimeout(() => {
											//打开文档查看
											uni.openDocument({
												filePath: res0,//res.savedFilePath,
												success: function(res) {
													// console.log('打开文档成功');
												},
												fail: (res) => {
													console.log(res)
												}
											});
										}, 3000)
									}
								});
							}
						},
						fail: (err) => {
							console.log(err);
							uni.showToast({
								icon: 'none',
								mask: true,
								title: '失败请重新下载',
							});
						},
					})
				})
				
			},
			startFills(){
				this.$emit("startFill",this.UUID,this.username)
				console.log("start jumptoFillTicket")
			},
			modifyTicket(){
				this.$emit("modifyTicket",this.UUID,this.username)
				console.log("start jumptoModifyTicket")
			},
			cancel(){
				this.$emit("startCancel",this.UUID,this.username)
				console.log("cancel start")
				
			},
			
		},
		
		
		
		props:{
			name: {
				type: String,
				required: true,
			},
			problemType: {
				type: String,
				required: true
			},
			status: {
				type: Number,
				required: true
			},
			stuNO: {
				type: String,
				required: true
			},
			timeSlot: {
				type: String,
				required: true,
			},
			reverseid:{
				type:Number,
				required:true
			},
			username: {
				type: String,
				required: true,
			},
			UUID: {
				type: String,
				required: true,
			},
		}
	}
</script>

<style scoped lang="scss">
	$leftPadding:40rpx;
	.head {
		background-color: rgb(255, 255, 255);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx 10rpx 10rpx $leftPadding;
	
		.left {
			display: inline-block;
			color: #303133;
			font-size: medium;
			font-weight: 540;
		}
	}
	
	.body {
		background-color: rgb(250, 250, 250);
		padding: 10rpx 0 10rpx $leftPadding;
		display: flex;
		flex-direction: column;
	
		.info {
			font-size: small;
			color: #909399;
			margin: 10rpx 0;
	
			.title {
				display: inline-block;
				text-align: justify;
				text-align-last: justify;
				width: 120rpx;
	
				margin-right: 10rpx:after {
					content: ":";
					width: 100%;
				}
			}
		}
	}
	.foot{
		text-align: right;
	}
</style>