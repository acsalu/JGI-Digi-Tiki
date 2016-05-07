rm -rf ./app/config/assets/js/jgi/**/*
browserify -r ./src/js/jgiHomeScreenModule.js:jgiHomeScreen > ./app/config/assets/js/jgi/homeScreenBundle.js
browserify -r ./src/js/jgiNewFollowModule.js:jgiNewFollow > ./app/config/assets/js/jgi/jgiNewFollowBundle.js
browserify -r ./src/js/jgiFollow.js:jgiFollow > ./app/config/assets/js/jgi/bundle.js
browserify -r ./src/js/followIntervalList.js:jgiFollowIntervalList > ./app/config/assets/js/jgi/followIntervalListBundle.js
browserify -r ./src/js/followList.js:jgiFollowList > ./app/config/assets/js/jgi/followListBundle.js
