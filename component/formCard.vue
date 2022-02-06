<template>
	<u-card padding="0">
		<view slot="head" class="head">
			<view class="left">{{problemType}}</view>
			<view class="right" v-if="status == 1">填写工单&ensp;></view>
		</view>
		<view slot="body" class="body">
			<view class="info">
				<text class="title">状态</text>
				<text class="detail" v-if="status == 1">进行中</text>
				<text class="detail" v-else-if="status == 2">已完成</text>
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
	</u-card>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
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
			}
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
</style>
