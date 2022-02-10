<template>
	<view :style="{height:windowHeight+'px'}">
		<view class="form">
			<u-form :v-model="form" ref="uForm" label-width="150" label-align="left">
				<view class="title">工单填写</view>
				<u-form-item label="主诉" left-icon="account"><!--info phone edit-pen account  prop="name"-->
					<u-input v-model="form.problem" placeholder="请输入需求人主诉"></u-input>
				</u-form-item>
				<u-form-item label="电脑品牌" left-icon="grid">
					<u-input v-model="form.pcBrand" placeholder="请输入问题品牌"></u-input>
				</u-form-item>		
				<u-form-item label="电脑型号" left-icon="grid-fill">
					<u-input v-model="form.pcModel" placeholder="请输入电脑型号"></u-input>
				</u-form-item>
				<u-form-item label="检测与推断" left-icon="error" label-width="180rpx">
					<u-input v-model="form.inspection" placeholder="请输入检测与推断"></u-input>
				</u-form-item>
				<u-form-item label="问题类型" left-icon="info">
					<u-input v-model="form.problemType" placeholder="请输入问题类型(软件/硬件/网络/其它)"></u-input>
				</u-form-item>
				<u-form-item label="处理过程与方法" left-icon="edit-pen">
					<u-input v-model="form.processAndWays" placeholder="请输入处理过程与方法"></u-input>
				</u-form-item>
				<u-form-item label="最终效果" left-icon="edit-pen">
					<u-input v-model="form.finalEffect" placeholder="请输入处理效果"></u-input>
				</u-form-item>
				<u-form-item label="处理人" left-icon="edit-pen">
					<u-input v-model="form.companions" placeholder="请输入处理人"></u-input>
				</u-form-item>	
				<u-form-item>
					<u-button @click="ChooseImage">上传图片</u-button>
					<u-button @click="ViewImage">查看图片</u-button>
					<u-button @click="DelImg">删除图片</u-button>
				</u-form-item>
				<image class="_image" v-for="(item,index) in imgList" :src="item"></image>
			</u-form>
		</view>
		<u-button shape="circle" type="primary" @click="submit" >提交表单</u-button>	
	</view>
</template>

<script>
	import { pathToBase64, base64ToPath } from '../../js_sdk/mmmm-image-tools/index.js';
	export default {
		
		data() {
			return {
				windowHeight:"",
				username:"",
				uuid:"",
				imgList:[],    //缓存临时文件
				base64:"",
				form:{
					imgurl:[],    //base64数组
					problem:"",
					problemType:"",
					inspection:"",
					processAndWays:"",
					finalEffect:"",
					companions:"",
					pcBrand:"",
					pcmodel:"",
					//外键
					username:"",
					uuid:"",
				}
			}
		},
		
		onLoad(params) {
			this.windowHeight = uni.getSystemInfoSync().windowHeight
			console.log("fillTicketsparams:",params)
			this.username = params['username']
			this.uuid = params['uuid']
			this.LoadTicket()
		},
		
		methods: {
			LoadTicket(){
				this.$u.api.loadTicket(this.uuid,this.username).then(res=>{
					console.log(res)
					this.form.problem=res.data.problem
					this.form.problemType=res.data.problemType
					this.form.inspection=res.data.inspection
					this.form.processAndWays=res.data.process
					this.form.finalEffect=res.data.finalEffect
					this.form.pcBrand=res.data.pcbrand
					this.form.pcmodel=res.data.pcmodel
					this.form.companions=res.data.companions
					this.form.username=res.data.username
					this.form.uuid=res.data.uuid
				})
			},
			submit(){
				//this.form.imgurl = this.imgList
				this.form.username = this.username
				this.form.uuid = this.uuid
				this.$refs.uForm.validate((res) => {
					console.log(res)
					})
				console.log(this.form)
				this.$u.api.submitTicket(this.form).then(res=>{
					console.log(res)
					if(res.code=="200")
					{
						uni.showModal({
							title:res.msg,
							success: (res) => {
								if(res.confirm){
									uni.navigateBack({
										delta:1,
									})
								}
							}
						})
						
					}else{
						uni.showModal({
							title:res.msg
						})
					}
				})
			},
			ChooseImage() {
				const _this = this
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (_this.imgList.length != 0) {
							_this.imgList = _this.imgList.concat(res.tempFilePaths)
						} else {
							_this.imgList = res.tempFilePaths
						}
						console.log(_this.imgList)
						// console.log("base64 is coming")
						for(let i=0;i<_this.imgList.length;i++)
						{
							pathToBase64(_this.imgList[i])
							  .then(base64 => {
								_this.base64 = base64    //获取最后一张图片的base64
								_this.form.imgurl.push(base64)   //压入base64进表单
								//console.log(_this.base64)
							  })
							  .catch(error => {
							    console.error(error)
							  })
						}
					}
				});
			},
			ViewImage(e) {
				let len = this.imgList.length
				if(len>0){
					uni.previewImage({
						urls: this.imgList,
						current: e.currentTarget.dataset.url
					});
				}else{
					uni.showModal({
						title:"已经没有图片了！"
					})
				}
				
			},
			//删除
			DelImg(e) {
				let len = this.imgList.length
				uni.showModal({
					title: '删除',
					content: '确定要删除最后一张图片？',
					cancelText: '取消',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							// this.imgList.splice(e.currentTarget.dataset.index,1)  //从头开始删除
							if(len!=0)
							{
								this.imgList.splice(len-1,1)  //尾部删除
								this.form.imgurl.pop()  //删除base64数组最后一个元素
							}
								
							else{
								uni.showModal({
									title:"已经没有图片了！"
								})
							}
						}
					}
				})
			},
			
				
		}
	}
</script>

<style lang="scss">
	.image{
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	
	.title{
		display: inline-block;
		color: #303133;
		font-size: medium;
		font-weight: 540;
	}
</style>
