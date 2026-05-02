import {
  ALL_IMPLEMENTED_FUNCTIONS_SET,
  AsyncCustomFunction,
  ClearSelectionFormatCommand,
  CustomFunction,
  DeleteRangeMoveLeftCommand,
  DeleteRangeMoveUpCommand,
  ENGINE_FORMULA_CYCLE_REFERENCE_COUNT,
  ENGINE_FORMULA_RETURN_DEPENDENCY_TREE,
  EffectRefRangId,
  FormulaDataModel,
  IActiveDirtyManagerService,
  IAutoFillService,
  IDefinedNamesService,
  IFunctionService,
  INTERCEPTOR_POINT,
  IRPCChannelService,
  ISuperTableService,
  InsertColCommand,
  InsertColMutation,
  InsertRangeMoveDownCommand,
  InsertRangeMoveRightCommand,
  InsertRowCommand,
  InsertRowMutation,
  InsertSheetMutation,
  LexerTreeBuilder,
  MoveColsCommand,
  MoveColsMutation,
  MoveRangeCommand,
  MoveRangeMutation,
  MoveRowsCommand,
  MoveRowsMutation,
  OtherFormulaMarkDirty,
  RefRangeService,
  RegisterOtherFormulaService,
  RemoveColCommand,
  RemoveColMutation,
  RemoveDefinedNameCommand,
  RemoveDefinedNameMutation,
  RemoveRowCommand,
  RemoveRowMutation,
  RemoveSheetCommand,
  RemoveSheetMutation,
  RemoveSuperTableMutation,
  ReorderRangeMutation,
  SCOPE_WORKBOOK_VALUE_DEFINED_NAME,
  SetArrayFormulaDataMutation,
  SetBorderCommand,
  SetDefinedNameCommand,
  SetDefinedNameMutation,
  SetFormulaCalculationNotificationMutation,
  SetFormulaCalculationResultMutation,
  SetFormulaCalculationStartMutation,
  SetFormulaCalculationStopMutation,
  SetFormulaDataMutation,
  SetFormulaStringBatchCalculationMutation,
  SetImageFormulaDataMutation,
  SetRangeCustomMetadataCommand,
  SetRangeValuesCommand,
  SetRangeValuesMutation,
  SetRowHiddenMutation,
  SetRowVisibleMutation,
  SetSelectionsOperation,
  SetStyleCommand,
  SetSuperTableMutation,
  SetTriggerFormulaCalculationStartMutation,
  SetWorksheetActiveOperation,
  SetWorksheetNameCommand,
  SheetInterceptorService,
  SheetsSelectionsService,
  UniverFormulaEnginePlugin,
  UniverSheetsPlugin,
  alignToMergedCellsBorders,
  deserializeRangeWithSheetWithCache,
  expandToContinuousRange,
  findFirstNonEmptyCell,
  fromModule,
  generateStringWithSequence,
  getSeparateEffectedRangesOnCommand,
  getSheetCommandTarget,
  handleCommonDefaultRangeChangeWithEffectRefCommands,
  handleDefaultRangeChangeWithEffectRefCommands,
  handleDeleteRangeMoveLeft,
  handleDeleteRangeMoveUp,
  handleIRemoveCol,
  handleIRemoveRow,
  handleInsertCol,
  handleInsertRangeMoveDown,
  handleInsertRangeMoveRight,
  handleInsertRow,
  handleMoveCols,
  handleMoveRange,
  handleMoveRows,
  initSheetFormulaData,
  isReferenceStrings,
  runRefRangeMutations,
  serializeRange,
  serializeRangeToRefString,
  serializeRangeWithSheet,
  serializeRangeWithSpreadsheet,
  stripErrorMargin,
  toModule
} from "./chunk-JGEZE7BC.js";
import {
  BehaviorSubject,
  BuildTextUtils,
  DependentOn,
  Disposable,
  DisposableCollection,
  ICommandService,
  IConfigService,
  ILogService,
  IUniverInstanceService,
  Inject,
  Injector,
  LocaleService,
  ObjectMatrix,
  Optional,
  Plugin,
  Rectangle,
  Tools,
  cellToRange,
  createDocumentModelWithStyle,
  createIdentifier,
  generateRandomId,
  getIntersectRange,
  isFormulaId,
  isFormulaString,
  isNodeEnv,
  isRealNum,
  map,
  merge_default,
  moveRangeByOffset,
  sequenceExecuteAsync,
  toDisposable,
  touchDependencies
} from "./chunk-UI3TUZSE.js";
import {
  __decorateClass,
  __decorateParam,
  __publicField
} from "./chunk-24OICD5T.js";

// ../packages/sheets-formula/package.json
var package_default = {
  name: "@univerjs/sheets-formula",
  version: "0.21.1",
  private: false,
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
    "./locale/*": "./src/locale/*.ts",
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
      "./locale/*": {
        import: "./lib/es/locale/*.js",
        require: "./lib/cjs/locale/*.js",
        types: "./lib/types/locale/*.d.ts"
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
    "@univerjs/rpc": "workspace:*",
    "@univerjs/sheets": "workspace:*"
  },
  devDependencies: {
    "@univerjs-infra/shared": "workspace:*",
    "@univerjs/docs": "workspace:*",
    "@univerjs/engine-render": "workspace:*",
    rxjs: "^7.8.2",
    typescript: "^6.0.2",
    vitest: "^4.1.4"
  }
};

// ../packages/sheets-formula/src/common/plugin-name.ts
var SHEETS_FORMULA_PLUGIN_NAME = "SHEETS_FORMULA_PLUGIN";

// ../packages/sheets-formula/src/config/config.ts
var PLUGIN_CONFIG_KEY_BASE = "sheets-formula.base.config";
var configSymbolBase = Symbol(PLUGIN_CONFIG_KEY_BASE);
var CalculationMode = /* @__PURE__ */ ((CalculationMode2) => {
  CalculationMode2[CalculationMode2["FORCED"] = 0] = "FORCED";
  CalculationMode2[CalculationMode2["WHEN_EMPTY"] = 1] = "WHEN_EMPTY";
  CalculationMode2[CalculationMode2["NO_CALCULATION"] = 2] = "NO_CALCULATION";
  return CalculationMode2;
})(CalculationMode || {});
var defaultPluginBaseConfig = {};
var PLUGIN_CONFIG_KEY_REMOTE = "sheets-formula.remote.config";
var configSymbolRemote = Symbol(PLUGIN_CONFIG_KEY_REMOTE);
var defaultPluginRemoteConfig = {};
var PLUGIN_CONFIG_KEY_MOBILE = "sheets-formula.mobile.config";
var configSymbolMobile = Symbol(PLUGIN_CONFIG_KEY_MOBILE);

// ../packages/sheets-formula/src/controllers/active-dirty.controller.ts
var ActiveDirtyController = class extends Disposable {
  constructor(_activeDirtyManagerService, _univerInstanceService, _formulaDataModel) {
    super();
    __publicField(this, "_activeDirtyManagerService", _activeDirtyManagerService);
    __publicField(this, "_univerInstanceService", _univerInstanceService);
    __publicField(this, "_formulaDataModel", _formulaDataModel);
    this._initialize();
  }
  _initialize() {
    this._initialConversion();
  }
  _initialConversion() {
    this._activeDirtyManagerService.register(SetRangeValuesMutation.id, {
      commandId: SetRangeValuesMutation.id,
      getDirtyData: (command) => {
        const params = command.params;
        if (params.trigger === SetStyleCommand.id) {
          return {};
        }
        return {
          dirtyRanges: this._getSetRangeValuesMutationDirtyRange(params)
        };
      }
    });
    this._initialMove();
    this._initialRowAndColumn();
    this._initialHideRow();
    this._initialSheet();
    this._initialDefinedName();
  }
  _initialMove() {
    this._activeDirtyManagerService.register(MoveRangeMutation.id, {
      commandId: MoveRangeMutation.id,
      getDirtyData: (command) => {
        const params = command.params;
        return {
          dirtyRanges: this._getMoveRangeMutationDirtyRange(params),
          clearDependencyTreeCache: {
            [params.unitId]: {
              [params.to.subUnitId]: "1",
              [params.from.subUnitId]: "1"
            }
          }
        };
      }
    });
    this._activeDirtyManagerService.register(MoveRowsMutation.id, {
      commandId: MoveRowsMutation.id,
      getDirtyData: (command) => {
        const params = command.params;
        return {
          dirtyRanges: this._getMoveRowsMutationDirtyRange(params),
          clearDependencyTreeCache: {
            [params.unitId]: {
              [params.subUnitId]: "1"
            }
          }
        };
      }
    });
    this._activeDirtyManagerService.register(MoveColsMutation.id, {
      commandId: MoveColsMutation.id,
      getDirtyData: (command) => {
        const params = command.params;
        return {
          dirtyRanges: this._getMoveRowsMutationDirtyRange(params),
          clearDependencyTreeCache: {
            [params.unitId]: {
              [params.subUnitId]: "1"
            }
          }
        };
      }
    });
    this._activeDirtyManagerService.register(ReorderRangeMutation.id, {
      commandId: ReorderRangeMutation.id,
      getDirtyData: (command) => {
        const params = command.params;
        return {
          dirtyRanges: this._getReorderRangeMutationDirtyRange(params),
          clearDependencyTreeCache: {
            [params.unitId]: {
              [params.subUnitId]: "1"
            }
          }
        };
      }
    });
  }
  _initialRowAndColumn() {
    this._activeDirtyManagerService.register(RemoveRowMutation.id, {
      commandId: RemoveRowMutation.id,
      getDirtyData: (command) => {
        const params = command.params;
        return {
          dirtyRanges: this._getRemoveRowOrColumnMutation(params, true),
          clearDependencyTreeCache: {
            [params.unitId]: {
              [params.subUnitId]: "1"
            }
          }
        };
      }
    });
    this._activeDirtyManagerService.register(RemoveColMutation.id, {
      commandId: RemoveColMutation.id,
      getDirtyData: (command) => {
        const params = command.params;
        return {
          dirtyRanges: this._getRemoveRowOrColumnMutation(params, false),
          clearDependencyTreeCache: {
            [params.unitId]: {
              [params.subUnitId]: "1"
            }
          }
        };
      }
    });
    this._activeDirtyManagerService.register(InsertColMutation.id, {
      commandId: InsertColMutation.id,
      getDirtyData: (command) => {
        const params = command.params;
        return {
          clearDependencyTreeCache: {
            [params.unitId]: {
              [params.subUnitId]: "1"
            }
          }
        };
      }
    });
    this._activeDirtyManagerService.register(InsertRowMutation.id, {
      commandId: InsertRowMutation.id,
      getDirtyData: (command) => {
        const params = command.params;
        return {
          clearDependencyTreeCache: {
            [params.unitId]: {
              [params.subUnitId]: "1"
            }
          }
        };
      }
    });
  }
  _initialHideRow() {
    this._activeDirtyManagerService.register(SetRowHiddenMutation.id, {
      commandId: SetRowHiddenMutation.id,
      getDirtyData: (command) => {
        const params = command.params;
        return {
          dirtyRanges: this._getHideRowMutation(params),
          clearDependencyTreeCache: {
            [params.unitId]: {
              [params.subUnitId]: "1"
            }
          }
        };
      }
    });
    this._activeDirtyManagerService.register(SetRowVisibleMutation.id, {
      commandId: SetRowVisibleMutation.id,
      getDirtyData: (command) => {
        const params = command.params;
        return {
          dirtyRanges: this._getHideRowMutation(params),
          clearDependencyTreeCache: {
            [params.unitId]: {
              [params.subUnitId]: "1"
            }
          }
        };
      }
    });
  }
  _initialSheet() {
    this._activeDirtyManagerService.register(SetTriggerFormulaCalculationStartMutation.id, {
      commandId: SetTriggerFormulaCalculationStartMutation.id,
      getDirtyData: (command) => {
        const params = command.params;
        return {
          ...params
        };
      }
    });
    this._activeDirtyManagerService.register(RemoveSheetMutation.id, {
      commandId: RemoveSheetMutation.id,
      getDirtyData: (command) => {
        const params = command.params;
        return {
          dirtyNameMap: this._getRemoveSheetMutation(params),
          clearDependencyTreeCache: {
            [params.unitId]: {
              [params.subUnitId]: "1"
            }
          }
        };
      }
    });
    this._activeDirtyManagerService.register(InsertSheetMutation.id, {
      commandId: InsertSheetMutation.id,
      getDirtyData: (command) => {
        const params = command.params;
        return {
          dirtyNameMap: this._getInsertSheetMutation(params)
        };
      }
    });
  }
  _initialDefinedName() {
    this._activeDirtyManagerService.register(SetDefinedNameMutation.id, {
      commandId: SetDefinedNameMutation.id,
      getDirtyData: (command) => {
        const params = command.params;
        return { dirtyDefinedNameMap: this._getDefinedNameMutation(params) };
      }
    });
    this._activeDirtyManagerService.register(RemoveDefinedNameMutation.id, {
      commandId: RemoveDefinedNameMutation.id,
      getDirtyData: (command) => {
        const params = command.params;
        return { dirtyDefinedNameMap: this._getDefinedNameMutation(params) };
      }
    });
  }
  _getDefinedNameMutation(definedName) {
    const { unitId, name, formulaOrRefString } = definedName;
    const result = {};
    if (definedName == null) {
      return {};
    }
    result[unitId] = {};
    result[unitId][name] = formulaOrRefString;
    return result;
  }
  _getSetRangeValuesMutationDirtyRange(params) {
    const { subUnitId: sheetId, unitId, cellValue } = params;
    const dirtyRanges = [];
    if (cellValue == null) {
      return dirtyRanges;
    }
    dirtyRanges.push(...this._getDirtyRangesByCellValue(unitId, sheetId, cellValue));
    dirtyRanges.push(...this._getDirtyRangesForArrayFormula(unitId, sheetId, cellValue));
    return dirtyRanges;
  }
  _getMoveRangeMutationDirtyRange(params) {
    const { unitId, from, to } = params;
    const dirtyRanges = [];
    dirtyRanges.push(...this._getDirtyRangesByCellValue(unitId, from.subUnitId, from.value));
    dirtyRanges.push(...this._getDirtyRangesByCellValue(unitId, to.subUnitId, to.value));
    dirtyRanges.push(...this._getDirtyRangesForArrayFormula(unitId, to.subUnitId, to.value));
    return dirtyRanges;
  }
  _getMoveRowsMutationDirtyRange(params) {
    const { subUnitId: sheetId, unitId, sourceRange, targetRange } = params;
    const dirtyRanges = [];
    const sourceMatrix = this._rangeToMatrix(sourceRange).getData();
    const targetMatrix = this._rangeToMatrix(targetRange).getData();
    dirtyRanges.push(...this._getDirtyRangesByCellValue(unitId, sheetId, sourceMatrix));
    dirtyRanges.push(...this._getDirtyRangesByCellValue(unitId, sheetId, targetMatrix));
    dirtyRanges.push(...this._getDirtyRangesForArrayFormula(unitId, sheetId, targetMatrix));
    return dirtyRanges;
  }
  _getReorderRangeMutationDirtyRange(params) {
    const { unitId, subUnitId: sheetId, range } = params;
    const matrix = this._rangeToMatrix(range).getData();
    const dirtyRanges = [];
    dirtyRanges.push(...this._getDirtyRangesByCellValue(unitId, sheetId, matrix));
    dirtyRanges.push(...this._getDirtyRangesForArrayFormula(unitId, sheetId, matrix));
    return dirtyRanges;
  }
  _getRemoveRowOrColumnMutation(params, isRow = true) {
    const { subUnitId: sheetId, unitId, range } = params;
    const dirtyRanges = [];
    const workbook = this._univerInstanceService.getUniverSheetInstance(unitId);
    const worksheet = workbook == null ? void 0 : workbook.getSheetBySheetId(sheetId);
    const rowCount = (worksheet == null ? void 0 : worksheet.getRowCount()) || 0;
    const columnCount = (worksheet == null ? void 0 : worksheet.getColumnCount()) || 0;
    let matrix = null;
    const { startRow, endRow, startColumn, endColumn } = range;
    if (isRow === true) {
      matrix = this._rangeToMatrix({
        startRow,
        startColumn: 0,
        endRow,
        endColumn: columnCount - 1
      });
    } else {
      matrix = this._rangeToMatrix({
        startRow: 0,
        startColumn,
        endRow: rowCount,
        endColumn
      });
    }
    const matrixData = matrix.getData();
    dirtyRanges.push(...this._getDirtyRangesByCellValue(unitId, sheetId, matrixData));
    dirtyRanges.push(...this._getDirtyRangesForArrayFormula(unitId, sheetId, matrixData));
    return dirtyRanges;
  }
  _getHideRowMutation(params) {
    const { subUnitId, unitId, ranges } = params;
    const dirtyRanges = [];
    ranges.forEach((range) => {
      const matrix = this._rangeToMatrix(range).getMatrix();
      dirtyRanges.push(...this._getDirtyRangesByCellValue(unitId, subUnitId, matrix));
    });
    return dirtyRanges;
  }
  _getRemoveSheetMutation(params) {
    const dirtyNameMap = {};
    const { subUnitId: sheetId, unitId, subUnitName } = params;
    if (dirtyNameMap[unitId] == null) {
      dirtyNameMap[unitId] = {};
    }
    dirtyNameMap[unitId][sheetId] = subUnitName;
    return dirtyNameMap;
  }
  _getInsertSheetMutation(params) {
    const dirtyNameMap = {};
    const { sheet, unitId } = params;
    if (dirtyNameMap[unitId] == null) {
      dirtyNameMap[unitId] = {};
    }
    dirtyNameMap[unitId][sheet.id] = sheet.name;
    return dirtyNameMap;
  }
  _rangeToMatrix(range) {
    const matrix = new ObjectMatrix();
    const { startRow, startColumn, endRow, endColumn } = range;
    for (let r = startRow; r <= endRow; r++) {
      for (let c = startColumn; c <= endColumn; c++) {
        matrix.setValue(r, c, {});
      }
    }
    return matrix;
  }
  _getDirtyRangesByCellValue(unitId, sheetId, cellValue) {
    const dirtyRanges = [];
    if (cellValue == null) {
      return dirtyRanges;
    }
    const cellMatrix = new ObjectMatrix(cellValue);
    const discreteRanges = cellMatrix.getDiscreteRanges();
    discreteRanges.forEach((range) => {
      dirtyRanges.push({ unitId, sheetId, range });
    });
    return dirtyRanges;
  }
  /**
   * The array formula is a range where only the top-left corner contains the formula value.
   * All other positions, apart from the top-left corner, need to be marked as dirty.
   */
  _getDirtyRangesForArrayFormula(unitId, sheetId, cellValue) {
    var _a, _b;
    const dirtyRanges = [];
    if (cellValue == null) {
      return dirtyRanges;
    }
    const cellMatrix = new ObjectMatrix(cellValue);
    const arrayFormulaRange = this._formulaDataModel.getArrayFormulaRange();
    if ((_a = arrayFormulaRange == null ? void 0 : arrayFormulaRange[unitId]) == null ? void 0 : _a[sheetId]) {
      const cellRangeData = new ObjectMatrix((_b = arrayFormulaRange == null ? void 0 : arrayFormulaRange[unitId]) == null ? void 0 : _b[sheetId]);
      cellMatrix.forValue((row, column) => {
        cellRangeData.forValue((arrayFormulaRow, arrayFormulaColumn, arrayFormulaRange2) => {
          if (arrayFormulaRange2 == null) {
            return true;
          }
          const { startRow, startColumn, endRow, endColumn } = arrayFormulaRange2;
          if (row >= startRow && row <= endRow && column >= startColumn && column <= endColumn) {
            dirtyRanges.push({
              unitId,
              sheetId,
              range: {
                startRow,
                startColumn,
                endRow: startRow,
                endColumn: startColumn
              }
            });
          }
        });
      });
    }
    return dirtyRanges;
  }
};
ActiveDirtyController = __decorateClass([
  __decorateParam(0, IActiveDirtyManagerService),
  __decorateParam(1, IUniverInstanceService),
  __decorateParam(2, Inject(FormulaDataModel))
], ActiveDirtyController);

// ../packages/sheets-formula/src/controllers/array-formula-cell-interceptor.controller.ts
var ArrayFormulaCellInterceptorController = class extends Disposable {
  constructor(_commandService, _configService, _sheetInterceptorService, _formulaDataModel, _lexerTreeBuilder, _functionService, _definedNamesService) {
    super();
    __publicField(this, "_commandService", _commandService);
    __publicField(this, "_configService", _configService);
    __publicField(this, "_sheetInterceptorService", _sheetInterceptorService);
    __publicField(this, "_formulaDataModel", _formulaDataModel);
    __publicField(this, "_lexerTreeBuilder", _lexerTreeBuilder);
    __publicField(this, "_functionService", _functionService);
    __publicField(this, "_definedNamesService", _definedNamesService);
    this._initialize();
  }
  _initialize() {
    this._commandExecutedListener();
    this._initInterceptorCellContent();
  }
  _commandExecutedListener() {
    this.disposeWithMe(
      this._commandService.onCommandExecuted((command) => {
        var _a;
        const isSSC = (_a = this._configService.getConfig(PLUGIN_CONFIG_KEY_BASE)) == null ? void 0 : _a.writeArrayFormulaToSnapshot;
        if (command.id === SetArrayFormulaDataMutation.id) {
          const params = command.params;
          if (params == null) {
            return;
          }
          const { arrayFormulaRange, arrayFormulaCellData, arrayFormulaEmbedded } = params;
          this._formulaDataModel.setArrayFormulaRange(arrayFormulaRange);
          this._formulaDataModel.setArrayFormulaCellData(arrayFormulaCellData);
          if (isSSC) {
            this._writeArrayFormulaToSnapshot(arrayFormulaRange, arrayFormulaCellData, arrayFormulaEmbedded);
          }
        } else if (command.id === SetFormulaCalculationResultMutation.id && isSSC) {
          this._addPrefixToFunctionSnapshot();
          this._addPrefixToDefinedNamesFunctionSnapshot();
        }
      })
    );
  }
  _addPrefixToDefinedNamesFunctionSnapshot() {
    const allDefinedNames = this._definedNamesService.getAllDefinedNames();
    Object.entries(allDefinedNames).forEach(([unitId, definedNames]) => {
      definedNames && Array.from(Object.entries(definedNames)).forEach(([_, definedName]) => {
        const { formulaOrRefString } = definedName;
        if (formulaOrRefString.substring(0, 1) === "=") {
          const newFormula = this._lexerTreeBuilder.getNewFormulaWithPrefix(formulaOrRefString, this._functionService.hasExecutor.bind(this._functionService));
          if (newFormula) {
            this._commandService.executeCommand(SetDefinedNameMutation.id, {
              ...definedName,
              unitId,
              formulaOrRefStringWithPrefix: newFormula
            }, {
              onlyLocal: true,
              fromFormula: true
            });
          }
        }
      });
    });
  }
  _addPrefixToFunctionSnapshot() {
    const dataModel = this._formulaDataModel.getFormulaData();
    const cacheMap = /* @__PURE__ */ new Map();
    Object.entries(dataModel).forEach(([unitId, subUnitData]) => {
      subUnitData && Array.from(Object.entries(subUnitData)).forEach(([subUnitId, formulaDataItem]) => {
        if (!formulaDataItem) {
          return;
        }
        const cellValue = new ObjectMatrix();
        const matrix = new ObjectMatrix(formulaDataItem);
        matrix.forValue((row, col, value) => {
          const functionText = value == null ? void 0 : value.f;
          if ((value == null ? void 0 : value.x) != null || !functionText || functionText.length === 0) {
            return;
          }
          if (cacheMap.has(functionText)) {
            const cachedFormula = cacheMap.get(functionText);
            cellValue.setValue(row, col, { xf: cachedFormula });
            return;
          }
          const newFormula = this._lexerTreeBuilder.getNewFormulaWithPrefix(functionText, this._functionService.hasExecutor.bind(this._functionService));
          if (newFormula) {
            cellValue.setValue(row, col, { xf: newFormula });
            cacheMap.set(functionText, newFormula);
          }
        });
        this._commandService.executeCommand(SetRangeValuesMutation.id, {
          unitId,
          subUnitId,
          cellValue: cellValue.getMatrix()
        }, {
          onlyLocal: true,
          fromFormula: true
        });
      });
    });
    cacheMap.clear();
  }
  _writeArrayFormulaToSnapshot(arrayFormulaRange, arrayFormulaCellData, arrayFormulaEmbedded) {
    arrayFormulaRange && Object.entries(arrayFormulaRange).forEach(([unitId, subUnitData]) => {
      subUnitData && Array.from(Object.entries(subUnitData)).forEach(([subUnitId, rangeData]) => {
        const cellValue = new ObjectMatrix();
        const matrix = new ObjectMatrix(rangeData);
        matrix.forValue((row, col, value) => {
          cellValue.setValue(row, col, { ref: serializeRange(value) });
        });
        this._commandService.executeCommand(SetRangeValuesMutation.id, {
          unitId,
          subUnitId,
          cellValue: cellValue.getMatrix()
        }, {
          onlyLocal: true,
          fromFormula: true
        });
      });
    });
    arrayFormulaEmbedded && Object.entries(arrayFormulaEmbedded).forEach(([unitId, subUnitData]) => {
      subUnitData && Array.from(Object.entries(subUnitData)).forEach(([subUnitId, rangeData]) => {
        const cellValue = new ObjectMatrix();
        const matrix = new ObjectMatrix(rangeData);
        matrix.forValue((row, col) => {
          var _a, _b, _c;
          const existingArrayRange = (_c = (_b = (_a = arrayFormulaRange == null ? void 0 : arrayFormulaRange[unitId]) == null ? void 0 : _a[subUnitId]) == null ? void 0 : _b[row]) == null ? void 0 : _c[col];
          if (existingArrayRange) {
            return;
          }
          cellValue.setValue(row, col, {
            ref: serializeRange({
              startRow: row,
              endRow: row,
              startColumn: col,
              endColumn: col
            })
          });
        });
        this._commandService.executeCommand(SetRangeValuesMutation.id, {
          unitId,
          subUnitId,
          cellValue: cellValue.getMatrix()
        }, {
          onlyLocal: true,
          fromFormula: true
        });
      });
    });
    arrayFormulaCellData && Object.entries(arrayFormulaCellData).forEach(([unitId, subUnitData]) => {
      subUnitData && Array.from(Object.entries(subUnitData)).forEach(([subUnitId, rowData]) => {
        this._commandService.executeCommand(SetRangeValuesMutation.id, {
          unitId,
          subUnitId,
          cellValue: rowData
        }, {
          onlyLocal: true,
          fromFormula: true
        });
      });
    });
  }
  _initInterceptorCellContent() {
    this.disposeWithMe(
      this._sheetInterceptorService.intercept(INTERCEPTOR_POINT.CELL_CONTENT, {
        priority: 100,
        effect: 2 /* Value */,
        handler: (cell_, location, next) => {
          var _a, _b, _c;
          let cell = cell_;
          const { unitId, subUnitId, row, col } = location;
          const arrayFormulaCellData = this._formulaDataModel.getArrayFormulaCellData();
          const cellData = (_c = (_b = (_a = arrayFormulaCellData == null ? void 0 : arrayFormulaCellData[unitId]) == null ? void 0 : _a[subUnitId]) == null ? void 0 : _b[row]) == null ? void 0 : _c[col];
          if (cellData == null) {
            return next(cell);
          }
          if (!cell || cell === location.rawData) {
            cell = { ...location.rawData };
          }
          if (cellData.v == null && cellData.t == null) {
            cell.v = 0;
            cell.t = 2 /* NUMBER */;
            return next(cell);
          }
          if ((cell == null ? void 0 : cell.t) === 2 /* NUMBER */ && cell.v !== void 0 && cell.v !== null && isRealNum(cell.v)) {
            cell.v = stripErrorMargin(Number(cell.v));
            return next(cell);
          }
          cell.v = cellData.v;
          cell.t = cellData.t;
          return next(cell);
        }
      })
    );
  }
};
ArrayFormulaCellInterceptorController = __decorateClass([
  __decorateParam(0, ICommandService),
  __decorateParam(1, IConfigService),
  __decorateParam(2, Inject(SheetInterceptorService)),
  __decorateParam(3, Inject(FormulaDataModel)),
  __decorateParam(4, Inject(LexerTreeBuilder)),
  __decorateParam(5, IFunctionService),
  __decorateParam(6, IDefinedNamesService)
], ArrayFormulaCellInterceptorController);

// ../packages/sheets-formula/src/services/function-list/array.ts
var FUNCTION_LIST_ARRAY = [
  {
    functionName: "ARRAY_CONSTRAIN" /* ARRAY_CONSTRAIN */,
    functionType: 13 /* Array */,
    description: "formula.functionList.ARRAY_CONSTRAIN.description",
    abstract: "formula.functionList.ARRAY_CONSTRAIN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ARRAY_CONSTRAIN.functionParameter.inputRange.name",
        detail: "formula.functionList.ARRAY_CONSTRAIN.functionParameter.inputRange.detail",
        example: "A1:C3",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ARRAY_CONSTRAIN.functionParameter.numRows.name",
        detail: "formula.functionList.ARRAY_CONSTRAIN.functionParameter.numRows.detail",
        example: "2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ARRAY_CONSTRAIN.functionParameter.numCols.name",
        detail: "formula.functionList.ARRAY_CONSTRAIN.functionParameter.numCols.detail",
        example: "2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "FLATTEN" /* FLATTEN */,
    functionType: 13 /* Array */,
    description: "formula.functionList.FLATTEN.description",
    abstract: "formula.functionList.FLATTEN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.FLATTEN.functionParameter.range1.name",
        detail: "formula.functionList.FLATTEN.functionParameter.range1.detail",
        example: "A1:C3",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.FLATTEN.functionParameter.range2.name",
        detail: "formula.functionList.FLATTEN.functionParameter.range2.detail",
        example: "D1:F3",
        require: 0,
        repeat: 1
      }
    ]
  }
];

// ../packages/sheets-formula/src/services/function-list/compatibility.ts
var FUNCTION_LIST_COMPATIBILITY = [
  {
    functionName: "BETADIST" /* BETADIST */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.BETADIST.description",
    abstract: "formula.functionList.BETADIST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.BETADIST.functionParameter.x.name",
        detail: "formula.functionList.BETADIST.functionParameter.x.detail",
        example: "2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BETADIST.functionParameter.alpha.name",
        detail: "formula.functionList.BETADIST.functionParameter.alpha.detail",
        example: "8",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BETADIST.functionParameter.beta.name",
        detail: "formula.functionList.BETADIST.functionParameter.beta.detail",
        example: "10",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BETADIST.functionParameter.A.name",
        detail: "formula.functionList.BETADIST.functionParameter.A.detail",
        example: "1",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.BETADIST.functionParameter.B.name",
        detail: "formula.functionList.BETADIST.functionParameter.B.detail",
        example: "3",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "BETAINV" /* BETAINV */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.BETAINV.description",
    abstract: "formula.functionList.BETAINV.abstract",
    functionParameter: [
      {
        name: "formula.functionList.BETAINV.functionParameter.probability.name",
        detail: "formula.functionList.BETAINV.functionParameter.probability.detail",
        example: "0.685470581",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BETAINV.functionParameter.alpha.name",
        detail: "formula.functionList.BETAINV.functionParameter.alpha.detail",
        example: "8",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BETAINV.functionParameter.beta.name",
        detail: "formula.functionList.BETAINV.functionParameter.beta.detail",
        example: "10",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BETAINV.functionParameter.A.name",
        detail: "formula.functionList.BETAINV.functionParameter.A.detail",
        example: "1",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.BETAINV.functionParameter.B.name",
        detail: "formula.functionList.BETAINV.functionParameter.B.detail",
        example: "3",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "BINOMDIST" /* BINOMDIST */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.BINOMDIST.description",
    abstract: "formula.functionList.BINOMDIST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.BINOMDIST.functionParameter.numberS.name",
        detail: "formula.functionList.BINOMDIST.functionParameter.numberS.detail",
        example: "6",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BINOMDIST.functionParameter.trials.name",
        detail: "formula.functionList.BINOMDIST.functionParameter.trials.detail",
        example: "10",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BINOMDIST.functionParameter.probabilityS.name",
        detail: "formula.functionList.BINOMDIST.functionParameter.probabilityS.detail",
        example: "0.5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BINOMDIST.functionParameter.cumulative.name",
        detail: "formula.functionList.BINOMDIST.functionParameter.cumulative.detail",
        example: "false",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "CHIDIST" /* CHIDIST */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.CHIDIST.description",
    abstract: "formula.functionList.CHIDIST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CHIDIST.functionParameter.x.name",
        detail: "formula.functionList.CHIDIST.functionParameter.x.detail",
        example: "0.5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CHIDIST.functionParameter.degFreedom.name",
        detail: "formula.functionList.CHIDIST.functionParameter.degFreedom.detail",
        example: "1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "CHIINV" /* CHIINV */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.CHIINV.description",
    abstract: "formula.functionList.CHIINV.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CHIINV.functionParameter.probability.name",
        detail: "formula.functionList.CHIINV.functionParameter.probability.detail",
        example: "0.93",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CHIINV.functionParameter.degFreedom.name",
        detail: "formula.functionList.CHIINV.functionParameter.degFreedom.detail",
        example: "1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "CHITEST" /* CHITEST */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.CHITEST.description",
    abstract: "formula.functionList.CHITEST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CHITEST.functionParameter.actualRange.name",
        detail: "formula.functionList.CHITEST.functionParameter.actualRange.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CHITEST.functionParameter.expectedRange.name",
        detail: "formula.functionList.CHITEST.functionParameter.expectedRange.detail",
        example: "B1:B4",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "CONFIDENCE" /* CONFIDENCE */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.CONFIDENCE.description",
    abstract: "formula.functionList.CONFIDENCE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CONFIDENCE.functionParameter.alpha.name",
        detail: "formula.functionList.CONFIDENCE.functionParameter.alpha.detail",
        example: "0.05",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CONFIDENCE.functionParameter.standardDev.name",
        detail: "formula.functionList.CONFIDENCE.functionParameter.standardDev.detail",
        example: "2.5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CONFIDENCE.functionParameter.size.name",
        detail: "formula.functionList.CONFIDENCE.functionParameter.size.detail",
        example: "50",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "COVAR" /* COVAR */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.COVAR.description",
    abstract: "formula.functionList.COVAR.abstract",
    functionParameter: [
      {
        name: "formula.functionList.COVAR.functionParameter.array1.name",
        detail: "formula.functionList.COVAR.functionParameter.array1.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.COVAR.functionParameter.array2.name",
        detail: "formula.functionList.COVAR.functionParameter.array2.detail",
        example: "B1:B4",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "CRITBINOM" /* CRITBINOM */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.CRITBINOM.description",
    abstract: "formula.functionList.CRITBINOM.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CRITBINOM.functionParameter.trials.name",
        detail: "formula.functionList.CRITBINOM.functionParameter.trials.detail",
        example: "6",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CRITBINOM.functionParameter.probabilityS.name",
        detail: "formula.functionList.CRITBINOM.functionParameter.probabilityS.detail",
        example: "0.5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CRITBINOM.functionParameter.alpha.name",
        detail: "formula.functionList.CRITBINOM.functionParameter.alpha.detail",
        example: "0.75",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "EXPONDIST" /* EXPONDIST */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.EXPONDIST.description",
    abstract: "formula.functionList.EXPONDIST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.EXPONDIST.functionParameter.x.name",
        detail: "formula.functionList.EXPONDIST.functionParameter.x.detail",
        example: "0.2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.EXPONDIST.functionParameter.lambda.name",
        detail: "formula.functionList.EXPONDIST.functionParameter.lambda.detail",
        example: "10",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.EXPONDIST.functionParameter.cumulative.name",
        detail: "formula.functionList.EXPONDIST.functionParameter.cumulative.detail",
        example: "true",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "FDIST" /* FDIST */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.FDIST.description",
    abstract: "formula.functionList.FDIST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.FDIST.functionParameter.x.name",
        detail: "formula.functionList.FDIST.functionParameter.x.detail",
        example: "15.2069",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.FDIST.functionParameter.degFreedom1.name",
        detail: "formula.functionList.FDIST.functionParameter.degFreedom1.detail",
        example: "6",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.FDIST.functionParameter.degFreedom2.name",
        detail: "formula.functionList.FDIST.functionParameter.degFreedom2.detail",
        example: "4",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "FINV" /* FINV */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.FINV.description",
    abstract: "formula.functionList.FINV.abstract",
    functionParameter: [
      {
        name: "formula.functionList.FINV.functionParameter.probability.name",
        detail: "formula.functionList.FINV.functionParameter.probability.detail",
        example: "0.01",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.FINV.functionParameter.degFreedom1.name",
        detail: "formula.functionList.FINV.functionParameter.degFreedom1.detail",
        example: "6",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.FINV.functionParameter.degFreedom2.name",
        detail: "formula.functionList.FINV.functionParameter.degFreedom2.detail",
        example: "4",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "FTEST" /* FTEST */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.FTEST.description",
    abstract: "formula.functionList.FTEST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.FTEST.functionParameter.array1.name",
        detail: "formula.functionList.FTEST.functionParameter.array1.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.FTEST.functionParameter.array2.name",
        detail: "formula.functionList.FTEST.functionParameter.array2.detail",
        example: "B1:B4",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "GAMMADIST" /* GAMMADIST */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.GAMMADIST.description",
    abstract: "formula.functionList.GAMMADIST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.GAMMADIST.functionParameter.x.name",
        detail: "formula.functionList.GAMMADIST.functionParameter.x.detail",
        example: "10",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.GAMMADIST.functionParameter.alpha.name",
        detail: "formula.functionList.GAMMADIST.functionParameter.alpha.detail",
        example: "8",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.GAMMADIST.functionParameter.beta.name",
        detail: "formula.functionList.GAMMADIST.functionParameter.beta.detail",
        example: "2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.GAMMADIST.functionParameter.cumulative.name",
        detail: "formula.functionList.GAMMADIST.functionParameter.cumulative.detail",
        example: "true",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "GAMMAINV" /* GAMMAINV */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.GAMMAINV.description",
    abstract: "formula.functionList.GAMMAINV.abstract",
    functionParameter: [
      {
        name: "formula.functionList.GAMMAINV.functionParameter.probability.name",
        detail: "formula.functionList.GAMMAINV.functionParameter.probability.detail",
        example: "0.068094",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.GAMMAINV.functionParameter.alpha.name",
        detail: "formula.functionList.GAMMAINV.functionParameter.alpha.detail",
        example: "9",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.GAMMAINV.functionParameter.beta.name",
        detail: "formula.functionList.GAMMAINV.functionParameter.beta.detail",
        example: "2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "HYPGEOMDIST" /* HYPGEOMDIST */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.HYPGEOMDIST.description",
    abstract: "formula.functionList.HYPGEOMDIST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.HYPGEOMDIST.functionParameter.sampleS.name",
        detail: "formula.functionList.HYPGEOMDIST.functionParameter.sampleS.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.HYPGEOMDIST.functionParameter.numberSample.name",
        detail: "formula.functionList.HYPGEOMDIST.functionParameter.numberSample.detail",
        example: "4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.HYPGEOMDIST.functionParameter.populationS.name",
        detail: "formula.functionList.HYPGEOMDIST.functionParameter.populationS.detail",
        example: "8",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.HYPGEOMDIST.functionParameter.numberPop.name",
        detail: "formula.functionList.HYPGEOMDIST.functionParameter.numberPop.detail",
        example: "20",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "LOGINV" /* LOGINV */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.LOGINV.description",
    abstract: "formula.functionList.LOGINV.abstract",
    functionParameter: [
      {
        name: "formula.functionList.LOGINV.functionParameter.probability.name",
        detail: "formula.functionList.LOGINV.functionParameter.probability.detail",
        example: "0.908789",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.LOGINV.functionParameter.mean.name",
        detail: "formula.functionList.LOGINV.functionParameter.mean.detail",
        example: "40",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.LOGINV.functionParameter.standardDev.name",
        detail: "formula.functionList.LOGINV.functionParameter.standardDev.detail",
        example: "1.5",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "LOGNORMDIST" /* LOGNORMDIST */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.LOGNORMDIST.description",
    abstract: "formula.functionList.LOGNORMDIST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.LOGNORMDIST.functionParameter.x.name",
        detail: "formula.functionList.LOGNORMDIST.functionParameter.x.detail",
        example: "42",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.LOGNORMDIST.functionParameter.mean.name",
        detail: "formula.functionList.LOGNORMDIST.functionParameter.mean.detail",
        example: "40",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.LOGNORMDIST.functionParameter.standardDev.name",
        detail: "formula.functionList.LOGNORMDIST.functionParameter.standardDev.detail",
        example: "1.5",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "MODE" /* MODE */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.MODE.description",
    abstract: "formula.functionList.MODE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.MODE.functionParameter.number1.name",
        detail: "formula.functionList.MODE.functionParameter.number1.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MODE.functionParameter.number2.name",
        detail: "formula.functionList.MODE.functionParameter.number2.detail",
        example: "2",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "NEGBINOMDIST" /* NEGBINOMDIST */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.NEGBINOMDIST.description",
    abstract: "formula.functionList.NEGBINOMDIST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.NEGBINOMDIST.functionParameter.numberF.name",
        detail: "formula.functionList.NEGBINOMDIST.functionParameter.numberF.detail",
        example: "10",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.NEGBINOMDIST.functionParameter.numberS.name",
        detail: "formula.functionList.NEGBINOMDIST.functionParameter.numberS.detail",
        example: "5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.NEGBINOMDIST.functionParameter.probabilityS.name",
        detail: "formula.functionList.NEGBINOMDIST.functionParameter.probabilityS.detail",
        example: "0.25",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "NORMDIST" /* NORMDIST */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.NORMDIST.description",
    abstract: "formula.functionList.NORMDIST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.NORMDIST.functionParameter.x.name",
        detail: "formula.functionList.NORMDIST.functionParameter.x.detail",
        example: "42",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.NORMDIST.functionParameter.mean.name",
        detail: "formula.functionList.NORMDIST.functionParameter.mean.detail",
        example: "40",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.NORMDIST.functionParameter.standardDev.name",
        detail: "formula.functionList.NORMDIST.functionParameter.standardDev.detail",
        example: "1.5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.NORMDIST.functionParameter.cumulative.name",
        detail: "formula.functionList.NORMDIST.functionParameter.cumulative.detail",
        example: "true",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "NORMINV" /* NORMINV */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.NORMINV.description",
    abstract: "formula.functionList.NORMINV.abstract",
    functionParameter: [
      {
        name: "formula.functionList.NORMINV.functionParameter.probability.name",
        detail: "formula.functionList.NORMINV.functionParameter.probability.detail",
        example: "0.908789",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.NORMINV.functionParameter.mean.name",
        detail: "formula.functionList.NORMINV.functionParameter.mean.detail",
        example: "40",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.NORMINV.functionParameter.standardDev.name",
        detail: "formula.functionList.NORMINV.functionParameter.standardDev.detail",
        example: "1.5",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "NORMSDIST" /* NORMSDIST */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.NORMSDIST.description",
    abstract: "formula.functionList.NORMSDIST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.NORMSDIST.functionParameter.z.name",
        detail: "formula.functionList.NORMSDIST.functionParameter.z.detail",
        example: "1.333333",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "NORMSINV" /* NORMSINV */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.NORMSINV.description",
    abstract: "formula.functionList.NORMSINV.abstract",
    functionParameter: [
      {
        name: "formula.functionList.NORMSINV.functionParameter.probability.name",
        detail: "formula.functionList.NORMSINV.functionParameter.probability.detail",
        example: "0.908789",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "PERCENTILE" /* PERCENTILE */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.PERCENTILE.description",
    abstract: "formula.functionList.PERCENTILE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.PERCENTILE.functionParameter.array.name",
        detail: "formula.functionList.PERCENTILE.functionParameter.array.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PERCENTILE.functionParameter.k.name",
        detail: "formula.functionList.PERCENTILE.functionParameter.k.detail",
        example: "0.3",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "PERCENTRANK" /* PERCENTRANK */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.PERCENTRANK.description",
    abstract: "formula.functionList.PERCENTRANK.abstract",
    functionParameter: [
      {
        name: "formula.functionList.PERCENTRANK.functionParameter.array.name",
        detail: "formula.functionList.PERCENTRANK.functionParameter.array.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PERCENTRANK.functionParameter.x.name",
        detail: "formula.functionList.PERCENTRANK.functionParameter.x.detail",
        example: "1.5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PERCENTRANK.functionParameter.significance.name",
        detail: "formula.functionList.PERCENTRANK.functionParameter.significance.detail",
        example: "3",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "POISSON" /* POISSON */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.POISSON.description",
    abstract: "formula.functionList.POISSON.abstract",
    functionParameter: [
      {
        name: "formula.functionList.POISSON.functionParameter.x.name",
        detail: "formula.functionList.POISSON.functionParameter.x.detail",
        example: "2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.POISSON.functionParameter.mean.name",
        detail: "formula.functionList.POISSON.functionParameter.mean.detail",
        example: "5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.POISSON.functionParameter.cumulative.name",
        detail: "formula.functionList.POISSON.functionParameter.cumulative.detail",
        example: "true",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "QUARTILE" /* QUARTILE */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.QUARTILE.description",
    abstract: "formula.functionList.QUARTILE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.QUARTILE.functionParameter.array.name",
        detail: "formula.functionList.QUARTILE.functionParameter.array.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.QUARTILE.functionParameter.quart.name",
        detail: "formula.functionList.QUARTILE.functionParameter.quart.detail",
        example: "1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "RANK" /* RANK */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.RANK.description",
    abstract: "formula.functionList.RANK.abstract",
    functionParameter: [
      {
        name: "formula.functionList.RANK.functionParameter.number.name",
        detail: "formula.functionList.RANK.functionParameter.number.detail",
        example: "A3",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.RANK.functionParameter.ref.name",
        detail: "formula.functionList.RANK.functionParameter.ref.detail",
        example: "A2:A6",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.RANK.functionParameter.order.name",
        detail: "formula.functionList.RANK.functionParameter.order.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "STDEV" /* STDEV */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.STDEV.description",
    abstract: "formula.functionList.STDEV.abstract",
    functionParameter: [
      {
        name: "formula.functionList.STDEV.functionParameter.number1.name",
        detail: "formula.functionList.STDEV.functionParameter.number1.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.STDEV.functionParameter.number2.name",
        detail: "formula.functionList.STDEV.functionParameter.number2.detail",
        example: "2",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "STDEVP" /* STDEVP */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.STDEVP.description",
    abstract: "formula.functionList.STDEVP.abstract",
    functionParameter: [
      {
        name: "formula.functionList.STDEVP.functionParameter.number1.name",
        detail: "formula.functionList.STDEVP.functionParameter.number1.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.STDEVP.functionParameter.number2.name",
        detail: "formula.functionList.STDEVP.functionParameter.number2.detail",
        example: "2",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "TDIST" /* TDIST */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.TDIST.description",
    abstract: "formula.functionList.TDIST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.TDIST.functionParameter.x.name",
        detail: "formula.functionList.TDIST.functionParameter.x.detail",
        example: "8",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.TDIST.functionParameter.degFreedom.name",
        detail: "formula.functionList.TDIST.functionParameter.degFreedom.detail",
        example: "3",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.TDIST.functionParameter.tails.name",
        detail: "formula.functionList.TDIST.functionParameter.tails.detail",
        example: "1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "TINV" /* TINV */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.TINV.description",
    abstract: "formula.functionList.TINV.abstract",
    functionParameter: [
      {
        name: "formula.functionList.TINV.functionParameter.probability.name",
        detail: "formula.functionList.TINV.functionParameter.probability.detail",
        example: "0.75",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.TINV.functionParameter.degFreedom.name",
        detail: "formula.functionList.TINV.functionParameter.degFreedom.detail",
        example: "2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "TTEST" /* TTEST */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.TTEST.description",
    abstract: "formula.functionList.TTEST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.TTEST.functionParameter.array1.name",
        detail: "formula.functionList.TTEST.functionParameter.array1.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.TTEST.functionParameter.array2.name",
        detail: "formula.functionList.TTEST.functionParameter.array2.detail",
        example: "B1:B4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.TTEST.functionParameter.tails.name",
        detail: "formula.functionList.TTEST.functionParameter.tails.detail",
        example: "2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.TTEST.functionParameter.type.name",
        detail: "formula.functionList.TTEST.functionParameter.type.detail",
        example: "1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "VAR" /* VAR */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.VAR.description",
    abstract: "formula.functionList.VAR.abstract",
    functionParameter: [
      {
        name: "formula.functionList.VAR.functionParameter.number1.name",
        detail: "formula.functionList.VAR.functionParameter.number1.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.VAR.functionParameter.number2.name",
        detail: "formula.functionList.VAR.functionParameter.number2.detail",
        example: "2",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "VARP" /* VARP */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.VARP.description",
    abstract: "formula.functionList.VARP.abstract",
    functionParameter: [
      {
        name: "formula.functionList.VARP.functionParameter.number1.name",
        detail: "formula.functionList.VARP.functionParameter.number1.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.VARP.functionParameter.number2.name",
        detail: "formula.functionList.VARP.functionParameter.number2.detail",
        example: "2",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "WEIBULL" /* WEIBULL */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.WEIBULL.description",
    abstract: "formula.functionList.WEIBULL.abstract",
    functionParameter: [
      {
        name: "formula.functionList.WEIBULL.functionParameter.x.name",
        detail: "formula.functionList.WEIBULL.functionParameter.x.detail",
        example: "105",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.WEIBULL.functionParameter.alpha.name",
        detail: "formula.functionList.WEIBULL.functionParameter.alpha.detail",
        example: "20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.WEIBULL.functionParameter.beta.name",
        detail: "formula.functionList.WEIBULL.functionParameter.beta.detail",
        example: "100",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.WEIBULL.functionParameter.cumulative.name",
        detail: "formula.functionList.WEIBULL.functionParameter.cumulative.detail",
        example: "true",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ZTEST" /* ZTEST */,
    functionType: 11 /* Compatibility */,
    description: "formula.functionList.ZTEST.description",
    abstract: "formula.functionList.ZTEST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ZTEST.functionParameter.array.name",
        detail: "formula.functionList.ZTEST.functionParameter.array.detail",
        example: "A2:A11",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ZTEST.functionParameter.x.name",
        detail: "formula.functionList.ZTEST.functionParameter.x.detail",
        example: "4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ZTEST.functionParameter.sigma.name",
        detail: "formula.functionList.ZTEST.functionParameter.sigma.detail",
        example: "10",
        require: 0,
        repeat: 0
      }
    ]
  }
];

// ../packages/sheets-formula/src/services/function-list/cube.ts
var FUNCTION_LIST_CUBE = [
  {
    functionName: "CUBEKPIMEMBER" /* CUBEKPIMEMBER */,
    functionType: 10 /* Cube */,
    description: "formula.functionList.CUBEKPIMEMBER.description",
    abstract: "formula.functionList.CUBEKPIMEMBER.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CUBEKPIMEMBER.functionParameter.number1.name",
        detail: "formula.functionList.CUBEKPIMEMBER.functionParameter.number1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CUBEKPIMEMBER.functionParameter.number2.name",
        detail: "formula.functionList.CUBEKPIMEMBER.functionParameter.number2.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "CUBEMEMBER" /* CUBEMEMBER */,
    functionType: 10 /* Cube */,
    description: "formula.functionList.CUBEMEMBER.description",
    abstract: "formula.functionList.CUBEMEMBER.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CUBEMEMBER.functionParameter.number1.name",
        detail: "formula.functionList.CUBEMEMBER.functionParameter.number1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CUBEMEMBER.functionParameter.number2.name",
        detail: "formula.functionList.CUBEMEMBER.functionParameter.number2.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "CUBEMEMBERPROPERTY" /* CUBEMEMBERPROPERTY */,
    functionType: 10 /* Cube */,
    description: "formula.functionList.CUBEMEMBERPROPERTY.description",
    abstract: "formula.functionList.CUBEMEMBERPROPERTY.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CUBEMEMBERPROPERTY.functionParameter.number1.name",
        detail: "formula.functionList.CUBEMEMBERPROPERTY.functionParameter.number1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CUBEMEMBERPROPERTY.functionParameter.number2.name",
        detail: "formula.functionList.CUBEMEMBERPROPERTY.functionParameter.number2.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "CUBERANKEDMEMBER" /* CUBERANKEDMEMBER */,
    functionType: 10 /* Cube */,
    description: "formula.functionList.CUBERANKEDMEMBER.description",
    abstract: "formula.functionList.CUBERANKEDMEMBER.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CUBERANKEDMEMBER.functionParameter.number1.name",
        detail: "formula.functionList.CUBERANKEDMEMBER.functionParameter.number1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CUBERANKEDMEMBER.functionParameter.number2.name",
        detail: "formula.functionList.CUBERANKEDMEMBER.functionParameter.number2.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "CUBESET" /* CUBESET */,
    functionType: 10 /* Cube */,
    description: "formula.functionList.CUBESET.description",
    abstract: "formula.functionList.CUBESET.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CUBESET.functionParameter.number1.name",
        detail: "formula.functionList.CUBESET.functionParameter.number1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CUBESET.functionParameter.number2.name",
        detail: "formula.functionList.CUBESET.functionParameter.number2.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "CUBESETCOUNT" /* CUBESETCOUNT */,
    functionType: 10 /* Cube */,
    description: "formula.functionList.CUBESETCOUNT.description",
    abstract: "formula.functionList.CUBESETCOUNT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CUBESETCOUNT.functionParameter.number1.name",
        detail: "formula.functionList.CUBESETCOUNT.functionParameter.number1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CUBESETCOUNT.functionParameter.number2.name",
        detail: "formula.functionList.CUBESETCOUNT.functionParameter.number2.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "CUBEVALUE" /* CUBEVALUE */,
    functionType: 10 /* Cube */,
    description: "formula.functionList.CUBEVALUE.description",
    abstract: "formula.functionList.CUBEVALUE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CUBEVALUE.functionParameter.number1.name",
        detail: "formula.functionList.CUBEVALUE.functionParameter.number1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CUBEVALUE.functionParameter.number2.name",
        detail: "formula.functionList.CUBEVALUE.functionParameter.number2.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      }
    ]
  }
];

// ../packages/sheets-formula/src/services/function-list/database.ts
var FUNCTION_LIST_DATABASE = [
  {
    functionName: "DAVERAGE" /* DAVERAGE */,
    functionType: 5 /* Database */,
    description: "formula.functionList.DAVERAGE.description",
    abstract: "formula.functionList.DAVERAGE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DAVERAGE.functionParameter.database.name",
        detail: "formula.functionList.DAVERAGE.functionParameter.database.detail",
        example: "A4:E10",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DAVERAGE.functionParameter.field.name",
        detail: "formula.functionList.DAVERAGE.functionParameter.field.detail",
        example: "D4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DAVERAGE.functionParameter.criteria.name",
        detail: "formula.functionList.DAVERAGE.functionParameter.criteria.detail",
        example: "A1:B2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "DCOUNT" /* DCOUNT */,
    functionType: 5 /* Database */,
    description: "formula.functionList.DCOUNT.description",
    abstract: "formula.functionList.DCOUNT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DCOUNT.functionParameter.database.name",
        detail: "formula.functionList.DCOUNT.functionParameter.database.detail",
        example: "A4:E10",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DCOUNT.functionParameter.field.name",
        detail: "formula.functionList.DCOUNT.functionParameter.field.detail",
        example: "D4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DCOUNT.functionParameter.criteria.name",
        detail: "formula.functionList.DCOUNT.functionParameter.criteria.detail",
        example: "A1:B2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "DCOUNTA" /* DCOUNTA */,
    functionType: 5 /* Database */,
    description: "formula.functionList.DCOUNTA.description",
    abstract: "formula.functionList.DCOUNTA.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DCOUNTA.functionParameter.database.name",
        detail: "formula.functionList.DCOUNTA.functionParameter.database.detail",
        example: "A4:E10",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DCOUNTA.functionParameter.field.name",
        detail: "formula.functionList.DCOUNTA.functionParameter.field.detail",
        example: "D4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DCOUNTA.functionParameter.criteria.name",
        detail: "formula.functionList.DCOUNTA.functionParameter.criteria.detail",
        example: "A1:B2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "DGET" /* DGET */,
    functionType: 5 /* Database */,
    description: "formula.functionList.DGET.description",
    abstract: "formula.functionList.DGET.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DGET.functionParameter.database.name",
        detail: "formula.functionList.DGET.functionParameter.database.detail",
        example: "A4:E10",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DGET.functionParameter.field.name",
        detail: "formula.functionList.DGET.functionParameter.field.detail",
        example: "D4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DGET.functionParameter.criteria.name",
        detail: "formula.functionList.DGET.functionParameter.criteria.detail",
        example: "A1:B2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "DMAX" /* DMAX */,
    functionType: 5 /* Database */,
    description: "formula.functionList.DMAX.description",
    abstract: "formula.functionList.DMAX.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DMAX.functionParameter.database.name",
        detail: "formula.functionList.DMAX.functionParameter.database.detail",
        example: "A4:E10",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DMAX.functionParameter.field.name",
        detail: "formula.functionList.DMAX.functionParameter.field.detail",
        example: "D4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DMAX.functionParameter.criteria.name",
        detail: "formula.functionList.DMAX.functionParameter.criteria.detail",
        example: "A1:B2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "DMIN" /* DMIN */,
    functionType: 5 /* Database */,
    description: "formula.functionList.DMIN.description",
    abstract: "formula.functionList.DMIN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DMIN.functionParameter.database.name",
        detail: "formula.functionList.DMIN.functionParameter.database.detail",
        example: "A4:E10",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DMIN.functionParameter.field.name",
        detail: "formula.functionList.DMIN.functionParameter.field.detail",
        example: "D4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DMIN.functionParameter.criteria.name",
        detail: "formula.functionList.DMIN.functionParameter.criteria.detail",
        example: "A1:B2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "DPRODUCT" /* DPRODUCT */,
    functionType: 5 /* Database */,
    description: "formula.functionList.DPRODUCT.description",
    abstract: "formula.functionList.DPRODUCT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DPRODUCT.functionParameter.database.name",
        detail: "formula.functionList.DPRODUCT.functionParameter.database.detail",
        example: "A4:E10",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DPRODUCT.functionParameter.field.name",
        detail: "formula.functionList.DPRODUCT.functionParameter.field.detail",
        example: "D4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DPRODUCT.functionParameter.criteria.name",
        detail: "formula.functionList.DPRODUCT.functionParameter.criteria.detail",
        example: "A1:B2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "DSTDEV" /* DSTDEV */,
    functionType: 5 /* Database */,
    description: "formula.functionList.DSTDEV.description",
    abstract: "formula.functionList.DSTDEV.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DSTDEV.functionParameter.database.name",
        detail: "formula.functionList.DSTDEV.functionParameter.database.detail",
        example: "A4:E10",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DSTDEV.functionParameter.field.name",
        detail: "formula.functionList.DSTDEV.functionParameter.field.detail",
        example: "D4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DSTDEV.functionParameter.criteria.name",
        detail: "formula.functionList.DSTDEV.functionParameter.criteria.detail",
        example: "A1:B2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "DSTDEVP" /* DSTDEVP */,
    functionType: 5 /* Database */,
    description: "formula.functionList.DSTDEVP.description",
    abstract: "formula.functionList.DSTDEVP.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DSTDEVP.functionParameter.database.name",
        detail: "formula.functionList.DSTDEVP.functionParameter.database.detail",
        example: "A4:E10",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DSTDEVP.functionParameter.field.name",
        detail: "formula.functionList.DSTDEVP.functionParameter.field.detail",
        example: "D4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DSTDEVP.functionParameter.criteria.name",
        detail: "formula.functionList.DSTDEVP.functionParameter.criteria.detail",
        example: "A1:B2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "DSUM" /* DSUM */,
    functionType: 5 /* Database */,
    description: "formula.functionList.DSUM.description",
    abstract: "formula.functionList.DSUM.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DSUM.functionParameter.database.name",
        detail: "formula.functionList.DSUM.functionParameter.database.detail",
        example: "A4:E10",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DSUM.functionParameter.field.name",
        detail: "formula.functionList.DSUM.functionParameter.field.detail",
        example: "D4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DSUM.functionParameter.criteria.name",
        detail: "formula.functionList.DSUM.functionParameter.criteria.detail",
        example: "A1:B2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "DVAR" /* DVAR */,
    functionType: 5 /* Database */,
    description: "formula.functionList.DVAR.description",
    abstract: "formula.functionList.DVAR.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DVAR.functionParameter.database.name",
        detail: "formula.functionList.DVAR.functionParameter.database.detail",
        example: "A4:E10",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DVAR.functionParameter.field.name",
        detail: "formula.functionList.DVAR.functionParameter.field.detail",
        example: "D4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DVAR.functionParameter.criteria.name",
        detail: "formula.functionList.DVAR.functionParameter.criteria.detail",
        example: "A1:B2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "DVARP" /* DVARP */,
    functionType: 5 /* Database */,
    description: "formula.functionList.DVARP.description",
    abstract: "formula.functionList.DVARP.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DVARP.functionParameter.database.name",
        detail: "formula.functionList.DVARP.functionParameter.database.detail",
        example: "A4:E10",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DVARP.functionParameter.field.name",
        detail: "formula.functionList.DVARP.functionParameter.field.detail",
        example: "D4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DVARP.functionParameter.criteria.name",
        detail: "formula.functionList.DVARP.functionParameter.criteria.detail",
        example: "A1:B2",
        require: 1,
        repeat: 0
      }
    ]
  }
];

// ../packages/sheets-formula/src/services/function-list/date.ts
var FUNCTION_LIST_DATE = [
  {
    functionName: "DATE" /* DATE */,
    functionType: 1 /* Date */,
    description: "formula.functionList.DATE.description",
    abstract: "formula.functionList.DATE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DATE.functionParameter.year.name",
        detail: "formula.functionList.DATE.functionParameter.year.detail",
        example: "2024",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DATE.functionParameter.month.name",
        detail: "formula.functionList.DATE.functionParameter.month.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DATE.functionParameter.day.name",
        detail: "formula.functionList.DATE.functionParameter.day.detail",
        example: "1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "DATEDIF" /* DATEDIF */,
    functionType: 1 /* Date */,
    description: "formula.functionList.DATEDIF.description",
    abstract: "formula.functionList.DATEDIF.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DATEDIF.functionParameter.startDate.name",
        detail: "formula.functionList.DATEDIF.functionParameter.startDate.detail",
        example: '"2001-6-1"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DATEDIF.functionParameter.endDate.name",
        detail: "formula.functionList.DATEDIF.functionParameter.endDate.detail",
        example: '"2002-8-15"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DATEDIF.functionParameter.method.name",
        detail: "formula.functionList.DATEDIF.functionParameter.method.detail",
        example: '"D"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "DATEVALUE" /* DATEVALUE */,
    functionType: 1 /* Date */,
    description: "formula.functionList.DATEVALUE.description",
    abstract: "formula.functionList.DATEVALUE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DATEVALUE.functionParameter.dateText.name",
        detail: "formula.functionList.DATEVALUE.functionParameter.dateText.detail",
        example: '"2024-8-8"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "DAY" /* DAY */,
    functionType: 1 /* Date */,
    description: "formula.functionList.DAY.description",
    abstract: "formula.functionList.DAY.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DAY.functionParameter.serialNumber.name",
        detail: "formula.functionList.DAY.functionParameter.serialNumber.detail",
        example: '"1969-7-20"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "DAYS" /* DAYS */,
    functionType: 1 /* Date */,
    description: "formula.functionList.DAYS.description",
    abstract: "formula.functionList.DAYS.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DAYS.functionParameter.endDate.name",
        detail: "formula.functionList.DAYS.functionParameter.endDate.detail",
        example: '"2021-12-31"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DAYS.functionParameter.startDate.name",
        detail: "formula.functionList.DAYS.functionParameter.startDate.detail",
        example: '"2021-1-1"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "DAYS360" /* DAYS360 */,
    functionType: 1 /* Date */,
    description: "formula.functionList.DAYS360.description",
    abstract: "formula.functionList.DAYS360.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DAYS360.functionParameter.startDate.name",
        detail: "formula.functionList.DAYS360.functionParameter.startDate.detail",
        example: '"2021-1-29"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DAYS360.functionParameter.endDate.name",
        detail: "formula.functionList.DAYS360.functionParameter.endDate.detail",
        example: '"2021-3-31"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DAYS360.functionParameter.method.name",
        detail: "formula.functionList.DAYS360.functionParameter.method.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "EDATE" /* EDATE */,
    functionType: 1 /* Date */,
    description: "formula.functionList.EDATE.description",
    abstract: "formula.functionList.EDATE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.EDATE.functionParameter.startDate.name",
        detail: "formula.functionList.EDATE.functionParameter.startDate.detail",
        example: "A1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.EDATE.functionParameter.months.name",
        detail: "formula.functionList.EDATE.functionParameter.months.detail",
        example: "1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "EOMONTH" /* EOMONTH */,
    functionType: 1 /* Date */,
    description: "formula.functionList.EOMONTH.description",
    abstract: "formula.functionList.EOMONTH.abstract",
    functionParameter: [
      {
        name: "formula.functionList.EOMONTH.functionParameter.startDate.name",
        detail: "formula.functionList.EOMONTH.functionParameter.startDate.detail",
        example: '"2011-1-1"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.EOMONTH.functionParameter.months.name",
        detail: "formula.functionList.EOMONTH.functionParameter.months.detail",
        example: "1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "EPOCHTODATE" /* EPOCHTODATE */,
    functionType: 1 /* Date */,
    description: "formula.functionList.EPOCHTODATE.description",
    abstract: "formula.functionList.EPOCHTODATE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.EPOCHTODATE.functionParameter.timestamp.name",
        detail: "formula.functionList.EPOCHTODATE.functionParameter.timestamp.detail",
        example: "1655906710",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.EPOCHTODATE.functionParameter.unit.name",
        detail: "formula.functionList.EPOCHTODATE.functionParameter.unit.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "HOUR" /* HOUR */,
    functionType: 1 /* Date */,
    description: "formula.functionList.HOUR.description",
    abstract: "formula.functionList.HOUR.abstract",
    functionParameter: [
      {
        name: "formula.functionList.HOUR.functionParameter.serialNumber.name",
        detail: "formula.functionList.HOUR.functionParameter.serialNumber.detail",
        example: '"2011-7-18 7:45"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ISOWEEKNUM" /* ISOWEEKNUM */,
    functionType: 1 /* Date */,
    description: "formula.functionList.ISOWEEKNUM.description",
    abstract: "formula.functionList.ISOWEEKNUM.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ISOWEEKNUM.functionParameter.date.name",
        detail: "formula.functionList.ISOWEEKNUM.functionParameter.date.detail",
        example: '"2012-3-9"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "MINUTE" /* MINUTE */,
    functionType: 1 /* Date */,
    description: "formula.functionList.MINUTE.description",
    abstract: "formula.functionList.MINUTE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.MINUTE.functionParameter.serialNumber.name",
        detail: "formula.functionList.MINUTE.functionParameter.serialNumber.detail",
        example: '"12:45"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "MONTH" /* MONTH */,
    functionType: 1 /* Date */,
    description: "formula.functionList.MONTH.description",
    abstract: "formula.functionList.MONTH.abstract",
    functionParameter: [
      {
        name: "formula.functionList.MONTH.functionParameter.serialNumber.name",
        detail: "formula.functionList.MONTH.functionParameter.serialNumber.detail",
        example: '"1969-7-20"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "NETWORKDAYS" /* NETWORKDAYS */,
    functionType: 1 /* Date */,
    description: "formula.functionList.NETWORKDAYS.description",
    abstract: "formula.functionList.NETWORKDAYS.abstract",
    functionParameter: [
      {
        name: "formula.functionList.NETWORKDAYS.functionParameter.startDate.name",
        detail: "formula.functionList.NETWORKDAYS.functionParameter.startDate.detail",
        example: '"2012-10-1"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.NETWORKDAYS.functionParameter.endDate.name",
        detail: "formula.functionList.NETWORKDAYS.functionParameter.endDate.detail",
        example: '"2013-3-1"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.NETWORKDAYS.functionParameter.holidays.name",
        detail: "formula.functionList.NETWORKDAYS.functionParameter.holidays.detail",
        example: '"2012-11-22"',
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "NETWORKDAYS.INTL" /* NETWORKDAYS_INTL */,
    functionType: 1 /* Date */,
    description: "formula.functionList.NETWORKDAYS_INTL.description",
    abstract: "formula.functionList.NETWORKDAYS_INTL.abstract",
    functionParameter: [
      {
        name: "formula.functionList.NETWORKDAYS_INTL.functionParameter.startDate.name",
        detail: "formula.functionList.NETWORKDAYS_INTL.functionParameter.startDate.detail",
        example: '"2012-10-1"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.NETWORKDAYS_INTL.functionParameter.endDate.name",
        detail: "formula.functionList.NETWORKDAYS_INTL.functionParameter.endDate.detail",
        example: '"2013-3-1"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.NETWORKDAYS_INTL.functionParameter.weekend.name",
        detail: "formula.functionList.NETWORKDAYS_INTL.functionParameter.weekend.detail",
        example: "6",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.NETWORKDAYS_INTL.functionParameter.holidays.name",
        detail: "formula.functionList.NETWORKDAYS_INTL.functionParameter.holidays.detail",
        example: '"2012-11-22"',
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "NOW" /* NOW */,
    functionType: 1 /* Date */,
    description: "formula.functionList.NOW.description",
    abstract: "formula.functionList.NOW.abstract",
    functionParameter: []
  },
  {
    functionName: "SECOND" /* SECOND */,
    functionType: 1 /* Date */,
    description: "formula.functionList.SECOND.description",
    abstract: "formula.functionList.SECOND.abstract",
    functionParameter: [
      {
        name: "formula.functionList.SECOND.functionParameter.serialNumber.name",
        detail: "formula.functionList.SECOND.functionParameter.serialNumber.detail",
        example: '"4:48:18"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "TIME" /* TIME */,
    functionType: 1 /* Date */,
    description: "formula.functionList.TIME.description",
    abstract: "formula.functionList.TIME.abstract",
    functionParameter: [
      {
        name: "formula.functionList.TIME.functionParameter.hour.name",
        detail: "formula.functionList.TIME.functionParameter.hour.detail",
        example: "15",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.TIME.functionParameter.minute.name",
        detail: "formula.functionList.TIME.functionParameter.minute.detail",
        example: "20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.TIME.functionParameter.second.name",
        detail: "formula.functionList.TIME.functionParameter.second.detail",
        example: "59",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "TIMEVALUE" /* TIMEVALUE */,
    functionType: 1 /* Date */,
    description: "formula.functionList.TIMEVALUE.description",
    abstract: "formula.functionList.TIMEVALUE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.TIMEVALUE.functionParameter.timeText.name",
        detail: "formula.functionList.TIMEVALUE.functionParameter.timeText.detail",
        example: '"15:20:59"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "TO_DATE" /* TO_DATE */,
    functionType: 1 /* Date */,
    description: "formula.functionList.TO_DATE.description",
    abstract: "formula.functionList.TO_DATE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.TO_DATE.functionParameter.value.name",
        detail: "formula.functionList.TO_DATE.functionParameter.value.detail",
        example: "40826.4375",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "TODAY" /* TODAY */,
    functionType: 1 /* Date */,
    description: "formula.functionList.TODAY.description",
    abstract: "formula.functionList.TODAY.abstract",
    functionParameter: []
  },
  {
    functionName: "WEEKDAY" /* WEEKDAY */,
    functionType: 1 /* Date */,
    description: "formula.functionList.WEEKDAY.description",
    abstract: "formula.functionList.WEEKDAY.abstract",
    functionParameter: [
      {
        name: "formula.functionList.WEEKDAY.functionParameter.serialNumber.name",
        detail: "formula.functionList.WEEKDAY.functionParameter.serialNumber.detail",
        example: '"2008-2-14"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.WEEKDAY.functionParameter.returnType.name",
        detail: "formula.functionList.WEEKDAY.functionParameter.returnType.detail",
        example: "2",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "WEEKNUM" /* WEEKNUM */,
    functionType: 1 /* Date */,
    description: "formula.functionList.WEEKNUM.description",
    abstract: "formula.functionList.WEEKNUM.abstract",
    functionParameter: [
      {
        name: "formula.functionList.WEEKNUM.functionParameter.serialNumber.name",
        detail: "formula.functionList.WEEKNUM.functionParameter.serialNumber.detail",
        example: '"2012-3-9"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.WEEKNUM.functionParameter.returnType.name",
        detail: "formula.functionList.WEEKNUM.functionParameter.returnType.detail",
        example: "2",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "WORKDAY" /* WORKDAY */,
    functionType: 1 /* Date */,
    description: "formula.functionList.WORKDAY.description",
    abstract: "formula.functionList.WORKDAY.abstract",
    functionParameter: [
      {
        name: "formula.functionList.WORKDAY.functionParameter.startDate.name",
        detail: "formula.functionList.WORKDAY.functionParameter.startDate.detail",
        example: '"2008-10-1"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.WORKDAY.functionParameter.days.name",
        detail: "formula.functionList.WORKDAY.functionParameter.days.detail",
        example: "151",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.WORKDAY.functionParameter.holidays.name",
        detail: "formula.functionList.WORKDAY.functionParameter.holidays.detail",
        example: '"2008-11-26"',
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "WORKDAY.INTL" /* WORKDAY_INTL */,
    functionType: 1 /* Date */,
    description: "formula.functionList.WORKDAY_INTL.description",
    abstract: "formula.functionList.WORKDAY_INTL.abstract",
    functionParameter: [
      {
        name: "formula.functionList.WORKDAY_INTL.functionParameter.startDate.name",
        detail: "formula.functionList.WORKDAY_INTL.functionParameter.startDate.detail",
        example: '"2008-10-1"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.WORKDAY_INTL.functionParameter.days.name",
        detail: "formula.functionList.WORKDAY_INTL.functionParameter.days.detail",
        example: "151",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.WORKDAY_INTL.functionParameter.weekend.name",
        detail: "formula.functionList.WORKDAY_INTL.functionParameter.weekend.detail",
        example: "6",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.WORKDAY_INTL.functionParameter.holidays.name",
        detail: "formula.functionList.WORKDAY_INTL.functionParameter.holidays.detail",
        example: '"2008-11-26"',
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "YEAR" /* YEAR */,
    functionType: 1 /* Date */,
    description: "formula.functionList.YEAR.description",
    abstract: "formula.functionList.YEAR.abstract",
    functionParameter: [
      {
        name: "formula.functionList.YEAR.functionParameter.serialNumber.name",
        detail: "formula.functionList.YEAR.functionParameter.serialNumber.detail",
        example: '"1969-7-20"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "YEARFRAC" /* YEARFRAC */,
    functionType: 1 /* Date */,
    description: "formula.functionList.YEARFRAC.description",
    abstract: "formula.functionList.YEARFRAC.abstract",
    functionParameter: [
      {
        name: "formula.functionList.YEARFRAC.functionParameter.startDate.name",
        detail: "formula.functionList.YEARFRAC.functionParameter.startDate.detail",
        example: '"2012-1-1"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.YEARFRAC.functionParameter.endDate.name",
        detail: "formula.functionList.YEARFRAC.functionParameter.endDate.detail",
        example: '"2012-7-30"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.YEARFRAC.functionParameter.basis.name",
        detail: "formula.functionList.YEARFRAC.functionParameter.basis.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  }
];

// ../packages/sheets-formula/src/services/function-list/engineering.ts
var FUNCTION_LIST_ENGINEERING = [
  {
    functionName: "BESSELI" /* BESSELI */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.BESSELI.description",
    abstract: "formula.functionList.BESSELI.abstract",
    functionParameter: [
      {
        name: "formula.functionList.BESSELI.functionParameter.x.name",
        detail: "formula.functionList.BESSELI.functionParameter.x.detail",
        example: "1.5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BESSELI.functionParameter.n.name",
        detail: "formula.functionList.BESSELI.functionParameter.n.detail",
        example: "1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "BESSELJ" /* BESSELJ */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.BESSELJ.description",
    abstract: "formula.functionList.BESSELJ.abstract",
    functionParameter: [
      {
        name: "formula.functionList.BESSELJ.functionParameter.x.name",
        detail: "formula.functionList.BESSELJ.functionParameter.x.detail",
        example: "1.5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BESSELJ.functionParameter.n.name",
        detail: "formula.functionList.BESSELJ.functionParameter.n.detail",
        example: "1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "BESSELK" /* BESSELK */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.BESSELK.description",
    abstract: "formula.functionList.BESSELK.abstract",
    functionParameter: [
      {
        name: "formula.functionList.BESSELK.functionParameter.x.name",
        detail: "formula.functionList.BESSELK.functionParameter.x.detail",
        example: "1.5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BESSELK.functionParameter.n.name",
        detail: "formula.functionList.BESSELK.functionParameter.n.detail",
        example: "1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "BESSELY" /* BESSELY */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.BESSELY.description",
    abstract: "formula.functionList.BESSELY.abstract",
    functionParameter: [
      {
        name: "formula.functionList.BESSELY.functionParameter.x.name",
        detail: "formula.functionList.BESSELY.functionParameter.x.detail",
        example: "1.5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BESSELY.functionParameter.n.name",
        detail: "formula.functionList.BESSELY.functionParameter.n.detail",
        example: "1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "BIN2DEC" /* BIN2DEC */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.BIN2DEC.description",
    abstract: "formula.functionList.BIN2DEC.abstract",
    functionParameter: [
      {
        name: "formula.functionList.BIN2DEC.functionParameter.number.name",
        detail: "formula.functionList.BIN2DEC.functionParameter.number.detail",
        example: "1100100",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "BIN2HEX" /* BIN2HEX */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.BIN2HEX.description",
    abstract: "formula.functionList.BIN2HEX.abstract",
    functionParameter: [
      {
        name: "formula.functionList.BIN2HEX.functionParameter.number.name",
        detail: "formula.functionList.BIN2HEX.functionParameter.number.detail",
        example: "11111011",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BIN2HEX.functionParameter.places.name",
        detail: "formula.functionList.BIN2HEX.functionParameter.places.detail",
        example: "4",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "BIN2OCT" /* BIN2OCT */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.BIN2OCT.description",
    abstract: "formula.functionList.BIN2OCT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.BIN2OCT.functionParameter.number.name",
        detail: "formula.functionList.BIN2OCT.functionParameter.number.detail",
        example: "1001",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BIN2OCT.functionParameter.places.name",
        detail: "formula.functionList.BIN2OCT.functionParameter.places.detail",
        example: "3",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "BITAND" /* BITAND */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.BITAND.description",
    abstract: "formula.functionList.BITAND.abstract",
    functionParameter: [
      {
        name: "formula.functionList.BITAND.functionParameter.number1.name",
        detail: "formula.functionList.BITAND.functionParameter.number1.detail",
        example: "13",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BITAND.functionParameter.number2.name",
        detail: "formula.functionList.BITAND.functionParameter.number2.detail",
        example: "25",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "BITLSHIFT" /* BITLSHIFT */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.BITLSHIFT.description",
    abstract: "formula.functionList.BITLSHIFT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.BITLSHIFT.functionParameter.number.name",
        detail: "formula.functionList.BITLSHIFT.functionParameter.number.detail",
        example: "4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BITLSHIFT.functionParameter.shiftAmount.name",
        detail: "formula.functionList.BITLSHIFT.functionParameter.shiftAmount.detail",
        example: "2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "BITOR" /* BITOR */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.BITOR.description",
    abstract: "formula.functionList.BITOR.abstract",
    functionParameter: [
      {
        name: "formula.functionList.BITOR.functionParameter.number1.name",
        detail: "formula.functionList.BITOR.functionParameter.number1.detail",
        example: "23",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BITOR.functionParameter.number2.name",
        detail: "formula.functionList.BITOR.functionParameter.number2.detail",
        example: "10",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "BITRSHIFT" /* BITRSHIFT */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.BITRSHIFT.description",
    abstract: "formula.functionList.BITRSHIFT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.BITRSHIFT.functionParameter.number.name",
        detail: "formula.functionList.BITRSHIFT.functionParameter.number.detail",
        example: "13",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BITRSHIFT.functionParameter.shiftAmount.name",
        detail: "formula.functionList.BITRSHIFT.functionParameter.shiftAmount.detail",
        example: "2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "BITXOR" /* BITXOR */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.BITXOR.description",
    abstract: "formula.functionList.BITXOR.abstract",
    functionParameter: [
      {
        name: "formula.functionList.BITXOR.functionParameter.number1.name",
        detail: "formula.functionList.BITXOR.functionParameter.number1.detail",
        example: "5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BITXOR.functionParameter.number2.name",
        detail: "formula.functionList.BITXOR.functionParameter.number2.detail",
        example: "3",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "COMPLEX" /* COMPLEX */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.COMPLEX.description",
    abstract: "formula.functionList.COMPLEX.abstract",
    functionParameter: [
      {
        name: "formula.functionList.COMPLEX.functionParameter.realNum.name",
        detail: "formula.functionList.COMPLEX.functionParameter.realNum.detail",
        example: "3",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.COMPLEX.functionParameter.iNum.name",
        detail: "formula.functionList.COMPLEX.functionParameter.iNum.detail",
        example: "4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.COMPLEX.functionParameter.suffix.name",
        detail: "formula.functionList.COMPLEX.functionParameter.suffix.detail",
        example: '"i"',
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "CONVERT" /* CONVERT */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.CONVERT.description",
    abstract: "formula.functionList.CONVERT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CONVERT.functionParameter.number.name",
        detail: "formula.functionList.CONVERT.functionParameter.number.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CONVERT.functionParameter.fromUnit.name",
        detail: "formula.functionList.CONVERT.functionParameter.fromUnit.detail",
        example: '"lbm"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CONVERT.functionParameter.toUnit.name",
        detail: "formula.functionList.CONVERT.functionParameter.toUnit.detail",
        example: '"kg"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "DEC2BIN" /* DEC2BIN */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.DEC2BIN.description",
    abstract: "formula.functionList.DEC2BIN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DEC2BIN.functionParameter.number.name",
        detail: "formula.functionList.DEC2BIN.functionParameter.number.detail",
        example: "9",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DEC2BIN.functionParameter.places.name",
        detail: "formula.functionList.DEC2BIN.functionParameter.places.detail",
        example: "4",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "DEC2HEX" /* DEC2HEX */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.DEC2HEX.description",
    abstract: "formula.functionList.DEC2HEX.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DEC2HEX.functionParameter.number.name",
        detail: "formula.functionList.DEC2HEX.functionParameter.number.detail",
        example: "100",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DEC2HEX.functionParameter.places.name",
        detail: "formula.functionList.DEC2HEX.functionParameter.places.detail",
        example: "4",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "DEC2OCT" /* DEC2OCT */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.DEC2OCT.description",
    abstract: "formula.functionList.DEC2OCT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DEC2OCT.functionParameter.number.name",
        detail: "formula.functionList.DEC2OCT.functionParameter.number.detail",
        example: "58",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DEC2OCT.functionParameter.places.name",
        detail: "formula.functionList.DEC2OCT.functionParameter.places.detail",
        example: "3",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "DELTA" /* DELTA */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.DELTA.description",
    abstract: "formula.functionList.DELTA.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DELTA.functionParameter.number1.name",
        detail: "formula.functionList.DELTA.functionParameter.number1.detail",
        example: "5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DELTA.functionParameter.number2.name",
        detail: "formula.functionList.DELTA.functionParameter.number2.detail",
        example: "4",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ERF" /* ERF */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.ERF.description",
    abstract: "formula.functionList.ERF.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ERF.functionParameter.lowerLimit.name",
        detail: "formula.functionList.ERF.functionParameter.lowerLimit.detail",
        example: "0.745",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ERF.functionParameter.upperLimit.name",
        detail: "formula.functionList.ERF.functionParameter.upperLimit.detail",
        example: "2",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ERF.PRECISE" /* ERF_PRECISE */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.ERF_PRECISE.description",
    abstract: "formula.functionList.ERF_PRECISE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ERF_PRECISE.functionParameter.x.name",
        detail: "formula.functionList.ERF_PRECISE.functionParameter.x.detail",
        example: "1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ERFC" /* ERFC */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.ERFC.description",
    abstract: "formula.functionList.ERFC.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ERFC.functionParameter.x.name",
        detail: "formula.functionList.ERFC.functionParameter.x.detail",
        example: "1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ERFC.PRECISE" /* ERFC_PRECISE */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.ERFC_PRECISE.description",
    abstract: "formula.functionList.ERFC_PRECISE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ERFC_PRECISE.functionParameter.x.name",
        detail: "formula.functionList.ERFC_PRECISE.functionParameter.x.detail",
        example: "1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "GESTEP" /* GESTEP */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.GESTEP.description",
    abstract: "formula.functionList.GESTEP.abstract",
    functionParameter: [
      {
        name: "formula.functionList.GESTEP.functionParameter.number.name",
        detail: "formula.functionList.GESTEP.functionParameter.number.detail",
        example: "5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.GESTEP.functionParameter.step.name",
        detail: "formula.functionList.GESTEP.functionParameter.step.detail",
        example: "4",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "HEX2BIN" /* HEX2BIN */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.HEX2BIN.description",
    abstract: "formula.functionList.HEX2BIN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.HEX2BIN.functionParameter.number.name",
        detail: "formula.functionList.HEX2BIN.functionParameter.number.detail",
        example: '"F"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.HEX2BIN.functionParameter.places.name",
        detail: "formula.functionList.HEX2BIN.functionParameter.places.detail",
        example: "8",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "HEX2DEC" /* HEX2DEC */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.HEX2DEC.description",
    abstract: "formula.functionList.HEX2DEC.abstract",
    functionParameter: [
      {
        name: "formula.functionList.HEX2DEC.functionParameter.number.name",
        detail: "formula.functionList.HEX2DEC.functionParameter.number.detail",
        example: '"A5"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "HEX2OCT" /* HEX2OCT */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.HEX2OCT.description",
    abstract: "formula.functionList.HEX2OCT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.HEX2OCT.functionParameter.number.name",
        detail: "formula.functionList.HEX2OCT.functionParameter.number.detail",
        example: '"F"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.HEX2OCT.functionParameter.places.name",
        detail: "formula.functionList.HEX2OCT.functionParameter.places.detail",
        example: "3",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "IMABS" /* IMABS */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.IMABS.description",
    abstract: "formula.functionList.IMABS.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IMABS.functionParameter.inumber.name",
        detail: "formula.functionList.IMABS.functionParameter.inumber.detail",
        example: '"5+12i"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "IMAGINARY" /* IMAGINARY */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.IMAGINARY.description",
    abstract: "formula.functionList.IMAGINARY.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IMAGINARY.functionParameter.inumber.name",
        detail: "formula.functionList.IMAGINARY.functionParameter.inumber.detail",
        example: '"3+4i"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "IMARGUMENT" /* IMARGUMENT */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.IMARGUMENT.description",
    abstract: "formula.functionList.IMARGUMENT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IMARGUMENT.functionParameter.inumber.name",
        detail: "formula.functionList.IMARGUMENT.functionParameter.inumber.detail",
        example: '"3+4i"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "IMCONJUGATE" /* IMCONJUGATE */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.IMCONJUGATE.description",
    abstract: "formula.functionList.IMCONJUGATE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IMCONJUGATE.functionParameter.inumber.name",
        detail: "formula.functionList.IMCONJUGATE.functionParameter.inumber.detail",
        example: '"3+4i"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "IMCOS" /* IMCOS */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.IMCOS.description",
    abstract: "formula.functionList.IMCOS.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IMCOS.functionParameter.inumber.name",
        detail: "formula.functionList.IMCOS.functionParameter.inumber.detail",
        example: '"1+i"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "IMCOSH" /* IMCOSH */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.IMCOSH.description",
    abstract: "formula.functionList.IMCOSH.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IMCOSH.functionParameter.inumber.name",
        detail: "formula.functionList.IMCOSH.functionParameter.inumber.detail",
        example: '"4+3i"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "IMCOT" /* IMCOT */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.IMCOT.description",
    abstract: "formula.functionList.IMCOT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IMCOT.functionParameter.inumber.name",
        detail: "formula.functionList.IMCOT.functionParameter.inumber.detail",
        example: '"4+3i"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "IMCOTH" /* IMCOTH */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.IMCOTH.description",
    abstract: "formula.functionList.IMCOTH.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IMCOTH.functionParameter.inumber.name",
        detail: "formula.functionList.IMCOTH.functionParameter.inumber.detail",
        example: '"4+3i"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "IMCSC" /* IMCSC */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.IMCSC.description",
    abstract: "formula.functionList.IMCSC.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IMCSC.functionParameter.inumber.name",
        detail: "formula.functionList.IMCSC.functionParameter.inumber.detail",
        example: '"4+3i"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "IMCSCH" /* IMCSCH */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.IMCSCH.description",
    abstract: "formula.functionList.IMCSCH.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IMCSCH.functionParameter.inumber.name",
        detail: "formula.functionList.IMCSCH.functionParameter.inumber.detail",
        example: '"4+3i"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "IMDIV" /* IMDIV */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.IMDIV.description",
    abstract: "formula.functionList.IMDIV.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IMDIV.functionParameter.inumber1.name",
        detail: "formula.functionList.IMDIV.functionParameter.inumber1.detail",
        example: '"-238+240i"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.IMDIV.functionParameter.inumber2.name",
        detail: "formula.functionList.IMDIV.functionParameter.inumber2.detail",
        example: '"10+24i"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "IMEXP" /* IMEXP */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.IMEXP.description",
    abstract: "formula.functionList.IMEXP.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IMEXP.functionParameter.inumber.name",
        detail: "formula.functionList.IMEXP.functionParameter.inumber.detail",
        example: '"1+i"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "IMLN" /* IMLN */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.IMLN.description",
    abstract: "formula.functionList.IMLN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IMLN.functionParameter.inumber.name",
        detail: "formula.functionList.IMLN.functionParameter.inumber.detail",
        example: '"3+4i"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "IMLOG" /* IMLOG */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.IMLOG.description",
    abstract: "formula.functionList.IMLOG.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IMLOG.functionParameter.inumber.name",
        detail: "formula.functionList.IMLOG.functionParameter.inumber.detail",
        example: '"3+4i"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.IMLOG.functionParameter.base.name",
        detail: "formula.functionList.IMLOG.functionParameter.base.detail",
        example: "10",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "IMLOG10" /* IMLOG10 */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.IMLOG10.description",
    abstract: "formula.functionList.IMLOG10.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IMLOG10.functionParameter.inumber.name",
        detail: "formula.functionList.IMLOG10.functionParameter.inumber.detail",
        example: '"3+4i"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "IMLOG2" /* IMLOG2 */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.IMLOG2.description",
    abstract: "formula.functionList.IMLOG2.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IMLOG2.functionParameter.inumber.name",
        detail: "formula.functionList.IMLOG2.functionParameter.inumber.detail",
        example: '"3+4i"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "IMPOWER" /* IMPOWER */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.IMPOWER.description",
    abstract: "formula.functionList.IMPOWER.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IMPOWER.functionParameter.inumber.name",
        detail: "formula.functionList.IMPOWER.functionParameter.inumber.detail",
        example: '"2+3i"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.IMPOWER.functionParameter.number.name",
        detail: "formula.functionList.IMPOWER.functionParameter.number.detail",
        example: "3",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "IMPRODUCT" /* IMPRODUCT */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.IMPRODUCT.description",
    abstract: "formula.functionList.IMPRODUCT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IMPRODUCT.functionParameter.inumber1.name",
        detail: "formula.functionList.IMPRODUCT.functionParameter.inumber1.detail",
        example: '"3+4i"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.IMPRODUCT.functionParameter.inumber2.name",
        detail: "formula.functionList.IMPRODUCT.functionParameter.inumber2.detail",
        example: '"5-3i"',
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "IMREAL" /* IMREAL */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.IMREAL.description",
    abstract: "formula.functionList.IMREAL.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IMREAL.functionParameter.inumber.name",
        detail: "formula.functionList.IMREAL.functionParameter.inumber.detail",
        example: '"6-9i"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "IMSEC" /* IMSEC */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.IMSEC.description",
    abstract: "formula.functionList.IMSEC.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IMSEC.functionParameter.inumber.name",
        detail: "formula.functionList.IMSEC.functionParameter.inumber.detail",
        example: '"4+3i"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "IMSECH" /* IMSECH */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.IMSECH.description",
    abstract: "formula.functionList.IMSECH.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IMSECH.functionParameter.inumber.name",
        detail: "formula.functionList.IMSECH.functionParameter.inumber.detail",
        example: '"4+3i"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "IMSIN" /* IMSIN */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.IMSIN.description",
    abstract: "formula.functionList.IMSIN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IMSIN.functionParameter.inumber.name",
        detail: "formula.functionList.IMSIN.functionParameter.inumber.detail",
        example: '"4+3i"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "IMSINH" /* IMSINH */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.IMSINH.description",
    abstract: "formula.functionList.IMSINH.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IMSINH.functionParameter.inumber.name",
        detail: "formula.functionList.IMSINH.functionParameter.inumber.detail",
        example: '"4+3i"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "IMSQRT" /* IMSQRT */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.IMSQRT.description",
    abstract: "formula.functionList.IMSQRT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IMSQRT.functionParameter.inumber.name",
        detail: "formula.functionList.IMSQRT.functionParameter.inumber.detail",
        example: '"1+i"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "IMSUB" /* IMSUB */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.IMSUB.description",
    abstract: "formula.functionList.IMSUB.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IMSUB.functionParameter.inumber1.name",
        detail: "formula.functionList.IMSUB.functionParameter.inumber1.detail",
        example: '"13+4i"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.IMSUB.functionParameter.inumber2.name",
        detail: "formula.functionList.IMSUB.functionParameter.inumber2.detail",
        example: '"5+3i"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "IMSUM" /* IMSUM */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.IMSUM.description",
    abstract: "formula.functionList.IMSUM.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IMSUM.functionParameter.inumber1.name",
        detail: "formula.functionList.IMSUM.functionParameter.inumber1.detail",
        example: '"3+4i"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.IMSUM.functionParameter.inumber2.name",
        detail: "formula.functionList.IMSUM.functionParameter.inumber2.detail",
        example: '"5-3i"',
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "IMTAN" /* IMTAN */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.IMTAN.description",
    abstract: "formula.functionList.IMTAN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IMTAN.functionParameter.inumber.name",
        detail: "formula.functionList.IMTAN.functionParameter.inumber.detail",
        example: '"4+3i"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "IMTANH" /* IMTANH */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.IMTANH.description",
    abstract: "formula.functionList.IMTANH.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IMTANH.functionParameter.inumber.name",
        detail: "formula.functionList.IMTANH.functionParameter.inumber.detail",
        example: '"4+3i"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "OCT2BIN" /* OCT2BIN */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.OCT2BIN.description",
    abstract: "formula.functionList.OCT2BIN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.OCT2BIN.functionParameter.number.name",
        detail: "formula.functionList.OCT2BIN.functionParameter.number.detail",
        example: "3",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.OCT2BIN.functionParameter.places.name",
        detail: "formula.functionList.OCT2BIN.functionParameter.places.detail",
        example: "3",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "OCT2DEC" /* OCT2DEC */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.OCT2DEC.description",
    abstract: "formula.functionList.OCT2DEC.abstract",
    functionParameter: [
      {
        name: "formula.functionList.OCT2DEC.functionParameter.number.name",
        detail: "formula.functionList.OCT2DEC.functionParameter.number.detail",
        example: "54",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "OCT2HEX" /* OCT2HEX */,
    functionType: 9 /* Engineering */,
    description: "formula.functionList.OCT2HEX.description",
    abstract: "formula.functionList.OCT2HEX.abstract",
    functionParameter: [
      {
        name: "formula.functionList.OCT2HEX.functionParameter.number.name",
        detail: "formula.functionList.OCT2HEX.functionParameter.number.detail",
        example: "100",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.OCT2HEX.functionParameter.places.name",
        detail: "formula.functionList.OCT2HEX.functionParameter.places.detail",
        example: "4",
        require: 0,
        repeat: 0
      }
    ]
  }
];

// ../packages/sheets-formula/src/services/function-list/financial.ts
var FUNCTION_LIST_FINANCIAL = [
  {
    functionName: "ACCRINT" /* ACCRINT */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.ACCRINT.description",
    abstract: "formula.functionList.ACCRINT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ACCRINT.functionParameter.issue.name",
        detail: "formula.functionList.ACCRINT.functionParameter.issue.detail",
        example: '"2008-3-1"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ACCRINT.functionParameter.firstInterest.name",
        detail: "formula.functionList.ACCRINT.functionParameter.firstInterest.detail",
        example: '"2008-8-31"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ACCRINT.functionParameter.settlement.name",
        detail: "formula.functionList.ACCRINT.functionParameter.settlement.detail",
        example: '"2008-5-1"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ACCRINT.functionParameter.rate.name",
        detail: "formula.functionList.ACCRINT.functionParameter.rate.detail",
        example: "10%",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ACCRINT.functionParameter.par.name",
        detail: "formula.functionList.ACCRINT.functionParameter.par.detail",
        example: "1000",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ACCRINT.functionParameter.frequency.name",
        detail: "formula.functionList.ACCRINT.functionParameter.frequency.detail",
        example: "2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ACCRINT.functionParameter.basis.name",
        detail: "formula.functionList.ACCRINT.functionParameter.basis.detail",
        example: "0",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.ACCRINT.functionParameter.calcMethod.name",
        detail: "formula.functionList.ACCRINT.functionParameter.calcMethod.detail",
        example: "true",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ACCRINTM" /* ACCRINTM */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.ACCRINTM.description",
    abstract: "formula.functionList.ACCRINTM.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ACCRINTM.functionParameter.issue.name",
        detail: "formula.functionList.ACCRINTM.functionParameter.issue.detail",
        example: '"2008-4-1"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ACCRINTM.functionParameter.settlement.name",
        detail: "formula.functionList.ACCRINTM.functionParameter.settlement.detail",
        example: '"2008-6-15"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ACCRINTM.functionParameter.rate.name",
        detail: "formula.functionList.ACCRINTM.functionParameter.rate.detail",
        example: "10%",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ACCRINTM.functionParameter.par.name",
        detail: "formula.functionList.ACCRINTM.functionParameter.par.detail",
        example: "1000",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ACCRINTM.functionParameter.basis.name",
        detail: "formula.functionList.ACCRINTM.functionParameter.basis.detail",
        example: "3",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "AMORDEGRC" /* AMORDEGRC */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.AMORDEGRC.description",
    abstract: "formula.functionList.AMORDEGRC.abstract",
    functionParameter: [
      {
        name: "formula.functionList.AMORDEGRC.functionParameter.number1.name",
        detail: "formula.functionList.AMORDEGRC.functionParameter.number1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.AMORDEGRC.functionParameter.number2.name",
        detail: "formula.functionList.AMORDEGRC.functionParameter.number2.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "AMORLINC" /* AMORLINC */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.AMORLINC.description",
    abstract: "formula.functionList.AMORLINC.abstract",
    functionParameter: [
      {
        name: "formula.functionList.AMORLINC.functionParameter.cost.name",
        detail: "formula.functionList.AMORLINC.functionParameter.cost.detail",
        example: "2400",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.AMORLINC.functionParameter.datePurchased.name",
        detail: "formula.functionList.AMORLINC.functionParameter.datePurchased.detail",
        example: '"2008-8-19"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.AMORLINC.functionParameter.firstPeriod.name",
        detail: "formula.functionList.AMORLINC.functionParameter.firstPeriod.detail",
        example: '"2008-12-31"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.AMORLINC.functionParameter.salvage.name",
        detail: "formula.functionList.AMORLINC.functionParameter.salvage.detail",
        example: "300",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.AMORLINC.functionParameter.period.name",
        detail: "formula.functionList.AMORLINC.functionParameter.period.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.AMORLINC.functionParameter.rate.name",
        detail: "formula.functionList.AMORLINC.functionParameter.rate.detail",
        example: "15%",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.AMORLINC.functionParameter.basis.name",
        detail: "formula.functionList.AMORLINC.functionParameter.basis.detail",
        example: "0",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "COUPDAYBS" /* COUPDAYBS */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.COUPDAYBS.description",
    abstract: "formula.functionList.COUPDAYBS.abstract",
    functionParameter: [
      {
        name: "formula.functionList.COUPDAYBS.functionParameter.settlement.name",
        detail: "formula.functionList.COUPDAYBS.functionParameter.settlement.detail",
        example: '"2011-1-25"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.COUPDAYBS.functionParameter.maturity.name",
        detail: "formula.functionList.COUPDAYBS.functionParameter.maturity.detail",
        example: '"2011-11-15"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.COUPDAYBS.functionParameter.frequency.name",
        detail: "formula.functionList.COUPDAYBS.functionParameter.frequency.detail",
        example: "2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.COUPDAYBS.functionParameter.basis.name",
        detail: "formula.functionList.COUPDAYBS.functionParameter.basis.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "COUPDAYS" /* COUPDAYS */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.COUPDAYS.description",
    abstract: "formula.functionList.COUPDAYS.abstract",
    functionParameter: [
      {
        name: "formula.functionList.COUPDAYS.functionParameter.settlement.name",
        detail: "formula.functionList.COUPDAYS.functionParameter.settlement.detail",
        example: '"2011-1-25"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.COUPDAYS.functionParameter.maturity.name",
        detail: "formula.functionList.COUPDAYS.functionParameter.maturity.detail",
        example: '"2011-11-15"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.COUPDAYS.functionParameter.frequency.name",
        detail: "formula.functionList.COUPDAYS.functionParameter.frequency.detail",
        example: "2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.COUPDAYS.functionParameter.basis.name",
        detail: "formula.functionList.COUPDAYS.functionParameter.basis.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "COUPDAYSNC" /* COUPDAYSNC */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.COUPDAYSNC.description",
    abstract: "formula.functionList.COUPDAYSNC.abstract",
    functionParameter: [
      {
        name: "formula.functionList.COUPDAYSNC.functionParameter.settlement.name",
        detail: "formula.functionList.COUPDAYSNC.functionParameter.settlement.detail",
        example: '"2011-1-25"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.COUPDAYSNC.functionParameter.maturity.name",
        detail: "formula.functionList.COUPDAYSNC.functionParameter.maturity.detail",
        example: '"2011-11-15"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.COUPDAYSNC.functionParameter.frequency.name",
        detail: "formula.functionList.COUPDAYSNC.functionParameter.frequency.detail",
        example: "2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.COUPDAYSNC.functionParameter.basis.name",
        detail: "formula.functionList.COUPDAYSNC.functionParameter.basis.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "COUPNCD" /* COUPNCD */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.COUPNCD.description",
    abstract: "formula.functionList.COUPNCD.abstract",
    functionParameter: [
      {
        name: "formula.functionList.COUPNCD.functionParameter.settlement.name",
        detail: "formula.functionList.COUPNCD.functionParameter.settlement.detail",
        example: '"2011-1-25"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.COUPNCD.functionParameter.maturity.name",
        detail: "formula.functionList.COUPNCD.functionParameter.maturity.detail",
        example: '"2011-11-15"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.COUPNCD.functionParameter.frequency.name",
        detail: "formula.functionList.COUPNCD.functionParameter.frequency.detail",
        example: "2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.COUPNCD.functionParameter.basis.name",
        detail: "formula.functionList.COUPNCD.functionParameter.basis.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "COUPNUM" /* COUPNUM */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.COUPNUM.description",
    abstract: "formula.functionList.COUPNUM.abstract",
    functionParameter: [
      {
        name: "formula.functionList.COUPNUM.functionParameter.settlement.name",
        detail: "formula.functionList.COUPNUM.functionParameter.settlement.detail",
        example: '"2011-1-25"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.COUPNUM.functionParameter.maturity.name",
        detail: "formula.functionList.COUPNUM.functionParameter.maturity.detail",
        example: '"2011-11-15"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.COUPNUM.functionParameter.frequency.name",
        detail: "formula.functionList.COUPNUM.functionParameter.frequency.detail",
        example: "2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.COUPNUM.functionParameter.basis.name",
        detail: "formula.functionList.COUPNUM.functionParameter.basis.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "COUPPCD" /* COUPPCD */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.COUPPCD.description",
    abstract: "formula.functionList.COUPPCD.abstract",
    functionParameter: [
      {
        name: "formula.functionList.COUPPCD.functionParameter.settlement.name",
        detail: "formula.functionList.COUPPCD.functionParameter.settlement.detail",
        example: '"2011-1-25"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.COUPPCD.functionParameter.maturity.name",
        detail: "formula.functionList.COUPPCD.functionParameter.maturity.detail",
        example: '"2011-11-15"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.COUPPCD.functionParameter.frequency.name",
        detail: "formula.functionList.COUPPCD.functionParameter.frequency.detail",
        example: "2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.COUPPCD.functionParameter.basis.name",
        detail: "formula.functionList.COUPPCD.functionParameter.basis.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "CUMIPMT" /* CUMIPMT */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.CUMIPMT.description",
    abstract: "formula.functionList.CUMIPMT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CUMIPMT.functionParameter.rate.name",
        detail: "formula.functionList.CUMIPMT.functionParameter.rate.detail",
        example: "9%/12",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CUMIPMT.functionParameter.nper.name",
        detail: "formula.functionList.CUMIPMT.functionParameter.nper.detail",
        example: "30*12",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CUMIPMT.functionParameter.pv.name",
        detail: "formula.functionList.CUMIPMT.functionParameter.pv.detail",
        example: "125000",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CUMIPMT.functionParameter.startPeriod.name",
        detail: "formula.functionList.CUMIPMT.functionParameter.startPeriod.detail",
        example: "13",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CUMIPMT.functionParameter.endPeriod.name",
        detail: "formula.functionList.CUMIPMT.functionParameter.endPeriod.detail",
        example: "24",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CUMIPMT.functionParameter.type.name",
        detail: "formula.functionList.CUMIPMT.functionParameter.type.detail",
        example: "0",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "CUMPRINC" /* CUMPRINC */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.CUMPRINC.description",
    abstract: "formula.functionList.CUMPRINC.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CUMPRINC.functionParameter.rate.name",
        detail: "formula.functionList.CUMPRINC.functionParameter.rate.detail",
        example: "9%/12",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CUMPRINC.functionParameter.nper.name",
        detail: "formula.functionList.CUMPRINC.functionParameter.nper.detail",
        example: "30*12",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CUMPRINC.functionParameter.pv.name",
        detail: "formula.functionList.CUMPRINC.functionParameter.pv.detail",
        example: "125000",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CUMPRINC.functionParameter.startPeriod.name",
        detail: "formula.functionList.CUMPRINC.functionParameter.startPeriod.detail",
        example: "13",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CUMPRINC.functionParameter.endPeriod.name",
        detail: "formula.functionList.CUMPRINC.functionParameter.endPeriod.detail",
        example: "24",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CUMPRINC.functionParameter.type.name",
        detail: "formula.functionList.CUMPRINC.functionParameter.type.detail",
        example: "0",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "DB" /* DB */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.DB.description",
    abstract: "formula.functionList.DB.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DB.functionParameter.cost.name",
        detail: "formula.functionList.DB.functionParameter.cost.detail",
        example: "10000000",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DB.functionParameter.salvage.name",
        detail: "formula.functionList.DB.functionParameter.salvage.detail",
        example: "1000000",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DB.functionParameter.life.name",
        detail: "formula.functionList.DB.functionParameter.life.detail",
        example: "6",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DB.functionParameter.period.name",
        detail: "formula.functionList.DB.functionParameter.period.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DB.functionParameter.month.name",
        detail: "formula.functionList.DB.functionParameter.month.detail",
        example: "7",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "DDB" /* DDB */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.DDB.description",
    abstract: "formula.functionList.DDB.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DDB.functionParameter.cost.name",
        detail: "formula.functionList.DDB.functionParameter.cost.detail",
        example: "24000",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DDB.functionParameter.salvage.name",
        detail: "formula.functionList.DDB.functionParameter.salvage.detail",
        example: "3000",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DDB.functionParameter.life.name",
        detail: "formula.functionList.DDB.functionParameter.life.detail",
        example: "10",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DDB.functionParameter.period.name",
        detail: "formula.functionList.DDB.functionParameter.period.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DDB.functionParameter.factor.name",
        detail: "formula.functionList.DDB.functionParameter.factor.detail",
        example: "2",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "DISC" /* DISC */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.DISC.description",
    abstract: "formula.functionList.DISC.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DISC.functionParameter.settlement.name",
        detail: "formula.functionList.DISC.functionParameter.settlement.detail",
        example: '"2018-7-1"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DISC.functionParameter.maturity.name",
        detail: "formula.functionList.DISC.functionParameter.maturity.detail",
        example: '"2048-1-1"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DISC.functionParameter.pr.name",
        detail: "formula.functionList.DISC.functionParameter.pr.detail",
        example: "97.975",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DISC.functionParameter.redemption.name",
        detail: "formula.functionList.DISC.functionParameter.redemption.detail",
        example: "100",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DISC.functionParameter.basis.name",
        detail: "formula.functionList.DISC.functionParameter.basis.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "DOLLARDE" /* DOLLARDE */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.DOLLARDE.description",
    abstract: "formula.functionList.DOLLARDE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DOLLARDE.functionParameter.fractionalDollar.name",
        detail: "formula.functionList.DOLLARDE.functionParameter.fractionalDollar.detail",
        example: "1.02",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DOLLARDE.functionParameter.fraction.name",
        detail: "formula.functionList.DOLLARDE.functionParameter.fraction.detail",
        example: "16",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "DOLLARFR" /* DOLLARFR */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.DOLLARFR.description",
    abstract: "formula.functionList.DOLLARFR.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DOLLARFR.functionParameter.decimalDollar.name",
        detail: "formula.functionList.DOLLARFR.functionParameter.decimalDollar.detail",
        example: "1.125",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DOLLARFR.functionParameter.fraction.name",
        detail: "formula.functionList.DOLLARFR.functionParameter.fraction.detail",
        example: "16",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "DURATION" /* DURATION */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.DURATION.description",
    abstract: "formula.functionList.DURATION.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DURATION.functionParameter.settlement.name",
        detail: "formula.functionList.DURATION.functionParameter.settlement.detail",
        example: '"2018-7-1"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DURATION.functionParameter.maturity.name",
        detail: "formula.functionList.DURATION.functionParameter.maturity.detail",
        example: '"2048-1-1"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DURATION.functionParameter.coupon.name",
        detail: "formula.functionList.DURATION.functionParameter.coupon.detail",
        example: "8%",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DURATION.functionParameter.yld.name",
        detail: "formula.functionList.DURATION.functionParameter.yld.detail",
        example: "9%",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DURATION.functionParameter.frequency.name",
        detail: "formula.functionList.DURATION.functionParameter.frequency.detail",
        example: "2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DURATION.functionParameter.basis.name",
        detail: "formula.functionList.DURATION.functionParameter.basis.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "EFFECT" /* EFFECT */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.EFFECT.description",
    abstract: "formula.functionList.EFFECT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.EFFECT.functionParameter.nominalRate.name",
        detail: "formula.functionList.EFFECT.functionParameter.nominalRate.detail",
        example: "5.25%",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.EFFECT.functionParameter.npery.name",
        detail: "formula.functionList.EFFECT.functionParameter.npery.detail",
        example: "4",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "FV" /* FV */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.FV.description",
    abstract: "formula.functionList.FV.abstract",
    functionParameter: [
      {
        name: "formula.functionList.FV.functionParameter.rate.name",
        detail: "formula.functionList.FV.functionParameter.rate.detail",
        example: "6%/12",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.FV.functionParameter.nper.name",
        detail: "formula.functionList.FV.functionParameter.nper.detail",
        example: "10",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.FV.functionParameter.pmt.name",
        detail: "formula.functionList.FV.functionParameter.pmt.detail",
        example: "-200",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.FV.functionParameter.pv.name",
        detail: "formula.functionList.FV.functionParameter.pv.detail",
        example: "-500",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.FV.functionParameter.type.name",
        detail: "formula.functionList.FV.functionParameter.type.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "FVSCHEDULE" /* FVSCHEDULE */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.FVSCHEDULE.description",
    abstract: "formula.functionList.FVSCHEDULE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.FVSCHEDULE.functionParameter.principal.name",
        detail: "formula.functionList.FVSCHEDULE.functionParameter.principal.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.FVSCHEDULE.functionParameter.schedule.name",
        detail: "formula.functionList.FVSCHEDULE.functionParameter.schedule.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "INTRATE" /* INTRATE */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.INTRATE.description",
    abstract: "formula.functionList.INTRATE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.INTRATE.functionParameter.settlement.name",
        detail: "formula.functionList.INTRATE.functionParameter.settlement.detail",
        example: '"2008-2-15"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.INTRATE.functionParameter.maturity.name",
        detail: "formula.functionList.INTRATE.functionParameter.maturity.detail",
        example: '"2008-5-15"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.INTRATE.functionParameter.investment.name",
        detail: "formula.functionList.INTRATE.functionParameter.investment.detail",
        example: "10000000",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.INTRATE.functionParameter.redemption.name",
        detail: "formula.functionList.INTRATE.functionParameter.redemption.detail",
        example: "10144200",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.INTRATE.functionParameter.basis.name",
        detail: "formula.functionList.INTRATE.functionParameter.basis.detail",
        example: "2",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "IPMT" /* IPMT */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.IPMT.description",
    abstract: "formula.functionList.IPMT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IPMT.functionParameter.rate.name",
        detail: "formula.functionList.IPMT.functionParameter.rate.detail",
        example: "10%/12",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.IPMT.functionParameter.per.name",
        detail: "formula.functionList.IPMT.functionParameter.per.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.IPMT.functionParameter.nper.name",
        detail: "formula.functionList.IPMT.functionParameter.nper.detail",
        example: "3*12",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.IPMT.functionParameter.pv.name",
        detail: "formula.functionList.IPMT.functionParameter.pv.detail",
        example: "80000",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.IPMT.functionParameter.fv.name",
        detail: "formula.functionList.IPMT.functionParameter.fv.detail",
        example: "0",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.IPMT.functionParameter.type.name",
        detail: "formula.functionList.IPMT.functionParameter.type.detail",
        example: "0",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "IRR" /* IRR */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.IRR.description",
    abstract: "formula.functionList.IRR.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IRR.functionParameter.values.name",
        detail: "formula.functionList.IRR.functionParameter.values.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.IRR.functionParameter.guess.name",
        detail: "formula.functionList.IRR.functionParameter.guess.detail",
        example: "0.1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ISPMT" /* ISPMT */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.ISPMT.description",
    abstract: "formula.functionList.ISPMT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ISPMT.functionParameter.rate.name",
        detail: "formula.functionList.ISPMT.functionParameter.rate.detail",
        example: "10%",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ISPMT.functionParameter.per.name",
        detail: "formula.functionList.ISPMT.functionParameter.per.detail",
        example: "2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ISPMT.functionParameter.nper.name",
        detail: "formula.functionList.ISPMT.functionParameter.nper.detail",
        example: "5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ISPMT.functionParameter.pv.name",
        detail: "formula.functionList.ISPMT.functionParameter.pv.detail",
        example: "1000",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "MDURATION" /* MDURATION */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.MDURATION.description",
    abstract: "formula.functionList.MDURATION.abstract",
    functionParameter: [
      {
        name: "formula.functionList.MDURATION.functionParameter.settlement.name",
        detail: "formula.functionList.MDURATION.functionParameter.settlement.detail",
        example: '"2018-7-1"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MDURATION.functionParameter.maturity.name",
        detail: "formula.functionList.MDURATION.functionParameter.maturity.detail",
        example: '"2048-1-1"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MDURATION.functionParameter.coupon.name",
        detail: "formula.functionList.MDURATION.functionParameter.coupon.detail",
        example: "8%",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MDURATION.functionParameter.yld.name",
        detail: "formula.functionList.MDURATION.functionParameter.yld.detail",
        example: "9%",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MDURATION.functionParameter.frequency.name",
        detail: "formula.functionList.MDURATION.functionParameter.frequency.detail",
        example: "2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MDURATION.functionParameter.basis.name",
        detail: "formula.functionList.MDURATION.functionParameter.basis.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "MIRR" /* MIRR */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.MIRR.description",
    abstract: "formula.functionList.MIRR.abstract",
    functionParameter: [
      {
        name: "formula.functionList.MIRR.functionParameter.values.name",
        detail: "formula.functionList.MIRR.functionParameter.values.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MIRR.functionParameter.financeRate.name",
        detail: "formula.functionList.MIRR.functionParameter.financeRate.detail",
        example: "10%",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MIRR.functionParameter.reinvestRate.name",
        detail: "formula.functionList.MIRR.functionParameter.reinvestRate.detail",
        example: "12%",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "NOMINAL" /* NOMINAL */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.NOMINAL.description",
    abstract: "formula.functionList.NOMINAL.abstract",
    functionParameter: [
      {
        name: "formula.functionList.NOMINAL.functionParameter.effectRate.name",
        detail: "formula.functionList.NOMINAL.functionParameter.effectRate.detail",
        example: "5.3543%",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.NOMINAL.functionParameter.npery.name",
        detail: "formula.functionList.NOMINAL.functionParameter.npery.detail",
        example: "4",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "NPER" /* NPER */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.NPER.description",
    abstract: "formula.functionList.NPER.abstract",
    functionParameter: [
      {
        name: "formula.functionList.NPER.functionParameter.rate.name",
        detail: "formula.functionList.NPER.functionParameter.rate.detail",
        example: "12%/12",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.NPER.functionParameter.pmt.name",
        detail: "formula.functionList.NPER.functionParameter.pmt.detail",
        example: "-100",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.NPER.functionParameter.pv.name",
        detail: "formula.functionList.NPER.functionParameter.pv.detail",
        example: "-1000",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.NPER.functionParameter.fv.name",
        detail: "formula.functionList.NPER.functionParameter.fv.detail",
        example: "10000",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.NPER.functionParameter.type.name",
        detail: "formula.functionList.NPER.functionParameter.type.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "NPV" /* NPV */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.NPV.description",
    abstract: "formula.functionList.NPV.abstract",
    functionParameter: [
      {
        name: "formula.functionList.NPV.functionParameter.rate.name",
        detail: "formula.functionList.NPV.functionParameter.rate.detail",
        example: "10%",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.NPV.functionParameter.value1.name",
        detail: "formula.functionList.NPV.functionParameter.value1.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.NPV.functionParameter.value2.name",
        detail: "formula.functionList.NPV.functionParameter.value2.detail",
        example: "-9000",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "ODDFPRICE" /* ODDFPRICE */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.ODDFPRICE.description",
    abstract: "formula.functionList.ODDFPRICE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ODDFPRICE.functionParameter.settlement.name",
        detail: "formula.functionList.ODDFPRICE.functionParameter.settlement.detail",
        example: '"2008-11-11"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ODDFPRICE.functionParameter.maturity.name",
        detail: "formula.functionList.ODDFPRICE.functionParameter.maturity.detail",
        example: '"2021-3-1"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ODDFPRICE.functionParameter.issue.name",
        detail: "formula.functionList.ODDFPRICE.functionParameter.issue.detail",
        example: '"2008-10-15"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ODDFPRICE.functionParameter.firstCoupon.name",
        detail: "formula.functionList.ODDFPRICE.functionParameter.firstCoupon.detail",
        example: '"2009-3-1"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ODDFPRICE.functionParameter.rate.name",
        detail: "formula.functionList.ODDFPRICE.functionParameter.rate.detail",
        example: "7.85%",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ODDFPRICE.functionParameter.yld.name",
        detail: "formula.functionList.ODDFPRICE.functionParameter.yld.detail",
        example: "6.25%",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ODDFPRICE.functionParameter.redemption.name",
        detail: "formula.functionList.ODDFPRICE.functionParameter.redemption.detail",
        example: "100",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ODDFPRICE.functionParameter.frequency.name",
        detail: "formula.functionList.ODDFPRICE.functionParameter.frequency.detail",
        example: "2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ODDFPRICE.functionParameter.basis.name",
        detail: "formula.functionList.ODDFPRICE.functionParameter.basis.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ODDFYIELD" /* ODDFYIELD */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.ODDFYIELD.description",
    abstract: "formula.functionList.ODDFYIELD.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ODDFYIELD.functionParameter.settlement.name",
        detail: "formula.functionList.ODDFYIELD.functionParameter.settlement.detail",
        example: '"2008-11-11"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ODDFYIELD.functionParameter.maturity.name",
        detail: "formula.functionList.ODDFYIELD.functionParameter.maturity.detail",
        example: '"2021-3-1"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ODDFYIELD.functionParameter.issue.name",
        detail: "formula.functionList.ODDFYIELD.functionParameter.issue.detail",
        example: '"2008-10-15"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ODDFYIELD.functionParameter.firstCoupon.name",
        detail: "formula.functionList.ODDFYIELD.functionParameter.firstCoupon.detail",
        example: '"2009-3-1"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ODDFYIELD.functionParameter.rate.name",
        detail: "formula.functionList.ODDFYIELD.functionParameter.rate.detail",
        example: "5.75%",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ODDFYIELD.functionParameter.pr.name",
        detail: "formula.functionList.ODDFYIELD.functionParameter.pr.detail",
        example: "84.5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ODDFYIELD.functionParameter.redemption.name",
        detail: "formula.functionList.ODDFYIELD.functionParameter.redemption.detail",
        example: "100",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ODDFYIELD.functionParameter.frequency.name",
        detail: "formula.functionList.ODDFYIELD.functionParameter.frequency.detail",
        example: "2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ODDFYIELD.functionParameter.basis.name",
        detail: "formula.functionList.ODDFYIELD.functionParameter.basis.detail",
        example: "0",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ODDLPRICE" /* ODDLPRICE */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.ODDLPRICE.description",
    abstract: "formula.functionList.ODDLPRICE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ODDLPRICE.functionParameter.settlement.name",
        detail: "formula.functionList.ODDLPRICE.functionParameter.settlement.detail",
        example: '"2008-2-7"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ODDLPRICE.functionParameter.maturity.name",
        detail: "formula.functionList.ODDLPRICE.functionParameter.maturity.detail",
        example: '"2008-6-15"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ODDLPRICE.functionParameter.lastInterest.name",
        detail: "formula.functionList.ODDLPRICE.functionParameter.lastInterest.detail",
        example: '"2007-10-15"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ODDLPRICE.functionParameter.rate.name",
        detail: "formula.functionList.ODDLPRICE.functionParameter.rate.detail",
        example: "3.75%",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ODDLPRICE.functionParameter.yld.name",
        detail: "formula.functionList.ODDLPRICE.functionParameter.yld.detail",
        example: "4.05%",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ODDLPRICE.functionParameter.redemption.name",
        detail: "formula.functionList.ODDLPRICE.functionParameter.redemption.detail",
        example: "100",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ODDLPRICE.functionParameter.frequency.name",
        detail: "formula.functionList.ODDLPRICE.functionParameter.frequency.detail",
        example: "2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ODDLPRICE.functionParameter.basis.name",
        detail: "formula.functionList.ODDLPRICE.functionParameter.basis.detail",
        example: "0",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ODDLYIELD" /* ODDLYIELD */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.ODDLYIELD.description",
    abstract: "formula.functionList.ODDLYIELD.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ODDLYIELD.functionParameter.settlement.name",
        detail: "formula.functionList.ODDLYIELD.functionParameter.settlement.detail",
        example: '"2008-4-20"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ODDLYIELD.functionParameter.maturity.name",
        detail: "formula.functionList.ODDLYIELD.functionParameter.maturity.detail",
        example: '"2008-6-15"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ODDLYIELD.functionParameter.lastInterest.name",
        detail: "formula.functionList.ODDLYIELD.functionParameter.lastInterest.detail",
        example: '"2007-12-24"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ODDLYIELD.functionParameter.rate.name",
        detail: "formula.functionList.ODDLYIELD.functionParameter.rate.detail",
        example: "3.75%",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ODDLYIELD.functionParameter.pr.name",
        detail: "formula.functionList.ODDLYIELD.functionParameter.pr.detail",
        example: "99.875",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ODDLYIELD.functionParameter.redemption.name",
        detail: "formula.functionList.ODDLYIELD.functionParameter.redemption.detail",
        example: "100",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ODDLYIELD.functionParameter.frequency.name",
        detail: "formula.functionList.ODDLYIELD.functionParameter.frequency.detail",
        example: "2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ODDLYIELD.functionParameter.basis.name",
        detail: "formula.functionList.ODDLYIELD.functionParameter.basis.detail",
        example: "0",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "PDURATION" /* PDURATION */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.PDURATION.description",
    abstract: "formula.functionList.PDURATION.abstract",
    functionParameter: [
      {
        name: "formula.functionList.PDURATION.functionParameter.rate.name",
        detail: "formula.functionList.PDURATION.functionParameter.rate.detail",
        example: "2.5%",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PDURATION.functionParameter.pv.name",
        detail: "formula.functionList.PDURATION.functionParameter.pv.detail",
        example: "2000",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PDURATION.functionParameter.fv.name",
        detail: "formula.functionList.PDURATION.functionParameter.fv.detail",
        example: "2200",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "PMT" /* PMT */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.PMT.description",
    abstract: "formula.functionList.PMT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.PMT.functionParameter.rate.name",
        detail: "formula.functionList.PMT.functionParameter.rate.detail",
        example: "8%/12",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PMT.functionParameter.nper.name",
        detail: "formula.functionList.PMT.functionParameter.nper.detail",
        example: "10",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PMT.functionParameter.pv.name",
        detail: "formula.functionList.PMT.functionParameter.pv.detail",
        example: "10000",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PMT.functionParameter.fv.name",
        detail: "formula.functionList.PMT.functionParameter.fv.detail",
        example: "0",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.PMT.functionParameter.type.name",
        detail: "formula.functionList.PMT.functionParameter.type.detail",
        example: "0",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "PPMT" /* PPMT */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.PPMT.description",
    abstract: "formula.functionList.PPMT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.PPMT.functionParameter.rate.name",
        detail: "formula.functionList.PPMT.functionParameter.rate.detail",
        example: "10%/12",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PPMT.functionParameter.per.name",
        detail: "formula.functionList.PPMT.functionParameter.per.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PPMT.functionParameter.nper.name",
        detail: "formula.functionList.PPMT.functionParameter.nper.detail",
        example: "3*12",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PPMT.functionParameter.pv.name",
        detail: "formula.functionList.PPMT.functionParameter.pv.detail",
        example: "80000",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PPMT.functionParameter.fv.name",
        detail: "formula.functionList.PPMT.functionParameter.fv.detail",
        example: "0",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.PPMT.functionParameter.type.name",
        detail: "formula.functionList.PPMT.functionParameter.type.detail",
        example: "0",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "PRICE" /* PRICE */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.PRICE.description",
    abstract: "formula.functionList.PRICE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.PRICE.functionParameter.settlement.name",
        detail: "formula.functionList.PRICE.functionParameter.settlement.detail",
        example: '"2008-11-11"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PRICE.functionParameter.maturity.name",
        detail: "formula.functionList.PRICE.functionParameter.maturity.detail",
        example: '"2021-3-1"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PRICE.functionParameter.rate.name",
        detail: "formula.functionList.PRICE.functionParameter.rate.detail",
        example: "7.85%",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PRICE.functionParameter.yld.name",
        detail: "formula.functionList.PRICE.functionParameter.yld.detail",
        example: "6.25%",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PRICE.functionParameter.redemption.name",
        detail: "formula.functionList.PRICE.functionParameter.redemption.detail",
        example: "100",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PRICE.functionParameter.frequency.name",
        detail: "formula.functionList.PRICE.functionParameter.frequency.detail",
        example: "2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PRICE.functionParameter.basis.name",
        detail: "formula.functionList.PRICE.functionParameter.basis.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "PRICEDISC" /* PRICEDISC */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.PRICEDISC.description",
    abstract: "formula.functionList.PRICEDISC.abstract",
    functionParameter: [
      {
        name: "formula.functionList.PRICEDISC.functionParameter.settlement.name",
        detail: "formula.functionList.PRICEDISC.functionParameter.settlement.detail",
        example: '"2008-11-11"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PRICEDISC.functionParameter.maturity.name",
        detail: "formula.functionList.PRICEDISC.functionParameter.maturity.detail",
        example: '"2021-3-1"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PRICEDISC.functionParameter.discount.name",
        detail: "formula.functionList.PRICEDISC.functionParameter.discount.detail",
        example: "6.25%",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PRICEDISC.functionParameter.redemption.name",
        detail: "formula.functionList.PRICEDISC.functionParameter.redemption.detail",
        example: "100",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PRICEDISC.functionParameter.basis.name",
        detail: "formula.functionList.PRICEDISC.functionParameter.basis.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "PRICEMAT" /* PRICEMAT */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.PRICEMAT.description",
    abstract: "formula.functionList.PRICEMAT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.PRICEMAT.functionParameter.settlement.name",
        detail: "formula.functionList.PRICEMAT.functionParameter.settlement.detail",
        example: '"2008-11-11"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PRICEMAT.functionParameter.maturity.name",
        detail: "formula.functionList.PRICEMAT.functionParameter.maturity.detail",
        example: '"2021-3-1"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PRICEMAT.functionParameter.issue.name",
        detail: "formula.functionList.PRICEMAT.functionParameter.issue.detail",
        example: '"2008-10-15"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PRICEMAT.functionParameter.rate.name",
        detail: "formula.functionList.PRICEMAT.functionParameter.rate.detail",
        example: "7.85%",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PRICEMAT.functionParameter.yld.name",
        detail: "formula.functionList.PRICEMAT.functionParameter.yld.detail",
        example: "6.25%",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PRICEMAT.functionParameter.basis.name",
        detail: "formula.functionList.PRICEMAT.functionParameter.basis.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "PV" /* PV */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.PV.description",
    abstract: "formula.functionList.PV.abstract",
    functionParameter: [
      {
        name: "formula.functionList.PV.functionParameter.rate.name",
        detail: "formula.functionList.PV.functionParameter.rate.detail",
        example: "2%",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PV.functionParameter.nper.name",
        detail: "formula.functionList.PV.functionParameter.nper.detail",
        example: "12",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PV.functionParameter.pmt.name",
        detail: "formula.functionList.PV.functionParameter.pmt.detail",
        example: "100",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PV.functionParameter.fv.name",
        detail: "formula.functionList.PV.functionParameter.fv.detail",
        example: "0",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.PV.functionParameter.type.name",
        detail: "formula.functionList.PV.functionParameter.type.detail",
        example: "0",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "RATE" /* RATE */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.RATE.description",
    abstract: "formula.functionList.RATE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.RATE.functionParameter.nper.name",
        detail: "formula.functionList.RATE.functionParameter.nper.detail",
        example: "4*12",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.RATE.functionParameter.pmt.name",
        detail: "formula.functionList.RATE.functionParameter.pmt.detail",
        example: "-200",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.RATE.functionParameter.pv.name",
        detail: "formula.functionList.RATE.functionParameter.pv.detail",
        example: "8000",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.RATE.functionParameter.fv.name",
        detail: "formula.functionList.RATE.functionParameter.fv.detail",
        example: "0",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.RATE.functionParameter.type.name",
        detail: "formula.functionList.RATE.functionParameter.type.detail",
        example: "0",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.RATE.functionParameter.guess.name",
        detail: "formula.functionList.RATE.functionParameter.guess.detail",
        example: "0.1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "RECEIVED" /* RECEIVED */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.RECEIVED.description",
    abstract: "formula.functionList.RECEIVED.abstract",
    functionParameter: [
      {
        name: "formula.functionList.RECEIVED.functionParameter.settlement.name",
        detail: "formula.functionList.RECEIVED.functionParameter.settlement.detail",
        example: '"2008-2-15"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.RECEIVED.functionParameter.maturity.name",
        detail: "formula.functionList.RECEIVED.functionParameter.maturity.detail",
        example: '"2008-3-15"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.RECEIVED.functionParameter.investment.name",
        detail: "formula.functionList.RECEIVED.functionParameter.investment.detail",
        example: "10000000",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.RECEIVED.functionParameter.discount.name",
        detail: "formula.functionList.RECEIVED.functionParameter.discount.detail",
        example: "5.75%",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.RECEIVED.functionParameter.basis.name",
        detail: "formula.functionList.RECEIVED.functionParameter.basis.detail",
        example: "2",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "RRI" /* RRI */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.RRI.description",
    abstract: "formula.functionList.RRI.abstract",
    functionParameter: [
      {
        name: "formula.functionList.RRI.functionParameter.nper.name",
        detail: "formula.functionList.RRI.functionParameter.nper.detail",
        example: "96",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.RRI.functionParameter.pv.name",
        detail: "formula.functionList.RRI.functionParameter.pv.detail",
        example: "10000",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.RRI.functionParameter.fv.name",
        detail: "formula.functionList.RRI.functionParameter.fv.detail",
        example: "11000",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "SLN" /* SLN */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.SLN.description",
    abstract: "formula.functionList.SLN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.SLN.functionParameter.cost.name",
        detail: "formula.functionList.SLN.functionParameter.cost.detail",
        example: "300000",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SLN.functionParameter.salvage.name",
        detail: "formula.functionList.SLN.functionParameter.salvage.detail",
        example: "75000",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SLN.functionParameter.life.name",
        detail: "formula.functionList.SLN.functionParameter.life.detail",
        example: "10",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "SYD" /* SYD */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.SYD.description",
    abstract: "formula.functionList.SYD.abstract",
    functionParameter: [
      {
        name: "formula.functionList.SYD.functionParameter.cost.name",
        detail: "formula.functionList.SYD.functionParameter.cost.detail",
        example: "300000",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SYD.functionParameter.salvage.name",
        detail: "formula.functionList.SYD.functionParameter.salvage.detail",
        example: "75000",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SYD.functionParameter.life.name",
        detail: "formula.functionList.SYD.functionParameter.life.detail",
        example: "10",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SYD.functionParameter.per.name",
        detail: "formula.functionList.SYD.functionParameter.per.detail",
        example: "10",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "TBILLEQ" /* TBILLEQ */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.TBILLEQ.description",
    abstract: "formula.functionList.TBILLEQ.abstract",
    functionParameter: [
      {
        name: "formula.functionList.TBILLEQ.functionParameter.settlement.name",
        detail: "formula.functionList.TBILLEQ.functionParameter.settlement.detail",
        example: '"2008-3-31"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.TBILLEQ.functionParameter.maturity.name",
        detail: "formula.functionList.TBILLEQ.functionParameter.maturity.detail",
        example: '"2008-6-1"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.TBILLEQ.functionParameter.discount.name",
        detail: "formula.functionList.TBILLEQ.functionParameter.discount.detail",
        example: "9.14%",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "TBILLPRICE" /* TBILLPRICE */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.TBILLPRICE.description",
    abstract: "formula.functionList.TBILLPRICE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.TBILLPRICE.functionParameter.settlement.name",
        detail: "formula.functionList.TBILLPRICE.functionParameter.settlement.detail",
        example: '"2008-3-31"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.TBILLPRICE.functionParameter.maturity.name",
        detail: "formula.functionList.TBILLPRICE.functionParameter.maturity.detail",
        example: '"2008-6-1"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.TBILLPRICE.functionParameter.discount.name",
        detail: "formula.functionList.TBILLPRICE.functionParameter.discount.detail",
        example: "9.14%",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "TBILLYIELD" /* TBILLYIELD */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.TBILLYIELD.description",
    abstract: "formula.functionList.TBILLYIELD.abstract",
    functionParameter: [
      {
        name: "formula.functionList.TBILLYIELD.functionParameter.settlement.name",
        detail: "formula.functionList.TBILLYIELD.functionParameter.settlement.detail",
        example: '"2008-3-31"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.TBILLYIELD.functionParameter.maturity.name",
        detail: "formula.functionList.TBILLYIELD.functionParameter.maturity.detail",
        example: '"2008-6-1"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.TBILLYIELD.functionParameter.pr.name",
        detail: "formula.functionList.TBILLYIELD.functionParameter.pr.detail",
        example: "98.45",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "VDB" /* VDB */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.VDB.description",
    abstract: "formula.functionList.VDB.abstract",
    functionParameter: [
      {
        name: "formula.functionList.VDB.functionParameter.cost.name",
        detail: "formula.functionList.VDB.functionParameter.cost.detail",
        example: "2400",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.VDB.functionParameter.salvage.name",
        detail: "formula.functionList.VDB.functionParameter.salvage.detail",
        example: "300",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.VDB.functionParameter.life.name",
        detail: "formula.functionList.VDB.functionParameter.life.detail",
        example: "10",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.VDB.functionParameter.startPeriod.name",
        detail: "formula.functionList.VDB.functionParameter.startPeriod.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.VDB.functionParameter.endPeriod.name",
        detail: "formula.functionList.VDB.functionParameter.endPeriod.detail",
        example: "2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.VDB.functionParameter.factor.name",
        detail: "formula.functionList.VDB.functionParameter.factor.detail",
        example: "2",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.VDB.functionParameter.noSwitch.name",
        detail: "formula.functionList.VDB.functionParameter.noSwitch.detail",
        example: "false",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "XIRR" /* XIRR */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.XIRR.description",
    abstract: "formula.functionList.XIRR.abstract",
    functionParameter: [
      {
        name: "formula.functionList.XIRR.functionParameter.values.name",
        detail: "formula.functionList.XIRR.functionParameter.values.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.XIRR.functionParameter.dates.name",
        detail: "formula.functionList.XIRR.functionParameter.dates.detail",
        example: "B1:B4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.XIRR.functionParameter.guess.name",
        detail: "formula.functionList.XIRR.functionParameter.guess.detail",
        example: "0.1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "XNPV" /* XNPV */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.XNPV.description",
    abstract: "formula.functionList.XNPV.abstract",
    functionParameter: [
      {
        name: "formula.functionList.XNPV.functionParameter.rate.name",
        detail: "formula.functionList.XNPV.functionParameter.rate.detail",
        example: "10%",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.XNPV.functionParameter.values.name",
        detail: "formula.functionList.XNPV.functionParameter.values.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.XNPV.functionParameter.dates.name",
        detail: "formula.functionList.XNPV.functionParameter.dates.detail",
        example: "B1:B4",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "YIELD" /* YIELD */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.YIELD.description",
    abstract: "formula.functionList.YIELD.abstract",
    functionParameter: [
      {
        name: "formula.functionList.YIELD.functionParameter.settlement.name",
        detail: "formula.functionList.YIELD.functionParameter.settlement.detail",
        example: '"2008-11-11"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.YIELD.functionParameter.maturity.name",
        detail: "formula.functionList.YIELD.functionParameter.maturity.detail",
        example: '"2021-3-1"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.YIELD.functionParameter.rate.name",
        detail: "formula.functionList.YIELD.functionParameter.rate.detail",
        example: "7.85%",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.YIELD.functionParameter.pr.name",
        detail: "formula.functionList.YIELD.functionParameter.pr.detail",
        example: "98.45",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.YIELD.functionParameter.redemption.name",
        detail: "formula.functionList.YIELD.functionParameter.redemption.detail",
        example: "100",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.YIELD.functionParameter.frequency.name",
        detail: "formula.functionList.YIELD.functionParameter.frequency.detail",
        example: "2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.YIELD.functionParameter.basis.name",
        detail: "formula.functionList.YIELD.functionParameter.basis.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "YIELDDISC" /* YIELDDISC */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.YIELDDISC.description",
    abstract: "formula.functionList.YIELDDISC.abstract",
    functionParameter: [
      {
        name: "formula.functionList.YIELDDISC.functionParameter.settlement.name",
        detail: "formula.functionList.YIELDDISC.functionParameter.settlement.detail",
        example: '"2008-11-11"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.YIELDDISC.functionParameter.maturity.name",
        detail: "formula.functionList.YIELDDISC.functionParameter.maturity.detail",
        example: '"2021-3-1"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.YIELDDISC.functionParameter.pr.name",
        detail: "formula.functionList.YIELDDISC.functionParameter.pr.detail",
        example: "98.45",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.YIELDDISC.functionParameter.redemption.name",
        detail: "formula.functionList.YIELDDISC.functionParameter.redemption.detail",
        example: "100",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.YIELDDISC.functionParameter.basis.name",
        detail: "formula.functionList.YIELDDISC.functionParameter.basis.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "YIELDMAT" /* YIELDMAT */,
    functionType: 0 /* Financial */,
    description: "formula.functionList.YIELDMAT.description",
    abstract: "formula.functionList.YIELDMAT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.YIELDMAT.functionParameter.settlement.name",
        detail: "formula.functionList.YIELDMAT.functionParameter.settlement.detail",
        example: '"2008-11-11"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.YIELDMAT.functionParameter.maturity.name",
        detail: "formula.functionList.YIELDMAT.functionParameter.maturity.detail",
        example: '"2021-3-1"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.YIELDMAT.functionParameter.issue.name",
        detail: "formula.functionList.YIELDMAT.functionParameter.issue.detail",
        example: '"2008-10-15"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.YIELDMAT.functionParameter.rate.name",
        detail: "formula.functionList.YIELDMAT.functionParameter.rate.detail",
        example: "7.85%",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.YIELDMAT.functionParameter.pr.name",
        detail: "formula.functionList.YIELDMAT.functionParameter.pr.detail",
        example: "98.45",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.YIELDMAT.functionParameter.basis.name",
        detail: "formula.functionList.YIELDMAT.functionParameter.basis.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  }
];

// ../packages/sheets-formula/src/services/function-list/information.ts
var FUNCTION_LIST_INFORMATION = [
  {
    functionName: "CELL" /* CELL */,
    functionType: 8 /* Information */,
    description: "formula.functionList.CELL.description",
    abstract: "formula.functionList.CELL.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CELL.functionParameter.infoType.name",
        detail: "formula.functionList.CELL.functionParameter.infoType.detail",
        example: '"type"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CELL.functionParameter.reference.name",
        detail: "formula.functionList.CELL.functionParameter.reference.detail",
        example: "A1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ERROR.TYPE" /* ERROR_TYPE */,
    functionType: 8 /* Information */,
    description: "formula.functionList.ERROR_TYPE.description",
    abstract: "formula.functionList.ERROR_TYPE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ERROR_TYPE.functionParameter.errorVal.name",
        detail: "formula.functionList.ERROR_TYPE.functionParameter.errorVal.detail",
        example: '"#NULL!"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "INFO" /* INFO */,
    functionType: 8 /* Information */,
    description: "formula.functionList.INFO.description",
    abstract: "formula.functionList.INFO.abstract",
    functionParameter: [
      {
        name: "formula.functionList.INFO.functionParameter.number1.name",
        detail: "formula.functionList.INFO.functionParameter.number1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.INFO.functionParameter.number2.name",
        detail: "formula.functionList.INFO.functionParameter.number2.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ISBETWEEN" /* ISBETWEEN */,
    functionType: 8 /* Information */,
    description: "formula.functionList.ISBETWEEN.description",
    abstract: "formula.functionList.ISBETWEEN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ISBETWEEN.functionParameter.valueToCompare.name",
        detail: "formula.functionList.ISBETWEEN.functionParameter.valueToCompare.detail",
        example: "7.9",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ISBETWEEN.functionParameter.lowerValue.name",
        detail: "formula.functionList.ISBETWEEN.functionParameter.lowerValue.detail",
        example: "1.2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ISBETWEEN.functionParameter.upperValue.name",
        detail: "formula.functionList.ISBETWEEN.functionParameter.upperValue.detail",
        example: "12.45",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ISBETWEEN.functionParameter.lowerValueIsInclusive.name",
        detail: "formula.functionList.ISBETWEEN.functionParameter.lowerValueIsInclusive.detail",
        example: "true",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.ISBETWEEN.functionParameter.upperValueIsInclusive.name",
        detail: "formula.functionList.ISBETWEEN.functionParameter.upperValueIsInclusive.detail",
        example: "true",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ISBLANK" /* ISBLANK */,
    functionType: 8 /* Information */,
    description: "formula.functionList.ISBLANK.description",
    abstract: "formula.functionList.ISBLANK.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ISBLANK.functionParameter.value.name",
        detail: "formula.functionList.ISBLANK.functionParameter.value.detail",
        example: "A1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ISDATE" /* ISDATE */,
    functionType: 8 /* Information */,
    description: "formula.functionList.ISDATE.description",
    abstract: "formula.functionList.ISDATE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ISDATE.functionParameter.value.name",
        detail: "formula.functionList.ISDATE.functionParameter.value.detail",
        example: "A1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ISEMAIL" /* ISEMAIL */,
    functionType: 8 /* Information */,
    description: "formula.functionList.ISEMAIL.description",
    abstract: "formula.functionList.ISEMAIL.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ISEMAIL.functionParameter.value.name",
        detail: "formula.functionList.ISEMAIL.functionParameter.value.detail",
        example: '"developer@univer.ai"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ISERR" /* ISERR */,
    functionType: 8 /* Information */,
    description: "formula.functionList.ISERR.description",
    abstract: "formula.functionList.ISERR.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ISERR.functionParameter.value.name",
        detail: "formula.functionList.ISERR.functionParameter.value.detail",
        example: "A1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ISERROR" /* ISERROR */,
    functionType: 8 /* Information */,
    description: "formula.functionList.ISERROR.description",
    abstract: "formula.functionList.ISERROR.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ISERROR.functionParameter.value.name",
        detail: "formula.functionList.ISERROR.functionParameter.value.detail",
        example: "A1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ISEVEN" /* ISEVEN */,
    functionType: 8 /* Information */,
    description: "formula.functionList.ISEVEN.description",
    abstract: "formula.functionList.ISEVEN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ISEVEN.functionParameter.value.name",
        detail: "formula.functionList.ISEVEN.functionParameter.value.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ISFORMULA" /* ISFORMULA */,
    functionType: 8 /* Information */,
    description: "formula.functionList.ISFORMULA.description",
    abstract: "formula.functionList.ISFORMULA.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ISFORMULA.functionParameter.reference.name",
        detail: "formula.functionList.ISFORMULA.functionParameter.reference.detail",
        example: "A1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ISLOGICAL" /* ISLOGICAL */,
    functionType: 8 /* Information */,
    description: "formula.functionList.ISLOGICAL.description",
    abstract: "formula.functionList.ISLOGICAL.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ISLOGICAL.functionParameter.value.name",
        detail: "formula.functionList.ISLOGICAL.functionParameter.value.detail",
        example: "A1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ISNA" /* ISNA */,
    functionType: 8 /* Information */,
    description: "formula.functionList.ISNA.description",
    abstract: "formula.functionList.ISNA.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ISNA.functionParameter.value.name",
        detail: "formula.functionList.ISNA.functionParameter.value.detail",
        example: "A1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ISNONTEXT" /* ISNONTEXT */,
    functionType: 8 /* Information */,
    description: "formula.functionList.ISNONTEXT.description",
    abstract: "formula.functionList.ISNONTEXT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ISNONTEXT.functionParameter.value.name",
        detail: "formula.functionList.ISNONTEXT.functionParameter.value.detail",
        example: "A1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ISNUMBER" /* ISNUMBER */,
    functionType: 8 /* Information */,
    description: "formula.functionList.ISNUMBER.description",
    abstract: "formula.functionList.ISNUMBER.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ISNUMBER.functionParameter.value.name",
        detail: "formula.functionList.ISNUMBER.functionParameter.value.detail",
        example: "A1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ISODD" /* ISODD */,
    functionType: 8 /* Information */,
    description: "formula.functionList.ISODD.description",
    abstract: "formula.functionList.ISODD.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ISODD.functionParameter.value.name",
        detail: "formula.functionList.ISODD.functionParameter.value.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ISOMITTED" /* ISOMITTED */,
    functionType: 8 /* Information */,
    description: "formula.functionList.ISOMITTED.description",
    abstract: "formula.functionList.ISOMITTED.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ISOMITTED.functionParameter.number1.name",
        detail: "formula.functionList.ISOMITTED.functionParameter.number1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ISOMITTED.functionParameter.number2.name",
        detail: "formula.functionList.ISOMITTED.functionParameter.number2.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ISREF" /* ISREF */,
    functionType: 8 /* Information */,
    description: "formula.functionList.ISREF.description",
    abstract: "formula.functionList.ISREF.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ISREF.functionParameter.value.name",
        detail: "formula.functionList.ISREF.functionParameter.value.detail",
        example: "A1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ISTEXT" /* ISTEXT */,
    functionType: 8 /* Information */,
    description: "formula.functionList.ISTEXT.description",
    abstract: "formula.functionList.ISTEXT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ISTEXT.functionParameter.value.name",
        detail: "formula.functionList.ISTEXT.functionParameter.value.detail",
        example: "A1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ISURL" /* ISURL */,
    functionType: 8 /* Information */,
    description: "formula.functionList.ISURL.description",
    abstract: "formula.functionList.ISURL.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ISURL.functionParameter.value.name",
        detail: "formula.functionList.ISURL.functionParameter.value.detail",
        example: '"univer.ai"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "N" /* N */,
    functionType: 8 /* Information */,
    description: "formula.functionList.N.description",
    abstract: "formula.functionList.N.abstract",
    functionParameter: [
      {
        name: "formula.functionList.N.functionParameter.value.name",
        detail: "formula.functionList.N.functionParameter.value.detail",
        example: "7",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "NA" /* NA */,
    functionType: 8 /* Information */,
    description: "formula.functionList.NA.description",
    abstract: "formula.functionList.NA.abstract",
    functionParameter: []
  },
  {
    functionName: "SHEET" /* SHEET */,
    functionType: 8 /* Information */,
    description: "formula.functionList.SHEET.description",
    abstract: "formula.functionList.SHEET.abstract",
    functionParameter: [
      {
        name: "formula.functionList.SHEET.functionParameter.value.name",
        detail: "formula.functionList.SHEET.functionParameter.value.detail",
        example: "A1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "SHEETS" /* SHEETS */,
    functionType: 8 /* Information */,
    description: "formula.functionList.SHEETS.description",
    abstract: "formula.functionList.SHEETS.abstract",
    functionParameter: []
  },
  {
    functionName: "TYPE" /* TYPE */,
    functionType: 8 /* Information */,
    description: "formula.functionList.TYPE.description",
    abstract: "formula.functionList.TYPE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.TYPE.functionParameter.value.name",
        detail: "formula.functionList.TYPE.functionParameter.value.detail",
        example: "A2",
        require: 1,
        repeat: 0
      }
    ]
  }
];

// ../packages/sheets-formula/src/services/function-list/logical.ts
var FUNCTION_LIST_LOGICAL = [
  {
    functionName: "AND" /* AND */,
    functionType: 7 /* Logical */,
    description: "formula.functionList.AND.description",
    abstract: "formula.functionList.AND.abstract",
    functionParameter: [
      {
        name: "formula.functionList.AND.functionParameter.logical1.name",
        detail: "formula.functionList.AND.functionParameter.logical1.detail",
        example: "A1=1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.AND.functionParameter.logical2.name",
        detail: "formula.functionList.AND.functionParameter.logical2.detail",
        example: "A2=2",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "BYCOL" /* BYCOL */,
    functionType: 7 /* Logical */,
    description: "formula.functionList.BYCOL.description",
    abstract: "formula.functionList.BYCOL.abstract",
    functionParameter: [
      {
        name: "formula.functionList.BYCOL.functionParameter.array.name",
        detail: "formula.functionList.BYCOL.functionParameter.array.detail",
        example: "A1:C2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BYCOL.functionParameter.lambda.name",
        detail: "formula.functionList.BYCOL.functionParameter.lambda.detail",
        example: "LAMBDA(array, MAX(array))",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "BYROW" /* BYROW */,
    functionType: 7 /* Logical */,
    description: "formula.functionList.BYROW.description",
    abstract: "formula.functionList.BYROW.abstract",
    functionParameter: [
      {
        name: "formula.functionList.BYROW.functionParameter.array.name",
        detail: "formula.functionList.BYROW.functionParameter.array.detail",
        example: "A1:C2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BYROW.functionParameter.lambda.name",
        detail: "formula.functionList.BYROW.functionParameter.lambda.detail",
        example: "LAMBDA(array, MAX(array))",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "FALSE" /* FALSE */,
    functionType: 7 /* Logical */,
    description: "formula.functionList.FALSE.description",
    abstract: "formula.functionList.FALSE.abstract",
    functionParameter: []
  },
  {
    functionName: "IF" /* IF */,
    functionType: 7 /* Logical */,
    description: "formula.functionList.IF.description",
    abstract: "formula.functionList.IF.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IF.functionParameter.logicalTest.name",
        detail: "formula.functionList.IF.functionParameter.logicalTest.detail",
        example: 'A2 = "foo"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.IF.functionParameter.valueIfTrue.name",
        detail: "formula.functionList.IF.functionParameter.valueIfTrue.detail",
        example: '"A2 is foo"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.IF.functionParameter.valueIfFalse.name",
        detail: "formula.functionList.IF.functionParameter.valueIfFalse.detail",
        example: '"A2 is not foo"',
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "IFERROR" /* IFERROR */,
    functionType: 7 /* Logical */,
    description: "formula.functionList.IFERROR.description",
    abstract: "formula.functionList.IFERROR.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IFERROR.functionParameter.value.name",
        detail: "formula.functionList.IFERROR.functionParameter.value.detail",
        example: "A2/B2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.IFERROR.functionParameter.valueIfError.name",
        detail: "formula.functionList.IFERROR.functionParameter.valueIfError.detail",
        example: '"Error in calculation"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "IFNA" /* IFNA */,
    functionType: 7 /* Logical */,
    description: "formula.functionList.IFNA.description",
    abstract: "formula.functionList.IFNA.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IFNA.functionParameter.value.name",
        detail: "formula.functionList.IFNA.functionParameter.value.detail",
        example: "VLOOKUP(C3,C6:D11,2,FALSE)",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.IFNA.functionParameter.valueIfNa.name",
        detail: "formula.functionList.IFNA.functionParameter.valueIfNa.detail",
        example: '"Not Found"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "IFS" /* IFS */,
    functionType: 7 /* Logical */,
    description: "formula.functionList.IFS.description",
    abstract: "formula.functionList.IFS.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IFS.functionParameter.logicalTest1.name",
        detail: "formula.functionList.IFS.functionParameter.logicalTest1.detail",
        example: 'A2 = "foo"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.IFS.functionParameter.valueIfTrue1.name",
        detail: "formula.functionList.IFS.functionParameter.valueIfTrue1.detail",
        example: '"A2 is foo"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.IFS.functionParameter.logicalTest2.name",
        detail: "formula.functionList.IFS.functionParameter.logicalTest2.detail",
        example: "F2=1",
        require: 0,
        repeat: 1
      },
      {
        name: "formula.functionList.IFS.functionParameter.valueIfTrue2.name",
        detail: "formula.functionList.IFS.functionParameter.valueIfTrue2.detail",
        example: "D2",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "LAMBDA" /* LAMBDA */,
    functionType: 7 /* Logical */,
    description: "formula.functionList.LAMBDA.description",
    abstract: "formula.functionList.LAMBDA.abstract",
    functionParameter: [
      {
        name: "formula.functionList.LAMBDA.functionParameter.parameter.name",
        detail: "formula.functionList.LAMBDA.functionParameter.parameter.detail",
        example: "[x, y, \u2026,]",
        require: 0,
        repeat: 1
      },
      {
        name: "formula.functionList.LAMBDA.functionParameter.calculation.name",
        detail: "formula.functionList.LAMBDA.functionParameter.calculation.detail",
        example: "x+y",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "LET" /* LET */,
    functionType: 7 /* Logical */,
    description: "formula.functionList.LET.description",
    abstract: "formula.functionList.LET.abstract",
    functionParameter: [
      {
        name: "formula.functionList.LET.functionParameter.name1.name",
        detail: "formula.functionList.LET.functionParameter.name1.detail",
        example: "x",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.LET.functionParameter.nameValue1.name",
        detail: "formula.functionList.LET.functionParameter.nameValue1.detail",
        example: "5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.LET.functionParameter.calculationOrName2.name",
        detail: "formula.functionList.LET.functionParameter.calculationOrName2.detail",
        example: "y",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.LET.functionParameter.nameValue2.name",
        detail: "formula.functionList.LET.functionParameter.nameValue2.detail",
        example: "6",
        require: 0,
        repeat: 1
      },
      {
        name: "formula.functionList.LET.functionParameter.calculationOrName3.name",
        detail: "formula.functionList.LET.functionParameter.calculationOrName3.detail",
        example: "SUM(x,y)",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "MAKEARRAY" /* MAKEARRAY */,
    aliasFunctionName: "formula.functionList.MAKEARRAY.aliasFunctionName",
    functionType: 7 /* Logical */,
    description: "formula.functionList.MAKEARRAY.description",
    abstract: "formula.functionList.MAKEARRAY.abstract",
    functionParameter: [
      {
        name: "formula.functionList.MAKEARRAY.functionParameter.number1.name",
        detail: "formula.functionList.MAKEARRAY.functionParameter.number1.detail",
        example: "8",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MAKEARRAY.functionParameter.number2.name",
        detail: "formula.functionList.MAKEARRAY.functionParameter.number2.detail",
        example: "7",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MAKEARRAY.functionParameter.value3.name",
        detail: "formula.functionList.MAKEARRAY.functionParameter.value3.detail",
        example: "LAMBDA(r,c, r*c)",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "MAP" /* MAP */,
    functionType: 7 /* Logical */,
    description: "formula.functionList.MAP.description",
    abstract: "formula.functionList.MAP.abstract",
    functionParameter: [
      {
        name: "formula.functionList.MAP.functionParameter.array1.name",
        detail: "formula.functionList.MAP.functionParameter.array1.detail",
        example: "D2:D11",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MAP.functionParameter.array2.name",
        detail: "formula.functionList.MAP.functionParameter.array2.detail",
        example: "E2:E11",
        require: 0,
        repeat: 1
      },
      {
        name: "formula.functionList.MAP.functionParameter.lambda.name",
        detail: "formula.functionList.MAP.functionParameter.lambda.detail",
        example: 'LAMBDA(s,c,AND(s="Large",c="Red"))',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "NOT" /* NOT */,
    functionType: 7 /* Logical */,
    description: "formula.functionList.NOT.description",
    abstract: "formula.functionList.NOT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.NOT.functionParameter.logical.name",
        detail: "formula.functionList.NOT.functionParameter.logical.detail",
        example: "A2>100",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "OR" /* OR */,
    functionType: 7 /* Logical */,
    description: "formula.functionList.OR.description",
    abstract: "formula.functionList.OR.abstract",
    functionParameter: [
      {
        name: "formula.functionList.OR.functionParameter.logical1.name",
        detail: "formula.functionList.OR.functionParameter.logical1.detail",
        example: "A1=1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.OR.functionParameter.logical2.name",
        detail: "formula.functionList.OR.functionParameter.logical2.detail",
        example: "A2=2",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "REDUCE" /* REDUCE */,
    functionType: 7 /* Logical */,
    description: "formula.functionList.REDUCE.description",
    abstract: "formula.functionList.REDUCE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.REDUCE.functionParameter.initialValue.name",
        detail: "formula.functionList.REDUCE.functionParameter.initialValue.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.REDUCE.functionParameter.array.name",
        detail: "formula.functionList.REDUCE.functionParameter.array.detail",
        example: "A1:C2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.REDUCE.functionParameter.lambda.name",
        detail: "formula.functionList.REDUCE.functionParameter.lambda.detail",
        example: "LAMBDA(a,b,a+b^2)",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "SCAN" /* SCAN */,
    functionType: 7 /* Logical */,
    description: "formula.functionList.SCAN.description",
    abstract: "formula.functionList.SCAN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.SCAN.functionParameter.initialValue.name",
        detail: "formula.functionList.SCAN.functionParameter.initialValue.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SCAN.functionParameter.array.name",
        detail: "formula.functionList.SCAN.functionParameter.array.detail",
        example: "A1:C2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SCAN.functionParameter.lambda.name",
        detail: "formula.functionList.SCAN.functionParameter.lambda.detail",
        example: "LAMBDA(a,b,a+b^2)",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "SWITCH" /* SWITCH */,
    functionType: 7 /* Logical */,
    description: "formula.functionList.SWITCH.description",
    abstract: "formula.functionList.SWITCH.abstract",
    functionParameter: [
      {
        name: "formula.functionList.SWITCH.functionParameter.expression.name",
        detail: "formula.functionList.SWITCH.functionParameter.expression.detail",
        example: "WEEKDAY(A2)",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SWITCH.functionParameter.value1.name",
        detail: "formula.functionList.SWITCH.functionParameter.value1.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SWITCH.functionParameter.result1.name",
        detail: "formula.functionList.SWITCH.functionParameter.result1.detail",
        example: '"Sunday"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SWITCH.functionParameter.defaultOrValue2.name",
        detail: "formula.functionList.SWITCH.functionParameter.defaultOrValue2.detail",
        example: "2",
        require: 0,
        repeat: 1
      },
      {
        name: "formula.functionList.SWITCH.functionParameter.result2.name",
        detail: "formula.functionList.SWITCH.functionParameter.result2.detail",
        example: '"Monday"',
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "TRUE" /* TRUE */,
    functionType: 7 /* Logical */,
    description: "formula.functionList.TRUE.description",
    abstract: "formula.functionList.TRUE.abstract",
    functionParameter: []
  },
  {
    functionName: "XOR" /* XOR */,
    functionType: 7 /* Logical */,
    description: "formula.functionList.XOR.description",
    abstract: "formula.functionList.XOR.abstract",
    functionParameter: [
      {
        name: "formula.functionList.XOR.functionParameter.logical1.name",
        detail: "formula.functionList.XOR.functionParameter.logical1.detail",
        example: "3>0",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.XOR.functionParameter.logical2.name",
        detail: "formula.functionList.XOR.functionParameter.logical2.detail",
        example: "2<9",
        require: 0,
        repeat: 1
      }
    ]
  }
];

// ../packages/sheets-formula/src/services/function-list/lookup.ts
var FUNCTION_LIST_LOOKUP = [
  {
    functionName: "ADDRESS" /* ADDRESS */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.ADDRESS.description",
    abstract: "formula.functionList.ADDRESS.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ADDRESS.functionParameter.row_num.name",
        detail: "formula.functionList.ADDRESS.functionParameter.row_num.detail",
        example: "2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ADDRESS.functionParameter.column_num.name",
        detail: "formula.functionList.ADDRESS.functionParameter.column_num.detail",
        example: "2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ADDRESS.functionParameter.abs_num.name",
        detail: "formula.functionList.ADDRESS.functionParameter.abs_num.detail",
        example: "1",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.ADDRESS.functionParameter.a1.name",
        detail: "formula.functionList.ADDRESS.functionParameter.a1.detail",
        example: "TRUE",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.ADDRESS.functionParameter.sheet_text.name",
        detail: "formula.functionList.ADDRESS.functionParameter.sheet_text.detail",
        example: '"Sheet2"',
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "AREAS" /* AREAS */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.AREAS.description",
    abstract: "formula.functionList.AREAS.abstract",
    functionParameter: [
      {
        name: "formula.functionList.AREAS.functionParameter.reference.name",
        detail: "formula.functionList.AREAS.functionParameter.reference.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "CHOOSE" /* CHOOSE */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.CHOOSE.description",
    abstract: "formula.functionList.CHOOSE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CHOOSE.functionParameter.indexNum.name",
        detail: "formula.functionList.CHOOSE.functionParameter.indexNum.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CHOOSE.functionParameter.value1.name",
        detail: "formula.functionList.CHOOSE.functionParameter.value1.detail",
        example: '"Hello"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CHOOSE.functionParameter.value2.name",
        detail: "formula.functionList.CHOOSE.functionParameter.value2.detail",
        example: '"Univer"',
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "CHOOSECOLS" /* CHOOSECOLS */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.CHOOSECOLS.description",
    abstract: "formula.functionList.CHOOSECOLS.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CHOOSECOLS.functionParameter.array.name",
        detail: "formula.functionList.CHOOSECOLS.functionParameter.array.detail",
        example: "A1:C2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CHOOSECOLS.functionParameter.colNum1.name",
        detail: "formula.functionList.CHOOSECOLS.functionParameter.colNum1.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CHOOSECOLS.functionParameter.colNum2.name",
        detail: "formula.functionList.CHOOSECOLS.functionParameter.colNum2.detail",
        example: "2",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "CHOOSEROWS" /* CHOOSEROWS */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.CHOOSEROWS.description",
    abstract: "formula.functionList.CHOOSEROWS.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CHOOSEROWS.functionParameter.array.name",
        detail: "formula.functionList.CHOOSEROWS.functionParameter.array.detail",
        example: "A1:C2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CHOOSEROWS.functionParameter.rowNum1.name",
        detail: "formula.functionList.CHOOSEROWS.functionParameter.rowNum1.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CHOOSEROWS.functionParameter.rowNum2.name",
        detail: "formula.functionList.CHOOSEROWS.functionParameter.rowNum2.detail",
        example: "2",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "COLUMN" /* COLUMN */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.COLUMN.description",
    abstract: "formula.functionList.COLUMN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.COLUMN.functionParameter.reference.name",
        detail: "formula.functionList.COLUMN.functionParameter.reference.detail",
        example: "A1:A20",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "COLUMNS" /* COLUMNS */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.COLUMNS.description",
    abstract: "formula.functionList.COLUMNS.abstract",
    functionParameter: [
      {
        name: "formula.functionList.COLUMNS.functionParameter.array.name",
        detail: "formula.functionList.COLUMNS.functionParameter.array.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "DROP" /* DROP */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.DROP.description",
    abstract: "formula.functionList.DROP.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DROP.functionParameter.array.name",
        detail: "formula.functionList.DROP.functionParameter.array.detail",
        example: "A2:C4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DROP.functionParameter.rows.name",
        detail: "formula.functionList.DROP.functionParameter.rows.detail",
        example: "2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DROP.functionParameter.columns.name",
        detail: "formula.functionList.DROP.functionParameter.columns.detail",
        example: "2",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "EXPAND" /* EXPAND */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.EXPAND.description",
    abstract: "formula.functionList.EXPAND.abstract",
    functionParameter: [
      {
        name: "formula.functionList.EXPAND.functionParameter.array.name",
        detail: "formula.functionList.EXPAND.functionParameter.array.detail",
        example: "A2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.EXPAND.functionParameter.rows.name",
        detail: "formula.functionList.EXPAND.functionParameter.rows.detail",
        example: "3",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.EXPAND.functionParameter.columns.name",
        detail: "formula.functionList.EXPAND.functionParameter.columns.detail",
        example: "3",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.EXPAND.functionParameter.padWith.name",
        detail: "formula.functionList.EXPAND.functionParameter.padWith.detail",
        example: '"-"',
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "FILTER" /* FILTER */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.FILTER.description",
    abstract: "formula.functionList.FILTER.abstract",
    functionParameter: [
      {
        name: "formula.functionList.FILTER.functionParameter.array.name",
        detail: "formula.functionList.FILTER.functionParameter.array.detail",
        example: "A5:D20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.FILTER.functionParameter.include.name",
        detail: "formula.functionList.FILTER.functionParameter.include.detail",
        example: '(C5:C20="Apple")*(A5:A20="East")',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.FILTER.functionParameter.ifEmpty.name",
        detail: "formula.functionList.FILTER.functionParameter.ifEmpty.detail",
        example: '""',
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "FORMULATEXT" /* FORMULATEXT */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.FORMULATEXT.description",
    abstract: "formula.functionList.FORMULATEXT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.FORMULATEXT.functionParameter.reference.name",
        detail: "formula.functionList.FORMULATEXT.functionParameter.reference.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "GETPIVOTDATA" /* GETPIVOTDATA */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.GETPIVOTDATA.description",
    abstract: "formula.functionList.GETPIVOTDATA.abstract",
    functionParameter: [
      {
        name: "formula.functionList.GETPIVOTDATA.functionParameter.number1.name",
        detail: "formula.functionList.GETPIVOTDATA.functionParameter.number1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.GETPIVOTDATA.functionParameter.number2.name",
        detail: "formula.functionList.GETPIVOTDATA.functionParameter.number2.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "HLOOKUP" /* HLOOKUP */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.HLOOKUP.description",
    abstract: "formula.functionList.HLOOKUP.abstract",
    functionParameter: [
      {
        name: "formula.functionList.HLOOKUP.functionParameter.lookupValue.name",
        detail: "formula.functionList.HLOOKUP.functionParameter.lookupValue.detail",
        example: "A1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.HLOOKUP.functionParameter.tableArray.name",
        detail: "formula.functionList.HLOOKUP.functionParameter.tableArray.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.HLOOKUP.functionParameter.rowIndexNum.name",
        detail: "formula.functionList.HLOOKUP.functionParameter.rowIndexNum.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.HLOOKUP.functionParameter.rangeLookup.name",
        detail: "formula.functionList.HLOOKUP.functionParameter.rangeLookup.detail",
        example: "false",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "HSTACK" /* HSTACK */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.HSTACK.description",
    abstract: "formula.functionList.HSTACK.abstract",
    functionParameter: [
      {
        name: "formula.functionList.HSTACK.functionParameter.array1.name",
        detail: "formula.functionList.HSTACK.functionParameter.array1.detail",
        example: "A2:C3",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.HSTACK.functionParameter.array2.name",
        detail: "formula.functionList.HSTACK.functionParameter.array2.detail",
        example: "E2:G3",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "HYPERLINK" /* HYPERLINK */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.HYPERLINK.description",
    abstract: "formula.functionList.HYPERLINK.abstract",
    functionParameter: [
      {
        name: "formula.functionList.HYPERLINK.functionParameter.url.name",
        detail: "formula.functionList.HYPERLINK.functionParameter.url.detail",
        example: '"https://univer.ai/"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.HYPERLINK.functionParameter.linkLabel.name",
        detail: "formula.functionList.HYPERLINK.functionParameter.linkLabel.detail",
        example: '"Univer"',
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "IMAGE" /* IMAGE */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.IMAGE.description",
    abstract: "formula.functionList.IMAGE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.IMAGE.functionParameter.source.name",
        detail: "formula.functionList.IMAGE.functionParameter.source.detail",
        example: '"https://github.com/dream-num.png"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.IMAGE.functionParameter.altText.name",
        detail: "formula.functionList.IMAGE.functionParameter.altText.detail",
        example: '"Univer Logo"',
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.IMAGE.functionParameter.sizing.name",
        detail: "formula.functionList.IMAGE.functionParameter.sizing.detail",
        example: "3",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.IMAGE.functionParameter.height.name",
        detail: "formula.functionList.IMAGE.functionParameter.height.detail",
        example: "100",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.IMAGE.functionParameter.width.name",
        detail: "formula.functionList.IMAGE.functionParameter.width.detail",
        example: "100",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "INDEX" /* INDEX */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.INDEX.description",
    abstract: "formula.functionList.INDEX.abstract",
    functionParameter: [
      {
        name: "formula.functionList.INDEX.functionParameter.reference.name",
        detail: "formula.functionList.INDEX.functionParameter.reference.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.INDEX.functionParameter.rowNum.name",
        detail: "formula.functionList.INDEX.functionParameter.rowNum.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.INDEX.functionParameter.columnNum.name",
        detail: "formula.functionList.INDEX.functionParameter.columnNum.detail",
        example: "1",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.INDEX.functionParameter.areaNum.name",
        detail: "formula.functionList.INDEX.functionParameter.areaNum.detail",
        example: "2",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "INDIRECT" /* INDIRECT */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.INDIRECT.description",
    abstract: "formula.functionList.INDIRECT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.INDIRECT.functionParameter.refText.name",
        detail: "formula.functionList.INDIRECT.functionParameter.refText.detail",
        example: '"A1"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.INDIRECT.functionParameter.a1.name",
        detail: "formula.functionList.INDIRECT.functionParameter.a1.detail",
        example: "TRUE",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "LOOKUP" /* LOOKUP */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.LOOKUP.description",
    abstract: "formula.functionList.LOOKUP.abstract",
    functionParameter: [
      {
        name: "formula.functionList.LOOKUP.functionParameter.lookupValue.name",
        detail: "formula.functionList.LOOKUP.functionParameter.lookupValue.detail",
        example: "A1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.LOOKUP.functionParameter.lookupVectorOrArray.name",
        detail: "formula.functionList.LOOKUP.functionParameter.lookupVectorOrArray.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.LOOKUP.functionParameter.resultVector.name",
        detail: "formula.functionList.LOOKUP.functionParameter.resultVector.detail",
        example: "A1:A20",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "MATCH" /* MATCH */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.MATCH.description",
    abstract: "formula.functionList.MATCH.abstract",
    functionParameter: [
      {
        name: "formula.functionList.MATCH.functionParameter.lookupValue.name",
        detail: "formula.functionList.MATCH.functionParameter.lookupValue.detail",
        example: "10",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MATCH.functionParameter.lookupArray.name",
        detail: "formula.functionList.MATCH.functionParameter.lookupArray.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MATCH.functionParameter.matchType.name",
        detail: "formula.functionList.MATCH.functionParameter.matchType.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "OFFSET" /* OFFSET */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.OFFSET.description",
    abstract: "formula.functionList.OFFSET.abstract",
    functionParameter: [
      {
        name: "formula.functionList.OFFSET.functionParameter.reference.name",
        detail: "formula.functionList.OFFSET.functionParameter.reference.detail",
        example: "A1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.OFFSET.functionParameter.rows.name",
        detail: "formula.functionList.OFFSET.functionParameter.rows.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.OFFSET.functionParameter.cols.name",
        detail: "formula.functionList.OFFSET.functionParameter.cols.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.OFFSET.functionParameter.height.name",
        detail: "formula.functionList.OFFSET.functionParameter.height.detail",
        example: "1",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.OFFSET.functionParameter.width.name",
        detail: "formula.functionList.OFFSET.functionParameter.width.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ROW" /* ROW */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.ROW.description",
    abstract: "formula.functionList.ROW.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ROW.functionParameter.reference.name",
        detail: "formula.functionList.ROW.functionParameter.reference.detail",
        example: "A1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ROWS" /* ROWS */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.ROWS.description",
    abstract: "formula.functionList.ROWS.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ROWS.functionParameter.array.name",
        detail: "formula.functionList.ROWS.functionParameter.array.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "RTD" /* RTD */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.RTD.description",
    abstract: "formula.functionList.RTD.abstract",
    functionParameter: [
      {
        name: "formula.functionList.RTD.functionParameter.number1.name",
        detail: "formula.functionList.RTD.functionParameter.number1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.RTD.functionParameter.number2.name",
        detail: "formula.functionList.RTD.functionParameter.number2.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "SORT" /* SORT */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.SORT.description",
    abstract: "formula.functionList.SORT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.SORT.functionParameter.array.name",
        detail: "formula.functionList.SORT.functionParameter.array.detail",
        example: "A2:A17",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SORT.functionParameter.sortIndex.name",
        detail: "formula.functionList.SORT.functionParameter.sortIndex.detail",
        example: "1",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.SORT.functionParameter.sortOrder.name",
        detail: "formula.functionList.SORT.functionParameter.sortOrder.detail",
        example: "1",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.SORT.functionParameter.byCol.name",
        detail: "formula.functionList.SORT.functionParameter.byCol.detail",
        example: "false",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "SORTBY" /* SORTBY */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.SORTBY.description",
    abstract: "formula.functionList.SORTBY.abstract",
    functionParameter: [
      {
        name: "formula.functionList.SORTBY.functionParameter.array.name",
        detail: "formula.functionList.SORTBY.functionParameter.array.detail",
        example: "D2:D9",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SORTBY.functionParameter.byArray1.name",
        detail: "formula.functionList.SORTBY.functionParameter.byArray1.detail",
        example: "E2:E9",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SORTBY.functionParameter.sortOrder1.name",
        detail: "formula.functionList.SORTBY.functionParameter.sortOrder1.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SORTBY.functionParameter.byArray2.name",
        detail: "formula.functionList.SORTBY.functionParameter.byArray2.detail",
        example: "E2:E9",
        require: 0,
        repeat: 1
      },
      {
        name: "formula.functionList.SORTBY.functionParameter.sortOrder2.name",
        detail: "formula.functionList.SORTBY.functionParameter.sortOrder2.detail",
        example: "1",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "TAKE" /* TAKE */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.TAKE.description",
    abstract: "formula.functionList.TAKE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.TAKE.functionParameter.array.name",
        detail: "formula.functionList.TAKE.functionParameter.array.detail",
        example: "A2:C4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.TAKE.functionParameter.rows.name",
        detail: "formula.functionList.TAKE.functionParameter.rows.detail",
        example: "2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.TAKE.functionParameter.columns.name",
        detail: "formula.functionList.TAKE.functionParameter.columns.detail",
        example: "2",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "TOCOL" /* TOCOL */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.TOCOL.description",
    abstract: "formula.functionList.TOCOL.abstract",
    functionParameter: [
      {
        name: "formula.functionList.TOCOL.functionParameter.array.name",
        detail: "formula.functionList.TOCOL.functionParameter.array.detail",
        example: "A2:D4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.TOCOL.functionParameter.ignore.name",
        detail: "formula.functionList.TOCOL.functionParameter.ignore.detail",
        example: "1",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.TOCOL.functionParameter.scanByColumn.name",
        detail: "formula.functionList.TOCOL.functionParameter.scanByColumn.detail",
        example: "TRUE",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "TOROW" /* TOROW */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.TOROW.description",
    abstract: "formula.functionList.TOROW.abstract",
    functionParameter: [
      {
        name: "formula.functionList.TOROW.functionParameter.array.name",
        detail: "formula.functionList.TOROW.functionParameter.array.detail",
        example: "A2:D4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.TOROW.functionParameter.ignore.name",
        detail: "formula.functionList.TOROW.functionParameter.ignore.detail",
        example: "1",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.TOROW.functionParameter.scanByColumn.name",
        detail: "formula.functionList.TOROW.functionParameter.scanByColumn.detail",
        example: "TRUE",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "TRANSPOSE" /* TRANSPOSE */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.TRANSPOSE.description",
    abstract: "formula.functionList.TRANSPOSE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.TRANSPOSE.functionParameter.array.name",
        detail: "formula.functionList.TRANSPOSE.functionParameter.array.detail",
        example: "A2:F9",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "UNIQUE" /* UNIQUE */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.UNIQUE.description",
    abstract: "formula.functionList.UNIQUE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.UNIQUE.functionParameter.array.name",
        detail: "formula.functionList.UNIQUE.functionParameter.array.detail",
        example: "A2:A12",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.UNIQUE.functionParameter.byCol.name",
        detail: "formula.functionList.UNIQUE.functionParameter.byCol.detail",
        example: "false",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.UNIQUE.functionParameter.exactlyOnce.name",
        detail: "formula.functionList.UNIQUE.functionParameter.exactlyOnce.detail",
        example: "false",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "VLOOKUP" /* VLOOKUP */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.VLOOKUP.description",
    abstract: "formula.functionList.VLOOKUP.abstract",
    functionParameter: [
      {
        name: "formula.functionList.VLOOKUP.functionParameter.lookupValue.name",
        detail: "formula.functionList.VLOOKUP.functionParameter.lookupValue.detail",
        example: "B2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.VLOOKUP.functionParameter.tableArray.name",
        detail: "formula.functionList.VLOOKUP.functionParameter.tableArray.detail",
        example: "C2:E7",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.VLOOKUP.functionParameter.colIndexNum.name",
        detail: "formula.functionList.VLOOKUP.functionParameter.colIndexNum.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.VLOOKUP.functionParameter.rangeLookup.name",
        detail: "formula.functionList.VLOOKUP.functionParameter.rangeLookup.detail",
        example: "TRUE",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "VSTACK" /* VSTACK */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.VSTACK.description",
    abstract: "formula.functionList.VSTACK.abstract",
    functionParameter: [
      {
        name: "formula.functionList.VSTACK.functionParameter.array1.name",
        detail: "formula.functionList.VSTACK.functionParameter.array1.detail",
        example: "A2:C3",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.VSTACK.functionParameter.array2.name",
        detail: "formula.functionList.VSTACK.functionParameter.array2.detail",
        example: "E2:G3",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "WRAPCOLS" /* WRAPCOLS */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.WRAPCOLS.description",
    abstract: "formula.functionList.WRAPCOLS.abstract",
    functionParameter: [
      {
        name: "formula.functionList.WRAPCOLS.functionParameter.vector.name",
        detail: "formula.functionList.WRAPCOLS.functionParameter.vector.detail",
        example: "A2:G2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.WRAPCOLS.functionParameter.wrapCount.name",
        detail: "formula.functionList.WRAPCOLS.functionParameter.wrapCount.detail",
        example: "3",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.WRAPCOLS.functionParameter.padWith.name",
        detail: "formula.functionList.WRAPCOLS.functionParameter.padWith.detail",
        example: '"x"',
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "WRAPROWS" /* WRAPROWS */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.WRAPROWS.description",
    abstract: "formula.functionList.WRAPROWS.abstract",
    functionParameter: [
      {
        name: "formula.functionList.WRAPROWS.functionParameter.vector.name",
        detail: "formula.functionList.WRAPROWS.functionParameter.vector.detail",
        example: "A2:G2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.WRAPROWS.functionParameter.wrapCount.name",
        detail: "formula.functionList.WRAPROWS.functionParameter.wrapCount.detail",
        example: "3",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.WRAPROWS.functionParameter.padWith.name",
        detail: "formula.functionList.WRAPROWS.functionParameter.padWith.detail",
        example: '"x"',
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "XLOOKUP" /* XLOOKUP */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.XLOOKUP.description",
    abstract: "formula.functionList.XLOOKUP.abstract",
    functionParameter: [
      {
        name: "formula.functionList.XLOOKUP.functionParameter.lookupValue.name",
        detail: "formula.functionList.XLOOKUP.functionParameter.lookupValue.detail",
        example: "A1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.XLOOKUP.functionParameter.lookupArray.name",
        detail: "formula.functionList.XLOOKUP.functionParameter.lookupArray.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.XLOOKUP.functionParameter.returnArray.name",
        detail: "formula.functionList.XLOOKUP.functionParameter.returnArray.detail",
        example: "B1:B20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.XLOOKUP.functionParameter.ifNotFound.name",
        detail: "formula.functionList.XLOOKUP.functionParameter.ifNotFound.detail",
        example: "default",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.XLOOKUP.functionParameter.matchMode.name",
        detail: "formula.functionList.XLOOKUP.functionParameter.matchMode.detail",
        example: "0",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.XLOOKUP.functionParameter.searchMode.name",
        detail: "formula.functionList.XLOOKUP.functionParameter.searchMode.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "XMATCH" /* XMATCH */,
    functionType: 4 /* Lookup */,
    description: "formula.functionList.XMATCH.description",
    abstract: "formula.functionList.XMATCH.abstract",
    functionParameter: [
      {
        name: "formula.functionList.XMATCH.functionParameter.lookupValue.name",
        detail: "formula.functionList.XMATCH.functionParameter.lookupValue.detail",
        example: "B1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.XMATCH.functionParameter.lookupArray.name",
        detail: "formula.functionList.XMATCH.functionParameter.lookupArray.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.XMATCH.functionParameter.matchMode.name",
        detail: "formula.functionList.XMATCH.functionParameter.matchMode.detail",
        example: "0",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.XMATCH.functionParameter.searchMode.name",
        detail: "formula.functionList.XMATCH.functionParameter.searchMode.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  }
];

// ../packages/sheets-formula/src/services/function-list/math.ts
var FUNCTION_LIST_MATH = [
  {
    functionName: "ABS" /* ABS */,
    functionType: 2 /* Math */,
    description: "formula.functionList.ABS.description",
    abstract: "formula.functionList.ABS.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ABS.functionParameter.number.name",
        detail: "formula.functionList.ABS.functionParameter.number.detail",
        example: "-2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ACOS" /* ACOS */,
    functionType: 2 /* Math */,
    description: "formula.functionList.ACOS.description",
    abstract: "formula.functionList.ACOS.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ACOS.functionParameter.number.name",
        detail: "formula.functionList.ACOS.functionParameter.number.detail",
        example: "0",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ACOSH" /* ACOSH */,
    functionType: 2 /* Math */,
    description: "formula.functionList.ACOSH.description",
    abstract: "formula.functionList.ACOSH.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ACOSH.functionParameter.number.name",
        detail: "formula.functionList.ACOSH.functionParameter.number.detail",
        example: "2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ACOT" /* ACOT */,
    functionType: 2 /* Math */,
    description: "formula.functionList.ACOT.description",
    abstract: "formula.functionList.ACOT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ACOT.functionParameter.number.name",
        detail: "formula.functionList.ACOT.functionParameter.number.detail",
        example: "0",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ACOTH" /* ACOTH */,
    functionType: 2 /* Math */,
    description: "formula.functionList.ACOTH.description",
    abstract: "formula.functionList.ACOTH.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ACOTH.functionParameter.number.name",
        detail: "formula.functionList.ACOTH.functionParameter.number.detail",
        example: "6",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "AGGREGATE" /* AGGREGATE */,
    functionType: 2 /* Math */,
    description: "formula.functionList.AGGREGATE.description",
    abstract: "formula.functionList.AGGREGATE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.AGGREGATE.functionParameter.functionNum.name",
        detail: "formula.functionList.AGGREGATE.functionParameter.functionNum.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.AGGREGATE.functionParameter.options.name",
        detail: "formula.functionList.AGGREGATE.functionParameter.options.detail",
        example: "6",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.AGGREGATE.functionParameter.ref1.name",
        detail: "formula.functionList.AGGREGATE.functionParameter.ref1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.AGGREGATE.functionParameter.ref2.name",
        detail: "formula.functionList.AGGREGATE.functionParameter.ref2.detail",
        example: "B1:B20",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "ARABIC" /* ARABIC */,
    functionType: 2 /* Math */,
    description: "formula.functionList.ARABIC.description",
    abstract: "formula.functionList.ARABIC.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ARABIC.functionParameter.text.name",
        detail: "formula.functionList.ARABIC.functionParameter.text.detail",
        example: '"LVII"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ASIN" /* ASIN */,
    functionType: 2 /* Math */,
    description: "formula.functionList.ASIN.description",
    abstract: "formula.functionList.ASIN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ASIN.functionParameter.number.name",
        detail: "formula.functionList.ASIN.functionParameter.number.detail",
        example: "0",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ASINH" /* ASINH */,
    functionType: 2 /* Math */,
    description: "formula.functionList.ASINH.description",
    abstract: "formula.functionList.ASINH.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ASINH.functionParameter.number.name",
        detail: "formula.functionList.ASINH.functionParameter.number.detail",
        example: "10",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ATAN" /* ATAN */,
    functionType: 2 /* Math */,
    description: "formula.functionList.ATAN.description",
    abstract: "formula.functionList.ATAN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ATAN.functionParameter.number.name",
        detail: "formula.functionList.ATAN.functionParameter.number.detail",
        example: "1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ATAN2" /* ATAN2 */,
    functionType: 2 /* Math */,
    description: "formula.functionList.ATAN2.description",
    abstract: "formula.functionList.ATAN2.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ATAN2.functionParameter.xNum.name",
        detail: "formula.functionList.ATAN2.functionParameter.xNum.detail",
        example: "4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ATAN2.functionParameter.yNum.name",
        detail: "formula.functionList.ATAN2.functionParameter.yNum.detail",
        example: "3",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ATANH" /* ATANH */,
    functionType: 2 /* Math */,
    description: "formula.functionList.ATANH.description",
    abstract: "formula.functionList.ATANH.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ATANH.functionParameter.number.name",
        detail: "formula.functionList.ATANH.functionParameter.number.detail",
        example: "0.1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "BASE" /* BASE */,
    functionType: 2 /* Math */,
    description: "formula.functionList.BASE.description",
    abstract: "formula.functionList.BASE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.BASE.functionParameter.number.name",
        detail: "formula.functionList.BASE.functionParameter.number.detail",
        example: "15",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BASE.functionParameter.radix.name",
        detail: "formula.functionList.BASE.functionParameter.radix.detail",
        example: "2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BASE.functionParameter.minLength.name",
        detail: "formula.functionList.BASE.functionParameter.minLength.detail",
        example: "10",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "CEILING" /* CEILING */,
    functionType: 2 /* Math */,
    description: "formula.functionList.CEILING.description",
    abstract: "formula.functionList.CEILING.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CEILING.functionParameter.number.name",
        detail: "formula.functionList.CEILING.functionParameter.number.detail",
        example: "2.5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CEILING.functionParameter.significance.name",
        detail: "formula.functionList.CEILING.functionParameter.significance.detail",
        example: "1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "CEILING.MATH" /* CEILING_MATH */,
    functionType: 2 /* Math */,
    description: "formula.functionList.CEILING_MATH.description",
    abstract: "formula.functionList.CEILING_MATH.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CEILING_MATH.functionParameter.number.name",
        detail: "formula.functionList.CEILING_MATH.functionParameter.number.detail",
        example: "-5.5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CEILING_MATH.functionParameter.significance.name",
        detail: "formula.functionList.CEILING_MATH.functionParameter.significance.detail",
        example: "2",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.CEILING_MATH.functionParameter.mode.name",
        detail: "formula.functionList.CEILING_MATH.functionParameter.mode.detail",
        example: "-1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "CEILING.PRECISE" /* CEILING_PRECISE */,
    functionType: 2 /* Math */,
    description: "formula.functionList.CEILING_PRECISE.description",
    abstract: "formula.functionList.CEILING_PRECISE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CEILING_PRECISE.functionParameter.number.name",
        detail: "formula.functionList.CEILING_PRECISE.functionParameter.number.detail",
        example: "4.3",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CEILING_PRECISE.functionParameter.significance.name",
        detail: "formula.functionList.CEILING_PRECISE.functionParameter.significance.detail",
        example: "2",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "COMBIN" /* COMBIN */,
    functionType: 2 /* Math */,
    description: "formula.functionList.COMBIN.description",
    abstract: "formula.functionList.COMBIN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.COMBIN.functionParameter.number.name",
        detail: "formula.functionList.COMBIN.functionParameter.number.detail",
        example: "8",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.COMBIN.functionParameter.numberChosen.name",
        detail: "formula.functionList.COMBIN.functionParameter.numberChosen.detail",
        example: "2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "COMBINA" /* COMBINA */,
    functionType: 2 /* Math */,
    description: "formula.functionList.COMBINA.description",
    abstract: "formula.functionList.COMBINA.abstract",
    functionParameter: [
      {
        name: "formula.functionList.COMBINA.functionParameter.number.name",
        detail: "formula.functionList.COMBINA.functionParameter.number.detail",
        example: "8",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.COMBINA.functionParameter.numberChosen.name",
        detail: "formula.functionList.COMBINA.functionParameter.numberChosen.detail",
        example: "2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "COS" /* COS */,
    functionType: 2 /* Math */,
    description: "formula.functionList.COS.description",
    abstract: "formula.functionList.COS.abstract",
    functionParameter: [
      {
        name: "formula.functionList.COS.functionParameter.number.name",
        detail: "formula.functionList.COS.functionParameter.number.detail",
        example: "1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "COSH" /* COSH */,
    functionType: 2 /* Math */,
    description: "formula.functionList.COSH.description",
    abstract: "formula.functionList.COSH.abstract",
    functionParameter: [
      {
        name: "formula.functionList.COSH.functionParameter.number.name",
        detail: "formula.functionList.COSH.functionParameter.number.detail",
        example: "4",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "COT" /* COT */,
    functionType: 2 /* Math */,
    description: "formula.functionList.COT.description",
    abstract: "formula.functionList.COT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.COT.functionParameter.number.name",
        detail: "formula.functionList.COT.functionParameter.number.detail",
        example: "30",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "COTH" /* COTH */,
    functionType: 2 /* Math */,
    description: "formula.functionList.COTH.description",
    abstract: "formula.functionList.COTH.abstract",
    functionParameter: [
      {
        name: "formula.functionList.COTH.functionParameter.number.name",
        detail: "formula.functionList.COTH.functionParameter.number.detail",
        example: "2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "CSC" /* CSC */,
    functionType: 2 /* Math */,
    description: "formula.functionList.CSC.description",
    abstract: "formula.functionList.CSC.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CSC.functionParameter.number.name",
        detail: "formula.functionList.CSC.functionParameter.number.detail",
        example: "15",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "CSCH" /* CSCH */,
    functionType: 2 /* Math */,
    description: "formula.functionList.CSCH.description",
    abstract: "formula.functionList.CSCH.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CSCH.functionParameter.number.name",
        detail: "formula.functionList.CSCH.functionParameter.number.detail",
        example: "1.5",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "DECIMAL" /* DECIMAL */,
    functionType: 2 /* Math */,
    description: "formula.functionList.DECIMAL.description",
    abstract: "formula.functionList.DECIMAL.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DECIMAL.functionParameter.text.name",
        detail: "formula.functionList.DECIMAL.functionParameter.text.detail",
        example: '"FF"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DECIMAL.functionParameter.radix.name",
        detail: "formula.functionList.DECIMAL.functionParameter.radix.detail",
        example: "16",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "DEGREES" /* DEGREES */,
    functionType: 2 /* Math */,
    description: "formula.functionList.DEGREES.description",
    abstract: "formula.functionList.DEGREES.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DEGREES.functionParameter.angle.name",
        detail: "formula.functionList.DEGREES.functionParameter.angle.detail",
        example: "PI()",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "EVEN" /* EVEN */,
    functionType: 2 /* Math */,
    description: "formula.functionList.EVEN.description",
    abstract: "formula.functionList.EVEN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.EVEN.functionParameter.number.name",
        detail: "formula.functionList.EVEN.functionParameter.number.detail",
        example: "1.5",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "EXP" /* EXP */,
    functionType: 2 /* Math */,
    description: "formula.functionList.EXP.description",
    abstract: "formula.functionList.EXP.abstract",
    functionParameter: [
      {
        name: "formula.functionList.EXP.functionParameter.number.name",
        detail: "formula.functionList.EXP.functionParameter.number.detail",
        example: "2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "FACT" /* FACT */,
    functionType: 2 /* Math */,
    description: "formula.functionList.FACT.description",
    abstract: "formula.functionList.FACT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.FACT.functionParameter.number.name",
        detail: "formula.functionList.FACT.functionParameter.number.detail",
        example: "5",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "FACTDOUBLE" /* FACTDOUBLE */,
    functionType: 2 /* Math */,
    description: "formula.functionList.FACTDOUBLE.description",
    abstract: "formula.functionList.FACTDOUBLE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.FACTDOUBLE.functionParameter.number.name",
        detail: "formula.functionList.FACTDOUBLE.functionParameter.number.detail",
        example: "6",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "FLOOR" /* FLOOR */,
    functionType: 2 /* Math */,
    description: "formula.functionList.FLOOR.description",
    abstract: "formula.functionList.FLOOR.abstract",
    functionParameter: [
      {
        name: "formula.functionList.FLOOR.functionParameter.number.name",
        detail: "formula.functionList.FLOOR.functionParameter.number.detail",
        example: "3.7",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.FLOOR.functionParameter.significance.name",
        detail: "formula.functionList.FLOOR.functionParameter.significance.detail",
        example: "2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "FLOOR.MATH" /* FLOOR_MATH */,
    functionType: 2 /* Math */,
    description: "formula.functionList.FLOOR_MATH.description",
    abstract: "formula.functionList.FLOOR_MATH.abstract",
    functionParameter: [
      {
        name: "formula.functionList.FLOOR_MATH.functionParameter.number.name",
        detail: "formula.functionList.FLOOR_MATH.functionParameter.number.detail",
        example: "-5.5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.FLOOR_MATH.functionParameter.significance.name",
        detail: "formula.functionList.FLOOR_MATH.functionParameter.significance.detail",
        example: "2",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.FLOOR_MATH.functionParameter.mode.name",
        detail: "formula.functionList.FLOOR_MATH.functionParameter.mode.detail",
        example: "-1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "FLOOR.PRECISE" /* FLOOR_PRECISE */,
    functionType: 2 /* Math */,
    description: "formula.functionList.FLOOR_PRECISE.description",
    abstract: "formula.functionList.FLOOR_PRECISE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.FLOOR_PRECISE.functionParameter.number.name",
        detail: "formula.functionList.FLOOR_PRECISE.functionParameter.number.detail",
        example: "-3.2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.FLOOR_PRECISE.functionParameter.significance.name",
        detail: "formula.functionList.FLOOR_PRECISE.functionParameter.significance.detail",
        example: "-1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "GCD" /* GCD */,
    functionType: 2 /* Math */,
    description: "formula.functionList.GCD.description",
    abstract: "formula.functionList.GCD.abstract",
    functionParameter: [
      {
        name: "formula.functionList.GCD.functionParameter.number1.name",
        detail: "formula.functionList.GCD.functionParameter.number1.detail",
        example: "5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.GCD.functionParameter.number2.name",
        detail: "formula.functionList.GCD.functionParameter.number2.detail",
        example: "2",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "INT" /* INT */,
    functionType: 2 /* Math */,
    description: "formula.functionList.INT.description",
    abstract: "formula.functionList.INT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.INT.functionParameter.number.name",
        detail: "formula.functionList.INT.functionParameter.number.detail",
        example: "8.9",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ISO.CEILING" /* ISO_CEILING */,
    functionType: 2 /* Math */,
    description: "formula.functionList.ISO_CEILING.description",
    abstract: "formula.functionList.ISO_CEILING.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ISO_CEILING.functionParameter.number1.name",
        detail: "formula.functionList.ISO_CEILING.functionParameter.number1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ISO_CEILING.functionParameter.number2.name",
        detail: "formula.functionList.ISO_CEILING.functionParameter.number2.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "LCM" /* LCM */,
    functionType: 2 /* Math */,
    description: "formula.functionList.LCM.description",
    abstract: "formula.functionList.LCM.abstract",
    functionParameter: [
      {
        name: "formula.functionList.LCM.functionParameter.number1.name",
        detail: "formula.functionList.LCM.functionParameter.number1.detail",
        example: "5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.LCM.functionParameter.number2.name",
        detail: "formula.functionList.LCM.functionParameter.number2.detail",
        example: "2",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "LET" /* LET */,
    functionType: 2 /* Math */,
    description: "formula.functionList.LET.description",
    abstract: "formula.functionList.LET.abstract",
    functionParameter: [
      {
        name: "formula.functionList.LET.functionParameter.number1.name",
        detail: "formula.functionList.LET.functionParameter.number1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.LET.functionParameter.number2.name",
        detail: "formula.functionList.LET.functionParameter.number2.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "LN" /* LN */,
    functionType: 2 /* Math */,
    description: "formula.functionList.LN.description",
    abstract: "formula.functionList.LN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.LN.functionParameter.number.name",
        detail: "formula.functionList.LN.functionParameter.number.detail",
        example: "EXP(3)",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "LOG" /* LOG */,
    functionType: 2 /* Math */,
    description: "formula.functionList.LOG.description",
    abstract: "formula.functionList.LOG.abstract",
    functionParameter: [
      {
        name: "formula.functionList.LOG.functionParameter.number.name",
        detail: "formula.functionList.LOG.functionParameter.number.detail",
        example: "8",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.LOG.functionParameter.base.name",
        detail: "formula.functionList.LOG.functionParameter.base.detail",
        example: "2",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "LOG10" /* LOG10 */,
    functionType: 2 /* Math */,
    description: "formula.functionList.LOG10.description",
    abstract: "formula.functionList.LOG10.abstract",
    functionParameter: [
      {
        name: "formula.functionList.LOG10.functionParameter.number.name",
        detail: "formula.functionList.LOG10.functionParameter.number.detail",
        example: "100000",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "MDETERM" /* MDETERM */,
    functionType: 2 /* Math */,
    description: "formula.functionList.MDETERM.description",
    abstract: "formula.functionList.MDETERM.abstract",
    functionParameter: [
      {
        name: "formula.functionList.MDETERM.functionParameter.array.name",
        detail: "formula.functionList.MDETERM.functionParameter.array.detail",
        example: "A1:C3",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "MINVERSE" /* MINVERSE */,
    functionType: 2 /* Math */,
    description: "formula.functionList.MINVERSE.description",
    abstract: "formula.functionList.MINVERSE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.MINVERSE.functionParameter.array.name",
        detail: "formula.functionList.MINVERSE.functionParameter.array.detail",
        example: "A1:C3",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "MMULT" /* MMULT */,
    functionType: 2 /* Math */,
    description: "formula.functionList.MMULT.description",
    abstract: "formula.functionList.MMULT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.MMULT.functionParameter.array1.name",
        detail: "formula.functionList.MMULT.functionParameter.array1.detail",
        example: "A2:B3",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MMULT.functionParameter.array2.name",
        detail: "formula.functionList.MMULT.functionParameter.array2.detail",
        example: "A5:B6",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "MOD" /* MOD */,
    functionType: 2 /* Math */,
    description: "formula.functionList.MOD.description",
    abstract: "formula.functionList.MOD.abstract",
    functionParameter: [
      {
        name: "formula.functionList.MOD.functionParameter.number.name",
        detail: "formula.functionList.MOD.functionParameter.number.detail",
        example: "3",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MOD.functionParameter.divisor.name",
        detail: "formula.functionList.MOD.functionParameter.divisor.detail",
        example: "2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "MROUND" /* MROUND */,
    functionType: 2 /* Math */,
    description: "formula.functionList.MROUND.description",
    abstract: "formula.functionList.MROUND.abstract",
    functionParameter: [
      {
        name: "formula.functionList.MROUND.functionParameter.number.name",
        detail: "formula.functionList.MROUND.functionParameter.number.detail",
        example: "10",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MROUND.functionParameter.multiple.name",
        detail: "formula.functionList.MROUND.functionParameter.multiple.detail",
        example: "3",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "MULTINOMIAL" /* MULTINOMIAL */,
    functionType: 2 /* Math */,
    description: "formula.functionList.MULTINOMIAL.description",
    abstract: "formula.functionList.MULTINOMIAL.abstract",
    functionParameter: [
      {
        name: "formula.functionList.MULTINOMIAL.functionParameter.number1.name",
        detail: "formula.functionList.MULTINOMIAL.functionParameter.number1.detail",
        example: "5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MULTINOMIAL.functionParameter.number2.name",
        detail: "formula.functionList.MULTINOMIAL.functionParameter.number2.detail",
        example: "2",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "MUNIT" /* MUNIT */,
    functionType: 2 /* Math */,
    description: "formula.functionList.MUNIT.description",
    abstract: "formula.functionList.MUNIT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.MUNIT.functionParameter.dimension.name",
        detail: "formula.functionList.MUNIT.functionParameter.dimension.detail",
        example: "3",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ODD" /* ODD */,
    functionType: 2 /* Math */,
    description: "formula.functionList.ODD.description",
    abstract: "formula.functionList.ODD.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ODD.functionParameter.number.name",
        detail: "formula.functionList.ODD.functionParameter.number.detail",
        example: "1.5",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "PI" /* PI */,
    functionType: 2 /* Math */,
    description: "formula.functionList.PI.description",
    abstract: "formula.functionList.PI.abstract",
    functionParameter: []
  },
  {
    functionName: "POWER" /* POWER */,
    functionType: 2 /* Math */,
    description: "formula.functionList.POWER.description",
    abstract: "formula.functionList.POWER.abstract",
    functionParameter: [
      {
        name: "formula.functionList.POWER.functionParameter.number.name",
        detail: "formula.functionList.POWER.functionParameter.number.detail",
        example: "5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.POWER.functionParameter.power.name",
        detail: "formula.functionList.POWER.functionParameter.power.detail",
        example: "2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "PRODUCT" /* PRODUCT */,
    functionType: 2 /* Math */,
    description: "formula.functionList.PRODUCT.description",
    abstract: "formula.functionList.PRODUCT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.PRODUCT.functionParameter.number1.name",
        detail: "formula.functionList.PRODUCT.functionParameter.number1.detail",
        example: "A1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PRODUCT.functionParameter.number2.name",
        detail: "formula.functionList.PRODUCT.functionParameter.number2.detail",
        example: "A2",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "QUOTIENT" /* QUOTIENT */,
    functionType: 2 /* Math */,
    description: "formula.functionList.QUOTIENT.description",
    abstract: "formula.functionList.QUOTIENT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.QUOTIENT.functionParameter.numerator.name",
        detail: "formula.functionList.QUOTIENT.functionParameter.numerator.detail",
        example: "5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.QUOTIENT.functionParameter.denominator.name",
        detail: "formula.functionList.QUOTIENT.functionParameter.denominator.detail",
        example: "2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "RADIANS" /* RADIANS */,
    functionType: 2 /* Math */,
    description: "formula.functionList.RADIANS.description",
    abstract: "formula.functionList.RADIANS.abstract",
    functionParameter: [
      {
        name: "formula.functionList.RADIANS.functionParameter.angle.name",
        detail: "formula.functionList.RADIANS.functionParameter.angle.detail",
        example: "270",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "RAND" /* RAND */,
    functionType: 2 /* Math */,
    description: "formula.functionList.RAND.description",
    abstract: "formula.functionList.RAND.abstract",
    functionParameter: []
  },
  {
    functionName: "RANDARRAY" /* RANDARRAY */,
    functionType: 2 /* Math */,
    description: "formula.functionList.RANDARRAY.description",
    abstract: "formula.functionList.RANDARRAY.abstract",
    functionParameter: [
      {
        name: "formula.functionList.RANDARRAY.functionParameter.rows.name",
        detail: "formula.functionList.RANDARRAY.functionParameter.rows.detail",
        example: "5",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.RANDARRAY.functionParameter.columns.name",
        detail: "formula.functionList.RANDARRAY.functionParameter.columns.detail",
        example: "3",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.RANDARRAY.functionParameter.min.name",
        detail: "formula.functionList.RANDARRAY.functionParameter.min.detail",
        example: "1",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.RANDARRAY.functionParameter.max.name",
        detail: "formula.functionList.RANDARRAY.functionParameter.max.detail",
        example: "100",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.RANDARRAY.functionParameter.wholeNumber.name",
        detail: "formula.functionList.RANDARRAY.functionParameter.wholeNumber.detail",
        example: "TRUE",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "RANDBETWEEN" /* RANDBETWEEN */,
    functionType: 2 /* Math */,
    description: "formula.functionList.RANDBETWEEN.description",
    abstract: "formula.functionList.RANDBETWEEN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.RANDBETWEEN.functionParameter.bottom.name",
        detail: "formula.functionList.RANDBETWEEN.functionParameter.bottom.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.RANDBETWEEN.functionParameter.top.name",
        detail: "formula.functionList.RANDBETWEEN.functionParameter.top.detail",
        example: "100",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ROMAN" /* ROMAN */,
    functionType: 2 /* Math */,
    description: "formula.functionList.ROMAN.description",
    abstract: "formula.functionList.ROMAN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ROMAN.functionParameter.number.name",
        detail: "formula.functionList.ROMAN.functionParameter.number.detail",
        example: "499",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ROMAN.functionParameter.form.name",
        detail: "formula.functionList.ROMAN.functionParameter.form.detail",
        example: "0",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ROUND" /* ROUND */,
    functionType: 2 /* Math */,
    description: "formula.functionList.ROUND.description",
    abstract: "formula.functionList.ROUND.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ROUND.functionParameter.number.name",
        detail: "formula.functionList.ROUND.functionParameter.number.detail",
        example: "2.15",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ROUND.functionParameter.numDigits.name",
        detail: "formula.functionList.ROUND.functionParameter.numDigits.detail",
        example: "1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ROUNDBANK" /* ROUNDBANK */,
    functionType: 2 /* Math */,
    description: "formula.functionList.ROUNDBANK.description",
    abstract: "formula.functionList.ROUNDBANK.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ROUNDBANK.functionParameter.number.name",
        detail: "formula.functionList.ROUNDBANK.functionParameter.number.detail",
        example: "2.345",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ROUNDBANK.functionParameter.numDigits.name",
        detail: "formula.functionList.ROUNDBANK.functionParameter.numDigits.detail",
        example: "2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ROUNDDOWN" /* ROUNDDOWN */,
    functionType: 2 /* Math */,
    description: "formula.functionList.ROUNDDOWN.description",
    abstract: "formula.functionList.ROUNDDOWN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ROUNDDOWN.functionParameter.number.name",
        detail: "formula.functionList.ROUNDDOWN.functionParameter.number.detail",
        example: "3.2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ROUNDDOWN.functionParameter.numDigits.name",
        detail: "formula.functionList.ROUNDDOWN.functionParameter.numDigits.detail",
        example: "0",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ROUNDUP" /* ROUNDUP */,
    functionType: 2 /* Math */,
    description: "formula.functionList.ROUNDUP.description",
    abstract: "formula.functionList.ROUNDUP.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ROUNDUP.functionParameter.number.name",
        detail: "formula.functionList.ROUNDUP.functionParameter.number.detail",
        example: "3.2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ROUNDUP.functionParameter.numDigits.name",
        detail: "formula.functionList.ROUNDUP.functionParameter.numDigits.detail",
        example: "0",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "SEC" /* SEC */,
    functionType: 2 /* Math */,
    description: "formula.functionList.SEC.description",
    abstract: "formula.functionList.SEC.abstract",
    functionParameter: [
      {
        name: "formula.functionList.SEC.functionParameter.number.name",
        detail: "formula.functionList.SEC.functionParameter.number.detail",
        example: "30",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "SECH" /* SECH */,
    functionType: 2 /* Math */,
    description: "formula.functionList.SECH.description",
    abstract: "formula.functionList.SECH.abstract",
    functionParameter: [
      {
        name: "formula.functionList.SECH.functionParameter.number.name",
        detail: "formula.functionList.SECH.functionParameter.number.detail",
        example: "30",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "SERIESSUM" /* SERIESSUM */,
    functionType: 2 /* Math */,
    description: "formula.functionList.SERIESSUM.description",
    abstract: "formula.functionList.SERIESSUM.abstract",
    functionParameter: [
      {
        name: "formula.functionList.SERIESSUM.functionParameter.x.name",
        detail: "formula.functionList.SERIESSUM.functionParameter.x.detail",
        example: "0.785398163",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SERIESSUM.functionParameter.n.name",
        detail: "formula.functionList.SERIESSUM.functionParameter.n.detail",
        example: "0",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SERIESSUM.functionParameter.m.name",
        detail: "formula.functionList.SERIESSUM.functionParameter.m.detail",
        example: "2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SERIESSUM.functionParameter.coefficients.name",
        detail: "formula.functionList.SERIESSUM.functionParameter.coefficients.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "SEQUENCE" /* SEQUENCE */,
    functionType: 2 /* Math */,
    description: "formula.functionList.SEQUENCE.description",
    abstract: "formula.functionList.SEQUENCE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.SEQUENCE.functionParameter.rows.name",
        detail: "formula.functionList.SEQUENCE.functionParameter.rows.detail",
        example: "4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SEQUENCE.functionParameter.columns.name",
        detail: "formula.functionList.SEQUENCE.functionParameter.columns.detail",
        example: "5",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.SEQUENCE.functionParameter.start.name",
        detail: "formula.functionList.SEQUENCE.functionParameter.start.detail",
        example: "1",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.SEQUENCE.functionParameter.step.name",
        detail: "formula.functionList.SEQUENCE.functionParameter.step.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "SIGN" /* SIGN */,
    functionType: 2 /* Math */,
    description: "formula.functionList.SIGN.description",
    abstract: "formula.functionList.SIGN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.SIGN.functionParameter.number.name",
        detail: "formula.functionList.SIGN.functionParameter.number.detail",
        example: "10",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "SIN" /* SIN */,
    functionType: 2 /* Math */,
    description: "formula.functionList.SIN.description",
    abstract: "formula.functionList.SIN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.SIN.functionParameter.number.name",
        detail: "formula.functionList.SIN.functionParameter.number.detail",
        example: "30*PI()/180",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "SINH" /* SINH */,
    functionType: 2 /* Math */,
    description: "formula.functionList.SINH.description",
    abstract: "formula.functionList.SINH.abstract",
    functionParameter: [
      {
        name: "formula.functionList.SINH.functionParameter.number.name",
        detail: "formula.functionList.SINH.functionParameter.number.detail",
        example: "0.0342*1.03",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "SQRT" /* SQRT */,
    functionType: 2 /* Math */,
    description: "formula.functionList.SQRT.description",
    abstract: "formula.functionList.SQRT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.SQRT.functionParameter.number.name",
        detail: "formula.functionList.SQRT.functionParameter.number.detail",
        example: "16",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "SQRTPI" /* SQRTPI */,
    functionType: 2 /* Math */,
    description: "formula.functionList.SQRTPI.description",
    abstract: "formula.functionList.SQRTPI.abstract",
    functionParameter: [
      {
        name: "formula.functionList.SQRTPI.functionParameter.number.name",
        detail: "formula.functionList.SQRTPI.functionParameter.number.detail",
        example: "1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "SUBTOTAL" /* SUBTOTAL */,
    functionType: 2 /* Math */,
    description: "formula.functionList.SUBTOTAL.description",
    abstract: "formula.functionList.SUBTOTAL.abstract",
    functionParameter: [
      {
        name: "formula.functionList.SUBTOTAL.functionParameter.functionNum.name",
        detail: "formula.functionList.SUBTOTAL.functionParameter.functionNum.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SUBTOTAL.functionParameter.ref1.name",
        detail: "formula.functionList.SUBTOTAL.functionParameter.ref1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SUBTOTAL.functionParameter.ref2.name",
        detail: "formula.functionList.SUBTOTAL.functionParameter.ref2.detail",
        example: "B1:B20",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "SUM" /* SUM */,
    aliasFunctionName: "formula.functionList.SUM.aliasFunctionName",
    functionType: 2 /* Math */,
    description: "formula.functionList.SUM.description",
    abstract: "formula.functionList.SUM.abstract",
    functionParameter: [
      {
        name: "formula.functionList.SUM.functionParameter.number1.name",
        detail: "formula.functionList.SUM.functionParameter.number1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SUM.functionParameter.number2.name",
        detail: "formula.functionList.SUM.functionParameter.number2.detail",
        example: "B2:B10",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "SUMIF" /* SUMIF */,
    aliasFunctionName: "formula.functionList.SUMIF.aliasFunctionName",
    functionType: 2 /* Math */,
    description: "formula.functionList.SUMIF.description",
    abstract: "formula.functionList.SUMIF.abstract",
    functionParameter: [
      {
        name: "formula.functionList.SUMIF.functionParameter.range.name",
        detail: "formula.functionList.SUMIF.functionParameter.range.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SUMIF.functionParameter.criteria.name",
        detail: "formula.functionList.SUMIF.functionParameter.criteria.detail",
        example: '">5"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SUMIF.functionParameter.sumRange.name",
        detail: "formula.functionList.SUMIF.functionParameter.sumRange.detail",
        example: "B1:B20",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "SUMIFS" /* SUMIFS */,
    functionType: 2 /* Math */,
    description: "formula.functionList.SUMIFS.description",
    abstract: "formula.functionList.SUMIFS.abstract",
    functionParameter: [
      {
        name: "formula.functionList.SUMIFS.functionParameter.sumRange.name",
        detail: "formula.functionList.SUMIFS.functionParameter.sumRange.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SUMIFS.functionParameter.criteriaRange1.name",
        detail: "formula.functionList.SUMIFS.functionParameter.criteriaRange1.detail",
        example: "B1:B20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SUMIFS.functionParameter.criteria1.name",
        detail: "formula.functionList.SUMIFS.functionParameter.criteria1.detail",
        example: '">10"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SUMIFS.functionParameter.criteriaRange2.name",
        detail: "formula.functionList.SUMIFS.functionParameter.criteriaRange2.detail",
        example: "C1:C20",
        require: 0,
        repeat: 1
      },
      {
        name: "formula.functionList.SUMIFS.functionParameter.criteria2.name",
        detail: "formula.functionList.SUMIFS.functionParameter.criteria2.detail",
        example: '"<20"',
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "SUMPRODUCT" /* SUMPRODUCT */,
    functionType: 2 /* Math */,
    description: "formula.functionList.SUMPRODUCT.description",
    abstract: "formula.functionList.SUMPRODUCT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.SUMPRODUCT.functionParameter.array1.name",
        detail: "formula.functionList.SUMPRODUCT.functionParameter.array1.detail",
        example: "C2:C5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SUMPRODUCT.functionParameter.array2.name",
        detail: "formula.functionList.SUMPRODUCT.functionParameter.array2.detail",
        example: "D2:D5",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "SUMSQ" /* SUMSQ */,
    functionType: 2 /* Math */,
    description: "formula.functionList.SUMSQ.description",
    abstract: "formula.functionList.SUMSQ.abstract",
    functionParameter: [
      {
        name: "formula.functionList.SUMSQ.functionParameter.number1.name",
        detail: "formula.functionList.SUMSQ.functionParameter.number1.detail",
        example: "3",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SUMSQ.functionParameter.number2.name",
        detail: "formula.functionList.SUMSQ.functionParameter.number2.detail",
        example: "4",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "SUMX2MY2" /* SUMX2MY2 */,
    functionType: 2 /* Math */,
    description: "formula.functionList.SUMX2MY2.description",
    abstract: "formula.functionList.SUMX2MY2.abstract",
    functionParameter: [
      {
        name: "formula.functionList.SUMX2MY2.functionParameter.arrayX.name",
        detail: "formula.functionList.SUMX2MY2.functionParameter.arrayX.detail",
        example: "A2:A8",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SUMX2MY2.functionParameter.arrayY.name",
        detail: "formula.functionList.SUMX2MY2.functionParameter.arrayY.detail",
        example: "B2:B8",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "SUMX2PY2" /* SUMX2PY2 */,
    functionType: 2 /* Math */,
    description: "formula.functionList.SUMX2PY2.description",
    abstract: "formula.functionList.SUMX2PY2.abstract",
    functionParameter: [
      {
        name: "formula.functionList.SUMX2PY2.functionParameter.arrayX.name",
        detail: "formula.functionList.SUMX2PY2.functionParameter.arrayX.detail",
        example: "A2:A8",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SUMX2PY2.functionParameter.arrayY.name",
        detail: "formula.functionList.SUMX2PY2.functionParameter.arrayY.detail",
        example: "B2:B8",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "SUMXMY2" /* SUMXMY2 */,
    functionType: 2 /* Math */,
    description: "formula.functionList.SUMXMY2.description",
    abstract: "formula.functionList.SUMXMY2.abstract",
    functionParameter: [
      {
        name: "formula.functionList.SUMXMY2.functionParameter.arrayX.name",
        detail: "formula.functionList.SUMXMY2.functionParameter.arrayX.detail",
        example: "A2:A8",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SUMXMY2.functionParameter.arrayY.name",
        detail: "formula.functionList.SUMXMY2.functionParameter.arrayY.detail",
        example: "B2:B8",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "TAN" /* TAN */,
    functionType: 2 /* Math */,
    description: "formula.functionList.TAN.description",
    abstract: "formula.functionList.TAN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.TAN.functionParameter.number.name",
        detail: "formula.functionList.TAN.functionParameter.number.detail",
        example: "1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "TANH" /* TANH */,
    functionType: 2 /* Math */,
    description: "formula.functionList.TANH.description",
    abstract: "formula.functionList.TANH.abstract",
    functionParameter: [
      {
        name: "formula.functionList.TANH.functionParameter.number.name",
        detail: "formula.functionList.TANH.functionParameter.number.detail",
        example: "1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "TRUNC" /* TRUNC */,
    functionType: 2 /* Math */,
    description: "formula.functionList.TRUNC.description",
    abstract: "formula.functionList.TRUNC.abstract",
    functionParameter: [
      {
        name: "formula.functionList.TRUNC.functionParameter.number.name",
        detail: "formula.functionList.TRUNC.functionParameter.number.detail",
        example: "0.45",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.TRUNC.functionParameter.numDigits.name",
        detail: "formula.functionList.TRUNC.functionParameter.numDigits.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  }
];

// ../packages/sheets-formula/src/services/function-list/statistical.ts
var FUNCTION_LIST_STATISTICAL = [
  {
    functionName: "AVEDEV" /* AVEDEV */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.AVEDEV.description",
    abstract: "formula.functionList.AVEDEV.abstract",
    functionParameter: [
      {
        name: "formula.functionList.AVEDEV.functionParameter.number1.name",
        detail: "formula.functionList.AVEDEV.functionParameter.number1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.AVEDEV.functionParameter.number2.name",
        detail: "formula.functionList.AVEDEV.functionParameter.number2.detail",
        example: "B1:B20",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "AVERAGE" /* AVERAGE */,
    aliasFunctionName: "formula.functionList.AVERAGE.aliasFunctionName",
    functionType: 3 /* Statistical */,
    description: "formula.functionList.AVERAGE.description",
    abstract: "formula.functionList.AVERAGE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.AVERAGE.functionParameter.number1.name",
        detail: "formula.functionList.AVERAGE.functionParameter.number1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.AVERAGE.functionParameter.number2.name",
        detail: "formula.functionList.AVERAGE.functionParameter.number2.detail",
        example: "B1:B20",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "AVERAGE.WEIGHTED" /* AVERAGE_WEIGHTED */,
    aliasFunctionName: "formula.functionList.AVERAGE_WEIGHTED.aliasFunctionName",
    functionType: 3 /* Statistical */,
    description: "formula.functionList.AVERAGE_WEIGHTED.description",
    abstract: "formula.functionList.AVERAGE_WEIGHTED.abstract",
    functionParameter: [
      {
        name: "formula.functionList.AVERAGE_WEIGHTED.functionParameter.values.name",
        detail: "formula.functionList.AVERAGE_WEIGHTED.functionParameter.values.detail",
        example: "10",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.AVERAGE_WEIGHTED.functionParameter.weights.name",
        detail: "formula.functionList.AVERAGE_WEIGHTED.functionParameter.weights.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.AVERAGE_WEIGHTED.functionParameter.additionalValues.name",
        detail: "formula.functionList.AVERAGE_WEIGHTED.functionParameter.additionalValues.detail",
        example: "20",
        require: 0,
        repeat: 1
      },
      {
        name: "formula.functionList.AVERAGE_WEIGHTED.functionParameter.additionalWeights.name",
        detail: "formula.functionList.AVERAGE_WEIGHTED.functionParameter.additionalWeights.detail",
        example: "3",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "AVERAGEA" /* AVERAGEA */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.AVERAGEA.description",
    abstract: "formula.functionList.AVERAGEA.abstract",
    functionParameter: [
      {
        name: "formula.functionList.AVERAGEA.functionParameter.value1.name",
        detail: "formula.functionList.AVERAGEA.functionParameter.value1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.AVERAGEA.functionParameter.value2.name",
        detail: "formula.functionList.AVERAGEA.functionParameter.value2.detail",
        example: "B1:B20",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "AVERAGEIF" /* AVERAGEIF */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.AVERAGEIF.description",
    abstract: "formula.functionList.AVERAGEIF.abstract",
    functionParameter: [
      {
        name: "formula.functionList.AVERAGEIF.functionParameter.range.name",
        detail: "formula.functionList.AVERAGEIF.functionParameter.range.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.AVERAGEIF.functionParameter.criteria.name",
        detail: "formula.functionList.AVERAGEIF.functionParameter.criteria.detail",
        example: '">5"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.AVERAGEIF.functionParameter.averageRange.name",
        detail: "formula.functionList.AVERAGEIF.functionParameter.averageRange.detail",
        example: "B1:B20",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "AVERAGEIFS" /* AVERAGEIFS */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.AVERAGEIFS.description",
    abstract: "formula.functionList.AVERAGEIFS.abstract",
    functionParameter: [
      {
        name: "formula.functionList.AVERAGEIFS.functionParameter.averageRange.name",
        detail: "formula.functionList.AVERAGEIFS.functionParameter.averageRange.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.AVERAGEIFS.functionParameter.criteriaRange1.name",
        detail: "formula.functionList.AVERAGEIFS.functionParameter.criteriaRange1.detail",
        example: "B1:B20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.AVERAGEIFS.functionParameter.criteria1.name",
        detail: "formula.functionList.AVERAGEIFS.functionParameter.criteria1.detail",
        example: '">10"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.AVERAGEIFS.functionParameter.criteriaRange2.name",
        detail: "formula.functionList.AVERAGEIFS.functionParameter.criteriaRange2.detail",
        example: "C1:C20",
        require: 0,
        repeat: 1
      },
      {
        name: "formula.functionList.AVERAGEIFS.functionParameter.criteria2.name",
        detail: "formula.functionList.AVERAGEIFS.functionParameter.criteria2.detail",
        example: '"<20"',
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "BETA.DIST" /* BETA_DIST */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.BETA_DIST.description",
    abstract: "formula.functionList.BETA_DIST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.BETA_DIST.functionParameter.x.name",
        detail: "formula.functionList.BETA_DIST.functionParameter.x.detail",
        example: "2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BETA_DIST.functionParameter.alpha.name",
        detail: "formula.functionList.BETA_DIST.functionParameter.alpha.detail",
        example: "8",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BETA_DIST.functionParameter.beta.name",
        detail: "formula.functionList.BETA_DIST.functionParameter.beta.detail",
        example: "10",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BETA_DIST.functionParameter.cumulative.name",
        detail: "formula.functionList.BETA_DIST.functionParameter.cumulative.detail",
        example: "true",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BETA_DIST.functionParameter.A.name",
        detail: "formula.functionList.BETA_DIST.functionParameter.A.detail",
        example: "1",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.BETA_DIST.functionParameter.B.name",
        detail: "formula.functionList.BETA_DIST.functionParameter.B.detail",
        example: "3",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "BETA.INV" /* BETA_INV */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.BETA_INV.description",
    abstract: "formula.functionList.BETA_INV.abstract",
    functionParameter: [
      {
        name: "formula.functionList.BETA_INV.functionParameter.probability.name",
        detail: "formula.functionList.BETA_INV.functionParameter.probability.detail",
        example: "0.685470581",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BETA_INV.functionParameter.alpha.name",
        detail: "formula.functionList.BETA_INV.functionParameter.alpha.detail",
        example: "8",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BETA_INV.functionParameter.beta.name",
        detail: "formula.functionList.BETA_INV.functionParameter.beta.detail",
        example: "10",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BETA_INV.functionParameter.A.name",
        detail: "formula.functionList.BETA_INV.functionParameter.A.detail",
        example: "1",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.BETA_INV.functionParameter.B.name",
        detail: "formula.functionList.BETA_INV.functionParameter.B.detail",
        example: "3",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "BINOM.DIST" /* BINOM_DIST */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.BINOM_DIST.description",
    abstract: "formula.functionList.BINOM_DIST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.BINOM_DIST.functionParameter.numberS.name",
        detail: "formula.functionList.BINOM_DIST.functionParameter.numberS.detail",
        example: "6",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BINOM_DIST.functionParameter.trials.name",
        detail: "formula.functionList.BINOM_DIST.functionParameter.trials.detail",
        example: "10",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BINOM_DIST.functionParameter.probabilityS.name",
        detail: "formula.functionList.BINOM_DIST.functionParameter.probabilityS.detail",
        example: "0.5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BINOM_DIST.functionParameter.cumulative.name",
        detail: "formula.functionList.BINOM_DIST.functionParameter.cumulative.detail",
        example: "false",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "BINOM.DIST.RANGE" /* BINOM_DIST_RANGE */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.BINOM_DIST_RANGE.description",
    abstract: "formula.functionList.BINOM_DIST_RANGE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.BINOM_DIST_RANGE.functionParameter.trials.name",
        detail: "formula.functionList.BINOM_DIST_RANGE.functionParameter.trials.detail",
        example: "60",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BINOM_DIST_RANGE.functionParameter.probabilityS.name",
        detail: "formula.functionList.BINOM_DIST_RANGE.functionParameter.probabilityS.detail",
        example: "0.75",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BINOM_DIST_RANGE.functionParameter.numberS.name",
        detail: "formula.functionList.BINOM_DIST_RANGE.functionParameter.numberS.detail",
        example: "45",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BINOM_DIST_RANGE.functionParameter.numberS2.name",
        detail: "formula.functionList.BINOM_DIST_RANGE.functionParameter.numberS2.detail",
        example: "50",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "BINOM.INV" /* BINOM_INV */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.BINOM_INV.description",
    abstract: "formula.functionList.BINOM_INV.abstract",
    functionParameter: [
      {
        name: "formula.functionList.BINOM_INV.functionParameter.trials.name",
        detail: "formula.functionList.BINOM_INV.functionParameter.trials.detail",
        example: "6",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BINOM_INV.functionParameter.probabilityS.name",
        detail: "formula.functionList.BINOM_INV.functionParameter.probabilityS.detail",
        example: "0.5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.BINOM_INV.functionParameter.alpha.name",
        detail: "formula.functionList.BINOM_INV.functionParameter.alpha.detail",
        example: "0.75",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "CHISQ.DIST" /* CHISQ_DIST */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.CHISQ_DIST.description",
    abstract: "formula.functionList.CHISQ_DIST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CHISQ_DIST.functionParameter.x.name",
        detail: "formula.functionList.CHISQ_DIST.functionParameter.x.detail",
        example: "0.5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CHISQ_DIST.functionParameter.degFreedom.name",
        detail: "formula.functionList.CHISQ_DIST.functionParameter.degFreedom.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CHISQ_DIST.functionParameter.cumulative.name",
        detail: "formula.functionList.CHISQ_DIST.functionParameter.cumulative.detail",
        example: "true",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "CHISQ.DIST.RT" /* CHISQ_DIST_RT */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.CHISQ_DIST_RT.description",
    abstract: "formula.functionList.CHISQ_DIST_RT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CHISQ_DIST_RT.functionParameter.x.name",
        detail: "formula.functionList.CHISQ_DIST_RT.functionParameter.x.detail",
        example: "0.5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CHISQ_DIST_RT.functionParameter.degFreedom.name",
        detail: "formula.functionList.CHISQ_DIST_RT.functionParameter.degFreedom.detail",
        example: "1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "CHISQ.INV" /* CHISQ_INV */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.CHISQ_INV.description",
    abstract: "formula.functionList.CHISQ_INV.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CHISQ_INV.functionParameter.probability.name",
        detail: "formula.functionList.CHISQ_INV.functionParameter.probability.detail",
        example: "0.93",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CHISQ_INV.functionParameter.degFreedom.name",
        detail: "formula.functionList.CHISQ_INV.functionParameter.degFreedom.detail",
        example: "1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "CHISQ.INV.RT" /* CHISQ_INV_RT */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.CHISQ_INV_RT.description",
    abstract: "formula.functionList.CHISQ_INV_RT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CHISQ_INV_RT.functionParameter.probability.name",
        detail: "formula.functionList.CHISQ_INV_RT.functionParameter.probability.detail",
        example: "0.93",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CHISQ_INV_RT.functionParameter.degFreedom.name",
        detail: "formula.functionList.CHISQ_INV_RT.functionParameter.degFreedom.detail",
        example: "1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "CHISQ.TEST" /* CHISQ_TEST */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.CHISQ_TEST.description",
    abstract: "formula.functionList.CHISQ_TEST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CHISQ_TEST.functionParameter.actualRange.name",
        detail: "formula.functionList.CHISQ_TEST.functionParameter.actualRange.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CHISQ_TEST.functionParameter.expectedRange.name",
        detail: "formula.functionList.CHISQ_TEST.functionParameter.expectedRange.detail",
        example: "B1:B4",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "CONFIDENCE.NORM" /* CONFIDENCE_NORM */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.CONFIDENCE_NORM.description",
    abstract: "formula.functionList.CONFIDENCE_NORM.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CONFIDENCE_NORM.functionParameter.alpha.name",
        detail: "formula.functionList.CONFIDENCE_NORM.functionParameter.alpha.detail",
        example: "0.05",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CONFIDENCE_NORM.functionParameter.standardDev.name",
        detail: "formula.functionList.CONFIDENCE_NORM.functionParameter.standardDev.detail",
        example: "2.5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CONFIDENCE_NORM.functionParameter.size.name",
        detail: "formula.functionList.CONFIDENCE_NORM.functionParameter.size.detail",
        example: "50",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "CONFIDENCE.T" /* CONFIDENCE_T */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.CONFIDENCE_T.description",
    abstract: "formula.functionList.CONFIDENCE_T.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CONFIDENCE_T.functionParameter.alpha.name",
        detail: "formula.functionList.CONFIDENCE_T.functionParameter.alpha.detail",
        example: "0.05",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CONFIDENCE_T.functionParameter.standardDev.name",
        detail: "formula.functionList.CONFIDENCE_T.functionParameter.standardDev.detail",
        example: "2.5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CONFIDENCE_T.functionParameter.size.name",
        detail: "formula.functionList.CONFIDENCE_T.functionParameter.size.detail",
        example: "50",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "CORREL" /* CORREL */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.CORREL.description",
    abstract: "formula.functionList.CORREL.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CORREL.functionParameter.array1.name",
        detail: "formula.functionList.CORREL.functionParameter.array1.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CORREL.functionParameter.array2.name",
        detail: "formula.functionList.CORREL.functionParameter.array2.detail",
        example: "B1:B4",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "COUNT" /* COUNT */,
    aliasFunctionName: "formula.functionList.COUNT.aliasFunctionName",
    functionType: 3 /* Statistical */,
    description: "formula.functionList.COUNT.description",
    abstract: "formula.functionList.COUNT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.COUNT.functionParameter.value1.name",
        detail: "formula.functionList.COUNT.functionParameter.value1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.COUNT.functionParameter.value2.name",
        detail: "formula.functionList.COUNT.functionParameter.value2.detail",
        example: "B2:B10",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "COUNTA" /* COUNTA */,
    aliasFunctionName: "formula.functionList.COUNTA.aliasFunctionName",
    functionType: 3 /* Statistical */,
    description: "formula.functionList.COUNTA.description",
    abstract: "formula.functionList.COUNTA.abstract",
    functionParameter: [
      {
        name: "formula.functionList.COUNTA.functionParameter.number1.name",
        detail: "formula.functionList.COUNTA.functionParameter.number1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.COUNTA.functionParameter.number2.name",
        detail: "formula.functionList.COUNTA.functionParameter.number2.detail",
        example: "B2:B10",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "COUNTBLANK" /* COUNTBLANK */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.COUNTBLANK.description",
    abstract: "formula.functionList.COUNTBLANK.abstract",
    functionParameter: [
      {
        name: "formula.functionList.COUNTBLANK.functionParameter.range.name",
        detail: "formula.functionList.COUNTBLANK.functionParameter.range.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "COUNTIF" /* COUNTIF */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.COUNTIF.description",
    abstract: "formula.functionList.COUNTIF.abstract",
    functionParameter: [
      {
        name: "formula.functionList.COUNTIF.functionParameter.range.name",
        detail: "formula.functionList.COUNTIF.functionParameter.range.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.COUNTIF.functionParameter.criteria.name",
        detail: "formula.functionList.COUNTIF.functionParameter.criteria.detail",
        example: '">5"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "COUNTIFS" /* COUNTIFS */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.COUNTIFS.description",
    abstract: "formula.functionList.COUNTIFS.abstract",
    functionParameter: [
      {
        name: "formula.functionList.COUNTIFS.functionParameter.criteriaRange1.name",
        detail: "formula.functionList.COUNTIFS.functionParameter.criteriaRange1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.COUNTIFS.functionParameter.criteria1.name",
        detail: "formula.functionList.COUNTIFS.functionParameter.criteria1.detail",
        example: '">10"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.COUNTIFS.functionParameter.criteriaRange2.name",
        detail: "formula.functionList.COUNTIFS.functionParameter.criteriaRange2.detail",
        example: "B1:B20",
        require: 0,
        repeat: 1
      },
      {
        name: "formula.functionList.COUNTIFS.functionParameter.criteria2.name",
        detail: "formula.functionList.COUNTIFS.functionParameter.criteria2.detail",
        example: '"<20"',
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "COVARIANCE.P" /* COVARIANCE_P */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.COVARIANCE_P.description",
    abstract: "formula.functionList.COVARIANCE_P.abstract",
    functionParameter: [
      {
        name: "formula.functionList.COVARIANCE_P.functionParameter.array1.name",
        detail: "formula.functionList.COVARIANCE_P.functionParameter.array1.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.COVARIANCE_P.functionParameter.array2.name",
        detail: "formula.functionList.COVARIANCE_P.functionParameter.array2.detail",
        example: "B1:B4",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "COVARIANCE.S" /* COVARIANCE_S */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.COVARIANCE_S.description",
    abstract: "formula.functionList.COVARIANCE_S.abstract",
    functionParameter: [
      {
        name: "formula.functionList.COVARIANCE_S.functionParameter.array1.name",
        detail: "formula.functionList.COVARIANCE_S.functionParameter.array1.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.COVARIANCE_S.functionParameter.array2.name",
        detail: "formula.functionList.COVARIANCE_S.functionParameter.array2.detail",
        example: "B1:B4",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "DEVSQ" /* DEVSQ */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.DEVSQ.description",
    abstract: "formula.functionList.DEVSQ.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DEVSQ.functionParameter.number1.name",
        detail: "formula.functionList.DEVSQ.functionParameter.number1.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DEVSQ.functionParameter.number2.name",
        detail: "formula.functionList.DEVSQ.functionParameter.number2.detail",
        example: "2",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "EXPON.DIST" /* EXPON_DIST */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.EXPON_DIST.description",
    abstract: "formula.functionList.EXPON_DIST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.EXPON_DIST.functionParameter.x.name",
        detail: "formula.functionList.EXPON_DIST.functionParameter.x.detail",
        example: "0.2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.EXPON_DIST.functionParameter.lambda.name",
        detail: "formula.functionList.EXPON_DIST.functionParameter.lambda.detail",
        example: "10",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.EXPON_DIST.functionParameter.cumulative.name",
        detail: "formula.functionList.EXPON_DIST.functionParameter.cumulative.detail",
        example: "true",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "F.DIST" /* F_DIST */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.F_DIST.description",
    abstract: "formula.functionList.F_DIST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.F_DIST.functionParameter.x.name",
        detail: "formula.functionList.F_DIST.functionParameter.x.detail",
        example: "15.2069",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.F_DIST.functionParameter.degFreedom1.name",
        detail: "formula.functionList.F_DIST.functionParameter.degFreedom1.detail",
        example: "6",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.F_DIST.functionParameter.degFreedom2.name",
        detail: "formula.functionList.F_DIST.functionParameter.degFreedom2.detail",
        example: "4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.F_DIST.functionParameter.cumulative.name",
        detail: "formula.functionList.F_DIST.functionParameter.cumulative.detail",
        example: "true",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "F.DIST.RT" /* F_DIST_RT */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.F_DIST_RT.description",
    abstract: "formula.functionList.F_DIST_RT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.F_DIST_RT.functionParameter.x.name",
        detail: "formula.functionList.F_DIST_RT.functionParameter.x.detail",
        example: "15.2069",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.F_DIST_RT.functionParameter.degFreedom1.name",
        detail: "formula.functionList.F_DIST_RT.functionParameter.degFreedom1.detail",
        example: "6",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.F_DIST_RT.functionParameter.degFreedom2.name",
        detail: "formula.functionList.F_DIST_RT.functionParameter.degFreedom2.detail",
        example: "4",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "F.INV" /* F_INV */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.F_INV.description",
    abstract: "formula.functionList.F_INV.abstract",
    functionParameter: [
      {
        name: "formula.functionList.F_INV.functionParameter.probability.name",
        detail: "formula.functionList.F_INV.functionParameter.probability.detail",
        example: "0.01",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.F_INV.functionParameter.degFreedom1.name",
        detail: "formula.functionList.F_INV.functionParameter.degFreedom1.detail",
        example: "6",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.F_INV.functionParameter.degFreedom2.name",
        detail: "formula.functionList.F_INV.functionParameter.degFreedom2.detail",
        example: "4",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "F.INV.RT" /* F_INV_RT */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.F_INV_RT.description",
    abstract: "formula.functionList.F_INV_RT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.F_INV_RT.functionParameter.probability.name",
        detail: "formula.functionList.F_INV_RT.functionParameter.probability.detail",
        example: "0.01",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.F_INV_RT.functionParameter.degFreedom1.name",
        detail: "formula.functionList.F_INV_RT.functionParameter.degFreedom1.detail",
        example: "6",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.F_INV_RT.functionParameter.degFreedom2.name",
        detail: "formula.functionList.F_INV_RT.functionParameter.degFreedom2.detail",
        example: "4",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "F.TEST" /* F_TEST */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.F_TEST.description",
    abstract: "formula.functionList.F_TEST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.F_TEST.functionParameter.array1.name",
        detail: "formula.functionList.F_TEST.functionParameter.array1.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.F_TEST.functionParameter.array2.name",
        detail: "formula.functionList.F_TEST.functionParameter.array2.detail",
        example: "B1:B4",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "FISHER" /* FISHER */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.FISHER.description",
    abstract: "formula.functionList.FISHER.abstract",
    functionParameter: [
      {
        name: "formula.functionList.FISHER.functionParameter.x.name",
        detail: "formula.functionList.FISHER.functionParameter.x.detail",
        example: "0.75",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "FISHERINV" /* FISHERINV */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.FISHERINV.description",
    abstract: "formula.functionList.FISHERINV.abstract",
    functionParameter: [
      {
        name: "formula.functionList.FISHERINV.functionParameter.y.name",
        detail: "formula.functionList.FISHERINV.functionParameter.y.detail",
        example: "0.75",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "FORECAST" /* FORECAST */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.FORECAST.description",
    abstract: "formula.functionList.FORECAST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.FORECAST.functionParameter.x.name",
        detail: "formula.functionList.FORECAST.functionParameter.x.detail",
        example: "30",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.FORECAST.functionParameter.knownYs.name",
        detail: "formula.functionList.FORECAST.functionParameter.knownYs.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.FORECAST.functionParameter.knownXs.name",
        detail: "formula.functionList.FORECAST.functionParameter.knownXs.detail",
        example: "B1:B4",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "FORECAST.ETS" /* FORECAST_ETS */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.FORECAST_ETS.description",
    abstract: "formula.functionList.FORECAST_ETS.abstract",
    functionParameter: [
      {
        name: "formula.functionList.FORECAST_ETS.functionParameter.number1.name",
        detail: "formula.functionList.FORECAST_ETS.functionParameter.number1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.FORECAST_ETS.functionParameter.number2.name",
        detail: "formula.functionList.FORECAST_ETS.functionParameter.number2.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "FORECAST.ETS.CONFINT" /* FORECAST_ETS_CONFINT */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.FORECAST_ETS_CONFINT.description",
    abstract: "formula.functionList.FORECAST_ETS_CONFINT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.FORECAST_ETS_CONFINT.functionParameter.number1.name",
        detail: "formula.functionList.FORECAST_ETS_CONFINT.functionParameter.number1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.FORECAST_ETS_CONFINT.functionParameter.number2.name",
        detail: "formula.functionList.FORECAST_ETS_CONFINT.functionParameter.number2.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "FORECAST.ETS.SEASONALITY" /* FORECAST_ETS_SEASONALITY */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.FORECAST_ETS_SEASONALITY.description",
    abstract: "formula.functionList.FORECAST_ETS_SEASONALITY.abstract",
    functionParameter: [
      {
        name: "formula.functionList.FORECAST_ETS_SEASONALITY.functionParameter.number1.name",
        detail: "formula.functionList.FORECAST_ETS_SEASONALITY.functionParameter.number1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.FORECAST_ETS_SEASONALITY.functionParameter.number2.name",
        detail: "formula.functionList.FORECAST_ETS_SEASONALITY.functionParameter.number2.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "FORECAST.ETS.STAT" /* FORECAST_ETS_STAT */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.FORECAST_ETS_STAT.description",
    abstract: "formula.functionList.FORECAST_ETS_STAT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.FORECAST_ETS_STAT.functionParameter.number1.name",
        detail: "formula.functionList.FORECAST_ETS_STAT.functionParameter.number1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.FORECAST_ETS_STAT.functionParameter.number2.name",
        detail: "formula.functionList.FORECAST_ETS_STAT.functionParameter.number2.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "FORECAST.LINEAR" /* FORECAST_LINEAR */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.FORECAST_LINEAR.description",
    abstract: "formula.functionList.FORECAST_LINEAR.abstract",
    functionParameter: [
      {
        name: "formula.functionList.FORECAST_LINEAR.functionParameter.x.name",
        detail: "formula.functionList.FORECAST_LINEAR.functionParameter.x.detail",
        example: "30",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.FORECAST_LINEAR.functionParameter.knownYs.name",
        detail: "formula.functionList.FORECAST_LINEAR.functionParameter.knownYs.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.FORECAST_LINEAR.functionParameter.knownXs.name",
        detail: "formula.functionList.FORECAST_LINEAR.functionParameter.knownXs.detail",
        example: "B1:B4",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "FREQUENCY" /* FREQUENCY */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.FREQUENCY.description",
    abstract: "formula.functionList.FREQUENCY.abstract",
    functionParameter: [
      {
        name: "formula.functionList.FREQUENCY.functionParameter.dataArray.name",
        detail: "formula.functionList.FREQUENCY.functionParameter.dataArray.detail",
        example: "A2:A10",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.FREQUENCY.functionParameter.binsArray.name",
        detail: "formula.functionList.FREQUENCY.functionParameter.binsArray.detail",
        example: "B2:B4",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "GAMMA" /* GAMMA */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.GAMMA.description",
    abstract: "formula.functionList.GAMMA.abstract",
    functionParameter: [
      {
        name: "formula.functionList.GAMMA.functionParameter.number.name",
        detail: "formula.functionList.GAMMA.functionParameter.number.detail",
        example: "2.5",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "GAMMA.DIST" /* GAMMA_DIST */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.GAMMA_DIST.description",
    abstract: "formula.functionList.GAMMA_DIST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.GAMMA_DIST.functionParameter.x.name",
        detail: "formula.functionList.GAMMA_DIST.functionParameter.x.detail",
        example: "10",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.GAMMA_DIST.functionParameter.alpha.name",
        detail: "formula.functionList.GAMMA_DIST.functionParameter.alpha.detail",
        example: "8",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.GAMMA_DIST.functionParameter.beta.name",
        detail: "formula.functionList.GAMMA_DIST.functionParameter.beta.detail",
        example: "2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.GAMMA_DIST.functionParameter.cumulative.name",
        detail: "formula.functionList.GAMMA_DIST.functionParameter.cumulative.detail",
        example: "true",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "GAMMA.INV" /* GAMMA_INV */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.GAMMA_INV.description",
    abstract: "formula.functionList.GAMMA_INV.abstract",
    functionParameter: [
      {
        name: "formula.functionList.GAMMA_INV.functionParameter.probability.name",
        detail: "formula.functionList.GAMMA_INV.functionParameter.probability.detail",
        example: "0.068094",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.GAMMA_INV.functionParameter.alpha.name",
        detail: "formula.functionList.GAMMA_INV.functionParameter.alpha.detail",
        example: "9",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.GAMMA_INV.functionParameter.beta.name",
        detail: "formula.functionList.GAMMA_INV.functionParameter.beta.detail",
        example: "2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "GAMMALN" /* GAMMALN */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.GAMMALN.description",
    abstract: "formula.functionList.GAMMALN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.GAMMALN.functionParameter.x.name",
        detail: "formula.functionList.GAMMALN.functionParameter.x.detail",
        example: "4",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "GAMMALN.PRECISE" /* GAMMALN_PRECISE */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.GAMMALN_PRECISE.description",
    abstract: "formula.functionList.GAMMALN_PRECISE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.GAMMALN_PRECISE.functionParameter.x.name",
        detail: "formula.functionList.GAMMALN_PRECISE.functionParameter.x.detail",
        example: "4",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "GAUSS" /* GAUSS */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.GAUSS.description",
    abstract: "formula.functionList.GAUSS.abstract",
    functionParameter: [
      {
        name: "formula.functionList.GAUSS.functionParameter.z.name",
        detail: "formula.functionList.GAUSS.functionParameter.z.detail",
        example: "2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "GEOMEAN" /* GEOMEAN */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.GEOMEAN.description",
    abstract: "formula.functionList.GEOMEAN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.GEOMEAN.functionParameter.number1.name",
        detail: "formula.functionList.GEOMEAN.functionParameter.number1.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.GEOMEAN.functionParameter.number2.name",
        detail: "formula.functionList.GEOMEAN.functionParameter.number2.detail",
        example: "2",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "GROWTH" /* GROWTH */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.GROWTH.description",
    abstract: "formula.functionList.GROWTH.abstract",
    functionParameter: [
      {
        name: "formula.functionList.GROWTH.functionParameter.knownYs.name",
        detail: "formula.functionList.GROWTH.functionParameter.knownYs.detail",
        example: "B2:B7",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.GROWTH.functionParameter.knownXs.name",
        detail: "formula.functionList.GROWTH.functionParameter.knownXs.detail",
        example: "A2:A7",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.GROWTH.functionParameter.newXs.name",
        detail: "formula.functionList.GROWTH.functionParameter.newXs.detail",
        example: "A9:A10",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.GROWTH.functionParameter.constb.name",
        detail: "formula.functionList.GROWTH.functionParameter.constb.detail",
        example: "true",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "HARMEAN" /* HARMEAN */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.HARMEAN.description",
    abstract: "formula.functionList.HARMEAN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.HARMEAN.functionParameter.number1.name",
        detail: "formula.functionList.HARMEAN.functionParameter.number1.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.HARMEAN.functionParameter.number2.name",
        detail: "formula.functionList.HARMEAN.functionParameter.number2.detail",
        example: "2",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "HYPGEOM.DIST" /* HYPGEOM_DIST */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.HYPGEOM_DIST.description",
    abstract: "formula.functionList.HYPGEOM_DIST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.HYPGEOM_DIST.functionParameter.sampleS.name",
        detail: "formula.functionList.HYPGEOM_DIST.functionParameter.sampleS.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.HYPGEOM_DIST.functionParameter.numberSample.name",
        detail: "formula.functionList.HYPGEOM_DIST.functionParameter.numberSample.detail",
        example: "4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.HYPGEOM_DIST.functionParameter.populationS.name",
        detail: "formula.functionList.HYPGEOM_DIST.functionParameter.populationS.detail",
        example: "8",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.HYPGEOM_DIST.functionParameter.numberPop.name",
        detail: "formula.functionList.HYPGEOM_DIST.functionParameter.numberPop.detail",
        example: "20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.HYPGEOM_DIST.functionParameter.cumulative.name",
        detail: "formula.functionList.HYPGEOM_DIST.functionParameter.cumulative.detail",
        example: "true",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "INTERCEPT" /* INTERCEPT */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.INTERCEPT.description",
    abstract: "formula.functionList.INTERCEPT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.INTERCEPT.functionParameter.knownYs.name",
        detail: "formula.functionList.INTERCEPT.functionParameter.knownYs.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.INTERCEPT.functionParameter.knownXs.name",
        detail: "formula.functionList.INTERCEPT.functionParameter.knownXs.detail",
        example: "B1:B4",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "KURT" /* KURT */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.KURT.description",
    abstract: "formula.functionList.KURT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.KURT.functionParameter.number1.name",
        detail: "formula.functionList.KURT.functionParameter.number1.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.KURT.functionParameter.number2.name",
        detail: "formula.functionList.KURT.functionParameter.number2.detail",
        example: "4",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "LARGE" /* LARGE */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.LARGE.description",
    abstract: "formula.functionList.LARGE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.LARGE.functionParameter.array.name",
        detail: "formula.functionList.LARGE.functionParameter.array.detail",
        example: "A2:B6",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.LARGE.functionParameter.k.name",
        detail: "formula.functionList.LARGE.functionParameter.k.detail",
        example: "3",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "LINEST" /* LINEST */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.LINEST.description",
    abstract: "formula.functionList.LINEST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.LINEST.functionParameter.knownYs.name",
        detail: "formula.functionList.LINEST.functionParameter.knownYs.detail",
        example: "B2:B7",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.LINEST.functionParameter.knownXs.name",
        detail: "formula.functionList.LINEST.functionParameter.knownXs.detail",
        example: "A2:A7",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.LINEST.functionParameter.constb.name",
        detail: "formula.functionList.LINEST.functionParameter.constb.detail",
        example: "true",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.LINEST.functionParameter.stats.name",
        detail: "formula.functionList.LINEST.functionParameter.stats.detail",
        example: "true",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "LOGEST" /* LOGEST */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.LOGEST.description",
    abstract: "formula.functionList.LOGEST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.LOGEST.functionParameter.knownYs.name",
        detail: "formula.functionList.LOGEST.functionParameter.knownYs.detail",
        example: "B2:B7",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.LOGEST.functionParameter.knownXs.name",
        detail: "formula.functionList.LOGEST.functionParameter.knownXs.detail",
        example: "A2:A7",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.LOGEST.functionParameter.constb.name",
        detail: "formula.functionList.LOGEST.functionParameter.constb.detail",
        example: "true",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.LOGEST.functionParameter.stats.name",
        detail: "formula.functionList.LOGEST.functionParameter.stats.detail",
        example: "true",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "LOGNORM.DIST" /* LOGNORM_DIST */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.LOGNORM_DIST.description",
    abstract: "formula.functionList.LOGNORM_DIST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.LOGNORM_DIST.functionParameter.x.name",
        detail: "formula.functionList.LOGNORM_DIST.functionParameter.x.detail",
        example: "42",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.LOGNORM_DIST.functionParameter.mean.name",
        detail: "formula.functionList.LOGNORM_DIST.functionParameter.mean.detail",
        example: "40",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.LOGNORM_DIST.functionParameter.standardDev.name",
        detail: "formula.functionList.LOGNORM_DIST.functionParameter.standardDev.detail",
        example: "1.5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.LOGNORM_DIST.functionParameter.cumulative.name",
        detail: "formula.functionList.LOGNORM_DIST.functionParameter.cumulative.detail",
        example: "true",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "LOGNORM.INV" /* LOGNORM_INV */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.LOGNORM_INV.description",
    abstract: "formula.functionList.LOGNORM_INV.abstract",
    functionParameter: [
      {
        name: "formula.functionList.LOGNORM_INV.functionParameter.probability.name",
        detail: "formula.functionList.LOGNORM_INV.functionParameter.probability.detail",
        example: "0.908789",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.LOGNORM_INV.functionParameter.mean.name",
        detail: "formula.functionList.LOGNORM_INV.functionParameter.mean.detail",
        example: "40",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.LOGNORM_INV.functionParameter.standardDev.name",
        detail: "formula.functionList.LOGNORM_INV.functionParameter.standardDev.detail",
        example: "1.5",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "MARGINOFERROR" /* MARGINOFERROR */,
    aliasFunctionName: "formula.functionList.MARGINOFERROR.aliasFunctionName",
    functionType: 3 /* Statistical */,
    description: "formula.functionList.MARGINOFERROR.description",
    abstract: "formula.functionList.MARGINOFERROR.abstract",
    functionParameter: [
      {
        name: "formula.functionList.MARGINOFERROR.functionParameter.range.name",
        detail: "formula.functionList.MARGINOFERROR.functionParameter.range.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MARGINOFERROR.functionParameter.confidence.name",
        detail: "formula.functionList.MARGINOFERROR.functionParameter.confidence.detail",
        example: "0.95",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "MAX" /* MAX */,
    aliasFunctionName: "formula.functionList.MAX.aliasFunctionName",
    functionType: 3 /* Statistical */,
    description: "formula.functionList.MAX.description",
    abstract: "formula.functionList.MAX.abstract",
    functionParameter: [
      {
        name: "formula.functionList.MAX.functionParameter.number1.name",
        detail: "formula.functionList.MAX.functionParameter.number1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MAX.functionParameter.number2.name",
        detail: "formula.functionList.MAX.functionParameter.number2.detail",
        example: "B2:B10",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "MAXA" /* MAXA */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.MAXA.description",
    abstract: "formula.functionList.MAXA.abstract",
    functionParameter: [
      {
        name: "formula.functionList.MAXA.functionParameter.value1.name",
        detail: "formula.functionList.MAXA.functionParameter.value1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MAXA.functionParameter.value2.name",
        detail: "formula.functionList.MAXA.functionParameter.value2.detail",
        example: "B1:B20",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "MAXIFS" /* MAXIFS */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.MAXIFS.description",
    abstract: "formula.functionList.MAXIFS.abstract",
    functionParameter: [
      {
        name: "formula.functionList.MAXIFS.functionParameter.maxRange.name",
        detail: "formula.functionList.MAXIFS.functionParameter.maxRange.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MAXIFS.functionParameter.criteriaRange1.name",
        detail: "formula.functionList.MAXIFS.functionParameter.criteriaRange1.detail",
        example: "B1:B20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MAXIFS.functionParameter.criteria1.name",
        detail: "formula.functionList.MAXIFS.functionParameter.criteria1.detail",
        example: '">10"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MAXIFS.functionParameter.criteriaRange2.name",
        detail: "formula.functionList.MAXIFS.functionParameter.criteriaRange2.detail",
        example: "C1:C20",
        require: 0,
        repeat: 1
      },
      {
        name: "formula.functionList.MAXIFS.functionParameter.criteria2.name",
        detail: "formula.functionList.MAXIFS.functionParameter.criteria2.detail",
        example: '"<20"',
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "MEDIAN" /* MEDIAN */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.MEDIAN.description",
    abstract: "formula.functionList.MEDIAN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.MEDIAN.functionParameter.number1.name",
        detail: "formula.functionList.MEDIAN.functionParameter.number1.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MEDIAN.functionParameter.number2.name",
        detail: "formula.functionList.MEDIAN.functionParameter.number2.detail",
        example: "2",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "MIN" /* MIN */,
    aliasFunctionName: "formula.functionList.MIN.aliasFunctionName",
    functionType: 3 /* Statistical */,
    description: "formula.functionList.MIN.description",
    abstract: "formula.functionList.MIN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.MIN.functionParameter.number1.name",
        detail: "formula.functionList.MIN.functionParameter.number1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MIN.functionParameter.number2.name",
        detail: "formula.functionList.MIN.functionParameter.number2.detail",
        example: "B2:B10",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "MINA" /* MINA */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.MINA.description",
    abstract: "formula.functionList.MINA.abstract",
    functionParameter: [
      {
        name: "formula.functionList.MINA.functionParameter.value1.name",
        detail: "formula.functionList.MINA.functionParameter.value1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MINA.functionParameter.value2.name",
        detail: "formula.functionList.MINA.functionParameter.value2.detail",
        example: "B1:B20",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "MINIFS" /* MINIFS */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.MINIFS.description",
    abstract: "formula.functionList.MINIFS.abstract",
    functionParameter: [
      {
        name: "formula.functionList.MINIFS.functionParameter.minRange.name",
        detail: "formula.functionList.MINIFS.functionParameter.minRange.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MINIFS.functionParameter.criteriaRange1.name",
        detail: "formula.functionList.MINIFS.functionParameter.criteriaRange1.detail",
        example: "B1:B20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MINIFS.functionParameter.criteria1.name",
        detail: "formula.functionList.MINIFS.functionParameter.criteria1.detail",
        example: '">10"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MINIFS.functionParameter.criteriaRange2.name",
        detail: "formula.functionList.MINIFS.functionParameter.criteriaRange2.detail",
        example: "C1:C20",
        require: 0,
        repeat: 1
      },
      {
        name: "formula.functionList.MINIFS.functionParameter.criteria2.name",
        detail: "formula.functionList.MINIFS.functionParameter.criteria2.detail",
        example: '"<20"',
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "MODE.MULT" /* MODE_MULT */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.MODE_MULT.description",
    abstract: "formula.functionList.MODE_MULT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.MODE_MULT.functionParameter.number1.name",
        detail: "formula.functionList.MODE_MULT.functionParameter.number1.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MODE_MULT.functionParameter.number2.name",
        detail: "formula.functionList.MODE_MULT.functionParameter.number2.detail",
        example: "2",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "MODE.SNGL" /* MODE_SNGL */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.MODE_SNGL.description",
    abstract: "formula.functionList.MODE_SNGL.abstract",
    functionParameter: [
      {
        name: "formula.functionList.MODE_SNGL.functionParameter.number1.name",
        detail: "formula.functionList.MODE_SNGL.functionParameter.number1.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MODE_SNGL.functionParameter.number2.name",
        detail: "formula.functionList.MODE_SNGL.functionParameter.number2.detail",
        example: "2",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "NEGBINOM.DIST" /* NEGBINOM_DIST */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.NEGBINOM_DIST.description",
    abstract: "formula.functionList.NEGBINOM_DIST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.NEGBINOM_DIST.functionParameter.numberF.name",
        detail: "formula.functionList.NEGBINOM_DIST.functionParameter.numberF.detail",
        example: "10",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.NEGBINOM_DIST.functionParameter.numberS.name",
        detail: "formula.functionList.NEGBINOM_DIST.functionParameter.numberS.detail",
        example: "5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.NEGBINOM_DIST.functionParameter.probabilityS.name",
        detail: "formula.functionList.NEGBINOM_DIST.functionParameter.probabilityS.detail",
        example: "0.25",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.NEGBINOM_DIST.functionParameter.cumulative.name",
        detail: "formula.functionList.NEGBINOM_DIST.functionParameter.cumulative.detail",
        example: "true",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "NORM.DIST" /* NORM_DIST */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.NORM_DIST.description",
    abstract: "formula.functionList.NORM_DIST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.NORM_DIST.functionParameter.x.name",
        detail: "formula.functionList.NORM_DIST.functionParameter.x.detail",
        example: "42",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.NORM_DIST.functionParameter.mean.name",
        detail: "formula.functionList.NORM_DIST.functionParameter.mean.detail",
        example: "40",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.NORM_DIST.functionParameter.standardDev.name",
        detail: "formula.functionList.NORM_DIST.functionParameter.standardDev.detail",
        example: "1.5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.NORM_DIST.functionParameter.cumulative.name",
        detail: "formula.functionList.NORM_DIST.functionParameter.cumulative.detail",
        example: "true",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "NORM.INV" /* NORM_INV */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.NORM_INV.description",
    abstract: "formula.functionList.NORM_INV.abstract",
    functionParameter: [
      {
        name: "formula.functionList.NORM_INV.functionParameter.probability.name",
        detail: "formula.functionList.NORM_INV.functionParameter.probability.detail",
        example: "0.908789",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.NORM_INV.functionParameter.mean.name",
        detail: "formula.functionList.NORM_INV.functionParameter.mean.detail",
        example: "40",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.NORM_INV.functionParameter.standardDev.name",
        detail: "formula.functionList.NORM_INV.functionParameter.standardDev.detail",
        example: "1.5",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "NORM.S.DIST" /* NORM_S_DIST */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.NORM_S_DIST.description",
    abstract: "formula.functionList.NORM_S_DIST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.NORM_S_DIST.functionParameter.z.name",
        detail: "formula.functionList.NORM_S_DIST.functionParameter.z.detail",
        example: "1.333333",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.NORM_S_DIST.functionParameter.cumulative.name",
        detail: "formula.functionList.NORM_S_DIST.functionParameter.cumulative.detail",
        example: "true",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "NORM.S.INV" /* NORM_S_INV */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.NORM_S_INV.description",
    abstract: "formula.functionList.NORM_S_INV.abstract",
    functionParameter: [
      {
        name: "formula.functionList.NORM_S_INV.functionParameter.probability.name",
        detail: "formula.functionList.NORM_S_INV.functionParameter.probability.detail",
        example: "0.908789",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "PEARSON" /* PEARSON */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.PEARSON.description",
    abstract: "formula.functionList.PEARSON.abstract",
    functionParameter: [
      {
        name: "formula.functionList.PEARSON.functionParameter.array1.name",
        detail: "formula.functionList.PEARSON.functionParameter.array1.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PEARSON.functionParameter.array2.name",
        detail: "formula.functionList.PEARSON.functionParameter.array2.detail",
        example: "B1:B4",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "PERCENTILE.EXC" /* PERCENTILE_EXC */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.PERCENTILE_EXC.description",
    abstract: "formula.functionList.PERCENTILE_EXC.abstract",
    functionParameter: [
      {
        name: "formula.functionList.PERCENTILE_EXC.functionParameter.array.name",
        detail: "formula.functionList.PERCENTILE_EXC.functionParameter.array.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PERCENTILE_EXC.functionParameter.k.name",
        detail: "formula.functionList.PERCENTILE_EXC.functionParameter.k.detail",
        example: "0.3",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "PERCENTILE.INC" /* PERCENTILE_INC */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.PERCENTILE_INC.description",
    abstract: "formula.functionList.PERCENTILE_INC.abstract",
    functionParameter: [
      {
        name: "formula.functionList.PERCENTILE_INC.functionParameter.array.name",
        detail: "formula.functionList.PERCENTILE_INC.functionParameter.array.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PERCENTILE_INC.functionParameter.k.name",
        detail: "formula.functionList.PERCENTILE_INC.functionParameter.k.detail",
        example: "0.3",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "PERCENTRANK.EXC" /* PERCENTRANK_EXC */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.PERCENTRANK_EXC.description",
    abstract: "formula.functionList.PERCENTRANK_EXC.abstract",
    functionParameter: [
      {
        name: "formula.functionList.PERCENTRANK_EXC.functionParameter.array.name",
        detail: "formula.functionList.PERCENTRANK_EXC.functionParameter.array.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PERCENTRANK_EXC.functionParameter.x.name",
        detail: "formula.functionList.PERCENTRANK_EXC.functionParameter.x.detail",
        example: "1.5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PERCENTRANK_EXC.functionParameter.significance.name",
        detail: "formula.functionList.PERCENTRANK_EXC.functionParameter.significance.detail",
        example: "3",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "PERCENTRANK.INC" /* PERCENTRANK_INC */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.PERCENTRANK_INC.description",
    abstract: "formula.functionList.PERCENTRANK_INC.abstract",
    functionParameter: [
      {
        name: "formula.functionList.PERCENTRANK_INC.functionParameter.array.name",
        detail: "formula.functionList.PERCENTRANK_INC.functionParameter.array.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PERCENTRANK_INC.functionParameter.x.name",
        detail: "formula.functionList.PERCENTRANK_INC.functionParameter.x.detail",
        example: "1.5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PERCENTRANK_INC.functionParameter.significance.name",
        detail: "formula.functionList.PERCENTRANK_INC.functionParameter.significance.detail",
        example: "3",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "PERMUT" /* PERMUT */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.PERMUT.description",
    abstract: "formula.functionList.PERMUT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.PERMUT.functionParameter.number.name",
        detail: "formula.functionList.PERMUT.functionParameter.number.detail",
        example: "8",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PERMUT.functionParameter.numberChosen.name",
        detail: "formula.functionList.PERMUT.functionParameter.numberChosen.detail",
        example: "2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "PERMUTATIONA" /* PERMUTATIONA */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.PERMUTATIONA.description",
    abstract: "formula.functionList.PERMUTATIONA.abstract",
    functionParameter: [
      {
        name: "formula.functionList.PERMUT.functionParameter.number.name",
        detail: "formula.functionList.PERMUT.functionParameter.number.detail",
        example: "8",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PERMUT.functionParameter.numberChosen.name",
        detail: "formula.functionList.PERMUT.functionParameter.numberChosen.detail",
        example: "2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "PHI" /* PHI */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.PHI.description",
    abstract: "formula.functionList.PHI.abstract",
    functionParameter: [
      {
        name: "formula.functionList.PHI.functionParameter.x.name",
        detail: "formula.functionList.PHI.functionParameter.x.detail",
        example: "0.75",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "POISSON.DIST" /* POISSON_DIST */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.POISSON_DIST.description",
    abstract: "formula.functionList.POISSON_DIST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.POISSON_DIST.functionParameter.x.name",
        detail: "formula.functionList.POISSON_DIST.functionParameter.x.detail",
        example: "2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.POISSON_DIST.functionParameter.mean.name",
        detail: "formula.functionList.POISSON_DIST.functionParameter.mean.detail",
        example: "5",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.POISSON_DIST.functionParameter.cumulative.name",
        detail: "formula.functionList.POISSON_DIST.functionParameter.cumulative.detail",
        example: "true",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "PROB" /* PROB */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.PROB.description",
    abstract: "formula.functionList.PROB.abstract",
    functionParameter: [
      {
        name: "formula.functionList.PROB.functionParameter.xRange.name",
        detail: "formula.functionList.PROB.functionParameter.xRange.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PROB.functionParameter.probRange.name",
        detail: "formula.functionList.PROB.functionParameter.probRange.detail",
        example: "B1:B4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PROB.functionParameter.lowerLimit.name",
        detail: "formula.functionList.PROB.functionParameter.lowerLimit.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PROB.functionParameter.upperLimit.name",
        detail: "formula.functionList.PROB.functionParameter.upperLimit.detail",
        example: "3",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "QUARTILE.EXC" /* QUARTILE_EXC */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.QUARTILE_EXC.description",
    abstract: "formula.functionList.QUARTILE_EXC.abstract",
    functionParameter: [
      {
        name: "formula.functionList.QUARTILE_EXC.functionParameter.array.name",
        detail: "formula.functionList.QUARTILE_EXC.functionParameter.array.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.QUARTILE_EXC.functionParameter.quart.name",
        detail: "formula.functionList.QUARTILE_EXC.functionParameter.quart.detail",
        example: "1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "QUARTILE.INC" /* QUARTILE_INC */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.QUARTILE_INC.description",
    abstract: "formula.functionList.QUARTILE_INC.abstract",
    functionParameter: [
      {
        name: "formula.functionList.QUARTILE_INC.functionParameter.array.name",
        detail: "formula.functionList.QUARTILE_INC.functionParameter.array.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.QUARTILE_INC.functionParameter.quart.name",
        detail: "formula.functionList.QUARTILE_INC.functionParameter.quart.detail",
        example: "1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "RANK.AVG" /* RANK_AVG */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.RANK_AVG.description",
    abstract: "formula.functionList.RANK_AVG.abstract",
    functionParameter: [
      {
        name: "formula.functionList.RANK_AVG.functionParameter.number.name",
        detail: "formula.functionList.RANK_AVG.functionParameter.number.detail",
        example: "A3",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.RANK_AVG.functionParameter.ref.name",
        detail: "formula.functionList.RANK_AVG.functionParameter.ref.detail",
        example: "A2:A6",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.RANK_AVG.functionParameter.order.name",
        detail: "formula.functionList.RANK_AVG.functionParameter.order.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "RANK.EQ" /* RANK_EQ */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.RANK_EQ.description",
    abstract: "formula.functionList.RANK_EQ.abstract",
    functionParameter: [
      {
        name: "formula.functionList.RANK_EQ.functionParameter.number.name",
        detail: "formula.functionList.RANK_EQ.functionParameter.number.detail",
        example: "A3",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.RANK_EQ.functionParameter.ref.name",
        detail: "formula.functionList.RANK_EQ.functionParameter.ref.detail",
        example: "A2:A6",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.RANK_EQ.functionParameter.order.name",
        detail: "formula.functionList.RANK_EQ.functionParameter.order.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "RSQ" /* RSQ */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.RSQ.description",
    abstract: "formula.functionList.RSQ.abstract",
    functionParameter: [
      {
        name: "formula.functionList.RSQ.functionParameter.array1.name",
        detail: "formula.functionList.RSQ.functionParameter.array1.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.RSQ.functionParameter.array2.name",
        detail: "formula.functionList.RSQ.functionParameter.array2.detail",
        example: "B1:B4",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "SKEW" /* SKEW */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.SKEW.description",
    abstract: "formula.functionList.SKEW.abstract",
    functionParameter: [
      {
        name: "formula.functionList.SKEW.functionParameter.number1.name",
        detail: "formula.functionList.SKEW.functionParameter.number1.detail",
        example: "A1:C3",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SKEW.functionParameter.number2.name",
        detail: "formula.functionList.SKEW.functionParameter.number2.detail",
        example: "4",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "SKEW.P" /* SKEW_P */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.SKEW_P.description",
    abstract: "formula.functionList.SKEW_P.abstract",
    functionParameter: [
      {
        name: "formula.functionList.SKEW_P.functionParameter.number1.name",
        detail: "formula.functionList.SKEW_P.functionParameter.number1.detail",
        example: "A1:C3",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SKEW_P.functionParameter.number2.name",
        detail: "formula.functionList.SKEW_P.functionParameter.number2.detail",
        example: "4",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "SLOPE" /* SLOPE */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.SLOPE.description",
    abstract: "formula.functionList.SLOPE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.SLOPE.functionParameter.knownYs.name",
        detail: "formula.functionList.SLOPE.functionParameter.knownYs.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SLOPE.functionParameter.knownXs.name",
        detail: "formula.functionList.SLOPE.functionParameter.knownXs.detail",
        example: "B1:B4",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "SMALL" /* SMALL */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.SMALL.description",
    abstract: "formula.functionList.SMALL.abstract",
    functionParameter: [
      {
        name: "formula.functionList.SMALL.functionParameter.array.name",
        detail: "formula.functionList.SMALL.functionParameter.array.detail",
        example: "A2:B6",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SMALL.functionParameter.k.name",
        detail: "formula.functionList.SMALL.functionParameter.k.detail",
        example: "3",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "STANDARDIZE" /* STANDARDIZE */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.STANDARDIZE.description",
    abstract: "formula.functionList.STANDARDIZE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.STANDARDIZE.functionParameter.x.name",
        detail: "formula.functionList.STANDARDIZE.functionParameter.x.detail",
        example: "42",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.STANDARDIZE.functionParameter.mean.name",
        detail: "formula.functionList.STANDARDIZE.functionParameter.mean.detail",
        example: "40",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.STANDARDIZE.functionParameter.standardDev.name",
        detail: "formula.functionList.STANDARDIZE.functionParameter.standardDev.detail",
        example: "1.5",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "STDEV.P" /* STDEV_P */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.STDEV_P.description",
    abstract: "formula.functionList.STDEV_P.abstract",
    functionParameter: [
      {
        name: "formula.functionList.STDEV_P.functionParameter.number1.name",
        detail: "formula.functionList.STDEV_P.functionParameter.number1.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.STDEV_P.functionParameter.number2.name",
        detail: "formula.functionList.STDEV_P.functionParameter.number2.detail",
        example: "2",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "STDEV.S" /* STDEV_S */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.STDEV_S.description",
    abstract: "formula.functionList.STDEV_S.abstract",
    functionParameter: [
      {
        name: "formula.functionList.STDEV_S.functionParameter.number1.name",
        detail: "formula.functionList.STDEV_S.functionParameter.number1.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.STDEV_S.functionParameter.number2.name",
        detail: "formula.functionList.STDEV_S.functionParameter.number2.detail",
        example: "2",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "STDEVA" /* STDEVA */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.STDEVA.description",
    abstract: "formula.functionList.STDEVA.abstract",
    functionParameter: [
      {
        name: "formula.functionList.STDEVA.functionParameter.value1.name",
        detail: "formula.functionList.STDEVA.functionParameter.value1.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.STDEVA.functionParameter.value2.name",
        detail: "formula.functionList.STDEVA.functionParameter.value2.detail",
        example: "2",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "STDEVPA" /* STDEVPA */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.STDEVPA.description",
    abstract: "formula.functionList.STDEVPA.abstract",
    functionParameter: [
      {
        name: "formula.functionList.STDEVPA.functionParameter.value1.name",
        detail: "formula.functionList.STDEVPA.functionParameter.value1.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.STDEVPA.functionParameter.value2.name",
        detail: "formula.functionList.STDEVPA.functionParameter.value2.detail",
        example: "2",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "STEYX" /* STEYX */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.STEYX.description",
    abstract: "formula.functionList.STEYX.abstract",
    functionParameter: [
      {
        name: "formula.functionList.STEYX.functionParameter.knownYs.name",
        detail: "formula.functionList.STEYX.functionParameter.knownYs.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.STEYX.functionParameter.knownXs.name",
        detail: "formula.functionList.STEYX.functionParameter.knownXs.detail",
        example: "B1:B4",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "T.DIST" /* T_DIST */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.T_DIST.description",
    abstract: "formula.functionList.T_DIST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.T_DIST.functionParameter.x.name",
        detail: "formula.functionList.T_DIST.functionParameter.x.detail",
        example: "8",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.T_DIST.functionParameter.degFreedom.name",
        detail: "formula.functionList.T_DIST.functionParameter.degFreedom.detail",
        example: "3",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.T_DIST.functionParameter.cumulative.name",
        detail: "formula.functionList.T_DIST.functionParameter.cumulative.detail",
        example: "true",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "T.DIST.2T" /* T_DIST_2T */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.T_DIST_2T.description",
    abstract: "formula.functionList.T_DIST_2T.abstract",
    functionParameter: [
      {
        name: "formula.functionList.T_DIST_2T.functionParameter.x.name",
        detail: "formula.functionList.T_DIST_2T.functionParameter.x.detail",
        example: "8",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.T_DIST_2T.functionParameter.degFreedom.name",
        detail: "formula.functionList.T_DIST_2T.functionParameter.degFreedom.detail",
        example: "3",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "T.DIST.RT" /* T_DIST_RT */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.T_DIST_RT.description",
    abstract: "formula.functionList.T_DIST_RT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.T_DIST_RT.functionParameter.x.name",
        detail: "formula.functionList.T_DIST_RT.functionParameter.x.detail",
        example: "8",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.T_DIST_RT.functionParameter.degFreedom.name",
        detail: "formula.functionList.T_DIST_RT.functionParameter.degFreedom.detail",
        example: "3",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "T.INV" /* T_INV */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.T_INV.description",
    abstract: "formula.functionList.T_INV.abstract",
    functionParameter: [
      {
        name: "formula.functionList.T_INV.functionParameter.probability.name",
        detail: "formula.functionList.T_INV.functionParameter.probability.detail",
        example: "0.75",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.T_INV.functionParameter.degFreedom.name",
        detail: "formula.functionList.T_INV.functionParameter.degFreedom.detail",
        example: "2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "T.INV.2T" /* T_INV_2T */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.T_INV_2T.description",
    abstract: "formula.functionList.T_INV_2T.abstract",
    functionParameter: [
      {
        name: "formula.functionList.T_INV_2T.functionParameter.probability.name",
        detail: "formula.functionList.T_INV_2T.functionParameter.probability.detail",
        example: "0.75",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.T_INV_2T.functionParameter.degFreedom.name",
        detail: "formula.functionList.T_INV_2T.functionParameter.degFreedom.detail",
        example: "2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "T.TEST" /* T_TEST */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.T_TEST.description",
    abstract: "formula.functionList.T_TEST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.T_TEST.functionParameter.array1.name",
        detail: "formula.functionList.T_TEST.functionParameter.array1.detail",
        example: "A1:A4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.T_TEST.functionParameter.array2.name",
        detail: "formula.functionList.T_TEST.functionParameter.array2.detail",
        example: "B1:B4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.T_TEST.functionParameter.tails.name",
        detail: "formula.functionList.T_TEST.functionParameter.tails.detail",
        example: "2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.T_TEST.functionParameter.type.name",
        detail: "formula.functionList.T_TEST.functionParameter.type.detail",
        example: "1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "TREND" /* TREND */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.TREND.description",
    abstract: "formula.functionList.TREND.abstract",
    functionParameter: [
      {
        name: "formula.functionList.TREND.functionParameter.knownYs.name",
        detail: "formula.functionList.TREND.functionParameter.knownYs.detail",
        example: "B2:B7",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.TREND.functionParameter.knownXs.name",
        detail: "formula.functionList.TREND.functionParameter.knownXs.detail",
        example: "A2:A7",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.TREND.functionParameter.newXs.name",
        detail: "formula.functionList.TREND.functionParameter.newXs.detail",
        example: "A9:A10",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.TREND.functionParameter.constb.name",
        detail: "formula.functionList.TREND.functionParameter.constb.detail",
        example: "true",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "TRIMMEAN" /* TRIMMEAN */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.TRIMMEAN.description",
    abstract: "formula.functionList.TRIMMEAN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.TRIMMEAN.functionParameter.array.name",
        detail: "formula.functionList.TRIMMEAN.functionParameter.array.detail",
        example: "A2:A12",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.TRIMMEAN.functionParameter.percent.name",
        detail: "formula.functionList.TRIMMEAN.functionParameter.percent.detail",
        example: "0.2",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "VAR.P" /* VAR_P */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.VAR_P.description",
    abstract: "formula.functionList.VAR_P.abstract",
    functionParameter: [
      {
        name: "formula.functionList.VAR_P.functionParameter.number1.name",
        detail: "formula.functionList.VAR_P.functionParameter.number1.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.VAR_P.functionParameter.number2.name",
        detail: "formula.functionList.VAR_P.functionParameter.number2.detail",
        example: "2",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "VAR.S" /* VAR_S */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.VAR_S.description",
    abstract: "formula.functionList.VAR_S.abstract",
    functionParameter: [
      {
        name: "formula.functionList.VAR_S.functionParameter.number1.name",
        detail: "formula.functionList.VAR_S.functionParameter.number1.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.VAR_S.functionParameter.number2.name",
        detail: "formula.functionList.VAR_S.functionParameter.number2.detail",
        example: "2",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "VARA" /* VARA */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.VARA.description",
    abstract: "formula.functionList.VARA.abstract",
    functionParameter: [
      {
        name: "formula.functionList.VARA.functionParameter.value1.name",
        detail: "formula.functionList.VARA.functionParameter.value1.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.VARA.functionParameter.value2.name",
        detail: "formula.functionList.VARA.functionParameter.value2.detail",
        example: "2",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "VARPA" /* VARPA */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.VARPA.description",
    abstract: "formula.functionList.VARPA.abstract",
    functionParameter: [
      {
        name: "formula.functionList.VARPA.functionParameter.value1.name",
        detail: "formula.functionList.VARPA.functionParameter.value1.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.VARPA.functionParameter.value2.name",
        detail: "formula.functionList.VARPA.functionParameter.value2.detail",
        example: "2",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "WEIBULL.DIST" /* WEIBULL_DIST */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.WEIBULL_DIST.description",
    abstract: "formula.functionList.WEIBULL_DIST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.WEIBULL_DIST.functionParameter.x.name",
        detail: "formula.functionList.WEIBULL_DIST.functionParameter.x.detail",
        example: "105",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.WEIBULL_DIST.functionParameter.alpha.name",
        detail: "formula.functionList.WEIBULL_DIST.functionParameter.alpha.detail",
        example: "20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.WEIBULL_DIST.functionParameter.beta.name",
        detail: "formula.functionList.WEIBULL_DIST.functionParameter.beta.detail",
        example: "100",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.WEIBULL_DIST.functionParameter.cumulative.name",
        detail: "formula.functionList.WEIBULL_DIST.functionParameter.cumulative.detail",
        example: "true",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "Z.TEST" /* Z_TEST */,
    functionType: 3 /* Statistical */,
    description: "formula.functionList.Z_TEST.description",
    abstract: "formula.functionList.Z_TEST.abstract",
    functionParameter: [
      {
        name: "formula.functionList.Z_TEST.functionParameter.array.name",
        detail: "formula.functionList.Z_TEST.functionParameter.array.detail",
        example: "A2:A11",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.Z_TEST.functionParameter.x.name",
        detail: "formula.functionList.Z_TEST.functionParameter.x.detail",
        example: "4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.Z_TEST.functionParameter.sigma.name",
        detail: "formula.functionList.Z_TEST.functionParameter.sigma.detail",
        example: "10",
        require: 0,
        repeat: 0
      }
    ]
  }
];

// ../packages/sheets-formula/src/services/function-list/text.ts
var FUNCTION_LIST_TEXT = [
  {
    functionName: "ASC" /* ASC */,
    functionType: 6 /* Text */,
    description: "formula.functionList.ASC.description",
    abstract: "formula.functionList.ASC.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ASC.functionParameter.text.name",
        detail: "formula.functionList.ASC.functionParameter.text.detail",
        example: '"\uFF35\uFF4E\uFF49\uFF56\uFF45\uFF52"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "ARRAYTOTEXT" /* ARRAYTOTEXT */,
    functionType: 6 /* Text */,
    description: "formula.functionList.ARRAYTOTEXT.description",
    abstract: "formula.functionList.ARRAYTOTEXT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ARRAYTOTEXT.functionParameter.array.name",
        detail: "formula.functionList.ARRAYTOTEXT.functionParameter.array.detail",
        example: "A2:B4",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.ARRAYTOTEXT.functionParameter.format.name",
        detail: "formula.functionList.ARRAYTOTEXT.functionParameter.format.detail",
        example: "0",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "BAHTTEXT" /* BAHTTEXT */,
    functionType: 6 /* Text */,
    description: "formula.functionList.BAHTTEXT.description",
    abstract: "formula.functionList.BAHTTEXT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.BAHTTEXT.functionParameter.number.name",
        detail: "formula.functionList.BAHTTEXT.functionParameter.number.detail",
        example: "1234",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "CHAR" /* CHAR */,
    functionType: 6 /* Text */,
    description: "formula.functionList.CHAR.description",
    abstract: "formula.functionList.CHAR.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CHAR.functionParameter.number.name",
        detail: "formula.functionList.CHAR.functionParameter.number.detail",
        example: "65",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "CLEAN" /* CLEAN */,
    functionType: 6 /* Text */,
    description: "formula.functionList.CLEAN.description",
    abstract: "formula.functionList.CLEAN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CLEAN.functionParameter.text.name",
        detail: "formula.functionList.CLEAN.functionParameter.text.detail",
        example: 'CHAR(1)&"Univer"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "CODE" /* CODE */,
    functionType: 6 /* Text */,
    description: "formula.functionList.CODE.description",
    abstract: "formula.functionList.CODE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CODE.functionParameter.text.name",
        detail: "formula.functionList.CODE.functionParameter.text.detail",
        example: '"Univer"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "CONCAT" /* CONCAT */,
    functionType: 6 /* Text */,
    description: "formula.functionList.CONCAT.description",
    abstract: "formula.functionList.CONCAT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CONCAT.functionParameter.text1.name",
        detail: "formula.functionList.CONCAT.functionParameter.text1.detail",
        example: '"Hello"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CONCAT.functionParameter.text2.name",
        detail: "formula.functionList.CONCAT.functionParameter.text2.detail",
        example: '"Univer"',
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "CONCATENATE" /* CONCATENATE */,
    functionType: 6 /* Text */,
    description: "formula.functionList.CONCATENATE.description",
    abstract: "formula.functionList.CONCATENATE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CONCATENATE.functionParameter.text1.name",
        detail: "formula.functionList.CONCATENATE.functionParameter.text1.detail",
        example: "A1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CONCATENATE.functionParameter.text2.name",
        detail: "formula.functionList.CONCATENATE.functionParameter.text2.detail",
        example: "A2",
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "DBCS" /* DBCS */,
    functionType: 6 /* Text */,
    description: "formula.functionList.DBCS.description",
    abstract: "formula.functionList.DBCS.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DBCS.functionParameter.text.name",
        detail: "formula.functionList.DBCS.functionParameter.text.detail",
        example: '"Univer"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "DOLLAR" /* DOLLAR */,
    functionType: 6 /* Text */,
    description: "formula.functionList.DOLLAR.description",
    abstract: "formula.functionList.DOLLAR.abstract",
    functionParameter: [
      {
        name: "formula.functionList.DOLLAR.functionParameter.number.name",
        detail: "formula.functionList.DOLLAR.functionParameter.number.detail",
        example: "1234.567",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.DOLLAR.functionParameter.decimals.name",
        detail: "formula.functionList.DOLLAR.functionParameter.decimals.detail",
        example: "2",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "EXACT" /* EXACT */,
    functionType: 6 /* Text */,
    description: "formula.functionList.EXACT.description",
    abstract: "formula.functionList.EXACT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.EXACT.functionParameter.text1.name",
        detail: "formula.functionList.EXACT.functionParameter.text1.detail",
        example: '"Univer"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.EXACT.functionParameter.text2.name",
        detail: "formula.functionList.EXACT.functionParameter.text2.detail",
        example: '"univer"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "FIND" /* FIND */,
    functionType: 6 /* Text */,
    description: "formula.functionList.FIND.description",
    abstract: "formula.functionList.FIND.abstract",
    functionParameter: [
      {
        name: "formula.functionList.FIND.functionParameter.findText.name",
        detail: "formula.functionList.FIND.functionParameter.findText.detail",
        example: '"Univer"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.FIND.functionParameter.withinText.name",
        detail: "formula.functionList.FIND.functionParameter.withinText.detail",
        example: '"Hello Univer"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.FIND.functionParameter.startNum.name",
        detail: "formula.functionList.FIND.functionParameter.startNum.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "FINDB" /* FINDB */,
    functionType: 6 /* Text */,
    description: "formula.functionList.FINDB.description",
    abstract: "formula.functionList.FINDB.abstract",
    functionParameter: [
      {
        name: "formula.functionList.FINDB.functionParameter.findText.name",
        detail: "formula.functionList.FINDB.functionParameter.findText.detail",
        example: '"Univer"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.FINDB.functionParameter.withinText.name",
        detail: "formula.functionList.FINDB.functionParameter.withinText.detail",
        example: '"Hello Univer"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.FINDB.functionParameter.startNum.name",
        detail: "formula.functionList.FINDB.functionParameter.startNum.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "FIXED" /* FIXED */,
    functionType: 6 /* Text */,
    description: "formula.functionList.FIXED.description",
    abstract: "formula.functionList.FIXED.abstract",
    functionParameter: [
      {
        name: "formula.functionList.FIXED.functionParameter.number.name",
        detail: "formula.functionList.FIXED.functionParameter.number.detail",
        example: "1234.567",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.FIXED.functionParameter.decimals.name",
        detail: "formula.functionList.FIXED.functionParameter.decimals.detail",
        example: "2",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.FIXED.functionParameter.noCommas.name",
        detail: "formula.functionList.FIXED.functionParameter.noCommas.detail",
        example: "0",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "LEFT" /* LEFT */,
    functionType: 6 /* Text */,
    description: "formula.functionList.LEFT.description",
    abstract: "formula.functionList.LEFT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.LEFT.functionParameter.text.name",
        detail: "formula.functionList.LEFT.functionParameter.text.detail",
        example: '"Univer"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.LEFT.functionParameter.numChars.name",
        detail: "formula.functionList.LEFT.functionParameter.numChars.detail",
        example: "3",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "LEFTB" /* LEFTB */,
    functionType: 6 /* Text */,
    description: "formula.functionList.LEFTB.description",
    abstract: "formula.functionList.LEFTB.abstract",
    functionParameter: [
      {
        name: "formula.functionList.LEFTB.functionParameter.text.name",
        detail: "formula.functionList.LEFTB.functionParameter.text.detail",
        example: '"Univer"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.LEFTB.functionParameter.numBytes.name",
        detail: "formula.functionList.LEFTB.functionParameter.numBytes.detail",
        example: "3",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "LEN" /* LEN */,
    functionType: 6 /* Text */,
    description: "formula.functionList.LEN.description",
    abstract: "formula.functionList.LEN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.LEN.functionParameter.text.name",
        detail: "formula.functionList.LEN.functionParameter.text.detail",
        example: '"Univer"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "LENB" /* LENB */,
    functionType: 6 /* Text */,
    description: "formula.functionList.LENB.description",
    abstract: "formula.functionList.LENB.abstract",
    functionParameter: [
      {
        name: "formula.functionList.LENB.functionParameter.text.name",
        detail: "formula.functionList.LENB.functionParameter.text.detail",
        example: '"Univer"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "LOWER" /* LOWER */,
    functionType: 6 /* Text */,
    description: "formula.functionList.LOWER.description",
    abstract: "formula.functionList.LOWER.abstract",
    functionParameter: [
      {
        name: "formula.functionList.LOWER.functionParameter.text.name",
        detail: "formula.functionList.LOWER.functionParameter.text.detail",
        example: '"Univer"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "MID" /* MID */,
    functionType: 6 /* Text */,
    description: "formula.functionList.MID.description",
    abstract: "formula.functionList.MID.abstract",
    functionParameter: [
      {
        name: "formula.functionList.MID.functionParameter.text.name",
        detail: "formula.functionList.MID.functionParameter.text.detail",
        example: '"Univer"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MID.functionParameter.startNum.name",
        detail: "formula.functionList.MID.functionParameter.startNum.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MID.functionParameter.numChars.name",
        detail: "formula.functionList.MID.functionParameter.numChars.detail",
        example: "3",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "MIDB" /* MIDB */,
    functionType: 6 /* Text */,
    description: "formula.functionList.MIDB.description",
    abstract: "formula.functionList.MIDB.abstract",
    functionParameter: [
      {
        name: "formula.functionList.MIDB.functionParameter.text.name",
        detail: "formula.functionList.MIDB.functionParameter.text.detail",
        example: '"Univer"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MIDB.functionParameter.startNum.name",
        detail: "formula.functionList.MIDB.functionParameter.startNum.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.MIDB.functionParameter.numBytes.name",
        detail: "formula.functionList.MIDB.functionParameter.numBytes.detail",
        example: "3",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "NUMBERSTRING" /* NUMBERSTRING */,
    functionType: 6 /* Text */,
    description: "formula.functionList.NUMBERSTRING.description",
    abstract: "formula.functionList.NUMBERSTRING.abstract",
    functionParameter: [
      {
        name: "formula.functionList.NUMBERSTRING.functionParameter.number.name",
        detail: "formula.functionList.NUMBERSTRING.functionParameter.number.detail",
        example: "123",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.NUMBERSTRING.functionParameter.type.name",
        detail: "formula.functionList.NUMBERSTRING.functionParameter.type.detail",
        example: "1",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "NUMBERVALUE" /* NUMBERVALUE */,
    functionType: 6 /* Text */,
    description: "formula.functionList.NUMBERVALUE.description",
    abstract: "formula.functionList.NUMBERVALUE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.NUMBERVALUE.functionParameter.text.name",
        detail: "formula.functionList.NUMBERVALUE.functionParameter.text.detail",
        example: '"2.500,27"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.NUMBERVALUE.functionParameter.decimalSeparator.name",
        detail: "formula.functionList.NUMBERVALUE.functionParameter.decimalSeparator.detail",
        example: '","',
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.NUMBERVALUE.functionParameter.groupSeparator.name",
        detail: "formula.functionList.NUMBERVALUE.functionParameter.groupSeparator.detail",
        example: '"."',
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "PHONETIC" /* PHONETIC */,
    functionType: 6 /* Text */,
    description: "formula.functionList.PHONETIC.description",
    abstract: "formula.functionList.PHONETIC.abstract",
    functionParameter: [
      {
        name: "formula.functionList.PHONETIC.functionParameter.number1.name",
        detail: "formula.functionList.PHONETIC.functionParameter.number1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.PHONETIC.functionParameter.number2.name",
        detail: "formula.functionList.PHONETIC.functionParameter.number2.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "PROPER" /* PROPER */,
    functionType: 6 /* Text */,
    description: "formula.functionList.PROPER.description",
    abstract: "formula.functionList.PROPER.abstract",
    functionParameter: [
      {
        name: "formula.functionList.PROPER.functionParameter.text.name",
        detail: "formula.functionList.PROPER.functionParameter.text.detail",
        example: '"hello univer"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "REGEXEXTRACT" /* REGEXEXTRACT */,
    functionType: 6 /* Text */,
    description: "formula.functionList.REGEXEXTRACT.description",
    abstract: "formula.functionList.REGEXEXTRACT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.REGEXEXTRACT.functionParameter.text.name",
        detail: "formula.functionList.REGEXEXTRACT.functionParameter.text.detail",
        example: '"abcdefg"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.REGEXEXTRACT.functionParameter.regularExpression.name",
        detail: "formula.functionList.REGEXEXTRACT.functionParameter.regularExpression.detail",
        example: '"c.*f"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "REGEXMATCH" /* REGEXMATCH */,
    functionType: 6 /* Text */,
    description: "formula.functionList.REGEXMATCH.description",
    abstract: "formula.functionList.REGEXMATCH.abstract",
    functionParameter: [
      {
        name: "formula.functionList.REGEXMATCH.functionParameter.text.name",
        detail: "formula.functionList.REGEXMATCH.functionParameter.text.detail",
        example: '"Spreadsheets"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.REGEXMATCH.functionParameter.regularExpression.name",
        detail: "formula.functionList.REGEXMATCH.functionParameter.regularExpression.detail",
        example: '"S.r"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "REGEXREPLACE" /* REGEXREPLACE */,
    functionType: 6 /* Text */,
    description: "formula.functionList.REGEXREPLACE.description",
    abstract: "formula.functionList.REGEXREPLACE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.REGEXREPLACE.functionParameter.text.name",
        detail: "formula.functionList.REGEXREPLACE.functionParameter.text.detail",
        example: '"abcedfg"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.REGEXREPLACE.functionParameter.regularExpression.name",
        detail: "formula.functionList.REGEXREPLACE.functionParameter.regularExpression.detail",
        example: '"a.*d"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.REGEXREPLACE.functionParameter.replacement.name",
        detail: "formula.functionList.REGEXREPLACE.functionParameter.replacement.detail",
        example: '"xyz"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "REPLACE" /* REPLACE */,
    functionType: 6 /* Text */,
    description: "formula.functionList.REPLACE.description",
    abstract: "formula.functionList.REPLACE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.REPLACE.functionParameter.oldText.name",
        detail: "formula.functionList.REPLACE.functionParameter.oldText.detail",
        example: '"Univer"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.REPLACE.functionParameter.startNum.name",
        detail: "formula.functionList.REPLACE.functionParameter.startNum.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.REPLACE.functionParameter.numChars.name",
        detail: "formula.functionList.REPLACE.functionParameter.numChars.detail",
        example: "0",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.REPLACE.functionParameter.newText.name",
        detail: "formula.functionList.REPLACE.functionParameter.newText.detail",
        example: '"Hello "',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "REPLACEB" /* REPLACEB */,
    functionType: 6 /* Text */,
    description: "formula.functionList.REPLACEB.description",
    abstract: "formula.functionList.REPLACEB.abstract",
    functionParameter: [
      {
        name: "formula.functionList.REPLACEB.functionParameter.oldText.name",
        detail: "formula.functionList.REPLACEB.functionParameter.oldText.detail",
        example: '"Univer"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.REPLACEB.functionParameter.startNum.name",
        detail: "formula.functionList.REPLACEB.functionParameter.startNum.detail",
        example: "1",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.REPLACEB.functionParameter.numBytes.name",
        detail: "formula.functionList.REPLACEB.functionParameter.numBytes.detail",
        example: "0",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.REPLACEB.functionParameter.newText.name",
        detail: "formula.functionList.REPLACEB.functionParameter.newText.detail",
        example: '"Hello "',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "REPT" /* REPT */,
    functionType: 6 /* Text */,
    description: "formula.functionList.REPT.description",
    abstract: "formula.functionList.REPT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.REPT.functionParameter.text.name",
        detail: "formula.functionList.REPT.functionParameter.text.detail",
        example: '"*-"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.REPT.functionParameter.numberTimes.name",
        detail: "formula.functionList.REPT.functionParameter.numberTimes.detail",
        example: "3",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "RIGHT" /* RIGHT */,
    functionType: 6 /* Text */,
    description: "formula.functionList.RIGHT.description",
    abstract: "formula.functionList.RIGHT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.RIGHT.functionParameter.text.name",
        detail: "formula.functionList.RIGHT.functionParameter.text.detail",
        example: '"Univer"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.RIGHT.functionParameter.numChars.name",
        detail: "formula.functionList.RIGHT.functionParameter.numChars.detail",
        example: "3",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "RIGHTB" /* RIGHTB */,
    functionType: 6 /* Text */,
    description: "formula.functionList.RIGHTB.description",
    abstract: "formula.functionList.RIGHTB.abstract",
    functionParameter: [
      {
        name: "formula.functionList.RIGHTB.functionParameter.text.name",
        detail: "formula.functionList.RIGHTB.functionParameter.text.detail",
        example: '"Univer"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.RIGHTB.functionParameter.numBytes.name",
        detail: "formula.functionList.RIGHTB.functionParameter.numBytes.detail",
        example: "3",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "SEARCH" /* SEARCH */,
    functionType: 6 /* Text */,
    description: "formula.functionList.SEARCH.description",
    abstract: "formula.functionList.SEARCH.abstract",
    functionParameter: [
      {
        name: "formula.functionList.SEARCH.functionParameter.findText.name",
        detail: "formula.functionList.SEARCH.functionParameter.findText.detail",
        example: '"univer"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SEARCH.functionParameter.withinText.name",
        detail: "formula.functionList.SEARCH.functionParameter.withinText.detail",
        example: '"Hello Univer"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SEARCH.functionParameter.startNum.name",
        detail: "formula.functionList.SEARCH.functionParameter.startNum.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "SEARCHB" /* SEARCHB */,
    functionType: 6 /* Text */,
    description: "formula.functionList.SEARCHB.description",
    abstract: "formula.functionList.SEARCHB.abstract",
    functionParameter: [
      {
        name: "formula.functionList.SEARCHB.functionParameter.findText.name",
        detail: "formula.functionList.SEARCHB.functionParameter.findText.detail",
        example: '"univer"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SEARCHB.functionParameter.withinText.name",
        detail: "formula.functionList.SEARCHB.functionParameter.withinText.detail",
        example: '"Hello Univer"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SEARCHB.functionParameter.startNum.name",
        detail: "formula.functionList.SEARCHB.functionParameter.startNum.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "SUBSTITUTE" /* SUBSTITUTE */,
    functionType: 6 /* Text */,
    description: "formula.functionList.SUBSTITUTE.description",
    abstract: "formula.functionList.SUBSTITUTE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.SUBSTITUTE.functionParameter.text.name",
        detail: "formula.functionList.SUBSTITUTE.functionParameter.text.detail",
        example: '"Hello Univer"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SUBSTITUTE.functionParameter.oldText.name",
        detail: "formula.functionList.SUBSTITUTE.functionParameter.oldText.detail",
        example: '"Hello"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SUBSTITUTE.functionParameter.newText.name",
        detail: "formula.functionList.SUBSTITUTE.functionParameter.newText.detail",
        example: '"Hi"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.SUBSTITUTE.functionParameter.instanceNum.name",
        detail: "formula.functionList.SUBSTITUTE.functionParameter.instanceNum.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "T" /* T */,
    functionType: 6 /* Text */,
    description: "formula.functionList.T.description",
    abstract: "formula.functionList.T.abstract",
    functionParameter: [
      {
        name: "formula.functionList.T.functionParameter.value.name",
        detail: "formula.functionList.T.functionParameter.value.detail",
        example: '"Univer"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "TEXT" /* TEXT */,
    functionType: 6 /* Text */,
    description: "formula.functionList.TEXT.description",
    abstract: "formula.functionList.TEXT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.TEXT.functionParameter.value.name",
        detail: "formula.functionList.TEXT.functionParameter.value.detail",
        example: "1.23",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.TEXT.functionParameter.formatText.name",
        detail: "formula.functionList.TEXT.functionParameter.formatText.detail",
        example: '"$0.00"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "TEXTAFTER" /* TEXTAFTER */,
    functionType: 6 /* Text */,
    description: "formula.functionList.TEXTAFTER.description",
    abstract: "formula.functionList.TEXTAFTER.abstract",
    functionParameter: [
      {
        name: "formula.functionList.TEXTAFTER.functionParameter.text.name",
        detail: "formula.functionList.TEXTAFTER.functionParameter.text.detail",
        example: '"Red riding hood\u2019s, red hood"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.TEXTAFTER.functionParameter.delimiter.name",
        detail: "formula.functionList.TEXTAFTER.functionParameter.delimiter.detail",
        example: '"hood"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.TEXTAFTER.functionParameter.instanceNum.name",
        detail: "formula.functionList.TEXTAFTER.functionParameter.instanceNum.detail",
        example: "1",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.TEXTAFTER.functionParameter.matchMode.name",
        detail: "formula.functionList.TEXTAFTER.functionParameter.matchMode.detail",
        example: "1",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.TEXTAFTER.functionParameter.matchEnd.name",
        detail: "formula.functionList.TEXTAFTER.functionParameter.matchEnd.detail",
        example: "0",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.TEXTAFTER.functionParameter.ifNotFound.name",
        detail: "formula.functionList.TEXTAFTER.functionParameter.ifNotFound.detail",
        example: '"not found"',
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "TEXTBEFORE" /* TEXTBEFORE */,
    functionType: 6 /* Text */,
    description: "formula.functionList.TEXTBEFORE.description",
    abstract: "formula.functionList.TEXTBEFORE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.TEXTBEFORE.functionParameter.text.name",
        detail: "formula.functionList.TEXTBEFORE.functionParameter.text.detail",
        example: '"Red riding hood\u2019s, red hood"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.TEXTBEFORE.functionParameter.delimiter.name",
        detail: "formula.functionList.TEXTBEFORE.functionParameter.delimiter.detail",
        example: '"hood"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.TEXTBEFORE.functionParameter.instanceNum.name",
        detail: "formula.functionList.TEXTBEFORE.functionParameter.instanceNum.detail",
        example: "1",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.TEXTBEFORE.functionParameter.matchMode.name",
        detail: "formula.functionList.TEXTBEFORE.functionParameter.matchMode.detail",
        example: "1",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.TEXTBEFORE.functionParameter.matchEnd.name",
        detail: "formula.functionList.TEXTBEFORE.functionParameter.matchEnd.detail",
        example: "0",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.TEXTBEFORE.functionParameter.ifNotFound.name",
        detail: "formula.functionList.TEXTBEFORE.functionParameter.ifNotFound.detail",
        example: '"not found"',
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "TEXTJOIN" /* TEXTJOIN */,
    functionType: 6 /* Text */,
    description: "formula.functionList.TEXTJOIN.description",
    abstract: "formula.functionList.TEXTJOIN.abstract",
    functionParameter: [
      {
        name: "formula.functionList.TEXTJOIN.functionParameter.delimiter.name",
        detail: "formula.functionList.TEXTJOIN.functionParameter.delimiter.detail",
        example: '", "',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.TEXTJOIN.functionParameter.ignoreEmpty.name",
        detail: "formula.functionList.TEXTJOIN.functionParameter.ignoreEmpty.detail",
        example: "true",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.TEXTJOIN.functionParameter.text1.name",
        detail: "formula.functionList.TEXTJOIN.functionParameter.text1.detail",
        example: '"Hi"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.TEXTJOIN.functionParameter.text2.name",
        detail: "formula.functionList.TEXTJOIN.functionParameter.text2.detail",
        example: '"Univer"',
        require: 0,
        repeat: 1
      }
    ]
  },
  {
    functionName: "TEXTSPLIT" /* TEXTSPLIT */,
    functionType: 6 /* Text */,
    description: "formula.functionList.TEXTSPLIT.description",
    abstract: "formula.functionList.TEXTSPLIT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.TEXTSPLIT.functionParameter.text.name",
        detail: "formula.functionList.TEXTSPLIT.functionParameter.text.detail",
        example: "A1:C2",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.TEXTSPLIT.functionParameter.colDelimiter.name",
        detail: "formula.functionList.TEXTSPLIT.functionParameter.colDelimiter.detail",
        example: '","',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.TEXTSPLIT.functionParameter.rowDelimiter.name",
        detail: "formula.functionList.TEXTSPLIT.functionParameter.rowDelimiter.detail",
        example: '";"',
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.TEXTSPLIT.functionParameter.ignoreEmpty.name",
        detail: "formula.functionList.TEXTSPLIT.functionParameter.ignoreEmpty.detail",
        example: "",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.TEXTSPLIT.functionParameter.matchMode.name",
        detail: "formula.functionList.TEXTSPLIT.functionParameter.matchMode.detail",
        example: "",
        require: 0,
        repeat: 0
      },
      {
        name: "formula.functionList.TEXTSPLIT.functionParameter.padWith.name",
        detail: "formula.functionList.TEXTSPLIT.functionParameter.padWith.detail",
        example: "",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "TRIM" /* TRIM */,
    functionType: 6 /* Text */,
    description: "formula.functionList.TRIM.description",
    abstract: "formula.functionList.TRIM.abstract",
    functionParameter: [
      {
        name: "formula.functionList.TRIM.functionParameter.text.name",
        detail: "formula.functionList.TRIM.functionParameter.text.detail",
        example: '" Hello  Univer "',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "UNICHAR" /* UNICHAR */,
    functionType: 6 /* Text */,
    description: "formula.functionList.UNICHAR.description",
    abstract: "formula.functionList.UNICHAR.abstract",
    functionParameter: [
      {
        name: "formula.functionList.UNICHAR.functionParameter.number.name",
        detail: "formula.functionList.UNICHAR.functionParameter.number.detail",
        example: "65",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "UNICODE" /* UNICODE */,
    functionType: 6 /* Text */,
    description: "formula.functionList.UNICODE.description",
    abstract: "formula.functionList.UNICODE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.UNICODE.functionParameter.text.name",
        detail: "formula.functionList.UNICODE.functionParameter.text.detail",
        example: '"Univer"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "UPPER" /* UPPER */,
    functionType: 6 /* Text */,
    description: "formula.functionList.UPPER.description",
    abstract: "formula.functionList.UPPER.abstract",
    functionParameter: [
      {
        name: "formula.functionList.UPPER.functionParameter.text.name",
        detail: "formula.functionList.UPPER.functionParameter.text.detail",
        example: '"Univer"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "VALUE" /* VALUE */,
    functionType: 6 /* Text */,
    description: "formula.functionList.VALUE.description",
    abstract: "formula.functionList.VALUE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.VALUE.functionParameter.text.name",
        detail: "formula.functionList.VALUE.functionParameter.text.detail",
        example: '"123"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "VALUETOTEXT" /* VALUETOTEXT */,
    functionType: 6 /* Text */,
    description: "formula.functionList.VALUETOTEXT.description",
    abstract: "formula.functionList.VALUETOTEXT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.VALUETOTEXT.functionParameter.value.name",
        detail: "formula.functionList.VALUETOTEXT.functionParameter.value.detail",
        example: '"Univer"',
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.VALUETOTEXT.functionParameter.format.name",
        detail: "formula.functionList.VALUETOTEXT.functionParameter.format.detail",
        example: "1",
        require: 0,
        repeat: 0
      }
    ]
  },
  {
    functionName: "CALL" /* CALL */,
    functionType: 6 /* Text */,
    description: "formula.functionList.CALL.description",
    abstract: "formula.functionList.CALL.abstract",
    functionParameter: [
      {
        name: "formula.functionList.CALL.functionParameter.number1.name",
        detail: "formula.functionList.CALL.functionParameter.number1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.CALL.functionParameter.number2.name",
        detail: "formula.functionList.CALL.functionParameter.number2.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "EUROCONVERT" /* EUROCONVERT */,
    functionType: 6 /* Text */,
    description: "formula.functionList.EUROCONVERT.description",
    abstract: "formula.functionList.EUROCONVERT.abstract",
    functionParameter: [
      {
        name: "formula.functionList.EUROCONVERT.functionParameter.number1.name",
        detail: "formula.functionList.EUROCONVERT.functionParameter.number1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.EUROCONVERT.functionParameter.number2.name",
        detail: "formula.functionList.EUROCONVERT.functionParameter.number2.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "REGISTER.ID" /* REGISTER_ID */,
    functionType: 6 /* Text */,
    description: "formula.functionList.REGISTER_ID.description",
    abstract: "formula.functionList.REGISTER_ID.abstract",
    functionParameter: [
      {
        name: "formula.functionList.REGISTER_ID.functionParameter.number1.name",
        detail: "formula.functionList.REGISTER_ID.functionParameter.number1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.REGISTER_ID.functionParameter.number2.name",
        detail: "formula.functionList.REGISTER_ID.functionParameter.number2.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      }
    ]
  }
];

// ../packages/sheets-formula/src/services/function-list/univer.ts
var FUNCTION_LIST_UNIVER = [];

// ../packages/sheets-formula/src/services/function-list/web.ts
var FUNCTION_LIST_WEB = [
  {
    functionName: "ENCODEURL" /* ENCODEURL */,
    functionType: 12 /* Web */,
    description: "formula.functionList.ENCODEURL.description",
    abstract: "formula.functionList.ENCODEURL.abstract",
    functionParameter: [
      {
        name: "formula.functionList.ENCODEURL.functionParameter.text.name",
        detail: "formula.functionList.ENCODEURL.functionParameter.text.detail",
        example: '"https://univer.ai/"',
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "FILTERXML" /* FILTERXML */,
    functionType: 12 /* Web */,
    description: "formula.functionList.FILTERXML.description",
    abstract: "formula.functionList.FILTERXML.abstract",
    functionParameter: [
      {
        name: "formula.functionList.FILTERXML.functionParameter.number1.name",
        detail: "formula.functionList.FILTERXML.functionParameter.number1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.FILTERXML.functionParameter.number2.name",
        detail: "formula.functionList.FILTERXML.functionParameter.number2.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      }
    ]
  },
  {
    functionName: "WEBSERVICE" /* WEBSERVICE */,
    functionType: 12 /* Web */,
    description: "formula.functionList.WEBSERVICE.description",
    abstract: "formula.functionList.WEBSERVICE.abstract",
    functionParameter: [
      {
        name: "formula.functionList.WEBSERVICE.functionParameter.number1.name",
        detail: "formula.functionList.WEBSERVICE.functionParameter.number1.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      },
      {
        name: "formula.functionList.WEBSERVICE.functionParameter.number2.name",
        detail: "formula.functionList.WEBSERVICE.functionParameter.number2.detail",
        example: "A1:A20",
        require: 1,
        repeat: 0
      }
    ]
  }
];

// ../packages/sheets-formula/src/services/function-list/function-list.ts
var FUNCTION_LIST = [
  ...FUNCTION_LIST_FINANCIAL,
  ...FUNCTION_LIST_DATE,
  ...FUNCTION_LIST_MATH,
  ...FUNCTION_LIST_STATISTICAL,
  ...FUNCTION_LIST_LOOKUP,
  ...FUNCTION_LIST_DATABASE,
  ...FUNCTION_LIST_TEXT,
  ...FUNCTION_LIST_LOGICAL,
  ...FUNCTION_LIST_INFORMATION,
  ...FUNCTION_LIST_ENGINEERING,
  ...FUNCTION_LIST_CUBE,
  ...FUNCTION_LIST_COMPATIBILITY,
  ...FUNCTION_LIST_WEB,
  ...FUNCTION_LIST_ARRAY,
  ...FUNCTION_LIST_UNIVER
];

// ../packages/sheets-formula/src/services/utils.ts
function getFunctionName(item, localeService) {
  let functionName = "";
  if (item.aliasFunctionName) {
    functionName = localeService.t(item.aliasFunctionName);
    if (functionName === item.aliasFunctionName) {
      functionName = item.functionName;
    }
  } else {
    functionName = item.functionName;
  }
  return functionName;
}

// ../packages/sheets-formula/src/services/description.service.ts
var IDescriptionService = createIdentifier("formula.description-service");
var DescriptionService = class extends Disposable {
  constructor(_functionService, _localeService, _configService) {
    super();
    __publicField(this, "_functionService", _functionService);
    __publicField(this, "_localeService", _localeService);
    __publicField(this, "_configService", _configService);
    __publicField(this, "_descriptions", /* @__PURE__ */ new Map());
    this._initialize();
  }
  _initialize() {
    this.disposeWithMe(
      toDisposable(
        this._localeService.localeChanged$.subscribe(() => {
          this._functionService.clearDescriptions();
          const newDescriptions = /* @__PURE__ */ new Map();
          this._descriptions.forEach((item) => {
            const functionName = getFunctionName(item, this._localeService).toUpperCase();
            newDescriptions.set(functionName, item);
          });
          this._descriptions = newDescriptions;
          this._initRegisterDescriptions();
        })
      )
    );
    this._initDescriptions();
    this._initRegisterDescriptions();
  }
  _initDescriptions() {
    var _a;
    const localeService = this._localeService;
    FUNCTION_LIST.forEach((item) => {
      if (ALL_IMPLEMENTED_FUNCTIONS_SET.has(item.functionName)) {
        const functionName = getFunctionName(item, localeService).toUpperCase();
        this._descriptions.set(functionName, item);
      }
    });
    const config = this._configService.getConfig(PLUGIN_CONFIG_KEY_BASE);
    (_a = config == null ? void 0 : config.description) == null ? void 0 : _a.forEach((item) => {
      const functionName = getFunctionName(item, localeService).toUpperCase();
      this._descriptions.set(functionName, item);
    });
  }
  _initRegisterDescriptions() {
    const localeService = this._localeService;
    const functionListLocale = Array.from(this._descriptions.values()).map((functionInfo) => ({
      functionName: getFunctionName(functionInfo, localeService),
      functionType: functionInfo.functionType,
      description: localeService.t(functionInfo.description),
      abstract: localeService.t(functionInfo.abstract),
      functionParameter: functionInfo.functionParameter.map((item) => ({
        name: localeService.t(item.name),
        detail: localeService.t(item.detail),
        example: item.example,
        require: item.require,
        repeat: item.repeat
      }))
    }));
    this._functionService.registerDescriptions(...functionListLocale);
  }
  _registerDescriptions(descriptions) {
    const localeService = this._localeService;
    const functionListLocale = descriptions.map((functionInfo) => ({
      functionName: getFunctionName(functionInfo, localeService),
      functionType: functionInfo.functionType,
      description: localeService.t(functionInfo.description),
      abstract: localeService.t(functionInfo.abstract),
      functionParameter: functionInfo.functionParameter.map((item) => ({
        name: localeService.t(item.name),
        detail: localeService.t(item.detail),
        example: item.example,
        require: item.require,
        repeat: item.repeat
      }))
    }));
    this._functionService.registerDescriptions(...functionListLocale);
  }
  dispose() {
    super.dispose();
    this._descriptions.clear();
  }
  getDescriptions() {
    return this._functionService.getDescriptions();
  }
  hasFunction(searchText) {
    return this._descriptions.has(searchText.toUpperCase());
  }
  getFunctionInfo(searchText) {
    const item = this._descriptions.get(searchText.toUpperCase());
    if (!item) {
      return;
    }
    return this._functionService.getDescription(getFunctionName(item, this._localeService));
  }
  getSearchListByName(searchText) {
    const functionList = this._functionService.getDescriptions();
    const _searchText = searchText.toUpperCase().trim();
    const searchList = [];
    functionList.forEach((item) => {
      const { functionName, abstract, functionType } = item;
      if (functionName.toUpperCase().indexOf(_searchText) > -1 && functionType !== 16 /* DefinedName */) {
        searchList.push({ name: functionName, desc: abstract });
      }
    });
    return searchList;
  }
  getSearchListByNameFirstLetter(searchText) {
    const functionList = this._functionService.getDescriptions();
    const _searchText = searchText.toUpperCase().trim();
    const searchList = [];
    functionList.forEach((item) => {
      const { functionName, abstract, functionType } = item;
      if (functionName.toUpperCase().indexOf(_searchText) === 0) {
        searchList.push({ name: functionName, desc: abstract, functionType });
      }
    });
    return searchList;
  }
  getSearchListByType(type) {
    const functionList = this._functionService.getDescriptions();
    const searchList = [];
    functionList.forEach((item) => {
      const { functionName, functionType, abstract } = item;
      if ((functionType === type || type === -1) && functionType !== 16 /* DefinedName */) {
        searchList.push({ name: functionName, desc: abstract });
      }
    });
    return searchList;
  }
  registerDescriptions(descriptions) {
    const localeService = this._localeService;
    const functionNames = [];
    descriptions.forEach((item) => {
      const functionName = getFunctionName(item, localeService).toUpperCase();
      functionNames.push(functionName);
      this._descriptions.set(functionName, item);
    });
    this._registerDescriptions(descriptions);
    return toDisposable(() => {
      this.unregisterDescriptions(functionNames);
    });
  }
  unregisterDescriptions(functionNames) {
    const removeFunctionNames = [];
    functionNames.forEach((name) => {
      const functionName = name.toUpperCase();
      const item = this._descriptions.get(functionName);
      if (!item) {
        return;
      }
      removeFunctionNames.push(getFunctionName(item, this._localeService));
      this._descriptions.delete(functionName);
    });
    this._functionService.unregisterDescriptions(...removeFunctionNames);
  }
  hasDescription(name) {
    return this._descriptions.has(name.toUpperCase());
  }
  hasDefinedNameDescription(name) {
    const item = this._descriptions.get(name.toUpperCase());
    if (!item) {
      return false;
    }
    return item.functionType === 16 /* DefinedName */;
  }
  isFormulaDefinedName(name) {
    const item = this._descriptions.get(name.toUpperCase());
    if (!item) {
      return false;
    }
    if (item.functionType !== 16 /* DefinedName */) {
      return false;
    }
    return !isReferenceStrings(item.description);
  }
};
DescriptionService = __decorateClass([
  __decorateParam(0, IFunctionService),
  __decorateParam(1, Inject(LocaleService)),
  __decorateParam(2, IConfigService)
], DescriptionService);

// ../packages/sheets-formula/src/controllers/defined-name.controller.ts
var DefinedNameController = class extends Disposable {
  constructor(_descriptionService, _definedNamesService, _univerInstanceService, _commandService) {
    super();
    __publicField(this, "_descriptionService", _descriptionService);
    __publicField(this, "_definedNamesService", _definedNamesService);
    __publicField(this, "_univerInstanceService", _univerInstanceService);
    __publicField(this, "_commandService", _commandService);
    __publicField(this, "_preUnitId", null);
    this._initialize();
  }
  _initialize() {
    this._descriptionListener();
    this._changeUnitListener();
    this._changeSheetListener();
  }
  _descriptionListener() {
    this.disposeWithMe(
      toDisposable(
        this._definedNamesService.update$.subscribe((event) => {
          this._updateDescriptions(event);
        })
      )
    );
  }
  _changeUnitListener() {
    this.disposeWithMe(
      toDisposable(
        this._univerInstanceService.getCurrentTypeOfUnit$(2 /* UNIVER_SHEET */).subscribe((workbook) => {
          this._unRegisterDescriptions();
          if (workbook) {
            this._initRegisterDescriptions(workbook.getUnitId());
          }
        })
      )
    );
  }
  _changeSheetListener() {
    this.disposeWithMe(
      this._commandService.onCommandExecuted((command, options) => {
        if (options == null ? void 0 : options.fromCollab) {
          return;
        }
        if (command.id === SetWorksheetActiveOperation.id) {
          const params = command.params;
          this._unregisterDescriptionsForNotInSheetId(params.unitId, params.subUnitId);
          this._initRegisterDescriptions(params.unitId, params.subUnitId);
        } else if (command.id === SetDefinedNameMutation.id) {
          const params = command.params;
          this._registerDescription(params);
        } else if (command.id === RemoveDefinedNameMutation.id) {
          const params = command.params;
          this._unregisterDescription(params);
        }
      })
    );
  }
  _updateDescriptions(event) {
    const target = getSheetCommandTarget(this._univerInstanceService);
    if (!target) return;
    const { unitId, subUnitId } = target;
    const { type, unitId: updateUnitId, definedNames } = event;
    if (updateUnitId !== unitId) {
      return;
    }
    if (type === "update") {
      const functionList = [];
      definedNames.forEach((definedName) => {
        const { name, comment, formulaOrRefString, localSheetId } = definedName;
        if (localSheetId == null || localSheetId === SCOPE_WORKBOOK_VALUE_DEFINED_NAME || localSheetId === subUnitId) {
          functionList.push({
            functionName: name,
            description: formulaOrRefString + (comment || ""),
            abstract: formulaOrRefString,
            functionType: 16 /* DefinedName */,
            functionParameter: []
          });
        }
      });
      this._descriptionService.registerDescriptions(functionList);
    } else if (type === "remove") {
      const functionList = [];
      definedNames.forEach((definedName) => {
        functionList.push(definedName.name);
      });
      this._descriptionService.unregisterDescriptions(functionList);
    }
  }
  _registerDescription(params) {
    const target = getSheetCommandTarget(this._univerInstanceService, params);
    if (!target) return;
    const { subUnitId } = target;
    const { name, comment, formulaOrRefString, localSheetId } = params;
    if (this._descriptionService.hasDescription(name)) {
      return;
    }
    if (localSheetId == null || localSheetId === SCOPE_WORKBOOK_VALUE_DEFINED_NAME || localSheetId === subUnitId) {
      this._descriptionService.registerDescriptions([{
        functionName: name,
        description: formulaOrRefString + (comment || ""),
        abstract: formulaOrRefString,
        functionType: 16 /* DefinedName */,
        functionParameter: []
      }]);
    }
  }
  _unregisterDescription(param) {
    const { name } = param;
    this._descriptionService.unregisterDescriptions([name]);
  }
  _unRegisterDescriptions() {
    if (this._preUnitId === null) {
      return;
    }
    const definedNames = this._definedNamesService.getDefinedNameMap(this._preUnitId);
    if (!definedNames) {
      return;
    }
    const functionList = [];
    Array.from(Object.values(definedNames)).forEach((value) => {
      const { name } = value;
      functionList.push(name);
    });
    this._descriptionService.unregisterDescriptions(functionList);
    this._preUnitId = null;
  }
  _initRegisterDescriptions(unitId, subUnitId) {
    const target = getSheetCommandTarget(this._univerInstanceService, { unitId, subUnitId });
    if (!target) return;
    const { unitId: _unitId, subUnitId: _subUnitId } = target;
    const definedNames = this._definedNamesService.getDefinedNameMap(_unitId);
    if (!definedNames) {
      return;
    }
    const functionList = [];
    this._preUnitId = _unitId;
    Array.from(Object.values(definedNames)).forEach((value) => {
      const { name, comment, formulaOrRefString, localSheetId } = value;
      if (this._descriptionService.hasDescription(name)) {
        return;
      }
      if (localSheetId == null || localSheetId === SCOPE_WORKBOOK_VALUE_DEFINED_NAME || localSheetId === _subUnitId) {
        functionList.push({
          functionName: name,
          description: formulaOrRefString + (comment || ""),
          abstract: formulaOrRefString,
          functionType: 16 /* DefinedName */,
          functionParameter: []
        });
      }
    });
    this._descriptionService.registerDescriptions(functionList);
  }
  _unregisterDescriptionsForNotInSheetId(unitId, subUnitId) {
    const definedNames = this._definedNamesService.getDefinedNameMap(unitId);
    if (!definedNames) {
      return;
    }
    const functionList = [];
    Array.from(Object.values(definedNames)).forEach((value) => {
      const { name, localSheetId } = value;
      if (localSheetId !== SCOPE_WORKBOOK_VALUE_DEFINED_NAME && localSheetId !== subUnitId) {
        functionList.push(name);
      }
    });
    this._descriptionService.unregisterDescriptions(functionList);
  }
};
DefinedNameController = __decorateClass([
  __decorateParam(0, IDescriptionService),
  __decorateParam(1, IDefinedNamesService),
  __decorateParam(2, IUniverInstanceService),
  __decorateParam(3, ICommandService)
], DefinedNameController);

// ../packages/sheets-formula/src/controllers/formula-auto-fill.controller.ts
var FormulaAutoFillController = class extends Disposable {
  constructor(_autoFillService, _lexerTreeBuilder) {
    super();
    __publicField(this, "_autoFillService", _autoFillService);
    __publicField(this, "_lexerTreeBuilder", _lexerTreeBuilder);
    this._registerAutoFill();
  }
  _registerAutoFill() {
    const formulaRule = {
      type: "formula" /* FORMULA */,
      priority: 1001,
      match: (cellData) => isFormulaString(cellData == null ? void 0 : cellData.f) || isFormulaId(cellData == null ? void 0 : cellData.si),
      isContinue: (prev, cur) => {
        if (prev.type === "formula" /* FORMULA */) {
          return true;
        }
        return false;
      },
      applyFunctions: {
        ["COPY" /* COPY */]: (dataWithIndex, len, direction, copyDataPiece, location) => {
          const { data, index } = dataWithIndex;
          return this._fillCopyFormula(data, len, direction, index, copyDataPiece, location);
        }
      }
    };
    this._autoFillService.registerRule(formulaRule);
  }
  _fillCopyFormula(data, len, direction, index, copyDataPiece, location) {
    var _a, _b;
    const step = getDataLength(copyDataPiece);
    const applyData = [];
    const formulaIdMap = /* @__PURE__ */ new Map();
    for (let i = 1; i <= len; i++) {
      const dataIndex = (i - 1) % data.length;
      const sourceIndex = index[dataIndex];
      const d = Tools.deepClone(data[dataIndex]);
      if (d) {
        const originalFormula = ((_a = data[dataIndex]) == null ? void 0 : _a.f) || "";
        const originalFormulaId = ((_b = data[dataIndex]) == null ? void 0 : _b.si) || "";
        const checkFormula = isFormulaString(originalFormula);
        const checkFormulaId = isFormulaId(originalFormulaId);
        if (checkFormulaId) {
          d.si = originalFormulaId;
          d.f = null;
          d.v = null;
          d.p = null;
          d.t = null;
          applyData.push(d);
        } else if (checkFormula) {
          let formulaId = formulaIdMap.get(dataIndex);
          if (!formulaId) {
            formulaId = generateRandomId(6);
            formulaIdMap.set(dataIndex, formulaId);
            const { offsetX, offsetY } = directionToOffset(step, len, direction, location, sourceIndex);
            const shiftedFormula = this._lexerTreeBuilder.moveFormulaRefOffset(
              originalFormula,
              offsetX,
              offsetY
            );
            d.si = formulaId;
            d.f = shiftedFormula;
            d.v = null;
            d.p = null;
            d.t = null;
          } else {
            d.si = formulaId;
            d.f = null;
            d.v = null;
            d.p = null;
            d.t = null;
          }
          applyData.push(d);
        }
      }
    }
    return applyData;
  }
};
FormulaAutoFillController = __decorateClass([
  __decorateParam(0, IAutoFillService),
  __decorateParam(1, Inject(LexerTreeBuilder))
], FormulaAutoFillController);
function directionToOffset(step, len, direction, location, sourceIndex) {
  const { source, target } = location;
  const { rows: targetRows } = target;
  const { rows: sourceRows } = source;
  let offsetX = 0;
  let offsetY = 0;
  switch (direction) {
    case 0 /* UP */:
      offsetY = targetRows[sourceIndex] - sourceRows[sourceIndex];
      break;
    case 1 /* RIGHT */:
      offsetX = step;
      break;
    case 2 /* DOWN */:
      offsetY = targetRows[sourceIndex] - sourceRows[sourceIndex];
      break;
    case 3 /* LEFT */:
      offsetX = -step * len;
      break;
  }
  return { offsetX, offsetY };
}
function getDataLength(copyDataPiece) {
  let length = 0;
  for (const t in copyDataPiece) {
    copyDataPiece[t].forEach((item) => {
      length += item.data.length;
    });
  }
  return length;
}

// ../packages/sheets-formula/src/commands/commands/insert-function.command.ts
var InsertFunctionCommand = {
  id: "formula.command.insert-function",
  type: 0 /* COMMAND */,
  handler: async (accessor, params) => {
    const { list, listOfRangeHasNumber } = params;
    const commandService = accessor.get(ICommandService);
    const cellMatrix = new ObjectMatrix();
    list.forEach((item) => {
      const { range, primary, formula } = item;
      const { row, column } = primary;
      const formulaId = generateRandomId(6);
      cellMatrix.setValue(row, column, {
        f: formula,
        si: formulaId
      });
      const { startRow, startColumn, endRow, endColumn } = range;
      for (let i = startRow; i <= endRow; i++) {
        for (let j = startColumn; j <= endColumn; j++) {
          if (i !== row || j !== column) {
            cellMatrix.setValue(i, j, {
              si: formulaId
            });
          }
        }
      }
    });
    if (listOfRangeHasNumber && listOfRangeHasNumber.length > 0) {
      listOfRangeHasNumber.forEach((item) => {
        const { primary, formula } = item;
        cellMatrix.setValue(primary.row, primary.column, {
          f: formula
        });
      });
    }
    const setRangeValuesParams = {
      value: cellMatrix.getData()
    };
    return commandService.executeCommand(SetRangeValuesCommand.id, setRangeValuesParams);
  }
};

// ../packages/sheets-formula/src/commands/commands/quick-sum.command.ts
var QuickSumCommand = {
  id: "sheets-formula.command.quick-sum",
  type: 0 /* COMMAND */,
  handler: async (accessor) => {
    const selectionsService = accessor.get(SheetsSelectionsService);
    const currentSelection = selectionsService.getCurrentLastSelection();
    if (!currentSelection) return false;
    const univerInstanceService = accessor.get(IUniverInstanceService);
    const target = getSheetCommandTarget(univerInstanceService);
    if (!target) return false;
    const range = currentSelection.range;
    const { worksheet } = target;
    let firstCell = findFirstNonEmptyCell(range, worksheet);
    if (!firstCell) return false;
    firstCell = alignToMergedCellsBorders(firstCell, worksheet);
    const targetRange = expandToContinuousRange({
      startRow: firstCell.startRow,
      startColumn: firstCell.startColumn,
      endRow: range.endRow,
      endColumn: range.endColumn
    }, { left: true, right: true, up: true, down: true }, worksheet);
    const setValueMatrix = new ObjectMatrix();
    const lastRow = alignToMergedCellsBorders({
      startRow: targetRange.endRow,
      endRow: targetRange.endRow,
      startColumn: targetRange.startColumn,
      endColumn: targetRange.endColumn
    }, worksheet);
    if (!Rectangle.equals(lastRow, targetRange)) {
      for (const cell of worksheet.iterateByColumn(lastRow)) {
        if (!cell.value || !worksheet.cellHasValue(cell.value)) {
          setValueMatrix.setValue(cell.row, cell.col, {
            f: `=SUM(${serializeRange({
              startColumn: cell.col,
              endColumn: cell.col,
              startRow: targetRange.startRow,
              endRow: cell.row - 1
            })})`
          });
        }
      }
    }
    const lastColumn = alignToMergedCellsBorders({
      startRow: targetRange.startRow,
      startColumn: targetRange.endColumn,
      endRow: targetRange.endRow,
      endColumn: targetRange.endColumn
    }, worksheet);
    if (!Rectangle.equals(lastColumn, targetRange)) {
      for (const cell of worksheet.iterateByRow(lastColumn)) {
        if (!cell.value || !worksheet.cellHasValue(cell.value)) {
          setValueMatrix.setValue(cell.row, cell.col, {
            f: `=SUM(${serializeRange({
              startColumn: targetRange.startColumn,
              endColumn: cell.col - 1,
              startRow: cell.row,
              endRow: cell.row
            })})`
          });
        }
      }
    }
    const commandService = accessor.get(ICommandService);
    return (await sequenceExecuteAsync([
      {
        id: SetRangeValuesCommand.id,
        params: {
          range: targetRange,
          value: setValueMatrix.getMatrix()
        }
      },
      {
        id: SetSelectionsOperation.id,
        params: {
          unitId: target.unitId,
          subUnitId: target.subUnitId,
          selections: [{
            range: targetRange,
            primary: Rectangle.contains(targetRange, currentSelection.primary) ? currentSelection.primary : { ...firstCell, actualRow: firstCell.startRow, actualColumn: firstCell.startColumn },
            style: null
          }]
        }
      }
    ], commandService)).result;
  }
};

// ../packages/sheets-formula/src/controllers/formula.controller.ts
var FormulaController = class extends Disposable {
  constructor(_commandService) {
    super();
    __publicField(this, "_commandService", _commandService);
    [
      InsertFunctionCommand,
      QuickSumCommand,
      OtherFormulaMarkDirty
    ].forEach((c) => this._commandService.registerCommand(c));
  }
};
FormulaController = __decorateClass([
  __decorateParam(0, ICommandService)
], FormulaController);

// ../packages/sheets-formula/src/controllers/image-formula-cell-interceptor.controller.ts
var ImageFormulaCellInterceptorController = class extends Disposable {
  constructor(_commandService, _sheetInterceptorService, _formulaDataModel) {
    super();
    __publicField(this, "_commandService", _commandService);
    __publicField(this, "_sheetInterceptorService", _sheetInterceptorService);
    __publicField(this, "_formulaDataModel", _formulaDataModel);
    __publicField(this, "_errorValueCell", {
      v: "#VALUE!" /* VALUE */,
      t: 1 /* STRING */
    });
    __publicField(this, "_refreshRender");
    this._initialize();
  }
  _initialize() {
    this._commandExecutedListener();
    this._initInterceptorCellContent();
  }
  _commandExecutedListener() {
    this.disposeWithMe(
      this._commandService.onCommandExecuted(async (command) => {
        if (command.id === SetImageFormulaDataMutation.id) {
          const params = command.params;
          if (!params) return;
          const { imageFormulaData } = params;
          if (!imageFormulaData || imageFormulaData.length === 0) return;
          const updateRuntimeImageFormulaData = await Promise.all(
            imageFormulaData.map((imageFormulaInfo) => {
              return this._getImageNatureSize(imageFormulaInfo);
            })
          );
          const unitImageFormulaData = {};
          updateRuntimeImageFormulaData.forEach((imageFormulaInfo) => {
            const { unitId, sheetId, row, column, ...imageInfo } = imageFormulaInfo;
            if (!unitImageFormulaData[unitId]) {
              unitImageFormulaData[unitId] = {};
            }
            if (!unitImageFormulaData[unitId][sheetId]) {
              unitImageFormulaData[unitId][sheetId] = new ObjectMatrix();
            }
            unitImageFormulaData[unitId][sheetId].setValue(row, column, imageInfo);
          });
          this._formulaDataModel.mergeUnitImageFormulaData(unitImageFormulaData);
          this._refreshRender();
        }
      })
    );
  }
  // eslint-disable-next-line max-lines-per-function
  _initInterceptorCellContent() {
    this.disposeWithMe(
      this._sheetInterceptorService.intercept(INTERCEPTOR_POINT.CELL_CONTENT, {
        priority: 11 /* CELL_IMAGE */,
        effect: 2 /* Value */ | 1 /* Style */,
        // eslint-disable-next-line max-lines-per-function
        handler: (cell, location, next) => {
          var _a, _b;
          const { unitId, subUnitId, row, col } = location;
          const unitImageFormulaData = this._formulaDataModel.getUnitImageFormulaData();
          const imageInfo = (_b = (_a = unitImageFormulaData == null ? void 0 : unitImageFormulaData[unitId]) == null ? void 0 : _a[subUnitId]) == null ? void 0 : _b.getValue(row, col);
          if (!imageInfo) {
            return next(cell);
          }
          const {
            source,
            // altText,
            // sizing,
            height,
            width,
            isErrorImage,
            imageNaturalWidth,
            imageNaturalHeight
          } = imageInfo;
          if (isErrorImage) {
            return next(this._errorValueCell);
          }
          const finalWidth = width || imageNaturalWidth;
          const finalHeight = height || imageNaturalHeight;
          const docDataModel = createDocumentModelWithStyle("", {});
          const docDrawingParam = {
            unitId,
            subUnitId,
            drawingId: generateRandomId(),
            drawingType: 0 /* DRAWING_IMAGE */,
            imageSourceType: "URL" /* URL */,
            source,
            transform: {
              left: 0,
              top: 0,
              width: finalWidth,
              height: finalHeight
            },
            docTransform: {
              size: {
                width: finalWidth,
                height: finalHeight
              },
              positionH: {
                relativeFrom: 0 /* PAGE */,
                posOffset: 0
              },
              positionV: {
                relativeFrom: 1 /* PARAGRAPH */,
                posOffset: 0
              },
              angle: 0
            },
            behindDoc: 0 /* FALSE */,
            title: "",
            description: "",
            layoutType: 0 /* INLINE */,
            // Insert inline drawing by default.
            wrapText: 0 /* BOTH_SIDES */,
            distB: 0,
            distL: 0,
            distR: 0,
            distT: 0
          };
          const jsonXActions = BuildTextUtils.drawing.add({
            documentDataModel: docDataModel,
            drawings: [docDrawingParam],
            selection: {
              collapsed: true,
              startOffset: 0,
              endOffset: 0
            }
          });
          if (jsonXActions) {
            docDataModel.apply(jsonXActions);
            return next({
              ...cell,
              p: docDataModel.getSnapshot()
            });
          }
          return next(this._errorValueCell);
        }
      })
    );
  }
  async _getImageNatureSize(imageFormulaInfo) {
    const imageInfo = await this._getImageSize(imageFormulaInfo.source);
    if (!imageInfo.image) {
      return { ...imageFormulaInfo, isErrorImage: true };
    }
    return {
      ...imageFormulaInfo,
      isErrorImage: false,
      imageNaturalHeight: imageInfo.height,
      imageNaturalWidth: imageInfo.width
    };
  }
  async _getImageSize(src) {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = src;
      image.onload = () => {
        resolve({
          width: image.width,
          height: image.height,
          image
        });
      };
      image.onerror = () => {
        resolve({
          width: 0,
          height: 0,
          image: null
        });
      };
    });
  }
  registerRefreshRenderFunction(refreshRender) {
    this._refreshRender = refreshRender;
  }
};
ImageFormulaCellInterceptorController = __decorateClass([
  __decorateParam(0, ICommandService),
  __decorateParam(1, Inject(SheetInterceptorService)),
  __decorateParam(2, Inject(FormulaDataModel))
], ImageFormulaCellInterceptorController);

// ../packages/sheets-formula/src/controllers/super-table.controller.ts
var SuperTableController = class extends Disposable {
  constructor(_descriptionService, _univerInstanceService, _commandService, _superTableService) {
    super();
    __publicField(this, "_descriptionService", _descriptionService);
    __publicField(this, "_univerInstanceService", _univerInstanceService);
    __publicField(this, "_commandService", _commandService);
    __publicField(this, "_superTableService", _superTableService);
    __publicField(this, "_preUnitId", null);
    this._initialize();
  }
  _initialize() {
    this._descriptionListener();
    this._changeUnitListener();
    this._changeSheetListener();
  }
  _descriptionListener() {
    toDisposable(
      this._superTableService.update$.subscribe(() => {
        this._registerDescriptions();
      })
    );
  }
  _changeUnitListener() {
    toDisposable(
      this._univerInstanceService.getCurrentTypeOfUnit$(2 /* UNIVER_SHEET */).subscribe((workbook) => {
        this._unRegisterDescriptions();
        if (workbook) {
          this._registerDescriptions();
        }
      })
    );
  }
  _changeSheetListener() {
    this.disposeWithMe(
      this._commandService.onCommandExecuted((command, options) => {
        if (options == null ? void 0 : options.fromCollab) {
          return;
        }
        if (command.id === SetWorksheetActiveOperation.id) {
          this._unregisterDescriptionsForNotInSheetId();
          this._registerDescriptions();
        } else if (command.id === SetSuperTableMutation.id) {
          const param = command.params;
          this._registerDescription(param);
        } else if (command.id === RemoveSuperTableMutation.id) {
          const param = command.params;
          this._unregisterDescription(param);
        }
      })
    );
  }
  _registerDescription(param) {
    var _a, _b;
    const target = this._getUnitIdAndSheetId(param);
    if (!target) return;
    const { unitId } = target;
    const { tableName, reference } = param;
    if (!this._descriptionService.hasDescription(tableName)) {
      const sheetName = ((_b = (_a = this._univerInstanceService.getUnit(unitId)) == null ? void 0 : _a.getSheetBySheetId(reference.sheetId)) == null ? void 0 : _b.getName()) || "";
      const refString = serializeRangeWithSheet(sheetName, reference.range);
      this._descriptionService.registerDescriptions([{
        functionName: tableName,
        description: refString,
        abstract: refString,
        functionType: 17 /* Table */,
        functionParameter: []
      }]);
    }
  }
  _unregisterDescription(param) {
    const { tableName } = param;
    this._descriptionService.unregisterDescriptions([tableName]);
  }
  _unRegisterDescriptions() {
    if (this._preUnitId == null) {
      return;
    }
    const superTables = this._superTableService.getTableMap(this._preUnitId);
    if (superTables == null) {
      return;
    }
    const functionList = [];
    superTables.forEach((_, tableName) => {
      functionList.push(tableName);
    });
    this._descriptionService.unregisterDescriptions(functionList);
    this._preUnitId = null;
  }
  _getUnitIdAndSheetId(params = {}) {
    const { unitId, subUnitId } = params;
    const workbook = unitId ? this._univerInstanceService.getUnit(unitId, 2 /* UNIVER_SHEET */) : this._univerInstanceService.getCurrentUnitOfType(2 /* UNIVER_SHEET */);
    if (!workbook) return null;
    const worksheet = subUnitId ? workbook.getSheetBySheetId(subUnitId) : workbook.getActiveSheet(true);
    if (!worksheet) return null;
    return {
      unitId: workbook.getUnitId(),
      sheetId: worksheet.getSheetId()
    };
  }
  _registerDescriptions() {
    const target = this._getUnitIdAndSheetId();
    if (!target) return;
    const { unitId } = target;
    const superTables = this._superTableService.getTableMap(unitId);
    if (!superTables) {
      return;
    }
    const functionList = [];
    this._preUnitId = unitId;
    superTables.forEach((table, tableName) => {
      var _a, _b;
      const sheetName = ((_b = (_a = this._univerInstanceService.getUnit(unitId)) == null ? void 0 : _a.getSheetBySheetId(table.sheetId)) == null ? void 0 : _b.getName()) || "";
      const refString = serializeRangeWithSheet(sheetName, table.range);
      if (!this._descriptionService.hasDescription(tableName)) {
        functionList.push({
          functionName: tableName,
          description: refString,
          abstract: refString,
          functionType: 17 /* Table */,
          functionParameter: []
        });
      }
    });
    this._descriptionService.registerDescriptions(functionList);
  }
  _unregisterDescriptionsForNotInSheetId() {
    const target = this._getUnitIdAndSheetId();
    if (!target) return;
    const { unitId } = target;
    const superTables = this._superTableService.getTableMap(unitId);
    if (!superTables) {
      return;
    }
    const functionList = [];
    superTables.forEach((_, tableName) => {
      functionList.push(tableName);
    });
    this._descriptionService.unregisterDescriptions(functionList);
  }
};
SuperTableController = __decorateClass([
  __decorateParam(0, IDescriptionService),
  __decorateParam(1, IUniverInstanceService),
  __decorateParam(2, ICommandService),
  __decorateParam(3, ISuperTableService)
], SuperTableController);

// ../packages/sheets-formula/src/controllers/trigger-calculation.controller.ts
var NilProgress = { done: 0, count: 0 };
var lo = { onlyLocal: true };
var TriggerCalculationController = class extends Disposable {
  constructor(_commandService, _activeDirtyManagerService, _logService, _configService, _formulaDataModel, _localeService, _registerOtherFormulaService) {
    super();
    __publicField(this, "_commandService", _commandService);
    __publicField(this, "_activeDirtyManagerService", _activeDirtyManagerService);
    __publicField(this, "_logService", _logService);
    __publicField(this, "_configService", _configService);
    __publicField(this, "_formulaDataModel", _formulaDataModel);
    __publicField(this, "_localeService", _localeService);
    __publicField(this, "_registerOtherFormulaService", _registerOtherFormulaService);
    __publicField(this, "_waitingCommandQueue", []);
    __publicField(this, "_executingDirtyData", {
      forceCalculation: false,
      dirtyRanges: [],
      dirtyNameMap: {},
      dirtyDefinedNameMap: {},
      dirtyUnitFeatureMap: {},
      dirtyUnitOtherFormulaMap: {},
      clearDependencyTreeCache: {}
    });
    __publicField(this, "_setTimeoutKey", -1);
    __publicField(this, "_startExecutionTime", 0);
    __publicField(this, "_totalCalculationTaskCount", 0);
    __publicField(this, "_doneCalculationTaskCount", 0);
    __publicField(this, "_executionInProgressParams", null);
    __publicField(this, "_restartCalculation", false);
    __publicField(this, "_progress$", new BehaviorSubject(NilProgress));
    __publicField(this, "progress$", this._progress$.asObservable());
    this._commandExecutedListener();
    this._initialExecuteFormulaProcessListener();
    this._initialExecuteFormula();
  }
  _emitProgress(label) {
    this._progress$.next({ done: this._doneCalculationTaskCount, count: this._totalCalculationTaskCount, label });
  }
  _startProgress() {
    this._doneCalculationTaskCount = 0;
    this._totalCalculationTaskCount = 1;
    const analyzing = this._localeService.t("formula.progress.analyzing");
    this._emitProgress(analyzing);
  }
  _calculateProgress(label) {
    if (this._executionInProgressParams) {
      const { totalFormulasToCalculate, completedFormulasCount, totalArrayFormulasToCalculate, completedArrayFormulasCount } = this._executionInProgressParams;
      this._doneCalculationTaskCount = completedFormulasCount + completedArrayFormulasCount;
      this._totalCalculationTaskCount = totalFormulasToCalculate + totalArrayFormulasToCalculate;
      if (this._totalCalculationTaskCount === 0) {
        return;
      }
      this._emitProgress(label);
    }
  }
  _completeProgress() {
    this._doneCalculationTaskCount = this._totalCalculationTaskCount = 1;
    const done = this._localeService.t("formula.progress.done");
    this._emitProgress(done);
  }
  clearProgress() {
    this._doneCalculationTaskCount = 0;
    this._totalCalculationTaskCount = 0;
    this._emitProgress();
  }
  dispose() {
    super.dispose();
    this._progress$.next(NilProgress);
    this._progress$.complete();
    clearTimeout(this._setTimeoutKey);
  }
  _getCalculationMode() {
    var _a;
    const config = this._configService.getConfig(PLUGIN_CONFIG_KEY_BASE);
    return (_a = config == null ? void 0 : config.initialFormulaComputing) != null ? _a : 1 /* WHEN_EMPTY */;
  }
  _commandExecutedListener() {
    this.disposeWithMe(
      this._commandService.beforeCommandExecuted((command) => {
        if (command.id === SetFormulaCalculationStartMutation.id || command.id === SetFormulaStringBatchCalculationMutation.id) {
          const params = command.params;
          if (command.id === SetFormulaCalculationStartMutation.id) {
            const isCalculateTreeModel = this._configService.getConfig(ENGINE_FORMULA_RETURN_DEPENDENCY_TREE) || false;
            params.isCalculateTreeModel = isCalculateTreeModel;
          }
          params.maxIteration = this._configService.getConfig(ENGINE_FORMULA_CYCLE_REFERENCE_COUNT);
          params.rowData = this._formulaDataModel.getHiddenRowsFiltered();
        }
      })
    );
    this.disposeWithMe(
      this._commandService.onCommandExecuted((command, options) => {
        if (!this._activeDirtyManagerService.get(command.id)) {
          return;
        }
        if (command.id === SetRangeValuesMutation.id) {
          const params = command.params;
          if (options && options.onlyLocal === true || params.trigger === SetStyleCommand.id || params.trigger === SetBorderCommand.id || params.trigger === ClearSelectionFormatCommand.id) {
            return;
          }
        }
        this._waitingCommandQueue.push(command);
        clearTimeout(this._setTimeoutKey);
        this._setTimeoutKey = setTimeout(() => {
          const dirtyData = this._generateDirty(this._waitingCommandQueue);
          this._executingDirtyData = this._mergeDirty(this._executingDirtyData, dirtyData);
          if (this._executionInProgressParams == null) {
            this._commandService.executeCommand(SetFormulaCalculationStartMutation.id, { ...this._executingDirtyData }, lo);
          } else {
            this._restartCalculation = true;
            this._commandService.executeCommand(SetFormulaCalculationStopMutation.id, {});
          }
          this._waitingCommandQueue = [];
        }, 100);
      })
    );
  }
  _generateDirty(commands) {
    const allDirtyRanges = [];
    const allDirtyNameMap = {};
    const allDirtyDefinedNameMap = {};
    const allDirtyUnitFeatureMap = {};
    const allDirtyUnitOtherFormulaMap = {};
    const allClearDependencyTreeCache = {};
    let allForceCalculation = false;
    for (const command of commands) {
      const conversion = this._activeDirtyManagerService.get(command.id);
      if (conversion == null) {
        continue;
      }
      const params = conversion.getDirtyData(command);
      const { dirtyRanges, dirtyNameMap, dirtyDefinedNameMap, dirtyUnitFeatureMap, dirtyUnitOtherFormulaMap, clearDependencyTreeCache, forceCalculation = false } = params;
      if (dirtyRanges != null) {
        this._mergeDirtyRanges(allDirtyRanges, dirtyRanges);
      }
      if (dirtyNameMap != null) {
        this._mergeDirtyNameMap(allDirtyNameMap, dirtyNameMap);
      }
      if (dirtyDefinedNameMap != null) {
        this._mergeDirtyNameMap(allDirtyDefinedNameMap, dirtyDefinedNameMap);
      }
      if (dirtyUnitFeatureMap != null) {
        this._mergeDirtyUnitFeatureOrOtherFormulaMap(allDirtyUnitFeatureMap, dirtyUnitFeatureMap);
      }
      if (dirtyUnitOtherFormulaMap != null) {
        this._mergeDirtyUnitFeatureOrOtherFormulaMap(allDirtyUnitOtherFormulaMap, dirtyUnitOtherFormulaMap);
      }
      if (clearDependencyTreeCache != null) {
        this._mergeDirtyNameMap(allClearDependencyTreeCache, clearDependencyTreeCache);
      }
      allForceCalculation = allForceCalculation || forceCalculation;
    }
    return {
      dirtyRanges: allDirtyRanges,
      dirtyNameMap: allDirtyNameMap,
      dirtyDefinedNameMap: allDirtyDefinedNameMap,
      dirtyUnitFeatureMap: allDirtyUnitFeatureMap,
      dirtyUnitOtherFormulaMap: allDirtyUnitOtherFormulaMap,
      forceCalculation: allForceCalculation,
      clearDependencyTreeCache: allClearDependencyTreeCache
      // numfmtItemMap,
    };
  }
  _mergeDirty(dirtyData1, dirtyData2) {
    const allDirtyRanges = [...dirtyData1.dirtyRanges, ...dirtyData2.dirtyRanges];
    const allDirtyNameMap = { ...dirtyData1.dirtyNameMap };
    const allDirtyDefinedNameMap = { ...dirtyData1.dirtyDefinedNameMap };
    const allDirtyUnitFeatureMap = { ...dirtyData1.dirtyUnitFeatureMap };
    const allDirtyUnitOtherFormulaMap = { ...dirtyData1.dirtyUnitOtherFormulaMap };
    const allClearDependencyTreeCache = { ...dirtyData1.clearDependencyTreeCache };
    this._mergeDirtyNameMap(allDirtyNameMap, dirtyData2.dirtyNameMap);
    this._mergeDirtyNameMap(allDirtyDefinedNameMap, dirtyData2.dirtyDefinedNameMap);
    this._mergeDirtyUnitFeatureOrOtherFormulaMap(allDirtyUnitFeatureMap, dirtyData2.dirtyUnitFeatureMap);
    this._mergeDirtyUnitFeatureOrOtherFormulaMap(allDirtyUnitOtherFormulaMap, dirtyData2.dirtyUnitOtherFormulaMap);
    this._mergeDirtyNameMap(allClearDependencyTreeCache, dirtyData2.clearDependencyTreeCache);
    const allForceCalculating = dirtyData1.forceCalculation || dirtyData2.forceCalculation;
    return {
      dirtyRanges: allDirtyRanges,
      dirtyNameMap: allDirtyNameMap,
      dirtyDefinedNameMap: allDirtyDefinedNameMap,
      dirtyUnitFeatureMap: allDirtyUnitFeatureMap,
      dirtyUnitOtherFormulaMap: allDirtyUnitOtherFormulaMap,
      forceCalculation: allForceCalculating,
      clearDependencyTreeCache: allClearDependencyTreeCache
    };
  }
  /**
   * dirtyRanges may overlap with the ranges in allDirtyRanges and need to be deduplicated
   * @param allDirtyRanges
   * @param dirtyRanges
   */
  _mergeDirtyRanges(allDirtyRanges, dirtyRanges) {
    for (const range of dirtyRanges) {
      let isDuplicate = false;
      for (const existingRange of allDirtyRanges) {
        if (range.unitId === existingRange.unitId && range.sheetId === existingRange.sheetId) {
          const { startRow, startColumn, endRow, endColumn } = range.range;
          const { startRow: existingStartRow, startColumn: existingStartColumn, endRow: existingEndRow, endColumn: existingEndColumn } = existingRange.range;
          if (startRow === existingStartRow && startColumn === existingStartColumn && endRow === existingEndRow && endColumn === existingEndColumn) {
            isDuplicate = true;
            break;
          }
        }
      }
      if (!isDuplicate) {
        allDirtyRanges.push(range);
      }
    }
  }
  _mergeDirtyNameMap(allDirtyNameMap, dirtyNameMap) {
    Object.keys(dirtyNameMap).forEach((unitId) => {
      if (allDirtyNameMap[unitId] == null) {
        allDirtyNameMap[unitId] = {};
      }
      Object.keys(dirtyNameMap[unitId]).forEach((sheetId) => {
        var _a;
        if ((_a = dirtyNameMap[unitId]) == null ? void 0 : _a[sheetId]) {
          allDirtyNameMap[unitId][sheetId] = dirtyNameMap[unitId][sheetId];
        }
      });
    });
  }
  _mergeDirtyUnitFeatureOrOtherFormulaMap(allDirtyUnitFeatureOrOtherFormulaMap, dirtyUnitFeatureOrOtherFormulaMap) {
    Object.keys(dirtyUnitFeatureOrOtherFormulaMap).forEach((unitId) => {
      if (allDirtyUnitFeatureOrOtherFormulaMap[unitId] == null) {
        allDirtyUnitFeatureOrOtherFormulaMap[unitId] = {};
      }
      Object.keys(dirtyUnitFeatureOrOtherFormulaMap[unitId]).forEach((sheetId) => {
        if (allDirtyUnitFeatureOrOtherFormulaMap[unitId][sheetId] == null) {
          allDirtyUnitFeatureOrOtherFormulaMap[unitId][sheetId] = {};
        }
        Object.keys(dirtyUnitFeatureOrOtherFormulaMap[unitId][sheetId]).forEach((featureIdOrFormulaId) => {
          allDirtyUnitFeatureOrOtherFormulaMap[unitId][sheetId][featureIdOrFormulaId] = dirtyUnitFeatureOrOtherFormulaMap[unitId][sheetId][featureIdOrFormulaId] || false;
        });
      });
    });
  }
  // eslint-disable-next-line max-lines-per-function
  _initialExecuteFormulaProcessListener() {
    let startDependencyTimer = null;
    let calculationProcessCount = 0;
    this.disposeWithMe(
      // eslint-disable-next-line max-lines-per-function, complexity
      this._commandService.onCommandExecuted((command) => {
        if (command.id === SetFormulaCalculationStopMutation.id) {
          this.clearProgress();
        }
        if (command.id !== SetFormulaCalculationNotificationMutation.id) {
          return;
        }
        const params = command.params;
        if (params.stageInfo != null) {
          const {
            stage
          } = params.stageInfo;
          if (stage === 1 /* START */) {
            if (calculationProcessCount === 0) {
              this._startExecutionTime = performance.now();
            }
            calculationProcessCount++;
            if (startDependencyTimer !== null) {
              clearTimeout(startDependencyTimer);
              startDependencyTimer = null;
            }
            startDependencyTimer = setTimeout(() => {
              startDependencyTimer = null;
              this._startProgress();
            }, 1e3);
          } else if (stage === 4 /* CURRENTLY_CALCULATING */) {
            this._executionInProgressParams = params.stageInfo;
            if (startDependencyTimer === null) {
              const calculating = this._localeService.t("formula.progress.calculating");
              this._calculateProgress(calculating);
            }
          } else if (stage === 5 /* START_DEPENDENCY_ARRAY_FORMULA */) {
            this._executionInProgressParams = params.stageInfo;
            if (startDependencyTimer === null) {
              const arrayAnalysis = this._localeService.t("formula.progress.array-analysis");
              this._calculateProgress(arrayAnalysis);
            }
          } else if (stage === 7 /* CURRENTLY_CALCULATING_ARRAY_FORMULA */) {
            this._executionInProgressParams = params.stageInfo;
            if (startDependencyTimer === null) {
              const arrayCalculation = this._localeService.t("formula.progress.array-calculation");
              this._calculateProgress(arrayCalculation);
            }
          }
        } else {
          const state = params.functionsExecutedState;
          let result = "";
          calculationProcessCount--;
          switch (state) {
            case 2 /* NOT_EXECUTED */:
              result = "No tasks are being executed anymore";
              this._resetExecutingDirtyData();
              break;
            case 1 /* STOP_EXECUTION */:
              result = "The execution of the formula has been stopped";
              calculationProcessCount = 0;
              break;
            case 3 /* SUCCESS */:
              result = "Formula calculation succeeded";
              if (calculationProcessCount === 0 || calculationProcessCount === -1) {
                result += `. Total time consumed: ${performance.now() - this._startExecutionTime} ms`;
              }
              this._resetExecutingDirtyData();
              break;
            case 0 /* INITIAL */:
              result = "Waiting for calculation";
              this._resetExecutingDirtyData();
              break;
          }
          if (calculationProcessCount === 0 || calculationProcessCount === -1) {
            if (startDependencyTimer) {
              clearTimeout(startDependencyTimer);
              startDependencyTimer = null;
              this.clearProgress();
            } else {
              this._completeProgress();
            }
            calculationProcessCount = 0;
            this._doneCalculationTaskCount = 0;
            this._totalCalculationTaskCount = 0;
          }
          if (state === 1 /* STOP_EXECUTION */ && this._restartCalculation) {
            this._restartCalculation = false;
            this._commandService.executeCommand(
              SetFormulaCalculationStartMutation.id,
              {
                ...this._executingDirtyData
              },
              lo
            );
          } else {
            this._executionInProgressParams = null;
          }
          this._logService.debug("[TriggerCalculationController]", result);
        }
      })
    );
  }
  _resetExecutingDirtyData() {
    this._executingDirtyData = {
      dirtyRanges: [],
      dirtyNameMap: {},
      dirtyDefinedNameMap: {},
      dirtyUnitFeatureMap: {},
      dirtyUnitOtherFormulaMap: {},
      forceCalculation: false,
      clearDependencyTreeCache: {}
    };
  }
  _initialExecuteFormula() {
    const calculationMode = this._getCalculationMode();
    const params = this._getDirtyDataByCalculationMode(calculationMode);
    this._commandService.executeCommand(SetTriggerFormulaCalculationStartMutation.id, params, lo);
    this._registerOtherFormulaService.calculateStarted$.next(true);
  }
  _getDirtyDataByCalculationMode(calculationMode) {
    const forceCalculation = calculationMode === 0 /* FORCED */;
    const dirtyRanges = calculationMode === 1 /* WHEN_EMPTY */ ? this._formulaDataModel.getFormulaDirtyRanges() : [];
    const dirtyNameMap = {};
    const dirtyDefinedNameMap = {};
    const dirtyUnitFeatureMap = {};
    const dirtyUnitOtherFormulaMap = {};
    const clearDependencyTreeCache = {};
    return {
      forceCalculation,
      dirtyRanges,
      dirtyNameMap,
      dirtyDefinedNameMap,
      dirtyUnitFeatureMap,
      dirtyUnitOtherFormulaMap,
      clearDependencyTreeCache
    };
  }
};
TriggerCalculationController = __decorateClass([
  __decorateParam(0, ICommandService),
  __decorateParam(1, IActiveDirtyManagerService),
  __decorateParam(2, ILogService),
  __decorateParam(3, IConfigService),
  __decorateParam(4, Inject(FormulaDataModel)),
  __decorateParam(5, Inject(LocaleService)),
  __decorateParam(6, Inject(RegisterOtherFormulaService))
], TriggerCalculationController);

// ../packages/sheets-formula/src/controllers/utils/offset-formula-data.ts
function checkFormulaDataNull(formulaData, unitId, sheetId) {
  var _a;
  if (formulaData == null || formulaData[unitId] == null || ((_a = formulaData[unitId]) == null ? void 0 : _a[sheetId]) == null) {
    return true;
  }
  return false;
}
function removeFormulaData(formulaData, unitId, sheetId) {
  var _a;
  if (sheetId) {
    if (formulaData && formulaData[unitId] && ((_a = formulaData[unitId]) == null ? void 0 : _a[sheetId])) {
      delete formulaData[unitId][sheetId];
      return {
        [unitId]: {
          [sheetId]: null
        }
      };
    }
  } else {
    if (formulaData && formulaData[unitId]) {
      delete formulaData[unitId];
      return {
        [unitId]: null
      };
    }
  }
}

// ../packages/sheets-formula/src/controllers/utils/ref-range-formula.ts
var formulaReferenceSheetList = [
  11 /* SetName */,
  12 /* RemoveSheet */,
  13 /* SetDefinedName */,
  14 /* RemoveDefinedName */
];
function getFormulaReferenceMoveUndoRedo(oldFormulaData, newFormulaData, formulaReferenceMoveParam) {
  const { type } = formulaReferenceMoveParam;
  if (formulaReferenceSheetList.includes(type)) {
    return getFormulaReferenceSheet(oldFormulaData, newFormulaData);
  } else {
    return getFormulaReferenceRange(oldFormulaData, newFormulaData, formulaReferenceMoveParam);
  }
}
function getFormulaReferenceSheet(oldFormulaData, newFormulaData) {
  const undos = [];
  const redos = [];
  Object.keys(newFormulaData).forEach((unitId) => {
    const newSheetData = newFormulaData[unitId];
    const oldSheetData = oldFormulaData[unitId];
    if (newSheetData == null) {
      return true;
    }
    if (oldSheetData == null) {
      return true;
    }
    Object.keys(newSheetData).forEach((subUnitId) => {
      const newSheetFormula = new ObjectMatrix(newSheetData[subUnitId] || {});
      const oldSheetFormula = new ObjectMatrix(oldSheetData[subUnitId] || {});
      const redoFormulaMatrix = new ObjectMatrix();
      const undoFormulaMatrix = new ObjectMatrix();
      newSheetFormula.forValue((r, c, cell) => {
        if (cell == null) {
          return true;
        }
        const newValue = formulaDataItemToCellData(cell);
        if (newValue === null) {
          return;
        }
        redoFormulaMatrix.setValue(r, c, newValue);
        undoFormulaMatrix.setValue(r, c, oldSheetFormula.getValue(r, c));
      });
      if (redoFormulaMatrix.getSizeOf() === 0) {
        return;
      }
      const redoSetRangeValuesMutationParams = {
        subUnitId,
        unitId,
        cellValue: redoFormulaMatrix.getMatrix()
      };
      const redoMutation = {
        id: SetRangeValuesMutation.id,
        params: redoSetRangeValuesMutationParams
      };
      redos.push(redoMutation);
      const undoSetRangeValuesMutationParams = {
        subUnitId,
        unitId,
        cellValue: undoFormulaMatrix.getMatrix()
      };
      const undoMutation = {
        id: SetRangeValuesMutation.id,
        params: undoSetRangeValuesMutationParams
      };
      undos.push(undoMutation);
    });
  });
  return {
    undos,
    redos
  };
}
function getFormulaReferenceRange(oldFormulaData, newFormulaData, formulaReferenceMoveParam) {
  const { redoFormulaData, undoFormulaData } = refRangeFormula(oldFormulaData, newFormulaData, formulaReferenceMoveParam);
  const redos = [];
  const undos = [];
  Object.keys(redoFormulaData).forEach((unitId) => {
    Object.keys(redoFormulaData[unitId]).forEach((subUnitId) => {
      if (Object.keys(redoFormulaData[unitId][subUnitId]).length !== 0) {
        const redoSetRangeValuesMutationParams = {
          subUnitId,
          unitId,
          cellValue: redoFormulaData[unitId][subUnitId]
        };
        const redoMutation = {
          id: SetRangeValuesMutation.id,
          params: redoSetRangeValuesMutationParams
        };
        redos.push(redoMutation);
      }
    });
  });
  Object.keys(undoFormulaData).forEach((unitId) => {
    Object.keys(undoFormulaData[unitId]).forEach((subUnitId) => {
      if (Object.keys(undoFormulaData[unitId][subUnitId]).length !== 0) {
        const undoSetRangeValuesMutationParams = {
          subUnitId,
          unitId,
          cellValue: undoFormulaData[unitId][subUnitId]
        };
        const undoMutation = {
          id: SetRangeValuesMutation.id,
          params: undoSetRangeValuesMutationParams
        };
        undos.push(undoMutation);
      }
    });
  });
  return {
    undos,
    redos
  };
}
function refRangeFormula(oldFormulaData, newFormulaData, formulaReferenceMoveParam) {
  var _a, _b;
  const redoFormulaData = {};
  const undoFormulaData = {};
  const { unitId: fromUnitId, sheetId: fromSheetId } = formulaReferenceMoveParam;
  const targetUnitId = (_a = formulaReferenceMoveParam.targetUnitId) != null ? _a : fromUnitId;
  const targetSheetId = (_b = formulaReferenceMoveParam.targetSheetId) != null ? _b : fromSheetId;
  const isCrossSheet = fromUnitId !== targetUnitId || fromSheetId !== targetSheetId;
  const allUnitIds = /* @__PURE__ */ new Set([...Object.keys(oldFormulaData), ...Object.keys(newFormulaData)]);
  allUnitIds.forEach((unitId) => {
    if (checkFormulaDataNull(oldFormulaData, unitId, fromSheetId)) {
      return;
    }
    const allSheetIds = /* @__PURE__ */ new Set([
      ...Object.keys(oldFormulaData[unitId] || {}),
      ...Object.keys(newFormulaData[unitId] || {})
    ]);
    allSheetIds.forEach((currentSheetId) => {
      var _a2, _b2;
      const currentOldFormulaData = (_a2 = oldFormulaData[unitId]) == null ? void 0 : _a2[currentSheetId];
      const currentNewFormulaData = (_b2 = newFormulaData[unitId]) == null ? void 0 : _b2[currentSheetId];
      const oldFormulaMatrix = new ObjectMatrix(currentOldFormulaData || {});
      const newFormulaMatrix = new ObjectMatrix(currentNewFormulaData || {});
      let rangeList = [];
      if (isCrossSheet || unitId !== fromUnitId || currentSheetId !== fromSheetId) {
        rangeList = processFormulaRange(newFormulaMatrix);
      } else {
        rangeList = processFormulaChanges(oldFormulaMatrix, newFormulaMatrix, formulaReferenceMoveParam);
      }
      const sheetRedoFormulaData = getRedoFormulaData(rangeList, oldFormulaMatrix, newFormulaMatrix);
      const sheetUndoFormulaData = getUndoFormulaData(rangeList, oldFormulaMatrix);
      if (!redoFormulaData[unitId]) {
        redoFormulaData[unitId] = {};
      }
      if (!undoFormulaData[unitId]) {
        undoFormulaData[unitId] = {};
      }
      redoFormulaData[unitId][currentSheetId] = {
        ...redoFormulaData[unitId][currentSheetId],
        ...sheetRedoFormulaData
      };
      undoFormulaData[unitId][currentSheetId] = {
        ...undoFormulaData[unitId][currentSheetId],
        ...sheetUndoFormulaData
      };
    });
  });
  return {
    redoFormulaData,
    undoFormulaData
  };
}
function processFormulaChanges(oldFormulaMatrix, newFormulaMatrix, formulaReferenceMoveParam) {
  const { type, from, to, range } = formulaReferenceMoveParam;
  const rangeList = [];
  oldFormulaMatrix.forValue((row, column, cell) => {
    if (cell == null || !isFormulaDataItem(cell)) return true;
    const oldCell = cellToRange(row, column);
    let newCell = null;
    let isReverse = false;
    if ([0 /* MoveRange */, 1 /* MoveRows */, 2 /* MoveCols */].includes(type)) {
      newCell = handleMove(type, from, to, oldCell);
    } else if (range !== void 0 && range !== null) {
      const result = handleInsertDelete(oldCell, formulaReferenceMoveParam);
      newCell = result.newCell;
      isReverse = result.isReverse;
    }
    if (Tools.diffValue(oldCell, newCell) && !newFormulaMatrix.getValue(row, column)) {
      return true;
    }
    isReverse ? rangeList.unshift({ oldCell, newCell }) : rangeList.push({ oldCell, newCell });
  });
  return rangeList;
}
function processFormulaRange(newFormulaMatrix) {
  const rangeList = [];
  newFormulaMatrix.forValue((row, column, cell) => {
    if (cell == null || !isFormulaDataItem(cell)) return true;
    const newCell = cellToRange(row, column);
    rangeList.push({ oldCell: newCell, newCell });
  });
  return rangeList;
}
function handleMove(type, from, to, oldCell) {
  if (from == null || to == null) {
    return null;
  }
  switch (type) {
    case 0 /* MoveRange */:
      return handleRefMoveRange(from, to, oldCell);
    case 1 /* MoveRows */:
      return handleRefMoveRows(from, to, oldCell);
    case 2 /* MoveCols */:
      return handleRefMoveCols(from, to, oldCell);
    default:
      return null;
  }
}
function handleInsertDelete(oldCell, formulaReferenceMoveParam) {
  const { type, rangeFilteredRows } = formulaReferenceMoveParam;
  const range = formulaReferenceMoveParam.range;
  let newCell = null;
  let isReverse = false;
  switch (type) {
    case 3 /* InsertRow */:
      newCell = handleRefInsertRow(range, oldCell);
      isReverse = true;
      break;
    case 4 /* InsertColumn */:
      newCell = handleRefInsertCol(range, oldCell);
      isReverse = true;
      break;
    case 5 /* RemoveRow */:
      newCell = handleRefRemoveRow(range, oldCell, rangeFilteredRows);
      break;
    case 6 /* RemoveColumn */:
      newCell = handleRefRemoveCol(range, oldCell);
      break;
    case 7 /* DeleteMoveLeft */:
      newCell = handleRefDeleteMoveLeft(range, oldCell);
      break;
    case 8 /* DeleteMoveUp */:
      newCell = handleRefDeleteMoveUp(range, oldCell);
      break;
    case 9 /* InsertMoveDown */:
      newCell = handleRefInsertMoveDown(range, oldCell);
      isReverse = true;
      break;
    case 10 /* InsertMoveRight */:
      newCell = handleRefInsertMoveRight(range, oldCell);
      isReverse = true;
      break;
    default:
      break;
  }
  return { newCell, isReverse };
}
function handleRefMoveRange(from, to, oldCell) {
  const operators = handleMoveRange(
    {
      id: EffectRefRangId.MoveRangeCommandId,
      params: { toRange: to, fromRange: from }
    },
    oldCell
  );
  return runRefRangeMutations(operators, oldCell);
}
function handleRefMoveRows(from, to, oldCell) {
  const operators = handleMoveRows(
    {
      id: EffectRefRangId.MoveRowsCommandId,
      params: { toRange: to, fromRange: from }
    },
    oldCell
  );
  return runRefRangeMutations(operators, oldCell);
}
function handleRefMoveCols(from, to, oldCell) {
  const operators = handleMoveCols(
    {
      id: EffectRefRangId.MoveColsCommandId,
      params: { toRange: to, fromRange: from }
    },
    oldCell
  );
  return runRefRangeMutations(operators, oldCell);
}
function handleRefInsertRow(range, oldCell) {
  const operators = handleInsertRow(
    {
      id: EffectRefRangId.InsertRowCommandId,
      params: { range, unitId: "", subUnitId: "", direction: 2 /* DOWN */ }
    },
    oldCell
  );
  return runRefRangeMutations(operators, oldCell);
}
function handleRefInsertCol(range, oldCell) {
  const operators = handleInsertCol(
    {
      id: EffectRefRangId.InsertColCommandId,
      params: { range, unitId: "", subUnitId: "", direction: 1 /* RIGHT */ }
    },
    oldCell
  );
  return runRefRangeMutations(operators, oldCell);
}
function handleRefRemoveRow(range, oldCell, rangeFilteredRows) {
  const operators = handleIRemoveRow(
    {
      id: EffectRefRangId.RemoveRowCommandId,
      params: { range }
    },
    oldCell,
    rangeFilteredRows
  );
  return runRefRangeMutations(operators, oldCell);
}
function handleRefRemoveCol(range, oldCell) {
  const operators = handleIRemoveCol(
    {
      id: EffectRefRangId.RemoveColCommandId,
      params: { range }
    },
    oldCell
  );
  return runRefRangeMutations(operators, oldCell);
}
function handleRefDeleteMoveLeft(range, oldCell) {
  const operators = handleDeleteRangeMoveLeft(
    {
      id: EffectRefRangId.DeleteRangeMoveLeftCommandId,
      params: { range }
    },
    oldCell
  );
  return runRefRangeMutations(operators, oldCell);
}
function handleRefDeleteMoveUp(range, oldCell) {
  const operators = handleDeleteRangeMoveUp(
    {
      id: EffectRefRangId.DeleteRangeMoveUpCommandId,
      params: { range }
    },
    oldCell
  );
  return runRefRangeMutations(operators, oldCell);
}
function handleRefInsertMoveDown(range, oldCell) {
  const operators = handleInsertRangeMoveDown(
    {
      id: EffectRefRangId.InsertRangeMoveDownCommandId,
      params: { range }
    },
    oldCell
  );
  return runRefRangeMutations(operators, oldCell);
}
function handleRefInsertMoveRight(range, oldCell) {
  const operators = handleInsertRangeMoveRight(
    {
      id: EffectRefRangId.InsertRangeMoveRightCommandId,
      params: { range }
    },
    oldCell
  );
  return runRefRangeMutations(operators, oldCell);
}
function getRedoFormulaData(rangeList, oldFormulaMatrix, newFormulaMatrix) {
  var _a, _b, _c;
  const redoFormulaData = new ObjectMatrix({});
  for (let i = 0; i < rangeList.length; i++) {
    const { oldCell, newCell } = rangeList[i];
    if (!(((_a = redoFormulaData.getValue(oldCell.startRow, oldCell.startColumn)) == null ? void 0 : _a.f) || ((_b = redoFormulaData.getValue(oldCell.startRow, oldCell.startColumn)) == null ? void 0 : _b.si))) {
      redoFormulaData.setValue(oldCell.startRow, oldCell.startColumn, { f: null, si: null });
    }
    if (newCell) {
      const newFormula = (_c = newFormulaMatrix.getValue(oldCell.startRow, oldCell.startColumn)) != null ? _c : oldFormulaMatrix.getValue(oldCell.startRow, oldCell.startColumn);
      const newValue = formulaDataItemToCellData(newFormula);
      redoFormulaData.setValue(newCell.startRow, newCell.startColumn, newValue);
    }
  }
  return redoFormulaData.getMatrix();
}
function getUndoFormulaData(rangeList, oldFormulaMatrix) {
  const undoFormulaData = new ObjectMatrix({});
  for (let i = rangeList.length - 1; i >= 0; i--) {
    const { oldCell, newCell } = rangeList[i];
    const oldCellOldFormula = oldFormulaMatrix.getValue(oldCell.startRow, oldCell.startColumn);
    const oldCellOldValue = formulaDataItemToCellData(oldCellOldFormula);
    undoFormulaData.setValue(oldCell.startRow, oldCell.startColumn, oldCellOldValue);
    if (newCell) {
      const newCellOldFormula = oldFormulaMatrix.getValue(newCell.startRow, newCell.startColumn);
      const newCellOldValue = formulaDataItemToCellData(newCellOldFormula);
      undoFormulaData.setValue(newCell.startRow, newCell.startColumn, newCellOldValue != null ? newCellOldValue : { f: null, si: null });
    }
  }
  return undoFormulaData.getMatrix();
}
function formulaDataItemToCellData(formulaDataItem) {
  if (formulaDataItem === void 0) {
    return;
  }
  if (formulaDataItem === null) {
    return {
      f: null,
      si: null
    };
  }
  const { f, si, x = 0, y = 0 } = formulaDataItem;
  const checkFormulaString = isFormulaString(f);
  const checkFormulaId = isFormulaId(si);
  if (!checkFormulaString && !checkFormulaId) {
    return {
      f: null,
      si: null
    };
  }
  const cellData = {};
  if (checkFormulaId) {
    cellData.si = si;
  }
  if (checkFormulaString && x === 0 && y === 0) {
    cellData.f = f;
  }
  if (cellData.f === void 0) {
    cellData.f = null;
  }
  if (cellData.si === void 0) {
    cellData.si = null;
  }
  return cellData;
}
function formulaDataToCellData(formulaData, changedCellValue) {
  const cellData = new ObjectMatrix({});
  const formulaDataMatrix = new ObjectMatrix(formulaData);
  formulaDataMatrix.forValue((r, c, formulaDataItem) => {
    var _a;
    const cellDataItem = formulaDataItemToCellData(formulaDataItem);
    if (cellDataItem === void 0) {
      return;
    }
    if (changedCellValue && ((_a = changedCellValue[r]) == null ? void 0 : _a[c]) && ((cellDataItem == null ? void 0 : cellDataItem.f) || (cellDataItem == null ? void 0 : cellDataItem.si))) {
      cellDataItem.v = null;
      cellDataItem.t = null;
    }
    cellData.setValue(r, c, cellDataItem);
  });
  return cellData.getMatrix();
}
function isFormulaDataItem(cell) {
  const formulaString = (cell == null ? void 0 : cell.f) || "";
  const formulaId = (cell == null ? void 0 : cell.si) || "";
  const checkFormulaString = isFormulaString(formulaString);
  const checkFormulaId = isFormulaId(formulaId);
  if (checkFormulaString || checkFormulaId) {
    return true;
  }
  return false;
}
function checkIsSameUnitAndSheet(userUnitId, userSheetId, currentFormulaUnitId, currentFormulaSheetId, sequenceRangeUnitId, sequenceRangeSheetId) {
  if ((sequenceRangeUnitId == null || sequenceRangeUnitId.length === 0) && (sequenceRangeSheetId == null || sequenceRangeSheetId.length === 0)) {
    if (userUnitId === currentFormulaUnitId && userSheetId === currentFormulaSheetId) {
      return true;
    }
  } else if ((userUnitId === sequenceRangeUnitId || sequenceRangeUnitId == null || sequenceRangeUnitId.length === 0) && userSheetId === sequenceRangeSheetId) {
    return true;
  }
  return false;
}
function updateRefOffset(sequenceNodes, refChangeIds, refOffsetX = 0, refOffsetY = 0) {
  const newSequenceNodes = [];
  for (let i = 0, len = sequenceNodes.length; i < len; i++) {
    const node = sequenceNodes[i];
    if (typeof node === "string" || node.nodeType !== 4 /* REFERENCE */ || refChangeIds.includes(i)) {
      newSequenceNodes.push(node);
      continue;
    }
    const { token } = node;
    const sequenceGrid = deserializeRangeWithSheetWithCache(token);
    const { range, sheetName, unitId: sequenceUnitId } = sequenceGrid;
    const newRange = Rectangle.moveOffset(range, refOffsetX, refOffsetY);
    newSequenceNodes.push({
      ...node,
      token: serializeRangeToRefString({
        range: newRange,
        unitId: sequenceUnitId,
        sheetName
      })
    });
  }
  return newSequenceNodes;
}

// ../packages/sheets-formula/src/controllers/utils/ref-range-move.ts
function getNewRangeByMoveParam(unitRangeWidthOffset, formulaReferenceMoveParam, currentFormulaUnitId, currentFormulaSheetId, options = {}) {
  const {
    type,
    unitId: userUnitId,
    sheetId: userSheetId,
    targetUnitId,
    targetSheetId,
    targetSheetName,
    range,
    from,
    to,
    rangeFilteredRows
  } = formulaReferenceMoveParam;
  const {
    range: unitRange,
    sheetId: sequenceRangeSheetId,
    unitId: sequenceRangeUnitId,
    sheetName: sequenceRangeSheetName,
    refOffsetX,
    refOffsetY
  } = unitRangeWidthOffset;
  const { preserveSheetQualifier = false, inCrossSheetCutRange = false } = options;
  if (!checkIsSameUnitAndSheet(
    userUnitId,
    userSheetId,
    currentFormulaUnitId,
    currentFormulaSheetId,
    sequenceRangeUnitId,
    sequenceRangeSheetId
  )) {
    return;
  }
  const sequenceRange = Rectangle.moveOffset(unitRange, refOffsetX, refOffsetY);
  let newRange = null;
  if (type === 0 /* MoveRange */) {
    if (from == null || to == null) {
      return;
    }
    const moveEdge = checkMoveEdge(sequenceRange, from);
    const remainRange = getIntersectRange(sequenceRange, from);
    if (remainRange == null || moveEdge !== 4 /* ALL */) {
      return;
    }
    const operators = handleMoveRange(
      { id: EffectRefRangId.MoveRangeCommandId, params: { toRange: to, fromRange: from } },
      remainRange
    );
    const result = runRefRangeMutations(operators, remainRange);
    if (result == null) {
      return "#REF!" /* REF */;
    }
    newRange = getMoveNewRange(moveEdge, result, from, to, sequenceRange, remainRange);
  } else if (type === 1 /* MoveRows */) {
    if (from == null || to == null) {
      return;
    }
    const moveEdge = checkMoveEdge(sequenceRange, from);
    let remainRange = getIntersectRange(sequenceRange, from);
    if (remainRange == null && (from.endRow < sequenceRange.startRow && to.endRow <= sequenceRange.startRow || from.startRow > sequenceRange.endRow && to.startRow > sequenceRange.endRow)) {
      return;
    }
    if (remainRange == null) {
      remainRange = {
        startRow: sequenceRange.startRow,
        endRow: sequenceRange.endRow,
        startColumn: sequenceRange.startColumn,
        endColumn: sequenceRange.endColumn,
        rangeType: 0 /* NORMAL */
      };
    }
    const operators = handleMoveRows(
      { id: EffectRefRangId.MoveRowsCommandId, params: { toRange: to, fromRange: from } },
      remainRange
    );
    const result = runRefRangeMutations(operators, remainRange);
    if (result == null) {
      return "#REF!" /* REF */;
    }
    newRange = getMoveNewRange(moveEdge, result, from, to, sequenceRange, remainRange);
  } else if (type === 2 /* MoveCols */) {
    if (from == null || to == null) {
      return;
    }
    const moveEdge = checkMoveEdge(sequenceRange, from);
    let remainRange = getIntersectRange(sequenceRange, from);
    if (remainRange == null && (from.endColumn < sequenceRange.startColumn && to.endColumn <= sequenceRange.startColumn || from.startColumn > sequenceRange.endColumn && to.startColumn > sequenceRange.endColumn)) {
      return;
    }
    if (remainRange == null) {
      remainRange = {
        startRow: sequenceRange.startRow,
        endRow: sequenceRange.endRow,
        startColumn: sequenceRange.startColumn,
        endColumn: sequenceRange.endColumn,
        rangeType: 0 /* NORMAL */
      };
    }
    const operators = handleMoveCols(
      { id: EffectRefRangId.MoveColsCommandId, params: { toRange: to, fromRange: from } },
      remainRange
    );
    const result = runRefRangeMutations(operators, remainRange);
    if (result == null) {
      return "#REF!" /* REF */;
    }
    newRange = getMoveNewRange(moveEdge, result, from, to, sequenceRange, remainRange);
  }
  if (range != null) {
    if (type === 3 /* InsertRow */) {
      const operators = handleInsertRow(
        {
          id: EffectRefRangId.InsertRowCommandId,
          params: { range, unitId: "", subUnitId: "", direction: 2 /* DOWN */ }
        },
        sequenceRange
      );
      const result = runRefRangeMutations(operators, sequenceRange);
      if (result == null) {
        return;
      }
      newRange = {
        ...sequenceRange,
        ...result
      };
    } else if (type === 4 /* InsertColumn */) {
      const operators = handleInsertCol(
        {
          id: EffectRefRangId.InsertColCommandId,
          params: { range, unitId: "", subUnitId: "", direction: 1 /* RIGHT */ }
        },
        sequenceRange
      );
      const result = runRefRangeMutations(operators, sequenceRange);
      if (result == null) {
        return;
      }
      newRange = {
        ...sequenceRange,
        ...result
      };
    } else if (type === 5 /* RemoveRow */) {
      const operators = handleIRemoveRow(
        {
          id: EffectRefRangId.RemoveRowCommandId,
          params: { range }
        },
        sequenceRange,
        rangeFilteredRows
      );
      const result = runRefRangeMutations(operators, sequenceRange);
      if (result == null) {
        return "#REF!" /* REF */;
      }
      newRange = {
        ...sequenceRange,
        ...result
      };
    } else if (type === 6 /* RemoveColumn */) {
      const operators = handleIRemoveCol(
        {
          id: EffectRefRangId.RemoveColCommandId,
          params: { range }
        },
        sequenceRange
      );
      const result = runRefRangeMutations(operators, sequenceRange);
      if (result == null) {
        return "#REF!" /* REF */;
      }
      newRange = {
        ...sequenceRange,
        ...result
      };
    } else if (type === 7 /* DeleteMoveLeft */) {
      const operators = handleDeleteRangeMoveLeft(
        {
          id: EffectRefRangId.DeleteRangeMoveLeftCommandId,
          params: { range }
        },
        sequenceRange
      );
      const result = runRefRangeMutations(operators, sequenceRange);
      if (result == null) {
        return "#REF!" /* REF */;
      }
      newRange = {
        ...sequenceRange,
        ...result
      };
    } else if (type === 8 /* DeleteMoveUp */) {
      const operators = handleDeleteRangeMoveUp(
        {
          id: EffectRefRangId.DeleteRangeMoveUpCommandId,
          params: { range }
        },
        sequenceRange
      );
      const result = runRefRangeMutations(operators, sequenceRange);
      if (result == null) {
        return "#REF!" /* REF */;
      }
      newRange = {
        ...sequenceRange,
        ...result
      };
    } else if (type === 9 /* InsertMoveDown */) {
      const operators = handleInsertRangeMoveDown(
        {
          id: EffectRefRangId.InsertRangeMoveDownCommandId,
          params: { range }
        },
        sequenceRange
      );
      const result = runRefRangeMutations(operators, sequenceRange);
      if (result == null) {
        return;
      }
      newRange = {
        ...sequenceRange,
        ...result
      };
    } else if (type === 10 /* InsertMoveRight */) {
      const operators = handleInsertRangeMoveRight(
        {
          id: EffectRefRangId.InsertRangeMoveRightCommandId,
          params: { range }
        },
        sequenceRange
      );
      const result = runRefRangeMutations(operators, sequenceRange);
      if (result == null) {
        return;
      }
      newRange = {
        ...sequenceRange,
        ...result
      };
    }
  }
  if (newRange == null) {
    return;
  }
  const shouldRewriteSheet = type === 0 /* MoveRange */ && !!targetSheetId && targetSheetId !== userSheetId && !inCrossSheetCutRange;
  const rewrittenSheetId = shouldRewriteSheet ? targetSheetId : sequenceRangeSheetId;
  const rewrittenSheetName = shouldRewriteSheet ? targetSheetName || sequenceRangeSheetName : sequenceRangeSheetName;
  const rewrittenUnitId = shouldRewriteSheet ? targetUnitId || sequenceRangeUnitId : sequenceRangeUnitId;
  const isCurrentFormulaWorkbook = rewrittenUnitId == null || rewrittenUnitId.length === 0 || rewrittenUnitId === currentFormulaUnitId;
  const isCurrentFormulaSheet = rewrittenSheetId === currentFormulaSheetId;
  return serializeRangeToRefString({
    range: newRange,
    sheetName: preserveSheetQualifier || !(isCurrentFormulaWorkbook && isCurrentFormulaSheet) ? rewrittenSheetName : "",
    unitId: isCurrentFormulaWorkbook ? "" : rewrittenUnitId
  });
}
function getMoveNewRange(moveEdge, result, from, to, origin, remain) {
  const { startRow, endRow, startColumn, endColumn, rangeType } = getStartEndValue(result);
  const {
    startRow: fromStartRow,
    startColumn: fromStartColumn,
    endRow: fromEndRow,
    endColumn: fromEndColumn,
    rangeType: fromRangeType = 0 /* NORMAL */
  } = getStartEndValue(from);
  const { startRow: toStartRow, startColumn: toStartColumn, endRow: toEndRow, endColumn: toEndColumn } = getStartEndValue(to);
  const {
    startRow: remainStartRow,
    endRow: remainEndRow,
    startColumn: remainStartColumn,
    endColumn: remainEndColumn
  } = getStartEndValue(remain);
  const {
    startRow: originStartRow,
    endRow: originEndRow,
    startColumn: originStartColumn,
    endColumn: originEndColumn,
    rangeType: originRangeType = 0 /* NORMAL */
  } = getStartEndValue(origin);
  const newRange = { ...origin };
  function rowsCover() {
    if (rangeType === 2 /* COLUMN */ && originRangeType === 2 /* COLUMN */) {
      return true;
    }
    return startColumn >= originStartColumn && endColumn <= originEndColumn;
  }
  function columnsCover() {
    if (rangeType === 1 /* ROW */ && originRangeType === 1 /* ROW */) {
      return true;
    }
    return startRow >= originStartRow && endRow <= originEndRow;
  }
  if (moveEdge === 0 /* UP */) {
    if (rowsCover()) {
      if (startRow < originStartRow) {
        newRange.startRow = startRow;
      } else if (startRow >= originEndRow) {
        newRange.endRow -= fromEndRow + 1 - originStartRow;
      } else {
        return;
      }
    } else {
      return;
    }
  } else if (moveEdge === 1 /* DOWN */) {
    if (rowsCover()) {
      if (endRow > originEndRow) {
        newRange.endRow = endRow;
      } else if (endRow <= originStartRow) {
        newRange.startRow += originEndRow - fromStartRow + 1;
      } else {
        return;
      }
    } else {
      return;
    }
  } else if (moveEdge === 2 /* LEFT */) {
    if (columnsCover()) {
      if (startColumn < originStartColumn) {
        newRange.startColumn = startColumn;
      } else if (startColumn >= originEndColumn) {
        newRange.endColumn -= fromEndColumn + 1 - originStartColumn;
      } else {
        return;
      }
    } else {
      return;
    }
  } else if (moveEdge === 3 /* RIGHT */) {
    if (columnsCover()) {
      if (endColumn > originEndColumn) {
        newRange.endColumn = endColumn;
      } else if (endColumn <= originStartColumn) {
        newRange.startColumn += originEndColumn - fromStartColumn + 1;
      } else {
        return;
      }
    } else {
      return;
    }
  } else if (moveEdge === 4 /* ALL */) {
    newRange.startRow = startRow;
    newRange.startColumn = startColumn;
    newRange.endRow = endRow;
    newRange.endColumn = endColumn;
  } else if (fromStartColumn <= originStartColumn && fromEndColumn >= originEndColumn || fromRangeType === 1 /* ROW */ && originRangeType === 1 /* ROW */) {
    if (from.endRow < originStartRow) {
      if (toStartRow >= originStartRow) {
        newRange.startRow -= fromEndRow - fromStartRow + 1;
      }
      if (toStartRow >= originEndRow) {
        newRange.endRow -= fromEndRow - fromStartRow + 1;
      }
    } else if (from.startRow > originEndRow) {
      if (toEndRow <= originEndRow) {
        newRange.endRow += fromEndRow - fromStartRow + 1;
      }
      if (toEndRow <= originStartRow) {
        newRange.startRow += fromEndRow - fromStartRow + 1;
      }
    } else if (from.startRow >= originStartRow && from.endRow <= originEndRow) {
      if (toStartRow <= originStartRow) {
        newRange.startRow += fromEndRow - fromStartRow + 1;
      } else if (toStartRow >= originEndRow) {
        newRange.endRow -= fromEndRow - fromStartRow + 1;
      }
    }
  } else if (fromStartRow <= originStartRow && fromEndRow >= originEndRow || fromRangeType === 2 /* COLUMN */ && originRangeType === 2 /* COLUMN */) {
    if (from.endColumn < originStartColumn) {
      if (toStartColumn >= originStartColumn) {
        newRange.startColumn -= fromEndColumn - fromStartColumn + 1;
      }
      if (toStartColumn >= originEndColumn) {
        newRange.endColumn -= fromEndColumn - fromStartColumn + 1;
      }
    } else if (from.startColumn > originEndColumn) {
      if (toEndColumn <= originEndColumn) {
        newRange.endColumn += fromEndColumn - fromStartColumn + 1;
      }
      if (toEndColumn <= originStartColumn) {
        newRange.startColumn += fromEndColumn - fromStartColumn + 1;
      }
    } else if (from.startColumn >= originStartColumn && from.endColumn <= originEndColumn) {
      if (toStartColumn <= originStartColumn) {
        newRange.startColumn += fromEndColumn - fromStartColumn + 1;
      } else if (toStartColumn >= originEndColumn) {
        newRange.endColumn -= fromEndColumn - fromStartColumn + 1;
      }
    }
  } else if ((toStartColumn <= remainEndColumn + 1 && toEndColumn >= originEndColumn || toStartColumn <= originStartColumn && toEndColumn >= remainStartColumn - 1) && toStartRow <= originStartRow && toEndRow >= originEndRow) {
    newRange.startRow = startRow;
    newRange.startColumn = startColumn;
    newRange.endRow = endRow;
    newRange.endColumn = endColumn;
  } else if ((toStartRow <= remainEndRow + 1 && toEndRow >= originEndRow || toStartRow <= originStartRow && toEndRow >= remainStartRow - 1) && toStartColumn <= originStartColumn && toEndColumn >= originEndColumn) {
    newRange.startRow = startRow;
    newRange.startColumn = startColumn;
    newRange.endRow = endRow;
    newRange.endColumn = endColumn;
  } else {
    newRange.startRow = startRow;
    newRange.startColumn = startColumn;
    newRange.endRow = endRow;
    newRange.endColumn = endColumn;
  }
  return newRange;
}
function checkMoveEdge(originRange, fromRange) {
  const startRow = getStartValue(originRange.startRow);
  const endRow = getEndValue(originRange.endRow);
  const startColumn = getStartValue(originRange.startColumn);
  const endColumn = getEndValue(originRange.endColumn);
  const fromStartRow = getStartValue(fromRange.startRow);
  const fromEndRow = getEndValue(fromRange.endRow);
  const fromStartColumn = getStartValue(fromRange.startColumn);
  const fromEndColumn = getEndValue(fromRange.endColumn);
  function rowsCover() {
    if (originRange.rangeType === 2 /* COLUMN */ && fromRange.rangeType === 2 /* COLUMN */) {
      return true;
    }
    return startRow >= fromStartRow && endRow <= fromEndRow;
  }
  function columnsCover() {
    if (originRange.rangeType === 1 /* ROW */ && fromRange.rangeType === 1 /* ROW */) {
      return true;
    }
    return startColumn >= fromStartColumn && endColumn <= fromEndColumn;
  }
  function allCover() {
    return originRange.rangeType === 3 /* ALL */ && fromRange.rangeType === 3 /* ALL */;
  }
  if (rowsCover() && columnsCover() || allCover()) {
    return 4 /* ALL */;
  }
  if (columnsCover() && startRow >= fromStartRow && startRow <= fromEndRow && endRow > fromEndRow) {
    return 0 /* UP */;
  }
  if (columnsCover() && endRow >= fromStartRow && endRow <= fromEndRow && startRow < fromStartRow) {
    return 1 /* DOWN */;
  }
  if (rowsCover() && startColumn >= fromStartColumn && startColumn <= fromEndColumn && endColumn > fromEndColumn) {
    return 2 /* LEFT */;
  }
  if (rowsCover() && endColumn >= fromStartColumn && endColumn <= fromEndColumn && startColumn < fromStartColumn) {
    return 3 /* RIGHT */;
  }
  return null;
}
function getStartValue(value) {
  return isNaN(value) ? -Infinity : value;
}
function getEndValue(value) {
  return isNaN(value) ? Infinity : value;
}
function getStartEndValue(range) {
  const { startRow, endRow, startColumn, endColumn } = range;
  return {
    ...range,
    startRow: getStartValue(startRow),
    endRow: getEndValue(endRow),
    startColumn: getStartValue(startColumn),
    endColumn: getEndValue(endColumn)
  };
}

// ../packages/sheets-formula/src/controllers/utils/ref-range-param.ts
function getReferenceMoveParams(workbook, command) {
  const { id } = command;
  let result = null;
  switch (id) {
    case MoveRangeCommand.id:
      result = handleRefMoveRange2(command, workbook);
      break;
    case MoveRowsCommand.id:
      result = handleRefMoveRows2(command, workbook);
      break;
    case MoveColsCommand.id:
      result = handleRefMoveCols2(command, workbook);
      break;
    case InsertRowCommand.id:
      result = handleRefInsertRow2(command);
      break;
    case InsertColCommand.id:
      result = handleRefInsertCol2(command);
      break;
    case InsertRangeMoveRightCommand.id:
      result = handleRefInsertRangeMoveRight(command, workbook);
      break;
    case InsertRangeMoveDownCommand.id:
      result = handleRefInsertRangeMoveDown(command, workbook);
      break;
    case RemoveRowCommand.id:
      result = handleRefRemoveRow2(command, workbook);
      break;
    case RemoveColCommand.id:
      result = handleRefRemoveCol2(command, workbook);
      break;
    case DeleteRangeMoveUpCommand.id:
      result = handleRefDeleteRangeMoveUp(command, workbook);
      break;
    case DeleteRangeMoveLeftCommand.id:
      result = handleRefDeleteRangeMoveLeft(command, workbook);
      break;
    case SetWorksheetNameCommand.id:
      result = handleRefSetWorksheetName(command, workbook);
      break;
    case RemoveSheetCommand.id:
      result = handleRefRemoveWorksheet(command, workbook);
      break;
    case SetDefinedNameCommand.id:
      result = handleRefSetDefinedName(command, workbook);
      break;
    case RemoveDefinedNameCommand.id:
      result = handleRefRemoveDefinedName(command, workbook);
      break;
  }
  return result;
}
function getCurrentSheetInfo(workbook) {
  var _a;
  const unitId = workbook.getUnitId();
  const sheetId = ((_a = workbook.getActiveSheet()) == null ? void 0 : _a.getSheetId()) || "";
  return {
    unitId,
    sheetId
  };
}
function handleRefMoveRange2(command, workbook) {
  var _a, _b;
  const { params } = command;
  if (!params) return null;
  const {
    fromRange,
    toRange,
    fromUnitId,
    fromSubUnitId,
    toUnitId,
    toSubUnitId
  } = params;
  if (!fromRange || !toRange) return null;
  const { unitId: currentUnitId, sheetId: currentSheetId } = getCurrentSheetInfo(workbook);
  const unitId = fromUnitId || toUnitId || currentUnitId;
  const sheetId = fromSubUnitId || currentSheetId;
  const sheetName = (_a = workbook.getSheetBySheetId(sheetId)) == null ? void 0 : _a.getName();
  const targetSheetId = toSubUnitId || fromSubUnitId || currentSheetId;
  const targetUnitId = toUnitId || fromUnitId || currentUnitId;
  const targetSheetName = (_b = workbook.getSheetBySheetId(targetSheetId)) == null ? void 0 : _b.getName();
  return {
    type: 0 /* MoveRange */,
    from: fromRange,
    to: toRange,
    unitId,
    sheetId,
    sheetName,
    targetUnitId,
    targetSheetId,
    targetSheetName
  };
}
function handleRefMoveRows2(command, workbook) {
  const { params } = command;
  if (!params) return null;
  const {
    fromRange: { startRow: fromStartRow, endRow: fromEndRow },
    toRange: { startRow: toStartRow, endRow: toEndRow }
  } = params;
  const unitId = workbook.getUnitId();
  const worksheet = workbook.getActiveSheet();
  if (!worksheet) return null;
  const sheetId = worksheet.getSheetId();
  const from = {
    startRow: fromStartRow,
    startColumn: 0,
    endRow: fromEndRow,
    endColumn: worksheet.getColumnCount() - 1,
    rangeType: 1 /* ROW */
  };
  const to = {
    startRow: toStartRow,
    startColumn: 0,
    endRow: toEndRow,
    endColumn: worksheet.getColumnCount() - 1,
    rangeType: 1 /* ROW */
  };
  return {
    type: 1 /* MoveRows */,
    from,
    to,
    unitId,
    sheetId
  };
}
function handleRefMoveCols2(command, workbook) {
  const { params } = command;
  if (!params) return null;
  const {
    fromRange: { startColumn: fromStartCol, endColumn: fromEndCol },
    toRange: { startColumn: toStartCol, endColumn: toEndCol }
  } = params;
  const unitId = workbook.getUnitId();
  const worksheet = workbook.getActiveSheet();
  if (!worksheet) return null;
  const sheetId = worksheet.getSheetId();
  const from = {
    startRow: 0,
    startColumn: fromStartCol,
    endRow: worksheet.getRowCount() - 1,
    endColumn: fromEndCol,
    rangeType: 2 /* COLUMN */
  };
  const to = {
    startRow: 0,
    startColumn: toStartCol,
    endRow: worksheet.getRowCount() - 1,
    endColumn: toEndCol,
    rangeType: 2 /* COLUMN */
  };
  return {
    type: 2 /* MoveCols */,
    from,
    to,
    unitId,
    sheetId
  };
}
function handleRefInsertRow2(command) {
  const { params } = command;
  if (!params) return null;
  const { range, unitId, subUnitId } = params;
  return {
    type: 3 /* InsertRow */,
    range,
    unitId,
    sheetId: subUnitId
  };
}
function handleRefInsertCol2(command) {
  const { params } = command;
  if (!params) return null;
  const { range, unitId, subUnitId } = params;
  return {
    type: 4 /* InsertColumn */,
    range,
    unitId,
    sheetId: subUnitId
  };
}
function handleRefInsertRangeMoveRight(command, workbook) {
  const { params } = command;
  if (!params) return null;
  const { range } = params;
  const { unitId, sheetId } = getCurrentSheetInfo(workbook);
  return {
    type: 10 /* InsertMoveRight */,
    range,
    unitId,
    sheetId
  };
}
function handleRefInsertRangeMoveDown(command, workbook) {
  const { params } = command;
  if (!params) return null;
  const { range } = params;
  const { unitId, sheetId } = getCurrentSheetInfo(workbook);
  return {
    type: 9 /* InsertMoveDown */,
    range,
    unitId,
    sheetId
  };
}
function handleRefRemoveRow2(command, workbook) {
  var _a, _b;
  const { params } = command;
  if (!params) return null;
  const { range } = params;
  const { unitId, sheetId } = getCurrentSheetInfo(workbook);
  return {
    type: 5 /* RemoveRow */,
    range,
    unitId,
    sheetId,
    rangeFilteredRows: (_b = (_a = workbook.getSheetBySheetId(sheetId)) == null ? void 0 : _a.getRangeFilterRows(range)) != null ? _b : []
  };
}
function handleRefRemoveCol2(command, workbook) {
  const { params } = command;
  if (!params) return null;
  const { range } = params;
  const { unitId, sheetId } = getCurrentSheetInfo(workbook);
  return {
    type: 6 /* RemoveColumn */,
    range,
    unitId,
    sheetId
  };
}
function handleRefDeleteRangeMoveUp(command, workbook) {
  const { params } = command;
  if (!params) return null;
  const { range } = params;
  const { unitId, sheetId } = getCurrentSheetInfo(workbook);
  return {
    type: 8 /* DeleteMoveUp */,
    range,
    unitId,
    sheetId
  };
}
function handleRefDeleteRangeMoveLeft(command, workbook) {
  const { params } = command;
  if (!params) return null;
  const { range } = params;
  const { unitId, sheetId } = getCurrentSheetInfo(workbook);
  return {
    type: 7 /* DeleteMoveLeft */,
    range,
    unitId,
    sheetId
  };
}
function handleRefSetWorksheetName(command, workbook) {
  const { params } = command;
  if (!params) return null;
  const { unitId, subUnitId, name } = params;
  const { unitId: workbookId, sheetId } = getCurrentSheetInfo(workbook);
  return {
    type: 11 /* SetName */,
    unitId: unitId || workbookId,
    sheetId: subUnitId || sheetId,
    sheetName: name
  };
}
function handleRefRemoveWorksheet(command, workbook) {
  const { params } = command;
  if (!params) return null;
  const { unitId, subUnitId } = params;
  const { unitId: workbookId, sheetId } = getCurrentSheetInfo(workbook);
  return {
    type: 12 /* RemoveSheet */,
    unitId: unitId || workbookId,
    sheetId: subUnitId || sheetId
  };
}
function handleRefSetDefinedName(command, workbook) {
  const { params } = command;
  if (!params) return null;
  const { unitId, name, id } = params;
  const { sheetId } = getCurrentSheetInfo(workbook);
  return {
    type: 13 /* SetDefinedName */,
    unitId,
    sheetId,
    definedName: name,
    definedNameId: id
  };
}
function handleRefRemoveDefinedName(command, workbook) {
  const { params } = command;
  if (!params) return null;
  const { unitId, name, id } = params;
  const { sheetId } = getCurrentSheetInfo(workbook);
  return {
    type: 14 /* RemoveDefinedName */,
    unitId,
    sheetId,
    definedName: name,
    definedNameId: id
  };
}

// ../packages/sheets-formula/src/controllers/update-defined-name.controller.ts
var UpdateDefinedNameController = class extends Disposable {
  constructor(_definedNamesService, _univerInstanceService, _sheetInterceptorService, _lexerTreeBuilder) {
    super();
    __publicField(this, "_definedNamesService", _definedNamesService);
    __publicField(this, "_univerInstanceService", _univerInstanceService);
    __publicField(this, "_sheetInterceptorService", _sheetInterceptorService);
    __publicField(this, "_lexerTreeBuilder", _lexerTreeBuilder);
    this._initialize();
  }
  _initialize() {
    this._commandExecutedListener();
  }
  _commandExecutedListener() {
    this.disposeWithMe(
      this._sheetInterceptorService.interceptCommand({
        getMutations: (command) => {
          if (command.id === SetDefinedNameCommand.id || command.id === RemoveDefinedNameCommand.id) {
            return {
              redos: [],
              undos: []
            };
          }
          const workbook = this._univerInstanceService.getCurrentUnitForType(2 /* UNIVER_SHEET */);
          if (workbook == null) {
            return {
              redos: [],
              undos: []
            };
          }
          const result = getReferenceMoveParams(workbook, command);
          if (!result) {
            return {
              redos: [],
              undos: []
            };
          }
          return this._getUpdateDefinedNameMutations(workbook, result);
        }
      })
    );
  }
  // eslint-disable-next-line max-lines-per-function
  _getUpdateDefinedNameMutations(workbook, moveParams) {
    const { type, unitId, sheetId } = moveParams;
    const definedNames = this._definedNamesService.getDefinedNameMap(unitId);
    if (!definedNames) {
      return {
        redos: [],
        undos: []
      };
    }
    const redoMutations = [];
    const undoMutations = [];
    Object.values(definedNames).forEach((item) => {
      var _a;
      const { formulaOrRefString } = item;
      const sequenceNodes = this._lexerTreeBuilder.sequenceNodesBuilder(formulaOrRefString);
      if (sequenceNodes == null) {
        return true;
      }
      let shouldModify = false;
      const refChangeIds = [];
      for (let i = 0, len = sequenceNodes.length; i < len; i++) {
        const node = sequenceNodes[i];
        if (typeof node === "string" || node.nodeType !== 4 /* REFERENCE */) {
          continue;
        }
        const { token } = node;
        const sequenceGrid = deserializeRangeWithSheetWithCache(token);
        const { range, sheetName, unitId: sequenceUnitId } = sequenceGrid;
        const sequenceSheetId = ((_a = workbook.getSheetBySheetName(sheetName)) == null ? void 0 : _a.getSheetId()) || "";
        const sequenceUnitRangeWidthOffset = {
          range,
          sheetId: sequenceSheetId,
          unitId: sequenceUnitId,
          sheetName,
          refOffsetX: 0,
          refOffsetY: 0
        };
        let newRefString = null;
        if (type === 12 /* RemoveSheet */) {
          newRefString = this._removeSheet(item, unitId, sheetId);
        } else if (type === 11 /* SetName */) {
          const {
            sheetId: userSheetId,
            sheetName: newSheetName
          } = moveParams;
          if (newSheetName == null) {
            continue;
          }
          if (sequenceSheetId == null || sequenceSheetId.length === 0) {
            continue;
          }
          if (userSheetId !== sequenceSheetId) {
            continue;
          }
          newRefString = serializeRangeToRefString({
            range,
            sheetName: newSheetName,
            unitId: sequenceUnitId
          });
        } else {
          newRefString = getNewRangeByMoveParam(
            sequenceUnitRangeWidthOffset,
            moveParams,
            unitId,
            sheetId,
            { preserveSheetQualifier: true }
          );
        }
        if (newRefString != null) {
          sequenceNodes[i] = {
            ...node,
            token: newRefString
          };
          shouldModify = true;
          refChangeIds.push(i);
        }
      }
      if (!shouldModify) {
        return true;
      }
      const newSequenceString = generateStringWithSequence(updateRefOffset(sequenceNodes, refChangeIds));
      const redoMutation = {
        id: SetDefinedNameMutation.id,
        params: {
          unitId,
          ...item,
          formulaOrRefString: newSequenceString
        }
      };
      redoMutations.push(redoMutation);
      const undoMutation = {
        id: SetDefinedNameMutation.id,
        params: {
          unitId,
          ...item
        }
      };
      undoMutations.push(undoMutation);
    });
    return {
      redos: redoMutations,
      undos: undoMutations
    };
  }
  _removeSheet(item, unitId, subUnitId) {
    var _a;
    const { formulaOrRefString } = item;
    const sheetId = (_a = this._definedNamesService.getWorksheetByRef(unitId, formulaOrRefString)) == null ? void 0 : _a.getSheetId();
    if (sheetId === subUnitId) {
      return "#REF!" /* REF */;
    }
    return null;
  }
};
UpdateDefinedNameController = __decorateClass([
  __decorateParam(0, IDefinedNamesService),
  __decorateParam(1, IUniverInstanceService),
  __decorateParam(2, Inject(SheetInterceptorService)),
  __decorateParam(3, Inject(LexerTreeBuilder))
], UpdateDefinedNameController);

// ../packages/sheets-formula/src/controllers/update-formula.controller.ts
var UpdateFormulaController = class extends Disposable {
  constructor(_univerInstanceService, _commandService, _lexerTreeBuilder, _formulaDataModel, _sheetInterceptorService, _definedNamesService, _configService, _injector) {
    super();
    __publicField(this, "_univerInstanceService", _univerInstanceService);
    __publicField(this, "_commandService", _commandService);
    __publicField(this, "_lexerTreeBuilder", _lexerTreeBuilder);
    __publicField(this, "_formulaDataModel", _formulaDataModel);
    __publicField(this, "_sheetInterceptorService", _sheetInterceptorService);
    __publicField(this, "_definedNamesService", _definedNamesService);
    __publicField(this, "_configService", _configService);
    __publicField(this, "_injector", _injector);
    this._commandExecutedListener();
  }
  _commandExecutedListener() {
    this.disposeWithMe(this._sheetInterceptorService.interceptCommand({
      getMutations: (command) => this._getUpdateFormula(command)
    }));
    this.disposeWithMe(
      this._commandService.onCommandExecuted((command) => {
        if (!command.params) return;
        if (command.id === RemoveSheetMutation.id) {
          const { subUnitId: sheetId, unitId } = command.params;
          this._handleWorkbookDisposed(unitId, sheetId);
        } else if (command.id === InsertSheetMutation.id) {
          this._handleInsertSheetMutation(command.params);
        }
      })
    );
    this.disposeWithMe(
      this._commandService.beforeCommandExecuted((command, options) => {
        if (command.id === SetRangeValuesMutation.id) {
          const params = command.params;
          if (options && options.onlyLocal === true || options && options.syncOnly === true || options && options.fromChangeset === true || params.trigger === SetStyleCommand.id || params.trigger === SetBorderCommand.id || params.trigger === ClearSelectionFormatCommand.id || params.trigger === SetRangeCustomMetadataCommand.id) {
            return;
          }
          this._handleSetRangeValuesMutation(params);
        }
      })
    );
    this.disposeWithMe(this._univerInstanceService.getTypeOfUnitAdded$(2 /* UNIVER_SHEET */).subscribe((event) => this._handleWorkbookAdded(event.unit)));
    this.disposeWithMe(this._univerInstanceService.getTypeOfUnitDisposed$(2 /* UNIVER_SHEET */).pipe(map((unit) => unit.getUnitId())).subscribe((unitId) => this._handleWorkbookDisposed(unitId)));
  }
  _handleSetRangeValuesMutation(params) {
    const { subUnitId: sheetId, unitId, cellValue } = params;
    if (cellValue == null) {
      return;
    }
    const newSheetFormulaData = this._formulaDataModel.updateFormulaData(unitId, sheetId, cellValue);
    if (Object.keys(newSheetFormulaData).length === 0) {
      return;
    }
    const newFormulaData = {
      [unitId]: {
        [sheetId]: newSheetFormulaData
      }
    };
    this._commandService.executeCommand(
      SetRangeValuesMutation.id,
      {
        unitId,
        subUnitId: sheetId,
        cellValue: formulaDataToCellData(newSheetFormulaData, cellValue)
      },
      {
        onlyLocal: true,
        fromFormula: true
      }
    );
    this._formulaDataModel.updateArrayFormulaCellData(unitId, sheetId, cellValue);
    this._formulaDataModel.updateArrayFormulaRange(unitId, sheetId, cellValue);
    this._formulaDataModel.updateImageFormulaData(unitId, sheetId, cellValue);
    this._commandService.executeCommand(
      SetFormulaDataMutation.id,
      {
        formulaData: newFormulaData
      },
      {
        onlyLocal: true
      }
    );
    this._commandService.executeCommand(
      SetArrayFormulaDataMutation.id,
      {
        arrayFormulaRange: this._formulaDataModel.getArrayFormulaRange(),
        arrayFormulaCellData: this._formulaDataModel.getArrayFormulaCellData()
      },
      {
        onlyLocal: true,
        remove: true
        // remove array formula range shape
      }
    );
  }
  _handleWorkbookDisposed(unitId, sheetId) {
    const formulaData = this._formulaDataModel.getFormulaData();
    const newFormulaData = removeFormulaData(formulaData, unitId, sheetId);
    const arrayFormulaRange = this._formulaDataModel.getArrayFormulaRange();
    const newArrayFormulaRange = removeFormulaData(arrayFormulaRange, unitId, sheetId);
    const arrayFormulaCellData = this._formulaDataModel.getArrayFormulaCellData();
    const newArrayFormulaCellData = removeFormulaData(arrayFormulaCellData, unitId, sheetId);
    if (newFormulaData) {
      this._commandService.executeCommand(
        SetFormulaDataMutation.id,
        {
          formulaData: newFormulaData
        },
        {
          onlyLocal: true
        }
      );
    }
    if (newArrayFormulaRange && newArrayFormulaCellData) {
      this._commandService.executeCommand(
        SetArrayFormulaDataMutation.id,
        {
          arrayFormulaRange,
          arrayFormulaCellData
        },
        {
          onlyLocal: true
        }
      );
    }
  }
  _handleInsertSheetMutation(params) {
    const { sheet, unitId } = params;
    const formulaData = this._formulaDataModel.getFormulaData();
    const { id: sheetId, cellData } = sheet;
    const cellMatrix = new ObjectMatrix(cellData);
    const newFormulaData = initSheetFormulaData(formulaData, unitId, sheetId, cellMatrix);
    this._commandService.executeCommand(
      SetFormulaDataMutation.id,
      {
        formulaData: newFormulaData
      },
      {
        onlyLocal: true
      }
    );
  }
  _handleWorkbookAdded(unit) {
    var _a;
    const formulaData = {};
    const unitId = unit.getUnitId();
    const newFormulaData = { [unitId]: {} };
    const worksheets = unit.getSheets();
    worksheets.forEach((worksheet) => {
      var _a2;
      const cellMatrix = worksheet.getCellMatrix();
      const sheetId = worksheet.getSheetId();
      const currentSheetData = initSheetFormulaData(formulaData, unitId, sheetId, cellMatrix);
      newFormulaData[unitId][sheetId] = (_a2 = currentSheetData[unitId]) == null ? void 0 : _a2[sheetId];
    });
    this._commandService.executeCommand(SetFormulaDataMutation.id, { formulaData: newFormulaData }, { onlyLocal: true });
    const config = this._configService.getConfig(PLUGIN_CONFIG_KEY_BASE);
    const calculationMode = (_a = config == null ? void 0 : config.initialFormulaComputing) != null ? _a : 1 /* WHEN_EMPTY */;
    const params = this._getDirtyDataByCalculationMode(calculationMode);
    this._commandService.executeCommand(SetTriggerFormulaCalculationStartMutation.id, params, { onlyLocal: true });
  }
  _getDirtyDataByCalculationMode(calculationMode) {
    const forceCalculation = calculationMode === 0 /* FORCED */;
    const dirtyRanges = calculationMode === 1 /* WHEN_EMPTY */ ? this._formulaDataModel.getFormulaDirtyRanges() : [];
    const dirtyNameMap = {};
    const dirtyDefinedNameMap = {};
    const dirtyUnitFeatureMap = {};
    const dirtyUnitOtherFormulaMap = {};
    const clearDependencyTreeCache = {};
    return {
      forceCalculation,
      dirtyRanges,
      dirtyNameMap,
      dirtyDefinedNameMap,
      dirtyUnitFeatureMap,
      dirtyUnitOtherFormulaMap,
      clearDependencyTreeCache
    };
  }
  _getUpdateFormula(command) {
    const workbook = this._univerInstanceService.getCurrentUnitForType(2 /* UNIVER_SHEET */);
    if (!workbook) {
      return {
        undos: [],
        redos: []
      };
    }
    const result = getReferenceMoveParams(workbook, command);
    if (result) {
      const { unitSheetNameMap } = this._formulaDataModel.getCalculateData();
      const oldFormulaData = this._formulaDataModel.getFormulaData();
      const { newFormulaData } = this._getFormulaReferenceMoveInfo(
        oldFormulaData,
        unitSheetNameMap,
        result
      );
      const { undos, redos } = getFormulaReferenceMoveUndoRedo(oldFormulaData, newFormulaData, result);
      return {
        undos,
        redos
      };
    }
    return {
      undos: [],
      redos: []
    };
  }
  // eslint-disable-next-line max-lines-per-function
  _getFormulaReferenceMoveInfo(formulaData, unitSheetNameMap, formulaReferenceMoveParam) {
    var _a, _b, _c, _d;
    if (!Tools.isDefine(formulaData)) return { newFormulaData: {} };
    const formulaDataKeys = Object.keys(formulaData);
    if (formulaDataKeys.length === 0) return { newFormulaData: {} };
    const newFormulaData = {};
    const { unitId: fromUnitId, sheetId: fromSheetId, sheetName: fromSheetName, targetUnitId, targetSheetId, type, from, to } = formulaReferenceMoveParam;
    const inCrossSheetCutRangeNewFormulas = [];
    for (const unitId of formulaDataKeys) {
      const sheetData = formulaData[unitId];
      if (sheetData == null) {
        continue;
      }
      const sheetDataKeys = Object.keys(sheetData);
      if (!Tools.isDefine(newFormulaData[unitId])) {
        newFormulaData[unitId] = {};
      }
      for (const sheetId of sheetDataKeys) {
        const matrixData = new ObjectMatrix(sheetData[sheetId] || {});
        const newFormulaDataItem = new ObjectMatrix();
        const shouldModifySi = [];
        matrixData.forValue((row, column, formulaDataItem) => {
          var _a2;
          if (!formulaDataItem) return true;
          const { f: formulaString, x, y, si } = formulaDataItem;
          const sequenceNodes = this._lexerTreeBuilder.sequenceNodesBuilder(formulaString);
          if (sequenceNodes == null) {
            return true;
          }
          let shouldModify = false;
          const refChangeIds = [];
          const inCrossSheetCutRange = type === 0 /* MoveRange */ && (targetUnitId !== fromUnitId || targetSheetId !== fromSheetId) && unitId === fromUnitId && sheetId === fromSheetId && from && from.startRow <= row && row <= from.endRow && from.startColumn <= column && column <= from.endColumn;
          const inCrossSheetCutRangeSequenceNodes = [...sequenceNodes];
          for (let i = 0, len = sequenceNodes.length; i < len; i++) {
            const node = sequenceNodes[i];
            if (typeof node === "string") {
              continue;
            }
            const { token, nodeType } = node;
            if ((type === 13 /* SetDefinedName */ || type === 14 /* RemoveDefinedName */) && (nodeType === 6 /* DEFINED_NAME */ || nodeType === 3 /* FUNCTION */)) {
              const { definedNameId, definedName } = formulaReferenceMoveParam;
              if (definedNameId === void 0 || definedName === void 0) {
                continue;
              }
              const oldDefinedName = this._definedNamesService.getValueById(unitId, definedNameId);
              if (oldDefinedName === void 0 || oldDefinedName === null) {
                continue;
              }
              if (oldDefinedName.name !== token) {
                continue;
              }
              sequenceNodes[i] = {
                ...node,
                token: type === 13 /* SetDefinedName */ ? definedName : "#REF!" /* REF */
              };
              shouldModify = true;
              refChangeIds.push(i);
              continue;
            } else if (nodeType !== 4 /* REFERENCE */) {
              continue;
            }
            const sequenceGrid = deserializeRangeWithSheetWithCache(token);
            const { range, sheetName, unitId: sequenceUnitId } = sequenceGrid;
            const mapUnitId = sequenceUnitId == null || sequenceUnitId.length === 0 ? unitId : sequenceUnitId;
            const sequenceSheetId = ((_a2 = unitSheetNameMap == null ? void 0 : unitSheetNameMap[mapUnitId]) == null ? void 0 : _a2[sheetName]) || "";
            if (!checkIsSameUnitAndSheet(
              formulaReferenceMoveParam.unitId,
              formulaReferenceMoveParam.sheetId,
              unitId,
              sheetId,
              sequenceUnitId,
              sequenceSheetId
            )) {
              continue;
            }
            const sequenceUnitRangeWidthOffset = {
              range,
              sheetId: sequenceSheetId,
              unitId: sequenceUnitId,
              sheetName,
              refOffsetX: x || 0,
              refOffsetY: y || 0
            };
            let newRefString = null;
            if (type === 11 /* SetName */) {
              const {
                unitId: userUnitId,
                sheetId: userSheetId,
                sheetName: newSheetName
              } = formulaReferenceMoveParam;
              if (newSheetName == null) {
                continue;
              }
              if (sequenceSheetId == null || sequenceSheetId.length === 0) {
                continue;
              }
              if (userSheetId !== sequenceSheetId) {
                continue;
              }
              newRefString = serializeRangeToRefString({
                range,
                sheetName: newSheetName,
                unitId: sequenceUnitId
              });
            } else if (type === 12 /* RemoveSheet */) {
              const {
                unitId: userUnitId,
                sheetId: userSheetId,
                sheetName: newSheetName
              } = formulaReferenceMoveParam;
              if (sequenceSheetId == null || sequenceSheetId.length === 0) {
                continue;
              }
              if (userSheetId !== sequenceSheetId) {
                continue;
              }
              newRefString = "#REF!" /* REF */;
            } else if (type !== 13 /* SetDefinedName */) {
              newRefString = getNewRangeByMoveParam(
                sequenceUnitRangeWidthOffset,
                formulaReferenceMoveParam,
                unitId,
                sheetId,
                {
                  inCrossSheetCutRange
                }
              );
            }
            if (newRefString != null) {
              sequenceNodes[i] = {
                ...node,
                token: newRefString
              };
              shouldModify = true;
              refChangeIds.push(i);
              if (si && (x != null ? x : 0) === 0 && (y != null ? y : 0) === 0) shouldModifySi.push(si);
            }
            if (inCrossSheetCutRange) {
              if (newRefString != null) {
                inCrossSheetCutRangeSequenceNodes[i] = {
                  ...node,
                  token: newRefString
                };
              } else if ((!sequenceUnitId || sequenceUnitId === fromUnitId) && (!sequenceSheetId || sequenceSheetId === fromSheetId)) {
                const sequenceRange = Rectangle.moveOffset(range, x || 0, y || 0);
                inCrossSheetCutRangeSequenceNodes[i] = {
                  ...node,
                  token: serializeRangeToRefString({
                    range: sequenceRange,
                    sheetName: fromSheetName || sheetName,
                    unitId: targetUnitId !== fromUnitId ? fromUnitId : ""
                  })
                };
                shouldModify = true;
              }
            }
          }
          if (!shouldModify) {
            if (si && [1 /* MoveRows */, 2 /* MoveCols */, 0 /* MoveRange */].includes(type)) {
              if (from && from.startRow <= row && row <= from.endRow && from.startColumn <= column && column <= from.endColumn) {
                if ((x != null ? x : 0) === 0 && (y != null ? y : 0) === 0) shouldModifySi.push(si);
              } else if (!shouldModifySi.includes(si)) {
                return true;
              }
            } else {
              return true;
            }
          }
          if (inCrossSheetCutRange) {
            const newSequenceNodes2 = updateRefOffset(inCrossSheetCutRangeSequenceNodes, refChangeIds, x, y);
            inCrossSheetCutRangeNewFormulas.push({
              fromRow: row,
              fromColumn: column,
              formulaString: `=${generateStringWithSequence(newSequenceNodes2)}`
            });
            return true;
          }
          const newSequenceNodes = updateRefOffset(sequenceNodes, refChangeIds, x, y);
          newFormulaDataItem.setValue(row, column, {
            f: `=${generateStringWithSequence(newSequenceNodes)}`
          });
        });
        if (newFormulaData[unitId]) {
          newFormulaData[unitId][sheetId] = newFormulaDataItem.getData();
        }
      }
    }
    if (inCrossSheetCutRangeNewFormulas.length > 0 && targetUnitId && targetSheetId) {
      if (!newFormulaData[targetUnitId]) {
        newFormulaData[targetUnitId] = {};
      }
      if (!newFormulaData[targetUnitId][targetSheetId]) {
        newFormulaData[targetUnitId][targetSheetId] = {};
      }
      for (const newFormula of inCrossSheetCutRangeNewFormulas) {
        const { fromRow, fromColumn, formulaString } = newFormula;
        const targetRow = fromRow + (((_a = to == null ? void 0 : to.startRow) != null ? _a : 0) - ((_b = from == null ? void 0 : from.startRow) != null ? _b : 0));
        const targetColumn = fromColumn + (((_c = to == null ? void 0 : to.startColumn) != null ? _c : 0) - ((_d = from == null ? void 0 : from.startColumn) != null ? _d : 0));
        if (!newFormulaData[targetUnitId][targetSheetId][targetRow]) {
          newFormulaData[targetUnitId][targetSheetId][targetRow] = {};
        }
        newFormulaData[targetUnitId][targetSheetId][targetRow][targetColumn] = {
          f: formulaString
        };
      }
    }
    return { newFormulaData };
  }
};
UpdateFormulaController = __decorateClass([
  __decorateParam(0, IUniverInstanceService),
  __decorateParam(1, ICommandService),
  __decorateParam(2, Inject(LexerTreeBuilder)),
  __decorateParam(3, Inject(FormulaDataModel)),
  __decorateParam(4, Inject(SheetInterceptorService)),
  __decorateParam(5, IDefinedNamesService),
  __decorateParam(6, IConfigService),
  __decorateParam(7, Inject(Injector))
], UpdateFormulaController);

// ../packages/sheets-formula/src/services/formula-ref-range.service.ts
function getFormulaKeyOffset(lexerTreeBuilder, formulaString, refOffsetX, refOffsetY) {
  const sequenceNodes = lexerTreeBuilder.sequenceNodesBuilder(formulaString);
  if (sequenceNodes == null) {
    return formulaString;
  }
  const newSequenceNodes = [];
  for (let i = 0, len = sequenceNodes.length; i < len; i++) {
    const node = sequenceNodes[i];
    if (typeof node === "string" || node.nodeType !== 4 /* REFERENCE */) {
      continue;
    }
    const { token } = node;
    const sequenceGrid = deserializeRangeWithSheetWithCache(token);
    const { sheetName, unitId: sequenceUnitId } = sequenceGrid;
    let newRange = sequenceGrid.range;
    if (newRange.startAbsoluteRefType === 3 /* ALL */ && newRange.endAbsoluteRefType === 3 /* ALL */) {
      continue;
    } else {
      newRange = moveRangeByOffset(newRange, refOffsetX, refOffsetY);
    }
    newSequenceNodes.push({
      unitId: sequenceUnitId,
      sheetName,
      range: newRange
    });
  }
  return newSequenceNodes.map((item) => `${item.unitId}!${item.sheetName}!${item.range.startRow}!${item.range.endRow}!${item.range.startColumn}!${item.range.endColumn}`).join("|");
}
var FormulaRefRangeService = class extends Disposable {
  constructor(_refRangeService, _lexerTreeBuilder, _univerInstanceService, _injector) {
    super();
    __publicField(this, "_refRangeService", _refRangeService);
    __publicField(this, "_lexerTreeBuilder", _lexerTreeBuilder);
    __publicField(this, "_univerInstanceService", _univerInstanceService);
    __publicField(this, "_injector", _injector);
  }
  transformFormulaByEffectCommand(unitId, subUnitId, formula, params) {
    const sequenceNodes = this._lexerTreeBuilder.sequenceNodesBuilder(formula);
    const currentUnit = this._univerInstanceService.getCurrentUnitForType(2 /* UNIVER_SHEET */);
    const currentSheet = currentUnit.getActiveSheet();
    const currentUnitId = currentUnit.getUnitId();
    const currentSheetId = currentSheet.getSheetId();
    const transformSequenceNodes = sequenceNodes == null ? void 0 : sequenceNodes.map((node) => {
      if (typeof node === "object" && node.nodeType === 4 /* REFERENCE */) {
        const gridRangeName = deserializeRangeWithSheetWithCache(node.token);
        const { range, unitId: rangeUnitId, sheetName: rangeSheetName } = gridRangeName;
        const workbook = this._univerInstanceService.getUnit(rangeUnitId || unitId);
        const worksheet = rangeSheetName ? workbook == null ? void 0 : workbook.getSheetBySheetName(rangeSheetName) : workbook == null ? void 0 : workbook.getSheetBySheetId(subUnitId);
        if (!worksheet) {
          throw new Error("Sheet not found");
        }
        const realUnitId = workbook.getUnitId();
        const realSheetId = worksheet.getSheetId();
        if (realUnitId !== currentUnitId || realSheetId !== currentSheetId) {
          return node;
        }
        const newRange = handleDefaultRangeChangeWithEffectRefCommands(range, params);
        let newToken = "";
        if (newRange) {
          const offsetX = newRange.startColumn - range.startColumn;
          const offsetY = newRange.startRow - range.startRow;
          const finalRange = moveRangeByOffset(range, offsetX, offsetY);
          if (rangeUnitId && rangeSheetName) {
            newToken = serializeRangeWithSpreadsheet(rangeUnitId, rangeSheetName, finalRange);
          } else if (rangeSheetName) {
            newToken = serializeRangeWithSheet(rangeSheetName, finalRange);
          } else {
            newToken = serializeRange(finalRange);
          }
        } else {
          newToken = "#REF!" /* REF */;
        }
        return {
          ...node,
          token: newToken
        };
      } else {
        return node;
      }
      ;
    });
    return transformSequenceNodes ? `=${generateStringWithSequence(transformSequenceNodes)}` : "";
  }
  registerFormula(unitId, subUnitId, formula, callback) {
    const rangeMap = /* @__PURE__ */ new Map();
    const sequenceNodes = this._lexerTreeBuilder.sequenceNodesBuilder(formula);
    const disposableCollection = new DisposableCollection();
    const handleChange = (params) => {
      const currentUnit = this._univerInstanceService.getCurrentUnitForType(2 /* UNIVER_SHEET */);
      const currentSheet = currentUnit.getActiveSheet();
      const currentUnitId = currentUnit.getUnitId();
      const currentSheetId = currentSheet.getSheetId();
      const transformSequenceNodes = sequenceNodes == null ? void 0 : sequenceNodes.map((node) => {
        if (typeof node === "object" && node.nodeType === 4 /* REFERENCE */) {
          const rangeInfo = rangeMap.get(node.token);
          if (rangeInfo.unitId !== currentUnitId || rangeInfo.subUnitId !== currentSheetId) {
            return node;
          }
          const newRange = handleDefaultRangeChangeWithEffectRefCommands(rangeInfo.range, params);
          let newToken = "";
          if (newRange) {
            const offsetX = newRange.startColumn - rangeInfo.range.startColumn;
            const offsetY = newRange.startRow - rangeInfo.range.startRow;
            const finalRange = moveRangeByOffset(rangeInfo.range, offsetX, offsetY);
            if (rangeInfo.unitId && rangeInfo.sheetName) {
              newToken = serializeRangeWithSpreadsheet(rangeInfo.unitId, rangeInfo.sheetName, finalRange);
            } else if (rangeInfo.sheetName) {
              newToken = serializeRangeWithSheet(rangeInfo.sheetName, finalRange);
            } else {
              newToken = serializeRange(finalRange);
            }
          } else {
            newToken = "#REF!" /* REF */;
          }
          return {
            ...node,
            token: newToken
          };
        } else {
          return node;
        }
        ;
      });
      const newFormulaString = transformSequenceNodes && generateStringWithSequence(transformSequenceNodes);
      return callback(`=${newFormulaString}`);
    };
    sequenceNodes == null ? void 0 : sequenceNodes.forEach((node) => {
      if (typeof node === "object" && node.nodeType === 4 /* REFERENCE */) {
        const gridRangeName = deserializeRangeWithSheetWithCache(node.token);
        const { range, unitId: rangeUnitId, sheetName: rangeSheetName } = gridRangeName;
        const workbook = this._univerInstanceService.getUnit(rangeUnitId || unitId);
        const worksheet = rangeSheetName ? workbook == null ? void 0 : workbook.getSheetBySheetName(rangeSheetName) : workbook == null ? void 0 : workbook.getSheetBySheetId(subUnitId);
        if (!worksheet) {
          return;
        }
        const realUnitId = workbook.getUnitId();
        const realSheetId = worksheet.getSheetId();
        const item = {
          unitId: realUnitId,
          subUnitId: realSheetId,
          range,
          sheetName: rangeSheetName
        };
        rangeMap.set(node.token, item);
        disposableCollection.add(this._refRangeService.registerRefRange(range, handleChange, realUnitId, realSheetId));
      }
    });
    return disposableCollection;
  }
  _getFormulaDependcy(unitId, subUnitId, formula, ranges) {
    const nodes = isFormulaString(formula) ? this._lexerTreeBuilder.sequenceNodesBuilder(formula) : null;
    const dependencyRanges = [];
    nodes == null ? void 0 : nodes.forEach((node) => {
      if (typeof node === "object" && node.nodeType === 4 /* REFERENCE */) {
        const gridRangeName = deserializeRangeWithSheetWithCache(node.token);
        const { range, unitId: rangeUnitId, sheetName: rangeSheetName } = gridRangeName;
        if (range.startAbsoluteRefType === 3 /* ALL */ && range.endAbsoluteRefType === 3 /* ALL */) {
          return;
        }
        const workbook = this._univerInstanceService.getUnit(rangeUnitId || unitId);
        const worksheet = rangeSheetName ? workbook == null ? void 0 : workbook.getSheetBySheetName(rangeSheetName) : workbook == null ? void 0 : workbook.getSheetBySheetId(subUnitId);
        if (!worksheet) {
          return;
        }
        const realUnitId = workbook.getUnitId();
        const realSheetId = worksheet.getSheetId();
        const orginStartRow = ranges[0].startRow;
        const orginStartColumn = ranges[0].startColumn;
        const currentStartRow = range.startRow;
        const currentStartColumn = range.startColumn;
        const offsetRanges = ranges.map((range2) => ({
          startRow: range2.startRow - orginStartRow + currentStartRow,
          endRow: range2.endRow - orginStartRow + currentStartRow,
          startColumn: range2.startColumn - orginStartColumn + currentStartColumn,
          endColumn: range2.endColumn - orginStartColumn + currentStartColumn
        }));
        dependencyRanges.push({
          unitId: realUnitId,
          subUnitId: realSheetId,
          ranges: offsetRanges
        });
      }
    });
    return dependencyRanges;
  }
  // eslint-disable-next-line max-lines-per-function
  registerRangeFormula(unitId, subUnitId, oldRanges, formulas, callback) {
    const disposableCollection = new DisposableCollection();
    const formulaDeps = formulas.map((formula) => this._getFormulaDependcy(unitId, subUnitId, formula, oldRanges));
    const handleRangeChange = (commandInfo) => {
      const effectedRanges = getSeparateEffectedRangesOnCommand(this._injector, commandInfo);
      if (!effectedRanges) {
        return {
          undos: [],
          redos: []
        };
      }
      const originStartRow = oldRanges[0].startRow;
      const originStartColumn = oldRanges[0].startColumn;
      const deps = [{ unitId, subUnitId, ranges: oldRanges }, ...formulaDeps.flat()];
      const matchedEffectedRanges = [];
      for (const { unitId: depUnitId, subUnitId: depSubUnitId, ranges } of deps) {
        if (depUnitId === effectedRanges.unitId && depSubUnitId === effectedRanges.subUnitId) {
          const intersectedRanges = [];
          const currentStartRow = ranges[0].startRow;
          const currentStartColumn = ranges[0].startColumn;
          const offsetRow = currentStartRow - originStartRow;
          const offsetColumn = currentStartColumn - originStartColumn;
          for (const range of effectedRanges.ranges) {
            const intersectedRange = ranges.map((r) => getIntersectRange(range, r)).filter(Boolean);
            if (intersectedRange.length > 0) {
              intersectedRanges.push(...intersectedRange);
            }
          }
          if (intersectedRanges.length > 0) {
            matchedEffectedRanges.push(
              intersectedRanges.map((range) => ({
                startRow: range.startRow - offsetRow,
                endRow: range.endRow - offsetRow,
                startColumn: range.startColumn - offsetColumn,
                endColumn: range.endColumn - offsetColumn
              }))
            );
          }
        }
      }
      if (matchedEffectedRanges.length > 0) {
        const ranges = Rectangle.splitIntoGrid([...matchedEffectedRanges.flat()]);
        const noEffectRanges = Rectangle.subtractMulti(oldRanges, ranges);
        noEffectRanges.sort((a, b) => a.startRow - b.startRow || a.startColumn - b.startColumn);
        const keyMap = /* @__PURE__ */ new Map();
        for (let i = 0; i < ranges.length; i++) {
          const range = ranges[i];
          const currentRow = range.startRow;
          const currentColumn = range.startColumn;
          const offsetRow = currentRow - originStartRow;
          const offsetColumn = currentColumn - originStartColumn;
          const transformedRange = handleCommonDefaultRangeChangeWithEffectRefCommands(range, commandInfo).sort((a, b) => a.startRow - b.startRow || a.startColumn - b.startColumn);
          if (!transformedRange.length) {
            continue;
          }
          const transformedRow = transformedRange[0].startRow;
          const transformedColumn = transformedRange[0].startColumn;
          const transformedOffsetRow = transformedRow - originStartRow;
          const transformedOffsetColumn = transformedColumn - originStartColumn;
          const transformedFormulas = [];
          for (let j = 0; j < formulas.length; j++) {
            const formula = formulas[j];
            const isFormulaFormulaString = isFormulaString(formula);
            const formulaString = isFormulaFormulaString ? this._lexerTreeBuilder.moveFormulaRefOffset(formula, offsetColumn, offsetRow) : formula;
            const newFormula = isFormulaFormulaString ? this.transformFormulaByEffectCommand(unitId, subUnitId, formulaString, commandInfo) : formulaString;
            const orginFormula = getFormulaKeyOffset(this._lexerTreeBuilder, newFormula, -transformedOffsetColumn, -transformedOffsetRow);
            transformedFormulas.push({
              newFormula,
              orginFormula
            });
          }
          const item = {
            formulas: transformedFormulas,
            ranges: transformedRange,
            key: transformedFormulas.map((item2) => item2.orginFormula).join("_")
          };
          if (keyMap.has(item.key)) {
            keyMap.get(item.key).push(item);
          } else {
            keyMap.set(item.key, [item]);
          }
        }
        const originKey = formulas.map((item) => getFormulaKeyOffset(this._lexerTreeBuilder, item, 0, 0)).join("_");
        if (noEffectRanges.length > 0) {
          const currentRow = noEffectRanges[0].startRow;
          const currentColumn = noEffectRanges[0].startColumn;
          const noEffectFormulas = [];
          for (let i = 0; i < formulas.length; i++) {
            const formula = formulas[i];
            noEffectFormulas.push({
              newFormula: isFormulaString(formula) ? this._lexerTreeBuilder.moveFormulaRefOffset(formula, currentColumn - originStartColumn, currentRow - originStartRow) : formula,
              orginFormula: formula
            });
          }
          const item = {
            formulas: noEffectFormulas,
            ranges: noEffectRanges,
            key: originKey
          };
          if (keyMap.has(item.key)) {
            keyMap.get(item.key).push(item);
          } else {
            keyMap.set(item.key, [item]);
          }
        }
        const res = [];
        const keys = Array.from(keyMap.keys());
        for (let i = keys.length - 1; i >= 0; i--) {
          const key = keys[i];
          const ranges2 = keyMap.get(key).sort((a, b) => a.ranges[0].startRow - b.ranges[0].startRow || a.ranges[0].startColumn - b.ranges[0].startColumn);
          const formulas2 = [];
          for (let j = 0; j < ranges2[0].formulas.length; j++) {
            formulas2.push(ranges2[0].formulas[j].newFormula);
          }
          const newRanges = Rectangle.mergeRanges(ranges2.map((item) => item.ranges).flat());
          newRanges.sort((a, b) => a.startRow - b.startRow || a.startColumn - b.startColumn);
          res.push({
            formulas: formulas2,
            ranges: newRanges
          });
        }
        return callback(res);
      }
      return {
        undos: [],
        redos: []
      };
    };
    oldRanges.forEach((range) => {
      const disposable = this._refRangeService.registerRefRange(range, handleRangeChange, unitId, subUnitId);
      disposableCollection.add(disposable);
    });
    [...formulaDeps.flat()].forEach(({ unitId: unitId2, subUnitId: subUnitId2, ranges }) => {
      ranges.forEach((range) => {
        const disposable = this._refRangeService.registerRefRange(range, handleRangeChange, unitId2, subUnitId2);
        disposableCollection.add(disposable);
      });
    });
    return disposableCollection;
  }
};
FormulaRefRangeService = __decorateClass([
  __decorateParam(0, Inject(RefRangeService)),
  __decorateParam(1, Inject(LexerTreeBuilder)),
  __decorateParam(2, IUniverInstanceService),
  __decorateParam(3, Inject(Injector))
], FormulaRefRangeService);

// ../packages/sheets-formula/src/services/remote/remote-register-function.service.ts
var RemoteRegisterFunctionServiceName = "sheets-formula.remote-register-function.service";
var IRemoteRegisterFunctionService = createIdentifier(RemoteRegisterFunctionServiceName);
var RemoteRegisterFunctionService = class {
  constructor(_functionService) {
    __publicField(this, "_functionService", _functionService);
  }
  async registerFunctions(serializedFuncs) {
    const functionList = serializedFuncs.map(([func, name]) => {
      return createFunction(func, name);
    });
    this._functionService.registerExecutors(...functionList);
  }
  async registerAsyncFunctions(serializedFuncs) {
    const functionList = serializedFuncs.map(([func, name]) => {
      return createAsyncFunction(func, name);
    });
    this._functionService.registerExecutors(...functionList);
  }
  async unregisterFunctions(names) {
    this._functionService.unregisterExecutors(...names);
    this._functionService.unregisterDescriptions(...names);
    this._functionService.deleteFormulaAstCacheKey(...names);
  }
};
RemoteRegisterFunctionService = __decorateClass([
  __decorateParam(0, IFunctionService)
], RemoteRegisterFunctionService);
function createFunction(functionString, functionName) {
  const instance = new CustomFunction(functionName);
  const functionCalculate = new Function(`return ${functionString}`)();
  instance.calculateCustom = functionCalculate;
  return instance;
}
function createAsyncFunction(functionString, functionName) {
  const instance = new AsyncCustomFunction(functionName);
  const functionCalculate = new Function(`return ${functionString}`)();
  instance.calculateCustom = functionCalculate;
  return instance;
}

// ../packages/sheets-formula/src/services/register-function.service.ts
var IRegisterFunctionService = createIdentifier(
  "sheets-formula.register-function-service"
);
var RegisterFunctionService = class extends Disposable {
  constructor(_localeService, _descriptionService, _functionService, _remoteRegisterFunctionService) {
    super();
    __publicField(this, "_localeService", _localeService);
    __publicField(this, "_descriptionService", _descriptionService);
    __publicField(this, "_functionService", _functionService);
    __publicField(this, "_remoteRegisterFunctionService", _remoteRegisterFunctionService);
  }
  registerFunction(params) {
    return this._registerSingleFunction(params);
  }
  registerAsyncFunction(params) {
    return this._registerSingleFunction({ ...params, async: true });
  }
  registerFunctions(params) {
    const { locales, description, calculate } = params;
    if (locales) {
      this._localeService.load(locales);
    }
    const disposables = new DisposableCollection();
    const descriptions = description != null ? description : calculate.map(([_func, functionName, functionIntroduction]) => {
      return {
        functionName,
        functionType: 15 /* User */,
        description: "",
        abstract: functionIntroduction || "",
        functionParameter: []
      };
    });
    disposables.add(this._descriptionService.registerDescriptions(descriptions));
    disposables.add(this._registerLocalExecutors(calculate));
    if (this._remoteRegisterFunctionService) {
      disposables.add(this._registerRemoteExecutors(calculate));
    }
    return disposables;
  }
  _registerSingleFunction(params) {
    const { name, func, description, locales, async = false } = params;
    const disposables = new DisposableCollection();
    if (locales) {
      this._localeService.load(locales);
    }
    if (typeof description === "string") {
      const functionInfo = {
        functionName: name,
        functionType: 15 /* User */,
        description,
        abstract: description || "",
        functionParameter: []
      };
      disposables.add(this._descriptionService.registerDescriptions([functionInfo]));
    } else {
      disposables.add(this._descriptionService.registerDescriptions([description]));
    }
    const instance = async ? new AsyncCustomFunction(name) : new CustomFunction(name);
    instance.calculateCustom = func;
    this._functionService.registerExecutors(instance);
    disposables.add(toDisposable(() => this._functionService.unregisterExecutors(name)));
    disposables.add(toDisposable(() => this._functionService.unregisterDescriptions(name)));
    disposables.add(toDisposable(() => this._functionService.deleteFormulaAstCacheKey(name)));
    if (this._remoteRegisterFunctionService) {
      this._remoteRegisterFunctionService.registerAsyncFunctions([[func.toString(), name]]);
      disposables.add(
        toDisposable(() => this._remoteRegisterFunctionService.unregisterFunctions([name]))
      );
    }
    return disposables;
  }
  _registerLocalExecutors(list) {
    const names = list.map(([_func, name]) => name);
    const functions = list.map(([func, name]) => {
      const instance = new CustomFunction(name);
      instance.calculateCustom = func;
      return instance;
    });
    this._functionService.registerExecutors(...functions);
    return toDisposable(() => this._functionService.unregisterExecutors(...names));
  }
  _registerRemoteExecutors(list) {
    const functionNameList = [];
    const functions = list.map(([func, name]) => {
      functionNameList.push(name);
      return [func.toString(), name];
    });
    this._remoteRegisterFunctionService.registerFunctions(functions);
    return toDisposable(() => this._remoteRegisterFunctionService.unregisterFunctions(functionNameList));
  }
};
RegisterFunctionService = __decorateClass([
  __decorateParam(0, Inject(LocaleService)),
  __decorateParam(1, Inject(IDescriptionService)),
  __decorateParam(2, IFunctionService),
  __decorateParam(3, Optional(IRemoteRegisterFunctionService))
], RegisterFunctionService);

// ../packages/sheets-formula/src/plugin.ts
var UniverRemoteSheetsFormulaPlugin = class extends Plugin {
  constructor(_config = defaultPluginRemoteConfig, _injector, _configService) {
    super();
    __publicField(this, "_config", _config);
    __publicField(this, "_injector", _injector);
    __publicField(this, "_configService", _configService);
    const { ...rest } = merge_default(
      {},
      defaultPluginRemoteConfig,
      this._config
    );
    this._configService.setConfig(PLUGIN_CONFIG_KEY_REMOTE, rest);
  }
  onStarting() {
    this._injector.add([RemoteRegisterFunctionService]);
    this._injector.get(IRPCChannelService).registerChannel(
      RemoteRegisterFunctionServiceName,
      fromModule(this._injector.get(RemoteRegisterFunctionService))
    );
  }
};
__publicField(UniverRemoteSheetsFormulaPlugin, "pluginName", "SHEET_FORMULA_REMOTE_PLUGIN");
__publicField(UniverRemoteSheetsFormulaPlugin, "packageName", package_default.name);
__publicField(UniverRemoteSheetsFormulaPlugin, "version", package_default.version);
__publicField(UniverRemoteSheetsFormulaPlugin, "type", 2 /* UNIVER_SHEET */);
UniverRemoteSheetsFormulaPlugin = __decorateClass([
  DependentOn(UniverFormulaEnginePlugin),
  __decorateParam(1, Inject(Injector)),
  __decorateParam(2, IConfigService)
], UniverRemoteSheetsFormulaPlugin);
var UniverSheetsFormulaPlugin = class extends Plugin {
  constructor(_config = defaultPluginBaseConfig, _injector, _configService) {
    super();
    __publicField(this, "_config", _config);
    __publicField(this, "_injector", _injector);
    __publicField(this, "_configService", _configService);
    const { ...rest } = merge_default(
      {},
      defaultPluginBaseConfig,
      this._config
    );
    this._configService.setConfig(PLUGIN_CONFIG_KEY_BASE, rest, { merge: true });
  }
  onStarting() {
    const j = this._injector;
    const dependencies = [
      [IRegisterFunctionService, { useClass: RegisterFunctionService }],
      [IDescriptionService, { useClass: DescriptionService }],
      [FormulaController],
      [FormulaRefRangeService],
      [ArrayFormulaCellInterceptorController],
      [ImageFormulaCellInterceptorController],
      [TriggerCalculationController],
      [UpdateFormulaController],
      [ActiveDirtyController],
      [DefinedNameController],
      [UpdateDefinedNameController],
      [SuperTableController],
      [FormulaAutoFillController]
    ];
    if (this._config.notExecuteFormula) {
      const rpcChannelService = j.get(IRPCChannelService);
      dependencies.push([IRemoteRegisterFunctionService, {
        useFactory: () => toModule(rpcChannelService.requestChannel(RemoteRegisterFunctionServiceName))
      }]);
    }
    dependencies.forEach((dependency) => j.add(dependency));
  }
  onReady() {
    touchDependencies(this._injector, [
      [FormulaController],
      [ActiveDirtyController],
      [ArrayFormulaCellInterceptorController],
      [ImageFormulaCellInterceptorController],
      [UpdateFormulaController],
      [UpdateDefinedNameController],
      [FormulaAutoFillController]
    ]);
    if (isNodeEnv()) {
      touchDependencies(this._injector, [
        [TriggerCalculationController]
      ]);
    }
  }
  onRendered() {
    touchDependencies(this._injector, [
      [DefinedNameController],
      [SuperTableController]
    ]);
    if (!isNodeEnv()) {
      touchDependencies(this._injector, [
        [TriggerCalculationController]
      ]);
    }
  }
};
__publicField(UniverSheetsFormulaPlugin, "pluginName", SHEETS_FORMULA_PLUGIN_NAME);
__publicField(UniverSheetsFormulaPlugin, "packageName", package_default.name);
__publicField(UniverSheetsFormulaPlugin, "version", package_default.version);
__publicField(UniverSheetsFormulaPlugin, "type", 2 /* UNIVER_SHEET */);
UniverSheetsFormulaPlugin = __decorateClass([
  DependentOn(UniverSheetsPlugin),
  __decorateParam(1, Inject(Injector)),
  __decorateParam(2, IConfigService)
], UniverSheetsFormulaPlugin);

export {
  InsertFunctionCommand,
  QuickSumCommand,
  PLUGIN_CONFIG_KEY_BASE,
  CalculationMode,
  ImageFormulaCellInterceptorController,
  TriggerCalculationController,
  IDescriptionService,
  FormulaRefRangeService,
  IRegisterFunctionService,
  RegisterFunctionService,
  UniverRemoteSheetsFormulaPlugin,
  UniverSheetsFormulaPlugin
};
