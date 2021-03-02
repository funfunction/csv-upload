

/**
@func
remove keys from the objs
- that are not in the list of keys

@param {string[]} list - of keys
@param {object[]} a - objs that cannot have any keys that are not in the list of keys
@return {object[]}
*/
export const removeKeysInObjsNotInList = (list, a) => {
  const keys = Object.keys(a[0]);
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    if (!list.includes(k)) {
      a = a.map(o => {
        delete o[k];
        return o;
      });
    }
  }
  return a;
};
