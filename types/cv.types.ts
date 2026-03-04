
export interface CVPersonalInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    location?: string;
    linkedIn?: string;
    website?: string;
    summary?: string;
}

export interface CVExperience {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string | 'Present';
    location?: string;
    description: string[];
    optimizedDescription?: string[];
}

export interface CVEducation {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string | 'Present';
    gpa?: string;
}

export interface CVSkills {
    tehnical: string[];
    soft: string[];
    languages: string[];
}

export interface CVProject {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    url?: string;
}

export interface CVData {
    personalInfo: CVPersonalInfo;
    experience: CVExperience[],
    education: CVEducation[],
    skills: CVSkills;
    certifications?: string[];
    projects?: CVProject[];
}

export interface AISuggestion {
    overallScore: number;
    summary: string;
    improvements: {
        section: string;
        issue: string;
        suggestion: string;
        priority: 'high' | 'medium' | 'low'
    }[]
    keywords: string[];
    optimizedSummary?: string;
}