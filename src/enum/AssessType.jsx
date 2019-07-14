/**
 * 指标服务类型
 *
 * @type {}
 */
const AssessType = {
  REALTIME: "REALTIME",
  ASYN: "ASYN",
  BATCH: "BATCH",
  isRealTime(code) {
    return code == this.REALTIME;
  },
  isAsyn(code) {
    return code == this.ASYN;
  },
  isBatch(code) {
    return code == this.BATCH;
  },
  getDescByCode(code) {
    if (this.isRealTime(code)) {
      return "实时";
    }
    if (this.isAsyn(code)) {
      return "异步";
    }
    if (this.isBatch(code)) {
      return "批量";
    }
  }
};

export default AssessType;
