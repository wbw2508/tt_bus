<template>
	<view class="good">
		<image :src="good.img" mode=""></image>
		<view class="goodDetail">
			<view class="name">{{good.name}}</view>
			<view class="price">
				<view class="active" style="color: red;margin-right: 10upx;"><text>￥</text><text style="font-size:26upx;font-weight: bold;">{{good.originalPrice}}</text></view>
				<view class="origin" style="color: #999;text-decoration:line-through">￥{{good.activePrice}}</view>
			</view>
			<view class="remainNum">
				<view class="text">剩余库存：</view>
				<view class="num">{{good.remainNum}}</view>
			</view>
			<view class="handleBtn">
				<block v-if="type=='busNormal' || type=='busSeckill'">
					<view class="isPutaway" @click="putaway">上架</view>
					<view class="handle" @click="showHandle">操作</view>
				</block>
				<block v-else-if="type=='platformNormal' || type=='platformSeckill'">
					<view class="isPutaway" @click="shieldGood(good)">屏蔽</view>
				</block>
				<block v-else-if="type=='shieldNormal' || type=='shieldSeckill'">
					<view class="isPutaway" @click="useGood(good)">启用</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			good:{
				type:Object,
				default:{}
			},
			type:{
				type:String,
				default:'busNormal'
			}
		},
		data() {
			return {
				handleList:{
					'busNormal': ["修改库存","转为秒杀品","编辑"],
					'busSeckill': ["修改库存","转为普通品","编辑"]
				}
			};
		},
		created() {
			console.log(this.type)
		},
		methods:{
			showHandle(){
				uni.showActionSheet({
					itemList:this.handleList[this.type],
					success:res => {
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
						console.log(this.good)
						this.$parent.currentGood = this.good
						if(res.tapIndex == 0){
							this.$parent.isShowPopup = true
						}else if(res.tapIndex == 1){
							
						}else if(res.tapIndex == 2){
							// uni.navigateTo({
							// 	url:'../pages/goodAdd/goodAdd'
							// })
						}
					},
					fail(res) {
						console.log(res.errMsg)
					}
				})
			},
			//上架
			putaway(){
				uni.navigateTo({
					url:'../goodPutaway/goodPutaway'
				})
			},
			// 屏蔽商品
			shieldGood(good){
				console.log('屏蔽商品：',good.nm)
			},
			//启用商品
			useGood(){
				console.log('启用商品：',good.nm)
			}
		}
	}
</script>

<style lang="scss">
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
		.name,.price,.remainNum{
			line-height: 40upx;
			height: 40upx;
			display: flex;
			margin-bottom: 10upx;
		}
		.name{
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			height: 80upx;
		}
		.price{
			font-size: 20upx;
			align-items: flex-end;
		}
		.changeNum,.isPutaway,.handle{
			width: 100upx;
			height: 40upx;
			text-align: center;
			line-height: 40upx;
		}
		.remainNum{
			display: flex;
			align-items: center;
			.num{
				margin-left: 10upx;
			}
		}
		.handleBtn{
			display: flex;
			.isPutaway,.noPutaway,.handle{
				border-radius: 10upx;
				box-sizing: border-box;
			}
			.isPutaway{
				color: red;
				border:2upx solid red;
			}
			.noPutaway{
				color: #eee;
				border:2upx solid #eee;
			}
			.handle{
				margin-left: 20upx;
				color: #fff;
				background-color: red;
				border:2upx solid red;
			}
		}
	}
}
</style>
