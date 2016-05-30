var app = angular.module('MyApp',
        [
            'ngResource',
            'ngMessages',
            'ngAnimate',
            'toastr',
            'ui.router',
            'satellizer',
            'jcs-autoValidate',
            'ngMaterial',
            'ngTagsInput',
            'ngAutocomplete',
            'angular-ladda',
            'datatables',
            'ngResource',
            'ui.bootstrap',
            "ngSanitize",
            "com.2fdevs.videogular",
            "com.2fdevs.videogular.plugins.poster"
            


        ]);
app.config(function ($stateProvider, $urlRouterProvider, $authProvider, $locationProvider) {
    $stateProvider
            .state('index', {
                url: '/index',
                controller: 'homeCtrl',
                templateUrl: 'pages/home.html'

            })
            .state('home', {
                url: '/',
                controller: 'homeCtrl',
                templateUrl: 'pages/home.html'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'pages/login.html',
                controller: 'LoginCtrl',
                resolve: {
                    skipIfLoggedIn: skipIfLoggedIn
                },
                params: {
                    emailVerified: null
                }
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'pages/signup.html',
                controller: 'SignupCtrl',
                resolve: {
                    skipIfLoggedIn: skipIfLoggedIn
                },
                params: {
                    tourguide: null
                }
            })
            .state('logout', {
                url: '/logout',
                template: null,
                controller: 'LogoutCtrl'
            })
            .state('profile', {
                url: '/profile',
                controller: 'ProfileCtrl',
                templateUrl: 'pages/profile.html',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .state('term', {
                url: '/term',
                templateUrl: 'pages/term.html',
                controller: 'termCtrl'

            }).state('becometourguide', {
        url: '/becometourguide',
        templateUrl: 'pages/becometourguide.html',
        controller: 'becomeTourguideCtrl'


    }).state('passwordReset', {
        url: '/passwordReset',
        controller: 'PasswordResetCtrl',
        templateUrl: 'pages/passwordReset.html'

    }).state('newPassword', {
        url: '/newPassword?emailAddress=${email}',
        controller: function ($scope, $stateParams) {
            // get the id
            $scope.emailAddress = $stateParams.email;

            // get the location
            $scope.newPassword = true;
            $scope.resetPassword = false;
        },
        templateUrl: 'pages/passwordReset.html'

    }).state('dashboard', {
        url: '/dashboard',
        controller: 'AngularWayChangeDataCtrl',
        templateUrl: 'pages/admin-dashboard.html',
        resolve: {
            adminloginRequired: adminloginRequired
        }

    }).state('list', {
        url: '/list',
        controller: 'listViewCtrl',
        templateUrl: 'pages/tourguide-list-view.html'

    }).state('listDetail', {
        url: '/listDetail',
        controller: 'listDetailCtrl',
        templateUrl: 'pages/list-detail-view.html'

    }).state('booking', {
        url: '/booking',
        controller: 'bookingCtrl',
        templateUrl: 'pages/booking.html'

    }).state('user_admin', {
        url: '/user_admin',
        controller: 'adminCtrl',
        templateUrl: 'pages/adminLogin.html',
         resolve: {
            adminUrlRequeste: adminUrlRequeste
        }

    }).state('emailVerification', {
        url: '/emailVerification',
        controller: function ($state) {
            $state.go('login', {emailVerified: true});
        }

    }).state('aboutus', {
        url: '/aboutus',
        templateUrl: 'pages/about-us.html',
        controller: 'aboutusCtrl'


    }).state('contactus', {
        url: '/contactus',
        templateUrl: 'pages/contact-us.html',
        controller: 'contactCtrl'


    }).state('coming-soon', {
        url: '/coming-soon',
        templateUrl: 'pages/coming-soon.html',
//        controller: 'contactCtrl'


    });

    $urlRouterProvider.otherwise('/');

    $authProvider.withCredentials = false;

    if (window.location.host === 'localhost:8383') {
        //local dev
        $authProvider.baseUrl = 'http://localhost:8080/';
        $authProvider.facebook({
            clientId: '959764637427221',
            redirectUri: (window.location.origin || window.location.protocol + '//' + window.location.host) + '/',
            url: 'http://localhost:8080/auth/facebook',
            scope: ['email', 'user_birthday']
//                    scope: ['email']
        });

        $authProvider.google({
            clientId: '1063684996500-2gk0ejdiq02b68thlnggavb8arfmtobu.apps.googleusercontent.com',
            url: 'http://localhost:8080/auth/google',
            redirectUri: (window.location.origin || window.location.protocol + '//' + window.location.host) + '/'

        });
    }
    if (window.location.host === 'qa-tourgoat.rhcloud.com') {
        // cloud QA
        $authProvider.baseUrl = 'http://qatourgoat.cfapps.io';
        $authProvider.facebook({
            clientId: '959764637427221',
            redirectUri: (window.location.origin || window.location.protocol + '//' + window.location.host) + '/',
            url: 'http://qatourgoat.cfapps.io/auth/facebook',
            scope: ['email', 'user_birthday']
//                    scope: ['email']
        });
        $authProvider.google({
            clientId: '1063684996500-2gk0ejdiq02b68thlnggavb8arfmtobu.apps.googleusercontent.com',
            url: 'hhttp://qatourgoat.cfapps.io/auth/google',
            redirectUri: (window.location.origin || window.location.protocol + '//' + window.location.host) + '/'
        });
    }
    if (window.location.host === 'tourgoat.com.s3-website-us-west-2.amazonaws.com' ) {
        // cloud prod
        $authProvider.baseUrl = 'http://tourgoatapp-env.us-west-2.elasticbeanstalk.com/';
        $authProvider.facebook({
            clientId: '959764637427221',
            redirectUri: (window.location.origin || window.location.protocol + '//' + window.location.host) + '/',
            url: 'http://tourgoatapp-env.us-west-2.elasticbeanstalk.com/auth/facebook',
            scope: ['email', 'user_birthday']
//                    scope: ['email']
        });
        $authProvider.google({
            clientId: '1063684996500-2gk0ejdiq02b68thlnggavb8arfmtobu.apps.googleusercontent.com',
            url: 'http://tourgoatapp-env.us-west-2.elasticbeanstalk.com/auth/google',
            redirectUri: (window.location.origin || window.location.protocol + '//' + window.location.host) + '/'
        });
    }
 if (  window.location.host === 'www.tourgoat.com' || window.location.origin === 'https://www.tourgoat.com') {
        // cloud prod
        $authProvider.baseUrl = 'https://afro-mart.com/';
        $authProvider.facebook({
            clientId: '959764637427221',
            redirectUri: (window.location.origin || window.location.protocol + '//' + window.location.host) + '/',
            url: 'https://afro-mart.com/auth/facebook',
            scope: ['email', 'user_birthday']
//                    scope: ['email']
        });
        $authProvider.google({
            clientId: '1063684996500-2gk0ejdiq02b68thlnggavb8arfmtobu.apps.googleusercontent.com',
            url: 'https://afro-mart.com/auth/google',
            redirectUri: (window.location.origin || window.location.protocol + '//' + window.location.host) + '/'
        });
    }


    function skipIfLoggedIn($q, $auth) {
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
            deferred.reject();
        } else {
            deferred.resolve();
        }
        return deferred.promise;
    }

    function loginRequired($q, $location, $auth) {
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
            deferred.resolve();
        } else {
            $location.path('/login');
        }
        return deferred.promise;
    }
    function adminloginRequired($q, $location, $auth) {
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
            deferred.resolve();
        } else {
            $location.path('/user_admin');
        }
        return deferred.promise;
    }
      function adminUrlRequeste ($q, $location, $auth) {

        if ($auth.isAuthenticated()) {
            $auth.logout();
            $location.path('/user_admin');
        } else{
            $location.path('/user_admin');
        }
    }
});
app.run(function (defaultErrorMessageResolver) {
    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
        errorMessages['minPassword'] = 'Please enter at least 6 characters long ';
        errorMessages['maxPassword'] = 'Please enter at max 15 characters long';
        errorMessages['passwordMismatch'] = 'Password confirmation does not match Password”';
        errorMessages['emailMismatch'] = 'Please Email must match';
        errorMessages['onlyText'] = 'Please enter letters only';
        errorMessages['numberOnly'] = 'Please enter only number';
        errorMessages['compareTo'] = 'Password confirmation does not match Password';
        errorMessages['passwordRequired'] = 'Password is required';
        errorMessages['badAdderss'] = 'Please enter a valid address';
        errorMessages['subjectMsg'] = 'Please enter max of 100 characters';
        errorMessages['aboutYouErrMsg'] = 'Please enter max of 500 characters';
        errorMessages['minAge'] = 'Please enter a valid birthday';
        errorMessages['maxAge'] = 'You Do Not meet the  minimum age requirement of 18 years';
        errorMessages['onlyTextAndNumber'] = 'Please enter letter ';
        errorMessages['maxlength'] = 'Please enter at max 25 characters long';


    });
}
);

app.run(['$rootScope', '$location', '$window', function ($rootScope, $location, $window) {
        $rootScope.$on('$stateChangeSuccess',
                function (event) {
                    if (!$window.ga)
                        return;
                    $window.ga('send', 'pageview', {page: $location.path()});
                });
    }]);
