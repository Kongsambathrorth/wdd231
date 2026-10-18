/* ==========================================================================
   STREAMING_CHUNK:Defining Course Curriculum Data Object
   ========================================================================== */
const COURSES_DATA = [
  {
    id: "c1",
    title: "The Cash Flow Engine",
    subtitle: "Budgeting, Savings Buffers & Spending Architecture",
    description: "Master automated budgeting, build a resilient $1,000 starter buffer, and safeguard your income from lifestyle creep.",
    lessons: [
      {
        id: "c1-l1",
        moduleTag: "Lesson 1.1",
        title: "The 50/30/20 Budgeting Rule",
        content: `
          <p>Budgeting works best when it is realistic and simple. The <strong>50/30/20 framework</strong> divides your net take-home salary into three intuitive categories:</p>
          <ul>
            <li><strong>50% Needs:</strong> Mandatory overhead (housing rent/mortgage, baseline groceries, utilities, transit).</li>
            <li><strong>30% Wants:</strong> Discretionary spending (dining out, digital subscriptions, recreational trips).</li>
            <li><strong>20% Financial Foundations:</strong> Emergency cash buffer, debt paydown, and long-term savings.</li>
          </ul>
          <p>By scheduling your savings transfer immediately on payday, your financial foundation is protected before discretionary habits take over.</p>
        `,
        takeaway: "Direct 20% into savings automatically on payday before spending on discretionary items.",
        quiz: {
          question: "Under the 50/30/20 framework, where should basic weekly groceries belong?",
          options: ["30% Wants", "50% Needs", "20% Savings"],
          correctIndex: 1,
          explanation: "Essential sustenance and basic grocery supplies are core baseline survival costs inside the 50% Needs category."
        }
      },
      {
        id: "c1-l2",
        moduleTag: "Lesson 1.2",
        title: "The Anti-Fragile $1,000 Buffer",
        content: `
          <p>An emergency fund is not an investment meant to generate high yields. It is an <strong>insurance firewall against toxic high-interest credit card balances</strong>.</p>
          <p>Before pursuing ambitious investing, assemble an initial $1,000 liquid buffer inside a dedicated High-Yield Savings Account (HYSA). When surprise repairs hit, you pay cash instead of carrying high-interest revolving balances.</p>
        `,
        takeaway: "Park an initial $1,000 liquid cushion in an HYSA completely separate from your day-to-day debit card.",
        quiz: {
          question: "What is the primary role of an initial emergency reserve?",
          options: ["Trading speculative equities", "Preventing high-interest debt when unexpected costs occur", "Buying discretionary flash-sale luxury items"],
          correctIndex: 1,
          explanation: "The starter cushion acts as an immediate shield so unanticipated emergencies don't force you into debt."
        }
      },
      {
        id: "c1-l3",
        moduleTag: "Lesson 1.3",
        title: "Stopping Silent Subscription Leaks",
        content: `
          <p>Recurring digital micro-transactions quietly siphon savings. A streaming account, an unused gym membership, and duplicate cloud backups can easily drain over $1,200 annually.</p>
          <p>Perform a <strong>Quarterly Subscription Audit</strong>: print the last 90 days of bank activity and flag every auto-renewing vendor. Immediately cancel any service not actively used in the prior 30 days.</p>
        `,
        takeaway: "Cancel any subscription unused in the last 30 days; conduct an audit once every 90 days.",
        quiz: {
          question: "How frequently should a subscription audit ideally be performed?",
          options: ["Once every decade", "Every 90 days (Quarterly)", "Never"],
          correctIndex: 1,
          explanation: "Auditing quarterly catches price increases and unused renewals before they compound into substantial losses."
        }
      },
      {
        id: "c1-l4",
        moduleTag: "Lesson 1.4",
        title: "Automating Your Financial Architecture",
        content: `
          <p>Willpower is a finite resource. Consistently disciplined savers succeed because they eliminate daily manual decisions through automation.</p>
          <p>Configure automated split deposits on payday: 50% remains in checking for bills, 20% routes to a high-yield account, and 30% flows to a secondary discretionary card. When that balance reaches zero, discretionary spending pauses.</p>
        `,
        takeaway: "Automate transfers within 24 hours of your paycheck landing to eliminate willpower friction.",
        quiz: {
          question: "Why is automated saving superior to saving leftover money at month's end?",
          options: ["It removes reliance on ongoing willpower", "It reduces income taxes automatically", "Banks charge lower fees for manual transfers"],
          correctIndex: 0,
          explanation: "Paying yourself first guarantees savings happen consistently before discretionary spending takes over."
        }
      }
    ]
  },
  {
    id: "c2",
    title: "Debt-Free by Design",
    subtitle: "FICO Scores, Credit Optimization & Strategic Elimination",
    description: "Understand credit scoring models, eliminate high-APR credit debt, and distinguish between toxic loans and productive leverage.",
    lessons: [
      {
        id: "c2-l1",
        moduleTag: "Lesson 2.1",
        title: "Anatomy of Your Credit Score",
        content: `
          <p>A credit score dictates mortgage interest rates, rental approvals, and loan terms. The standard FICO calculation is weighted by five distinct pillars:</p>
          <ul>
            <li><strong>35% Payment History:</strong> Consistent on-time minimum payments.</li>
            <li><strong>30% Credit Utilization:</strong> Ratio of active balances to total credit lines.</li>
            <li><strong>15% Length of Credit History:</strong> Average age across accounts.</li>
            <li><strong>10% Credit Mix:</strong> Healthy combination of revolving and installment lines.</li>
            <li><strong>10% New Inquiries:</strong> Hard checks from recent credit applications.</li>
          </ul>
        `,
        takeaway: "Payment history and utilization represent 65% of your score—safeguard both unconditionally.",
        quiz: {
          question: "Which component carries the largest individual weight in your FICO credit calculation?",
          options: ["Credit Mix (10%)", "Payment History (35%)", "New Inquiries (10%)"],
          correctIndex: 1,
          explanation: "Payment history represents 35% of your total credit rating score."
        }
      },
      {
        id: "c2-l2",
        moduleTag: "Lesson 2.2",
        title: "Avalanche vs. Snowball Strategy",
        content: `
          <p>Two proven frameworks exist to eliminate multiple consumer balances systematically:</p>
          <ul>
            <li><strong>1. Debt Avalanche (Mathematical):</strong> Pay minimums across all cards, funneling surplus funds toward the debt carrying the highest APR. This minimizes total interest paid.</li>
            <li><strong>2. Debt Snowball (Psychological):</strong> Pay minimums on all cards, funneling surplus money to the lowest dollar balance regardless of APR to build rapid psychological momentum.</li>
          </ul>
        `,
        takeaway: "Select Avalanche to reduce total interest expense; select Snowball if you need quick behavioral milestones.",
        quiz: {
          question: "Under the Debt Avalanche strategy, which balance receives priority payments?",
          options: ["The debt with the lowest overall dollar balance", "The debt with the highest interest rate (APR)", "The newest account opened"],
          correctIndex: 1,
          explanation: "The Avalanche method prioritizes the highest interest rate first to minimize total paid interest."
        }
      },
      {
        id: "c2-l3",
        moduleTag: "Lesson 2.3",
        title: "Mastering Single-Digit Utilization",
        content: `
          <p>Credit utilization measures: <code>(Total Outstanding Balances ÷ Total Credit Limits) × 100</code>.</p>
          <p>While generic advice suggests keeping utilization under 30%, top-tier credit profiles consistently maintain utilization <strong>under 10%</strong>. To optimize this, pay off your card before the statement closing date, not just on the due date.</p>
        `,
        takeaway: "Pay down balances prior to statement generation to show single-digit utilization to bureaus.",
        quiz: {
          question: "On a credit card with a $5,000 limit, what maximum balance stays under the 10% utilization threshold?",
          options: ["$2,000", "$1,000", "$500"],
          correctIndex: 2,
          explanation: "10% of a $5,000 limit is $500. Maintaining your balance under $500 keeps utilization below 10%."
        }
      },
      {
        id: "c2-l4",
        moduleTag: "Lesson 2.4",
        title: "Productive Leverage vs. Toxic Debt",
        content: `
          <p>Not all borrowing is equally risky. Understanding the difference prevents costly traps:</p>
          <p><strong>Toxic Debt:</strong> High-interest unsecured debt (>10% APR) on depreciating items (e.g., credit cards, payday loans, financed consumables).</p>
          <p><strong>Strategic Debt:</strong> Low-interest manageable borrowing (<5% APR) tied to productive capital or appreciating assets (e.g., well-structured mortgages, ROI-generating education).</p>
        `,
        takeaway: "Avoid revolving monthly balances on cards charging 20%+ interest.",
        quiz: {
          question: "Which of the following is an example of toxic debt?",
          options: ["A fixed 3.5% mortgage on a primary home", "A 24% APR revolving credit card balance", "A zero-interest career training grant"],
          correctIndex: 1,
          explanation: "High revolving interest rates drain cash flow rapidly on depreciating expenditures."
        }
      }
    ]
  },
  {
    id: "c3",
    title: "The Wealth Accelerator",
    subtitle: "Compound Interest, Index Funds & Long-Term Portfolio Growth",
    description: "Harness compound interest over long horizons, invest through low-fee index funds, and use dollar-cost averaging.",
    lessons: [
      {
        id: "c3-l1",
        moduleTag: "Lesson 3.1",
        title: "The Power of Compounding",
        content: `
          <p>Compound interest is interest earned on previous interest. In early years growth seems gradual, but across decades growth accelerates dramatically.</p>
          <p>The <strong>Rule of 72</strong> estimates how many years an investment takes to double: divide 72 by the annual return rate. At an 8% expected market return, your money doubles approximately every 9 years (72 ÷ 8 = 9).</p>
        `,
        takeaway: "Time in the market is vastly more powerful than timing the market due to late-stage compounding.",
        quiz: {
          question: "According to the Rule of 72, how many years does an investment take to double at a 9% return?",
          options: ["8 Years", "12 Years", "16 Years"],
          correctIndex: 0,
          explanation: "72 divided by 9 equals 8 years to double."
        }
      },
      {
        id: "c3-l2",
        moduleTag: "Lesson 3.2",
        title: "Why Low-Cost Index Funds Win",
        content: `
          <p>Historical research shows over 85% of active mutual fund managers underperform the standard broad S&P 500 index over 15-year windows.</p>
          <p>An <strong>index fund</strong> holds hundreds of leading companies with very low expense ratios (<0.05%). Rather than trying to pick a single winning stock, you own a diversified cross-section of the entire growing economy.</p>
        `,
        takeaway: "Choose broad, low-cost index funds to reduce fees and avoid single-company risk.",
        quiz: {
          question: "What is an index fund?",
          options: ["A speculative single cryptocurrency token", "A basket of securities mirroring a whole market benchmark", "A fixed-interest paper savings bond"],
          correctIndex: 1,
          explanation: "An index fund pools many companies together to match the returns of an entire market benchmark."
        }
      },
      {
        id: "c3-l3",
        moduleTag: "Lesson 3.3",
        title: "Dollar-Cost Averaging (DCA)",
        content: `
          <p>Trying to predict short-term stock market highs and lows often results in hesitation and missed growth opportunities.</p>
          <p><strong>Dollar-Cost Averaging (DCA)</strong> means investing a consistent amount (like $250 every month) regardless of whether stock prices are up or down. When prices decline, your fixed deposit naturally buys more shares at lower prices.</p>
        `,
        takeaway: "Invest a steady dollar amount on the same day every month to remove emotional guesswork.",
        quiz: {
          question: "What does Dollar-Cost Averaging accomplish during market dips?",
          options: ["It forces an automatic liquidation of assets", "It naturally buys more shares at discounted prices", "It increases transaction fees"],
          correctIndex: 1,
          explanation: "A fixed dollar contribution purchases a higher number of shares whenever market prices dip."
        }
      },
      {
        id: "c3-l4",
        moduleTag: "Lesson 3.4",
        title: "Asset Allocation & Tax Advantage",
        content: `
          <p>Maximizing long-term net wealth involves choosing the right accounts to reduce unnecessary tax drag.</p>
          <p>A sound sequence for investing surplus savings:</p>
          <ul>
            <li>1. Capture any employer retirement match (an instant 100% return on invested funds).</li>
            <li>2. Contribute to tax-advantaged accounts like an IRA or Roth IRA for tax-sheltered growth.</li>
            <li>3. Invest any remaining surplus in low-cost index funds within a taxable brokerage account.</li>
          </ul>
        `,
        takeaway: "Always capture an employer retirement match first—it is guaranteed compensation.",
        quiz: {
          question: "Why should you capture your full employer 401(k) match before other investments?",
          options: ["It provides an immediate 100% return on your contributed money", "It is legally mandatory for employees", "It pays out weekly dividends in cash"],
          correctIndex: 0,
          explanation: "Employer matching contributions represent direct matching money that doubles your initial input."
        }
      }
    ]
  }
];

/* ==========================================================================
   STREAMING_CHUNK:Defining Glossary Terminology Dictionary
   ========================================================================== */
const GLOSSARY_DATA = [
  { term: "APR (Annual Percentage Rate)", def: "The annual rate of interest charged on loans or earned on investments, including applicable fees." },
  { term: "Compound Interest", def: "Interest calculated on the starting principal along with all accumulated interest from prior periods." },
  { term: "Index Fund", def: "A mutual fund or ETF designed to track the overall performance of a specific financial market benchmark." },
  { term: "50/30/20 Rule", def: "A practical budget framework dividing net income into 50% Needs, 30% Wants, and 20% Savings." },
  { term: "Credit Utilization", def: "The percentage of available revolving credit lines currently in use across all credit cards." },
  { term: "Dollar-Cost Averaging (DCA)", def: "Investing consistent dollar sums at fixed intervals regardless of market ups and downs." },
  { term: "Rule of 72", def: "A simple formula: divide 72 by the expected annual rate of return to estimate years needed to double capital." },
  { term: "Emergency Fund", def: "A liquid cash reserve stored in an easily accessible account to weather sudden unexpected expenses." },
  { term: "Debt Avalanche", def: "A debt payoff approach that directs extra payments toward the highest interest APR balance first." }
];