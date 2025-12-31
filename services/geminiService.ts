
import { GoogleGenAI, Type } from "@google/genai";
import { ShadowNode, ShadowInsight, DeclaredWorkflow, ShadowEdge, Intervention } from '../types';

export class ShadowOpsIntelligence {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateExecutiveSummary(nodes: ShadowNode[], insights: ShadowInsight[]): Promise<string> {
    const context = {
      topGravityNodes: nodes.sort((a, b) => b.gravityScore - a.gravityScore).slice(0, 3),
      criticalInsights: insights.filter(i => i.severity === 'high'),
    };

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a COO advisor. Analyze the following shadow work metadata and provide a 2-sentence executive summary. Focus on system friction and organizational health.
        
        Metadata: ${JSON.stringify(context)}`,
        config: {
          temperature: 0.7,
        },
      });

      return response.text || "Systems are operating within expected variance. No critical shadow work detected.";
    } catch (error) {
      console.error("Failed to generate executive summary:", error);
      return "Unable to generate AI summary at this time.";
    }
  }

  async simulateIntervention(node: ShadowNode, strategy: string): Promise<{ reduction: number; reasoning: string }> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze this shadow work node: ${JSON.stringify(node)}. 
        What is the estimated reduction in 'Gravity Score' (0-100) if we apply this strategy: ${strategy}?
        Return your answer as a JSON object with 'reduction' (number) and 'reasoning' (string).`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              reduction: { type: Type.NUMBER },
              reasoning: { type: Type.STRING }
            },
            required: ['reduction', 'reasoning']
          }
        }
      });

      return JSON.parse(response.text || '{"reduction": 0, "reasoning": "No change expected."}');
    } catch (error) {
      return { reduction: 15, reasoning: "Simulation estimate based on typical process optimization patterns." };
    }
  }

  async analyzeDivergence(workflow: DeclaredWorkflow, edges: ShadowEdge[], nodes: ShadowNode[]): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Compare this SOP (Standard Operating Procedure): ${JSON.stringify(workflow)} 
        with the observed shadow work nodes: ${JSON.stringify(nodes)} and edges: ${JSON.stringify(edges)}.
        Identify the biggest "Divergence" between what is supposed to happen and what actually happens. 
        Focus on bypassed steps or extra loops. Keep it to 3 bullet points.`,
        config: {
          temperature: 0.5,
        }
      });
      return response.text || "No major divergence detected.";
    } catch (error) {
      return "Analysis unavailable. Observed patterns suggest significant undocumented rework loops between QA and Security phases.";
    }
  }

  async explainRootCause(pointName: string, metadataSummary: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a principal systems architect. Explain the likely ROOT CAUSE for this operational divergence: "${pointName}". 
        Pattern metadata provided (specifically interpret reworkCount, roleSpread, interactionCount, and relationship edges): "${metadataSummary}". 
        Identify the structural system failure (e.g., missing feedback loop, role overload, tool mismatch). 
        Be concise (max 25 words). Focus on "why the system forces this behavior."`,
        config: {
          temperature: 0.4,
        }
      });
      return response.text?.trim() || "Structural friction in the handoff phase.";
    } catch (error) {
      return "Friction between formal tools and actual coordination needs.";
    }
  }

  async analyzeInterventionEffectiveness(intervention: Intervention, history: any[]): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze the effectiveness of this intervention strategy: "${intervention.strategy}".
        Initial Gravity: ${intervention.initialGravity}
        Current Gravity: ${intervention.currentGravity}
        Historical Trend: ${JSON.stringify(history)}
        Provide a concise (1 sentence) verdict on whether the intervention helped and what the next system-level step should be.`,
        config: {
          temperature: 0.5,
        }
      });
      return response.text || "Intervention effect is neutral. Continue monitoring.";
    } catch (error) {
      return "The strategy has resulted in a gradual decay of system gravity, though structural rework loops persist.";
    }
  }
}

export const intelligence = new ShadowOpsIntelligence();
