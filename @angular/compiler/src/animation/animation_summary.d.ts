import { AnimationEntryAst, AnimationQueryAst } from "./animation_ast";
export declare class AnimationSummary {
    entries: AnimationEntrySummary[];
    constructor(entries: AnimationEntrySummary[]);
    queries: AnimationQueryAst[];
    triggers: AnimationEntryAst[];
}
export declare class AnimationEntrySummary {
    ast: AnimationEntryAst;
    queries: AnimationQueryAst[];
    constructor(ast: AnimationEntryAst, queries: AnimationQueryAst[]);
}
export declare function generateAnimationSummary(asts: AnimationEntryAst[]): AnimationSummary;
