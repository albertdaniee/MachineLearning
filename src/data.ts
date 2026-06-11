/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Dataset, Course } from "./types";

export const CURATED_DATASETS: Dataset[] = [
  {
    id: "toronto-housing",
    name: "Toronto Housing Prices Analytics",
    description: "Real-estate records detailing home sizes (sq. ft.) versus sales prices ($1,000s) across Greater Toronto Area.",
    headers: ["Home ID", "Size (sq. ft.)", "Bedrooms", "Age (years)", "Price ($k)"],
    rows: [
      { id: 1, size: 850, bedrooms: 1, age: 2, price: 420 },
      { id: 2, size: 1100, bedrooms: 2, age: 12, price: 580 },
      { id: 3, size: 1450, bedrooms: 3, age: 8, price: 810 },
      { id: 4, size: 1800, bedrooms: 3, age: 25, price: 920 },
      { id: 5, size: 2100, bedrooms: 4, age: 6, price: 1210 },
      { id: 6, size: 2500, bedrooms: 4, age: 14, price: 1480 },
      { id: 7, size: 2800, bedrooms: 5, age: 1, price: 1950 },
      { id: 8, size: 950, bedrooms: 1, age: 19, price: 410 },
      { id: 9, size: 1250, bedrooms: 2, age: 5, price: 670 },
      { id: 10, size: 1600, bedrooms: 3, age: 15, price: 790 },
      { id: 11, size: 2000, bedrooms: 4, age: 10, price: 1100 },
      { id: 12, size: 2350, bedrooms: 4, age: 4, price: 1390 },
      { id: 13, size: 2700, bedrooms: 5, age: 22, price: 1510 },
      { id: 14, size: 3100, bedrooms: 5, age: 3, price: 2150 },
      { id: 15, size: 700, bedrooms: 1, age: 1, price: 395 },
    ],
    targetColumn: "price",
    numericalColumns: ["size", "bedrooms", "age", "price"],
    categoricalColumns: [],
  },
  {
    id: "iris-flowers",
    name: "Iris Flower Petal Distribution",
    description: "Classic dataset tracing sepal (X) and petal (Y) dimensions to discover underlying sub-species clusters.",
    headers: ["Petal Length (cm)", "Petal Width (cm)", "Species"],
    rows: [
      // Setosa cluster roughly centered around (1.5, 0.3)
      { petalLength: 1.4, petalWidth: 0.2, species: "Setosa" },
      { petalLength: 1.5, petalWidth: 0.2, species: "Setosa" },
      { petalLength: 1.3, petalWidth: 0.3, species: "Setosa" },
      { petalLength: 1.6, petalWidth: 0.4, species: "Setosa" },
      { petalLength: 1.7, petalWidth: 0.3, species: "Setosa" },
      // Versicolor cluster roughly centered around (4.2, 1.3)
      { petalLength: 4.7, petalWidth: 1.4, species: "Versicolor" },
      { petalLength: 4.5, petalWidth: 1.5, species: "Versicolor" },
      { petalLength: 4.9, petalWidth: 1.5, species: "Versicolor" },
      { petalLength: 4.0, petalWidth: 1.3, species: "Versicolor" },
      { petalLength: 4.6, petalWidth: 1.3, species: "Versicolor" },
      // Virginica cluster roughly centered around (5.6, 2.0)
      { petalLength: 6.0, petalWidth: 2.5, species: "Virginica" },
      { petalLength: 5.1, petalWidth: 1.9, species: "Virginica" },
      { petalLength: 5.9, petalWidth: 2.1, species: "Virginica" },
      { petalLength: 5.6, petalWidth: 1.8, species: "Virginica" },
      { petalLength: 5.8, petalWidth: 2.2, species: "Virginica" },
    ],
    targetColumn: "species",
    numericalColumns: ["petalLength", "petalWidth"],
    categoricalColumns: ["species"],
  },
  {
    id: "student-performance",
    name: "Student Exam Outcomes",
    description: "Correlating study time and attendance with test performance (Pass vs Fail) - perfect for studying split boundaries.",
    headers: ["Study Hours/Wk", "Attendance (%)", "Exam Score", "Outcome"],
    rows: [
      { hours: 2, attendance: 65, score: 42, outcome: "Fail" },
      { hours: 4, attendance: 75, score: 55, outcome: "Fail" },
      { hours: 5, attendance: 80, score: 59, outcome: "Fail" },
      { hours: 8, attendance: 85, score: 72, outcome: "Pass" },
      { hours: 12, attendance: 90, score: 88, outcome: "Pass" },
      { hours: 15, attendance: 95, score: 96, outcome: "Pass" },
      { hours: 3, attendance: 70, score: 48, outcome: "Fail" },
      { hours: 6, attendance: 88, score: 68, outcome: "Pass" },
      { hours: 9, attendance: 82, score: 75, outcome: "Pass" },
      { hours: 11, attendance: 92, score: 85, outcome: "Pass" },
      { hours: 1, attendance: 60, score: 35, outcome: "Fail" },
      { hours: 14, attendance: 98, score: 95, outcome: "Pass" },
    ],
    targetColumn: "outcome",
    numericalColumns: ["hours", "attendance", "score"],
    categoricalColumns: ["outcome"],
  }
];

export const COURSES: Course[] = [
  {
    id: "python-ds",
    title: "Python Foundations for Enterprise Data Science",
    topic: "python",
    duration: "4 Weeks (12 Hours)",
    level: "Beginner",
    description: "Learn to manipulate, analyze, and inspect raw data with professional clean execution inside Jupyter Lab.",
    curriculum: [
      "Introduction to Python Syntax & Data Structures",
      "Vectorized Operations with NumPy",
      "Robust Wrangling: Pandas Series, DataFrames & Indexing",
      "Cleaning messy data (null tracking, logical filtering)",
      "Interactive Plotting with Matplotlib & Seaborn"
    ],
    iconName: "FileCode"
  },
  {
    id: "sql-mastery",
    title: "SQL & Relational Analytics for Analytics Engineers",
    topic: "sql",
    duration: "4 Weeks (12 Hours)",
    level: "Beginner",
    description: "Master modern SQL queries, complex analytical tasks, aggregations, and window functions.",
    curriculum: [
      "SQL Fundamentals, Filter Syntax, Joins architecture",
      "Aggregation formulas (GROUP BY, HAVING constraints)",
      "Advanced Window Functions (RANK, ROW_NUMBER, LAG, LEAD)",
      "Common Table Expressions (CTEs) & Subqueries",
      "Query profiling, indexing logic, and database design"
    ],
    iconName: "Database"
  },
  {
    id: "machine-learning-pragmatic",
    title: "Applied Machine Learning & Scikit-Learn Systems",
    topic: "ml",
    duration: "6 Weeks (18 Hours)",
    level: "Intermediate",
    description: "Demystify standard machine learning models, cost functions, training pipelines, and deployment metrics.",
    curriculum: [
      "Linear & Logistic Regression cost math",
      "Regularization mathematics (L1 Lasso, L2 Ridge)",
      "Decision Trees & Random Forest Ensemble ensembles",
      "Hyperparameter tuning (GridSearchCV, RandomizedSearchCV)",
      "Evaluation metrics: Precision, Recall, ROC-AUC, Confusion Matrix"
    ],
    iconName: "Cpu"
  },
  {
    id: "deep-learning-adv",
    title: "Neural Networks & Generative AI Implementations",
    topic: "deep-learning",
    duration: "8 Weeks (24 Hours)",
    level: "Advanced",
    description: "Deep dive into model architectures, PyTorch pipelines, backpropagation, and customizing Google Gemini LLM API systems.",
    curriculum: [
      "Perceptron networks, activation formulas, backpropagation",
      "Building convolutional filters (CNNs) with PyTorch",
      "Sequence networks & Transformers foundation",
      "Fine-tuning large language models (LLMs) & prompt design",
      "Retrieval Augmented Generation (RAG) system building"
    ],
    iconName: "BrainCircuit"
  },
  {
    id: "statistics-found",
    title: "Statistical Inference & Experimental Design",
    topic: "statistics",
    duration: "4 Weeks (12 Hours)",
    level: "Intermediate",
    description: "Stop guessing. Back your actions with sound mathematical modeling, probability distributions, and A/B test analysis.",
    curriculum: [
      "Probability foundations & Bayes Theorem applications",
      "Standard Distributions (Normal, Binomial, Poisson, t-dist)",
      "Central Limit Theorem and confidence margins",
      "Hypothesis Testing (Z-tests, t-tests, ANOVA models)",
      "A/B Testing experimental controls & sample size calculations"
    ],
    iconName: "Binary"
  }
];

export const CHEATSHEETS = [
  {
    title: "Pandas Wrangling core syntax",
    category: "Python",
    commands: [
      { code: "import pandas as pd", desc: "Import the pandas library conventionally." },
      { code: "df = pd.read_csv('dataset.csv')", desc: "Read CSV data into a clean DataFrame structure." },
      { code: "df.dropna(subset=['target'])", desc: "Drop rows where vital target values are null" },
      { code: "df.groupby('category').mean()", desc: "Synthesize grouping aggregates efficiently" },
      { code: "df['score_pct'] = df['score'].apply(lambda x: x*100)", desc: "Apply specialized custom scaling across records" }
    ]
  },
  {
    title: "SQL Window Functions Reference",
    category: "SQL",
    commands: [
      { code: "ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC)", desc: "Generates consecutive ranks within departments." },
      { code: "LAG(sales, 1) OVER (ORDER BY sales_date)", desc: "Retrieve sales numbers from previous time record" },
      { code: "AVG(revenue) OVER (PARTITION BY region ROWS BETWEEN 3 PRECEDING AND CURRENT ROOM)", desc: "Create smooth rolling averages across rows" },
      { code: "COALESCE(bonus, 0)", desc: "Substitute NULL records with fallback numbers safely" }
    ]
  },
  {
    title: "Scikit-Learn Model building",
    category: "Machine Learning",
    commands: [
      { code: "from sklearn.model_selection import train_test_split", desc: "Divide inputs into Train/Validate ratios" },
      { code: "model = RandomForestClassifier(n_estimators=100, max_depth=5)", desc: "Instantiate ensemble model" },
      { code: "model.fit(X_train, y_train)", desc: "Execute gradient/analytical optimization fits" },
      { code: "predictions = model.predict(X_test)", desc: "Run inference on unseen datasets" },
      { code: "from sklearn.metrics import classification_report", desc: "Retrieve analytical accuracy metrics" }
    ]
  }
];
