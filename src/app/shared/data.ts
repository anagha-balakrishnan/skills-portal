import { Ilookup, ISearchResult, Iuser } from "./interfaces";

export const PRACTICES: Ilookup[] = [
  { id: 1, n: 'App Dev', c: 'APP_DEV' },
  { id: 2, n: 'Data/AI', c: 'DATA_AI' },
  { id: 3, n: 'Project Management', c: 'PROJ_MNGT' },
  { id: 4, n: 'QA', c: 'QA' },
  { id: 5, n: 'UI/UX', c: 'UI_UX' }
]
export const CATEGORIES: Ilookup[] = [
  { id: 1, n: 'Web UI Development', c: 'WEB_UI_DEV' },
  { id: 2, n: 'Database', c: 'DB' }
];
export const EXPERT_LEVELS: Ilookup[] = [
  { id: 1, n: 'Level 1 - Beginner', c: 'L1' },
  { id: 2, n: 'Level 2 - Intermediate', c: 'L2' },
  { id: 1, n: 'Level 3 - Proficient', c: 'L3' },
  { id: 1, n: 'Level 4 - Expert', c: 'L4' },
];
export const TECH_STACKS: Ilookup[] = [
  { id: 1, n: 'Angular', c: 'ANGULAR', cc: 'WEB_UI_DEV', pc: 'APP_DEV' },
  { id: 1, n: 'Angular4', c: 'ANGULAR4', cc: 'WEB_UI_DEV', pc: 'APP_DEV' },
  { id: 1, n: 'AngularJS', c: 'ANGULARJS', cc: 'WEB_UI_DEV', pc: 'UI_UX' },
  { id: 1, n: 'Angular15', c: 'ANGULAR15', cc: 'WEB_UI_DEV', pc: 'UI_UX' },
  { id: 2, n: 'Bootstrap', c: 'BOOTSTRAP', cc: 'WEB_UI_DEV', pc: 'APP_DEV' },
  { id: 3, n: 'CSS', c: 'CSS', cc: 'WEB_UI_DEV', pc: 'APP_DEV' },
  { id: 4, n: 'HTML 5', c: 'HTML_5', cc: 'WEB_UI_DEV', pc: 'APP_DEV' },
  { id: 5, n: 'MS SQL', c: 'MS_SQL', cc: 'DB', pc: 'APP_DEV' },
  { id: 6, n: 'My SQL', c: 'MY_SQL', cc: 'DB', pc: 'APP_DEV' },
  { id: 7, n: 'Oracle', c: 'ORACLE', cc: 'DB', pc: 'APP_DEV' },
];
export const SEARCH_RESULTS: ISearchResult[] = [
  {
    id: '1',
    skillGroupCode: 'APP_DEV',
    skillGroupName: 'App Dev',
    categoryCode: 'WEB_UI_DEV',
    categoryName: 'Web UI Development',
    techStacks: [TECH_STACKS[0], TECH_STACKS[3]]
  },
  {
    id: '2',
    skillGroupCode: 'APP_DEV1',
    skillGroupName: 'App Dev1',
    categoryCode: 'WEB_UI_DEV1',
    categoryName: 'Web UI Development1',
    techStacks: TECH_STACKS
  }
];
export const DEFAULT_USER: Iuser = {
  eid: '2886',
  empName: 'Anagha Balakrishnan'
};