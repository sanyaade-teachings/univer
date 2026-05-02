import {
  vi_VN_default
} from "../chunk-HPJ3AW7Y.js";
import {
  ja_JP_default
} from "../chunk-PD263RJ4.js";
import {
  fa_IR_default
} from "../chunk-BNBSRXUQ.js";
import {
  ko_KR_default
} from "../chunk-I7VX4UY4.js";
import {
  es_ES_default
} from "../chunk-XUIXB4SC.js";
import {
  ca_ES_default
} from "../chunk-UDHWEDTP.js";
import {
  sk_SK_default
} from "../chunk-W6VSAPLQ.js";
import {
  zh_TW_default
} from "../chunk-RXHA36DD.js";
import {
  fr_FR_default
} from "../chunk-OCDBSN3S.js";
import {
  ru_RU_default
} from "../chunk-7BDOVJCZ.js";
import "../chunk-VUOGANWW.js";
import "../chunk-4NS6IGPD.js";
import {
  UniverVue3AdapterPlugin,
  UniverWebComponentAdapterPlugin
} from "../chunk-O2SGZFGH.js";
import {
  UniverNetworkPlugin
} from "../chunk-G5Q3S2AD.js";
import "../chunk-4B4C4TNZ.js";
import {
  UniverSheetsThreadCommentPlugin
} from "../chunk-GYSH6HL2.js";
import "../chunk-DKS4OYGR.js";
import {
  en_US_default
} from "../chunk-XFE447EZ.js";
import "../chunk-D5O35L4U.js";
import "../chunk-JP6QLGWM.js";
import "../chunk-WT4JNZXZ.js";
import {
  UniverSheetsNotePlugin,
  UniverSheetsTablePlugin
} from "../chunk-5LSPWM2V.js";
import {
  UniverSheetsZenEditorPlugin
} from "../chunk-QDPEMCUR.js";
import {
  UniverSheetsHyperLinkPlugin
} from "../chunk-MIVGOTSS.js";
import {
  UniverSheetsSortPlugin
} from "../chunk-W7EFL2EA.js";
import "../chunk-SYD2KNGE.js";
import {
  UniverDebuggerPlugin
} from "../chunk-NSKZAT47.js";
import "../chunk-THXVG335.js";
import "../chunk-VVSCTRT4.js";
import "../chunk-MOHJC2BO.js";
import "../chunk-MLFBVVME.js";
import {
  FUniver
} from "../chunk-BOFO7FDU.js";
import {
  UniverSheetsConditionalFormattingPlugin
} from "../chunk-2FNOW4GK.js";
import {
  UniverSheetsFilterPlugin
} from "../chunk-AZHMLAGZ.js";
import "../chunk-M6GAWQ5P.js";
import {
  UniverSheetsNumfmtPlugin
} from "../chunk-N2RQEFDC.js";
import {
  UniverSheetsUIPlugin,
  whenSheetEditorFocused
} from "../chunk-MBZ442FO.js";
import {
  DEFAULT_WORKBOOK_DATA_DEMO
} from "../chunk-YLOR7Z6Y.js";
import {
  UniverDocsPlugin,
  UniverDocsUIPlugin,
  UniverSheetsDataValidationPlugin
} from "../chunk-PPREH44U.js";
import "../chunk-LI6UXASZ.js";
import {
  ComponentManager,
  FolderIcon,
  IContextMenuService,
  IMenuManagerService,
  IShortcutService,
  UniverUIPlugin,
  require_jsx_runtime
} from "../chunk-NW5FEDQC.js";
import {
  zh_CN_default
} from "../chunk-OROQCTWB.js";
import {
  UniverSheetsFormulaPlugin
} from "../chunk-5YA62WFH.js";
import {
  ClearSelectionContentCommand,
  RemoveColByRangeCommand,
  SetRangeValuesMutation,
  SetRangeValuesUndoMutationFactory,
  SetWorksheetColumnCountMutation,
  SetWorksheetColumnCountUndoMutationFactory,
  SetWorksheetRowCountMutation,
  SetWorksheetRowCountUndoMutationFactory,
  SheetsSelectionsService,
  UniverFormulaEnginePlugin,
  UniverRPCMainThreadPlugin,
  UniverSheetsPlugin,
  getSheetCommandTarget
} from "../chunk-JGEZE7BC.js";
import {
  IRenderManagerService,
  UniverRenderEnginePlugin
} from "../chunk-VYDPVHQH.js";
import {
  CanceledError,
  DisposableCollection,
  ICommandService,
  IUndoRedoService,
  IUniverInstanceService,
  Inject,
  Injector,
  LifecycleService,
  Plugin,
  Univer,
  UserManagerService,
  combineLatest,
  covertCellValues,
  sequenceExecute
} from "../chunk-UI3TUZSE.js";
import "../chunk-EQ2B2W73.js";
import {
  __decorateClass,
  __decorateParam,
  __publicField,
  __toESM
} from "../chunk-24OICD5T.js";

// src/sheets/custom/custom-register-event.ts
function customRegisterEvent(univer, univerAPI) {
  registerMainRightClickEvent(univer, univerAPI);
  univerAPI.addEvent(univerAPI.Event.LifeCycleChanged, ({ stage }) => {
    if (stage === univerAPI.Enum.LifecycleStages.Steady) {
      registerRemoveColumnEvent(univer, univerAPI);
      registerBeforeRemoveColumnEvent(univer, univerAPI);
      univerAPI.addEvent("MainRightClickEvent", (params) => {
        const { row, column } = params;
        console.warn(`Right clicked on cell at ${univerAPI.Util.tools.chatAtABC(column)}${row + 1}`);
        if (row === 0 && column === 0) {
          params.cancel = true;
        }
      });
      univerAPI.addEvent("RemoveColumnEvent", (params) => {
        const { startColumn, endColumn } = params;
        console.warn(`Removed columns from ${univerAPI.Util.tools.chatAtABC(startColumn)} to ${univerAPI.Util.tools.chatAtABC(endColumn)}`);
      });
      const beforeRemoveColumnEventDisposable = univerAPI.addEvent("BeforeRemoveColumnEvent", (params) => {
        const { startColumn, endColumn } = params;
        console.warn(`Before removing columns from ${univerAPI.Util.tools.chatAtABC(startColumn)} to ${univerAPI.Util.tools.chatAtABC(endColumn)}`);
        if (!(startColumn > 4 || endColumn < 2)) {
          params.cancel = true;
          console.warn("Cannot delete column C to E");
        }
      });
      setTimeout(() => {
        beforeRemoveColumnEventDisposable.dispose();
        console.warn("BeforeRemoveColumnEvent listener has been removed, you can delete any columns now.");
      }, 1e4);
    }
  });
}
function registerMainRightClickEvent(univer, univerAPI) {
  const injector = univer.__getInjector();
  const renderManagerService = injector.get(IRenderManagerService);
  const lifeCycleService = injector.get(LifecycleService);
  const contextMenuService = injector.get(IContextMenuService);
  let sheetRenderUnit;
  const combined$ = combineLatest([
    renderManagerService.created$,
    lifeCycleService.lifecycle$
  ]);
  const disposable = new DisposableCollection();
  univerAPI.disposeWithMe(combined$.subscribe(([created, lifecycle]) => {
    if (created.type === 2 /* UNIVER_SHEET */) {
      sheetRenderUnit = created;
    }
    if (lifecycle <= 2 /* Rendered */) return;
    if (!sheetRenderUnit) return;
    const { components } = sheetRenderUnit;
    const mainComponent = components.get("__SpreadsheetRender__" /* MAIN */);
    if (!mainComponent) return;
    const fWorkbook = univerAPI.getWorkbook(sheetRenderUnit.unitId);
    if (!fWorkbook) return;
    const fWorksheet = fWorkbook.getActiveSheet();
    if (!fWorksheet) return;
    disposable.dispose();
    disposable.add(
      univerAPI.registerEventHandler(
        "MainRightClickEvent",
        () => mainComponent.onPointerDown$.subscribeEvent((event) => {
          var _a, _b;
          if (event.button !== 2) return;
          const activeRange = fWorksheet.getActiveRange();
          const eventParams = {
            event,
            row: (_a = activeRange == null ? void 0 : activeRange.getRow()) != null ? _a : 0,
            column: (_b = activeRange == null ? void 0 : activeRange.getColumn()) != null ? _b : 0
          };
          univerAPI.fireEvent("MainRightClickEvent", eventParams);
          if (eventParams.cancel) {
            requestAnimationFrame(() => {
              contextMenuService.hideContextMenu();
            });
          }
        })
      )
    );
    univerAPI.disposeWithMe(disposable);
  }));
}
function registerRemoveColumnEvent(univer, univerAPI) {
  const injector = univer.__getInjector();
  const commandService = injector.get(ICommandService);
  univerAPI.disposeWithMe(
    univerAPI.registerEventHandler(
      "RemoveColumnEvent",
      () => commandService.onCommandExecuted((commandInfo) => {
        if (commandInfo.id !== RemoveColByRangeCommand.id) return;
        const target = univerAPI.getCommandSheetTarget(commandInfo);
        if (!target) return;
        const { range } = commandInfo.params;
        const eventParams = {
          workbook: target.workbook,
          worksheet: target.worksheet,
          startColumn: range.startColumn,
          endColumn: range.endColumn
        };
        univerAPI.fireEvent("RemoveColumnEvent", eventParams);
      })
    )
  );
}
function registerBeforeRemoveColumnEvent(univer, univerAPI) {
  const injector = univer.__getInjector();
  const commandService = injector.get(ICommandService);
  univerAPI.disposeWithMe(
    univerAPI.registerEventHandler(
      "BeforeRemoveColumnEvent",
      () => commandService.beforeCommandExecuted((commandInfo) => {
        if (commandInfo.id !== RemoveColByRangeCommand.id) return;
        const target = univerAPI.getCommandSheetTarget(commandInfo);
        if (!target) return;
        const { range } = commandInfo.params;
        const eventParams = {
          workbook: target.workbook,
          worksheet: target.worksheet,
          startColumn: range.startColumn,
          endColumn: range.endColumn
        };
        univerAPI.fireEvent("BeforeRemoveColumnEvent", eventParams);
        if (eventParams.cancel) {
          throw new CanceledError();
        }
      })
    )
  );
}

// src/sheets/custom/custom-shortcut/commands/commands/custom.command.ts
var CustomClearSelectionContentCommand = {
  id: "sheet.command.custom-clear-selection-content",
  type: 0 /* COMMAND */,
  handler: (accessor) => {
    var _a;
    const target = getSheetCommandTarget(accessor.get(IUniverInstanceService));
    if (!target) return false;
    const { unitId, subUnitId, worksheet } = target;
    const selectionManagerService = accessor.get(SheetsSelectionsService);
    const range = (_a = selectionManagerService.getCurrentLastSelection()) == null ? void 0 : _a.range;
    if (!range) return false;
    const commandService = accessor.get(ICommandService);
    const { startRow, endRow, startColumn, endColumn } = range;
    const isSingleCell = startRow === endRow && startColumn === endColumn;
    if (isSingleCell && startRow === 2 && startColumn === 2) {
      return commandService.executeCommand(ClearSelectionContentCommand.id, {
        unitId,
        subUnitId,
        ranges: [
          {
            startRow,
            endRow,
            startColumn: 0,
            endColumn: worksheet.getMaxColumns() - 1
          }
        ]
      });
    } else {
      return commandService.executeCommand(ClearSelectionContentCommand.id, {
        unitId,
        subUnitId,
        ranges: [
          {
            startRow,
            endRow,
            startColumn,
            endColumn
          }
        ]
      });
    }
  }
};

// src/sheets/custom/custom-shortcut/controllers/shortcuts/custom.shortcut.ts
var CustomClearSelectionValueShortcutItem = {
  id: CustomClearSelectionContentCommand.id,
  // high priority to ensure it is checked first
  priority: 9999,
  // when focusing on any other input tag do not trigger this shortcut
  preconditions: whenSheetEditorFocused,
  binding: 46 /* DELETE */,
  mac: 8 /* BACKSPACE */
};

// src/sheets/custom/custom-shortcut/plugin.ts
var SHEET_CUSTOM_SHORTCUT_PLUGIN = "SHEET_CUSTOM_SHORTCUT_PLUGIN";
var UniverSheetsCustomShortcutPlugin = class extends Plugin {
  constructor(_config = void 0, _injector, _commandService, _shortcutService) {
    super();
    __publicField(this, "_injector", _injector);
    __publicField(this, "_commandService", _commandService);
    __publicField(this, "_shortcutService", _shortcutService);
    this._initCommands();
    this._initShortcuts();
  }
  _initCommands() {
    [
      CustomClearSelectionContentCommand
    ].forEach((command) => this.disposeWithMe(this._commandService.registerCommand(command)));
  }
  _initShortcuts() {
    [
      CustomClearSelectionValueShortcutItem
    ].forEach((item) => this.disposeWithMe(this._shortcutService.registerShortcut(item)));
  }
};
__publicField(UniverSheetsCustomShortcutPlugin, "type", 2 /* UNIVER_SHEET */);
__publicField(UniverSheetsCustomShortcutPlugin, "pluginName", SHEET_CUSTOM_SHORTCUT_PLUGIN);
UniverSheetsCustomShortcutPlugin = __decorateClass([
  __decorateParam(1, Inject(Injector)),
  __decorateParam(2, ICommandService),
  __decorateParam(3, IShortcutService)
], UniverSheetsCustomShortcutPlugin);

// src/sheets/custom/import-csv-button.ts
function waitUserSelectCSVFile(onSelect) {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv";
    input.click();
    input.onchange = () => {
      var _a;
      const file = (_a = input.files) == null ? void 0 : _a[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result;
        if (typeof text !== "string") return;
        const rows = text.split(/\r\n|\n/);
        const data = rows.map((line) => line.split(","));
        const colsCount = data.reduce((max, row) => Math.max(max, row.length), 0);
        const result = onSelect({
          data,
          colsCount,
          rowsCount: data.length
        });
        resolve(result);
      };
      reader.readAsText(file);
    };
  });
}
var ImportCSVButtonPlugin = class extends Plugin {
  constructor(_config, _injector, menuManagerService, commandService, componentManager) {
    super();
    __publicField(this, "_injector", _injector);
    __publicField(this, "menuManagerService", menuManagerService);
    __publicField(this, "commandService", commandService);
    __publicField(this, "componentManager", componentManager);
  }
  /**
   * The first lifecycle of the plugin mounted on the Univer instance,
   * the Univer business instance has not been created at this time.
   * The plugin should add its own module to the dependency injection system at this lifecycle.
   * It is not recommended to initialize the internal module of the plugin outside this lifecycle.
   */
  // eslint-disable-next-line max-lines-per-function
  onStarting() {
    this.disposeWithMe(
      this.componentManager.register("FolderIcon2", FolderIcon)
    );
    const buttonId = "import-csv-button";
    const command = {
      type: 1 /* OPERATION */,
      id: buttonId,
      handler: (accessor) => {
        const univerInstanceService = accessor.get(IUniverInstanceService);
        const commandService = accessor.get(ICommandService);
        const undoRedoService = accessor.get(IUndoRedoService);
        const worksheet = univerInstanceService.getCurrentUnitOfType(2 /* UNIVER_SHEET */).getActiveSheet();
        const unitId = worksheet.getUnitId();
        const subUnitId = worksheet.getSheetId();
        return waitUserSelectCSVFile(({ data, rowsCount, colsCount }) => {
          const redoMutations = [];
          const undoMutations = [];
          const setRowCountMutationRedoParams = {
            unitId,
            subUnitId,
            rowCount: rowsCount
          };
          const setRowCountMutationUndoParams = SetWorksheetRowCountUndoMutationFactory(
            accessor,
            setRowCountMutationRedoParams
          );
          redoMutations.push({ id: SetWorksheetRowCountMutation.id, params: setRowCountMutationRedoParams });
          undoMutations.push({ id: SetWorksheetRowCountMutation.id, params: setRowCountMutationUndoParams });
          const setColumnCountMutationRedoParams = {
            unitId,
            subUnitId,
            columnCount: colsCount
          };
          const setColumnCountMutationUndoParams = SetWorksheetColumnCountUndoMutationFactory(
            accessor,
            setColumnCountMutationRedoParams
          );
          redoMutations.push({ id: SetWorksheetColumnCountMutation.id, params: setColumnCountMutationRedoParams });
          undoMutations.unshift({ id: SetWorksheetColumnCountMutation.id, params: setColumnCountMutationUndoParams });
          const cellValue = covertCellValues(data, {
            startColumn: 0,
            // start column index
            startRow: 0,
            // start row index
            endColumn: colsCount - 1,
            // end column index
            endRow: rowsCount - 1
            // end row index
          });
          const setRangeValuesMutationRedoParams = {
            unitId,
            subUnitId,
            cellValue
          };
          const setRangeValuesMutationUndoParams = SetRangeValuesUndoMutationFactory(
            accessor,
            setRangeValuesMutationRedoParams
          );
          redoMutations.push({ id: SetRangeValuesMutation.id, params: setRangeValuesMutationRedoParams });
          undoMutations.unshift({ id: SetRangeValuesMutation.id, params: setRangeValuesMutationUndoParams });
          const result = sequenceExecute(redoMutations, commandService);
          if (result.result) {
            undoRedoService.pushUndoRedo({
              unitID: unitId,
              undoMutations,
              redoMutations
            });
            return true;
          }
          return false;
        });
      }
    };
    const menuItemFactory = () => ({
      id: buttonId,
      title: "Import CSV",
      tooltip: "Import CSV",
      icon: "FolderIcon2",
      // icon name
      type: 0 /* BUTTON */
    });
    this.menuManagerService.mergeMenu({
      ["ribbon.others.others" /* OTHERS */]: {
        [buttonId]: {
          order: 10,
          menuItemFactory
        }
      }
    });
    this.commandService.registerCommand(command);
  }
};
__publicField(ImportCSVButtonPlugin, "pluginName", "import-csv-plugin");
ImportCSVButtonPlugin = __decorateClass([
  __decorateParam(1, Inject(Injector)),
  __decorateParam(2, Inject(IMenuManagerService)),
  __decorateParam(3, Inject(ICommandService)),
  __decorateParam(4, Inject(ComponentManager))
], ImportCSVButtonPlugin);
var import_csv_button_default = ImportCSVButtonPlugin;

// src/sheets/custom/simple-range-popup.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
function simpleRangePopupDemo(univer, univerAPI) {
  univerAPI.registerComponent("MySimplePopup", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      style: {
        padding: "8px",
        background: "white",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        color: "#333"
      },
      children: "Hello from Range Popup!"
    }
  ));
  univerAPI.addEvent(univerAPI.Event.LifeCycleChanged, (params) => {
    if (params.stage === 2 /* Rendered */) {
      const workbook = univerAPI.getActiveWorkbook();
      const worksheet = workbook.getActiveSheet();
      const range = worksheet.getRange("B2:D100");
      range.attachRangePopup({
        componentKey: "MySimplePopup",
        direction: "right-bottom",
        offset: [0, 10]
      });
    }
  });
}

// src/sheets/main.ts
var IS_E2E = false;
var LOAD_LAZY_PLUGINS_TIMEOUT = 50;
var LOAD_VERY_LAZY_PLUGINS_TIMEOUT = 100;
var mockUser = {
  userID: "Owner_qxVnhPbQ",
  name: "Owner",
  avatar: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAInSURBVHgBtZU9TxtBEIbfWRzFSIdkikhBSqRQkJqkCKTCFkqVInSUSaT0wC8w/gXxD4gU2nRJkXQWhAZowDUUWKIwEgWWbEEB3mVmx3dn4DA2nB/ppNuPeWd29mMIPXDr+RxwtgRHeW6+guNPRxogqnL7Dwz9psJ27S4NShaeZTH3kwXy6I81dlRKcmRui88swdq9AcSFL7Buz1Vmlns64MiLsCjzwnIYHLH57tbfFbs7KRaXyEU8FVZofqccOfA5l7Q8LPIkGrwnb2RPNEXWFVMUF3L+kDCk0btDDAMzOm5YfAHDwp4tG74wnzAsiOYMnJ3GoDybA7IT98/jm5+JNnfiIzAS6LlqHQBN/i6b2t/cV1Hh6BfwYlHnHP4AXi5q/8kmMMpOs8+BixZw/Fd6xUEHEbnkgclvQP2fGp7uShRKnQ3G32rkjV1th8JhIGG7tR/JyjGteSOZELwGMmNqIIigRCLRh2OZIE6BjItdd7pCW6Uhm1zzkUtungSxwEUzNpQ+GQumtH1ej1MqgmNT6vwmhCq5yuwq56EYTbgeQUz3yvrpV1b4ok3nYJ+eYhgYmjRUqErx2EDq0Fr8FhG++iqVGqxlUJI/70Ar0UgJaWHj6hYVHJrfKssAHot1JfqwE9WVWzXZVd5z2Ws/4PnmtEjkXeKJDvxUecLbWOXH/DP6QQ4J72NS0adedp1aseBfXP8odlZFfPvBF7SN/8hky1TYuPOAXAEipMx15u5ToAAAAABJRU5ErkJggg==",
  anonymous: false,
  canBindAnonymous: false
};
function createNewInstance() {
  const univer = new Univer({
    // theme: greenTheme,
    darkMode: localStorage.getItem("local.darkMode") === "dark",
    locale: "zhCN" /* ZH_CN */,
    locales: {
      ["caES" /* CA_ES */]: ca_ES_default,
      ["enUS" /* EN_US */]: en_US_default,
      ["esES" /* ES_ES */]: es_ES_default,
      ["faIR" /* FA_IR */]: fa_IR_default,
      ["frFR" /* FR_FR */]: fr_FR_default,
      ["jaJP" /* JA_JP */]: ja_JP_default,
      ["koKR" /* KO_KR */]: ko_KR_default,
      ["ruRU" /* RU_RU */]: ru_RU_default,
      ["viVN" /* VI_VN */]: vi_VN_default,
      ["zhCN" /* ZH_CN */]: zh_CN_default,
      ["zhTW" /* ZH_TW */]: zh_TW_default,
      ["skSK" /* SK_SK */]: sk_SK_default
    },
    logLevel: 4 /* VERBOSE */
  });
  const worker = new Worker(new URL("./worker.js", import.meta.url), { type: "module" });
  univer.registerPlugins([
    [UniverRPCMainThreadPlugin, { workerURL: worker }],
    [UniverDocsPlugin],
    [UniverRenderEnginePlugin],
    [UniverUIPlugin, {
      container: "app",
      customFontFamily: {
        list: [
          { value: "PingFang SC", label: "\u82F9\u65B9\uFF08\u7B80\uFF09", category: "sans-serif" },
          { value: "Helvetica Neue", label: "Helvetica Neue", category: "sans-serif" }
        ]
        // override: true,
      }
    }],
    [UniverWebComponentAdapterPlugin],
    [UniverVue3AdapterPlugin],
    [UniverDocsUIPlugin],
    [UniverSheetsPlugin, {
      notExecuteFormula: true,
      autoHeightForMergedCells: true
    }],
    [UniverSheetsUIPlugin],
    [UniverSheetsNumfmtPlugin],
    [UniverSheetsZenEditorPlugin],
    [UniverFormulaEnginePlugin, { notExecuteFormula: true }],
    [UniverSheetsFormulaPlugin, { notExecuteFormula: true }],
    [UniverSheetsDataValidationPlugin],
    [UniverSheetsConditionalFormattingPlugin],
    [UniverSheetsFilterPlugin],
    [UniverSheetsSortPlugin],
    [UniverSheetsHyperLinkPlugin],
    [UniverSheetsThreadCommentPlugin],
    [UniverSheetsTablePlugin],
    [UniverNetworkPlugin],
    [UniverSheetsNotePlugin],
    [import_csv_button_default],
    [UniverSheetsCustomShortcutPlugin]
  ]);
  if (IS_E2E) {
    univer.registerPlugin(UniverDebuggerPlugin, {
      fab: false,
      performanceMonitor: {
        enabled: false
      }
    });
  }
  const injector = univer.__getInjector();
  const userManagerService = injector.get(UserManagerService);
  userManagerService.setCurrentUser(mockUser);
  if (!IS_E2E) {
    univer.createUnit(2 /* UNIVER_SHEET */, DEFAULT_WORKBOOK_DATA_DEMO);
  }
  setTimeout(() => {
    import("../lazy-6QEOYJZH.js").then((lazy) => {
      const plugins = lazy.default();
      univer.registerPlugins(plugins);
    });
  }, LOAD_LAZY_PLUGINS_TIMEOUT);
  setTimeout(() => {
    import("../very-lazy-W5JC4FFI.js").then((lazy) => {
      const plugins = lazy.default();
      univer.registerPlugins(plugins);
    });
  }, LOAD_VERY_LAZY_PLUGINS_TIMEOUT);
  univer.onDispose(() => {
    worker.terminate();
    window.univer = void 0;
    window.univerAPI = void 0;
  });
  window.univer = univer;
  window.univerAPI = FUniver.newAPI(univer);
  customRegisterEvent(univer, window.univerAPI);
  simpleRangePopupDemo(univer, window.univerAPI);
}
createNewInstance();
window.createNewInstance = createNewInstance;
export {
  mockUser
};
