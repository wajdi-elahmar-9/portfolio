document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Réinitialiser les erreurs
  const inputs = this.querySelectorAll('input, textarea, select');
  inputs.forEach(input => input.classList.remove('invalid'));
  
  let isValid = true;
  
  // Validation du nom
  const nom = document.getElementById('nom');
  if (nom.value.trim() === '' || nom.value.trim().length < 2) {
    nom.classList.add('invalid');
    isValid = false;
  }
  
  // Validation de l'email
  const email = document.getElementById('email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    email.classList.add('invalid');
    isValid = false;
  }
  
  // Validation du sujet
  const sujet = document.getElementById('sujet');
  if (sujet.value === '') {
    sujet.classList.add('invalid');
    isValid = false;
  }
  
  // Validation du message
  const message = document.getElementById('message');
  if (message.value.trim().length < 10) {
    message.classList.add('invalid');
    isValid = false;
  }
  
  // Si le formulaire est valide
  if (isValid) {
    // Afficher le message de succès
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.add('show');
    
    // Réinitialiser le formulaire
    this.reset();
    
    // Masquer le message après 5 secondes
    setTimeout(() => {
      successMessage.classList.remove('show');
    }, 5000);
    
    // Scroll vers le haut pour voir le message
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// Retirer la classe invalid lors de la saisie
document.querySelectorAll('input, textarea, select').forEach(input => {
  input.addEventListener('input', function() {
    if (this.classList.contains('invalid')) {
      this.classList.remove('invalid');
    }
  });
});