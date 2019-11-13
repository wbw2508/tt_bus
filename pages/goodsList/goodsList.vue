<template>
	<view class="container goodsListPage">
		<navigator class="search" url="../searchList/searchList" hover-class="none">
			<view class="box">
				<image src="../../static/icon_ck.png" mode=""></image>
				<view class="text">搜索商品</view>
			</view>
		</navigator>
		<view class="section">
			<scroll-view class="oneCat" scroll-y="true">
				<view v-for="(item,index) in oneCatList" :key="index" class="item" :class="{active:oneCat.id == item.id}" @click="changeOneCat(item)">{{item.nm}}</view>
			</scroll-view>
			<view class="content">
				<view v-if="toggleShow" class="secondMask">
					<view class="mask" @click="toggle"></view>
					<view class="twoCat">
						<view v-for="(item,index) in twoCatList" :key="index" class="item" :class="{active:twoCat == item}" @click="changeTwoCat(item)">{{item}}</view>
					</view>
				</view>
				<view class="toggleShow" :class="{rotate:toggleShow}" @click="toggle">
					<image src="../../static/icon_jt_bottom.png" mode=""></image>
				</view>
				<view class="secondCat">
					<scroll-view class="twoCat" scroll-x="true">
						<view v-for="(item,index) in twoCatList" :key="index" class="item" :class="{active:twoCat.id == item.id}" @click="changeTwoCat(item)">{{item.nm}}</view>
					</scroll-view>
				</view>
				<scroll-view class="goodsArea" scroll-y="true">
					<good v-for="(item,index) in goodsList" :key="index" :good="item" :type="type"></good>
				</scroll-view>
			</view>
		</view>
		<block v-if="isShowPopup">
			<changePopup :good="currentGood"></changePopup>
		</block>
	</view>
</template>

<script>
	import good from '../../components/good.vue'
	import changePopup from '../../components/changePopup.vue'
	import { request } from '../../utils/wxutil.js'
	import { mapActions } from 'vuex'
	const api = require('../../config/api.js')
	
	export default {
		components:{
			good,
			changePopup
		},
		data() {
			return {
				isShowPopup:false,
				title:'',
				type:'busNormal',
				toggleShow:false,
				oneCatList:[],
				oneCat:'',
				twoCatList:[{nm:'全部',id:''}],
				twoCat:'',
				currentGood:{},
				pageNum:1,
				goodsList:[
					{
						img:'../static/temp/prod.png',
						name:'老伯海鸭蛋4个/份',
						originalPrice:9.9,
						activePrice:14.9,
						remainNum:10000
					},
					{
						img:'../static/temp/prod.png',
						name:'海蛋海老蛋海老伯蛋海老伯海鸭蛋海老伯海鸭蛋海蛋伯海鸭蛋海老伯海鸭蛋4个/份',
						originalPrice:9.9,
						activePrice:14.9,
						remainNum:10000
					},
					{
						img:'../static/temp/prod.png',
						name:'海蛋海老蛋海老伯蛋海老伯海鸭蛋海老伯海鸭蛋海蛋伯海鸭蛋海老伯海鸭蛋4个/份',
						originalPrice:9.9,
						activePrice:14.9,
						remainNum:10000
					},
					{
						img:'../static/temp/prod.png',
						name:'海蛋海老蛋海老伯蛋海老伯海鸭蛋海老伯海鸭蛋海蛋伯海鸭蛋海老伯海鸭蛋4个/份',
						originalPrice:9.9,
						activePrice:14.9,
						remainNum:10000
					},
					{
						img:'../static/temp/prod.png',
						name:'海蛋海老蛋海老伯蛋海老伯海鸭蛋海老伯海鸭蛋海蛋伯海鸭蛋海老伯海鸭蛋4个/份',
						originalPrice:9.9,
						activePrice:14.9,
						remainNum:10000
					},
					{
						img:'../static/temp/prod.png',
						name:'海蛋海老蛋海老伯蛋海老伯海鸭蛋海老伯海鸭蛋海蛋伯海鸭蛋海老伯海鸭蛋4个/份',
						originalPrice:9.9,
						activePrice:14.9,
						remainNum:10000
					},
					{
						img:'../static/temp/prod.png',
						name:'海蛋海老蛋海老伯蛋海老伯海鸭蛋海老伯海鸭蛋海蛋伯海鸭蛋海老伯海鸭蛋4个/份',
						originalPrice:9.9,
						activePrice:14.9,
						remainNum:10000
					},
					{
						img:'../static/temp/prod.png',
						name:'海蛋海老蛋海老伯蛋海老伯海鸭蛋海老伯海鸭蛋海蛋伯海鸭蛋海老伯海鸭蛋4个/份',
						originalPrice:9.9,
						activePrice:14.9,
						remainNum:10000
					},
					{
						img:'../static/temp/prod.png',
						name:'海蛋海老蛋海老伯蛋海老伯海鸭蛋海老伯海鸭蛋海蛋伯海鸭蛋海老伯海鸭蛋4个/份',
						originalPrice:9.9,
						activePrice:14.9,
						remainNum:10000
					}
				]
			};
		},
		onLoad(e) {
			// console.log(e.type)
			switch (e.type){
				case 'busNormal':
					this.title = '商户普通商品'
					this.type = 'busNormal'
					break;
				case 'busSeckill':
					this.title = '商户秒杀商品'
					this.type = 'busSeckill'
					break;
				case 'platformNormal':
					this.title = '平台普通商品'
					this.type = 'platformNormal'
					break;
				case 'platformSeckill':
					this.title = '平台秒杀商品'
					this.type = 'platformSeckill'
					break;
				case 'shieldNormal':
					this.title = '屏蔽平台普通商品'
					this.type = 'shieldNormal'
					break;
				case 'shieldSeckill':
					this.title = '屏蔽平台秒杀商品'
					this.type = 'shieldSeckill'
					break;
				default:
					this.title = '平台普通商品'
					this.type = 'busNormal'
					break;
			}
			uni.setNavigationBarTitle({
				title:this.title
			})
		},
		onShow(){
			this.isRefresh()
		},
		onPullDownRefresh(){
			this.isRefresh()
		},
		methods:{
			...mapActions(['getOneCat','getTwoCat','nomalPageAllOneOwnOfCom']),
			isRefresh(){
				this.getOneCat().then(res=>{
					if(res){
						this.oneCatList = res.data.data
						console.log(this.oneCat)
						if(this.oneCat == ''){
							this.oneCat = res.data.data[0]
						}
						this.getTwoCat(this.oneCat.id).then(res=>{
							this.twoCatList = [
								{nm:'全部',id:''},
								...res.data.data
							]
							this.twoCat = this.twoCatList[0]
							this.nomalPageAllOneOwnOfCom({
								categoryId:this.oneCat.id,
								secondCategoryId:this.twoCat.id,
								pageNum:this.pageNum
							}).then(res=>{
								// console.log(res)
							})
						})
					}
				})
			},
			hidePopup(){
				this.isShowPopup = false
			},
			showPopup(){
				this.isShowPopup = true
			},
			changeOneCat(item){
				this.oneCat = item
				this.isRefresh()
			},
			changeTwoCat(item){
				this.twoCat = item
				this.isRefresh()
			},
			toggle(){
				this.toggleShow = !this.toggleShow
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goodsListPage{
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		.search{
			padding: 40upx 30upx 20upx;
			box-sizing: border-box;
			color: #666;
			.box{
				width: 690upx;
				height: 60upx;
				display: flex;
				align-items: center;
				padding: 0 20upx;
				box-sizing: border-box;
				background-color: #eee;
				border-radius: 30upx;
				image{
					width: 30upx;
					height: 30upx;
					margin-right: 20upx;
				}
				.text{
					
				}
			}
		}
		.section{
			width: 100%;
			// 光用flex-grow会出现手机端异常的情况，加上flex-basis：0会好，效果跟加一个flex：1一样
			// flex-basis: 0;
			// flex-grow:1;
			flex:1;
			display: flex;
			border-top: 2upx solid #eee;
			.oneCat{
				width:200upx;
				height: 100%;
				background-color: #eee;
				padding-bottom: 30upx;
				.item{
					height: 80upx;
					line-height: 80upx;
					text-align: center;
					&.active{
						color: red;
						border-bottom: 2upx solid red;
						background-color: #fff;
						box-sizing: border-box;
					}
				}
			}
			.content{
				display: flex;
				width: 550upx;
				font-size: 26upx;
				position: relative;
				flex-direction: column;
				.secondMask{
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					z-index: 2;
					.mask{
						width: 100%;
						height: 100%;
						background-color: rgba(0,0,0,.4);
					}
					.twoCat{
						position: absolute;
						top: 0;
						left: 0;
						padding: 0 85upx 30upx 20upx;
						background-color: #fff;
						display: flex;
						flex-wrap: wrap;
						overflow: hidden;
						.item{
							height: 48upx;
							width: 30%;
							line-height: 48upx;
							text-align: center;
							margin-top: 30rpx;
							margin-right: 2%;
							border-radius: 15px;
							color: #333333;
							border: 1px solid #333333;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							&.active{
								color: red;
								border: 2upx solid red;
							}
						}
					}
				}
				.secondCat{
					border-bottom: 2upx solid #eee;
					.twoCat{
						padding-right: 85upx;
						width: 100%;
						box-sizing: border-box;
						white-space: nowrap;
						.item{
							width: 30%;
							height: 90upx;
							line-height: 90upx;
							text-align: center;
							display: inline-block;
							box-sizing: border-box;
							&.active{
								color: red;
							}
						}
					}
				}
				.toggleShow{
					position: absolute;
					top: 0;
					right: 0;
					background-color: #fff;
					z-index: 30;
					width: 85upx;
					height: 90upx;
					display: flex;
					justify-content: center;
					align-items: center;
					image{
						width: 24upx;
						height: 12upx;
					}
					&.rotate{
						transform: rotate(180deg);
					}
				}
				.goodsArea{
					flex: 1;
					padding-bottom: 20upx;
					box-sizing: border-box;
					overflow: hidden;
					.good{
						padding: 20rpx 15upx;
						box-sizing: border-box;
						border-bottom: 2upx solid #eee;
						display: flex;
						image{
							width: 240upx;
							height: 240upx;
							margin-right: 10upx;
						}
						.goodDetail{
							flex: 1;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							.name,.price,.remainNum,.handleBtn{
								display: flex;
							}
							.name{
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								-webkit-box-orient: vertical;
							}
							.price{
								font-size: 20upx;
								align-items: flex-end;
							}
							.changeNum,.isPutaway,.change{
								width: 100upx;
								height: 40upx;
								text-align: center;
								line-height: 40upx;
							}
							.remainNum{
								display: flex;
								align-items: center;
								.num{
									padding: 0 20upx;
									margin-left: 10upx;
									color: #007AFF;
									border: 2upx solid #007AFF;
								}
							}
							.handleBtn{
								display: flex;
								.isPutaway{
									color: red;
									border:2upx solid red;
									border-radius: 10upx;
								}
								.noPutaway{
									color: #eee;
									border:2upx solid #eee;
									border-radius: 10upx;
								}
								.change{
									margin-left: 20upx;
									color: #fff;
									background-color: red;
									border:2upx solid red;
									border-radius: 10upx;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
