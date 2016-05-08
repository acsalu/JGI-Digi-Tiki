'use strict';

var $ = require('jquery');
global.jQuery = require('jquery');

var db = require('./util/db.js');
var urls = require('./util/urls.js');
var logger = require('./util/logging.js');

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
      'config/assets/follow_interval_list.html' + queryParams
      );

    if (isReviewSet === 'false') {
      url = odkCommon.getFileAsUrl(
        'config/assets/follow_interval_list.html' + queryParams
        );
      window.location.href = url;

    } else {
      url = odkCommon.getFileAsUrl(
        'config/assets/follow_review.html' + queryParams
        );
      window.location.href = url;
    }
  });

  exports.displayFollows();

};

function cbGetAllFollowsSuccess(follows) {
  console.log('GetAllFollowSuccess: ' + follows.length + ' follows.');

  follows.forEach(function(follow) {
    var $item = $('<li>');

    $item.attr('date', follow.date);
    $item.attr('begin-time', follow.beginTime);
    $item.attr('focal-id', follow.focalId);
    $item.attr('community-id', follow.communityId);
    $item.addClass('item_space');
    $item.text(follow.date + ' ' + follow.beginTime);

    var $chevron = $('<img>');
    $chevron.attr('src', odkCommon.getFileAsUrl('config/assets/img/little_arrow.png'));
    $chevron.attr('class', 'chevron');
    $item.append($chevron);

    var $focalIdItem = $('<li>');
    $focalIdItem.addClass('detail');
    $focalIdItem.text('Focal: ' + follow.focalId);
    $item.append($focalIdItem);

    $('#list').append($item);

    var $borderDiv = $('<div>');
    $borderDiv.addClass('divider');
    $('#list').append($borderDiv);
  });
}

function cbGetAllFollowsFailure(error) {
  console.error('GetAllFollow failed with error: ' + error);
}


/**
 * Populate the list of Follows.
 */
 exports.displayFollows = function displayFollows() {
  db.getAllFollows(cbGetAllFollowsSuccess, cbGetAllFollowsFailure);
};
