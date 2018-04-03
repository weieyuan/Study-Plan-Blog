// addEventListener("message", function(event){
//     var res = sum(event.data);
//     this.postMessage(res);
//     //this.close();//worker终止之后不可以重新启动
// });

this.onmessage = function(event){
    var res = sum(event.data);
    this.postMessage(res);
};

function sum(arr){
    if(arr.length == 0){
        return;
    }
    return arr.reduce(function(acc, cur){
        return acc + cur;
    });
}

