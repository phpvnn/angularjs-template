app.factory('getJson', function($resource) {

  var loaddata = {};

  loaddata.jsonObjs = [];

  loaddata.fromUrl = function(el, n) {
      //console.log('jsonFromUrl');
        if(n<0)
        {
          return 0;
        }
        var strUrl = el[n].getAttribute('data-ajax-magic-link');
        var strName = el[n].getAttribute('data-ajax-magic-name');
        if(strUrl && strName){
            $http.get(strUrl).then( function( result ){
                //console.log(result.data);
                loaddata.jsonObjs[strName] = result.data;
                return n + loaddata.jsonFromUrl(el, n-1);
            },
            function(error){
              loaddata.jsonObjs[strName] = null;
            });
        }
  };

  return loaddata;
});
