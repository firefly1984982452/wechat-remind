<template>
	<view class="content">
		<view v-for="(item,index) in remindList" :key="index">
			<text>{{item.content}}</text>
			<text>{{item.time}}</text>
		</view>
		<view>
			<view class="uni-input-wrapper">
				<input class="uni-input" v-model="content" focus placeholder="请输入内容" />
			</view>
			<e-picker mode="dateTime"  @change="change">{{time||'选择日期'}}</e-picker>
			<button type="primary" plain="true" @click="submit">确定添加提醒</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				remindList:[{content:'1',time:'2'}],
				content:'',
				time: '',
			}
		},
		onLoad() {

		},
		methods: {
            change(e) {
                this.time = e
			},
			submit(){
				console.log(this.content,this.time)
			}
		},
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
