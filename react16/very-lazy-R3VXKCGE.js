import {
  UniverActionRecorderPlugin
} from "./chunk-5BS4B4FP.js";
import {
  UniverSheetsFindReplacePlugin
} from "./chunk-7XZNZLBM.js";
import {
  UniverSheetsSortUIPlugin
} from "./chunk-NMWTEABR.js";
import {
  UniverUniscriptPlugin
} from "./chunk-IP4FE6N4.js";
import "./chunk-GCGI23F5.js";
import "./chunk-CQY74AWC.js";
import "./chunk-CLMLYKFF.js";
import {
  UniverSheetsCrosshairHighlightPlugin
} from "./chunk-DKS4OYGR.js";
import {
  UniverSheetsHyperLinkUIPlugin
} from "./chunk-MIVGOTSS.js";
import "./chunk-W7EFL2EA.js";
import {
  UniverDebuggerPlugin
} from "./chunk-6OBP3PZF.js";
import "./chunk-THXVG335.js";
import {
  UniverWatermarkPlugin
} from "./chunk-MOHJC2BO.js";
import "./chunk-MLFBVVME.js";
import "./chunk-BOFO7FDU.js";
import "./chunk-AZHMLAGZ.js";
import "./chunk-M6GAWQ5P.js";
import "./chunk-MBZ442FO.js";
import "./chunk-YLOR7Z6Y.js";
import "./chunk-PPREH44U.js";
import "./chunk-NW5FEDQC.js";
import "./chunk-5YA62WFH.js";
import "./chunk-JGEZE7BC.js";
import "./chunk-VYDPVHQH.js";
import "./chunk-UI3TUZSE.js";
import "./chunk-EQ2B2W73.js";
import "./chunk-24OICD5T.js";

// src/sheets-multi-units/very-lazy.ts
var IS_E2E = false;
function getVeryLazyPlugins() {
  const plugins = [
    [UniverActionRecorderPlugin],
    [UniverSheetsHyperLinkUIPlugin],
    [UniverSheetsSortUIPlugin],
    [UniverSheetsCrosshairHighlightPlugin],
    [UniverSheetsFindReplacePlugin],
    [UniverWatermarkPlugin]
  ];
  if (!IS_E2E) {
    plugins.push([UniverDebuggerPlugin]);
    plugins.push([UniverUniscriptPlugin, {
      getWorkerUrl(_, label) {
        if (label === "json") {
          return "/vs/language/json/json.worker.js";
        }
        if (label === "css" || label === "scss" || label === "less") {
          return "/vs/language/css/css.worker.js";
        }
        if (label === "html" || label === "handlebars" || label === "razor") {
          return "/vs/language/html/html.worker.js";
        }
        if (label === "typescript" || label === "javascript") {
          return "/vs/language/typescript/ts.worker.js";
        }
        return "/vs/editor/editor.worker.js";
      }
    }]);
  }
  return plugins;
}
export {
  getVeryLazyPlugins as default
};
