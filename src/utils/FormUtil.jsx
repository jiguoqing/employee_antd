import * as CollectionUtil from './CollectionUtil';

/**
 * 从表单当中获取集合 (主要针对过灰度策略过滤条件)
 *
 * @param formData
 * @returns {Array}
 */
export function fetchKeyAndValues(formData) {
  if (CollectionUtil.isEmpty(formData)) {
    return [];
  }
  const data = [];
  for (let key in formData) {
    if (key.indexOf("paramKey-") != -1) {
      let suffix = key.replace("paramKey-", "");
      let operatorKey = "paramOperator-" + suffix;
      let valueKey = "paramValue-" + suffix;
      data.push({
        key: formData[key],
        operator: formData[operatorKey],
        value: formData[valueKey]
      });
    }
  }
  return data;
}