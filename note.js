// INIT: Password match
if($globalPassword.length){
    $globalPassword.on('change', function(){
        var strPasswordComfirm = $globalPasswordConfirm.val();
        var strPassword = $(this).val();
        if(strPasswordComfirm){
            //$(this).attr({'data-foxtel-equalto':'#reg-password-confirm'});

            if(!$globalPasswordConfirm.parent().hasClass('is-invalid'))
            {
                $(this).attr({'data-foxtel-equalto':'#reg-password-confirm'});
            }
            else
            {
                if(strPassword === strPasswordComfirm ){
                    $globalPasswordConfirm.parent().removeClass('is-invalid').addClass('is-valid').find('ul').removeClass('filled');
                }
            }
        }
        else{
            $(this).removeAttr('data-foxtel-equalto');
        }
    });

    $globalPasswordConfirm.on('change', function(){
        var strPassword = $globalPassword.val();
        var strPasswordComfirm = $(this).val();
        if($(this).parent().hasClass('is-valid') && strPassword === strPasswordComfirm)
        {
            $globalPassword.parent().removeClass('is-invalid').addClass('is-valid').find('ul').removeClass('filled');
        }
    });
}


//Detect IE
if(navigator.appName.indexOf("Internet Explorer")!=-1){     //yeah, he's using IE //abcdef
    var badBrowser=(
        navigator.appVersion.indexOf("MSIE 9")==-1 &&   //v9 is ok
        navigator.appVersion.indexOf("MSIE 1")==-1  //v10, 11, 12, etc. is fine too
    );

    if(badBrowser){
        // navigate to error page
    }
}

//"javascript split".split(" ");

//Server Date

var parseTimeStampFromHeaders = function(request) {
    var headers = request.getAllResponseHeaders().toLowerCase();
    console.log(headers);
    var serverDate = null,
        serverTimeStamp = null;
    if(navigator.appName.indexOf("Internet Explorer")==-1){
        serverDate = headers.match(/date: ([a-z]{3}, [0-9]{2} [a-z]{3} [0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2} gmt)/);
    }
    else
    {
        serverDate = headers.match(/expires: ([a-z]{3}, [0-9]{2} [a-z]{3} [0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2} gmt)/);
    }
    if(serverDate){
        serverTimeStamp = Math.floor(new Date(Date.parse(serverDate[1])).getTime()/1000);
    }
    return serverTimeStamp;
}


Handlebars.registerHelper('dateToCurrent', function (datetime, option) {
    'use strict';
    if (window.moment && moment(datetime).isValid()) {
        var f = option.hash.myFormat,
            d1 = moment(),
            d2 = moment(new Date(datetime));

        // detect IE 8
        if (navigator.appName.indexOf("Internet Explorer") == -1) { //yeah, he's not using IE
            //var diffResult = d2.diff(d1, f);
            return d1.diff(d2, f);
        } else {
            var badBrowser = (
                navigator.appVersion.indexOf("MSIE 9") == -1 && //v9 is ok
                navigator.appVersion.indexOf("MSIE 1") == -1 //v10, 11, 12, etc. is fine too
            );
            if (badBrowser) { // IE lt 9
                var tmpDate = datetime.split("T");
                if (tmpDate[0] && tmpDate[1]) {
                    var tmpDate0 = tmpDate[0].split("-");
                    var tmpDate1 = tmpDate[1].split(":");
                    var datetime2 = new Date(tmpDate0[0], parseInt(tmpDate0[1]) - 1, tmpDate0[2], tmpDate1[0], tmpDate1[1], 0, 0);
                    d2 = moment(datetime2);
                }
            }
            return d1.diff(d2, f);
        }
        // if (diffResult > 1) {
        //     return diffResult + ' ' + f +'s';
        // } else {
        //     return diffResult + ' ' + f;
        // }
    } else {
        console.log(datetime);
    }
});


// Use: <p data-redirect-url="URL">{COOKIE variable}</p>
// Use: class="dyc-set-cookie" data-set-cookie-name="name" data-set-cookie-value="value"
$(function () {
    'use strict';

    var $globalCookieMagic = $('.dyc-cookie');
    var $globalSetcookieMagic = $('.dyc-set-cookie');

    var cookieMagic = function () {

        $globalCookieMagic.each(function (index) {
            var regex = new RegExp(/{COOKIE ([^{}]+)}/g),
                parsString = $globalCookieMagic.eq(index).text().replace(regex, "$1"),
                replaceString = $.cookie(parsString),
                $cookieRedirectURL = $globalCookieMagic.eq(index).attr('data-cookie-redirect-url');
            //console.log($globalCookieMagic.eq(index).text());

            if (replaceString) {
                // replace string
                $globalCookieMagic.eq(index).text(replaceString);
                if($(this).is('[clear-cookie]')){
                    var cookieName = $(this).attr('clear-cookie');
                    $.cookie(cookieName, null, {
                        expires: -1,
                        path: '/'
                    });
                }
            } else if ($cookieRedirectURL) {
                // redirect URL
                window.location = $cookieRedirectURL;
            } else {
                $globalCookieMagic.eq(index).text('This information is not registred in our database');
            }
        });

    };

    var setCookieMagic = function (){

        $globalSetcookieMagic.each(function (index) {
            var cookieName = $(this).attr('data-set-cookie-name'),
                cookieValue = $(this).attr('data-set-cookie-value');
            //$cookieExpires = $(this).attr('data-set-cookie-expires');
            if(cookieName) {
                if(cookieValue) {
                    $.cookie(cookieName, cookieValue, {
                        expires: 1,
                        path: '/'
                    });
                } else {
                    $.cookie(cookieName, null, {
                        expires: -1,
                        path: '/'
                    });
                }

            }
        });
    };

    // INIT set cookie magic
    if ($globalSetcookieMagic.length) {
        setCookieMagic();
    }
    // INIT cookie magic
    if ($globalCookieMagic.length) {
        cookieMagic();
    }

});


var isFocus  = $(requirements[0]).is(':focus');
//isFocus alway true new browser is IE
//is Hover not IE8
if(isFocus){
    if($('html').hasClass('lt-ie9')){
        isFocus = false;
    }
    else
    {
        isFocus = $(requirements[0]).is(':hover');
    }
}

if (typeof(passwordCompare) != 'undefined' && passwordCompare != null)
{
    // Do something with some_variable
}

// if class .video-block exist in the page BRIGHTCOVE
if($globalVideoBlock.length){
    $.getScript(cqPath + '/plugins/jquery.brightcove-video.js', function () {
        $globalVideoBlock.each(function() {
            var playerID = $(this).attr('data-player-id'),
                videoPlayer = $(this).attr('data-video-player'),
                imagePlayer = $(this).attr('data-image-player');
            var onTemplateReady = function(event){
                var $player = $(this);
                $player.brightcoveVideo('overlay', '<img src="'+imagePlayer+'">')
                .on( 'click', function() {
                    $(this).fadeOut();
                    $player.brightcoveVideo('play');
                } );
            };

            if( playerID && videoPlayer) {
                $(this).brightcoveVideo({
                    'playerID': playerID,
                    '@videoPlayer': videoPlayer,
                    'templateReadyHandler': onTemplateReady
                });
            }
        });
    });
}

/*<div class="video-block" data-player-id="1925363807001" data-video-player="1754276221001" data-image-player="etc/designs/foxtel/clientlibs/img/video.jpg">
*/


// load multi json
var $ngAjaxMagic = $('.data-ajax-magic'),
    strUrl = null,
    strName = null,
    ajaxLength = $ngAjaxMagic.length;

$scope.getData=[];

var ajaxMagicData = function(el, n) {
    if(n<0)
    {
      return 0;
    }
    var strUrl = el.eq(n).attr('data-ajax-magic-link');
    var strName = el.eq(n).attr('data-ajax-magic-name');
    if(strUrl && strName){
        $http.get(strUrl).then( function( result ){
            console.log(result.data);
            $scope.getData[strName] = result.data;
            return n + ajaxMagicData(el, n-1);
        });
    }
  };
  $scope.getDataJsonCount = ajaxMagicData($ngAjaxMagic, ajaxLength-1);

  /*<div class="data-ajax-magic" data-ajax-magic-name="select1" data-ajax-magic-link="/etc/wiam/reference/Coles/Motor/CURRTINSUR.1300.json">
</div>
<select
    ng-model="select1"
    ng-options="v.value for (k,v) in getData['select1'] track by k">
</select>

<div class="data-ajax-magic" data-ajax-magic-name="select2" data-ajax-magic-link="/etc/designs/wesfarmers/clientlib/data-test/car.json">
</div>
<br/>
<select
    ng-model="select2"
    ng-options="v.title for (k,v) in getData['select2'] track by k | filter:search:strict">
</select>*/

var orderBy = $filter( 'orderBy' );
var filterBy = $filter( 'filter' );
// filter in angular js
orderBy(filterBy($scope.carModelData,{text: query.term.toUpperCase()},false), 'text', false )


( function()
{
    "use strict";
    // tooltips for info text
    // keep tooltip hover
    var originalLeave = $.fn.tooltip.Constructor.prototype.leave;
    $.fn.tooltip.Constructor.prototype.leave = function(obj){
    var self = obj instanceof this.constructor ?
    obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)
    var container, timeout;

    originalLeave.call(this, obj);

     if(obj.currentTarget) {
        container = $(obj.currentTarget).siblings('.tooltip')
        timeout = self.timeout;
        container.one('mouseenter', function(){
          //We entered the actual tooltip – call off the dogs
          clearTimeout(timeout);
          //Let's monitor tooltip content instead
          container.one('mouseleave', function(){
            $.fn.tooltip.Constructor.prototype.leave.call(self, self);
         });
       })
      }
    };
    // loops through each tooltip
    $('.btn-info').each(function(i){
        // invokes the tooltip
        $(this).tooltip({
            html : true,
            placement : 'bottom',
            title : titleGetter(i), // calls function to return text from corresponding tooltip placement text based on index number
            trigger : "click | hover",
            delay: {show: 50, hide: 400}
        });
    });

    function titleGetter(tooltipIndex){
        return $('.hover-help:eq('+tooltipIndex+')').html();
    }

}() );
