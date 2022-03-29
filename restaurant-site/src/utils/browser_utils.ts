export default {
    isWx: () => {
        var ua = window.navigator.userAgent.toLowerCase();
        let reg = /MicroMessenger/i;
        let matched = ua.match(reg);
        return matched != null && matched.toString() == 'micromessenger';
    },
    isEmpty: (obj: string) => {
        if (typeof obj == "undefined" || obj == null || obj == "") {
            return true;
        } else {
            return false;
        }
    },
    randomString: (len: number) => {
        len = len || 32;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        var maxPos = $chars.length;
        var pwd = '';
        for (var i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    },
    conver: (limit: number) => {
        var size = "";
        if (limit < 0.1 * 1024) { //如果小于0.1KB转化成B  
            size = limit.toFixed(2) + "B";
        } else if (limit < 0.1 * 1024 * 1024) {//如果小于0.1MB转化成KB  
            size = (limit / 1024).toFixed(2) + "KB";
        } else if (limit < 0.1 * 1024 * 1024 * 1024) { //如果小于0.1GB转化成MB  
            size = (limit / (1024 * 1024)).toFixed(2) + "MB";
        } else { //其他转化成GB  
            size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
        }

        var sizestr = size + "";
        var len = sizestr.indexOf("\.");
        var dec = sizestr.substr(len + 1, 2);
        if (dec == "00") {//当小数点后为00时 去掉小数部分  
            return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
        }
        return sizestr;
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
                        // let res: any;
                        // while ((res = reg.exec(arr[i]))) {
                        //     let tempRes: string = res[1];
                        //     obj[tempRes] = needDecode ? decodeURIComponent(res[2]) : res[2]
                        // }
                    }
                }
            }
        }
        return obj;
    },
    getLanguage: () => {
       return localStorage.getItem("language") ? localStorage.getItem("language") : 'ja';
    }
} 