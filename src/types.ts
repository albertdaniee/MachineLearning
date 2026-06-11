/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}

export type CourseTopic = 'python' | 'sql' | 'ml' | 'deep-learning' | 'statistics';

export interface Course {
  id: string;
  title: string;
  topic: CourseTopic;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  curriculum: string[];
  iconName: string;
}

export interface DataPoint {
  x: number;
  y: number;
  label?: string | number;
  cluster?: number;
}

export interface Dataset {
  id: string;
  name: string;
  description: string;
  headers: string[];
  rows: Record<string, any>[];
  targetColumn: string;
  numericalColumns: string[];
  categoricalColumns: string[];
}

export interface ConsultationRequest {
  id: string;
  name: string;
  email: string;
  serviceType: string;
  message: string;
  estimatedFee: number;
  submittedAt: string;
}
