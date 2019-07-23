
function GetDownloadList(){
    listurl = 'https://script.google.com/macros/s/AKfycbxwtrgzfyKcI3wkopsmmOpz_ZYpWIRrzDBwbHGay4G4PnxYS6_f/exec'
    $.ajax({
        type: "GET",
        url: listurl,
        datatype:"JSON",
        success: function(data){
            var len = data.list.length;
            var colnum = 0;
            var objs = data.list;
            var html = "";
        
            
            for(var i=0;i <len;++i){
                if(colnum == 0){
                    html += '  <div class="col-md"><div class="text-center h4">OwO</div><div class=text-center>';
                }
                html += '<div class=text-center>' +'<a href="' + objs[i].url + '" role="button" class="download-a btn bg-dark text-white">' + objs[i].name + '</a>' + '</div>';
                colnum++;
                if(colnum*3 >= len){
                    html += '</div>';
                    colnum = 0;
                }
            }
            if(colnum != 0){
                html += '</div>';
            }
            $('#downloaddiv').append(html);
            console.log("download success");
        }
    }

    )
}
GetDownloadList();
/* <div class="container">
<h2 class="text-center text-uppercase text-white">活動流程</h2>
      <hr class="star-light mb-5">
      <div class="row lead">
        <div class="col-md">
          <div class="text-center h4">
            Something Useful
          </div>
          <div class=text-center>
            <button type="button" class="btn bg-dark text-white"> 
              <a href="http://140.112.145.148" class="download-a">宿營手冊</a>
            </button>                          
          </div>
        </div> */