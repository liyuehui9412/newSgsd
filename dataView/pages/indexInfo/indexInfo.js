// pages/indexInfo/indexInfo.js
// pages/memData/memData.js
import * as echarts from '../../../ec-canvas/echarts';
const util = require('../../../utils/util');
const app = getApp();
var chart = null;
var chart1 = null;
var chart2 = null;
var chart3 = null;
var chart4 = null;
var chart5 = null;
var chart6 = null;
let pieChartData = {
	totalNumberOfMembers: 0,
	totalNumberOfMaleMembers: [],
	totalNumberOfFemaleMembers: [],
	totalNumberOfOtherMembers: []
}
let lineChartData = {
	xData: [],
	seriesData: []
}
let radarChartData = {
	indicatorMale: [],
	indicatorFemale: [],
	indicatorOther: [],
	maleCount: [],
	famaleCount: [],
	otherCount: []
}
let chartData = {
	couponGivenCount: 0,
	couponGainRatio: 0,
	couponUsedRatio: 0
}

function initOption() {
	return {
		tooltip: {
			show: false
		},
		grid: {
			left: 60,
		},
		title: {
			text: pieChartData.totalNumberOfMembers + '人',
			subtext: ' 会员总数',
			right: 'center',
			top: '40%',
			textStyle: {
				fontSize: 14,
				color: '#3f3d60'
			},
			subtextStyle: {
				fontSize: 10
			}
		},
		color: ['#1be6da', '#ff555d', '#929292'],
		series: [{
			name: '会员',
			type: 'pie',
			radius: ['65%', '85%'],
			center: ['50%', '50%'],
			// roseType: 'radius',
			stillShowZeroSum: true,
			data: [{
					value: pieChartData.totalNumberOfMaleMembers,
					name: '男性会员'
				},
				{
					value: pieChartData.totalNumberOfFemaleMembers,
					name: '女性会员'
				},
				{
					value: pieChartData.totalNumberOfOtherMembers,
					name: '其他会员'
				}
			],
			label: {
				show: false,
			},
		}]
	};
}

function initOption1() {
	return {
		grid: {
			left: '2%',
			right: '3%',
			top: '10%',
			bottom: '5%',
			containLabel: true
		},
		dataZoom: [{
			type: "inside",
			start: 50
		}],
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
					color: '#000',
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
			type: 'value',
			show: false
		},
		series: [{
			name: '',
			type: 'bar',
			barWidth: 20,
			color: ['#1BE6DA'],
			// itemStyle: {
			// 	normal: {
			// 		color:"#3f505d",
			// 		barBorderRadius: [8, 8, 0, 0],
			// 		label: {
			// 			show: true, //开启显示
			// 			position: 'top', //在上方显示
			// 			textStyle: { //数值样式
			// 				color: '#fff',
			// 				fontSize: 10
			// 			}
			// 		}
			// 	},
			// 	emphasis:{
			// 		color:"#1be6da"
			// 	}
			// },
			itemStyle: {
				borderRadius: 5,

				borderColor: 'transparent',
				borderWidth: 3,
				color: '#7a819e'
			},
			showBackground: true,
			backgroundStyle: {
				color: {
					type: 'linear',
					x: 0,
					y: 0,
					x2: 1,
					y2: 0,
					colorStops: [{
						offset: 0,
						color: '#9c9bb3'
					}, {
						offset: 0.2,
						color: '#d9d9e7'
					}, {
						offset: 0.4,
						color: '#d9d9e7'
					}, {
						offset: 0.6,
						color: '#d9d9e7'
					}, {
						offset: 1,
						color: '#dadeec'
					}],
					global: false // 缺省为 false
				},
				borderColor: '#ebeef8',
				borderWidth: 3,
				borderRadius: 5,
				opacity: 1
			},
			data: lineChartData.seriesData,
			emphasis:{
				label:{
					position: 'top',
					show: true,
					color:"#e5004f"
				},
				itemStyle:{
					color:"#e5004f"
				}
			}
		}]
	};
}

function initOption2() {
	return {
		tooltip: {
			trigger: 'item',
			formatter: function (param) {
				return '' +
					radarChartData.indicatorMale[0].name + ':' + param.value[0] + '\n' +
					radarChartData.indicatorMale[1].name + ':' + param.value[1] + '\n' +
					radarChartData.indicatorMale[2].name + ':' + param.value[2] + '\n' +
					radarChartData.indicatorMale[3].name + ':' + param.value[3] + '\n' +
					radarChartData.indicatorMale[4].name + ':' + param.value[4] + '\n' +
					radarChartData.indicatorMale[5].name + ':' + param.value[5]
			},
			axisPointer: {
				type: 'shadow'
			}
		},
		color: "#3e8dfe",
		radar: {
			name: {
				textStyle: {
					color: '#fff'
				}
			},
			indicator: radarChartData.indicatorMale,
		},
		series: [{
			name: '年龄分布',
			type: 'radar',
			data: [{
				value: radarChartData.maleCount,
				name: '男性',
				areaStyle: {
					opacity: 0.6,
					color: '#3e8dfe'
				}
			}]
		}]
	};
}

function initOption3() {
	return {
		tooltip: {
			trigger: 'item',
			formatter: function (param) {
				return '' +
					radarChartData.indicatorFemale[0].name + ':' + param.value[0] + '\n' +
					radarChartData.indicatorFemale[1].name + ':' + param.value[1] + '\n' +
					radarChartData.indicatorFemale[2].name + ':' + param.value[2] + '\n' +
					radarChartData.indicatorFemale[3].name + ':' + param.value[3] + '\n' +
					radarChartData.indicatorFemale[4].name + ':' + param.value[4] + '\n' +
					radarChartData.indicatorFemale[5].name + ':' + param.value[5]
			},
			axisPointer: {
				type: 'shadow'
			}
		},
		color: "#D11D2A",
		radar: {
			name: {
				textStyle: {
					color: '#fff'
				}
			},
			indicator: radarChartData.indicatorFemale,
		},
		series: [{
			name: '年龄分布',
			type: 'radar',
			data: [{
				value: radarChartData.famaleCount,
				name: '女性',
				areaStyle: {
					opacity: 0.6,
					color: '#D11D2A'
				}
			}]
		}]
	};
}

function initOption4() {
	return {
		tooltip: {
			trigger: 'item',
			formatter: function (param) {
				return '' +
					radarChartData.indicatorOther[0].name + ':' + param.value[0] + '\n' +
					radarChartData.indicatorOther[1].name + ':' + param.value[1] + '\n' +
					radarChartData.indicatorOther[2].name + ':' + param.value[2] + '\n' +
					radarChartData.indicatorOther[3].name + ':' + param.value[3] + '\n' +
					radarChartData.indicatorOther[4].name + ':' + param.value[4] + '\n' +
					radarChartData.indicatorOther[5].name + ':' + param.value[5]
			},
			axisPointer: {
				type: 'shadow'
			}
		},
		color: "#1BE6DA",
		radar: {
			name: {
				textStyle: {
					color: '#fff'
				}
			},
			indicator: radarChartData.indicatorOther,
		},
		series: [{
			name: '年龄分布',
			type: 'radar',
			data: [{
				value: radarChartData.otherCount,
				name: '其他',
				areaStyle: {
					opacity: 0.6,
					color: '#1BE6DA'
				}
			}]
		}]
	};
}

function initOption5() {
	var placeHolderStyle = {
		normal: {
			color: 'rgba(124,228,245,0.2)',
		},
	};

	return {
		title: {
			text: ` ` + chartData.couponGivenCount + `\n发放数量`,
			top: "center",
			left: "center",
			textStyle: {
				fontSize: 12,
				color: '#ffffff'
			}
		},
		tooltip: {
			show: false,
			formatter: "{a}：{d}%"
		},
		legend: {
			orient: '',
			itemGap: 12,
			left: '25%',
			top: 'center',
			textStyle: {
				color: "#fff",
			},
			data: ['领取数量', '使用数量', '核销率']
		},
		series: [{
				type: 'pie',
				hoverAnimation: false,
				clockWise: false,
				radius: ['60%', '80%'],
				itemStyle: {
					normal: {
						color: '#4cabfe',
						label: {
							show: false
						},
						labelLine: {
							show: false
						}
					}
				},
				data: [{
						value: 1 - chartData.couponGainRatio,
						itemStyle: placeHolderStyle
					},
					{
						value: chartData.couponGainRatio,
					}
				],
			},
			{
				type: 'pie',
				clockWise: false,
				hoverAnimation: false,
				radius: ['60%', '80%'],
				itemStyle: {
					normal: {
						color: '#ffaf00',
						label: {
							show: false
						},
						labelLine: {
							show: false
						}
					}
				},
				data: [{
						value: 1 - chartData.couponUsedRatio,
						itemStyle: placeHolderStyle
					},
					{
						value: chartData.couponUsedRatio,
					}
				]
			},
			/**{
				type: 'pie',
				clockWise: false,
				hoverAnimation: false, 
				radius: ['70%', '80%'],
				itemStyle: {
					normal: {
						color: '#01ebb9',
						label: {
							show: false
						},
						labelLine: {
							show: false
						}
					}
				},
				data: [{
					value: 1-chartData.couponGainRatio,
					itemStyle: placeHolderStyle
				},
				{
					value: chartData.couponGainRatio,
				}]
			}**/
		]
	};;
}

function initOptions6() {
	return {
		grid: {
			left: 60,
			right: 90,
		},
		xAxis: {
			type: 'category',
			data: ['本周', '上周', '19年同期'],
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				interval: 0
			}
		},
		yAxis: {
			type: 'value'
		},
		series: [{
			data: [120, 180, 150],
			label: {
				show: true,
				position: 'top',
				valueAnimation: true
			},
			type: 'bar',
			barWidth: 35,
			itemStyle: {
				borderRadius: 5,
				borderColor: 'transparent',
				borderWidth: 3,
				color: '#7a819e'
			},
			showBackground: false,
			backgroundStyle: {
				color: {
					type: 'linear',
					x: 0,
					y: 0,
					x2: 1,
					y2: 0,
					colorStops: [{
						offset: 0,
						color: '#9c9bb3' // 0% 处的颜色
					}, {
						offset: 0.2,
						color: '#d9d9e7' // 0% 处的颜色
					}, {
						offset: 0.4,
						color: '#d9d9e7' // 0% 处的颜色
					}, {
						offset: 0.6,
						color: '#d9d9e7' // 0% 处的颜色
					}, {
						offset: 1,
						color: '#dadeec' // 100% 处的颜色
					}],
					global: false // 缺省为 false
				},
				borderColor: '#ebeef8',
				borderWidth: 3,
				borderRadius: 5,
				opacity: 1
			},
			emphasis:{
				label:{
					color:"#e5004f"
				},
				itemStyle:{
					color:"#e5004f"
				}
			}
		}]
	}
}

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		ec: {
			onInit: (canvas, width, height, dpr) => {
				chart = echarts.init(canvas, null, {
					width: width,
					height: height,
					devicePixelRatio: dpr // new
				});
				canvas.setChart(chart);
				return chart;
			},
		},
		ec1: {
			onInit: (canvas, width, height, dpr) => {
				chart1 = echarts.init(canvas, null, {
					width: width,
					height: height,
					devicePixelRatio: dpr // new
				});
				canvas.setChart(chart1);
				return chart1;
			},
		},
		ec2: {
			onInit: (canvas, width, height, dpr) => {
				chart2 = echarts.init(canvas, null, {
					width: width,
					height: height,
					devicePixelRatio: dpr // new
				});
				canvas.setChart(chart2);
				return chart2;
			},
		},
		ec3: {
			onInit: (canvas, width, height, dpr) => {
				chart3 = echarts.init(canvas, null, {
					width: width,
					height: height,
					devicePixelRatio: dpr // new
				});
				canvas.setChart(chart3);
				return chart3;
			},
		},
		ec4: {
			onInit: (canvas, width, height, dpr) => {
				chart4 = echarts.init(canvas, null, {
					width: width,
					height: height,
					devicePixelRatio: dpr // new
				});
				canvas.setChart(chart4);
				return chart4;
			},
		},
		ec5: {
			onInit: (canvas, width, height, dpr) => {
				chart5 = echarts.init(canvas, null, {
					width: width,
					height: height,
					devicePixelRatio: dpr // new
				});
				canvas.setChart(chart5);
				return chart5;
			}
		},
		ec6: {
			onInit: (canvas, width, height, dpr) => {
				chart6 = echarts.init(canvas, null, {
					width: width,
					height: height,
					devicePixelRatio: dpr // new
				});
				canvas.setChart(chart6);
				return chart6;
			}
		},
		totalScore: [],
		GainCount: [],
		GainRatio: [],
		GivenCount: [],
		UsedCount: [],
		UsedRatio: [],
		num: 1,
		flag: "月",
		totalNumberOfMembers: [],
		totalNumberOfMaleMembers: [],
		proportionOfMaleMembers: [],
		totalNumberOfFemaleMembers: [],
		proportionOfFemaleMembers: [],
		proportionOfOtherMembers: [],
		totalNumberOfOtherMembers: [],
		totalMember: [],
		maleMembersYearOnYear: [],
		previousPeriodTotalNumberOfMaleMembers: [],
		presentNumberOfMaleMembers: [],
		femaleMembersYearOnYear: [],
		previousPeriodTotalNumberOfFemaleMembers: [],
		presentNumberOfFemaleMembers: [],
		otherMembersYearOnYear: [],
		previousPeriodTotalNumberOfOtherMembers: [],
		presentNumberOfOtherMembers: [],

		activeflow: '本周',
		flowdata: '', //客流  本周/本月/本年

		activeMember: "男性",
		memberdata: '',

		flowList: []
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
	handleclickTab(event) {
		console.log(event)
		var dataval = event.target.dataset.val;
		var activeflow = event.target.id;
		this.setData({
			activeflow
		});
		let obj = {
			'本周': 11111111,
			'本月': 11111111,
			'本年': 11111111
		}
		let obj1 = {
			'点击率': 11111111,
			'日活跃': 11111111,
			'月活跃': 11111111
		}
		switch (dataval) {
			case "客流":
				var activeflow = event.target.id;
				this.setData({
					activeflow
				});
				this.setData({
					flowdata: obj[activeflow]
				})
				break;
			case "会员":
				var activeMember = event.target.id;
				this.setData({
					activeMember
				});
				this.setData({
					memberdata: obj1[activeMember]

				})
				break;

			default:
				this.setData({
					activeflow: "本周",
					memberdata: "点击率"
				});
				break;
		}











	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		wx.showLoading();
		this.getData();
		this.getLineData();
		this.getRadarData();
		this.getRadarData1();
		this.getRadarData2();
		this.getData1();
		this.getCouponData();
	},
	getData: function (e) {
		util.ajax({
			url: "data-analysis/api/general/member/menberData",
			method: "POST",
			success: res => {
				if (res.success) {
					pieChartData.totalNumberOfMembers = res.data.totalNumberOfMembers;
					pieChartData.totalNumberOfMaleMembers = res.data.totalNumberOfMaleMembers;
					pieChartData.totalNumberOfFemaleMembers = res.data.totalNumberOfFemaleMembers;
					pieChartData.totalNumberOfOtherMembers = res.data.totalNumberOfOtherMembers;
					this.setData({
						totalNumberOfMembers: res.data.totalNumberOfMembers,
						totalNumberOfMaleMembers: res.data.totalNumberOfMaleMembers,
						totalNumberOfFemaleMembers: res.data.totalNumberOfFemaleMembers,
						proportionOfFemaleMembers: res.data.proportionOfFemaleMembers,
						proportionOfMaleMembers: res.data.proportionOfMaleMembers,
						proportionOfOtherMembers: res.data.proportionOfOtherMembers,
						totalNumberOfOtherMembers: res.data.totalNumberOfOtherMembers
					})
					this.initChart();
				}
				wx.hideLoading();
			},
			fail: error => {
				wx.hideLoading();
			}
		})
	},
	getLineData: function (e) {
		util.ajax({
			url: "data-analysis/api/general/member/membershipGrowthTrendStatistics?type=2",
			method: "POST",
			success: res => {
				if (res.success) {
					lineChartData.xData = [];
					lineChartData.seriesData = [];
					for (let i = 0; i < res.data.membershipGrowthTrend.length; i++) {
						lineChartData.xData.push(res.data.membershipGrowthTrend[i].date);
						lineChartData.seriesData.push(res.data.membershipGrowthTrend[i].numberOfMembers)
					}
					this.setData({
						flag: "月",
						totalMember: res.data.yearMembershipData.totalNumberOfMembers,
						maleMembersYearOnYear: res.data.yearMembershipData.maleMembersYearOnYear,
						previousPeriodTotalNumberOfMaleMembers: res.data.yearMembershipData.previousPeriodTotalNumberOfMaleMembers,
						presentNumberOfMaleMembers: res.data.yearMembershipData.totalNumberOfMaleMembers,
						femaleMembersYearOnYear: res.data.yearMembershipData.femaleMembersYearOnYear,
						previousPeriodTotalNumberOfFemaleMembers: res.data.yearMembershipData.previousPeriodTotalNumberOfFemaleMembers,
						presentNumberOfFemaleMembers: res.data.yearMembershipData.totalNumberOfFemaleMembers,
						otherMembersYearOnYear: res.data.yearMembershipData.otherMembersYearOnYear,
						previousPeriodTotalNumberOfOtherMembers: res.data.yearMembershipData.previousPeriodTotalNumberOfOtherMembers,
						presentNumberOfOtherMembers: res.data.yearMembershipData.totalNumberOfOtherMembers,
					})
					let chartSet = function () {
						if (chart1) {
							console.log(chart1)
							chart1.setOption(initOption1())
							console.log('set chart')
						} else {
							setTimeout(() => {
								console.log("chart is null")
								chartSet();
							}, 500)
						}
					};
					chartSet();
				}
				wx.hideLoading();
			},
			fail: error => {
				wx.hideLoading();
			}
		})
	},
	getLineData1: function (e) {
		util.ajax({
			url: "data-analysis/api/general/member/membershipGrowthTrendStatistics?type=3",
			method: "POST",
			success: res => {
				if (res.success) {
					lineChartData.xData = [];
					lineChartData.seriesData = [];
					for (let i = 0; i < res.data.membershipGrowthTrend.length; i++) {
						lineChartData.xData.push(res.data.membershipGrowthTrend[i].date);
						lineChartData.seriesData.push(res.data.membershipGrowthTrend[i].numberOfMembers)
					}
					this.setData({
						flag: "年",
						totalMember: res.data.yearMembershipData.totalNumberOfMembers,
						maleMembersYearOnYear: res.data.yearMembershipData.maleMembersYearOnYear,
						previousPeriodTotalNumberOfMaleMembers: res.data.yearMembershipData.previousPeriodTotalNumberOfMaleMembers,
						presentNumberOfMaleMembers: res.data.yearMembershipData.totalNumberOfMaleMembers,
						femaleMembersYearOnYear: res.data.yearMembershipData.femaleMembersYearOnYear,
						previousPeriodTotalNumberOfFemaleMembers: res.data.yearMembershipData.previousPeriodTotalNumberOfFemaleMembers,
						presentNumberOfFemaleMembers: res.data.yearMembershipData.totalNumberOfFemaleMembers,
						otherMembersYearOnYear: res.data.yearMembershipData.otherMembersYearOnYear,
						previousPeriodTotalNumberOfOtherMembers: res.data.yearMembershipData.previousPeriodTotalNumberOfOtherMembers,
						presentNumberOfOtherMembers: res.data.yearMembershipData.totalNumberOfOtherMembers,
					})
					let chartSet = function () {
						if (chart1) {
							console.log(chart1)
							chart1.setOption(initOption1())
							console.log('set chart')
						} else {
							setTimeout(() => {
								console.log("chart is null")
								chartSet();
							}, 500)
						}
					};
					chartSet();
				}
				wx.hideLoading();
			},
			fail: error => {
				wx.hideLoading();
			}
		})
	},
	getRadarData: function (e) {
		util.ajax({
			url: "data-analysis/api/general/member/ageStatistics",
			method: "POST",
			success: res => {
				if (res.success) {
					radarChartData.maleCount = [];
					//radarChartData.famaleCount = [];
					//radarChartData.otherCount = [];
					radarChartData.indicatorMale = [];
					//radarChartData.indicatorFemale = [];
					//radarChartData.indicatorOther = [];
					for (let i = 0; i < res.data.length; i++) {
						radarChartData.maleCount.push(res.data[i].maleCount);
						//radarChartData.famaleCount.push(res.data[i].femaleCount);
						//radarChartData.otherCount.push(res.data[i].otherCount);
						radarChartData.indicatorMale.push({
							name: res.data[i].rangeName,
							max: res.data[i].maxMale
						});
						//radarChartData.indicatorFemale.push({
						//name:res.data[i].rangeName,
						//max:res.data[i].maxFemale
						//});
						//radarChartData.indicatorOther.push({
						//name:res.data[i].rangeName,
						//max:res.data[i].maxOther
						//});
					}
					let chartSet = function () {
						if (chart2) {
							console.log(chart2)
							chart2.setOption(initOption2())
							console.log('set chart')
						} else {
							setTimeout(() => {
								console.log("chart is null")
								chartSet();
							}, 500)
						}
					};
					chartSet();
				}
				wx.hideLoading();
			},
			fail: error => {
				wx.hideLoading();
			}
		})
	},
	getRadarData1: function (e) {
		util.ajax({
			url: "data-analysis/api/general/member/ageStatistics",
			method: "POST",
			success: res => {
				if (res.success) {
					//radarChartData.maleCount = [];
					radarChartData.famaleCount = [];
					//radarChartData.otherCount = [];
					//radarChartData.indicatorMale = [];
					radarChartData.indicatorFemale = [];
					//radarChartData.indicatorOther = [];
					for (let i = 0; i < res.data.length; i++) {
						//radarChartData.maleCount.push(res.data[i].maleCount);
						radarChartData.famaleCount.push(res.data[i].femaleCount);
						//radarChartData.otherCount.push(res.data[i].otherCount);
						//radarChartData.indicatorMale.push({
						//name:res.data[i].rangeName,
						//max:res.data[i].maxMale
						//});
						radarChartData.indicatorFemale.push({
							name: res.data[i].rangeName,
							max: res.data[i].maxFemale
						});
						//radarChartData.indicatorOther.push({
						//name:res.data[i].rangeName,
						//max:res.data[i].maxOther
						//});
					}
					let chartSet = function () {
						if (chart3) {
							console.log(chart3)
							chart3.setOption(initOption3())
							console.log('set chart')
						} else {
							setTimeout(() => {
								console.log("chart is null")
								chartSet();
							}, 500)
						}
					};
					chartSet();
				}
				wx.hideLoading();
			},
			fail: error => {
				wx.hideLoading();
			}
		})
	},
	getRadarData2: function (e) {
		util.ajax({
			url: "data-analysis/api/general/member/ageStatistics",
			method: "POST",
			success: res => {
				if (res.success) {
					//radarChartData.maleCount = [];
					//radarChartData.famaleCount = [];
					radarChartData.otherCount = [];
					//radarChartData.indicatorMale = [];
					//radarChartData.indicatorFemale = [];
					radarChartData.indicatorOther = [];
					for (let i = 0; i < res.data.length; i++) {
						//radarChartData.maleCount.push(res.data[i].maleCount);
						//radarChartData.famaleCount.push(res.data[i].femaleCount);
						radarChartData.otherCount.push(res.data[i].otherCount);
						//radarChartData.indicatorMale.push({
						//name:res.data[i].rangeName,
						//max:res.data[i].maxMale
						//});
						//radarChartData.indicatorFemale.push({
						//name:res.data[i].rangeName,
						//max:res.data[i].maxFemale
						//});
						radarChartData.indicatorOther.push({
							name: res.data[i].rangeName,
							max: res.data[i].maxOther
						});
					}
					let chartSet = function () {
						if (chart4) {
							console.log(chart4)
							chart4.setOption(initOption4())
							console.log('set chart')
						} else {
							setTimeout(() => {
								console.log("chart is null")
								chartSet();
							}, 500)
						}
					};
					chartSet();
				}
				wx.hideLoading();
			},
			fail: error => {
				wx.hideLoading();
			}
		})
	},
	getData1: function (e) {
		util.ajax({
			url: "data-analysis/api/general/member/score",
			method: "POST",
			success: res => {
				if (res.success) {
					this.setData({
						totalScore: res.data.totalScore
					})
				}
				wx.hideLoading();
			},
			fail: error => {
				wx.hideLoading();
			}
		})
	},
	getCouponData: function (e) {
		util.ajax({
			url: "data-analysis/api/general/member/coupon",
			method: "POST",
			success: res => {
				if (res.success) {
					chartData.couponGivenCount = res.data.couponGivenCount
					chartData.couponGainRatio = res.data.couponGainRatio / 100;
					chartData.couponUsedRatio = res.data.couponUsedRatio / 100;
					this.setData({
						GainCount: res.data.couponGainCount,
						GainRatio: res.data.couponGainRatio,
						GivenCount: res.data.couponGivenCount,
						UsedCount: res.data.couponUsedCount,
						UsedRatio: res.data.couponUsedRatio
					})
				}
				let chartSet = function () {
					if (chart5) {
						console.log(chart5)
						chart5.setOption(initOption5())
						console.log('set chart')
					} else {
						setTimeout(() => {
							console.log("chart is null")
							chartSet();
						}, 500)
					}
				}
				chartSet();
				wx.hideLoading();
			},
			fail: error => {
				wx.hideLoading();
			}
		})
	},
	initChart() {
		let chartSet = function () {
			if (chart) {
				console.log(chart)
				chart.setOption(initOption())
				chart6.setOption(initOptions6())
				console.log('set chart')
			} else {
				setTimeout(() => {
					console.log("chart is null")
					chartSet();
				}, 500)
			}
		};
		chartSet();
	},
	/**
	 * 图表切换
	 */
	chartsClick: function (e) {
		var that = this;
		var num = e.currentTarget.dataset.num;
		if (that.data.num == num) {
			return false
		} else {
			that.setData({
				num: e.currentTarget.dataset.num
			})
		}
		if (num == 1) {
			that.getLineData();
		} else if (num == 2) {
			that.getLineData1();
		}
		that.setData({
			num: e.currentTarget.dataset.num
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {
		chart = null;
		chart1 = null;
		chart2 = null;
		chart3 = null;
		chart4 = null;
	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})