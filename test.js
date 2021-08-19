var messCol=document.getElementById("messColumn");
       var con=document.getElementById("content");
     btn.onclick=function(){
          if(messCol.value.trim()==""){
              alert("輸入內容不可為空或者空格");
             return;
          }
        var messDiv=document.createElement("div");
         messDiv.setAttribute("style","width:450px;height:30px;border:2px dotted #808080;margin-bottom:5px;");
       {
            //這個代碼塊用來存放構建messDiv內容的代碼:留言內容和刪除鍵的樣式
            var messCon = document.createElement("div");
            messCon.setAttribute("style","float:left;width:350px;height=30px;line-height:30px;overflow:auto;");
            var del = document.createElement("a");
            del.setAttribute("style","float:left;width:50px;height:30px;line-height:30px;");
            del.setAttribute("href","javascript:;");
            del.innerHTML = "刪除";
            messDiv.appendChild(messCon);
            messDiv.appendChild(del);
            messCon.innerHTML=messCol.value;
           del.onclick=function(){
                 con.removeChild(this.parentNode);   //讓父元素content刪除子元素的messDiv
             }
         }
        con.appendChild(messDiv);
         messCol.value="";   //清空輸入框的字元內容
     }