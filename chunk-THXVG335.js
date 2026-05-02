import {
  COMPONENT_IMAGE_POPUP_MENU,
  DrawingCommonPanel,
  DrawingRenderService,
  IDocDrawingService,
  ImageCropperObject,
  ImageResetSizeOperation,
  OpenImageCropOperation,
  UniverDocsDrawingPlugin,
  UniverDrawingUIPlugin
} from "./chunk-MLFBVVME.js";
import {
  DRAWING_IMAGE_ALLOW_IMAGE_LIST,
  DRAWING_IMAGE_ALLOW_SIZE,
  DRAWING_IMAGE_COUNT_LIMIT,
  DRAWING_IMAGE_HEIGHT_LIMIT,
  DRAWING_IMAGE_WIDTH_LIMIT,
  DocCanvasPopManagerService,
  DocPrintInterceptorService,
  DocSelectionManagerService,
  DocSelectionRenderService,
  DocSkeletonManagerService,
  IDrawingManagerService,
  IEditorService,
  NodePositionConvertToCursor,
  RichTextEditingMutation,
  SetDocZoomRatioOperation,
  TEXT_RANGE_LAYER_INDEX,
  UniverDrawingPlugin,
  docDrawingPositionToTransform,
  getAnchorBounding,
  getCustomBlockIdsInSelections,
  getDocObject,
  getDrawingShapeKeyByDrawingSearch,
  getImageSize,
  getOneTextSelectionRange,
  getRichTextEditPath
} from "./chunk-PPREH44U.js";
import {
  CanvasFloatDomService,
  Checkbox,
  ComponentManager,
  ILocalFileService,
  IMenuManagerService,
  IMessageService,
  IShortcutService,
  ISidebarService,
  InputNumber,
  PrintFloatDomSingle,
  Radio,
  RadioGroup,
  Select,
  UniverUIPlugin,
  clsx,
  connectInjector,
  getMenuHiddenObservable,
  render,
  require_jsx_runtime,
  require_react,
  unmount,
  useDependency
} from "./chunk-NW5FEDQC.js";
import {
  IRenderManagerService,
  Liquid,
  Rect,
  Vector2,
  getColor,
  getCurrentTypeOfRenderer
} from "./chunk-VYDPVHQH.js";
import {
  BehaviorSubject,
  BuildTextUtils,
  COLORS,
  DOCS_ZEN_EDITOR_UNIT_ID_KEY,
  DOC_DRAWING_PRINTING_COMPONENT_KEY,
  DependentOn,
  Disposable,
  DisposableCollection,
  FOCUSING_COMMON_DRAWINGS,
  FOCUSING_DOC,
  FOCUSING_UNIVER_EDITOR,
  ICommandService,
  IConfigService,
  IContextService,
  IImageIoService,
  IUniverInstanceService,
  Inject,
  Injector,
  JSONX,
  LifecycleService,
  LocaleService,
  MemoryCursor,
  Observable,
  Plugin,
  RedoCommand,
  RxDisposable,
  TextX,
  Tools,
  UndoCommand,
  debounceTime,
  filter,
  fromEventSubject,
  generateRandomId,
  isInternalEditorID,
  map,
  merge_default,
  of,
  switchMap,
  takeUntil,
  throttle,
  toDisposable
} from "./chunk-UI3TUZSE.js";
import {
  __decorateClass,
  __decorateParam,
  __publicField,
  __toESM
} from "./chunk-24OICD5T.js";

// ../packages/docs-drawing-ui/package.json
var package_default = {
  name: "@univerjs/docs-drawing-ui",
  version: "0.21.1",
  private: false,
  description: "",
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
    "@univerjs/docs": "workspace:*",
    "@univerjs/docs-drawing": "workspace:*",
    "@univerjs/docs-ui": "workspace:*",
    "@univerjs/drawing": "workspace:*",
    "@univerjs/drawing-ui": "workspace:*",
    "@univerjs/engine-render": "workspace:*",
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

// ../packages/docs-drawing-ui/src/config/config.ts
var DOCS_DRAWING_UI_PLUGIN_CONFIG_KEY = "docs-drawing-ui.config";
var configSymbol = Symbol(DOCS_DRAWING_UI_PLUGIN_CONFIG_KEY);
var defaultPluginConfig = {};

// ../packages/docs-drawing-ui/src/controllers/doc-drawing-notification.controller.ts
function getAddOrRemoveDrawings(actions) {
  var _a, _b, _c, _d;
  if (JSONX.isNoop(actions) || !Array.isArray(actions)) {
    return null;
  }
  const drawingsOp = actions.find((action) => Array.isArray(action) && (action == null ? void 0 : action[0]) === "drawings");
  if (drawingsOp == null || !Array.isArray(drawingsOp) || drawingsOp.length < 3) {
    return null;
  }
  if (typeof drawingsOp[1] === "string" && typeof drawingsOp[2] !== "object") {
    return null;
  }
  if (Array.isArray(drawingsOp[1]) && typeof drawingsOp[1][1] !== "object") {
    return null;
  }
  const drawings = [];
  if (Array.isArray(drawingsOp == null ? void 0 : drawingsOp[1])) {
    for (const op of drawingsOp) {
      if (Array.isArray(op)) {
        drawings.push({
          type: ((_a = op == null ? void 0 : op[1]) == null ? void 0 : _a.i) ? "add" : "remove",
          drawingId: op == null ? void 0 : op[0],
          drawing: (_b = op == null ? void 0 : op[1]) == null ? void 0 : _b.i
        });
      }
    }
  } else {
    drawings.push({
      type: ((_c = drawingsOp[2]) == null ? void 0 : _c.i) ? "add" : "remove",
      drawingId: drawingsOp[1],
      drawing: (_d = drawingsOp[2]) == null ? void 0 : _d.i
    });
  }
  return drawings;
}
function getReOrderedDrawings(actions) {
  if (!Array.isArray(actions) || actions.length < 3 || actions[0] !== "drawingsOrder") {
    return [];
  }
  const drawingIndexes = [];
  for (let i = 1; i < actions.length; i++) {
    const action = actions[i];
    if (Array.isArray(action) && typeof action[0] === "number" && typeof action[1] === "object") {
      drawingIndexes.push(action[0]);
    } else {
      drawingIndexes.length = 0;
      break;
    }
  }
  return drawingIndexes;
}
var DocDrawingAddRemoveController = class extends Disposable {
  constructor(_univerInstanceService, _commandService, _drawingManagerService, _docDrawingService, _renderManagerService) {
    super();
    __publicField(this, "_univerInstanceService", _univerInstanceService);
    __publicField(this, "_commandService", _commandService);
    __publicField(this, "_drawingManagerService", _drawingManagerService);
    __publicField(this, "_docDrawingService", _docDrawingService);
    __publicField(this, "_renderManagerService", _renderManagerService);
    this._initialize();
  }
  _initialize() {
    this._commandExecutedListener();
  }
  _commandExecutedListener() {
    this.disposeWithMe(
      this._commandService.beforeCommandExecuted((command) => {
        if (command.id !== RichTextEditingMutation.id) {
          return;
        }
        const params = command.params;
        const { unitId, actions } = params;
        const addOrRemoveDrawings = getAddOrRemoveDrawings(actions);
        if (addOrRemoveDrawings != null) {
          for (const { type, drawingId, drawing } of addOrRemoveDrawings) {
            if (type === "add") {
              this._addDrawings(unitId, [drawing]);
            } else {
              this._removeDrawings(unitId, [drawingId]);
            }
          }
        }
      })
    );
    this.disposeWithMe(
      this._commandService.onCommandExecuted((command) => {
        if (command.id !== RichTextEditingMutation.id) {
          return;
        }
        const params = command.params;
        const { unitId, actions } = params;
        const reOrderedDrawings = getReOrderedDrawings(actions);
        if (reOrderedDrawings.length > 0) {
          this._updateDrawingsOrder(unitId);
        }
      })
    );
    this.disposeWithMe(
      this._commandService.onCommandExecuted((command) => {
        var _a;
        if (command.id !== UndoCommand.id && command.id !== RedoCommand.id) {
          return;
        }
        const unitId = (_a = this._univerInstanceService.getCurrentUniverDocInstance()) == null ? void 0 : _a.getUnitId();
        const focusedDrawings = this._drawingManagerService.getFocusDrawings();
        if (unitId == null || focusedDrawings.length === 0) {
          return;
        }
        const renderObject = this._renderManagerService.getRenderById(unitId);
        const scene = renderObject == null ? void 0 : renderObject.scene;
        if (scene == null) {
          return false;
        }
        const transformer = scene.getTransformerByCreate();
        transformer.refreshControls();
      })
    );
  }
  _addDrawings(unitId, drawings) {
    const drawingManagerService = this._drawingManagerService;
    const docDrawingService = this._docDrawingService;
    const jsonOp = this._docDrawingService.getBatchAddOp(drawings);
    const { subUnitId, redo: op, objects } = jsonOp;
    drawingManagerService.applyJson1(unitId, subUnitId, op);
    docDrawingService.applyJson1(unitId, subUnitId, op);
    drawingManagerService.addNotification(objects);
    docDrawingService.addNotification(objects);
  }
  _removeDrawings(unitId, drawingIds) {
    const drawingManagerService = this._drawingManagerService;
    const docDrawingService = this._docDrawingService;
    const jsonOp = this._docDrawingService.getBatchRemoveOp(drawingIds.map((drawingId) => {
      return {
        unitId,
        subUnitId: unitId,
        drawingId
      };
    }));
    const { subUnitId, redo: op, objects } = jsonOp;
    drawingManagerService.applyJson1(unitId, subUnitId, op);
    docDrawingService.applyJson1(unitId, subUnitId, op);
    drawingManagerService.removeNotification(objects);
    docDrawingService.removeNotification(objects);
  }
  _updateDrawingsOrder(unitId) {
    const documentDataModel = this._univerInstanceService.getUniverDocInstance(unitId);
    if (documentDataModel == null) {
      return;
    }
    const drawingsOrder = documentDataModel.getSnapshot().drawingsOrder;
    if (drawingsOrder == null) {
      return;
    }
    const drawingManagerService = this._drawingManagerService;
    const docDrawingService = this._docDrawingService;
    drawingManagerService.setDrawingOrder(unitId, unitId, drawingsOrder);
    docDrawingService.setDrawingOrder(unitId, unitId, drawingsOrder);
    const objects = {
      unitId,
      subUnitId: unitId,
      drawingIds: drawingsOrder
    };
    drawingManagerService.orderNotification(objects);
    docDrawingService.orderNotification(objects);
  }
};
DocDrawingAddRemoveController = __decorateClass([
  __decorateParam(0, IUniverInstanceService),
  __decorateParam(1, ICommandService),
  __decorateParam(2, IDrawingManagerService),
  __decorateParam(3, IDocDrawingService),
  __decorateParam(4, IRenderManagerService)
], DocDrawingAddRemoveController);

// ../packages/docs-drawing-ui/src/views/printing-float-dom/index.tsx
var import_react = __toESM(require_react());

// ../packages/docs-drawing-ui/src/commands/commands/insert-doc-drawing.command.ts
var InsertDocDrawingCommand = {
  id: "doc.command.insert-doc-image",
  type: 0 /* COMMAND */,
  // eslint-disable-next-line max-lines-per-function
  handler: (accessor, params) => {
    var _a, _b, _c, _d;
    if (params == null) {
      return false;
    }
    const commandService = accessor.get(ICommandService);
    const docSelectionManagerService = accessor.get(DocSelectionManagerService);
    const univerInstanceService = accessor.get(IUniverInstanceService);
    const activeTextRange = docSelectionManagerService.getActiveTextRange();
    const documentDataModel = univerInstanceService.getCurrentUniverDocInstance();
    if (activeTextRange == null || documentDataModel == null) {
      return false;
    }
    const unitId = documentDataModel.getUnitId();
    const { drawings } = params;
    const { collapsed, startOffset, segmentId } = activeTextRange;
    const body = documentDataModel.getSelfOrHeaderFooterModel(segmentId).getBody();
    if (body == null) {
      return false;
    }
    const textX = new TextX();
    const jsonX = JSONX.getInstance();
    const rawActions = [];
    const drawingOrderLength = (_b = (_a = documentDataModel.getSnapshot().drawingsOrder) == null ? void 0 : _a.length) != null ? _b : 0;
    let removeDrawingLen = 0;
    if (collapsed) {
      if (startOffset > 0) {
        textX.push({
          t: "r" /* RETAIN */,
          len: startOffset
        });
      }
    } else {
      const dos = BuildTextUtils.selection.delete([activeTextRange], body, 0, null, false);
      textX.push(...dos);
      const removedCustomBlockIds = getCustomBlockIdsInSelections(body, [activeTextRange]);
      const drawings2 = (_c = documentDataModel.getDrawings()) != null ? _c : {};
      const drawingOrder = (_d = documentDataModel.getDrawingsOrder()) != null ? _d : [];
      const sortedRemovedCustomBlockIds = removedCustomBlockIds.sort((a, b) => {
        if (drawingOrder.indexOf(a) > drawingOrder.indexOf(b)) {
          return -1;
        } else if (drawingOrder.indexOf(a) < drawingOrder.indexOf(b)) {
          return 1;
        }
        return 0;
      });
      if (sortedRemovedCustomBlockIds.length > 0) {
        for (const blockId of sortedRemovedCustomBlockIds) {
          const drawing = drawings2[blockId];
          const drawingIndex = drawingOrder.indexOf(blockId);
          if (drawing == null || drawingIndex < 0) {
            continue;
          }
          const removeDrawingAction = jsonX.removeOp(["drawings", blockId], drawing);
          const removeDrawingOrderAction = jsonX.removeOp(["drawingsOrder", drawingIndex], blockId);
          rawActions.push(removeDrawingAction);
          rawActions.push(removeDrawingOrderAction);
          removeDrawingLen++;
        }
      }
    }
    textX.push({
      t: "i" /* INSERT */,
      body: {
        dataStream: "\b".repeat(drawings.length),
        customBlocks: drawings.map((drawing, i) => ({
          startIndex: i,
          blockId: drawing.drawingId
        }))
      },
      len: drawings.length
    });
    const path = getRichTextEditPath(documentDataModel, segmentId);
    const placeHolderAction = jsonX.editOp(textX.serialize(), path);
    rawActions.push(placeHolderAction);
    for (const drawing of drawings) {
      const { drawingId } = drawing;
      const addDrawingAction = jsonX.insertOp(["drawings", drawingId], drawing);
      const addDrawingOrderAction = jsonX.insertOp(["drawingsOrder", drawingOrderLength - removeDrawingLen], drawingId);
      rawActions.push(addDrawingAction);
      rawActions.push(addDrawingOrderAction);
    }
    const doMutation = {
      id: RichTextEditingMutation.id,
      params: {
        unitId,
        actions: [],
        textRanges: []
      }
    };
    doMutation.params.actions = rawActions.reduce((acc, cur) => {
      return JSONX.compose(acc, cur);
    }, null);
    const result = commandService.syncExecuteCommand(doMutation.id, doMutation.params);
    return Boolean(result);
  }
};

// ../packages/docs-drawing-ui/src/controllers/doc-float-dom.controller.ts
function calcDocFloatDomPositionByRect(rect, scene, opacity = 1, angle = 0) {
  const { top, left, bottom, right } = rect;
  const width = right - left;
  const height = bottom - top;
  const viewMain = scene.getViewport("viewMain" /* VIEW_MAIN */);
  const { viewportScrollX, viewportScrollY } = viewMain;
  const { scaleX, scaleY } = scene.getAncestorScale();
  return {
    startX: (left - viewportScrollX) * scaleX,
    startY: (top - viewportScrollY) * scaleY,
    endX: (left + width - viewportScrollX) * scaleX,
    endY: (top + height - viewportScrollY) * scaleY,
    width: width * scaleX,
    height: height * scaleY,
    rotate: angle,
    absolute: {
      left: false,
      top: false
    },
    opacity: opacity != null ? opacity : 1
  };
}
function calcDocFloatDomPosition(object, renderUnit) {
  const { top, left, width, height, angle, opacity } = object;
  return calcDocFloatDomPositionByRect({ top, left, bottom: top + height, right: left + width }, renderUnit.scene, opacity, angle);
}
var DocFloatDomController = class extends Disposable {
  constructor(_renderManagerService, _drawingManagerService, _drawingRenderService, _canvasFloatDomService, _univerInstanceService, _commandService) {
    super();
    __publicField(this, "_renderManagerService", _renderManagerService);
    __publicField(this, "_drawingManagerService", _drawingManagerService);
    __publicField(this, "_drawingRenderService", _drawingRenderService);
    __publicField(this, "_canvasFloatDomService", _canvasFloatDomService);
    __publicField(this, "_univerInstanceService", _univerInstanceService);
    __publicField(this, "_commandService", _commandService);
    __publicField(this, "_domLayerInfoMap", /* @__PURE__ */ new Map());
    this._initialize();
  }
  dispose() {
    super.dispose();
  }
  _initialize() {
    this._drawingAddRemoveListener();
    this._initScrollAndZoomEvent();
  }
  _getSceneAndTransformerByDrawingSearch(unitId) {
    if (unitId == null) {
      return;
    }
    const renderObject = this._renderManagerService.getRenderById(unitId);
    if (renderObject == null) {
      return null;
    }
    const scene = renderObject.scene;
    const transformer = scene.getTransformerByCreate();
    return { scene, transformer, renderUnit: renderObject, canvas: renderObject.engine.getCanvasElement() };
  }
  _drawingAddRemoveListener() {
    this.disposeWithMe(
      this._drawingManagerService.add$.subscribe((params) => {
        this._insertRects(params);
      })
    );
    this.disposeWithMe(
      this._drawingManagerService.remove$.subscribe((params) => {
        params.forEach((param) => {
          this._removeDom(param.drawingId);
        });
      })
    );
  }
  _insertRects(params) {
    params.forEach(async (param) => {
      const { unitId } = param;
      const documentDataModel = this._univerInstanceService.getUnit(unitId, 1 /* UNIVER_DOC */);
      if (!documentDataModel) {
        return;
      }
      const renderObject = this._getSceneAndTransformerByDrawingSearch(unitId);
      if (renderObject == null) {
        return;
      }
      const rectParam = this._drawingManagerService.getDrawingByParam(param);
      if (rectParam == null) {
        return;
      }
      const rects = await this._drawingRenderService.renderFloatDom(rectParam, renderObject.scene);
      if (rects == null || rects.length === 0) {
        return;
      }
      for (const rect of rects) {
        this._addHoverForRect(rect);
        const disposableCollection = new DisposableCollection();
        const initPosition = calcDocFloatDomPosition(rect, renderObject.renderUnit);
        const position$ = new BehaviorSubject(initPosition);
        const canvas = renderObject.canvas;
        const data = rectParam.data;
        const info = {
          dispose: disposableCollection,
          rect,
          position$,
          unitId
        };
        this._canvasFloatDomService.addFloatDom({
          position$,
          id: rectParam.drawingId,
          componentKey: rectParam.componentKey,
          onPointerDown: (evt) => {
            canvas.dispatchEvent(new PointerEvent(evt.type, evt));
          },
          onPointerMove: (evt) => {
            canvas.dispatchEvent(new PointerEvent(evt.type, evt));
          },
          onPointerUp: (evt) => {
            canvas.dispatchEvent(new PointerEvent(evt.type, evt));
          },
          onWheel: (evt) => {
            canvas.dispatchEvent(new WheelEvent(evt.type, evt));
          },
          data,
          unitId
        });
        const listener = rect.onTransformChange$.subscribeEvent(() => {
          const newPosition = calcDocFloatDomPosition(rect, renderObject.renderUnit);
          position$.next(
            newPosition
          );
        });
        disposableCollection.add(() => {
          this._canvasFloatDomService.removeFloatDom(rectParam.drawingId);
        });
        listener && disposableCollection.add(listener);
        this._domLayerInfoMap.set(rectParam.drawingId, info);
      }
    });
  }
  _addHoverForRect(o) {
    this.disposeWithMe(
      toDisposable(
        o.onPointerEnter$.subscribeEvent(() => {
          o.cursor = "grab" /* GRAB */;
        })
      )
    );
    this.disposeWithMe(
      toDisposable(
        o.onPointerLeave$.subscribeEvent(() => {
          o.cursor = "default" /* DEFAULT */;
        })
      )
    );
  }
  _removeDom(id) {
    const info = this._domLayerInfoMap.get(id);
    if (!info) {
      return;
    }
    const { unitId } = info;
    this._domLayerInfoMap.delete(id);
    info.dispose.dispose();
    const renderObject = this._getSceneAndTransformerByDrawingSearch(unitId);
    if (renderObject) {
      renderObject.scene.removeObject(info.rect);
    }
  }
  _initScrollAndZoomEvent() {
    const updateDoc = (unitId) => {
      const renderObject = this._getSceneAndTransformerByDrawingSearch(unitId);
      if (!renderObject) {
        return;
      }
      this._domLayerInfoMap.forEach((floatDomInfo) => {
        if (floatDomInfo.unitId !== unitId) return;
        const position = calcDocFloatDomPosition(floatDomInfo.rect, renderObject.renderUnit);
        floatDomInfo.position$.next(position);
      });
    };
    this.disposeWithMe(
      this._univerInstanceService.getCurrentTypeOfUnit$(1 /* UNIVER_DOC */).pipe(
        map((documentDataModel) => {
          if (!documentDataModel) return null;
          const unitId = documentDataModel.getUnitId();
          const render2 = this._renderManagerService.getRenderById(unitId);
          return render2 ? { render: render2, unitId } : null;
        }),
        switchMap(
          (render2) => render2 ? fromEventSubject(render2.render.scene.getViewport("viewMain" /* VIEW_MAIN */).onScrollAfter$).pipe(map(() => ({ unitId: render2.unitId }))) : of(null)
        )
      ).subscribe((value) => {
        if (!value) return;
        const { unitId } = value;
        updateDoc(unitId);
      })
    );
    this.disposeWithMe(this._commandService.onCommandExecuted((commandInfo) => {
      if (commandInfo.id === SetDocZoomRatioOperation.id) {
        const params = commandInfo.params;
        const { unitId } = params;
        updateDoc(unitId);
      }
    }));
  }
  insertFloatDom(floatDom, opts) {
    var _a, _b, _c;
    const currentDoc = this._univerInstanceService.getCurrentUnitOfType(1 /* UNIVER_DOC */);
    if (!currentDoc) return false;
    const render2 = this._getSceneAndTransformerByDrawingSearch(currentDoc.getUnitId());
    if (!render2) return false;
    const docSkeletonManagerService = render2.renderUnit.with(DocSkeletonManagerService);
    const skeleton = docSkeletonManagerService.getSkeleton();
    const page = (_a = skeleton.getSkeletonData()) == null ? void 0 : _a.pages[0];
    if (!page) return false;
    const { pageWidth, marginLeft, marginRight } = page;
    const width = pageWidth - marginLeft - marginRight;
    const docTransform = {
      size: {
        width: (_b = opts.width) != null ? _b : width,
        height: opts.height
      },
      positionH: {
        relativeFrom: 0 /* PAGE */,
        posOffset: 0
      },
      positionV: {
        relativeFrom: 0 /* PAGE */,
        posOffset: 0
      },
      angle: 0
    };
    const drawingId = (_c = opts.drawingId) != null ? _c : generateRandomId();
    const params = {
      unitId: currentDoc.getUnitId(),
      drawings: [
        {
          drawingId,
          drawingType: 8 /* DRAWING_DOM */,
          subUnitId: currentDoc.getUnitId(),
          unitId: currentDoc.getUnitId(),
          ...floatDom,
          title: "",
          description: "",
          docTransform,
          layoutType: 0 /* INLINE */,
          transform: docDrawingPositionToTransform(docTransform)
        }
      ]
    };
    this._commandService.syncExecuteCommand(InsertDocDrawingCommand.id, params);
    return drawingId;
  }
};
DocFloatDomController = __decorateClass([
  __decorateParam(0, IRenderManagerService),
  __decorateParam(1, IDrawingManagerService),
  __decorateParam(2, Inject(DrawingRenderService)),
  __decorateParam(3, Inject(CanvasFloatDomService)),
  __decorateParam(4, IUniverInstanceService),
  __decorateParam(5, ICommandService)
], DocFloatDomController);

// ../packages/docs-drawing-ui/src/views/printing-float-dom/index.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var DocPrintingFloatDom = (props) => {
  const { floatDomInfos, scene, offset, bound } = props;
  const width = bound.right - bound.left;
  const height = bound.bottom - bound.top;
  const floatDomParams = (0, import_react.useMemo)(() => floatDomInfos.map((info) => {
    const { width: width2 = 0, height: height2 = 0, left = 0, top = 0 } = info.transform;
    const offsetBound = calcDocFloatDomPositionByRect(
      {
        left,
        right: left + width2,
        top,
        bottom: top + height2
      },
      scene
    );
    const domPos = offsetBound;
    const floatDom = {
      position$: new BehaviorSubject(domPos),
      position: domPos,
      id: info.drawingId,
      componentKey: info.componentKey,
      onPointerMove: () => {
      },
      onPointerDown: () => {
      },
      onPointerUp: () => {
      },
      onWheel: () => {
      },
      unitId: info.unitId,
      data: info.data
    };
    return [info.drawingId, floatDom];
  }).filter(([_, floatDom]) => !(floatDom.position.endX < 0 || floatDom.position.endY < 0 || floatDom.position.startX > width || floatDom.position.startY > height)), [floatDomInfos, scene, offset, width, height]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "univer-absolute univer-left-0 univer-top-0", children: floatDomParams.map(([id, floatDom]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrintFloatDomSingle, { layer: floatDom, id, position: floatDom.position }, id)) });
};

// ../packages/docs-drawing-ui/src/controllers/doc-drawing-printing.controller.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var DocDrawingPrintingController = class extends Disposable {
  constructor(_docPrintInterceptorService, _drawingRenderService, _drawingManagerService, _componetManager, _injector) {
    super();
    __publicField(this, "_docPrintInterceptorService", _docPrintInterceptorService);
    __publicField(this, "_drawingRenderService", _drawingRenderService);
    __publicField(this, "_drawingManagerService", _drawingManagerService);
    __publicField(this, "_componetManager", _componetManager);
    __publicField(this, "_injector", _injector);
    this._initPrinting();
    this._initPrintingDom();
  }
  _initPrinting() {
    this.disposeWithMe(
      this._docPrintInterceptorService.interceptor.intercept(
        this._docPrintInterceptorService.interceptor.getInterceptPoints().PRINTING_COMPONENT_COLLECT,
        {
          handler: (_param, pos, next) => {
            const { unitId, scene } = pos;
            const unitData = this._drawingManagerService.getDrawingDataForUnit(unitId);
            const subUnitData = unitData == null ? void 0 : unitData[unitId];
            if (subUnitData) {
              subUnitData.order.forEach((id) => {
                const drawing = subUnitData.data[id];
                if (drawing.drawingType !== 2 /* DRAWING_CHART */ && drawing.drawingType !== 8 /* DRAWING_DOM */) {
                  this._drawingRenderService.renderDrawing(drawing, scene);
                }
              });
            }
            return next();
          }
        }
      )
    );
  }
  _initPrintingDom() {
    this.disposeWithMe(
      this._docPrintInterceptorService.interceptor.intercept(
        this._docPrintInterceptorService.interceptor.getInterceptPoints().PRINTING_DOM_COLLECT,
        {
          handler: (disposableCollection, pos, next) => {
            const { unitId } = pos;
            const unitData = this._drawingManagerService.getDrawingDataForUnit(unitId);
            const subUnitData = unitData == null ? void 0 : unitData[unitId];
            if (subUnitData) {
              const floatDomInfos = subUnitData.order.map((id) => {
                const drawing = subUnitData.data[id];
                if (drawing.drawingType === 2 /* DRAWING_CHART */) {
                  return {
                    ...drawing,
                    componentKey: this._componetManager.get(DOC_DRAWING_PRINTING_COMPONENT_KEY)
                  };
                }
                if (drawing.drawingType === 8 /* DRAWING_DOM */) {
                  const printingComponentKey = this._docPrintInterceptorService.getPrintComponent(drawing.componentKey);
                  return {
                    ...drawing,
                    componentKey: this._componetManager.get(printingComponentKey || drawing.componentKey)
                  };
                }
                return null;
              }).filter(Boolean);
              const PrintingFloatDomInjector = connectInjector(DocPrintingFloatDom, this._injector);
              render(
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  PrintingFloatDomInjector,
                  {
                    unitId,
                    floatDomInfos,
                    scene: pos.scene,
                    skeleton: pos.skeleton,
                    offset: pos.offset,
                    bound: pos.bound
                  }
                ),
                pos.root
              );
              disposableCollection == null ? void 0 : disposableCollection.add(() => {
                unmount(pos.root);
              });
              return next(disposableCollection);
            }
          }
        }
      )
    );
  }
};
DocDrawingPrintingController = __decorateClass([
  __decorateParam(0, Inject(DocPrintInterceptorService)),
  __decorateParam(1, Inject(DrawingRenderService)),
  __decorateParam(2, IDrawingManagerService),
  __decorateParam(3, Inject(ComponentManager)),
  __decorateParam(4, Inject(Injector))
], DocDrawingPrintingController);

// ../packages/docs-drawing-ui/src/services/doc-refresh-drawings.service.ts
var DocRefreshDrawingsService = class {
  constructor() {
    __publicField(this, "_refreshDrawings$", new BehaviorSubject(null));
    __publicField(this, "refreshDrawings$", this._refreshDrawings$.asObservable());
  }
  refreshDrawings(skeleton) {
    this._refreshDrawings$.next(skeleton);
  }
};

// ../packages/docs-drawing-ui/src/commands/commands/update-doc-drawing.command.ts
var WRAPPING_STYLE_TO_LAYOUT_TYPE = {
  ["inline" /* INLINE */]: 0 /* INLINE */,
  ["wrapSquare" /* WRAP_SQUARE */]: 3 /* WRAP_SQUARE */,
  ["wrapTopAndBottom" /* WRAP_TOP_AND_BOTTOM */]: 6 /* WRAP_TOP_AND_BOTTOM */,
  ["inFrontOfText" /* IN_FRONT_OF_TEXT */]: 1 /* WRAP_NONE */,
  ["behindText" /* BEHIND_TEXT */]: 1 /* WRAP_NONE */
};
function getDeleteAndInsertCustomBlockActions(segmentId, oldSegmentId, segmentPage, offset, drawingId, documentDataModel, docSelectionRenderManager) {
  var _a, _b;
  const textX = new TextX();
  const jsonX = JSONX.getInstance();
  const rawActions = [];
  const oldBody = documentDataModel.getSelfOrHeaderFooterModel(oldSegmentId).getBody();
  const body = documentDataModel.getSelfOrHeaderFooterModel(segmentId).getBody();
  if (oldBody == null || body == null) {
    return;
  }
  const oldOffset = (_b = (_a = oldBody.customBlocks) == null ? void 0 : _a.find((block) => block.blockId === drawingId)) == null ? void 0 : _b.startIndex;
  if (oldOffset == null) {
    return;
  }
  offset = Math.min(body.dataStream.length - 2, offset);
  if (segmentId === oldSegmentId) {
    if (offset < oldOffset) {
      if (offset > 0) {
        textX.push({
          t: "r" /* RETAIN */,
          len: offset
        });
      }
      textX.push({
        t: "i" /* INSERT */,
        body: {
          dataStream: "\b",
          customBlocks: [{
            startIndex: 0,
            blockId: drawingId
          }]
        },
        len: 1
      });
      textX.push({
        t: "r" /* RETAIN */,
        len: oldOffset - offset
      });
      textX.push({
        t: "d" /* DELETE */,
        len: 1
      });
    } else {
      if (oldOffset > 0) {
        textX.push({
          t: "r" /* RETAIN */,
          len: oldOffset
        });
      }
      textX.push({
        t: "d" /* DELETE */,
        len: 1
      });
      if (offset - oldOffset - 1 > 0) {
        textX.push({
          t: "r" /* RETAIN */,
          len: offset - oldOffset - 1
        });
      }
      textX.push({
        t: "i" /* INSERT */,
        body: {
          dataStream: "\b",
          customBlocks: [{
            startIndex: 0,
            blockId: drawingId
          }]
        },
        len: 1
      });
    }
    if (offset !== oldOffset) {
      const path = getRichTextEditPath(documentDataModel, oldSegmentId);
      const action = jsonX.editOp(textX.serialize(), path);
      rawActions.push(action);
    }
  } else {
    if (oldOffset > 0) {
      textX.push({
        t: "r" /* RETAIN */,
        len: oldOffset
      });
    }
    textX.push({
      t: "d" /* DELETE */,
      len: 1
    });
    let path = getRichTextEditPath(documentDataModel, oldSegmentId);
    let action = jsonX.editOp(textX.serialize(), path);
    rawActions.push(action);
    textX.empty();
    if (offset > 0) {
      textX.push({
        t: "r" /* RETAIN */,
        len: offset
      });
    }
    textX.push({
      t: "i" /* INSERT */,
      body: {
        dataStream: "\b",
        customBlocks: [{
          startIndex: 0,
          blockId: drawingId
        }]
      },
      len: 1
    });
    path = getRichTextEditPath(documentDataModel, segmentId);
    action = jsonX.editOp(textX.serialize(), path);
    rawActions.push(action);
    docSelectionRenderManager.setSegment(segmentId);
    docSelectionRenderManager.setSegmentPage(segmentPage);
  }
  return rawActions;
}
var UpdateDocDrawingWrappingStyleCommand = {
  id: "doc.command.update-doc-drawing-wrapping-style",
  type: 0 /* COMMAND */,
  // eslint-disable-next-line max-lines-per-function, complexity
  handler: (accessor, params) => {
    var _a, _b;
    if (params == null) {
      return false;
    }
    const { drawings, wrappingStyle, unitId } = params;
    const commandService = accessor.get(ICommandService);
    const univerInstanceService = accessor.get(IUniverInstanceService);
    const renderManagerService = accessor.get(IRenderManagerService);
    const renderObject = renderManagerService.getRenderById(unitId);
    const skeletonData = renderObject == null ? void 0 : renderObject.with(DocSkeletonManagerService).getSkeleton().getSkeletonData();
    const viewModel = renderObject == null ? void 0 : renderObject.with(DocSkeletonManagerService).getViewModel();
    const scene = renderObject == null ? void 0 : renderObject.scene;
    const documentDataModel = univerInstanceService.getCurrentUniverDocInstance();
    if (documentDataModel == null || skeletonData == null || scene == null || viewModel == null) {
      return false;
    }
    const editArea = viewModel.getEditArea();
    const transformer = scene.getTransformerByCreate();
    const { pages, skeHeaders, skeFooters } = skeletonData;
    const jsonX = JSONX.getInstance();
    const rawActions = [];
    const { drawings: oldDrawings = {} } = documentDataModel.getSnapshot();
    for (const drawing of drawings) {
      const { drawingId } = drawing;
      const oldLayoutType = oldDrawings[drawingId].layoutType;
      const newLayoutType = WRAPPING_STYLE_TO_LAYOUT_TYPE[wrappingStyle];
      if (oldLayoutType !== newLayoutType) {
        const updateLayoutTypeAction = jsonX.replaceOp(["drawings", drawingId, "layoutType"], oldLayoutType, newLayoutType);
        rawActions.push(updateLayoutTypeAction);
      }
      if (wrappingStyle === "behindText" /* BEHIND_TEXT */ || wrappingStyle === "inFrontOfText" /* IN_FRONT_OF_TEXT */) {
        const oldBehindDoc = oldDrawings[drawingId].behindDoc;
        const newBehindDoc = wrappingStyle === "behindText" /* BEHIND_TEXT */ ? 1 /* TRUE */ : 0 /* FALSE */;
        if (oldBehindDoc !== newBehindDoc) {
          const updateBehindDocAction = jsonX.replaceOp(["drawings", drawingId, "behindDoc"], oldBehindDoc, newBehindDoc);
          rawActions.push(updateBehindDocAction);
        }
      }
      if (wrappingStyle === "inline" /* INLINE */) {
        continue;
      }
      let skeDrawing = null;
      let pageMarginTop = 0;
      let pageMarginLeft = 0;
      for (const page of pages) {
        const { headerId, footerId, marginTop, marginLeft, marginBottom, pageWidth, pageHeight } = page;
        switch (editArea) {
          case "HEADER" /* HEADER */: {
            const headerSke = (_a = skeHeaders.get(headerId)) == null ? void 0 : _a.get(pageWidth);
            if (headerSke != null && headerSke.skeDrawings.has(drawingId)) {
              skeDrawing = headerSke.skeDrawings.get(drawingId);
              pageMarginTop = headerSke.marginTop;
              pageMarginLeft = marginLeft;
            }
            break;
          }
          case "FOOTER" /* FOOTER */: {
            const footerSke = (_b = skeFooters.get(footerId)) == null ? void 0 : _b.get(pageWidth);
            if (footerSke != null && footerSke.skeDrawings.has(drawingId)) {
              skeDrawing = footerSke.skeDrawings.get(drawingId);
              pageMarginTop = pageHeight - marginBottom + footerSke.marginTop;
              pageMarginLeft = marginLeft;
            }
            break;
          }
          case "BODY" /* BODY */: {
            if (page.skeDrawings.has(drawingId)) {
              skeDrawing = page.skeDrawings.get(drawingId);
              pageMarginTop = marginTop;
              pageMarginLeft = marginLeft;
            }
            break;
          }
        }
        if (skeDrawing != null) {
          break;
        }
      }
      if (skeDrawing != null) {
        const { aTop, aLeft } = skeDrawing;
        const oldPositionH = oldDrawings[drawingId].docTransform.positionH;
        let posOffsetH = aLeft;
        if (oldPositionH.relativeFrom === 3 /* MARGIN */) {
          posOffsetH -= pageMarginLeft;
        } else if (oldPositionH.relativeFrom === 1 /* COLUMN */) {
          posOffsetH -= skeDrawing.columnLeft;
        }
        const newPositionH = {
          relativeFrom: oldPositionH.relativeFrom,
          posOffset: posOffsetH
        };
        if (oldPositionH.posOffset !== newPositionH.posOffset) {
          const action = jsonX.replaceOp(["drawings", drawingId, "docTransform", "positionH"], oldPositionH, newPositionH);
          rawActions.push(action);
        }
        const oldPositionV = oldDrawings[drawingId].docTransform.positionV;
        let posOffsetV = aTop;
        if (oldPositionV.relativeFrom === 0 /* PAGE */) {
          posOffsetV += pageMarginTop;
        } else if (oldPositionV.relativeFrom === 2 /* LINE */) {
          posOffsetV -= skeDrawing.lineTop;
        } else if (oldPositionV.relativeFrom === 1 /* PARAGRAPH */) {
          posOffsetV -= skeDrawing.blockAnchorTop;
        }
        const newPositionV = {
          relativeFrom: oldPositionV.relativeFrom,
          posOffset: posOffsetV
        };
        if (oldPositionV.posOffset !== newPositionV.posOffset) {
          const action = jsonX.replaceOp(["drawings", drawingId, "docTransform", "positionV"], oldPositionV, newPositionV);
          rawActions.push(action);
        }
      }
    }
    const doMutation = {
      id: RichTextEditingMutation.id,
      params: {
        unitId,
        actions: [],
        textRanges: null
      }
    };
    doMutation.params.actions = rawActions.reduce((acc, cur) => {
      return JSONX.compose(acc, cur);
    }, null);
    const result = commandService.syncExecuteCommand(doMutation.id, doMutation.params);
    transformer.refreshControls();
    return Boolean(result);
  }
};
var UpdateDocDrawingDistanceCommand = {
  id: "doc.command.update-doc-drawing-distance",
  type: 0 /* COMMAND */,
  handler: (accessor, params) => {
    if (params == null) {
      return false;
    }
    const commandService = accessor.get(ICommandService);
    const univerInstanceService = accessor.get(IUniverInstanceService);
    const documentDataModel = univerInstanceService.getCurrentUniverDocInstance();
    if (documentDataModel == null) {
      return false;
    }
    const { drawings, dist, unitId } = params;
    const jsonX = JSONX.getInstance();
    const rawActions = [];
    const { drawings: oldDrawings = {} } = documentDataModel.getSnapshot();
    for (const drawing of drawings) {
      const { drawingId } = drawing;
      for (const [key, value] of Object.entries(dist)) {
        const oldValue = oldDrawings[drawingId][key];
        if (oldValue !== value) {
          const action = jsonX.replaceOp(["drawings", drawingId, key], oldValue, value);
          rawActions.push(action);
        }
      }
    }
    const doMutation = {
      id: RichTextEditingMutation.id,
      params: {
        unitId,
        actions: [],
        textRanges: null
      }
    };
    doMutation.params.actions = rawActions.reduce((acc, cur) => {
      return JSONX.compose(acc, cur);
    }, null);
    const result = commandService.syncExecuteCommand(doMutation.id, doMutation.params);
    return Boolean(result);
  }
};
var UpdateDocDrawingWrapTextCommand = {
  id: "doc.command.update-doc-drawing-wrap-text",
  type: 0 /* COMMAND */,
  handler: (accessor, params) => {
    if (params == null) {
      return false;
    }
    const commandService = accessor.get(ICommandService);
    const univerInstanceService = accessor.get(IUniverInstanceService);
    const documentDataModel = univerInstanceService.getCurrentUniverDocInstance();
    if (documentDataModel == null) {
      return false;
    }
    const { drawings, wrapText, unitId } = params;
    const jsonX = JSONX.getInstance();
    const rawActions = [];
    const { drawings: oldDrawings = {} } = documentDataModel.getSnapshot();
    for (const drawing of drawings) {
      const { drawingId } = drawing;
      const oldWrapText = oldDrawings[drawingId].wrapText;
      if (oldWrapText !== wrapText) {
        const action = jsonX.replaceOp(["drawings", drawingId, "wrapText"], oldWrapText, wrapText);
        rawActions.push(action);
      }
    }
    const doMutation = {
      id: RichTextEditingMutation.id,
      params: {
        unitId,
        actions: [],
        textRanges: null
      }
    };
    doMutation.params.actions = rawActions.reduce((acc, cur) => {
      return JSONX.compose(acc, cur);
    }, null);
    const result = commandService.syncExecuteCommand(doMutation.id, doMutation.params);
    return Boolean(result);
  }
};
var UpdateDrawingDocTransformCommand = {
  id: "doc.command.update-drawing-doc-transform",
  type: 0 /* COMMAND */,
  handler: (accessor, params) => {
    if (params == null) {
      return false;
    }
    const commandService = accessor.get(ICommandService);
    const univerInstanceService = accessor.get(IUniverInstanceService);
    const renderManagerService = accessor.get(IRenderManagerService);
    const renderObject = renderManagerService.getRenderById(params.unitId);
    const scene = renderObject == null ? void 0 : renderObject.scene;
    if (scene == null) {
      return false;
    }
    const transformer = scene.getTransformerByCreate();
    const documentDataModel = univerInstanceService.getCurrentUniverDocInstance();
    if (documentDataModel == null) {
      return false;
    }
    const { drawings, unitId } = params;
    const jsonX = JSONX.getInstance();
    const rawActions = [];
    const { drawings: oldDrawings = {} } = documentDataModel.getSnapshot();
    for (const drawing of drawings) {
      const { drawingId, key, value } = drawing;
      const oldValue = oldDrawings[drawingId].docTransform[key];
      if (!Tools.diffValue(oldValue, value)) {
        const action = jsonX.replaceOp(["drawings", drawingId, "docTransform", key], oldValue, value);
        rawActions.push(action);
      }
    }
    const doMutation = {
      id: RichTextEditingMutation.id,
      params: {
        unitId,
        actions: [],
        textRanges: null,
        debounce: true
      }
    };
    doMutation.params.actions = rawActions.reduce((acc, cur) => {
      return JSONX.compose(acc, cur);
    }, null);
    const result = commandService.syncExecuteCommand(doMutation.id, doMutation.params);
    transformer.refreshControls();
    return Boolean(result);
  }
};
var IMoveInlineDrawingCommand = {
  id: "doc.command.move-inline-drawing",
  type: 0 /* COMMAND */,
  handler: (accessor, params) => {
    var _a, _b;
    if (params == null) {
      return false;
    }
    const renderManagerService = accessor.get(IRenderManagerService);
    const docSelectionRenderService = (_a = renderManagerService.getRenderById(params.unitId)) == null ? void 0 : _a.with(DocSelectionRenderService);
    const docRefreshDrawingsService = accessor.get(DocRefreshDrawingsService);
    const renderObject = renderManagerService.getRenderById(params.unitId);
    const scene = renderObject == null ? void 0 : renderObject.scene;
    const skeleton = renderObject == null ? void 0 : renderObject.with(DocSkeletonManagerService).getSkeleton();
    if (scene == null || docSelectionRenderService == null) {
      return false;
    }
    const transformer = scene.getTransformerByCreate();
    const commandService = accessor.get(ICommandService);
    const univerInstanceService = accessor.get(IUniverInstanceService);
    const documentDataModel = univerInstanceService.getCurrentUniverDocInstance();
    if (documentDataModel == null) {
      return false;
    }
    const { drawing, unitId, offset, segmentId: newSegmentId, segmentPage, needRefreshDrawings } = params;
    if (needRefreshDrawings) {
      docRefreshDrawingsService.refreshDrawings(skeleton);
      transformer.refreshControls();
      return true;
    }
    const rawActions = [];
    const { drawingId } = drawing;
    const segmentId = (_b = docSelectionRenderService.getSegment()) != null ? _b : "";
    const actions = getDeleteAndInsertCustomBlockActions(
      newSegmentId,
      segmentId,
      segmentPage,
      offset,
      drawingId,
      documentDataModel,
      docSelectionRenderService
    );
    if (actions == null || actions.length === 0) {
      docRefreshDrawingsService.refreshDrawings(skeleton);
      transformer.refreshControls();
      return false;
    }
    rawActions.push(...actions);
    const doMutation = {
      id: RichTextEditingMutation.id,
      params: {
        unitId,
        actions: [],
        textRanges: null
      }
    };
    doMutation.params.actions = rawActions.reduce((acc, cur) => {
      return JSONX.compose(acc, cur);
    }, null);
    const result = commandService.syncExecuteCommand(doMutation.id, doMutation.params);
    transformer.refreshControls();
    return Boolean(result);
  }
};
var ITransformNonInlineDrawingCommand = {
  id: "doc.command.transform-non-inline-drawing",
  type: 0 /* COMMAND */,
  // eslint-disable-next-line max-lines-per-function
  handler: (accessor, params) => {
    var _a, _b;
    if (params == null) {
      return false;
    }
    const renderManagerService = accessor.get(IRenderManagerService);
    const docSelectionRenderService = (_a = renderManagerService.getRenderById(params.unitId)) == null ? void 0 : _a.with(DocSelectionRenderService);
    const renderObject = renderManagerService.getRenderById(params.unitId);
    const scene = renderObject == null ? void 0 : renderObject.scene;
    if (scene == null || docSelectionRenderService == null) {
      return false;
    }
    const transformer = scene.getTransformerByCreate();
    const commandService = accessor.get(ICommandService);
    const univerInstanceService = accessor.get(IUniverInstanceService);
    const documentDataModel = univerInstanceService.getCurrentUniverDocInstance();
    if (documentDataModel == null) {
      return false;
    }
    const { drawing, unitId, offset, docTransform, segmentId: newSegmentId, segmentPage } = params;
    const rawActions = [];
    const { drawingId } = drawing;
    const segmentId = (_b = docSelectionRenderService.getSegment()) != null ? _b : "";
    const actions = getDeleteAndInsertCustomBlockActions(
      newSegmentId,
      segmentId,
      segmentPage,
      offset,
      drawingId,
      documentDataModel,
      docSelectionRenderService
    );
    if (actions == null) {
      return false;
    }
    if (actions.length > 0) {
      rawActions.push(...actions);
    }
    const jsonX = JSONX.getInstance();
    const { drawings: oldDrawings = {} } = documentDataModel.getSnapshot();
    const oldDocTransform = oldDrawings[drawingId].docTransform;
    const { positionH: oldPositionH, positionV: oldPositionV, size: oldSize, angle: oldAngle } = oldDocTransform;
    if (!Tools.diffValue(oldPositionH, docTransform.positionH)) {
      const updateAction = jsonX.replaceOp(["drawings", drawingId, "docTransform", "positionH"], oldPositionH, docTransform.positionH);
      rawActions.push(updateAction);
    }
    if (!Tools.diffValue(oldPositionV, docTransform.positionV)) {
      const updateAction = jsonX.replaceOp(["drawings", drawingId, "docTransform", "positionV"], oldPositionV, docTransform.positionV);
      rawActions.push(updateAction);
    }
    if (!Tools.diffValue(oldSize, docTransform.size)) {
      const updateAction = jsonX.replaceOp(["drawings", drawingId, "docTransform", "size"], oldSize, docTransform.size);
      rawActions.push(updateAction);
    }
    if (!Tools.diffValue(oldAngle, docTransform.angle)) {
      const updateAction = jsonX.replaceOp(["drawings", drawingId, "docTransform", "angle"], oldAngle, docTransform.angle);
      rawActions.push(updateAction);
    }
    const doMutation = {
      id: RichTextEditingMutation.id,
      params: {
        unitId,
        actions: [],
        textRanges: null,
        debounce: true
      }
    };
    doMutation.params.actions = rawActions.reduce((acc, cur) => {
      return JSONX.compose(acc, cur);
    }, null);
    const result = commandService.syncExecuteCommand(doMutation.id, doMutation.params);
    transformer.refreshControls();
    return Boolean(result);
  }
};

// ../packages/docs-drawing-ui/src/controllers/doc-drawing-transformer-update.controller.ts
var INLINE_DRAWING_ANCHOR_KEY_PREFIX = "__InlineDrawingAnchor__";
function isInTableCell(nodePosition) {
  const { path } = nodePosition;
  return path.some((p) => p === "cells");
}
var DocDrawingTransformerController = class extends Disposable {
  constructor(_commandService, _univerInstanceService, _drawingManagerService, _renderManagerService) {
    super();
    __publicField(this, "_commandService", _commandService);
    __publicField(this, "_univerInstanceService", _univerInstanceService);
    __publicField(this, "_drawingManagerService", _drawingManagerService);
    __publicField(this, "_renderManagerService", _renderManagerService);
    __publicField(this, "_liquid", new Liquid());
    __publicField(this, "_listenerOnImageMap", /* @__PURE__ */ new Set());
    // Use to cache the drawings is under transforming or scaling.
    __publicField(this, "_transformerCache", /* @__PURE__ */ new Map());
    __publicField(this, "_anchorShape");
    this._init();
  }
  _init() {
    this._listenDrawingFocus();
  }
  _listenDrawingFocus() {
    this.disposeWithMe(
      this._drawingManagerService.add$.subscribe((drawingParams) => {
        if (drawingParams.length === 0) {
          return;
        }
        for (const drawingParam of drawingParams) {
          const { unitId } = drawingParam;
          if (!this._listenerOnImageMap.has(unitId)) {
            this._listenTransformerChange(unitId);
            this._listenerOnImageMap.add(unitId);
          }
        }
      })
    );
  }
  // Only handle one drawing transformer change.
  // eslint-disable-next-line max-lines-per-function
  _listenTransformerChange(unitId) {
    var _a;
    const transformer = (_a = this._getSceneAndTransformerByDrawingSearch(unitId)) == null ? void 0 : _a.transformer;
    if (transformer == null) {
      return;
    }
    this.disposeWithMe(
      toDisposable(
        transformer.changeStart$.subscribe((state) => {
          var _a2;
          this._transformerCache.clear();
          const { objects } = state;
          for (const object of objects.values()) {
            const { oKey, width, height, left, top, angle } = object;
            const drawing = this._drawingManagerService.getDrawingOKey(oKey);
            if (drawing == null) {
              continue;
            }
            const documentDataModel = this._univerInstanceService.getUniverDocInstance(drawing.unitId);
            const drawingData = (_a2 = documentDataModel == null ? void 0 : documentDataModel.getSnapshot().drawings) == null ? void 0 : _a2[drawing.drawingId];
            if ((drawingData == null ? void 0 : drawingData.layoutType) === 0 /* INLINE */) {
              try {
                object.setOpacity(0.2);
              } catch (e) {
              }
            }
            if (drawingData != null) {
              this._transformerCache.set(drawing.drawingId, {
                drawing: drawingData,
                top,
                left,
                width,
                height,
                angle
              });
            }
          }
        })
      )
    );
    const throttleMultipleDrawingUpdate = throttle(this._updateMultipleDrawingDocTransform.bind(this), 50);
    const throttleNonInlineMoveUpdate = throttle(this._nonInlineDrawingTransform.bind(this), 50);
    this.disposeWithMe(
      toDisposable(
        transformer.changing$.subscribe((state) => {
          const { objects, offsetX, offsetY } = state;
          if (objects.size > 1) {
            throttleMultipleDrawingUpdate(objects);
          } else if (objects.size === 1) {
            const drawingCache = this._transformerCache.values().next().value;
            const object = objects.values().next().value;
            const { width, height, top, left, angle } = object;
            if (drawingCache && width === drawingCache.width && height === drawingCache.height && top === drawingCache.top && left === drawingCache.left && angle === drawingCache.angle) {
              return;
            }
            if (drawingCache && drawingCache.drawing.layoutType !== 0 /* INLINE */) {
            }
            if (drawingCache && drawingCache.drawing.layoutType === 0 /* INLINE */ && offsetX != null && offsetY != null) {
              this._updateInlineDrawingAnchor(drawingCache.drawing, offsetX, offsetY);
            }
          }
        })
      )
    );
    this.disposeWithMe(
      toDisposable(
        // eslint-disable-next-line complexity
        transformer.changeEnd$.subscribe((state) => {
          const { objects, offsetX, offsetY } = state;
          for (const object of objects.values()) {
            const drawing = this._drawingManagerService.getDrawingOKey(object.oKey);
            if (drawing == null) {
              continue;
            }
            const drawingCache = this._transformerCache.get(drawing == null ? void 0 : drawing.drawingId);
            if ((drawingCache == null ? void 0 : drawingCache.drawing.layoutType) === 0 /* INLINE */) {
              try {
                object.setOpacity(1);
              } catch (e) {
              }
            }
          }
          if (this._anchorShape) {
            this._anchorShape.hide();
          }
          if (objects.size > 1) {
            this._updateMultipleDrawingDocTransform(objects);
          } else if (objects.size === 1) {
            const drawingCache = this._transformerCache.values().next().value;
            const object = objects.values().next().value;
            const { width, height, top, left, angle } = object;
            if (drawingCache && width === drawingCache.width && height === drawingCache.height && top === drawingCache.top && left === drawingCache.left && angle === drawingCache.angle) {
              return;
            }
            if (drawingCache && drawingCache.drawing.layoutType === 0 /* INLINE */) {
              if (width !== drawingCache.width || height !== drawingCache.height || angle !== drawingCache.angle) {
                this._updateDrawingSize(drawingCache, object);
              } else if (offsetX != null && offsetY != null) {
                this._moveInlineDrawing(drawingCache.drawing, offsetX, offsetY);
              }
            } else if (drawingCache) {
              this._nonInlineDrawingTransform(drawingCache.drawing, object);
            }
          }
          this._transformerCache.clear();
        })
      )
    );
  }
  // eslint-disable-next-line max-lines-per-function
  _updateMultipleDrawingDocTransform(objects) {
    if (objects.size < 1) {
      return;
    }
    const drawings = [];
    let unitId;
    let subUnitId;
    for (const object of objects.values()) {
      const { oKey, left, top, angle } = object;
      let { width, height } = object;
      const drawing = this._drawingManagerService.getDrawingOKey(oKey);
      if (drawing == null) {
        continue;
      }
      if (unitId == null) {
        unitId = drawing.unitId;
      }
      if (subUnitId == null) {
        subUnitId = drawing.subUnitId;
      }
      const drawingCache = this._transformerCache.get(drawing.drawingId);
      if (drawingCache == null) {
        continue;
      }
      const { drawing: drawingData, top: oldTop, left: oldLeft, width: oldWidth, height: oldHeight, angle: oldAngle } = drawingCache;
      const { width: maxWidth, height: maxHeight } = this._getPageContentSize(drawingData);
      width = Math.min(width, maxWidth);
      height = Math.min(height, maxHeight);
      if (oldWidth !== width || oldHeight !== height) {
        drawings.push({
          drawingId: drawing.drawingId,
          key: "size",
          value: {
            width,
            height
          }
        });
      }
      if (oldAngle !== angle) {
        drawings.push({
          drawingId: drawing.drawingId,
          key: "angle",
          value: angle
        });
      }
      if (oldTop !== top || oldLeft !== left) {
        const verticalDelta = top - oldTop;
        const horizontalDelta = left - oldLeft;
        if (verticalDelta !== 0) {
          drawings.push({
            drawingId: drawing.drawingId,
            key: "positionV",
            value: {
              relativeFrom: drawingData.docTransform.positionV.relativeFrom,
              posOffset: drawingData.docTransform.positionV.posOffset + verticalDelta
            }
          });
        }
        if (horizontalDelta !== 0) {
          drawings.push({
            drawingId: drawing.drawingId,
            key: "positionH",
            value: {
              relativeFrom: drawingData.docTransform.positionH.relativeFrom,
              posOffset: drawingData.docTransform.positionH.posOffset + horizontalDelta
            }
          });
        }
      }
    }
    if (drawings.length > 0 && unitId && subUnitId) {
      this._commandService.executeCommand(UpdateDrawingDocTransformCommand.id, {
        unitId,
        subUnitId,
        drawings
      });
    }
  }
  // TODO: @JOCS, Use to draw and update the drawing anchor.
  _updateDrawingAnchor(objects) {
    if (this._transformerCache.size !== 1) {
      return;
    }
    const drawingCache = this._transformerCache.values().next().value;
    const object = objects.values().next().value;
    const anchor = this._getDrawingAnchor(drawingCache.drawing, object);
  }
  _updateInlineDrawingAnchor(drawing, offsetX, offsetY) {
    var _a;
    if (this._transformerCache.size !== 1) {
      return;
    }
    const { contentBoxPointGroup } = (_a = this._getInlineDrawingAnchor(drawing, offsetX, offsetY)) != null ? _a : {};
    if (contentBoxPointGroup == null) {
      return;
    }
    this._createOrUpdateInlineAnchor(drawing.unitId, contentBoxPointGroup);
  }
  _getInlineDrawingAnchor(drawing, offsetX, offsetY) {
    var _a, _b;
    const currentRender = this._renderManagerService.getRenderById(drawing.unitId);
    const skeleton = currentRender == null ? void 0 : currentRender.with(DocSkeletonManagerService).getSkeleton();
    if (currentRender == null) {
      return;
    }
    const { mainComponent, scene } = currentRender;
    const documentComponent = mainComponent;
    const activeViewport = scene.getViewports()[0];
    const {
      pageLayoutType = 0 /* VERTICAL */,
      pageMarginLeft,
      pageMarginTop
    } = documentComponent.getOffsetConfig();
    let glyphAnchor = null;
    let isBack = false;
    let segmentPageIndex = -1;
    let segmentId = "";
    const HALF = 0.5;
    const coord = this._getTransformCoordForDocumentOffset(documentComponent, activeViewport, offsetX, offsetY);
    if (coord == null) {
      return;
    }
    const docSelectionRenderService = (_a = this._renderManagerService.getRenderById(drawing.unitId)) == null ? void 0 : _a.with(DocSelectionRenderService);
    if (docSelectionRenderService == null) {
      return;
    }
    const nodeInfo = skeleton == null ? void 0 : skeleton.findNodeByCoord(coord, pageLayoutType, pageMarginLeft, pageMarginTop, {
      strict: false,
      segmentId: docSelectionRenderService.getSegment(),
      segmentPage: docSelectionRenderService.getSegmentPage()
    });
    if (nodeInfo) {
      const { node, ratioX, segmentPage, segmentId: nodeSegmentId } = nodeInfo;
      isBack = ratioX < HALF;
      glyphAnchor = node;
      segmentPageIndex = segmentPage;
      segmentId = nodeSegmentId;
    }
    if (glyphAnchor == null) {
      return;
    }
    const nodePosition = skeleton == null ? void 0 : skeleton.findPositionByGlyph(glyphAnchor, segmentPageIndex);
    const docObject = this._getDocObject();
    if (nodePosition == null || skeleton == null || docObject == null) {
      return;
    }
    if (isInTableCell(nodePosition)) {
      return;
    }
    const positionWithIsBack = {
      ...nodePosition,
      isBack
    };
    const documentOffsetConfig = docObject.document.getOffsetConfig();
    const convertor = new NodePositionConvertToCursor(documentOffsetConfig, skeleton);
    const { cursorList, contentBoxPointGroup } = convertor.getRangePointData(positionWithIsBack, positionWithIsBack);
    const { startOffset } = (_b = getOneTextSelectionRange(cursorList)) != null ? _b : {};
    if (startOffset == null) {
      return;
    }
    return { offset: startOffset, contentBoxPointGroup, segmentId, segmentPage: segmentPageIndex };
  }
  // eslint-disable-next-line max-lines-per-function, complexity
  _getDrawingAnchor(drawing, object) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
    const currentRender = this._renderManagerService.getRenderById(drawing.unitId);
    const skeleton = currentRender == null ? void 0 : currentRender.with(DocSkeletonManagerService).getSkeleton();
    const skeletonData = skeleton == null ? void 0 : skeleton.getSkeletonData();
    if (skeletonData == null || currentRender == null) {
      return;
    }
    const { pages, skeHeaders, skeFooters } = skeletonData;
    const { mainComponent, scene } = currentRender;
    const documentComponent = mainComponent;
    const activeViewport = scene.getViewports()[0];
    const { pageLayoutType = 0 /* VERTICAL */, pageMarginLeft, pageMarginTop, docsLeft, docsTop } = documentComponent.getOffsetConfig();
    const { left, top, angle } = object;
    let { width, height } = object;
    const { positionV, positionH } = drawing.docTransform;
    const { width: maxWidth, height: maxHeight } = this._getPageContentSize(drawing);
    width = Math.min(width, maxWidth);
    height = Math.min(height, maxHeight);
    let glyphAnchor = null;
    let segmentId = "";
    let segmentPage = -1;
    const isBack = false;
    const docTransform = {
      ...drawing.docTransform,
      size: {
        width,
        height
      },
      angle
    };
    const { x, y } = scene.getViewportScrollXY(activeViewport);
    const coord = this._getTransformCoordForDocumentOffset(documentComponent, activeViewport, left - x, top - y);
    if (coord == null) {
      return;
    }
    const docSelectionRenderService = (_a = this._renderManagerService.getRenderById(drawing.unitId)) == null ? void 0 : _a.with(DocSelectionRenderService);
    if (docSelectionRenderService == null) {
      return;
    }
    const nodeInfo = skeleton == null ? void 0 : skeleton.findNodeByCoord(coord, pageLayoutType, pageMarginLeft, pageMarginTop, {
      strict: false,
      segmentId: docSelectionRenderService.getSegment(),
      segmentPage: docSelectionRenderService.getSegmentPage()
    });
    if (nodeInfo) {
      const { node, segmentPage: segmentPageIndex, segmentId: nodeSegmentId } = nodeInfo;
      glyphAnchor = node;
      segmentPage = segmentPageIndex;
      segmentId = nodeSegmentId;
    }
    if (glyphAnchor == null) {
      return;
    }
    const line = (_b = glyphAnchor.parent) == null ? void 0 : _b.parent;
    const column = line == null ? void 0 : line.parent;
    const paragraphStartLine = (_c = column == null ? void 0 : column.lines.find((l) => l.paragraphIndex === (line == null ? void 0 : line.paragraphIndex) && l.paragraphStart)) != null ? _c : column == null ? void 0 : column.lines[0];
    const page = (_d = column == null ? void 0 : column.parent) == null ? void 0 : _d.parent;
    if (line == null || column == null || paragraphStartLine == null || page == null) {
      return;
    }
    this._liquid.reset();
    const pageType = page.type;
    for (const p of pages) {
      const { headerId, footerId, pageHeight, pageWidth, marginLeft, marginBottom } = p;
      const pIndex = pages.indexOf(p);
      if (segmentPage > -1 && pIndex === segmentPage) {
        switch (pageType) {
          case 1 /* HEADER */: {
            const headerSke = (_e = skeHeaders.get(headerId)) == null ? void 0 : _e.get(pageWidth);
            if (headerSke) {
              this._liquid.translatePagePadding({
                marginTop: headerSke.marginTop,
                marginLeft
              });
            } else {
              throw new Error("header skeleton not found");
            }
            break;
          }
          case 2 /* FOOTER */: {
            const footerSke = (_f = skeFooters.get(footerId)) == null ? void 0 : _f.get(pageWidth);
            if (footerSke) {
              this._liquid.translatePagePadding({
                marginTop: pageHeight - marginBottom + footerSke.marginTop,
                marginLeft
              });
            } else {
              throw new Error("footer skeleton not found");
            }
            break;
          }
        }
        break;
      }
      this._liquid.translatePagePadding(p);
      if (p === page) {
        break;
      }
      this._liquid.restorePagePadding(p);
      this._liquid.translatePage(p, pageLayoutType, pageMarginLeft, pageMarginTop);
    }
    if (positionV.relativeFrom === 2 /* LINE */) {
      glyphAnchor = line.divides[0].glyphGroup[0];
    } else {
      glyphAnchor = (_j = (_i = (_h = (_g = paragraphStartLine.divides) == null ? void 0 : _g[0]) == null ? void 0 : _h.glyphGroup) == null ? void 0 : _i[0]) != null ? _j : glyphAnchor;
    }
    docTransform.positionH = {
      relativeFrom: positionH.relativeFrom,
      posOffset: left - this._liquid.x - docsLeft
    };
    switch (positionH.relativeFrom) {
      case 3 /* MARGIN */: {
        docTransform.positionH.posOffset = left - this._liquid.x - docsLeft - page.marginLeft;
        break;
      }
      case 1 /* COLUMN */: {
        docTransform.positionH.posOffset = left - this._liquid.x - docsLeft - column.left;
        break;
      }
    }
    docTransform.positionV = {
      relativeFrom: positionV.relativeFrom,
      posOffset: top - this._liquid.y - docsTop
    };
    switch (positionV.relativeFrom) {
      case 0 /* PAGE */: {
        docTransform.positionV.posOffset = top - this._liquid.y - docsTop - page.marginTop;
        break;
      }
      case 2 /* LINE */: {
        docTransform.positionV.posOffset = top - this._liquid.y - docsTop - line.top;
        break;
      }
      case 1 /* PARAGRAPH */: {
        docTransform.positionV.posOffset = top - this._liquid.y - docsTop - paragraphStartLine.top;
        break;
      }
    }
    if (glyphAnchor == null) {
      return;
    }
    const nodePosition = skeleton == null ? void 0 : skeleton.findPositionByGlyph(glyphAnchor, segmentPage);
    const docObject = this._getDocObject();
    if (nodePosition == null || skeleton == null || docObject == null) {
      return;
    }
    if (isInTableCell(nodePosition)) {
      return;
    }
    const positionWithIsBack = {
      ...nodePosition,
      isBack
    };
    const documentOffsetConfig = docObject.document.getOffsetConfig();
    const convertor = new NodePositionConvertToCursor(documentOffsetConfig, skeleton);
    const { cursorList } = convertor.getRangePointData(positionWithIsBack, positionWithIsBack);
    const { startOffset } = (_k = getOneTextSelectionRange(cursorList)) != null ? _k : {};
    if (startOffset == null) {
      return;
    }
    return { offset: startOffset, docTransform, segmentId, segmentPage };
  }
  // Update drawing when use transformer to resize it.
  _updateDrawingSize(drawingCache, object) {
    const drawings = [];
    const { drawing, width: oldWidth, height: oldHeight, angle: oldAngle } = drawingCache;
    const { unitId, subUnitId } = drawing;
    let { width, height, angle } = object;
    const { width: maxWidth, height: maxHeight } = this._getPageContentSize(drawing);
    width = Math.min(maxWidth, width);
    height = Math.min(maxHeight, height);
    if (width !== oldWidth || height !== oldHeight) {
      drawings.push({
        drawingId: drawing.drawingId,
        key: "size",
        value: {
          width,
          height
        }
      });
    }
    if (angle !== oldAngle) {
      drawings.push({
        drawingId: drawing.drawingId,
        key: "angle",
        value: angle
      });
    }
    if (drawings.length > 0 && unitId && subUnitId) {
      this._commandService.executeCommand(UpdateDrawingDocTransformCommand.id, {
        unitId,
        subUnitId,
        drawings
      });
    }
  }
  // Update inline drawing when use transformer to move it.
  _moveInlineDrawing(drawing, offsetX, offsetY) {
    const anchor = this._getInlineDrawingAnchor(drawing, offsetX, offsetY);
    const { offset, segmentId, segmentPage } = anchor != null ? anchor : {};
    return this._commandService.executeCommand(IMoveInlineDrawingCommand.id, {
      unitId: drawing.unitId,
      subUnitId: drawing.unitId,
      drawing,
      offset,
      segmentId,
      segmentPage,
      needRefreshDrawings: offset == null
    });
  }
  // Limit the drawing to the page area, mainly in the vertical direction,
  // and the upper and lower limits cannot exceed the page margin area.
  _limitDrawingInPage(drawing, object) {
    const currentRender = this._renderManagerService.getRenderById(drawing.unitId);
    const { left, top, width, height, angle } = object;
    const skeleton = currentRender == null ? void 0 : currentRender.with(DocSkeletonManagerService).getSkeleton();
    const skeletonData = skeleton == null ? void 0 : skeleton.getSkeletonData();
    const { pages } = skeletonData != null ? skeletonData : {};
    if (skeletonData == null || currentRender == null || pages == null) {
      return {
        left,
        top,
        width,
        height,
        angle
      };
    }
    const { mainComponent } = currentRender;
    const documentComponent = mainComponent;
    const { top: docsTop, pageLayoutType, pageMarginLeft, pageMarginTop } = documentComponent;
    let newTop = top;
    this._liquid.reset();
    for (const page of pages) {
      const { marginBottom, pageHeight } = page;
      const index = pages.indexOf(page);
      const nextPage = pages[index + 1];
      if (nextPage == null) {
        continue;
      }
      const isBetweenPages = Tools.hasIntersectionBetweenTwoRanges(
        top,
        top + height,
        this._liquid.y + docsTop + pageHeight - marginBottom,
        this._liquid.y + docsTop + pageHeight + pageMarginTop + nextPage.marginTop
      );
      if (isBetweenPages) {
        const drawingVMiddle = top + height / 2;
        const pagesMiddle = this._liquid.y + docsTop + pageHeight + pageMarginTop / 2;
        if (drawingVMiddle < pagesMiddle) {
          newTop = Math.min(top, this._liquid.y + docsTop + pageHeight - marginBottom - height);
        } else {
          newTop = Math.max(top, this._liquid.y + docsTop + pageHeight + pageMarginTop + nextPage.marginTop);
        }
      }
      this._liquid.translatePage(page, pageLayoutType, pageMarginLeft, pageMarginTop);
    }
    return {
      left,
      top: newTop,
      width,
      height,
      angle
    };
  }
  _nonInlineDrawingTransform(drawing, object, isMoving = false) {
    const objectPosition = drawing.isMultiTransform === 1 /* TRUE */ ? object : this._limitDrawingInPage(drawing, object);
    if (isMoving && objectPosition.top !== object.top) {
      return;
    }
    const anchor = this._getDrawingAnchor(drawing, objectPosition);
    const { offset, docTransform, segmentId, segmentPage } = anchor != null ? anchor : {};
    if (offset == null || docTransform == null) {
      return this._updateMultipleDrawingDocTransform(/* @__PURE__ */ new Map([[drawing.drawingId, object]]));
    }
    return this._commandService.executeCommand(ITransformNonInlineDrawingCommand.id, {
      unitId: drawing.unitId,
      subUnitId: drawing.unitId,
      drawing,
      offset,
      docTransform,
      segmentId,
      segmentPage
    });
  }
  _getSceneAndTransformerByDrawingSearch(unitId) {
    if (unitId == null) {
      return;
    }
    const renderObject = this._renderManagerService.getRenderById(unitId);
    const scene = renderObject == null ? void 0 : renderObject.scene;
    if (scene == null) {
      return;
    }
    const transformer = scene.getTransformerByCreate();
    return { scene, transformer };
  }
  _getTransformCoordForDocumentOffset(document, viewport, evtOffsetX, evtOffsetY) {
    const { documentTransform } = document.getOffsetConfig();
    const originCoord = viewport.transformVector2SceneCoord(Vector2.FromArray([evtOffsetX, evtOffsetY]));
    if (!originCoord) {
      return;
    }
    return documentTransform.clone().invert().applyPoint(originCoord);
  }
  _createOrUpdateInlineAnchor(unitId, pointsGroup) {
    const currentRender = this._renderManagerService.getRenderById(unitId);
    if (currentRender == null) {
      return;
    }
    const { mainComponent, scene } = currentRender;
    const documentComponent = mainComponent;
    const {
      docsLeft,
      docsTop
    } = documentComponent.getOffsetConfig();
    const bounding = getAnchorBounding(pointsGroup);
    const { left: boundingLeft, top: boundingTop, height } = bounding;
    const left = boundingLeft + docsLeft;
    const top = boundingTop + docsTop;
    if (this._anchorShape) {
      this._anchorShape.transformByState({ left, top, height });
      this._anchorShape.show();
      return;
    }
    const ID_LENGTH = 6;
    const anchor = new Rect(INLINE_DRAWING_ANCHOR_KEY_PREFIX + generateRandomId(ID_LENGTH), {
      left,
      top,
      height,
      strokeWidth: 2,
      stroke: getColor(COLORS.darkgray, 1),
      evented: false
    });
    this._anchorShape = anchor;
    scene.addObject(anchor, TEXT_RANGE_LAYER_INDEX);
  }
  _getDocObject() {
    return getDocObject(this._univerInstanceService, this._renderManagerService);
  }
  _getPageContentSize(drawing) {
    const currentRender = this._renderManagerService.getRenderById(drawing.unitId);
    const skeleton = currentRender == null ? void 0 : currentRender.with(DocSkeletonManagerService).getSkeleton();
    const MAX_WIDTH = 500;
    const MAX_HEIGHT = 500;
    const skeletonData = skeleton == null ? void 0 : skeleton.getSkeletonData();
    if (skeletonData == null || currentRender == null) {
      return {
        width: MAX_WIDTH,
        height: MAX_HEIGHT
      };
    }
    const { pages } = skeletonData;
    let page = null;
    for (const p of pages) {
      const { skeDrawings } = p;
      if (skeDrawings.has(drawing.drawingId)) {
        page = p;
        break;
      }
    }
    if (page) {
      const { pageWidth, pageHeight, marginLeft, marginBottom, marginRight, marginTop } = page;
      return {
        width: Math.max(MAX_WIDTH, pageWidth - marginLeft - marginRight),
        height: Math.max(MAX_HEIGHT, pageHeight - marginTop - marginBottom)
      };
    } else {
      return {
        width: MAX_WIDTH,
        height: MAX_HEIGHT
      };
    }
  }
};
DocDrawingTransformerController = __decorateClass([
  __decorateParam(0, ICommandService),
  __decorateParam(1, IUniverInstanceService),
  __decorateParam(2, IDrawingManagerService),
  __decorateParam(3, IRenderManagerService)
], DocDrawingTransformerController);

// ../packages/docs-drawing-ui/src/commands/commands/remove-doc-drawing.command.ts
var RemoveDocDrawingCommand = {
  id: "doc.command.remove-doc-image",
  type: 0 /* COMMAND */,
  // eslint-disable-next-line max-lines-per-function
  handler: (accessor, params) => {
    var _a, _b, _c, _d;
    const commandService = accessor.get(ICommandService);
    const univerInstanceService = accessor.get(IUniverInstanceService);
    const renderManagerService = accessor.get(IRenderManagerService);
    const documentDataModel = univerInstanceService.getCurrentUniverDocInstance();
    if (params == null || documentDataModel == null) {
      return false;
    }
    const docSelectionRenderService = renderManagerService.getRenderById(params.unitId).with(DocSelectionRenderService);
    const { drawings: removeDrawings } = params;
    const segmentId = (_a = docSelectionRenderService.getSegment()) != null ? _a : "";
    const textX = new TextX();
    const jsonX = JSONX.getInstance();
    const customBlocks = (_c = (_b = documentDataModel.getSelfOrHeaderFooterModel(segmentId).getBody()) == null ? void 0 : _b.customBlocks) != null ? _c : [];
    const removeCustomBlocks = removeDrawings.map((drawing) => customBlocks.find((customBlock) => customBlock.blockId === drawing.drawingId)).filter((block) => !!block).sort((a, b) => a.startIndex > b.startIndex ? 1 : -1);
    const unitId = removeDrawings[0].unitId;
    const memoryCursor = new MemoryCursor();
    memoryCursor.reset();
    const cursorIndex = removeCustomBlocks[0].startIndex;
    const textRanges = [
      {
        startOffset: cursorIndex,
        endOffset: cursorIndex
      }
    ];
    const doMutation = {
      id: RichTextEditingMutation.id,
      params: {
        unitId,
        actions: [],
        textRanges
      }
    };
    const rawActions = [];
    for (const block of removeCustomBlocks) {
      const { startIndex } = block;
      if (startIndex > memoryCursor.cursor) {
        textX.push({
          t: "r" /* RETAIN */,
          len: startIndex - memoryCursor.cursor
        });
      }
      textX.push({
        t: "d" /* DELETE */,
        len: 1
      });
      memoryCursor.moveCursorTo(startIndex + 1);
    }
    const path = getRichTextEditPath(documentDataModel, segmentId);
    rawActions.push(jsonX.editOp(textX.serialize(), path));
    for (const block of removeCustomBlocks) {
      const { blockId } = block;
      const drawing = ((_d = documentDataModel.getDrawings()) != null ? _d : {})[blockId];
      const drawingOrder = documentDataModel.getDrawingsOrder();
      const drawingIndex = drawingOrder.indexOf(blockId);
      const removeDrawingAction = jsonX.removeOp(["drawings", blockId], drawing);
      const removeDrawingOrderAction = jsonX.removeOp(["drawingsOrder", drawingIndex], blockId);
      rawActions.push(removeDrawingAction);
      rawActions.push(removeDrawingOrderAction);
    }
    doMutation.params.actions = rawActions.reduce((acc, cur) => {
      return JSONX.compose(acc, cur);
    }, null);
    const result = commandService.syncExecuteCommand(doMutation.id, doMutation.params);
    return Boolean(result);
  }
};

// ../packages/docs-drawing-ui/src/commands/commands/delete-doc-drawing.command.ts
var DeleteDocDrawingsCommand = {
  id: "doc.command.delete-drawing",
  type: 0 /* COMMAND */,
  handler: (accessor) => {
    const commandService = accessor.get(ICommandService);
    const docDrawingService = accessor.get(IDocDrawingService);
    const drawings = docDrawingService.getFocusDrawings();
    if (drawings.length === 0) {
      return false;
    }
    const { unitId } = drawings[0];
    const newDrawings = drawings.map((drawing) => {
      const { unitId: unitId2, subUnitId, drawingId, drawingType } = drawing;
      return {
        unitId: unitId2,
        subUnitId,
        drawingId,
        drawingType
      };
    });
    return commandService.executeCommand(RemoveDocDrawingCommand.id, {
      unitId,
      drawings: newDrawings
    });
  }
};

// ../packages/docs-drawing-ui/src/commands/commands/group-doc-drawing.command.ts
var GroupDocDrawingCommand = {
  id: "doc.command.group-doc-image",
  type: 0 /* COMMAND */,
  handler: (accessor, params) => {
    return false;
  }
};

// ../packages/docs-drawing-ui/src/commands/commands/set-drawing-arrange.command.ts
var SetDocDrawingArrangeCommand = {
  id: "doc.command.set-drawing-arrange",
  type: 0 /* COMMAND */,
  handler: (accessor, params) => {
    const commandService = accessor.get(ICommandService);
    const docDrawingService = accessor.get(IDocDrawingService);
    if (params == null) {
      return false;
    }
    const { unitId, subUnitId, drawingIds, arrangeType } = params;
    const drawingOrderMapParam = { unitId, subUnitId, drawingIds };
    let jsonOp;
    if (arrangeType === 0 /* forward */) {
      jsonOp = docDrawingService.getForwardDrawingsOp(drawingOrderMapParam);
    } else if (arrangeType === 1 /* backward */) {
      jsonOp = docDrawingService.getBackwardDrawingOp(drawingOrderMapParam);
    } else if (arrangeType === 2 /* front */) {
      jsonOp = docDrawingService.getFrontDrawingsOp(drawingOrderMapParam);
    } else if (arrangeType === 3 /* back */) {
      jsonOp = docDrawingService.getBackDrawingsOp(drawingOrderMapParam);
    }
    if (jsonOp == null) {
      return false;
    }
    const { redo } = jsonOp;
    if (redo == null) {
      return false;
    }
    const rawActions = [];
    let redoCopy = Tools.deepClone(redo);
    redoCopy = redoCopy.slice(3);
    redoCopy.unshift("drawingsOrder");
    rawActions.push(redoCopy);
    const doMutation = {
      id: RichTextEditingMutation.id,
      params: {
        unitId,
        actions: [],
        textRanges: null
      }
    };
    doMutation.params.actions = rawActions.reduce((acc, cur) => {
      return JSONX.compose(acc, cur);
    }, null);
    const result = commandService.syncExecuteCommand(doMutation.id, doMutation.params);
    return Boolean(result);
  }
};

// ../packages/docs-drawing-ui/src/commands/commands/ungroup-doc-drawing.command.ts
var UngroupDocDrawingCommand = {
  id: "doc.command.ungroup-doc-image",
  type: 0 /* COMMAND */,
  handler: (accessor, params) => {
    const docDrawingService = accessor.get(IDocDrawingService);
    if (!params) return false;
    const unitIds = [];
    params.forEach(({ parent, children }) => {
      unitIds.push(parent.unitId);
      children.forEach((child) => {
        unitIds.push(child.unitId);
      });
    });
    const jsonOp = docDrawingService.getUngroupDrawingOp(params);
    const { unitId, subUnitId, undo, redo, objects } = jsonOp;
    return false;
  }
};

// ../packages/docs-drawing-ui/src/controllers/render-controllers/doc-drawing-update.render-controller.ts
var DocDrawingUpdateRenderController = class extends Disposable {
  constructor(_context, _commandService, _docSelectionManagerService, _renderManagerSrv, _imageIoService, _docDrawingService, _drawingManagerService, _contextService, _messageService, _localeService, _docSelectionRenderService, _docRefreshDrawingsService, _fileOpenerService) {
    super();
    __publicField(this, "_context", _context);
    __publicField(this, "_commandService", _commandService);
    __publicField(this, "_docSelectionManagerService", _docSelectionManagerService);
    __publicField(this, "_renderManagerSrv", _renderManagerSrv);
    __publicField(this, "_imageIoService", _imageIoService);
    __publicField(this, "_docDrawingService", _docDrawingService);
    __publicField(this, "_drawingManagerService", _drawingManagerService);
    __publicField(this, "_contextService", _contextService);
    __publicField(this, "_messageService", _messageService);
    __publicField(this, "_localeService", _localeService);
    __publicField(this, "_docSelectionRenderService", _docSelectionRenderService);
    __publicField(this, "_docRefreshDrawingsService", _docRefreshDrawingsService);
    __publicField(this, "_fileOpenerService", _fileOpenerService);
    this._updateOrderListener();
    this._groupDrawingListener();
    this._focusDrawingListener();
    this._transformDrawingListener();
    this._editAreaChangeListener();
  }
  dispose() {
    super.dispose();
    delete this._context;
  }
  async insertDocImage() {
    const files = await this._fileOpenerService.openFile({
      multiple: true,
      accept: DRAWING_IMAGE_ALLOW_IMAGE_LIST.map((image) => `.${image.replace("image/", "")}`).join(",")
    });
    const fileLength = files.length;
    if (fileLength > DRAWING_IMAGE_COUNT_LIMIT) {
      this._messageService.show({
        type: "error" /* Error */,
        content: this._localeService.t("update-status.exceedMaxCount", String(DRAWING_IMAGE_COUNT_LIMIT))
      });
      return false;
    } else if (fileLength === 0) {
      return false;
    }
    await this._insertFloatImages(files);
    return true;
  }
  // eslint-disable-next-line max-lines-per-function
  async _insertFloatImages(files) {
    let imageParams = [];
    try {
      imageParams = await Promise.all(files.map((file) => this._imageIoService.saveImage(file)));
    } catch (error) {
      const type = error.message;
      let content = "";
      switch (type) {
        case "1" /* ERROR_EXCEED_SIZE */:
          content = this._localeService.t("update-status.exceedMaxSize", String(DRAWING_IMAGE_ALLOW_SIZE / (1024 * 1024)));
          break;
        case "2" /* ERROR_IMAGE_TYPE */:
          content = this._localeService.t("update-status.invalidImageType");
          break;
        case "4" /* ERROR_IMAGE */:
          content = this._localeService.t("update-status.invalidImage");
          break;
        default:
          break;
      }
      this._messageService.show({
        type: "error" /* Error */,
        content
      });
    }
    if (imageParams.length === 0) {
      return;
    }
    const { unitId } = this._context;
    const docDrawingParams = [];
    for (const imageParam of imageParams) {
      if (imageParam == null) {
        continue;
      }
      const { imageId, imageSourceType, source, base64Cache } = imageParam;
      const { width, height, image } = await getImageSize(base64Cache || "");
      this._imageIoService.addImageSourceCache(imageId, imageSourceType, image);
      let scale = 1;
      if (width > DRAWING_IMAGE_WIDTH_LIMIT || height > DRAWING_IMAGE_HEIGHT_LIMIT) {
        const scaleWidth = DRAWING_IMAGE_WIDTH_LIMIT / width;
        const scaleHeight = DRAWING_IMAGE_HEIGHT_LIMIT / height;
        scale = Math.min(scaleWidth, scaleHeight);
      }
      const docTransform = this._getImagePosition(width * scale, height * scale);
      if (docTransform == null) {
        return;
      }
      const docDrawingParam = {
        unitId,
        subUnitId: unitId,
        drawingId: imageId,
        drawingType: 0 /* DRAWING_IMAGE */,
        imageSourceType,
        source,
        transform: docDrawingPositionToTransform(docTransform),
        docTransform,
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
      const isInHeaderFooter = this._isInsertInHeaderFooter();
      if (isInHeaderFooter) {
        docDrawingParam.isMultiTransform = 1 /* TRUE */;
        docDrawingParam.transforms = docDrawingParam.transform ? [docDrawingParam.transform] : null;
      }
      docDrawingParams.push(docDrawingParam);
    }
    this._commandService.executeCommand(InsertDocDrawingCommand.id, {
      unitId,
      drawings: docDrawingParams
    });
  }
  _isInsertInHeaderFooter() {
    var _a;
    const { unitId } = this._context;
    const viewModel = (_a = this._renderManagerSrv.getRenderById(unitId)) == null ? void 0 : _a.with(DocSkeletonManagerService).getViewModel();
    const editArea = viewModel == null ? void 0 : viewModel.getEditArea();
    return editArea === "HEADER" /* HEADER */ || editArea === "FOOTER" /* FOOTER */;
  }
  _getImagePosition(imageWidth, imageHeight) {
    const activeTextRange = this._docSelectionRenderService.getActiveTextRange();
    const position = (activeTextRange == null ? void 0 : activeTextRange.getAbsolutePosition()) || {
      left: 0,
      top: 0
    };
    return {
      size: {
        width: imageWidth,
        height: imageHeight
      },
      positionH: {
        relativeFrom: 0 /* PAGE */,
        posOffset: position.left
      },
      positionV: {
        relativeFrom: 1 /* PARAGRAPH */,
        posOffset: 0
      },
      angle: 0
    };
  }
  _updateOrderListener() {
    this.disposeWithMe(
      this._drawingManagerService.featurePluginOrderUpdate$.subscribe((params) => {
        const { unitId, subUnitId, drawingIds, arrangeType } = params;
        this._commandService.executeCommand(SetDocDrawingArrangeCommand.id, {
          unitId,
          subUnitId,
          drawingIds,
          arrangeType
        });
      })
    );
  }
  _groupDrawingListener() {
    this.disposeWithMe(
      this._drawingManagerService.featurePluginGroupUpdate$.subscribe((params) => {
        this._commandService.executeCommand(GroupDocDrawingCommand.id, params);
      })
    );
    this.disposeWithMe(
      this._drawingManagerService.featurePluginUngroupUpdate$.subscribe((params) => {
        this._commandService.executeCommand(UngroupDocDrawingCommand.id, params);
      })
    );
  }
  _getCurrentSceneAndTransformer() {
    const { scene, mainComponent } = this._context;
    if (scene == null || mainComponent == null) {
      return;
    }
    const transformer = scene.getTransformerByCreate();
    const { docsLeft, docsTop } = mainComponent.getOffsetConfig();
    return { scene, transformer, docsLeft, docsTop };
  }
  _transformDrawingListener() {
    const res = this._getCurrentSceneAndTransformer();
    if (res && res.transformer) {
      this.disposeWithMe(res.transformer.changeEnd$.pipe(debounceTime(30)).subscribe((params) => {
        this._docSelectionManagerService.refreshSelection();
      }));
    } else {
      throw new Error("transformer is not init");
    }
  }
  _focusDrawingListener() {
    this.disposeWithMe(
      this._drawingManagerService.focus$.subscribe((params) => {
        var _a;
        const { transformer, docsLeft, docsTop } = (_a = this._getCurrentSceneAndTransformer()) != null ? _a : {};
        if (params == null || params.length === 0) {
          this._contextService.setContextValue(FOCUSING_COMMON_DRAWINGS, false);
          this._docDrawingService.focusDrawing([]);
          if (transformer) {
            transformer.resetProps({
              zeroTop: 0,
              zeroLeft: 0
            });
          }
        } else {
          this._contextService.setContextValue(FOCUSING_COMMON_DRAWINGS, true);
          this._docDrawingService.focusDrawing(params);
          this._setDrawingSelections(params);
          const prevSegmentId = this._docSelectionRenderService.getSegment();
          const segmentId = this._findSegmentIdByDrawingId(params[0].drawingId);
          if (prevSegmentId !== segmentId) {
            this._docSelectionRenderService.setSegment(segmentId);
          }
          if (transformer) {
            transformer.resetProps({
              zeroTop: docsTop,
              zeroLeft: docsLeft
            });
          }
        }
      })
    );
  }
  _findSegmentIdByDrawingId(drawingId) {
    var _a, _b, _c;
    const { unit: DocDataModel } = this._context;
    const { body, headers = {}, footers = {} } = DocDataModel.getSnapshot();
    const bodyCustomBlocks = (_a = body == null ? void 0 : body.customBlocks) != null ? _a : [];
    if (bodyCustomBlocks.some((b) => b.blockId === drawingId)) {
      return "";
    }
    for (const headerId of Object.keys(headers)) {
      if ((_b = headers[headerId].body.customBlocks) == null ? void 0 : _b.some((b) => b.blockId === drawingId)) {
        return headerId;
      }
    }
    for (const footerId of Object.keys(footers)) {
      if ((_c = footers[footerId].body.customBlocks) == null ? void 0 : _c.some((b) => b.blockId === drawingId)) {
        return footerId;
      }
    }
    return "";
  }
  // Update drawings edit status and opacity. You can not edit header footer images when you are editing body. and vice verse.
  _updateDrawingsEditStatus() {
    var _a;
    if (!this._context) return;
    const { unit: docDataModel, scene, unitId } = this._context;
    const viewModel = (_a = this._renderManagerSrv.getRenderById(unitId)) == null ? void 0 : _a.with(DocSkeletonManagerService).getViewModel();
    if (viewModel == null || docDataModel == null) {
      return;
    }
    const snapshot = docDataModel.getSnapshot();
    const { drawings = {} } = snapshot;
    const isEditBody = viewModel.getEditArea() === "BODY" /* BODY */;
    for (const key of Object.keys(drawings)) {
      const drawing = drawings[key];
      const objectKey = getDrawingShapeKeyByDrawingSearch({ unitId, drawingId: drawing.drawingId, subUnitId: unitId });
      const drawingShapes = scene.fuzzyMathObjects(objectKey, true);
      if (drawingShapes.length) {
        for (const shape of drawingShapes) {
          scene.detachTransformerFrom(shape);
          try {
            shape.setOpacity(0.5);
          } catch (e) {
          }
          if (isEditBody && drawing.isMultiTransform !== 1 /* TRUE */ || !isEditBody && drawing.isMultiTransform === 1 /* TRUE */) {
            if (drawing.allowTransform !== false) {
              scene.attachTransformerTo(shape);
            }
            try {
              shape.setOpacity(1);
            } catch (e) {
            }
          }
        }
      }
    }
  }
  _editAreaChangeListener() {
    var _a;
    const { unitId } = this._context;
    const viewModel = (_a = this._renderManagerSrv.getRenderById(unitId)) == null ? void 0 : _a.with(DocSkeletonManagerService).getViewModel();
    if (viewModel == null) {
      return;
    }
    this._updateDrawingsEditStatus();
    this.disposeWithMe(
      viewModel.editAreaChange$.subscribe(() => {
        this._updateDrawingsEditStatus();
      })
    );
    this.disposeWithMe(
      this._docRefreshDrawingsService.refreshDrawings$.subscribe((skeleton) => {
        if (skeleton == null) {
          return;
        }
        queueMicrotask(() => {
          this._updateDrawingsEditStatus();
        });
      })
    );
    this.disposeWithMe(
      this._commandService.onCommandExecuted(async (command) => {
        if (command.id === RichTextEditingMutation.id) {
          queueMicrotask(() => {
            this._updateDrawingsEditStatus();
          });
        }
      })
    );
  }
  _setDrawingSelections(params) {
    var _a, _b;
    const { unit } = this._context;
    const customBlocks = (_b = (_a = unit.getSnapshot().body) == null ? void 0 : _a.customBlocks) != null ? _b : [];
    const ranges = params.map((item) => {
      const id = item.drawingId;
      const block = customBlocks.find((b) => b.blockId === id);
      if (block) {
        return block.startIndex;
      }
      return null;
    }).filter((e) => e !== null).map((offset) => ({ startOffset: offset, endOffset: offset + 1 }));
    this._docSelectionManagerService.replaceDocRanges(ranges);
  }
};
DocDrawingUpdateRenderController = __decorateClass([
  __decorateParam(1, ICommandService),
  __decorateParam(2, Inject(DocSelectionManagerService)),
  __decorateParam(3, IRenderManagerService),
  __decorateParam(4, IImageIoService),
  __decorateParam(5, IDocDrawingService),
  __decorateParam(6, IDrawingManagerService),
  __decorateParam(7, IContextService),
  __decorateParam(8, IMessageService),
  __decorateParam(9, Inject(LocaleService)),
  __decorateParam(10, Inject(DocSelectionRenderService)),
  __decorateParam(11, Inject(DocRefreshDrawingsService)),
  __decorateParam(12, ILocalFileService)
], DocDrawingUpdateRenderController);

// ../packages/docs-drawing-ui/src/commands/commands/insert-image.command.ts
var InsertDocImageCommand = {
  id: "doc.command.insert-float-image",
  type: 0 /* COMMAND */,
  handler: (accessor) => {
    var _a, _b;
    const univerInstanceService = accessor.get(IUniverInstanceService);
    const renderManagerService = accessor.get(IRenderManagerService);
    return (_b = (_a = getCurrentTypeOfRenderer(1 /* UNIVER_DOC */, univerInstanceService, renderManagerService)) == null ? void 0 : _a.with(DocDrawingUpdateRenderController).insertDocImage()) != null ? _b : false;
  }
};

// ../packages/docs-drawing-ui/src/commands/commands/move-drawings.command.ts
var MoveDocDrawingsCommand = {
  id: "doc.command.move-drawing",
  type: 0 /* COMMAND */,
  handler: (accessor, params) => {
    const commandService = accessor.get(ICommandService);
    const docDrawingService = accessor.get(IDocDrawingService);
    const univerInstanceService = accessor.get(IUniverInstanceService);
    const renderManagerService = accessor.get(IRenderManagerService);
    const { direction } = params;
    const drawings = docDrawingService.getFocusDrawings();
    if (drawings.length === 0) {
      return false;
    }
    const unitId = drawings[0].unitId;
    const renderObject = renderManagerService.getRenderById(unitId);
    const scene = renderObject == null ? void 0 : renderObject.scene;
    if (scene == null) {
      return false;
    }
    const transformer = scene.getTransformerByCreate();
    const documentDataModel = univerInstanceService.getUniverDocInstance(unitId);
    const newDrawings = drawings.map((drawing) => {
      var _a, _b, _c, _d, _e;
      const { drawingId } = drawing;
      const drawingData = (_a = documentDataModel == null ? void 0 : documentDataModel.getSnapshot().drawings) == null ? void 0 : _a[drawingId];
      if (drawingData == null || drawingData.layoutType === 0 /* INLINE */) {
        return null;
      }
      const { positionH, positionV } = drawingData.docTransform;
      const newPositionH = { ...positionH };
      const newPositionV = { ...positionV };
      if (direction === 0 /* UP */) {
        newPositionV.posOffset = ((_b = newPositionV.posOffset) != null ? _b : 0) - 2;
      } else if (direction === 2 /* DOWN */) {
        newPositionV.posOffset = ((_c = newPositionV.posOffset) != null ? _c : 0) + 2;
      } else if (direction === 3 /* LEFT */) {
        newPositionH.posOffset = ((_d = newPositionH.posOffset) != null ? _d : 0) - 2;
      } else if (direction === 1 /* RIGHT */) {
        newPositionH.posOffset = ((_e = newPositionH.posOffset) != null ? _e : 0) + 2;
      }
      return {
        drawingId,
        key: direction === 0 /* UP */ || direction === 2 /* DOWN */ ? "positionV" : "positionH",
        value: direction === 0 /* UP */ || direction === 2 /* DOWN */ ? newPositionV : newPositionH
      };
    }).filter((drawing) => drawing != null);
    if (newDrawings.length === 0) {
      return false;
    }
    const result = commandService.syncExecuteCommand(UpdateDrawingDocTransformCommand.id, {
      unitId,
      subUnitId: unitId,
      drawings: newDrawings
    });
    transformer.refreshControls();
    return Boolean(result);
  }
};

// ../packages/docs-drawing-ui/src/commands/operations/clear-drawing-transformer.operation.ts
var ClearDocDrawingTransformerOperation = {
  id: "doc.operation.clear-drawing-transformer",
  type: 2 /* MUTATION */,
  handler: (accessor, params) => {
    const renderManagerService = accessor.get(IRenderManagerService);
    params.forEach((unitId) => {
      var _a, _b;
      (_b = (_a = renderManagerService.getRenderById(unitId)) == null ? void 0 : _a.scene.getTransformer()) == null ? void 0 : _b.debounceRefreshControls();
    });
    return true;
  }
};

// ../packages/docs-drawing-ui/src/views/doc-image-panel/component-name.ts
var COMPONENT_DOC_DRAWING_PANEL = "COMPONENT_DOC_DRAWING_PANEL";

// ../packages/docs-drawing-ui/src/commands/operations/open-drawing-panel.operation.ts
var SidebarDocDrawingOperation = {
  id: "sidebar.operation.doc-image",
  type: 0 /* COMMAND */,
  handler: async (accessor, params) => {
    const sidebarService = accessor.get(ISidebarService);
    const localeService = accessor.get(LocaleService);
    const drawingManagerService = accessor.get(IDrawingManagerService);
    switch (params.value) {
      case "open":
        sidebarService.open({
          header: { title: localeService.t("docImage.panel.title") },
          children: { label: COMPONENT_DOC_DRAWING_PANEL },
          onClose: () => {
            drawingManagerService.focusDrawing(null);
          },
          width: 360
        });
        break;
      case "close":
      default:
        sidebarService.close();
        break;
    }
    return true;
  }
};

// ../packages/docs-drawing-ui/src/commands/operations/edit-doc-drawing.operation.ts
var EditDocDrawingOperation = {
  id: "doc.operation.edit-doc-image",
  type: 1 /* OPERATION */,
  handler: (accessor, params) => {
    const drawingManagerService = accessor.get(IDrawingManagerService);
    const commandService = accessor.get(ICommandService);
    if (params == null) {
      return false;
    }
    drawingManagerService.focusDrawing([params]);
    commandService.executeCommand(SidebarDocDrawingOperation.id, { value: "open" });
    return true;
  }
};

// ../packages/docs-drawing-ui/src/menu/image.menu.ts
var DOCS_IMAGE_MENU_ID = "doc.menu.image";
var IMAGE_MENU_UPLOAD_FLOAT_ID = InsertDocImageCommand.id;
var getDisableWhenSelectionInTableObservable = (accessor) => {
  const docSelectionManagerService = accessor.get(DocSelectionManagerService);
  const univerInstanceService = accessor.get(IUniverInstanceService);
  return new Observable((subscriber) => {
    const observable = docSelectionManagerService.textSelection$.subscribe(() => {
      var _a;
      const activeRange = docSelectionManagerService.getActiveTextRange();
      if (activeRange) {
        const { segmentId, startOffset, endOffset } = activeRange;
        const docDataModel = univerInstanceService.getCurrentUniverDocInstance();
        const tables = (_a = docDataModel == null ? void 0 : docDataModel.getSelfOrHeaderFooterModel(segmentId).getBody()) == null ? void 0 : _a.tables;
        if (tables && tables.length) {
          if (tables.some((table) => {
            const { startIndex, endIndex } = table;
            return startOffset >= startIndex && startOffset < endIndex || endOffset >= startIndex && endOffset < endIndex;
          })) {
            subscriber.next(true);
            return;
          }
        }
      } else {
        subscriber.next(true);
        return;
      }
      subscriber.next(false);
    });
    return () => observable.unsubscribe();
  });
};
function ImageMenuFactory(accessor) {
  return {
    id: DOCS_IMAGE_MENU_ID,
    type: 3 /* SUBITEMS */,
    icon: "AddImageIcon",
    tooltip: "docImage.title",
    disabled$: getDisableWhenSelectionInTableObservable(accessor),
    hidden$: getMenuHiddenObservable(accessor, 1 /* UNIVER_DOC */, void 0, DOCS_ZEN_EDITOR_UNIT_ID_KEY)
  };
}
function UploadFloatImageMenuFactory(_accessor) {
  return {
    id: IMAGE_MENU_UPLOAD_FLOAT_ID,
    title: "docImage.upload.float",
    type: 0 /* BUTTON */,
    hidden$: getMenuHiddenObservable(_accessor, 1 /* UNIVER_DOC */, void 0, DOCS_ZEN_EDITOR_UNIT_ID_KEY)
  };
}

// ../packages/docs-drawing-ui/src/menu/schema.ts
var menuSchema = {
  ["ribbon.insert.media" /* MEDIA */]: {
    [DOCS_IMAGE_MENU_ID]: {
      order: 0,
      menuItemFactory: ImageMenuFactory,
      [IMAGE_MENU_UPLOAD_FLOAT_ID]: {
        order: 0,
        menuItemFactory: UploadFloatImageMenuFactory
      }
    }
  }
};

// ../packages/docs-drawing-ui/src/views/doc-image-panel/DocDrawingPanel.tsx
var import_react4 = __toESM(require_react());

// ../packages/docs-drawing-ui/src/views/doc-image-panel/DocDrawingPosition.tsx
var import_react2 = __toESM(require_react());
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var MIN_OFFSET = -1e3;
var MAX_OFFSET = 1e3;
var DocDrawingPosition = (props) => {
  const commandService = useDependency(ICommandService);
  const localeService = useDependency(LocaleService);
  const drawingManagerService = useDependency(IDrawingManagerService);
  const renderManagerService = useDependency(IRenderManagerService);
  const univerInstanceService = useDependency(IUniverInstanceService);
  const { drawings } = props;
  const drawingParam = drawings[0];
  if (drawingParam == null) {
    return;
  }
  const { unitId } = drawingParam;
  const documentDataModel = univerInstanceService.getUniverDocInstance(unitId);
  const documentFlavor = documentDataModel == null ? void 0 : documentDataModel.getSnapshot().documentStyle.documentFlavor;
  const renderObject = renderManagerService.getRenderById(unitId);
  const scene = renderObject == null ? void 0 : renderObject.scene;
  if (scene == null) {
    return;
  }
  const transformer = scene.getTransformerByCreate();
  const HORIZONTAL_RELATIVE_FROM = [{
    label: localeService.t("image-position.column"),
    value: String(1 /* COLUMN */)
  }, {
    label: localeService.t("image-position.page"),
    value: String(0 /* PAGE */)
  }, {
    label: localeService.t("image-position.margin"),
    value: String(3 /* MARGIN */)
  }];
  const VERTICAL_RELATIVE_FROM = [{
    label: localeService.t("image-position.line"),
    value: String(2 /* LINE */),
    disabled: documentFlavor === 2 /* MODERN */
  }, {
    label: localeService.t("image-position.page"),
    value: String(0 /* PAGE */),
    disabled: documentFlavor === 2 /* MODERN */
  }, {
    label: localeService.t("image-position.margin"),
    value: String(3 /* MARGIN */),
    disabled: documentFlavor === 2 /* MODERN */
  }, {
    label: localeService.t("image-position.paragraph"),
    value: String(1 /* PARAGRAPH */)
  }];
  const [disabled, setDisabled] = (0, import_react2.useState)(true);
  const [hPosition, setHPosition] = (0, import_react2.useState)({
    relativeFrom: 0 /* PAGE */,
    posOffset: 0
  });
  const [vPosition, setVPosition] = (0, import_react2.useState)({
    relativeFrom: 0 /* PAGE */,
    posOffset: 0
  });
  const [followTextMove, setFollowTextMove] = (0, import_react2.useState)(true);
  const [showPanel, setShowPanel] = (0, import_react2.useState)(true);
  function handlePositionChange(direction, value) {
    var _a;
    if (direction === "positionH") {
      setHPosition(value);
    } else {
      setVPosition(value);
    }
    const focusDrawings = drawingManagerService.getFocusDrawings();
    if (focusDrawings.length === 0) {
      return;
    }
    const drawings2 = focusDrawings.map((drawing) => {
      return {
        unitId: drawing.unitId,
        subUnitId: drawing.subUnitId,
        drawingId: drawing.drawingId
      };
    });
    commandService.executeCommand(UpdateDrawingDocTransformCommand.id, {
      unitId: focusDrawings[0].unitId,
      subUnitId: focusDrawings[0].unitId,
      drawings: drawings2.map((drawing) => ({
        drawingId: drawing.drawingId,
        key: direction,
        value
      }))
    });
    const docSelectionRenderService = (_a = renderManagerService.getRenderById(unitId)) == null ? void 0 : _a.with(DocSelectionRenderService);
    if (docSelectionRenderService) {
      docSelectionRenderService.blur();
    }
    transformer.refreshControls();
  }
  function handleHorizontalRelativeFromChange(value) {
    var _a, _b, _c;
    const prevRelativeFrom = hPosition.relativeFrom;
    const prevPosOffset = hPosition.posOffset;
    const relativeFrom = Number(value);
    if (prevRelativeFrom === relativeFrom) {
      return;
    }
    const focusDrawings = drawingManagerService.getFocusDrawings();
    if (focusDrawings.length === 0) {
      return;
    }
    const drawingId = focusDrawings[0].drawingId;
    const unitId2 = focusDrawings[0].unitId;
    let drawing = null;
    let pageMarginLeft = 0;
    const skeleton = (_a = renderManagerService.getRenderById(unitId2)) == null ? void 0 : _a.with(DocSkeletonManagerService).getSkeleton();
    const skeletonData = skeleton == null ? void 0 : skeleton.getSkeletonData();
    if (skeletonData == null) {
      return;
    }
    const { pages, skeHeaders, skeFooters } = skeletonData;
    for (const page of pages) {
      const { marginLeft, skeDrawings, headerId, footerId, pageWidth } = page;
      if (skeDrawings.has(drawingId)) {
        drawing = skeDrawings.get(drawingId);
        pageMarginLeft = marginLeft;
        break;
      }
      const headerPage = (_b = skeHeaders.get(headerId)) == null ? void 0 : _b.get(pageWidth);
      if (headerPage == null ? void 0 : headerPage.skeDrawings.has(drawingId)) {
        drawing = headerPage == null ? void 0 : headerPage.skeDrawings.get(drawingId);
        pageMarginLeft = marginLeft;
        break;
      }
      const footerPage = (_c = skeFooters.get(footerId)) == null ? void 0 : _c.get(pageWidth);
      if (footerPage == null ? void 0 : footerPage.skeDrawings.has(drawingId)) {
        drawing = footerPage == null ? void 0 : footerPage.skeDrawings.get(drawingId);
        pageMarginLeft = marginLeft;
        break;
      }
    }
    if (drawing == null) {
      return;
    }
    let delta = 0;
    if (prevRelativeFrom === 1 /* COLUMN */) {
      delta -= drawing.columnLeft;
    } else if (prevRelativeFrom === 3 /* MARGIN */) {
      delta -= pageMarginLeft;
    }
    if (relativeFrom === 1 /* COLUMN */) {
      delta += drawing.columnLeft;
    } else if (relativeFrom === 3 /* MARGIN */) {
      delta += pageMarginLeft;
    } else if (relativeFrom === 0 /* PAGE */) {
    }
    const newPositionH = {
      relativeFrom,
      posOffset: (prevPosOffset != null ? prevPosOffset : 0) - delta
    };
    handlePositionChange("positionH", newPositionH);
  }
  function handleVerticalRelativeFromChange(value) {
    var _a, _b, _c, _d, _e, _f;
    const prevRelativeFrom = vPosition.relativeFrom;
    const prevPosOffset = vPosition.posOffset;
    const relativeFrom = Number(value);
    if (prevRelativeFrom === relativeFrom) {
      return;
    }
    const focusDrawings = drawingManagerService.getFocusDrawings();
    if (focusDrawings.length === 0) {
      return;
    }
    const { drawingId, unitId: unitId2 } = focusDrawings[0];
    const documentDataModel2 = univerInstanceService.getUniverDocInstance(unitId2);
    const skeleton = (_a = renderManagerService.getRenderById(unitId2)) == null ? void 0 : _a.with(DocSkeletonManagerService).getSkeleton();
    const docSelectionRenderService = (_b = renderManagerService.getRenderById(unitId2)) == null ? void 0 : _b.with(DocSelectionRenderService);
    const segmentId = docSelectionRenderService == null ? void 0 : docSelectionRenderService.getSegment();
    const segmentPage = docSelectionRenderService == null ? void 0 : docSelectionRenderService.getSegmentPage();
    const drawing = (_d = (_c = documentDataModel2 == null ? void 0 : documentDataModel2.getSelfOrHeaderFooterModel(segmentId).getBody()) == null ? void 0 : _c.customBlocks) == null ? void 0 : _d.find((c) => c.blockId === drawingId);
    if (drawing == null || skeleton == null || docSelectionRenderService == null) {
      return;
    }
    const { startIndex } = drawing;
    const glyph = skeleton.findNodeByCharIndex(startIndex, segmentId, segmentPage);
    const line = (_e = glyph == null ? void 0 : glyph.parent) == null ? void 0 : _e.parent;
    const column = line == null ? void 0 : line.parent;
    const paragraphStartLine = column == null ? void 0 : column.lines.find((l) => l.paragraphIndex === (line == null ? void 0 : line.paragraphIndex) && l.paragraphStart);
    const page = (_f = column == null ? void 0 : column.parent) == null ? void 0 : _f.parent;
    if (glyph == null || line == null || paragraphStartLine == null || column == null || page == null) {
      return;
    }
    let delta = 0;
    if (prevRelativeFrom === 1 /* PARAGRAPH */) {
      delta -= paragraphStartLine.top;
    } else if (prevRelativeFrom === 2 /* LINE */) {
      delta -= line.top;
    } else if (prevRelativeFrom === 0 /* PAGE */) {
      delta += page.marginTop;
    }
    if (relativeFrom === 1 /* PARAGRAPH */) {
      delta += paragraphStartLine.top;
    } else if (relativeFrom === 2 /* LINE */) {
      delta += line.top;
    } else if (relativeFrom === 0 /* PAGE */) {
      delta -= page.marginTop;
    }
    const newPositionV = {
      relativeFrom,
      posOffset: (prevPosOffset != null ? prevPosOffset : 0) - delta
    };
    handlePositionChange("positionV", newPositionV);
  }
  function updateState(drawingParam2) {
    var _a;
    const snapshot = documentDataModel == null ? void 0 : documentDataModel.getSnapshot();
    const drawing = (_a = snapshot == null ? void 0 : snapshot.drawings) == null ? void 0 : _a[drawingParam2.drawingId];
    if (drawing == null) {
      return;
    }
    const { layoutType } = drawing;
    const {
      positionH,
      positionV
    } = drawing.docTransform;
    setHPosition(positionH);
    setVPosition(positionV);
    setDisabled(layoutType === 0 /* INLINE */);
    setFollowTextMove(positionV.relativeFrom === 1 /* PARAGRAPH */ || positionV.relativeFrom === 2 /* LINE */);
  }
  function updateFocusDrawingState() {
    const focusDrawings = drawingManagerService.getFocusDrawings();
    if (focusDrawings.length === 0) {
      return;
    }
    updateState(focusDrawings[0]);
  }
  function handleFollowTextMoveCheck(val) {
    setFollowTextMove(val);
    handleVerticalRelativeFromChange(val ? String(1 /* PARAGRAPH */) : String(0 /* PAGE */));
  }
  (0, import_react2.useEffect)(() => {
    updateFocusDrawingState();
    const subscription = drawingManagerService.focus$.subscribe((drawingParams) => {
      if (drawingParams.length === 0) {
        setShowPanel(false);
        return;
      }
      setShowPanel(true);
      updateState(drawingParams[0]);
    });
    const mutationListener = commandService.onCommandExecuted(async (command) => {
      if (command.id === RichTextEditingMutation.id) {
        updateFocusDrawingState();
      }
    });
    return () => {
      subscription.unsubscribe();
      mutationListener.dispose();
    };
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
    "div",
    {
      className: clsx("univer-grid univer-gap-2 univer-py-2 univer-text-gray-400", {
        "univer-hidden": !showPanel
      }),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "header",
          {
            className: `univer-text-gray-600 dark:!univer-text-gray-200`,
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { children: localeService.t("image-position.title") })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "div",
          {
            className: `univer-text-gray-600 dark:!univer-text-gray-200`,
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { children: localeService.t("image-position.horizontal") })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "div",
          {
            className: `univer-grid univer-grid-cols-2 univer-gap-2 [&>div]:univer-grid [&>div]:univer-gap-2`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: localeService.t("image-position.absolutePosition") }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  InputNumber,
                  {
                    min: MIN_OFFSET,
                    max: MAX_OFFSET,
                    precision: 1,
                    disabled,
                    value: hPosition.posOffset,
                    onChange: (val) => {
                      handlePositionChange("positionH", {
                        relativeFrom: hPosition.relativeFrom,
                        posOffset: val
                      });
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: localeService.t("image-position.toTheRightOf") }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  Select,
                  {
                    value: String(hPosition.relativeFrom),
                    disabled,
                    options: HORIZONTAL_RELATIVE_FROM,
                    onChange: handleHorizontalRelativeFromChange
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "div",
          {
            className: `univer-text-gray-600 dark:!univer-text-gray-200`,
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { children: localeService.t("image-position.vertical") })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "div",
          {
            className: `univer-grid univer-grid-cols-2 univer-gap-2 [&>div]:univer-grid [&>div]:univer-gap-2`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: localeService.t("image-position.absolutePosition") }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  InputNumber,
                  {
                    min: MIN_OFFSET,
                    max: MAX_OFFSET,
                    precision: 1,
                    disabled,
                    value: vPosition.posOffset,
                    onChange: (val) => {
                      handlePositionChange("positionV", {
                        relativeFrom: vPosition.relativeFrom,
                        posOffset: val
                      });
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: localeService.t("image-position.bellow") }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  Select,
                  {
                    disabled,
                    value: String(vPosition.relativeFrom),
                    options: VERTICAL_RELATIVE_FROM,
                    onChange: handleVerticalRelativeFromChange
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "div",
          {
            className: `univer-text-gray-600 dark:!univer-text-gray-200`,
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { children: localeService.t("image-position.options") })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          Checkbox,
          {
            disabled,
            checked: followTextMove,
            onChange: handleFollowTextMoveCheck,
            children: localeService.t("image-position.moveObjectWithText")
          }
        ) })
      ]
    }
  );
};

// ../packages/docs-drawing-ui/src/views/doc-image-panel/DocDrawingTextWrap.tsx
var import_react3 = __toESM(require_react());
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var MIN_MARGIN = 0;
var MAX_MARGIN = 100;
var DocDrawingTextWrap = (props) => {
  const commandService = useDependency(ICommandService);
  const localeService = useDependency(LocaleService);
  const drawingManagerService = useDependency(IDrawingManagerService);
  const renderManagerService = useDependency(IRenderManagerService);
  const univerInstanceService = useDependency(IUniverInstanceService);
  const { drawings } = props;
  const drawingParam = drawings[0];
  if (drawingParam == null) {
    return null;
  }
  const { unitId } = drawingParam;
  const documentDataModel = univerInstanceService.getUniverDocInstance(unitId);
  const renderObject = renderManagerService.getRenderById(unitId);
  const scene = renderObject == null ? void 0 : renderObject.scene;
  if (scene == null) {
    return null;
  }
  const [disableWrapText, setDisableWrapText] = (0, import_react3.useState)(true);
  const [disableDistTB, setDisableDistTB] = (0, import_react3.useState)(true);
  const [disableDistLR, setDisableDistLR] = (0, import_react3.useState)(true);
  const [wrappingStyle, setWrappingStyle] = (0, import_react3.useState)("inline" /* INLINE */);
  const [wrapText, setWrapText] = (0, import_react3.useState)("");
  const [distToText, setDistToText] = (0, import_react3.useState)({
    distT: 0,
    distL: 0,
    distB: 0,
    distR: 0
  });
  const [showPanel, setShowPanel] = (0, import_react3.useState)(true);
  function handleWrappingStyleChange(value) {
    setWrappingStyle(value);
    const focusDrawings = drawingManagerService.getFocusDrawings();
    if (focusDrawings.length === 0) {
      return;
    }
    const { unitId: unitId2, subUnitId } = focusDrawings[0];
    const drawings2 = focusDrawings.map(({ unitId: unitId3, subUnitId: subUnitId2, drawingId }) => ({
      unitId: unitId3,
      subUnitId: subUnitId2,
      drawingId
    }));
    commandService.executeCommand(UpdateDocDrawingWrappingStyleCommand.id, {
      unitId: unitId2,
      subUnitId,
      drawings: drawings2,
      wrappingStyle: value
    });
  }
  function handleWrapTextChange(value) {
    setWrapText(value);
    const focusDrawings = drawingManagerService.getFocusDrawings();
    if (focusDrawings.length === 0) {
      return;
    }
    const drawings2 = focusDrawings.map((drawing) => {
      return {
        unitId: drawing.unitId,
        subUnitId: drawing.subUnitId,
        drawingId: drawing.drawingId
      };
    });
    commandService.executeCommand(UpdateDocDrawingWrapTextCommand.id, {
      unitId: focusDrawings[0].unitId,
      subUnitId: focusDrawings[0].unitId,
      drawings: drawings2,
      wrapText: value
    });
  }
  function handleDistToTextChange(value, direction) {
    if (value == null) {
      return;
    }
    const newDistToText = { ...distToText, [direction]: value };
    setDistToText(newDistToText);
    const focusDrawings = drawingManagerService.getFocusDrawings();
    if (focusDrawings.length === 0) {
      return;
    }
    const drawings2 = focusDrawings.map((drawing) => {
      return {
        unitId: drawing.unitId,
        subUnitId: drawing.subUnitId,
        drawingId: drawing.drawingId
      };
    });
    commandService.executeCommand(UpdateDocDrawingDistanceCommand.id, {
      unitId: focusDrawings[0].unitId,
      subUnitId: focusDrawings[0].unitId,
      drawings: drawings2,
      dist: {
        [direction]: value
      }
    });
  }
  function updateFocusDrawingState() {
    const focusDrawings = drawingManagerService.getFocusDrawings();
    if (focusDrawings.length === 0) {
      return;
    }
    updateState(focusDrawings[0]);
  }
  function updateState(drawingParam2) {
    var _a, _b;
    const drawing = (_b = (_a = documentDataModel == null ? void 0 : documentDataModel.getSnapshot()) == null ? void 0 : _a.drawings) == null ? void 0 : _b[drawingParam2.drawingId];
    if (drawing == null) {
      return;
    }
    const {
      distT = 0,
      distL = 0,
      distB = 0,
      distR = 0,
      layoutType = 0 /* INLINE */,
      behindDoc = 0 /* FALSE */,
      wrapText: wrapText2 = 0 /* BOTH_SIDES */
    } = drawing;
    const distToText2 = {
      distT,
      distL,
      distB,
      distR
    };
    setDistToText(distToText2);
    setWrapText(wrapText2);
    setDisableWrapText(layoutType !== 3 /* WRAP_SQUARE */);
    if (layoutType === 1 /* WRAP_NONE */ || layoutType === 0 /* INLINE */) {
      setDisableDistTB(true);
    } else {
      setDisableDistTB(false);
    }
    if (layoutType === 1 /* WRAP_NONE */ || layoutType === 0 /* INLINE */ || layoutType === 6 /* WRAP_TOP_AND_BOTTOM */) {
      setDisableDistLR(true);
    } else {
      setDisableDistLR(false);
    }
    if (layoutType === 1 /* WRAP_NONE */) {
      if (behindDoc === 1 /* TRUE */) {
        setWrappingStyle("behindText" /* BEHIND_TEXT */);
      } else {
        setWrappingStyle("inFrontOfText" /* IN_FRONT_OF_TEXT */);
      }
    } else {
      switch (layoutType) {
        case 0 /* INLINE */:
          setWrappingStyle("inline" /* INLINE */);
          break;
        case 3 /* WRAP_SQUARE */:
          setWrappingStyle("wrapSquare" /* WRAP_SQUARE */);
          break;
        case 6 /* WRAP_TOP_AND_BOTTOM */:
          setWrappingStyle("wrapTopAndBottom" /* WRAP_TOP_AND_BOTTOM */);
          break;
        default:
          throw new Error(`Unsupported layout type: ${layoutType}`);
      }
    }
  }
  (0, import_react3.useEffect)(() => {
    updateFocusDrawingState();
    const subscription = drawingManagerService.focus$.subscribe((drawingParams) => {
      if (drawingParams.length === 0) {
        setShowPanel(false);
        return;
      }
      setShowPanel(true);
      updateState(drawingParams[0]);
    });
    const mutationListener = commandService.onCommandExecuted(async (command) => {
      if (command.id === RichTextEditingMutation.id) {
        updateFocusDrawingState();
      }
    });
    return () => {
      subscription.unsubscribe();
      mutationListener.dispose();
    };
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
    "div",
    {
      className: clsx("univer-grid univer-gap-2 univer-py-2 univer-text-gray-400", {
        "univer-hidden": !showPanel
      }),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "header",
          {
            className: `univer-text-gray-600 dark:!univer-text-gray-200`,
            children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { children: localeService.t("image-text-wrap.title") })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "div",
          {
            className: `univer-text-gray-600 dark:!univer-text-gray-200`,
            children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { children: localeService.t("image-text-wrap.wrappingStyle") })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(RadioGroup, { value: wrappingStyle, onChange: handleWrappingStyleChange, direction: "vertical", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Radio, { value: "inline" /* INLINE */, children: localeService.t("image-text-wrap.inline") }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Radio, { value: "wrapSquare" /* WRAP_SQUARE */, children: localeService.t("image-text-wrap.square") }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Radio, { value: "wrapTopAndBottom" /* WRAP_TOP_AND_BOTTOM */, children: localeService.t("image-text-wrap.topAndBottom") }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Radio, { value: "behindText" /* BEHIND_TEXT */, children: localeService.t("image-text-wrap.behindText") }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Radio, { value: "inFrontOfText" /* IN_FRONT_OF_TEXT */, children: localeService.t("image-text-wrap.inFrontText") })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "div",
          {
            className: `univer-text-gray-600 dark:!univer-text-gray-200`,
            children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { children: localeService.t("image-text-wrap.wrapText") })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(RadioGroup, { disabled: disableWrapText, value: wrapText, onChange: handleWrapTextChange, direction: "horizontal", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Radio, { value: 0 /* BOTH_SIDES */, children: localeService.t("image-text-wrap.bothSide") }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Radio, { value: 1 /* LEFT */, children: localeService.t("image-text-wrap.leftOnly") }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Radio, { value: 2 /* RIGHT */, children: localeService.t("image-text-wrap.rightOnly") })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "div",
          {
            className: `univer-text-gray-600 dark:!univer-text-gray-200`,
            children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { children: localeService.t("image-text-wrap.distanceFromText") })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
          "div",
          {
            className: `univer-grid univer-grid-cols-2 univer-gap-2 [&>div]:univer-grid [&>div]:univer-gap-2`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: localeService.t("image-text-wrap.top") }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  InputNumber,
                  {
                    min: MIN_MARGIN,
                    max: MAX_MARGIN,
                    disabled: disableDistTB,
                    precision: 1,
                    value: distToText.distT,
                    onChange: (val) => {
                      handleDistToTextChange(val, "distT");
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: localeService.t("image-text-wrap.left") }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  InputNumber,
                  {
                    min: MIN_MARGIN,
                    max: MAX_MARGIN,
                    disabled: disableDistLR,
                    precision: 1,
                    value: distToText.distL,
                    onChange: (val) => {
                      handleDistToTextChange(val, "distL");
                    }
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
          "div",
          {
            className: `univer-grid univer-grid-cols-2 univer-gap-2 [&>div]:univer-grid [&>div]:univer-gap-2`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: localeService.t("image-text-wrap.bottom") }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  InputNumber,
                  {
                    min: MIN_MARGIN,
                    max: MAX_MARGIN,
                    disabled: disableDistTB,
                    precision: 1,
                    value: distToText.distB,
                    onChange: (val) => {
                      handleDistToTextChange(val, "distB");
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: localeService.t("image-text-wrap.right") }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  InputNumber,
                  {
                    min: MIN_MARGIN,
                    max: MAX_MARGIN,
                    disabled: disableDistLR,
                    precision: 1,
                    value: distToText.distR,
                    onChange: (val) => {
                      handleDistToTextChange(val, "distR");
                    }
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
};

// ../packages/docs-drawing-ui/src/views/doc-image-panel/DocDrawingPanel.tsx
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var DocDrawingPanel = () => {
  const drawingManagerService = useDependency(IDrawingManagerService);
  const focusDrawings = drawingManagerService.getFocusDrawings();
  const [drawings, setDrawings] = (0, import_react4.useState)(focusDrawings);
  (0, import_react4.useEffect)(() => {
    const focusDispose = drawingManagerService.focus$.subscribe((drawings2) => {
      setDrawings(drawings2);
    });
    return () => {
      focusDispose.unsubscribe();
    };
  }, []);
  return !!(drawings == null ? void 0 : drawings.length) && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "univer-text-sm", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(DrawingCommonPanel, { drawings, hasAlign: false, hasCropper: false, hasGroup: false, hasTransform: false }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(DocDrawingTextWrap, { drawings }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(DocDrawingPosition, { drawings })
  ] });
};

// ../packages/docs-drawing-ui/src/controllers/shortcuts/drawing.shortcut.ts
function whenDocDrawingFocused(contextService) {
  return contextService.getContextValue(FOCUSING_DOC) && contextService.getContextValue(FOCUSING_UNIVER_EDITOR) && contextService.getContextValue(FOCUSING_COMMON_DRAWINGS);
}
var MoveDrawingDownShortcutItem = {
  id: MoveDocDrawingsCommand.id,
  description: "shortcut.drawing-move-down",
  group: "4_drawing-view",
  binding: 40 /* ARROW_DOWN */,
  priority: 100,
  preconditions: whenDocDrawingFocused,
  staticParameters: {
    direction: 2 /* DOWN */
  }
};
var MoveDrawingUpShortcutItem = {
  id: MoveDocDrawingsCommand.id,
  description: "shortcut.drawing-move-up",
  group: "4_drawing-view",
  binding: 38 /* ARROW_UP */,
  priority: 100,
  preconditions: whenDocDrawingFocused,
  staticParameters: {
    direction: 0 /* UP */
  }
};
var MoveDrawingLeftShortcutItem = {
  id: MoveDocDrawingsCommand.id,
  description: "shortcut.drawing-move-left",
  group: "4_drawing-view",
  binding: 37 /* ARROW_LEFT */,
  priority: 100,
  preconditions: whenDocDrawingFocused,
  staticParameters: {
    direction: 3 /* LEFT */
  }
};
var MoveDrawingRightShortcutItem = {
  id: MoveDocDrawingsCommand.id,
  description: "shortcut.drawing-move-right",
  group: "4_drawing-view",
  binding: 39 /* ARROW_RIGHT */,
  priority: 100,
  preconditions: whenDocDrawingFocused,
  staticParameters: {
    direction: 1 /* RIGHT */
  }
};
var DeleteDrawingsShortcutItem = {
  id: DeleteDocDrawingsCommand.id,
  description: "shortcut.drawing-delete",
  group: "4_drawing-view",
  // when focusing on any other input tag do not trigger this shortcut
  preconditions: whenDocDrawingFocused,
  binding: 46 /* DELETE */,
  mac: 8 /* BACKSPACE */
};

// ../packages/docs-drawing-ui/src/controllers/doc-drawing.controller.ts
var DocDrawingUIController = class extends Disposable {
  constructor(_componentManager, _menuManagerService, _commandService, _shortcutService) {
    super();
    __publicField(this, "_componentManager", _componentManager);
    __publicField(this, "_menuManagerService", _menuManagerService);
    __publicField(this, "_commandService", _commandService);
    __publicField(this, "_shortcutService", _shortcutService);
    this._init();
  }
  _initCustomComponents() {
    const componentManager = this._componentManager;
    this.disposeWithMe(componentManager.register(COMPONENT_DOC_DRAWING_PANEL, DocDrawingPanel));
  }
  _initMenus() {
    this._menuManagerService.mergeMenu(menuSchema);
  }
  _initCommands() {
    [
      InsertDocImageCommand,
      InsertDocDrawingCommand,
      UpdateDocDrawingWrappingStyleCommand,
      UpdateDocDrawingDistanceCommand,
      UpdateDocDrawingWrapTextCommand,
      UpdateDrawingDocTransformCommand,
      IMoveInlineDrawingCommand,
      ITransformNonInlineDrawingCommand,
      RemoveDocDrawingCommand,
      SidebarDocDrawingOperation,
      ClearDocDrawingTransformerOperation,
      EditDocDrawingOperation,
      GroupDocDrawingCommand,
      UngroupDocDrawingCommand,
      MoveDocDrawingsCommand,
      DeleteDocDrawingsCommand,
      SetDocDrawingArrangeCommand
    ].forEach((command) => this.disposeWithMe(this._commandService.registerCommand(command)));
  }
  _initShortcuts() {
    [
      // sheet drawing shortcuts
      MoveDrawingDownShortcutItem,
      MoveDrawingUpShortcutItem,
      MoveDrawingLeftShortcutItem,
      MoveDrawingRightShortcutItem,
      DeleteDrawingsShortcutItem
    ].forEach((item) => {
      this.disposeWithMe(this._shortcutService.registerShortcut(item));
    });
  }
  _init() {
    this._initCommands();
    this._initCustomComponents();
    this._initMenus();
    this._initShortcuts();
  }
};
DocDrawingUIController = __decorateClass([
  __decorateParam(0, Inject(ComponentManager)),
  __decorateParam(1, IMenuManagerService),
  __decorateParam(2, ICommandService),
  __decorateParam(3, IShortcutService)
], DocDrawingUIController);

// ../packages/docs-drawing-ui/src/controllers/render-controllers/doc-drawing-transform-update.controller.ts
var DocDrawingTransformUpdateController = class extends Disposable {
  constructor(_context, _docSkeletonManagerService, _commandService, _editorService, _drawingManagerService, _docRefreshDrawingsService, _univerInstanceService, _lifecycleService) {
    super();
    __publicField(this, "_context", _context);
    __publicField(this, "_docSkeletonManagerService", _docSkeletonManagerService);
    __publicField(this, "_commandService", _commandService);
    __publicField(this, "_editorService", _editorService);
    __publicField(this, "_drawingManagerService", _drawingManagerService);
    __publicField(this, "_docRefreshDrawingsService", _docRefreshDrawingsService);
    __publicField(this, "_univerInstanceService", _univerInstanceService);
    __publicField(this, "_lifecycleService", _lifecycleService);
    __publicField(this, "_liquid", new Liquid());
    this._initialize();
    this._commandExecutedListener();
  }
  _initialize() {
    this._initialRenderRefresh();
    this._drawingInitializeListener();
    this._initResize();
  }
  _initialRenderRefresh() {
    this.disposeWithMe(
      this._docSkeletonManagerService.currentSkeleton$.subscribe((documentSkeleton) => {
        if (documentSkeleton == null) {
          return;
        }
        this._refreshDrawing(documentSkeleton);
      })
    );
    this.disposeWithMe(
      this._docRefreshDrawingsService.refreshDrawings$.subscribe((skeleton) => {
        if (skeleton == null) {
          return;
        }
        this._refreshDrawing(skeleton);
      })
    );
  }
  _commandExecutedListener() {
    const updateCommandList = [RichTextEditingMutation.id, SetDocZoomRatioOperation.id];
    this.disposeWithMe(
      this._commandService.onCommandExecuted((command) => {
        if (updateCommandList.includes(command.id)) {
          const params = command.params;
          const { unitId: commandUnitId } = params;
          const { unitId, mainComponent } = this._context;
          if (commandUnitId !== unitId) {
            return;
          }
          const skeleton = this._docSkeletonManagerService.getSkeleton();
          if (skeleton == null) {
            return;
          }
          if (this._editorService.isEditor(unitId) && unitId !== DOCS_ZEN_EDITOR_UNIT_ID_KEY) {
            mainComponent == null ? void 0 : mainComponent.makeDirty();
            return;
          }
          this._refreshDrawing(skeleton);
        }
      })
    );
  }
  _initResize() {
    this.disposeWithMe(
      fromEventSubject(this._context.engine.onTransformChange$).pipe(
        filter((evt) => evt.type === 1 /* resize */),
        debounceTime(16)
      ).subscribe(() => {
        var _a;
        const skeleton = this._docSkeletonManagerService.getSkeleton();
        const { scene } = this._context;
        (_a = scene.getTransformer()) == null ? void 0 : _a.refreshControls();
        this._refreshDrawing(skeleton);
      })
    );
  }
  _refreshDrawing(skeleton) {
    var _a, _b;
    const skeletonData = skeleton == null ? void 0 : skeleton.getSkeletonData();
    const { mainComponent, unitId } = this._context;
    const documentComponent = mainComponent;
    if (!skeletonData) {
      return;
    }
    const { left: docsLeft, top: docsTop, pageLayoutType, pageMarginLeft, pageMarginTop } = documentComponent;
    const { pages, skeHeaders, skeFooters } = skeletonData;
    const updateDrawingMap = {};
    this._liquid.reset();
    for (let i = 0, len = pages.length; i < len; i++) {
      const page = pages[i];
      const { headerId, footerId, pageWidth } = page;
      if (headerId) {
        const headerPage = (_a = skeHeaders.get(headerId)) == null ? void 0 : _a.get(pageWidth);
        if (headerPage) {
          this._calculateDrawingPosition(
            unitId,
            headerPage,
            docsLeft,
            docsTop,
            updateDrawingMap,
            headerPage.marginTop,
            page.marginLeft
          );
        }
      }
      if (footerId) {
        const footerPage = (_b = skeFooters.get(footerId)) == null ? void 0 : _b.get(pageWidth);
        if (footerPage) {
          this._calculateDrawingPosition(
            unitId,
            footerPage,
            docsLeft,
            docsTop,
            updateDrawingMap,
            page.pageHeight - page.marginBottom + footerPage.marginTop,
            page.marginLeft
          );
        }
      }
      this._calculateDrawingPosition(unitId, page, docsLeft, docsTop, updateDrawingMap, page.marginTop, page.marginLeft);
      this._liquid.translatePage(page, pageLayoutType, pageMarginLeft, pageMarginTop);
    }
    const updateDrawings = Object.values(updateDrawingMap);
    const nonMultiDrawings = updateDrawings.filter((drawing) => !drawing.isMultiTransform);
    const multiDrawings = updateDrawings.filter((drawing) => drawing.isMultiTransform);
    if (nonMultiDrawings.length > 0) {
      this._drawingManagerService.refreshTransform(nonMultiDrawings);
    }
    this._handleMultiDrawingsTransform(multiDrawings);
  }
  _handleMultiDrawingsTransform(multiDrawings) {
    const { scene, unitId } = this._context;
    const transformer = scene.getTransformerByCreate();
    multiDrawings.forEach((updateParam) => {
      const param = this._drawingManagerService.getDrawingByParam(updateParam);
      if (param == null) {
        return;
      }
      param.transform = updateParam.transform;
      param.transforms = updateParam.transforms;
      param.isMultiTransform = updateParam.isMultiTransform;
    });
    const selectedObjectMap = transformer.getSelectedObjectMap();
    const selectedObjectKeys = [...selectedObjectMap.keys()];
    const allMultiDrawings = Object.values(this._drawingManagerService.getDrawingData(unitId, unitId)).filter((drawing) => drawing.isMultiTransform === 1 /* TRUE */);
    this._drawingManagerService.removeNotification(allMultiDrawings);
    if (multiDrawings.length > 0) {
      this._drawingManagerService.addNotification(multiDrawings);
    }
    for (const key of selectedObjectKeys) {
      const drawingShape = scene.getObject(key);
      if (drawingShape) {
        transformer.setSelectedControl(drawingShape);
      }
    }
  }
  _calculateDrawingPosition(unitId, page, docsLeft, docsTop, updateDrawingMap, marginTop, marginLeft) {
    const { skeDrawings } = page;
    this._liquid.translatePagePadding({
      marginTop,
      marginLeft
    });
    skeDrawings.forEach((drawing) => {
      const { aLeft, aTop, height, width, angle, drawingId, drawingOrigin } = drawing;
      const behindText = drawingOrigin.layoutType === 1 /* WRAP_NONE */ && drawingOrigin.behindDoc === 1 /* TRUE */;
      const { isMultiTransform = 0 /* FALSE */ } = drawingOrigin;
      const transform = {
        left: aLeft + docsLeft + this._liquid.x,
        top: aTop + docsTop + this._liquid.y,
        width,
        height,
        angle
      };
      if (updateDrawingMap[drawingId] == null) {
        updateDrawingMap[drawingId] = {
          unitId,
          subUnitId: unitId,
          drawingId,
          behindText,
          transform,
          transforms: [transform],
          isMultiTransform
        };
      } else if (isMultiTransform === 1 /* TRUE */) {
        updateDrawingMap[drawingId].transforms.push(transform);
      }
    });
    this._liquid.restorePagePadding({
      marginTop,
      marginLeft
    });
  }
  _drawingInitializeListener() {
    const init = () => {
      const skeleton = this._docSkeletonManagerService.getSkeleton();
      if (skeleton == null) {
        return;
      }
      this._refreshDrawing(skeleton);
      this._drawingManagerService.initializeNotification(this._context.unitId);
    };
    if (this._lifecycleService.stage >= 2 /* Rendered */) {
      if (this._docSkeletonManagerService.getSkeleton()) {
        init();
      } else {
        setTimeout(init, 500);
      }
    } else {
      this.disposeWithMe(this._lifecycleService.lifecycle$.pipe(filter((stage) => stage === 2 /* Rendered */)).subscribe(init));
    }
  }
};
DocDrawingTransformUpdateController = __decorateClass([
  __decorateParam(1, Inject(DocSkeletonManagerService)),
  __decorateParam(2, ICommandService),
  __decorateParam(3, IEditorService),
  __decorateParam(4, IDrawingManagerService),
  __decorateParam(5, Inject(DocRefreshDrawingsService)),
  __decorateParam(6, IUniverInstanceService),
  __decorateParam(7, Inject(LifecycleService))
], DocDrawingTransformUpdateController);

// ../packages/docs-drawing-ui/src/menu/drawing-popup-menu.controller.ts
var DocDrawingPopupMenuController = class extends RxDisposable {
  constructor(_drawingManagerService, _canvasPopManagerService, _renderManagerService, _univerInstanceService, _contextService) {
    super();
    __publicField(this, "_drawingManagerService", _drawingManagerService);
    __publicField(this, "_canvasPopManagerService", _canvasPopManagerService);
    __publicField(this, "_renderManagerService", _renderManagerService);
    __publicField(this, "_univerInstanceService", _univerInstanceService);
    __publicField(this, "_contextService", _contextService);
    __publicField(this, "_initImagePopupMenu", /* @__PURE__ */ new Set());
    __publicField(this, "_disposePopups", []);
    this._init();
  }
  _init() {
    this.disposeWithMe(
      this._univerInstanceService.getCurrentTypeOfUnit$(1 /* UNIVER_DOC */).pipe(takeUntil(this.dispose$)).subscribe((documentDataModel) => this._create(documentDataModel))
    );
    this.disposeWithMe(
      this._univerInstanceService.getTypeOfUnitDisposed$(1 /* UNIVER_DOC */).pipe(takeUntil(this.dispose$)).subscribe((documentDataModel) => this._dispose(documentDataModel))
    );
    this._univerInstanceService.getAllUnitsForType(1 /* UNIVER_DOC */).forEach((documentDataModel) => this._create(documentDataModel));
  }
  _dispose(documentDataModel) {
    const unitId = documentDataModel.getUnitId();
    if (this._disposePopups.length) {
      this._disposePopups.forEach((dispose) => dispose.dispose());
      this._disposePopups.length = 0;
    }
    this._renderManagerService.removeRender(unitId);
  }
  _create(documentDataModel) {
    if (!documentDataModel) {
      return;
    }
    const unitId = documentDataModel.getUnitId();
    if (isInternalEditorID(unitId)) {
      return;
    }
    if (this._renderManagerService.has(unitId) && !this._initImagePopupMenu.has(unitId)) {
      this._popupMenuListener(unitId);
      this._initImagePopupMenu.add(unitId);
    }
  }
  _hasCropObject(scene) {
    const objects = scene.getAllObjects();
    for (const object of objects) {
      if (object instanceof ImageCropperObject) {
        return true;
      }
    }
    return false;
  }
  // eslint-disable-next-line max-lines-per-function
  _popupMenuListener(unitId) {
    var _a;
    const scene = (_a = this._renderManagerService.getRenderById(unitId)) == null ? void 0 : _a.scene;
    if (!scene) {
      return;
    }
    const transformer = scene.getTransformerByCreate();
    if (!transformer) {
      return;
    }
    const disposePopups = this._disposePopups;
    this.disposeWithMe(
      transformer.createControl$.subscribe(
        () => {
          if (this._hasCropObject(scene)) {
            return;
          }
          const selectedObjects = transformer.getSelectedObjectMap();
          disposePopups.forEach((dispose) => dispose.dispose());
          disposePopups.length = 0;
          if (selectedObjects.size > 1) {
            return;
          }
          const object = selectedObjects.values().next().value;
          if (!object) {
            return;
          }
          const oKey = object.oKey;
          const drawingParam = this._drawingManagerService.getDrawingOKey(oKey);
          if (!drawingParam || drawingParam.drawingType === 8 /* DRAWING_DOM */) {
            return;
          }
          const { unitId: unitId2, subUnitId, drawingId, drawingType } = drawingParam;
          const popup = this._canvasPopManagerService.attachPopupToObject(
            object,
            {
              componentKey: COMPONENT_IMAGE_POPUP_MENU,
              direction: "horizontal",
              offset: [2, 0],
              extraProps: {
                menuItems: this._getImageMenuItems(unitId2, subUnitId, drawingId, drawingType)
              }
            },
            unitId2
          );
          disposePopups.push(this.disposeWithMe(popup));
          const focusDrawings = this._drawingManagerService.getFocusDrawings();
          const alreadyFocused = focusDrawings.find((drawing) => drawing.unitId === unitId2 && drawing.subUnitId === subUnitId && drawing.drawingId === drawingId);
          if (alreadyFocused) {
            return;
          }
          this._drawingManagerService.focusDrawing([{
            unitId: unitId2,
            subUnitId,
            drawingId
          }]);
        }
      )
    );
    this.disposeWithMe(
      transformer.clearControl$.subscribe(() => {
        disposePopups.forEach((dispose) => dispose.dispose());
        disposePopups.length = 0;
        this._contextService.setContextValue(FOCUSING_COMMON_DRAWINGS, false);
        this._drawingManagerService.focusDrawing(null);
      })
    );
    this.disposeWithMe(
      transformer.changing$.subscribe(
        () => {
          disposePopups.forEach((dispose) => dispose.dispose());
          disposePopups.length = 0;
        }
      )
    );
    this.disposeWithMe(
      transformer.changeStart$.subscribe(() => {
        disposePopups.forEach((dispose) => dispose.dispose());
        disposePopups.length = 0;
      })
    );
  }
  _getImageMenuItems(unitId, subUnitId, drawingId, drawingType) {
    return [
      {
        label: "image-popup.edit",
        index: 0,
        commandId: EditDocDrawingOperation.id,
        commandParams: { unitId, subUnitId, drawingId },
        // disable: !!SHEET_EDITOR_UNITS.includes(unitId) || drawingType === DrawingTypeEnum.DRAWING_DOM,
        disable: true
      },
      {
        label: "image-popup.delete",
        index: 1,
        commandId: RemoveDocDrawingCommand.id,
        commandParams: { unitId, drawings: [{ unitId, subUnitId, drawingId }] },
        disable: false
      },
      {
        label: "image-popup.crop",
        index: 2,
        commandId: OpenImageCropOperation.id,
        commandParams: { unitId, subUnitId, drawingId },
        disable: true
        // TODO: @JOCS, feature is not ready.
      },
      {
        label: "image-popup.reset",
        index: 3,
        commandId: ImageResetSizeOperation.id,
        commandParams: [{ unitId, subUnitId, drawingId }],
        disable: true
        // TODO: @JOCS, feature is not ready.
      }
    ];
  }
};
DocDrawingPopupMenuController = __decorateClass([
  __decorateParam(0, IDrawingManagerService),
  __decorateParam(1, Inject(DocCanvasPopManagerService)),
  __decorateParam(2, IRenderManagerService),
  __decorateParam(3, IUniverInstanceService),
  __decorateParam(4, IContextService)
], DocDrawingPopupMenuController);

// ../packages/docs-drawing-ui/src/plugin.ts
var UniverDocsDrawingUIPlugin = class extends Plugin {
  constructor(_config = defaultPluginConfig, _injector, _renderManagerSrv, _configService) {
    super();
    __publicField(this, "_config", _config);
    __publicField(this, "_injector", _injector);
    __publicField(this, "_renderManagerSrv", _renderManagerSrv);
    __publicField(this, "_configService", _configService);
    const { ...rest } = merge_default(
      {},
      defaultPluginConfig,
      this._config
    );
    this._configService.setConfig(DOCS_DRAWING_UI_PLUGIN_CONFIG_KEY, rest);
  }
  onStarting() {
    const dependencies = [
      [DocDrawingUIController],
      [DocDrawingPopupMenuController],
      [DocDrawingTransformerController],
      [DocDrawingAddRemoveController],
      [DocRefreshDrawingsService],
      [DocFloatDomController],
      [DocDrawingPrintingController]
    ];
    dependencies.forEach((dependency) => this._injector.add(dependency));
  }
  onReady() {
    [
      [DocDrawingUpdateRenderController],
      [DocDrawingTransformUpdateController]
    ].forEach((m) => this._renderManagerSrv.registerRenderModule(1 /* UNIVER_DOC */, m));
    this._injector.get(DocDrawingAddRemoveController);
    this._injector.get(DocDrawingUIController);
    this._injector.get(DocDrawingTransformerController);
    this._injector.get(DocDrawingPrintingController);
  }
  onRendered() {
    this._injector.get(DocDrawingPopupMenuController);
    this._injector.get(DocFloatDomController);
  }
};
__publicField(UniverDocsDrawingUIPlugin, "type", 1 /* UNIVER_DOC */);
__publicField(UniverDocsDrawingUIPlugin, "pluginName", "DOC_DRAWING_UI_PLUGIN");
__publicField(UniverDocsDrawingUIPlugin, "packageName", package_default.name);
__publicField(UniverDocsDrawingUIPlugin, "version", package_default.version);
UniverDocsDrawingUIPlugin = __decorateClass([
  DependentOn(UniverDrawingUIPlugin, UniverDrawingPlugin, UniverDocsDrawingPlugin, UniverUIPlugin),
  __decorateParam(1, Inject(Injector)),
  __decorateParam(2, IRenderManagerService),
  __decorateParam(3, IConfigService)
], UniverDocsDrawingUIPlugin);

export {
  InsertDocImageCommand,
  DocFloatDomController,
  UniverDocsDrawingUIPlugin
};
