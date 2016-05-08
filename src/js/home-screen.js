/* global alert */
'use strict';

// For the JGI Home Screen, but to be used with browserify.
var $ = require('jquery');
global.jQuery = require('jquery');

var db = require('./util/db.js');
var urls = require('./util/urls.js');
var logger = require('./util/logging.js');
var util = require('./util/util.js');

exports.initializeListeners = function() {

  // Set up the background image.
  // First we need the url as parsed by the ODK framework so that it works
  // in both the browser and on the device.
  var fileUri = odkCommon.getFileAsUrl('config/assets/img/chimp.png');
  $('body').css('background-image', 'url(' + fileUri + ')');

  $('#begin-follow-button').on('click', function() {
    odkTables.launchHTML('config/assets/new_follow.html');
  });

  $('#existing-follow-button').on('click', function() {
    var queryParams = urls.createParamsForIsReview(false);
    var url = odkCommon.getFileAsUrl('config/assets/follow_list.html' + queryParams);
    window.location.href = url;
  });

  $('#most-recent-follow-button').click(function() {
    console.log('clicked most recent');

    function cbGetAllFollowSuccess(follows) {
      console.log('GetAllFollowSuccess: ' + follows.getCount() + ' follows.');
      if (follows.getCount() === 0) {
        alert('No Follows!');
        return;
      }

      for (var i = 0; i < follows.getCount(); ++i) {
        var $item = $('<li>');

        var date = follows.getData(i, 'FOL_date');
        var beginTime = follows.getData(i, 'FOL_time_begin');
        var communityId = follows.getData(i, 'FOL_CL_community_id');
        var focalId = follows.getData(i, 'FOL_B_AnimID');
      }
    }

    function cbGetAllFollowFail(error) {
      console.error('GetAllFollow failed with error: ' + error);
    }

    odkData.query('follow', null, null, null, null,
      null, null, true, cbGetAllFollowSuccess, 
      cbGetAllFollowFail);

    // util.sortFollows(follows);

    // var mostRecentFollow = follows[follows.length - 1];
    // var communityId = mostRecentFollow.communityId;

    // var intervals = db.getFollowIntervalsForFollow(
    //     control,
    //     mostRecentFollow.date,
    //     mostRecentFollow.focalId
    // );

    // if (intervals.length === 0) {
    //   alert('No observations yet recorded for the latest Follow');
    //   return;
    // }

    // util.sortFollowIntervals(intervals);
    // var lastInterval = intervals[intervals.length - 1];

    // var queryParams = urls.createParamsForFollow(
    //     lastInterval.date,
    //     lastInterval.beginTime,
    //     lastInterval.focalId,
    //     communityId
    // );

    // control.launchHTML('assets/followScreen.html' + queryParams);
  });

};

exports.initializeUi = function() {
  logger.initializeClickLogger();

  exports.initializeListeners();
};
