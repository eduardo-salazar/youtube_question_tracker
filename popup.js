// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}
function showQuestion(element,question, author){
  html = "";
  html += "<div class='card card-outline-primary text-xs-center'>";
  html += "  <div class='card-block'>";
  html += "    <blockquote class='card-blockquote'>";
  html += "      <p>"+question+"</p>";
  html += "      <footer>by<cite title='Source Title'>"+author+"</cite></footer>";
  html += "    </blockquote>";
  html += "  </div>";
  html += "</div>";
  document.getElementById('container').insertAdjacentHTML( 'beforeend', html );
}
function getDOM() {
    function modifyDOM() {
        var questions = []
        function extractQuestions(){
          elements = document.getElementsByClassName('comment');
          Array.prototype.forEach.call(elements, function(el) {
              // Do stuff here
              var obj = {}
              var question = el.getElementsByClassName('comment-text')[0].innerText
              if(question.indexOf("?") != -1){
                author = el.getElementsByClassName('author')[0].innerText
                obj["author"] = author;
                obj["question"] = question;
                questions.push(obj);
              }
          });
        }
        extractQuestions();
        console.log(questions);
        questions
    }
    //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
    chrome.tabs.executeScript({
        code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
    }, function(results) {
        //Here we have just the innerHTML and not DOM structure
        console.log('Getting elements from inside of extension:')
        console.log(results[0]);
    });
}


document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    //show information in console
    getDOM();
  });
});
