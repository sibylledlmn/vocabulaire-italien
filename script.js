const vocabForm = document.getElementById("vocabForm");
const flashcardsDiv = document.getElementById("flashcards");
let vocabList = JSON.parse(localStorage.getItem("vocabList")) || [];

vocabForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const italianWord = document.getElementById("italianWord").value;
  const frenchTranslation = document.getElementById("frenchTranslation").value;

  // Ajouter les mots à la liste
  vocabList.push({ italian: italianWord, french: frenchTranslation });
  localStorage.setItem("vocabList", JSON.stringify(vocabList));

  // Réinitialiser le formulaire
  vocabForm.reset();

  // Afficher les cartes
  displayFlashcards();
});

function displayFlashcards() {
  flashcardsDiv.innerHTML = "";
  vocabList.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `<strong>${word.italian}</strong> : ${word.french}`;
    flashcardsDiv.appendChild(card);
  });
}

// Afficher les cartes au chargement de la page
displayFlashcards();
