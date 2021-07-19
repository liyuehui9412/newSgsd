// pages/revenue/revenue.js
import * as echarts from '../../../ec-canvas/echarts';
const util = require('../../../utils/util');
const app = getApp();
//曲线图
var chart = null;
let lineChartData = {
	xData:[],
	seriesData: [],
	total: 0
}
let initOption = function () {
	return {
		grid: {
			left: '5%',
			right: '5%',
			top: '10%',
			bottom: '5%',
			containLabel: true
		},
		dataZoom: [{
			type: "inside",
			startValue: lineChartData.xData.length - 9,
			endValue: lineChartData.xData.length -1
		}],
		tooltip: {
			trigger: 'axis',
			confine:true,
		},
		xAxis: {
			type: 'category',
			name: '',
			nameLocation: 'middle',
			nameTextStyle: {
				color: "#fff",
				fontSize: 10,
				padding: 10
			},
			splitLine: {
				show: false,
				//  改变轴线颜色
				lineStyle: {
					type: 'dashed',
					color: '#DCE0EE'
				}
			},
			axisTick: { //y轴刻度线
				show: false
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#fff',
					fontSize: 10
				}
			},
			boundaryGap: true, //X轴从0开始
			axisLine: {
				show: false,
				lineStyle: {
					color: '#fff',
					width: 1, //这里是坐标轴的宽度
				}
			},
			data: lineChartData.xData
		},
		yAxis: {
			name: '',
			x: 'center',
			type: 'value',
			nameLocation: 'center',
			nameGap: 0,
			// max: mNum,
			// min: 0,
			splitNumber: 10,
			//interval: 200, //间隔
			minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数。
			nameTextStyle: { //文字样式
				color: '#fff',
				fontSize: 10
			},
			axisTick: { //y轴刻度线
				show: false
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#fff',
					fontSize: 10
				}
			},
			axisLine: {
				show: false,
				lineStyle: {
					color: '#fff',
					width: 1, //这里是坐标轴的宽度
				}
			},
			splitLine: {
				//show: false,
				lineStyle: {
					type: 'solid',
					color: '#DCE0EE'
				}
			}
		},
		series: [{
			name: '',
			type: 'line',
			color: ['#1BE6DA'],
			markPoint: {
				symbol:'circle',
				symbolSize:20,
			},
			itemStyle: {
				normal: {
					label: {
						color: '#fff',
						show: true, //开启显示
						position: 'top', //在上方显示
						textStyle: { //数值样式
							color: 'white',
							fontSize: 10
						}
					}
				},
			},
			data: lineChartData.seriesData
		}]
	}
}

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		ec:{
			onInit: (canvas, width, height, dpr) =>{
			chart = echarts.init(canvas, null, {
				width: width,
				height: height,
				devicePixelRatio: dpr // new
			});
			canvas.setChart(chart);
			return chart;
			}
		},
		num: 1,
		remainSpace: [],
		totalSpace: [],
		total: lineChartData.total
	},
	handlerGobackClick(delta) {
    const pages = getCurrentPages();
    if (pages.length >= 2) {
      wx.navigateBack({
        delta: delta
      });
    } else {
      wx.switchTab({
        url: '/pages/index/index'
      });
    }
  },

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		wx.showLoading();
		this.getData();
		this.getLineData();
	},
	getData: function(e){
		util.ajax({
			url:"data-analysis/api/parkingLotStatistics/parkingInformation",
			method:"POST",
			success:res=>{
				if(res.success){
					this.setData({
						remainSpace: res.data.remainSpace,
						totalSpace: res.data.totalSpace
					})
				}
				wx.hideLoading();
			},
			fail:error=>{
				wx.hideLoading();
			}
		})
	},
	getLineData: function(e){
		util.ajax({
			url:"data-analysis/api/parkingLotStatistics/parkingSpaceRevenue?type=2",
			method:"POST",
			success:res=>{
				if(res.success){
					lineChartData.xData = [];
					lineChartData.seriesData = [];
					lineChartData.total = 0;
					for(let i = 0; i < res.data.length; i++){
						lineChartData.total += res.data[i].income
						lineChartData.xData.push(res.data[i].date.substring(8,10))
						lineChartData.seriesData.push(res.data[i].income)
					}
					this.setData({
						total: lineChartData.total
					})
				}
				this.initChart();
				wx.hideLoading();
			},
			fail:error=>{
				wx.hideLoading();
			}
		})
	},
	getLineData1: function(e){
		util.ajax({
			url:"data-analysis/api/parkingLotStatistics/parkingSpaceRevenue?type=3",
			method:"POST",
			success:res=>{
				if(res.success){
					lineChartData.xData = [];
					lineChartData.seriesData = [];
					lineChartData.total = 0;
					for(let i = 0; i < res.data.length; i++){
						lineChartData.total += res.data[i].income
						lineChartData.xData.push(res.data[i].date.substring(6,8))
						lineChartData.seriesData.push(res.data[i].income)
					}
					this.setData({
						total: lineChartData.total
					})
					this.initChart();
				}
				wx.hideLoading();
			},
			fail:error=>{
				wx.hideLoading();
			}
		})
	},

	initChart(){
		let chartSet = function (){
			if(chart){
				console.log(chart)
				chart.setOption(initOption())
				console.log('set chart')
			}else{
				setTimeout(()=>{
					console.log("chart is null")
					chartSet();
				},500)
			}
		};
		chartSet();
	},

	/**
	 * 图表切换
	 */
	chartsClick: function(e){
		var that = this;
		var num = e.currentTarget.dataset.num;
		if (that.data.num == num) {return false} 
		else {
			that.setData({num: e.currentTarget.dataset.num})
		}
		if(num == 1){
			that.getLineData();
		}
		else if(num == 2){
			that.getLineData1();
		}
		that.setData({
			num: e.currentTarget.dataset.num
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {
		
	},
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {
		chart = null;
	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})