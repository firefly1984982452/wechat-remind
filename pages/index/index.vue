<template>
	<view class="page">
		<button type="primary" class="button" plain="true" @click="requestSubscribeMessage" size="mini">授权</button>
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
			<button type="primary" class="button" plain="true" @click="save" size="mini">确定</button>
		</view>
		<view v-for="(item,index) in remindList" :key="index" class="list" @click="detail(item)">
			<text class="content">{{item.content}}</text>
			<text class="time">{{item.time}}</text>
			<text class="del" @click="del(item,index)">删除</text>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		// computed: mapState(['info']),
		computed: {
			info:{
				get:function(){
					return this.$store.state.info
				},
				set:function(){
					return this.$store.state.info
				}
			}
		},
		data() {
			return {
				remindList:[],
				content:'',
				time: '',
				remindKey:'remindKey',
				openID: '',
				userCode:'',
				token:'',
			}
		},
		onLoad() {
			this.init();
			this.login();
		},
		methods: {
			detail(item){
				this.info = item;
			},
			// 获取用户信息
			login(){
				uni.login({
					provider: 'weixin',
					success:  loginRes => {
						console.log(loginRes.code);
						this.userCode = loginRes.code;
			this.getOpenid();
					}
				});
			},
			// 获取openID
			async getOpenid(){
				let params = {
					appid:'wx8bda0c57123111e7',
					secret: 'ccc431411276f087b41f680275e457a8',
					js_code: this.userCode,
					grant_type: 'authorization_code',
				}
				await uni.request({
					url: 'https://api.weixin.qq.com/sns/jscode2session',
					data: params,
					success: (res) => {
						console.log(res.data);
						this.openID = res.data.openid;
						console.log('openID:'+this.openID)
			this.getToken();
					}
				});
			},
			// 获取token
			async getToken(){
				let params = {
					appid:'wx8bda0c57123111e7',
					secret: 'ccc431411276f087b41f680275e457a8',
					grant_type: 'client_credential',
				}
				await uni.request({
					url: 'https://api.weixin.qq.com/cgi-bin/token',
					data: params,
					success: (res) => {
						this.token = res.data.access_token;
					}
				});
			},
			// 初始化，看有没有存储的数据
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
			// 获取授权
			requestSubscribeMessage(){
				wx.requestSubscribeMessage({
					tmplIds: ['yKXlE3VZ3d02VnvecwikrZedfVX3zpkFWuoeZRZ8r-o'],
					success (res) {
						console.log(res)
						uni.showModal({
							title: '授权成功!',
							showCancel:false
						})
					},
					fail (res) {
						console.log(res)
						uni.showModal({
							title: '授权失败!',
							showCancel:false
						})
					}
				})

			},
			// 添加提醒后保存到本地
			save(){
				let item = {
					content:this.content,
					time:this.time
				}
				this.remindList.push(item);
				uni.setStorage({
					key: this.remindKey,
					data: this.remindList,
					success: (res) => {
						uni.showToast({
							title: "添加提醒成功",
							duration: 1000
						})
						this.content = '';
						this.time = '';
					},
					fail: (res) => {
						uni.showToast({
							title: "保存本地失败" +res,
							duration: 1000
						})
					}
				})
			},
			// 发送
			send(){
				let params = {
					touser: this.openID,
					template_id: "yKXlE3VZ3d02VnvecwikrZedfVX3zpkFWuoeZRZ8r-o",
					data: {
						"thing8": {
							"value": this.content
						},
						"time13": {
							"value": this.time
						}
					},
					page:'index'
				}
				uni.request({
					url: 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' + this.token,
					data: JSON.stringify(params),
					method: "POST",
					success: (res) => {
						console.log(res.data.errcode);
						if (res.data.errcode == 0) {
							this.save();
						} else {
							uni.showModal({
								title: '添加提醒失败，请授权!',
								showCancel:false
							})
						}
					},
					fail: (res) => {
						uni.showModal({
							title: '添加提醒失败，'+JSON.parse(res),
							showCancel:false
						})
					}
				});
 
			},
			// 删除
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
		justify-content: space-between;
		height: 300rpx;
		margin: 50rpx 0 20rpx 0;
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
