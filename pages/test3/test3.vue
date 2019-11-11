<template>
	<view class="page">
	        <button type="primary" @click="choosePhoto">选择图片</button>
			<image :src="tailorPath" v-if="tailorPath"></image>
			<picture-tailor ref="pictureTailor" :pictureSrc="photoSrc" @createImg="createImg"></picture-tailor>
		</view>
</template>

<script>
	import pictureTailor from "../../components/picture-tailor/pictureTailor.vue";
		
		export default {
			components: {
				pictureTailor
			},
			data() {
				return {
					photoSrc: "",
					tailorPath: ""
				}
			},
			methods: {
				choosePhoto() {
					uni.chooseImage({
						count: 1, //默认9
						success: (res) => {
							this.photoSrc = res.tempFilePaths[0];
							this.$refs.pictureTailor.showTailor();
						}
					});
				},
				createImg(e) {
					this.tailorPath = e;
					console.log(this.tailorPath)
				}
			},
			onBackPress() {
				if (this.$refs.pictureTailor.isShow) {
					this.$refs.pictureTailor.hideTailor();
				}
				return true;
			},
		}
</script>

<style lang="scss">
	button {
		width: 80%;
	}
	
	image {
		// width: 240upx !important;
		// height: 240upx !important;
		// margin: 80upx auto 0;
	}
</style>
