import {
  FUniver
} from "./chunk-BOFO7FDU.js";
import {
  DocSelectionRenderService,
  InsertCommand
} from "./chunk-PPREH44U.js";
import {
  IRenderManagerService
} from "./chunk-VYDPVHQH.js";
import {
  ICommandService,
  IResourceManagerService,
  IUniverInstanceService,
  Inject,
  Injector,
  RedoCommand,
  UndoCommand
} from "./chunk-UI3TUZSE.js";
import {
  __decorateClass,
  __decorateParam,
  __publicField
} from "./chunk-24OICD5T.js";

// ../packages/docs-ui/src/facade/f-document.ts
var FDocument = class {
  constructor(_documentDataModel, _injector, _univerInstanceService, _commandService, _resourceManagerService, _renderManagerService) {
    __publicField(this, "_documentDataModel", _documentDataModel);
    __publicField(this, "_injector", _injector);
    __publicField(this, "_univerInstanceService", _univerInstanceService);
    __publicField(this, "_commandService", _commandService);
    __publicField(this, "_resourceManagerService", _resourceManagerService);
    __publicField(this, "_renderManagerService", _renderManagerService);
    __publicField(this, "id");
    this.id = this._documentDataModel.getUnitId();
  }
  getId() {
    return this._documentDataModel.getUnitId();
  }
  getName() {
    return this.getSnapshot().title || "";
  }
  getSnapshot() {
    const resources = this._resourceManagerService.getResourcesByType(this.id, 1 /* UNIVER_DOC */);
    const snapshot = this._documentDataModel.getSnapshot();
    snapshot.resources = resources;
    return snapshot;
  }
  undo() {
    this._univerInstanceService.focusUnit(this.id);
    return this._commandService.executeCommand(UndoCommand.id);
  }
  redo() {
    this._univerInstanceService.focusUnit(this.id);
    return this._commandService.executeCommand(RedoCommand.id);
  }
  /**
   * Adds the specified text to the end of this text region.
   * @param text - The text to be added to the end of this text region.
   */
  appendText(text) {
    const unitId = this.id;
    const { body } = this.getSnapshot();
    if (!body) {
      throw new Error("The document body is empty");
    }
    const lastPosition = body.dataStream.length - 2;
    const activeRange = {
      startOffset: lastPosition,
      endOffset: lastPosition,
      collapsed: true,
      segmentId: ""
    };
    const { segmentId } = activeRange;
    return this._commandService.executeCommand(InsertCommand.id, {
      unitId,
      body: {
        dataStream: text
      },
      range: activeRange,
      segmentId
    });
  }
  /**
   * Sets the selection to a specified text range in the document.
   * @param startOffset - The starting offset of the selection in the document.
   * @param endOffset - The ending offset of the selection in the document.
   * @example
   * ```typescript
   * document.setSelection(10, 20);
   * ```
   */
  setSelection(startOffset, endOffset) {
    var _a;
    const docSelectionRenderService = (_a = this._renderManagerService.getRenderById(this.getId())) == null ? void 0 : _a.with(DocSelectionRenderService);
    docSelectionRenderService == null ? void 0 : docSelectionRenderService.removeAllRanges();
    docSelectionRenderService == null ? void 0 : docSelectionRenderService.addDocRanges(
      [
        {
          startOffset,
          endOffset,
          rangeType: "TEXT" /* TEXT */
        }
      ],
      true
    );
  }
};
FDocument = __decorateClass([
  __decorateParam(1, Inject(Injector)),
  __decorateParam(2, IUniverInstanceService),
  __decorateParam(3, ICommandService),
  __decorateParam(4, IResourceManagerService),
  __decorateParam(5, IRenderManagerService)
], FDocument);

// ../packages/docs-ui/src/facade/f-univer.ts
var FUniverDocsUIMixin = class extends FUniver {
  createUniverDoc(data) {
    const document = this._univerInstanceService.createUnit(1 /* UNIVER_DOC */, data);
    return this._injector.createInstance(FDocument, document);
  }
  getActiveDocument() {
    const document = this._univerInstanceService.getCurrentUnitForType(1 /* UNIVER_DOC */);
    if (!document) {
      return null;
    }
    return this._injector.createInstance(FDocument, document);
  }
  getUniverDoc(id) {
    const document = this._univerInstanceService.getUniverDocInstance(id);
    if (!document) {
      return null;
    }
    return this._injector.createInstance(FDocument, document);
  }
};
FUniver.extend(FUniverDocsUIMixin);
