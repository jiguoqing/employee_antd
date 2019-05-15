/**
 * 操作列表
 */
const Actions = {
  ADD: "ADD",            // 添加
  EDIT: "EDIT",          // 编辑
  DELETE: "DELETE",      // 删除
  RELATE: "RELATE",      // 关联
  DISABLE: "DISABLE",            // 没有权限
  isAdd(code) {
    return code == this.ADD;
  },
  isEdit(code) {
    return code == this.EDIT;
  },
  isDisable(code) {
    return code == this.DISABLE;
  },
  isDelete(code) {
    return code == this.DELETE;
  },
  isRelate(code) {
    return code == this.DISABLE;
  }
};

export default Actions;