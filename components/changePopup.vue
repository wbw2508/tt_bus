<template>
	<view class="popup">
		<view class="mask" @click="hidePopup"></view>
		<view class="box">
			<view class="title">{{good.name}}</view>
			<view class="content">
				<view class="text">库存</view>
				<input type="number" :value="good.remainNum" @input="changeNum"/>
			</view>
			<view class="confirm" @click="confirm">确认</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			good:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			hidePopup(){
				this.$parent.hidePopup()
			},
			changeNum(e){
				this.good.remainNum = e.detail.value
			},
			confirm(){
				console.log(this.good.remainNum)
				this.hidePopup()
			}
		}
	}
</script>

<style lang="scss">
	.popup{
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left:0;
		z-index: 100;
		.mask{
			width: 100%;
			height: 100%;
			background-color: rgba($color: #000000, $alpha: 0.4);
		}
		.box{
			width: 480upx;
			height: 400upx;
			background-color: #fff;
			position: absolute;
			top: 0;
			left:0;
			right: 0;
			bottom: 0;
			margin: auto;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			border-radius: 20upx;
			padding: 20upx 30upx;
			box-sizing: border-box;
			.title{
				overflow: hidden;
				text-align: center;
				font-weight: bold;
				font-size:28upx;
				text-overflow: ellipsis;
				white-space:nowrap;
			}
			.content{
				display: flex;
				justify-content: space-around;
				align-items: center;
				.text,input{
					height: 60upx;
					line-height: 60upx;
				}
				input{
					border: 2upx solid #eee;
					box-sizing: border-box;
				}
			}
			.confirm{
				text-align: center;
				background-color: #FF0000;
				color: #FFFFFF;
				height: 60upx;
				line-height: 60upx;
				border-radius: 10upx;
			}
		}
	}
</style>
