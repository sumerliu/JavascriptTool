function getValidateCode(id17){
    var weight=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2], //十七位数字本体码权重      
    validate=['1','0','X','9','8','7','6','5','4','3','2'], //mod11,对应校验码字符值  
    sum=0,         
    mode=0,
    idArr = id17.split('');          
    for(var i=0;i<idArr.length;i++){              
        sum=sum+parseInt(idArr[i])*weight[i];          
    }          
    mode=sum%11;          
    return validate[mode]; 
}
