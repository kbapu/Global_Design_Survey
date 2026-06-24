export interface SurveyData {
  id: string;
  createdAt: string;
  region: string;
  role: string;
  topRoles: string[];
  customRole: string;
  rolesNotHired: string[];
  qualities: string[];
  aiCapabilities: string[];
  name: string;
  email: string;
}

export type StepProps = {
  data: Partial<SurveyData>;
  updateData: (updates: Partial<SurveyData>) => void;
  onNext: () => void;
  onBack?: () => void;
  isLastStep?: boolean;
  isSubmitting?: boolean;
};
