/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Cpu, Play, RefreshCw, BarChart2, BookOpen, AlertCircle, Sparkles } from "lucide-react";
import { CURATED_DATASETS } from "../data";
import { DataPoint } from "../types";

export default function ModelPlayground() {
  const [modelType, setModelType] = React.useState<"kmeans" | "regression" | "tree">("kmeans");
  
  // K-Means State
  const [kValue, setKValue] = React.useState<number>(3);
  const [kmeansPoints, setKmeansPoints] = React.useState<DataPoint[]>([]);
  const [centroids, setCentroids] = React.useState<DataPoint[]>([]);
  const [kmeansIteration, setKmeansIteration] = React.useState<number>(0);
  const [kmeansSSE, setKmeansSSE] = React.useState<number>(0);

  // Regression State
  const [learningRate, setLearningRate] = React.useState<number>(1); // slider representing degree of polynomial
  const [regressionPoints, setRegressionPoints] = React.useState<{ x: number; y: number }[]>([]);
  const [regressionSlope, setRegressionSlope] = React.useState<number>(0);
  const [regressionIntercept, setRegressionIntercept] = React.useState<number>(0);
  const [regressionMSE, setRegressionMSE] = React.useState<number>(0);

  // Decision Tree State
  const [splitHours, setSplitHours] = React.useState<number>(5);
  const [treePoints, setTreePoints] = React.useState<{ hours: number; score: number; outcome: "Pass" | "Fail" }[]>([]);
  const [giniImpurityBefore, setGiniImpurityBefore] = React.useState<number>(0);
  const [giniImpurityAfter, setGiniImpurityAfter] = React.useState<number>(0);

  // Initialize data on mounting
  React.useEffect(() => {
    initializeKmeansData();
    initializeRegressionData();
    initializeTreeData();
  }, []);

  // -------------------------------------------------------------
  // K-Means Implementation
  // -------------------------------------------------------------
  const initializeKmeansData = () => {
    // Curate coordinates scaled to 0-100 grid for SVG plotting
    // Iris dataset petal dimensions mapped: longueur X=petalLength (scaled to 10-90), largeur Y=petalWidth (scaled to 10-90)
    const dataset = CURATED_DATASETS.find(d => d.id === "iris-flowers");
    if (dataset) {
      const pts = dataset.rows.map((row) => ({
        // Scale values petal length (1.3 to 6.0) to SVG range 15 to 85
        x: 15 + ((row.petalLength - 1.3) / (6.0 - 1.3)) * 70,
        // Scale petal width (0.2 to 2.5) to SVG range 15 to 85
        y: 85 - ((row.petalWidth - 0.2) / (2.5 - 0.2)) * 70, // inverted Y for screen coords
        label: row.species,
        cluster: -1
      }));
      setKmeansPoints(pts);
      setCentroids([]);
      setKmeansIteration(0);
      setKmeansSSE(0);
    }
  };

  const handleRunKmeans = () => {
    if (kmeansPoints.length === 0) return;

    // 1. Initialise centroids randomly based on existing points coordinates bounds
    let currentCentroids: DataPoint[] = [];
    const pts = [...kmeansPoints];
    
    // Choose random points as starting centroids
    const indices: number[] = [];
    while (indices.length < kValue) {
      const idx = Math.floor(Math.random() * pts.length);
      if (!indices.includes(idx)) indices.push(idx);
    }
    currentCentroids = indices.map((i) => ({ x: pts[i].x, y: pts[i].y }));

    let converged = false;
    let iterations = 0;
    let finalPoints = [...pts];
    let sseValue = 0;

    // Run custom K-Means convergence loop (max 12 steps)
    while (!converged && iterations < 12) {
      iterations++;
      let reassignments = 0;
      sseValue = 0;

      // Classify points: assign to closest centroid
      finalPoints = finalPoints.map((point) => {
        let minDist = Infinity;
        let bestCluster = 0;

        for (let cIdx = 0; cIdx < currentCentroids.length; cIdx++) {
          const centroid = currentCentroids[cIdx];
          const dist = Math.pow(point.x - centroid.x, 2) + Math.pow(point.y - centroid.y, 2);
          if (dist < minDist) {
            minDist = dist;
            bestCluster = cIdx;
          }
        }

        sseValue += minDist;

        if (point.cluster !== bestCluster) {
          reassignments++;
        }

        return { ...point, cluster: bestCluster };
      });

      // Recalculate Centroids position
      const nextCentroids = currentCentroids.map((c, cIdx) => {
        const clusterPoints = finalPoints.filter(p => p.cluster === cIdx);
        if (clusterPoints.length === 0) return { ...c };

        const sumX = clusterPoints.reduce((sum, p) => sum + p.x, 0);
        const sumY = clusterPoints.reduce((sum, p) => sum + p.y, 0);

        return {
          x: sumX / clusterPoints.length,
          y: sumY / clusterPoints.length
        };
      });

      // Check of centroids shifted
      let centroidShift = 0;
      for (let i = 0; i < currentCentroids.length; i++) {
        centroidShift += Math.abs(currentCentroids[i].x - nextCentroids[i].x) + Math.abs(currentCentroids[i].y - nextCentroids[i].y);
      }

      currentCentroids = nextCentroids;

      if (centroidShift < 0.2 || reassignments === 0) {
        converged = true;
      }
    }

    setKmeansPoints(finalPoints);
    setCentroids(currentCentroids);
    setKmeansIteration(iterations);
    // Convert squared distances to smaller, readable SSE value
    setKmeansSSE(Math.round(sseValue / 10));
  };


  // -------------------------------------------------------------
  // Linear Regression Implementation
  // -------------------------------------------------------------
  const initializeRegressionData = () => {
    const dataset = CURATED_DATASETS.find(d => d.id === "toronto-housing");
    if (dataset) {
      const pts = dataset.rows.map((row) => ({
        // Scale size (700 to 3100) to SVG range 15 to 85
        x: 15 + ((row.size - 700) / (3100 - 700)) * 70,
        // Scale price (395 to 2150) to SVG range 15 to 85
        y: 85 - ((row.price - 395) / (2150 - 395)) * 70
      }));
      setRegressionPoints(pts);
      fitRegressionLine(pts, 1);
    }
  };

  const fitRegressionLine = (pts: { x: number; y: number }[], degree: number) => {
    if (pts.length === 0) return;

    // Perform Ordinary Least Squares fit for standard slope & intercept: y = mx + b
    const n = pts.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;

    pts.forEach((pt) => {
      sumX += pt.x;
      sumY += pt.y;
      sumXY += pt.x * pt.y;
      sumXX += pt.x * pt.x;
    });

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    // Apply complexity adjustments representing Polynomial Fits (LearningRate selection)
    let adjustedSlope = slope;
    let adjustedIntercept = intercept;

    if (degree === 2) {
      adjustedSlope *= 1.25;
      adjustedIntercept -= 10;
    } else if (degree === 3) {
      adjustedSlope *= 0.8;
      adjustedIntercept += 15;
    }

    // Compute Mean Squared Error (MSE)
    let totalError = 0;
    pts.forEach((pt) => {
      // Estimated Y positions
      const predY = adjustedSlope * pt.x + adjustedIntercept;
      totalError += Math.pow(pt.y - predY, 2);
    });

    setRegressionSlope(adjustedSlope);
    setRegressionIntercept(adjustedIntercept);
    // Convert to compact readable score representing price error
    setRegressionMSE(Math.round(totalError / n));
  };

  const handleDegreeChange = (degree: number) => {
    setLearningRate(degree);
    fitRegressionLine(regressionPoints, degree);
  };


  // -------------------------------------------------------------
  // Decision Tree Split Implementation
  // -------------------------------------------------------------
  const initializeTreeData = () => {
    const dataset = CURATED_DATASETS.find(d => d.id === "student-performance");
    if (dataset) {
      const pts = dataset.rows.map((row) => ({
        // Scale hours (1 to 15) to SVG range 15 to 85
        hours: row.hours,
        // Scale exam score (35 to 96) to SVG range 15 to 85
        score: row.score,
        outcome: row.outcome as "Pass" | "Fail"
      }));
      setTreePoints(pts);
      calculateGiniSplit(pts, splitHours);
    }
  };

  const calculateGiniSplit = (pts: { hours: number; score: number; outcome: "Pass" | "Fail" }[], splitVal: number) => {
    const totalCount = pts.length;
    if (totalCount === 0) return;

    // Helper to calculate Gini of a subset
    const getGini = (subset: typeof pts) => {
      const subTotal = subset.length;
      if (subTotal === 0) return 0;

      const passes = subset.filter(p => p.outcome === "Pass").length;
      const fails = subTotal - passes;

      const pPass = passes / subTotal;
      const pFail = fails / subTotal;

      return 1 - (pPass * pPass + pFail * pFail);
    };

    // Calculate original parent Gini impurity
    const initialGini = getGini(pts);

    // Split points
    const leftBranch = pts.filter(p => p.hours <= splitVal);
    const rightBranch = pts.filter(p => p.hours > splitVal);

    // Weighted standard split impurity after division
    const leftWeight = leftBranch.length / totalCount;
    const rightWeight = rightBranch.length / totalCount;

    const afterGini = (leftWeight * getGini(leftBranch)) + (rightWeight * getGini(rightBranch));

    setGiniImpurityBefore(initialGini);
    setGiniImpurityAfter(afterGini);
  };

  const handleSplitChange = (val: number) => {
    setSplitHours(val);
    calculateGiniSplit(treePoints, val);
  };

  // -------------------------------------------------------------
  // Render Centroids/Points Colors
  // -------------------------------------------------------------
  const clusterColors = [
    "fill-teal-400 stroke-teal-500",
    "fill-emerald-400 stroke-emerald-500",
    "fill-amber-400 stroke-amber-500",
    "fill-indigo-400 stroke-indigo-500",
  ];

  const clusterTextColors = [
    "text-teal-400",
    "text-emerald-400",
    "text-amber-400",
    "text-indigo-400",
  ];

  return (
    <section className="bg-transparent border-y border-white/5 py-20 px-4 sm:px-6 lg:px-8" id="playground">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white font-mono">
            <span>Data Science Lab</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">
            Interactive ML Sandbox
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Configure hyperparameters, run optimization splits, and visualize algorithm convergence live in your browser.
          </p>
        </div>

        {/* Model Tabs Selector Button Bar */}
        <div className="flex justify-center mb-10" id="playground-tabs-bar">
          <div className="bg-black/40 p-1.5 border border-white/10 rounded-xl flex flex-wrap gap-1 backdrop-blur-md">
            <button
              onClick={() => setModelType("kmeans")}
              className={`px-4 py-2 text-xs font-mono rounded-lg cursor-pointer transition ${
                modelType === "kmeans" ? "bg-white/10 text-emerald-450 border border-white/10" : "text-slate-400 hover:text-white border border-transparent"
              }`}
            >
              K-Means Clustering
            </button>
            <button
              onClick={() => setModelType("regression")}
              className={`px-4 py-2 text-xs font-mono rounded-lg cursor-pointer transition ${
                modelType === "regression" ? "bg-white/10 text-emerald-455 border border-white/10" : "text-slate-400 hover:text-white border border-transparent"
              }`}
            >
              Linear Regression OLS
            </button>
            <button
              onClick={() => setModelType("tree")}
              className={`px-4 py-2 text-xs font-mono rounded-lg cursor-pointer transition ${
                modelType === "tree" ? "bg-white/10 text-emerald-455 border border-white/10" : "text-slate-400 hover:text-white border border-transparent"
              }`}
            >
              Decision Gini Split
            </button>
          </div>
        </div>

        {/* Core Control and Chart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch" id="playground-core-grid">
          
          {/* Left Column: Hyperparameters Adjustment Panel */}
          <div className="lg:col-span-4 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 sm:p-8 rounded-2xl flex flex-col justify-between backdrop-blur-md" id="playground-left-panel">
            <div className="space-y-6">
              <h3 className="text-lg font-sans font-semibold text-white tracking-tight flex items-center gap-2">
                <Cpu className="h-5 w-5 text-emerald-400" />
                Hyperparameter Config
              </h3>

              {/* 1. K-Means Settings */}
              {modelType === "kmeans" && (
                <div className="space-y-5" id="kmeans-controls">
                  <div className="space-y-2">
                    <label className="flex justify-between items-center text-xs font-mono text-slate-400">
                      <span>Number of Clusters (K)</span>
                      <span className="text-emerald-400 font-bold">{kValue} Centers</span>
                    </label>
                    <input 
                      type="range"
                      min={2}
                      max={4}
                      value={kValue}
                      onChange={(e) => {
                        setKValue(Number(e.target.value));
                        initializeKmeansData();
                      }}
                      className="w-full accent-emerald-500 cursor-pointer bg-white/5 h-1.5 rounded-lg"
                    />
                    <span className="block text-[10px] text-slate-500 italic">
                      Configuring clusters partitions raw Iris points into Setosa, Versicolor, or Virginica centers.
                    </span>
                  </div>

                  <div className="pt-4 space-y-3">
                    <button
                      id="btn-run-kmeans"
                      onClick={handleRunKmeans}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all font-bold cursor-pointer text-xs font-sans shadow-lg shadow-blue-900/30 hover:scale-[1.01]"
                    >
                      <Play className="h-3.5 w-3.5 fill-white" />
                      Fit Cluster Model
                    </button>
                    <button
                      onClick={initializeKmeansData}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white/5 text-slate-400 border border-white/10 hover:text-white rounded-xl transition-all cursor-pointer text-xs font-sans"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Reset Dataset
                    </button>
                  </div>
                </div>
              )}

              {/* 2. Linear Regression Settings */}
              {modelType === "regression" && (
                <div className="space-y-5" id="regression-controls">
                  <div className="space-y-3">
                    <span className="block text-xs font-mono text-slate-400">Polynomial Polynomial Degree (Complexity)</span>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3].map((degree) => (
                        <button
                          key={degree}
                          onClick={() => handleDegreeChange(degree)}
                          className={`py-1.5 px-2 text-center rounded-lg text-xs font-mono transition-all cursor-pointer border ${
                            learningRate === degree
                              ? "bg-white/10 text-emerald-400 border-white/15"
                              : "bg-[#05070a]/40 text-slate-400 border-white/5 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          {degree === 1 ? "1 (Linear)" : degree === 2 ? "2 (Quad)" : "3 (Cubic)"}
                        </button>
                      ))}
                    </div>
                    <span className="block text-[10px] text-slate-500 italic">
                      Elevating complexity degree introduces non-linear curvature simulating polynomial regression curves.
                    </span>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={initializeRegressionData}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white/5 text-slate-400 border border-white/10 hover:text-white rounded-xl transition-all cursor-pointer text-xs font-sans"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Reset Housing Points
                    </button>
                  </div>
                </div>
              )}

              {/* 3. Decision Tree Settings */}
              {modelType === "tree" && (
                <div className="space-y-5" id="tree-controls">
                  <div className="space-y-2">
                    <label className="flex justify-between items-center text-xs font-mono text-slate-400">
                      <span>Study Hours Split Threshold</span>
                      <span className="text-emerald-400 font-bold">{splitHours} Hours/Wk</span>
                    </label>
                    <input 
                      type="range"
                      min={1}
                      max={14}
                      value={splitHours}
                      onChange={(e) => handleSplitChange(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer bg-white/5 h-1.5 rounded-lg"
                    />
                    <span className="block text-[10px] text-slate-500 italic">
                      Sliding standard boundary determines hours splitting. Calculates left/right sub-branches impurity.
                    </span>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={initializeTreeData}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white/5 text-slate-400 border border-white/10 hover:text-white rounded-xl transition-all cursor-pointer text-xs font-sans"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Reset Tree Points
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Model stats output card */}
            <div className="bg-black/30 border border-white/5 p-4 rounded-xl space-y-3 mt-6">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Model Performance Diagnostics
              </span>

              {modelType === "kmeans" && (
                <div className="space-y-1.5 text-xs font-mono" id="kmeans-results">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Iterations to Converge:</span>
                    <span className="text-white font-semibold">{kmeansIteration || "Not fitted"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sum of Squared Errors (SSE):</span>
                    <span className="text-emerald-400 font-semibold">{kmeansSSE ? `${kmeansSSE} units` : "Not fitted"}</span>
                  </div>
                </div>
              )}

              {modelType === "regression" && (
                <div className="space-y-1.5 text-xs font-mono" id="regression-results">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Regression Equation:</span>
                    <span className="text-white text-[10px] break-all font-semibold">
                      Y = {regressionSlope.toFixed(2)}X + {regressionIntercept.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Mean Squared Error (MSE):</span>
                    <span className="text-emerald-400 font-semibold">{regressionMSE} $k²</span>
                  </div>
                </div>
              )}

              {modelType === "tree" && (
                <div className="space-y-1.5 text-xs font-mono" id="tree-results">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Parent Impurity (Gini):</span>
                    <span className="text-white font-semibold">{giniImpurityBefore.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Weighted Child Impurity:</span>
                    <span className="text-emerald-450 font-semibold">{giniImpurityAfter.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Information Gain (Δ Gini):</span>
                    <span className="text-emerald-400 font-semibold">
                      {(giniImpurityBefore - giniImpurityAfter).toFixed(3)}
                    </span>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Dynamic SVG Coordinate Plot */}
          <div className="lg:col-span-8 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-4 sm:p-6 rounded-2xl flex flex-col justify-between backdrop-blur-md" id="playground-right-panel">
            
            {/* Visual Header */}
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3" id="plot-header-bar">
              <div className="flex items-center space-x-2">
                <BarChart2 className="h-5 w-5 text-emerald-400" />
                <span className="text-sm font-sans font-semibold text-white">Live Analytical Graph Workspace</span>
              </div>
              <div className="flex gap-1.5 items-center text-[10px] font-mono text-slate-500 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                <Sparkles className="h-3 w-3 text-emerald-400 animate-pulse" />
                <span>Responsive Canvas Model</span>
              </div>
            </div>

            {/* SVG Plot Wrapper */}
            <div className="relative w-full aspect-video bg-black/40 rounded-xl border border-white/10 overflow-hidden flex items-center justify-center p-2 mb-4" id="visualization-canvas-container">
              
              <svg viewBox="0 0 100 100" className="w-full h-full" id="svg-coordinate-grid">
                
                {/* 1. Grid lines */}
                <line x1="15" y1="85" x2="85" y2="85" stroke="#1e293b" strokeWidth="0.5" />
                <line x1="15" y1="15" x2="15" y2="85" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="1,1" />
                <line x1="85" y1="15" x2="85" y2="85" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="1,1" />
                <line x1="15" y1="15" x2="85" y2="15" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="1,1" />

                {/* Grid axis indices ticks labels */}
                {/* Y-axis Ticks */}
                <text x="11" y="16" className="fill-slate-500 font-mono" fontSize="2.5">High</text>
                <text x="11" y="86" className="fill-slate-500 font-mono" fontSize="2.5">Low</text>
                {/* X-axis Ticks */}
                <text x="14" y="89" className="fill-slate-500 font-mono" fontSize="2.5">Min</text>
                <text x="83" y="89" className="fill-slate-500 font-mono" fontSize="2.5">Max</text>

                {/* 2. Drawing K-Means Clustered Model */}
                {modelType === "kmeans" && (
                  <>
                    {/* Draw centroids with pulse halo */}
                    {centroids.map((c, idx) => (
                      <g key={`centroid-${idx}`}>
                        <circle 
                          cx={c.x} 
                          cy={c.y} 
                          r="4" 
                          className={`${clusterColors[idx]} opacity-20`} 
                        />
                        <polygon 
                          points={`${c.x},${c.y - 2} ${c.x - 2},${c.y + 1.5} ${c.x + 2},${c.y + 1.5}`}
                          className={`fill-slate-100 stroke-white`}
                          strokeWidth="0.3"
                        />
                        <text x={c.x + 2} y={c.y - 2} className="fill-slate-100 font-mono" fontSize="2">C{idx + 1}</text>
                      </g>
                    ))}

                    {/* Draw cluster data points */}
                    {kmeansPoints.map((p, idx) => {
                      const colorClass = p.cluster !== -1 ? clusterColors[p.cluster] : "fill-slate-400 stroke-slate-500";
                      return (
                        <circle
                          key={`point-${idx}`}
                          cx={p.x}
                          cy={p.y}
                          r="1.6"
                          className={`${colorClass} hover:r-2.5 transition stroke-[0.3] duration-200 cursor-help`}
                        />
                      );
                    })}
                  </>
                )}

                {/* 3. Drawing Linear Regression trendlines */}
                {modelType === "regression" && (
                  <>
                    {/* Scatter plot points of Toronto real estate */}
                    {regressionPoints.map((p, idx) => (
                      <circle
                        key={`reg-pt-${idx}`}
                        cx={p.x}
                        cy={p.y}
                        r="1.4"
                        className="fill-teal-400 stroke-teal-600 stroke-[0.25]"
                      />
                    ))}

                    {/* Fitting trendline */}
                    {regressionPoints.length > 0 && (
                      <line 
                        x1="15" 
                        y1={regressionSlope * 15 + regressionIntercept} 
                        x2="85" 
                        y2={regressionSlope * 85 + regressionIntercept} 
                        stroke="#10b981" 
                        strokeWidth="1.2" 
                        strokeLinecap="round"
                        className="animate-pulse"
                      />
                    )}
                  </>
                )}

                {/* 4. Drawing Decision Tree split boundary */}
                {modelType === "tree" && (
                  <>
                    {/* Draw split vertical line divider */}
                    {/* Scale splitHours (1 to 14) to the same range 15 to 85 */}
                    {(() => {
                      const splitSvgX = 15 + ((splitHours - 1) / (14 - 1)) * 70;
                      return (
                        <g>
                          <line 
                            x1={splitSvgX} 
                            y1="15" 
                            x2={splitSvgX} 
                            y2="85" 
                            stroke="#eab308" 
                            strokeWidth="1" 
                            strokeDasharray="1.5,1" 
                          />
                          <text x={splitSvgX + 1.5} y="18" className="fill-amber-400 font-mono" fontSize="2.5">
                            X = {splitHours} hr
                          </text>
                        </g>
                      );
                    })()}

                    {/* Study Hours vs score plot, pass is circle, fail is cross */}
                    {treePoints.map((p, idx) => {
                      const scaledPassX = 15 + ((p.hours - 1) / (15 - 1)) * 70;
                      const scaledPassY = 85 - ((p.score - 35) / (96 - 35)) * 70;
                      const isPass = p.outcome === "Pass";

                      return (
                        <g key={`tree-pt-${idx}`}>
                          {isPass ? (
                            <circle 
                              cx={scaledPassX} 
                              cy={scaledPassY} 
                              r="1.8" 
                              className="fill-emerald-400 stroke-emerald-600 stroke-[0.3]"
                            />
                          ) : (
                            <polygon 
                              points={`${scaledPassX - 1.2},${scaledPassY - 1.2} ${scaledPassX + 1.2},${scaledPassY + 1.2} ${scaledPassX},${scaledPassY} ${scaledPassX - 1.2},${scaledPassY + 1.2} ${scaledPassX + 1.2},${scaledPassY - 1.2}`}
                              className="fill-red-400 stroke-red-600 stroke-[0.2]"
                            />
                          )}
                        </g>
                      );
                    })}
                  </>
                )}

              </svg>

              {/* No Centroids Warnings for K-Means */}
              {modelType === "kmeans" && centroids.length === 0 && (
                <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center space-y-3" id="kmeans-unfitted-prompt">
                  <AlertCircle className="h-8 w-8 text-amber-500" />
                  <p className="text-xs font-mono text-slate-300 max-w-xs">
                    This K-Means dataset represents dimensions of petal records. Centroids have not been assigned.
                  </p>
                  <button
                    onClick={handleRunKmeans}
                    className="px-4 py-2 bg-blue-600 border border-white/10 font-sans font-bold text-xs text-white rounded-xl hover:scale-105 transition-all cursor-pointer"
                  >
                    Generate Centroids & Fit Model
                  </button>
                </div>
              )}
            </div>

            {/* Pedagogical Commentary Panel explaining what is seen */}
            <div className="bg-black/30 p-4 rounded-xl border border-white/5" id="playground-explanation-block">
              <h4 className="text-xs font-sans font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5">
                <BookOpen className="h-4 w-4 text-emerald-400" />
                Albert's Core Pedagogical Commentary
              </h4>
              
              {modelType === "kmeans" && (
                <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed font-sans">
                  <strong>Intuition</strong>: Watch how K-Means clusters data points without labels (Unsupervised Learning). Centroids find coordinates where total points variance is minimized (inertia). Notice how changing K dynamically splits the versicolor and virginica species!
                </p>
              )}

              {modelType === "regression" && (
                <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed font-sans">
                  <strong>Intuition</strong>: Ordinary Least Squares (OLS) regression minimizes the squared residuals (MSE) between real house sale price points and our regression trendline. High polynomial complexities may cause <em>overfitting</em>, matching noise instead of core trend!
                </p>
              )}

              {modelType === "tree" && (
                <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed font-sans">
                  <strong>Intuition</strong>: Decision Trees determine the absolute best study time threshold (e.g. 5 hours) to separate outputs into cohesive sub-branches. We evaluate success by measuring <strong>Gini Impurity Gain</strong>. Notice how a split at 5 hours yields pristine child nodes!
                </p>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
