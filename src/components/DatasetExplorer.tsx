/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Database, Search, Filter, RefreshCw, BarChart2, Hash, FileLineChart } from "lucide-react";
import { CURATED_DATASETS } from "../data";
import { Dataset } from "../types";

export default function DatasetExplorer() {
  const [selectedDatasetId, setSelectedDatasetId] = React.useState<string>("toronto-housing");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [selectedCol, setSelectedCol] = React.useState<string>("");

  const currentDataset = React.useMemo(() => {
    return CURATED_DATASETS.find((d) => d.id === selectedDatasetId) || CURATED_DATASETS[0];
  }, [selectedDatasetId]);

  // Set default column when dataset changes
  React.useEffect(() => {
    if (currentDataset) {
      setSelectedCol(currentDataset.numericalColumns[0] || "");
    }
  }, [currentDataset]);

  // Compute statistical metrics for the selected column
  const stats = React.useMemo(() => {
    if (!currentDataset || !selectedCol) return null;
    const values = currentDataset.rows
      .map((row) => Number(row[selectedCol]))
      .filter((v) => !isNaN(v));

    if (values.length === 0) return null;

    const count = values.length;
    const mean = values.reduce((sum, v) => sum + v, 0) / count;
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    // Variance & Standard Deviation
    const sqDiffs = values.map((v) => Math.pow(v - mean, 2));
    const avgSqDiff = sqDiffs.reduce((sum, v) => sum + v, 0) / count;
    const stdDev = Math.sqrt(avgSqDiff);

    return { count, mean, min, max, stdDev };
  }, [currentDataset, selectedCol]);

  // Filtered rows for data viewer
  const filteredRows = React.useMemo(() => {
    if (!currentDataset) return [];
    if (!searchQuery.trim()) return currentDataset.rows;

    const query = searchQuery.toLowerCase();
    return currentDataset.rows.filter((row) => {
      return Object.values(row).some((val) => 
        String(val).toLowerCase().includes(query)
      );
    });
  }, [currentDataset, searchQuery]);

  // Simulated Correlation Matrix coefficients depending on active dataset
  const correlationMatrix = React.useMemo(() => {
    if (selectedDatasetId === "toronto-housing") {
      return {
        cols: ["size", "bedrooms", "age", "price"],
        matrix: [
          [1.00, 0.82, -0.15, 0.95],
          [0.82, 1.00, 0.05, 0.78],
          [-0.15, 0.05, 1.00, -0.42],
          [0.95, 0.78, -0.42, 1.00]
        ]
      };
    } else if (selectedDatasetId === "iris-flowers") {
      return {
        cols: ["petalLength", "petalWidth"],
        matrix: [
          [1.00, 0.96],
          [0.96, 1.00]
        ]
      };
    } else {
      return {
        cols: ["hours", "attendance", "score"],
        matrix: [
          [1.00, 0.45, 0.88],
          [0.45, 1.00, 0.62],
          [0.88, 0.62, 1.00]
        ]
      };
    }
  }, [selectedDatasetId]);

  const getHeatmapColor = (val: number) => {
    if (val === 1) return "bg-emerald-500/25 text-emerald-300 border-white/10";
    if (val >= 0.8) return "bg-emerald-500/15 text-emerald-200 border-white/5";
    if (val >= 0.4) return "bg-teal-500/10 text-teal-200 border-white/5";
    if (val >= 0) return "bg-white/5 text-slate-300 border-white/5";
    if (val >= -0.3) return "bg-amber-500/10 text-amber-205 border-white/5";
    return "bg-red-500/15 text-red-200 border-white/5";
  };

  return (
    <section className="bg-transparent py-16 px-4 sm:px-6 lg:px-8" id="dataset-explorer">
      <div className="max-w-7xl mx-auto">
        
        {/* Module Sub-Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 border-b border-white/5 pb-8">
          <div className="space-y-1.5 text-left">
            <h3 className="text-xl sm:text-2xl font-sans font-bold text-white tracking-tight flex items-center gap-2">
              <Database className="h-6 w-6 text-emerald-400" />
              Exploratory Data Analysis (EDA) Hub
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Inspect statistical summaries, query row listings, and explore mathematical correlation matrices.
            </p>
          </div>

          <div className="flex gap-2">
            {CURATED_DATASETS.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDatasetId(d.id)}
                className={`py-2 px-3 text-xs font-mono font-medium rounded-lg cursor-pointer transition border ${
                  selectedDatasetId === d.id
                    ? "bg-white/10 text-emerald-400 border-white/10"
                    : "bg-white/5 text-slate-400 border-transparent hover:text-white"
                }`}
              >
                {d.id === "toronto-housing" ? "GTA Housing" : d.id === "iris-flowers" ? "Iris Flowers" : "Student Scores"}
              </button>
            ))}
          </div>
        </div>

        {/* Explorer Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          
          {/* Left Block: Basic profile & stats (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 1. Dataset metadata profile */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 rounded-2xl space-y-4 backdrop-blur-md">
              <h4 className="text-sm font-mono text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                <FileLineChart className="h-4.5 w-4.5 text-emerald-400" />
                Metadata Profile
              </h4>
              <div className="space-y-1">
                <span className="block text-base font-sans font-bold text-white leading-tight">
                  {currentDataset.name}
                </span>
                <p className="text-xs text-slate-400 leading-normal">
                  {currentDataset.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-slate-500 block">Total Records</span>
                  <span className="text-white font-bold block mt-1">{currentDataset.rows.length} Rows</span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-slate-500 block">Features Count</span>
                  <span className="text-white font-bold block mt-1">{currentDataset.headers.length} Columns</span>
                </div>
              </div>
            </div>

            {/* 2. Statistical parameters descriptive calculator */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 rounded-2xl space-y-4 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-mono text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                  <Hash className="h-4.5 w-4.5 text-emerald-400" />
                  Descriptive Stats
                </h4>
                <select
                  value={selectedCol}
                  onChange={(e) => setSelectedCol(e.target.value)}
                  className="bg-white/5 text-[11px] font-mono text-slate-300 border border-white/10 px-2 py-1 rounded cursor-pointer"
                >
                  {currentDataset.numericalColumns.map((col) => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>

              {stats ? (
                <div className="space-y-2.5 pt-1 text-xs font-mono" id="descriptive-stats-output">
                  <div className="flex justify-between p-2 bg-white/5 rounded border border-white/5">
                    <span className="text-slate-400">Arithmetic Mean (μ)</span>
                    <span className="text-white font-medium">{stats.mean.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white/5 rounded border border-white/5">
                    <span className="text-slate-400">Standard Deviation (σ)</span>
                    <span className="text-white font-medium">{stats.stdDev.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white/5 rounded border border-white/5">
                    <span className="text-slate-400">Minimum Value</span>
                    <span className="text-teal-400 font-medium">{stats.min}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white/5 rounded border border-white/5">
                    <span className="text-slate-400">Maximum Value</span>
                    <span className="text-emerald-400 font-medium">{stats.max}</span>
                  </div>
                </div>
              ) : (
                <span className="block text-xs font-mono text-slate-500">Select numeric column to calculate descriptor parameters.</span>
              )}
            </div>

          </div>

          {/* Right Block: Heatmap matrix list and data logging viewer (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 3. Heatmap Correlation Matrix */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 rounded-2xl space-y-5 backdrop-blur-md" id="correlation-matrix-module">
              <h4 className="text-sm font-mono text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                <BarChart2 className="h-4.5 w-4.5 text-emerald-400" />
                Linear Pearson Correlation Heatmap Matrix
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono">
                  <thead>
                    <tr>
                      <th className="p-3 text-left bg-black/40 border border-white/5 text-slate-500">Feature</th>
                      {correlationMatrix.cols.map((col) => (
                        <th key={col} className="p-3 text-center bg-black/40 border border-white/5 text-slate-400 font-sans font-semibold">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {correlationMatrix.cols.map((rowCol, rIdx) => (
                      <tr key={rowCol}>
                        <td className="p-3 font-sans font-semibold bg-black/30 border border-white/5 text-slate-300">
                          {rowCol}
                        </td>
                        {correlationMatrix.matrix[rIdx].map((coeff, cIdx) => (
                          <td 
                            key={cIdx} 
                            className={`p-4 text-center font-bold border border-white/5 transition duration-150 select-none ${getHeatmapColor(coeff)}`}
                          >
                            {coeff.toFixed(2)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <span className="block text-[10px] text-slate-500 font-mono italic">
                Values near +1.0 indicate powerful proportional correlation (e.g., house size vs selling price (0.95)).
              </span>
            </div>

            {/* 4. Filterable Data List Log Viewer */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 rounded-2xl space-y-4 backdrop-blur-md" id="data-list-log-viewer">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <h4 className="text-sm font-mono text-slate-300 uppercase tracking-widest">
                  Row Listing & Records Catalog
                </h4>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search records..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 text-xs text-white border border-white/10 pl-8 pr-3 py-2 rounded-lg focus:outline-none focus:border-emerald-500 transition-all font-sans"
                  />
                </div>
              </div>

              {/* Table listings */}
              <div className="overflow-x-auto max-h-60 border border-white/10 rounded-xl" id="records-table-container">
                <table className="w-full text-left text-xs font-mono bg-black/20">
                  <thead className="bg-black/50 text-slate-500 uppercase text-[10px] tracking-wider stick top-0">
                    <tr>
                      {currentDataset.headers.map((h) => (
                        <th key={h} className="px-4 py-3 border-b border-white/10">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {filteredRows.length > 0 ? (
                      filteredRows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/5 transition-all">
                          {Object.values(row).map((val, cellIdx) => (
                            <td key={cellIdx} className="px-4 py-2.5 font-sans">
                              {typeof val === "number" ? val : String(val)}
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={currentDataset.headers.length} className="px-4 py-8 text-center text-slate-500 capitalize">
                          No matching records found. Try modifying filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
