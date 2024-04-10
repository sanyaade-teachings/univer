/**
 * Copyright 2023-present DreamNum Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { IRange, ISelectionCellWithCoord, Nullable } from '@univerjs/core';
import { BooleanNumber, ObjectMatrix, sortRules } from '@univerjs/core';

import type { BaseObject } from '../../base-object';

import { FIX_ONE_PIXEL_BLUR_OFFSET, RENDER_CLASS_TYPE } from '../../basics/const';

// import { clearLineByBorderType } from '../../basics/draw';
import { getCellPositionByIndex, getColor } from '../../basics/tools';
import type { IBoundRectNoAngle, IViewportBound, Vector2 } from '../../basics/vector2';
import { Canvas } from '../../canvas';
import type { UniverRenderingContext } from '../../context';
import type { Engine } from '../../engine';
import type { Scene } from '../../scene';
import type { SceneViewer } from '../../scene-viewer';
import type { Viewport } from '../../viewport';
import { Documents } from '../docs/document';
import { SpreadsheetExtensionRegistry } from '../extension';
import type { Background } from './extensions/background';
import type { Border } from './extensions/border';
import type { Font } from './extensions/font';

// import type { BorderCacheItem } from './interfaces';
import { SheetComponent } from './sheet-component';
import type { SpreadsheetSkeleton } from './sheet-skeleton';
import { Layer } from '../../layer';

const OBJECT_KEY = '__SHEET_EXTENSION_FONT_DOCUMENT_INSTANCE__';

export class Spreadsheet extends SheetComponent {
    private _backgroundExtension!: Background;

    private _borderExtension!: Border;

    private _fontExtension!: Font;

    private _cacheCanvas!: Canvas;
    private _cacheCanvasTop!: Canvas;
    private _cacheCanvasLeft!: Canvas;
    private _cacheCanvasLeftTop!: Canvas;
    private _cacheCanvasMap: Map<string, Canvas> = new Map();

    private _refreshIncrementalState = false;

    private _forceDirty = false;
    private _forceDirtyByViewport: Record<string, boolean> = {};
        // 无法导入
        // VIEWPORT_KEY.VIEW_MAIN: false,
        // VIEWPORT_KEY.VIEW_MAIN_TOP: false,
        // VIEWPORT_KEY.VIEW_MAIN_LEFT_TOP,



    private _overflowCacheRuntime: { [row: number]: boolean } = {};

    private _overflowCacheRuntimeRange = new ObjectMatrix<IRange>();

    private _overflowCacheRuntimeTimeout: number | NodeJS.Timeout = -1;

    private _forceDisableGridlines = false;

    private _documents: Documents = new Documents(OBJECT_KEY, undefined, {
        pageMarginLeft: 0,
        pageMarginTop: 0,
    });

    isPrinting = false;

    constructor(
        oKey: string,
        spreadsheetSkeleton?: SpreadsheetSkeleton,
        private _allowCache: boolean = true
    ) {
        super(oKey, spreadsheetSkeleton);
        if (this._allowCache) {
            this._cacheCanvas = new Canvas();
            this._cacheCanvasTop = new Canvas();
            this._cacheCanvasLeftTop = new Canvas();
            this._cacheCanvasLeft = new Canvas();

            this.displayCache();

            this.onIsAddedToParentObserver.add((parent) => {
                (parent as Scene)?.getEngine()?.onTransformChangeObservable.add(() => {
                    console.log('onTransformChangeObservable resize');
                    this._resizeCacheCanvas();
                });
                console.log('onIsAddedToParentObserver resize');
                this._resizeCacheCanvas();
                this._addMakeDirtyToScroll();

                (parent as Scene)?.getViewports().forEach(vp => vp.makeDirty());
                // @ts-ignore
                // window.scene = parent;

            });
        }

        this._initialDefaultExtension();
        this.makeDirty(true);
    }

    setViewports(viewports: Viewport[]) {
        viewports.forEach( v => {
            this._forceDirtyByViewport[v.viewPortKey] = false;
            this.viewportDirty.set(v.viewPortKey, true);
        })
        this._cacheCanvasMap.set('viewMain', this._cacheCanvas);
        this._cacheCanvasMap.set('viewMainTop', this._cacheCanvasTop);
        this._cacheCanvasMap.set('viewMainLeft', this._cacheCanvasLeft);
        this._cacheCanvasMap.set('viewMainLeftTop', this._cacheCanvasLeftTop);
        // @ts-ignore
        window.cacheCanvasMap = this._cacheCanvasMap;
    }

    displayCache() {
        const globalThis = window as any;
        if (!globalThis.cacheSet) {
            globalThis.cacheSet = new Set();
        }
        globalThis.cacheSet.add(this._cacheCanvas);
        globalThis.cacheSet.add(this._cacheCanvasTop);
        globalThis.cacheSet.add(this._cacheCanvasLeft);
        globalThis.cacheSet.add(this._cacheCanvasLeftTop);
        const showCache = (cacheCanvas: typeof this._cacheCanvas) => {
            cacheCanvas.getCanvasEle().style.zIndex = '100';
            cacheCanvas.getCanvasEle().style.position = 'fixed';
            cacheCanvas.getCanvasEle().style.right = '0px';
            cacheCanvas.getCanvasEle().style.bottom = '0px';
            // cacheCanvas.getCanvasEle().style.top = '660px';
            cacheCanvas.getCanvasEle().style.background = 'pink';
            cacheCanvas.getCanvasEle().style.pointerEvents = 'none'; // 禁用事件响应
            cacheCanvas.getCanvasEle().style.border = '1px solid black'; // 设置边框样式
            cacheCanvas.getCanvasEle().style.transformOrigin = 'bottom right';
            cacheCanvas.getCanvasEle().style.transform = 'scale(0.5)';
            cacheCanvas.getCanvasEle().style.right = '0px';
            cacheCanvas.getCanvasEle().style.bottom = '0px';
            document.body.appendChild(cacheCanvas.getCanvasEle());
        }
        showCache(this._cacheCanvasTop);
    }

    get backgroundExtension() {
        return this._backgroundExtension;
    }

    get borderExtension() {
        return this._borderExtension;
    }

    get fontExtension() {
        return this._fontExtension;
    }

    override getDocuments() {
        return this._documents;
    }

    get allowCache() {
        return this._allowCache;
    }

    get forceDisableGridlines() {
        return this._forceDisableGridlines;
    }

    override draw(ctx: UniverRenderingContext, bounds?: IViewportBound) {
        // const { parent = { scaleX: 1, scaleY: 1 } } = this;
        // const mergeData = this.getMergeData();
        // const showGridlines = this.getShowGridlines() || 1;
        const spreadsheetSkeleton = this.getSkeleton();
        if (!spreadsheetSkeleton) {
            return;
        }

        const parentScale = this.getParentScale();

        const diffRanges = this._refreshIncrementalState
            ? bounds?.diffBounds.map((bound) => spreadsheetSkeleton.getRowColumnSegmentByViewBound(bound))
            : undefined;
        const extensions = this.getExtensionsByOrder();

        for (const extension of extensions) {
            const timeKey = `${bounds?.viewPortKey}-${extension.uKey}`;
            console.time(timeKey);
            extension.draw(ctx, parentScale, spreadsheetSkeleton, diffRanges);
            console.timeEnd(timeKey);
        }
    }

    override isHit(coord: Vector2) {
        const oCoord = this._getInverseCoord(coord);
        const skeleton = this.getSkeleton();
        if (!skeleton) {
            return false;
        }
        const { rowHeaderWidth, columnHeaderHeight } = skeleton;
        if (oCoord.x > rowHeaderWidth && oCoord.y > columnHeaderHeight) {
            return true;
        }
        return false;
    }

    override getNoMergeCellPositionByIndex(rowIndex: number, columnIndex: number) {
        const spreadsheetSkeleton = this.getSkeleton();
        if (!spreadsheetSkeleton) {
            return;
        }
        const { rowHeightAccumulation, columnWidthAccumulation, rowHeaderWidth, columnHeaderHeight } =
            spreadsheetSkeleton;

        let { startY, endY, startX, endX } = getCellPositionByIndex(
            rowIndex,
            columnIndex,
            rowHeightAccumulation,
            columnWidthAccumulation
        );

        startY += columnHeaderHeight;
        endY += columnHeaderHeight;
        startX += rowHeaderWidth;
        endX += rowHeaderWidth;

        return {
            startY,
            endY,
            startX,
            endX,
        };
    }

    override getScrollXYByRelativeCoords(coord: Vector2) {
        const scene = this.getParent() as Scene;
        let x = 0;
        let y = 0;
        const viewPort = scene.getActiveViewportByRelativeCoord(coord);
        if (viewPort) {
            const actualX = viewPort.actualScrollX || 0;
            const actualY = viewPort.actualScrollY || 0;
            x += actualX;
            y += actualY;
        }
        return {
            x,
            y,
        };
    }


    isForceDirty(): boolean {
        return this._forceDirty;
    }

    isForceDirtyByViewMap(viewPortKey: string){
        return this._forceDirtyByViewport[viewPortKey];
    }

    /**
     * 页面初始化和调整冻结行列会用到
     * @param viewPortKey
     */
    makeForceDirtyByViewMap(viewPortKey?: string){
        // return this._forceDirtyByViewport[viewPortKey];

        // if(!viewPortKey) {
        //     Object.keys(this._forceDirtyByViewport).forEach(key => {
        //         this._forceDirtyByViewport[key] = true;
        //         // console.log(key + ': ' + this._forceDirtyByViewport[key]);
        //     });
        // } else {
        //     this._forceDirtyByViewport[viewPortKey] = true;
        // }
    }

    /**
     * canvas resize & zoom
     * @param state
     */
    makeForceDirty(state = true) {
        // this.makeDirty(state);
        console.log('!!!_forceDirty', state);
        this._forceDirty = state;
        // this.makeForceDirtyByViewMap();
    }

    setForceDisableGridlines(disabled: boolean) {
        this._forceDisableGridlines = disabled;
    }

    override getSelectionBounding(startRow: number, startColumn: number, endRow: number, endColumn: number) {
        return this.getSkeleton()?.getMergeBounding(startRow, startColumn, endRow, endColumn);
    }

    /**
     * canvas resize 并不会调用此函数
     * @param state
     * @returns
     */
    override makeDirty(state: boolean = true) {
        super.makeDirty(state);
        // this.getScene()?.getViewports().forEach(vp => vp.makeDirty());
        return this;
    }

    makeDirtyArea(dirtyBounds: IBoundRectNoAngle[]) {
        // super.makeDirty(state);
        // if(state)this.markViewPortDirty(true);
        // return this;
    }

    viewportDirty: Map<string, boolean>  = new Map();

    isViewPortDirty(viewPortKey?: string) {
        if(!viewPortKey) return true;
        return !!this.viewportDirty.get(viewPortKey)
    }

    /**
     * 目前只有滚动用到了
     * @param state
     * @param viewPortKey
     */
    markViewPortDirty(state: boolean, viewPortKey?: string) {
        // if(!viewPortKey) {
        //     this.viewportDirty.forEach((value, key) => {
        //         this.viewportDirty.set(key, true);
        //     });
        // } else {
        //     this.viewportDirty.set(viewPortKey, state)
        // }
    }

    tickTime() {
        //@ts-ignore
        if(!window.lastTime) {
            //@ts-ignore
            window.lastTime = +new Date;
        } else {
            //@ts-ignore
            console.log('time', +new Date - window.lastTime);
            //@ts-ignore
            window.lastTime = +new Date;
        }

    }

    renderByViewport(mainCtx: UniverRenderingContext, bounds: IViewportBound, spreadsheetSkeleton: SpreadsheetSkeleton) {
        const { viewBound, diffBounds, diffX, diffY, viewPortPosition, viewPortKey, isDirty, isForceDirty } = bounds;
        const { rowHeaderWidth, columnHeaderHeight } = spreadsheetSkeleton;
        const { a: scaleX = 1, d: scaleY = 1 } = mainCtx.getTransform();
        mainCtx.translateWithPrecision(rowHeaderWidth, columnHeaderHeight);

        if (viewPortKey === 'viewMain') {
            const cacheCtx = this._cacheCanvas.getContext();
            cacheCtx.save();
            const { left, top, right, bottom } = viewPortPosition;

            const dw = right - left + rowHeaderWidth;

            const dh = bottom - top + columnHeaderHeight;


            // 没有滚动
            if (diffBounds.length === 0 || (diffX === 0 && diffY === 0) || isForceDirty) {
                console.time('!!!viewMain_render!!!_111');
                if (isDirty || isForceDirty || this.isForceDirty()) {


                    this._cacheCanvas.clear();
                    cacheCtx.setTransform(mainCtx.getTransform());
                    this._draw(cacheCtx, bounds);

                    // 注释掉这个 缓存 font 计算就失效了
                    // 但是有这句话，缩放又有问题。
                    // this._forceDirty = false;
                    this._forceDirtyByViewport[viewPortKey] = false;
                }
                this._applyCacheFreeze(mainCtx, this._cacheCanvas, left, top, dw, dh, left, top, dw, dh);

                // this._applyCache(mainCtx, left, top, dw, dh, left, top, dw, dh);
                console.timeEnd('!!!viewMain_render!!!_111');
            } else {
                // 一直 true 的话，会有残影出现
                console.log('!!!viewMain_render!!!_222, diffBounds', diffBounds, diffX, diffY, isDirty)
                console.time('!!!viewMain_render!!!_222');
                // if (this.isViewPortDirty(viewPortKey)) {
                if( isDirty || 1){
                    // console.time('viewMainscroll');

                    cacheCtx.save();
                    cacheCtx.setTransform(1, 0, 0, 1, 0, 0);
                    cacheCtx.globalCompositeOperation = 'copy';
                    cacheCtx.imageSmoothingEnabled = false;// 关闭抗锯齿  没有斜向图形不需要抗锯齿

                    cacheCtx.drawImage(this._cacheCanvas.getCanvasEle(), diffX * scaleX, diffY * scaleY);
                    // const imageData = cacheCtx.getImageData(0, 0, this._cacheCanvas.getCanvasEle().width, this._cacheCanvas.getCanvasEle().height);
                    // cacheCtx.clearRect(0, 0, this._cacheCanvas.getCanvasEle().width, this._cacheCanvas.getCanvasEle().height);
                    // cacheCtx.putImageData(imageData, diffX * scaleX, diffY * scaleY);
                    cacheCtx.restore();

                    this._refreshIncrementalState = true;
                    cacheCtx.setTransform(mainCtx.getTransform());

                    console.time('!!!viewMain_render_222---222');
                    for (const diffBound of diffBounds) {
                        const { left: diffLeft, right: diffRight, bottom: diffBottom, top: diffTop } = diffBound;
                        cacheCtx.save();
                        cacheCtx.beginPath();
                        const x = diffLeft - rowHeaderWidth - FIX_ONE_PIXEL_BLUR_OFFSET * 2;
                        const y = diffTop - columnHeaderHeight - FIX_ONE_PIXEL_BLUR_OFFSET * 2;
                        const w = diffRight - diffLeft + rowHeaderWidth + FIX_ONE_PIXEL_BLUR_OFFSET * 2;
                        const h = diffBottom - diffTop + columnHeaderHeight + FIX_ONE_PIXEL_BLUR_OFFSET * 2;
                        cacheCtx.rectByPrecision(x, y, w, h);
                        // cacheCtx.fillStyle = 'pink';

                        cacheCtx.clip();
                        // cacheCtx.fill();
                        // 222---222 关键耗时在这里
                        this._draw(cacheCtx, {
                            viewBound: bounds.viewBound,
                            diffBounds: [diffBound],
                            diffX: bounds.diffX,
                            diffY: bounds.diffY,
                            viewPortPosition: bounds.viewPortPosition,
                            viewPortKey: bounds.viewPortKey,
                        });
                        cacheCtx.restore();
                    }
                    console.timeEnd('!!!viewMain_render_222---222');

                    this._refreshIncrementalState = false;
                }
                this._applyCacheFreeze(mainCtx, this._cacheCanvas, left, top, dw, dh, left, top, dw, dh);
                // this._applyCache(mainCtx, left, top, dw, dh, left, top, dw, dh);
                console.timeEnd('!!!viewMain_render!!!_222');

            }
            cacheCtx.restore();
        } else {
            // console.time(`${viewPortKey}_render!!!`)
            const cacheCtx = this._cacheCanvasMap.get(viewPortKey)!.getContext();
            cacheCtx.save();
            const { left, top, right, bottom } = viewPortPosition;
            const dw = right - left + rowHeaderWidth;
            const dh = bottom - top + columnHeaderHeight;

            if (diffBounds.length === 0 || (diffX === 0 && diffY === 0) || isForceDirty) {
                console.time(`${viewPortKey}_render!!!_111`);
                // console.log('!!!renderByViewPort', this.isDirty(), this.isForceDirty(), this.isViewPortDirty(viewPortKey))
                // if (this.isViewPortDirty(viewPortKey) || this.isForceDirty()) {
                if (isDirty || isForceDirty || this.isForceDirty()) {
                    this._cacheCanvasMap.get(viewPortKey)!.clear();
                    cacheCtx.setTransform(mainCtx.getTransform());
                    // bounds.viewBound.top -= 20;
                    this._draw(cacheCtx, bounds);

                    // this._forceDirty = false;
                    // this._forceDirtyByViewport[viewPortKey] = false;
                }
                this._applyCacheFreeze(mainCtx, this._cacheCanvasMap.get(viewPortKey)!, left, top, dw, dh, left, top, dw, dh);
                console.timeEnd(`${viewPortKey}_render!!!_111`);
            } else {
                // if (this.isViewPortDirty(viewPortKey)) {
                if(isDirty || 1){
                    // console.time('viewMainTop_diff')
                    cacheCtx.save();
                    cacheCtx.setTransform(1, 0, 0, 1, 0, 0);
                    cacheCtx.globalCompositeOperation = 'copy';
                    cacheCtx.drawImage(this._cacheCanvasMap.get(viewPortKey)!.getCanvasEle(), diffX * scaleX, diffY * scaleY);
                    cacheCtx.restore();

                    this._refreshIncrementalState = true;
                    cacheCtx.setTransform(mainCtx.getTransform());
                    for (const diffBound of diffBounds) {
                        const { left: diffLeft, right: diffRight, bottom: diffBottom, top: diffTop } = diffBound;
                        cacheCtx.save();
                        cacheCtx.beginPath();
                        const x = diffLeft - rowHeaderWidth - FIX_ONE_PIXEL_BLUR_OFFSET * 2;
                        const y = diffTop - columnHeaderHeight - FIX_ONE_PIXEL_BLUR_OFFSET * 2;
                        const w = diffRight - diffLeft + rowHeaderWidth + FIX_ONE_PIXEL_BLUR_OFFSET * 2;
                        const h = diffBottom - diffTop + columnHeaderHeight + FIX_ONE_PIXEL_BLUR_OFFSET * 2;
                        cacheCtx.rectByPrecision(x, y, w, h);

                        cacheCtx.clip();
                        this._draw(cacheCtx, {
                            viewBound: bounds.viewBound,
                            diffBounds: [diffBound],
                            diffX: bounds.diffX,
                            diffY: bounds.diffY,
                            viewPortPosition: bounds.viewPortPosition,
                            viewPortKey: bounds.viewPortKey,
                        });
                        cacheCtx.restore();
                    }

                    this._refreshIncrementalState = false;
                }
                this._applyCacheFreeze(mainCtx, this._cacheCanvasMap.get(viewPortKey)!, left, top, dw, dh, left, top, dw, dh);
            }
            cacheCtx.restore();
        }


        // console.time('!!!viewMainLeftTop_render');
        // if(viewPortKey === 'viewMainLeftTop') {
        //     const cacheCtxLeftTop = this._cacheCanvasLeftTop.getContext();
        //     cacheCtxLeftTop.save();
        //     const { left, top, right, bottom } = viewPortPosition;
        //     const dw = right - left + rowHeaderWidth;
        //     const dh = bottom - top + columnHeaderHeight;

        //     if (diffBounds.length === 0 || (diffX === 0 && diffY === 0)) {
        //         // if (this.isViewPortDirty(viewPortKey) || this.isForceDirty()) {
        //             if (this.isDirty() || this.isForceDirty()) {
        //             this._cacheCanvasLeftTop.clear();
        //             cacheCtxLeftTop.setTransform(mainCtx.getTransform());
        //             this._draw(cacheCtxLeftTop, bounds);

        //             // this._forceDirty = false;
        //             this._forceDirtyByViewport[viewPortKey] = false;
        //         }
        //         this._applyCacheFreeze(mainCtx, this._cacheCanvasLeftTop, left, top, dw, dh, left, top, dw, dh);
        //     } else {
        //         // if (this.isViewPortDirty(viewPortKey)) {
        //         // if( this.isDirty()){
        //             cacheCtxLeftTop.save();
        //             cacheCtxLeftTop.setTransform(1, 0, 0, 1, 0, 0);
        //             cacheCtxLeftTop.globalCompositeOperation = 'copy';
        //             cacheCtxLeftTop.drawImage(this._cacheCanvasLeftTop.getCanvasEle(), diffX * scaleX, diffY * scaleY);
        //             cacheCtxLeftTop.restore();

        //             this._refreshIncrementalState = true;
        //             cacheCtxLeftTop.setTransform(mainCtx.getTransform());
        //             for (const diffBound of diffBounds) {
        //                 const { left: diffLeft, right: diffRight, bottom: diffBottom, top: diffTop } = diffBound;
        //                 cacheCtxLeftTop.save();
        //                 cacheCtxLeftTop.beginPath();
        //                 const x = diffLeft - rowHeaderWidth - FIX_ONE_PIXEL_BLUR_OFFSET * 2;
        //                 const y = diffTop - columnHeaderHeight - FIX_ONE_PIXEL_BLUR_OFFSET * 2;
        //                 const w = diffRight - diffLeft + rowHeaderWidth + FIX_ONE_PIXEL_BLUR_OFFSET * 2;
        //                 const h = diffBottom - diffTop + columnHeaderHeight + FIX_ONE_PIXEL_BLUR_OFFSET * 2;
        //                 cacheCtxLeftTop.rectByPrecision(x, y, w, h);

        //                 cacheCtxLeftTop.clip();
        //                 this._draw(cacheCtxLeftTop, {
        //                     viewBound: bounds.viewBound,
        //                     diffBounds: [diffBound],
        //                     diffX: bounds.diffX,
        //                     diffY: bounds.diffY,
        //                     viewPortPosition: bounds.viewPortPosition,
        //                     viewPortKey: bounds.viewPortKey,
        //                 });
        //                 cacheCtxLeftTop.restore();
        //             }

        //             this._refreshIncrementalState = false;
        //         // }
        //         this._applyCacheFreeze(mainCtx, this._cacheCanvasLeftTop, left, top, dw, dh, left, top, dw, dh);
        //     }
        //     cacheCtxLeftTop.restore();
        // }
        // console.timeEnd('!!!viewMainLeftTop_render');


        // console.time('!!!viewMainLeft_render');
        // if(viewPortKey === 'viewMainLeft') {
        //     const cacheCtxLeft = this._cacheCanvasLeft.getContext();
        //     cacheCtxLeft.save();
        //     const { left, top, right, bottom } = viewPortPosition;
        //     const dw = right - left + rowHeaderWidth;
        //     const dh = bottom - top + columnHeaderHeight;

        //     if (diffBounds.length === 0 || (diffX === 0 && diffY === 0)) {
        //         // if (this.isViewPortDirty(viewPortKey) || this.isForceDirty()) {
        //         console.time('!!!viewMainLeft_render_111');
        //         if (this.isDirty() || this.isForceDirty()) {
        //             this._cacheCanvasLeft.clear();
        //             cacheCtxLeft.setTransform(mainCtx.getTransform());
        //             this._draw(cacheCtxLeft, bounds);

        //             // this._forceDirty = false;
        //             this._forceDirtyByViewport[viewPortKey] = false;
        //         }
        //         this._applyCacheFreeze(mainCtx, this._cacheCanvasLeft, left, top, dw, dh, left, top, dw, dh);
        //         console.timeEnd('!!!viewMainLeft_render_111');
        //     } else {
        //         // if (this.isViewPortDirty(viewPortKey)) {
        //         // if( this.isDirty()){
        //             cacheCtxLeft.save();
        //             cacheCtxLeft.setTransform(1, 0, 0, 1, 0, 0);
        //             cacheCtxLeft.globalCompositeOperation = 'copy';
        //             cacheCtxLeft.drawImage(this._cacheCanvasLeft.getCanvasEle(), diffX * scaleX, diffY * scaleY);
        //             cacheCtxLeft.restore();

        //             this._refreshIncrementalState = true;
        //             cacheCtxLeft.setTransform(mainCtx.getTransform());
        //             for (const diffBound of diffBounds) {
        //                 const { left: diffLeft, right: diffRight, bottom: diffBottom, top: diffTop } = diffBound;
        //                 cacheCtxLeft.save();
        //                 cacheCtxLeft.beginPath();
        //                 const x = diffLeft - rowHeaderWidth - FIX_ONE_PIXEL_BLUR_OFFSET * 2;
        //                 const y = diffTop - columnHeaderHeight - FIX_ONE_PIXEL_BLUR_OFFSET * 2;
        //                 const w = diffRight - diffLeft + rowHeaderWidth + FIX_ONE_PIXEL_BLUR_OFFSET * 2;
        //                 const h = diffBottom - diffTop + columnHeaderHeight + FIX_ONE_PIXEL_BLUR_OFFSET * 2;
        //                 cacheCtxLeft.rectByPrecision(x, y, w, h);

        //                 cacheCtxLeft.clip();
        //                 this._draw(cacheCtxLeft, {
        //                     viewBound: bounds.viewBound,
        //                     diffBounds: [diffBound],
        //                     diffX: bounds.diffX,
        //                     diffY: bounds.diffY,
        //                     viewPortPosition: bounds.viewPortPosition,
        //                     viewPortKey: bounds.viewPortKey,
        //                 });
        //                 cacheCtxLeft.restore();
        //             }

        //             this._refreshIncrementalState = false;
        //         // }
        //         this._applyCacheFreeze(mainCtx, this._cacheCanvasLeft, left, top, dw, dh, left, top, dw, dh);
        //     }
        //     cacheCtxLeft.restore();
        // }
        // console.timeEnd('!!!viewMainLeft_render');
    }

    override render(mainCtx: UniverRenderingContext, bounds: IViewportBound) {
        if (!this.visible) {
            this.makeDirty(false);
            return this;
        }

        const spreadsheetSkeleton = this.getSkeleton();

        if (!spreadsheetSkeleton) {
            return;
        }

        spreadsheetSkeleton.calculateWithoutClearingCache(bounds);

        const segment = spreadsheetSkeleton.rowColumnSegment;

        if (
            (segment.startRow === -1 && segment.endRow === -1) ||
            (segment.startColumn === -1 && segment.endColumn === -1)
        ) {
            return;
        }

        mainCtx.save();


        // const { rowHeaderWidth, columnHeaderHeight } = spreadsheetSkeleton;
        // mainCtx.translateWithPrecision(rowHeaderWidth, columnHeaderHeight);

        // this._drawAuxiliary(mainCtx, bounds);

        const { viewPortKey } = bounds;
        if (bounds && this._allowCache === true) {
            // console.time('!!!renderByViewport');
            this.renderByViewport(mainCtx, bounds, spreadsheetSkeleton);
            // console.timeEnd('!!!renderByViewport');

        } else {
            this._draw(mainCtx, bounds);
        }

        mainCtx.restore();
        return this;
    }

    /**
     * (parent as Scene)?.getEngine()?.onTransformChangeObservable.add(
     * this.onIsAddedToParentObserver.add()
     * @returns
     */
    private _resizeCacheCanvas() {
        const parentSize = this._getAncestorSize();
        if (!parentSize || this._cacheCanvas == null) {
            return;
        }
        const { width, height } = parentSize;
        this._cacheCanvas.setSize(width, height);
        this._cacheCanvasTop.setSize(width, height);
        this._cacheCanvasLeft.setSize(width, height);
        this._cacheCanvasLeftTop.setSize(width, height);
        // this.makeDirty(true);
        // resize 后要整个重新绘制
        // render 根据 _forceDirty 才清空 cacheCanvas
        this.makeForceDirty(true);
        this.makeForceDirtyByViewMap();

    }

    protected _applyCache(
        ctx?: UniverRenderingContext,
        sx: number = 0,
        sy: number = 0,
        sw: number = 0,
        sh: number = 0,
        dx: number = 0,
        dy: number = 0,
        dw: number = 0,
        dh: number = 0
    ) {
        // if (!ctx) {
        //     return;
        // }

        // const pixelRatio = this._cacheCanvas.getPixelRatio();

        // const cacheCtx = this._cacheCanvas.getContext();
        // cacheCtx.save();
        // ctx.save();
        // ctx.setTransform(1, 0, 0, 1, 0, 0);
        // cacheCtx.setTransform(1, 0, 0, 1, 0, 0);
        // ctx.drawImage(
        //     this._cacheCanvas.getCanvasEle(),
        //     sx * pixelRatio,
        //     sy * pixelRatio,
        //     sw * pixelRatio,
        //     sh * pixelRatio,
        //     dx * pixelRatio,
        //     dy * pixelRatio,
        //     dw * pixelRatio,
        //     dh * pixelRatio
        // );
        // ctx.restore();
        // cacheCtx.restore();
    }

    protected _applyCacheFreeze(
        mainCtx: UniverRenderingContext,
        cacheCanvas: typeof this._cacheCanvas,
        sx: number = 0,
        sy: number = 0,
        sw: number = 0,
        sh: number = 0,
        dx: number = 0,
        dy: number = 0,
        dw: number = 0,
        dh: number = 0
    ) {
        if (!mainCtx) {
            return;
        }

        const pixelRatio = cacheCanvas.getPixelRatio();

        const cacheCtx = cacheCanvas.getContext();
        cacheCtx.save();
        mainCtx.save();
        mainCtx.setTransform(1, 0, 0, 1, 0, 0);
        cacheCtx.setTransform(1, 0, 0, 1, 0, 0);
        mainCtx.globalCompositeOperation = "source-over";
        mainCtx.drawImage(
            cacheCanvas.getCanvasEle(),
            sx * pixelRatio,
            sy * pixelRatio,
            sw * pixelRatio,
            sh * pixelRatio,
            dx * pixelRatio,
            dy * pixelRatio,
            dw * pixelRatio,
            dh * pixelRatio
        );
        mainCtx.restore();
        cacheCtx.restore();
        // // @ts-ignore
        // if(!window.cacheImg) {
        //     // @ts-ignore
        //     window.cacheImg = cacheCtx.canvas.toDataURL();
        // }
        // // @ts-ignore
        // if(!window.mainImg) {
        //     // @ts-ignore
        //     window.mainImg = mainCtx.canvas.toDataURL();
        // }
    }

    protected override _draw(ctx: UniverRenderingContext, bounds?: IViewportBound) {
        this.draw(ctx, bounds);
    }

    private _getAncestorSize() {
        const parent = this._getAncestorParent();
        if (!parent) {
            return;
        }

        if (parent.classType === RENDER_CLASS_TYPE.ENGINE) {
            const mainCanvas = (parent as Engine).getCanvas();
            return {
                width: mainCanvas.getWidth(),
                height: mainCanvas.getHeight(),
            };
        }
        if (parent.classType === RENDER_CLASS_TYPE.SCENE_VIEWER) {
            return {
                width: parent.width,
                height: parent.height,
            };
        }
    }

    private _getAncestorParent(): Nullable<Engine | SceneViewer> {
        let parent: any = this.parent;
        while (parent) {
            if (parent.classType === RENDER_CLASS_TYPE.ENGINE || parent.classType === RENDER_CLASS_TYPE.SCENE_VIEWER) {
                return parent as Nullable<Engine | SceneViewer>;
            }
            parent = parent?.getParent && parent?.getParent();
        }
    }

    private _initialDefaultExtension() {
        SpreadsheetExtensionRegistry.getData()
            .sort(sortRules)
            .forEach((Extension) => {
                this.register(new Extension());
            });
        // this._borderAuxiliaryExtension = this.getExtensionByKey('DefaultBorderAuxiliaryExtension') as BorderAuxiliary;
        this._backgroundExtension = this.getExtensionByKey('DefaultBackgroundExtension') as Background;
        this._borderExtension = this.getExtensionByKey('DefaultBorderExtension') as Border;
        this._fontExtension = this.getExtensionByKey('DefaultFontExtension') as Font;
    }

    private _addMakeDirtyToScroll() {
        this._hasScrollViewportOperator(this, (viewport: Viewport) => {
            // 只有 _getHasScrollViewports() 才会进入这里  也就是 viewMain
            // console.log('!!!!!_addMakeDirtyToScroll', viewport.viewPortKey);
            viewport.onScrollBeforeObserver.add((eventData) => {
                // this.makeDirty(true);
                // eventData.viewport
                // console.log('!!_hasScrollViewportOperator', eventData.viewport?.viewPortKey);
                // this.markViewPortDirty(true, eventData.viewport?.viewPortKey);
                // this.markViewPortDirty(true);

            });
        });
    }

    private _hasScrollViewportOperator(object: BaseObject, fn: (viewPort: Viewport) => void) {
        let parent: any = object.getParent();
        while (parent) {
            if (parent.classType === RENDER_CLASS_TYPE.SCENE) {
                const viewports = parent.getViewports();
                const viewPorts = this._getHasScrollViewports(viewports);
                for (const viewport of viewPorts) {
                    if (viewport) {
                        fn(viewport);
                    }
                }
            }
            parent = parent?.getParent && parent?.getParent();
        }
    }

    private _getHasScrollViewports(viewports: Viewport[]) {
        const newViewports: Viewport[] = [];
        for (const viewport of viewports) {
            const scrollBar = viewport.getScrollBar();
            if (scrollBar) {
                newViewports.push(viewport);
            }
        }
        return newViewports;
    }

    /**
     * draw gridlines
     * @param ctx
     * @param bounds
     * @returns
     */
    private _drawAuxiliary(ctx: UniverRenderingContext, bounds?: IViewportBound) {
        const spreadsheetSkeleton = this.getSkeleton();
        if (spreadsheetSkeleton == null) {
            return;
        }

        const { rowColumnSegment, dataMergeCache, overflowCache, stylesCache, showGridlines } = spreadsheetSkeleton;
        const { border, backgroundPositions } = stylesCache;
        const { startRow, endRow, startColumn, endColumn } = rowColumnSegment;
        if (!spreadsheetSkeleton || showGridlines === BooleanNumber.FALSE || this._forceDisableGridlines) {
            return;
        }

        const { rowHeightAccumulation, columnTotalWidth, columnWidthAccumulation, rowTotalHeight } =
            spreadsheetSkeleton;
        if (
            !rowHeightAccumulation ||
            !columnWidthAccumulation ||
            columnTotalWidth === undefined ||
            rowTotalHeight === undefined
        ) {
            return;
        }
        ctx.save();

        ctx.setLineWidthByPrecision(1);

        ctx.strokeStyle = getColor([212, 212, 212]);

        const columnWidthAccumulationLength = columnWidthAccumulation.length;
        const rowHeightAccumulationLength = rowHeightAccumulation.length;
        const EXTRA_BOUND = 0.4;
        const rowCount = endRow - startRow + 1;
        const columnCount = endColumn - startColumn + 1;
        const extraRowCount = Math.ceil(rowCount * EXTRA_BOUND);
        const extraColumnCount = Math.ceil(columnCount * EXTRA_BOUND);

        const rowStart = Math.max(Math.floor(startRow - extraRowCount), 0);
        const rowEnd = Math.min(Math.ceil(endRow + extraRowCount), rowHeightAccumulationLength - 1);
        const columnEnd = Math.min(Math.ceil(endColumn + (extraColumnCount)), columnWidthAccumulationLength - 1);
        const columnStart = Math.max(Math.floor(startColumn - (extraColumnCount)), 0);

        const startX = columnWidthAccumulation[columnStart - 1] || 0;
        const startY = rowHeightAccumulation[rowStart - 1] || 0;
        const endX = columnWidthAccumulation[columnEnd];
        const endY = rowHeightAccumulation[rowEnd];
        ctx.translateWithPrecisionRatio(FIX_ONE_PIXEL_BLUR_OFFSET, FIX_ONE_PIXEL_BLUR_OFFSET);

        ctx.beginPath();
        ctx.moveToByPrecision(startX, startY);
        ctx.lineToByPrecision(endX, startY);

        ctx.moveToByPrecision(startX, startY);
        ctx.lineToByPrecision(startX, endY);

        ctx.closePathByEnv();
        ctx.stroke();

        for (let r = rowStart; r <= rowEnd; r++) {
            if (r < 0 || r > rowHeightAccumulationLength - 1) {
                continue;
            }
            const rowEndPosition = rowHeightAccumulation[r];
            ctx.beginPath();
            ctx.moveToByPrecision(startX, rowEndPosition);
            ctx.lineToByPrecision(endX, rowEndPosition);
            ctx.closePathByEnv();
            ctx.stroke();
        }

        for (let c = columnStart; c <= columnEnd; c++) {
            if (c < 0 || c > columnWidthAccumulationLength - 1) {
                continue;
            }
            const columnEndPosition = columnWidthAccumulation[c];
            ctx.beginPath();
            ctx.moveToByPrecision(columnEndPosition, startY);
            ctx.lineToByPrecision(columnEndPosition, endY);
            ctx.closePathByEnv();
            ctx.stroke();
        }
        // console.log('xx2', scaleX, scaleY, columnTotalWidth, rowTotalHeight, rowHeightAccumulation, columnWidthAccumulation);

        // border?.forValue((rowIndex, columnIndex, borderCaches) => {
        //     if (!borderCaches) {
        //         return true;
        //     }

        //     const cellInfo = spreadsheetSkeleton.getCellByIndexWithNoHeader(rowIndex, columnIndex);

        //     let { startY, endY, startX, endX } = cellInfo;
        //     const { isMerged, isMergedMainCell, mergeInfo } = cellInfo;

        //     if (isMerged) {
        //         return true;
        //     }

        //     if (isMergedMainCell) {
        //         startY = mergeInfo.startY;
        //         endY = mergeInfo.endY;
        //         startX = mergeInfo.startX;
        //         endX = mergeInfo.endX;
        //     }

        //     if (!(mergeInfo.startRow >= rowStart && mergeInfo.endRow <= rowEnd)) {
        //         return true;
        //     }

        //     for (const key in borderCaches) {
        //         const { type } = borderCaches[key] as BorderCacheItem;

        //         clearLineByBorderType(ctx, type, { startX, startY, endX, endY });
        //     }
        // });

        // Clearing the dashed line issue caused by overlaid auxiliary lines and strokes
        // merge cell
        // this._clearRectangle(ctx, rowHeightAccumulation, columnWidthAccumulation, dataMergeCache);

        // overflow cell
        // this._clearRectangle(ctx, rowHeightAccumulation, columnWidthAccumulation, overflowCache.toNativeArray());

        this._clearBackground(ctx, backgroundPositions);

        ctx.restore();
    }

    /**
     * Clear the guide lines within a range in the table, to make room for merged cells and overflow.
     */
    private _clearRectangle(
        ctx: UniverRenderingContext,
        rowHeightAccumulation: number[],
        columnWidthAccumulation: number[],
        dataMergeCache?: IRange[]
    ) {
        if (dataMergeCache == null) {
            return;
        }
        for (const dataCache of dataMergeCache) {
            const { startRow, endRow, startColumn, endColumn } = dataCache;

            const startY = rowHeightAccumulation[startRow - 1] || 0;
            const endY = rowHeightAccumulation[endRow] || rowHeightAccumulation[rowHeightAccumulation.length - 1];

            const startX = columnWidthAccumulation[startColumn - 1] || 0;
            const endX =
                columnWidthAccumulation[endColumn] || columnWidthAccumulation[columnWidthAccumulation.length - 1];

            ctx.clearRectByPrecision(startX, startY, endX - startX, endY - startY);

            // After ClearRect, the lines will become thinner, and the lines will be repaired below.
            ctx.beginPath();
            ctx.moveToByPrecision(startX, startY);
            ctx.lineToByPrecision(endX, startY);
            ctx.lineToByPrecision(endX, endY);
            ctx.lineToByPrecision(startX, endY);
            ctx.lineToByPrecision(startX, startY);
            ctx.stroke();
            ctx.closePath();
        }
    }

    private _clearBackground(ctx: UniverRenderingContext, backgroundPositions?: ObjectMatrix<ISelectionCellWithCoord>) {
        backgroundPositions?.forValue((row, column, cellInfo) => {
            let { startY, endY, startX, endX } = cellInfo;
            const { isMerged, isMergedMainCell, mergeInfo } = cellInfo;
            if (isMerged) {
                return true;
            }

            if (isMergedMainCell) {
                startY = mergeInfo.startY;
                endY = mergeInfo.endY;
                startX = mergeInfo.startX;
                endX = mergeInfo.endX;
            }

            ctx.clearRectForTexture(startX, startY, endX - startX + 0.5, endY - startY + 0.5);
        });
    }
}
