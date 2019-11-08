<template>
	<view>
		<button @tap="upload">上传</button>
		<image-cropper crop-fixed="true" crop-width="200" cropHeight="200" :src="tempFilePath" @confirm="confirm" @cancel="cancel"></image-cropper>
		<image v-if="cropFilePath" :src="cropFilePath" mode="aspectFit" style="width: 100%;"></image>
	</view>
</template>

<script>
	import ImageCropper from "@/components/invinbg-image-cropper/invinbg-image-cropper.vue";
	
	export default {
	    data() {
	        return {
	            tempFilePath: '',
	            cropFilePath: '',
	        }
	    },
	    components: {ImageCropper},
	    methods: {
	        upload() {
	            uni.chooseImage({
	                count: 1, //默认9
	                sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
	                sourceType: ['album'], //从相册选择
	                success: (res) => {
	                    this.tempFilePath = res.tempFilePaths.shift()
	                }
	            });
	        },
	        confirm(e) {
				console.log(e)
	            this.tempFilePath = ''
	            this.cropFilePath = e.detail.tempFilePath
	        },
	        cancel() {
	            console.log('canceled')
	        }
	    },
	}
</script>

<style lang="scss">

</style>
