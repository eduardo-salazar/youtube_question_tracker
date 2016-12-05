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

document.addEventListener('DOMContentLoaded', function() {

  executing = chrome.tabs.executeScript({
      file: 'content_script.js' //argument here is a string but function.toString() returns function's code
  },function(results){
    console.log("Callback in extension")
    questions = results[0]
    // Iterate array and show questions
    for (var i in questions) {
      console.log(questions[i])
      showQuestion(questions[i]);
    }
  })

  console.log('Finished');
  // For some reason this code is not working
  // It seams the callback is not passing the return values
  // executing.then(onExecuted, onError);




});
