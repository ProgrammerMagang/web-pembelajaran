document.addEventListener('DOMContentLoaded', () => {
    // Kode hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    const quizData = [
        {
            question: "Kerajaan Hindu tertua di Indonesia adalah...",
            choices: ["Sriwijaya", "Kutai", "Majapahit", "Tarumanegara"],
            correct: 1
        },
        {
            question: "Candi Borobudur dibangun pada masa kerajaan...",
            choices: ["Sriwijaya", "Majapahit", "Mataram Kuno", "Kediri"],
            correct: 2
        },
        {
            question: "Kerajaan maritim Buddha terbesar di Nusantara adalah...",
            choices: ["Kutai", "Sriwijaya", "Singasari", "Majapahit"],
            correct: 1
        },
        {
            question: "Prasasti Yupa merupakan bukti keberadaan Kerajaan...",
            choices: ["Tarumanegara", "Kutai", "Sriwijaya", "Majapahit"],
            correct: 1
        },
        {
            question: "Raja terbesar dari Kerajaan Majapahit adalah...",
            choices: ["Raden Wijaya", "Gajah Mada", "Hayam Wuruk", "Tribhuwana Tunggadewi"],
            correct: 2
        },
        {
            question: "Kitab Negarakertagama ditulis oleh...",
            choices: ["Mpu Prapanca", "Mpu Tantular", "Mpu Sindok", "Mpu Kanwa"],
            correct: 0
        },
        {
            question: "Kerajaan yang terkenal dengan sistem irigasi Subaknya adalah...",
            choices: ["Majapahit", "Sriwijaya", "Mataram Kuno", "Bali"],
            correct: 3
        },
        {
            question: "Prasasti Kedukan Bukit merupakan bukti keberadaan Kerajaan...",
            choices: ["Kutai", "Tarumanegara", "Sriwijaya", "Majapahit"],
            correct: 2
        },
        {
            question: "Candi Hindu terbesar di Indonesia adalah...",
            choices: ["Borobudur", "Prambanan", "Mendut", "Sewu"],
            correct: 1
        },
        {
            question: "Kerajaan yang menjadi cikal bakal Kerajaan Mataram Islam adalah...",
            choices: ["Majapahit", "Demak", "Pajajaran", "Mataram Kuno"],
            correct: 3
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    const quizEl = document.getElementById("quiz");
    const resultsEl = document.getElementById("results");
    const questionEl = document.getElementById("question");
    const choicesEl = document.getElementById("choices");
    const submitBtn = document.getElementById("submit");
    const restartBtn = document.getElementById("restart");
    const progressBar = document.getElementById("progress");

    function loadQuestion() {
        const question = quizData[currentQuestion];
        questionEl.textContent = question.question;

        choicesEl.innerHTML = "";
        question.choices.forEach((choice, index) => {
            const button = document.createElement("button");
            button.textContent = choice;
            button.addEventListener("click", () => selectChoice(index));
            choicesEl.appendChild(button);
        });

        submitBtn.style.display = "none";
        updateProgressBar();
    }

    function selectChoice(index) {
        const buttons = choicesEl.getElementsByTagName("button");
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("selected");
        }
        buttons[index].classList.add("selected");
        submitBtn.style.display = "block";
        
        // Tambahkan efek animasi
        buttons[index].style.animation = "pulse 0.3s";
        setTimeout(() => {
            buttons[index].style.animation = "";
        }, 300);
    }

    function updateProgressBar() {
        const progress = ((currentQuestion + 1) / quizData.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function checkAnswer() {
        const selectedButton = choicesEl.querySelector(".selected");
        if (selectedButton) {
            const selectedAnswer = Array.from(choicesEl.children).indexOf(selectedButton);
            if (selectedAnswer === quizData[currentQuestion].correct) {
                score++;
            }
            currentQuestion++;
            if (currentQuestion < quizData.length) {
                loadQuestion();
            } else {
                showResults();
            }
        }
    }

    function showResults() {
        quizEl.style.display = "none";
        resultsEl.classList.remove("hidden");
        const scoreText = `Anda menjawab ${score} dari ${quizData.length} pertanyaan dengan benar!`;
        document.getElementById("score").textContent = scoreText;
    }

    function restartQuiz() {
        currentQuestion = 0;
        score = 0;
        quizEl.style.display = "block";
        resultsEl.classList.add("hidden");
        loadQuestion();
    }

    if (quizEl) {
        loadQuestion();
        submitBtn.addEventListener("click", checkAnswer);
        restartBtn.addEventListener("click", restartQuiz);
    }
});