app.controller("displayController",
        function ($scope, $http) {
            var url = "http://pb-api.herokuapp.com/bars";

            $http.get(url)
                .success(function (response) {
                    $scope.data = response;
                    $scope.toInt = function (val) { return parseInt(val, 10) };
                    $scope.isArray = angular.isArray;
                    $scope.calculatePercentage = function(value,maxLimit) {
                        return Math.round(($scope.toInt(value) * 100) / $scope.toInt(maxLimit));
                    };
                    $scope.limit = $scope.toInt($scope.data.limit, 10);
                    $scope.createKeyValue = function (values) {
                        var objInArray = [];
                        if ($scope.isArray(values)) {

                            values.forEach(function (v, i) {
                                objInArray[i] = { str: v, pCentForWidth: $scope.calculatePercentage(v, $scope.limit), pCentToShow: $scope.calculatePercentage(v, $scope.limit) };
                            });
                        }
                        return objInArray;
                    };
                    $scope.displayBars = $scope.createKeyValue($scope.data.bars);
                    $scope.displayButtons = $scope.createKeyValue($scope.data.buttons);
                    
                    $scope.createBarId = function (index) { return "bar" + index; };
                    $scope.createOptionText = function (index) { return "Bar " + (index + 1) };
                    $scope.btnClick = function (elementId, dValue, iIndex) {
                        var elem = document.getElementById(elementId);
                        if (elem !== null && elem !== "undefined") {
                            var currentValue = $scope.displayBars[iIndex].str;
                            var newValue = parseInt(currentValue, 10) + parseInt(dValue, 10);
                            var percentage = $scope.calculatePercentage(newValue, $scope.limit);

                            if (percentage < 0) {
                                $scope.displayBars[iIndex].pCentForWidth = 0;
                                $scope.displayBars[iIndex].pCentToShow = 0;
                                $scope.displayBars[iIndex].str = 0;
                            }
                            else if (percentage > 0 && percentage <= 100) {
                                $scope.displayBars[iIndex].pCentForWidth = percentage;
                                $scope.displayBars[iIndex].pCentToShow = percentage;
                                $scope.displayBars[iIndex].str = newValue;
                                elem.style.backgroundColor = "#4CAF50";
                            }
                            else {
                                $scope.displayBars[iIndex].pCentForWidth = 100;
                                $scope.displayBars[iIndex].str = newValue;
                                $scope.displayBars[iIndex].pCentToShow = percentage;
                                elem.style.backgroundColor = "red";
                            }
                            
                                
                        } else {
                            alert("Please select a bar from list!");
                        }
                    };

                });
        });