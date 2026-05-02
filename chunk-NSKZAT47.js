import {
  DocFloatDomController
} from "./chunk-THXVG335.js";
import {
  WATERMARK_IMAGE_ALLOW_IMAGE_LIST,
  WatermarkImageBaseConfig,
  WatermarkService,
  WatermarkTextBaseConfig
} from "./chunk-MOHJC2BO.js";
import {
  SheetCanvasFloatDomManagerService
} from "./chunk-MLFBVVME.js";
import {
  DEFAULT_WORKBOOK_DATA_DEMO,
  DEFAULT_WORKBOOK_DATA_DEMO_DEFAULT_STYLE
} from "./chunk-YLOR7Z6Y.js";
import {
  BoldIcon,
  Button,
  Checkbox,
  ColorPicker,
  ComponentManager,
  Dropdown,
  DropdownMenu,
  FontColorDoubleIcon,
  IClipboardInterfaceService,
  IDialogService,
  ILocalFileService,
  IMenuManagerService,
  IMessageService,
  INotificationService,
  ISidebarService,
  IUIPartsService,
  Input,
  InputNumber,
  ItalicIcon,
  Select,
  borderClassName,
  clsx,
  connectInjector,
  require_jsx_runtime,
  require_react,
  useDependency,
  useObservable
} from "./chunk-NW5FEDQC.js";
import {
  SheetsSelectionsService,
  WorkbookEditablePermission,
  WorkbookManageCollaboratorPermission,
  WorksheetEditPermission,
  getSheetCommandTarget
} from "./chunk-JGEZE7BC.js";
import {
  IRenderManagerService,
  UNIVER_WATERMARK_STORAGE_KEY,
  ptToPixel
} from "./chunk-VYDPVHQH.js";
import {
  Disposable,
  ICommandService,
  IConfigService,
  IConfirmService,
  ILocalStorageService,
  ILogService,
  IPermissionService,
  IResourceLoaderService,
  IUniverInstanceService,
  Inject,
  Injector,
  LifecycleService,
  LocaleService,
  ObjectMatrix,
  Observable,
  Plugin,
  Range,
  RxDisposable,
  ThemeService,
  UserManagerService,
  awaitTime,
  createDefaultUser,
  default_default,
  distinctUntilChanged,
  filter,
  green_default,
  merge_default,
  registerDependencies,
  take,
  takeUntil,
  touchDependencies
} from "./chunk-UI3TUZSE.js";
import {
  __decorateClass,
  __decorateParam,
  __publicField,
  __toESM
} from "./chunk-24OICD5T.js";

// ../common/debugger/package.json
var package_default = {
  name: "@univerjs/debugger",
  version: "0.21.1",
  private: true,
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
    "./*": "./src/*"
  },
  main: "./src/index.ts",
  scripts: {
    typecheck: "tsc --noEmit"
  },
  peerDependencies: {
    react: "^16.9.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc",
    rxjs: ">=7.0.0"
  },
  dependencies: {
    "@univerjs/core": "workspace:*",
    "@univerjs/design": "workspace:*",
    "@univerjs/docs-drawing-ui": "workspace:*",
    "@univerjs/engine-render": "workspace:*",
    "@univerjs/icons": "^1.1.1",
    "@univerjs/mockdata": "workspace:*",
    "@univerjs/sheets": "workspace:*",
    "@univerjs/sheets-drawing-ui": "workspace:*",
    "@univerjs/themes": "workspace:*",
    "@univerjs/ui": "workspace:*",
    "@univerjs/watermark": "workspace:*"
  },
  devDependencies: {
    "@univerjs-infra/shared": "workspace:*",
    postcss: "^8.5.10",
    react: "18.3.1",
    rxjs: "^7.8.2",
    tailwindcss: "3.4.18",
    typescript: "^6.0.2",
    vue: "^3.5.32"
  }
};

// ../common/debugger/src/config/config.ts
var DEBUGGER_PLUGIN_CONFIG_KEY = "debugger.config";
var configSymbol = Symbol(DEBUGGER_PLUGIN_CONFIG_KEY);
var defaultPluginConfig = {
  fab: true,
  fabEntryUnitType: 2 /* UNIVER_SHEET */,
  performanceMonitor: {
    enabled: true
  }
};

// ../common/debugger/src/components/FloatButton.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var FloatButton = () => {
  const divStyle = {
    width: "100px",
    height: "30px",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  };
  const clickHandler = () => {
    console.warn("click");
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: divStyle, onClick: clickHandler, children: "FloatButton" });
};
var AIButton = () => {
  const divStyle = {
    width: "80px",
    height: "50px",
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: "25px",
    border: "none",
    color: "white",
    cursor: "pointer",
    transition: "all 0.3s ease",
    background: "linear-gradient(90deg, #00C9FF 0%, #92FE9D 50%, #00C9FF 100%)",
    backgroundSize: "200% auto",
    animation: "gradient 3s linear infinite",
    ":hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 10px 20px rgba(0, 201, 255, 0.3)"
    }
  };
  const clickHandler = () => {
    console.warn("click");
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { type: "button", style: divStyle, onClick: clickHandler, children: [
    "AI",
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
                    @keyframes gradient {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }

                    button:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 10px 20px rgba(0, 201, 255, 0.3);
                    }
                ` })
  ] });
};

// ../common/debugger/src/components/Image.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var image = "data:image/jpeg;base64,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";
var ImageDemo = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { className: "univer-size-full", draggable: false, src: image });
};

// ../common/debugger/src/components/RangeLoading.tsx
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var RangeLoading = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "div",
    {
      className: clsx(`univer-flex univer-size-full univer-origin-top-left univer-items-center univer-justify-center univer-bg-white dark:!univer-bg-gray-900`, borderClassName),
      children: "Loading..."
    }
  );
};

// ../common/debugger/src/views/use-cell-content.ts
function useCellContent(fabEntryUnitType) {
  const logService = useDependency(ILogService);
  const selectionManagerService = fabEntryUnitType === 2 /* UNIVER_SHEET */ ? useDependency(SheetsSelectionsService) : null;
  const univerInstanceService = useDependency(IUniverInstanceService);
  const onSelect = () => {
    if (!selectionManagerService) return;
    const selections = selectionManagerService.getCurrentSelections();
    const target = getSheetCommandTarget(univerInstanceService);
    const matrix = new ObjectMatrix();
    selections.forEach((selection) => {
      Range.foreach(selection.range, (row, col) => {
        matrix.setValue(row, col, target == null ? void 0 : target.worksheet.getCell(row, col));
      });
    });
    logService.debug("cell-content", matrix);
  };
  return {
    type: "item",
    children: "\u{1F5D2}\uFE0F Console cell content",
    onSelect
  };
}

// ../common/debugger/src/views/use-dark-mode.ts
var import_react = __toESM(require_react());
function useDarkMode() {
  const themeService = useDependency(ThemeService);
  (0, import_react.useEffect)(() => {
    const darkMode = localStorage.getItem("local.darkMode");
    if (darkMode === "dark") {
      document.documentElement.classList.add("univer-dark");
      themeService.setDarkMode(true);
    } else if (darkMode === "system") {
      themeService.setDarkMode(false);
    }
  }, []);
  const onSelect = () => {
    const darkMode = themeService.darkMode ? "light" : "dark";
    themeService.setDarkMode(darkMode === "dark");
    localStorage.setItem("local.darkMode", darkMode);
  };
  return {
    type: "item",
    children: "\u{1F313} Toggle dark mode",
    onSelect
  };
}

// ../common/debugger/src/views/use-dialog.ts
var menu = [
  {
    label: "Open dialog",
    value: "dialog"
  },
  {
    label: "Draggable dialog",
    value: "draggable"
  },
  {
    label: "Open confirm",
    value: "confirm"
  }
];
function useDialog() {
  const dialogService = useDependency(IDialogService);
  const confirmService = useDependency(IConfirmService);
  const onSelect = (value) => {
    if (value === "draggable") {
      dialogService.open({
        id: "draggable",
        children: { title: "Draggable Dialog Content" },
        title: { title: "Draggable Dialog" },
        draggable: true,
        destroyOnClose: true,
        preservePositionOnDestroy: true,
        width: 350,
        onClose() {
        },
        onOpenChange(open) {
          if (!open) {
            dialogService.close("draggable");
          }
        }
      });
    } else if (value === "dialog") {
      dialogService.open({
        id: "dialog1",
        children: { title: "Dialog Content" },
        footer: { title: "Dialog Footer" },
        title: { title: "Dialog Title" },
        draggable: false,
        onClose() {
        },
        onOpenChange(open) {
          if (!open) {
            dialogService.close("dialog1");
          }
        }
      });
    } else if (value === "confirm") {
      confirmService.open({
        id: "confirm1",
        children: { title: "Confirm Content" },
        title: { title: "Confirm Title" },
        confirmText: "hello",
        cancelText: "world",
        onClose() {
          confirmService.close("confirm1");
        }
      });
      confirmService.open({
        id: "confirm2",
        children: { title: "Confirm2 Content" },
        title: { title: "Confirm2 Title" },
        onClose() {
          confirmService.close("confirm2");
        }
      });
    }
  };
  return {
    type: "subItem",
    children: "\u{1F4AC} Dialog & Confirm",
    options: menu.map((item) => ({
      type: "item",
      children: item.label,
      onSelect: () => onSelect(item.value)
    }))
  };
}

// ../common/debugger/src/views/use-dispose.ts
var menu2 = [
  {
    label: "Dispose Univer",
    value: "univer"
  },
  {
    label: "Dispose current unit",
    value: "unit"
  }
];
function useDispose() {
  const univerInstanceService = useDependency(IUniverInstanceService);
  const onSelect = (value) => {
    var _a;
    if (value === "univer") {
      (_a = window.univer) == null ? void 0 : _a.dispose();
      window.univer = void 0;
      window.univerAPI = void 0;
    } else if (value === "unit") {
      const focused = univerInstanceService.getFocusedUnit();
      if (!focused) return false;
      return univerInstanceService.disposeUnit(focused.getUnitId());
    }
  };
  return {
    type: "subItem",
    children: "\u{1F5D1}\uFE0F Dispose",
    options: menu2.map((item) => ({
      type: "item",
      children: item.label,
      onSelect: () => onSelect(item.value)
    }))
  };
}

// ../common/debugger/src/views/use-editable.ts
var menu3 = [
  {
    label: "Change workbook editable",
    value: "univer"
  },
  {
    label: "Change worksheet editable",
    value: "sheet"
  }
];
function useEditable() {
  const univerInstanceService = useDependency(IUniverInstanceService);
  const permissionService = useDependency(IPermissionService);
  const onSelect = (value) => {
    const target = getSheetCommandTarget(univerInstanceService);
    if (!target) {
      return false;
    }
    const { workbook, worksheet, unitId, subUnitId } = target;
    if (!workbook || !worksheet) {
      return false;
    }
    if (value === "sheet") {
      const editable = permissionService.getPermissionPoint(new WorksheetEditPermission(unitId, subUnitId).id);
      permissionService.updatePermissionPoint(new WorksheetEditPermission(unitId, subUnitId).id, !editable);
    } else {
      const unitId2 = workbook.getUnitId();
      const editable = permissionService.getPermissionPoint(new WorkbookEditablePermission(unitId2).id);
      permissionService.updatePermissionPoint(new WorkbookEditablePermission(unitId2).id, !editable);
    }
  };
  return {
    type: "subItem",
    children: "\u270D\uFE0F Editable",
    options: menu3.map((item) => ({
      type: "item",
      children: item.label,
      onSelect: () => onSelect(item.value)
    }))
  };
}

// ../common/debugger/src/views/use-floating-dom.ts
function useFloatingDom(entryUnitType) {
  const univerInstanceService = useDependency(IUniverInstanceService);
  const floatDomService = entryUnitType === 2 /* UNIVER_SHEET */ ? useDependency(SheetCanvasFloatDomManagerService) : null;
  const floatDomController = entryUnitType === 1 /* UNIVER_DOC */ ? useDependency(DocFloatDomController) : null;
  const onSelect = () => {
    if (entryUnitType === 2 /* UNIVER_SHEET */) {
      const currentSheet = univerInstanceService.getCurrentUnitOfType(2 /* UNIVER_SHEET */);
      if (!currentSheet) return;
      floatDomService == null ? void 0 : floatDomService.addFloatDomToPosition({
        allowTransform: true,
        initPosition: {
          startX: 200,
          endX: 400,
          startY: 200,
          endY: 400
        },
        componentKey: "ImageDemo",
        data: {
          aa: "128"
        }
      });
    } else if (entryUnitType === 1 /* UNIVER_DOC */) {
      const currentDoc = univerInstanceService.getCurrentUnitOfType(1 /* UNIVER_DOC */);
      if (!currentDoc) return;
      floatDomController == null ? void 0 : floatDomController.insertFloatDom({
        allowTransform: true,
        componentKey: "ImageDemo",
        data: {
          aa: "128"
        }
      }, {
        height: 300
      });
    }
  };
  return {
    type: "item",
    children: "\u2601\uFE0F Create floating DOM",
    onSelect
  };
}

// ../common/debugger/src/views/use-locale.ts
var import_react2 = __toESM(require_react());
var locales = [
  {
    label: "English",
    value: "enUS" /* EN_US */
  },
  {
    label: "Fran\xE7ais",
    value: "frFR" /* FR_FR */
  },
  {
    label: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439",
    value: "ruRU" /* RU_RU */
  },
  {
    label: "Ti\u1EBFng Vi\u1EC7t",
    value: "viVN" /* VI_VN */
  },
  {
    label: "\u0641\u0627\u0631\u0633\u06CC",
    value: "faIR" /* FA_IR */
  },
  {
    label: "Espa\xF1ol",
    value: "esES" /* ES_ES */
  },
  {
    label: "Catal\xE0",
    value: "caES" /* CA_ES */
  },
  {
    label: "Sloven\u010Dina",
    value: "skSK" /* SK_SK */
  },
  {
    label: "\u7B80\u4F53\u4E2D\u6587",
    value: "zhCN" /* ZH_CN */
  },
  {
    label: "\u7E41\u9AD4\u4E2D\u6587",
    value: "zhTW" /* ZH_TW */
  },
  {
    label: "\u65E5\u672C\u8A9E",
    value: "jaJP" /* JA_JP */
  },
  {
    label: "\uD55C\uAD6D\uC5B4",
    value: "koKR" /* KO_KR */
  }
];
function useLocale() {
  const localeService = useDependency(LocaleService);
  async function loadLocales(value) {
    let locales2;
    switch (value) {
      case "zhCN" /* ZH_CN */:
        locales2 = await import("./zh-CN-S5K4PJPW.js");
        break;
      case "zhTW" /* ZH_TW */:
        locales2 = await import("./zh-TW-IQV74WRJ.js");
        break;
      case "frFR" /* FR_FR */:
        locales2 = await import("./fr-FR-U7V5BRNG.js");
        break;
      case "ruRU" /* RU_RU */:
        locales2 = await import("./ru-RU-YQTELATA.js");
        break;
      case "viVN" /* VI_VN */:
        locales2 = await import("./vi-VN-RSCWYKPA.js");
        break;
      case "jaJP" /* JA_JP */:
        locales2 = await import("./ja-JP-OS6A46VL.js");
        break;
      case "faIR" /* FA_IR */:
        locales2 = await import("./fa-IR-Z6AZFWHF.js");
        break;
      case "koKR" /* KO_KR */:
        locales2 = await import("./ko-KR-SBG2UNN6.js");
        break;
      case "esES" /* ES_ES */:
        locales2 = await import("./es-ES-SOG7O7WR.js");
        break;
      case "caES" /* CA_ES */:
        locales2 = await import("./ca-ES-6LL4BJUZ.js");
        break;
      case "skSK" /* SK_SK */:
        locales2 = await import("./sk-SK-DO3YEWTX.js");
        break;
      case "enUS" /* EN_US */:
      default:
        locales2 = await import("./en-US-FHEZAKAD.js");
        break;
    }
    localeService.load({
      [value]: locales2.default
    });
  }
  (0, import_react2.useEffect)(() => {
    const locale = localStorage.getItem("local.locale");
    if (locale) {
      loadLocales(locale).then(() => {
        localeService.setLocale(locale);
      });
    }
  }, []);
  const onSelect = async (value) => {
    await loadLocales(value);
    localeService.setLocale(value);
    localStorage.setItem("local.locale", value);
  };
  return {
    type: "subItem",
    children: "\u{1F310} Languages",
    options: locales.map((lang) => ({
      type: "radio",
      value: localeService.getCurrentLocale(),
      options: [{
        label: lang.label,
        value: lang.value
      }],
      onSelect
    }))
  };
}

// ../common/debugger/src/views/use-message.ts
var menu4 = [
  {
    label: "Open message",
    value: ""
  },
  {
    label: "Open loading message",
    value: "loading"
  }
];
function useMessage() {
  const messageService = useDependency(IMessageService);
  const onSelect = (value) => {
    if (value === "loading") {
      messageService.show({
        type: "loading" /* Loading */,
        content: "Loading message",
        duration: 3e3
      });
    } else {
      messageService.show({
        type: "success" /* Success */,
        content: "Demo message",
        duration: 1500
      });
    }
  };
  return {
    type: "subItem",
    children: "\u2709\uFE0F Message",
    options: menu4.map((item) => ({
      type: "item",
      children: item.label,
      onSelect: () => onSelect(item.value)
    }))
  };
}

// ../common/debugger/src/views/use-notification.ts
var menu5 = [
  {
    label: "Notification success",
    value: "success"
  },
  {
    label: "Notification info",
    value: "info"
  },
  {
    label: "Notification warning",
    value: "warning"
  },
  {
    label: "Notification error",
    value: "error"
  }
];
function useNotification() {
  const notificationService = useDependency(INotificationService);
  const onSelect = (value) => {
    notificationService.show({
      type: value,
      content: "Lorem Ipusm dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      title: "Notification Title"
    });
  };
  return {
    type: "subItem",
    children: "\u{1F514} Notification",
    options: menu5.map((item) => ({
      type: "item",
      children: item.label,
      onSelect: () => onSelect(item.value)
    }))
  };
}

// ../common/debugger/src/views/use-rtl.ts
var import_react3 = __toESM(require_react());
function applyDirection(value) {
  document.documentElement.setAttribute("dir", value);
}
function useRTL() {
  (0, import_react3.useEffect)(() => {
    const dir = localStorage.getItem("local.direction");
    if (dir === "rtl" || dir === "ltr") {
      applyDirection(dir);
    }
  }, []);
  const onSelect = () => {
    const current = document.documentElement.getAttribute("dir");
    const nextDirection = current === "rtl" ? "ltr" : "rtl";
    applyDirection(nextDirection);
    localStorage.setItem("local.direction", nextDirection);
  };
  return {
    type: "item",
    children: "\u2194\uFE0F Toggle RTL",
    onSelect
  };
}

// ../common/debugger/src/views/test-editor/component-name.ts
var TEST_EDITOR_CONTAINER_COMPONENT = "TestEditorContainer";

// ../common/debugger/src/views/use-sidebar.ts
var menu6 = [
  {
    label: "Open sidebar",
    value: "open"
  },
  {
    label: "Close sidebar",
    value: "close"
  }
];
function useSidebar() {
  const sidebarService = useDependency(ISidebarService);
  const onSelect = (value) => {
    if (value === "open") {
      sidebarService.open({
        header: { title: "Sidebar title" },
        children: { label: TEST_EDITOR_CONTAINER_COMPONENT },
        footer: { title: "Sidebar Footer" },
        onClose: () => {
        }
      });
    } else if (value === "close") {
      sidebarService.close();
    }
  };
  return {
    type: "subItem",
    children: "\u{1F9E9} Sidebar",
    options: menu6.map((item) => ({
      type: "item",
      children: item.label,
      onSelect: () => onSelect(item.value)
    }))
  };
}

// ../common/debugger/src/controllers/local-save/record.controller.ts
var RecordController = class {
  constructor(_commandService) {
    __publicField(this, "_commandService", _commandService);
  }
  record() {
    return new Observable((subscribe) => {
      navigator.mediaDevices.getDisplayMedia({ video: true }).then((stream) => {
        subscribe.next({ type: "start" });
        const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9") ? "video/webm; codecs=vp9" : "video/webm";
        const mediaRecorder = new MediaRecorder(stream, { mimeType: mime });
        const chunks = [];
        mediaRecorder.addEventListener("dataavailable", function(e) {
          chunks.push(e.data);
        });
        mediaRecorder.addEventListener("stop", function() {
          const blob = new Blob(chunks, { type: chunks[0].type });
          subscribe.next({ type: "finish", data: blob });
          subscribe.complete();
        });
        mediaRecorder.start();
      });
    });
  }
  startSaveCommands() {
    const result = [];
    const startTime = performance.now();
    const disposable = this._commandService.beforeCommandExecuted((commandInfo) => {
      try {
        result.push([
          String((performance.now() - startTime) / 1e3),
          commandInfo.id,
          String(commandInfo.type || 0 /* COMMAND */),
          JSON.stringify(commandInfo.params || "")
        ]);
      } catch (err) {
        console.error(`${commandInfo.id}  unable to serialize`);
        console.error(err);
      }
    });
    return () => {
      disposable.dispose();
      return result;
    };
  }
};
RecordController = __decorateClass([
  __decorateParam(0, Inject(ICommandService))
], RecordController);

// ../common/debugger/src/views/use-snapshot.ts
var menu7 = [
  {
    label: "Save workbook",
    value: "workbook"
  },
  {
    label: "Save worksheet",
    value: "sheet"
  },
  {
    label: "Record",
    value: "record"
  },
  {
    label: "Load snapshot",
    value: "load"
  }
];
var filterStyle = (workbookData) => {
  const sheets = workbookData.sheets;
  const cacheStyle = {};
  Object.keys(sheets).forEach((sheetId) => {
    const sheet = sheets[sheetId];
    new ObjectMatrix(sheet.cellData).forValue((_r, _c, value) => {
      const s = value == null ? void 0 : value.s;
      if (s && typeof s === "string") {
        const style = workbookData.styles[s];
        if (style) {
          cacheStyle[s] = style;
        }
      }
    });
  });
  workbookData.styles = cacheStyle;
  return workbookData;
};
function useSnapshot() {
  const univerInstanceService = useDependency(IUniverInstanceService);
  const resourceLoaderService = useDependency(IResourceLoaderService);
  const localFileService = useDependency(ILocalFileService);
  const recordController = useDependency(RecordController);
  const onSelect = async (value) => {
    const preName = (/* @__PURE__ */ new Date()).toLocaleString();
    const workbook = univerInstanceService.getCurrentUnitOfType(2 /* UNIVER_SHEET */);
    if (!workbook) {
      const doc = univerInstanceService.getCurrentUnitOfType(1 /* UNIVER_DOC */);
      const snapshot2 = resourceLoaderService.saveUnit(doc.getUnitId());
      if (true) {
        const gitHash = "c4f3ce5";
        const gitBranch = "dev";
        const buildTime = "2026-05-02T03:01:56.174Z";
        snapshot2.__env__ = { gitHash, gitBranch, buildTime };
      }
      const text = JSON.stringify(snapshot2, null, 2);
      localFileService.downloadFile(new Blob([text]), `${preName} snapshot.json`);
      return true;
    }
    const worksheet = workbook.getActiveSheet();
    if (!worksheet) {
      return false;
    }
    const snapshot = resourceLoaderService.saveUnit(workbook.getUnitId());
    if (true) {
      const gitHash = "c4f3ce5";
      const gitBranch = "dev";
      const buildTime = "2026-05-02T03:01:56.174Z";
      snapshot.__env__ = { gitHash, gitBranch, buildTime };
    }
    if (value === "sheet") {
      const sheetId = worksheet.getSheetId();
      const sheet = snapshot.sheets[sheetId];
      snapshot.sheets = { [sheetId]: sheet };
      snapshot.sheetOrder = [sheetId];
      const text = JSON.stringify(filterStyle(snapshot), null, 2);
      localFileService.downloadFile(new Blob([text]), `${preName} snapshot.json`);
    } else if (value === "workbook") {
      const text = JSON.stringify(filterStyle(snapshot), null, 2);
      localFileService.downloadFile(new Blob([text]), `${preName} snapshot.json`);
    } else if (value === "record") {
      let endCommands = () => [];
      recordController.record().subscribe((v) => {
        if (v.type === "start") {
          endCommands = recordController.startSaveCommands();
        }
        if (v.type === "finish") {
          const commands = endCommands();
          localFileService.downloadFile(v.data, `${preName} video.webm`);
          localFileService.downloadFile(new Blob([JSON.stringify(commands, null, 2)]), `${preName} commands.json`);
        }
      });
    } else if (value === "load") {
      const snapshotFile = await localFileService.openFile({ multiple: false, accept: ".json" });
      if (snapshotFile.length !== 1) return false;
      const text = await snapshotFile[0].text();
      univerInstanceService.createUnit(2 /* UNIVER_SHEET */, JSON.parse(text));
      return true;
    }
  };
  return {
    type: "subItem",
    children: "\u{1F4F7} Snapshot",
    options: menu7.map((item) => ({
      type: "item",
      children: item.label,
      onSelect: () => onSelect(item.value)
    }))
  };
}

// ../common/debugger/src/views/use-theme.ts
var import_react4 = __toESM(require_react());
var themes = [
  {
    label: "\u{1F7E2}",
    value: green_default
  },
  {
    label: "\u{1F535}",
    value: default_default
  }
];
function useTheme() {
  const themeService = useDependency(ThemeService);
  (0, import_react4.useEffect)(() => {
    const themeKey = localStorage.getItem("local.theme");
    const theme = themes.find((theme2) => theme2.label === themeKey);
    if (theme) {
      themeService.setTheme(theme.value);
    }
  }, []);
  const onSelect = (value) => {
    localStorage.setItem("local.theme", value);
    const theme = themes.find((theme2) => theme2.label === value);
    if (theme) {
      themeService.setTheme(theme.value);
    }
  };
  return {
    type: "subItem",
    children: "\u{1F3A8} Themes",
    options: themes.map((theme) => ({
      type: "item",
      children: theme.label,
      onSelect: () => onSelect(theme.label)
    }))
  };
}

// ../common/debugger/src/views/use-units.ts
var import_react5 = __toESM(require_react());
var defaultMenu = [
  {
    label: "Create another sheet",
    value: "create"
  }
];
function useUnits() {
  const univerInstanceService = useDependency(IUniverInstanceService);
  const [menu9, setMenu] = (0, import_react5.useState)([...defaultMenu]);
  const unitAdded = useObservable(univerInstanceService.unitAdded$);
  const unitDisposed = useObservable(univerInstanceService.unitDisposed$);
  (0, import_react5.useEffect)(() => {
    const sheets = univerInstanceService.getAllUnitsForType(2 /* UNIVER_SHEET */);
    const options = sheets.map((sheet) => ({
      label: sheet.getName() || sheet.getUnitId(),
      value: sheet.getUnitId()
    }));
    setMenu([
      ...defaultMenu,
      ...options
    ]);
  }, [unitAdded, unitDisposed]);
  const onSelect = (value) => {
    if (value === "create") {
      univerInstanceService.createUnit(2 /* UNIVER_SHEET */, {});
    } else {
      if (!univerInstanceService.getUnit(value)) return false;
      univerInstanceService.setCurrentUnitForType(value);
    }
  };
  return {
    type: "subItem",
    children: "\u{1FAB8} Units",
    options: menu9.map((item) => ({
      type: "item",
      children: item.label,
      onSelect: () => onSelect(item.value)
    }))
  };
}

// ../common/debugger/src/views/use-user.ts
var menu8 = [
  {
    label: "Owner",
    value: 2 /* Owner */
  },
  {
    label: "Editor",
    value: 1 /* Editor */
  },
  {
    label: "Reader",
    value: 0 /* Reader */
  }
];
function useUser() {
  const univerInstanceService = useDependency(IUniverInstanceService);
  const userManagerService = useDependency(UserManagerService);
  const permissionService = useDependency(IPermissionService);
  const onSelect = (value) => {
    userManagerService.setCurrentUser(createDefaultUser(value));
    const workbook = univerInstanceService.getCurrentUnitOfType(2 /* UNIVER_SHEET */);
    const unitId = workbook.getUnitId();
    if (value === 2 /* Owner */) {
      permissionService.updatePermissionPoint(new WorkbookManageCollaboratorPermission(unitId).id, true);
    } else {
      permissionService.updatePermissionPoint(new WorkbookManageCollaboratorPermission(unitId).id, false);
    }
  };
  return {
    type: "subItem",
    children: "\u{1F465} Change user's role",
    options: menu8.map((item) => ({
      type: "item",
      children: item.label,
      onSelect: () => onSelect(item.value)
    }))
  };
}

// ../common/debugger/src/views/watermark/WatermarkPanel.tsx
var import_react6 = __toESM(require_react());

// ../common/debugger/src/views/watermark/WatermarkImageSetting.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
function WatermarkImageSetting({ config, onChange }) {
  const fileOpenService = useDependency(ILocalFileService);
  if (!config) return null;
  const handleUpdateImageUrl = async () => {
    const files = await fileOpenService.openFile({
      multiple: false,
      accept: WATERMARK_IMAGE_ALLOW_IMAGE_LIST.map((image2) => `.${image2.replace("image/", "")}`).join(",")
    });
    const fileLength = files.length;
    if (fileLength === 0) {
      return false;
    }
    const file = files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
      var _a;
      if ((_a = event.target) == null ? void 0 : _a.result) {
        const base64String = event.target.result;
        const img = new Image();
        img.onload = function() {
          onChange({ ...config, url: base64String, width: Math.max(20, img.width), height: Math.max(img.height, 20), originRatio: img.width / img.height });
        };
        img.src = base64String;
      }
    };
    reader.readAsDataURL(file);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "univer-grid univer-gap-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "univer-text-gray-400", children: "Image" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "univer-mb-4 univer-grid univer-gap-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        Button,
        {
          className: "univer-mb-2",
          onClick: handleUpdateImageUrl,
          children: config.url ? "Replace Image" : "Upload Image"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "univer-flex univer-gap-2 univer-text-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "univer-grid univer-flex-1 univer-gap-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { children: "Opacity" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            InputNumber,
            {
              className: "univer-box-border univer-h-7",
              value: config.opacity,
              max: 1,
              min: 0,
              step: 0.05,
              onChange: (val) => {
                if (val != null) {
                  onChange({ ...config, opacity: Number.parseFloat(val.toString()) });
                }
              }
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "univer-grid univer-flex-1 univer-gap-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { children: "Keep Ratio" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            Checkbox,
            {
              className: "univer-justify-center univer-self-baseline",
              checked: config.maintainAspectRatio,
              onChange: (val) => {
                if (val === true) {
                  onChange({ ...config, maintainAspectRatio: val, height: Math.round(config.width / config.originRatio) });
                } else {
                  onChange({ ...config, maintainAspectRatio: val });
                }
              }
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "univer-grid univer-gap-2 univer-text-center", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "univer-flex univer-gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "univer-grid univer-flex-1 univer-gap-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { children: "Width" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          InputNumber,
          {
            className: "univer-box-border univer-h-7",
            value: config.width,
            min: 20,
            onChange: (val) => {
              if (val != null) {
                const newWidth = Math.max(20, Number.parseInt(val.toString()));
                if (config.maintainAspectRatio) {
                  onChange({ ...config, width: newWidth, height: Math.round(newWidth / config.originRatio) });
                } else {
                  onChange({ ...config, width: newWidth });
                }
              }
            }
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "univer-grid univer-flex-1 univer-gap-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { children: "Height" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          InputNumber,
          {
            className: "univer-box-border univer-h-7",
            value: config.height,
            min: 20,
            onChange: (val) => {
              if (val != null) {
                const newHeight = Math.max(20, Number.parseInt(val.toString()));
                if (config.maintainAspectRatio) {
                  onChange({ ...config, height: newHeight, width: Math.round(newHeight * config.originRatio) });
                } else {
                  onChange({ ...config, height: Number.parseInt(val.toString()) });
                }
              }
            }
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "univer-text-gray-400", children: "Layout Settings" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "univer-grid univer-gap-2 univer-text-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "univer-flex univer-gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "univer-grid univer-flex-1 univer-gap-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { children: "Rotate" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            InputNumber,
            {
              className: "univer-box-border univer-h-7",
              value: config.rotate,
              max: 360,
              min: -360,
              onChange: (val) => {
                if (val != null) {
                  onChange({ ...config, rotate: Number.parseInt(val.toString()) });
                }
              }
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "univer-grid univer-flex-1 univer-gap-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { children: "Repeat" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            Checkbox,
            {
              className: "univer-justify-center univer-self-baseline",
              checked: config.repeat,
              onChange: (val) => onChange({ ...config, repeat: val })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "univer-flex univer-gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "univer-grid univer-flex-1 univer-gap-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { children: "Horizontal Spacing" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            InputNumber,
            {
              className: "univer-box-border univer-h-7",
              value: config.spacingX,
              min: 0,
              onChange: (val) => {
                if (val != null) {
                  onChange({ ...config, spacingX: Number.parseInt(val.toString()) });
                }
              }
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "univer-grid univer-flex-1 univer-gap-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { children: "Vertical Spacing" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            InputNumber,
            {
              className: "univer-box-border univer-h-7",
              value: config.spacingY,
              min: 0,
              onChange: (val) => {
                if (val != null) {
                  onChange({ ...config, spacingY: Number.parseInt(val.toString()) });
                }
              }
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "univer-flex univer-gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "univer-grid univer-flex-1 univer-gap-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { children: "Horizontal Start Position" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            InputNumber,
            {
              className: "univer-box-border univer-h-7",
              value: config.x,
              min: 0,
              onChange: (val) => {
                if (val != null) {
                  onChange({ ...config, x: Number.parseInt(val.toString()) });
                }
              }
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "univer-grid univer-flex-1 univer-gap-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { children: "Vertical Start Position" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            InputNumber,
            {
              className: "univer-box-border univer-h-7",
              value: config.y,
              min: 0,
              onChange: (val) => {
                if (val != null) {
                  onChange({ ...config, y: Number.parseInt(val.toString()) });
                }
              }
            }
          )
        ] })
      ] })
    ] })
  ] });
}

// ../common/debugger/src/views/watermark/WatermarkTextSetting.tsx
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
function WatermarkTextSetting(props) {
  var _a;
  const { config, onChange } = props;
  if (!config) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "univer-grid univer-gap-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "univer-text-gray-400", children: "Style Settings" }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "univer-mb-4 univer-grid univer-gap-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { children: "Content" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        Input,
        {
          value: config.content,
          onChange: (val) => onChange({ ...config, content: val }),
          placeholder: "Enter text"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "univer-grid univer-gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "univer-flex univer-gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "univer-grid univer-gap-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { children: "Font Size" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            InputNumber,
            {
              value: config.fontSize,
              max: 72,
              min: 12,
              onChange: (val) => {
                if (val != null) {
                  onChange({ ...config, fontSize: Number.parseInt(val.toString()) });
                }
              }
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "univer-grid univer-gap-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { children: "Direction" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            Select,
            {
              value: config.direction,
              options: [
                { label: "Left to Right", value: "ltr" },
                { label: "Right to Left", value: "rtl" }
              ],
              onChange: (v) => onChange({ ...config, direction: v })
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "univer-grid univer-gap-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { children: "Opacity" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            InputNumber,
            {
              max: 1,
              min: 0,
              step: 0.05,
              value: config.opacity,
              onChange: (val) => {
                if (val != null) {
                  onChange({ ...config, opacity: Number.parseFloat(val.toString()) });
                }
              }
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
        "div",
        {
          className: `univer-flex univer-justify-around univer-gap-4 [&_a]:univer-flex [&_a]:univer-size-6 [&_a]:univer-items-center [&_a]:univer-justify-center [&_a]:univer-rounded`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              Dropdown,
              {
                overlay: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "univer-rounded-lg univer-p-4", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ColorPicker, { value: config.color, onChange: (val) => onChange({ ...config, color: val }) }) }),
                children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                  "a",
                  {
                    className: `hover:univer-bg-gray-100 dark:hover:!univer-bg-gray-700`,
                    children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(FontColorDoubleIcon, { extend: { colorChannel1: (_a = config.color) != null ? _a : "#2c53f1" } })
                  }
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "a",
              {
                className: clsx(`hover:univer-bg-gray-100 dark:hover:!univer-bg-gray-700`, {
                  "univer-bg-gray-200 dark:!univer-bg-gray-600": config.bold
                }),
                onClick: () => {
                  onChange({ ...config, bold: !config.bold });
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(BoldIcon, {})
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "a",
              {
                className: clsx(`hover:univer-bg-gray-100 dark:hover:!univer-bg-gray-700`, {
                  "univer-bg-gray-200 dark:!univer-bg-gray-600": config.italic
                }),
                onClick: () => {
                  onChange({ ...config, italic: !config.italic });
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ItalicIcon, {})
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "univer-text-gray-400", children: "Layout Settings" }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "univer-grid univer-gap-2 univer-text-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "univer-flex univer-gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "univer-grid univer-flex-1 univer-gap-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { children: "Rotate" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            InputNumber,
            {
              value: config.rotate,
              max: 360,
              min: -360,
              onChange: (val) => {
                if (val != null) {
                  onChange({ ...config, rotate: Number.parseInt(val.toString()) });
                }
              }
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "univer-grid univer-flex-1 univer-gap-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { children: "Repeat" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            Checkbox,
            {
              className: "univer-justify-center univer-self-baseline",
              checked: config.repeat,
              onChange: (val) => onChange({ ...config, repeat: val })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "univer-flex univer-gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "univer-grid univer-gap-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { children: "Horizontal Spacing" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            InputNumber,
            {
              value: config.spacingX,
              min: 0,
              onChange: (val) => {
                if (val != null) {
                  onChange({ ...config, spacingX: Number.parseInt(val.toString()) });
                }
              }
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "univer-grid univer-gap-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { children: "Vertical Spacing" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            InputNumber,
            {
              value: config.spacingY,
              min: 0,
              onChange: (val) => {
                if (val != null) {
                  onChange({ ...config, spacingY: Number.parseInt(val.toString()) });
                }
              }
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "univer-flex univer-gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "univer-grid univer-gap-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { children: "Horizontal Start Position" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            InputNumber,
            {
              value: config.x,
              min: 0,
              onChange: (val) => {
                if (val != null) {
                  onChange({ ...config, x: Number.parseInt(val.toString()) });
                }
              }
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "univer-grid univer-gap-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { children: "Vertical Start Position" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            InputNumber,
            {
              value: config.y,
              min: 0,
              onChange: (val) => {
                if (val != null) {
                  onChange({ ...config, y: Number.parseInt(val.toString()) });
                }
              }
            }
          )
        ] })
      ] })
    ] })
  ] });
}

// ../common/debugger/src/views/watermark/WatermarkPanel.tsx
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
function WatermarkPanel() {
  const [watermarkType, setWatermarkType] = (0, import_react6.useState)("text" /* Text */);
  const [config, setConfig] = (0, import_react6.useState)();
  const watermarkService = useDependency(WatermarkService);
  const localStorageService = useDependency(ILocalStorageService);
  const _refresh = useObservable(watermarkService.refresh$);
  function handleConfigChange(config2, type) {
    setConfig(config2);
    watermarkService.updateWatermarkConfig({ type: type != null ? type : watermarkType, config: config2 });
  }
  const getWatermarkConfig = (0, import_react6.useCallback)(async () => {
    const watermarkConfig = await localStorageService.getItem(UNIVER_WATERMARK_STORAGE_KEY);
    if (watermarkConfig) {
      setWatermarkType(watermarkConfig.type);
      setConfig(watermarkConfig.config);
    } else {
      setConfig({ text: WatermarkTextBaseConfig });
    }
  }, []);
  (0, import_react6.useEffect)(() => {
    getWatermarkConfig();
  }, [_refresh, getWatermarkConfig]);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "univer-grid univer-gap-3 univer-text-sm", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "univer-grid univer-gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "univer-text-gray-400", children: "Type" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        Select,
        {
          value: watermarkType,
          options: [
            { label: "Text", value: "text" /* Text */ },
            { label: "Image", value: "image" /* Image */ }
          ],
          onChange: (v) => {
            setWatermarkType(v);
            if (v === "text" /* Text */) {
              handleConfigChange({ text: WatermarkTextBaseConfig }, "text" /* Text */);
            } else if (v === "image" /* Image */) {
              handleConfigChange({ image: WatermarkImageBaseConfig }, "image" /* Image */);
            }
          }
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "univer-grid univer-gap-2", children: [
      watermarkType === "text" /* Text */ && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(WatermarkTextSetting, { config: config == null ? void 0 : config.text, onChange: (v) => handleConfigChange({ text: v }) }),
      watermarkType === "image" /* Image */ && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(WatermarkImageSetting, { config: config == null ? void 0 : config.image, onChange: (v) => handleConfigChange({ image: v }) })
    ] })
  ] });
}

// ../common/debugger/src/views/watermark/WatermarkPanelFooter.tsx
var import_jsx_runtime7 = __toESM(require_jsx_runtime());
function WatermarkPanelFooter() {
  const sidebarService = useDependency(ISidebarService);
  const watermarkService = useDependency(WatermarkService);
  const clipboardService = useDependency(IClipboardInterfaceService);
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "univer-flex univer-items-center univer-justify-between", children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      "a",
      {
        className: "univer-text-sm univer-text-primary-600 univer-underline",
        onClick: () => {
          watermarkService.updateWatermarkConfig({
            type: "text" /* Text */,
            config: { text: WatermarkTextBaseConfig }
          });
          watermarkService.refresh();
        },
        children: "Cancel Watermark"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "univer-flex univer-items-center univer-gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        Button,
        {
          onClick: async () => {
            const watermarkConfig = await watermarkService.getWatermarkConfig();
            let config;
            if ((watermarkConfig == null ? void 0 : watermarkConfig.type) === "text" /* Text */) {
              config = watermarkConfig.config.text;
            } else if ((watermarkConfig == null ? void 0 : watermarkConfig.type) === "image" /* Image */) {
              config = watermarkConfig.config.image;
            }
            clipboardService.writeText(JSON.stringify(config));
          },
          children: "Copy Config"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        Button,
        {
          onClick: async () => {
            var _a, _b;
            const watermarkConfig = await watermarkService.getWatermarkConfig();
            if ((watermarkConfig == null ? void 0 : watermarkConfig.type) === "text" /* Text */ && !((_a = watermarkConfig.config.text) == null ? void 0 : _a.content)) {
              watermarkService.deleteWatermarkConfig();
            } else if ((watermarkConfig == null ? void 0 : watermarkConfig.type) === "image" /* Image */ && !((_b = watermarkConfig.config.image) == null ? void 0 : _b.url)) {
              watermarkService.deleteWatermarkConfig();
            }
            sidebarService.close();
          },
          children: "Close Panel"
        }
      )
    ] })
  ] });
}

// ../common/debugger/src/menu/watermark.menu.controller.ts
var WATERMARK_PANEL = "WATERMARK_PANEL";
var WATERMARK_PANEL_FOOTER = "WATERMARK_PANEL_FOOTER";
var UniverWatermarkMenuController = class extends Disposable {
  constructor(_menuManagerService, _componentManager) {
    super();
    __publicField(this, "_menuManagerService", _menuManagerService);
    __publicField(this, "_componentManager", _componentManager);
    this._initComponents();
  }
  _initComponents() {
    [
      [WATERMARK_PANEL, WatermarkPanel],
      [WATERMARK_PANEL_FOOTER, WatermarkPanelFooter]
    ].forEach(([key, comp]) => {
      this.disposeWithMe(this._componentManager.register(key, comp));
    });
  }
};
UniverWatermarkMenuController = __decorateClass([
  __decorateParam(0, IMenuManagerService),
  __decorateParam(1, Inject(ComponentManager))
], UniverWatermarkMenuController);

// ../common/debugger/src/views/use-watermark.ts
function useWatermark() {
  const sidebarService = useDependency(ISidebarService);
  const onSelect = () => {
    sidebarService.open({
      header: { title: "Watermark" },
      children: { label: WATERMARK_PANEL },
      footer: { label: WATERMARK_PANEL_FOOTER },
      onClose: () => {
      },
      width: 330
    });
  };
  return {
    type: "item",
    children: "\u{1F30A} Watermark Settings",
    onSelect
  };
}

// ../common/debugger/src/views/Fab.tsx
var import_jsx_runtime8 = __toESM(require_jsx_runtime());
function Fab() {
  var _a;
  const configService = useDependency(IConfigService);
  const configs = configService.getConfig(DEBUGGER_PLUGIN_CONFIG_KEY);
  const performanceMonitor = configs == null ? void 0 : configs.performanceMonitor;
  const fabEntryUnitType = configs == null ? void 0 : configs.fabEntryUnitType;
  const locale = useLocale();
  const rtl = useRTL();
  const darkMode = useDarkMode();
  const theme = useTheme();
  const watermark = useWatermark();
  const notification = useNotification();
  const message = useMessage();
  const dialog = useDialog();
  const sidebar = useSidebar();
  const floatingDom = useFloatingDom(fabEntryUnitType);
  const cellContent = useCellContent(fabEntryUnitType);
  const units = useUnits();
  const snapshot = useSnapshot();
  const editable = useEditable();
  const user = useUser();
  const dispose = useDispose();
  const univerInstanceService = useDependency(IUniverInstanceService);
  const unitType = (_a = univerInstanceService.getFocusedUnit()) == null ? void 0 : _a.type;
  if (!unitType) return null;
  const items = [
    locale,
    rtl,
    darkMode,
    theme,
    watermark,
    { type: "separator" },
    notification,
    message,
    dialog,
    sidebar,
    { type: "separator" },
    (fabEntryUnitType === 2 /* UNIVER_SHEET */ || fabEntryUnitType === 1 /* UNIVER_DOC */) && floatingDom,
    fabEntryUnitType === 2 /* UNIVER_SHEET */ && cellContent,
    fabEntryUnitType === 2 /* UNIVER_SHEET */ && units,
    snapshot,
    editable,
    fabEntryUnitType === 2 /* UNIVER_SHEET */ && user,
    dispose
  ].filter((item) => item !== null);
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
    "div",
    {
      "data-u-comp": "debugger-fab",
      className: `univer-fixed univer-bottom-12 univer-right-8 univer-z-[9999] univer-flex univer-select-none univer-flex-col univer-items-center univer-gap-1`,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(DropdownMenu, { align: "end", items, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          "button",
          {
            className: clsx(`univer-flex univer-size-9 univer-cursor-pointer univer-items-center univer-justify-center univer-rounded-full univer-bg-white univer-text-base univer-text-gray-900 univer-shadow univer-outline-none univer-transition-shadow hover:univer-ring-1 hover:univer-ring-primary-400 dark:!univer-bg-gray-900 dark:!univer-text-gray-200`, borderClassName),
            type: "button",
            children: "\u{1F3D7}\uFE0F"
          }
        ) }),
        (performanceMonitor == null ? void 0 : performanceMonitor.enabled) && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { "data-u-comp": "debugger-fps", className: "univer-text-xs univer-text-gray-400" })
      ]
    }
  );
}

// ../common/debugger/src/controllers/debugger.controller.ts
var DebuggerController = class extends Disposable {
  constructor(_injector, _configService, _uiPartsService, _menuManagerService, _componentManager) {
    super();
    __publicField(this, "_injector", _injector);
    __publicField(this, "_configService", _configService);
    __publicField(this, "_uiPartsService", _uiPartsService);
    __publicField(this, "_menuManagerService", _menuManagerService);
    __publicField(this, "_componentManager", _componentManager);
    this._initCustomComponents();
    this._injector.add([RecordController]);
  }
  _initCustomComponents() {
    [
      ["ImageDemo", ImageDemo],
      ["RangeLoading", RangeLoading],
      ["FloatButton", FloatButton],
      ["AIButton", AIButton]
    ].forEach(([key, comp]) => {
      this.disposeWithMe(
        this._componentManager.register(key, comp)
      );
    });
    const configs = this._configService.getConfig(DEBUGGER_PLUGIN_CONFIG_KEY);
    if (configs == null ? void 0 : configs.fab) {
      this.disposeWithMe(
        this._uiPartsService.registerComponent("global" /* GLOBAL */, () => connectInjector(Fab, this._injector))
      );
    }
  }
};
DebuggerController = __decorateClass([
  __decorateParam(0, Inject(Injector)),
  __decorateParam(1, IConfigService),
  __decorateParam(2, IUIPartsService),
  __decorateParam(3, IMenuManagerService),
  __decorateParam(4, Inject(ComponentManager))
], DebuggerController);

// ../common/debugger/src/controllers/e2e/data/default-doc.ts
function getDefaultDocData() {
  const DEFAULT_DOCUMENT_DATA_CN = {
    id: "d",
    tableSource: {},
    drawings: {},
    drawingsOrder: [],
    headers: {},
    footers: {},
    body: {
      dataStream: "\u8377\u5858\u6708\u8272\r\r\u4F5C\u8005\uFF1A\u6731\u81EA\u6E05\r\r\u8FD9\u51E0\u5929\u5FC3\u91CC\u9887\u4E0D\u5B81\u9759\u3002\u4ECA\u665A\u5728\u9662\u5B50\u91CC\u5750\u7740\u4E58\u51C9\uFF0C\u5FFD\u7136\u60F3\u8D77\u65E5\u65E5\u8D70\u8FC7\u7684\u8377\u5858\uFF0C\u5728\u8FD9\u6EE1\u6708\u7684\u5149\u91CC\uFF0C\u603B\u8BE5\u53E6\u6709\u4E00\u756A\u6837\u5B50\u5427\u3002\u6708\u4EAE\u6E10\u6E10\u5730\u5347\u9AD8\u4E86\uFF0C\u5899\u5916\u9A6C\u8DEF\u4E0A\u5B69\u5B50\u4EEC\u7684\u6B22\u7B11\uFF0C\u5DF2\u7ECF\u542C\u4E0D\u89C1\u4E86\uFF1B\u59BB\u5728\u5C4B\u91CC\u62CD\u7740\u95F0\u513F\uFF0C\u8FF7\u8FF7\u7CCA\u7CCA\u5730\u54FC\u7740\u7720\u6B4C\u3002\u6211\u6084\u6084\u5730\u62AB\u4E86\u5927\u886B\uFF0C\u5E26\u4E0A\u95E8\u51FA\u53BB\u3002\r\r\u6CBF\u7740\u8377\u5858\uFF0C\u662F\u4E00\u6761\u66F2\u6298\u7684\u5C0F\u7164\u5C51\u8DEF\u3002\u8FD9\u662F\u4E00\u6761\u5E7D\u50FB\u7684\u8DEF\uFF1B\u767D\u5929\u4E5F\u5C11\u4EBA\u8D70\uFF0C\u591C\u665A\u66F4\u52A0\u5BC2\u5BDE\u3002\u8377\u5858\u56DB\u9762\uFF0C\u957F\u7740\u8BB8\u591A\u6811\uFF0C\u84CA\u84CA\u90C1\u90C1\u7684\u3002\u8DEF\u56FE\u7247\u4E00\u7247\u662F\u4E9B\u6768\u67F3\uFF0C\u548C\u4E00\u4E9B\u4E0D\u77E5\u9053\u540D\u5B57\u7684\u6811\u3002\u6CA1\u6709\u6708\u5149\u7684\u665A\u4E0A\uFF0C\u8FD9\u8DEF\u4E0A\u9634\u68EE\u68EE\u7684\uFF0C\u6709\u4E9B\u6015\u4EBA\u3002\u4ECA\u665A\u5374\u5F88\u597D\uFF0C\u867D\u7136\u6708\u5149\u4E5F\u8FD8\u662F\u6DE1\u6DE1\u7684\u3002\r\r\u8DEF\u4E0A\u53EA\u6211\u4E00\u4E2A\u4EBA\uFF0C\u80CC\u7740\u624B\u8E31\u7740\u3002\u8FD9\u4E00\u7247\u5929\u5730\u597D\u50CF\u662F\u6211\u7684\uFF1B\u6211\u4E5F\u50CF\u8D85\u51FA\u4E86\u5E73\u5E38\u7684\u81EA\u5DF1\uFF0C\u5230\u4E86\u53E6\u4E00\u4E2A\u4E16\u754C\u91CC\u3002\u6211\u7231\u70ED\u95F9\uFF0C\u4E5F\u7231\u51B7\u9759\uFF1B\u7231\u7FA4\u5C45\uFF0C\u4E5F\u7231\u72EC\u5904\u3002\u50CF\u4ECA\u665A\u4E0A\uFF0C\u4E00\u4E2A\u4EBA\u5728\u8FD9\u82CD\u832B\u7684\u6708\u4E0B\uFF0C\u4EC0\u4E48\u90FD\u53EF\u4EE5\u60F3\uFF0C\u4EC0\u4E48\u90FD\u53EF\u4EE5\u4E0D\u60F3\uFF0C\u4FBF\u89C9\u662F\u4E2A\u81EA\u7531\u7684\u4EBA\u3002\u767D\u5929\u91CC\u4E00\u5B9A\u8981\u505A\u7684\u4E8B\uFF0C\u4E00\u5B9A\u8981\u8BF4\u7684\u8BDD\u662F\u73B0\u5728\u90FD\u53EF\u4E0D\u7406\u3002\u8FD9\u662F\u72EC\u5904\u7684\u5999\u5904\uFF0C\u6211\u4E14\u53D7\u7528\u8FD9\u65E0\u8FB9\u7684\u8377\u9999\u6708\u8272\u597D\u4E86\u3002\r\r\u66F2\u66F2\u6298\u6298\u7684\u8377\u5858\u4E0A\u9762\uFF0C\u5F25\u671B\u7684\u662F\u7530\u7530\u7684\u53F6\u5B50\u3002\u53F6\u5B50\u51FA\u6C34\u5F88\u9AD8\uFF0C\u50CF\u4EAD\u4EAD\u7684\u821E\u5973\u7684\u88D9\u3002\u5C42\u5C42\u7684\u53F6\u5B50\u4E2D\u95F4\uFF0C\u96F6\u661F\u5730\u70B9\u7F00\u7740\u4E9B\u767D\u82B1\uFF0C\u6709\u8885\u5A1C\u5730\u5F00\u7740\u7684\uFF0C\u6709\u7F9E\u6DA9\u5730\u6253\u7740\u6735\u513F\u7684\uFF1B\u6B63\u5982\u4E00\u7C92\u7C92\u7684\u660E\u73E0\uFF0C\u53C8\u5982\u78A7\u5929\u91CC\u7684\u661F\u661F\uFF0C\u53C8\u5982\u521A\u51FA\u6D74\u7684\u7F8E\u4EBA\u3002\u5FAE\u98CE\u8FC7\u5904\uFF0C\u9001\u6765\u7F15\u7F15\u6E05\u9999\uFF0C\u4EFF\u4F5B\u8FDC\u5904\u9AD8\u697C\u4E0A\u6E3A\u832B\u7684\u6B4C\u58F0\u4F3C\u7684\u3002\u8FD9\u65F6\u5019\u53F6\u5B50\u4E0E\u82B1\u4E5F\u6709\u4E00\u4E1D\u7684\u98A4\u52A8\uFF0C\u50CF\u95EA\u7535\u822C\uFF0C\u970E\u65F6\u4F20\u8FC7\u8377\u5858\u7684\u90A3\u8FB9\u53BB\u4E86\u3002\u53F6\u5B50\u672C\u662F\u80A9\u5E76\u80A9\u5BC6\u5BC6\u5730\u6328\u7740\uFF0C\u8FD9\u4FBF\u5B9B\u7136\u6709\u4E86\u4E00\u9053\u51DD\u78A7\u7684\u6CE2\u75D5\u3002\u53F6\u5B50\u5E95\u4E0B\u662F\u8109\u8109\u7684\u6D41\u6C34\uFF0C\u906E\u4F4F\u4E86\uFF0C\u4E0D\u80FD\u89C1\u4E00\u4E9B\u989C\u8272\uFF1B\u800C\u53F6\u5B50\u5374\u66F4\u89C1\u98CE\u81F4\u4E86\u3002\r\r\u6708\u5149\u5982\u6D41\u6C34\u4E00\u822C\uFF0C\u9759\u9759\u5730\u6CFB\u5728\u8FD9\u4E00\u7247\u53F6\u5B50\u548C\u82B1\u4E0A\u3002\u8584\u8584\u7684\u9752\u96FE\u6D6E\u8D77\u5728\u8377\u5858\u91CC\u3002\u53F6\u5B50\u548C\u82B1\u4EFF\u4F5B\u5728\u725B\u4E73\u4E2D\u6D17\u8FC7\u4E00\u6837\uFF0C\u53C8\u50CF\u7B3C\u7740\u8F7B\u7EB1\u7684\u68A6\u3002\u867D\u7136\u662F\u6EE1\u6708\uFF0C\u5929\u4E0A\u5374\u6709\u4E00\u5C42\u6DE1\u6DE1\u7684\u4E91\uFF0C\u6240\u4EE5\u4E0D\u80FD\u6717\u7167\uFF1B\u4F46\u6211\u4EE5\u4E3A\u8FD9\u6070\u662F\u5230\u4E86\u597D\u5904\u2014\u2014\u9163\u7720\u56FA\u4E0D\u53EF\u5C11\uFF0C\u5C0F\u7761\u4E5F\u522B\u6709\u98CE\u5473\u7684\u3002\u6708\u5149\u662F\u9694\u4E86\u6811\u7167\u8FC7\u6765\u7684\uFF0C\u9AD8\u5904\u4E1B\u751F\u7684\u704C\u6728\uFF0C\u843D\u4E0B\u53C2\u5DEE\u7684\u6591\u9A73\u7684\u9ED1\u5F71\uFF0C\u5CED\u695E\u695E\u5982\u9B3C\u4E00\u822C\uFF1B\u5F2F\u5F2F\u7684\u6768\u67F3\u7684\u7A00\u758F\u7684\u5029\u5F71\uFF0C\u5374\u53C8\u50CF\u662F\u753B\u5728\u8377\u53F6\u4E0A\u3002\u5858\u4E2D\u7684\u6708\u8272\u5E76\u4E0D\u5747\u5300\uFF1B\u4F46\u5149\u4E0E\u5F71\u6709\u7740\u548C\u8C10\u7684\u65CB\u5F8B\uFF0C\u5982\u68B5\u5A40\u73B2\u4E0A\u594F\u7740\u7684\u540D\u66F2\u3002\r\r\u8377\u5858\u7684\u56DB\u9762\uFF0C\u8FDC\u8FDC\u8FD1\u8FD1\uFF0C\u9AD8\u9AD8\u4F4E\u4F4E\u90FD\u662F\u6811\uFF0C\u800C\u6768\u67F3\u6700\u591A\u3002\u8FD9\u4E9B\u6811\u5C06\u4E00\u7247\u8377\u5858\u91CD\u91CD\u56F4\u4F4F\uFF1B\u53EA\u5728\u5C0F\u8DEF\u4E00\u65C1\uFF0C\u6F0F\u7740\u51E0\u6BB5\u7A7A\u9699\uFF0C\u50CF\u662F\u7279\u4E3A\u6708\u5149\u7559\u4E0B\u7684\u3002\u6811\u8272\u4E00\u4F8B\u662F\u9634\u9634\u7684\uFF0C\u4E4D\u770B\u50CF\u4E00\u56E2\u70DF\u96FE\uFF1B\u4F46\u6768\u67F3\u7684\u4E30\u59FF\uFF0C\u4FBF\u5728\u70DF\u96FE\u91CC\u4E5F\u8FA8\u5F97\u51FA\u3002\u6811\u68A2\u4E0A\u9690\u9690\u7EA6\u7EA6\u7684\u662F\u4E00\u5E26\u8FDC\u5C71\uFF0C\u53EA\u6709\u4E9B\u5927\u610F\u7F62\u4E86\u3002\u6811\u7F1D\u91CC\u4E5F\u6F0F\u7740\u4E00\u4E24\u70B9\u8DEF\u706F\u5149\uFF0C\u6CA1\u7CBE\u6253\u91C7\u7684\uFF0C\u662F\u6E34\u7761\u4EBA\u7684\u773C\u3002\u8FD9\u65F6\u5019\u6700\u70ED\u95F9\u7684\uFF0C\u8981\u6570\u6811\u4E0A\u7684\u8749\u58F0\u4E0E\u6C34\u91CC\u7684\u86D9\u58F0\uFF1B\u4F46\u70ED\u95F9\u662F\u5B83\u4EEC\u7684\uFF0C\u6211\u4EC0\u4E48\u4E5F\u6CA1\u6709\u3002\r\r\u5FFD\u7136\u60F3\u8D77\u91C7\u83B2\u7684\u4E8B\u60C5\u6765\u4E86\u3002\u91C7\u83B2\u662F\u6C5F\u5357\u7684\u65E7\u4FD7\uFF0C\u4F3C\u4E4E\u5F88\u65E9\u5C31\u6709\uFF0C\u800C\u516D\u671D\u65F6\u4E3A\u76DB\uFF1B\u4ECE\u8BD7\u6B4C\u91CC\u53EF\u4EE5\u7EA6\u7565\u77E5\u9053\u3002\u91C7\u83B2\u7684\u662F\u5C11\u5E74\u7684\u5973\u5B50\uFF0C\u5979\u4EEC\u662F\u8361\u7740\u5C0F\u8239\uFF0C\u5531\u7740\u8273\u6B4C\u53BB\u7684\u3002\u91C7\u83B2\u4EBA\u4E0D\u7528\u8BF4\u5F88\u591A\uFF0C\u8FD8\u6709\u770B\u91C7\u83B2\u7684\u4EBA\u3002\u90A3\u662F\u4E00\u4E2A\u70ED\u95F9\u7684\u5B63\u8282\uFF0C\u4E5F\u662F\u4E00\u4E2A\u98CE\u6D41\u7684\u5B63\u8282\u3002\u6881\u5143\u5E1D\u300A\u91C7\u83B2\u8D4B\u300B\u91CC\u8BF4\u5F97\u597D\uFF1A\r\r\u4E8E\u662F\u5996\u7AE5\u5973\uFF0C\u8361\u821F\u5FC3\u8BB8\uFF1B\u9DC1\u9996\u5F90\u56DE\uFF0C\u517C\u4F20\u7FBD\u676F\uFF1B\u6AC2\u5C06\u79FB\u800C\u85FB\u6302\uFF0C\u8239\u6B32\u52A8\u800C\u840D\u5F00\u3002\u5C14\u5176\u7EA4\u8170\u675F\u7D20\uFF0C\u8FC1\u5EF6\u987E\u6B65\uFF1B\u590F\u59CB\u6625\u4F59\uFF0C\u53F6\u5AE9\u82B1\u521D\uFF0C\u6050\u6CBE\u88F3\u800C\u6D45\u7B11\uFF0C\u754F\u503E\u8239\u800C\u655B\u88FE\u3002\r\r\u53EF\u89C1\u5F53\u65F6\u5B09\u6E38\u7684\u5149\u666F\u4E86\u3002\u8FD9\u771F\u662F\u6709\u8DA3\u7684\u4E8B\uFF0C\u53EF\u60DC\u6211\u4EEC\u73B0\u5728\u65E9\u5DF2\u65E0\u798F\u6D88\u53D7\u4E86\u3002\r\r\u4E8E\u662F\u53C8\u8BB0\u8D77\uFF0C\u300A\u897F\u6D32\u66F2\u300B\u91CC\u7684\u53E5\u5B50\uFF1A\r\r\u91C7\u83B2\u5357\u5858\u79CB\uFF0C\u83B2\u82B1\u8FC7\u4EBA\u5934\uFF1B\u4F4E\u5934\u5F04\u83B2\u5B50\uFF0C\u83B2\u5B50\u6E05\u5982\u6C34\u3002\r\r\u4ECA\u665A\u82E5\u6709\u91C7\u83B2\u4EBA\uFF0C\u8FD9\u513F\u7684\u83B2\u82B1\u4E5F\u7B97\u5F97\u201C\u8FC7\u4EBA\u5934\u201D\u4E86\uFF1B\u53EA\u4E0D\u89C1\u4E00\u4E9B\u6D41\u6C34\u7684\u5F71\u5B50\uFF0C\u662F\u4E0D\u884C\u7684\u3002\u8FD9\u4EE4\u6211\u5230\u5E95\u60E6\u7740\u6C5F\u5357\u4E86\u3002\u2014\u2014\u8FD9\u6837\u60F3\u7740\uFF0C\u731B\u4E00\u62AC\u5934\uFF0C\u4E0D\u89C9\u5DF2\u662F\u81EA\u5DF1\u7684\u95E8\u524D\uFF1B\u8F7B\u8F7B\u5730\u63A8\u95E8\u8FDB\u53BB\uFF0C\u4EC0\u4E48\u58F0\u606F\u4E5F\u6CA1\u6709\uFF0C\u59BB\u5DF2\u7761\u719F\u597D\u4E45\u4E86\u3002\r\r\u4E00\u4E5D\u4E8C\u4E03\u5E74\u4E03\u6708\uFF0C\u5317\u4EAC\u6E05\u534E\u56ED\u3002\r\r\r\r\u300A\u8377\u5858\u6708\u8272\u300B\u8BED\u8A00\u6734\u7D20\u5178\u96C5\uFF0C\u51C6\u786E\u751F\u52A8\uFF0C\u8D2E\u6EE1\u8BD7\u610F\uFF0C\u6EE1\u6EA2\u7740\u6731\u81EA\u6E05\u7684\u6563\u6587\u8BED\u8A00\u4E00\u8D2F\u6709\u6734\u7D20\u7684\u7F8E\uFF0C\u4E0D\u7528\u6D53\u58A8\u91CD\u5F69\uFF0C\u753B\u7684\u662F\u6DE1\u58A8\u6C34\u5F69\u3002\r\r\u6731\u81EA\u6E05\u5148\u751F\u4E00\u7B14\u5199\u666F\u4E00\u7B14\u8BF4\u60C5\uFF0C\u770B\u8D77\u6765\u677E\u6563\u4E0D\u77E5\u6240\u4E91\uFF0C\u53EF\u4ED4\u7EC6\u4F53\u4F1A\u4E0B\uFF0C\u5C31\u80FD\u611F\u53D7\u5230\u5148\u751F\u5728\u5B57\u91CC\u884C\u95F4\u8868\u8FF0\u51FA\u7684\u82E6\u95F7\uFF0C\u800C\u968F\u4E4B\u8BFB\u8005\u4E5F\u88AB\u5148\u751F\u7684\u6587\u5B57\u6240\u611F\u67D3\uFF0C\u88AB\u5E26\u8FDB\u4E86\u4ED6\u5F53\u65F6\u90A3\u82E6\u95F7\u800C\u65E0\u6CD5\u660E\u55BB\u7684\u5FC3\u60C5\u3002\u8FD9\u5C31\u662F\u4F18\u5F02\u6563\u6587\u7684\u5FC5\u987B\u54C1\u8D28\u4E4B\u4E00\u3002\r\r\u6269\u5C55\u8D44\u6599\uFF1A\r\u4E00\u9996\u957F\u8BD7\u300A\u6BC1\u706D\u300B\u5960\u5B9A\u4E86\u6731\u81EA\u6E05\u5728\u6587\u575B\u65B0\u8BD7\u4EBA\u7684\u5730\u4F4D\uFF0C\u800C\u300A\u6868\u58F0\u706F\u5F71\u91CC\u7684\u79E6\u6DEE\u6CB3\u300B\u5219\u88AB\u516C\u8BA4\u4E3A\u767D\u8BDD\u7F8E\u6587\u7684\u5178\u8303\u3002\u6731\u81EA\u6E05\u7528\u767D\u8BDD\u7F8E\u6587\u5411\u590D\u53E4\u6D3E\u5BA3\u6218\uFF0C\u6709\u529B\u5730\u56DE\u51FB\u4E86\u590D\u53E4\u6D3E\u201C\u767D\u8BDD\u4E0D\u80FD\u4F5C\u7F8E\u6587\u201D\u4E4B\u8BF4\uFF0C\u4ED6\u662F\u201C\u4E94\u56DB\u201D\u65B0\u6587\u5B66\u8FD0\u52A8\u7684\u5F00\u62D3\u8005\u4E4B\u4E00\u3002\r\r\u6731\u81EA\u6E05\u7684\u7F8E\u6587\u5F71\u54CD\u4E86\u4E00\u4EE3\u53C8\u4E00\u4EE3\u4EBA\u3002\u4F5C\u5BB6\u8D3E\u5E73\u51F9\u8BF4\uFF1A\u6765\u5230\u626C\u5DDE\uFF0C\u7B2C\u4E00\u4E2A\u60F3\u5230\u7684\u4EBA\u662F\u6731\u81EA\u6E05\uFF0C\u4ED6\u662F\u77E5\u8BC6\u5206\u5B50\u4E2D\u6700\u6700\u4E86\u4E0D\u8D77\u7684\u4EBA\u7269\u3002\r\r\u5B9E\u9645\u4E0A\uFF0C\u6731\u81EA\u6E05\u7684\u5199\u4F5C\u8DEF\u7A0B\u662F\u975E\u5E38\u66F2\u6298\u7684\uFF0C\u4ED6\u65E9\u671F\u7684\u65F6\u5019\u5927\u591A\u6570\u4F5C\u54C1\u90FD\u662F\u8BD7\u6B4C\uFF0C\u4F46\u662F\u4ED6\u7684\u8BD7\u6B4C\u548C\u6211\u56FD\u53E4\u4EE3\u8BD7\u4EBA\u7684\u8BD7\u6709\u5F88\u5927\u533A\u522B\uFF0C\u4ED6\u7684\u8BD7\u662F\u7528\u767D\u8BDD\u6587\u5199\u7684\uFF0C\u8FD9\u5176\u5B9E\u4E5F\u662F\u4ED6\u5199\u4F5C\u7684\u60EF\u7528\u98CE\u683C\u3002\r\r\u540E\u6765\uFF0C\u6731\u81EA\u6E05\u5F00\u59CB\u5199\u4E00\u4E9B\u5173\u4E8E\u793E\u4F1A\u7684\u6587\u7AE0\uFF0C\u56E0\u4E3A\u90A3\u4E2A\u65F6\u5019\u793E\u4F1A\u6BD4\u8F83\u6DF7\u4E71\uFF0C\u8FD9\u65F6\u5019\u7684\u4F5C\u54C1\u5927\u591A\u62A8\u51FB\u793E\u4F1A\u7684\u9ED1\u6697\u9762\uFF0C\u6587\u4F53\u98CE\u683C\u5927\u591A\u786C\u6717\uFF0C\u57FA\u8C03\u4F09\u4FEA\u3002\u5230\u4E86\u540E\u671F\uFF0C\u5927\u591A\u662F\u5199\u5173\u4E8E\u5C71\u6C34\u7684\u6587\u7AE0\uFF0C\u8FD9\u7C7B\u6587\u7AE0\u7684\u5199\u4F5C\u683C\u8C03\u5927\u591A\u4EE5\u6E05\u4E3D\u96C5\u81F4\u4E3A\u4E3B\u3002\r\r\u6731\u81EA\u6E05\u7684\u5199\u4F5C\u98CE\u683C\u867D\u7136\u5728\u4E0D\u540C\u7684\u65F6\u671F\u968F\u7740\u4ED6\u7684\u4EBA\u751F\u9605\u5386\u548C\u793E\u4F1A\u5F62\u6001\u7684\u4E0D\u540C\u800C\u53D1\u751F\u7740\u53D8\u5316\uFF0C\u4F46\u662F\u4ED6\u6587\u7AE0\u7684\u4E3B\u57FA\u8C03\u662F\u6CA1\u6709\u53D8\u7684\uFF0C\u4ED6\u8FD9\u4E00\u751F\uFF0C\u6240\u5199\u7684\u6240\u6709\u6587\u7AE0\u98CE\u683C\u4E0A\u90FD\u6709\u4E00\u4E2A\u975E\u5E38\u663E\u8457\u7684\u7279\u70B9\uFF0C\u90A3\u5C31\u662F\u7B80\u7EA6\u5E73\u6DE1\uFF0C\u4ED6\u4E0D\u662F\u7C7B\u4F3C\u53E4\u4EE3\u82B1\u95F4\u8BCD\u6D3E\u7684\u8BD7\u4EBA\u4EEC\uFF0C\u4E0D\u7BA1\u662F\u4ED6\u7684\u8BD7\u8BCD\u8FD8\u662F\u4ED6\u7684\u6587\u7AE0\u4ECE\u6765\u90FD\u4E0D\u7528\u8FC7\u4E8E\u534E\u4E3D\u7684\u8F9E\u85FB\uFF0C\u4ED6\u5D07\u5C1A\u7684\u662F\u5E73\u6DE1\u3002\r\r\u82F1\u56FD\u53CB\u4EBA\u6234\u7ACB\u514B\u8BD5\u8FC7\u82F1\u8BD1\u6731\u81EA\u6E05\u51E0\u7BC7\u6563\u6587\uFF0C\u8BD1\u5B8C\u4E00\u8BFB\u663E\u5F97\u5355\u8584\uFF0C\u8FDC\u8FDC\u4E0D\u5982\u539F\u6587\u6D41\u5229\u3002\u4ED6\u4E0D\u670D\u6C14\uFF0C\u6539\u7528\u7A0D\u5FAE\u53E4\u5965\u7684\u82F1\u6587\u91CD\u8BD1\uFF0C\u597D\u591A\u4E86\uFF1A\u201C\u90A3\u662F\u8BF4\uFF0C\u6731\u5148\u751F\u5916\u5706\u5185\u65B9\uFF0C\u6587\u5B57\u5C3D\u7BA1\u6D45\u767D\uFF0C\u5FC3\u601D\u5374\u5F88\u6DF1\u6C89\uFF0C\u8BD1\u7B14\u53EA\u597D\u671D\u6DF1\u5904\u7ECF\u8425\u3002\u201D\u6731\u81EA\u6E05\u7684\u5F88\u591A\u6587\u7AE0\uFF0C\u8B6C\u5982\u300A\u80CC\u5F71\u300B\u300A\u796D\u4EA1\u5987\u300B\uFF0C\u8BFB\u6765\u81EA\u6709\u4E00\u756A\u53EA\u53EF\u610F\u4F1A\u4E0D\u53EF\u8A00\u4F20\u7684\u4E1C\u897F\u3002\r\r\u5E73\u6DE1\u5C31\u662F\u6731\u81EA\u6E05\u7684\u5199\u4F5C\u98CE\u683C\u3002\u4ED6\u4E0D\u662F\u8C6A\u653E\u6D3E\u7684\u4F5C\u5BB6\uFF0C\u4ED6\u5728\u521B\u4F5C\u7684\u65F6\u5019\u949F\u60C5\u4E8E\u6E05\u65B0\u7684\u98CE\u683C\uFF0C\u7ED9\u4EBA\u8033\u76EE\u4E00\u65B0\u7684\u611F\u89C9\u3002\u5728\u4ED6\u7684\u6587\u7AE0\u4E2D\u5305\u542B\u4E86\u4ED6\u5BF9\u751F\u6D3B\u7684\u5411\u5F80\uFF0C\u7531\u6B64\u53EF\u89C1\u4ED6\u7684\u5199\u4F5C\u98CE\u683C\u548C\u4ED6\u5F85\u4EBA\u5904\u4E8B\u7684\u6001\u5EA6\u4E5F\u662F\u6709\u51E0\u5206\u76F8\u4F3C\u7684\u3002\u4ED6\u7684\u6587\u7AE0\u975E\u5E38\u4F18\u7F8E\uFF0C\u4F46\u53C8\u4E0D\u4F1A\u8BA9\u4EBA\u89C9\u5F97\u72ED\u9698\uFF0C\u7ED9\u4EBA\u4E00\u79CD\u8C41\u8FBE\u6E0A\u535A\u7684\u611F\u89C9\uFF0C\u8FD9\u5C31\u662F\u6731\u81EA\u6E05\u7684\u5199\u4F5C\u98CE\u683C\uFF0C\u66F4\u662F\u6731\u81EA\u6E05\u7684\u4E3A\u4EBA\u54C1\u8D28\u3002\r\r\u5199\u6709\u300A\u8377\u5858\u6708\u8272\u300B\u300A\u80CC\u5F71\u300B\u7B49\u540D\u7BC7\u7684\u8457\u540D\u6563\u6587\u5BB6\u6731\u81EA\u6E05\u5148\u751F\uFF0C\u4E0D\u4EC5\u81EA\u5DF1\u4E00\u751F\u98CE\u9AA8\u6B63\u6C14\uFF0C\u8FD8\u7528\u65E0\u5F62\u7684\u5BB6\u98CE\u6DB5\u517B\u5B50\u5B59\u3002\u826F\u597D\u7684\u5BB6\u98CE\u5BB6\u89C4\u610F\u8574\u6DF1\u8FDC\uFF0C\u50AC\u4EBA\u5411\u5584\uFF0C\u662F\u51DD\u805A\u60C5\u611F\u3001\u6DB5\u517B\u5FB7\u884C\u3001\u7825\u783A\u6210\u624D\u7684\u4EBA\u751F\u4FE1\u6761\u3002\u201C\u5317\u6709\u6731\u81EA\u6E05\uFF0C\u5357\u6709\u6731\u7269\u534E\uFF0C\u4E00\u6587\u4E00\u6B66\uFF0C\u4E00\u5357\u4E00\u5317\uFF0C\u53CC\u661F\u95EA\u8000\u201D\uFF0C\u8FD9\u662F\u4E2D\u56FD\u77E5\u8BC6\u754C\u3001\u6559\u80B2\u754C\u5BF9\u6731\u5BB6\u4E24\u5144\u5F1F\u7684\u8D5E\u8A89\u3002\r\r\u6731\u81EA\u6E05\u6027\u683C\u6E29\u548C\uFF0C\u4E3A\u4EBA\u548C\u5584\uFF0C\u5BF9\u5F85\u5E74\u8F7B\u4EBA\u5E73\u6613\u8FD1\u4EBA\uFF0C\u662F\u4E2A\u5E73\u548C\u7684\u4EBA\u3002\u4ED6\u53D6\u5B57\u201C\u4F69\u5F26\u201D\uFF0C\u610F\u601D\u8981\u50CF\u5F13\u5F26\u90A3\u6837\u5C06\u81EA\u5DF1\u7EF7\u7D27\uFF0C\u7ED9\u4EBA\u7684\u611F\u89C9\u662F\u81EA\u6211\u8981\u6C42\u9AD8\uFF0C\u5076\u5C14\u6709\u5446\u6C14\u3002\u6731\u81EA\u6E05\u6559\u5B66\u8D1F\u8D23\uFF0C\u5BF9\u5B66\u751F\u8981\u6C42\u4E25\u683C\uFF0C\u4FEE\u4ED6\u7684\u8BFE\u7684\u5B66\u751F\u90FD\u53D7\u76CA\u4E0D\u5C11\u3002\r\r1948 \u5E74 6 \u6708\uFF0C\u60A3\u80C3\u75C5\u591A\u5E74\u7684\u6731\u81EA\u6E05\uFF0C\u5728\u300A\u6297\u8BAE\u7F8E\u56FD\u6276\u65E5\u653F\u7B56\u5E76\u62D2\u7EDD\u9886\u53D6\u7F8E\u63F4\u9762\u7C89\u5BA3\u8A00\u300B\u4E0A\uFF0C\u4E00\u4E1D\u4E0D\u82DF\u5730\u7B7E\u4E0B\u4E86\u81EA\u5DF1\u7684\u540D\u5B57\u3002\u968F\u540E\uFF0C\u6731\u81EA\u6E05\u8FD8\u5C06\u9762\u7C89\u914D\u8D2D\u8BC1\u4EE5\u53CA\u9762\u7C89\u7968\u9000\u4E86\u56DE\u53BB\u30021948 \u5E74 8 \u6708 12 \u65E5\uFF0C\u6731\u81EA\u6E05\u56E0\u4E0D\u582A\u80C3\u75C5\u6298\u78E8\uFF0C\u79BB\u5F00\u4EBA\u4E16\u3002\u5728\u65B0\u7684\u65F6\u4EE3\u5373\u5C06\u5230\u6765\u65F6\uFF0C\u6731\u81EA\u6E05\u5374\u5306\u5306\u5730\u79BB\u4EBA\u4EEC\u8FDC\u53BB\u3002\u4ED6\u4E3A\u4EBA\u4EEC\u7559\u4E0B\u4E86\u65E0\u6570\u7ECF\u5178\u7684\u8BD7\u6B4C\u548C\u6587\u5B57\uFF0C\u8FD8\u6709\u6C38\u4E0D\u5C48\u670D\u7684\u7CBE\u795E\u3002\r\r\u6731\u81EA\u6E05\u6CA1\u6709\u8C6A\u8A00\u58EE\u8BED\uFF0C\u4ED6\u53EA\u662F\u7528\u575A\u5B9A\u7684\u884C\u52A8\u3001\u6734\u5B9E\u7684\u8BED\u8A00\uFF0C\u5411\u4E16\u4EBA\u5C55\u793A\u4E86\u4E2D\u56FD\u77E5\u8BC6\u5206\u5B50\u5728\u7956\u56FD\u5371\u96BE\u4E4B\u9645\u575A\u5B9A\u7684\u9769\u547D\u6027\uFF0C\u4F53\u73B0\u4E86\u4E2D\u56FD\u4EBA\u7684\u9AA8\u6C14\uFF0C\u8868\u73B0\u4E86\u65E0\u6BD4\u9AD8\u8D35\u7684\u6C11\u65CF\u6C14\u8282\uFF0C\u5448\u73B0\u4E86\u4EBA\u751F\u6700\u6709\u4EF7\u503C\u7684\u4E00\u9762\uFF0C\u8C31\u5C31\u4E86\u751F\u547D\u4E2D\u6700\u534E\u4E3D\u7684\u4E50\u7AE0\u3002\r\r\u4ED6\u4EE5\u201C\u81EA\u6E05\u201D\u4E3A\u540D\uFF0C\u81EA\u52C9\u5728\u56F0\u5883\u4E2D\u4E0D\u4E27\u5FD7\uFF1B\u4ED6\u8EAB\u60A3\u91CD\u75C5\uFF0C\u81F3\u6B7B\u62D2\u9886\u7F8E\u63F4\u9762\u7C89\uFF0C\u5176\u6C14\u8282\u4EE4\u4E16\u4EBA\u611F\u4F69\uFF1B\u4ED6\u7684\u300A\u80CC\u5F71\u300B\u300A\u8377\u5858\u6708\u8272\u300B\u300A\u5306\u5306\u300B\u810D\u7099\u4EBA\u53E3\uFF1B\u4ED6\u7684\u6587\u5B57\u8FFD\u6C42\u201C\u771F\u201D\uFF0C\u6CA1\u6709\u534A\u70B9\u77EB\u9970\uFF0C\u5374\u8574\u85CF\u7740\u52A8\u4EBA\u5FC3\u5F26\u7684\u529B\u91CF\u3002\r\r\u6731\u81EA\u6E05\u4E0D\u4F46\u5728\u6587\u5B66\u521B\u4F5C\u65B9\u9762\u6709\u5F88\u9AD8\u7684\u9020\u8BE3\uFF0C\u4E5F\u662F\u4E00\u540D\u9769\u547D\u6C11\u4E3B\u4E3B\u4E49\u6218\u58EB\uFF0C\u5728\u53CD\u9965\u997F\u3001\u53CD\u5185\u6218\u7684\u6597\u4E89\u4E2D\uFF0C\u4ED6\u59CB\u7EC8\u4FDD\u6301\u7740\u4E00\u4E2A\u6B63\u76F4\u7684\u7231\u56FD\u77E5\u8BC6\u5206\u5B50\u7684\u6C14\u8282\u548C\u60C5\u64CD\u3002\u6BDB\u6CFD\u4E1C\u5BF9\u6731\u81EA\u6E05\u5B81\u80AF\u997F\u6B7B\u4E0D\u9886\u7F8E\u56FD\u201C\u6551\u6D4E\u7C89\u201D\u7684\u7CBE\u795E\u7ED9\u4E88\u79F0\u8D5E\uFF0C\u8D5E\u626C\u4ED6\u201C\u8868\u73B0\u4E86\u6211\u4EEC\u6C11\u65CF\u7684\u82F1\u96C4\u6C14\u6982\u201D\u3002\r\n",
      textRuns: [
        {
          st: 0,
          ed: 4,
          ts: {
            fs: 20,
            ff: "Microsoft YaHei",
            cl: {
              rgb: "rgb(255, 255, 255)"
            },
            bl: 1 /* TRUE */,
            bg: {
              rgb: "#FF6670"
            },
            it: 1 /* TRUE */
          }
        },
        {
          st: 6,
          ed: 9,
          ts: {
            fs: 16,
            ff: "Microsoft YaHei",
            cl: {
              rgb: "rgb(30, 30, 30)"
            },
            bl: 0 /* FALSE */
          }
        },
        {
          st: 9,
          ed: 12,
          ts: {
            fs: 16,
            ff: "Microsoft YaHei",
            cl: {
              rgb: "rgb(30, 30, 30)"
            },
            bl: 1 /* TRUE */
          }
        },
        {
          st: 14,
          ed: 3064,
          ts: {
            fs: 12,
            ff: "Microsoft YaHei",
            cl: {
              rgb: "rgb(30, 30, 30)"
            },
            bl: 0 /* FALSE */
          }
        }
      ],
      paragraphs: [
        {
          startIndex: 4,
          paragraphStyle: {
            spaceAbove: { v: 0 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 5,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 12,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 13,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 127,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
            // hanging: 20,
            // indentStart: 50,
            // indentEnd: 50,
            // indentFirstLine: 50,
          }
        },
        {
          startIndex: 128,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 244,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 245,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 398,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 399,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 618,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 619,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 824,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 825,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 1007,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 1008,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 1130,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 1131,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 1203,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 1204,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 1238,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 1239,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 1256,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 1257,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 1282,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 1283,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 1380,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 1381,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 1396,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 1397,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 1398,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 1399,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 1457,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 1458,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 1559,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 1560,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 1566,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 1670,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 1671,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 1728,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 1729,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 1811,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 1812,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 1912,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 1913,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 2053,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 2054,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 2190,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 2191,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 2341,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 2342,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 2481,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 2482,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 2582,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 2583,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 2750,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 2751,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 2853,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 2854,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 2948,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 2949,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        },
        {
          startIndex: 3065,
          paragraphStyle: {
            spaceAbove: { v: 10 },
            lineSpacing: 2,
            spaceBelow: { v: 0 }
          }
        }
      ],
      sectionBreaks: [
        {
          startIndex: 3066
          // columnProperties: [
          //     {
          //         width: ptToPixel(240),
          //         paddingEnd: ptToPixel(15),
          //     },
          // ],
          // columnSeparatorType: ColumnSeparatorType.NONE,
          // sectionType: SectionType.SECTION_TYPE_UNSPECIFIED,
          // textDirection: textDirectionDocument,
          // contentDirection: textDirection!,
        }
      ],
      customBlocks: [],
      tables: []
    },
    documentStyle: {
      pageSize: {
        width: ptToPixel(595),
        height: ptToPixel(842)
      },
      documentFlavor: 1 /* TRADITIONAL */,
      marginTop: ptToPixel(50),
      marginBottom: ptToPixel(50),
      marginRight: ptToPixel(50),
      marginLeft: ptToPixel(50),
      renderConfig: {
        vertexAngle: 0,
        centerAngle: 0
      },
      defaultHeaderId: "",
      defaultFooterId: "",
      evenPageHeaderId: "",
      evenPageFooterId: "",
      firstPageHeaderId: "",
      firstPageFooterId: "",
      evenAndOddHeaders: 0 /* FALSE */,
      useFirstPageHeaderFooter: 0 /* FALSE */,
      marginHeader: 30,
      marginFooter: 30
    }
  };
  return DEFAULT_DOCUMENT_DATA_CN;
}

// ../common/debugger/src/controllers/e2e/data/default-sheet.ts
function getDefaultWorkbookData() {
  const DEFAULT_WORKBOOK_DATA_DEMO2 = {
    id: "test",
    appVersion: "3.0.0-alpha",
    sheets: {
      sheet1: {
        id: "sheet1",
        name: "sheet1",
        cellData: {
          0: {
            3: {
              f: "=SUM(A1)",
              si: "3e4r5t"
            }
          },
          1: {
            3: {
              f: "=SUM(A2)",
              si: "OSPtzm"
            }
          },
          2: {
            3: {
              si: "OSPtzm"
            }
          },
          3: {
            3: {
              si: "OSPtzm"
            }
          }
        },
        rowCount: 100,
        columnCount: 100
      }
    },
    locale: "zhCN" /* ZH_CN */,
    name: "",
    sheetOrder: [],
    styles: {},
    resources: []
  };
  return DEFAULT_WORKBOOK_DATA_DEMO2;
}

// ../common/debugger/src/controllers/e2e/e2e.controller.ts
var AWAIT_LOADING_TIMEOUT = 5e3;
var AWAIT_DISPOSING_TIMEOUT = 5e3;
var E2EController = class extends Disposable {
  constructor(_univerInstanceService, _themeService) {
    super();
    __publicField(this, "_univerInstanceService", _univerInstanceService);
    __publicField(this, "_themeService", _themeService);
    this._initPlugin();
  }
  dispose() {
    window.E2EControllerAPI = void 0;
  }
  _initPlugin() {
    window.E2EControllerAPI = {
      loadAndRelease: (id, loadTimeout, disposeTimeout) => this._loadAndRelease(id, loadTimeout, disposeTimeout),
      loadDefaultSheet: (loadTimeout) => this._loadDefaultSheet(loadTimeout),
      loadDemoSheet: () => this._loadDemoSheet(),
      loadMergeCellSheet: () => this._loadMergeCellSheet(2e3),
      loadDefaultStyleSheet: (loadTimeout) => this._loadDefaultStyleSheet(loadTimeout),
      disposeCurrSheetUnit: (disposeTimeout) => this._disposeDefaultSheetUnit(disposeTimeout),
      setDarkMode: (darkMode) => this._setDarkMode(darkMode),
      loadDefaultDoc: (loadTimeout) => this._loadDefaultDoc(loadTimeout),
      disposeUniver: () => this._disposeUniver()
    };
  }
  _setDarkMode(darkMode) {
    this._themeService.setDarkMode(darkMode);
  }
  async _loadAndRelease(releaseId, loadingTimeout = AWAIT_LOADING_TIMEOUT, disposingTimeout = AWAIT_DISPOSING_TIMEOUT) {
    const unitId = `e2e${releaseId}`;
    const snapshot = getDefaultWorkbookData();
    snapshot.id = unitId;
    this._univerInstanceService.createUnit(2 /* UNIVER_SHEET */, snapshot);
    await awaitTime(loadingTimeout);
    this._univerInstanceService.disposeUnit(unitId);
    await awaitTime(disposingTimeout);
  }
  async _loadDefaultSheet(loadingTimeout = AWAIT_LOADING_TIMEOUT) {
    this._univerInstanceService.createUnit(2 /* UNIVER_SHEET */, getDefaultWorkbookData());
    await awaitTime(loadingTimeout);
  }
  async _loadDemoSheet() {
    this._univerInstanceService.createUnit(2 /* UNIVER_SHEET */, DEFAULT_WORKBOOK_DATA_DEMO);
    await awaitTime(AWAIT_LOADING_TIMEOUT);
  }
  /**
   * sheet-003 in default data
   */
  async _loadMergeCellSheet(loadingTimeout = AWAIT_LOADING_TIMEOUT) {
    const data = { ...DEFAULT_WORKBOOK_DATA_DEMO };
    data.sheetOrder = ["sheet-0003"];
    this._univerInstanceService.createUnit(2 /* UNIVER_SHEET */, data);
    await awaitTime(loadingTimeout);
  }
  async _loadDefaultStyleSheet(loadingTimeout = AWAIT_LOADING_TIMEOUT) {
    const data = { ...DEFAULT_WORKBOOK_DATA_DEMO_DEFAULT_STYLE };
    this._univerInstanceService.createUnit(2 /* UNIVER_SHEET */, data);
    await awaitTime(loadingTimeout);
  }
  async _loadDefaultDoc(loadingTimeout = AWAIT_LOADING_TIMEOUT) {
    this._univerInstanceService.createUnit(1 /* UNIVER_DOC */, getDefaultDocData());
    await awaitTime(loadingTimeout);
  }
  async _disposeUniver() {
    var _a;
    (_a = window.univer) == null ? void 0 : _a.dispose();
    window.univer = void 0;
    window.univerAPI = void 0;
  }
  async _disposeDefaultSheetUnit(disposingTimeout = AWAIT_DISPOSING_TIMEOUT) {
    const unit = this._univerInstanceService.getCurrentUnitForType(2 /* UNIVER_SHEET */);
    const unitId = unit == null ? void 0 : unit.getUnitId();
    await this._univerInstanceService.disposeUnit(unitId || "");
    await awaitTime(disposingTimeout);
  }
};
E2EController = __decorateClass([
  __decorateParam(0, IUniverInstanceService),
  __decorateParam(1, Inject(ThemeService))
], E2EController);

// ../common/debugger/src/controllers/performance-monitor.controller.ts
var PerformanceMonitorController = class extends RxDisposable {
  constructor(lifecycleService, _instanceService, _renderManagerService) {
    super();
    __publicField(this, "_instanceService", _instanceService);
    __publicField(this, "_renderManagerService", _renderManagerService);
    __publicField(this, "_containerElement");
    __publicField(this, "_currentUnitSub");
    lifecycleService.subscribeWithPrevious().pipe(
      filter((stage) => stage === 2 /* Rendered */),
      take(1)
    ).subscribe(() => this._listenDocumentTypeChange());
  }
  dispose() {
    super.dispose();
    this._disposeCurrentObserver();
  }
  _disposeCurrentObserver() {
    var _a;
    (_a = this._currentUnitSub) == null ? void 0 : _a.unsubscribe();
    this._currentUnitSub = null;
  }
  _listenDocumentTypeChange() {
    this._instanceService.focused$.pipe(takeUntil(this.dispose$), distinctUntilChanged()).subscribe((unitId) => {
      this._disposeCurrentObserver();
      if (unitId) {
        this._listenToRenderer(unitId);
      }
    });
  }
  _listenToRenderer(unitId) {
    const renderer = this._renderManagerService.getRenderById(unitId);
    if (renderer) {
      const { engine } = renderer;
      this._currentUnitSub = engine.endFrame$.subscribe(() => {
        if (!this._containerElement) {
          this._containerElement = document.querySelector("[data-u-comp=debugger-fps]");
        } else {
          this._containerElement.textContent = `FPS: ${Math.round(engine.getFps()).toString()}`;
        }
      });
    }
  }
};
PerformanceMonitorController = __decorateClass([
  __decorateParam(0, Inject(LifecycleService)),
  __decorateParam(1, IUniverInstanceService),
  __decorateParam(2, IRenderManagerService)
], PerformanceMonitorController);

// ../common/debugger/src/plugin.ts
var UniverDebuggerPlugin = class extends Plugin {
  constructor(_config = defaultPluginConfig, _injector, _configService) {
    super();
    __publicField(this, "_config", _config);
    __publicField(this, "_injector", _injector);
    __publicField(this, "_configService", _configService);
    __publicField(this, "_debuggerController");
    const { menu: menu9, ...rest } = merge_default(
      {},
      defaultPluginConfig,
      this._config
    );
    if (menu9) {
      this._configService.setConfig("menu", menu9, { merge: true });
    }
    this._configService.setConfig(DEBUGGER_PLUGIN_CONFIG_KEY, rest);
  }
  onStarting() {
    var _a;
    const dependencies = [
      [DebuggerController],
      [E2EController],
      [UniverWatermarkMenuController]
    ];
    if (((_a = this._config.performanceMonitor) == null ? void 0 : _a.enabled) !== false) {
      dependencies.push([PerformanceMonitorController]);
    }
    registerDependencies(this._injector, dependencies);
    touchDependencies(this._injector, [
      [E2EController]
    ]);
  }
  onReady() {
    touchDependencies(this._injector, [
      [DebuggerController]
    ]);
  }
  onRendered() {
    touchDependencies(this._injector, [
      [PerformanceMonitorController],
      [UniverWatermarkMenuController]
    ]);
  }
  getDebuggerController() {
    this._debuggerController = this._injector.get(DebuggerController);
    return this._debuggerController;
  }
};
__publicField(UniverDebuggerPlugin, "pluginName", "UNIVER_DEBUGGER_PLUGIN");
__publicField(UniverDebuggerPlugin, "packageName", package_default.name);
__publicField(UniverDebuggerPlugin, "version", package_default.version);
UniverDebuggerPlugin = __decorateClass([
  __decorateParam(1, Inject(Injector)),
  __decorateParam(2, IConfigService)
], UniverDebuggerPlugin);

export {
  UniverDebuggerPlugin
};
