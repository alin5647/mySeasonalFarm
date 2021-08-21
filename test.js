var named;
function delete1(id)
{
    localStorage.removeItem(id);
    this.Storage.writeData();
}
function prom() {

    var name = prompt("請輸入您的名字", "");//將輸入的內容賦給變量 name ，
    named = name;
    //這里需要注意的是，prompt有兩個參數，前面是提示的話，后面是當對話框出來后，在對話框里的默認值

    if (named)//如果返回的有內容

    {

        alert("歡迎您：" + name)
        document.getElementById("shangtian").style.display = "none";
        document.getElementById("ritian").value = named;

    }
    else {
        document.getElementById("ritian").value = "匿名發言者";
    }

}
var Storage =
{
 saveData:function()//保存數據
 {

         var data = document.querySelector("#post textarea");
     if(data.value != "")
     {
         var time = new Date().getTime() + Math.random() * 5;//getTime是Date對象中的方法，作用是返回 1970年01月01日至今的毫秒數
         if (named) {
             localStorage.setItem(time, data.value + "|" + named + "|" + this.getDateTime());//將毫秒數存入Key值中，可以降低Key值重復率
         }
         else
         {
             localStorage.setItem(time, data.value + "|" + "匿名發言者" + "|" + this.getDateTime());//將毫秒數存入Key值中，可以降低Key值重復率
         }

         data.value = "";
         this.writeData();
     }
     else
     {
         alert("請填寫您的留言！");
    }
 },
 writeData:function()//輸出數據
 {
    var dataHtml = "", data = "";
     for(var i = localStorage.length-1; i >= 0; i--)//效率更高的循環方法
     {
         data = localStorage.getItem(localStorage.key(i)).split("|");

             //dataHtml += "<p><span class=\"msg\">" + data[0] + "</span><span class=\"datetime\">" + data[1] + "</span><span>" + data[2]+"</span></p>";
         dataHtml += "<span style=>" + data[1] + "<span style=\"float:right\">" + data[2] + "</span><p><span class=\"msg\">" + data[0] + "<input style=\"float:right;border:none;border-radius:5px;\" id=\"clearBt\" type=\"button\" onclick=\"delete1(" + localStorage.key(i) + ");\" value=\"刪除\"/>" + "</span></p>";
     }
     document.getElementById("comment").innerHTML = dataHtml;
 },
 clearData:function()//清空數據
 {
     if(localStorage.length > 0)
     {
         if(window.confirm("清空后不可恢復，是否確認清空？"))
         {
             localStorage.clear();
             this.writeData();
         }
     }
     else
    {
        alert("沒有需要清空的數據！");
     }
 },
 getDateTime:function()//獲取日期時間，例如 2012-03-08 12:58:58
 {
     var isZero = function(num)//私有方法，自動補零
     {
         if(num < 10)
        {
             num = "0" + num;
         }
         return num;
     }
     
     var d = new Date();
     return d.getFullYear() + "-" + isZero(d.getMonth() + 1) + "-" + isZero(d.getDate()) + " " + isZero(d.getHours()) + ":" + isZero(d.getMinutes()) + ":" + isZero(d.getSeconds());
 }            
}

window.onload = function()
{
 Storage.writeData();//當打開頁面的時候，先將localStorage中的數據輸出一邊，如果沒有數據，則輸出空
 document.getElementById("postBt").onclick = function(){Storage.saveData();}//發表評論按鈕添加點擊事件，作用是將localStorage中的數據輸出
 document.getElementById("clearBt").onclick = function(){Storage.clearData();}//清空所有已保存的數據
}