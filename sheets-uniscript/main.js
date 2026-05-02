import {
  UniverUniscriptPlugin
} from "../chunk-IP4FE6N4.js";
import "../chunk-GCGI23F5.js";
import "../chunk-CQY74AWC.js";
import "../chunk-CLMLYKFF.js";
import {
  UniverDebuggerPlugin
} from "../chunk-NSKZAT47.js";
import "../chunk-THXVG335.js";
import "../chunk-MOHJC2BO.js";
import "../chunk-MLFBVVME.js";
import "../chunk-BOFO7FDU.js";
import {
  UniverSheetsNumfmtUIPlugin
} from "../chunk-FJ5MRTUM.js";
import {
  UniverSheetsNumfmtPlugin
} from "../chunk-N2RQEFDC.js";
import {
  UniverSheetsUIPlugin
} from "../chunk-MBZ442FO.js";
import {
  UNISCRIT_WORKBOOK_DATA_DEMO
} from "../chunk-YLOR7Z6Y.js";
import {
  UniverDocsPlugin,
  UniverDocsUIPlugin
} from "../chunk-PPREH44U.js";
import "../chunk-LI6UXASZ.js";
import {
  UniverUIPlugin
} from "../chunk-NW5FEDQC.js";
import {
  zh_CN_default
} from "../chunk-OROQCTWB.js";
import {
  UniverSheetsFormulaPlugin
} from "../chunk-5YA62WFH.js";
import {
  UniverFormulaEnginePlugin,
  UniverSheetsPlugin
} from "../chunk-JGEZE7BC.js";
import {
  UniverRenderEnginePlugin
} from "../chunk-VYDPVHQH.js";
import {
  Univer
} from "../chunk-UI3TUZSE.js";
import "../chunk-EQ2B2W73.js";
import "../chunk-24OICD5T.js";

// src/sheets-uniscript/main.ts
var IS_E2E = false;
var univer = new Univer({
  locale: "zhCN" /* ZH_CN */,
  locales: {
    ["zhCN" /* ZH_CN */]: zh_CN_default
  },
  logLevel: 4 /* VERBOSE */
});
univer.registerPlugin(UniverRenderEnginePlugin);
univer.registerPlugin(UniverUIPlugin, {
  container: "app",
  ribbonType: "classic"
});
univer.registerPlugin(UniverDocsPlugin);
univer.registerPlugin(UniverDocsUIPlugin);
univer.registerPlugin(UniverSheetsPlugin);
univer.registerPlugin(UniverSheetsUIPlugin);
univer.registerPlugin(UniverSheetsNumfmtPlugin);
univer.registerPlugin(UniverSheetsNumfmtUIPlugin);
univer.registerPlugin(UniverFormulaEnginePlugin);
univer.registerPlugin(UniverSheetsFormulaPlugin);
univer.registerPlugin(UniverUniscriptPlugin, {
  getWorkerUrl(_, label) {
    if (label === "typescript" || label === "javascript") {
      return "/vs/language/typescript/ts.worker.js";
    }
    return "/vs/editor/editor.worker.js";
  }
});
if (IS_E2E) {
  univer.registerPlugin(UniverDebuggerPlugin, {
    fab: false,
    performanceMonitor: {
      enabled: false
    }
  });
}
univer.createUnit(2 /* UNIVER_SHEET */, UNISCRIT_WORKBOOK_DATA_DEMO);
window.univer = univer;
