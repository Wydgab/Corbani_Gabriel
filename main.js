const images = [
  { el: document.getElementById('img1'), start: 0.00, end: 0.20 },
  { el: document.getElementById('img2'), start: 0.10, end: 0.30 },
  { el: document.getElementById('img3'), start: 0.20, end: 0.40 },
  { el: document.getElementById('img4'), start: 0.30, end: 0.50 },
  { el: document.getElementById('img5'), start: 0.40, end: 0.60 },
  { el: document.getElementById('img6'), start: 0.50, end: 0.70 },
  { el: document.getElementById('img7'), start: 0.60, end: 0.80 },
  { el: document.getElementById('img8'), start: 0.70, end: 0.90 }
];
let lastScrollTop = 0;
let isScrolling = false;
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (isScrolling) return;
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = scrollTop / maxScroll;
  const direction = scrollTop > lastScrollTop ? 'down' : 'up';
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    // Gestion du scroll infini
    if (scrollPercent > 0.98 && direction === 'down') {
      isScrolling = true;
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          behavior: 'instant'
        });
        setTimeout(() => {
          isScrolling = false;
          lastScrollTop = 0;
        }, 100);
      });
      return;
    }
    if (scrollPercent < 0.02 && direction === 'up') {
      isScrolling = true;
      requestAnimationFrame(() => {
        window.scrollTo({
          top: maxScroll,
          behavior: 'instant'
        });
        setTimeout(() => {
          isScrolling = false;
          lastScrollTop = maxScroll;
        }, 100);
      });
      return;
    }
  }, 50)
  lastScrollTop = scrollTop;
  requestAnimationFrame(() => {
    images.forEach((img, index) => {
      const { el, start, end } = img;
      let progress = (scrollPercent - start) / (end - start);
      progress = Math.max(0, Math.min(1, progress));
      const scale = 0.0001 + progress * 4;
      el.style.transform = `translate(-50%, -50%) scale(${scale})`;
      el.style.zIndex = 100 + index;
    });
  });
});
document.querySelector('a[href="#Calculatrice"]').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('calculator').classList.add('active');
  document.getElementById('calculatorOverlay').classList.add('active');
  document.getElementById('mainContent').classList.add('hidden');
});
function hideCalculator() {
  document.getElementById('calculator').classList.remove('active');
  document.getElementById('calculatorOverlay').classList.remove('active');
  document.getElementById('mainContent').classList.remove('hidden');
}
let display = document.getElementById('display');
function appendValue(value) {
  display.value += value;
}
function clearDisplay() {
  display.value = '';
}
function backspace() {
  display.value = display.value.slice(0, -1);
}
function calculateResult() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = 'Error';
  }
}
document.getElementById('contactLink').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('calculator').classList.remove('active');
    document.getElementById('calculatorOverlay').classList.remove('active');
    document.getElementById('contactForm').classList.remove('active');
    document.getElementById('quizContainer').classList.add('active');
    document.getElementById('overlay').classList.add('active');
    document.getElementById('mainContent').classList.add('hidden');
    currentQuestion = 0;
    userAnswers = [];
    document.querySelectorAll('.tree-node, .tree-line').forEach(el => el.classList.remove('active'));
    const bruteforceBtn = document.querySelector('.bruteforce-btn');
    bruteforceBtn.style.display = 'block';
    bruteforceBtn.disabled = false;
    bruteforceBtn.textContent = 'BRUTEFORCE ACCESS';
    initializeQuiz();
});
function hideQuiz() {
    document.getElementById('quizContainer').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
    document.getElementById('mainContent').classList.remove('hidden');
    document.getElementById('terminalText').innerHTML = '';
    document.querySelector('.bruteforce-btn').style.display = 'block';
    document.getElementById('hackProgress').style.display = 'none';
    document.getElementById('contactForm').classList.remove('active');
    document.querySelector('.license').style.display = 'block';
}
function submitForm() {
    const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    let isValid = true; 
    inputs.forEach(input => {
        if (input.required && !input.value) {
            isValid = false;
            input.style.border = '2px solid red';
        }
    });
    if (isValid) {
        alert('Message envoyé avec succès!');
        hideQuiz();
    }
}

function startBruteforce() {
  const bruteforceBtn = document.querySelector('.bruteforce-btn');
  bruteforceBtn.disabled = true;
  bruteforceBtn.textContent = 'SCANNING RESPONSES...';
  const nodes = document.querySelectorAll('.tree-node');
  const lines = document.querySelectorAll('.tree-line');
  const nbSteps = nodes.length;
  let progress = 0;
  function animateProgressBar() {
      nodes.forEach(n => n.classList.remove('active'));
      lines.forEach(l => l.classList.remove('active'));
      for (let i = 0; i <= progress && i < nodes.length; i++) {
          nodes[i].classList.add('active');
          if (i > 0) lines[i - 1].classList.add('active');
      }
      progress++;
      if (progress < nbSteps) {
          setTimeout(animateProgressBar, 3000);
      } else {
          setTimeout(() => {
            window.location.href = "./formulaire.html";
          }, 70);
      }
  }
  animateProgressBar();
}
const tiltImages = () => {
    const images = document.querySelectorAll('.image');
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        const maxTilt = 5;

        requestAnimationFrame(() => {
            images.forEach((img) => {
                const scale = img.style.transform.match(/scale\(([\d.]+)\)/) ? 
                            parseFloat(img.style.transform.match(/scale\(([\d.]+)\)/)[1]) : 
                            0;
                const rotateX = mouseY * maxTilt;
                const rotateY = mouseX * maxTilt;
                const translateZ = 50; 
                img.style.transform = `
                    translate(-50%, -50%) 
                    scale(${scale}) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg)
                    translateZ(${translateZ}px)
                `;
            });
        });
    });
    document.addEventListener('mouseleave', () => {
        images.forEach((img) => {
            const scale = img.style.transform.match(/scale\(([\d.]+)\)/) ? 
                        parseFloat(img.style.transform.match(/scale\(([\d.]+)\)/)[1]) : 
                        0;
            img.style.transform = `translate(-50%, -50%) scale(${scale})`;
        });
    });
};
tiltImages();
document.getElementById('homeLink').addEventListener('click', function(e) {
    e.preventDefault();
    
    document.getElementById('calculator').classList.remove('active');
    document.getElementById('calculatorOverlay').classList.remove('active');
    document.getElementById('quizContainer').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
    document.getElementById('mainContent').classList.remove('hidden');
    document.getElementById('terminalText').innerHTML = '';
    document.getElementById('hackProgress').style.display = 'none';
    document.getElementById('contactForm').classList.remove('active');
});

const questions = [
{
    question: "Quelle marque a remporté le plus de titres en Formule 1 ?",
    options: ["Ferrari", "Mercedes", "Red Bull", "McLaren"],
    correct: 0
},
{
    question: "Quel pays a inventé la première voiture à essence ?",
    options: ["États-Unis", "Allemagne", "France", "Italie"],
    correct: 1
},
{
    question: "Quel est le circuit le plus long du championnat du monde de F1 ?",
    options: ["Monaco", "Spa-Francorchamps", "Silverstone", "Monza"],
    correct: 1
},
{
    question: "Quelle voiture détient le record de vitesse sur route homologuée ?",
    options: ["Bugatti Chiron", "Koenigsegg Agera RS", "Hennessey Venom F5", "SSC Tuatara"],
    correct: 1
},
{
    question: "Quel constructeur a popularisé la voiture électrique moderne avec la Model S ?",
    options: ["Renault", "Nissan", "Tesla", "BMW"],
    correct: 2
}
];
let currentQuestion = 0;
let userAnswers = [];
let reponsesConcat = ""; 
function showQuestion(index) {
const container = document.getElementById('questionContainer');
const question = questions[index];
container.style.display = 'block'; 
container.innerHTML = `
    <div class="question-title">${question.question}</div>
    <div class="options-grid">
        ${question.options.map((opt, i) => `
            <button class="option-button" onclick="answerQuestion(${i})">${opt}</button>
        `).join('')}
    </div>
`;
setTimeout(() => container.classList.add('active'), 100);
}

function answerQuestion(answer) {
userAnswers.push(answer);
const qid = currentQuestion + 1;
const rid = answer + 1;
reponsesConcat += (reponsesConcat ? "_" : "") + `A${qid}_${rid}`;
document.querySelector(`.tree-node:nth-child(${currentQuestion * 2 + 1})`).classList.add('active');
document.querySelector(`.tree-line:nth-child(${currentQuestion * 2 + 2})`).classList.add('active');
const container = document.getElementById('questionContainer');
container.classList.remove('active');
currentQuestion++;
if (currentQuestion < questions.length) {
    setTimeout(() => showQuestion(currentQuestion), 500);
} else {
    checkAnswers();
}
}
function initializeQuiz() {
const tree = document.getElementById('progressTree');
tree.innerHTML = '';
document.getElementById('contactForm').style.display = 'none';
document.getElementById('questionContainer').style.display = 'block';
currentQuestion = 0;
userAnswers = [];
reponsesConcat = "";
questions.forEach((_, index) => {
    const node = document.createElement('div');
    node.className = 'tree-node';
    node.style.top = `${(index * 100) / (questions.length - 1)}%`;
    const line = document.createElement('div');
    line.className = 'tree-line';
    line.style.top = `${(index * 100) / (questions.length - 1)}%`;
    line.style.height = `${100 / (questions.length - 1)}%`;
    tree.appendChild(node);
    tree.appendChild(line);
});
showQuestion(0);
}
function checkFormulaireHtmlAndRedirect() {
    fetch('formulaire.html', { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                window.location.href = 'formulaire.html';
            } else {
                alert("Le fichier formulaire.html n'existe pas.");
            }
        })
        .catch(() => {
            alert("Erreur lors de la vérification du fichier formulaire.html.");
        });
}
function checkAnswers() {
  if (userAnswers.length === questions.length) {
      const toutesLesReponsesSontBonnes = userAnswers.every((ans, idx) => ans === questions[idx].correct);
      if (toutesLesReponsesSontBonnes) {
          checkFormulaireHtmlAndRedirect();
      } else {
          alert("Certaines réponses sont incorrectes. Veuillez réessayer.");
      }
      return;
  }
}

function finDuQuiz() {
    if (toutesLesReponsesSontBonnes) {
        fetch('formulaire.html', { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
              
                    window.location.href = 'formulaire.html';
                } else {
                    alert("Le fichier formulaire.html n'existe pas.");
                }
            })
            .catch(() => {
                alert("Erreur lors de la vérification du fichier formulaire.html.");
            });
    } else {
        
    }
}
document.querySelectorAll('.navbar a').forEach(link => {
if (link.textContent.trim().toLowerCase() === 'projet') {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('calculator').classList.remove('active');
        document.getElementById('calculatorOverlay').classList.remove('active');
        document.getElementById('mainContent').classList.add('hidden');
        document.getElementById('projectContainer').classList.add('active');
        setTimeout(() => {
            document.querySelectorAll('.project-section').forEach((section, idx) => {
                setTimeout(() => section.classList.add('visible'), 200 * idx);
            });
            document.querySelectorAll('.engine-card').forEach((card, idx) => {
                setTimeout(() => card.classList.add('visible'), 400 + 150 * idx);
            });
            document.querySelectorAll('.spec-item').forEach((item, idx) => {
                setTimeout(() => item.classList.add('visible'), 400 + 100 * idx);
            });
        }, 100);
    });
}
});

function hideProject() {
document.getElementById('projectContainer').classList.remove('active');
document.getElementById('mainContent').classList.remove('hidden');
}
