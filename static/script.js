/**
 * SentimentScope — script.js
 * Frontend-only demo. Replace simulatePrediction() with
 * a real fetch() call to your ML backend when ready.
 */
let lrMatrix = {};
let nbMatrix = {};
let metricsChart;
let confidenceChart;
// ── Example Reviews ────────────────────────────────────────────────
const EXAMPLES = {
  positive: `Absolutely love this product! It exceeded all my expectations. The build quality is fantastic and it arrived well ahead of the estimated delivery date. Setup was effortless and it works perfectly out of the box. Highly recommend to anyone looking for reliable, great value for money.`,

  negative: `Extremely disappointed with this purchase. The product stopped working after just two days and the material feels incredibly cheap — nothing like what was shown in the photos. Customer support was unhelpful and dismissive. Total waste of money. Would give zero stars if I could.`
};

// ── Keyword Pools ───────────────────────────────────────────────────
const KEYWORDS = {
  positive: ["love", "exceeded", "fantastic", "effortless", "recommend", "reliable", "great value", "happy", "quality", "perfect"],
  negative: ["disappointed", "cheap", "unhelpful", "waste", "avoid", "broken", "terrible", "defective", "misleading", "refund"],
  neutral:  ["product", "delivery", "packaging", "price", "brand", "features", "expected", "size", "weight"]
};

// ── Fill example text ───────────────────────────────────────────────
function fillExample(type) {
  const textarea = document.getElementById("review-input");
  textarea.value = EXAMPLES[type];
  textarea.focus();
  textarea.style.transition = "box-shadow 0.3s";
  textarea.style.boxShadow  = `0 0 0 3px ${type === "positive"
    ? "rgba(46,204,113,0.25)"
    : "rgba(231,76,60,0.25)"}`;
  setTimeout(() => { textarea.style.boxShadow = ""; }, 1000);
}

// ── Simulate ML prediction (replace with real API call later) ────────
function simulatePrediction(text) {
  const lower = text.toLowerCase();

  // Count positive / negative indicator words
  const posHits = KEYWORDS.positive.filter(w => lower.includes(w)).length;
  const negHits = KEYWORDS.negative.filter(w => lower.includes(w)).length;

  let sentiment;
  if (posHits > negHits) sentiment = "Positive";
  else if (negHits > posHits) sentiment = "Negative";
  else sentiment = "Neutral";

  // Randomise confidence realistically between 72–96%
  const base  = sentiment === "Positive" ? 80 : sentiment === "Negative" ? 82 : 70;
  const lrConf = Math.min(96, base + Math.floor(Math.random() * 14));
  const nbConf = Math.min(95, base - 3 + Math.floor(Math.random() * 12));

  // Pick keywords to highlight
  const pool = [...KEYWORDS[sentiment.toLowerCase()], ...KEYWORDS.neutral.slice(0, 3)];
  const found = pool.filter(w => lower.includes(w));
  const keywords = found.length ? found : pool.slice(0, 5);

  // Tag each keyword with sentiment class
  const taggedKeywords = keywords.map(k => ({
    word: k,
    type: KEYWORDS.positive.includes(k) ? "positive"
        : KEYWORDS.negative.includes(k) ? "negative"
        : "neutral"
  }));

  return {
    lr: { sentiment, confidence: lrConf },
    nb: { sentiment, confidence: nbConf },
    keywords: taggedKeywords
  };
}

// ── Render a model card ─────────────────────────────────────────────
function renderCard(cardId, sentimentId, barId, pctId, data) {
  const card = document.getElementById(cardId);
  const label = document.getElementById(sentimentId);
  const bar   = document.getElementById(barId);
  const pct   = document.getElementById(pctId);

  const cls = data.sentiment.toLowerCase();

  // Card border colour
  card.className = `model-card is-${cls}`;

  // Sentiment label
  label.textContent = data.sentiment;
  label.className   = `model-sentiment sentiment-${cls}`;

  // Confidence bar (delayed to trigger CSS transition)
  bar.className = `conf-bar bar-${cls}`;
  requestAnimationFrame(() => {
    bar.style.width = data.confidence + "%";
  });

  pct.textContent = data.confidence + "%";
}

// ── Main predict function ────────────────────────────────────────────
function predictSentiment() {

  const startTime = performance.now();
  const text = document.getElementById("review-input").value.trim();

  if (!text) {
    shakeTextarea();
    return;
  }

  const btn = document.querySelector(".predict-btn");
  btn.classList.add("loading");
  btn.disabled = true;

  fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      review: text
    })
  })

  .then(response => response.json())

  .then(result => {

    const section = document.getElementById("results");
    section.style.display = "block";

    // Show prediction cards
    renderCard("lr-card","lr-sentiment","lr-bar","lr-pct",result.lr);
    renderCard("nb-card","nb-sentiment","nb-bar","nb-pct",result.nb);

    // Calculate confusion matrices from dataset
    lrMatrix = result.lr_matrix;
    nbMatrix = result.nb_matrix;
    // Show LR matrix by default
    showMatrix('lr');

    updateConfidenceChart(result);

    // ---- METRICS CALCULATION ----

    const total =
      lrMatrix.pp + lrMatrix.pn + lrMatrix.pneg +
      lrMatrix.np + lrMatrix.nn + lrMatrix.nneg +
      lrMatrix.negp + lrMatrix.negn + lrMatrix.negneg;

    const correct =
      lrMatrix.pp +
      lrMatrix.nn +
      lrMatrix.negneg;

    const accuracy = correct / total;

    const precision =
      lrMatrix.pp / (lrMatrix.pp + lrMatrix.np + lrMatrix.negp);

    const recall =
      lrMatrix.pp / (lrMatrix.pp + lrMatrix.pn + lrMatrix.pneg);

    const f1 =
      (2 * precision * recall) / (precision + recall);

    // Model comparison
    const diff = Math.abs(result.lr.confidence - result.nb.confidence);
    document.getElementById("confidence-diff").textContent = diff + "%";

    // Time calculation
    const endTime = performance.now();
    const totalTime = (endTime - startTime).toFixed(2);
    document.getElementById("analysis-time").textContent = totalTime + " ms";

    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    btn.classList.remove("loading");
    btn.disabled = false;

  })

  .catch(error => {

    console.error("Prediction Error:", error);
    alert("Backend connection failed. Check Flask server.");

    btn.classList.remove("loading");
    btn.disabled = false;

  });

}
// ── Shake textarea on empty submit ──────────────────────────────────
function shakeTextarea() {
  const ta = document.getElementById("review-input");
  ta.style.transition = "transform 0.07s, border-color 0.2s";
  ta.style.borderColor = "#e74c3c";
  const shakes = [6, -6, 5, -5, 3, 0];
  shakes.forEach((x, i) => {
    setTimeout(() => {
      ta.style.transform = `translateX(${x}px)`;
      if (i === shakes.length - 1) {
        ta.style.borderColor = "";
      }
    }, i * 60);
  });
}

// ── Allow Ctrl+Enter / Cmd+Enter to submit ──────────────────────────
document.getElementById("review-input").addEventListener("keydown", function (e) {
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    predictSentiment();
  }
});

function calculateMatrix(actual, predicted) {

  let matrix = {
    pp:0, pn:0, pneg:0,
    np:0, nn:0, nneg:0,
    negp:0, negn:0, negneg:0
  };

  for (let i = 0; i < actual.length; i++) {

    const a = actual[i];
    const p = predicted[i];

    if (a === "Positive" && p === "Positive") matrix.pp++;
    else if (a === "Positive" && p === "Neutral") matrix.pn++;
    else if (a === "Positive" && p === "Negative") matrix.pneg++;

    else if (a === "Neutral" && p === "Positive") matrix.np++;
    else if (a === "Neutral" && p === "Neutral") matrix.nn++;
    else if (a === "Neutral" && p === "Negative") matrix.nneg++;

    else if (a === "Negative" && p === "Positive") matrix.negp++;
    else if (a === "Negative" && p === "Neutral") matrix.negn++;
    else if (a === "Negative" && p === "Negative") matrix.negneg++;

  }

  return matrix;
}
function showMatrix(model) {

  const matrix = model === 'lr' ? lrMatrix : nbMatrix;

  // Update table values (3×3 matrix)
  document.getElementById("pp").textContent = matrix.pp;
  document.getElementById("pn").textContent = matrix.pn;
  document.getElementById("pneg").textContent = matrix.pneg;

  document.getElementById("np").textContent = matrix.np;
  document.getElementById("nn").textContent = matrix.nn;
  document.getElementById("nneg").textContent = matrix.nneg;

  document.getElementById("negp").textContent = matrix.negp;
  document.getElementById("negn").textContent = matrix.negn;
  document.getElementById("negneg").textContent = matrix.negneg;

  // Toggle active button
  document.getElementById("lr-toggle").classList.toggle("active", model === 'lr');
  document.getElementById("nb-toggle").classList.toggle("active", model === 'nb');

  // Calculate totals
  const total =
    matrix.pp + matrix.pn + matrix.pneg +
    matrix.np + matrix.nn + matrix.nneg +
    matrix.negp + matrix.negn + matrix.negneg;

  const correct =
    matrix.pp +
    matrix.nn +
    matrix.negneg;

  const accuracy = correct / total;

  // Precision for Positive
  const precision =
    matrix.pp / (matrix.pp + matrix.np + matrix.negp);

  // Recall for Positive
  const recall =
    matrix.pp / (matrix.pp + matrix.pn + matrix.pneg);

  const f1 =
    (2 * precision * recall) / (precision + recall);

  // Update chart
  updateMetricsChart(accuracy, precision, recall, f1, model);

  const incorrect = total - correct;

  document.getElementById("correct-count").textContent = correct;
  document.getElementById("incorrect-count").textContent = incorrect;
  document.getElementById("total-count").textContent = total;

  generateConclusion();
}

function renderGraphs(acc, prec, rec, f1, result) {

  if (metricsChart) metricsChart.destroy();
  if (confidenceChart) confidenceChart.destroy();

  // BAR CHART (Metrics)
  metricsChart = new Chart(
    document.getElementById("metricsChart"),
    {
      type: "bar",
      data: {
        labels: ["Accuracy", "Precision", "Recall", "F1 Score"],
        datasets: [{
          label: "LR Performance",
          data: [acc, prec, rec, f1],
          backgroundColor: [
            "#58d9c2",
            "#2ecc71",
            "#f0c040",
            "#e67e22"
          ]
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 1
          }
        }
      }
    }
  );

  // RADAR CHART (Confidence Comparison)
confidenceChart = new Chart(
  document.getElementById("confidenceChart"),
  {
    type: "bar",
    data: {
      labels: ["Logistic Regression", "Naive Bayes"],
      datasets: [{
        label: "Confidence %",
        data: [
          result.lr.confidence,
          result.nb.confidence
        ],
        backgroundColor: ["#58d9c2", "#2ecc71"]
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  }
);
}

function updateMetricsChart(acc, prec, rec, f1, model) {

  if (metricsChart) metricsChart.destroy();

  metricsChart = new Chart(
    document.getElementById("metricsChart"),
    {
      type: "bar",
      data: {
        labels: ["Accuracy", "Precision", "Recall", "F1 Score"],
        datasets: [{
          label: model === 'lr' ? "LR Performance" : "NB Performance",
          data: [acc, prec, rec, f1],
          backgroundColor: model === 'lr'
            ? ["#58d9c2", "#2ecc71", "#f0c040", "#e67e22"]
            : ["#3498db", "#9b59b6", "#f39c12", "#e74c3c"]
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 1
          }
        }
      }
    }
  );
}

function updateConfidenceChart(result) {

  if (confidenceChart) confidenceChart.destroy();

  confidenceChart = new Chart(
    document.getElementById("confidenceChart"),
    {
      type: "bar",
      data: {
        labels: ["Logistic Regression", "Naive Bayes"],
        datasets: [{
          label: "Confidence %",
          data: [
            result.lr.confidence,
            result.nb.confidence
          ],
          backgroundColor: ["#58d9c2", "#2ecc71"]
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    }
  );
}

function generateConclusion() {

  const lrTotal =
    lrMatrix.pp + lrMatrix.pn + lrMatrix.pneg +
    lrMatrix.np + lrMatrix.nn + lrMatrix.nneg +
    lrMatrix.negp + lrMatrix.negn + lrMatrix.negneg;

  const lrCorrect =
    lrMatrix.pp + lrMatrix.nn + lrMatrix.negneg;

  const lrAcc = lrTotal ? lrCorrect / lrTotal : 0;


  const nbTotal =
    nbMatrix.pp + nbMatrix.pn + nbMatrix.pneg +
    nbMatrix.np + nbMatrix.nn + nbMatrix.nneg +
    nbMatrix.negp + nbMatrix.negn + nbMatrix.negneg;

  const nbCorrect =
    nbMatrix.pp + nbMatrix.nn + nbMatrix.negneg;

  const nbAcc = nbTotal ? nbCorrect / nbTotal : 0;


  let text = "";

  if (lrAcc > nbAcc) {

    text =
      "Logistic Regression performs better on this dataset. It learns an optimal decision boundary and works well with TF-IDF features, capturing sentiment intensity effectively.";

  } else if (nbAcc > lrAcc) {

    text =
      "Naive Bayes performs better on this dataset. Its probabilistic approach with Bag-of-Words features efficiently captures word frequency patterns in sentiment classification.";

  } else {

    text =
      "Both Logistic Regression and Naive Bayes show similar performance on this dataset.";

  }

  document.getElementById("model-conclusion").textContent = text;
}