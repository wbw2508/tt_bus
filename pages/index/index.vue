<template>
	<view class="container home">
	  <view class="list">
	    <view v-for="(item,index) in items" v-if="item.isShow"	:key="index" class="item">
			<item :item="item"></item>
	    </view>
	  </view>
	  <view class="income">
	    <view class="title">
	      <text class="h1">营业收入</text>
	      <view class="time-list">
	        <text class="today" :class="{active:time==0}" @click="changeTime(0)">今日</text>
	        <text class="yesterday" :class="{active:time==1}" @click="changeTime(1)">昨日</text>
	        <text class="week" :class="{active:time==2}" @click="changeTime(2)">近7天</text>
	      </view>
	    </view>
	    <view class="content">
			<view class="left">
				<view class="all">商家总实收(元)</view>
				<view class="money">0.00</view>
			</view>
			<view class="right">
				<view class="order">
					<view class="text">订单笔数(笔)</view>
					<view class="money">0.00</view>
					<view class="num">0份</view>
				</view>
				<view class="person">
					<view class="text">下单人数(个)</view>
					<view class="money">0.00</view>
					<view class="num">0笔</view>
				</view>
			</view>
	    </view>
	  </view>
	</view>
</template>

<script>
	import item from '../../components/item.vue';
	export default {
		components:{
			item
		},
		data() {
			return {
				time:0,
				items:[
				      {
				        icon:'../static/icon_com.png',
				        text:'团长管理',
				        isShow:false,
				        url:'1'
				      },
				      {
				        icon: '../static/icon_store.png',
				        text: '店铺管理',
				        isShow: false,
				        url: '2'
				      },
				      {
				        icon: '../static/icon_goods.png',
				        text: '商品信息',
				        isShow: true,
				        url: '../goods/goods'
				      },
				      {
				        icon: '../static/icon_order.png',
				        text: '订单查看',
				        isShow: true,
				        url: '../order/order'
				      },
				      {
				        icon: '../static/icon_money.png',
				        text: '返佣管理',
				        isShow: false,
				        url: '5'
				      }
				    ]
			}
		},
		onLoad() {

		},
		methods: {
			changeTime(time){
				this.time = time
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home{
		padding: 0 20upx;
		box-sizing: border-box;
	}
	.list{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		.item{
			width: 33%;
			height: 200upx; 
		}
	}
	.income{
		padding-top: 30upx;
		width: 100%;
		border-top: 2upx solid rgba(0,0,0,.1);
		.title{
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.h1{
				font-size: 48upx;
				font-weight: bolder;
			}
			.time-list{
				font-size: 24upx;
				color: #666;
				text{
					margin-left: 60upx;
					padding-bottom: 10upx;
				}
				.active{
					border-bottom: 4upx solid red;
				}
			}
		}
		.content{
			width: 100%;
			margin-top: 30upx;
			font-size: 24upx;
			display: flex;
			justify-content: space-between;
			.left{
				width: 40%;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				.money{
					font-size: 40upx;
				}
			}
			.right{
				width: 60%;
				min-height: 120upx;
				display: flex;
				justify-content: space-around;
				border-left: 2upx solid rgba(0,0,0,.1);
				.order,.person{
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					.money{
						font-weight: bold;
					}
					.num{
						color: #999;
					}
				}
			}
		}
	}
</style>
