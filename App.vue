<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.container {
	  width: 100vw;
	  height: 100vh;
	  font-size: 28upx;
	  background-color: #fff;
	  display: flex;
	  flex-direction: column;
	} 

</style>
