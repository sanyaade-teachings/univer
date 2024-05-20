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

import { LocaleType, Univer } from '@univerjs/core';
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula';
import { UniverRenderEnginePlugin } from '@univerjs/engine-render';
import { UniverRPCWorkerThreadPlugin } from '@univerjs/rpc';
import { UniverSheetsPlugin } from '@univerjs/sheets';
import { UniverSheetsFilterPlugin } from '@univerjs/sheets-filter';
import { UniverSheetsUIPlugin } from '@univerjs/sheets-ui';
import { UniverUIPlugin } from '@univerjs/ui';

const groupname = '[worker] canvasworker new univer';
console.group(groupname);
// Univer web worker is also a univer application.
const univer = new Univer({
    locale: LocaleType.ZH_CN,
});

univer.registerPlugin(UniverRenderEnginePlugin);
// univer.registerPlugin(UniverUIPlugin, {
//     container: 'app',
//     header: true,
//     footer: true,
// });
univer.registerPlugin(UniverSheetsPlugin);
// univer.registerPlugin(UniverSheetsUIPlugin);
univer.registerPlugin(UniverFormulaEnginePlugin);
univer.registerPlugin(UniverRPCWorkerThreadPlugin);
univer.registerPlugin(UniverSheetsFilterPlugin);

console.groupEnd();
const prefix = (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) ? '[Worker]' : '[Main Thread]';
// console.log('canvas worker', prefix);

declare let self: WorkerGlobalScope & typeof globalThis & { univer: Univer };
self.univer = univer;
