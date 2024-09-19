const vocabForm = document.getElementById("vocabForm");
const flashcardsDiv = document.getElementById("flashcards");
const scoreDiv = document.getElementById("score");
const clearStorageBtn = document.getElementById("clearStorage");

let vocabList = JSON.parse(localStorage.getItem("vocabList")) || [];
let correctAnswers = 0;
let totalQuestions = 0;

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
    card.classList.add("flashcard");

    const italianSide = document.createElement("div");
    italianSide.classList.add("side", "italian");
    italianSide.textContent = word.italian;

    const frenchSide = document.createElement("div");
    frenchSide.classList.add("side", "french", "hidden");
    frenchSide.textContent = word.french;

    // Créer des boutons pour réviser
    const correctBtn = document.createElement("button");
    correctBtn.classList.add("correct");
    correctBtn.textContent = "Bonne réponse";

    const incorrectBtn = document.createElement("button");
    incorrectBtn.classList.add("incorrect");
    incorrectBtn.textContent = "Mauvaise réponse";

    // Ajouter des événements aux boutons
    correctBtn.addEventListener("click", () => {
      correctAnswers++;
      totalQuestions++;
      updateScore();
    });

    incorrectBtn.addEventListener("click", () => {
      totalQuestions++;
      updateScore();
    });

    card.appendChild(italianSide);
    card.appendChild(frenchSide);
    card.appendChild(correctBtn);
    card.appendChild(incorrectBtn);

    // Afficher la traduction au clic
    card.addEventListener("click", () => {
      frenchSide.classList.toggle("hidden");
    });

    flashcardsDiv.appendChild(card);
  });
}

function updateScore() {
  scoreDiv.textContent = `Score : ${correctAnswers} / ${totalQuestions}`;
}

// Afficher les cartes au chargement de la page
displayFlashcards();
updateScore();

// Gestion du bouton pour vider le Local Storage
clearStorageBtn.addEventListener("click", () => {
  localStorage.removeItem("vocabList");
  vocabList = [];
  displayFlashcards();
  updateScore();
});
