<template>
	<view class="putawayPage">
		<view class="line goodName">
			<view class="left fontB">商品名称：</view>
			<view class="right">{{goodName.length>15 ? (goodName.slice(0,16) +'...'):goodName}}</view>
		</view>
		<view class="line">
			<text class="fontB">上架时间：</text>{{rangetime[0].replace(/\//g,'-')}}
		</view>
		<view class="line">
			<text class="fontB">下架时间：</text>{{rangetime[1].replace(/\//g,'-')}}
		</view>
		<view class="line changeBox">
			<view class="tips">默认上架时间为<text class="fontB">30</text>天</view>
			<view class="change" @click="onShowDatePicker('rangetime')">修改</view>
		</view>
		<view class="line arrive">
			<view class="left fontB">送达时间：</view>
			<view class="right">次日达</view>
		</view>
		<view class="submit">提交</view>
		<mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" :begin-text="'上架时间'" :end-text="'下架时间'" :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
	</view>
</template>

<script>
	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
	
	function getDate(date) {
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();

		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
	
		return `${year}/${month}/${day}`;
	}
	
	export default {
		components:{
			MxDatePicker
		},
		data() {
			return {
				goodName:'阿萨大大阿萨大大阿松大阿松大阿达丰富的发阿斯蒂芬阿松大',
				showPicker: false,
				rangetime: ['2019/11/11 14:00','2019/11/17 13:59'],
				defaultTime:[],
				type: 'rangetime',
				value: ''
			};
		},
		onLoad() {
			let date = new Date();
			//默认上下架时间间隔三十天
			this.rangetime =  [getDate(date) + ' 00:00:00',getDate(new Date(date.getTime() + 30*24*60*60*1000)) + ' 00:00:00']
			this.defaultTime = this.rangetime
		},
		methods:{
			onShowDatePicker(type){
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
			},
			onSelected(e) {//选择
				this.showPicker = false;
				if(e) {
					if(e.date[0] > e.date[1]){
						uni.showModal({
							title:'提示',
							content:'下架时间应晚于上架时间'
						})
					}else{
						this[this.type] = e.value;
						//选择的值
						console.log('value => '+ e.value);
						//原始的Date对象
						console.log('date => ' + e.date);
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.putawayPage{
		font-size: 28upx;
		padding: 20upx 30upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		.fontB{
			font-weight: bold;
		}
		.line{
			display: flex;
			border-bottom: 2upx solid #eee;
			width: 100%;
			padding: 10upx 0;
			height: 80upx;
			line-height: 80upx;
			margin-top: 40upx;
			&.changeBox{
				justify-content: space-between;
				.tips{
					color: #666;
					font-size: 24upx;
				}
				.change{
					font-size: 30upx;
					padding: 0 30upx;
					border-radius: 10upx;
					height: 100%;
					background-color: green;
					color: #fff;
				}
			}
		}
		.submit{
			color: #fff;
			font-size: 30upx;
			text-align: center;
			background-color: red;
			width: 300upx;
			height: 80upx;
			border-radius: 10upx;
			text-indent: 30upx;
			letter-spacing: 30upx;
			line-height: 80upx;
			margin: 80upx auto;
		}
	}
</style>
