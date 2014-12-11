app.controller( 'bodyCtrl', [ '$scope', 'Data' ,
  function( $scope, Data )
  {
    // premium options
            $scope.premiumOptions = function (obj, insuranceType, frequencyCd){
                if(obj.length == 0) {
                    return ;
                }
                var result = {};
                    result.creditOrSurcharge = [];
                for( var i = 0, l = obj.length; i < l; i++ )
                {
                    var tmpObj = obj[i];
                    result.coverageDesc = tmpObj.coverageDesc;
                    result.premiumAmt = obj[i].premiumAmt;
                    result.installmentAmt = obj[i].installmentAmt;
                    if( tmpObj.coverageCd.value == insuranceType && tmpObj.frequencyCd.value == frequencyCd ) {
                        var creditOrSurcharge = tmpObj.creditOrSurcharge ;
                        for (var j = 0, k = creditOrSurcharge.length; j < k; j++  )
                        {
                            var strKey = creditOrSurcharge[j].creditSurchargeCd.value;
                            if(strKey == 'DiscountPercentage'){
                                var strValue = creditOrSurcharge[j].numericValue[0].formatPct.value;
                            }
                            else
                            {
                                var strValue = creditOrSurcharge[j].numericValue[0].formatCurrencyAmt.amt.value;
                            }

                            result.creditOrSurcharge[strKey] = strValue;
                        }
                        break;
                    }
                }
                // console.log('result', result);

                return result;
            }
  }]
);
