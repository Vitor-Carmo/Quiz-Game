const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

var reflesh = 0;
var score = 0;



let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  RefleshTheGame()
  
  setTimeout(function(){
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
  }, 10);

}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
    
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  
  if(correct == "true"){
    score++;
  }

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
    
  } else { 
    
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide') 
    Score()
  
  }
}


function RefleshTheGame() {
  if(reflesh==1){
    window.location.reload();
  }

}


function Score() {
  if(score==questions.length){
    document.getElementById("demo").innerHTML = "Parabéns! você acertou todas as perguntas.";
   }else{
   document.getElementById("demo").innerHTML = "Você Acertou "+score+" perguntas de "+questions.length+" no total";
   }
   score=0;
   reflesh = 1;
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }


}


function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}





const questions = [
  {
    question: 'O QUE É UMA ATA?',
    answers: [
      { text: 'Publicação acadêmica que apresenta e discute métodos e processos produzidos em uma determinada pesquisa  produzida pelas diversas áreas do conhecimento.', correct: false },
      { text: 'Testemunho escrito sobre todos os acontecimentos debatidos durante uma reunião.', correct: true }
    ]
  },
  {
    question: 'Geralmente uma ata é redigida por qual tipo de pessoa?',
    answers: [
      { text: 'Programador', correct: false },
      { text: 'Cantores de K-pop', correct: false },
      { text: 'Secretária Executiva', correct: true },
      { text: 'Product Owner', correct: false }
    ]
  },
  {
    question: 'O manual de critério faz parte de outro documento, que documento é esse?',
    answers: [
      { text: 'Manual de uso', correct: false },
      { text: 'Procuração', correct: false },
      { text: 'Memorial descritivo', correct: true },
      { text: 'Ata', correct: false }
    ]
  },
  {
    question: 'Em qual área o manual de critério tem seu uso mais evidente?',
    answers: [
      { text: 'Medicina', correct: false },
      { text: 'Edificações', correct: true },
      { text: 'Design de interiores', correct: false },
      { text: 'Confeitaria', correct: false }
      
      
    ]
  },
  {
    question: '“... somente com a procuração assinada pelo cliente que o advogado pode iniciar e dar continuidade ao processo..."\n\nEssa afirmação é verdadeira ou falsa?',
    answers: [
      { text: 'Verdadeira', correct: true },
      { text: 'Falsa', correct: false }
    ]
  },{
    question: 'O que é uma procuração?',
    answers: [
      { text: 'É uma autorização que o cliente dá ao seu advogado para que ele possa praticar todos os atos necessários dentro do processo.', correct: true },
      { text: 'É uma ação jurídica iniciada, geralmente por um advogado, onde se espera que um juiz de direito emita uma decisão sobre a violação de um direito.', correct: false }
      
    ]
  }
  


]
