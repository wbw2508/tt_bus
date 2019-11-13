/**
 * @Author: Jeffrey
 * @Date: 2019-04
 * @Github: https://github.com/YYJeffrey/wxutil
 */

/**
 * request用法：
 * 1.request.get(url).then((data) => {}).catch((error) => {})
 * 2.request.post({url: url, data: {}, header: {}}).then((data) => {}).catch((error) => {})
 * 3.request.put({url: url, data: {}, header: {}}).then((data) => {}).catch((error) => {})
 * 4.request.patch({url: url, data: {}, header: {}}).then((data) => {}).catch((error) => {})
 * 5.request.delete({url: url, data: {}, header: {}}).then((data) => {}).catch((error) => {})
 * @param {JSON Object} handler
 */
const request = {
  get(handler) {
    if (typeof handler === "string") {
      handler = {
        url: String(handler),
        data: {}
      };
    }
    return this.Request("GET", handler);
  },

  post(handler) {
    return this.Request("POST", handler);
  },

  put(handler) {
    return this.Request("PUT", handler);
  },

  patch(handler) {
    return this.Request("PATCH", handler);
  },

  delete(handler) {
    return this.Request("DELETE", handler);
  },

  // RequestHandler
  Request(method, handler) {
    const { url, data, header } = handler;
    const head = {
      "content-type": "application/json"
    };
    const token = getStorage("x-auth-token");
    if (token) {
      head["x-auth-token"] = token;
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: data,
        header: Object.assign(head, header),
        method:
          ["GET", "POST", "PATCH", "PUT", "DELETE"].indexOf(method) > -1
            ? method
            : "GET",
        success(res) {
          resolve(res);
        },
        fail() {
          reject("request failed");
        }
      });
    });
  }
};

/**
 * file用法：
 * 1.file.download(url).then((data) => {})
 * 2.file.upload({url: url, fileKey: fileKey, filePath: filePath, data: {}, header: {}}).then((data) => {})
 * @param {JSON Object} handler
 */
const file = {
  download(handler) {
    if (typeof handler === "string") {
      handler = {
        url: String(handler)
      };
    }
    const { url, filePath, header } = handler;
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: url,
        filePath: filePath,
        header: header,
        success(res) {
          resolve(res);
        },
        fail() {
          reject("downloadFile failed");
        }
      });
    });
  },

  upload(handler) {
    const { url, fileKey, filePath, data, header } = handler;
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: url,
        name: fileKey,
        filePath: filePath,
        formData: data,
        header: header,
        success(res) {
          resolve(res);
        },
        fail() {
          reject("uploadFile failed");
        }
      });
    });
  }
};

/**
 * socket用法：
 * let socketOpen = false
 * socket.connect(url)
 *
 * wx.onSocketMessage((res) => {
 *  console.log(res)
 * }
 *
 * wx.onSocketOpen((res) => {
 *  socketOpen = true
 *  if socketOpen: socket.send("hello").then((data) => {})
 *  socket.close(url) || wx.closeSocket()
 * })
 */
const socket = {
  connect(url, handler = {}) {
    const { header, protocols } = handler;
    const head = {
      "content-type": "application/json"
    };
    return new Promise((resolve, reject) => {
      wx.connectSocket({
        url: url,
        header: Object.assign(head, header),
        protocols: typeof protocols === "undefined" ? [] : protocols,
        success(res) {
          resolve(res);
        },
        fail() {
          reject("connect failed");
        }
      });
    });
  },

  // 需在onSocketOpen回调内使用
  send(data) {
    return new Promise((resolve, reject) => {
      wx.sendSocketMessage({
        data: data,
        success(res) {
          resolve(res);
        },
        fail() {
          reject("sendSocket failed");
        }
      });
    });
  },

  close(url) {
    wx.connectSocket({
      url: url
    });
  }
};

/**
 * image用法：
 * 1.image.save(path).then((data) => {})
 * 2.image.preview([])
 * 3.image.choose(1).then((data) => {})
 * @param {JSON Object} handler
 */
const image = {
  save(path) {
    return new Promise((resolve, reject) => {
      wx.saveImageToPhotosAlbum({
        filePath: path,
        success(res) {
          resolve(res);
        },
        fail() {
          reject("saveImage failed");
        }
      });
    });
  },

  preview(urls) {
    wx.previewImage({
      urls: urls
    });
  },

  choose(count = 9, sourceType = ["album", "camera"]) {
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: count,
        sourceType: sourceType,
        success(res) {
          resolve(res);
        },
        fail() {
          reject("chooseImage failed");
        }
      });
    });
  }
};

/**
 * showToast用法：
 * showToast("成功")
 * @param {String} title
 * @param {JSON Object} handler
 */
const showToast = (title, handler = {}) => {
  const { icon, image, duration, mask } = handler;
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      image: image,
      icon: typeof icon === "undefined" ? "none" : icon,
      duration: typeof duration === "undefined" ? 1000 : duration,
      mask: typeof mask === "undefined" ? true : mask,
      success(res) {
        resolve(res);
      },
      fail() {
        reject("showToast failed");
      }
    });
  });
};

/**
 * showModal用法：
 * showModal("提示", "这是一个模态弹窗")
 * @param {String} title
 * @param {String} content
 * @param {JSON Object} handler
 */
const showModal = (title, content, handler = {}) => {
  const {
    showCancel,
    cancelText,
    confirmText,
    cancelColor,
    confirmColor
  } = handler;
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: title,
      content: content,
      showCancel: typeof showCancel === "undefined" ? true : showCancel,
      cancelText: typeof cancelText === "undefined" ? "取消" : cancelText,
      confirmText: typeof confirmText === "undefined" ? "确定" : confirmText,
      cancelColor: typeof cancelColor === "undefined" ? "#000000" : cancelColor,
      confirmColor:
        typeof confirmColor === "undefined" ? "#576B95" : confirmColor,
      success(res) {
        resolve(res);
      },
      fail() {
        reject("showModal failed");
      }
    });
  });
};

/**
 * showLoading用法：
 * showLoading("加载中")
 * @param {String} title
 * @param {Boolean} mask
 */
const showLoading = (title, mask = false) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      mask: mask,
      success(res) {
        resolve(res);
      },
      fail() {
        reject("showLoading failed");
      }
    });
  });
};

/**
 * showActionSheet用法：
 * showActionSheet(['A', 'B', 'C']).then((data) => {})
 * @param {Array.<String>} itemList
 * @param {String} itemColor
 */
const showActionSheet = (itemList, itemColor = "#000000") => {
  return new Promise(resolve => {
    wx.showActionSheet({
      itemList: itemList,
      itemColor: itemColor,
      success(res) {
        resolve(res.tapIndex);
      },
      fail() {
        return;
      }
    });
  });
};

/**
 * setStorage用法：
 * 1.setStorage("userInfo", userInfo)
 * 2.setStorage("userInfo", userInfo, 86400)
 * @param {String} key
 * @param {Object} value
 * @param {Int} time 过期时间，可选参数
 */
const setStorage = (key, value, time) => {
  const dtime = "_deadtime";
  wx.setStorageSync(key, value);
  const seconds = parseInt(time);
  if (seconds > 0) {
    let timestamp = Date.parse(new Date()) / 1000 + seconds;
    wx.setStorageSync(key + dtime, timestamp + "");
  } else {
    wx.removeStorageSync(key + dtime);
  }
};

/**
 * getStorage用法：
 * getStorage("userInfo")
 * @param {String} key
 */
const getStorage = key => {
  const dtime = "_deadtime";
  const deadtime = parseInt(wx.getStorageSync(key + dtime));
  if (deadtime && Date.parse(new Date()) / 1000 > parseInt(deadtime)) {
    return null;
  }
  const res = wx.getStorageSync(key);
  return res ? res : null;
};

/**
 * getLocation用法：
 * getLocation().then((data) => {})
 * @param {String} type
 * @param {Boolean} watch
 */
const getLocation = (type = "gcj02", watch = false) => {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: type,
      success(res) {
        resolve(res);
        const latitude = res.latitude;
        const longitude = res.longitude;
        if (watch) {
          wx.openLocation({
            latitude,
            longitude,
            scale: 18
          });
        }
      },
      fail() {
        reject("getLocation failed");
      }
    });
  });
};

/**
 * getUserInfo用法：
 * getUserInfo(true).then((data) => {})
 * @param {Boolean} login
 * @param {String} lang
 */
const getUserInfo = (login = false, lang = "zh_CN") => {
  let code = null;
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      withCredentials: login,
      lang: lang,
      success(res) {
        if (login) {
          wx.login({
            success(data) {
              code = data.code;
              res.code = code;
              resolve(res);
            }
          });
        } else {
          resolve(res);
        }
      },
      fail() {
        reject("getUserInfo failed");
      }
    });
  });
};

/**
 * 微信支付 - requestPayment用法:
 * requestPayment({timeStamp: timeStamp, nonceStr: nonceStr, packageValue: packageValue, paySign: paySign}).then((data) => {})
 * @param {JSON} handler
 */
const requestPayment = handler => {
  const { timeStamp, nonceStr, packageValue, paySign, signType } = handler;
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      timeStamp: timeStamp,
      nonceStr: nonceStr,
      package: packageValue,
      paySign: paySign,
      signType: typeof signType === "undefined" ? "MD5" : signType,
      success(res) {
        resolve(res);
      },
      fail() {
        reject("requestPayment failed");
      }
    });
  });
};

/**
 * 小程序自动更新 - autoUpdate用法:
 * autoUpdate()
 */
const autoUpdate = () => {
  const updateManager = wx.getUpdateManager();
  updateManager.onCheckForUpdate(res => {
    if (res.hasUpdate) {
      updateManager.onUpdateReady(() => {
        showModal("更新提示", "新版本已经准备好，是否重启应用？").then(res => {
          if (res.confirm) {
            updateManager.applyUpdate();
          }
        });
      });
      updateManager.onUpdateFailed(() => {
        showModal(
          "更新提示",
          "新版本已经准备好，请删除当前小程序，重新搜索打开"
        );
      });
    }
  });
};

/**
 * 字符串判不为空 - isNotNull用法：
 * isNotNull("text")
 * @param {String} text 字符串
 * @return {Boolean} 字符串合法返回真否则返回假
 */
const isNotNull = text => {
  if (text == null) {
    return false;
  }
  if (text.match(/^\s+$/)) {
    return false;
  }
  if (text.match(/^\s*$/)) {
    return false;
  }
  if (text.match(/^[ ]+$/)) {
    return false;
  }
  if (text.match(/^[ ]*$/)) {
    return false;
  }
  return true;
};

/**
 * 获取日期时间 - getDateTime用法：
 * getDateTime()
 * @param {Date} date 'yy-mm-dd hh:MM:ss'
 */
const getDateTime = (date = new Date()) => {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (day >= 0 && day <= 9) {
    day = "0" + day;
  }
  if (hour >= 0 && hour <= 9) {
    hour = "0" + hour;
  }
  if (minute >= 0 && minute <= 9) {
    minute = "0" + minute;
  }
  if (second >= 0 && second <= 9) {
    second = "0" + second;
  }
  return (
    year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
  );
};

/**
 * 获取时间戳 - getTimestamp用法：
 * getTimestamp()
 * @param {Date} date
 */
const getTimestamp = (date = new Date()) => {
  return date.getTime();
};

module.exports = {
  request: request,
  file: file,
  socket: socket,
  image: image,
  showToast: showToast,
  showModal: showModal,
  showLoading: showLoading,
  showActionSheet: showActionSheet,
  setStorage: setStorage,
  getStorage: getStorage,
  getLocation: getLocation,
  getUserInfo: getUserInfo,
  requestPayment: requestPayment,
  autoUpdate: autoUpdate,
  isNotNull: isNotNull,
  getDateTime: getDateTime,
  getTimestamp: getTimestamp
};
