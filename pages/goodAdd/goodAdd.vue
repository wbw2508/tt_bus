<template>
	<view class="goodAddPage">
		<form class="addForm" @submit="goodAdd" @reset="">
			<view class="line type">
				<label for="type">上架类型</label>
				<picker class="content" mode="selector" :range="type" @change="changeType" :value="typeIndex">
					<view class="typePicker">{{type[typeIndex]}}</view>
				</picker>
			</view>
			<view v-if="isSeckill" class="line limitNum">
				<label for="limitNum">限购份数</label>
				<input class="content" type="number" name="limitNum" value="" id="limitNum" placeholder="请输入限购份数" :disabled="!isSeckill"/>
			</view>
			<view class="line numAll">
				<label for="numAll">库存</label>
				<input class="content" type="number" name="numAll" value="" id="numAll" placeholder="请输入库存"/>
			</view>
			<view class="line category">
				<label for="category">商品类目</label>
				<picker class="content" mode="multiSelector" :range="category" :value="categoryIndex" @columnchange="chooseCategory" @change="changeCategory">
					<view>{{category[0][categoryIndex[0]]}},{{category[1][categoryIndex[1]]}}</view>
				</picker>
			</view>
			<view class="line name">
				<label for="name">商品名称</label>
				<input class="content" type="text" name="name" value="" id="name" placeholder="请输入商品名称">
			</view>
			<view class="line originalPrice">
				<label for="originalPrice">原价</label>
				<input class="content" type="number" name="originalPrice" id="originalPrice" placeholder="请输入原价">
			</view>
			<view class="line activePrice">
				<label for="activePrice">活动价</label>
				<input class="content" type="number" value="" name="activePrice" id="activePrice" placeholder="请输入活动价"/>
			</view>
			<view class="line attribute">
				<input style="width: 120upx;font-weight: bold;" type="text" value="规格" name="attribute" id="attribute" placeholder="属性"/>
				<input class="content" type="text" value="" name="attributeContent" id="attributeContent" placeholder="请输入属性内容"/>
			</view>
			<view class="line sort">
				<label for="sort">商品排序</label>
				<input class="content" type="number" value="" name="sort" id="sort" placeholder="请输入商品顺序"/>
			</view>
			<view class="line firstImg" style="padding: 20upx 30upx;">
				<label for="">首图</label>
				<view class="content">
					<view style="position: relative;display: inline-block;">
						<avatar
							selWidth="200px" selHeight="400upx" @upload="myUpload" :avatarSrc="url"
							avatarStyle="width: 200upx; height: 200upx;">
						</avatar>
						<!-- <image @click="chooseFirstImg" :src="cropFirstImg =='' ? '../../static/photo.jpg' : cropFirstImg" mode=""></image> -->
						<image v-if="cropFirstImg" style="width:30upx;height:30upx;position: absolute;right: -15upx;top: -15upx;" @click="delFirstImg" src="../../static/icon_del.png" mode=""></image>
					</view>
					<view class="tips">需上传一张1：1的图片</view>
				</view>
			</view>
			<view class="line detailImgs" style="padding: 20upx 30upx;">
				<label for="">详情图</label>
				<view class="content" style="display: flex;">
					<view style="position: relative;" v-for="(item,index) in detailImgs" :key="index">
						<image style="width: 160upx;height: 160upx;margin-right: 20upx;" :src="item" mode=""></image>
						<image style="width: 30upx;height: 30upx;position: absolute;top: -15upx;right: 0;" @click="delDetailImg(index)" src="../../static/icon_del.png" mode=""></image>
					</view>
					<image style="width: 160upx;height: 160upx;" v-if="detailImgs.length<3" @click="chooseDetailImgs" src="../../static/photo.jpg" mode=""></image>
					<!-- <view class="tips">最多传三张详情图</view> -->
				</view>
			</view>
			<button form-type="submit">提交</button>
		</form>
		
		<!-- <image-cropper crop-fixed="true" crop-width="200" cropHeight="200" :src="tempFirstImg" @confirm="confirm" @cancel="cancel"></image-cropper> -->
	</view>
</template>

<script>
	import ImageCropper from "@/components/invinbg-image-cropper/invinbg-image-cropper.vue";
	import avatar from "../../components/yq-avatar/yq-avatar.vue";
	
	export default {
		components:{
			ImageCropper,
			avatar
		},
		data() {
			return {
				type:['普通','秒杀'],
				isSeckill:false,
				typeIndex:0,
				category:[['1','2'],['1-1','1-2','1-3']],
				categoryIndex:[0,0],
				url:'../../static/photo.jpg',
				tempFirstImg:'',
				cropFirstImg:'',
				detailImgs:[]
			};
		},
		methods:{
			changeType(e){
				this.typeIndex = e.detail.value
				this.isSeckill = false
				if(e.detail.value == 1){
					this.isSeckill = true
				}
			},
			chooseCategory(e){
				console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value)
				this.categoryIndex[e.detail.column] = e.detail.value
				if(e.detail.value==0 && e.detail.column==0){
					this.category[1] = ['1-1','1-2','1-3']
					this.categoryIndex.splice(1, 1, 0)
				}else if(e.detail.value==1 && e.detail.column==0){
					this.category[1] = ['2-1','2-2']
					this.categoryIndex.splice(1, 1, 0)
				}
				this.$forceUpdate() //强制重新渲染
			},
			changeCategory(e){
				this.categoryIndex = e.detail.value;
			},
			myUpload(rsp) {
			    this.url = rsp.path; //更新头像方式一
			    //rsp.avatar.imgSrc = rsp.path; //更新头像方式二
			},
			chooseFirstImg(){
				if(!this.cropFirstImg){
					uni.chooseImage({
						count: 1, //默认9
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album'], //从相册选择
						success:res => {
							 this.tempFirstImg = res.tempFilePaths.shift()
						}
					})
				}
			},
			// confirm(e) {
			// 	console.log(e)
			//     this.tempFirstImg = ''
			//     this.cropFirstImg = e.detail.tempFilePath
			// },
			// cancel() {
			//     console.log('canceled')
			// },
			delFirstImg(){
				this.tempFirstImg = ''
				this.cropFirstImg = ''
			},
			chooseDetailImgs(){
				uni.chooseImage({
					count:3,
					sizeType:['compressed'],
					success:e => {
						for(let i in e.tempFilePaths){
							this.detailImgs.push(e.tempFilePaths[i])
						}
					}
				})
			},
			delDetailImg(index){
				this.detailImgs.splice(index,1)
			},
			goodAdd(e){
				console.log(e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goodAddPage{
		width: 100vw;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #eee;
		.tips{
			font-size: 24upx;
			color: #999;
		}
		image{
			width: 200upx;
			height: 200upx;
		}
		.addForm{
			margin-top: 20upx;
			padding-top: 20upx;
			font-size: 28upx;
			background-color: #fff;
			padding-bottom: 40upx;
			.line{
				padding: 10upx 30upx;
				// height: 60upx;
				line-height: 60upx;
				display: flex;
				align-items: center;
				border-bottom: 2upx solid #eee;
				label{
					font-weight: bold;
					width:120upx;
				}
				.content{
					margin-left: 40upx;
					flex-grow: 1;
				}
				input{
					height:60upx;
				}
			}
			button{
				font-size: 28upx;
				letter-spacing: 10upx;
				width: 300upx;
				height: 60upx;
				line-height: 60upx;
				border-radius: 10upx;
				margin-top: 30upx;
				background-color: red;
				color: #fff;
			}
		}
	}
</style>
