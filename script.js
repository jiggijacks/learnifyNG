const options = {

  optionA: {
    name: "Option A",
    location: "Toronto",
    cost: "$$$",
    evidence: "Strong",
    verification: "Confirmed demo",
    freshness: "Current demo",
    realityGap: "Low",
    trust: 84,
    bestFor: "Reliability",
    confidence: "High",
    claim: "Strongest sample evidence across the decision area.",
    signals: "12 demo signals",
    promise: "Excellent career opportunities.",
    reality:
      "Evidence is positive and relatively consistent, but this remains illustrative demo information.",
    conflicts: 2
  },

  optionB: {
    name: "Option B",
    location: "Vancouver",
    cost: "$$",
    evidence: "Moderate",
    verification: "Partial demo",
    freshness: "Current demo",
    realityGap: "Medium",
    trust: 78,
    bestFor: "Balanced use",
    confidence: "Medium",
    claim:
      "Positive online reputation with some unresolved conflicts.",
    signals: "9 demo signals",
    promise: "Strong student experience.",
    reality:
      "Evidence is generally positive but several areas require additional verification.",
    conflicts: 3
  },

  optionC: {
    name: "Option C",
    location: "Calgary",
    cost: "$",
    evidence: "Limited",
    verification: "Needs verification",
    freshness: "Current demo",
    realityGap: "High",
    trust: 64,
    bestFor: "Budget first",
    confidence: "Low",
    claim:
      "Lower cost signal but weaker evidence and more uncertainty.",
    signals: "6 demo signals",
    promise: "Affordable education with strong outcomes.",
    reality:
      "Available information is limited and should be independently verified.",
    conflicts: 5
  }

};


let choice =
  localStorage.getItem("learnifyngChoice") ||
  "Option A";


let currentQuestion =
  localStorage.getItem("learnifyngQuestion") ||
  "Which option is the safest and most reliable for me?";


let priorities =
  JSON.parse(
    localStorage.getItem("learnifyngPriorities") ||
    "[]"
  );


/* ========================================
   NAVIGATION
======================================== */

function go(route) {

  const home =
    document.querySelector("#home");

  const mvp =
    document.querySelector("#mvp");


  if (!home || !mvp) {
    return;
  }


  if (route === "home") {

    home.hidden = false;
    mvp.hidden = true;

  } else {

    home.hidden = true;
    mvp.hidden = false;


    document
      .querySelectorAll(".view")
      .forEach(view => {
        view.style.display = "none";
      });


    const view =
      document.querySelector(
        "#" + route + "-view"
      );


    if (!view) {
      go("home");
      return;
    }


    view.style.display = "block";

  }


  history.replaceState(
    null,
    "",
    route === "home"
      ? "#home"
      : "#" + route
  );


  window.scrollTo(0, 0);

}


/* ========================================
   QUESTION CONTEXT
======================================== */

function updateContext() {

  const ids = [
    "question-context",
    "advisory-question",
    "decision-question"
  ];


  ids.forEach(id => {

    const element =
      document.querySelector("#" + id);


    if (element) {
      element.textContent =
        currentQuestion;
    }

  });

}


/* ========================================
   EXPLORE
======================================== */

function renderExplore() {

  const container =
    document.querySelector("#explore-list");


  if (!container) {
    return;
  }


  container.innerHTML =
    Object.values(options)
      .map(option => {

        const id =
          Object.keys(options)
            .find(
              key =>
                options[key].name === option.name
            );


        return `

          <article class="record-card">

            <div class="record-top">

              <span class="demo-pill">
                DEMO OPTION
              </span>

              <span class="confidence">
                ${option.confidence} confidence
              </span>

            </div>


            <h3>
              ${option.name}
            </h3>


            <p class="record-summary">
              ${option.claim}
            </p>


            <div class="record-meta">

              <span>
                <b>Location</b>
                ${option.location}
              </span>

              <span>
                <b>Cost signal</b>
                ${option.cost}
              </span>

              <span>
                <b>Evidence</b>
                ${option.evidence}
              </span>

              <span>
                <b>Trust Score</b>
                ${option.trust}/100
              </span>

            </div>


            <button
              class="outline-dark"
              data-verify="${id}"
            >
              Check this option →
            </button>

          </article>

        `;

      })
      .join("");

}


/* ========================================
   VERIFICATION
======================================== */

function renderVerification(id = "optionA") {

  const option =
    options[id] ||
    options.optionA;


  const container =
    document.querySelector(
      "#verification-detail"
    );


  if (!container) {
    return;
  }


  container.innerHTML = `

    <div class="detail-claim">

      <span class="demo-pill">
        DEMO VERIFICATION
      </span>


      <h2>
        ${option.name}
      </h2>


      <p>
        ${option.claim}
      </p>

    </div>


    <div class="layer">

      <span>
        WHAT THEY SAY
      </span>

      <p>
        "${option.promise}"
      </p>

    </div>


    <div class="layer">

      <span>
        WHAT THE EVIDENCE SUGGESTS
      </span>

      <p>
        ${option.reality}
      </p>

    </div>


    <div class="layer">

      <span>
        OFFICIAL INFORMATION
      </span>

      <p>
        Production LearnifyNG would connect important
        claims to the relevant official source.
        This prototype uses illustrative information.
      </p>

    </div>


    <div class="layer">

      <span>
        REVIEWS & PUBLIC SIGNALS
      </span>

      <p>
        Sample online, review and public information
        would be cross checked for consistency.
      </p>

    </div>


    <div class="layer">

      <span>
        LOCAL INTELLIGENCE
      </span>

      <p>
        A production investigation could use local
        researchers or verified contributors to test
        current real world conditions.
      </p>

    </div>


    <div class="layer">

      <span>
        CONFLICTS FOUND
      </span>

      <p>
        ${option.conflicts} illustrative conflicts flagged.
      </p>

    </div>


    <div class="layer">

      <span>
        LAST VERIFIED
      </span>

      <p>
        September 2026 demo.
      </p>

    </div>


    <div class="layer analysis">

      <span>
        PROMISE VS REALITY
      </span>

      <p>
        Reality Gap:
        <strong>
          ${option.realityGap}
        </strong>
      </p>

    </div>


    <button
      class="button primary"
      data-trust="${id}"
      type="button"
    >
      See Trust Score →
    </button>

  `;

}


/* ========================================
   TRUST SCORE
======================================== */

function renderTrust(id = "optionA") {

  const option =
    options[id] ||
    options.optionA;


  const container =
    document.querySelector(
      "#trust-detail"
    );


  if (!container) {
    return;
  }


  container.innerHTML = `

    <div class="detail-claim">

      <span class="demo-pill">
        DEMO TRUST SCORE
      </span>


      <h2>
        ${option.name}:
        ${option.trust}/100
      </h2>


      <p>
        This is an illustrative prototype score,
        not a real world rating.
      </p>

    </div>


    <div class="score-card">

      <div class="score-top">

        <span>
          Trust Score
        </span>

        <strong>
          ${option.trust}
          <span>/100</span>
        </strong>

      </div>


      <div class="meter">

        <i
          style="width:${option.trust}%"
        ></i>

      </div>


      <div class="score-grid">

        <span>
          Evidence strength
          <b>
            ${option.evidence}
          </b>
        </span>


        <span>
          Source quality
          <b>
            High demo
          </b>
        </span>


        <span>
          Verification
          <b>
            ${option.verification}
          </b>
        </span>


        <span>
          Freshness
          <b>
            ${option.freshness}
          </b>
        </span>


        <span>
          Conflicts
          <b>
            ${option.conflicts} flagged
          </b>
        </span>


        <span>
          Local intelligence
          <b>
            Available in production
          </b>
        </span>

      </div>


      <p class="reality">

        Reality gap

        <strong>
          ${option.realityGap}
        </strong>

      </p>

    </div>


    <div class="layer">

      <span>
        WHY THIS SCORE?
      </span>

      <p>
        The score is intended to reflect evidence strength,
        verification, freshness, source quality and conflicts.
        It should never be treated as a mysterious number.
      </p>

    </div>


    <div class="layer analysis">

      <span>
        IMPORTANT
      </span>

      <p>
        This prototype has not performed a real investigation.
        Production scores would require live evidence,
        verification workflows and governed data.
      </p>

    </div>


    <button
      class="button primary"
      data-route="compare"
      type="button"
    >
      Compare options →
    </button>

  `;

}


/* ========================================
   COMPARISON
======================================== */

function renderComparison() {

  const table =
    document.querySelector(
      "#comparison-table"
    );


  if (!table) {
    return;
  }


  const rows = [

    [
      "Trust Score",
      "84/100",
      "78/100",
      "64/100"
    ],

    [
      "Cost",
      "$$$",
      "$$",
      "$"
    ],

    [
      "Evidence",
      "Strong",
      "Moderate",
      "Limited"
    ],

    [
      "Verification",
      "Confirmed",
      "Partial",
      "Needs verification"
    ],

    [
      "Reality Gap",
      "Low",
      "Medium",
      "High"
    ],

    [
      "Best fit",
      "Reliability",
      "Balanced",
      "Budget"
    ]

  ];


  table.innerHTML =
    rows
      .map(row => {

        return `

          <tr>

            <th>
              ${row[0]}
            </th>

            <td>
              ${row[1]}
            </td>

            <td>
              ${row[2]}
            </td>

            <td>
              ${row[3]}
            </td>

          </tr>

        `;

      })
      .join("");

}


/* ========================================
   PRIORITIES
======================================== */

function updatePriorities() {

  document
    .querySelectorAll("[data-priority]")
    .forEach(button => {

      button.classList.toggle(
        "selected",
        priorities.includes(
          button.dataset.priority
        )
      );

    });


  const result =
    document.querySelector(
      "#priority-result"
    );


  if (!result) {
    return;
  }


  if (!priorities.length) {

    result.textContent =
      "Select one or more priorities.";

  } else {

    result.textContent =
      "Your priorities: " +
      priorities.join(", ");

  }


  localStorage.setItem(
    "learnifyngPriorities",
    JSON.stringify(priorities)
  );

}


/* ========================================
   ADVICE
======================================== */

function renderAdvice() {

  const prioritiesElement =
    document.querySelector(
      "#advisory-priorities"
    );


  if (!prioritiesElement) {
    return;
  }


  prioritiesElement.textContent =
    priorities.length
      ? priorities.join(", ")
      : "Not selected yet.";

}


/* ========================================
   DECISION
======================================== */

function updateDecision() {

  const selected =
    document.querySelector(
      "#selected-option"
    );


  const title =
    document.querySelector(
      "#decision-title"
    );


  const copy =
    document.querySelector(
      "#decision-copy"
    );


  if (selected) {
    selected.textContent =
      choice + " selected";
  }


  if (title) {
    title.textContent =
      choice +
      " is the strongest demo fit.";
  }


  if (copy) {

    copy.textContent =
      "The recommendation weighs illustrative evidence, " +
      "verification, your priorities and stated tradeoffs. " +
      "A production recommendation would use live intelligence.";

  }


  localStorage.setItem(
    "learnifyngChoice",
    choice
  );

}


/* ========================================
   EVIDENCE
======================================== */

function renderEvidence(id = "optionA") {

  const option =
    options[id] ||
    options.optionA;


  const container =
    document.querySelector(
      "#record-detail"
    );


  if (!container) {
    return;
  }


  container.innerHTML = `

    <div class="detail-claim">

      <span class="demo-pill">
        DEMO EVIDENCE TRAIL
      </span>


      <h2>
        ${option.name}
      </h2>


      <p>
        ${option.claim}
      </p>

    </div>


    <div class="layer">

      <span>
        FACT
      </span>

      <p>
        Illustrative signals have been collected
        for this prototype.
      </p>

    </div>


    <div class="layer">

      <span>
        EVIDENCE
      </span>

      <p>
        ${option.signals} across sample information
        categories.
      </p>

    </div>


    <div class="layer">

      <span>
        VERIFICATION
      </span>

      <p>
        ${option.verification}.
        Production verification would cross check
        independent sources and human field reports.
      </p>

    </div>


    <div class="layer">

      <span>
        ANALYSIS
      </span>

      <p>
        The illustrative evidence currently favours
        ${option.name}, but no real investigation was performed.
      </p>

    </div>

  `;

}


/* ========================================
   SEARCH
======================================== */

function setupSearch() {

  const form =
    document.querySelector(
      "#header-search"
    );


  if (!form) {
    return;
  }


  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const input =
        document.querySelector(
          "#header-search-input"
        );


      if (!input) {
        return;
      }


      const value =
        input.value.trim();


      if (!value) {
        return;
      }


      currentQuestion =
        value;


      localStorage.setItem(
        "learnifyngQuestion",
        currentQuestion
      );


      const question =
        document.querySelector(
          "#question"
        );


      if (question) {
        question.value =
          currentQuestion;
      }


      updateContext();

      renderExplore();

      go("explore");

    }
  );

}


/* ========================================
   QUESTION FORM
======================================== */

function setupQuestionForm() {

  const form =
    document.querySelector(
      "#question-form"
    );


  if (!form) {
    return;
  }


  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const input =
        document.querySelector(
          "#question"
        );


      if (!input) {
        return;
      }


      const value =
        input.value.trim();


      if (value) {

        currentQuestion =
          value;

      }


      localStorage.setItem(
        "learnifyngQuestion",
        currentQuestion
      );


      updateContext();

      renderExplore();

      go("explore");

    }
  );

}


/* ========================================
   INTERACTIONS
======================================== */

function setupInteractions() {

  document.addEventListener(
    "click",
    event => {


      /* Navigation */

      let element =
        event.target.closest(
          "[data-route]"
        );


      if (element) {

        event.preventDefault();


        const route =
          element.dataset.route;


        if (route === "trust") {
          renderTrust(choice);
        }


        if (route === "compare") {
          renderComparison();
          updatePriorities();
        }


        if (route === "advisory") {
          renderAdvice();
        }


        go(route);

        return;

      }


      /* Verification */

      element =
        event.target.closest(
          "[data-verify]"
        );


      if (element) {

        const id =
          element.dataset.verify;


        choice =
          options[id].name;


        localStorage.setItem(
          "learnifyngChoice",
          choice
        );


        renderVerification(id);

        go("verification");

        return;

      }


      /* Trust */

      element =
        event.target.closest(
          "[data-trust]"
        );


      if (element) {

        const id =
          element.dataset.trust;


        choice =
          options[id].name;


        localStorage.setItem(
          "learnifyngChoice",
          choice
        );


        renderTrust(id);

        go("trust");

        return;

      }


      /* Priorities */

      element =
        event.target.closest(
          "[data-priority]"
        );


      if (element) {

        const priority =
          element.dataset.priority;


        if (
          priorities.includes(priority)
        ) {

          priorities =
            priorities.filter(
              item =>
                item !== priority
            );

        } else {

          priorities.push(priority);

        }


        updatePriorities();

        return;

      }


      /* Continue to advice */

      if (
        event.target.id ===
        "continue-advice"
      ) {

        renderAdvice();

        go("advisory");

        return;

      }


      /* Continue to decision */

      if (
        event.target.id ===
        "continue-decision"
      ) {

        updateDecision();

        go("decision");

        return;

      }


      /* Connection */

      if (
        event.target.id ===
        "connect-button"
      ) {

        const status =
          document.querySelector(
            "#saved-status"
          );


        if (status) {

          status.textContent =
            "Connection is a production feature. " +
            "This prototype stops here.";

        }

        return;

      }

    }
  );

}


/* ========================================
   INITIALIZE
======================================== */

function init() {

  renderExplore();

  renderComparison();

  updateContext();

  updatePriorities();

  renderAdvice();

  updateDecision();

  setupSearch();

  setupQuestionForm();

  setupInteractions();


  const question =
    document.querySelector(
      "#question"
    );


  if (question) {
    question.value =
      currentQuestion;
  }


  const route =
    location.hash
      .replace("#", "")
      .trim();


  if (!route || route === "top") {

    go("home");

  } else {

    if (route === "explore") {
      renderExplore();
    }

    if (route === "compare") {
      renderComparison();
      updatePriorities();
    }

    if (route === "advisory") {
      renderAdvice();
    }

    if (route === "trust") {
      renderTrust();
    }

    if (route === "verification") {
      renderVerification();
    }

    if (route === "evidence") {
      renderEvidence();
    }

    go(route);

  }

}


/* ========================================
   START
======================================== */

if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    init
  );

} else {

  init();

}
