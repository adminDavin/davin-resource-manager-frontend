export default {
  isWx: () => {
    var ua = window.navigator.userAgent.toLowerCase();
    let reg = /MicroMessenger/i;
    let matched = ua.match(reg);
    return matched != null && matched.toString() == 'micromessenger';
  },
  isEmpty: (obj: string) => {
    if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
    }else{
        return false;
    }
  },
  isObjEmpty: (actData: object) => {
    return !actData || Object.keys(actData).length == 0;
   },
  queryParams: (href = window.location.href, needDecode = true) => {
    const reg = /([^&=]+)=([\w\W]*?)(&|$|#)/g
    const { search, hash } = new URL(href);
    const args = [search, hash];
    let obj = {};
    for (let i = 0; i < args.length; i++) {
        const str = args[i];
        if (str) {
            const s = str.replace(/#|\//g, '')
            const arr = s.split('?')
            if (arr.length > 1) {
                for (let i = 1; i < arr.length; i++) {
                    let res;
                    while ((res = reg.exec(arr[i]))) {
                        obj[res[1]] = needDecode ? decodeURIComponent(res[2]) : res[2]
                    }
                }
            }
        }
    }
    return obj;
}
} 