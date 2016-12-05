function showQuestion(question){
  question_text = question["question"]
  author = question["author"]
  html = "";
  html += "<div class='card card-outline-primary text-xs-center'>";
  html += "  <div class='card-block'>";
  html += "    <blockquote class='card-blockquote'>";
  html += "      <p>"+question_text+"</p>";
  html += "      <footer>by<cite title='Source Title'>"+author+"</cite></footer>";
  html += "    </blockquote>";
  html += "  </div>";
  html += "</div>";
  document.getElementById('container').insertAdjacentHTML( 'beforeend', html );
}

function clear_container(){
  document.getElementById('container').innerHTML= "";
}

document.addEventListener('DOMContentLoaded', function() {
  window.setInterval(function(){
    executing = chrome.tabs.executeScript({
        file: 'content_script.js' //This file contains the code that is going to run in the page
    },function(results){
      console.log("Callback in extension")
      questions = results[0]
      clear_container();
      // Iterate array and show questions
      for (var i in questions) {
        showQuestion(questions[i]);
      }
    })

    console.log('Finished');
  }, 1000);
});
