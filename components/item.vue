<template>
	<view @click="gotoUrl(item.url)" class="item">
	  <image class="icon" :src="item.icon"></image>
	  <view class="text">{{item.text}}</view>
	</view>
</template>

<script>
	export default {
		props:{
			item:{
				type:Object,
				default:{}
			}
		},
		created() {
			
		},
		data() {
			return {
				
			};
		},
		methods:{
			gotoUrl(url){
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.item{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 20upx 0;
  box-sizing: border-box;
}
.icon{
  width: 80upx;
  height: 80upx;
}
.text{
  font-size: 24upx;
  letter-spacing: 2upx;
}
</style>
