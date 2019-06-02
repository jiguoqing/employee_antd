/**
 * 操作列表
 */
const Actions = {
  ADD: "ADD",            // 添加
  EDIT: "EDIT",          // 编辑
  DELETE: "DELETE",      // 删除
  ASSESS: "ASSESS",      // 考核
  isAdd(code) {
    return code == this.ADD;
  },
  isEdit(code) {
    return code == this.EDIT;
  },
  isDelete(code) {
    return code == this.DELETE;
  },
  isAssess(code) {
    return code == this.ASSESS;
  },
};

export default Actions;