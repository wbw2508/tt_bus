<template>
	<view class="orderDetail">
		<scroll-view class="headClum" scroll-x="true">
			<view v-for="(item,index) in tabList" class="tabItem" :key="index" :class="{active:activeId==item.id}" @click="changeTab(item.id)">{{item.text}}</view>
		</scroll-view>
		<view class="searchBox">
			<view class="searchInput">
				<image class="searchIcon" src="../../static/icon_ck.png" mode=""></image>
				<input type="text" :value="searchVal" @input="changeVal" placeholder="根据会员名查询" />
				<image class="cancelIcon" @click="clearVal" src="../../static/btn_qx.png" mode=""></image>
			</view>
			<view class="searchBtn" @click="search">搜索</view>
		</view>
		<view class="content">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="top">
					<view class="left">
						<image class="user" :src="item.user.url" mode=""></image>
						<view class="info">
							<view class="nickName">{{item.user.nickName}}</view>
							<view class="phone">{{item.user.phone}}</view>
						</view>
					</view>
					<view class="status">{{item.status}}</view>
				</view>
				<scroll-view scroll-x="true" class="middle" >
					<image v-for="(img,index2) in item.goodsImg" :key="index2" class="goodImg" :src="img" mode=""></image>
				</scroll-view>
				<view class="bottom">
					共：{{item.num}}件商品 实付：￥{{item.money}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeId:0,
				searchVal:'',
				tabList:[
					{text:'全部',id:0},
					{text:'待配送',id:1},
					{text:'待收货',id:2},
					{text:'待自提',id:3},
					{text:'已完成',id:4}
				],
				list:[
					{
						user:{
							url:'../../static/temp/tx.png',
							nickName:'健康美丽快乐的杉杉',
							phone:18058641287
						},
						status:'待配送',
						goodsImg:[
							'../../static/temp/prod.png',
							'../../static/temp/prod.png',
							'../../static/temp/prod.png',
							'../../static/temp/prod.png',
						],
						num:4,
						money:46.0
					},
					{
						user:{
							url:'../../static/temp/tx.png',
							nickName:'健康美丽快乐的杉杉',
							phone:18058641287
						},
						status:'待配送',
						goodsImg:[
							'../../static/temp/prod.png',
							'../../static/temp/prod.png',
							'../../static/temp/prod.png',
							'../../static/temp/prod.png',
						],
						num:4,
						money:46.0
					},
					{
						user:{
							url:'../../static/temp/tx.png',
							nickName:'健康美丽快乐的杉杉',
							phone:18058641287
						},
						status:'待配送',
						goodsImg:[
							'../../static/temp/prod.png',
							'../../static/temp/prod.png',
							'../../static/temp/prod.png',
							'../../static/temp/prod.png',
						],
						num:4,
						money:46.0
					}
				]
			};
		},
		methods:{
			changeTab(id){
				this.activeId = id
			},
			changeVal(e){
				this.searchVal = e.detail.value
			},
			clearVal(){
				this.searchVal = ''
			},
			search(){
				console.log(this.activeId,this.searchVal)
			}
		}
	}
</script>

<style lang="scss">
	.orderDetail{
		width: 100vw;
		padding-top: 90upx;
		.headClum{
			height: 90upx;
			width: 100%;
			position: fixed;
			left: 0;
			top: 0;
			font-size: 0;
			border-bottom: 2upx solid #eee;
			background-color: #fff;
			white-space: nowrap;
			z-index: 10;
			.tabItem{
				font-size: 28rpx;
				display: inline-block;
				vertical-align: middle;
				width: 20%;
				line-height: 90rpx;
				text-align: center;
				position: relative;
				&.active{
					color: red;
					&:after{
						content: " ";
						position: absolute;
						left: 0;
						bottom: 4rpx;
						width: 100%;
						height: 4rpx;
						background-color: #fe1c20;
					}
				}
			}
		}
		.searchBox{
			margin: 20upx 0;
			width: 100%;
			display: flex;
			justify-content: space-around;
			.searchInput{
				display: flex;
				align-items: center;
				width: 560upx;
				height: 64upx;
				background-color: #eee;
				border-radius: 32upx;
				padding: 0 30upx;
				.searchIcon{
					width: 28upx;
					height: 28upx;
				}
				.cancelIcon{
					width: 35upx;
					height: 35upx;
				}
				input{
					flex-grow: 1;
					margin: 0 10upx;
					font-size: 28upx;
				}
			}
			.searchBtn{
				font-size: 28upx;
				line-height: 64upx;
			}
		}
		.content{
			width: 100%;
			background-color:#eee;
			display: flex;
			flex-direction: column;
			font-size: 28upx;
			.item{
				background-color: #fff;
				display: flex;
				flex-direction: column;
				padding: 20upx 30upx;
				margin-bottom: 20upx;
				.top{
					display: flex;
					justify-content: space-between;
					align-items: center;
					.left{
						display: flex;
						align-items: center;
						.user{
							width: 60upx;
							height: 60upx;
							margin-right: 20upx;
						}
						.info{
							display: flex;
							flex-direction: column;
							.nickName{
								
							}
							.phone{
								color: #999;
								font-size: 20upx;
							}
						}
					}
					.status{
						color: #666;
					}
				}
				.middle{
					margin: 20upx 0;
					padding: 20upx 0;
					width:100%;
					white-space: nowrap;
					border-top: 2upx solid #eee;
					border-bottom: 2upx solid #eee;
					box-sizing: content-box;
					.goodImg{
						width: 140upx;
						height:140upx;	
					}
					
				}
			}
		}
	}
</style>
