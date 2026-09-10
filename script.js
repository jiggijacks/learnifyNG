const records = {
  optionA: [
    "Option A",
    "Strongest sample evidence across the decision area.",
    "12 demo signals",
    "Verified demo",
    "High"
  ],

  optionB: [
    "Option B",
    "Positive online reputation with some unresolved conflicts.",
    "9 demo signals",
    "Partially verified",
    "Medium"
  ],

  optionC: [
    "Option C",
    "Lower cost signal but weaker evidence and more uncertainty.",
    "6 demo signals",
    "Needs verification",
    "Low"
  ]
};


let choice =
  localStorage.getItem("learnifyngGoldChoice") ||
  "Option A";


let currentQuestion =
  localStorage.getItem("learnifyngGoldQuestion") ||
  "Which option is the safest and most reliable for me?";


/* --------------------------------
   PAGE NAVIGATION
-------------------------------- */

function go(route) {

  const home = document.querySelector("#home");
  const mvp = document.querySelector("#mvp");

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
      document.querySelector("#" + route + "-view");


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


/* --------------------------------
   INTELLIGENCE RECORDS
-------------------------------- */

function renderRecords() {

  const list =
    document.querySelector("#record-list");


  if (!list) {
    return;
  }


  list.innerHTML =
    Object.entries(records)
      .map(([id, record]) => {

        return `
          <article class="record-card">

            <div class="record-top">

              <span class="demo-pill">
                DEMO INTELLIGENCE
              </span>

              <span class="confidence">
                ${record[4]} confidence
              </span>

            </div>


            <h3>
              ${record[0]}
            </h3>


            <p class="record-summary">
              ${record[1]}
            </p>


            <div class="record-meta">

              <span>
                <b>Claim</b>
                ${record[1]}
              </span>


              <span>
                <b>Signals</b>
                ${record[2]}
              </span>


              <span>
                <b>Verification</b>
                ${record[3]}
              </span>


              <span>
                <b>Freshness</b>
                September 2026 demo
              </span>

            </div>


            <button
              class="outline-dark"
              data-trust="${id}"
            >
              Why should I trust this? →
            </button>

          </article>
        `;

      })
      .join("");
}


/* --------------------------------
   TRUST SCORE
-------------------------------- */

function renderTrust(id = "optionA") {

  const record =
    records[id] || records.optionA;


  let score = 51;


  if (record[4] === "High") {
    score = 78;
  }


  if (record[4] === "Medium") {
    score = 67;
  }


  const container =
    document.querySelector("#trust-detail");


  if (!container) {
    return;
  }


  container.innerHTML = `

    <div class="detail-claim">

      <span class="demo-pill">
        DEMO SCORE
      </span>


      <h2>
        ${record[0]} Trust Score:
        ${score}/100
      </h2>


      <p>
        ${record[1]}
        This is illustrative prototype intelligence,
        not a real world claim.
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
        ${record[2]} across sample online,
        review and human intelligence categories.
        No real investigation was performed.
      </p>

    </div>


    <div class="layer">

      <span>
        VERIFICATION
      </span>

      <p>
        Status: ${record[3]}.
        A production system would cross check
        independent sources and human field reports.
      </p>

    </div>


    <div class="layer">

      <span>
        REALITY GAP
      </span>

      <p>
        The score is intended to show the difference
        between promotional promise, online sentiment
        and verified real world experience.
      </p>

    </div>


    <div class="layer analysis">

      <span>
        ANALYSIS
      </span>

      <p>
        Trust is based on the strength, freshness
        and agreement of evidence rather than
        on positive mentions alone.
      </p>

    </div>

  `;
}


/* --------------------------------
   COMPARISON
-------------------------------- */

function renderComparison() {

  const table =
    document.querySelector("#comparison-table");


  if (!table) {
    return;
  }


  const rows = [

    [
      "Evidence strength",
      "Strong",
      "Moderate",
      "Limited"
    ],

    [
      "Verification",
      "Confirmed demo",
      "Partial demo",
      "Needs verification"
    ],

    [
      "Freshness",
      "Current demo",
      "Current demo",
      "Current demo"
    ],

    [
      "Reality gap",
      "Low demo",
      "Medium demo",
      "High demo"
    ],

    [
      "Trust Score",
      "78/100",
      "67/100",
      "51/100"
    ],

    [
      "Best fit",
      "Reliability",
      "Balanced use",
      "Budget first"
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


/* --------------------------------
   QUESTION CONTEXT
-------------------------------- */

function updateContext() {

  const elements = [

    "question-context",

    "advisory-question",

    "decision-question"

  ];


  elements.forEach(id => {

    const element =
      document.querySelector("#" + id);


    if (element) {

      element.textContent =
        currentQuestion;

    }

  });

}


/* --------------------------------
   DECISION
-------------------------------- */

function updateDecision() {

  document
    .querySelectorAll("[data-option]")
    .forEach(button => {

      button.classList.toggle(
        "selected",
        button.dataset.option === choice
      );

    });


  const selected =
    document.querySelector("#selected-option");


  if (selected) {

    selected.textContent =
      choice + " selected";

  }


  const title =
    document.querySelector("#decision-title");


  if (title) {

    title.textContent =
      choice +
      " is the selected demo fit.";

  }


  const copy =
    document.querySelector("#decision-copy");


  if (copy) {

    copy.textContent =
      "This prototype decision weighs illustrative evidence, verification, advisory context and stated tradeoffs. A production recommendation would use live intelligence.";

  }


  localStorage.setItem(
    "learnifyngGoldChoice",
    choice
  );

}


/* --------------------------------
   SAVED DECISION
-------------------------------- */

function restoreSaved() {

  const saved =
    localStorage.getItem(
      "learnifyngGoldDecision"
    );


  const status =
    document.querySelector("#saved-status");


  if (
    saved &&
    status
  ) {

    status.textContent =
      "Demo decision saved for " +
      saved +
      ". No real investigation was created.";

  }

}


/* --------------------------------
   SEARCH BAR
-------------------------------- */

function setupSearch() {

  const searchForm =
    document.querySelector("#header-search");


  if (!searchForm) {
    return;
  }


  searchForm.addEventListener(
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


      const search =
        input.value.trim();


      if (!search) {
        return;
      }


      currentQuestion =
        search;


      localStorage.setItem(
        "learnifyngGoldQuestion",
        currentQuestion
      );


      const questionInput =
        document.querySelector("#question");


      if (questionInput) {

        questionInput.value =
          currentQuestion;

      }


      updateContext();


      go("intelligence");

    }
  );

}


/* --------------------------------
   BUTTONS AND LINKS
-------------------------------- */

function setupInteractions() {

  document.addEventListener(
    "click",
    event => {


      /*
        Navigation
      */

      let element =
        event.target.closest(
          "[data-route]"
        );


      if (element) {

        event.preventDefault();

        go(
          element.dataset.route
        );

        return;

      }


      /*
        Trust Score
      */

      element =
        event.target.closest(
          "[data-trust]"
        );


      if (element) {

        renderTrust(
          element.dataset.trust
        );

        go("trust");

        return;

      }


      /*
        Option selection
      */

      element =
        event.target.closest(
          "[data-option]"
        );


      if (element) {

        choice =
          element.dataset.option;

        updateDecision();

        return;

      }


      /*
        Save decision
      */

      if (
        event.target.id ===
        "save-decision"
      ) {

        localStorage.setItem(
          "learnifyngGoldDecision",
          choice
        );


        const status =
          document.querySelector(
            "#saved-status"
          );


        if (status) {

          status.textContent =
            "Demo decision saved for " +
            choice +
            ". No real investigation was created.";

        }

      }

    }
  );

}


/* --------------------------------
   QUESTION FORM
-------------------------------- */

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
        "learnifyngGoldQuestion",
        currentQuestion
      );


      updateContext();


      go("intelligence");

    }
  );

}


/* --------------------------------
   INITIALIZE
-------------------------------- */

function init() {

  renderRecords();

  renderTrust();

  renderComparison();

  updateContext();

  updateDecision();

  restoreSaved();

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


  const search =
    document.querySelector(
      "#header-search-input"
    );


  if (search) {

    search.value = "";

  }


  const route =
    location.hash
      .replace("#", "")
      .trim();


  if (!route || route === "top") {

    go("home");

  } else {

    go(route);

  }

}


/* --------------------------------
   START APP
-------------------------------- */

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
