import sha1 from 'js-sha1';

export default {
  c_timestamp: function getTimestamp() {
    return Date.parse(new Date().toString());
  },
  randomString: function(len: number) {
    len = len || 32
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    var maxPos = $chars.length
    var pwd = ''
    for (var i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
    }
  return pwd;
  },
  getSignature: function(ticket: string, noncestr: string, timestamp: string) {
    let url = window.location.href.split("#")[0]
    let jsapi_ticket = `jsapi_ticket=${ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`
    return sha1(jsapi_ticket);
  }
} 