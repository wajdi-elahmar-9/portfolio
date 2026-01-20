let currentDomain = '';
let currentMode = 'easy';

// Réponses correctes pour tous les quiz
const correctAnswers = {
  'lol-easy': ['1', '0', '1', '0', '0', '1', '0', '0', '1', '0'],
  'lol-hard': ['1', '0', '1', '1', '0', '1', '1', '1', '0', '1'],
  'design-easy': ['1', '1', '1', '0', '1', '0', '1', '1', '0', '1'],
  'design-hard': ['1', '1', '1', '1', '0', '1', '1', '1', '1', '1'],
  'gamedev-easy': ['1', '0', '1', '1', '0', '1', '0', '1', '1', '0'],
  'gamedev-hard': ['1', '0', '1', '1', '1', '0', '1', '1', '1', '1'],
  'robotics-easy': ['1', '1', '0', '1', '1', '0', '1', '1', '0', '1'],
  'robotics-hard': ['1', '0', '1', '0', '1', '1', '1', '1', '1', '0']
};

// Sélectionner un domaine
function selectDomain(domain) {
  currentDomain = domain;
  
  // Mettre à jour les boutons
  const buttons = document.querySelectorAll('.domain-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  // Afficher le quiz correspondant
  showQuiz();
}

// Basculer le mode
function toggleMode() {
  const modeSwitch = document.getElementById('modeSwitch');
  currentMode = modeSwitch.checked ? 'hard' : 'easy';
  
  // Mettre à jour les labels
  document.getElementById('easyLabel').style.fontWeight = currentMode === 'easy' ? 'bold' : 'normal';
  document.getElementById('hardLabel').style.fontWeight = currentMode === 'hard' ? 'bold' : 'normal';
  
  // Afficher le quiz correspondant
  showQuiz();
}

// Afficher le quiz
function showQuiz() {
  if (!currentDomain) return;
  
  // Masquer tous les quiz
  const allQuizzes = document.querySelectorAll('.quiz-container');
  allQuizzes.forEach(quiz => quiz.classList.remove('active'));
  
  // Masquer le résultat
  document.getElementById('resultat').classList.remove('show');
  
  // Afficher le quiz sélectionné
  const quizId = `${currentDomain}-${currentMode}`;
  const selectedQuiz = document.getElementById(quizId);
  if (selectedQuiz) {
    selectedQuiz.classList.add('active');
    
    // Réinitialiser le formulaire
    const form = selectedQuiz.querySelector('form');
    if (form) form.reset();
    
    // Scroll vers le quiz
    selectedQuiz.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Corriger le quiz
function corrigerQuiz(quizId) {
  const form = document.getElementById(`quizForm-${quizId}`);
  const resultatDiv = document.getElementById('resultat');
  
  let score = 0;
  const totalQuestions = 10;
  const answers = correctAnswers[quizId];
  let resultatsHTML = '<h4>📋 Réponses correctes :</h4>';
  
  // Vérifier les réponses
  for (let i = 1; i <= totalQuestions; i++) {
    const userAnswer = form.querySelector(`input[name="q${i}"]:checked`);
    const isCorrect = userAnswer && userAnswer.value === answers[i - 1];
    
    if (isCorrect) {
      score++;
      resultatsHTML += `<div class="answer-item">✅ Question ${i} : Correct</div>`;
    } else {
      resultatsHTML += `<div class="answer-item">❌ Question ${i} : Incorrect (Bonne réponse : option ${answers[i - 1] === '1' ? '1' : '2'})</div>`;
    }
  }
  
  // Calculer le pourcentage
  const percentage = (score / totalQuestions) * 100;
  
  // Message selon le score
  let message = '';
  let recommendation = '';
  
  if (percentage >= 80) {
    message = '🎉 Excellent ! Vous maîtrisez bien ce sujet !';
  } else if (percentage >= 60) {
    message = '👍 Bon travail ! Continuez à vous améliorer !';
  } else if (percentage >= 40) {
    message = '📚 Pas mal, mais il y a encore du travail !';
  } else {
    message = '💪 Ne vous découragez pas, continuez à apprendre !';
  }
  
  // Recommandations
  if (currentMode === 'easy' && percentage >= 70) {
    recommendation = `<div class="recommendation">
      🔥 Bravo ! Vous avez réussi le mode Facile !<br>
      Êtes-vous prêt à relever le défi du mode <strong>DIFFICILE</strong> ?<br>
      <button class="submit-btn" style="margin-top: 15px; width: auto; padding: 15px 30px;" onclick="switchToHard()">
        Passer en mode DIFFICILE 🚀
      </button>
    </div>`;
  } else if (currentMode === 'hard' && percentage >= 70) {
    const domains = ['lol', 'design', 'gamedev', 'robotics'];
    const otherDomains = domains.filter(d => d !== currentDomain);
    const randomDomain = otherDomains[Math.floor(Math.random() * otherDomains.length)];
    const domainNames = {
      'lol': 'League of Legends',
      'design': 'Design Graphique',
      'gamedev': 'Game Development',
      'robotics': 'Robotique'
    };
    
    recommendation = `<div class="recommendation">
      🏆 Félicitations ! Vous avez conquis le mode DIFFICILE !<br>
      Pourquoi ne pas tester vos connaissances dans un autre domaine ?<br>
      <button class="submit-btn" style="margin-top: 15px; width: auto; padding: 15px 30px;" onclick="selectDomain('${randomDomain}'); showQuiz();">
        Essayer ${domainNames[randomDomain]} 🎯
      </button>
    </div>`;
  }
  
  // Afficher le résultat
  resultatDiv.innerHTML = `
    <h3>Résultat du Quiz</h3>
    <p class="score">${score}/${totalQuestions}</p>
    <p style="font-size: 1.5em;">${percentage.toFixed(0)}%</p>
    <p>${message}</p>
    <div class="answers-list">
      ${resultatsHTML}
    </div>
    ${recommendation}
  `;
  
  resultatDiv.classList.add('show');
  resultatDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Basculer vers le mode difficile
function switchToHard() {
  document.getElementById('modeSwitch').checked = true;
  toggleMode();
}