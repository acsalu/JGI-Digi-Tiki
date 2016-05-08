rm -rf ./app/config/assets/js/jgi/**/*

browserify -r ./src/js/home-screen.js:jgiHomeScreen > ./app/config/assets/js/jgi/homeScreenBundle.js
browserify -r ./src/js/new-follow.js:jgiNewFollow > ./app/config/assets/js/jgi/newFollowBundle.js
browserify -r ./src/js/follow.js:jgiFollow > ./app/config/assets/js/jgi/followBundle.js
browserify -r ./src/js/follow-interval-list.js:jgiFollowIntervalList > ./app/config/assets/js/jgi/followIntervalListBundle.js
browserify -r ./src/js/follow-list.js:jgiFollowList > ./app/config/assets/js/jgi/followListBundle.js
