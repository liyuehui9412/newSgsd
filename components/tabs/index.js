module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

console.log(44444,getApp().globalData.baseUrl)
Component({
    options: {
        addGlobalClass: true,
        pureDataPattern: /^_/,
        multipleSlots: true
    },
    properties: {
        tabs: { type: Array, value: [] },
        tabClass: { type: String, value: '' },
        swiperClass: { type: String, value: '' },
        activeClass: { type: String, value: '' },
        tabUnderlineColor: { type: String, value: '#07c160' },
        tabActiveTextColor: { type: String, value: '#000000' },
        tabInactiveTextColor: { type: String, value: '#000000' },
        tabBackgroundColor: { type: String, value: '#e3e7f5' },
        activeTab: { type: Number, value: 0 },
        swipeable: { type: Boolean, value: true },
        animation: { type: Boolean, value: true },
        duration: { type: Number, value: 500 },
        // new data
        dataAllFlow:{type: Object, value: {}},
        dataAllMember:{type: Object, value: {}},
        dataAllSales:{type: Object, value: {}}
    },
    data: {
        currentView: 0,
        activeflow:'??????',
        flowdata:'',//??????  ??????/??????/??????

        activeMember:"??????",
        memberdata:'',

        activeadd:"????????????",
        totalNewMumber:'',
        num:1,

        activeSales:"???????????????",
        salesdata:'',


    },
    attached() {
        
    },
    observers: {
        activeTab: function activeTab(_activeTab) {
            var len = this.data.tabs.length;
            if (len === 0) return;
            var currentView = _activeTab - 1;
            if (currentView < 0) currentView = 0;
            if (currentView > len - 1) currentView = len - 1;
            this.setData({ currentView: currentView });
        },
        dataAllFlow: function dataAllFlow(val) {
            this.setData({
                flowdata:this.data.dataAllFlow.weekPassengerFlow
            })
        },
        dataAllMember: function dataAllMember(val) {
            this.setData({
                memberdata:this.data.dataAllMember.totalNumberOfMaleMembers
            })
        },
        dataAllSales: function dataAllMember(val) {
            this.setData({
                salesdata:this.data.dataAllSales.weekSales,
                totalNewMumber:this.data.dataAllSales.totalNewMumber
            })
        },
    },
    lifetimes: {
        created: function created() {}
    },
    methods: {
        handleTabClick: function handleTabClick(e) {
            var index = e.currentTarget.dataset.index;
            this.setData({ activeTab: index });
            this.triggerEvent('tabclick', { index: index });
        },
        handleSwiperChange: function handleSwiperChange(e) {
            var index = e.detail.current;
            this.setData({ activeTab: index });
            this.triggerEvent('change', { index: index });
        },
        handleTabClickflow(e) {
            let key = e.target.id;
            switch (key) {
                case '??????':
                    wx.navigateTo({
                        url: '/pages/monitor/monitor'
                    })
                    
                    break;
                case '??????':
                    wx.navigateTo({
                        url: '/pages/indexInfo/indexInfo'
                    })
                    
                    break;
            
                default:
                    break;
            }
        }
        //?????? ?????? ??????
        ,handleclickTab(event) {
            console.log(event)
            var dataval = event.target.dataset.val;
            var activeflow = event.target.id;
            this.setData({ activeflow });
            let obj={
                '??????':this.data.dataAllFlow.weekPassengerFlow,
                '??????':this.data.dataAllFlow.monthPassengerFlow,
                '??????':this.data.dataAllFlow.yearPassengerFlow
            }
            let obj1={
                '??????':this.data.dataAllMember.totalNumberOfMaleMembers,
                '??????':this.data.dataAllMember.totalNumberOfFemaleMembers,
                '??????':this.data.dataAllMember.totalNumberOfOtherMembers
            }
            let obj2={
                '????????????':this.data.dataAllMember.totalNumberOfMaleMembers,
                '????????????':this.data.dataAllMember.totalNumberOfFemaleMembers,
                '????????????':this.data.dataAllMember.totalNumberOfOtherMembers
            }
            let obj3={
                '???????????????':this.data.dataAllSales.weekSales,
                '???????????????':this.data.dataAllSales.monthSales,
                '???????????????':this.data.dataAllSales.monthSales
            }
            switch (dataval) {
                case "??????":
                    var activeflow = event.target.id;
                    this.setData({ activeflow });
                    this.setData({
                        flowdata:obj[activeflow]
                    })
                    break;
                case "??????":
                    var activeMember = event.target.id;
                    this.setData({ activeMember });
                    this.setData({
                        memberdata:obj1[activeMember]
                    })
                    break;
                // case "??????1":
                //     var activeadd = event.target.id;
                //     this.setData({ activeadd });
                //     this.setData({
                //         memberdata:obj2[activeadd]
                //     })
                //     break;
                case "??????":
                    var activeSales = event.target.id;
                    this.setData({ activeSales });
                    this.setData({
                        salesdata:obj3[activeSales]
                    })
                    break;
            
                default:
                    break;
            }
            










        },
        getMemberData1: function (e) {
            util.ajax({
                url: "data-analysis/api/general/member/newMemberStatistics?type="+num,
                method: "POST",
                success: res => {
                    if (res.success) {
                        this.setData({
                            totalNewMumber: res.data.totalNumberOfMembers
                        })
                        console.log(3333333333,res.data.totalNumberOfMembers)
                    }
                    wx.hideLoading();
                },
                fail: error => {
                    wx.hideLoading();
                }
            })
        },
    }
});

/***/ })

/******/ });