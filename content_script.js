var questions = [];
function returnObject(obj){
  return obj
}
function extractQuestions(){
  elements = document.getElementsByClassName('comment');
  Array.prototype.forEach.call(elements, function(el) {
      // Do stuff here
      var obj = {};
      var question = el.getElementsByClassName('comment-text')[0].innerText;
      if(question.indexOf("?") != -1){
        author = el.getElementsByClassName('author')[0].innerText;
        obj["author"] = author;
        obj["question"] = question;
        questions.push(obj);
      }
  });
}
extractQuestions();
//console.log(questions);
returnObject(questions);
