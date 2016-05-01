rm -rf ./dist
mkdir ./dist
browserify -r ./jgiHomeScreenModule.js:jgiHomeScreen > dist/homeScreenBundle.js
browserify -r ./jgiFollow.js:jgiFollow > dist/bundle.js
browserify -r ./followIntervalList.js:jgiFollowIntervalList > dist/followIntervalListBundle.js
browserify -r ./followList.js:jgiFollowList > dist/followListBundle.js
browserify -r ./jgiNewFollowModule.js:jgiNewFollow > dist/jgiNewFollowBundle.js
