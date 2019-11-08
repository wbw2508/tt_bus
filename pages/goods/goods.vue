<template>
	<view class="goodsPage">
		<view class="list">
			<view class="item" @click="gotoSecond(0)">
				<view class="left">
					<!-- <image class="icon" src="../../static/icon_com.png" mode=""></image> -->
					<view class="text">商户商品</view>
				</view>
				<image class="goto" src="../../static/icon_jt_right.png" mode=""></image>
			</view>
			<view class="item" @click="gotoSecond(1)">
				<view class="left">
					<!-- <image class="icon" src="../../static/icon_com.png" mode=""></image> -->
					<view class="text">平台商品</view>
				</view>
				<image class="goto" src="../../static/icon_jt_right.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			gotoSecond(id){
				uni.navigateTo({
					url:'../goodsSecond/goodsSecond?id='+id
				})
			}
		}
	}
</script>

<style lang="scss">
	.goodsPage{
		.list{
			width: 100vw;
			padding-top: 10upx;
			box-sizing: border-box;
			background-color: #eee;
			border-bottom:2upx solid transparent;
			.item{
				margin-bottom: 10upx;
				background-color: #fff;
				width: 100%;
				height: 100upx;
				padding: 0 30upx;
				font-size: 34upx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.left{
					display: flex;
					align-items: center;
				}
				.icon{
					width: 60upx;
					height: 60upx;
					margin-right: 40upx;
				}
				.goto{
					width: 15upx;
					height: 35upx;
				}
			}
		}
	}
</style>
