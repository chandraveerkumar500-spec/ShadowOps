
import React from 'react';
import { mockNodes, mockEdges } from '../mockData';
import { useNavigate } from 'react-router-dom';
import { ObjectType } from '../types';

const FrictionMap: React.FC = () => {
  const navigate = useNavigate();

  // Simple static visualization using SVG for the node graph
  // In a real app, this would use D3.js force simulation
  const getNodeColor = (type: ObjectType) => {
    switch (type) {
      case ObjectType.DOC: return 'text-sky-400 fill-sky-500/20 stroke-sky-400';
      case ObjectType.PROCESS: return 'text-purple-400 fill-purple-500/20 stroke-purple-400';
      case ObjectType.TASK: return 'text-emerald-400 fill-emerald-500/20 stroke-emerald-400';
      case ObjectType.DEPLOY: return 'text-orange-400 fill-orange-500/20 stroke-orange-400';
      default: return 'text-slate-400 fill-slate-500/20 stroke-slate-400';
    }
  };

  const nodePositions = {
    n1: { x: 200, y: 150 },
    n2: { x: 500, y: 250 },
    n3: { x: 300, y: 400 },
    n4: { x: 700, y: 150 },
    n5: { x: 800, y: 400 },
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Friction Map</h1>
          <p className="text-slate-400 mt-2">Visualizing the gravity pull between system actors and shadow objects.</p>
        </div>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-sky-500"></span> Doc</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-purple-500"></span> Process</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-500"></span> Deploy</div>
        </div>
      </div>

      <div className="w-full aspect-[16/7] bg-slate-950 rounded-3xl border border-slate-800 relative overflow-hidden">
        <svg className="w-full h-full">
          {/* Edges */}
          {mockEdges.map(edge => {
            const start = nodePositions[edge.fromNodeId as keyof typeof nodePositions];
            const end = nodePositions[edge.toNodeId as keyof typeof nodePositions];
            if (!start || !end) return null;
            return (
              <line 
                key={edge.id}
                x1={start.x} y1={start.y}
                x2={end.x} y2={end.y}
                stroke="#334155"
                strokeWidth={edge.weight}
                strokeDasharray="5,5"
              />
            );
          })}

          {/* Nodes */}
          {mockNodes.map(node => {
            const pos = nodePositions[node.id as keyof typeof nodePositions];
            if (!pos) return null;
            const size = 30 + (node.gravityScore / 2);
            return (
              <g 
                key={node.id} 
                className={`cursor-pointer transition-transform hover:scale-110`}
                onClick={() => navigate(`/node/${node.id}`)}
              >
                <circle 
                  cx={pos.x} 
                  cy={pos.y} 
                  r={size} 
                  className={`${getNodeColor(node.objectType)} opacity-40 hover:opacity-100 transition-opacity stroke-2 gravity-pull`} 
                />
                <text 
                  x={pos.x} 
                  y={pos.y + size + 20} 
                  className="fill-slate-300 text-[10px] font-bold uppercase text-center"
                  textAnchor="middle"
                >
                  {node.displayName}
                </text>
                <text 
                  x={pos.x} 
                  y={pos.y} 
                  className="fill-white text-xs font-bold" 
                  textAnchor="middle" 
                  alignmentBaseline="middle"
                >
                  {node.gravityScore.toFixed(0)}G
                </text>
              </g>
            );
          })}
        </svg>

        <div className="absolute bottom-8 left-8 p-4 bg-slate-900/80 backdrop-blur rounded-xl border border-slate-700 max-w-xs">
          <p className="text-xs font-bold uppercase text-slate-500 mb-1">Observation</p>
          <p className="text-xs text-slate-300 leading-relaxed">
            The cluster around <span className="text-indigo-400">Core Platform PRD</span> indicates it is acting as a "Gravity Well"—pulling in disproportionate ad-hoc coordination.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FrictionMap;
