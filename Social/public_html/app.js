angular.module('MyApp', ['ngResource', 'ngMessages', 'ngAnimate', 'toastr', 'ui.router', 'satellizer'])
        .config(function ($stateProvider, $urlRouterProvider, $authProvider) {
            $stateProvider
                    .state('home', {
                        url: '/',
                        controller: 'HomeCtrl',
                        templateUrl: 'partials/home.html'
                    })
                    .state('login', {
                        url: '/login',
                        templateUrl: 'partials/login.html',
                        controller: 'LoginCtrl',
                        resolve: {
                            skipIfLoggedIn: skipIfLoggedIn
                        }
                    })
                    .state('signup', {
                        url: '/signup',
                        templateUrl: 'partials/signup.html',
                        controller: 'SignupCtrl',
                        resolve: {
                            skipIfLoggedIn: skipIfLoggedIn
                        }
                    })
                    .state('logout', {
                        url: '/logout',
                        template: null,
                        controller: 'LogoutCtrl'
                    })
                    .state('profile', {
                        url: '/profile',
                        templateUrl: 'partials/profile.html',
                        controller: 'ProfileCtrl',
                        resolve: {
                            loginRequired: loginRequired
                        }
                    });

            $urlRouterProvider.otherwise('/');

            $authProvider.withCredentials = false;

           if (window.location.host === 'localhost:8383') {
                //local dev
                $authProvider.baseUrl = 'http://localhost:8080/';
                $authProvider.facebook({
                    clientId: '959764637427221',
                    redirectUri: (window.location.origin + '/Social' || window.location.protocol + '//' + window.location.host) + '/',
                    url: 'http://localhost:8080/auth/facebook',
                    scope: ['email','public_profile']
                });

                $authProvider.google({
                    clientId: '1063684996500-2gk0ejdiq02b68thlnggavb8arfmtobu.apps.googleusercontent.com',
                    url: 'http://localhost:8080/auth/google',
                    redirectUri: (window.location.origin + '/Social' || window.location.protocol + '//' + window.location.host) + '/'

                });
            } else {
                // cloud dev
                $authProvider.baseUrl = 'http://tourgoat.cfapps.io/';
                $authProvider.facebook({
                    clientId: '959764637427221',
                    redirectUri: (window.location.origin || window.location.protocol + '//' + window.location.host) + '/',
                    url: 'http://tourgoat.cfapps.io/auth/facebook',
                    scope: ['email','user_birthday' , 'user_photos' , 'user_location' , 'user_hometown' , 'user_about_me']
                });
                $authProvider.google({
                    clientId: '1063684996500-2gk0ejdiq02b68thlnggavb8arfmtobu.apps.googleusercontent.com',
                    url: 'http://tourgoat.cfapps.io/auth/google',
                    redirectUri: (window.location.origin || window.location.protocol + '//' + window.location.host) + '/'
                });
            }

            $authProvider.github({
                clientId: '0ba2600b1dbdb756688b'
            });

            $authProvider.linkedin({
                clientId: '77cw786yignpzj'
            });

            $authProvider.instagram({
                clientId: '799d1f8ea0e44ac8b70e7f18fcacedd1'
            });

            $authProvider.yahoo({
                clientId: 'dj0yJmk9SDVkM2RhNWJSc2ZBJmQ9WVdrOWIzVlFRMWxzTXpZbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0yYw--'
            });

            $authProvider.twitter({
                url: '/auth/twitter'
            });

            $authProvider.live({
                clientId: '000000004C12E68D'
            });

            $authProvider.twitch({
                clientId: 'qhc3lft06xipnmndydcr3wau939a20z'
            });

            $authProvider.oauth2({
                name: 'foursquare',
                url: '/auth/foursquare',
                clientId: 'MTCEJ3NGW2PNNB31WOSBFDSAD4MTHYVAZ1UKIULXZ2CVFC2K',
                redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
                authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate'
            });

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
        });
