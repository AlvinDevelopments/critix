
function fetch(){
  let res = $('#response');
  // console.log(res.html());
    // console.log('starting request');

  $.ajax({

    type: 'GET',
    // url: 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/krnshadow?api_key=RGAPI-444bf5e1-280b-49d9-b6f0-9f95cee544af',
    url: '/test',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    success: function(result,status,xhr){
      console.log("success!!");
      res.append(result);
    },
  });

  // console.log('finished!');
    // res.html("<div id='response'>finished!</div>");
    // console.log(comment);

}
