let currentQuestion = 0;

const questionStatus = document.querySelector("#currentQuestionHeader");
changeQuestion(currentQuestion);

function changeQuestion() {
	if (currentQuestion < 8) {
		currentQuestion++;
		let totalQuestions = activeQuestions.length;
		questionStatus.innerHTML = `Question ${currentQuestion} of ${totalQuestions}`;

		let currentQuestionData = activeQuestions[currentQuestion - 1]

		const questionItem = document.createElement("div");
		questionStatus.appendChild(questionItem);

		const questionsContent = document.querySelector("#questionText");
		questionsContent.innerHTML = "";
		const par = document.createTextNode(currentQuestionData.question);
		questionsContent.appendChild(par);
		const listContent = document.querySelector("#listItems");
		listContent.innerHTML = "";
		for (let i = 0; i < currentQuestionData.response.length; i++) {	

			const options = document.createElement("li");
			listContent.appendChild(options);

			const label = document.createElement("label");
			options.appendChild(label);
			const radioBox = document.createElement("input");
			radioBox.setAttribute("type", "radio");
			radioBox.setAttribute("name", "option");
			label.appendChild(radioBox);
			const questionOptions = document.createTextNode(currentQuestionData.response[i]);
			label.appendChild(questionOptions);
		}
	}
	checkAnswer(currentQuestion);
}

document.getElementsByClassName('style')[0].addEventListener('click', changeQuestion, false);
var div = document.querySelectorAll("#info div");
console.log(div);

function checkAnswer(index) {
	var input = document.getElementsByTagName("input");
	for (var i = 0; i < input.length; i++) {
		input[i].addEventListener('click', function() {
			if (index % 2 == 0) {
				div[index].className = "currect";
			} else {
				div[index].className = "incurrect";
			}
		})
	}
}
