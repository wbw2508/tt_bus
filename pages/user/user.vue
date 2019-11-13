<template>
	<view class="userPage">
		<view class="top">
			<image class="topBg" src="../../static/user-bg.png" mode=""></image>
			<view class="user">
				<view class="avatar"><open-data type="userAvatarUrl"></open-data></view>
				<view class="nickName"><open-data type="userNickName"></open-data></view>
			</view>
		</view>
		<view class="content">
			<view v-for="(item,index) in list" v-if="item.isShow" :key="index" class="item">
				<view class="left">
					<image class="icon" :src="item.icon" mode=""></image>
					<view class="text">{{item.text}}</view>
				</view>
				<view v-if="item.right&&busId" class="right">{{busId}}</view>
			</view>
		</view>
		<view class="bottom" @click="logout">退出登录</view>
		<block v-if="!isLogin">
			<forLogin></forLogin>
		</block>
	</view>
</template>

<script>
	import forLogin from '../../components/forLogin.vue'
	import { mapState,mapActions } from 'vuex'
	
	export default {
		components:{
			forLogin
		},
		computed:{
			...mapState(['isLogin','busId']),
		},
		data() {
			return {
				list:[
					{
						icon:'../../static/icon_ew.png',
						text:'我的二维码',
						right:false,
						isShow:false
					},
					{
						icon:'../../static/icon_md.png',
						text:'我的门店码',
						right:true,
						isShow:true
					},
					{
						icon:'../../static/icon_kf.png',
						text:'联系客服',
						right:false,
						isShow:false
					}
				]
			};
		},
		onShow() {
			if(uni.getStorageSync('x-auth-token')&&uni.getStorageSync('busInfo')){
				this.$store.state.isLogin = true
				this.$store.state.busId = uni.getStorageSync('busInfo').busId
			}else{
				this.$store.state.isLogin = false
				uni.showToast({
					title:'请先登录',
					icon:'none'
				})
			}
		},
		methods:{
			...mapActions(['busLogout','getOneCat']),
			logout(){
				this.busLogout()
			}
		}
	}
</script>

<style lang="scss">
	.userPage{
		.top{
			width: 100vw;
			height: 360upx;
			position: relative;
			.topBg{
				width: 100%;
				height: 100%;
			}
			.user{
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
				height: 220upx;
				width: 160upx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.avatar{
					width:160upx;
					height: 160upx;
					overflow: hidden;
					border-radius: 80upx;
				}
				.nickName{
					width: 160upx;
					height: 40upx;
					text-align: center;
					color: #fff;
					font-size: 32upx;
					display: flex;
					justify-content: center;
				}
			}
		}
		.content{
			width: 100vw;
			display: flex;
			flex-direction: column;
			font-size: 26upx;
			padding-top: 10upx;
			background-color:#eee;
			border-bottom: 4upx solid #eee;
			.item{
				background-color: #fff;
				width: 100%;
				height: 80upx;
				display: flex;
				justify-content: space-between;
				padding: 0 15upx;
				box-sizing: border-box;
				border-top: 2upx solid #eee;
				.left{
					display: flex;
					align-items: center;
					.icon{
						width: 40upx;
						height: 40upx;
						margin-right: 20upx;
						vertical-align: middle;
					}
				}
				.right{
					display: flex;
					align-items: center;
				}
			}
		}
		.bottom{
			width: 100vw;
			position: fixed;
			bottom: 0;
			left: 0;
			height: 80upx;
			background-color: red;
			text-align: center;
			line-height: 80upx;
			color: #fff;
			font-size: 28upx;
		}
	}

</style>
