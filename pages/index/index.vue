<template>
	<view class="page">
		<view class="input">
			<view class="line">
				<text class="name">内容：</text>
				<view class="uni-input-wrapper input-content">
					<input class="uni-input" v-model="content" focus placeholder="请输入内容" />
				</view>
			</view>
			<view class="line">
				<text class="name">时间：</text>
				<e-picker mode="dateTime" class="input-time"  @change="change">{{time||'选择日期'}}</e-picker>
			</view>
			<button type="primary" class="button" plain="true" @click="submit" size="mini">确定</button>
		</view>
		<view v-for="(item,index) in remindList" :key="index" class="list">
			<text class="content">{{item.content}}</text>
			<text class="time">{{item.time}}</text>
			<text class="del" @click="del(item,index)">删除</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				remindList:[],
				content:'',
				time: '',
				remindKey:'remindKey'
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			init(){
				uni.getStorage({
					key: this.remindKey,
					success: (res) => {
						console.log(res.data)
						this.remindList = res.data;
					},
					fail: () => {
						uni.setStorage({
							key: this.remindKey,
							data: [],
							success: (res) => {
								console.log('初始化存储数据成功')
							},
							fail: () => {
								uni.showModal({
									title: '初始化存储数据失败!',
									showCancel:false
								})
							}
						})
					}
				})
			},
            change(e) {
                this.time = e
			},
			submit(){
				wx.requestSubscribeMessage({
					tmplIds: ['yKXlE3VZ3d02VnvecwikrZedfVX3zpkFWuoeZRZ8r-o'],
					success (res) {
						console.log(res)
						let item = {
							content:this.content,
							time:this.time
						}
						this.remindList.push(item);
						uni.setStorage({
							key: this.remindKey,
							data: this.remindList,
							success: (res) => {
								this.send();
								uni.showToast({
									title: "添加提醒成功",
									duration: 1000
								})
								this.content = '';
								this.time = '';
							},
							fail: () => {
								uni.showModal({
									title: '添加提醒失败!',
									showCancel:false
								})
							}
						})
					},
					fail (res) {
						uni.showModal({
							title: '授权失败!',
							showCancel:false
						})
					}
				})
			},
			send(){
 
			// 发订阅消息
				// 发送模板消息
				target_wechat = WeChatService( )
				access_token = target_wechat.getAccessToken()
				headers = {'Content-Type': 'application/json'}
				url = "https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=%s"%access_token
				params = {
					"touser": oauth_bind_info.openid,
					"template_id":"yKXlE3VZ3d02VnvecwikrZedfVX3zpkFWuoeZRZ8r-o",
					"page": "pages/index",
					"data": {
						"thing8": {
							"DATA": this.content
						},
						"thing13": {
							"DATA": this.time
						}
					}
				}
 
			},
			del(item,index){
				uni.showModal({
					title: '提示',
					content: '是否删除',
					success: (res) => {
						if (res.confirm) {
							this.remindList.splice(index, 1);
							uni.setStorage({
								key: this.remindKey,
								data: this.remindList,
								success: (res) => {
									uni.showToast({
										title: "删除成功",
										duration: 1000
									})
								},
								fail: () => {
									uni.showModal({
										title: '删除失败!',
										showCancel:false
									})
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		},
	}
</script>

<style>
	.page{
		padding: 10rpx;
	}
	.input {
		display: flex;
		flex-direction: column;
		margin: 0 0 20rpx 0;
	}
	.line{
		display: flex;
		flex-direction: row;
	}
	.name{
		width: 150rpx;
	}
	.input-content{
		width: 100%;

	}
	.input-time{
		width: 100%;

	}
	.button{
		width: 100%;
	}
	.list{
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.content{
		width: 300rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.time{
		width: 450rpx;
		color: #666;
	}
	.del{
		width: 100rpx;
		height: 100%;
		font-size: 10rpx;
		color: #f00;
	}
</style>
