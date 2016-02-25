/**
 * [mbStringLength 计算utf编码字符串字节长度]
 * @param  {[string]} s [需要计算字节长度的字符串]
 * @return {[int]}   [字节数]
 * UCS-2编码(16进制) UTF-8 字节流(二进制) 
 * 0000 - 007F 0xxxxxxx （1字节） 
 * 0080 - 07FF 110xxxxx 10xxxxxx （2字节） 
 * 0800 - FFFF 1110xxxx 10xxxxxx 10xxxxxx （3字节） 
 */
function mbStringLength(s) {
    var totalLength = 0;
    var i;
    var charCode;
    for (i = 0; i < s.length; i++) {
    charCode = s.charCodeAt(i);
        if (charCode < 0x007f) {
            totalLength = totalLength + 1;
        } else if ((0x0080 <= charCode) && (charCode <= 0x07ff)) {
            totalLength += 2;
        } else if ((0x0800 <= charCode) && (charCode <= 0xffff)) {
            totalLength += 3;
        }
    }
    return totalLength;
}
