function setup(){

  $("#submit").click(
    function(event){
        // console.log('pres  sed');
        event.preventDefault();


        let u = $('#u').val();
        let p = $('#p').val();
        // console.log(u);
        // console.log(p);
        // let res = $('#response')
        // let res = document.getElementById("response");
        // console.log(res);
        // console.log('continue');
        $.ajax({
          type: 'POST',
          url: '/login',
          dataType : 'json',
          data: {username:u,password:p},
          headers:{
            'Access-Control-Allow-Origin': '*',
            'processData': 'false',
          },
          success: function(result,status,xhr){

            $('#response').replaceWith('FUCK')
            console.log($(result));
            window.location.href = '/'+result.page;


          },
          error:function(result,status,xhr){
            $('#response').replaceWith(result.errorMsg)
            console.log($(result));
          }
        });

        return false;
    }
  );

}
