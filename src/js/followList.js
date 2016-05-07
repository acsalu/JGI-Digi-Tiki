'use strict';

var $ = require('jquery');

var db = require('./jgiDb.js');
var urls = require('./jgiUrls.js');
var logger = require('./jgiLogging');

/**
 * Called when page loads to display things (Nothing to edit here)
 */
exports.initializeUi = function initializeUi() {

  logger.initializeLogging();

  $('#list').click(function(e) {
    // We set the attributes we need in the li id. However, we may have
    // clicked on the li or anything in the li. Thus we need to get
    // the original li, which we'll do with jQuery's closest()
    // method. First, however, we need to wrap up the target
    // element in a jquery object.
    // wrap up the object so we can call closest()
    var jqueryObject = $(e.target);

    // we want the closest thing with class item_space, which we
    // have set up to have the row id
    var containingDiv = jqueryObject.closest('.item_space');
    var date = containingDiv.attr('date');
    var focalId = containingDiv.attr('focal-id');
    var beginTime = containingDiv.attr('begin-time');
    var communityId = containingDiv.attr('community-id');

    // create url and launch list
    var queryParams = urls.createParamsForFollow(date, beginTime, focalId, communityId);
    var isReviewSet = urls.isReviewMode();
    console.log(
      ' jgiLogging: showIntervals with params: ' +
      queryParams
    );
    var url = odkCommon.getFileAsUrl(
      'config/assets/followIntervalList.html' + queryParams
    );

    if (isReviewSet === 'false') {
      url = odkCommon.getFileAsUrl(
          'config/assets/followIntervalList.html' + queryParams
      );
      window.location.href = url;

    } else {
      url = odkCommon.getFileAsUrl(
          'config/assets/jgiFollowReview.html' + queryParams
      );
      window.location.href = url;
    }
  });

  exports.displayFollows();

};

function cbGetAllFollowSuccess(follows) {
  console.log('GetAllFollowSuccess: ' + follows.getCount() + ' follows.');
  for (var i = 0; i < follows.getCount(); ++i) {
    var $item = $('<li>');

    var date = follows.getData(i, 'FOL_date');
    var beginTime = follows.getData(i, 'FOL_time_begin');
    var communityId = follows.getData(i, 'FOL_CL_community_id');
    var focalId = follows.getData(i, 'FOL_B_AnimID');

    $item.attr('date', date);
    $item.attr('begin-time', beginTime);
    $item.attr('focal-id', focalId);
    $item.attr('community-id', communityId);
    $item.addClass('item_space');
    $item.text(date + ' ' + beginTime);

    var $chevron = $('<img>');
    $chevron.attr('src', odkCommon.getFileAsUrl('config/assets/img/little_arrow.png'));
    $chevron.attr('class', 'chevron');
    $item.append($chevron);

    var $focalIdItem = $('<li>');
    $focalIdItem.addClass('detail');
    $focalIdItem.text('Focal: ' + focalId);
    $item.append($focalIdItem);

    $('#list').append($item);

    var $borderDiv = $('<div>');
    $borderDiv.addClass('divider');
    $('#list').append($borderDiv);
  }
}

function cbGetAllFollowFail(error) {
 console.error('GetAllFollow failed with error: ' + error);
}


/**
 * Populate the list of Follows.
 */
exports.displayFollows = function displayFollows() {
  odkData.query('follow', null, null, null, null,
            null, null, true, cbGetAllFollowSuccess, 
            cbGetAllFollowFail);
};
