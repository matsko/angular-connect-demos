export var AnimationSummary = (function () {
    function AnimationSummary(entries) {
        this.entries = entries;
    }
    Object.defineProperty(AnimationSummary.prototype, "queries", {
        get: function () {
            var flatQueries = [];
            this.entries.forEach(function (entry) {
                flatQueries.push.apply(flatQueries, entry.queries);
            });
            return flatQueries;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnimationSummary.prototype, "triggers", {
        get: function () {
            return this.entries.map(function (entry) { return entry.ast; });
        },
        enumerable: true,
        configurable: true
    });
    return AnimationSummary;
}());
export var AnimationEntrySummary = (function () {
    function AnimationEntrySummary(ast, queries) {
        this.ast = ast;
        this.queries = queries;
    }
    return AnimationEntrySummary;
}());
export function generateAnimationSummary(asts) {
    var visitor = new AnimationSummaryVisitor();
    return visitor.build(asts);
}
var AnimationSummaryVisitor = (function () {
    function AnimationSummaryVisitor() {
    }
    AnimationSummaryVisitor.prototype.build = function (asts) {
        var _this = this;
        var summary = new AnimationSummary([]);
        asts.forEach(function (ast) { return ast.visit(_this, summary); });
        return summary;
    };
    AnimationSummaryVisitor.prototype.visitAnimationEntry = function (ast, summary) {
        var _this = this;
        var triggerSummary = new AnimationEntrySummary(ast, []);
        summary.entries.push(triggerSummary);
        ast.stateDeclarations.forEach(function (innerAst) { return innerAst.visit(_this, triggerSummary); });
        ast.stateTransitions.forEach(function (innerAst) { return innerAst.visit(_this, triggerSummary); });
    };
    AnimationSummaryVisitor.prototype.visitAnimationStateTransition = function (ast, summary) {
        ast.animation.visit(this, summary);
    };
    AnimationSummaryVisitor.prototype.visitAnimationSequence = function (ast, summary) {
        var _this = this;
        ast.steps.forEach(function (innerAst) { return innerAst.visit(_this, summary); });
    };
    AnimationSummaryVisitor.prototype.visitAnimationGroup = function (ast, summary) {
        var _this = this;
        ast.steps.forEach(function (innerAst) { return innerAst.visit(_this, summary); });
    };
    AnimationSummaryVisitor.prototype.visitAnimationStateDeclaration = function (ast, summary) { };
    AnimationSummaryVisitor.prototype.visitAnimationKeyframe = function (ast, summary) { };
    AnimationSummaryVisitor.prototype.visitAnimationStyles = function (ast, summary) { };
    AnimationSummaryVisitor.prototype.visitAnimationStep = function (ast, summary) { };
    AnimationSummaryVisitor.prototype.visitAnimationQuery = function (ast, summary) {
        summary.queries.push(ast);
        ast.animation.visit(this, summary);
    };
    return AnimationSummaryVisitor;
}());
//# sourceMappingURL=animation_summary.js.map