/* global io, define */
define([

], function () {

    var adminCtrl = function ($scope) {
        $scope.users = [];
        $scope.flairApps = [];
        $scope.flairAppError = "";
        $scope.adminok = {
            appFlair: {}
        };
        $scope.adminspin = {
            appFlair: {}
        };

        $scope.getFlairApps = function () {
            io.socket.get("/flair/apps/all", function (data, res) {
                if (res.statusCode === 200) {
                    $scope.flairApps = data;
                    $scope.$apply();
                }
            });
        };

        $scope.getBannedUsers = function () {
            io.socket.get("/user/banned", function (data, res) {
                if (res.statusCode === 200) {
                    $scope.users = data;
                    $scope.$apply();
                }
            });
        };

        $scope.banUser = function (user, ban) {
            var url = "/user/ban";

            io.socket.post(url, {userId: user.id, ban: ban}, function (data, res) {
                if (res.statusCode === 200) {
                    $scope.getBannedUsers();
                    $scope.$apply();
                } else {
                    console.log("Error");
                }
            });
        };

        $scope.denyApp = function (id, $index) {
            var url = "/flair/app/deny";
            $scope.flairAppError = "";

            io.socket.post(url, {id: id}, function (data, res) {
                if (res.statusCode === 200) {
                    $scope.flairApps.splice($index, 1);
                    $scope.$apply();
                } else {
                    $scope.flairAppError = "Couldn't deny, for some reason.";
                    $scope.$apply();
                    console.log(data);
                }
            });
        };

        $scope.approveApp = function (id, $index) {
            $scope.adminok.appFlair[$index] = false;
            $scope.adminspin.appFlair[$index] = true;
            $scope.flairAppError = "";
            var url = "/flair/app/approve";

            io.socket.post(url, {id: id}, function (data, res) {
                if (res.statusCode === 200) {
                    $scope.flairApps.splice($index, 1);
                    $scope.adminok.appFlair[$index] = true;
                } else {
                    $scope.flairAppError = "Couldn't approve, for some reason.";
                    console.log(data);
                }
                $scope.adminspin.appFlair[$index] = false;
                $scope.$apply();
            });
        };

        $scope.getBannedUsers();
        $scope.getFlairApps();
    };

    return adminCtrl;
});