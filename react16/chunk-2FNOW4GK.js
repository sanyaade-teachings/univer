import {
  CopySheetCommand,
  ERROR_TYPE_SET,
  InsertColMutation,
  InsertRowMutation,
  MoveColsMutation,
  MoveRangeMutation,
  MoveRowsMutation,
  RegisterOtherFormulaService,
  RemoveColMutation,
  RemoveRowMutation,
  RemoveSheetCommand,
  ReorderRangeMutation,
  SetRangeValuesMutation,
  SheetInterceptorService,
  SheetsSelectionsService,
  UniverFormulaEnginePlugin,
  createTopMatrixFromMatrix,
  findAllRectangle,
  getSheetCommandTarget
} from "./chunk-JGEZE7BC.js";
import {
  FIX_ONE_PIXEL_BLUR_OFFSET,
  SheetExtension,
  SpreadsheetExtensionRegistry,
  isObject
} from "./chunk-VYDPVHQH.js";
import {
  BehaviorSubject,
  ColorKit,
  DependentOn,
  Disposable,
  ICommandService,
  IConfigService,
  IResourceManagerService,
  IUndoRedoService,
  IUniverInstanceService,
  Inject,
  Injector,
  LRUMap,
  ObjectMatrix,
  Plugin,
  RTree,
  Range,
  Rectangle,
  RefAlias,
  Subject,
  Tools,
  bufferTime,
  dateKit,
  distinctUntilChanged,
  filter,
  generateRandomId,
  isInternalEditorID,
  map,
  merge_default,
  sequenceExecute,
  touchDependencies
} from "./chunk-UI3TUZSE.js";
import {
  __decorateClass,
  __decorateParam,
  __publicField
} from "./chunk-24OICD5T.js";

// ../packages/sheets-conditional-formatting/package.json
var package_default = {
  name: "@univerjs/sheets-conditional-formatting",
  version: "0.21.1",
  private: false,
  description: "Conditional formatting plugin for Univer Sheets",
  author: "DreamNum <developer@univer.ai>",
  license: "Apache-2.0",
  funding: {
    type: "opencollective",
    url: "https://opencollective.com/univer"
  },
  homepage: "https://univer.ai",
  repository: {
    type: "git",
    url: "https://github.com/dream-num/univer"
  },
  bugs: {
    url: "https://github.com/dream-num/univer/issues"
  },
  keywords: [
    "univer"
  ],
  exports: {
    ".": "./src/index.ts",
    "./*": "./src/*",
    "./facade": "./src/facade/index.ts"
  },
  main: "./src/index.ts",
  types: "./lib/types/index.d.ts",
  publishConfig: {
    access: "public",
    main: "./lib/es/index.js",
    module: "./lib/es/index.js",
    exports: {
      ".": {
        import: "./lib/es/index.js",
        require: "./lib/cjs/index.js",
        types: "./lib/types/index.d.ts"
      },
      "./*": {
        import: "./lib/es/*",
        require: "./lib/cjs/*",
        types: "./lib/types/index.d.ts"
      },
      "./facade": {
        import: "./lib/es/facade.js",
        require: "./lib/cjs/facade.js",
        types: "./lib/types/facade/index.d.ts"
      },
      "./lib/facade": {
        import: "./lib/es/facade.js",
        require: "./lib/cjs/facade.js",
        types: "./lib/types/facade/index.d.ts"
      },
      "./lib/*": "./lib/*"
    }
  },
  directories: {
    lib: "lib"
  },
  files: [
    "lib"
  ],
  scripts: {
    prepare: "node --experimental-strip-types ./scripts/build-icons.mts",
    test: "vitest run",
    "test:watch": "vitest",
    coverage: "vitest run --coverage",
    typecheck: "tsc --noEmit",
    "build:bundle": "univer-cli build",
    "build:types": "tsc -p tsconfig.node.json",
    build: "pnpm run build:bundle && pnpm run build:types"
  },
  peerDependencies: {
    rxjs: ">=7.0.0"
  },
  dependencies: {
    "@univerjs/core": "workspace:*",
    "@univerjs/engine-formula": "workspace:*",
    "@univerjs/engine-render": "workspace:*",
    "@univerjs/sheets": "workspace:*"
  },
  devDependencies: {
    "@univerjs-infra/shared": "workspace:*",
    "@univerjs/icons-svg": "^1.1.1",
    rxjs: "^7.8.2",
    typescript: "^6.0.2",
    vitest: "^4.1.4"
  }
};

// ../packages/sheets-conditional-formatting/src/base/const.ts
var SHEET_CONDITIONAL_FORMATTING_PLUGIN = "SHEET_CONDITIONAL_FORMATTING_PLUGIN";
var CFTimePeriodOperator = /* @__PURE__ */ ((CFTimePeriodOperator2) => {
  CFTimePeriodOperator2["today"] = "today";
  CFTimePeriodOperator2["yesterday"] = "yesterday";
  CFTimePeriodOperator2["tomorrow"] = "tomorrow";
  CFTimePeriodOperator2["last7Days"] = "last7Days";
  CFTimePeriodOperator2["thisMonth"] = "thisMonth";
  CFTimePeriodOperator2["lastMonth"] = "lastMonth";
  CFTimePeriodOperator2["nextMonth"] = "nextMonth";
  CFTimePeriodOperator2["thisWeek"] = "thisWeek";
  CFTimePeriodOperator2["lastWeek"] = "lastWeek";
  CFTimePeriodOperator2["nextWeek"] = "nextWeek";
  return CFTimePeriodOperator2;
})(CFTimePeriodOperator || {});
var CFNumberOperator = /* @__PURE__ */ ((CFNumberOperator2) => {
  CFNumberOperator2["greaterThan"] = "greaterThan";
  CFNumberOperator2["greaterThanOrEqual"] = "greaterThanOrEqual";
  CFNumberOperator2["lessThan"] = "lessThan";
  CFNumberOperator2["lessThanOrEqual"] = "lessThanOrEqual";
  CFNumberOperator2["notBetween"] = "notBetween";
  CFNumberOperator2["between"] = "between";
  CFNumberOperator2["equal"] = "equal";
  CFNumberOperator2["notEqual"] = "notEqual";
  return CFNumberOperator2;
})(CFNumberOperator || {});
var DEFAULT_BG_COLOR = "#fff";
var DEFAULT_FONT_COLOR = "#000000";
var createDefaultRule = () => ({
  cfId: void 0,
  ranges: [],
  stopIfTrue: false,
  rule: { type: "highlightCell" /* highlightCell */, subType: "text" /* text */, operator: "containsText" /* containsText */ }
});
var createDefaultValue = (subType, operator) => {
  switch (subType) {
    case "text" /* text */: {
      if (["beginsWith" /* beginsWith */, "containsText" /* containsText */, "endsWith" /* endsWith */, "equal" /* equal */, "notContainsText" /* notContainsText */, "notEqual" /* notEqual */].includes(operator)) {
        return "";
      }
      break;
    }
    case "number" /* number */: {
      if (["between" /* between */, "notBetween" /* notBetween */].includes(operator)) {
        return [10, 100];
      }
      return 10;
    }
  }
  return "";
};
var createDefaultValueByValueType = (type, defaultValue) => {
  switch (type) {
    case "formula" /* formula */: {
      return "=";
    }
    case "max" /* max */:
    case "min" /* min */: {
      return "";
    }
    case "percent" /* percent */:
    case "percentile" /* percentile */:
    case "num" /* num */: {
      return defaultValue !== void 0 ? defaultValue : 10;
    }
  }
  return "";
};

// ../packages/sheets-conditional-formatting/src/utils/anchor.ts
var findIndexByAnchor = (anchor, ruleList, get) => {
  if (!ruleList) {
    return null;
  }
  const anchorIndex = ruleList.findIndex((rule) => get(rule) === anchor.id);
  if (anchorIndex < 0) {
    return null;
  }
  switch (anchor.type) {
    case "after": {
      return anchorIndex + 1;
    }
    case "before": {
      return anchorIndex - 1;
    }
    case "self": {
      return anchorIndex;
    }
  }
};
var moveByAnchor = (start, end, ruleList, get) => {
  if (!ruleList) {
    return null;
  }
  const startIndex = findIndexByAnchor(start, ruleList, get);
  let endIndex = findIndexByAnchor(end, ruleList, get);
  if (startIndex === null || endIndex === null || startIndex === endIndex) {
    return;
  }
  const rule = ruleList.splice(startIndex, 1)[0];
  if (startIndex < endIndex) {
    endIndex = findIndexByAnchor(end, ruleList, get);
  }
  switch (end.type) {
    case "before": {
      ruleList.splice(endIndex + 1, 0, rule);
      break;
    }
    case "self":
    case "after": {
      ruleList.splice(endIndex, 0, rule);
      break;
    }
  }
};
var transformSupportSymmetryAnchor = (start, end, ruleList, get) => {
  if (start.type === "after" && ["after", "before"].includes(end.type)) {
    return [start, end];
  }
  const _start = { ...start };
  const _end = { ...end };
  if (_start.type !== "after") {
    const index = findIndexByAnchor(_start, ruleList, get);
    if (index === null) {
      return null;
    }
    if (index - 1 < 0) {
      const nextItem = ruleList[index + 1];
      if (!nextItem) {
        return null;
      } else {
        _start.id = get(nextItem);
        _start.type = "before";
      }
    } else {
      const id = get(ruleList[index - 1]);
      _start.id = id;
      _start.type = "after";
    }
  }
  if (!["after", "before"].includes(_end.type)) {
    const index = findIndexByAnchor(_end, ruleList, get);
    if (index === null) {
      return null;
    }
    if (index === 0) {
      _end.type = "before";
    } else if (index - 1 >= 0) {
      const id = get(ruleList[index - 1]);
      _end.id = id;
      _end.type = "after";
    } else if (index + 1 <= ruleList.length - 1) {
      const id = get(ruleList[index + 1]);
      _end.id = id;
      _end.type = "before";
    } else {
      return null;
    }
  }
  if (_start.id === _end.id && _start.type === _end.type) {
    return null;
  }
  return [_start, _end];
};
var anchorUndoFactory = (start, end) => {
  if (["after", "before"].includes(end.type)) {
    if (start.type === "after") {
      return [end, start];
    } else if (start.type === "before") {
      return [end, { ...start, type: "self" }];
    }
  }
  return null;
};

// ../packages/sheets-conditional-formatting/src/utils/create-cf-id.ts
var createCfId = () => `${generateRandomId(8)}`;

// ../packages/sheets-conditional-formatting/src/models/conditional-formatting-rule-model.ts
var ConditionalFormattingRuleModel = class {
  constructor() {
    //  Map<unitID ,<sheetId ,IConditionFormattingRule[]>>
    __publicField(this, "_model", /* @__PURE__ */ new Map());
    __publicField(this, "_ruleChange$", new Subject());
    __publicField(this, "$ruleChange", this._ruleChange$.asObservable());
  }
  _ensureList(unitId, subUnitId) {
    let list = this.getSubunitRules(unitId, subUnitId);
    if (!list) {
      list = [];
      let unitMap = this._model.get(unitId);
      if (!unitMap) {
        unitMap = /* @__PURE__ */ new Map();
        this._model.set(unitId, unitMap);
      }
      unitMap.set(subUnitId, list);
    }
    return list;
  }
  getRule(unitId, subUnitId, cfId) {
    const list = this.getSubunitRules(unitId, subUnitId);
    if (list) {
      return list.find((item) => item.cfId === cfId);
    }
    return null;
  }
  getUnitRules(unitId) {
    const map2 = this._model.get(unitId);
    return map2 || null;
  }
  getSubunitRules(unitId, subUnitId) {
    var _a;
    const list = (_a = this._model.get(unitId)) == null ? void 0 : _a.get(subUnitId);
    return list || null;
  }
  getAll() {
    return this._model;
  }
  deleteRule(unitId, subUnitId, cfId) {
    const list = this.getSubunitRules(unitId, subUnitId);
    if (list) {
      const index = list.findIndex((e) => e.cfId === cfId);
      const rule = list[index];
      if (rule) {
        list.splice(index, 1);
        this._ruleChange$.next({ rule, subUnitId, unitId, type: "delete" });
      }
    }
  }
  setRule(unitId, subUnitId, rule, oldCfId) {
    const list = this._ensureList(unitId, subUnitId);
    const oldRule = list.find((item) => item.cfId === oldCfId);
    if (oldRule) {
      const cloneRule = Tools.deepClone(oldRule);
      Object.assign(oldRule, rule);
      this._ruleChange$.next({ rule: oldRule, subUnitId, unitId, type: "set", oldRule: cloneRule });
    }
  }
  addRule(unitId, subUnitId, rule) {
    const list = this._ensureList(unitId, subUnitId);
    const item = list.find((item2) => item2.cfId === rule.cfId);
    if (!item) {
      list.unshift(rule);
    }
    this._ruleChange$.next({ rule, subUnitId, unitId, type: "add" });
  }
  /**
   * example [1,2,3,4,5,6],if you move behind 5 to 2, then cfId=5,targetId=2.
   * if targetId does not exist, it defaults to top
   */
  moveRulePriority(unitId, subUnitId, start, end) {
    const list = this._ensureList(unitId, subUnitId);
    const curIndex = findIndexByAnchor(start, list, (rule2) => rule2.cfId);
    const targetCfIndex = findIndexByAnchor(end, list, (rule2) => rule2.cfId);
    if (targetCfIndex === null || curIndex === null || targetCfIndex === curIndex) {
      return;
    }
    const rule = list[curIndex];
    if (rule) {
      moveByAnchor(start, end, list, (rule2) => rule2.cfId);
      this._ruleChange$.next({ rule, subUnitId, unitId, type: "sort" });
    }
  }
  createCfId(_unitId, _subUnitId) {
    return createCfId();
  }
  deleteUnitId(unitId) {
    this._model.delete(unitId);
  }
};

// ../packages/sheets-conditional-formatting/src/commands/mutations/move-conditional-rule.mutation.ts
var MoveConditionalRuleMutation = {
  type: 2 /* MUTATION */,
  id: "sheet.mutation.move-conditional-rule",
  handler(accessor, params) {
    if (!params) {
      return false;
    }
    const { unitId, subUnitId, start, end } = params;
    const conditionalFormattingRuleModel = accessor.get(ConditionalFormattingRuleModel);
    conditionalFormattingRuleModel.moveRulePriority(unitId, subUnitId, start, end);
    return true;
  }
};
var MoveConditionalRuleMutationUndoFactory = (param) => {
  const { unitId, subUnitId } = param;
  const undo = anchorUndoFactory(param.start, param.end);
  if (!undo) {
    return [];
  }
  const [start, end] = undo;
  return [
    { id: MoveConditionalRuleMutation.id, params: { unitId, subUnitId, start, end } }
  ];
};

// ../packages/sheets-conditional-formatting/src/commands/mutations/delete-conditional-rule.mutation.ts
var DeleteConditionalRuleMutationUndoFactory = (accessor, param) => {
  const conditionalFormattingRuleModel = accessor.get(ConditionalFormattingRuleModel);
  const { unitId, subUnitId, cfId } = param;
  const ruleList = [...conditionalFormattingRuleModel.getSubunitRules(unitId, subUnitId) || []];
  const index = ruleList.findIndex((item) => item.cfId === cfId);
  const beforeRule = ruleList[index - 1];
  if (index > -1) {
    const rule = ruleList[index];
    const result = [{
      id: AddConditionalRuleMutation.id,
      params: { unitId, subUnitId, rule: Tools.deepClone(rule) }
    }];
    ruleList.splice(index, 1);
    if (index !== 0) {
      const firstRule = ruleList[0];
      if (firstRule) {
        const transformResult = transformSupportSymmetryAnchor({ id: firstRule.cfId, type: "before" }, { id: beforeRule.cfId, type: "after" }, ruleList, (rule2) => rule2.cfId);
        if (!transformResult) {
          return result;
        }
        const [start, end] = transformResult;
        const params = {
          unitId,
          subUnitId,
          start,
          end
        };
        result.push({ id: MoveConditionalRuleMutation.id, params });
      }
    }
    return result;
  }
  return [];
};
var DeleteConditionalRuleMutation = {
  type: 2 /* MUTATION */,
  id: "sheet.mutation.delete-conditional-rule",
  handler(accessor, params) {
    if (!params) {
      return false;
    }
    const { unitId, subUnitId, cfId } = params;
    const conditionalFormattingRuleModel = accessor.get(ConditionalFormattingRuleModel);
    conditionalFormattingRuleModel.deleteRule(unitId, subUnitId, cfId);
    return true;
  }
};

// ../packages/sheets-conditional-formatting/src/commands/mutations/add-conditional-rule.mutation.ts
var AddConditionalRuleMutationUndoFactory = (accessor, param) => {
  return { id: DeleteConditionalRuleMutation.id, params: { unitId: param.unitId, subUnitId: param.subUnitId, cfId: param.rule.cfId } };
};
var AddConditionalRuleMutation = {
  type: 2 /* MUTATION */,
  id: "sheet.mutation.add-conditional-rule",
  handler(accessor, params) {
    if (!params) {
      return false;
    }
    const { unitId, subUnitId, rule } = params;
    const conditionalFormattingRuleModel = accessor.get(ConditionalFormattingRuleModel);
    conditionalFormattingRuleModel.addRule(unitId, subUnitId, rule);
    return true;
  }
};

// ../packages/sheets-conditional-formatting/src/commands/commands/add-cf.command.ts
var AddCfCommand = {
  type: 0 /* COMMAND */,
  id: "sheet.command.add-conditional-rule",
  handler(accessor, params) {
    if (!params) {
      return false;
    }
    const { rule } = params;
    const undoRedoService = accessor.get(IUndoRedoService);
    const commandService = accessor.get(ICommandService);
    const conditionalFormattingRuleModel = accessor.get(ConditionalFormattingRuleModel);
    const univerInstanceService = accessor.get(IUniverInstanceService);
    const target = getSheetCommandTarget(univerInstanceService, params);
    if (!target) return false;
    const { unitId, subUnitId } = target;
    const cfId = conditionalFormattingRuleModel.createCfId(unitId, subUnitId);
    const config = { unitId, subUnitId, rule: { ...rule, cfId: rule.cfId || cfId } };
    const undo = AddConditionalRuleMutationUndoFactory(accessor, config);
    const result = commandService.syncExecuteCommand(AddConditionalRuleMutation.id, config);
    if (result) {
      undoRedoService.pushUndoRedo({
        unitID: unitId,
        redoMutations: [{ id: AddConditionalRuleMutation.id, params: config }],
        undoMutations: [undo]
      });
    }
    return result;
  }
};

// ../packages/sheets-conditional-formatting/src/commands/mutations/set-conditional-rule.mutation.ts
var SetConditionalRuleMutation = {
  type: 2 /* MUTATION */,
  id: "sheet.mutation.set-conditional-rule",
  handler(accessor, params) {
    if (!params) {
      return false;
    }
    const { unitId, subUnitId, rule } = params;
    const cfId = params.cfId || params.rule.cfId;
    const conditionalFormattingRuleModel = accessor.get(ConditionalFormattingRuleModel);
    conditionalFormattingRuleModel.setRule(unitId, subUnitId, rule, cfId);
    return true;
  }
};
var setConditionalRuleMutationUndoFactory = (accessor, param) => {
  const conditionalFormattingRuleModel = accessor.get(ConditionalFormattingRuleModel);
  const { unitId, subUnitId } = param;
  const cfId = param.cfId || param.rule.cfId;
  const rule = conditionalFormattingRuleModel.getRule(unitId, subUnitId, cfId);
  if (rule) {
    return [{
      id: SetConditionalRuleMutation.id,
      params: {
        unitId,
        subUnitId,
        cfId,
        rule: Tools.deepClone(rule)
      }
    }];
  }
  return [];
};

// ../packages/sheets-conditional-formatting/src/commands/commands/clear-range-cf.command.ts
var ClearRangeCfCommand = {
  type: 0 /* COMMAND */,
  id: "sheet.command.clear-range-conditional-rule",
  handler(accessor, params) {
    var _a;
    if (!params) {
      return false;
    }
    const conditionalFormattingRuleModel = accessor.get(ConditionalFormattingRuleModel);
    const univerInstanceService = accessor.get(IUniverInstanceService);
    const commandService = accessor.get(ICommandService);
    const undoRedoService = accessor.get(IUndoRedoService);
    const selectionManagerService = accessor.get(SheetsSelectionsService);
    const target = getSheetCommandTarget(univerInstanceService, params);
    if (!target) return false;
    const { unitId, subUnitId } = target;
    const ranges = ((_a = selectionManagerService.getCurrentSelections()) == null ? void 0 : _a.map((selection) => selection.range)) || [];
    const allRuleList = conditionalFormattingRuleModel.getSubunitRules(unitId, subUnitId);
    if (!(allRuleList == null ? void 0 : allRuleList.length) || !ranges.length) {
      return false;
    }
    const redos = [];
    const undos = [];
    allRuleList.forEach((oldRule) => {
      const matrix = new ObjectMatrix();
      oldRule.ranges.forEach((range) => {
        Range.foreach(range, (row, col) => {
          matrix.setValue(row, col, 1);
        });
      });
      ranges.forEach((range) => {
        Range.foreach(range, (row, col) => {
          matrix.realDeleteValue(row, col);
        });
      });
      const newRanges = findAllRectangle(createTopMatrixFromMatrix(matrix));
      if (newRanges.length) {
        const rule = { ...oldRule, ranges: newRanges };
        const params2 = { unitId, subUnitId, rule };
        const undo = setConditionalRuleMutationUndoFactory(accessor, params2);
        redos.push({ id: SetConditionalRuleMutation.id, params: params2 });
        undos.push(...undo);
      } else {
        const params2 = { unitId, subUnitId, cfId: oldRule.cfId };
        const undo = DeleteConditionalRuleMutationUndoFactory(accessor, params2);
        redos.push({ id: DeleteConditionalRuleMutation.id, params: params2 });
        undos.push(...undo);
      }
    });
    const result = sequenceExecute(redos, commandService).result;
    if (result) {
      undoRedoService.pushUndoRedo({
        unitID: unitId,
        redoMutations: redos,
        undoMutations: undos
      });
    }
    return result;
  }
};

// ../packages/sheets-conditional-formatting/src/commands/commands/clear-worksheet-cf.command.ts
var ClearWorksheetCfCommand = {
  type: 0 /* COMMAND */,
  id: "sheet.command.clear-worksheet-conditional-rule",
  handler(accessor, params) {
    const conditionalFormattingRuleModel = accessor.get(ConditionalFormattingRuleModel);
    const univerInstanceService = accessor.get(IUniverInstanceService);
    const commandService = accessor.get(ICommandService);
    const undoRedoService = accessor.get(IUndoRedoService);
    const target = getSheetCommandTarget(univerInstanceService, params);
    if (!target) return false;
    const { unitId, subUnitId } = target;
    const ruleList = conditionalFormattingRuleModel.getSubunitRules(unitId, subUnitId);
    if (!(ruleList == null ? void 0 : ruleList.length)) {
      return false;
    }
    const configList = ruleList.map((rule) => ({ cfId: rule.cfId, unitId, subUnitId }));
    const redos = configList.map((config) => ({ id: DeleteConditionalRuleMutation.id, params: config }));
    const undos = configList.map((config) => DeleteConditionalRuleMutationUndoFactory(accessor, config)[0]);
    const result = sequenceExecute(redos, commandService).result;
    if (result) {
      undoRedoService.pushUndoRedo({
        unitID: unitId,
        redoMutations: redos,
        undoMutations: undos
      });
    }
    return result;
  }
};

// ../packages/sheets-conditional-formatting/src/commands/commands/delete-cf.command.ts
var DeleteCfCommand = {
  type: 0 /* COMMAND */,
  id: "sheet.command.delete-conditional-rule",
  handler(accessor, params) {
    if (!params) {
      return false;
    }
    const undoRedoService = accessor.get(IUndoRedoService);
    const commandService = accessor.get(ICommandService);
    const univerInstanceService = accessor.get(IUniverInstanceService);
    const target = getSheetCommandTarget(univerInstanceService, params);
    if (!target) return false;
    const { unitId, subUnitId } = target;
    const config = { unitId, subUnitId, cfId: params.cfId };
    const undos = DeleteConditionalRuleMutationUndoFactory(accessor, config);
    const result = commandService.syncExecuteCommand(DeleteConditionalRuleMutation.id, config);
    if (result) {
      undoRedoService.pushUndoRedo({ unitID: unitId, undoMutations: undos, redoMutations: [{ id: DeleteConditionalRuleMutation.id, params: config }] });
    }
    return result;
  }
};

// ../packages/sheets-conditional-formatting/src/commands/commands/move-cf.command.ts
var MoveCfCommand = {
  type: 0 /* COMMAND */,
  id: "sheet.command.move-conditional-rule",
  handler(accessor, params) {
    if (!params) {
      return false;
    }
    const undoRedoService = accessor.get(IUndoRedoService);
    const commandService = accessor.get(ICommandService);
    const univerInstanceService = accessor.get(IUniverInstanceService);
    const conditionalFormattingRuleModel = accessor.get(ConditionalFormattingRuleModel);
    const target = getSheetCommandTarget(univerInstanceService, params);
    if (!target) return false;
    const { unitId, subUnitId } = target;
    const anchorList = transformSupportSymmetryAnchor(params.start, params.end, conditionalFormattingRuleModel.getSubunitRules(unitId, subUnitId) || [], (rule) => rule.cfId);
    if (!anchorList) {
      return false;
    }
    const [start, end] = anchorList;
    const config = { unitId, subUnitId, start, end };
    const undos = MoveConditionalRuleMutationUndoFactory(config);
    const result = commandService.syncExecuteCommand(MoveConditionalRuleMutation.id, config);
    if (result) {
      undoRedoService.pushUndoRedo({
        unitID: unitId,
        redoMutations: [{ id: MoveConditionalRuleMutation.id, params: config }],
        undoMutations: undos
      });
    }
    return result;
  }
};

// ../packages/sheets-conditional-formatting/src/commands/commands/set-cf.command.ts
var SetCfCommand = {
  type: 0 /* COMMAND */,
  id: "sheet.command.set-conditional-rule",
  handler(accessor, params) {
    if (!params) {
      return false;
    }
    const undoRedoService = accessor.get(IUndoRedoService);
    const commandService = accessor.get(ICommandService);
    const univerInstanceService = accessor.get(IUniverInstanceService);
    const target = getSheetCommandTarget(univerInstanceService, params);
    if (!target) return false;
    const { unitId, subUnitId } = target;
    const config = { unitId, subUnitId, rule: params.rule, cfId: params.cfId };
    const undos = setConditionalRuleMutationUndoFactory(accessor, config);
    const result = commandService.syncExecuteCommand(SetConditionalRuleMutation.id, config);
    if (result) {
      undoRedoService.pushUndoRedo({ unitID: unitId, undoMutations: undos, redoMutations: [{ id: SetConditionalRuleMutation.id, params: config }] });
    }
    return result;
  }
};

// ../packages/sheets-conditional-formatting/src/config/config.ts
var SHEETS_CONDITIONAL_FORMATTING_PLUGIN_CONFIG_KEY = "ssheets-conditional-formatting.config";
var configSymbol = Symbol(SHEETS_CONDITIONAL_FORMATTING_PLUGIN_CONFIG_KEY);
var defaultPluginConfig = {};

// ../packages/sheets-conditional-formatting/src/services/conditional-formatting-formula.service.ts
var ConditionalFormattingFormulaService = class extends Disposable {
  constructor(_registerOtherFormulaService, _conditionalFormattingRuleModel) {
    super();
    __publicField(this, "_registerOtherFormulaService", _registerOtherFormulaService);
    __publicField(this, "_conditionalFormattingRuleModel", _conditionalFormattingRuleModel);
    // Cache Formula ID and formula mapping.
    __publicField(this, "_formulaMap", /* @__PURE__ */ new Map());
    __publicField(this, "_result$", new Subject());
    __publicField(this, "result$", this._result$.asObservable());
    this._initFormulaResultChange();
    this._initRuleChange();
  }
  _initRuleChange() {
    const isNeedMarkFormulaDirty = (rule) => {
      switch (rule.type) {
        case "colorScale" /* colorScale */: {
          return rule.config.some((item) => item.value.type === "formula" /* formula */);
        }
        case "dataBar" /* dataBar */: {
          return [rule.config.max, rule.config.min].some((item) => item.type === "formula" /* formula */);
        }
        case "iconSet" /* iconSet */: {
          return rule.config.some((item) => item.value.type === "formula" /* formula */);
        }
      }
    };
    this.disposeWithMe(this._conditionalFormattingRuleModel.$ruleChange.subscribe((option) => {
      const { unitId, subUnitId, rule, oldRule } = option;
      if (option.type === "delete") {
        this._removeFormulaByCfId(unitId, subUnitId, rule.cfId);
      }
      if (option.type === "set") {
        if (isNeedMarkFormulaDirty(rule.rule) || oldRule && isNeedMarkFormulaDirty(oldRule.rule)) {
          this._removeFormulaByCfId(unitId, subUnitId, rule.cfId);
        }
      }
      if (option.type === "add") {
        this._registerRuleFormulas(unitId, subUnitId, rule);
      }
    }));
  }
  /**
   * Register formulas for a specific rule based on its type
   */
  _registerRuleFormulas(unitId, subUnitId, rule) {
    switch (rule.rule.type) {
      case "highlightCell" /* highlightCell */: {
        if (rule.rule.subType === "formula" /* formula */) {
          const formulaText = rule.rule.value;
          if (formulaText) {
            this.registerFormulaWithRange(
              unitId,
              subUnitId,
              rule.cfId,
              formulaText,
              rule.ranges
            );
          }
        }
        break;
      }
    }
  }
  _initFormulaResultChange() {
    this.disposeWithMe(this._registerOtherFormulaService.formulaResult$.subscribe((results) => {
      for (const unitId in results) {
        for (const subUnitId in results[unitId]) {
          const subUnitResults = results[unitId][subUnitId];
          for (const formulaResult of subUnitResults) {
            const formulaMapAlias = this._ensureSubunitFormulaMap(unitId, subUnitId).getValue(formulaResult.formulaId, ["formulaId"]);
            if (!formulaMapAlias) {
              continue;
            }
            const allFormulaMapAlias = this._getAllFormulaResultByCfId(unitId, subUnitId, formulaMapAlias.cfId);
            const isAllFinished = allFormulaMapAlias.every((item) => {
              const result = this._registerOtherFormulaService.getFormulaValueSync(unitId, subUnitId, item.formulaId);
              return (result == null ? void 0 : result.status) === 2 /* SUCCESS */;
            });
            this._result$.next({ ...formulaMapAlias, isAllFinished });
          }
        }
      }
    }));
  }
  _ensureSubunitFormulaMap(unitId, subUnitId) {
    let unitMap = this._formulaMap.get(unitId);
    if (!unitMap) {
      unitMap = /* @__PURE__ */ new Map();
      this._formulaMap.set(unitId, unitMap);
    }
    let subUnitMap = unitMap.get(subUnitId);
    if (!subUnitMap) {
      subUnitMap = new RefAlias([], ["formulaId", "id"]);
      unitMap.set(subUnitId, subUnitMap);
    }
    return subUnitMap;
  }
  getSubUnitFormulaMap(unitId, subUnitId) {
    var _a;
    return (_a = this._formulaMap.get(unitId)) == null ? void 0 : _a.get(subUnitId);
  }
  registerFormulaWithRange(unitId, subUnitId, cfId, formulaText, ranges = [{ startRow: 0, endRow: 0, startColumn: 0, endColumn: 0 }]) {
    const formulaMap = this._ensureSubunitFormulaMap(unitId, subUnitId);
    const cfFormulaId = this.createCFormulaId(cfId, formulaText);
    if (formulaMap.getValue(cfFormulaId, ["id"])) {
      return;
    }
    const sortedRanges = [...ranges].sort(
      (a, b) => a.startRow !== b.startRow ? a.startRow - b.startRow : a.startColumn - b.startColumn
    );
    const formulaId = this._registerOtherFormulaService.registerFormulaWithRange(unitId, subUnitId, formulaText, sortedRanges, void 0, "cf" /* CONDITIONAL_FORMATTING */, cfId);
    formulaMap.addValue({
      formulaText,
      unitId,
      subUnitId,
      cfId,
      id: cfFormulaId,
      formulaId
    });
  }
  _removeFormulaByCfId(unitId, subUnitId, cfId) {
    const values = this.deleteCache(unitId, subUnitId, cfId);
    const formulaIdList = values.map((item) => item.formulaId);
    this._registerOtherFormulaService.deleteFormula(unitId, subUnitId, formulaIdList);
  }
  getFormulaResultWithCoords(unitId, subUnitId, cfId, formulaText, row = 0, col = 0) {
    var _a;
    const map2 = this.getSubUnitFormulaMap(unitId, subUnitId);
    if (!map2) {
      return { status: 1 /* NOT_REGISTER */ };
    }
    const item = map2.getValue(this.createCFormulaId(cfId, formulaText), ["id"]);
    if (!item) {
      return { status: 1 /* NOT_REGISTER */ };
    }
    const formulaResult = this._registerOtherFormulaService.getFormulaValueSync(unitId, subUnitId, item.formulaId);
    if (!formulaResult) {
      return { status: 1 /* NOT_REGISTER */ };
    }
    if (formulaResult.status === 2 /* SUCCESS */ && formulaResult.result) {
      const cellData = (_a = formulaResult.result[row]) == null ? void 0 : _a[col];
      const result = this._getCellValue(cellData);
      return { result, status: 2 /* SUCCESS */ };
    }
    return { status: formulaResult.status };
  }
  getFormulaMatrix(unitId, subUnitId, cfId, formulaText) {
    const map2 = this.getSubUnitFormulaMap(unitId, subUnitId);
    if (!map2) {
      return { status: 1 /* NOT_REGISTER */ };
    }
    const item = map2.getValue(this.createCFormulaId(cfId, formulaText), ["id"]);
    if (!item) {
      return { status: 1 /* NOT_REGISTER */ };
    }
    const formulaResult = this._registerOtherFormulaService.getFormulaValueSync(unitId, subUnitId, item.formulaId);
    if (!formulaResult) {
      return { status: 1 /* NOT_REGISTER */ };
    }
    if (formulaResult.status === 2 /* SUCCESS */ && formulaResult.result) {
      const result = new ObjectMatrix();
      const resultMatrix = new ObjectMatrix(formulaResult.result);
      resultMatrix.forValue((row, col, cellData) => {
        result.setValue(row, col, this._getCellValue(cellData));
      });
      return { result, status: 2 /* SUCCESS */ };
    }
    return { status: formulaResult.status };
  }
  _getCellValue(cellData) {
    if (!cellData || !cellData[0] || !cellData[0][0]) {
      return false;
    }
    const cell = cellData[0][0];
    if ((cell == null ? void 0 : cell.t) === 3 /* BOOLEAN */) {
      return cell.v === 1 /* TRUE */ || cell.v === true;
    }
    return cell == null ? void 0 : cell.v;
  }
  /**
   * If `formulaText` is not provided, then all caches related to `cfId` will be deleted.
   */
  deleteCache(unitId, subUnitId, cfId, formulaText) {
    const map2 = this.getSubUnitFormulaMap(unitId, subUnitId);
    if (!map2) {
      return [];
    }
    if (formulaText) {
      const key = this.createCFormulaId(cfId, formulaText);
      map2.deleteValue(key, ["id"]);
      return [];
    } else {
      const values = map2.getValues().filter((v) => v.cfId === cfId);
      values.forEach((e) => {
        map2.deleteValue(e.formulaId, ["formulaId"]);
      });
      return values;
    }
  }
  _getAllFormulaResultByCfId(unitId, subUnitId, cfId) {
    const map2 = this.getSubUnitFormulaMap(unitId, subUnitId);
    if (!map2) {
      return [];
    }
    const values = map2.getValues().filter((v) => v.cfId === cfId);
    return values;
  }
  /**
   * A conditional formatting may have multiple formulas;if the formulas are identical,then the results will be consistent.
   */
  createCFormulaId(cfId, formulaText) {
    return `${cfId}_${formulaText}`;
  }
};
ConditionalFormattingFormulaService = __decorateClass([
  __decorateParam(0, Inject(RegisterOtherFormulaService)),
  __decorateParam(1, Inject(ConditionalFormattingRuleModel))
], ConditionalFormattingFormulaService);

// ../packages/sheets-conditional-formatting/src/models/calculate-unit-v2/base-calculate-unit.ts
var BaseCalculateUnit = class {
  constructor(_context) {
    __publicField(this, "_context", _context);
    /**
     * 3nd-level cache
     */
    __publicField(this, "_cache");
    __publicField(this, "_preComputingStatus$", new BehaviorSubject("preComputingStart" /* preComputingStart */));
    __publicField(this, "preComputingStatus$", this._preComputingStatus$.asObservable().pipe(distinctUntilChanged()));
    /**
     * 2nd-level cache
     */
    __publicField(this, "_preComputingCache");
    __publicField(this, "_rule");
    this._cache = new LRUMap(_context.limit);
    this._rule = _context.rule;
    this._preComputingCache = null;
    this._initClearCacheListener();
  }
  setCacheLength(length) {
    this._cache.limit = length;
  }
  clearCache() {
    this._cache.clear();
  }
  resetPreComputingCache() {
    this._preComputingStatus$.next("preComputingStart" /* preComputingStart */);
    this._preComputingCache = null;
  }
  updateRule(rule) {
    this._rule = rule;
    this.resetPreComputingCache();
  }
  getCell(row, col) {
    const key = this._createKey(row, col);
    if (this._preComputingStatus$.getValue() === "preComputing" /* preComputing */) {
      return this._cache.get(key);
    }
    let preComputingResult = this.getPreComputingResult(row, col);
    if (preComputingResult === null) {
      this._preComputingStatus$.next("preComputingStart" /* preComputingStart */);
      this.preComputing(row, col, this._getContext());
      preComputingResult = this.getPreComputingResult(row, col);
      if (preComputingResult === null) {
        return this._cache.get(key);
      }
    }
    this._preComputingStatus$.next("preComputingEnd" /* preComputingEnd */);
    if (this._cache.has(key)) {
      return this._cache.get(key);
    }
    const result = this.getCellResult(row, col, preComputingResult, this._getContext());
    if (result !== null) {
      this._setCache(row, col, result);
    }
    return result;
  }
  setPreComputingCache(v) {
    this._preComputingCache = v;
  }
  getPreComputingResult(_row, _col) {
    return this._preComputingCache;
  }
  _createKey(row, col) {
    return `${row}_${col}`;
  }
  _setCache(row, col, v) {
    const key = this._createKey(row, col);
    this._cache.set(key, v);
  }
  _getContext() {
    return { ...this._context, rule: this._rule };
  }
  _initClearCacheListener() {
    this.preComputingStatus$.subscribe((e) => {
      if (e === "preComputingEnd" /* preComputingEnd */) {
        this.clearCache();
      }
    });
  }
};

// ../packages/sheets-conditional-formatting/src/models/calculate-unit-v2/utils.ts
function isFloatsEqual(a, b) {
  return Math.abs(a - b) < Number.EPSILON;
}
var isNullable = (v) => v === null || v === void 0 || typeof v === "string" && v.trim() === "";
var getCellValue = (cell) => {
  var _a, _b;
  if (!cell) {
    return null;
  }
  if (cell.t === 3 /* BOOLEAN */) {
    return cell.v === 1 /* TRUE */ ? "TRUE" /* TRUE */ : "FALSE" /* FALSE */;
  }
  const v = cell.v;
  const dataStream = (_b = (_a = cell.p) == null ? void 0 : _a.body) == null ? void 0 : _b.dataStream.replace(/\r\n$/, "");
  return !isNullable(v) ? v : !isNullable(dataStream) ? dataStream : null;
};
var DAY_SIZE = 86400;
function toYMD_1900(ord, leap1900 = true) {
  if (leap1900 && ord >= 0) {
    if (ord === 0) {
      return [1900, 1, 0];
    }
    if (ord === 60) {
      return [1900, 2, 29];
    }
    if (ord < 60) {
      return [1900, ord < 32 ? 1 : 2, (ord - 1) % 31 + 1];
    }
  }
  let l = ord + 68569 + 2415019;
  const n = Math.floor(4 * l / 146097);
  l = l - Math.floor((146097 * n + 3) / 4);
  const i = Math.floor(4e3 * (l + 1) / 1461001);
  l = l - Math.floor(1461 * i / 4) + 31;
  const j = Math.floor(80 * l / 2447);
  const nDay = l - Math.floor(2447 * j / 80);
  l = Math.floor(j / 11);
  const nMonth = j + 2 - 12 * l;
  const nYear = 100 * (n - 49) + i + l;
  return [nYear | 0, nMonth | 0, nDay | 0];
}
var serialTimeToTimestamp = (value) => {
  let date = value | 0;
  const t = DAY_SIZE * (value - date);
  let time = Math.floor(t);
  if (t - time > 0.9999) {
    time += 1;
    if (time === DAY_SIZE) {
      time = 0;
      date += 1;
    }
  }
  const x = time < 0 ? DAY_SIZE + time : time;
  const [y, m, d] = toYMD_1900(value, true);
  const hh = Math.floor(x / 60 / 60) % 60;
  const mm = Math.floor(x / 60) % 60;
  const ss = Math.floor(x) % 60;
  const dt = dateKit(`${y}/${m}/${d} ${hh}:${mm}:${ss}`);
  const result = dt.valueOf();
  return result;
};
var getValueByType = (value, matrix, context) => {
  switch (value.type) {
    case "max" /* max */: {
      let max = 0;
      matrix.forValue((row, col, value2) => {
        if (value2 > max) {
          max = value2;
        }
      });
      return {
        status: 2 /* SUCCESS */,
        result: max
      };
    }
    case "min" /* min */: {
      let min;
      matrix.forValue((row, col, value2) => {
        if (min === void 0) {
          min = value2;
        }
        if (value2 < min) {
          min = value2;
        }
      });
      return {
        status: 2 /* SUCCESS */,
        result: min
      };
    }
    case "percent" /* percent */: {
      let max;
      let min;
      matrix.forValue((row, col, value2) => {
        if (max === void 0 || min === void 0) {
          max = value2;
          min = value2;
        }
        if (value2 > max) {
          max = value2;
        }
        if (value2 < min) {
          min = value2;
        }
      });
      const length = (max || 0) - (min || 0);
      const v = Math.max(Math.min(Number(value.value) || 0, 100), 0);
      return {
        status: 2 /* SUCCESS */,
        result: length * (v / 100) + (min || 0)
      };
    }
    case "percentile" /* percentile */: {
      const list = matrix.toNativeArray().sort((a, b) => a - b);
      const v = Math.max(Math.min(Number(value.value) || 0, 100), 0);
      const index = (list.length - 1) * v / 100;
      const intIndex = Math.floor(index);
      const decimalIndex = index - intIndex;
      const result = list[intIndex] + (list[Math.min(intIndex + 1, list.length - 1)] - list[intIndex]) * decimalIndex;
      return {
        status: 2 /* SUCCESS */,
        result
      };
    }
    case "formula" /* formula */: {
      const { accessor, unitId, subUnitId, cfId } = context;
      const formulaText = String(value.value);
      const conditionalFormattingFormulaService = accessor.get(ConditionalFormattingFormulaService);
      conditionalFormattingFormulaService.registerFormulaWithRange(unitId, subUnitId, cfId, formulaText);
      const result = conditionalFormattingFormulaService.getFormulaResultWithCoords(unitId, subUnitId, cfId, formulaText);
      return result;
    }
    case "num" /* num */:
    default: {
      const v = Number(value.value);
      return {
        status: 2 /* SUCCESS */,
        result: Number.isNaN(v) ? 0 : v
      };
    }
  }
};
var compareWithNumber = (config, v) => {
  switch (config.operator) {
    case "between" /* between */: {
      if (typeof config.value !== "object" || !config.value.length) {
        return;
      }
      const start = Math.min(...config.value);
      const end = Math.max(...config.value);
      return v >= start && v <= end;
    }
    case "notBetween" /* notBetween */: {
      if (typeof config.value !== "object" || !config.value.length) {
        return;
      }
      const start = Math.min(...config.value);
      const end = Math.max(...config.value);
      return !(v >= start && v <= end);
    }
    case "equal" /* equal */: {
      const condition = config.value || 0;
      return isFloatsEqual(condition, v);
    }
    case "notEqual" /* notEqual */: {
      const condition = config.value || 0;
      return !isFloatsEqual(condition, v);
    }
    case "greaterThan" /* greaterThan */: {
      const condition = config.value || 0;
      return v > condition;
    }
    case "greaterThanOrEqual" /* greaterThanOrEqual */: {
      const condition = config.value || 0;
      return v >= condition;
    }
    case "lessThan" /* lessThan */: {
      const condition = config.value || 0;
      return v < condition;
    }
    case "lessThanOrEqual" /* lessThanOrEqual */: {
      const condition = config.value || 0;
      return v <= condition;
    }
    default: {
      return false;
    }
  }
};
var getOppositeOperator = (operator) => {
  switch (operator) {
    case "greaterThan" /* greaterThan */: {
      return "lessThanOrEqual" /* lessThanOrEqual */;
    }
    case "greaterThanOrEqual" /* greaterThanOrEqual */: {
      return "lessThan" /* lessThan */;
    }
    case "lessThan" /* lessThan */: {
      return "greaterThanOrEqual" /* greaterThanOrEqual */;
    }
    case "lessThanOrEqual" /* lessThanOrEqual */: {
      return "greaterThan" /* greaterThan */;
    }
  }
  return operator;
};
var getColorScaleFromValue = (colorList, value) => {
  const prefixRgba = (rgb) => {
    if (rgb.a !== void 0) {
      return rgb;
    } else {
      return { ...rgb, a: 1 };
    }
  };
  const index = colorList.findIndex((item) => item.value >= value);
  const preIndex = index - 1;
  if (index === 0) {
    return colorList[0].color.toRgbString();
  } else if (preIndex >= 0) {
    const minItem = colorList[preIndex];
    const maxItem = colorList[index];
    if (minItem.color.isValid && maxItem.color.isValid) {
      const minRgb = prefixRgba(minItem.color.toRgb());
      const maxRgb = prefixRgba(maxItem.color.toRgb());
      const length = maxItem.value - minItem.value;
      const v = (value - minItem.value) / length;
      const rgbResult = ["r", "g", "b", "a"].reduce((obj, key) => {
        const minV = minRgb[key];
        obj[key] = (maxRgb[key] - minV) * v + minV;
        return obj;
      }, {});
      const result = new ColorKit(rgbResult).toRgbString();
      return result;
    }
  } else {
    return colorList[colorList.length - 1].color.toRgbString();
  }
};
var filterRange = (ranges, maxRow, maxCol) => {
  return ranges.map((range) => {
    if (range.startColumn > maxCol || range.startRow > maxRow) {
      return null;
    }
    const _range = { ...range };
    _range.endRow = Math.min(_range.endRow, maxRow);
    _range.endColumn = Math.min(_range.endColumn, maxCol);
    return _range;
  }).filter((range) => !!range);
};

// ../packages/sheets-conditional-formatting/src/models/calculate-unit-v2/color-scale-calculate-unit.ts
var ColorScaleCalculateUnit = class extends BaseCalculateUnit {
  preComputing(_row, _col, context) {
    const rule = context.rule;
    const worksheet = context.worksheet;
    const matrix = new ObjectMatrix();
    const isNeedMatrix = !rule.rule.config.every((item) => item.value.type === "num" /* num */);
    if (isNeedMatrix) {
      const ranges = filterRange(rule.ranges, worksheet.getMaxRows() - 1, worksheet.getMaxColumns() - 1);
      ranges.forEach((range) => {
        Range.foreach(range, (row, col) => {
          const cell = context.getCellValue(row, col);
          const v = cell && cell.v;
          if (!isNullable(v) && (cell == null ? void 0 : cell.t) === 2 /* NUMBER */) {
            const _value = Number(v);
            !Number.isNaN(_value) && matrix.setValue(row, col, _value);
          }
        });
      });
    }
    const _configList = [...rule.rule.config].sort((a, b) => a.index - b.index).map((config) => {
      return {
        value: getValueByType(config.value, matrix, {
          ...context,
          cfId: rule.cfId
        }),
        color: new ColorKit(config.color)
      };
    });
    const isAllFinished = !_configList.some((item) => isObject(item.value) ? item.value.status !== 2 /* SUCCESS */ : false);
    if (isAllFinished) {
      const colorList = _configList.map((item) => item.color).reduce((result, color, index) => {
        result.result.push({ color, value: result.sortValue[index] });
        return result;
      }, {
        result: [],
        sortValue: _configList.map((item) => item.value.result).sort((a, b) => a - b)
      }).result;
      this.setPreComputingCache(colorList);
      this._preComputingStatus$.next("preComputingEnd" /* preComputingEnd */);
      return;
    }
    this._preComputingStatus$.next("preComputing" /* preComputing */);
  }
  getCellResult(row, col, preComputingResult, context) {
    if (!preComputingResult) {
      return null;
    }
    const cell = context.getCellValue(row, col);
    if (cell.t === 2 /* NUMBER */) {
      const v = Number(cell.v);
      if (!Number.isNaN(v)) {
        const color = getColorScaleFromValue(preComputingResult, v);
        return color;
      }
    }
    return void 0;
  }
};

// ../packages/sheets-conditional-formatting/src/render/data-bar.render.ts
var dataBarUKey = "sheet-conditional-rule-data-bar";
var defaultDataBarPositiveColor = "#ffbe38";
var defaultDataBarNativeColor = "#abd91a";
var defaultPlaceholderColor = "#000";
var EXTENSION_Z_INDEX = 34;
var stringifyRange = (range) => {
  const { startRow, endRow, startColumn, endColumn } = range;
  return `${startRow}-${endRow}-${startColumn}-${endColumn}`;
};
var DataBar = class extends SheetExtension {
  constructor() {
    super(...arguments);
    __publicField(this, "_paddingRightAndLeft", 2);
    __publicField(this, "_paddingTopAndBottom", 2);
    __publicField(this, "uKey", dataBarUKey);
    __publicField(this, "Z_INDEX", EXTENSION_Z_INDEX);
    __publicField(this, "_radius", 1);
  }
  // eslint-disable-next-line max-lines-per-function
  draw(ctx, _parentScale, spreadsheetSkeleton, diffRanges) {
    const { worksheet } = spreadsheetSkeleton;
    if (!worksheet) {
      return false;
    }
    const mergeCellRendered = /* @__PURE__ */ new Set();
    ctx.save();
    Range.foreach(spreadsheetSkeleton.rowColumnSegment, (row, col) => {
      if (!worksheet.getRowVisible(row) || !worksheet.getColVisible(col)) {
        return;
      }
      const primaryWithCoord = spreadsheetSkeleton.getCellWithCoordByIndex(row, col, false);
      const { isMerged, isMergedMainCell, mergeInfo } = primaryWithCoord;
      let cellData = worksheet.getCell(row, col);
      if (isMerged) {
        cellData = worksheet.getCell(mergeInfo.startRow, mergeInfo.startColumn);
      }
      if (!(cellData == null ? void 0 : cellData.dataBar)) {
        return;
      }
      if (!this.isRenderDiffRangesByCell(mergeInfo, diffRanges)) {
        return;
      }
      if (isMerged || isMergedMainCell) {
        const rangeStr = stringifyRange(mergeInfo);
        if (mergeCellRendered.has(rangeStr)) {
          return;
        }
        mergeCellRendered.add(rangeStr);
      }
      const { color, value, startPoint, isGradient } = cellData.dataBar;
      const { startX, endX, startY, endY } = isMerged || isMergedMainCell ? mergeInfo : primaryWithCoord;
      const borderWidth = endX - startX;
      const borderHeight = endY + FIX_ONE_PIXEL_BLUR_OFFSET - startY;
      const width = borderWidth - this._paddingRightAndLeft * 2;
      const height = borderHeight - this._paddingTopAndBottom * 2;
      if (value > 0) {
        const dataBarWidth = Math.max(width * (1 - startPoint / 100) * value / 100, 1);
        const x0 = startX + this._paddingRightAndLeft + startPoint / 100 * width;
        const y0 = startY + this._paddingTopAndBottom;
        if (isGradient) {
          const gradient = ctx.createLinearGradient(x0, y0, x0 + dataBarWidth, y0);
          gradient.addColorStop(0, color);
          gradient.addColorStop(1, "rgb(255 255 255)");
          ctx.fillStyle = gradient;
          ctx.strokeStyle = color;
          ctx.lineWidth = 1;
        } else {
          ctx.fillStyle = color;
        }
        this._drawRectWithRoundedCorner(ctx, x0, y0, dataBarWidth, height, false, true, true, false);
        if (isGradient) {
          ctx.stroke();
        }
      } else {
        const dataBarWidth = Math.max(width * startPoint / 100 * Math.abs(value) / 100, 1);
        const x0 = startX + this._paddingRightAndLeft + startPoint / 100 * width - dataBarWidth;
        const y0 = startY + this._paddingTopAndBottom;
        if (isGradient) {
          const gradient = ctx.createLinearGradient(x0, y0, x0 + dataBarWidth, y0);
          gradient.addColorStop(0, "rgb(255 255 255)");
          gradient.addColorStop(1, color);
          ctx.fillStyle = gradient;
          ctx.strokeStyle = color;
          ctx.lineWidth = 1;
        } else {
          ctx.fillStyle = color;
        }
        this._drawRectWithRoundedCorner(ctx, x0, y0, dataBarWidth, height, true, false, false, true);
        if (isGradient) {
          ctx.stroke();
        }
      }
    });
    ctx.restore();
  }
  _drawRectWithRoundedCorner(ctx, x, y, width, height, topLeftRadius, topRightRadius, bottomRightRadius, bottomLeftRadius) {
    const radius = this._radius;
    if (!height || !width) {
      return;
    }
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    if (topRightRadius) {
      ctx.arcTo(x + width, y, x + width, y + radius, radius);
    } else {
      ctx.lineTo(x + width, y);
    }
    ctx.lineTo(x + width, y + height - radius);
    if (bottomRightRadius) {
      ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    } else {
      ctx.lineTo(x + width, y + height);
    }
    ctx.lineTo(x + radius, y + height);
    if (bottomLeftRadius) {
      ctx.arcTo(x, y + height, x, y + height - radius, radius);
    } else {
      ctx.lineTo(x, y + height);
    }
    ctx.lineTo(x, y + radius);
    if (topLeftRadius) {
      ctx.arcTo(x, y, x + radius, y, radius);
    } else {
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  }
};
SpreadsheetExtensionRegistry.add(DataBar);

// ../packages/sheets-conditional-formatting/src/models/calculate-unit-v2/data-bar-calculate-unit.ts
var getSafeValue = (v) => Math.max(Math.min(100, v), 0);
var getValue = (row, col, getCell) => {
  const cell = getCell(row, col);
  if (cell && cell.t === 2 /* NUMBER */) {
    const value = Number(cell.v);
    return Number.isNaN(value) ? null : value;
  }
  return null;
};
var DataBarCalculateUnit = class extends BaseCalculateUnit {
  preComputing(row, col, context) {
    const rule = context.rule;
    const ruleConfig = rule.rule;
    const worksheet = context.worksheet;
    const matrix = new ObjectMatrix();
    const isNeedMatrix = ![rule.rule.config.max, rule.rule.config.min].every((e) => e.type === "num" /* num */);
    if (isNeedMatrix) {
      const ranges = filterRange(rule.ranges, worksheet.getMaxRows() - 1, worksheet.getMaxColumns() - 1);
      ranges.forEach((range) => {
        Range.foreach(range, (row2, col2) => {
          const cell = context.getCellValue(row2, col2);
          const v = cell && cell.v;
          if (!isNullable(v) && (cell == null ? void 0 : cell.t) === 2 /* NUMBER */) {
            const _value = Number(v);
            !Number.isNaN(_value) && matrix.setValue(row2, col2, _value);
          }
        });
      });
    }
    const _min = getValueByType(ruleConfig.config.min, matrix, { ...context, cfId: rule.cfId });
    const _max = getValueByType(ruleConfig.config.max, matrix, { ...context, cfId: rule.cfId });
    let min = 0;
    let max = 0;
    if (_min.status === 2 /* SUCCESS */) {
      const v = Number(_min.result);
      min = Number.isNaN(v) ? 0 : v;
    } else {
      this._preComputingStatus$.next("preComputing" /* preComputing */);
      return;
    }
    if (_max.status === 2 /* SUCCESS */) {
      const maxResult = Number(_max.result);
      const v = Number.isNaN(maxResult) ? 0 : maxResult;
      max = Math.max(v, min);
      min = Math.min(v, min);
      let startPoint = 50;
      if (min < 0 && max <= 0) {
        startPoint = 100;
      } else if (min < 0 && max > 0) {
        const length = Math.abs(max) + Math.abs(min);
        startPoint = Math.abs(min) / length * 100;
      } else if (min >= 0 && max > 0) {
        startPoint = 0;
      }
      this.setPreComputingCache({ min, max, startPoint });
      this._preComputingStatus$.next("preComputingEnd" /* preComputingEnd */);
      return;
    }
    this._preComputingStatus$.next("preComputing" /* preComputing */);
  }
  // eslint-disable-next-line complexity
  getCellResult(row, col, preComputingResult, context) {
    const { min, max, startPoint } = preComputingResult;
    const rule = context.rule;
    const ruleConfig = rule.rule;
    const isShowValue = ruleConfig.isShowValue;
    const isGradient = ruleConfig.config.isGradient;
    const value = getValue(row, col, context.getCellValue);
    if (value === null || value < min || (min === max || max < min)) {
      return void 0;
    }
    if (value === 0) {
      return { color: defaultPlaceholderColor, startPoint, value: 0, isGradient, isShowValue };
    }
    if (min < 0 && max <= 0) {
      const length = max - min;
      const v = getSafeValue((max - value) / length * 100);
      if (v === 0) {
        return void 0;
      }
      return { color: ruleConfig.config.nativeColor || defaultDataBarNativeColor, startPoint, value: -v, isGradient, isShowValue };
    } else if (min < 0 && max > 0) {
      if (value > 0) {
        const v = getSafeValue(Math.min(value / max, 1) * 100);
        if (v === 0) {
          return void 0;
        }
        return { color: ruleConfig.config.positiveColor || defaultDataBarPositiveColor, startPoint, value: v, isGradient, isShowValue };
      } else {
        const v = getSafeValue(Math.min(Math.abs(value) / Math.abs(min), 1) * 100);
        if (v === 0) {
          return void 0;
        }
        return { color: ruleConfig.config.nativeColor || defaultDataBarNativeColor, startPoint, value: -v, isGradient, isShowValue };
      }
    } else if (min >= 0 && max > 0) {
      const length = max - min;
      const startPoint2 = 0;
      const v = getSafeValue((1 - (max - value) / length) * 100);
      if (v === 0) {
        return void 0;
      }
      return { color: ruleConfig.config.positiveColor || defaultDataBarPositiveColor, startPoint: startPoint2, value: v, isGradient, isShowValue };
    }
  }
};

// ../packages/sheets-conditional-formatting/src/models/calculate-unit-v2/highlight-cell-calculate-unit.ts
var isFormulaResultMatched = (value) => value === true || value === 1 || value === "TRUE";
var sortRangesByTopLeft = (ranges) => [...ranges].sort((a, b) => {
  if (a.startRow !== b.startRow) {
    return a.startRow - b.startRow;
  }
  return a.startColumn - b.startColumn;
});
var HighlightCellCalculateUnit = class extends BaseCalculateUnit {
  // eslint-disable-next-line max-lines-per-function
  preComputing(row, col, context) {
    const ruleConfig = context.rule.rule;
    const ranges = filterRange(context.rule.ranges, context.worksheet.getMaxRows() - 1, context.worksheet.getMaxColumns() - 1);
    const getCache = () => {
      switch (ruleConfig.subType) {
        case "average" /* average */: {
          let sum = 0;
          let count = 0;
          ranges.forEach((range) => {
            Range.foreach(range, (row2, col2) => {
              const cell = context.getCellValue(row2, col2);
              const v = getCellValue(cell);
              if (cell && cell.t === 2 /* NUMBER */ && !isNullable(v)) {
                sum += Number(v) || 0;
                count++;
              }
            });
          });
          return { value: sum / count, type: ruleConfig.subType };
        }
        case "uniqueValues" /* uniqueValues */:
        case "duplicateValues" /* duplicateValues */: {
          const cacheMap = /* @__PURE__ */ new Map();
          ranges.forEach((range) => {
            Range.foreach(range, (row2, col2) => {
              const cell = context.getCellValue(row2, col2);
              const v = getCellValue(cell);
              if (!isNullable(v)) {
                const cache = cacheMap.get(v);
                if (cache) {
                  cacheMap.set(v, cache + 1);
                } else {
                  cacheMap.set(v, 1);
                }
              }
            });
          });
          return { value: cacheMap, type: ruleConfig.subType };
        }
        case "rank" /* rank */: {
          let allValue = [];
          ranges.forEach((range) => {
            Range.foreach(range, (row2, col2) => {
              const cell = context.getCellValue(row2, col2);
              const v = getCellValue(cell);
              if (cell && cell.t === 2 /* NUMBER */ && !isNullable(v)) {
                allValue.push(Number(v) || 0);
              }
            });
          });
          allValue.sort((a, b) => b - a);
          const configRule = context.rule.rule;
          if (configRule.isPercent) {
            if (configRule.isBottom) {
              allValue = allValue.toReversed();
            }
            const threshold = Tools.clamp(configRule.value, 0, 100) / 100;
            const targetIndex2 = Math.floor(threshold * allValue.length);
            const safeIndex = Tools.clamp(targetIndex2 - 1, 0, allValue.length - 1);
            return { value: allValue[safeIndex], type: ruleConfig.subType };
          }
          const targetIndex = Math.floor(Tools.clamp(configRule.isBottom ? configRule.value - 1 : configRule.value, 0, allValue.length));
          if (configRule.isBottom) {
            return { value: allValue[allValue.length - targetIndex - 1], type: ruleConfig.subType };
          } else {
            return { value: allValue[Math.max(targetIndex - 1, 0)], type: ruleConfig.subType };
          }
        }
        case "formula" /* formula */: {
          const _ruleConfig = ruleConfig;
          const conditionalFormattingFormulaService = context.accessor.get(ConditionalFormattingFormulaService);
          const normalizedRanges = sortRangesByTopLeft(context.rule.ranges);
          conditionalFormattingFormulaService.registerFormulaWithRange(context.unitId, context.subUnitId, context.rule.cfId, _ruleConfig.value, normalizedRanges);
          const result2 = conditionalFormattingFormulaService.getFormulaMatrix(context.unitId, context.subUnitId, context.rule.cfId, _ruleConfig.value);
          if (result2 && result2.status === 2 /* SUCCESS */) {
            this._preComputingStatus$.next("preComputingEnd" /* preComputingEnd */);
            return {
              value: result2.result,
              type: ruleConfig.subType
            };
          } else {
            this._preComputingStatus$.next("preComputing" /* preComputing */);
          }
          return null;
        }
        case "timePeriod" /* timePeriod */: {
          const subRuleConfig = ruleConfig;
          switch (subRuleConfig.operator) {
            case "last7Days" /* last7Days */: {
              return {
                value: {
                  start: dateKit().subtract(7, "day").valueOf(),
                  end: dateKit().valueOf()
                },
                type: ruleConfig.subType
              };
            }
            case "lastMonth" /* lastMonth */: {
              return {
                value: {
                  start: dateKit().startOf("month").subtract(1, "month").valueOf(),
                  end: dateKit().endOf("month").subtract(1, "month").valueOf()
                },
                type: ruleConfig.subType
              };
            }
            case "lastWeek" /* lastWeek */: {
              return {
                value: {
                  start: dateKit().startOf("week").subtract(1, "week").valueOf(),
                  end: dateKit().endOf("week").subtract(1, "week").valueOf()
                },
                type: ruleConfig.subType
              };
            }
            case "nextMonth" /* nextMonth */: {
              return {
                value: {
                  start: dateKit().startOf("month").add(1, "month").valueOf(),
                  end: dateKit().endOf("month").add(1, "month").valueOf()
                },
                type: ruleConfig.subType
              };
            }
            case "nextWeek" /* nextWeek */: {
              return {
                value: {
                  start: dateKit().startOf("week").add(1, "week").valueOf(),
                  end: dateKit().endOf("week").add(1, "week").valueOf()
                },
                type: ruleConfig.subType
              };
            }
            case "thisMonth" /* thisMonth */: {
              return {
                value: {
                  start: dateKit().startOf("month").valueOf(),
                  end: dateKit().endOf("month").valueOf()
                },
                type: ruleConfig.subType
              };
            }
            case "thisWeek" /* thisWeek */: {
              return {
                value: {
                  start: dateKit().startOf("week").valueOf(),
                  end: dateKit().endOf("week").valueOf()
                },
                type: ruleConfig.subType
              };
            }
            case "today" /* today */: {
              return {
                value: {
                  start: dateKit().startOf("day").valueOf(),
                  end: dateKit().endOf("day").valueOf()
                },
                type: ruleConfig.subType
              };
            }
            case "tomorrow" /* tomorrow */: {
              return {
                value: {
                  start: dateKit().startOf("day").add(1, "day").valueOf(),
                  end: dateKit().endOf("day").add(1, "day").valueOf()
                },
                type: ruleConfig.subType
              };
            }
            case "yesterday" /* yesterday */: {
              return {
                value: {
                  start: dateKit().startOf("day").subtract(1, "day").valueOf(),
                  end: dateKit().endOf("day").subtract(1, "day").valueOf()
                },
                type: ruleConfig.subType
              };
            }
          }
        }
      }
    };
    const result = getCache();
    this.setPreComputingCache(result);
  }
  // eslint-disable-next-line max-lines-per-function
  getCellResult(row, col, preComputingResult, context) {
    const cellValue = context.getCellValue(row, col);
    const ruleConfig = context.rule.rule;
    const run = () => {
      switch (ruleConfig.subType) {
        case "number" /* number */: {
          const v = cellValue && Number(cellValue.v);
          const isNumber = (cellValue == null ? void 0 : cellValue.t) === 2 /* NUMBER */;
          const subRuleConfig = ruleConfig;
          if (!isNumber) {
            if (["notEqual" /* notEqual */, "notBetween" /* notBetween */].includes(subRuleConfig.operator)) {
              return true;
            }
            return false;
          }
          if (isNullable(v) || Number.isNaN(v)) {
            return;
          }
          return compareWithNumber({ operator: subRuleConfig.operator, value: subRuleConfig.value || 0 }, v || 0);
        }
        case "text" /* text */: {
          const subRuleConfig = ruleConfig;
          const value = getCellValue(cellValue);
          const v = isNullable(value) ? "" : String(value);
          const condition = subRuleConfig.value || "";
          switch (subRuleConfig.operator) {
            case "beginsWith" /* beginsWith */: {
              return v.startsWith(condition);
            }
            case "containsBlanks" /* containsBlanks */: {
              return /^\s*$/.test(v);
            }
            case "notContainsBlanks" /* notContainsBlanks */: {
              return !/^\s*$/.test(v);
            }
            case "containsErrors" /* containsErrors */: {
              return ERROR_TYPE_SET.has(v);
            }
            case "notContainsErrors" /* notContainsErrors */: {
              return !ERROR_TYPE_SET.has(v);
            }
            case "containsText" /* containsText */: {
              return v.indexOf(condition) > -1;
            }
            case "notContainsText" /* notContainsText */: {
              return v.indexOf(condition) === -1;
            }
            case "endsWith" /* endsWith */: {
              return v.endsWith(condition);
            }
            case "equal" /* equal */: {
              return v === condition;
            }
            case "notEqual" /* notEqual */: {
              return v !== condition;
            }
            default: {
              return false;
            }
          }
        }
        case "timePeriod" /* timePeriod */: {
          const value = getCellValue(cellValue);
          if (isNullable(value) || Number.isNaN(Number(value)) || (cellValue == null ? void 0 : cellValue.t) !== 2 /* NUMBER */ || !preComputingResult) {
            return;
          }
          const v = serialTimeToTimestamp(Number(value));
          const { start, end } = preComputingResult.value;
          return v >= start && v <= end;
        }
        case "average" /* average */: {
          const value = cellValue && cellValue.v;
          const v = Number(value);
          const isNumber = (cellValue == null ? void 0 : cellValue.t) === 2 /* NUMBER */;
          const subRuleConfig = ruleConfig;
          if (!isNumber) {
            if ("notEqual" /* notEqual */ === subRuleConfig.operator) {
              return true;
            }
            return false;
          }
          if (isNullable(value) || Number.isNaN(v) || !preComputingResult) {
            return false;
          }
          const average = preComputingResult.value;
          switch (subRuleConfig.operator) {
            case "greaterThan" /* greaterThan */: {
              return v > average;
            }
            case "greaterThanOrEqual" /* greaterThanOrEqual */: {
              return v >= average;
            }
            case "lessThan" /* lessThan */: {
              return v < average;
            }
            case "lessThanOrEqual" /* lessThanOrEqual */: {
              return v <= average;
            }
            case "equal" /* equal */: {
              return isFloatsEqual(v, average);
            }
            case "notEqual" /* notEqual */: {
              return !isFloatsEqual(v, average);
            }
            default: {
              return false;
            }
          }
        }
        case "rank" /* rank */: {
          const value = getCellValue(cellValue);
          const v = Number(value);
          if (isNullable(value) || Number.isNaN(v) || (cellValue == null ? void 0 : cellValue.t) !== 2 /* NUMBER */ || !preComputingResult) {
            return false;
          }
          const targetValue = preComputingResult.value;
          const subRuleConfig = ruleConfig;
          if (subRuleConfig.isBottom) {
            return v <= targetValue;
          } else {
            return v >= targetValue;
          }
        }
        case "uniqueValues" /* uniqueValues */: {
          const value = getCellValue(cellValue);
          if (isNullable(value) || !preComputingResult) {
            return false;
          }
          const uniqueCache = preComputingResult.value;
          return uniqueCache.get(value) === 1;
        }
        case "duplicateValues" /* duplicateValues */: {
          const value = getCellValue(cellValue);
          if (isNullable(value) || !preComputingResult) {
            return false;
          }
          const uniqueCacheValue = preComputingResult.value.get(value);
          return uniqueCacheValue && uniqueCacheValue !== 1;
        }
        case "formula" /* formula */: {
          const _ruleConfig = ruleConfig;
          const conditionalFormattingFormulaService = context.accessor.get(ConditionalFormattingFormulaService);
          const firstRange = sortRangesByTopLeft(context.rule.ranges)[0];
          const relativeRow = row - firstRange.startRow;
          const relativeCol = col - firstRange.startColumn;
          const formulaResult = conditionalFormattingFormulaService.getFormulaResultWithCoords(
            context.unitId,
            context.subUnitId,
            context.rule.cfId,
            _ruleConfig.value,
            relativeRow,
            relativeCol
          );
          if (formulaResult.status === 2 /* SUCCESS */ && formulaResult.result !== void 0) {
            return isFormulaResultMatched(formulaResult.result);
          }
          const cache = preComputingResult == null ? void 0 : preComputingResult.value;
          if (cache) {
            const value = cache.getValue(relativeRow, relativeCol);
            return isFormulaResultMatched(value);
          }
          return false;
        }
      }
    };
    const result = run();
    return result ? ruleConfig.style : {};
  }
};

// ../packages/sheets-conditional-formatting/src/models/calculate-unit-v2/icon-set-calculate-unit.ts
var getValue2 = (row, col, getCell) => {
  const cell = getCell(row, col);
  if (cell && cell.t === 2 /* NUMBER */) {
    const value = Number(cell.v);
    return Number.isNaN(value) ? null : value;
  }
  return null;
};
var IconSetCalculateUnit = class extends BaseCalculateUnit {
  preComputing(_row, _col, context) {
    const ruleConfig = context.rule.rule;
    const worksheet = context.worksheet;
    const matrix = new ObjectMatrix();
    const isNeedMatrix = !ruleConfig.config.every((e) => e.value.type === "num" /* num */);
    if (isNeedMatrix) {
      const ranges = filterRange(context.rule.ranges, worksheet.getMaxRows() - 1, worksheet.getMaxColumns() - 1);
      ranges.forEach((range) => {
        Range.foreach(range, (row, col) => {
          const cell = context.getCellValue(row, col);
          const v = cell && cell.v;
          if (!isNullable(v) && (cell == null ? void 0 : cell.t) === 2 /* NUMBER */) {
            const _value = Number(v);
            !Number.isNaN(_value) && matrix.setValue(row, col, _value);
          }
        });
      });
    }
    const splitValueResult = ruleConfig.config.map((v) => getValueByType(v.value, matrix, { ...context, cfId: context.rule.cfId }));
    const isAllFinished = !splitValueResult.some((item) => item.status !== 2 /* SUCCESS */);
    if (isAllFinished) {
      const splitValue = splitValueResult.map((item, index) => ({
        operator: ruleConfig.config[index].operator,
        value: Number(item.result) || 0
      })).reduce((result, cur, index, list) => {
        const item = ruleConfig.config[index];
        if (!index || index === list.length - 1) {
          result.push({ ...cur, iconId: item.iconId, iconType: item.iconType });
        } else {
          const pre = list[index - 1];
          if (!compareWithNumber(pre, cur.value)) {
            result.push({ ...cur, iconId: item.iconId, iconType: item.iconType });
          }
        }
        return result;
      }, []);
      this.setPreComputingCache(splitValue);
      this._preComputingStatus$.next("preComputingEnd" /* preComputingEnd */);
      return;
    }
    this._preComputingStatus$.next("preComputing" /* preComputing */);
  }
  getCellResult(row, col, preComputingResult, context) {
    if (!preComputingResult) {
      return null;
    }
    const value = getValue2(row, col, context.getCellValue);
    if (value === null) {
      return;
    }
    const ruleConfig = context.rule.rule;
    const isShowValue = ruleConfig.isShowValue === void 0 ? true : !!ruleConfig.isShowValue;
    for (let index = 0; index < preComputingResult.length; index++) {
      const item = preComputingResult[index];
      const start = { ...item };
      const end = { ...item };
      const { iconId, iconType } = item;
      if (index === 0) {
        if (compareWithNumber(item, value)) {
          return { iconId, iconType, isShowValue };
        }
      } else if (index === preComputingResult.length - 1) {
        return { iconId, iconType, isShowValue };
      } else {
        const pre = preComputingResult[index - 1];
        end.operator = getOppositeOperator(pre.operator);
        end.value = pre.value;
        if (compareWithNumber(start, value) && compareWithNumber(end, value)) {
          return { iconId, iconType, isShowValue };
        }
      }
    }
  }
};

// ../packages/sheets-conditional-formatting/src/models/conditional-formatting-view-model.ts
var CONDITIONAL_FORMATTING_VIEWPORT_CACHE_LENGTH = 50 * 20 * 3 * 3;
var ConditionalFormattingViewModel = class extends Disposable {
  constructor(_injector, _conditionalFormattingRuleModel, _conditionalFormattingFormulaService, _univerInstanceService) {
    super();
    __publicField(this, "_injector", _injector);
    __publicField(this, "_conditionalFormattingRuleModel", _conditionalFormattingRuleModel);
    __publicField(this, "_conditionalFormattingFormulaService", _conditionalFormattingFormulaService);
    __publicField(this, "_univerInstanceService", _univerInstanceService);
    //  Map<unitID ,<sheetId ,ObjectMatrix>>
    __publicField(this, "_calculateUnitManagers", /* @__PURE__ */ new Map());
    __publicField(this, "_rTreeManager", new RTree());
    /**
     * 1nd-level cache
     */
    __publicField(this, "_cellCache", new LRUMap(CONDITIONAL_FORMATTING_VIEWPORT_CACHE_LENGTH));
    __publicField(this, "_markDirty$", new Subject());
    /**
     * The rendering layer listens to this variable to determine whether a reRender is necessary.
     * @memberof ConditionalFormattingViewModel
     */
    __publicField(this, "markDirty$", this._markDirty$.asObservable());
    /**
     `isNeedResetPreComputingCache` indicates whether it is necessary to remove the 2nd-level cache for each rule individually.
     Generally, when the logic of a rule calculation is modified, the cache for that rule needs to be removed.
     Changes in style/priority do not require the clearing of the 2nd-level cache.
     Rule changes/region changes require the removal of the 2nd-level cache.
     There is also a situation where preComputing is asynchronously calculated.
     After the calculation is finished, it is only for marking as dirty, and the 2nd-level cache need to be cleared.
     * @param {boolean} [isNeedResetPreComputingCache]
     */
    __publicField(this, "_markRuleDirtyAtOnce", (unitId, subUnitId, cfId, isNeedResetPreComputingCache = true) => {
      this._cellCache.clear();
      if (isNeedResetPreComputingCache) {
        const _calculateUnitManagers = this._ensureCalculateUnitManager(unitId, subUnitId);
        const calculateUnit = _calculateUnitManagers.get(cfId);
        if (calculateUnit) {
          calculateUnit.resetPreComputingCache();
        }
      }
      this._markDirty$.next({
        unitId,
        subUnitId,
        cfId
      });
    });
    /**
     * For the same condition format being marked dirty multiple times at the same time,
     * it will cause the style cache to be cleared, thereby causing the screen to flicker.
     * Here,multiple dirties are merged into one..
     */
    __publicField(this, "markRuleDirty", (() => {
      const rxItem = new Subject();
      this.disposeWithMe(rxItem.pipe(bufferTime(100), filter((e) => !!e.length), map((list) => {
        const set = /* @__PURE__ */ new Set();
        const result = [];
        list.forEach((item) => {
          const kye = `${item.unitId}_${item.subUnitId}_${item.cfId}`;
          if (set.has(kye)) {
            if (item.isNeedResetPreComputingCache) {
              const i = result.find((e) => e.cfId === item.cfId);
              i.isNeedResetPreComputingCache = true;
            }
            return;
          }
          set.add(kye);
          result.push({ ...item });
        });
        return result;
      })).subscribe((list) => {
        list.forEach((item) => {
          this._markRuleDirtyAtOnce(item.unitId, item.subUnitId, item.cfId, item.isNeedResetPreComputingCache);
        });
      }));
      return (unitId, subUnitId, cfId, isNeedResetPreComputingCache = true) => {
        rxItem.next({ unitId, subUnitId, cfId, isNeedResetPreComputingCache });
      };
    })());
    this._initRuleListener();
    this._handleCustomFormulasSeparately();
    this._initCFFormulaListener();
  }
  _initCFFormulaListener() {
    this.disposeWithMe(
      this._conditionalFormattingFormulaService.result$.subscribe(({ unitId, subUnitId, cfId, isAllFinished }) => {
        if (isAllFinished) {
          this._markRuleDirtyAtOnce(unitId, subUnitId, cfId, isAllFinished);
        }
      })
    );
  }
  getCellCfs(unitId, subUnitId, row, col) {
    const key = this._createCacheKey(unitId, subUnitId, row, col);
    if (this._cellCache.has(key)) {
      return this._cellCache.get(key);
    }
    const result = this._getCellCfs(unitId, subUnitId, row, col);
    if (result.length) {
      this._cellCache.set(key, result);
    }
    return result;
  }
  _getCellCfs(unitId, subUnitId, row, col) {
    var _a;
    const subunitRules = (_a = this._conditionalFormattingRuleModel.getSubunitRules(unitId, subUnitId)) != null ? _a : [];
    const _calculateUnitManagers = this._ensureCalculateUnitManager(unitId, subUnitId);
    const list = this._rTreeManager.bulkSearch([{ unitId, sheetId: subUnitId, range: { startColumn: col, endColumn: col, startRow: row, endRow: row } }]);
    const rules = subunitRules.filter((rule) => list.has(rule.cfId));
    if (!rules.length) {
      return [];
    }
    const result = rules.map((rule) => {
      const calculateUnit = _calculateUnitManagers.get(rule.cfId);
      if (!calculateUnit) {
        return null;
      }
      return {
        cfId: rule.cfId,
        result: calculateUnit.getCell(row, col)
      };
    }).filter((e) => !!e).map((e, index) => ({ ...e, priority: index }));
    return result;
  }
  dispose() {
    this.clearCache();
    super.dispose();
  }
  clearCache() {
    this._calculateUnitManagers.clear();
    this._cellCache.clear();
    this._rTreeManager.clear();
  }
  _handleCustomFormulasSeparately() {
    this.disposeWithMe(
      this._conditionalFormattingRuleModel.$ruleChange.subscribe((e) => {
        if (e.type === "set") {
          const { unitId, subUnitId } = e;
          const oldRule = e.oldRule;
          if (oldRule.rule.type === "highlightCell" /* highlightCell */ && oldRule.rule.subType === "formula" /* formula */) {
            this._conditionalFormattingFormulaService.deleteCache(unitId, subUnitId, oldRule.cfId);
          }
        }
      })
    );
  }
  _initRuleListener() {
    this.disposeWithMe(
      this._conditionalFormattingRuleModel.$ruleChange.subscribe((e) => {
        const { unitId, subUnitId, rule } = e;
        const { cfId, ranges } = rule;
        const calculateUnitManager = this._ensureCalculateUnitManager(unitId, subUnitId);
        this.markRuleDirty(unitId, subUnitId, cfId);
        switch (e.type) {
          case "add": {
            this._rTreeManager.bulkInsert(ranges.map((r) => ({ unitId, sheetId: subUnitId, id: cfId, range: r })));
            const instance = this._createRuleCalculateUnitInstance(unitId, subUnitId, rule);
            if (!instance) {
              return;
            }
            calculateUnitManager.set(rule.cfId, instance);
            break;
          }
          case "delete": {
            this._rTreeManager.bulkRemove(ranges.map((r) => ({ unitId, sheetId: subUnitId, id: cfId, range: r })));
            calculateUnitManager.delete(rule.cfId);
            break;
          }
          case "set": {
            const oldRule = e.oldRule;
            this._rTreeManager.bulkRemove(oldRule.ranges.map((r) => ({ unitId, sheetId: subUnitId, id: oldRule.cfId, range: r })));
            this._rTreeManager.bulkInsert(ranges.map((r) => ({ unitId, sheetId: subUnitId, id: cfId, range: r })));
            if (oldRule.rule.type !== rule.rule.type) {
              const instance = this._createRuleCalculateUnitInstance(unitId, subUnitId, rule);
              if (!instance) {
                return;
              }
              calculateUnitManager.delete(oldRule.cfId);
              calculateUnitManager.set(rule.cfId, instance);
            } else {
              const instance = calculateUnitManager.get(oldRule.cfId);
              if (!instance) {
                return;
              }
              instance.updateRule(rule);
            }
          }
        }
      })
    );
  }
  _ensureCalculateUnitManager(unitId, subUnitId) {
    let unitMap = this._calculateUnitManagers.get(unitId);
    if (!unitMap) {
      unitMap = /* @__PURE__ */ new Map();
      this._calculateUnitManagers.set(unitId, unitMap);
    }
    let subUnitMap = unitMap.get(subUnitId);
    if (!subUnitMap) {
      subUnitMap = /* @__PURE__ */ new Map();
      unitMap.set(subUnitId, subUnitMap);
    }
    return subUnitMap;
  }
  _createRuleCalculateUnitInstance(unitId, subUnitId, rule) {
    const workbook = this._univerInstanceService.getUnit(unitId);
    const worksheet = workbook == null ? void 0 : workbook.getSheetBySheetId(subUnitId);
    if (!workbook || !worksheet) {
      return;
    }
    const context = {
      workbook,
      worksheet,
      unitId,
      subUnitId,
      accessor: this._injector,
      rule,
      limit: CONDITIONAL_FORMATTING_VIEWPORT_CACHE_LENGTH,
      getCellValue: (row, col) => worksheet.getCellRaw(row, col) || {}
    };
    switch (rule.rule.type) {
      case "colorScale" /* colorScale */: {
        return new ColorScaleCalculateUnit(context);
      }
      case "dataBar" /* dataBar */: {
        return new DataBarCalculateUnit(context);
      }
      case "highlightCell" /* highlightCell */: {
        return new HighlightCellCalculateUnit(context);
      }
      case "iconSet" /* iconSet */: {
        return new IconSetCalculateUnit(context);
      }
    }
  }
  _createCacheKey(unitId, subUnitId, row, col) {
    return `${unitId}_${subUnitId}_${row}_${col}`;
  }
  setCacheLength(length = CONDITIONAL_FORMATTING_VIEWPORT_CACHE_LENGTH) {
    if (this._cellCache.limit === length) {
      return;
    }
    this._cellCache.limit = length;
    this._calculateUnitManagers.forEach((subunitMap) => {
      subunitMap.forEach((unitMap) => {
        unitMap.forEach((unit) => {
          unit.setCacheLength(length);
        });
      });
    });
  }
};
ConditionalFormattingViewModel = __decorateClass([
  __decorateParam(0, Inject(Injector)),
  __decorateParam(1, Inject(ConditionalFormattingRuleModel)),
  __decorateParam(2, Inject(ConditionalFormattingFormulaService)),
  __decorateParam(3, IUniverInstanceService)
], ConditionalFormattingViewModel);

// ../packages/sheets-conditional-formatting/src/services/conditional-formatting.service.ts
var ConditionalFormattingService = class extends Disposable {
  constructor(_conditionalFormattingRuleModel, _injector, _univerInstanceService, _resourceManagerService, _sheetInterceptorService, _commandService) {
    super();
    __publicField(this, "_conditionalFormattingRuleModel", _conditionalFormattingRuleModel);
    __publicField(this, "_injector", _injector);
    __publicField(this, "_univerInstanceService", _univerInstanceService);
    __publicField(this, "_resourceManagerService", _resourceManagerService);
    __publicField(this, "_sheetInterceptorService", _sheetInterceptorService);
    __publicField(this, "_commandService", _commandService);
    this._initCellChange();
    this._initSnapshot();
    this._initSheetChange();
  }
  get _conditionalFormattingViewModelV2() {
    return this._injector.get(ConditionalFormattingViewModel);
  }
  _mergeComposeResult(result, rule, ruleResult) {
    const type = rule.rule.type;
    if (type === "highlightCell" /* highlightCell */) {
      ruleResult && merge_default(result, { style: ruleResult });
      return;
    }
    if (type === "colorScale" /* colorScale */) {
      if (ruleResult && typeof ruleResult === "string") {
        const preStyle = result.style || {};
        result.style = { ...preStyle, bg: { rgb: ruleResult } };
      }
      return;
    }
    if (type === "dataBar" /* dataBar */) {
      const ruleCache = ruleResult;
      if (ruleCache) {
        result.dataBar = ruleCache;
        result.isShowValue = ruleCache.isShowValue;
      }
      return;
    }
    if (type === "iconSet" /* iconSet */) {
      const ruleCache = ruleResult;
      if (ruleCache) {
        result.iconSet = ruleCache;
        result.isShowValue = ruleCache.isShowValue;
      }
    }
  }
  //Conditional formats need to be evaluated in priority order
  //  (in this implementation, this is equivalent to evaluating higher-priority rules first,
  //  which generally corresponds to a smaller order value coming first).
  // Evaluation of subsequent rules shall stop only if the current rule is matched and stopIfTrue=true.
  // A stopIfTrue rule that is not matched must not terminate the evaluation of subsequent rules.
  composeStyle(unitId, subUnitId, row, col) {
    const cellCfs = this._conditionalFormattingViewModelV2.getCellCfs(unitId, subUnitId, row, col);
    if (!(cellCfs == null ? void 0 : cellCfs.length)) {
      return null;
    }
    const matchedRules = [];
    let stopIfTrueIndex = -1;
    for (const cacheItem of cellCfs) {
      const rule = this._conditionalFormattingRuleModel.getRule(unitId, subUnitId, cacheItem.cfId);
      if (!rule) {
        continue;
      }
      matchedRules.push({ rule, cacheItem });
      if (stopIfTrueIndex === -1 && rule.stopIfTrue && this._isRuleMatched(rule, cacheItem.result)) {
        stopIfTrueIndex = matchedRules.length - 1;
      }
    }
    if (!matchedRules.length) {
      return null;
    }
    const effectiveRules = stopIfTrueIndex > -1 ? matchedRules.slice(0, stopIfTrueIndex + 1) : matchedRules;
    const result = {};
    for (let i = effectiveRules.length - 1; i >= 0; i--) {
      const { rule, cacheItem } = effectiveRules[i];
      this._mergeComposeResult(result, rule, cacheItem.result);
    }
    return result;
  }
  _isRuleMatched(rule, ruleResult) {
    if (rule.rule.type === "highlightCell" /* highlightCell */) {
      return !!ruleResult && typeof ruleResult === "object" && Object.keys(ruleResult).length > 0;
    }
    return !!ruleResult;
  }
  _initSnapshot() {
    const toJson = (unitID) => {
      const map2 = this._conditionalFormattingRuleModel.getUnitRules(unitID);
      const resultMap = {};
      if (map2) {
        map2.forEach((v, key) => {
          resultMap[key] = v;
        });
        return JSON.stringify(resultMap);
      }
      return "";
    };
    const parseJson = (json) => {
      if (!json) {
        return {};
      }
      try {
        return JSON.parse(json);
      } catch {
        return {};
      }
    };
    this.disposeWithMe(
      this._resourceManagerService.registerPluginResource({
        pluginName: SHEET_CONDITIONAL_FORMATTING_PLUGIN,
        businesses: [2 /* UNIVER_SHEET */],
        toJson: (unitID) => toJson(unitID),
        parseJson: (json) => parseJson(json),
        onUnLoad: (unitID) => {
          this._conditionalFormattingRuleModel.deleteUnitId(unitID);
          if (isInternalEditorID(unitID)) return;
          this._conditionalFormattingViewModelV2.clearCache();
        },
        onLoad: (unitID, value) => {
          Object.keys(value).forEach((subunitId) => {
            const ruleList = [...value[subunitId]].reverse();
            ruleList.forEach((rule) => {
              this._conditionalFormattingRuleModel.addRule(unitID, subunitId, rule);
            });
          });
        }
      })
    );
  }
  _initSheetChange() {
    this.disposeWithMe(
      this._sheetInterceptorService.interceptCommand({
        getMutations: (commandInfo) => {
          if (commandInfo.id === RemoveSheetCommand.id) {
            const params = commandInfo.params;
            const target = getSheetCommandTarget(this._univerInstanceService, params);
            if (!target) {
              return { redos: [], undos: [] };
            }
            const { unitId, subUnitId } = target;
            const ruleList = this._conditionalFormattingRuleModel.getSubunitRules(unitId, subUnitId);
            if (!ruleList) {
              return { redos: [], undos: [] };
            }
            const redos = [];
            const undos = [];
            ruleList.forEach((item) => {
              const params2 = {
                unitId,
                subUnitId,
                cfId: item.cfId
              };
              redos.push({
                id: DeleteConditionalRuleMutation.id,
                params: params2
              });
              undos.push(...DeleteConditionalRuleMutationUndoFactory(this._injector, params2));
            });
            return {
              redos,
              undos
            };
          } else if (commandInfo.id === CopySheetCommand.id) {
            const params = commandInfo.params;
            const target = getSheetCommandTarget(this._univerInstanceService, params);
            if (!target) {
              return { redos: [], undos: [] };
            }
            const { unitId, subUnitId } = target;
            const { targetSubUnitId } = params;
            const ruleList = this._conditionalFormattingRuleModel.getSubunitRules(unitId, subUnitId);
            if (!ruleList) {
              return { redos: [], undos: [] };
            }
            const redos = [];
            const undos = [];
            ruleList.forEach((item) => {
              const params2 = {
                unitId,
                subUnitId: targetSubUnitId,
                rule: {
                  ...item,
                  cfId: this._conditionalFormattingRuleModel.createCfId(unitId, targetSubUnitId)
                }
              };
              redos.push({ id: AddConditionalRuleMutation.id, params: params2 });
              undos.push(AddConditionalRuleMutationUndoFactory(this._injector, params2));
            });
            return { redos, undos };
          }
          return { redos: [], undos: [] };
        }
      })
    );
  }
  // eslint-disable-next-line max-lines-per-function
  _initCellChange() {
    this.disposeWithMe(
      // eslint-disable-next-line max-lines-per-function
      this._commandService.onCommandExecuted((commandInfo) => {
        const collectRule = (unitId, subUnitId, cellData) => {
          const ruleIds = /* @__PURE__ */ new Set();
          cellData.forEach(([row, col]) => {
            const ruleItem = this._conditionalFormattingViewModelV2.getCellCfs(unitId, subUnitId, row, col);
            ruleItem == null ? void 0 : ruleItem.forEach((item) => ruleIds.add(item.cfId));
          });
          return [...ruleIds].map((cfId) => this._conditionalFormattingRuleModel.getRule(unitId, subUnitId, cfId)).filter((rule) => !!rule);
        };
        switch (commandInfo.id) {
          case SetRangeValuesMutation.id: {
            const params = commandInfo.params;
            const { subUnitId, unitId, cellValue } = params;
            const cellMatrix = [];
            new ObjectMatrix(cellValue).forValue((row, col, value) => {
              const result = value && Object.keys(value).some((key) => ["p", "v"].includes(key));
              if (result) {
                cellMatrix.push([row, col]);
              }
            });
            const rules = collectRule(unitId, subUnitId, cellMatrix);
            rules.forEach((rule) => {
              this._conditionalFormattingViewModelV2.markRuleDirty(unitId, subUnitId, rule.cfId);
            });
            break;
          }
          case InsertColMutation.id:
          case RemoveColMutation.id: {
            const params = commandInfo.params;
            const target = getSheetCommandTarget(this._univerInstanceService, params);
            if (!target) return;
            const { worksheet, unitId, subUnitId } = target;
            const { range } = params;
            const effectRange = { ...range, endColumn: worksheet.getColumnCount() - 1 };
            const allRules = this._conditionalFormattingRuleModel.getSubunitRules(unitId, subUnitId);
            if (allRules) {
              const effectRule = allRules.filter((rule) => rule.ranges.some((ruleRange) => Rectangle.intersects(ruleRange, effectRange)));
              effectRule.forEach((rule) => {
                this._conditionalFormattingViewModelV2.markRuleDirty(unitId, subUnitId, rule.cfId);
              });
            }
            break;
          }
          case RemoveRowMutation.id:
          case InsertRowMutation.id: {
            const params = commandInfo.params;
            const target = getSheetCommandTarget(this._univerInstanceService, params);
            if (!target) return;
            const { worksheet, unitId, subUnitId } = target;
            const { range } = params;
            const effectRange = { ...range, endRow: worksheet.getRowCount() - 1 };
            const allRules = this._conditionalFormattingRuleModel.getSubunitRules(unitId, subUnitId);
            if (allRules) {
              const effectRule = allRules.filter((rule) => rule.ranges.some((ruleRange) => Rectangle.intersects(ruleRange, effectRange)));
              effectRule.forEach((rule) => {
                this._conditionalFormattingViewModelV2.markRuleDirty(unitId, subUnitId, rule.cfId);
              });
            }
            break;
          }
          case MoveRowsMutation.id: {
            const params = commandInfo.params;
            const target = getSheetCommandTarget(this._univerInstanceService, params);
            if (!target) return;
            const { worksheet, unitId, subUnitId } = target;
            const { sourceRange, targetRange } = params;
            const effectRange = {
              startRow: Math.min(sourceRange.startRow, targetRange.startRow),
              endRow: worksheet.getRowCount() - 1,
              startColumn: 0,
              endColumn: worksheet.getColumnCount() - 1
            };
            const allRules = this._conditionalFormattingRuleModel.getSubunitRules(unitId, subUnitId);
            if (allRules) {
              const effectRule = allRules.filter((rule) => rule.ranges.some((ruleRange) => Rectangle.intersects(ruleRange, effectRange)));
              effectRule.forEach((rule) => {
                this._conditionalFormattingViewModelV2.markRuleDirty(unitId, subUnitId, rule.cfId);
              });
            }
            break;
          }
          case MoveColsMutation.id: {
            const params = commandInfo.params;
            const target = getSheetCommandTarget(this._univerInstanceService, params);
            if (!target) return;
            const { worksheet, unitId, subUnitId } = target;
            const { sourceRange, targetRange } = params;
            const effectRange = {
              startRow: 0,
              endRow: worksheet.getRowCount() - 1,
              startColumn: Math.min(sourceRange.startColumn, targetRange.startColumn),
              endColumn: worksheet.getColumnCount() - 1
            };
            const allRules = this._conditionalFormattingRuleModel.getSubunitRules(unitId, subUnitId);
            if (allRules) {
              const effectRule = allRules.filter((rule) => rule.ranges.some((ruleRange) => Rectangle.intersects(ruleRange, effectRange)));
              effectRule.forEach((rule) => {
                this._conditionalFormattingViewModelV2.markRuleDirty(unitId, subUnitId, rule.cfId);
              });
            }
            break;
          }
          case MoveRangeMutation.id: {
            const { unitId, to, from } = commandInfo.params;
            const handleSubUnit = (value) => {
              const cellMatrix = [];
              new ObjectMatrix(value.value).forValue((row, col) => {
                cellMatrix.push([row, col]);
              });
              const rules = collectRule(unitId, value.subUnitId, cellMatrix);
              rules.forEach((rule) => {
                this._conditionalFormattingViewModelV2.markRuleDirty(unitId, value.subUnitId, rule.cfId);
              });
            };
            handleSubUnit(to);
            handleSubUnit(from);
            break;
          }
          case ReorderRangeMutation.id: {
            const { range, unitId, subUnitId } = commandInfo.params;
            const allRules = this._conditionalFormattingRuleModel.getSubunitRules(unitId, subUnitId);
            if (allRules) {
              const effectRule = allRules.filter((rule) => rule.ranges.some((ruleRange) => Rectangle.intersects(ruleRange, range)));
              effectRule.forEach((rule) => {
                this._conditionalFormattingViewModelV2.markRuleDirty(unitId, subUnitId, rule.cfId);
              });
            }
            break;
          }
        }
      })
    );
  }
};
ConditionalFormattingService = __decorateClass([
  __decorateParam(0, Inject(ConditionalFormattingRuleModel)),
  __decorateParam(1, Inject(Injector)),
  __decorateParam(2, Inject(IUniverInstanceService)),
  __decorateParam(3, Inject(IResourceManagerService)),
  __decorateParam(4, Inject(SheetInterceptorService)),
  __decorateParam(5, Inject(ICommandService))
], ConditionalFormattingService);

// ../packages/sheets-conditional-formatting/src/plugin.ts
var UniverSheetsConditionalFormattingPlugin = class extends Plugin {
  constructor(_config = defaultPluginConfig, _injector, _commandService, _configService) {
    super();
    __publicField(this, "_config", _config);
    __publicField(this, "_injector", _injector);
    __publicField(this, "_commandService", _commandService);
    __publicField(this, "_configService", _configService);
    const { ...rest } = merge_default(
      {},
      defaultPluginConfig,
      this._config
    );
    this._configService.setConfig(SHEETS_CONDITIONAL_FORMATTING_PLUGIN_CONFIG_KEY, rest);
    [
      [ConditionalFormattingService],
      [ConditionalFormattingFormulaService],
      [ConditionalFormattingRuleModel],
      [ConditionalFormattingViewModel]
    ].forEach((dependency) => {
      this._injector.add(dependency);
    });
    [
      AddCfCommand,
      ClearRangeCfCommand,
      ClearWorksheetCfCommand,
      DeleteCfCommand,
      MoveCfCommand,
      SetCfCommand,
      AddConditionalRuleMutation,
      DeleteConditionalRuleMutation,
      SetConditionalRuleMutation,
      MoveConditionalRuleMutation
    ].forEach((m) => {
      this._commandService.registerCommand(m);
    });
  }
  onStarting() {
    this._injector.get(ConditionalFormattingService);
    touchDependencies(this._injector, [
      [ConditionalFormattingService],
      [ConditionalFormattingViewModel]
    ]);
  }
};
__publicField(UniverSheetsConditionalFormattingPlugin, "pluginName", SHEET_CONDITIONAL_FORMATTING_PLUGIN);
__publicField(UniverSheetsConditionalFormattingPlugin, "packageName", package_default.name);
__publicField(UniverSheetsConditionalFormattingPlugin, "version", package_default.version);
__publicField(UniverSheetsConditionalFormattingPlugin, "type", 2 /* UNIVER_SHEET */);
UniverSheetsConditionalFormattingPlugin = __decorateClass([
  DependentOn(UniverFormulaEnginePlugin),
  __decorateParam(1, Inject(Injector)),
  __decorateParam(2, Inject(ICommandService)),
  __decorateParam(3, IConfigService)
], UniverSheetsConditionalFormattingPlugin);

// ../packages/sheets-conditional-formatting/src/assets/icon-map.ts
var ICON_MAP = {
  "feedback": {
    "mistake": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%229.99999%22%20cy%3D%2210%22%20r%3D%227.03704%22%20fill%3D%22%23FE4B4B%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6.87359%206.87332C6.6146%207.13231%206.6146%207.55221%206.87359%207.8112L9.062%209.99961L6.87356%2012.188C6.61457%2012.447%206.61457%2012.8669%206.87356%2013.1259C7.13255%2013.3849%207.55245%2013.3849%207.81144%2013.1259L9.99987%2010.9375L12.1882%2013.1258C12.4472%2013.3848%2012.8671%2013.3848%2013.1261%2013.1258C13.3851%2012.8669%2013.3851%2012.447%2013.1261%2012.188L10.9378%209.99961L13.1261%207.81127C13.3851%207.55228%2013.3851%207.13238%2013.1261%206.87339C12.8671%206.61441%2012.4472%206.61441%2012.1882%206.87339L9.99987%209.06173L7.81147%206.87332C7.55248%206.61433%207.13257%206.61433%206.87359%206.87332Z%22%20fill%3D%22%23FFFFFF%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "warn": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%229.99999%22%20cy%3D%2210%22%20r%3D%227.03704%22%20fill%3D%22%23FFBD37%22%2F%3E%0A%3Cpath%20d%3D%22M9.16817%206.67735C9.16646%206.61745%209.1656%206.5875%209.16653%206.56236C9.18103%206.16817%209.49136%205.84883%209.88497%205.82306C9.91008%205.82141%209.94004%205.82141%209.99996%205.82141V5.82141C10.0599%205.82141%2010.0899%205.82141%2010.115%205.82306C10.5086%205.84883%2010.8189%206.16817%2010.8334%206.56236C10.8343%206.5875%2010.8335%206.61745%2010.8318%206.67735L10.7043%2011.131C10.6934%2011.5121%2010.3812%2011.8154%209.99995%2011.8154V11.8154C9.61866%2011.8154%209.30655%2011.5121%209.29564%2011.131L9.16817%206.67735Z%22%20fill%3D%22%23FFFFFF%22%2F%3E%0A%3Crect%20x%3D%229.31488%22%20y%3D%2212.8086%22%20width%3D%221.37006%22%20height%3D%221.37006%22%20rx%3D%220.685032%22%20fill%3D%22%23FFFFFF%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "correct": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M17.037%2010C17.037%2013.8865%2013.8864%2017.0371%209.99999%2017.0371C6.11354%2017.0371%202.96295%2013.8865%202.96295%2010C2.96295%206.1136%206.11354%202.96301%209.99999%202.96301C13.8864%202.96301%2017.037%206.1136%2017.037%2010Z%22%20fill%3D%22%2359D01E%22%2F%3E%0A%3Cpath%20d%3D%22M13.9239%207.17477C13.6638%206.91472%2013.2422%206.91472%2012.9821%207.17477L8.74433%2011.4126L7.01786%209.6861C6.75781%209.42606%206.33619%209.42606%206.07614%209.6861C5.81609%209.94615%205.81609%2010.3678%206.07614%2010.6278L8.27349%2012.8252C8.53354%2013.0852%208.95516%2013.0852%209.21521%2012.8252L9.2195%2012.8209L13.9239%208.1165C14.1839%207.85645%2014.1839%207.43482%2013.9239%207.17477Z%22%20fill%3D%22%23FFFFFF%22%2F%3E%0A%3C%2Fsvg%3E%0A"
  },
  "star": {
    "starEmpty": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.3437%203.3312L11.6861%206.67412C11.8451%207.0699%2012.2165%207.33978%2012.6421%207.36863L16.2362%207.61233C16.5693%207.63492%2016.7048%208.05202%2016.4486%208.26608L13.6841%2010.5758C13.3568%2010.8493%2013.215%2011.2859%2013.319%2011.6996L14.1979%2015.1931C14.2793%2015.5168%2013.9245%2015.7746%2013.6418%2015.5971L10.5908%2013.6817C10.2296%2013.4549%209.77045%2013.4549%209.40924%2013.6817L6.35828%2015.5971C6.07553%2015.7746%205.72072%2015.5168%205.80217%2015.1931L6.68105%2011.6996C6.7851%2011.2859%206.64322%2010.8493%206.31592%2010.5758L3.55145%208.26607C3.29525%208.05202%203.43078%207.63492%203.76386%207.61233L7.358%207.36863C7.78352%207.33978%208.15498%207.0699%208.31391%206.67412L9.65633%203.3312C9.78074%203.0214%2010.2193%203.0214%2010.3437%203.3312Z%22%20fill%3D%22%23fff%22%20stroke%3D%22%23FFBD37%22%20stroke-width%3D%220.740741%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "starIncomplete": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.3437%203.3312L11.6861%206.67412C11.845%207.0699%2012.2165%207.33978%2012.642%207.36863L16.2361%207.61233C16.5692%207.63492%2016.7047%208.05202%2016.4485%208.26608L13.6841%2010.5758C13.3568%2010.8493%2013.2149%2011.2859%2013.3189%2011.6996L14.1978%2015.1931C14.2793%2015.5168%2013.9245%2015.7746%2013.6417%2015.5971L10.5908%2013.6817C10.2295%2013.4549%209.77039%2013.4549%209.40918%2013.6817L6.35822%2015.5971C6.07547%2015.7746%205.72066%2015.5168%205.80211%2015.1931L6.68098%2011.6996C6.78504%2011.2859%206.64316%2010.8493%206.31586%2010.5758L3.55139%208.26607C3.29519%208.05202%203.43072%207.63492%203.7638%207.61233L7.35793%207.36863C7.78346%207.33978%208.15491%207.0699%208.31385%206.67412L9.65627%203.3312C9.78068%203.0214%2010.2192%203.0214%2010.3437%203.3312Z%22%20fill%3D%22%23fff%22%20stroke%3D%22%23FFBD37%22%20stroke-width%3D%220.740741%22%2F%3E%0A%3Cmask%20id%3D%22mask1_613_177%22%20style%3D%22mask-type%3Aalpha%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%220%22%20y%3D%220%22%20width%3D%2210%22%20height%3D%2220%22%3E%0A%3Crect%20width%3D%2210%22%20height%3D%2220%22%20fill%3D%22%23C4C4C4%22%2F%3E%0A%3C%2Fmask%3E%0A%3Cg%20mask%3D%22url(%23mask1_613_177)%22%3E%0A%3Cpath%20d%3D%22M10.3437%203.3312L11.6861%206.67412C11.845%207.0699%2012.2165%207.33978%2012.642%207.36863L16.2361%207.61233C16.5692%207.63492%2016.7047%208.05202%2016.4485%208.26608L13.6841%2010.5758C13.3568%2010.8493%2013.2149%2011.2859%2013.3189%2011.6996L14.1978%2015.1931C14.2793%2015.5168%2013.9245%2015.7746%2013.6417%2015.5971L10.5908%2013.6817C10.2295%2013.4549%209.77039%2013.4549%209.40918%2013.6817L6.35822%2015.5971C6.07547%2015.7746%205.72066%2015.5168%205.80211%2015.1931L6.68098%2011.6996C6.78504%2011.2859%206.64316%2010.8493%206.31586%2010.5758L3.55139%208.26607C3.29519%208.05202%203.43072%207.63492%203.7638%207.61233L7.35793%207.36863C7.78346%207.33978%208.15491%207.0699%208.31385%206.67412L9.65627%203.3312C9.78068%203.0214%2010.2192%203.0214%2010.3437%203.3312Z%22%20fill%3D%22%23FFBD37%22%20stroke%3D%22%23FFBD37%22%20stroke-width%3D%220.740741%22%2F%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A",
    "starFull": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.3437%203.3312L11.6861%206.67412C11.8451%207.0699%2012.2165%207.33978%2012.6421%207.36863L16.2362%207.61233C16.5693%207.63492%2016.7048%208.05202%2016.4486%208.26608L13.6841%2010.5758C13.3568%2010.8493%2013.215%2011.2859%2013.319%2011.6996L14.1979%2015.1931C14.2793%2015.5168%2013.9245%2015.7746%2013.6418%2015.5971L10.5908%2013.6817C10.2296%2013.4549%209.77045%2013.4549%209.40924%2013.6817L6.35828%2015.5971C6.07553%2015.7746%205.72072%2015.5168%205.80217%2015.1931L6.68105%2011.6996C6.7851%2011.2859%206.64322%2010.8493%206.31592%2010.5758L3.55145%208.26607C3.29525%208.05202%203.43078%207.63492%203.76386%207.61233L7.358%207.36863C7.78352%207.33978%208.15498%207.0699%208.31391%206.67412L9.65633%203.3312C9.78074%203.0214%2010.2193%203.0214%2010.3437%203.3312Z%22%20fill%3D%22%23FFBD37%22%20stroke%3D%22%23FFBD37%22%20stroke-width%3D%220.740741%22%2F%3E%0A%3C%2Fsvg%3E%0A"
  },
  "progress": {
    "progress0": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%2210%22%20cy%3D%229.99993%22%20r%3D%226.66667%22%20stroke%3D%22%237A7A7A%22%20stroke-width%3D%220.740741%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "progress25": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%2210%22%20cy%3D%229.99993%22%20r%3D%226.66667%22%20stroke%3D%22%237A7A7A%22%20stroke-width%3D%220.740741%22%2F%3E%0A%3Cpath%20d%3D%22M16.2963%209.99991C16.2963%209.17307%2016.1335%208.35432%2015.8171%207.59042C15.5006%206.82652%2015.0369%206.13242%2014.4522%205.54776C13.8675%204.96309%2013.1734%204.49931%2012.4095%204.18289C11.6456%203.86647%2010.8269%203.70361%2010%203.70361L10%209.99991H16.2963Z%22%20fill%3D%22%237A7A7A%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "progress50": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%2210%22%20cy%3D%229.99993%22%20r%3D%226.66667%22%20stroke%3D%22%237A7A7A%22%20stroke-width%3D%220.740741%22%2F%3E%0A%3Cpath%20d%3D%22M10%2016.2962C11.6699%2016.2962%2013.2714%2015.6328%2014.4522%2014.4521C15.633%2013.2713%2016.2963%2011.6698%2016.2963%209.99991C16.2963%208.33003%2015.633%206.72854%2014.4522%205.54776C13.2714%204.36697%2011.6699%203.70361%2010%203.70361L10%209.99991L10%2016.2962Z%22%20fill%3D%22%237A7A7A%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "progress75": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%2210%22%20cy%3D%229.99993%22%20r%3D%226.66667%22%20stroke%3D%22%237A7A7A%22%20stroke-width%3D%220.740741%22%2F%3E%0A%3Cpath%20d%3D%22M3.70374%209.99991C3.70374%2011.2452%204.07301%2012.4625%204.76485%2013.4979C5.4567%2014.5334%206.44005%2015.3404%207.59054%2015.8169C8.74104%2016.2935%2010.007%2016.4182%2011.2284%2016.1752C12.4497%2015.9323%2013.5716%2015.3326%2014.4522%2014.4521C15.3327%2013.5715%2015.9324%2012.4496%2016.1753%2011.2283C16.4183%2010.0069%2016.2936%208.74092%2015.8171%207.59042C15.3405%206.43992%2014.5335%205.45658%2013.4981%204.76473C12.4626%204.07288%2011.2453%203.70361%2010%203.70361L10%209.99991L3.70374%209.99991Z%22%20fill%3D%22%237A7A7A%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "progress100": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%2210%22%20cy%3D%229.99993%22%20r%3D%226.66667%22%20stroke%3D%22%237A7A7A%22%20stroke-width%3D%220.740741%22%2F%3E%0A%3Ccircle%20cx%3D%2210%22%20cy%3D%229.99991%22%20r%3D%226.2963%22%20fill%3D%22%237A7A7A%22%2F%3E%0A%3C%2Fsvg%3E%0A"
  },
  "signal": {
    "signal0": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewBox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%2214.4764%22%20y%3D%222.98926%22%20width%3D%222.3%22%20height%3D%2214.0597%22%20rx%3D%220.5%22%20fill%3D%22%23E5E5E5%22%2F%3E%0A%3Crect%20x%3D%2210.7255%22%20y%3D%225.93921%22%20width%3D%222.3%22%20height%3D%2211.1096%22%20rx%3D%220.5%22%20fill%3D%22%23E5E5E5%22%2F%3E%0A%3Crect%20x%3D%226.97455%22%20y%3D%229.70435%22%20width%3D%222.3%22%20height%3D%227.3443%22%20rx%3D%220.5%22%20fill%3D%22%23E5E5E5%22%2F%3E%0A%3Crect%20x%3D%223.22363%22%20y%3D%2213.3302%22%20width%3D%222.3%22%20height%3D%223.71851%22%20rx%3D%220.5%22%20fill%3D%22%23E5E5E5%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "signal25": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewBox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%2214.4764%22%20y%3D%222.98926%22%20width%3D%222.3%22%20height%3D%2214.0597%22%20rx%3D%220.5%22%20fill%3D%22%23E5E5E5%22%2F%3E%0A%3Crect%20x%3D%2210.7255%22%20y%3D%225.93921%22%20width%3D%222.3%22%20height%3D%2211.1096%22%20rx%3D%220.5%22%20fill%3D%22%23E5E5E5%22%2F%3E%0A%3Crect%20x%3D%226.97455%22%20y%3D%229.70435%22%20width%3D%222.3%22%20height%3D%227.3443%22%20rx%3D%220.5%22%20fill%3D%22%23E5E5E5%22%2F%3E%0A%3Crect%20x%3D%223.22363%22%20y%3D%2213.3302%22%20width%3D%222.3%22%20height%3D%223.71851%22%20rx%3D%220.5%22%20fill%3D%22%230493EE%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "signal50": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewBox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%2214.4764%22%20y%3D%222.98926%22%20width%3D%222.3%22%20height%3D%2214.0597%22%20rx%3D%220.5%22%20fill%3D%22%23E5E5E5%22%2F%3E%0A%3Crect%20x%3D%2210.7255%22%20y%3D%225.93921%22%20width%3D%222.3%22%20height%3D%2211.1096%22%20rx%3D%220.5%22%20fill%3D%22%23E5E5E5%22%2F%3E%0A%3Crect%20x%3D%226.97455%22%20y%3D%229.70435%22%20width%3D%222.3%22%20height%3D%227.3443%22%20rx%3D%220.5%22%20fill%3D%22%230493EE%22%2F%3E%0A%3Crect%20x%3D%223.22363%22%20y%3D%2213.3302%22%20width%3D%222.3%22%20height%3D%223.71851%22%20rx%3D%220.5%22%20fill%3D%22%230493EE%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "signal75": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewBox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%2214.4764%22%20y%3D%222.98926%22%20width%3D%222.3%22%20height%3D%2214.0597%22%20rx%3D%220.5%22%20fill%3D%22%23E5E5E5%22%2F%3E%0A%3Crect%20x%3D%2210.7255%22%20y%3D%225.93921%22%20width%3D%222.3%22%20height%3D%2211.1096%22%20rx%3D%220.5%22%20fill%3D%22%230493EE%22%2F%3E%0A%3Crect%20x%3D%226.97455%22%20y%3D%229.70435%22%20width%3D%222.3%22%20height%3D%227.3443%22%20rx%3D%220.5%22%20fill%3D%22%230493EE%22%2F%3E%0A%3Crect%20x%3D%223.22363%22%20y%3D%2213.3302%22%20width%3D%222.3%22%20height%3D%223.71851%22%20rx%3D%220.5%22%20fill%3D%22%230493EE%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "signal100": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewBox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%2214.4764%22%20y%3D%222.98926%22%20width%3D%222.3%22%20height%3D%2214.0597%22%20rx%3D%220.5%22%20fill%3D%22%230493EE%22%2F%3E%0A%3Crect%20x%3D%2210.7255%22%20y%3D%225.93933%22%20width%3D%222.3%22%20height%3D%2211.1096%22%20rx%3D%220.5%22%20fill%3D%22%230493EE%22%2F%3E%0A%3Crect%20x%3D%226.97455%22%20y%3D%229.70447%22%20width%3D%222.3%22%20height%3D%227.3443%22%20rx%3D%220.5%22%20fill%3D%22%230493EE%22%2F%3E%0A%3Crect%20x%3D%223.22363%22%20y%3D%2213.3302%22%20width%3D%222.3%22%20height%3D%223.71851%22%20rx%3D%220.5%22%20fill%3D%22%230493EE%22%2F%3E%0A%3C%2Fsvg%3E%0A"
  },
  "feeling": {
    "guffaw": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M16.887%2010C16.887%2013.8037%2013.8036%2016.8871%209.99999%2016.8871C6.19638%2016.8871%203.11295%2013.8037%203.11295%2010C3.11295%206.19644%206.19638%203.11301%209.99999%203.11301C13.8036%203.11301%2016.887%206.19644%2016.887%2010Z%22%20fill%3D%22%23FFBD37%22%20stroke%3D%22%238F5F00%22%20stroke-width%3D%220.3%22%2F%3E%0A%3Crect%20x%3D%227.40741%22%20y%3D%227.40735%22%20width%3D%221.48148%22%20height%3D%221.48148%22%20rx%3D%220.740741%22%20fill%3D%22%238F5F00%22%2F%3E%0A%3Crect%20x%3D%2211.1111%22%20y%3D%227.40735%22%20width%3D%221.48148%22%20height%3D%221.48148%22%20rx%3D%220.740741%22%20fill%3D%22%238F5F00%22%2F%3E%0A%3Cpath%20d%3D%22M12.5355%2013.5821C13.0482%2013.1841%2013.3951%2012.6107%2013.5405%2012.0327C13.5934%2011.8226%2013.5051%2011.6349%2013.3518%2011.5331C13.2036%2011.4346%2013.0031%2011.4203%2012.8265%2011.5131C11.0615%2012.4407%208.94609%2012.4427%207.1828%2011.513C7.00629%2011.4199%206.80602%2011.4343%206.65798%2011.5329C6.50518%2011.6346%206.41701%2011.8217%206.46844%2012.0312C6.61029%2012.609%206.95079%2013.1833%207.46449%2013.5821C8.14361%2014.1093%209.05608%2014.3999%2010%2014.3999C10.9439%2014.3999%2011.8564%2014.1093%2012.5355%2013.5821Z%22%20fill%3D%22white%22%20stroke%3D%22%238F5F00%22%20stroke-width%3D%220.4%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "smile": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%229.99999%22%20cy%3D%2210%22%20r%3D%226.88704%22%20fill%3D%22%23FFBD37%22%20stroke%3D%22%238F5F00%22%20stroke-width%3D%220.3%22%2F%3E%0A%3Crect%20x%3D%227.40741%22%20y%3D%227.40735%22%20width%3D%221.48148%22%20height%3D%221.48148%22%20rx%3D%220.740741%22%20fill%3D%22%238F5F00%22%2F%3E%0A%3Crect%20x%3D%2211.1111%22%20y%3D%227.40735%22%20width%3D%221.48148%22%20height%3D%221.48148%22%20rx%3D%220.740741%22%20fill%3D%22%238F5F00%22%2F%3E%0A%3Cpath%20d%3D%22M7.03705%2011.8518C7.03705%2011.8518%207.77779%2013.7037%2010%2013.7037C12.2222%2013.7037%2012.963%2011.8518%2012.963%2011.8518%22%20stroke%3D%22%238F5F00%22%20stroke-width%3D%220.962963%22%20stroke-linecap%3D%22round%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "noninductive": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%229.99999%22%20cy%3D%2210%22%20r%3D%226.88704%22%20fill%3D%22%23FFBD37%22%20stroke%3D%22%238F5F00%22%20stroke-width%3D%220.3%22%2F%3E%0A%3Crect%20x%3D%227.40741%22%20y%3D%227.9259%22%20width%3D%221.48148%22%20height%3D%221.11111%22%20rx%3D%220.555556%22%20fill%3D%22%238F5F00%22%2F%3E%0A%3Crect%20x%3D%2211.1111%22%20y%3D%227.9259%22%20width%3D%221.48148%22%20height%3D%221.11111%22%20rx%3D%220.555556%22%20fill%3D%22%238F5F00%22%2F%3E%0A%3Cpath%20d%3D%22M7.03705%2012.5927C7.03705%2012.5927%208.14816%2012.5927%2010.3704%2012.5927C12.5926%2012.5927%2012.963%2012.5927%2012.963%2012.5927%22%20stroke%3D%22%238F5F00%22%20stroke-width%3D%220.962963%22%20stroke-linecap%3D%22round%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "dissatisfied": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%229.99999%22%20cy%3D%2210%22%20r%3D%226.88704%22%20fill%3D%22%23FFBD37%22%20stroke%3D%22%238F5F00%22%20stroke-width%3D%220.3%22%2F%3E%0A%3Crect%20x%3D%227.40741%22%20y%3D%227.40735%22%20width%3D%221.48148%22%20height%3D%221.48148%22%20rx%3D%220.740741%22%20fill%3D%22%238F5F00%22%2F%3E%0A%3Crect%20x%3D%2211.1111%22%20y%3D%227.40735%22%20width%3D%221.48148%22%20height%3D%221.48148%22%20rx%3D%220.740741%22%20fill%3D%22%238F5F00%22%2F%3E%0A%3Cpath%20d%3D%22M7.03705%2013.7037C7.03705%2013.7037%207.77779%2011.8519%2010%2011.8519C12.2222%2011.8519%2012.963%2013.7037%2012.963%2013.7037%22%20stroke%3D%22%238F5F00%22%20stroke-width%3D%220.962963%22%20stroke-linecap%3D%22round%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "impatient": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%229.99999%22%20cy%3D%2210%22%20r%3D%226.88704%22%20fill%3D%22%23FFBD37%22%20stroke%3D%22%238F5F00%22%20stroke-width%3D%220.3%22%2F%3E%0A%3Crect%20x%3D%227.40741%22%20y%3D%227.40735%22%20width%3D%221.48148%22%20height%3D%221.48148%22%20rx%3D%220.740741%22%20fill%3D%22%238F5F00%22%2F%3E%0A%3Crect%20x%3D%2211.1111%22%20y%3D%227.40735%22%20width%3D%221.48148%22%20height%3D%221.48148%22%20rx%3D%220.740741%22%20fill%3D%22%238F5F00%22%2F%3E%0A%3Cpath%20d%3D%22M7.47573%2011.731C6.96306%2012.129%206.61613%2012.7024%206.47071%2013.2804C6.41784%2013.4905%206.50617%2013.6782%206.65942%2013.78C6.80761%2013.8785%207.00813%2013.8928%207.18477%2013.8C8.9498%2012.8724%2011.0652%2012.8704%2012.8285%2013.8002C13.005%2013.8932%2013.2052%2013.8788%2013.3533%2013.7802C13.5061%2013.6785%2013.5942%2013.4914%2013.5428%2013.2819C13.401%2012.7041%2013.0605%2012.1298%2012.5468%2011.731C11.8676%2011.2038%2010.9552%2010.9132%2010.0112%2010.9132C9.06732%2010.9132%208.15485%2011.2038%207.47573%2011.731Z%22%20fill%3D%22white%22%20stroke%3D%22%238F5F00%22%20stroke-width%3D%220.4%22%2F%3E%0A%3C%2Fsvg%3E%0A"
  },
  "arrow": {
    "down-red": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewBox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M8.90467%203.99244C8.84611%204.1338%208.84611%204.31301%208.84611%204.67143V13.716L5.92068%2010.7906C5.66724%2010.5371%205.54052%2010.4104%205.39916%2010.3519C5.21067%2010.2738%204.9989%2010.2738%204.81041%2010.3519C4.66905%2010.4104%204.54233%2010.5371%204.28889%2010.7906C4.03545%2011.044%203.90873%2011.1707%203.85018%2011.3121C3.77211%2011.5006%203.77211%2011.7124%203.85018%2011.9008C3.90873%2012.0422%204.03545%2012.1689%204.28889%2012.4224L9.03476%2017.1682C9.07839%2017.2127%209.12737%2017.2617%209.18231%2017.3166L9.18239%2017.3167L9.18241%2017.3167C9.40545%2017.5398%209.53035%2017.6647%209.65346%2017.7313C9.67085%2017.7408%209.6882%2017.7492%209.70577%2017.7564C9.89425%2017.8345%2010.106%2017.8345%2010.2945%2017.7564C10.4359%2017.6979%2010.5626%2017.5712%2010.816%2017.3177C10.8986%2017.2352%2010.9677%2017.1661%2011.0253%2017.1056L15.7095%2012.4214L15.7095%2012.4213C15.963%2012.1679%2016.0897%2012.0412%2016.1482%2011.8998C16.2263%2011.7114%2016.2263%2011.4996%2016.1482%2011.3111C16.0897%2011.1697%2015.963%2011.043%2015.7095%2010.7896C15.4561%2010.5361%2015.3294%2010.4094%2015.188%2010.3509C14.9995%2010.2728%2014.7878%2010.2728%2014.5993%2010.3509C14.4579%2010.4094%2014.3312%2010.5361%2014.0778%2010.7896L14.0777%2010.7896L11.1538%2013.7135V4.67142C11.1538%204.31301%2011.1538%204.1338%2011.0953%203.99244C11.0172%203.80395%2010.8674%203.6542%2010.6789%203.57613C10.5376%203.51758%2010.3584%203.51758%209.99996%203.51758C9.64154%203.51758%209.46233%203.51758%209.32097%203.57613C9.13249%203.6542%208.98274%203.80395%208.90467%203.99244Z%22%20fill%3D%22%23FE4B4B%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "right-gold": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewBox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3.32508%2011.7609C3.46644%2011.8194%203.64565%2011.8194%204.00407%2011.8194H13.049L10.1235%2014.745C9.87002%2014.9984%209.7433%2015.1251%209.68475%2015.2665C9.60668%2015.455%209.60668%2015.6668%209.68475%2015.8552C9.7433%2015.9966%209.87002%2016.1233%2010.1235%2016.3768C10.3769%2016.6302%2010.5036%2016.7569%2010.645%2016.8155C10.8335%2016.8935%2011.0452%2016.8935%2011.2337%2016.8155C11.3751%2016.7569%2011.5018%2016.6302%2011.7552%2016.3768L16.5105%2011.6215C16.5524%2011.5803%2016.5983%2011.5344%2016.6493%2011.4834L16.6495%2011.4831C16.8561%2011.2765%2016.9785%2011.1542%2017.0484%2011.0394C17.0648%2011.0128%2017.0782%2010.9866%2017.0893%2010.9599C17.1674%2010.7714%2017.1674%2010.5596%2017.0893%2010.3711C17.0308%2010.2298%2016.904%2010.1031%2016.6506%209.84962C16.5685%209.76752%2016.4997%209.69872%2016.4394%209.64123L11.7542%204.95601C11.5007%204.70257%2011.374%204.57585%2011.2327%204.5173C11.0442%204.43923%2010.8324%204.43923%2010.6439%204.5173C10.5026%204.57585%2010.3758%204.70257%2010.1224%204.95601L10.1224%204.95601C9.86895%205.20945%209.74223%205.33617%209.68368%205.47753C9.60561%205.66601%209.60561%205.87779%209.68368%206.06627C9.74223%206.20764%209.86895%206.33436%2010.1224%206.5878L13.0463%209.51175H4.00407C3.64565%209.51175%203.46644%209.51175%203.32508%209.5703C3.1366%209.64837%202.98685%209.79812%202.90877%209.98661C2.85022%2010.128%202.85022%2010.3072%202.85022%2010.6656C2.85022%2011.024%202.85022%2011.2032%202.90877%2011.3446C2.98685%2011.5331%203.1366%2011.6828%203.32508%2011.7609Z%22%20fill%3D%22%23FFBD37%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "up-green": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewBox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M11.0936%2017.3406C11.1522%2017.1992%2011.1522%2017.02%2011.1522%2016.6616V7.61701L14.0776%2010.5424C14.3311%2010.7959%2014.4578%2010.9226%2014.5991%2010.9811C14.7876%2011.0592%2014.9994%2011.0592%2015.1879%2010.9811C15.3292%2010.9226%2015.456%2010.7959%2015.7094%2010.5424C15.9628%2010.289%2016.0896%2010.1623%2016.1481%2010.0209C16.2262%209.83243%2016.2262%209.62066%2016.1481%209.43217C16.0896%209.29081%2015.9628%209.16409%2015.7094%208.91065L10.9645%204.16576C10.9207%204.12105%2010.8714%204.07178%2010.8161%204.01648L10.8159%204.0163C10.5916%203.792%2010.4666%203.66696%2010.3428%203.60058C10.3261%203.59154%2010.3094%203.58358%2010.2925%203.57658C10.104%203.49851%209.89226%203.49851%209.70378%203.57658C9.56242%203.63514%209.4357%203.76186%209.18226%204.0153C9.09955%204.09801%209.03034%204.16722%208.97258%204.22785L4.28878%208.91166C4.03534%209.1651%203.90862%209.29182%203.85006%209.43318C3.77199%209.62166%203.77199%209.83344%203.85006%2010.0219C3.90862%2010.1633%204.03534%2010.29%204.28878%2010.5434C4.54221%2010.7969%204.66893%2010.9236%204.8103%2010.9822C4.99878%2011.0602%205.21056%2011.0602%205.39904%2010.9822C5.5404%2010.9236%205.66712%2010.7969%205.92056%2010.5434L5.92056%2010.5434L8.84449%207.61951V16.6616C8.84449%2017.02%208.84449%2017.1992%208.90305%2017.3406C8.98112%2017.5291%209.13087%2017.6788%209.31935%2017.7569C9.46072%2017.8154%209.63992%2017.8154%209.99834%2017.8154C10.3568%2017.8154%2010.536%2017.8154%2010.6773%2017.7569C10.8658%2017.6788%2011.0156%2017.5291%2011.0936%2017.3406Z%22%20fill%3D%22%2359D01E%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "rightAndDown-gold": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewBox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M4.5062%206.72126C4.56476%206.86262%204.69148%206.98934%204.94492%207.24278L11.3404%2013.6382L7.20313%2013.6382C6.84471%2013.6382%206.66551%2013.6382%206.52414%2013.6968C6.33566%2013.7749%206.18591%2013.9246%206.10784%2014.1131C6.04928%2014.2545%206.04928%2014.4337%206.04928%2014.7921C6.04928%2015.1505%206.04928%2015.3297%206.10784%2015.4711C6.18591%2015.6596%206.33566%2015.8093%206.52414%2015.8874C6.66551%2015.9459%206.84471%2015.9459%207.20313%2015.9459L13.9194%2015.9459C13.9805%2015.9465%2014.0484%2015.9465%2014.1243%2015.9465H14.1243C14.4353%2015.9465%2014.6114%2015.9465%2014.7449%2015.9082C14.7659%2015.9023%2014.7859%2015.8954%2014.8052%2015.8874C14.9937%2015.8093%2015.1434%2015.6596%2015.2215%2015.4711C15.2801%2015.3297%2015.2801%2015.1505%2015.2801%2014.7921C15.2801%2014.6767%2015.2801%2014.5799%2015.2781%2014.497L15.2781%207.86957C15.2781%207.51115%2015.2781%207.33194%2015.2195%207.19058C15.1415%207.0021%2014.9917%206.85235%2014.8032%206.77428C14.6619%206.71572%2014.4827%206.71572%2014.1243%206.71572C13.7658%206.71572%2013.5866%206.71572%2013.4453%206.77428C13.2568%206.85235%2013.107%207.0021%2013.029%207.19058C12.9704%207.33194%2012.9704%207.51115%2012.9704%207.86957L12.9704%2012.0047L6.5767%205.61099C6.32326%205.35755%206.19654%205.23083%206.05518%205.17228C5.8667%205.09421%205.65492%205.09421%205.46644%205.17228C5.32508%205.23083%205.19836%205.35755%204.94492%205.61099C4.69148%205.86443%204.56476%205.99115%204.5062%206.13251C4.42813%206.32099%204.42813%206.53277%204.5062%206.72126Z%22%20fill%3D%22%23FFBD37%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "rightAndUp-gold": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewBox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6.05431%2016.1597C6.19567%2016.1012%206.32239%2015.9745%206.57583%2015.721L12.9712%209.32568L12.9712%2013.4626C12.9712%2013.821%2012.9712%2014.0002%2013.0297%2014.1416C13.1078%2014.3301%2013.2576%2014.4798%2013.446%2014.5579C13.5874%2014.6164%2013.7666%2014.6164%2014.125%2014.6164C14.4834%2014.6164%2014.6626%2014.6164%2014.804%2014.5579C14.9925%2014.4798%2015.1422%2014.3301%2015.2203%2014.1416C15.2789%2014.0002%2015.2789%2013.821%2015.2789%2013.4626L15.2789%206.75233C15.2795%206.68972%2015.2795%206.62004%2015.2795%206.54182L15.2795%206.54157C15.2795%206.22585%2015.2795%206.04918%2015.2395%205.91495C15.2339%205.89605%2015.2276%205.878%2015.2203%205.86053C15.1422%205.67204%2014.9925%205.52229%2014.804%205.44422C14.6626%205.38567%2014.4834%205.38567%2014.125%205.38567L14.125%205.38567C14.0075%205.38567%2013.9093%205.38567%2013.8254%205.38773L7.20256%205.38773C6.84414%205.38773%206.66493%205.38773%206.52357%205.44628C6.33509%205.52436%206.18534%205.6741%206.10727%205.86259C6.04871%206.00395%206.04871%206.18315%206.04871%206.54156V6.54157L6.04871%206.54159C6.04871%206.9%206.04871%207.0792%206.10727%207.22056C6.18534%207.40905%206.33509%207.55879%206.52357%207.63687C6.66493%207.69542%206.84414%207.69542%207.20256%207.69542H11.3379L4.94405%2014.0892C4.69061%2014.3427%204.56389%2014.4694%204.50533%2014.6108C4.42726%2014.7992%204.42726%2015.011%204.50533%2015.1995C4.56389%2015.3409%204.69061%2015.4676%204.94405%2015.721C5.19749%2015.9745%205.32421%2016.1012%205.46557%2016.1597C5.65405%2016.2378%205.86583%2016.2378%206.05431%2016.1597Z%22%20fill%3D%22%23FFBD37%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "down-gray": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewBox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M8.90467%203.99244C8.84611%204.1338%208.84611%204.31301%208.84611%204.67143V13.716L5.92068%2010.7906C5.66724%2010.5371%205.54052%2010.4104%205.39916%2010.3519C5.21067%2010.2738%204.9989%2010.2738%204.81041%2010.3519C4.66905%2010.4104%204.54233%2010.5371%204.28889%2010.7906C4.03545%2011.044%203.90873%2011.1707%203.85018%2011.3121C3.77211%2011.5006%203.77211%2011.7124%203.85018%2011.9008C3.90873%2012.0422%204.03545%2012.1689%204.28889%2012.4224L9.03476%2017.1682C9.07839%2017.2127%209.12737%2017.2617%209.18231%2017.3166L9.18239%2017.3167L9.18241%2017.3167C9.40545%2017.5398%209.53035%2017.6647%209.65346%2017.7313C9.67085%2017.7408%209.6882%2017.7492%209.70577%2017.7564C9.89425%2017.8345%2010.106%2017.8345%2010.2945%2017.7564C10.4359%2017.6979%2010.5626%2017.5712%2010.816%2017.3177C10.8986%2017.2352%2010.9677%2017.1661%2011.0253%2017.1056L15.7095%2012.4214L15.7095%2012.4213C15.963%2012.1679%2016.0897%2012.0412%2016.1482%2011.8998C16.2263%2011.7114%2016.2263%2011.4996%2016.1482%2011.3111C16.0897%2011.1697%2015.963%2011.043%2015.7095%2010.7896C15.4561%2010.5361%2015.3294%2010.4094%2015.188%2010.3509C14.9995%2010.2728%2014.7878%2010.2728%2014.5993%2010.3509C14.4579%2010.4094%2014.3312%2010.5361%2014.0778%2010.7896L14.0777%2010.7896L11.1538%2013.7135V4.67142C11.1538%204.31301%2011.1538%204.1338%2011.0953%203.99244C11.0172%203.80395%2010.8674%203.6542%2010.6789%203.57613C10.5376%203.51758%2010.3584%203.51758%209.99996%203.51758C9.64154%203.51758%209.46233%203.51758%209.32097%203.57613C9.13249%203.6542%208.98274%203.80395%208.90467%203.99244Z%22%20fill%3D%22%23999999%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "right-gray": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewBox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3.32508%2011.7609C3.46644%2011.8194%203.64565%2011.8194%204.00407%2011.8194H13.049L10.1235%2014.745C9.87002%2014.9984%209.7433%2015.1251%209.68475%2015.2665C9.60668%2015.455%209.60668%2015.6668%209.68475%2015.8552C9.7433%2015.9966%209.87002%2016.1233%2010.1235%2016.3768C10.3769%2016.6302%2010.5036%2016.7569%2010.645%2016.8155C10.8335%2016.8935%2011.0452%2016.8935%2011.2337%2016.8155C11.3751%2016.7569%2011.5018%2016.6302%2011.7552%2016.3768L16.5105%2011.6215C16.5524%2011.5803%2016.5983%2011.5344%2016.6493%2011.4834L16.6495%2011.4831C16.8561%2011.2765%2016.9785%2011.1542%2017.0484%2011.0394C17.0648%2011.0128%2017.0782%2010.9866%2017.0893%2010.9599C17.1674%2010.7714%2017.1674%2010.5596%2017.0893%2010.3711C17.0308%2010.2298%2016.904%2010.1031%2016.6506%209.84962C16.5685%209.76752%2016.4997%209.69872%2016.4394%209.64123L11.7542%204.95601C11.5007%204.70257%2011.374%204.57585%2011.2327%204.5173C11.0442%204.43923%2010.8324%204.43923%2010.6439%204.5173C10.5026%204.57585%2010.3758%204.70257%2010.1224%204.95601L10.1224%204.95601C9.86895%205.20945%209.74223%205.33617%209.68368%205.47753C9.60561%205.66601%209.60561%205.87779%209.68368%206.06627C9.74223%206.20764%209.86895%206.33436%2010.1224%206.5878L13.0463%209.51175H4.00407C3.64565%209.51175%203.46644%209.51175%203.32508%209.5703C3.1366%209.64837%202.98685%209.79812%202.90877%209.98661C2.85022%2010.128%202.85022%2010.3072%202.85022%2010.6656C2.85022%2011.024%202.85022%2011.2032%202.90877%2011.3446C2.98685%2011.5331%203.1366%2011.6828%203.32508%2011.7609Z%22%20fill%3D%22%23999999%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "up-gray": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewBox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M11.0936%2017.3406C11.1522%2017.1992%2011.1522%2017.02%2011.1522%2016.6616V7.61701L14.0776%2010.5424C14.3311%2010.7959%2014.4578%2010.9226%2014.5991%2010.9811C14.7876%2011.0592%2014.9994%2011.0592%2015.1879%2010.9811C15.3292%2010.9226%2015.456%2010.7959%2015.7094%2010.5424C15.9628%2010.289%2016.0896%2010.1623%2016.1481%2010.0209C16.2262%209.83243%2016.2262%209.62066%2016.1481%209.43217C16.0896%209.29081%2015.9628%209.16409%2015.7094%208.91065L10.9645%204.16576C10.9207%204.12105%2010.8714%204.07178%2010.8161%204.01648L10.8159%204.0163C10.5916%203.792%2010.4666%203.66696%2010.3428%203.60058C10.3261%203.59154%2010.3094%203.58358%2010.2925%203.57658C10.104%203.49851%209.89226%203.49851%209.70378%203.57658C9.56242%203.63514%209.4357%203.76186%209.18226%204.0153C9.09955%204.09801%209.03034%204.16722%208.97258%204.22785L4.28878%208.91166C4.03534%209.1651%203.90862%209.29182%203.85006%209.43318C3.77199%209.62166%203.77199%209.83344%203.85006%2010.0219C3.90862%2010.1633%204.03534%2010.29%204.28878%2010.5434C4.54221%2010.7969%204.66893%2010.9236%204.8103%2010.9822C4.99878%2011.0602%205.21056%2011.0602%205.39904%2010.9822C5.5404%2010.9236%205.66712%2010.7969%205.92056%2010.5434L5.92056%2010.5434L8.84449%207.61951V16.6616C8.84449%2017.02%208.84449%2017.1992%208.90305%2017.3406C8.98112%2017.5291%209.13087%2017.6788%209.31935%2017.7569C9.46072%2017.8154%209.63992%2017.8154%209.99834%2017.8154C10.3568%2017.8154%2010.536%2017.8154%2010.6773%2017.7569C10.8658%2017.6788%2011.0156%2017.5291%2011.0936%2017.3406Z%22%20fill%3D%22%23999999%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "rightAndDown-gray": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewBox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M4.5062%206.72126C4.56476%206.86262%204.69148%206.98934%204.94492%207.24278L11.3404%2013.6382L7.20313%2013.6382C6.84471%2013.6382%206.66551%2013.6382%206.52414%2013.6968C6.33566%2013.7749%206.18591%2013.9246%206.10784%2014.1131C6.04928%2014.2545%206.04928%2014.4337%206.04928%2014.7921C6.04928%2015.1505%206.04928%2015.3297%206.10784%2015.4711C6.18591%2015.6596%206.33566%2015.8093%206.52414%2015.8874C6.66551%2015.9459%206.84471%2015.9459%207.20313%2015.9459L13.9194%2015.9459C13.9805%2015.9465%2014.0484%2015.9465%2014.1243%2015.9465H14.1243C14.4353%2015.9465%2014.6114%2015.9465%2014.7449%2015.9082C14.7659%2015.9023%2014.7859%2015.8954%2014.8052%2015.8874C14.9937%2015.8093%2015.1434%2015.6596%2015.2215%2015.4711C15.2801%2015.3297%2015.2801%2015.1505%2015.2801%2014.7921C15.2801%2014.6767%2015.2801%2014.5799%2015.2781%2014.497L15.2781%207.86957C15.2781%207.51115%2015.2781%207.33194%2015.2195%207.19058C15.1415%207.0021%2014.9917%206.85235%2014.8032%206.77428C14.6619%206.71572%2014.4827%206.71572%2014.1243%206.71572C13.7658%206.71572%2013.5866%206.71572%2013.4453%206.77428C13.2568%206.85235%2013.107%207.0021%2013.029%207.19058C12.9704%207.33194%2012.9704%207.51115%2012.9704%207.86957L12.9704%2012.0047L6.5767%205.61099C6.32326%205.35755%206.19654%205.23083%206.05518%205.17228C5.8667%205.09421%205.65492%205.09421%205.46644%205.17228C5.32508%205.23083%205.19836%205.35755%204.94492%205.61099C4.69148%205.86443%204.56476%205.99115%204.5062%206.13251C4.42813%206.32099%204.42813%206.53277%204.5062%206.72126Z%22%20fill%3D%22%23999999%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "rightAndUp-gray": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewBox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6.05431%2016.1597C6.19567%2016.1012%206.32239%2015.9745%206.57583%2015.721L12.9712%209.32568L12.9712%2013.4626C12.9712%2013.821%2012.9712%2014.0002%2013.0297%2014.1416C13.1078%2014.3301%2013.2576%2014.4798%2013.446%2014.5579C13.5874%2014.6164%2013.7666%2014.6164%2014.125%2014.6164C14.4834%2014.6164%2014.6626%2014.6164%2014.804%2014.5579C14.9925%2014.4798%2015.1422%2014.3301%2015.2203%2014.1416C15.2789%2014.0002%2015.2789%2013.821%2015.2789%2013.4626L15.2789%206.75233C15.2795%206.68972%2015.2795%206.62004%2015.2795%206.54182L15.2795%206.54157C15.2795%206.22585%2015.2795%206.04918%2015.2395%205.91495C15.2339%205.89605%2015.2276%205.878%2015.2203%205.86053C15.1422%205.67204%2014.9925%205.52229%2014.804%205.44422C14.6626%205.38567%2014.4834%205.38567%2014.125%205.38567L14.125%205.38567C14.0075%205.38567%2013.9093%205.38567%2013.8254%205.38773L7.20256%205.38773C6.84414%205.38773%206.66493%205.38773%206.52357%205.44628C6.33509%205.52436%206.18534%205.6741%206.10727%205.86259C6.04871%206.00395%206.04871%206.18315%206.04871%206.54156V6.54157L6.04871%206.54159C6.04871%206.9%206.04871%207.0792%206.10727%207.22056C6.18534%207.40905%206.33509%207.55879%206.52357%207.63687C6.66493%207.69542%206.84414%207.69542%207.20256%207.69542H11.3379L4.94405%2014.0892C4.69061%2014.3427%204.56389%2014.4694%204.50533%2014.6108C4.42726%2014.7992%204.42726%2015.011%204.50533%2015.1995C4.56389%2015.3409%204.69061%2015.4676%204.94405%2015.721C5.19749%2015.9745%205.32421%2016.1012%205.46557%2016.1597C5.65405%2016.2378%205.86583%2016.2378%206.05431%2016.1597Z%22%20fill%3D%22%23999999%22%2F%3E%0A%3C%2Fsvg%3E%0A"
  },
  "shape": {
    "cross": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%223.70374%22%20y%3D%228.14795%22%20width%3D%2212.5926%22%20height%3D%223.7037%22%20rx%3D%220.740741%22%20fill%3D%22%23FFBD37%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "up": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.44533%205.81157C9.74012%205.47858%2010.2598%205.47858%2010.5546%205.81157L16.2868%2012.2867C16.71%2012.7647%2016.3706%2013.5184%2015.7322%2013.5184H4.26776C3.62933%2013.5184%203.28995%2012.7647%203.71313%2012.2867L9.44533%205.81157Z%22%20fill%3D%22%2359D01E%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "down": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.5547%2014.1884C10.2599%2014.5214%209.74019%2014.5214%209.4454%2014.1884L3.71321%207.71335C3.29002%207.23532%203.6294%206.48161%204.26784%206.48161L15.7322%206.48161C16.3707%206.48161%2016.7101%207.23532%2016.2869%207.71335L10.5547%2014.1884Z%22%20fill%3D%22%23FE4B4B%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "rhomboid-red": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewBox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.1415%2011.1984C1.8412%2010.9074%201.8412%2010.4256%202.1415%2010.1346L9.48467%203.01785C9.77196%202.73942%2010.2284%202.73942%2010.5157%203.01786L17.8586%2010.1346C18.1589%2010.4256%2018.1589%2010.9074%2017.8586%2011.1984L10.5157%2018.3151C10.2284%2018.5936%209.77196%2018.5936%209.48467%2018.3152L2.1415%2011.1984Z%22%20fill%3D%22%23FE4B4B%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "rhomboid-gold": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewBox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.1415%2011.1984C1.8412%2010.9074%201.8412%2010.4256%202.1415%2010.1346L9.48467%203.01785C9.77196%202.73942%2010.2284%202.73942%2010.5157%203.01786L17.8586%2010.1346C18.1589%2010.4256%2018.1589%2010.9074%2017.8586%2011.1984L10.5157%2018.3151C10.2284%2018.5936%209.77196%2018.5936%209.48467%2018.3152L2.1415%2011.1984Z%22%20fill%3D%22%23FFBD37%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "roundness-greed": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewBox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%2210%22%20cy%3D%2210.6664%22%20r%3D%227.03704%22%20fill%3D%22%2359D01E%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "roundness-gold": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewBox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%2210%22%20cy%3D%2210.6664%22%20r%3D%227.03704%22%20fill%3D%22%23FFBD37%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "roundness-red": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewBox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%2210%22%20cy%3D%2210.6664%22%20r%3D%227.03704%22%20fill%3D%22%23FE4B4B%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "roundness-pink": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewBox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%2210%22%20cy%3D%2210.6664%22%20r%3D%227.03704%22%20fill%3D%22%23FB9D9D%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "roundness-gray": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewBox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%2210%22%20cy%3D%2210.6664%22%20r%3D%227.03704%22%20fill%3D%22%23999999%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "roundness-black": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewBox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%2210%22%20cy%3D%2210.6664%22%20r%3D%227.03704%22%20fill%3D%22black%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "triangle-gold": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewBox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_613_237)%22%3E%0A%3Cpath%20d%3D%22M9.32308%204.41301C9.58368%203.82623%2010.4164%203.82623%2010.677%204.413L15.9526%2016.2917C16.1701%2016.7815%2015.8115%2017.3331%2015.2756%2017.3331H4.72454C4.18858%2017.3331%203.83002%2016.7815%204.04756%2016.2917L9.32308%204.41301Z%22%20fill%3D%22%23FFBD37%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3CclipPath%20id%3D%22clip0_613_237%22%3E%0A%3Crect%20width%3D%2220%22%20height%3D%2220%22%20fill%3D%22white%22%20transform%3D%22translate(0%200.666504)%22%2F%3E%0A%3C%2FclipPath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E%0A",
    "indicate-greed": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%222.76941%22%20y%3D%222.76941%22%20width%3D%2214.4612%22%20height%3D%2214.4612%22%20rx%3D%223%22%20fill%3D%22black%22%2F%3E%0A%3Ccircle%20cx%3D%2210%22%20cy%3D%2210%22%20r%3D%224.5%22%20fill%3D%22%2359D01E%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "indicate-gold": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%222.76941%22%20y%3D%222.76941%22%20width%3D%2214.4612%22%20height%3D%2214.4612%22%20rx%3D%223%22%20fill%3D%22black%22%2F%3E%0A%3Ccircle%20cx%3D%2210%22%20cy%3D%2210%22%20r%3D%224.5%22%20fill%3D%22%23FFBD37%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "indicate-red": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%222.76941%22%20y%3D%222.76941%22%20width%3D%2214.4612%22%20height%3D%2214.4612%22%20rx%3D%223%22%20fill%3D%22black%22%2F%3E%0A%3Ccircle%20cx%3D%2210%22%20cy%3D%2210%22%20r%3D%224.5%22%20fill%3D%22%23FE4B4B%22%2F%3E%0A%3C%2Fsvg%3E%0A"
  },
  "feedback2": {
    "mistake2": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewBox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M4.12194%206.33702C4.1805%206.47839%204.30722%206.6051%204.56066%206.85854L8.36822%2010.6661L4.56062%2014.4737C4.30718%2014.7272%204.18046%2014.8539%204.12191%2014.9952C4.04384%2015.1837%204.04384%2015.3955%204.12191%2015.584C4.18046%2015.7253%204.30718%2015.8521%204.56062%2016.1055C4.81406%2016.3589%204.94078%2016.4857%205.08214%2016.5442C5.27062%2016.6223%205.4824%2016.6223%205.67089%2016.5442C5.81225%2016.4857%205.93897%2016.3589%206.19241%2016.1055L10%2012.2979L13.8074%2016.1053C14.0609%2016.3588%2014.1876%2016.4855%2014.329%2016.544C14.5174%2016.6221%2014.7292%2016.6221%2014.9177%2016.544C15.0591%2016.4855%2015.1858%2016.3588%2015.4392%2016.1053L15.4392%2016.1053C15.6927%2015.8519%2015.8194%2015.7252%2015.8779%2015.5838C15.956%2015.3953%2015.956%2015.1835%2015.8779%2014.9951C15.8194%2014.8537%2015.6927%2014.727%2015.4392%2014.4735L15.4392%2014.4735L11.6318%2010.6661L15.4392%206.85872C15.6926%206.60528%2015.8193%206.47856%2015.8779%206.3372C15.956%206.14871%2015.956%205.93694%2015.8779%205.74845C15.8193%205.60709%2015.6926%205.48037%2015.4392%205.22693C15.1857%204.97349%2015.059%204.84677%2014.9177%204.78822C14.7292%204.71015%2014.5174%204.71015%2014.3289%204.78822C14.1876%204.84677%2014.0608%204.97349%2013.8074%205.22693L10%209.03433L6.19244%205.22676C5.939%204.97332%205.81228%204.8466%205.67092%204.78805C5.48244%204.70997%205.27066%204.70997%205.08218%204.78805C4.94082%204.8466%204.8141%204.97332%204.56066%205.22676L4.56066%205.22676C4.30722%205.4802%204.1805%205.60692%204.12194%205.74828C4.04387%205.93676%204.04387%206.14854%204.12194%206.33702Z%22%20fill%3D%22%23FE4B4B%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "warn2": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewBox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8.49778%205.00963C8.48513%204.56774%208.47881%204.3468%208.56086%204.17746C8.63301%204.02856%208.75124%203.90689%208.89802%203.83052C9.06494%203.74365%209.28597%203.74365%209.72805%203.74365H10.272C10.714%203.74365%2010.9351%203.74365%2011.102%203.83052C11.2488%203.9069%2011.367%204.02856%2011.4392%204.17746C11.5212%204.3468%2011.5149%204.56775%2011.5022%205.00964L11.2644%2013.3173C11.2524%2013.737%2011.2464%2013.9468%2011.1609%2014.1065C11.0857%2014.2471%2010.9687%2014.3609%2010.826%2014.432C10.6639%2014.5129%2010.454%2014.5129%2010.0342%2014.5129H9.96582C9.54601%2014.5129%209.33611%2014.5129%209.17397%2014.432C9.0313%2014.3609%208.91426%2014.2471%208.83904%2014.1065C8.75357%2013.9468%208.74756%2013.737%208.73555%2013.3173L8.49778%205.00963Z%22%20fill%3D%22%23FFBD37%22%2F%3E%0A%3Crect%20x%3D%228.76917%22%20y%3D%2215.2817%22%20width%3D%222.46154%22%20height%3D%222.46154%22%20rx%3D%220.769231%22%20fill%3D%22%23FFBD37%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "correct2": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewBox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_613_248)%22%3E%0A%3Cpath%20d%3D%22M15.689%205.69723C15.5476%205.75578%2015.4209%205.8825%2015.1675%206.13594L7.82436%2013.4791L4.83279%2010.4875C4.57935%2010.2341%204.45263%2010.1073%204.31127%2010.0488C4.12278%209.97071%203.91101%209.97071%203.72252%2010.0488C3.58116%2010.1073%203.45444%2010.2341%203.201%2010.4875C2.94756%2010.7409%202.82084%2010.8676%202.76229%2011.009C2.68422%2011.1975%202.68422%2011.4093%202.76229%2011.5978C2.82084%2011.7391%202.94756%2011.8658%203.201%2012.1193L7.0085%2015.9268C7.26194%2016.1802%207.38866%2016.3069%207.53002%2016.3655C7.7185%2016.4436%207.93028%2016.4436%208.11876%2016.3655C8.26013%2016.3069%208.38685%2016.1802%208.64028%2015.9268C8.66387%2015.9032%208.68636%2015.8807%208.7078%2015.8592L16.7993%207.76772C17.0527%207.51428%2017.1794%207.38756%2017.238%207.2462C17.3161%207.05772%2017.3161%206.84594%2017.238%206.65746C17.1794%206.5161%2017.0527%206.38938%2016.7993%206.13594C16.5458%205.8825%2016.4191%205.75578%2016.2777%205.69723C16.0893%205.61915%2015.8775%205.61915%2015.689%205.69723Z%22%20fill%3D%22%2359D01E%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3CclipPath%20id%3D%22clip0_613_248%22%3E%0A%3Crect%20width%3D%2220%22%20height%3D%2220%22%20fill%3D%22white%22%20transform%3D%22translate(0%200.666504)%22%2F%3E%0A%3C%2FclipPath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E%0A"
  },
  "flag": {
    "flag-green": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewBox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M15.4274%204.74935C14.0982%205.1012%2013.1363%205.13675%2012.3604%205.03379C11.5776%204.93009%2010.9487%204.68342%2010.2456%204.40416L10.2246%204.39527C9.53411%204.1212%208.76945%203.8175%207.81312%203.69157C6.84279%203.56268%205.71016%203.61898%204.24802%204.0049C4.09343%204.04217%203.95538%204.13393%203.85649%204.26515C3.7576%204.39636%203.70374%204.55925%203.70374%204.72712V17.3197C3.70374%2017.5162%203.79534%2017.7046%203.92654%2017.8435C4.05773%2017.9824%204.25893%2018.0605%204.44448%2018.0605C4.63002%2018.0605%204.84911%2017.9824%204.98031%2017.8435C5.11151%2017.7046%205.18522%2017.5162%205.18522%2017.3197V14.9123V12.5049C6.24649%2012.2738%206.97081%2012.2605%207.63962%2012.3486C8.42246%2012.4523%209.05139%2012.699%209.75448%2012.9782L9.77546%2012.9871C10.466%2013.2612%2011.2306%2013.5649%2012.1869%2013.6908C13.1601%2013.8197%2014.2976%2013.7627%2015.7667%2013.3738C15.8866%2013.3421%2016.0727%2013.2135%2016.1483%2013.111C16.2238%2013.0084%2016.2963%2012.8204%2016.2963%2012.6553V5.46787C16.2963%205.35535%2016.2721%205.24432%2016.2255%205.1432C16.1788%205.04208%2016.1111%204.95353%2016.0274%204.88428C15.9436%204.81502%2015.846%204.76688%2015.7421%204.7435C15.6382%204.72012%2015.494%204.73173%2015.4274%204.74935Z%22%20fill%3D%22%2359D01E%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "flag-gold": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewBox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M15.4274%204.74935C14.0982%205.1012%2013.1363%205.13675%2012.3604%205.03379C11.5776%204.93009%2010.9487%204.68342%2010.2456%204.40416L10.2246%204.39527C9.53411%204.1212%208.76945%203.8175%207.81312%203.69157C6.84279%203.56268%205.71016%203.61898%204.24802%204.0049C4.09343%204.04217%203.95538%204.13393%203.85649%204.26515C3.7576%204.39636%203.70374%204.55925%203.70374%204.72712V17.3197C3.70374%2017.5162%203.79534%2017.7046%203.92654%2017.8435C4.05773%2017.9824%204.25893%2018.0605%204.44448%2018.0605C4.63002%2018.0605%204.84911%2017.9824%204.98031%2017.8435C5.11151%2017.7046%205.18522%2017.5162%205.18522%2017.3197V14.9123V12.5049C6.24649%2012.2738%206.97081%2012.2605%207.63962%2012.3486C8.42246%2012.4523%209.05139%2012.699%209.75448%2012.9782L9.77546%2012.9871C10.466%2013.2612%2011.2306%2013.5649%2012.1869%2013.6908C13.1601%2013.8197%2014.2976%2013.7627%2015.7667%2013.3738C15.8866%2013.3421%2016.0727%2013.2135%2016.1483%2013.111C16.2238%2013.0084%2016.2963%2012.8204%2016.2963%2012.6553V5.46787C16.2963%205.35535%2016.2721%205.24432%2016.2255%205.1432C16.1788%205.04208%2016.1111%204.95353%2016.0274%204.88428C15.9436%204.81502%2015.846%204.76688%2015.7421%204.7435C15.6382%204.72012%2015.494%204.73173%2015.4274%204.74935Z%22%20fill%3D%22%23FFBD37%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "flag-red": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewBox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M15.4274%204.74935C14.0982%205.1012%2013.1363%205.13675%2012.3604%205.03379C11.5776%204.93009%2010.9487%204.68342%2010.2456%204.40416L10.2246%204.39527C9.53411%204.1212%208.76945%203.8175%207.81312%203.69157C6.84279%203.56268%205.71016%203.61898%204.24802%204.0049C4.09343%204.04217%203.95538%204.13393%203.85649%204.26515C3.7576%204.39636%203.70374%204.55925%203.70374%204.72712V17.3197C3.70374%2017.5162%203.79534%2017.7046%203.92654%2017.8435C4.05773%2017.9824%204.25893%2018.0605%204.44448%2018.0605C4.63002%2018.0605%204.84911%2017.9824%204.98031%2017.8435C5.11151%2017.7046%205.18522%2017.5162%205.18522%2017.3197V14.9123V12.5049C6.24649%2012.2738%206.97081%2012.2605%207.63962%2012.3486C8.42246%2012.4523%209.05139%2012.699%209.75448%2012.9782L9.77546%2012.9871C10.466%2013.2612%2011.2306%2013.5649%2012.1869%2013.6908C13.1601%2013.8197%2014.2976%2013.7627%2015.7667%2013.3738C15.8866%2013.3421%2016.0727%2013.2135%2016.1483%2013.111C16.2238%2013.0084%2016.2963%2012.8204%2016.2963%2012.6553V5.46787C16.2963%205.35535%2016.2721%205.24432%2016.2255%205.1432C16.1788%205.04208%2016.1111%204.95353%2016.0274%204.88428C15.9436%204.81502%2015.846%204.76688%2015.7421%204.7435C15.6382%204.72012%2015.494%204.73173%2015.4274%204.74935Z%22%20fill%3D%22%23FE4B4B%22%2F%3E%0A%3C%2Fsvg%3E%0A"
  },
  "cell": {
    "cell-0": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%224%22%20y%3D%2211.001%22%20width%3D%225%22%20height%3D%225%22%20rx%3D%221%22%20fill%3D%22%23E5E5E5%22%2F%3E%0A%3Crect%20x%3D%2211%22%20y%3D%2211.001%22%20width%3D%225%22%20height%3D%225%22%20rx%3D%221%22%20fill%3D%22%23E5E5E5%22%2F%3E%0A%3Crect%20x%3D%224%22%20y%3D%224.00098%22%20width%3D%225%22%20height%3D%225%22%20rx%3D%221%22%20fill%3D%22%23E5E5E5%22%2F%3E%0A%3Crect%20x%3D%2211%22%20y%3D%224.00098%22%20width%3D%225%22%20height%3D%225%22%20rx%3D%221%22%20fill%3D%22%23E5E5E5%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "cell-25": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%224%22%20y%3D%2211.001%22%20width%3D%225%22%20height%3D%225%22%20rx%3D%221%22%20fill%3D%22%23E5E5E5%22%2F%3E%0A%3Crect%20x%3D%2211%22%20y%3D%2211.001%22%20width%3D%225%22%20height%3D%225%22%20rx%3D%221%22%20fill%3D%22%23E5E5E5%22%2F%3E%0A%3Crect%20x%3D%224.25%22%20y%3D%224.25098%22%20width%3D%224.5%22%20height%3D%224.5%22%20rx%3D%220.75%22%20fill%3D%22%230493EE%22%20stroke%3D%22%230493EE%22%20stroke-width%3D%220.5%22%2F%3E%0A%3Crect%20x%3D%2211%22%20y%3D%224.00098%22%20width%3D%225%22%20height%3D%225%22%20rx%3D%221%22%20fill%3D%22%23E5E5E5%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "cell-50": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%224%22%20y%3D%2211.001%22%20width%3D%225%22%20height%3D%225%22%20rx%3D%221%22%20fill%3D%22%23E5E5E5%22%2F%3E%0A%3Crect%20x%3D%2211%22%20y%3D%2211.001%22%20width%3D%225%22%20height%3D%225%22%20rx%3D%221%22%20fill%3D%22%23E5E5E5%22%2F%3E%0A%3Crect%20x%3D%224.25%22%20y%3D%224.25098%22%20width%3D%224.5%22%20height%3D%224.5%22%20rx%3D%220.75%22%20fill%3D%22%230493EE%22%20stroke%3D%22%230493EE%22%20stroke-width%3D%220.5%22%2F%3E%0A%3Crect%20x%3D%2211.25%22%20y%3D%224.25098%22%20width%3D%224.5%22%20height%3D%224.5%22%20rx%3D%220.75%22%20fill%3D%22%230493EE%22%20stroke%3D%22%230493EE%22%20stroke-width%3D%220.5%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "cell-75": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%224.25%22%20y%3D%2211.251%22%20width%3D%224.5%22%20height%3D%224.5%22%20rx%3D%220.75%22%20fill%3D%22%230493EE%22%20stroke%3D%22%230493EE%22%20stroke-width%3D%220.5%22%2F%3E%0A%3Crect%20x%3D%2211%22%20y%3D%2211.001%22%20width%3D%225%22%20height%3D%225%22%20rx%3D%221%22%20fill%3D%22%23E5E5E5%22%2F%3E%0A%3Crect%20x%3D%224.25%22%20y%3D%224.25098%22%20width%3D%224.5%22%20height%3D%224.5%22%20rx%3D%220.75%22%20fill%3D%22%230493EE%22%20stroke%3D%22%230493EE%22%20stroke-width%3D%220.5%22%2F%3E%0A%3Crect%20x%3D%2211.25%22%20y%3D%224.25098%22%20width%3D%224.5%22%20height%3D%224.5%22%20rx%3D%220.75%22%20fill%3D%22%230493EE%22%20stroke%3D%22%230493EE%22%20stroke-width%3D%220.5%22%2F%3E%0A%3C%2Fsvg%3E%0A",
    "cell-100": "data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%224.25%22%20y%3D%2211.251%22%20width%3D%224.5%22%20height%3D%224.5%22%20rx%3D%220.75%22%20fill%3D%22%230493EE%22%20stroke%3D%22%230493EE%22%20stroke-width%3D%220.5%22%2F%3E%0A%3Crect%20x%3D%2211.25%22%20y%3D%2211.251%22%20width%3D%224.5%22%20height%3D%224.5%22%20rx%3D%220.75%22%20fill%3D%22%230493EE%22%20stroke%3D%22%230493EE%22%20stroke-width%3D%220.5%22%2F%3E%0A%3Crect%20x%3D%224.25%22%20y%3D%224.25098%22%20width%3D%224.5%22%20height%3D%224.5%22%20rx%3D%220.75%22%20fill%3D%22%230493EE%22%20stroke%3D%22%230493EE%22%20stroke-width%3D%220.5%22%2F%3E%0A%3Crect%20x%3D%2211.25%22%20y%3D%224.25098%22%20width%3D%224.5%22%20height%3D%224.5%22%20rx%3D%220.75%22%20fill%3D%22%230493EE%22%20stroke%3D%22%230493EE%22%20stroke-width%3D%220.5%22%2F%3E%0A%3C%2Fsvg%3E%0A"
  }
};

// ../packages/sheets-conditional-formatting/src/models/icon-map.ts
var iconGroup = [
  {
    title: "sheet.cf.iconSet.direction",
    group: [
      { name: "3Arrows", list: [ICON_MAP.arrow["up-green"], ICON_MAP.arrow["right-gold"], ICON_MAP.arrow["down-red"]] },
      { name: "3ArrowsGray", list: [ICON_MAP.arrow["up-gray"], ICON_MAP.arrow["right-gray"], ICON_MAP.arrow["down-gray"]] },
      { name: "4Arrows", list: [ICON_MAP.arrow["up-green"], ICON_MAP.arrow["rightAndUp-gold"], ICON_MAP.arrow["rightAndDown-gold"], ICON_MAP.arrow["down-red"]] },
      { name: "4ArrowsGray", list: [ICON_MAP.arrow["up-gray"], ICON_MAP.arrow["rightAndUp-gray"], ICON_MAP.arrow["rightAndDown-gray"], ICON_MAP.arrow["down-gray"]] },
      { name: "5Arrows", list: [ICON_MAP.arrow["up-green"], ICON_MAP.arrow["rightAndUp-gold"], ICON_MAP.arrow["right-gold"], ICON_MAP.arrow["rightAndDown-gold"], ICON_MAP.arrow["down-red"]] },
      { name: "5ArrowsGray", list: [ICON_MAP.arrow["up-gray"], ICON_MAP.arrow["rightAndUp-gray"], ICON_MAP.arrow["right-gray"], ICON_MAP.arrow["rightAndDown-gray"], ICON_MAP.arrow["down-gray"]] },
      { name: "3Triangles", list: [ICON_MAP.shape.up, ICON_MAP.shape.cross, ICON_MAP.shape.down] }
    ]
  },
  {
    title: "sheet.cf.iconSet.shape",
    group: [
      {
        name: "3TrafficLights1",
        list: [ICON_MAP.shape["roundness-greed"], ICON_MAP.shape["roundness-gold"], ICON_MAP.shape["roundness-red"]]
      },
      {
        name: "3Signs",
        list: [ICON_MAP.shape["roundness-greed"], ICON_MAP.shape["triangle-gold"], ICON_MAP.shape["rhomboid-red"]]
      },
      { name: "3TrafficLights2", list: [ICON_MAP.shape["indicate-greed"], ICON_MAP.shape["indicate-gold"], ICON_MAP.shape["indicate-red"]] },
      {
        name: "4RedToBlack",
        list: [ICON_MAP.shape["roundness-red"], ICON_MAP.shape["roundness-pink"], ICON_MAP.shape["roundness-gray"], ICON_MAP.shape["roundness-black"]]
      },
      {
        name: "4TrafficLights",
        list: [ICON_MAP.shape["roundness-greed"], ICON_MAP.shape["roundness-gold"], ICON_MAP.shape["roundness-red"], ICON_MAP.shape["roundness-black"]]
      }
    ]
  },
  {
    title: "sheet.cf.iconSet.mark",
    group: [
      {
        name: "3Symbols",
        list: [ICON_MAP.feedback.correct, ICON_MAP.feedback.warn, ICON_MAP.feedback.mistake]
      },
      {
        name: "3Symbols2",
        list: [ICON_MAP.feedback2.correct2, ICON_MAP.feedback2.warn2, ICON_MAP.feedback2.mistake2]
      },
      {
        name: "3Flags",
        list: [ICON_MAP.flag["flag-green"], ICON_MAP.flag["flag-gold"], ICON_MAP.flag["flag-red"]]
      }
    ]
  },
  {
    title: "sheet.cf.iconSet.rank",
    group: [
      {
        name: "4Rating",
        list: [ICON_MAP.signal.signal25, ICON_MAP.signal.signal50, ICON_MAP.signal.signal75, ICON_MAP.signal.signal100]
      },
      {
        name: "5Rating",
        list: [ICON_MAP.signal.signal0, ICON_MAP.signal.signal25, ICON_MAP.signal.signal50, ICON_MAP.signal.signal75, ICON_MAP.signal.signal100]
      },
      {
        name: "5Quarters",
        list: [ICON_MAP.progress.progress100, ICON_MAP.progress.progress75, ICON_MAP.progress.progress50, ICON_MAP.progress.progress25, ICON_MAP.progress.progress0]
      },
      {
        name: "_5Felling",
        list: [ICON_MAP.feeling.guffaw, ICON_MAP.feeling.smile, ICON_MAP.feeling.noninductive, ICON_MAP.feeling.dissatisfied, ICON_MAP.feeling.impatient]
      },
      {
        name: "5Boxes",
        list: [ICON_MAP.cell["cell-100"], ICON_MAP.cell["cell-75"], ICON_MAP.cell["cell-50"], ICON_MAP.cell["cell-25"], ICON_MAP.cell["cell-0"]]
      },
      {
        name: "3Stars",
        list: [ICON_MAP.star.starFull, ICON_MAP.star.starIncomplete, ICON_MAP.star.starEmpty]
      }
    ]
  }
];
var iconMap = iconGroup.reduce((result, cur) => {
  const { group } = cur;
  for (const v of group) {
    result[v.name] = v.list;
  }
  return result;
}, {});
for (const key in iconMap) {
  const v = iconMap[key];
  Object.freeze(v);
}
var EMPTY_ICON_TYPE = "EMPTY_ICON_TYPE";

// ../packages/sheets-conditional-formatting/src/render/icon.render.ts
var IconUKey = "sheet-conditional-rule-icon";
var EXTENSION_Z_INDEX2 = 35;
var DEFAULT_WIDTH = 15;
var DEFAULT_PADDING = 2;
var stringifyRange2 = (range) => {
  const { startRow, endRow, startColumn, endColumn } = range;
  return `${startRow}-${endRow}-${startColumn}-${endColumn}`;
};
var ConditionalFormattingIcon = class extends SheetExtension {
  constructor() {
    super();
    __publicField(this, "_paddingRightAndLeft", DEFAULT_PADDING);
    __publicField(this, "_width", DEFAULT_WIDTH);
    __publicField(this, "_imageMap", /* @__PURE__ */ new Map());
    __publicField(this, "uKey", IconUKey);
    __publicField(this, "Z_INDEX", EXTENSION_Z_INDEX2);
    __publicField(this, "_radius", 1);
    this._init();
  }
  draw(ctx, _parentScale, spreadsheetSkeleton, diffRanges) {
    const { worksheet } = spreadsheetSkeleton;
    if (!worksheet) {
      return false;
    }
    const mergeCellRendered = /* @__PURE__ */ new Set();
    ctx.save();
    Range.foreach(spreadsheetSkeleton.rowColumnSegment, (row, col) => {
      if (!worksheet.getRowVisible(row) || !worksheet.getColVisible(col)) {
        return;
      }
      const primaryWithCoord = spreadsheetSkeleton.getCellWithCoordByIndex(row, col, false);
      const { isMerged, isMergedMainCell, mergeInfo } = primaryWithCoord;
      let cellData = worksheet.getCell(row, col);
      if (isMerged) {
        cellData = worksheet.getCell(mergeInfo.startRow, mergeInfo.startColumn);
      }
      if (!(cellData == null ? void 0 : cellData.iconSet)) {
        return;
      }
      const { iconType, iconId } = cellData.iconSet;
      if (iconType === EMPTY_ICON_TYPE) {
        return;
      }
      const icon = this._imageMap.get(this._createKey(iconType, iconId));
      if (!icon) {
        return;
      }
      if (!this.isRenderDiffRangesByCell(mergeInfo, diffRanges)) {
        return;
      }
      if (isMerged || isMergedMainCell) {
        const rangeStr = stringifyRange2(mergeInfo);
        if (mergeCellRendered.has(rangeStr)) {
          return;
        }
        mergeCellRendered.add(rangeStr);
      }
      const { startX, endX, startY, endY } = isMerged || isMergedMainCell ? mergeInfo : primaryWithCoord;
      const borderWidth = endX - startX;
      const borderHeight = endY - startY;
      if (this._width > borderHeight || this._width > borderWidth + this._paddingRightAndLeft * 2) {
        return;
      }
      const y = (borderHeight - this._width) / 2 + startY;
      ctx.drawImage(icon, startX + this._paddingRightAndLeft, y, this._width, this._width);
    });
    ctx.restore();
  }
  _init() {
    for (const type in iconMap) {
      const list = iconMap[type];
      list.forEach((base64, index) => {
        const key = this._createKey(type, String(index));
        const image = new Image();
        image.onload = () => {
          this._imageMap.set(key, image);
        };
        image.src = base64;
      });
    }
  }
  _createKey(iconType, iconIndex) {
    return `${iconType}_${iconIndex}`;
  }
};
SpreadsheetExtensionRegistry.add(ConditionalFormattingIcon);

// ../packages/sheets-conditional-formatting/src/utils/remove-undefined-attr.ts
function removeUndefinedAttr(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = removeUndefinedAttr(obj[key]);
      if (value !== void 0) {
        result[key] = value;
      }
    }
  }
  return result;
}

export {
  SHEET_CONDITIONAL_FORMATTING_PLUGIN,
  CFTimePeriodOperator,
  CFNumberOperator,
  DEFAULT_BG_COLOR,
  DEFAULT_FONT_COLOR,
  createDefaultRule,
  createDefaultValue,
  createDefaultValueByValueType,
  createCfId,
  ConditionalFormattingRuleModel,
  MoveConditionalRuleMutation,
  DeleteConditionalRuleMutationUndoFactory,
  DeleteConditionalRuleMutation,
  AddConditionalRuleMutationUndoFactory,
  AddConditionalRuleMutation,
  AddCfCommand,
  SetConditionalRuleMutation,
  setConditionalRuleMutationUndoFactory,
  ClearRangeCfCommand,
  ClearWorksheetCfCommand,
  DeleteCfCommand,
  MoveCfCommand,
  SetCfCommand,
  defaultDataBarPositiveColor,
  defaultDataBarNativeColor,
  CONDITIONAL_FORMATTING_VIEWPORT_CACHE_LENGTH,
  ConditionalFormattingViewModel,
  compareWithNumber,
  getOppositeOperator,
  getColorScaleFromValue,
  iconGroup,
  iconMap,
  EMPTY_ICON_TYPE,
  ConditionalFormattingService,
  UniverSheetsConditionalFormattingPlugin,
  DEFAULT_WIDTH,
  DEFAULT_PADDING,
  removeUndefinedAttr
};
