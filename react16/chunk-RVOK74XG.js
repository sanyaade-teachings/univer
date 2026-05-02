import {
  AddSheetTableCommand,
  AddTableThemeCommand,
  DeleteSheetTableCommand,
  RemoveTableThemeCommand,
  SHEET_TABLE_CUSTOM_THEME_PREFIX,
  SetSheetTableCommand,
  SetSheetTableFilterCommand,
  SheetDeleteNoteCommand,
  SheetTableInsertColCommand,
  SheetTableInsertRowCommand,
  SheetTableRemoveColCommand,
  SheetTableRemoveRowCommand,
  SheetTableService,
  SheetToggleNotePopupCommand,
  SheetUpdateNoteCommand,
  SheetsNoteModel,
  SheetsTableController,
  TableManager,
  UniverSheetsNotePlugin,
  UniverSheetsTablePlugin,
  customEmptyThemeWithBorderStyle,
  isConditionFilter,
  isManualTableFilter,
  processStyleWithBorderStyle
} from "./chunk-5LSPWM2V.js";
import {
  SortRangeCommand
} from "./chunk-W7EFL2EA.js";
import {
  RangeSelector
} from "./chunk-M6GAWQ5P.js";
import {
  CellPopupManagerService,
  HoverManagerService,
  IEditorBridgeService,
  SelectAllCommand,
  SetScrollOperation,
  SetZoomRatioOperation,
  SheetCanvasPopManagerService,
  SheetScrollManagerService,
  SheetSkeletonManagerService,
  getCoordByCell,
  getCurrentRangeDisable$,
  getSheetObject
} from "./chunk-MBZ442FO.js";
import {
  AddNoteIcon,
  AscendingIcon,
  Button,
  ButtonGroup,
  CascaderList,
  Checkbox,
  ColorPicker,
  ComponentManager,
  DatePicker,
  DateRangePicker,
  DeleteIcon,
  DeleteNoteIcon,
  DescendingIcon,
  Dropdown,
  DropdownIcon,
  GridOutlineIcon,
  HideNoteIcon,
  IDialogService,
  IMenuManagerService,
  ISidebarService,
  IUIPartsService,
  IZenZoneService,
  Input,
  InputNumber,
  MoreDownIcon,
  PaintBucketDoubleIcon,
  RenameIcon,
  Segmented,
  Select,
  TableIcon,
  Textarea,
  borderClassName,
  clsx,
  connectInjector,
  getMenuHiddenObservable,
  require_jsx_runtime,
  require_react,
  scrollbarClassName,
  useConfigValue,
  useDebounceFn,
  useDependency,
  useObservable
} from "./chunk-NW5FEDQC.js";
import {
  INTERCEPTOR_POINT,
  RangeThemeStyle,
  SetRangeThemeMutation,
  SetRangeValuesMutation,
  SetSelectionsOperation,
  SetVerticalTextAlignCommand,
  SheetInterceptorService,
  SheetRangeThemeModel,
  SheetsSelectionsService,
  WorkbookEditablePermission,
  WorkbookPermissionService,
  WorksheetEditPermission,
  deserializeRangeWithSheet,
  expandToContinuousRange,
  getPrimaryForRange,
  getSheetCommandTarget,
  isSingleCellSelection,
  serializeRange
} from "./chunk-JGEZE7BC.js";
import {
  IRenderManagerService,
  Rect,
  Shape,
  convertTransformToOffsetX,
  convertTransformToOffsetY
} from "./chunk-VYDPVHQH.js";
import {
  BehaviorSubject,
  ColorKit,
  DependentOn,
  Disposable,
  DisposableCollection,
  ErrorService,
  ICommandService,
  IConfigService,
  IContextService,
  IPermissionService,
  IUniverInstanceService,
  Inject,
  Injector,
  LocaleService,
  ObjectMatrix,
  Plugin,
  Rectangle,
  RxDisposable,
  Subject,
  ThemeService,
  cellToRange,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  generateRandomId,
  map,
  merge,
  merge_default,
  of,
  registerDependencies,
  startWith,
  switchMap,
  takeUntil,
  touchDependencies
} from "./chunk-UI3TUZSE.js";
import {
  __decorateClass,
  __decorateParam,
  __publicField,
  __toESM
} from "./chunk-24OICD5T.js";

// ../packages/sheets-note-ui/package.json
var package_default = {
  name: "@univerjs/sheets-note-ui",
  version: "0.21.1",
  private: false,
  description: "Univer sheets note UI plugin",
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
  keywords: [],
  exports: {
    ".": "./src/index.ts",
    "./*": "./src/*",
    "./locale/*": "./src/locale/*.ts",
    "./facade": "./src/facade/index.ts"
  },
  main: "./lib/index.js",
  module: "./lib/index.js",
  types: "./lib/index.d.ts",
  files: [
    "lib"
  ],
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
      "./lib/*": "./lib/*"
    }
  },
  scripts: {
    test: "vitest run",
    "test:watch": "vitest",
    "build:bundle": "univer-cli build",
    "build:types": "tsc -p tsconfig.node.json",
    build: "pnpm run build:bundle && pnpm run build:types"
  },
  peerDependencies: {
    react: "^16.9.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc",
    rxjs: ">=7.0.0"
  },
  dependencies: {
    "@univerjs/core": "workspace:*",
    "@univerjs/design": "workspace:*",
    "@univerjs/engine-render": "workspace:*",
    "@univerjs/icons": "^1.1.1",
    "@univerjs/sheets": "workspace:*",
    "@univerjs/sheets-note": "workspace:*",
    "@univerjs/sheets-ui": "workspace:*",
    "@univerjs/ui": "workspace:*"
  },
  devDependencies: {
    "@univerjs-infra/shared": "workspace:*",
    postcss: "^8.5.10",
    react: "18.3.1",
    rxjs: "^7.8.2",
    tailwindcss: "3.4.18",
    typescript: "^6.0.2",
    vitest: "^4.1.4"
  }
};

// ../packages/sheets-note-ui/src/config/config.ts
var SHEETS_NOTE_UI_PLUGIN_CONFIG_KEY = "sheets-note-ui.config";
var configSymbol = Symbol(SHEETS_NOTE_UI_PLUGIN_CONFIG_KEY);
var defaultPluginConfig = {};

// ../packages/sheets-note-ui/src/controllers/sheets-cell-content.controller.ts
var SheetsCellContentController = class extends Disposable {
  constructor(_sheetInterceptorService, _sheetsNoteModel, _renderManagerService, _univerInstanceService) {
    super();
    __publicField(this, "_sheetInterceptorService", _sheetInterceptorService);
    __publicField(this, "_sheetsNoteModel", _sheetsNoteModel);
    __publicField(this, "_renderManagerService", _renderManagerService);
    __publicField(this, "_univerInstanceService", _univerInstanceService);
    this._initViewModelIntercept();
    this._initSkeletonChange();
  }
  _initViewModelIntercept() {
    this.disposeWithMe(
      this._sheetInterceptorService.intercept(
        INTERCEPTOR_POINT.CELL_CONTENT,
        {
          effect: 1 /* Style */,
          handler: (cell, pos, next) => {
            const { row, col, unitId, subUnitId } = pos;
            const note = this._sheetsNoteModel.getNote(unitId, subUnitId, { row, col });
            if (note) {
              if (!cell || cell === pos.rawData) {
                cell = { ...pos.rawData };
              }
              cell.markers = {
                ...cell == null ? void 0 : cell.markers,
                tr: {
                  color: "#FFBD37",
                  size: 6
                }
              };
              return next(cell);
            }
            return next(cell);
          },
          priority: 100
        }
      )
    );
  }
  _initSkeletonChange() {
    const markSkeletonDirty = () => {
      var _a;
      const workbook = this._univerInstanceService.getCurrentUnitForType(2 /* UNIVER_SHEET */);
      if (!workbook) return;
      const unitId = workbook.getUnitId();
      const currentRender = this._renderManagerService.getRenderById(unitId);
      (_a = currentRender == null ? void 0 : currentRender.mainComponent) == null ? void 0 : _a.makeForceDirty();
    };
    this.disposeWithMe(this._sheetsNoteModel.change$.pipe(debounceTime(16)).subscribe(() => {
      markSkeletonDirty();
    }));
  }
};
SheetsCellContentController = __decorateClass([
  __decorateParam(0, Inject(SheetInterceptorService)),
  __decorateParam(1, Inject(SheetsNoteModel)),
  __decorateParam(2, IRenderManagerService),
  __decorateParam(3, IUniverInstanceService)
], SheetsCellContentController);

// ../packages/sheets-note-ui/src/views/config.ts
var SHEET_NOTE_COMPONENT = "SHEET_NOTE_COMPONENT";

// ../packages/sheets-note-ui/src/services/sheets-note-popup.service.ts
var SheetsNotePopupService = class extends Disposable {
  constructor(_zenZoneService, _cellPopupManagerService) {
    super();
    __publicField(this, "_zenZoneService", _zenZoneService);
    __publicField(this, "_cellPopupManagerService", _cellPopupManagerService);
    __publicField(this, "_lastPopup", null);
    __publicField(this, "_activePopup");
    __publicField(this, "_activePopup$", new BehaviorSubject(null));
    __publicField(this, "activePopup$", this._activePopup$.asObservable());
    this._initZenVisible();
    this.disposeWithMe(() => {
      this._activePopup$.complete();
    });
  }
  get activePopup() {
    return this._activePopup;
  }
  _initZenVisible() {
    this.disposeWithMe(this._zenZoneService.visible$.subscribe((visible) => {
      if (visible) {
        this.hidePopup();
      }
    }));
  }
  dispose() {
    super.dispose();
    this.hidePopup();
  }
  showPopup(location, onHide) {
    var _a;
    const { row, col, unitId, subUnitId } = location;
    if (this._activePopup && row === this._activePopup.row && col === this._activePopup.col && unitId === this._activePopup.unitId && subUnitId === ((_a = this.activePopup) == null ? void 0 : _a.subUnitId)) {
      this._activePopup = location;
      this._activePopup$.next(location);
      return;
    }
    if (this._lastPopup) {
      this._lastPopup.dispose();
    }
    ;
    if (this._zenZoneService.visible) {
      return;
    }
    this._activePopup = location;
    this._activePopup$.next(location);
    const popupDisposable = this._cellPopupManagerService.showPopup(
      {
        unitId,
        subUnitId,
        row,
        col
      },
      {
        componentKey: SHEET_NOTE_COMPONENT,
        onClickOutside: () => {
          this.hidePopup();
        },
        direction: "horizontal",
        extraProps: {
          location
        },
        priority: 3
      }
    );
    if (!popupDisposable) {
      throw new Error("[SheetsNotePopupService]: cannot show popup!");
    }
    const disposableCollection = new DisposableCollection();
    disposableCollection.add(popupDisposable);
    disposableCollection.add({
      dispose: () => {
        onHide == null ? void 0 : onHide();
      }
    });
    this._lastPopup = disposableCollection;
  }
  hidePopup(force) {
    if (!this._activePopup) {
      return;
    }
    if (!force && !this._activePopup.temp) return;
    if (this._lastPopup) {
      this._lastPopup.dispose();
    }
    this._lastPopup = null;
    this._activePopup = null;
    this._activePopup$.next(null);
  }
  persistPopup() {
    if (!this._activePopup || !this._activePopup.temp) {
      return;
    }
    this._activePopup = {
      ...this._activePopup,
      temp: false
    };
    this._activePopup$.next(this._activePopup);
  }
};
SheetsNotePopupService = __decorateClass([
  __decorateParam(0, IZenZoneService),
  __decorateParam(1, Inject(CellPopupManagerService))
], SheetsNotePopupService);

// ../packages/sheets-note-ui/src/controllers/sheets-note-attachment.controller.ts
var SheetsNoteAttachmentController = class extends Disposable {
  constructor(_sheetsNoteModel, _univerInstanceService, _cellPopupManagerService, _sheetsNotePopupService) {
    super();
    __publicField(this, "_sheetsNoteModel", _sheetsNoteModel);
    __publicField(this, "_univerInstanceService", _univerInstanceService);
    __publicField(this, "_cellPopupManagerService", _cellPopupManagerService);
    __publicField(this, "_sheetsNotePopupService", _sheetsNotePopupService);
    __publicField(this, "_noteMatrix", new ObjectMatrix());
    this._initNoteChangeListener();
  }
  _showPopup(unitId, sheetId, row, col) {
    this._sheetsNotePopupService.hidePopup(true);
    return this._cellPopupManagerService.showPopup(
      {
        unitId,
        subUnitId: sheetId,
        row,
        col
      },
      {
        componentKey: SHEET_NOTE_COMPONENT,
        direction: "horizontal",
        extraProps: {
          location: {
            unitId,
            subUnitId: sheetId,
            row,
            col
          }
        },
        priority: 3
      }
    );
  }
  dispose() {
    super.dispose();
    this._noteMatrix.forValue((_, __, disposable) => {
      disposable.dispose();
    });
  }
  _initSheet(targetUnitId, targetSheetId) {
    var _a;
    const oldMatrix = this._noteMatrix;
    oldMatrix.forValue((_, __, disposable) => {
      disposable.dispose();
    });
    this._noteMatrix = new ObjectMatrix();
    const handleNote = (unitId, sheetId, row, col, note) => {
      const matrix = this._noteMatrix;
      const disposable = matrix.getValue(row, col);
      if (note == null ? void 0 : note.show) {
        if (!disposable) {
          const newDisposable = this._showPopup(unitId, sheetId, row, col);
          if (newDisposable) {
            matrix.setValue(row, col, newDisposable);
          }
        }
      } else {
        if (disposable) {
          disposable.dispose();
          matrix.realDeleteValue(row, col);
        }
      }
    };
    (_a = this._sheetsNoteModel.getSheetNotes(targetUnitId, targetSheetId)) == null ? void 0 : _a.forEach((note) => {
      handleNote(targetUnitId, targetSheetId, note.row, note.col, note);
    });
    return this._sheetsNoteModel.change$.subscribe((change) => {
      if (change.unitId !== targetUnitId || change.subUnitId !== targetSheetId) {
        return;
      }
      switch (change.type) {
        case "ref": {
          const { unitId, subUnitId, oldNote, newNote } = change;
          if (!newNote.show) return;
          const matrix = this._noteMatrix;
          const { row: oldRow, col: oldCol } = oldNote;
          const { row: newRow, col: newCol } = newNote;
          const disposable = matrix.getValue(oldRow, oldCol);
          if (disposable) {
            disposable.dispose();
            matrix.realDeleteValue(oldRow, oldCol);
          }
          const newDisposable = this._showPopup(unitId, subUnitId, newRow, newCol);
          if (newDisposable) {
            matrix.setValue(newRow, newCol, newDisposable);
          }
          break;
        }
        case "update": {
          const { unitId, subUnitId, oldNote, newNote } = change;
          const row = newNote ? newNote.row : oldNote.row;
          const col = newNote ? newNote.col : oldNote.col;
          handleNote(unitId, subUnitId, row, col, newNote);
          break;
        }
        default:
          break;
      }
    });
  }
  _initNoteChangeListener() {
    this.disposeWithMe(
      this._univerInstanceService.getCurrentTypeOfUnit$(2 /* UNIVER_SHEET */).pipe(
        switchMap((workbook) => {
          var _a;
          return (_a = workbook == null ? void 0 : workbook.activeSheet$) != null ? _a : of(null);
        })
      ).subscribe((sheet) => {
        if (sheet) {
          const disposable = this._initSheet(sheet.getUnitId(), sheet.getSheetId());
          return () => {
            disposable.unsubscribe();
          };
        } else {
          this._noteMatrix.forValue((_, __, disposable) => {
            disposable.dispose();
          });
          this._noteMatrix = new ObjectMatrix();
        }
      })
    );
  }
};
SheetsNoteAttachmentController = __decorateClass([
  __decorateParam(0, Inject(SheetsNoteModel)),
  __decorateParam(1, Inject(IUniverInstanceService)),
  __decorateParam(2, Inject(CellPopupManagerService)),
  __decorateParam(3, Inject(SheetsNotePopupService))
], SheetsNoteAttachmentController);

// ../packages/sheets-note-ui/src/controllers/sheets-note-popup.controller.ts
var SheetsNotePopupController = class extends Disposable {
  constructor(_sheetsNotePopupService, _sheetsNoteModel, _sheetSelectionService, _editorBridgeService, _renderManagerService, _hoverManagerService) {
    super();
    __publicField(this, "_sheetsNotePopupService", _sheetsNotePopupService);
    __publicField(this, "_sheetsNoteModel", _sheetsNoteModel);
    __publicField(this, "_sheetSelectionService", _sheetSelectionService);
    __publicField(this, "_editorBridgeService", _editorBridgeService);
    __publicField(this, "_renderManagerService", _renderManagerService);
    __publicField(this, "_hoverManagerService", _hoverManagerService);
    __publicField(this, "_isSwitchingSheet", false);
    this._initSelectionUpdateListener();
    this._initEditorBridge();
    this._initHoverEvent();
    this._initDeleteNoteListener();
  }
  _handleSelectionChange(selections, unitId, subUnitId) {
    var _a, _b, _c;
    const range = (_a = selections[0]) == null ? void 0 : _a.range;
    const render = this._renderManagerService.getRenderById(unitId);
    const skeleton = (_b = render == null ? void 0 : render.with(SheetSkeletonManagerService).getSkeletonParam(subUnitId)) == null ? void 0 : _b.skeleton;
    if (!skeleton) {
      return;
    }
    if (!range) {
      return;
    }
    const actualCell = skeleton.getCellWithCoordByIndex(range.startRow, range.startColumn);
    const rangeType = (_c = range.rangeType) != null ? _c : 0 /* NORMAL */;
    if ((rangeType !== 0 /* NORMAL */ || range.endColumn - range.startColumn > 0 || range.endRow - range.startRow > 0) && !((actualCell.isMerged || actualCell.isMergedMainCell) && Rectangle.equals(actualCell.mergeInfo, range))) {
      this._sheetsNotePopupService.hidePopup();
      return;
    }
    const row = actualCell.actualRow;
    const col = actualCell.actualColumn;
    const note = this._sheetsNoteModel.getNote(unitId, subUnitId, { row, col });
    if (note == null ? void 0 : note.show) return;
    if (note) {
      this._sheetsNotePopupService.showPopup({
        unitId,
        subUnitId,
        noteId: note.id,
        row,
        col
      });
    } else {
      this._sheetsNotePopupService.hidePopup(true);
    }
  }
  _initSelectionUpdateListener() {
    this.disposeWithMe(
      this._sheetSelectionService.selectionMoveEnd$.subscribe((selections) => {
        if (this._isSwitchingSheet) {
          return;
        }
        const current = this._sheetSelectionService.currentSelectionParam;
        if (!current) {
          return;
        }
        this._handleSelectionChange(selections, current.unitId, current.sheetId);
      })
    );
  }
  _initEditorBridge() {
    this.disposeWithMe(
      this._editorBridgeService.visible$.subscribe((visible) => {
        if (visible.visible) {
          this._sheetsNotePopupService.hidePopup(true);
        }
      })
    );
  }
  _initHoverEvent() {
    this.disposeWithMe(
      this._hoverManagerService.currentCell$.pipe(debounceTime(100)).subscribe((cell) => {
        var _a;
        if (!(cell == null ? void 0 : cell.location)) return;
        const { unitId, subUnitId, row, col } = cell.location;
        const render = this._renderManagerService.getRenderById(unitId);
        const skeleton = (_a = render == null ? void 0 : render.with(SheetSkeletonManagerService).getSkeletonParam(subUnitId)) == null ? void 0 : _a.skeleton;
        let targetRow = row;
        let targetCol = col;
        let note = this._sheetsNoteModel.getNote(unitId, subUnitId, { row: targetRow, col: targetCol });
        if (!note && skeleton) {
          const actualCell = skeleton.getCellWithCoordByIndex(row, col);
          const { startRow, endRow, startColumn, endColumn } = actualCell.mergeInfo;
          if (startRow !== endRow || startColumn !== endColumn) {
            const sheetNotes = this._sheetsNoteModel.getSheetNotes(unitId, subUnitId);
            if (sheetNotes) {
              for (const [_id, _note] of sheetNotes) {
                if (_note.row >= startRow && _note.row <= endRow && _note.col >= startColumn && _note.col <= endColumn) {
                  note = _note;
                  targetRow = _note.row;
                  targetCol = _note.col;
                  break;
                }
              }
            }
          }
        }
        if (note == null ? void 0 : note.show) return;
        if (note) {
          this._sheetsNotePopupService.showPopup({
            unitId,
            subUnitId,
            noteId: note.id,
            row: targetRow,
            col: targetCol,
            temp: true
          });
        } else {
          this._sheetsNotePopupService.hidePopup();
        }
      })
    );
  }
  _initDeleteNoteListener() {
    this.disposeWithMe(
      this._sheetsNoteModel.change$.subscribe((change) => {
        if (!this._sheetsNotePopupService.activePopup) return;
        const { unitId, subUnitId, noteId, row, col } = this._sheetsNotePopupService.activePopup;
        const { oldNote, newNote } = change;
        if (newNote === null && change.unitId === unitId && change.subUnitId === subUnitId && ((oldNote == null ? void 0 : oldNote.id) && oldNote.id === noteId || (oldNote == null ? void 0 : oldNote.row) === row && oldNote.col === col)) {
          this._sheetsNotePopupService.hidePopup(true);
        }
      })
    );
  }
};
SheetsNotePopupController = __decorateClass([
  __decorateParam(0, Inject(SheetsNotePopupService)),
  __decorateParam(1, Inject(SheetsNoteModel)),
  __decorateParam(2, Inject(SheetsSelectionsService)),
  __decorateParam(3, IEditorBridgeService),
  __decorateParam(4, IRenderManagerService),
  __decorateParam(5, Inject(HoverManagerService))
], SheetsNotePopupController);

// ../packages/sheets-note-ui/src/commands/operations/add-note-popup.operation.ts
var AddNotePopupOperation = {
  id: "sheet.operation.add-note-popup",
  type: 1 /* OPERATION */,
  handler: async (accessor, params) => {
    var _a;
    const selectionService = accessor.get(SheetsSelectionsService);
    const notePopupService = accessor.get(SheetsNotePopupService);
    const univerInstanceService = accessor.get(IUniverInstanceService);
    const workbook = univerInstanceService.getCurrentUnitForType(2 /* UNIVER_SHEET */);
    if (!workbook) {
      return false;
    }
    const worksheet = workbook.getActiveSheet();
    const lastSelection = selectionService.getCurrentLastSelection();
    if (!(lastSelection == null ? void 0 : lastSelection.primary)) {
      return false;
    }
    const { primary } = lastSelection;
    notePopupService.showPopup({
      unitId: workbook.getUnitId(),
      subUnitId: worksheet.getSheetId(),
      row: primary.actualRow,
      col: primary.actualColumn,
      temp: false,
      trigger: (_a = params == null ? void 0 : params.trigger) != null ? _a : "add-note"
    });
    return true;
  }
};

// ../packages/sheets-note-ui/src/menu/note.menu.ts
function getHasNote$(accessor) {
  const sheetsSelectionsService = accessor.get(SheetsSelectionsService);
  const univerInstanceService = accessor.get(IUniverInstanceService);
  return sheetsSelectionsService.selectionMoveEnd$.pipe(map(() => {
    const selection = sheetsSelectionsService.getCurrentLastSelection();
    if (!(selection == null ? void 0 : selection.primary)) return false;
    const target = getSheetCommandTarget(univerInstanceService);
    if (!target) return false;
    const { actualColumn, actualRow } = selection.primary;
    const noteModel = accessor.get(SheetsNoteModel);
    return Boolean(noteModel.getNote(target.unitId, target.subUnitId, { row: actualRow, col: actualColumn }));
  }));
}
function sheetNoteContextMenuFactory(accessor) {
  return {
    id: AddNotePopupOperation.id,
    type: 0 /* BUTTON */,
    title: "rightClick.addNote",
    icon: "AddNoteIcon",
    hidden$: combineLatest([getMenuHiddenObservable(accessor, 2 /* UNIVER_SHEET */), getHasNote$(accessor)]).pipe(map(([hidden, hasNote]) => hidden || hasNote)),
    disabled$: getCurrentRangeDisable$(accessor, { workbookTypes: [WorkbookEditablePermission], worksheetTypes: [WorksheetEditPermission] }),
    commandId: AddNotePopupOperation.id
  };
}
function sheetDeleteNoteMenuFactory(accessor) {
  return {
    id: SheetDeleteNoteCommand.id,
    type: 0 /* BUTTON */,
    title: "rightClick.deleteNote",
    icon: "DeleteNoteIcon",
    hidden$: getHasNote$(accessor).pipe(map((hasNote) => !hasNote)),
    disabled$: getCurrentRangeDisable$(accessor, { workbookTypes: [WorkbookEditablePermission], worksheetTypes: [WorksheetEditPermission] })
  };
}
function sheetNoteToggleMenuFactory(accessor) {
  return {
    id: SheetToggleNotePopupCommand.id,
    type: 0 /* BUTTON */,
    title: "rightClick.toggleNote",
    icon: "HideNoteIcon",
    hidden$: getHasNote$(accessor).pipe(map((hasNote) => !hasNote))
  };
}

// ../packages/sheets-note-ui/src/menu/schema.ts
var menuSchema = {
  ["contextMenu.mainArea" /* MAIN_AREA */]: {
    ["contextMenu.others" /* OTHERS */]: {
      order: 0,
      [AddNotePopupOperation.id]: {
        order: 0,
        menuItemFactory: sheetNoteContextMenuFactory
      },
      [SheetDeleteNoteCommand.id]: {
        order: 0,
        menuItemFactory: sheetDeleteNoteMenuFactory
      },
      [SheetToggleNotePopupCommand.id]: {
        order: 0,
        menuItemFactory: sheetNoteToggleMenuFactory
      }
    }
  }
};

// ../packages/sheets-note-ui/src/views/note.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var SheetsNote = (props) => {
  var _a;
  const { popup } = props;
  const noteModel = useDependency(SheetsNoteModel);
  const localeService = useDependency(LocaleService);
  const renderManagerService = useDependency(IRenderManagerService);
  const notePopupService = useDependency(SheetsNotePopupService);
  const config = useConfigValue(SHEETS_NOTE_UI_PLUGIN_CONFIG_KEY);
  const activePopup = (_a = popup.extraProps) == null ? void 0 : _a.location;
  if (!activePopup) {
    console.error("Popup extraProps or location is undefined.");
    return null;
  }
  const textareaRef = (0, import_react.useRef)(null);
  const currentRender = renderManagerService.getRenderById(activePopup.unitId);
  const [note, setNote] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    var _a2, _b, _c, _d, _e, _f;
    const { unitId, subUnitId, row, col } = activePopup;
    const note2 = noteModel.getNote(unitId, subUnitId, { row, col });
    const width = (_c = (_b = note2 == null ? void 0 : note2.width) != null ? _b : (_a2 = config == null ? void 0 : config.defaultNoteSize) == null ? void 0 : _a2.width) != null ? _c : 160;
    const height = (_f = (_e = note2 == null ? void 0 : note2.height) != null ? _e : (_d = config == null ? void 0 : config.defaultNoteSize) == null ? void 0 : _d.height) != null ? _f : 72;
    if (!note2) {
      const initNote = {
        id: generateRandomId(6),
        width,
        height,
        note: ""
      };
      setNote(initNote);
      updateNote(initNote);
    } else {
      setNote(note2);
    }
    if (textareaRef.current) {
      textareaRef.current.style.width = `${width}px`;
      textareaRef.current.style.height = `${height}px`;
    }
  }, [activePopup, textareaRef]);
  (0, import_react.useEffect)(() => {
    if (!activePopup || activePopup.temp || !activePopup.trigger) return;
    if (!textareaRef.current) return;
    const focusId = requestAnimationFrame(() => {
      var _a2;
      (_a2 = textareaRef.current) == null ? void 0 : _a2.focus();
    });
    return () => cancelAnimationFrame(focusId);
  }, [activePopup]);
  const commandService = useDependency(ICommandService);
  const updateNote = useDebounceFn((newNote) => {
    if (!activePopup) return;
    const { unitId, subUnitId, row, col } = activePopup;
    const result = commandService.syncExecuteCommand(SheetUpdateNoteCommand.id, {
      unitId,
      sheetId: subUnitId,
      row,
      col,
      note: newNote
    });
    if (!result) {
      const oldNote = noteModel.getNote(unitId, subUnitId, { noteId: newNote.id, row, col });
      if (oldNote) {
        setNote(oldNote);
      } else {
        notePopupService.hidePopup(true);
      }
    }
  });
  const handleNoteChange = (0, import_react.useCallback)((value) => {
    if (!note) return;
    if (value === note.note) return;
    const newNote = { ...note, note: value };
    setNote(newNote);
    updateNote(newNote);
  }, [note]);
  const handleResize = (0, import_react.useCallback)((width, height) => {
    if (!note) return;
    if (width === note.width && height === note.height) return;
    const newNote = { ...note, width, height };
    setNote(newNote);
    updateNote(newNote);
  }, [note]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    Textarea,
    {
      ref: textareaRef,
      "data-u-comp": "note-textarea",
      className: clsx(`univer-ml-px univer-min-h-1 univer-min-w-1 univer-bg-white !univer-text-sm univer-shadow dark:!univer-bg-gray-800`),
      value: note == null ? void 0 : note.note,
      placeholder: localeService.t("note.placeholder"),
      onResize: handleResize,
      onValueChange: handleNoteChange,
      onWheel: (e) => {
        if (document.activeElement !== textareaRef.current) {
          currentRender.engine.getCanvasElement().dispatchEvent(new WheelEvent(e.type, e.nativeEvent));
        }
      }
    }
  );
};

// ../packages/sheets-note-ui/src/controllers/sheets-note-ui.controller.ts
var SheetsNoteUIController = class extends Disposable {
  constructor(_componentManager, _menuManagerService, _commandService) {
    super();
    __publicField(this, "_componentManager", _componentManager);
    __publicField(this, "_menuManagerService", _menuManagerService);
    __publicField(this, "_commandService", _commandService);
    this._initComponents();
    this._initMenu();
    this._initCommands();
  }
  _initComponents() {
    [
      [SHEET_NOTE_COMPONENT, SheetsNote],
      ["AddNoteIcon", AddNoteIcon],
      ["DeleteNoteIcon", DeleteNoteIcon],
      ["HideNoteIcon", HideNoteIcon]
    ].forEach(([key, comp]) => {
      this.disposeWithMe(
        this._componentManager.register(key, comp)
      );
    });
  }
  _initMenu() {
    this._menuManagerService.mergeMenu(menuSchema);
  }
  _initCommands() {
    this._commandService.registerCommand(AddNotePopupOperation);
  }
};
SheetsNoteUIController = __decorateClass([
  __decorateParam(0, Inject(ComponentManager)),
  __decorateParam(1, Inject(IMenuManagerService)),
  __decorateParam(2, ICommandService)
], SheetsNoteUIController);

// ../packages/sheets-note-ui/src/plugin.ts
var UniverSheetsNoteUIPlugin = class extends Plugin {
  constructor(_config = defaultPluginConfig, _injector, _configService) {
    super();
    __publicField(this, "_config", _config);
    __publicField(this, "_injector", _injector);
    __publicField(this, "_configService", _configService);
    const { menu, ...rest } = merge_default(
      {},
      defaultPluginConfig,
      this._config
    );
    if (menu) {
      this._configService.setConfig("menu", menu, { merge: true });
    }
    this._configService.setConfig(SHEETS_NOTE_UI_PLUGIN_CONFIG_KEY, rest);
  }
  onStarting() {
    [
      [SheetsNotePopupService],
      [SheetsCellContentController],
      [SheetsNotePopupController],
      [SheetsNoteUIController],
      [SheetsNoteAttachmentController]
    ].forEach((dependency) => {
      this._injector.add(dependency);
    });
  }
  onReady() {
    touchDependencies(this._injector, [
      [SheetsNoteUIController],
      [SheetsCellContentController]
    ]);
  }
  onRendered() {
    touchDependencies(this._injector, [
      [SheetsNotePopupController],
      [SheetsNoteAttachmentController]
    ]);
  }
};
__publicField(UniverSheetsNoteUIPlugin, "pluginName", "SHEET_NOTE_UI_PLUGIN");
__publicField(UniverSheetsNoteUIPlugin, "packageName", package_default.name);
__publicField(UniverSheetsNoteUIPlugin, "version", package_default.version);
__publicField(UniverSheetsNoteUIPlugin, "type", 2 /* UNIVER_SHEET */);
UniverSheetsNoteUIPlugin = __decorateClass([
  DependentOn(UniverSheetsNotePlugin),
  __decorateParam(1, Inject(Injector)),
  __decorateParam(2, IConfigService)
], UniverSheetsNoteUIPlugin);

// ../packages/sheets-table-ui/package.json
var package_default2 = {
  name: "@univerjs/sheets-table-ui",
  version: "0.21.1",
  private: false,
  description: "A library for connect and bind data from other sources to Univer Sheets",
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
    "univer",
    "sheets",
    "table"
  ],
  exports: {
    ".": "./src/index.ts",
    "./*": "./src/*",
    "./facade": "./src/facade/index.ts",
    "./locale/*": "./src/locale/*.ts"
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
    react: "^16.9.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc",
    rxjs: ">=7.0.0"
  },
  dependencies: {
    "@univerjs/core": "workspace:*",
    "@univerjs/design": "workspace:*",
    "@univerjs/engine-formula": "workspace:*",
    "@univerjs/engine-render": "workspace:*",
    "@univerjs/icons": "^1.1.1",
    "@univerjs/sheets": "workspace:*",
    "@univerjs/sheets-formula-ui": "workspace:*",
    "@univerjs/sheets-sort": "workspace:*",
    "@univerjs/sheets-table": "workspace:*",
    "@univerjs/sheets-ui": "workspace:*",
    "@univerjs/ui": "workspace:*"
  },
  devDependencies: {
    "@univerjs-infra/shared": "workspace:*",
    postcss: "^8.5.10",
    react: "18.3.1",
    rxjs: "^7.8.2",
    tailwindcss: "3.4.18",
    typescript: "^6.0.2",
    vitest: "^4.1.4"
  }
};

// ../packages/sheets-table-ui/src/const.ts
var PLUGIN_NAME = "SHEET_TABLE_UI_PLUGIN";
var SHEETS_TABLE_FILTER_PANEL_OPENED_KEY = "SHEETS_TABLE_FILTER_PANEL_OPENED_KEY";
var UNIVER_SHEET_TABLE_FILTER_PANEL_ID = "UNIVER_SHEET_Table_FILTER_PANEL_ID";
var TABLE_TOOLBAR_BUTTON = "TABLE_TOOLBAR_BUTTON";
var TABLE_SELECTOR_DIALOG = "TABLE_SELECTOR_DIALOG";
var SHEET_TABLE_THEME_PANEL_ID = "SHEET_TABLE_THEME_PANEL_ID";
var SHEET_TABLE_THEME_PANEL = "SHEET_TABLE_THEME_PANEL";
var TABLE_CUSTOM_NAME_PREFIX = "table-custom-";
var TABLE_DEFAULT_NAME_PREFIX = "table-default-";
var TABLE_DEFAULT_BG_COLOR = "rgb(255, 255, 255)";
var TABLE_BORDER_NONE = "none";
var TABLE_BORDER_DEFAULT = "1px solid rgb(var(--grey-200))";

// ../packages/sheets-table-ui/src/views/components/SheetTableFilterPanel.tsx
var import_react4 = __toESM(require_react());

// ../packages/sheets-table-ui/src/services/sheets-table-ui-service.ts
var SheetsTableUiService = class extends Disposable {
  constructor(_tableManager, _sheetTableService, _univerInstanceService, _commandService, _localeService) {
    super();
    __publicField(this, "_tableManager", _tableManager);
    __publicField(this, "_sheetTableService", _sheetTableService);
    __publicField(this, "_univerInstanceService", _univerInstanceService);
    __publicField(this, "_commandService", _commandService);
    __publicField(this, "_localeService", _localeService);
    __publicField(this, "_itemsCache", /* @__PURE__ */ new Map());
    this._registerTableFilterChangeEvent();
  }
  _registerTableFilterChangeEvent() {
    this._commandService.onCommandExecuted((command) => {
      if (command.id === SetRangeValuesMutation.id) {
        const { unitId, subUnitId, cellValue } = command.params;
        const tables = this._tableManager.getTablesBySubunitId(unitId, subUnitId);
        if (!tables.length) {
          return;
        }
        const matrix = new ObjectMatrix(cellValue);
        matrix.forValue((row, col, _value) => {
          const cellRange = cellToRange(row, col);
          const overlapTable = tables.find((table) => {
            const tableRange = table.getTableFilterRange();
            return Rectangle.intersects(tableRange, cellRange);
          });
          if (overlapTable) {
            const colIndex = col - overlapTable.getRange().startColumn;
            this._itemsCache.delete(overlapTable.getId() + colIndex);
          }
        });
      } else if (command.id === SetSheetTableFilterCommand.id) {
        const { unitId, tableId } = command.params;
        const table = this._tableManager.getTable(unitId, tableId);
        if (!table) {
          return;
        }
        const subUnitId = table.getSubunitId();
        const allSubTables = this._tableManager.getTablesBySubunitId(unitId, subUnitId);
        allSubTables.forEach((table2) => {
          const range = table2.getRange();
          for (let i = range.startColumn; i <= range.endColumn; i++) {
            this._itemsCache.delete(table2.getId() + i);
          }
        });
      }
    });
  }
  getTableFilterPanelInitProps(unitId, subUnitId, tableId, column) {
    const table = this._tableManager.getTable(unitId, tableId);
    const tableRange = table.getRange();
    const tableFilter = table.getTableFilterColumn(column - tableRange.startColumn);
    return {
      unitId,
      subUnitId,
      tableFilter,
      currentFilterBy: isConditionFilter(tableFilter) ? "condition" /* Condition */ : "items" /* Items */,
      tableId,
      columnIndex: column - tableRange.startColumn
    };
  }
  getTableFilterCheckedItems(unitId, tableId, columnIndex) {
    const table = this._tableManager.getTable(unitId, tableId);
    const checkedItems = [];
    if (table) {
      const filter2 = table.getTableFilterColumn(columnIndex);
      if (filter2 && isManualTableFilter(filter2)) {
        checkedItems.push(...filter2.values);
      }
    }
    return checkedItems;
  }
  setTableFilter(unitId, tableId, columnIndex, tableFilter) {
    const table = this._tableManager.getTable(unitId, tableId);
    if (!table) {
      return;
    }
    const setTableFilterParams = {
      unitId,
      tableId,
      column: columnIndex,
      tableFilter
    };
    this._commandService.executeCommand(SetSheetTableFilterCommand.id, setTableFilterParams);
  }
  getTableFilterItems(unitId, subUnitId, tableId, columnIndex) {
    var _a;
    if (this._itemsCache.has(tableId + columnIndex)) {
      return this._itemsCache.get(tableId + columnIndex) || { data: [], itemsCountMap: /* @__PURE__ */ new Map(), allItemsCount: 0 };
    }
    const table = this._tableManager.getTable(unitId, tableId);
    if (!table) {
      return { data: [], itemsCountMap: /* @__PURE__ */ new Map(), allItemsCount: 0 };
    }
    const tableRange = table.getTableFilterRange();
    const { startRow, endRow, startColumn } = tableRange;
    const column = startColumn + columnIndex;
    const worksheet = (_a = this._univerInstanceService.getUnit(unitId)) == null ? void 0 : _a.getSheetBySheetId(subUnitId);
    if (!worksheet) {
      return { data: [], itemsCountMap: /* @__PURE__ */ new Map(), allItemsCount: 0 };
    }
    const data = [];
    const map2 = /* @__PURE__ */ new Map();
    let allItemsCount = 0;
    for (let row = startRow; row <= endRow; row++) {
      const isFiltered = worksheet.isRowFiltered(row);
      if (isFiltered) {
        continue;
      }
      let stringItem = this._sheetTableService.getCellValueWithConditionType(worksheet, row, column);
      if (stringItem === void 0) {
        stringItem = this._localeService.t("sheets-table.condition.empty");
      }
      if (!map2.has(stringItem)) {
        data.push({
          title: stringItem,
          key: `${column}_${row}`,
          leaf: true
        });
      }
      allItemsCount++;
      map2.set(stringItem, (map2.get(stringItem) || 0) + 1);
    }
    this._itemsCache.set(tableId + columnIndex, { data, itemsCountMap: map2, allItemsCount });
    return { data, itemsCountMap: map2, allItemsCount };
  }
};
SheetsTableUiService = __decorateClass([
  __decorateParam(0, Inject(TableManager)),
  __decorateParam(1, Inject(SheetTableService)),
  __decorateParam(2, Inject(IUniverInstanceService)),
  __decorateParam(3, ICommandService),
  __decorateParam(4, Inject(LocaleService))
], SheetsTableUiService);

// ../packages/sheets-table-ui/src/views/components/SheetTableConditionPanel.tsx
var import_react2 = __toESM(require_react());

// ../packages/sheets-table-ui/src/views/components/util.ts
function getCascaderListOptions(injector) {
  const localeService = injector.get(LocaleService);
  const t = localeService.t;
  return [
    {
      value: "string" /* String */,
      label: t(`sheets-table.condition.${"string" /* String */}`),
      children: [
        {
          value: "equal" /* Equal */,
          label: t(`sheets-table.string.compare.${"equal" /* Equal */}`)
        },
        {
          value: "notEqual" /* NotEqual */,
          label: t(`sheets-table.string.compare.${"notEqual" /* NotEqual */}`)
        },
        {
          value: "contains" /* Contains */,
          label: t(`sheets-table.string.compare.${"contains" /* Contains */}`)
        },
        {
          value: "notContains" /* NotContains */,
          label: t(`sheets-table.string.compare.${"notContains" /* NotContains */}`)
        },
        {
          value: "startsWith" /* StartsWith */,
          label: t(`sheets-table.string.compare.${"startsWith" /* StartsWith */}`)
        },
        {
          value: "endsWith" /* EndsWith */,
          label: t(`sheets-table.string.compare.${"endsWith" /* EndsWith */}`)
        }
      ]
    },
    {
      value: "number" /* Number */,
      label: t(`sheets-table.condition.${"number" /* Number */}`),
      children: [
        {
          value: "equal" /* Equal */,
          label: t(`sheets-table.number.compare.${"equal" /* Equal */}`)
        },
        {
          value: "notEqual" /* NotEqual */,
          label: t(`sheets-table.number.compare.${"notEqual" /* NotEqual */}`)
        },
        {
          value: "greaterThan" /* GreaterThan */,
          label: t(`sheets-table.number.compare.${"greaterThan" /* GreaterThan */}`)
        },
        {
          value: "greaterThanOrEqual" /* GreaterThanOrEqual */,
          label: t(`sheets-table.number.compare.${"greaterThanOrEqual" /* GreaterThanOrEqual */}`)
        },
        {
          value: "lessThan" /* LessThan */,
          label: t(`sheets-table.number.compare.${"lessThan" /* LessThan */}`)
        },
        {
          value: "lessThanOrEqual" /* LessThanOrEqual */,
          label: t(`sheets-table.number.compare.${"lessThanOrEqual" /* LessThanOrEqual */}`)
        },
        {
          value: "between" /* Between */,
          label: t(`sheets-table.number.compare.${"between" /* Between */}`)
        },
        {
          value: "notBetween" /* NotBetween */,
          label: t(`sheets-table.number.compare.${"notBetween" /* NotBetween */}`)
        },
        {
          value: "above" /* Above */,
          label: t(`sheets-table.number.compare.${"above" /* Above */}`)
        },
        {
          value: "below" /* Below */,
          label: t(`sheets-table.number.compare.${"below" /* Below */}`)
        }
        // {
        //     value: TableNumberCompareTypeEnum.TopN,
        //     label: t(`sheets-table.number.compare.${TableNumberCompareTypeEnum.TopN}`),
        // },
      ]
    },
    {
      value: "date" /* Date */,
      label: t(`sheets-table.condition.${"date" /* Date */}`),
      children: [
        {
          value: "equal" /* Equal */,
          label: t(`sheets-table.date.compare.${"equal" /* Equal */}`)
        },
        {
          value: "notEqual" /* NotEqual */,
          label: t(`sheets-table.date.compare.${"notEqual" /* NotEqual */}`)
        },
        {
          value: "after" /* After */,
          label: t(`sheets-table.date.compare.${"after" /* After */}`)
        },
        {
          value: "afterOrEqual" /* AfterOrEqual */,
          label: t(`sheets-table.date.compare.${"afterOrEqual" /* AfterOrEqual */}`)
        },
        {
          value: "before" /* Before */,
          label: t(`sheets-table.date.compare.${"before" /* Before */}`)
        },
        {
          value: "beforeOrEqual" /* BeforeOrEqual */,
          label: t(`sheets-table.date.compare.${"beforeOrEqual" /* BeforeOrEqual */}`)
        },
        {
          value: "between" /* Between */,
          label: t(`sheets-table.date.compare.${"between" /* Between */}`)
        },
        {
          value: "notBetween" /* NotBetween */,
          label: t(`sheets-table.date.compare.${"notBetween" /* NotBetween */}`)
        },
        {
          value: "today" /* Today */,
          label: t(`sheets-table.date.compare.${"today" /* Today */}`)
        },
        {
          value: "yesterday" /* Yesterday */,
          label: t(`sheets-table.date.compare.${"yesterday" /* Yesterday */}`)
        },
        {
          value: "tomorrow" /* Tomorrow */,
          label: t(`sheets-table.date.compare.${"tomorrow" /* Tomorrow */}`)
        },
        {
          value: "thisWeek" /* ThisWeek */,
          label: t(`sheets-table.date.compare.${"thisWeek" /* ThisWeek */}`)
        },
        {
          value: "lastWeek" /* LastWeek */,
          label: t(`sheets-table.date.compare.${"lastWeek" /* LastWeek */}`)
        },
        {
          value: "nextWeek" /* NextWeek */,
          label: t(`sheets-table.date.compare.${"nextWeek" /* NextWeek */}`)
        },
        {
          value: "thisMonth" /* ThisMonth */,
          label: t(`sheets-table.date.compare.${"thisMonth" /* ThisMonth */}`)
        },
        {
          value: "lastMonth" /* LastMonth */,
          label: t(`sheets-table.date.compare.${"lastMonth" /* LastMonth */}`)
        },
        {
          value: "nextMonth" /* NextMonth */,
          label: t(`sheets-table.date.compare.${"nextMonth" /* NextMonth */}`)
        },
        {
          value: "thisYear" /* ThisYear */,
          label: t(`sheets-table.date.compare.${"thisYear" /* ThisYear */}`)
        },
        {
          value: "lastYear" /* LastYear */,
          label: t(`sheets-table.date.compare.${"lastYear" /* LastYear */}`)
        },
        {
          value: "nextYear" /* NextYear */,
          label: t(`sheets-table.date.compare.${"nextYear" /* NextYear */}`)
        },
        {
          value: "quarter" /* Quarter */,
          label: t(`sheets-table.date.compare.${"quarter" /* Quarter */}`)
        },
        {
          value: "month" /* Month */,
          label: t(`sheets-table.date.compare.${"month" /* Month */}`)
        }
      ]
    }
  ];
}
function getConditionDateSelect(injector, dateType) {
  if (!dateType) {
    return [];
  }
  const localeService = injector.get(LocaleService);
  const t = localeService.t;
  switch (dateType) {
    case "quarter" /* Quarter */:
      return [
        {
          value: "q1" /* Q1 */,
          label: t(`sheets-table.date.compare.${"q1" /* Q1 */}`)
        },
        {
          value: "q2" /* Q2 */,
          label: t(`sheets-table.date.compare.${"q2" /* Q2 */}`)
        },
        {
          value: "q3" /* Q3 */,
          label: t(`sheets-table.date.compare.${"q3" /* Q3 */}`)
        },
        {
          value: "q4" /* Q4 */,
          label: t(`sheets-table.date.compare.${"q4" /* Q4 */}`)
        }
      ];
    case "month" /* Month */:
      return [
        {
          value: "m1" /* M1 */,
          label: t(`sheets-table.date.compare.${"m1" /* M1 */}`)
        },
        {
          value: "m2" /* M2 */,
          label: t(`sheets-table.date.compare.${"m2" /* M2 */}`)
        },
        {
          value: "m3" /* M3 */,
          label: t(`sheets-table.date.compare.${"m3" /* M3 */}`)
        },
        {
          value: "m4" /* M4 */,
          label: t(`sheets-table.date.compare.${"m4" /* M4 */}`)
        },
        {
          value: "m5" /* M5 */,
          label: t(`sheets-table.date.compare.${"m5" /* M5 */}`)
        },
        {
          value: "m6" /* M6 */,
          label: t(`sheets-table.date.compare.${"m6" /* M6 */}`)
        },
        {
          value: "m7" /* M7 */,
          label: t(`sheets-table.date.compare.${"m7" /* M7 */}`)
        },
        {
          value: "m8" /* M8 */,
          label: t(`sheets-table.date.compare.${"m8" /* M8 */}`)
        },
        {
          value: "m9" /* M9 */,
          label: t(`sheets-table.date.compare.${"m9" /* M9 */}`)
        },
        {
          value: "m10" /* M10 */,
          label: t(`sheets-table.date.compare.${"m10" /* M10 */}`)
        },
        {
          value: "m11" /* M11 */,
          label: t(`sheets-table.date.compare.${"m11" /* M11 */}`)
        },
        {
          value: "m12" /* M12 */,
          label: t(`sheets-table.date.compare.${"m12" /* M12 */}`)
        }
      ];
    default:
      return [];
  }
}
var datePickerSet = /* @__PURE__ */ new Set([
  "equal" /* Equal */,
  "notEqual" /* NotEqual */,
  "after" /* After */,
  "afterOrEqual" /* AfterOrEqual */,
  "before" /* Before */,
  "beforeOrEqual" /* BeforeOrEqual */
]);
function getSubComponentType(type, compare) {
  if (!compare) {
    return "None" /* None */;
  }
  if (type === "string" /* String */) {
    return "Input" /* Input */;
  } else if (type === "number" /* Number */) {
    if (compare === "between" /* Between */ || compare === "notBetween" /* NotBetween */) {
      return "Inputs" /* Inputs */;
    } else {
      return "Input" /* Input */;
    }
  } else if (type === "date" /* Date */) {
    if (compare === "between" /* Between */ || compare === "notBetween" /* NotBetween */) {
      return "DateRange" /* DateRange */;
    } else if (compare === "quarter" /* Quarter */ || compare === "month" /* Month */) {
      return "Select" /* Select */;
    } else if (datePickerSet.has(compare)) {
      return "DatePicker" /* DatePicker */;
    }
    return "None" /* None */;
  }
  return "None" /* None */;
}
function getInitConditionInfo(tableFilter) {
  if (!tableFilter || tableFilter.filterType !== "condition") {
    return {
      type: "string" /* String */,
      compareType: "equal" /* Equal */,
      info: {}
    };
  }
  const filterInfo = tableFilter.filterInfo;
  const { conditionType, compareType } = filterInfo;
  if (conditionType === "date" /* Date */) {
    if (compareType === "between" /* Between */ || compareType === "notBetween" /* NotBetween */) {
      let dateRange;
      if (Array.isArray(filterInfo.expectedValue)) {
        dateRange = filterInfo.expectedValue.map((i) => typeof i === "string" ? new Date(i) : i);
      }
      return {
        type: conditionType,
        compare: compareType,
        info: {
          dateRange
        }
      };
    } else if (compareType === "today" /* Today */ || compareType === "yesterday" /* Yesterday */ || compareType === "tomorrow" /* Tomorrow */ || compareType === "thisWeek" /* ThisWeek */ || compareType === "lastWeek" /* LastWeek */ || compareType === "nextWeek" /* NextWeek */ || compareType === "thisMonth" /* ThisMonth */ || compareType === "lastMonth" /* LastMonth */ || compareType === "nextMonth" /* NextMonth */ || compareType === "thisYear" /* ThisYear */ || compareType === "lastYear" /* LastYear */ || compareType === "nextYear" /* NextYear */) {
      return {
        type: conditionType,
        compare: compareType,
        info: {}
      };
    } else if (datePickerSet.has(compareType)) {
      let date;
      if (typeof filterInfo.expectedValue === "string") {
        date = new Date(filterInfo.expectedValue);
      } else if (Array.isArray(filterInfo.expectedValue)) {
        for (let i = 0; i < filterInfo.expectedValue.length; i++) {
          if (typeof filterInfo.expectedValue[i] === "string") {
            filterInfo.expectedValue[i] = new Date(filterInfo.expectedValue[i]);
          }
        }
      }
      return {
        type: conditionType,
        compare: compareType,
        info: {
          date
        }
      };
    } else {
      const quarter = /* @__PURE__ */ new Set(["q1" /* Q1 */, "q2" /* Q2 */, "q3" /* Q3 */, "q4" /* Q4 */]);
      if (quarter.has(compareType)) {
        return {
          type: conditionType,
          compare: "quarter" /* Quarter */,
          info: {
            dateSelect: filterInfo.compareType
          }
        };
      } else {
        return {
          type: conditionType,
          compare: "month" /* Month */,
          info: {
            dateSelect: filterInfo.compareType
          }
        };
      }
    }
  } else if (conditionType === "number" /* Number */) {
    if (compareType === "between" /* Between */ || compareType === "notBetween" /* NotBetween */) {
      return {
        type: conditionType,
        compare: compareType,
        info: {
          numberRange: filterInfo.expectedValue
        }
      };
    } else {
      return {
        type: conditionType,
        compare: compareType,
        info: {
          number: filterInfo.expectedValue
        }
      };
    }
  } else if (conditionType === "string" /* String */) {
    return {
      type: conditionType,
      compare: compareType,
      info: {
        string: filterInfo.expectedValue
      }
    };
  }
  return {
    type: "string" /* String */,
    compare: "equal" /* Equal */,
    info: {}
  };
}

// ../packages/sheets-table-ui/src/views/components/SheetTableConditionPanel.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var SheetTableConditionPanel = (props) => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const { conditionInfo, onChange } = props;
  const localeService = useDependency(LocaleService);
  const [conditionVisible, setConditionVisible] = (0, import_react2.useState)(false);
  const injector = useDependency(Injector);
  const cascaderOptions = getCascaderListOptions(injector);
  const handleConditionInfo = (info, type, compare) => {
    onChange({
      type: type != null ? type : conditionInfo.type,
      compare: compare != null ? compare : conditionInfo.compare,
      info
    });
  };
  const handleChange = (value) => {
    var _a2;
    const type = value[0];
    const compare = value[1];
    if (compare) {
      setConditionVisible(false);
    }
    ;
    const info = {};
    if (type === "date" /* Date */) {
      if (compare === "quarter" /* Quarter */) {
        info.dateSelect = "q1" /* Q1 */;
      } else if (compare === "month" /* Month */) {
        info.dateSelect = "m1" /* M1 */;
      } else if (datePickerSet.has(compare)) {
        info.date = /* @__PURE__ */ new Date();
      } else {
        info.dateRange = [/* @__PURE__ */ new Date(), /* @__PURE__ */ new Date()];
      }
    } else if (type === "number" /* Number */) {
      info.number = 0;
    } else if (type === "string" /* String */) {
      info.string = "";
    }
    handleConditionInfo(info, value[0], (_a2 = value[1]) != null ? _a2 : "equal" /* Equal */);
  };
  const subComponentType = getSubComponentType(conditionInfo.type, conditionInfo.compare);
  let selectType = "";
  if (conditionInfo.compare) {
    selectType = `${localeService.t(`sheets-table.condition.${conditionInfo.type}`)} - ${localeService.t(`sheets-table.${conditionInfo.type}.compare.${conditionInfo.compare}`)}`;
  } else {
    selectType = localeService.t(`sheets-table.condition.${conditionInfo.type}`);
  }
  const conditionDateOptions = getConditionDateSelect(injector, conditionInfo.compare);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      Dropdown,
      {
        align: "start",
        open: conditionVisible,
        onOpenChange: setConditionVisible,
        overlay: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          CascaderList,
          {
            value: [conditionInfo.type, conditionInfo.compare],
            options: cascaderOptions,
            onChange: handleChange,
            contentClassName: "univer-flex-1",
            wrapperClassName: "!univer-h-[150px]"
          }
        ),
        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          "div",
          {
            className: clsx(`univer-box-border univer-flex univer-h-8 univer-w-full univer-items-center univer-justify-between univer-rounded-md univer-bg-white univer-px-2 univer-text-sm univer-transition-colors univer-duration-200 hover:univer-border-primary-600 focus:univer-border-primary-600 focus:univer-outline-none focus:univer-ring-2 dark:!univer-bg-gray-700 dark:!univer-text-white`, borderClassName),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: selectType }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(MoreDownIcon, {})
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "univer-mt-3 univer-w-full", children: [
      subComponentType === "Input" /* Input */ && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: conditionInfo.type === "string" /* String */ ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        Input,
        {
          className: "univer-w-full",
          placeholder: "\u8BF7\u8F93\u5165",
          value: conditionInfo.info.string,
          onChange: (v) => handleConditionInfo({ string: v })
        }
      ) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        InputNumber,
        {
          className: "univer-h-7 univer-w-full",
          value: conditionInfo.info.number,
          controls: false,
          onChange: (v) => {
            if (v !== null) {
              handleConditionInfo({ number: v });
            }
          }
        }
      ) }),
      !!(subComponentType === "DatePicker" /* DatePicker */) && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { id: "univer-table-date-picker-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        DatePicker,
        {
          className: "univer-w-full",
          value: (_a = conditionInfo.info.date) != null ? _a : /* @__PURE__ */ new Date(),
          onValueChange: (v) => handleConditionInfo({ date: v })
        }
      ) }),
      !!(subComponentType === "DateRange" /* DateRange */) && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { id: "univer-table-date-range-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        DateRangePicker,
        {
          className: "univer-w-full",
          value: [(_c = (_b = conditionInfo.info.dateRange) == null ? void 0 : _b[0]) != null ? _c : /* @__PURE__ */ new Date(), (_e = (_d = conditionInfo.info.dateRange) == null ? void 0 : _d[1]) != null ? _e : /* @__PURE__ */ new Date()],
          onValueChange: (v) => {
            if (v) {
              handleConditionInfo({ dateRange: v });
            } else {
              handleConditionInfo({});
            }
          }
        }
      ) }),
      subComponentType === "Inputs" /* Inputs */ && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "univer-flex univer-items-center univer-gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          InputNumber,
          {
            className: "univer-w-full",
            value: (_f = conditionInfo.info.numberRange) == null ? void 0 : _f[0],
            onChange: (v) => {
              var _a2;
              if (v !== null) {
                handleConditionInfo({ numberRange: [v, (_a2 = conditionInfo.info.numberRange) == null ? void 0 : _a2[1]] });
              }
            },
            controls: false
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: " - " }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          InputNumber,
          {
            className: "univer-w-full",
            value: (_g = conditionInfo.info.numberRange) == null ? void 0 : _g[1],
            controls: false,
            onChange: (v) => {
              var _a2;
              if (v !== null) {
                handleConditionInfo({ numberRange: [(_a2 = conditionInfo.info.numberRange) == null ? void 0 : _a2[0], v] });
              }
            }
          }
        )
      ] }),
      !!(subComponentType === "Select" /* Select */) && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        Select,
        {
          className: "univer-w-full",
          value: (_h = conditionInfo.info.dateSelect) != null ? _h : conditionDateOptions[0].value,
          options: conditionDateOptions,
          onChange: (v) => handleConditionInfo({ dateSelect: v })
        }
      )
    ] })
  ] });
};

// ../packages/sheets-table-ui/src/views/components/SheetTableItemsFilterPanel.tsx
var import_react3 = __toESM(require_react());
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var getCheckedCount = (map2) => {
  let count = 0;
  map2.forEach((value) => {
    count += value;
  });
  return count;
};
function SheetTableItemsFilterPanel(props) {
  const { unitId, tableId, subUnitId, columnIndex, checkedItemSet, setCheckedItemSet, tableFilter } = props;
  const localeService = useDependency(LocaleService);
  const tableService = useDependency(SheetsTableUiService);
  const { data: items, itemsCountMap, allItemsCount } = tableService.getTableFilterItems(unitId, subUnitId, tableId, columnIndex);
  const [allChecked, setAllChecked] = (0, import_react3.useState)(tableFilter === void 0 ? true : checkedItemSet.size === itemsCountMap.size);
  const [checkedCount, setCheckedCount] = (0, import_react3.useState)(allChecked ? allItemsCount : getCheckedCount(itemsCountMap));
  const indeterminate = !allChecked && checkedItemSet.size > 0;
  const [searchText, setSearchText] = (0, import_react3.useState)("");
  const displayItems = (0, import_react3.useMemo)(() => {
    return searchText ? items.filter((item) => {
      return String(item.title).toLowerCase().includes(searchText.toLowerCase());
    }) : items;
  }, [searchText, items]);
  const onCheckAllToggled = (0, import_react3.useCallback)(() => {
    if (allChecked) {
      checkedItemSet.clear();
      setCheckedItemSet(new Set(checkedItemSet));
      setAllChecked(false);
    } else {
      displayItems.forEach((item) => {
        checkedItemSet.add(item.title);
      });
      setCheckedItemSet(new Set(checkedItemSet));
      setAllChecked(true);
    }
  }, [allChecked]);
  const onSearchValueChange = (0, import_react3.useCallback)((str) => {
    if (str === "") {
      setAllChecked(true);
      items.forEach((item) => {
        checkedItemSet.add(item.title);
      });
      setCheckedCount(allItemsCount);
    } else {
      checkedItemSet.clear();
      setAllChecked(false);
      setCheckedCount(0);
    }
    setSearchText(str);
  }, []);
  const onCheckItemToggled = (key) => {
    if (allChecked) {
      setAllChecked(false);
      const newSet = /* @__PURE__ */ new Set();
      for (const { title } of items) {
        if (key !== title) {
          newSet.add(title);
        }
      }
      setCheckedCount(allItemsCount - itemsCountMap.get(key));
      setCheckedItemSet(newSet);
    } else {
      if (checkedItemSet.has(key)) {
        checkedItemSet.delete(key);
        setCheckedCount(checkedCount - itemsCountMap.get(key));
      } else {
        checkedItemSet.add(key);
        setCheckedCount(checkedCount + itemsCountMap.get(key));
      }
      setCheckedItemSet(new Set(checkedItemSet));
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "univer-flex univer-h-full univer-flex-col", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Input, { autoFocus: true, value: searchText, placeholder: localeService.t("sheets-table.filter.search-placeholder"), onChange: onSearchValueChange }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "div",
      {
        className: clsx(`univer-mt-2 univer-box-border univer-flex univer-h-[180px] univer-max-h-[180px] univer-flex-grow univer-flex-col univer-overflow-hidden univer-rounded-md univer-py-1.5 univer-pl-2`, borderClassName),
        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "div",
          {
            className: clsx("univer-h-40 univer-overflow-y-auto univer-py-1 univer-pl-2", scrollbarClassName),
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "univer-h-full", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "univer-flex univer-items-center univer-px-2 univer-py-1", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                Checkbox,
                {
                  indeterminate,
                  disabled: items.length === 0,
                  checked: allChecked,
                  onChange: onCheckAllToggled,
                  children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "univer-flex univer-h-5 univer-flex-1 univer-items-center univer-text-sm", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "univer-inline-block univer-truncate", children: `${localeService.t("sheets-table.filter.select-all")}` }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "univer-ml univer-text-gray-400", children: `(${checkedCount}/${searchText ? displayItems.length : allItemsCount})` })
                  ] })
                }
              ) }),
              displayItems.map((item) => {
                return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "div",
                  {
                    className: "univer-flex univer-items-center univer-px-2 univer-py-1",
                    children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      Checkbox,
                      {
                        checked: allChecked || checkedItemSet.has(item.title),
                        onChange: () => {
                          onCheckItemToggled(item.title);
                        },
                        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "univer-flex univer-h-5 univer-flex-1 univer-text-sm", children: [
                          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "univer-inline-block univer-truncate", children: item.title }),
                          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "univer-ml-1 univer-text-gray-400", children: `(${itemsCountMap.get(item.title) || 0})` })
                        ] })
                      }
                    )
                  },
                  item.key
                );
              })
            ] })
          }
        )
      }
    )
  ] });
}

// ../packages/sheets-table-ui/src/views/components/SheetTableFilterPanel.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
function SheetTableFilterPanel() {
  var _a;
  const localeService = useDependency(LocaleService);
  const filterByItems = useFilterByOptions(localeService);
  const tableUiService = useDependency(SheetsTableUiService);
  const tableManager = useDependency(TableManager);
  const commandService = useDependency(ICommandService);
  const permissionService = useDependency(IPermissionService);
  const sheetsTableComponentController = useDependency(SheetsTableComponentController);
  const tableFilterPanelInfo = sheetsTableComponentController.getCurrentTableFilterInfo();
  const props = tableUiService.getTableFilterPanelInitProps(tableFilterPanelInfo.unitId, tableFilterPanelInfo.subUnitId, tableFilterPanelInfo.tableId, tableFilterPanelInfo.column);
  const { unitId, subUnitId, tableId, tableFilter, currentFilterBy, columnIndex } = props;
  const { data } = tableUiService.getTableFilterItems(unitId, subUnitId, tableId, columnIndex);
  const checkedItems = tableUiService.getTableFilterCheckedItems(unitId, tableId, columnIndex);
  const [checkedItemSet, setCheckedItemSet] = (0, import_react4.useState)(new Set(checkedItems));
  const [filterBy, setFilterBy] = (0, import_react4.useState)(currentFilterBy || "items" /* Items */);
  const [conditionInfo, setConditionInfo] = (0, import_react4.useState)(() => {
    const tableFilter2 = props.tableFilter;
    return getInitConditionInfo(tableFilter2);
  });
  const table = tableManager.getTable(unitId, tableId);
  if (!table) return null;
  const tableFilters = table.getTableFilters();
  const sortState = tableFilters.getSortState();
  const isAsc = sortState.columnIndex === columnIndex && sortState.sortState === "asc" /* Asc */;
  const isDesc = sortState.columnIndex === columnIndex && sortState.sortState === "desc" /* Desc */;
  const closeDialog = () => {
    sheetsTableComponentController.closeFilterPanel();
  };
  const onCancel = () => {
    closeDialog();
  };
  const applySort = (asc) => {
    const range = table.getTableFilterRange();
    commandService.executeCommand(SortRangeCommand.id, {
      unitId,
      subUnitId,
      range,
      orderRules: [{ colIndex: columnIndex + range.startColumn, type: asc ? "asc" /* ASC */ : "desc" /* DESC */ }],
      hasTitle: false
    });
    tableFilters.setSortState(columnIndex, asc ? "asc" /* Asc */ : "desc" /* Desc */);
    closeDialog();
  };
  const onApply = () => {
    if (filterBy === "items" /* Items */) {
      const filteredItems = [];
      for (const itemInfo of data) {
        if (checkedItemSet.has(itemInfo.title)) {
          filteredItems.push(itemInfo.title);
        }
      }
      const originFilter = table.getTableFilterColumn(columnIndex);
      if (originFilter) {
        const originValue = originFilter.values;
        if (originValue.join(",") === filteredItems.join(",")) {
          closeDialog();
          return;
        }
      } else if (filteredItems.length === 0) {
        closeDialog();
        return;
      }
      const tableFilter2 = {
        filterType: "manual" /* manual */,
        values: filteredItems
      };
      tableUiService.setTableFilter(unitId, tableId, columnIndex, tableFilter2);
    } else {
      let filterInfo;
      if (conditionInfo.compare === "quarter" /* Quarter */ || conditionInfo.compare === "month" /* Month */) {
        filterInfo = {
          conditionType: conditionInfo.type,
          compareType: Object.values(conditionInfo.info)[0]
        };
      } else {
        filterInfo = {
          conditionType: conditionInfo.type,
          compareType: conditionInfo.compare,
          expectedValue: Object.values(conditionInfo.info)[0]
        };
      }
      const tableFilter2 = {
        filterType: "condition" /* condition */,
        // @ts-ignore
        filterInfo
      };
      tableUiService.setTableFilter(unitId, tableId, columnIndex, tableFilter2);
    }
    closeDialog();
  };
  const onClearFilter = () => {
    tableUiService.setTableFilter(unitId, tableId, columnIndex, void 0);
    closeDialog();
  };
  const workbookEditableId = new WorkbookEditablePermission(unitId).id;
  const editable = (_a = permissionService.getPermissionPoint(workbookEditableId)) == null ? void 0 : _a.value;
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
    "div",
    {
      className: `univer-box-border univer-flex univer-min-w-[312px] univer-flex-col univer-rounded-[10px] univer-bg-white univer-p-4 univer-shadow-lg dark:!univer-border-gray-600 dark:!univer-bg-gray-700`,
      children: [
        editable && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "univer-mb-3 univer-flex", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(ButtonGroup, { className: "univer-mb-3 !univer-flex univer-w-full", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Button, { className: "univer-w-1/2", onClick: () => applySort(true), children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(AscendingIcon, { className: "univer-mr-1" }),
            localeService.t("sheets-sort.general.sort-asc")
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Button, { className: "univer-w-1/2", onClick: () => applySort(false), children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(DescendingIcon, { className: "univer-mr-1" }),
            localeService.t("sheets-sort.general.sort-desc")
          ] })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "univer-w-full", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          Segmented,
          {
            value: filterBy,
            items: filterByItems,
            onChange: (value) => setFilterBy(value)
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "univer-z-10 univer-h-60", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "univer-mt-3 univer-size-full", children: filterBy === "items" /* Items */ ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          SheetTableItemsFilterPanel,
          {
            tableFilter,
            unitId,
            subUnitId,
            tableId,
            columnIndex,
            checkedItemSet,
            setCheckedItemSet
          }
        ) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          SheetTableConditionPanel,
          {
            tableFilter,
            unitId,
            subUnitId,
            tableId,
            columnIndex,
            conditionInfo,
            onChange: setConditionInfo
          }
        ) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
          "div",
          {
            className: `univer-flex-wrap-nowrap univer-mt-4 univer-inline-flex univer-flex-shrink-0 univer-flex-grow-0 univer-justify-between univer-gap-6 univer-overflow-hidden`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                Button,
                {
                  disabled: tableFilter === void 0,
                  onClick: onClearFilter,
                  children: localeService.t("sheets-table.filter.clear-filter")
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Button, { className: "univer-mr-2", onClick: onCancel, children: localeService.t("sheets-table.filter.cancel") }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Button, { variant: "primary", onClick: onApply, children: localeService.t("sheets-table.filter.confirm") })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function useFilterByOptions(localeService) {
  const locale = localeService.getCurrentLocale();
  return (0, import_react4.useMemo)(() => [
    { label: localeService.t("sheets-table.filter.by-values"), value: "items" /* Items */ },
    { label: localeService.t("sheets-table.filter.by-conditions"), value: "condition" /* Condition */ }
  ], [locale, localeService]);
}

// ../packages/sheets-table-ui/src/controllers/sheet-table-component.controller.ts
var SheetsTableComponentController = class extends Disposable {
  constructor(_componentManager, _contextService, _sheetCanvasPopupService, _dialogService) {
    super();
    __publicField(this, "_componentManager", _componentManager);
    __publicField(this, "_contextService", _contextService);
    __publicField(this, "_sheetCanvasPopupService", _sheetCanvasPopupService);
    __publicField(this, "_dialogService", _dialogService);
    __publicField(this, "_popupDisposable");
    __publicField(this, "_currentTableFilterInfo", null);
    this._initComponents();
    this._initUIPopup();
  }
  setCurrentTableFilterInfo(info) {
    this._currentTableFilterInfo = info;
  }
  clearCurrentTableFilterInfo() {
    this._currentTableFilterInfo = null;
  }
  getCurrentTableFilterInfo() {
    return this._currentTableFilterInfo;
  }
  _initComponents() {
    [
      [SHEETS_TABLE_FILTER_PANEL_OPENED_KEY, SheetTableFilterPanel]
    ].forEach(([key, comp]) => {
      this.disposeWithMe(this._componentManager.register(key, comp));
    });
  }
  _initUIPopup() {
    this.disposeWithMe(this._contextService.subscribeContextValue$(SHEETS_TABLE_FILTER_PANEL_OPENED_KEY).pipe(startWith(void 0), distinctUntilChanged()).subscribe((open) => {
      if (open) {
        this._openFilterPopup();
      } else if (open === false) {
        this._closeFilterPopup();
      }
    }));
  }
  closeFilterPanel() {
    this._contextService.setContextValue(SHEETS_TABLE_FILTER_PANEL_OPENED_KEY, false);
  }
  _openFilterPopup() {
    const currentFilterModel = this._currentTableFilterInfo;
    if (!currentFilterModel) {
      throw new Error("[SheetsFilterUIController]: no filter model when opening filter popup!");
    }
    const { row: startRow, column: col } = currentFilterModel;
    this._popupDisposable = this._sheetCanvasPopupService.attachPopupToCell(startRow, col, {
      componentKey: SHEETS_TABLE_FILTER_PANEL_OPENED_KEY,
      direction: "horizontal",
      onClickOutside: () => {
        this._dialogService.close(UNIVER_SHEET_TABLE_FILTER_PANEL_ID);
        this._contextService.setContextValue(SHEETS_TABLE_FILTER_PANEL_OPENED_KEY, false);
      },
      offset: [5, 0],
      portal: true
    });
  }
  _closeFilterPopup() {
    var _a;
    (_a = this._popupDisposable) == null ? void 0 : _a.dispose();
    this._popupDisposable = null;
    this.clearCurrentTableFilterInfo();
  }
};
SheetsTableComponentController = __decorateClass([
  __decorateParam(0, Inject(ComponentManager)),
  __decorateParam(1, IContextService),
  __decorateParam(2, Inject(SheetCanvasPopManagerService)),
  __decorateParam(3, Inject(IDialogService))
], SheetsTableComponentController);

// ../packages/sheets-table-ui/src/commands/operations/open-table-filter-dialog.opration.ts
var OpenTableFilterPanelOperation = {
  type: 1 /* OPERATION */,
  id: "sheet.operation.open-table-filter-panel",
  async handler(accessor, params) {
    if (!params) {
      return false;
    }
    const { row, col, unitId, subUnitId, tableId } = params;
    const tableManager = accessor.get(TableManager);
    const contextService = accessor.get(IContextService);
    const sheetsTableComponentController = accessor.get(SheetsTableComponentController);
    const table = tableManager.getTable(unitId, tableId);
    if (!table) {
      return false;
    }
    if (!contextService.getContextValue(SHEETS_TABLE_FILTER_PANEL_OPENED_KEY)) {
      sheetsTableComponentController.setCurrentTableFilterInfo({ unitId, subUnitId, row, tableId, column: col });
      contextService.setContextValue(SHEETS_TABLE_FILTER_PANEL_OPENED_KEY, true);
    }
    return true;
  }
};

// ../packages/sheets-table-ui/src/commands/operations/open-table-selector.operation.ts
var OpenTableSelectorOperation = {
  type: 1 /* OPERATION */,
  id: "sheet.operation.open-table-selector",
  async handler(accessor) {
    var _a;
    const univerInstanceService = accessor.get(IUniverInstanceService);
    const commandService = accessor.get(ICommandService);
    const target = getSheetCommandTarget(univerInstanceService);
    if (!target) {
      return false;
    }
    const { unitId, subUnitId, worksheet } = target;
    const sheetsSelectionsService = accessor.get(SheetsSelectionsService);
    const lastSelection = sheetsSelectionsService.getCurrentLastSelection();
    const range = (_a = lastSelection == null ? void 0 : lastSelection.range) != null ? _a : { startRow: 0, endRow: 0, startColumn: 0, endColumn: 0 };
    const isSingleCell = isSingleCellSelection(lastSelection);
    const extendedRange = isSingleCell ? expandToContinuousRange(range, { up: true, left: true, right: true, down: true }, worksheet) : range;
    const rangeInfo = await openRangeSelector(accessor, unitId, subUnitId, extendedRange);
    if (!rangeInfo) {
      return false;
    }
    commandService.executeCommand(AddSheetTableCommand.id, { ...rangeInfo });
    return true;
  }
};
async function openRangeSelector(accessor, unitId, subUnitId, range, tableId) {
  const dialogService = accessor.get(IDialogService);
  const localeService = accessor.get(LocaleService);
  return new Promise((resolve) => {
    const dialogProps = {
      unitId,
      subUnitId,
      range,
      tableId,
      onConfirm: (info) => {
        resolve(info);
        dialogService.close(TABLE_SELECTOR_DIALOG);
      },
      onCancel: () => {
        resolve(null);
        dialogService.close(TABLE_SELECTOR_DIALOG);
      }
    };
    dialogService.open({
      id: TABLE_SELECTOR_DIALOG,
      title: { title: localeService.t("sheets-table.selectRange") },
      draggable: true,
      destroyOnClose: true,
      mask: false,
      maskClosable: false,
      children: {
        label: {
          name: TABLE_SELECTOR_DIALOG,
          props: dialogProps
        }
      },
      width: 300,
      onClose: () => {
        resolve(null);
        dialogService.close(TABLE_SELECTOR_DIALOG);
      }
    });
  });
}

// ../packages/sheets-table-ui/src/config/config.ts
var SHEETS_TABLE_UI_PLUGIN_CONFIG_KEY = "sheets-table-ui.config";
var configSymbol2 = Symbol(SHEETS_TABLE_UI_PLUGIN_CONFIG_KEY);
var defaultPluginConfig2 = {
  anchorHeight: 24,
  anchorBackgroundColor: "rgb(134,139,156)"
};

// ../packages/sheets-table-ui/src/views/components/SheetTableAnchor.tsx
var import_react5 = __toESM(require_react());

// ../packages/sheets-table-ui/src/controllers/sheet-table-theme-ui.controller.ts
var SheetTableThemeUIController = class extends Disposable {
  constructor(_commandService) {
    super();
    __publicField(this, "_commandService", _commandService);
    __publicField(this, "_refreshTable", new Subject());
    __publicField(this, "refreshTable$", this._refreshTable.asObservable());
    this._initListener();
  }
  _initListener() {
    this.disposeWithMe(
      this._commandService.onCommandExecuted((command) => {
        if (command.id === SetRangeThemeMutation.id) {
          const params = command.params;
          const { styleName } = params;
          if (styleName.startsWith(SHEET_TABLE_CUSTOM_THEME_PREFIX)) {
            this._refreshTable.next(Math.random());
          }
        }
      })
    );
  }
};
SheetTableThemeUIController = __decorateClass([
  __decorateParam(0, Inject(ICommandService))
], SheetTableThemeUIController);

// ../packages/sheets-table-ui/src/views/components/SheetTableAnchor.tsx
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var SheetTableAnchor = () => {
  var _a, _b;
  const [inputFocusId, setInputFocusId] = (0, import_react5.useState)("");
  const [inputValue, setInputValue] = (0, import_react5.useState)("");
  const sidebarService = useDependency(ISidebarService);
  const [openStates, setOpenStates] = (0, import_react5.useState)({});
  const injector = useDependency(Injector);
  const sheetTableAnchor = useDependency(SheetTableAnchorController);
  const anchorPosition = useObservable(sheetTableAnchor.anchorPosition$);
  const commandService = useDependency(ICommandService);
  const univerInstanceService = useDependency(IUniverInstanceService);
  const workbookPermissionService = useDependency(WorkbookPermissionService);
  const workbookPermissionInitState = useObservable(workbookPermissionService.unitPermissionInitStateChange$, false);
  const tableManager = useDependency(TableManager);
  const rangeThemeModel = useDependency(SheetRangeThemeModel);
  const sheetTableThemeUIController = useDependency(SheetTableThemeUIController);
  const tableRefresh$ = useObservable(sheetTableThemeUIController.refreshTable$);
  const localeService = useDependency(LocaleService);
  const sheetsSelectionService = useDependency(SheetsSelectionsService);
  const selections = useObservable(sheetsSelectionService.selectionChanged$, [{ range: cellToRange(0, 0), primary: null }]);
  const [, setRefresh] = (0, import_react5.useState)(Math.random());
  const configService = useDependency(IConfigService);
  const tableConfig = configService.getConfig(SHEETS_TABLE_UI_PLUGIN_CONFIG_KEY);
  const anchorHeight = (_a = tableConfig == null ? void 0 : tableConfig.anchorHeight) != null ? _a : 24;
  const anchorBackgroundColor = (_b = tableConfig == null ? void 0 : tableConfig.anchorBackgroundColor) != null ? _b : "rgb(53,91,183)";
  const updateOpenState = (tableId, isOpen) => {
    setOpenStates((prev) => ({
      ...prev,
      [tableId]: isOpen
    }));
  };
  (0, import_react5.useEffect)(() => {
    setRefresh(Math.random());
  }, [tableRefresh$]);
  if (!(anchorPosition == null ? void 0 : anchorPosition.length)) {
    return null;
  }
  const target = getSheetCommandTarget(univerInstanceService);
  if (!target) return null;
  const { unitId, subUnitId } = target;
  const handleChangeTableName = (tableId, name) => {
    var _a2;
    const originName = (_a2 = tableManager.getTableById(unitId, tableId)) == null ? void 0 : _a2.getDisplayName();
    if (originName === name) {
      setInputFocusId("");
      setInputValue("");
      return;
    }
    commandService.executeCommand(SetSheetTableCommand.id, {
      tableId,
      unitId,
      name
    });
    setInputValue("");
    setInputFocusId("");
  };
  const handleChangeRange = async (tableId) => {
    const table = tableManager.getTableById(unitId, tableId);
    if (!table) return;
    const range = table.getRange();
    const selection = await openRangeSelector(injector, unitId, subUnitId, range, tableId);
    if (!selection) return;
    commandService.executeCommand(SetSheetTableCommand.id, {
      tableId,
      unitId,
      updateRange: {
        newRange: selection.range
      }
    });
  };
  if (!workbookPermissionInitState) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "univer-absolute univer-z-50 univer-size-0", children: anchorPosition.map((item) => {
    var _a2, _b2, _c, _d, _e, _f, _g;
    const table = tableManager.getTableById(unitId, item.tableId);
    if (!table) return null;
    const rangeTheme = rangeThemeModel.getRangeThemeStyle(unitId, table.getTableStyleId());
    const headerBgColor = (_c = (_b2 = (_a2 = rangeTheme == null ? void 0 : rangeTheme.getHeaderRowStyle()) == null ? void 0 : _a2.bg) == null ? void 0 : _b2.rgb) != null ? _c : anchorBackgroundColor;
    const headerCl = (_f = (_e = (_d = rangeTheme == null ? void 0 : rangeTheme.getHeaderRowStyle()) == null ? void 0 : _d.cl) == null ? void 0 : _e.rgb) != null ? _f : "rgb(255, 255, 255)";
    const headerTextColor = headerCl;
    const tableRange = table.getRange();
    if (!(selections == null ? void 0 : selections.length)) {
      return null;
    }
    const lastSelection = selections[selections.length - 1];
    const lastRange = lastSelection.range;
    const overlap = Rectangle.intersects(tableRange, lastRange);
    const shouldHidden = !overlap && item.y <= 20;
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
      "div",
      {
        className: clsx(`univer-shadow-xs univer-absolute univer-box-border univer-cursor-pointer univer-items-center univer-rounded-xl univer-px-2`, borderClassName, {
          "univer-flex": !shouldHidden,
          "univer-hidden": shouldHidden
        }),
        style: {
          left: item.x,
          top: Math.max(item.y, 0),
          backgroundColor: headerBgColor,
          color: headerTextColor,
          borderWidth: "0.5px",
          height: anchorHeight ? `${anchorHeight}px` : "24px"
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "univer-text-nowrap", children: inputFocusId === item.tableId ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            Input,
            {
              className: "univer-h-[18px] univer-min-w-16 univer-rounded-none",
              inputClass: "univer-h-[18px] univer-w-[80px]",
              value: inputValue,
              onChange: (v) => setInputValue(v),
              onBlur: () => handleChangeTableName(item.tableId, inputValue),
              onKeyDown: (e) => {
                if (e.key === "Enter") {
                  handleChangeTableName(item.tableId, inputValue);
                }
              },
              autoFocus: inputFocusId === item.tableId
            }
          ) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "univer-h-[18px] univer-max-w-24 univer-truncate univer-text-sm", children: item.tableName }) }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            Dropdown,
            {
              align: "start",
              overlay: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "univer-py-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
                  "div",
                  {
                    className: `univer-flex univer-min-w-32 univer-cursor-pointer univer-items-center univer-gap-2 univer-px-2 univer-py-1 univer-text-sm hover:univer-bg-gray-200`,
                    onClick: () => {
                      setInputFocusId(item.tableId);
                      setInputValue(item.tableName);
                    },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(RenameIcon, {}),
                      localeService.t("sheets-table.rename")
                    ]
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                  "div",
                  {
                    className: "univer-my-1 univer-h-px univer-w-full univer-bg-gray-200"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
                  "div",
                  {
                    onClick: () => handleChangeRange(item.tableId),
                    className: `univer-flex univer-min-w-32 univer-cursor-pointer univer-items-center univer-gap-2 univer-px-2 univer-py-1 univer-text-sm hover:univer-bg-gray-200`,
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(GridOutlineIcon, {}),
                      localeService.t("sheets-table.updateRange")
                    ]
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
                  "div",
                  {
                    className: `univer-flex univer-min-w-32 univer-cursor-pointer univer-items-center univer-gap-2 univer-px-2 univer-py-1 univer-text-sm hover:univer-bg-gray-200`,
                    onClick: () => {
                      updateOpenState(item.tableId, false);
                      const table2 = tableManager.getTableById(unitId, item.tableId);
                      if (!table2) return;
                      const tableConfig2 = table2.getTableConfig();
                      const sidebarConfig = {
                        id: SHEET_TABLE_THEME_PANEL_ID,
                        header: { title: localeService.t("sheets-table.tableStyle") },
                        children: {
                          label: SHEET_TABLE_THEME_PANEL,
                          oldConfig: tableConfig2,
                          unitId,
                          subUnitId,
                          tableId: item.tableId
                        },
                        width: 330
                      };
                      sidebarService.open(sidebarConfig);
                    },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                        PaintBucketDoubleIcon,
                        {
                          extend: { colorChannel1: "rgb(53,91,183)" }
                        }
                      ),
                      localeService.t("sheets-table.setTheme")
                    ]
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                  "div",
                  {
                    className: "univer-my-1 univer-h-px univer-w-full univer-bg-gray-200"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
                  "div",
                  {
                    className: `univer-flex univer-min-w-32 univer-cursor-pointer univer-items-center univer-px-2 univer-py-1 univer-text-sm hover:univer-bg-gray-200`,
                    onClick: () => {
                      updateOpenState(item.tableId, false);
                      commandService.executeCommand(DeleteSheetTableCommand.id, {
                        tableId: item.tableId,
                        subUnitId,
                        unitId
                      });
                    },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(DeleteIcon, { className: "univer-mr-2" }),
                      localeService.t("sheets-table.removeTable")
                    ]
                  }
                )
              ] }),
              open: (_g = openStates[item.tableId]) != null ? _g : false,
              onOpenChange: (isOpen) => {
                updateOpenState(item.tableId, isOpen);
              },
              children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(MoreDownIcon, {}) })
            },
            item.tableId
          )
        ]
      },
      item.tableId
    );
  }) });
};

// ../packages/sheets-table-ui/src/controllers/sheet-table-anchor.controller.ts
var SheetTableAnchorController = class extends Disposable {
  constructor(_context, _injector, _sheetSkeletonManagerService, _renderManagerService, _commandService, _univerInstanceService, _uiPartsService, _tableManager, _scrollManagerService, _workbookPermissionService, _permissionService) {
    super();
    __publicField(this, "_context", _context);
    __publicField(this, "_injector", _injector);
    __publicField(this, "_sheetSkeletonManagerService", _sheetSkeletonManagerService);
    __publicField(this, "_renderManagerService", _renderManagerService);
    __publicField(this, "_commandService", _commandService);
    __publicField(this, "_univerInstanceService", _univerInstanceService);
    __publicField(this, "_uiPartsService", _uiPartsService);
    __publicField(this, "_tableManager", _tableManager);
    __publicField(this, "_scrollManagerService", _scrollManagerService);
    __publicField(this, "_workbookPermissionService", _workbookPermissionService);
    __publicField(this, "_permissionService", _permissionService);
    __publicField(this, "_anchorVisible$", new BehaviorSubject(true));
    __publicField(this, "_timer");
    __publicField(this, "_anchorPosition$", new BehaviorSubject([]));
    __publicField(this, "anchorPosition$", this._anchorPosition$.asObservable());
    this._initUI();
    this._initListener();
    this._initTableAnchor();
  }
  _initUI() {
    this.disposeWithMe(
      this._uiPartsService.registerComponent("content" /* CONTENT */, () => connectInjector(SheetTableAnchor, this._injector))
    );
  }
  _initListener() {
    this.disposeWithMe(
      this._commandService.onCommandExecuted((command) => {
        if (command.id === SetZoomRatioOperation.id || command.id === SetScrollOperation.id) {
          this._anchorVisible$.next(false);
          if (this._timer) {
            clearTimeout(this._timer);
          }
          this._timer = setTimeout(() => {
            this._anchorVisible$.next(true);
          }, 300);
        }
      })
    );
  }
  _initTableAnchor() {
    this.disposeWithMe(
      merge(
        this._context.unit.activeSheet$,
        this._sheetSkeletonManagerService.currentSkeleton$,
        this._scrollManagerService.validViewportScrollInfo$,
        this._tableManager.tableAdd$,
        this._tableManager.tableDelete$,
        this._tableManager.tableNameChanged$,
        this._tableManager.tableRangeChanged$,
        this._tableManager.tableThemeChanged$,
        this._workbookPermissionService.unitPermissionInitStateChange$.pipe(filter((v) => v)),
        this._permissionService.permissionPointUpdate$.pipe(debounceTime(300)),
        this._anchorVisible$
      ).subscribe(() => {
        var _a;
        const isVisible = this._anchorVisible$.getValue();
        if (!isVisible) {
          this._anchorPosition$.next([]);
          return;
        }
        const workbook = this._context.unit;
        const worksheet = workbook.getActiveSheet();
        const subUnitId = worksheet == null ? void 0 : worksheet.getSheetId();
        const tables = this._tableManager.getTableList(this._context.unitId).filter((table) => {
          return table.subUnitId === subUnitId;
        });
        const renderUnit = this._renderManagerService.getRenderById(this._context.unitId);
        if (!renderUnit) {
          this._anchorPosition$.next([]);
          return;
        }
        const workbookEditPermission = (_a = this._permissionService.getPermissionPoint(new WorkbookEditablePermission(workbook.getUnitId()).id)) == null ? void 0 : _a.value;
        if (!workbookEditPermission) {
          this._anchorPosition$.next([]);
          return;
        }
        const tableInfos = tables.reduce((acc, table) => {
          const { startRow, startColumn } = table.range;
          const sheetSkeletonManagerService = renderUnit.with(SheetSkeletonManagerService);
          const sheetObject = getSheetObject(this._univerInstanceService, this._renderManagerService);
          if (!sheetObject) return acc;
          const { scene } = sheetObject;
          const viewport = scene.getViewport("viewMain" /* VIEW_MAIN */);
          if (!viewport) return acc;
          const scaleX = scene == null ? void 0 : scene.scaleX;
          const scaleY = scene == null ? void 0 : scene.scaleY;
          const scrollXY = scene == null ? void 0 : scene.getViewportScrollXY(viewport);
          if (!scaleX || !scene || !scaleY || !scrollXY) return acc;
          const skeleton = sheetSkeletonManagerService.getCurrentSkeleton();
          if (!skeleton) return acc;
          const position = skeleton.getNoMergeCellWithCoordByIndex(startRow, startColumn);
          const startX = convertTransformToOffsetX(position.startX, scaleX, scrollXY);
          const startY = convertTransformToOffsetY(position.startY, scaleY, scrollXY) - 25 - 4;
          if (startY >= -10 && startX >= 45) {
            acc.push({
              x: startX,
              y: startY,
              tableId: table.id,
              tableName: table.name
            });
          }
          return acc;
        }, []);
        this._anchorPosition$.next(tableInfos);
      })
    );
  }
};
SheetTableAnchorController = __decorateClass([
  __decorateParam(1, Inject(Injector)),
  __decorateParam(2, Inject(SheetSkeletonManagerService)),
  __decorateParam(3, IRenderManagerService),
  __decorateParam(4, ICommandService),
  __decorateParam(5, IUniverInstanceService),
  __decorateParam(6, IUIPartsService),
  __decorateParam(7, Inject(TableManager)),
  __decorateParam(8, Inject(SheetScrollManagerService)),
  __decorateParam(9, Inject(WorkbookPermissionService)),
  __decorateParam(10, Inject(IPermissionService))
], SheetTableAnchorController);

// ../packages/sheets-table-ui/src/views/widgets/drawings.ts
var BUTTON_VIEWPORT = 16;
var PIVOT_BUTTON_EMPTY = new Path2D("M3.30363 3C2.79117 3 2.51457 3.60097 2.84788 3.99024L6.8 8.60593V12.5662C6.8 12.7184 6.8864 12.8575 7.02289 12.9249L8.76717 13.7863C8.96655 13.8847 9.2 13.7396 9.2 13.5173V8.60593L13.1521 3.99024C13.4854 3.60097 13.2088 3 12.6964 3H3.30363Z");
var TableButton = class {
  static drawNoSetting(ctx, size, fgColor, bgColor) {
    ctx.save();
    Rect.drawWith(ctx, {
      radius: 2,
      width: BUTTON_VIEWPORT,
      height: BUTTON_VIEWPORT,
      fill: bgColor
    });
    ctx.lineCap = "square";
    ctx.strokeStyle = fgColor;
    ctx.scale(size / BUTTON_VIEWPORT, size / BUTTON_VIEWPORT);
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.lineCap = "round";
    ctx.moveTo(3, 4);
    ctx.lineTo(13, 4);
    ctx.moveTo(4.5, 8);
    ctx.lineTo(11.5, 8);
    ctx.moveTo(6, 12);
    ctx.lineTo(10, 12);
    ctx.stroke();
    ctx.restore();
  }
  static drawIconByPath(ctx, pathData, fgColor, bgColor) {
    ctx.save();
    ctx.strokeStyle = fgColor;
    ctx.fillStyle = bgColor;
    Rect.drawWith(ctx, {
      radius: 2,
      width: BUTTON_VIEWPORT,
      height: BUTTON_VIEWPORT,
      fill: bgColor
    });
    pathData.forEach((d) => {
      const path = new Path2D(d);
      ctx.fillStyle = fgColor;
      ctx.fill(path, "evenodd");
    });
    ctx.restore();
  }
};

// ../packages/sheets-table-ui/src/views/widgets/icons.ts
var filterPartial = [
  "M3.30363 3C2.79117 3 2.51457 3.60097 2.84788 3.99024L6.8 8.60593V12.5662C6.8 12.7184 6.8864 12.8575 7.02289 12.9249L8.76717 13.7863C8.96655 13.8847 9.2 13.7396 9.2 13.5173V8.60593L13.1521 3.99024C13.4854 3.60097 13.2088 3 12.6964 3H3.30363Z"
];
var filteredSortAsc = [
  "M12.4008 13.1831C12.6907 13.1831 12.9258 12.9481 12.9258 12.6581V4.60873L14.013 5.69597C14.218 5.901 14.5505 5.901 14.7555 5.69597C14.9605 5.49094 14.9605 5.15853 14.7555 4.95351L12.7721 2.97017C12.5671 2.76515 12.2347 2.76515 12.0297 2.97017L10.0463 4.95351C9.84132 5.15853 9.84132 5.49094 10.0463 5.69597C10.2514 5.901 10.5838 5.901 10.7888 5.69597L11.8758 4.60901V12.6581C11.8758 12.9481 12.1108 13.1831 12.4008 13.1831Z",
  "M1.28069 4.85447C0.842195 4.33439 1.21191 3.5391 1.89218 3.5391H8.59333C9.2736 3.5391 9.64331 4.33439 9.20482 4.85447L6.51052 8.0501V11.6601C6.51052 12.2245 5.94174 12.6114 5.41683 12.404L4.48092 12.0343C4.1756 11.9136 3.97498 11.6187 3.97498 11.2904V8.0501L1.28069 4.85447Z"
];
var filteredSortDesc = [
  "M12.4008 2.81641C12.6907 2.81641 12.9258 3.05146 12.9258 3.34141V11.3908L14.013 10.3036C14.218 10.0986 14.5505 10.0986 14.7555 10.3036C14.9605 10.5086 14.9605 10.841 14.7555 11.046L12.7721 13.0294C12.5671 13.2344 12.2347 13.2344 12.0297 13.0294L10.0463 11.046C9.84132 10.841 9.84132 10.5086 10.0463 10.3036C10.2514 10.0986 10.5838 10.0986 10.7888 10.3036L11.8758 11.3905V3.34141C11.8758 3.05146 12.1108 2.81641 12.4008 2.81641Z",
  "M1.28069 4.85444C0.842195 4.33435 1.21191 3.53906 1.89218 3.53906H8.59333C9.2736 3.53906 9.64331 4.33435 9.20482 4.85443L6.51052 8.05006V11.6601C6.51052 12.2245 5.94174 12.6113 5.41683 12.404L4.48092 12.0342C4.1756 11.9136 3.97498 11.6186 3.97498 11.2903V8.05006L1.28069 4.85444Z"
];
var filterNoneSortAsc = [
  "M11.9003 13.7046C11.9003 13.9969 11.6633 14.2339 11.371 14.2339C11.0787 14.2339 10.8417 13.9969 10.8417 13.7046V3.57272L9.74577 4.66862C9.53906 4.87534 9.20391 4.87534 8.9972 4.66862C8.79048 4.46191 8.79048 4.12676 8.9972 3.92005L10.9969 1.92039C11.2036 1.71368 11.5387 1.71368 11.7454 1.92039L13.7451 3.92005C13.9518 4.12676 13.9518 4.46191 13.7451 4.66862C13.5384 4.87534 13.2032 4.87534 12.9965 4.66862L11.9003 3.57243V13.7046Z",
  "M2.69779 10.0113C2.40546 10.0113 2.16847 9.77429 2.16847 9.48196C2.16847 9.18962 2.40546 8.95264 2.69779 8.95264H6.67804C6.89213 8.95264 7.08514 9.0816 7.16707 9.2794C7.249 9.47719 7.20371 9.70486 7.05233 9.85624L3.97569 12.9329H6.67804C6.97038 12.9329 7.20736 13.1699 7.20736 13.4622C7.20736 13.7545 6.97038 13.9915 6.67804 13.9915H2.69779C2.4837 13.9915 2.29069 13.8626 2.20876 13.6648C2.12684 13.467 2.17212 13.2393 2.32351 13.0879L5.40015 10.0113H2.69779Z",
  "M5.51638 2.58693C5.23363 1.81542 4.14248 1.81543 3.85973 2.58693L2.13245 7.29995C2.03185 7.57443 2.17281 7.87849 2.4473 7.97909C2.72178 8.07969 3.02584 7.93872 3.12644 7.66424L3.64346 6.25351L3.64504 6.25351H5.73266L6.24968 7.66424C6.35027 7.93872 6.65433 8.07969 6.92882 7.97909C7.2033 7.87849 7.34426 7.57443 7.24367 7.29995L5.51638 2.58693ZM5.34467 5.19487L4.68806 3.40325L4.03144 5.19487H5.34467Z"
];
var filterNoneSortDesc = [
  "M11.9003 2.29495C11.9003 2.00261 11.6633 1.76562 11.371 1.76562C11.0787 1.76562 10.8417 2.00261 10.8417 2.29495V12.4268L9.74577 11.3309C9.53906 11.1242 9.20391 11.1242 8.9972 11.3309C8.79048 11.5376 8.79048 11.8727 8.9972 12.0795L10.9969 14.0791C11.2036 14.2858 11.5387 14.2858 11.7454 14.0791L13.7451 12.0795C13.9518 11.8727 13.9518 11.5376 13.7451 11.3309C13.5384 11.1242 13.2032 11.1242 12.9965 11.3309L11.9003 12.4271V2.29495Z",
  "M2.69792 10.0113C2.40558 10.0113 2.16859 9.77429 2.16859 9.48196C2.16859 9.18962 2.40558 8.95264 2.69792 8.95264H6.67816C6.89225 8.95264 7.08526 9.0816 7.16719 9.2794C7.24912 9.47719 7.20384 9.70486 7.05245 9.85624L3.97581 12.9329H6.67816C6.9705 12.9329 7.20749 13.1699 7.20749 13.4622C7.20749 13.7545 6.9705 13.9915 6.67816 13.9915H2.69792C2.48383 13.9915 2.29082 13.8626 2.20889 13.6648C2.12696 13.467 2.17224 13.2393 2.32363 13.0879L5.40027 10.0113H2.69792Z",
  "M5.5165 2.58693C5.23375 1.81542 4.1426 1.81543 3.85985 2.58693L2.13257 7.29995C2.03197 7.57443 2.17294 7.8785 2.44742 7.97909C2.7219 8.07969 3.02596 7.93872 3.12656 7.66424L3.64358 6.25351L3.64516 6.25351H5.73278L6.2498 7.66424C6.35039 7.93872 6.65446 8.07969 6.92894 7.97909C7.20342 7.8785 7.34438 7.57443 7.24379 7.29995L5.5165 2.58693ZM5.34479 5.19487L4.68818 3.40325L4.03156 5.19487H5.34479Z"
];

// ../packages/sheets-table-ui/src/views/widgets/table-filter-button.shape.ts
var FILTER_ICON_SIZE = 16;
var FILTER_ICON_PADDING = 1;
var SheetsTableFilterButtonShape = class extends Shape {
  constructor(key, props, _contextService, _commandService, _themeService) {
    super(key, props);
    __publicField(this, "_contextService", _contextService);
    __publicField(this, "_commandService", _commandService);
    __publicField(this, "_themeService", _themeService);
    __publicField(this, "_cellWidth", 0);
    __publicField(this, "_cellHeight", 0);
    __publicField(this, "_filterParams");
    __publicField(this, "_hovered", false);
    this.setShapeProps(props);
    this.onPointerDown$.subscribeEvent((evt) => this.onPointerDown(evt));
    this.onPointerEnter$.subscribeEvent(() => this.onPointerEnter());
    this.onPointerLeave$.subscribeEvent(() => this.onPointerLeave());
  }
  setShapeProps(props) {
    if (typeof props.cellHeight !== "undefined") {
      this._cellHeight = props.cellHeight;
    }
    if (typeof props.cellWidth !== "undefined") {
      this._cellWidth = props.cellWidth;
    }
    if (typeof props.filterParams !== "undefined") {
      this._filterParams = props.filterParams;
    }
    this.transformByState({
      width: props.width,
      height: props.height
    });
  }
  _draw(ctx) {
    const cellHeight = this._cellHeight;
    const cellWidth = this._cellWidth;
    const left = FILTER_ICON_SIZE - cellWidth;
    const top = FILTER_ICON_SIZE - cellHeight;
    ctx.save();
    const cellRegion = new Path2D();
    cellRegion.rect(left, top, cellWidth, cellHeight);
    ctx.clip(cellRegion);
    const { buttonState } = this._filterParams;
    const fgColor = this._themeService.getColorFromTheme("primary.600");
    const bgColor = this._hovered ? this._themeService.getColorFromTheme("gray.50") : "rgba(255, 255, 255, 1.0)";
    let icons;
    switch (buttonState) {
      case 1 /* FilteredSortNone */:
        icons = filterPartial;
        break;
      case 2 /* FilteredSortAsc */:
        icons = filteredSortAsc;
        break;
      case 3 /* FilteredSortDesc */:
        icons = filteredSortDesc;
        break;
      case 4 /* FilterNoneSortNone */:
        break;
      case 5 /* FilterNoneSortAsc */:
        icons = filterNoneSortAsc;
        break;
      case 6 /* FilterNoneSortDesc */:
        icons = filterNoneSortDesc;
        break;
    }
    if (icons) {
      TableButton.drawIconByPath(ctx, icons, fgColor, bgColor);
    } else if (buttonState !== void 0) {
      TableButton.drawNoSetting(ctx, FILTER_ICON_SIZE, fgColor, bgColor);
    }
    ctx.restore();
  }
  onPointerDown(evt) {
    if (evt.button === 2) {
      return;
    }
    const { row, col, unitId, subUnitId, tableId } = this._filterParams;
    const opened = this._contextService.getContextValue(SHEETS_TABLE_FILTER_PANEL_OPENED_KEY);
    if (opened || !this._commandService.hasCommand(OpenTableFilterPanelOperation.id)) {
      return;
    }
    setTimeout(() => {
      const cmdParams = {
        row,
        col,
        unitId,
        subUnitId,
        tableId
      };
      this._commandService.executeCommand(OpenTableFilterPanelOperation.id, cmdParams);
    }, 200);
  }
  onPointerEnter() {
    this._hovered = true;
    this.makeDirty(true);
  }
  onPointerLeave() {
    this._hovered = false;
    this.makeDirty(true);
  }
};
SheetsTableFilterButtonShape = __decorateClass([
  __decorateParam(2, IContextService),
  __decorateParam(3, ICommandService),
  __decorateParam(4, Inject(ThemeService))
], SheetsTableFilterButtonShape);

// ../packages/sheets-table-ui/src/controllers/sheet-table-filter-button-render.controller.ts
var SHEETS_FILTER_BUTTON_Z_INDEX = 5e3;
var computeIconTop = (startY, endY, cellHeight, verticalAlign) => {
  switch (verticalAlign) {
    case 1 /* TOP */:
      return startY + FILTER_ICON_PADDING;
    case 2 /* MIDDLE */:
      return startY + Math.max(0, (cellHeight - FILTER_ICON_SIZE) / 2);
    case 3 /* BOTTOM */:
    default:
      return endY - FILTER_ICON_SIZE - FILTER_ICON_PADDING;
  }
};
var SheetsTableFilterButtonRenderController = class extends RxDisposable {
  constructor(_context, _injector, _sheetSkeletonManagerService, _sheetInterceptorService, _tableManager, _commandService) {
    super();
    __publicField(this, "_context", _context);
    __publicField(this, "_injector", _injector);
    __publicField(this, "_sheetSkeletonManagerService", _sheetSkeletonManagerService);
    __publicField(this, "_sheetInterceptorService", _sheetInterceptorService);
    __publicField(this, "_tableManager", _tableManager);
    __publicField(this, "_commandService", _commandService);
    __publicField(this, "_buttonRenderDisposable", null);
    __publicField(this, "_tableFilterButtonShapes", []);
    this._initRenderer();
    this._initCommandExecuted();
  }
  dispose() {
    super.dispose();
    this._disposeRendering();
  }
  _initRenderer() {
    const tableManager = this._tableManager;
    this._sheetSkeletonManagerService.currentSkeleton$.pipe(
      switchMap((skeletonParams) => {
        var _a;
        if (!skeletonParams) return of(null);
        const { unit: workbook, unitId } = this._context;
        const worksheetId = ((_a = workbook.getActiveSheet()) == null ? void 0 : _a.getSheetId()) || "";
        const getParams = () => ({
          unitId,
          worksheetId,
          tableFilterRanges: this._tableManager.getSheetFilterRangeWithState(workbook.getUnitId(), worksheetId),
          skeleton: skeletonParams.skeleton
        });
        return merge(
          tableManager.tableAdd$,
          tableManager.tableNameChanged$,
          tableManager.tableRangeChanged$,
          tableManager.tableThemeChanged$,
          tableManager.tableDelete$,
          tableManager.tableFilterChanged$
        ).pipe(
          map(() => getParams()),
          startWith(getParams())
        );
      }),
      takeUntil(this.dispose$)
    ).subscribe((renderParams) => {
      this._disposeRendering();
      if (!renderParams || !renderParams.tableFilterRanges) {
        return;
      }
      this._renderButtons(renderParams);
    });
  }
  _initCommandExecuted() {
    this.disposeWithMe(
      this._commandService.onCommandExecuted((command) => {
        var _a;
        if (command.id !== SetVerticalTextAlignCommand.id) {
          return;
        }
        const { unit: workbook, unitId } = this._context;
        const worksheetId = ((_a = workbook.getActiveSheet()) == null ? void 0 : _a.getSheetId()) || "";
        const skeleton = this._sheetSkeletonManagerService.getCurrentSkeleton();
        if (!skeleton) {
          return;
        }
        const renderParams = {
          unitId,
          worksheetId,
          tableFilterRanges: this._tableManager.getSheetFilterRangeWithState(workbook.getUnitId(), worksheetId),
          skeleton
        };
        this._disposeRendering();
        if (!renderParams || !renderParams.tableFilterRanges) {
          return;
        }
        this._renderButtons(renderParams);
      })
    );
  }
  _renderButtons(params) {
    const { tableFilterRanges, unitId, skeleton, worksheetId } = params;
    const { unit: workbook, scene } = this._context;
    const worksheet = workbook.getSheetBySheetId(worksheetId);
    if (!worksheet) {
      return;
    }
    for (const { range, states, tableId } of tableFilterRanges) {
      const { startRow, startColumn, endColumn } = range;
      this._interceptCellContent(unitId, worksheetId, range);
      for (let col = startColumn; col <= endColumn; col++) {
        const key = `sheets-table-filter-button-${startRow}-${col}`;
        const startPosition = getCoordByCell(startRow, col, scene, skeleton);
        const cellStyle = worksheet.getCellStyle(startRow, col);
        const verticalAlign = (cellStyle == null ? void 0 : cellStyle.vt) || 3 /* BOTTOM */;
        const { startX, startY, endX, endY } = startPosition;
        const cellWidth = endX - startX;
        const cellHeight = endY - startY;
        if (cellHeight <= FILTER_ICON_PADDING || cellWidth <= FILTER_ICON_PADDING) {
          continue;
        }
        const state = states[col - startColumn];
        const iconStartX = endX - FILTER_ICON_SIZE - FILTER_ICON_PADDING;
        const iconStartY = computeIconTop(startY, endY, cellHeight, verticalAlign);
        const props = {
          left: iconStartX,
          top: iconStartY,
          height: FILTER_ICON_SIZE,
          width: FILTER_ICON_SIZE,
          zIndex: SHEETS_FILTER_BUTTON_Z_INDEX,
          cellHeight,
          cellWidth,
          filterParams: { unitId, subUnitId: worksheetId, row: startRow, col, buttonState: state, tableId }
        };
        const buttonShape = this._injector.createInstance(SheetsTableFilterButtonShape, key, props);
        this._tableFilterButtonShapes.push(buttonShape);
      }
    }
    scene.addObjects(this._tableFilterButtonShapes);
    scene.makeDirty();
  }
  _interceptCellContent(workbookId, worksheetId, range) {
    const { startRow, startColumn, endColumn } = range;
    this._buttonRenderDisposable = this._sheetInterceptorService.intercept(INTERCEPTOR_POINT.CELL_CONTENT, {
      effect: 1 /* Style */,
      handler: (cell, pos, next) => {
        const { row, col, unitId, subUnitId } = pos;
        if (unitId !== workbookId || subUnitId !== worksheetId || row !== startRow || col < startColumn || col > endColumn) {
          return next(cell);
        }
        if (!cell || cell === pos.rawData) {
          cell = { ...pos.rawData };
        }
        cell.fontRenderExtension = {
          ...cell == null ? void 0 : cell.fontRenderExtension,
          rightOffset: FILTER_ICON_SIZE
        };
        return next(cell);
      },
      priority: 10
    });
  }
  _disposeRendering() {
    var _a;
    this._tableFilterButtonShapes.forEach((s) => s.dispose());
    (_a = this._buttonRenderDisposable) == null ? void 0 : _a.dispose();
    this._buttonRenderDisposable = null;
    this._tableFilterButtonShapes = [];
  }
};
SheetsTableFilterButtonRenderController = __decorateClass([
  __decorateParam(1, Inject(Injector)),
  __decorateParam(2, Inject(SheetSkeletonManagerService)),
  __decorateParam(3, Inject(SheetInterceptorService)),
  __decorateParam(4, Inject(TableManager)),
  __decorateParam(5, ICommandService)
], SheetsTableFilterButtonRenderController);

// ../packages/sheets-table-ui/src/controllers/sheet-table-render.controller.ts
var SheetsTableRenderController = class extends RxDisposable {
  constructor(_context, _injector, _sheetSkeletonManagerService, _tableManager, _sheetTableThemeUIController) {
    super();
    __publicField(this, "_context", _context);
    __publicField(this, "_injector", _injector);
    __publicField(this, "_sheetSkeletonManagerService", _sheetSkeletonManagerService);
    __publicField(this, "_tableManager", _tableManager);
    __publicField(this, "_sheetTableThemeUIController", _sheetTableThemeUIController);
    this._initListener();
  }
  _dirtySkeleton() {
    var _a;
    (_a = this._context.mainComponent) == null ? void 0 : _a.makeDirty();
    const currentParam = this._sheetSkeletonManagerService.getCurrentParam();
    if (currentParam) {
      const param = { ...currentParam, dirty: true };
      this._sheetSkeletonManagerService.reCalculate(param);
    }
  }
  _initListener() {
    const tableManager = this._tableManager;
    const dirtySkeleton = this._dirtySkeleton.bind(this);
    this.disposeWithMe(
      merge(
        tableManager.tableAdd$,
        tableManager.tableDelete$,
        tableManager.tableNameChanged$,
        tableManager.tableRangeChanged$,
        tableManager.tableThemeChanged$,
        tableManager.tableFilterChanged$,
        tableManager.tableInitStatus$,
        this._sheetTableThemeUIController.refreshTable$
      ).subscribe(
        dirtySkeleton
      )
    );
  }
};
SheetsTableRenderController = __decorateClass([
  __decorateParam(1, Inject(Injector)),
  __decorateParam(2, Inject(SheetSkeletonManagerService)),
  __decorateParam(3, Inject(TableManager)),
  __decorateParam(4, Inject(SheetTableThemeUIController))
], SheetsTableRenderController);

// ../packages/sheets-table-ui/src/controllers/sheet-table-selection.controller.ts
var SheetTableSelectionController = class extends Disposable {
  constructor(_sheetInterceptorService, _univerInstanceService, _tableManager) {
    super();
    __publicField(this, "_sheetInterceptorService", _sheetInterceptorService);
    __publicField(this, "_univerInstanceService", _univerInstanceService);
    __publicField(this, "_tableManager", _tableManager);
    this._initSelectionChange();
  }
  _initSelectionChange() {
    this.disposeWithMe(
      this._sheetInterceptorService.interceptCommand({
        getMutations: (command) => {
          if (command.id === SelectAllCommand.id) {
            const target = getSheetCommandTarget(this._univerInstanceService);
            if (!target) {
              return { redos: [], undos: [] };
            }
            const params = command.params;
            const { range } = params;
            const { unitId, subUnitId, worksheet } = target;
            const subTables = this._tableManager.getTablesBySubunitId(unitId, subUnitId);
            const overlapTable = subTables.find((table) => {
              const tableRange = table.getRange();
              return Rectangle.contains(tableRange, range);
            });
            if (overlapTable) {
              const tableRange = overlapTable.getRange();
              const tableRangeWithoutHeader = {
                ...tableRange,
                startRow: tableRange.startRow + 1
              };
              if (Rectangle.equals(tableRange, range)) {
                return { undos: [], redos: [] };
              } else if (Rectangle.equals(tableRangeWithoutHeader, range)) {
                return {
                  undos: [],
                  redos: [
                    {
                      id: SetSelectionsOperation.id,
                      params: {
                        unitId,
                        subUnitId,
                        selections: [
                          {
                            range: tableRange,
                            primary: getPrimaryForRange(tableRange, worksheet)
                          }
                        ]
                      }
                    }
                  ]
                };
              } else {
                return {
                  undos: [],
                  redos: [
                    {
                      id: SetSelectionsOperation.id,
                      params: {
                        unitId,
                        subUnitId,
                        selections: [
                          {
                            range: tableRangeWithoutHeader,
                            primary: getPrimaryForRange(tableRangeWithoutHeader, worksheet)
                          }
                        ]
                      }
                    }
                  ]
                };
              }
            }
          }
          return { redos: [], undos: [] };
        }
      })
    );
  }
};
SheetTableSelectionController = __decorateClass([
  __decorateParam(0, Inject(SheetInterceptorService)),
  __decorateParam(1, Inject(IUniverInstanceService)),
  __decorateParam(2, Inject(TableManager))
], SheetTableSelectionController);

// ../packages/sheets-table-ui/src/views/components/SheetTableSelector.tsx
var import_react6 = __toESM(require_react());
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
var SheetTableSelector = (props) => {
  const { unitId, subUnitId, range, onCancel, onConfirm, tableId } = props;
  const tableManager = useDependency(TableManager);
  const [selectedRange, setSelectedRange] = (0, import_react6.useState)(range);
  const [rangeError, setRangeError] = (0, import_react6.useState)("");
  const localeService = useDependency(LocaleService);
  const univerInstanceService = useDependency(IUniverInstanceService);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      RangeSelector,
      {
        maxRangeCount: 1,
        unitId,
        subUnitId,
        initialValue: serializeRange(range),
        onChange: (_, text) => {
          const originValue = serializeRange(range);
          const newRange = deserializeRangeWithSheet(text).range;
          const target = getSheetCommandTarget(univerInstanceService, { unitId, subUnitId });
          if (!target) {
            return;
          }
          const worksheet = target.worksheet;
          const merges = worksheet.getMergeData();
          const hasOverlapWithMerge = merges.some((merge2) => {
            return Rectangle.intersects(newRange, merge2);
          });
          if (hasOverlapWithMerge) {
            setRangeError(localeService.t("sheets-table.tableRangeWithMergeError"));
            return;
          }
          const hasOverlapWithOtherTable = tableManager.getTablesBySubunitId(unitId, subUnitId).some((table) => {
            if (table.getId() === tableId) {
              return false;
            }
            const tableRange = table.getRange();
            return Rectangle.intersects(newRange, tableRange);
          });
          if (hasOverlapWithOtherTable) {
            setRangeError(localeService.t("sheets-table.tableRangeWithOtherTableError"));
            return;
          }
          const { startRow, endRow } = newRange;
          const isSingleRow = startRow === endRow;
          if (isSingleRow) {
            setRangeError(localeService.t("sheets-table.tableRangeSingleRowError"));
            return;
          }
          if (originValue === text) {
            return;
          }
          if (tableId) {
            const table = tableManager.getTableById(unitId, tableId);
            if (table) {
              const oldRange = table.getRange();
              if (Rectangle.intersects(newRange, oldRange) && oldRange.startRow === newRange.startRow) {
                setSelectedRange(newRange);
                setRangeError("");
                onConfirm({
                  unitId,
                  subUnitId,
                  range: newRange
                });
                return;
              } else {
                setRangeError(localeService.t("sheets-table.updateError"));
                return;
              }
            }
          }
          setSelectedRange(newRange);
          setRangeError("");
        },
        supportAcrossSheet: false
      }
    ),
    rangeError && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "univer-mt-1 univer-text-xs univer-text-red-500", children: rangeError }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "univer-mt-4 univer-flex univer-justify-end", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Button, { onClick: onCancel, children: localeService.t("sheets-table.cancel") }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        Button,
        {
          variant: "primary",
          onClick: () => {
            if (rangeError) {
              return;
            }
            onConfirm({
              unitId,
              subUnitId,
              range: selectedRange
            });
          },
          className: "univer-ml-2",
          children: localeService.t("sheets-table.confirm")
        }
      )
    ] })
  ] });
};

// ../packages/sheets-table-ui/src/views/components/SheetTableThemePanel.tsx
var import_react7 = __toESM(require_react());
var import_jsx_runtime7 = __toESM(require_jsx_runtime());
var SheetTableThemePanel = (props) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
  const { unitId, subUnitId, tableId } = props;
  const commandService = useDependency(ICommandService);
  const localeService = useDependency(LocaleService);
  const tableManager = useDependency(TableManager);
  const table = tableManager.getTableById(unitId, tableId);
  const rangeThemeModel = useDependency(SheetRangeThemeModel);
  const sheetTableThemeUIController = useDependency(SheetTableThemeUIController);
  const rangeThemeMapChanged = useObservable(rangeThemeModel.rangeThemeMapChange$);
  const tableRefresh = useObservable(sheetTableThemeUIController.refreshTable$);
  const errorService = useDependency(ErrorService);
  const [, setRefresh] = (0, import_react7.useState)(Math.random());
  const themeConfig = useObservable(tableManager.tableThemeChanged$, {
    theme: table == null ? void 0 : table.getTableStyleId(),
    oldTheme: table == null ? void 0 : table.getTableStyleId(),
    unitId,
    subUnitId,
    tableId
  });
  const defaultRangeThemes = rangeThemeModel.getRegisteredRangeThemes().filter((item) => item == null ? void 0 : item.startsWith(TABLE_DEFAULT_NAME_PREFIX));
  const customRangeThemes = rangeThemeModel.getALLRegisteredTheme(unitId).filter((item) => item == null ? void 0 : item.startsWith(TABLE_CUSTOM_NAME_PREFIX));
  const selectedTheme = table == null ? void 0 : table.getTableStyleId();
  const customSelected = customRangeThemes.find((item) => item === selectedTheme);
  const customStyleName = customSelected || customRangeThemes[0];
  const customStyle = rangeThemeModel.getCustomRangeThemeStyle(unitId, customStyleName);
  const headerBg = (_c = (_b = (_a = customStyle == null ? void 0 : customStyle.getHeaderRowStyle()) == null ? void 0 : _a.bg) == null ? void 0 : _b.rgb) != null ? _c : TABLE_DEFAULT_BG_COLOR;
  const firstRowBg = (_f = (_e = (_d = customStyle == null ? void 0 : customStyle.getFirstRowStyle()) == null ? void 0 : _d.bg) == null ? void 0 : _e.rgb) != null ? _f : TABLE_DEFAULT_BG_COLOR;
  const secondRowBg = (_i = (_h = (_g = customStyle == null ? void 0 : customStyle.getSecondRowStyle()) == null ? void 0 : _g.bg) == null ? void 0 : _h.rgb) != null ? _i : TABLE_DEFAULT_BG_COLOR;
  const lastRowBg = (_l = (_k = (_j = customStyle == null ? void 0 : customStyle.getLastRowStyle()) == null ? void 0 : _j.bg) == null ? void 0 : _k.rgb) != null ? _l : TABLE_DEFAULT_BG_COLOR;
  const [hoverCustomId, setHoverCustomId] = (0, import_react7.useState)(null);
  const handleThemeChange = (theme) => {
    commandService.executeCommand(SetSheetTableCommand.id, {
      unitId,
      tableId,
      theme
    });
  };
  const handleAddCustomTheme = () => {
    if (customRangeThemes.length >= 11) {
      errorService.emit(localeService.t("sheets-table.customTooMore"));
      return;
    }
    const lastCustomTheme = customRangeThemes[customRangeThemes.length - 1];
    let newThemeName = `${TABLE_CUSTOM_NAME_PREFIX}1`;
    if (lastCustomTheme) {
      const index = Number(lastCustomTheme.split("-")[2]);
      newThemeName = `${TABLE_CUSTOM_NAME_PREFIX}${index + 1}`;
    }
    const newTheme = new RangeThemeStyle(newThemeName, { ...customEmptyThemeWithBorderStyle });
    commandService.executeCommand(AddTableThemeCommand.id, {
      unitId,
      tableId,
      themeStyle: newTheme
    });
  };
  const setCustomTheme = (themeName, tableThemeStyle) => {
    commandService.executeCommand(SetRangeThemeMutation.id, {
      unitId,
      subUnitId,
      styleName: themeName,
      style: tableThemeStyle
    });
  };
  const removeCustomTheme = (themeName) => {
    commandService.executeCommand(RemoveTableThemeCommand.id, {
      unitId,
      tableId,
      themeName
    });
  };
  (0, import_react7.useEffect)(() => {
    setRefresh(Math.random());
  }, [rangeThemeMapChanged, tableRefresh]);
  if (!table) return null;
  const headerBgIsDark = new ColorKit(headerBg).isDark();
  const firstRowBgIsDark = new ColorKit(firstRowBg).isDark();
  const secondRowBgIsDark = new ColorKit(secondRowBg).isDark();
  const lastRowBgIsDark = new ColorKit(lastRowBg).isDark();
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h5", { children: localeService.t("sheets-table.defaultStyle") }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "univer-flex univer-gap-2", children: defaultRangeThemes.map((item) => {
      var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2;
      const rangeThemeItem = rangeThemeModel.getDefaultRangeThemeStyle(item);
      const headerRowBg = ((_b2 = (_a2 = rangeThemeItem == null ? void 0 : rangeThemeItem.getHeaderRowStyle()) == null ? void 0 : _a2.bg) == null ? void 0 : _b2.rgb) || TABLE_DEFAULT_BG_COLOR;
      const firstRowBg2 = ((_d2 = (_c2 = rangeThemeItem == null ? void 0 : rangeThemeItem.getFirstRowStyle()) == null ? void 0 : _c2.bg) == null ? void 0 : _d2.rgb) || TABLE_DEFAULT_BG_COLOR;
      const secondRowBg2 = ((_f2 = (_e2 = rangeThemeItem == null ? void 0 : rangeThemeItem.getSecondRowStyle()) == null ? void 0 : _e2.bg) == null ? void 0 : _f2.rgb) || TABLE_DEFAULT_BG_COLOR;
      const lastRowBg2 = ((_h2 = (_g2 = rangeThemeItem == null ? void 0 : rangeThemeItem.getLastRowStyle()) == null ? void 0 : _g2.bg) == null ? void 0 : _h2.rgb) || TABLE_DEFAULT_BG_COLOR;
      return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
        "div",
        {
          className: clsx(`univer-h-10 univer-w-8 univer-cursor-pointer univer-border univer-border-solid univer-border-gray-200 univer-p-px [&>div]:univer-box-border [&>div]:univer-h-2.5`, {
            "univer-border-blue-500": item === themeConfig.theme
          }),
          onClick: () => handleThemeChange(item),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { style: { background: headerRowBg, border: `${headerRowBg ? TABLE_BORDER_NONE : TABLE_BORDER_DEFAULT}` } }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { style: { background: firstRowBg2, border: `${firstRowBg2 ? TABLE_BORDER_NONE : TABLE_BORDER_DEFAULT}` } }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { style: { background: secondRowBg2, border: `${secondRowBg2 ? TABLE_BORDER_NONE : TABLE_BORDER_DEFAULT}` } }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { style: { background: lastRowBg2, border: `${lastRowBg2 ? TABLE_BORDER_NONE : TABLE_BORDER_DEFAULT}` } })
          ]
        },
        item
      );
    }) }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h5", { children: localeService.t("sheets-table.customStyle") }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: clsx("univer-w-full univer-rounded-sm", borderClassName), children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "univer-flex univer-flex-wrap univer-gap-2 univer-p-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          "div",
          {
            className: clsx(`univer-h-10 univer-w-8 univer-cursor-pointer univer-p-px univer-text-center univer-leading-10`, borderClassName),
            onClick: handleAddCustomTheme,
            children: "+"
          }
        ),
        customRangeThemes.map((item) => {
          var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2;
          const rangeThemeItem = rangeThemeModel.getCustomRangeThemeStyle(unitId, item);
          const headerRowBg = (_b2 = (_a2 = rangeThemeItem == null ? void 0 : rangeThemeItem.getHeaderRowStyle()) == null ? void 0 : _a2.bg) == null ? void 0 : _b2.rgb;
          const firstRowBg2 = (_d2 = (_c2 = rangeThemeItem == null ? void 0 : rangeThemeItem.getFirstRowStyle()) == null ? void 0 : _c2.bg) == null ? void 0 : _d2.rgb;
          const secondRowBg2 = (_f2 = (_e2 = rangeThemeItem == null ? void 0 : rangeThemeItem.getSecondRowStyle()) == null ? void 0 : _e2.bg) == null ? void 0 : _f2.rgb;
          const lastRowBg2 = (_h2 = (_g2 = rangeThemeItem == null ? void 0 : rangeThemeItem.getLastRowStyle()) == null ? void 0 : _g2.bg) == null ? void 0 : _h2.rgb;
          return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
            "div",
            {
              className: clsx(`univer-relative univer-h-10 univer-w-8 univer-cursor-pointer univer-border univer-border-solid univer-border-gray-200 univer-p-px`, {
                "univer-border-blue-500": item === themeConfig.theme
              }),
              onClick: () => handleThemeChange(item),
              onMouseEnter: () => setHoverCustomId(item),
              onMouseLeave: () => setHoverCustomId(null),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "univer-box-border univer-h-2.5", style: { background: headerRowBg != null ? headerRowBg : TABLE_BORDER_NONE, border: `${headerRowBg ? TABLE_BORDER_NONE : TABLE_BORDER_DEFAULT}` } }),
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "univer-box-border univer-h-2.5", style: { background: firstRowBg2 != null ? firstRowBg2 : TABLE_BORDER_NONE, border: `${firstRowBg2 ? TABLE_BORDER_NONE : TABLE_BORDER_DEFAULT}` } }),
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "univer-box-border univer-h-2.5", style: { background: secondRowBg2 != null ? secondRowBg2 : TABLE_BORDER_NONE, border: `${secondRowBg2 ? TABLE_BORDER_NONE : TABLE_BORDER_DEFAULT}` } }),
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "univer-box-border univer-h-2.5", style: { background: lastRowBg2 != null ? lastRowBg2 : TABLE_BORDER_NONE, border: `${lastRowBg2 ? TABLE_BORDER_NONE : TABLE_BORDER_DEFAULT}` } }),
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                  "div",
                  {
                    className: `univer-absolute univer-right-[-3px] univer-top-[-3px] univer-size-3 univer-rounded-md univer-bg-gray-200 univer-text-center univer-text-xs univer-leading-[10px]`,
                    style: { display: hoverCustomId === item ? "block" : "none" },
                    onClick: (e) => {
                      e.stopPropagation();
                      removeCustomTheme(item);
                    },
                    children: "x"
                  }
                )
              ]
            },
            item
          );
        })
      ] }),
      customSelected && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "univer-h-px univer-w-full univer-bg-gray-200" }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "univer-flex univer-flex-col univer-gap-2 univer-p-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "univer-flex univer-h-9 univer-gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
              "div",
              {
                className: clsx(`univer-box-border univer-h-full univer-w-52 univer-rounded-sm univer-text-center univer-leading-9`, borderClassName, {
                  "univer-text-white": headerBgIsDark,
                  "univer-text-gray-900": !headerBgIsDark
                }),
                style: {
                  background: headerBg
                },
                children: localeService.t("sheets-table.header")
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
              Dropdown,
              {
                overlay: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "univer-p-2", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                  ColorPicker,
                  {
                    value: headerBg,
                    onChange: (val) => {
                      const headerRowStyle = processStyleWithBorderStyle("headerRowStyle", {
                        bg: {
                          rgb: val
                        },
                        cl: {
                          rgb: new ColorKit(val).isDark() ? "#fff" : "#000"
                        }
                      });
                      setCustomTheme(table.getTableStyleId(), { headerRowStyle });
                    }
                  }
                ) }),
                children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
                  "div",
                  {
                    className: clsx(`univer-flex univer-cursor-pointer univer-items-center univer-gap-2 univer-rounded-sm univer-bg-white univer-p-1`, borderClassName),
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                        "div",
                        {
                          className: clsx("univer-size-4 univer-rounded-lg univer-bg-gray-400", borderClassName, {
                            "univer-text-white": headerBgIsDark,
                            "univer-text-gray-900": !headerBgIsDark
                          }),
                          style: {
                            background: headerBg
                          }
                        }
                      ),
                      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(DropdownIcon, { className: "univer-size-2" })
                    ]
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "univer-flex univer-h-9 univer-gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
              "div",
              {
                className: clsx(`univer-box-border univer-h-full univer-w-52 univer-rounded-sm univer-text-center univer-leading-9`, borderClassName, {
                  "univer-text-white": firstRowBgIsDark,
                  "univer-text-gray-900": !firstRowBgIsDark
                }),
                style: {
                  background: firstRowBg
                },
                children: localeService.t("sheets-table.firstLine")
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
              Dropdown,
              {
                overlay: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "univer-p-2", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                  ColorPicker,
                  {
                    value: firstRowBg,
                    onChange: (val) => {
                      setCustomTheme(table.getTableStyleId(), {
                        firstRowStyle: {
                          bg: {
                            rgb: val
                          },
                          cl: {
                            rgb: new ColorKit(val).isDark() ? "#fff" : "#000"
                          }
                        }
                      });
                    }
                  }
                ) }),
                children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
                  "div",
                  {
                    className: clsx(`univer-flex univer-cursor-pointer univer-items-center univer-gap-2 univer-rounded-sm univer-bg-white univer-p-1`, borderClassName),
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                        "div",
                        {
                          className: clsx("univer-size-4 univer-rounded-lg univer-bg-gray-400", borderClassName),
                          style: { background: firstRowBg }
                        }
                      ),
                      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(DropdownIcon, { className: "univer-size-2" })
                    ]
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "univer-flex univer-h-9 univer-gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
              "div",
              {
                className: clsx(`univer-box-border univer-h-full univer-w-52 univer-rounded-sm univer-text-center univer-leading-9`, borderClassName, {
                  "univer-text-white": secondRowBgIsDark,
                  "univer-text-gray-900": !secondRowBgIsDark
                }),
                style: {
                  background: secondRowBg
                },
                children: localeService.t("sheets-table.secondLine")
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
              Dropdown,
              {
                overlay: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "univer-p-2", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                  ColorPicker,
                  {
                    value: secondRowBg,
                    onChange: (val) => setCustomTheme(table.getTableStyleId(), {
                      secondRowStyle: {
                        bg: {
                          rgb: val
                        },
                        cl: {
                          rgb: new ColorKit(val).isDark() ? "#fff" : "#000"
                        }
                      }
                    })
                  }
                ) }),
                children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
                  "div",
                  {
                    className: clsx(`univer-flex univer-cursor-pointer univer-items-center univer-gap-2 univer-rounded-sm univer-bg-white univer-p-1`, borderClassName),
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                        "div",
                        {
                          className: clsx("univer-size-4 univer-rounded-lg univer-bg-gray-400", borderClassName),
                          style: { background: secondRowBg }
                        }
                      ),
                      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(DropdownIcon, { className: "univer-size-2" })
                    ]
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "univer-flex univer-h-9 univer-gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
              "div",
              {
                className: clsx(`univer-box-border univer-h-full univer-w-52 univer-rounded-sm univer-text-center univer-leading-9`, borderClassName, {
                  "univer-text-white": lastRowBgIsDark,
                  "univer-text-gray-900": !lastRowBgIsDark
                }),
                style: {
                  background: lastRowBg
                },
                children: localeService.t("sheets-table.footer")
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
              Dropdown,
              {
                overlay: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "univer-p-2", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                  ColorPicker,
                  {
                    value: lastRowBg,
                    onChange: (val) => {
                      const lastRowStyle = processStyleWithBorderStyle("lastRowStyle", {
                        bg: {
                          rgb: val
                        },
                        cl: {
                          rgb: new ColorKit(val).isDark() ? "#fff" : "#000"
                        }
                      });
                      setCustomTheme(table.getTableStyleId(), { lastRowStyle });
                    }
                  }
                ) }),
                children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
                  "div",
                  {
                    className: clsx(`univer-flex univer-cursor-pointer univer-items-center univer-gap-2 univer-rounded-sm univer-bg-white univer-p-1`, borderClassName),
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                        "div",
                        {
                          className: clsx("univer-size-4 univer-rounded-lg univer-bg-gray-400", borderClassName),
                          style: { background: lastRowBg }
                        }
                      ),
                      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(DropdownIcon, { className: "univer-size-2" })
                    ]
                  }
                )
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] });
};

// ../packages/sheets-table-ui/src/menu/menu.ts
var SHEET_TABLE_CONTEXT_INSERT_MENU_ID = "sheet.table.context-insert_menu-id";
var SHEET_TABLE_CONTEXT_REMOVE_MENU_ID = "sheet.table.context-remove_menu-id";
function sheetTableToolbarInsertMenuFactory(accessor) {
  return {
    id: OpenTableSelectorOperation.id,
    type: 0 /* BUTTON */,
    icon: TABLE_TOOLBAR_BUTTON,
    tooltip: "sheets-table.title",
    title: "sheets-table.title",
    hidden$: getMenuHiddenObservable(accessor, 2 /* UNIVER_SHEET */),
    disabled$: getCurrentRangeDisable$(accessor, {}, true)
  };
}
function SheetTableInsertContextMenuFactory(accessor) {
  return {
    id: SHEET_TABLE_CONTEXT_INSERT_MENU_ID,
    type: 3 /* SUBITEMS */,
    icon: "InsertDoubleIcon",
    title: "sheets-table.insert.main",
    hidden$: getSheetTableRowColOperationHidden$(accessor)
  };
}
function SheetTableRemoveContextMenuFactory(accessor) {
  return {
    id: SHEET_TABLE_CONTEXT_REMOVE_MENU_ID,
    type: 3 /* SUBITEMS */,
    icon: "ReduceDoubleIcon",
    title: "sheets-table.remove.main",
    hidden$: getSheetTableRowColOperationHidden$(accessor)
  };
}
function SheetTableInsertRowMenuFactory(accessor) {
  return {
    id: SheetTableInsertRowCommand.id,
    type: 0 /* BUTTON */,
    title: "sheets-table.insert.row",
    hidden$: getSheetTableHeaderOperationHidden$(accessor)
  };
}
function SheetTableInsertColMenuFactory(accessor) {
  return {
    id: SheetTableInsertColCommand.id,
    title: "sheets-table.insert.col",
    type: 0 /* BUTTON */
  };
}
function SheetTableRemoveRowMenuFactory(accessor) {
  return {
    id: SheetTableRemoveRowCommand.id,
    type: 0 /* BUTTON */,
    title: "sheets-table.remove.row",
    hidden$: getSheetTableHeaderOperationHidden$(accessor)
  };
}
function SheetTableRemoveColMenuFactory(accessor) {
  return {
    id: SheetTableRemoveColCommand.id,
    title: "sheets-table.remove.col",
    type: 0 /* BUTTON */
  };
}
function getSheetTableRowColOperationHidden$(accessor) {
  const sheetsSelectionsService = accessor.get(SheetsSelectionsService);
  const univerInstanceService = accessor.get(IUniverInstanceService);
  const workbook$ = univerInstanceService.getCurrentTypeOfUnit$(2 /* UNIVER_SHEET */);
  return workbook$.pipe(
    switchMap((workbook) => {
      if (!workbook) return of(true);
      return workbook.activeSheet$.pipe(
        switchMap((sheet) => {
          if (!sheet) return of(true);
          return sheetsSelectionsService.selectionMoveEnd$.pipe(
            switchMap((selections) => {
              if (!selections.length || selections.length > 1) return of(true);
              const selection = selections[0];
              const range = selection.range;
              const sheetsTableController = accessor.get(SheetsTableController);
              const isInTable = sheetsTableController.getContainerTableWithRange(workbook.getUnitId(), sheet.getSheetId(), range);
              return of(!isInTable);
            })
          );
        })
      );
    })
  );
}
function getSheetTableHeaderOperationHidden$(accessor) {
  const sheetsSelectionsService = accessor.get(SheetsSelectionsService);
  const univerInstanceService = accessor.get(IUniverInstanceService);
  const workbook$ = univerInstanceService.getCurrentTypeOfUnit$(2 /* UNIVER_SHEET */);
  return workbook$.pipe(
    switchMap((workbook) => {
      if (!workbook) return of(true);
      return workbook.activeSheet$.pipe(
        switchMap((sheet) => {
          if (!sheet) return of(true);
          return sheetsSelectionsService.selectionMoveEnd$.pipe(
            switchMap((selections) => {
              if (!selections.length || selections.length > 1) return of(true);
              const selection = selections[0];
              const range = selection.range;
              const sheetsTableController = accessor.get(SheetsTableController);
              const isInTable = sheetsTableController.getContainerTableWithRange(workbook.getUnitId(), sheet.getSheetId(), range);
              if (!isInTable) {
                return of(true);
              }
              const tableRange = isInTable.getRange();
              if (range.startRow === tableRange.startRow) {
                return of(true);
              }
              return of(false);
            })
          );
        })
      );
    })
  );
}

// ../packages/sheets-table-ui/src/menu/schema.ts
var menuSchema2 = {
  ["ribbon.data.organization" /* ORGANIZATION */]: {
    [OpenTableSelectorOperation.id]: {
      order: 0,
      menuItemFactory: sheetTableToolbarInsertMenuFactory
    }
  },
  ["contextMenu.mainArea" /* MAIN_AREA */]: {
    ["contextMenu.layout" /* LAYOUT */]: {
      [SHEET_TABLE_CONTEXT_INSERT_MENU_ID]: {
        order: 5,
        menuItemFactory: SheetTableInsertContextMenuFactory,
        [SheetTableInsertRowCommand.id]: {
          order: 1,
          menuItemFactory: SheetTableInsertRowMenuFactory
        },
        [SheetTableInsertColCommand.id]: {
          order: 2,
          menuItemFactory: SheetTableInsertColMenuFactory
        }
      },
      [SHEET_TABLE_CONTEXT_REMOVE_MENU_ID]: {
        order: 6,
        menuItemFactory: SheetTableRemoveContextMenuFactory,
        [SheetTableRemoveRowCommand.id]: {
          order: 1,
          menuItemFactory: SheetTableRemoveRowMenuFactory
        },
        [SheetTableRemoveColCommand.id]: {
          order: 2,
          menuItemFactory: SheetTableRemoveColMenuFactory
        }
      }
    }
  }
};

// ../packages/sheets-table-ui/src/menu/sheet-table-menu.controller.ts
var SheetTableMenuController = class extends Disposable {
  constructor(_componentManager, _menuManagerService) {
    super();
    __publicField(this, "_componentManager", _componentManager);
    __publicField(this, "_menuManagerService", _menuManagerService);
    this._initComponents();
    this._initMenu();
  }
  _initComponents() {
    [
      [TABLE_TOOLBAR_BUTTON, TableIcon],
      [TABLE_SELECTOR_DIALOG, SheetTableSelector],
      [SHEET_TABLE_THEME_PANEL, SheetTableThemePanel]
    ].forEach(([key, comp]) => {
      this.disposeWithMe(this._componentManager.register(key, comp));
    });
  }
  _initMenu() {
    this._menuManagerService.mergeMenu(menuSchema2);
  }
};
SheetTableMenuController = __decorateClass([
  __decorateParam(0, Inject(ComponentManager)),
  __decorateParam(1, Inject(IMenuManagerService))
], SheetTableMenuController);

// ../packages/sheets-table-ui/src/plugin.ts
var UniverSheetsTableUIPlugin = class extends Plugin {
  constructor(_config = defaultPluginConfig2, _injector, _commandService, _configService, _renderManagerService) {
    super();
    __publicField(this, "_config", _config);
    __publicField(this, "_injector", _injector);
    __publicField(this, "_commandService", _commandService);
    __publicField(this, "_configService", _configService);
    __publicField(this, "_renderManagerService", _renderManagerService);
    const { menu, ...rest } = merge_default(
      {},
      defaultPluginConfig2,
      this._config
    );
    if (menu) {
      this._configService.setConfig("menu", menu, { merge: true });
    }
    this._configService.setConfig(SHEETS_TABLE_UI_PLUGIN_CONFIG_KEY, rest);
    this._initRegisterCommand();
  }
  onStarting() {
    registerDependencies(this._injector, [
      [SheetsTableComponentController],
      [SheetsTableUiService],
      [SheetTableMenuController],
      [SheetTableThemeUIController],
      [SheetTableSelectionController]
    ]);
  }
  onReady() {
    touchDependencies(this._injector, [
      [SheetsTableComponentController],
      [SheetsTableUiService],
      [SheetTableMenuController],
      [SheetTableThemeUIController],
      [SheetTableSelectionController]
    ]);
  }
  onRendered() {
    this._registerRenderModules();
  }
  _registerRenderModules() {
    const renderDependencies = [
      [SheetsTableFilterButtonRenderController],
      [SheetsTableRenderController]
    ];
    if (this._config.hideAnchor !== true) {
      renderDependencies.push([SheetTableAnchorController]);
    }
    renderDependencies.forEach((m) => {
      this.disposeWithMe(this._renderManagerService.registerRenderModule(2 /* UNIVER_SHEET */, m));
    });
  }
  _initRegisterCommand() {
    [
      OpenTableFilterPanelOperation,
      OpenTableSelectorOperation
    ].forEach((m) => this._commandService.registerCommand(m));
  }
};
__publicField(UniverSheetsTableUIPlugin, "pluginName", PLUGIN_NAME);
__publicField(UniverSheetsTableUIPlugin, "packageName", package_default2.name);
__publicField(UniverSheetsTableUIPlugin, "version", package_default2.version);
__publicField(UniverSheetsTableUIPlugin, "type", 2 /* UNIVER_SHEET */);
UniverSheetsTableUIPlugin = __decorateClass([
  DependentOn(UniverSheetsTablePlugin),
  __decorateParam(1, Inject(Injector)),
  __decorateParam(2, Inject(ICommandService)),
  __decorateParam(3, IConfigService),
  __decorateParam(4, IRenderManagerService)
], UniverSheetsTableUIPlugin);

export {
  UniverSheetsNoteUIPlugin,
  UniverSheetsTableUIPlugin
};
