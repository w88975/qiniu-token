var qiniuToken = {
    config: {
        access_key : '',
        secret_key : '',
        bucketname: ''
    },

    getFlags: function () {
        var linuxTime = 3600 + Math.floor(Date.now() / 1000);
        var flags = {"bucketname": this.config.bucketname, "deadline": linuxTime};
        return flags;
    },
    byteArrayToString: function (byteArray) {
       var string = '', l = byteArray.length, i;
       for (i = 0; i < l; i++) {
           string += String.fromCharCode(byteArray[i]);
       }
       return string;
   },

    urlsafeBase64EncodeFlag: function () {
        return this.base64_encode(JSON.stringify(this.getFlags()));
    },

    wordsToByteArray:function(words) {
      var bytes = [], i;
      for (i = 0; i < words.length * 32; i += 8) {
          bytes.push((words[i >>> 5] >>> (24 - i % 32)) & 0xFF);
      }
      return bytes;
    },

    base64ToUrlSafe:function(v) {
        return v.replace(/\//g, '_').replace(/\+/g, '-');
    },

    getToken: function () {
        var encodedFlags = this.urlsafeBase64EncodeFlag();
        var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA1, this.config.secret_key);
        hmac.update(encodedFlags);
        var words = hmac.finalize().words;
        var base64str = this.base64_encode(this.byteArrayToString(this.wordsToByteArray(words)));
        var encodedSign = this.base64ToUrlSafe(base64str);
        var uploadToken = this.config.access_key + ':' + encodedSign + ':' + encodedFlags;
        return uploadToken;
    },


    byteArrayToString: function(byteArray) {
          var string = '', l = byteArray.length, i;
          for (i = 0; i < l; i++) {
              string += String.fromCharCode(byteArray[i]);
          }
          return string;
    },

    base64_encode: function(str){
        var c1, c2, c3;
        var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var i = 0, len= str.length, string = '';

        while (i < len){
                c1 = str.charCodeAt(i++) & 0xff;
                if (i == len){
                        string += base64EncodeChars.charAt(c1 >> 2);
                        string += base64EncodeChars.charAt((c1 & 0x3) << 4);
                        string += "==";
                        break;
                }
                c2 = str.charCodeAt(i++);
                if (i == len){
                        string += base64EncodeChars.charAt(c1 >> 2);
                        string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                        string += base64EncodeChars.charAt((c2 & 0xF) << 2);
                        string += "=";
                        break;
                }
                c3 = str.charCodeAt(i++);
                string += base64EncodeChars.charAt(c1 >> 2);
                string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                string += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
                string += base64EncodeChars.charAt(c3 & 0x3F);
        }
        return string;
    }

};
