import Vue from 'vue'
import Vuex from 'vuex'
import { request } from '../utils/wxutil.js'
const api = require('../config/api.js')

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		isLogin:false,
		busId:''
	},
	mutations: {
		
	},
	actions:{
		// 商户登录
		busLogin({ state }, user){
			return new Promise((resolve,reject)=>{
				uni.showLoading({
					mask:true,
					title:'登录中...'
				})
				let params = {
					url:api.busLogin,
					data:user
				}
				request.post(params).then(res => {
					uni.hideLoading()
					if(res.data.code==200){
						uni.setStorageSync('x-auth-token',res.data.data["x-auth-token"])
						uni.setStorageSync('busInfo',{
							busId:res.data.data.busId,
							storeCode:res.data.data.storeCode,
						})
						state.busId = uni.getStorageSync('busInfo').busId
						state.isLogin = true
						resolve('登录成功')
					}else{
						resolve(res.data.message)
					}
				})
			})
		},
		//商户登出
		busLogout({ state }){
			return new Promise((resolve,reject)=>{
				let token = uni.getStorageSync('x-auth-token');
				if(token){
					request.get({
						url:api.busLogout,
						data:{
							token
						}
					}).then(res=>{
						state.isLogin = false
						uni.clearStorageSync()
						resolve(res)
					}).catch(e=>{
						uni.showToast({
							title:'系统异常请稍后重试~~',
							icon:'none'
						})
					})
				}
			})
		},
		// 查询一级分类
		getOneCat({state}){
			return new Promise((resolve,reject)=>{
				let busId = uni.getStorageSync('busInfo').busId
				request.get({
					url:api.listOneCatOfCom,
					data:{
						busId:'1153172403392614401'
					}
				})
				.then(res=>{
					resolve(res)
				})
			})
			
		},
		// 查询二级分类
		getTwoCat({ state },categoryId){
			return new Promise((resolve,reject)=>{
				request.get({
					url:api.listTowCatOfCom,
					data:{
						categoryId
					}
				}).then(res=>{
					resolve(res)
				})
			})
		},
		//查询所有一级和对应的二级分类
		listFirAndSecCatOfCom({ state }){
			return new Promise((resolve,reject)=>{
				let busId = uni.getStorageSync('busInfo').busId
				request.get({
					url:api.listFirAndSecCatOfCom,
					data:{
						busId:'1153172403392614401'
					}
				}).then(res=>{
					resolve(res)
				})
			})
		},
		//商户一级分类查询全部普通商品
		nomalPageAllOneOwnOfCom({ state },{categoryId,secondCategoryId,pageNum}){
			return new Promise((resolve,reject)=>{
				let busId = uni.getStorageSync('busInfo').busId
				request.get({
					url:api.nomalPageAllOneOwnOfCom,
					data:{
						categoryId,
						secondCategoryId,
						busId,
						pageNum
					}
				}).then(res=>{
					resolve(res)
				})
			})
		},
		// 查看订单
		getOrder({ state },{statCd,pageNum}){
			return new Promise((resolve,reject)=>{
				let busId = uni.getStorageSync('busInfo').busId
				request.get({
					url:api.viewOrders,
					data:{
						busId,
						statCd,
						pageNum
					}
				}).then(res=>{
					resolve(res)
				})
			})
		},
	}
})

export default store
