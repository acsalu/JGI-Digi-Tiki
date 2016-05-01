/* global alert */
'use strict';

var $ = require('jquery');
require('jquery-ui');
var Papa = require('papaparse');

var db = require('./jgiDb');
var urls = require('./jgiUrls');
var jgiUtil = require('./jgiUtil');
var models = require('./jgiModels');

var chimpData;

function invalidDataToStart(data) {
  if (!data || data === '') {
    return true;
  } else {
    return false;
  }
}

function writeNewFollow(
            date,
            focalChimpId,
            communityId,
            beginTime,
            researcher) {
    
        var struct = {};
        struct['FOL_date'] = date;
        struct['FOL_B_AnimID'] = focalChimpId;
        struct['FOL_CL_community_id'] = communityId;
        struct['FOL_time_begin'] = beginTime;
        struct['FOL_am_observer1'] = researcher;

        // Now we'll write it into the database.

        var rowId = util.genUUID();
        odkData.addRow('follow', struct, rowId, cbSuccess, cbFailure);
}

function cbSuccess(result) {
    console.log('jgiNewFollow: cbSuccess addRow with result: ' + result);

    var date = $('#FOL_date').val();
    var focalChimpId = $('#FOL_B_AnimID').val().toLowerCase();
    var beginTime = $('#FOL_begin_time').val();

    // Now we'll launch the follow screen. The follow screen needs to know
    // what date we're on, as well as the time it should be using.
    var queryString = util.getKeysToAppendToURL(
        date,
        beginTime,
        focalChimpId);
    var url = odkCommon.getFileAsUrl(
            'config/assets/followScreen.html' + queryString);

    // There seems to be an issue with the way window.location is set here
    window.location.href = url;
}

function cbFailure(error) {
    console.log('jgiNewFollow: cbFailure failed with error: ' + error);
}

/*
 *

/**
 * Read the chimp list from the config file.
 */
function fetchChimpList() {
  Papa.parse("config/chimpList.csv", {
    header: true,
    download: true,
    complete: function(results) {
      chimpData = results["data"];
      var communityList = [];

      // Create a list of all communities
      for (var i = 0; i < chimpData.length; i++) {
        var community = chimpData[i]["Community"];
        if (community && communityList.indexOf(community) < 0) {
          communityList.push(community);
        }
      }

      var $communities = $("#FOL_CL_community_id");

      // Clear the UI element and add all communities to it
      $communities.empty();
      $communities.append("<option disabled selected class=\"first\"><span>Kundi</span></option>");

      for (var i = 0; i < communityList.length; i++) {
        var communityVal = communityList[i].trim().toLowerCase().replace(" ", "_");
        $communities.append("<option><a id=\"" + communityVal + "\">" + communityList[i] + "</a></option>");
      }

    },
    error: function() {
      alert("Error reading chimp list");
    }
  });
}


exports.initializeListeners = function() {

  $("#FOL_CL_community_id").change(function() {
    var $chimps = $("#FOL_B_AnimID");
    var community = $("#FOL_CL_community_id").val();

    // Clear old entries
    $chimps.empty();
    $chimps.append("<option class=\"first\"><span>Target</span></option>");

    // Add all chimps with a matching community to the dropdown
    for (var i = 0; i < chimpData.length; i++) {
      var currChimp = chimpData[i]["Chimp"];
      var currCommunity = chimpData[i]["Community"];
      if (currChimp && currCommunity === community) {
        var chimpVal = currChimp.trim().toLowerCase().replace(" ", "_");
        $chimps.append("<option><a id=\"" + chimpVal + "\">" + currChimp + "</a></option>");
      }
    }

    // Enable chimp selection
    $chimps.prop("disabled", false);

  });

  $('#begin-follow').on('click', function() {
    // First retrieve the information from the form.
    var date = $('#FOL_date').val();
    var focalChimpId = $('#FOL_B_AnimID').val().toLowerCase();
    var communityId = $('#FOL_CL_community_id').val();
    var beginTime = $('#FOL_begin_time').val();
    var researcher = $('#FOL_am_observer_1').val();

    if ([date, focalChimpId, beginTime, researcher].some(invalidDataToStart)) {
      alert('Date, Focal Chimp, Start Time, and Researcher Required');
      return;
    }

    $('#form-submit-button').css('display', 'none'); // to undisplay
    $('#spinners').css('display', 'block'); // to display

    // Update the database.
    writeNewFollow(
            date,
            focalChimpId,
            communityId,
            beginTime,
            researcher);
  });
};

exports.initializeUi = function() {
  exports.initializeListeners();

  $("#FOL_date").datepicker();

  var timesDb = jgiUtil.getAllTimesForDb();
  var timesUser = jgiUtil.getAllTimesForUser();
  if (timesDb.length !== timesUser.length) {
    alert('Length of db times and user times not equal, problem!');
  }

  var $beginTime = $('#FOL_begin_time');

  timesDb.forEach(function(val, i) {
    var timeDb = val;
    var timeUser = timesUser[i];
    var option = $('<option></option>');
    option.prop('value', timeDb);
    option.text(timeUser);

    $beginTime.append(option);
  });

  fetchChimpList();

};
