<template>
	<view class="goodsSecondPage">
		<view class="list">
			<view v-for="(item,index) in showList" :key="index" class="item" @click="goto(item.url)">
				<view class="text">{{item.text}}</view>
				<image class="goto" src="../../static/icon_jt_right.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showList:[],
				// 商户目录
				busGoods:[
					{
						isShow:true,
						text:'新增商品',
						url:'../goodAdd/goodAdd'
					},
					{
						isShow:true,
						text:'商户普通商品',
						url:'../goodsList/goodsList?type=busNormal',
					},
					{
						isShow:true,
						text:'商户秒杀商品',
						url:'../goodsList/goodsList?type=busSeckill'
					}
				],
				// 平台目录
				platform:[
					{
						isShow:true,
						text:'平台普通商品',
						url:'../goodsList/goodsList?type=platformNormal'
					},
					{
						isShow:true,
						text:'平台秒杀商品',
						url:'../goodsList/goodsList?type=platformSeckill'
					},
					{
						isShow:true,
						text:'已屏蔽普通商品',
						url:'../goodsList/goodsList?type=shieldNormal'
					},
					{
						isShow:true,
						text:'已屏蔽秒杀商品',
						url:'../goodsList/goodsList?type=shieldSeckill'
					}
				]
			};
		},
		onLoad(e) {
			if(e.id==0){
				this.showList = this.busGoods;
				uni.setNavigationBarTitle({
					title:'商户商品'
				})
			}else{
				this.showList = this.platform;
				uni.setNavigationBarTitle({
					title:'平台商品'
				})
			}
		},
		methods:{
			goto(url){
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style lang="scss">
	.goodsSecondPage{
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
				.goto{
					width: 15upx;
					height: 35upx;
				}
			}
		}
	}
</style>
