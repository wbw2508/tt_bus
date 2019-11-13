<template>
	<view class="loginCom">
		<form class="loginForm" @submit="login" @reset="">
			<view class="line username">
				<label for="username">账号：</label>
				<input type="text" name="username" id="username" :value="username" @input="changeUsername">
				<view class="tips"></view>
			</view>
			<view class="line password">
				<label for="password">密码：</label>
				<input type="password" name="password" id="password" :value="password" @input="changePassword"/>
				<view class="tips"></view>
			</view>
			<button class="submit" form-type="submit">登录</button>
		</form>
	</view>
</template>

<script>
	import { mapActions } from 'vuex'
	
	export default {
		data() {
			return {
				username:'',
				password:''
			};
		},
		methods:{
			...mapActions(['busLogin']),
			changeUsername(e){
				this.username = e.detail.value
			},
			changePassword(e){
				this.password = e.detail.value
			},
			login(e){
				console.log(e.detail.value.username)
				this.busLogin({
					username:e.detail.value.username,
					password:e.detail.value.password
				}).then(res => {
					uni.showToast({
						title:res,
						icon:'none'
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.loginCom{
		width: 100vw;
		height: 100vh;
		background-color: rgba($color: #000000, $alpha: 0.4);
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		.loginForm{
			width: 480upx;
			background-color: #fff;
			padding: 20upx 30upx;
			.line{
				display: flex;
				align-items: center;
				margin: 30upx 0;
				input{
					border: 2upx solid #eee;
				}
			}
			.submit{
				width:300upx;
				height: 60upx;
				color: #fff;
				background-color: #FF0000;
				line-height: 60upx;
				font-size: 28upx;
			}
		}
	}
</style>
