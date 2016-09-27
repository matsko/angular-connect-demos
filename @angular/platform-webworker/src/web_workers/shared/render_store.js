/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core';
export var RenderStore = (function () {
    function RenderStore() {
        this._nextIndex = 0;
        this._lookupById = new Map();
        this._lookupByObject = new Map();
    }
    RenderStore.prototype.allocateId = function () { return this._nextIndex++; };
    RenderStore.prototype.store = function (obj, id) {
        this._lookupById.set(id, obj);
        this._lookupByObject.set(obj, id);
    };
    RenderStore.prototype.remove = function (obj) {
        var index = this._lookupByObject.get(obj);
        this._lookupByObject.delete(obj);
        this._lookupById.delete(index);
    };
    RenderStore.prototype.deserialize = function (id) {
        if (id == null) {
            return null;
        }
        if (!this._lookupById.has(id)) {
            return null;
        }
        return this._lookupById.get(id);
    };
    RenderStore.prototype.serialize = function (obj) {
        if (obj == null) {
            return null;
        }
        return this._lookupByObject.get(obj);
    };
    RenderStore.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    RenderStore.ctorParameters = [];
    return RenderStore;
}());
//# sourceMappingURL=render_store.js.map