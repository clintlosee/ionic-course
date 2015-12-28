var app = angular.module('soundboard', ['ionic']);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

app.controller('SoundBoardCtrl', function ($scope, $window) {

    $scope.media = null;

    $scope.model = {
        showDelete: false,
        showMove: false,
        sounds: [
            {
                'title': 'Cow',
                'image': 'img/animals/cow-icon.png',
                'desc': 'Mooo',
                'file': '/sounds/cow.mp3'
            },
            {
                'title': 'Dolphin',
                'image': 'img/animals/dolphin-icon.png',
                'desc': 'Whistle',
                'file': '/sounds/dolphin.mp3'
            },
            {
                'title': 'Frog',
                'image': 'img/animals/frog-icon.png',
                'desc': 'Croak',
                'file': '/sounds/frog.mp3'
            },
            {
                'title': 'Bird',
                'image': 'img/animals/bird-icon.png',
                'desc': 'Chirp',
                'file': '/sounds/bird.mp3'
            },
            {
                'title': 'Pig',
                'image': 'img/animals/pig-icon.png',
                'desc': 'Oink',
                'file': '/sounds/pig.mp3'
            },
            {
                'title': 'Dog',
                'image': 'img/animals/puppy-icon.png',
                'desc': 'Bark',
                'file': '/sounds/dog.mp3'
            },
            {
                'title': 'Cat',
                'image': 'img/animals/black-cat-icon.png',
                'desc': 'Meow',
                'file': '/sounds/cat.mp3'
            }
        ]
    };

    // Function to delete sounds. Not persistent
    $scope.deleteSound = function($index) {
        $scope.model.sounds.splice($index, 1);
    };

    // Function to reorder sounds. Removes from array and then places back into array
    $scope.moveSound = function(sound, fromIndex, toIndex) {
        $scope.model.sounds.splice(fromIndex, 1);
        $scope.model.sounds.splice(toIndex, 0, sound);
    };

    $scope.play = function (sound) {
        // If media is playing already, pause it before playing another sound
        if ($scope.media) {
            $scope.media.pause();
        }

        if ($window.cordova) {
            ionic.Platform.ready(function() {
                // For android
                var src = sound.file;
                if (ionic.Platform.is('android')) {
                    src= '/android_asset/www' + src;
                }

                // Create new $window Media file and play
                $scope.media = new $window.Media(sound.file);
                $scope.media.play();
            });
        } else {
            // For browsers, create new HTML5 audio and play
            $scope.media = new Audio();
            $scope.media.src = sound.file;
            $scope.media.load();
            $scope.media.play();
        }
    };
});

