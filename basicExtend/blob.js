var blob = new Blob(["Hello World!"],{type:"text/plain"});
console.log(blob)
var reader = new FileReader();  
//将文件以文本形式读入页面  
reader.readAsText(blob);  
reader.onload=function(f){
  var result=document.getElementById("result"); 
  //显示文件  
  result.innerHTML=this.result;  
}  
