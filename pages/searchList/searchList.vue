<template>
	<view class="searchPage">
		<view class="searchBox">
			<view class="searchInput">
				<image class="searchIcon" src="../../static/icon_ck.png" mode=""></image>
				<input type="text" :value="searchVal" @input="changeVal" placeholder="根据会员名查询" />
				<view v-if="searchVal" class="cancelIcon" @click="clearVal">
					<image src="../../static/btn_qx.png" mode=""></image>
				</view>
			</view>
			<view class="searchBtn" @click="search">搜索</view>
		</view>
		<view class="searchList">
			
		</view>
	</view>
</template>	

<script>
	export default {
		data() {
			return {
				searchVal:'',
			};
		},
		methods:{
			changeVal(e){
				this.searchVal = e.detail.value
			},
			clearVal(){
				this.searchVal = ''
			},
			search(){
				console.log(this.searchVal)
			}
		}
	}
</script>

<style lang="scss">
	.searchPage{
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
					width: 64upx;
					height: 64upx;
					display: flex;
					align-items: center;
					justify-content:center;
					image{
						width: 35upx;
						height: 35upx;
					}
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
	}
</style>
