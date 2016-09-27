/**
 * @license Angular v0.0.0-PLACEHOLDER
 * (c) 2010-2016 Google, Inc. https://angular.io/
 * License: MIT
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser'), require('rxjs/Subject'), require('rxjs/Observable'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/platform-browser', 'rxjs/Subject', 'rxjs/Observable', '@angular/common'], factory) :
    (factory((global.ng = global.ng || {}, global.ng.platformWebworker = global.ng.platformWebworker || {}),global.ng.core,global.ng.platformBrowser,global.Rx,global.Rx,global.ng.common));
}(this, function (exports,_angular_core,_angular_platformBrowser,rxjs_Subject,rxjs_Observable,_angular_common) { 'use strict';

    var BROWSER_SANITIZATION_PROVIDERS = _angular_platformBrowser.__platform_browser_private__.BROWSER_SANITIZATION_PROVIDERS;
    var BrowserPlatformLocation = _angular_platformBrowser.__platform_browser_private__.BrowserPlatformLocation;
    var getDOM = _angular_platformBrowser.__platform_browser_private__.getDOM;
    var BrowserDomAdapter = _angular_platformBrowser.__platform_browser_private__.BrowserDomAdapter;
    var BrowserGetTestability = _angular_platformBrowser.__platform_browser_private__.BrowserGetTestability;
    var DomRootRenderer = _angular_platformBrowser.__platform_browser_private__.DomRootRenderer;
    var DomRootRenderer_ = _angular_platformBrowser.__platform_browser_private__.DomRootRenderer_;
    var DomEventsPlugin = _angular_platformBrowser.__platform_browser_private__.DomEventsPlugin;
    var DomSharedStylesHost = _angular_platformBrowser.__platform_browser_private__.DomSharedStylesHost;
    var SharedStylesHost = _angular_platformBrowser.__platform_browser_private__.SharedStylesHost;
    var KeyEventsPlugin = _angular_platformBrowser.__platform_browser_private__.KeyEventsPlugin;
    var HammerGesturesPlugin = _angular_platformBrowser.__platform_browser_private__.HammerGesturesPlugin;
    var DomAdapter = _angular_platformBrowser.__platform_browser_private__.DomAdapter;
    var setRootDomAdapter = _angular_platformBrowser.__platform_browser_private__.setRootDomAdapter;

    var ON_WEB_WORKER = new _angular_core.OpaqueToken('WebWorker.onWebWorker');

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var globalScope;
    if (typeof window === 'undefined') {
        if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
            // TODO: Replace any with WorkerGlobalScope from lib.webworker.d.ts #3492
            globalScope = self;
        }
        else {
            globalScope = global;
        }
    }
    else {
        globalScope = window;
    }
    // Need to declare a new variable for global here since TypeScript
    // exports the original value of the symbol.
    var _global = globalScope;
    var Date = _global.Date;
    // TODO: remove calls to assert in production environment
    // Note: Can't just export this and import in in other files
    // as `assert` is a reserved keyword in Dart
    _global.assert = function assert(condition) {
        // TODO: to be fixed properly via #2830, noop for now
    };
    function isPresent(obj) {
        return obj !== undefined && obj !== null;
    }
    function isBlank(obj) {
        return obj === undefined || obj === null;
    }
    function isArray(obj) {
        return Array.isArray(obj);
    }
    function stringify(token) {
        if (typeof token === 'string') {
            return token;
        }
        if (token === undefined || token === null) {
            return '' + token;
        }
        if (token.overriddenName) {
            return token.overriddenName;
        }
        if (token.name) {
            return token.name;
        }
        var res = token.toString();
        var newLineIndex = res.indexOf('\n');
        return (newLineIndex === -1) ? res : res.substring(0, newLineIndex);
    }
    // serialize / deserialize enum exist only for consistency with dart API
    // enums in typescript don't need to be serialized
    function serializeEnum(val) {
        return val;
    }
    var StringWrapper = (function () {
        function StringWrapper() {
        }
        StringWrapper.fromCharCode = function (code) { return String.fromCharCode(code); };
        StringWrapper.charCodeAt = function (s, index) { return s.charCodeAt(index); };
        StringWrapper.split = function (s, regExp) { return s.split(regExp); };
        StringWrapper.equals = function (s, s2) { return s === s2; };
        StringWrapper.stripLeft = function (s, charVal) {
            if (s && s.length) {
                var pos = 0;
                for (var i = 0; i < s.length; i++) {
                    if (s[i] != charVal)
                        break;
                    pos++;
                }
                s = s.substring(pos);
            }
            return s;
        };
        StringWrapper.stripRight = function (s, charVal) {
            if (s && s.length) {
                var pos = s.length;
                for (var i = s.length - 1; i >= 0; i--) {
                    if (s[i] != charVal)
                        break;
                    pos--;
                }
                s = s.substring(0, pos);
            }
            return s;
        };
        StringWrapper.replace = function (s, from, replace) {
            return s.replace(from, replace);
        };
        StringWrapper.replaceAll = function (s, from, replace) {
            return s.replace(from, replace);
        };
        StringWrapper.slice = function (s, from, to) {
            if (from === void 0) { from = 0; }
            if (to === void 0) { to = null; }
            return s.slice(from, to === null ? undefined : to);
        };
        StringWrapper.replaceAllMapped = function (s, from, cb) {
            return s.replace(from, function () {
                var matches = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    matches[_i - 0] = arguments[_i];
                }
                // Remove offset & string from the result array
                matches.splice(-2, 2);
                // The callback receives match, p1, ..., pn
                return cb(matches);
            });
        };
        StringWrapper.contains = function (s, substr) { return s.indexOf(substr) != -1; };
        StringWrapper.compare = function (a, b) {
            if (a < b) {
                return -1;
            }
            else if (a > b) {
                return 1;
            }
            else {
                return 0;
            }
        };
        return StringWrapper;
    }());
    var NumberWrapper = (function () {
        function NumberWrapper() {
        }
        NumberWrapper.toFixed = function (n, fractionDigits) { return n.toFixed(fractionDigits); };
        NumberWrapper.equal = function (a, b) { return a === b; };
        NumberWrapper.parseIntAutoRadix = function (text) {
            var result = parseInt(text);
            if (isNaN(result)) {
                throw new Error('Invalid integer literal when parsing ' + text);
            }
            return result;
        };
        NumberWrapper.parseInt = function (text, radix) {
            if (radix == 10) {
                if (/^(\-|\+)?[0-9]+$/.test(text)) {
                    return parseInt(text, radix);
                }
            }
            else if (radix == 16) {
                if (/^(\-|\+)?[0-9ABCDEFabcdef]+$/.test(text)) {
                    return parseInt(text, radix);
                }
            }
            else {
                var result = parseInt(text, radix);
                if (!isNaN(result)) {
                    return result;
                }
            }
            throw new Error('Invalid integer literal when parsing ' + text + ' in base ' + radix);
        };
        Object.defineProperty(NumberWrapper, "NaN", {
            get: function () { return NaN; },
            enumerable: true,
            configurable: true
        });
        NumberWrapper.isNumeric = function (value) { return !isNaN(value - parseFloat(value)); };
        NumberWrapper.isNaN = function (value) { return isNaN(value); };
        NumberWrapper.isInteger = function (value) { return Number.isInteger(value); };
        return NumberWrapper;
    }());
    var FunctionWrapper = (function () {
        function FunctionWrapper() {
        }
        FunctionWrapper.apply = function (fn, posArgs) { return fn.apply(null, posArgs); };
        FunctionWrapper.bind = function (fn, scope) { return fn.bind(scope); };
        return FunctionWrapper;
    }());
    function print(obj) {
        console.log(obj);
    }
    var DateWrapper = (function () {
        function DateWrapper() {
        }
        DateWrapper.create = function (year, month, day, hour, minutes, seconds, milliseconds) {
            if (month === void 0) { month = 1; }
            if (day === void 0) { day = 1; }
            if (hour === void 0) { hour = 0; }
            if (minutes === void 0) { minutes = 0; }
            if (seconds === void 0) { seconds = 0; }
            if (milliseconds === void 0) { milliseconds = 0; }
            return new Date(year, month - 1, day, hour, minutes, seconds, milliseconds);
        };
        DateWrapper.fromISOString = function (str) { return new Date(str); };
        DateWrapper.fromMillis = function (ms) { return new Date(ms); };
        DateWrapper.toMillis = function (date) { return date.getTime(); };
        DateWrapper.now = function () { return new Date(); };
        DateWrapper.toJson = function (date) { return date.toJSON(); };
        return DateWrapper;
    }());

    var _clearValues = (function () {
        if ((new Map()).keys().next) {
            return function _clearValues(m) {
                var keyIterator = m.keys();
                var k;
                while (!((k = keyIterator.next()).done)) {
                    m.set(k.value, null);
                }
            };
        }
        else {
            return function _clearValuesWithForeEach(m) {
                m.forEach(function (v, k) { m.set(k, null); });
            };
        }
    })();
    // Safari doesn't implement MapIterator.next(), which is used is Traceur's polyfill of Array.from
    // TODO(mlaval): remove the work around once we have a working polyfill of Array.from
    var _arrayFromMap = (function () {
        try {
            if ((new Map()).values().next) {
                return function createArrayFromMap(m, getValues) {
                    return getValues ? Array.from(m.values()) : Array.from(m.keys());
                };
            }
        }
        catch (e) {
        }
        return function createArrayFromMapWithForeach(m, getValues) {
            var res = new Array(m.size), i = 0;
            m.forEach(function (v, k) {
                res[i] = getValues ? v : k;
                i++;
            });
            return res;
        };
    })();
    /**
     * Wraps Javascript Objects
     */
    var StringMapWrapper = (function () {
        function StringMapWrapper() {
        }
        StringMapWrapper.get = function (map, key) {
            return map.hasOwnProperty(key) ? map[key] : undefined;
        };
        StringMapWrapper.set = function (map, key, value) { map[key] = value; };
        StringMapWrapper.keys = function (map) { return Object.keys(map); };
        StringMapWrapper.values = function (map) {
            return Object.keys(map).map(function (k) { return map[k]; });
        };
        StringMapWrapper.isEmpty = function (map) {
            for (var prop in map) {
                return false;
            }
            return true;
        };
        StringMapWrapper.forEach = function (map, callback) {
            for (var _i = 0, _a = Object.keys(map); _i < _a.length; _i++) {
                var k = _a[_i];
                callback(map[k], k);
            }
        };
        StringMapWrapper.merge = function (m1, m2) {
            var m = {};
            for (var _i = 0, _a = Object.keys(m1); _i < _a.length; _i++) {
                var k = _a[_i];
                m[k] = m1[k];
            }
            for (var _b = 0, _c = Object.keys(m2); _b < _c.length; _b++) {
                var k = _c[_b];
                m[k] = m2[k];
            }
            return m;
        };
        StringMapWrapper.equals = function (m1, m2) {
            var k1 = Object.keys(m1);
            var k2 = Object.keys(m2);
            if (k1.length != k2.length) {
                return false;
            }
            for (var i = 0; i < k1.length; i++) {
                var key = k1[i];
                if (m1[key] !== m2[key]) {
                    return false;
                }
            }
            return true;
        };
        return StringMapWrapper;
    }());
    var ListWrapper = (function () {
        function ListWrapper() {
        }
        // JS has no way to express a statically fixed size list, but dart does so we
        // keep both methods.
        ListWrapper.createFixedSize = function (size) { return new Array(size); };
        ListWrapper.createGrowableSize = function (size) { return new Array(size); };
        ListWrapper.clone = function (array) { return array.slice(0); };
        ListWrapper.forEachWithIndex = function (array, fn) {
            for (var i = 0; i < array.length; i++) {
                fn(array[i], i);
            }
        };
        ListWrapper.first = function (array) {
            if (!array)
                return null;
            return array[0];
        };
        ListWrapper.last = function (array) {
            if (!array || array.length == 0)
                return null;
            return array[array.length - 1];
        };
        ListWrapper.indexOf = function (array, value, startIndex) {
            if (startIndex === void 0) { startIndex = 0; }
            return array.indexOf(value, startIndex);
        };
        ListWrapper.contains = function (list, el) { return list.indexOf(el) !== -1; };
        ListWrapper.reversed = function (array) {
            var a = ListWrapper.clone(array);
            return a.reverse();
        };
        ListWrapper.concat = function (a, b) { return a.concat(b); };
        ListWrapper.insert = function (list, index, value) { list.splice(index, 0, value); };
        ListWrapper.removeAt = function (list, index) {
            var res = list[index];
            list.splice(index, 1);
            return res;
        };
        ListWrapper.removeAll = function (list, items) {
            for (var i = 0; i < items.length; ++i) {
                var index = list.indexOf(items[i]);
                list.splice(index, 1);
            }
        };
        ListWrapper.remove = function (list, el) {
            var index = list.indexOf(el);
            if (index > -1) {
                list.splice(index, 1);
                return true;
            }
            return false;
        };
        ListWrapper.clear = function (list) { list.length = 0; };
        ListWrapper.isEmpty = function (list) { return list.length == 0; };
        ListWrapper.fill = function (list, value, start, end) {
            if (start === void 0) { start = 0; }
            if (end === void 0) { end = null; }
            list.fill(value, start, end === null ? list.length : end);
        };
        ListWrapper.equals = function (a, b) {
            if (a.length != b.length)
                return false;
            for (var i = 0; i < a.length; ++i) {
                if (a[i] !== b[i])
                    return false;
            }
            return true;
        };
        ListWrapper.slice = function (l, from, to) {
            if (from === void 0) { from = 0; }
            if (to === void 0) { to = null; }
            return l.slice(from, to === null ? undefined : to);
        };
        ListWrapper.splice = function (l, from, length) { return l.splice(from, length); };
        ListWrapper.sort = function (l, compareFn) {
            if (isPresent(compareFn)) {
                l.sort(compareFn);
            }
            else {
                l.sort();
            }
        };
        ListWrapper.toString = function (l) { return l.toString(); };
        ListWrapper.toJSON = function (l) { return JSON.stringify(l); };
        ListWrapper.maximum = function (list, predicate) {
            if (list.length == 0) {
                return null;
            }
            var solution = null;
            var maxValue = -Infinity;
            for (var index = 0; index < list.length; index++) {
                var candidate = list[index];
                if (isBlank(candidate)) {
                    continue;
                }
                var candidateValue = predicate(candidate);
                if (candidateValue > maxValue) {
                    solution = candidate;
                    maxValue = candidateValue;
                }
            }
            return solution;
        };
        ListWrapper.flatten = function (list) {
            var target = [];
            _flattenArray(list, target);
            return target;
        };
        ListWrapper.addAll = function (list, source) {
            for (var i = 0; i < source.length; i++) {
                list.push(source[i]);
            }
        };
        return ListWrapper;
    }());
    function _flattenArray(source, target) {
        if (isPresent(source)) {
            for (var i = 0; i < source.length; i++) {
                var item = source[i];
                if (isArray(item)) {
                    _flattenArray(item, target);
                }
                else {
                    target.push(item);
                }
            }
        }
        return target;
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Message Bus is a low level API used to communicate between the UI and the background.
     * Communication is based on a channel abstraction. Messages published in a
     * given channel to one MessageBusSink are received on the same channel
     * by the corresponding MessageBusSource.
     *
     * @experimental WebWorker support in Angular is currenlty experimental.
     */
    var MessageBus = (function () {
        function MessageBus() {
        }
        return MessageBus;
    }());

    var VIEW_ENCAPSULATION_VALUES = _angular_core.__core_private__.VIEW_ENCAPSULATION_VALUES;

    var RenderStore = (function () {
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
            { type: _angular_core.Injectable },
        ];
        /** @nocollapse */
        RenderStore.ctorParameters = [];
        return RenderStore;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    // This file contains interface versions of browser types that can be serialized to Plain Old
    // JavaScript Objects
    var LocationType = (function () {
        function LocationType(href, protocol, host, hostname, port, pathname, search, hash, origin) {
            this.href = href;
            this.protocol = protocol;
            this.host = host;
            this.hostname = hostname;
            this.port = port;
            this.pathname = pathname;
            this.search = search;
            this.hash = hash;
            this.origin = origin;
        }
        return LocationType;
    }());

    // PRIMITIVE is any type that does not need to be serialized (string, number, boolean)
    // We set it to String so that it is considered a Type.
    /**
     * @experimental WebWorker support in Angular is currently experimental.
     */
    var PRIMITIVE = String;
    var Serializer = (function () {
        function Serializer(_renderStore) {
            this._renderStore = _renderStore;
        }
        Serializer.prototype.serialize = function (obj, type) {
            var _this = this;
            if (!isPresent(obj)) {
                return null;
            }
            if (isArray(obj)) {
                return obj.map(function (v) { return _this.serialize(v, type); });
            }
            if (type == PRIMITIVE) {
                return obj;
            }
            if (type == RenderStoreObject) {
                return this._renderStore.serialize(obj);
            }
            else if (type === _angular_core.RenderComponentType) {
                return this._serializeRenderComponentType(obj);
            }
            else if (type === _angular_core.ViewEncapsulation) {
                return serializeEnum(obj);
            }
            else if (type === LocationType) {
                return this._serializeLocation(obj);
            }
            else {
                throw new Error('No serializer for ' + type.toString());
            }
        };
        Serializer.prototype.deserialize = function (map, type, data) {
            var _this = this;
            if (!isPresent(map)) {
                return null;
            }
            if (isArray(map)) {
                var obj = [];
                map.forEach(function (val) { return obj.push(_this.deserialize(val, type, data)); });
                return obj;
            }
            if (type == PRIMITIVE) {
                return map;
            }
            if (type == RenderStoreObject) {
                return this._renderStore.deserialize(map);
            }
            else if (type === _angular_core.RenderComponentType) {
                return this._deserializeRenderComponentType(map);
            }
            else if (type === _angular_core.ViewEncapsulation) {
                return VIEW_ENCAPSULATION_VALUES[map];
            }
            else if (type === LocationType) {
                return this._deserializeLocation(map);
            }
            else {
                throw new Error('No deserializer for ' + type.toString());
            }
        };
        Serializer.prototype._serializeLocation = function (loc) {
            return {
                'href': loc.href,
                'protocol': loc.protocol,
                'host': loc.host,
                'hostname': loc.hostname,
                'port': loc.port,
                'pathname': loc.pathname,
                'search': loc.search,
                'hash': loc.hash,
                'origin': loc.origin
            };
        };
        Serializer.prototype._deserializeLocation = function (loc) {
            return new LocationType(loc['href'], loc['protocol'], loc['host'], loc['hostname'], loc['port'], loc['pathname'], loc['search'], loc['hash'], loc['origin']);
        };
        Serializer.prototype._serializeRenderComponentType = function (obj) {
            return {
                'id': obj.id,
                'templateUrl': obj.templateUrl,
                'slotCount': obj.slotCount,
                'encapsulation': this.serialize(obj.encapsulation, _angular_core.ViewEncapsulation),
                'styles': this.serialize(obj.styles, PRIMITIVE)
            };
        };
        Serializer.prototype._deserializeRenderComponentType = function (map) {
            return new _angular_core.RenderComponentType(map['id'], map['templateUrl'], map['slotCount'], this.deserialize(map['encapsulation'], _angular_core.ViewEncapsulation), this.deserialize(map['styles'], PRIMITIVE), {});
        };
        Serializer.decorators = [
            { type: _angular_core.Injectable },
        ];
        /** @nocollapse */
        Serializer.ctorParameters = [
            { type: RenderStore, },
        ];
        return Serializer;
    }());
    var RenderStoreObject = (function () {
        function RenderStoreObject() {
        }
        return RenderStoreObject;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    /**
     * @experimental WebWorker support in Angular is experimental.
     */
    var ClientMessageBrokerFactory = (function () {
        function ClientMessageBrokerFactory() {
        }
        return ClientMessageBrokerFactory;
    }());
    var ClientMessageBrokerFactory_ = (function (_super) {
        __extends(ClientMessageBrokerFactory_, _super);
        function ClientMessageBrokerFactory_(_messageBus, _serializer) {
            _super.call(this);
            this._messageBus = _messageBus;
            this._serializer = _serializer;
        }
        /**
         * Initializes the given channel and attaches a new {@link ClientMessageBroker} to it.
         */
        ClientMessageBrokerFactory_.prototype.createMessageBroker = function (channel, runInZone) {
            if (runInZone === void 0) { runInZone = true; }
            this._messageBus.initChannel(channel, runInZone);
            return new ClientMessageBroker_(this._messageBus, this._serializer, channel);
        };
        ClientMessageBrokerFactory_.decorators = [
            { type: _angular_core.Injectable },
        ];
        /** @nocollapse */
        ClientMessageBrokerFactory_.ctorParameters = [
            { type: MessageBus, },
            { type: Serializer, },
        ];
        return ClientMessageBrokerFactory_;
    }(ClientMessageBrokerFactory));
    /**
     * @experimental WebWorker support in Angular is experimental.
     */
    var ClientMessageBroker = (function () {
        function ClientMessageBroker() {
        }
        return ClientMessageBroker;
    }());
    var ClientMessageBroker_ = (function (_super) {
        __extends(ClientMessageBroker_, _super);
        function ClientMessageBroker_(messageBus, _serializer, channel /** TODO #9100 */) {
            var _this = this;
            _super.call(this);
            this.channel = channel;
            this._pending = new Map();
            this._sink = messageBus.to(channel);
            this._serializer = _serializer;
            var source = messageBus.from(channel);
            source.subscribe({ next: function (message) { return _this._handleMessage(message); } });
        }
        ClientMessageBroker_.prototype._generateMessageId = function (name) {
            var time = stringify(DateWrapper.toMillis(DateWrapper.now()));
            var iteration = 0;
            var id = name + time + stringify(iteration);
            while (isPresent(this._pending[id])) {
                id = "" + name + time + iteration;
                iteration++;
            }
            return id;
        };
        ClientMessageBroker_.prototype.runOnService = function (args, returnType) {
            var _this = this;
            var fnArgs = [];
            if (isPresent(args.args)) {
                args.args.forEach(function (argument) {
                    if (argument.type != null) {
                        fnArgs.push(_this._serializer.serialize(argument.value, argument.type));
                    }
                    else {
                        fnArgs.push(argument.value);
                    }
                });
            }
            var promise;
            var id = null;
            if (returnType != null) {
                var completer_1;
                promise = new Promise(function (resolve, reject) { completer_1 = { resolve: resolve, reject: reject }; });
                id = this._generateMessageId(args.method);
                this._pending.set(id, completer_1);
                promise.catch(function (err) {
                    print(err);
                    completer_1.reject(err);
                });
                promise = promise.then(function (value) {
                    if (_this._serializer == null) {
                        return value;
                    }
                    else {
                        return _this._serializer.deserialize(value, returnType);
                    }
                });
            }
            else {
                promise = null;
            }
            // TODO(jteplitz602): Create a class for these messages so we don't keep using StringMap #3685
            var message = { 'method': args.method, 'args': fnArgs };
            if (id != null) {
                message['id'] = id;
            }
            this._sink.emit(message);
            return promise;
        };
        ClientMessageBroker_.prototype._handleMessage = function (message) {
            var data = new MessageData(message);
            // TODO(jteplitz602): replace these strings with messaging constants #3685
            if (StringWrapper.equals(data.type, 'result') || StringWrapper.equals(data.type, 'error')) {
                var id = data.id;
                if (this._pending.has(id)) {
                    if (StringWrapper.equals(data.type, 'result')) {
                        this._pending.get(id).resolve(data.value);
                    }
                    else {
                        this._pending.get(id).reject(data.value);
                    }
                    this._pending.delete(id);
                }
            }
        };
        return ClientMessageBroker_;
    }(ClientMessageBroker));
    var MessageData = (function () {
        function MessageData(data) {
            this.type = StringMapWrapper.get(data, 'type');
            this.id = this._getValueIfPresent(data, 'id');
            this.value = this._getValueIfPresent(data, 'value');
        }
        /**
         * Returns the value if present, otherwise returns null
         * @internal
         */
        MessageData.prototype._getValueIfPresent = function (data, key) {
            return data.hasOwnProperty(key) ? data[key] : null;
        };
        return MessageData;
    }());
    /**
     * @experimental WebWorker support in Angular is experimental.
     */
    var FnArg = (function () {
        function FnArg(value /** TODO #9100 */, type) {
            this.value = value;
            this.type = type;
        }
        return FnArg;
    }());
    /**
     * @experimental WebWorker support in Angular is experimental.
     */
    var UiArguments = (function () {
        function UiArguments(method, args) {
            this.method = method;
            this.args = args;
        }
        return UiArguments;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var __extends$1 = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    /**
     * Use by directives and components to emit custom Events.
     *
     * ### Examples
     *
     * In the following example, `Zippy` alternatively emits `open` and `close` events when its
     * title gets clicked:
     *
     * ```
     * @Component({
     *   selector: 'zippy',
     *   template: `
     *   <div class="zippy">
     *     <div (click)="toggle()">Toggle</div>
     *     <div [hidden]="!visible">
     *       <ng-content></ng-content>
     *     </div>
     *  </div>`})
     * export class Zippy {
     *   visible: boolean = true;
     *   @Output() open: EventEmitter<any> = new EventEmitter();
     *   @Output() close: EventEmitter<any> = new EventEmitter();
     *
     *   toggle() {
     *     this.visible = !this.visible;
     *     if (this.visible) {
     *       this.open.emit(null);
     *     } else {
     *       this.close.emit(null);
     *     }
     *   }
     * }
     * ```
     *
     * The events payload can be accessed by the parameter `$event` on the components output event
     * handler:
     *
     * ```
     * <zippy (open)="onOpen($event)" (close)="onClose($event)"></zippy>
     * ```
     *
     * Uses Rx.Observable but provides an adapter to make it work as specified here:
     * https://github.com/jhusain/observable-spec
     *
     * Once a reference implementation of the spec is available, switch to it.
     * @stable
     */
    var EventEmitter = (function (_super) {
        __extends$1(EventEmitter, _super);
        /**
         * Creates an instance of [EventEmitter], which depending on [isAsync],
         * delivers events synchronously or asynchronously.
         */
        function EventEmitter(isAsync) {
            if (isAsync === void 0) { isAsync = false; }
            _super.call(this);
            this.__isAsync = isAsync;
        }
        EventEmitter.prototype.emit = function (value) { _super.prototype.next.call(this, value); };
        EventEmitter.prototype.subscribe = function (generatorOrNext, error, complete) {
            var schedulerFn;
            var errorFn = function (err) { return null; };
            var completeFn = function () { return null; };
            if (generatorOrNext && typeof generatorOrNext === 'object') {
                schedulerFn = this.__isAsync ? function (value /** TODO #9100 */) {
                    setTimeout(function () { return generatorOrNext.next(value); });
                } : function (value /** TODO #9100 */) { generatorOrNext.next(value); };
                if (generatorOrNext.error) {
                    errorFn = this.__isAsync ? function (err) { setTimeout(function () { return generatorOrNext.error(err); }); } :
                        function (err) { generatorOrNext.error(err); };
                }
                if (generatorOrNext.complete) {
                    completeFn = this.__isAsync ? function () { setTimeout(function () { return generatorOrNext.complete(); }); } :
                        function () { generatorOrNext.complete(); };
                }
            }
            else {
                schedulerFn = this.__isAsync ? function (value /** TODO #9100 */) {
                    setTimeout(function () { return generatorOrNext(value); });
                } : function (value /** TODO #9100 */) { generatorOrNext(value); };
                if (error) {
                    errorFn =
                        this.__isAsync ? function (err) { setTimeout(function () { return error(err); }); } : function (err) { error(err); };
                }
                if (complete) {
                    completeFn =
                        this.__isAsync ? function () { setTimeout(function () { return complete(); }); } : function () { complete(); };
                }
            }
            return _super.prototype.subscribe.call(this, schedulerFn, errorFn, completeFn);
        };
        return EventEmitter;
    }(rxjs_Subject.Subject));

    var PostMessageBusSink = (function () {
        function PostMessageBusSink(_postMessageTarget) {
            this._postMessageTarget = _postMessageTarget;
            this._channels = {};
            this._messageBuffer = [];
        }
        PostMessageBusSink.prototype.attachToZone = function (zone) {
            var _this = this;
            this._zone = zone;
            this._zone.runOutsideAngular(function () { _this._zone.onStable.subscribe({ next: function () { _this._handleOnEventDone(); } }); });
        };
        PostMessageBusSink.prototype.initChannel = function (channel, runInZone) {
            var _this = this;
            if (runInZone === void 0) { runInZone = true; }
            if (this._channels.hasOwnProperty(channel)) {
                throw new Error(channel + " has already been initialized");
            }
            var emitter = new EventEmitter(false);
            var channelInfo = new _Channel(emitter, runInZone);
            this._channels[channel] = channelInfo;
            emitter.subscribe(function (data) {
                var message = { channel: channel, message: data };
                if (runInZone) {
                    _this._messageBuffer.push(message);
                }
                else {
                    _this._sendMessages([message]);
                }
            });
        };
        PostMessageBusSink.prototype.to = function (channel) {
            if (this._channels.hasOwnProperty(channel)) {
                return this._channels[channel].emitter;
            }
            else {
                throw new Error(channel + " is not set up. Did you forget to call initChannel?");
            }
        };
        PostMessageBusSink.prototype._handleOnEventDone = function () {
            if (this._messageBuffer.length > 0) {
                this._sendMessages(this._messageBuffer);
                this._messageBuffer = [];
            }
        };
        PostMessageBusSink.prototype._sendMessages = function (messages) { this._postMessageTarget.postMessage(messages); };
        return PostMessageBusSink;
    }());
    var PostMessageBusSource = (function () {
        function PostMessageBusSource(eventTarget) {
            var _this = this;
            this._channels = {};
            if (eventTarget) {
                eventTarget.addEventListener('message', function (ev) { return _this._handleMessages(ev); });
            }
            else {
                // if no eventTarget is given we assume we're in a WebWorker and listen on the global scope
                var workerScope = self;
                workerScope.addEventListener('message', function (ev) { return _this._handleMessages(ev); });
            }
        }
        PostMessageBusSource.prototype.attachToZone = function (zone) { this._zone = zone; };
        PostMessageBusSource.prototype.initChannel = function (channel, runInZone) {
            if (runInZone === void 0) { runInZone = true; }
            if (this._channels.hasOwnProperty(channel)) {
                throw new Error(channel + " has already been initialized");
            }
            var emitter = new EventEmitter(false);
            var channelInfo = new _Channel(emitter, runInZone);
            this._channels[channel] = channelInfo;
        };
        PostMessageBusSource.prototype.from = function (channel) {
            if (this._channels.hasOwnProperty(channel)) {
                return this._channels[channel].emitter;
            }
            else {
                throw new Error(channel + " is not set up. Did you forget to call initChannel?");
            }
        };
        PostMessageBusSource.prototype._handleMessages = function (ev) {
            var messages = ev.data;
            for (var i = 0; i < messages.length; i++) {
                this._handleMessage(messages[i]);
            }
        };
        PostMessageBusSource.prototype._handleMessage = function (data) {
            var channel = data.channel;
            if (this._channels.hasOwnProperty(channel)) {
                var channelInfo = this._channels[channel];
                if (channelInfo.runInZone) {
                    this._zone.run(function () { channelInfo.emitter.emit(data.message); });
                }
                else {
                    channelInfo.emitter.emit(data.message);
                }
            }
        };
        return PostMessageBusSource;
    }());
    /**
     * A TypeScript implementation of {@link MessageBus} for communicating via JavaScript's
     * postMessage API.
     */
    var PostMessageBus = (function () {
        function PostMessageBus(sink, source) {
            this.sink = sink;
            this.source = source;
        }
        PostMessageBus.prototype.attachToZone = function (zone) {
            this.source.attachToZone(zone);
            this.sink.attachToZone(zone);
        };
        PostMessageBus.prototype.initChannel = function (channel, runInZone) {
            if (runInZone === void 0) { runInZone = true; }
            this.source.initChannel(channel, runInZone);
            this.sink.initChannel(channel, runInZone);
        };
        PostMessageBus.prototype.from = function (channel) { return this.source.from(channel); };
        PostMessageBus.prototype.to = function (channel) { return this.sink.to(channel); };
        PostMessageBus.decorators = [
            { type: _angular_core.Injectable },
        ];
        /** @nocollapse */
        PostMessageBus.ctorParameters = [
            { type: PostMessageBusSink, },
            { type: PostMessageBusSource, },
        ];
        return PostMessageBus;
    }());
    /**
     * Helper class that wraps a channel's {@link EventEmitter} and
     * keeps track of if it should run in the zone.
     */
    var _Channel = (function () {
        function _Channel(emitter, runInZone) {
            this.emitter = emitter;
            this.runInZone = runInZone;
        }
        return _Channel;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var __extends$2 = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    /**
     * @experimental WebWorker support in Angular is currently experimental.
     */
    var ServiceMessageBrokerFactory = (function () {
        function ServiceMessageBrokerFactory() {
        }
        return ServiceMessageBrokerFactory;
    }());
    var ServiceMessageBrokerFactory_ = (function (_super) {
        __extends$2(ServiceMessageBrokerFactory_, _super);
        function ServiceMessageBrokerFactory_(_messageBus, _serializer) {
            _super.call(this);
            this._messageBus = _messageBus;
            this._serializer = _serializer;
        }
        ServiceMessageBrokerFactory_.prototype.createMessageBroker = function (channel, runInZone) {
            if (runInZone === void 0) { runInZone = true; }
            this._messageBus.initChannel(channel, runInZone);
            return new ServiceMessageBroker_(this._messageBus, this._serializer, channel);
        };
        ServiceMessageBrokerFactory_.decorators = [
            { type: _angular_core.Injectable },
        ];
        /** @nocollapse */
        ServiceMessageBrokerFactory_.ctorParameters = [
            { type: MessageBus, },
            { type: Serializer, },
        ];
        return ServiceMessageBrokerFactory_;
    }(ServiceMessageBrokerFactory));
    /**
     * Helper class for UIComponents that allows components to register methods.
     * If a registered method message is received from the broker on the worker,
     * the UIMessageBroker deserializes its arguments and calls the registered method.
     * If that method returns a promise, the UIMessageBroker returns the result to the worker.
     *
     * @experimental WebWorker support in Angular is currently experimental.
     */
    var ServiceMessageBroker = (function () {
        function ServiceMessageBroker() {
        }
        return ServiceMessageBroker;
    }());
    var ServiceMessageBroker_ = (function (_super) {
        __extends$2(ServiceMessageBroker_, _super);
        function ServiceMessageBroker_(messageBus, _serializer, channel /** TODO #9100 */) {
            var _this = this;
            _super.call(this);
            this._serializer = _serializer;
            this.channel = channel;
            this._methods = new Map();
            this._sink = messageBus.to(channel);
            var source = messageBus.from(channel);
            source.subscribe({ next: function (message) { return _this._handleMessage(message); } });
        }
        ServiceMessageBroker_.prototype.registerMethod = function (methodName, signature, method, returnType) {
            var _this = this;
            this._methods.set(methodName, function (message) {
                var serializedArgs = message.args;
                var numArgs = signature === null ? 0 : signature.length;
                var deserializedArgs = new Array(numArgs);
                for (var i = 0; i < numArgs; i++) {
                    var serializedArg = serializedArgs[i];
                    deserializedArgs[i] = _this._serializer.deserialize(serializedArg, signature[i]);
                }
                var promise = FunctionWrapper.apply(method, deserializedArgs);
                if (isPresent(returnType) && isPresent(promise)) {
                    _this._wrapWebWorkerPromise(message.id, promise, returnType);
                }
            });
        };
        ServiceMessageBroker_.prototype._handleMessage = function (map) {
            var message = new ReceivedMessage(map);
            if (this._methods.has(message.method)) {
                this._methods.get(message.method)(message);
            }
        };
        ServiceMessageBroker_.prototype._wrapWebWorkerPromise = function (id, promise, type) {
            var _this = this;
            promise.then(function (result) {
                _this._sink.emit({ 'type': 'result', 'value': _this._serializer.serialize(result, type), 'id': id });
            });
        };
        return ServiceMessageBroker_;
    }(ServiceMessageBroker));
    /**
     * @experimental WebWorker support in Angular is currently experimental.
     */
    var ReceivedMessage = (function () {
        function ReceivedMessage(data) {
            this.method = data['method'];
            this.args = data['args'];
            this.id = data['id'];
            this.type = data['type'];
        }
        return ReceivedMessage;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * All channels used by angular's WebWorker components are listed here.
     * You should not use these channels in your application code.
     */
    var RENDERER_CHANNEL = 'ng-Renderer';
    var EVENT_CHANNEL = 'ng-Events';
    var ROUTER_CHANNEL = 'ng-Router';

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var MOUSE_EVENT_PROPERTIES = [
        'altKey', 'button', 'clientX', 'clientY', 'metaKey', 'movementX', 'movementY', 'offsetX',
        'offsetY', 'region', 'screenX', 'screenY', 'shiftKey'
    ];
    var KEYBOARD_EVENT_PROPERTIES = [
        'altkey', 'charCode', 'code', 'ctrlKey', 'isComposing', 'key', 'keyCode', 'location', 'metaKey',
        'repeat', 'shiftKey', 'which'
    ];
    var TRANSITION_EVENT_PROPERTIES = ['propertyName', 'elapsedTime', 'pseudoElement'];
    var EVENT_PROPERTIES = ['type', 'bubbles', 'cancelable'];
    var NODES_WITH_VALUE = new Set(['input', 'select', 'option', 'button', 'li', 'meter', 'progress', 'param', 'textarea']);
    function serializeGenericEvent(e) {
        return serializeEvent(e, EVENT_PROPERTIES);
    }
    // TODO(jteplitz602): Allow users to specify the properties they need rather than always
    // adding value and files #3374
    function serializeEventWithTarget(e) {
        var serializedEvent = serializeEvent(e, EVENT_PROPERTIES);
        return addTarget(e, serializedEvent);
    }
    function serializeMouseEvent(e) {
        return serializeEvent(e, MOUSE_EVENT_PROPERTIES);
    }
    function serializeKeyboardEvent(e) {
        var serializedEvent = serializeEvent(e, KEYBOARD_EVENT_PROPERTIES);
        return addTarget(e, serializedEvent);
    }
    function serializeTransitionEvent(e) {
        var serializedEvent = serializeEvent(e, TRANSITION_EVENT_PROPERTIES);
        return addTarget(e, serializedEvent);
    }
    // TODO(jteplitz602): #3374. See above.
    function addTarget(e, serializedEvent) {
        if (NODES_WITH_VALUE.has(e.target.tagName.toLowerCase())) {
            var target = e.target;
            serializedEvent['target'] = { 'value': target.value };
            if (target.files) {
                serializedEvent['target']['files'] = target.files;
            }
        }
        return serializedEvent;
    }
    function serializeEvent(e, properties) {
        var serialized = {};
        for (var i = 0; i < properties.length; i++) {
            var prop = properties[i];
            serialized[prop] = e[prop];
        }
        return serialized;
    }

    var EventDispatcher = (function () {
        function EventDispatcher(_sink, _serializer) {
            this._sink = _sink;
            this._serializer = _serializer;
        }
        EventDispatcher.prototype.dispatchRenderEvent = function (element, eventTarget, eventName, event) {
            var serializedEvent;
            // TODO (jteplitz602): support custom events #3350
            switch (event.type) {
                case 'click':
                case 'mouseup':
                case 'mousedown':
                case 'dblclick':
                case 'contextmenu':
                case 'mouseenter':
                case 'mouseleave':
                case 'mousemove':
                case 'mouseout':
                case 'mouseover':
                case 'show':
                    serializedEvent = serializeMouseEvent(event);
                    break;
                case 'keydown':
                case 'keypress':
                case 'keyup':
                    serializedEvent = serializeKeyboardEvent(event);
                    break;
                case 'input':
                case 'change':
                case 'blur':
                    serializedEvent = serializeEventWithTarget(event);
                    break;
                case 'abort':
                case 'afterprint':
                case 'beforeprint':
                case 'cached':
                case 'canplay':
                case 'canplaythrough':
                case 'chargingchange':
                case 'chargingtimechange':
                case 'close':
                case 'dischargingtimechange':
                case 'DOMContentLoaded':
                case 'downloading':
                case 'durationchange':
                case 'emptied':
                case 'ended':
                case 'error':
                case 'fullscreenchange':
                case 'fullscreenerror':
                case 'invalid':
                case 'languagechange':
                case 'levelfchange':
                case 'loadeddata':
                case 'loadedmetadata':
                case 'obsolete':
                case 'offline':
                case 'online':
                case 'open':
                case 'orientatoinchange':
                case 'pause':
                case 'pointerlockchange':
                case 'pointerlockerror':
                case 'play':
                case 'playing':
                case 'ratechange':
                case 'readystatechange':
                case 'reset':
                case 'scroll':
                case 'seeked':
                case 'seeking':
                case 'stalled':
                case 'submit':
                case 'success':
                case 'suspend':
                case 'timeupdate':
                case 'updateready':
                case 'visibilitychange':
                case 'volumechange':
                case 'waiting':
                    serializedEvent = serializeGenericEvent(event);
                    break;
                case 'transitionend':
                    serializedEvent = serializeTransitionEvent(event);
                    break;
                default:
                    throw new Error(eventName + ' not supported on WebWorkers');
            }
            this._sink.emit({
                'element': this._serializer.serialize(element, RenderStoreObject),
                'eventName': eventName,
                'eventTarget': eventTarget,
                'event': serializedEvent
            });
            // TODO(kegluneq): Eventually, we want the user to indicate from the UI side whether the event
            // should be canceled, but for now just call `preventDefault` on the original DOM event.
            return false;
        };
        return EventDispatcher;
    }());

    var MessageBasedRenderer = (function () {
        function MessageBasedRenderer(_brokerFactory, _bus, _serializer, _renderStore, _rootRenderer) {
            this._brokerFactory = _brokerFactory;
            this._bus = _bus;
            this._serializer = _serializer;
            this._renderStore = _renderStore;
            this._rootRenderer = _rootRenderer;
        }
        MessageBasedRenderer.prototype.start = function () {
            var broker = this._brokerFactory.createMessageBroker(RENDERER_CHANNEL);
            this._bus.initChannel(EVENT_CHANNEL);
            this._eventDispatcher = new EventDispatcher(this._bus.to(EVENT_CHANNEL), this._serializer);
            broker.registerMethod('renderComponent', [_angular_core.RenderComponentType, PRIMITIVE], FunctionWrapper.bind(this._renderComponent, this));
            broker.registerMethod('selectRootElement', [RenderStoreObject, PRIMITIVE, PRIMITIVE], FunctionWrapper.bind(this._selectRootElement, this));
            broker.registerMethod('createElement', [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], FunctionWrapper.bind(this._createElement, this));
            broker.registerMethod('createViewRoot', [RenderStoreObject, RenderStoreObject, PRIMITIVE], FunctionWrapper.bind(this._createViewRoot, this));
            broker.registerMethod('createTemplateAnchor', [RenderStoreObject, RenderStoreObject, PRIMITIVE], FunctionWrapper.bind(this._createTemplateAnchor, this));
            broker.registerMethod('createText', [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], FunctionWrapper.bind(this._createText, this));
            broker.registerMethod('projectNodes', [RenderStoreObject, RenderStoreObject, RenderStoreObject], FunctionWrapper.bind(this._projectNodes, this));
            broker.registerMethod('attachViewAfter', [RenderStoreObject, RenderStoreObject, RenderStoreObject], FunctionWrapper.bind(this._attachViewAfter, this));
            broker.registerMethod('detachView', [RenderStoreObject, RenderStoreObject], FunctionWrapper.bind(this._detachView, this));
            broker.registerMethod('destroyView', [RenderStoreObject, RenderStoreObject, RenderStoreObject], FunctionWrapper.bind(this._destroyView, this));
            broker.registerMethod('setElementProperty', [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], FunctionWrapper.bind(this._setElementProperty, this));
            broker.registerMethod('setElementAttribute', [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], FunctionWrapper.bind(this._setElementAttribute, this));
            broker.registerMethod('setBindingDebugInfo', [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], FunctionWrapper.bind(this._setBindingDebugInfo, this));
            broker.registerMethod('setElementClass', [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], FunctionWrapper.bind(this._setElementClass, this));
            broker.registerMethod('setElementStyle', [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], FunctionWrapper.bind(this._setElementStyle, this));
            broker.registerMethod('invokeElementMethod', [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], FunctionWrapper.bind(this._invokeElementMethod, this));
            broker.registerMethod('setText', [RenderStoreObject, RenderStoreObject, PRIMITIVE], FunctionWrapper.bind(this._setText, this));
            broker.registerMethod('listen', [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], FunctionWrapper.bind(this._listen, this));
            broker.registerMethod('listenGlobal', [RenderStoreObject, PRIMITIVE, PRIMITIVE, PRIMITIVE], FunctionWrapper.bind(this._listenGlobal, this));
            broker.registerMethod('listenDone', [RenderStoreObject, RenderStoreObject], FunctionWrapper.bind(this._listenDone, this));
        };
        MessageBasedRenderer.prototype._renderComponent = function (renderComponentType, rendererId) {
            var renderer = this._rootRenderer.renderComponent(renderComponentType);
            this._renderStore.store(renderer, rendererId);
        };
        MessageBasedRenderer.prototype._selectRootElement = function (renderer, selector, elId) {
            this._renderStore.store(renderer.selectRootElement(selector, null), elId);
        };
        MessageBasedRenderer.prototype._createElement = function (renderer, parentElement, name, elId) {
            this._renderStore.store(renderer.createElement(parentElement, name, null), elId);
        };
        MessageBasedRenderer.prototype._createViewRoot = function (renderer, hostElement, elId) {
            var viewRoot = renderer.createViewRoot(hostElement);
            if (this._renderStore.serialize(hostElement) !== elId) {
                this._renderStore.store(viewRoot, elId);
            }
        };
        MessageBasedRenderer.prototype._createTemplateAnchor = function (renderer, parentElement, elId) {
            this._renderStore.store(renderer.createTemplateAnchor(parentElement, null), elId);
        };
        MessageBasedRenderer.prototype._createText = function (renderer, parentElement, value, elId) {
            this._renderStore.store(renderer.createText(parentElement, value, null), elId);
        };
        MessageBasedRenderer.prototype._projectNodes = function (renderer, parentElement, nodes) {
            renderer.projectNodes(parentElement, nodes);
        };
        MessageBasedRenderer.prototype._attachViewAfter = function (renderer, node, viewRootNodes) {
            renderer.attachViewAfter(node, viewRootNodes);
        };
        MessageBasedRenderer.prototype._detachView = function (renderer, viewRootNodes) {
            renderer.detachView(viewRootNodes);
        };
        MessageBasedRenderer.prototype._destroyView = function (renderer, hostElement, viewAllNodes) {
            renderer.destroyView(hostElement, viewAllNodes);
            for (var i = 0; i < viewAllNodes.length; i++) {
                this._renderStore.remove(viewAllNodes[i]);
            }
        };
        MessageBasedRenderer.prototype._setElementProperty = function (renderer, renderElement, propertyName, propertyValue) {
            renderer.setElementProperty(renderElement, propertyName, propertyValue);
        };
        MessageBasedRenderer.prototype._setElementAttribute = function (renderer, renderElement, attributeName, attributeValue) {
            renderer.setElementAttribute(renderElement, attributeName, attributeValue);
        };
        MessageBasedRenderer.prototype._setBindingDebugInfo = function (renderer, renderElement, propertyName, propertyValue) {
            renderer.setBindingDebugInfo(renderElement, propertyName, propertyValue);
        };
        MessageBasedRenderer.prototype._setElementClass = function (renderer, renderElement, className, isAdd) {
            renderer.setElementClass(renderElement, className, isAdd);
        };
        MessageBasedRenderer.prototype._setElementStyle = function (renderer, renderElement, styleName, styleValue) {
            renderer.setElementStyle(renderElement, styleName, styleValue);
        };
        MessageBasedRenderer.prototype._invokeElementMethod = function (renderer, renderElement, methodName, args) {
            renderer.invokeElementMethod(renderElement, methodName, args);
        };
        MessageBasedRenderer.prototype._setText = function (renderer, renderNode, text) {
            renderer.setText(renderNode, text);
        };
        MessageBasedRenderer.prototype._listen = function (renderer, renderElement, eventName, unlistenId) {
            var _this = this;
            var unregisterCallback = renderer.listen(renderElement, eventName, function (event /** TODO #9100 */) {
                return _this._eventDispatcher.dispatchRenderEvent(renderElement, null, eventName, event);
            });
            this._renderStore.store(unregisterCallback, unlistenId);
        };
        MessageBasedRenderer.prototype._listenGlobal = function (renderer, eventTarget, eventName, unlistenId) {
            var _this = this;
            var unregisterCallback = renderer.listenGlobal(eventTarget, eventName, function (event /** TODO #9100 */) {
                return _this._eventDispatcher.dispatchRenderEvent(null, eventTarget, eventName, event);
            });
            this._renderStore.store(unregisterCallback, unlistenId);
        };
        MessageBasedRenderer.prototype._listenDone = function (renderer, unlistenCallback) { unlistenCallback(); };
        MessageBasedRenderer.decorators = [
            { type: _angular_core.Injectable },
        ];
        /** @nocollapse */
        MessageBasedRenderer.ctorParameters = [
            { type: ServiceMessageBrokerFactory, },
            { type: MessageBus, },
            { type: Serializer, },
            { type: RenderStore, },
            { type: _angular_core.RootRenderer, },
        ];
        return MessageBasedRenderer;
    }());

    /**
     * Wrapper class that exposes the Worker
     * and underlying {@link MessageBus} for lower level message passing.
     *
     * @experimental WebWorker support is currently experimental.
     */
    var WebWorkerInstance = (function () {
        function WebWorkerInstance() {
        }
        /** @internal */
        WebWorkerInstance.prototype.init = function (worker, bus) {
            this.worker = worker;
            this.bus = bus;
        };
        WebWorkerInstance.decorators = [
            { type: _angular_core.Injectable },
        ];
        /** @nocollapse */
        WebWorkerInstance.ctorParameters = [];
        return WebWorkerInstance;
    }());
    /**
     * @experimental WebWorker support is currently experimental.
     */
    var WORKER_SCRIPT = new _angular_core.OpaqueToken('WebWorkerScript');
    /**
     * A multi-provider used to automatically call the `start()` method after the service is
     * created.
     *
     * TODO(vicb): create an interface for startable services to implement
     * @experimental WebWorker support is currently experimental.
     */
    var WORKER_UI_STARTABLE_MESSAGING_SERVICE = new _angular_core.OpaqueToken('WorkerRenderStartableMsgService');
    var _WORKER_UI_PLATFORM_PROVIDERS = [
        { provide: _angular_core.NgZone, useFactory: createNgZone, deps: [] },
        MessageBasedRenderer,
        { provide: WORKER_UI_STARTABLE_MESSAGING_SERVICE, useExisting: MessageBasedRenderer, multi: true },
        BROWSER_SANITIZATION_PROVIDERS,
        { provide: _angular_core.ErrorHandler, useFactory: _exceptionHandler, deps: [] },
        { provide: _angular_platformBrowser.DOCUMENT, useFactory: _document, deps: [] },
        // TODO(jteplitz602): Investigate if we definitely need EVENT_MANAGER on the render thread
        // #5298
        { provide: _angular_platformBrowser.EVENT_MANAGER_PLUGINS, useClass: DomEventsPlugin, multi: true },
        { provide: _angular_platformBrowser.EVENT_MANAGER_PLUGINS, useClass: KeyEventsPlugin, multi: true },
        { provide: _angular_platformBrowser.EVENT_MANAGER_PLUGINS, useClass: HammerGesturesPlugin, multi: true },
        { provide: _angular_platformBrowser.HAMMER_GESTURE_CONFIG, useClass: _angular_platformBrowser.HammerGestureConfig },
        { provide: DomRootRenderer, useClass: DomRootRenderer_ },
        { provide: _angular_core.RootRenderer, useExisting: DomRootRenderer },
        { provide: SharedStylesHost, useExisting: DomSharedStylesHost },
        { provide: ServiceMessageBrokerFactory, useClass: ServiceMessageBrokerFactory_ },
        { provide: ClientMessageBrokerFactory, useClass: ClientMessageBrokerFactory_ },
        { provide: _angular_platformBrowser.AnimationDriver, useFactory: _resolveDefaultAnimationDriver, deps: [] },
        Serializer,
        { provide: ON_WEB_WORKER, useValue: false },
        RenderStore,
        DomSharedStylesHost,
        _angular_core.Testability,
        _angular_platformBrowser.EventManager,
        WebWorkerInstance,
        {
            provide: _angular_core.PLATFORM_INITIALIZER,
            useFactory: initWebWorkerRenderPlatform,
            multi: true,
            deps: [_angular_core.Injector]
        },
        { provide: MessageBus, useFactory: messageBusFactory, deps: [WebWorkerInstance] }
    ];
    function initializeGenericWorkerRenderer(injector) {
        var bus = injector.get(MessageBus);
        var zone = injector.get(_angular_core.NgZone);
        bus.attachToZone(zone);
        // initialize message services after the bus has been created
        var services = injector.get(WORKER_UI_STARTABLE_MESSAGING_SERVICE);
        zone.runGuarded(function () { services.forEach(function (svc) { svc.start(); }); });
    }
    function messageBusFactory(instance) {
        return instance.bus;
    }
    function initWebWorkerRenderPlatform(injector) {
        return function () {
            BrowserDomAdapter.makeCurrent();
            BrowserGetTestability.init();
            var scriptUri;
            try {
                scriptUri = injector.get(WORKER_SCRIPT);
            }
            catch (e) {
                throw new Error('You must provide your WebWorker\'s initialization script with the WORKER_SCRIPT token');
            }
            var instance = injector.get(WebWorkerInstance);
            spawnWebWorker(scriptUri, instance);
            initializeGenericWorkerRenderer(injector);
        };
    }
    /**
     * @experimental WebWorker support is currently experimental.
     */
    var platformWorkerUi = _angular_core.createPlatformFactory(_angular_core.platformCore, 'workerUi', _WORKER_UI_PLATFORM_PROVIDERS);
    function _exceptionHandler() {
        return new _angular_core.ErrorHandler();
    }
    function _document() {
        return getDOM().defaultDoc();
    }
    function createNgZone() {
        return new _angular_core.NgZone({ enableLongStackTrace: _angular_core.isDevMode() });
    }
    /**
     * Spawns a new class and initializes the WebWorkerInstance
     */
    function spawnWebWorker(uri, instance) {
        var webWorker = new Worker(uri);
        var sink = new PostMessageBusSink(webWorker);
        var source = new PostMessageBusSource(webWorker);
        var bus = new PostMessageBus(sink, source);
        instance.init(webWorker, bus);
    }
    function _resolveDefaultAnimationDriver() {
        // web workers have not been tested or configured to
        // work with animations just yet...
        return _angular_platformBrowser.AnimationDriver.NOOP;
    }

    var MessageBasedPlatformLocation = (function () {
        function MessageBasedPlatformLocation(_brokerFactory, _platformLocation, bus, _serializer) {
            this._brokerFactory = _brokerFactory;
            this._platformLocation = _platformLocation;
            this._serializer = _serializer;
            this._platformLocation.onPopState(FunctionWrapper.bind(this._sendUrlChangeEvent, this));
            this._platformLocation.onHashChange(FunctionWrapper.bind(this._sendUrlChangeEvent, this));
            this._broker = this._brokerFactory.createMessageBroker(ROUTER_CHANNEL);
            this._channelSink = bus.to(ROUTER_CHANNEL);
        }
        MessageBasedPlatformLocation.prototype.start = function () {
            this._broker.registerMethod('getLocation', null, FunctionWrapper.bind(this._getLocation, this), LocationType);
            this._broker.registerMethod('setPathname', [PRIMITIVE], FunctionWrapper.bind(this._setPathname, this));
            this._broker.registerMethod('pushState', [PRIMITIVE, PRIMITIVE, PRIMITIVE], FunctionWrapper.bind(this._platformLocation.pushState, this._platformLocation));
            this._broker.registerMethod('replaceState', [PRIMITIVE, PRIMITIVE, PRIMITIVE], FunctionWrapper.bind(this._platformLocation.replaceState, this._platformLocation));
            this._broker.registerMethod('forward', null, FunctionWrapper.bind(this._platformLocation.forward, this._platformLocation));
            this._broker.registerMethod('back', null, FunctionWrapper.bind(this._platformLocation.back, this._platformLocation));
        };
        MessageBasedPlatformLocation.prototype._getLocation = function () {
            return Promise.resolve(this._platformLocation.location);
        };
        MessageBasedPlatformLocation.prototype._sendUrlChangeEvent = function (e) {
            var loc = this._serializer.serialize(this._platformLocation.location, LocationType);
            var serializedEvent = { 'type': e.type };
            this._channelSink.emit({ 'event': serializedEvent, 'location': loc });
        };
        MessageBasedPlatformLocation.prototype._setPathname = function (pathname) { this._platformLocation.pathname = pathname; };
        MessageBasedPlatformLocation.decorators = [
            { type: _angular_core.Injectable },
        ];
        /** @nocollapse */
        MessageBasedPlatformLocation.ctorParameters = [
            { type: ServiceMessageBrokerFactory, },
            { type: BrowserPlatformLocation, },
            { type: MessageBus, },
            { type: Serializer, },
        ];
        return MessageBasedPlatformLocation;
    }());

    /**
     * A list of {@link Provider}s. To use the router in a Worker enabled application you must
     * include these providers when setting up the render thread.
     * @experimental
     */
    var WORKER_UI_LOCATION_PROVIDERS = [
        MessageBasedPlatformLocation, BrowserPlatformLocation,
        { provide: _angular_core.PLATFORM_INITIALIZER, useFactory: initUiLocation, multi: true, deps: [_angular_core.Injector] }
    ];
    function initUiLocation(injector) {
        return function () {
            var zone = injector.get(_angular_core.NgZone);
            zone.runGuarded(function () { return injector.get(MessageBasedPlatformLocation).start(); });
        };
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    // no deserialization is necessary in TS.
    // This is only here to match dart interface
    function deserializeGenericEvent(serializedEvent) {
        return serializedEvent;
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var __extends$3 = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var WebWorkerPlatformLocation = (function (_super) {
        __extends$3(WebWorkerPlatformLocation, _super);
        function WebWorkerPlatformLocation(brokerFactory, bus, _serializer) {
            var _this = this;
            _super.call(this);
            this._serializer = _serializer;
            this._popStateListeners = [];
            this._hashChangeListeners = [];
            this._location = null;
            this._broker = brokerFactory.createMessageBroker(ROUTER_CHANNEL);
            this._channelSource = bus.from(ROUTER_CHANNEL);
            this._channelSource.subscribe({
                next: function (msg) {
                    var listeners = null;
                    if (msg.hasOwnProperty('event')) {
                        var type = msg['event']['type'];
                        if (StringWrapper.equals(type, 'popstate')) {
                            listeners = _this._popStateListeners;
                        }
                        else if (StringWrapper.equals(type, 'hashchange')) {
                            listeners = _this._hashChangeListeners;
                        }
                        if (listeners !== null) {
                            var e_1 = deserializeGenericEvent(msg['event']);
                            // There was a popState or hashChange event, so the location object thas been updated
                            _this._location = _this._serializer.deserialize(msg['location'], LocationType);
                            listeners.forEach(function (fn) { return fn(e_1); });
                        }
                    }
                }
            });
        }
        /** @internal **/
        WebWorkerPlatformLocation.prototype.init = function () {
            var _this = this;
            var args = new UiArguments('getLocation');
            var locationPromise = this._broker.runOnService(args, LocationType);
            return locationPromise.then(function (val) {
                _this._location = val;
                return true;
            }, function (err) { throw new Error(err); });
        };
        WebWorkerPlatformLocation.prototype.getBaseHrefFromDOM = function () {
            throw new Error('Attempt to get base href from DOM from WebWorker. You must either provide a value for the APP_BASE_HREF token through DI or use the hash location strategy.');
        };
        WebWorkerPlatformLocation.prototype.onPopState = function (fn) { this._popStateListeners.push(fn); };
        WebWorkerPlatformLocation.prototype.onHashChange = function (fn) { this._hashChangeListeners.push(fn); };
        Object.defineProperty(WebWorkerPlatformLocation.prototype, "pathname", {
            get: function () {
                if (this._location === null) {
                    return null;
                }
                return this._location.pathname;
            },
            set: function (newPath) {
                if (this._location === null) {
                    throw new Error('Attempt to set pathname before value is obtained from UI');
                }
                this._location.pathname = newPath;
                var fnArgs = [new FnArg(newPath, PRIMITIVE)];
                var args = new UiArguments('setPathname', fnArgs);
                this._broker.runOnService(args, null);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WebWorkerPlatformLocation.prototype, "search", {
            get: function () {
                if (this._location === null) {
                    return null;
                }
                return this._location.search;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WebWorkerPlatformLocation.prototype, "hash", {
            get: function () {
                if (this._location === null) {
                    return null;
                }
                return this._location.hash;
            },
            enumerable: true,
            configurable: true
        });
        WebWorkerPlatformLocation.prototype.pushState = function (state, title, url) {
            var fnArgs = [new FnArg(state, PRIMITIVE), new FnArg(title, PRIMITIVE), new FnArg(url, PRIMITIVE)];
            var args = new UiArguments('pushState', fnArgs);
            this._broker.runOnService(args, null);
        };
        WebWorkerPlatformLocation.prototype.replaceState = function (state, title, url) {
            var fnArgs = [new FnArg(state, PRIMITIVE), new FnArg(title, PRIMITIVE), new FnArg(url, PRIMITIVE)];
            var args = new UiArguments('replaceState', fnArgs);
            this._broker.runOnService(args, null);
        };
        WebWorkerPlatformLocation.prototype.forward = function () {
            var args = new UiArguments('forward');
            this._broker.runOnService(args, null);
        };
        WebWorkerPlatformLocation.prototype.back = function () {
            var args = new UiArguments('back');
            this._broker.runOnService(args, null);
        };
        WebWorkerPlatformLocation.decorators = [
            { type: _angular_core.Injectable },
        ];
        /** @nocollapse */
        WebWorkerPlatformLocation.ctorParameters = [
            { type: ClientMessageBrokerFactory, },
            { type: MessageBus, },
            { type: Serializer, },
        ];
        return WebWorkerPlatformLocation;
    }(_angular_common.PlatformLocation));

    /**
     * Those providers should be added when the router is used in a worker context in addition to the
     * {@link ROUTER_PROVIDERS} and after them.
     * @experimental
     */
    var WORKER_APP_LOCATION_PROVIDERS = [
        { provide: _angular_common.PlatformLocation, useClass: WebWorkerPlatformLocation }, {
            provide: _angular_core.APP_INITIALIZER,
            useFactory: appInitFnFactory,
            multi: true,
            deps: [_angular_common.PlatformLocation, _angular_core.NgZone]
        }
    ];
    function appInitFnFactory(platformLocation, zone) {
        return function () { return zone.runGuarded(function () { return platformLocation.init(); }); };
    }

    var WebWorkerRootRenderer = (function () {
        function WebWorkerRootRenderer(messageBrokerFactory, bus, _serializer, _renderStore) {
            var _this = this;
            this._serializer = _serializer;
            this._renderStore = _renderStore;
            this.globalEvents = new NamedEventEmitter();
            this._componentRenderers = new Map();
            this._messageBroker = messageBrokerFactory.createMessageBroker(RENDERER_CHANNEL);
            bus.initChannel(EVENT_CHANNEL);
            var source = bus.from(EVENT_CHANNEL);
            source.subscribe({ next: function (message) { return _this._dispatchEvent(message); } });
        }
        WebWorkerRootRenderer.prototype._dispatchEvent = function (message) {
            var eventName = message['eventName'];
            var target = message['eventTarget'];
            var event = deserializeGenericEvent(message['event']);
            if (isPresent(target)) {
                this.globalEvents.dispatchEvent(eventNameWithTarget(target, eventName), event);
            }
            else {
                var element = this._serializer.deserialize(message['element'], RenderStoreObject);
                element.events.dispatchEvent(eventName, event);
            }
        };
        WebWorkerRootRenderer.prototype.renderComponent = function (componentType) {
            var result = this._componentRenderers.get(componentType.id);
            if (isBlank(result)) {
                result = new WebWorkerRenderer(this, componentType);
                this._componentRenderers.set(componentType.id, result);
                var id = this._renderStore.allocateId();
                this._renderStore.store(result, id);
                this.runOnService('renderComponent', [
                    new FnArg(componentType, _angular_core.RenderComponentType),
                    new FnArg(result, RenderStoreObject),
                ]);
            }
            return result;
        };
        WebWorkerRootRenderer.prototype.runOnService = function (fnName, fnArgs) {
            var args = new UiArguments(fnName, fnArgs);
            this._messageBroker.runOnService(args, null);
        };
        WebWorkerRootRenderer.prototype.allocateNode = function () {
            var result = new WebWorkerRenderNode();
            var id = this._renderStore.allocateId();
            this._renderStore.store(result, id);
            return result;
        };
        WebWorkerRootRenderer.prototype.allocateId = function () { return this._renderStore.allocateId(); };
        WebWorkerRootRenderer.prototype.destroyNodes = function (nodes) {
            for (var i = 0; i < nodes.length; i++) {
                this._renderStore.remove(nodes[i]);
            }
        };
        WebWorkerRootRenderer.decorators = [
            { type: _angular_core.Injectable },
        ];
        /** @nocollapse */
        WebWorkerRootRenderer.ctorParameters = [
            { type: ClientMessageBrokerFactory, },
            { type: MessageBus, },
            { type: Serializer, },
            { type: RenderStore, },
        ];
        return WebWorkerRootRenderer;
    }());
    var WebWorkerRenderer = (function () {
        function WebWorkerRenderer(_rootRenderer, _componentType) {
            this._rootRenderer = _rootRenderer;
            this._componentType = _componentType;
        }
        WebWorkerRenderer.prototype._runOnService = function (fnName, fnArgs) {
            var fnArgsWithRenderer = [new FnArg(this, RenderStoreObject)].concat(fnArgs);
            this._rootRenderer.runOnService(fnName, fnArgsWithRenderer);
        };
        WebWorkerRenderer.prototype.selectRootElement = function (selectorOrNode, debugInfo) {
            var node = this._rootRenderer.allocateNode();
            this._runOnService('selectRootElement', [new FnArg(selectorOrNode, null), new FnArg(node, RenderStoreObject)]);
            return node;
        };
        WebWorkerRenderer.prototype.createElement = function (parentElement, name, debugInfo) {
            var node = this._rootRenderer.allocateNode();
            this._runOnService('createElement', [
                new FnArg(parentElement, RenderStoreObject), new FnArg(name, null),
                new FnArg(node, RenderStoreObject)
            ]);
            return node;
        };
        WebWorkerRenderer.prototype.createViewRoot = function (hostElement) {
            var viewRoot = this._componentType.encapsulation === _angular_core.ViewEncapsulation.Native ?
                this._rootRenderer.allocateNode() :
                hostElement;
            this._runOnService('createViewRoot', [new FnArg(hostElement, RenderStoreObject), new FnArg(viewRoot, RenderStoreObject)]);
            return viewRoot;
        };
        WebWorkerRenderer.prototype.createTemplateAnchor = function (parentElement, debugInfo) {
            var node = this._rootRenderer.allocateNode();
            this._runOnService('createTemplateAnchor', [new FnArg(parentElement, RenderStoreObject), new FnArg(node, RenderStoreObject)]);
            return node;
        };
        WebWorkerRenderer.prototype.createText = function (parentElement, value, debugInfo) {
            var node = this._rootRenderer.allocateNode();
            this._runOnService('createText', [
                new FnArg(parentElement, RenderStoreObject), new FnArg(value, null),
                new FnArg(node, RenderStoreObject)
            ]);
            return node;
        };
        WebWorkerRenderer.prototype.projectNodes = function (parentElement, nodes) {
            this._runOnService('projectNodes', [new FnArg(parentElement, RenderStoreObject), new FnArg(nodes, RenderStoreObject)]);
        };
        WebWorkerRenderer.prototype.attachViewAfter = function (node, viewRootNodes) {
            this._runOnService('attachViewAfter', [new FnArg(node, RenderStoreObject), new FnArg(viewRootNodes, RenderStoreObject)]);
        };
        WebWorkerRenderer.prototype.detachView = function (viewRootNodes) {
            this._runOnService('detachView', [new FnArg(viewRootNodes, RenderStoreObject)]);
        };
        WebWorkerRenderer.prototype.destroyView = function (hostElement, viewAllNodes) {
            this._runOnService('destroyView', [new FnArg(hostElement, RenderStoreObject), new FnArg(viewAllNodes, RenderStoreObject)]);
            this._rootRenderer.destroyNodes(viewAllNodes);
        };
        WebWorkerRenderer.prototype.setElementProperty = function (renderElement, propertyName, propertyValue) {
            this._runOnService('setElementProperty', [
                new FnArg(renderElement, RenderStoreObject), new FnArg(propertyName, null),
                new FnArg(propertyValue, null)
            ]);
        };
        WebWorkerRenderer.prototype.setElementAttribute = function (renderElement, attributeName, attributeValue) {
            this._runOnService('setElementAttribute', [
                new FnArg(renderElement, RenderStoreObject), new FnArg(attributeName, null),
                new FnArg(attributeValue, null)
            ]);
        };
        WebWorkerRenderer.prototype.setBindingDebugInfo = function (renderElement, propertyName, propertyValue) {
            this._runOnService('setBindingDebugInfo', [
                new FnArg(renderElement, RenderStoreObject), new FnArg(propertyName, null),
                new FnArg(propertyValue, null)
            ]);
        };
        WebWorkerRenderer.prototype.setElementClass = function (renderElement, className, isAdd) {
            this._runOnService('setElementClass', [
                new FnArg(renderElement, RenderStoreObject), new FnArg(className, null),
                new FnArg(isAdd, null)
            ]);
        };
        WebWorkerRenderer.prototype.setElementStyle = function (renderElement, styleName, styleValue) {
            this._runOnService('setElementStyle', [
                new FnArg(renderElement, RenderStoreObject), new FnArg(styleName, null),
                new FnArg(styleValue, null)
            ]);
        };
        WebWorkerRenderer.prototype.invokeElementMethod = function (renderElement, methodName, args) {
            this._runOnService('invokeElementMethod', [
                new FnArg(renderElement, RenderStoreObject), new FnArg(methodName, null),
                new FnArg(args, null)
            ]);
        };
        WebWorkerRenderer.prototype.setText = function (renderNode, text) {
            this._runOnService('setText', [new FnArg(renderNode, RenderStoreObject), new FnArg(text, null)]);
        };
        WebWorkerRenderer.prototype.listen = function (renderElement, name, callback) {
            var _this = this;
            renderElement.events.listen(name, callback);
            var unlistenCallbackId = this._rootRenderer.allocateId();
            this._runOnService('listen', [
                new FnArg(renderElement, RenderStoreObject), new FnArg(name, null),
                new FnArg(unlistenCallbackId, null)
            ]);
            return function () {
                renderElement.events.unlisten(name, callback);
                _this._runOnService('listenDone', [new FnArg(unlistenCallbackId, null)]);
            };
        };
        WebWorkerRenderer.prototype.listenGlobal = function (target, name, callback) {
            var _this = this;
            this._rootRenderer.globalEvents.listen(eventNameWithTarget(target, name), callback);
            var unlistenCallbackId = this._rootRenderer.allocateId();
            this._runOnService('listenGlobal', [new FnArg(target, null), new FnArg(name, null), new FnArg(unlistenCallbackId, null)]);
            return function () {
                _this._rootRenderer.globalEvents.unlisten(eventNameWithTarget(target, name), callback);
                _this._runOnService('listenDone', [new FnArg(unlistenCallbackId, null)]);
            };
        };
        WebWorkerRenderer.prototype.animate = function (element, startingStyles, keyframes, duration, delay, easing) {
            // TODO
            return null;
        };
        return WebWorkerRenderer;
    }());
    var NamedEventEmitter = (function () {
        function NamedEventEmitter() {
        }
        NamedEventEmitter.prototype._getListeners = function (eventName) {
            if (isBlank(this._listeners)) {
                this._listeners = new Map();
            }
            var listeners = this._listeners.get(eventName);
            if (isBlank(listeners)) {
                listeners = [];
                this._listeners.set(eventName, listeners);
            }
            return listeners;
        };
        NamedEventEmitter.prototype.listen = function (eventName, callback) { this._getListeners(eventName).push(callback); };
        NamedEventEmitter.prototype.unlisten = function (eventName, callback) {
            ListWrapper.remove(this._getListeners(eventName), callback);
        };
        NamedEventEmitter.prototype.dispatchEvent = function (eventName, event) {
            var listeners = this._getListeners(eventName);
            for (var i = 0; i < listeners.length; i++) {
                listeners[i](event);
            }
        };
        return NamedEventEmitter;
    }());
    function eventNameWithTarget(target, eventName) {
        return target + ":" + eventName;
    }
    var WebWorkerRenderNode = (function () {
        function WebWorkerRenderNode() {
            this.events = new NamedEventEmitter();
        }
        return WebWorkerRenderNode;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var __extends$4 = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    /**
     * This adapter is required to log error messages.
     *
     * Note: other methods all throw as the DOM is not accessible directly in web worker context.
     */
    var WorkerDomAdapter = (function (_super) {
        __extends$4(WorkerDomAdapter, _super);
        function WorkerDomAdapter() {
            _super.apply(this, arguments);
        }
        WorkerDomAdapter.makeCurrent = function () { setRootDomAdapter(new WorkerDomAdapter()); };
        WorkerDomAdapter.prototype.logError = function (error /** TODO #9100 */) {
            if (console.error) {
                console.error(error);
            }
            else {
                console.log(error);
            }
        };
        WorkerDomAdapter.prototype.log = function (error /** TODO #9100 */) { console.log(error); };
        WorkerDomAdapter.prototype.logGroup = function (error /** TODO #9100 */) {
            if (console.group) {
                console.group(error);
                this.logError(error);
            }
            else {
                console.log(error);
            }
        };
        WorkerDomAdapter.prototype.logGroupEnd = function () {
            if (console.groupEnd) {
                console.groupEnd();
            }
        };
        WorkerDomAdapter.prototype.hasProperty = function (element /** TODO #9100 */, name) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.setProperty = function (el, name, value) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getProperty = function (el, name) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.invoke = function (el, methodName, args) { throw 'not implemented'; };
        Object.defineProperty(WorkerDomAdapter.prototype, "attrToPropMap", {
            get: function () { throw 'not implemented'; },
            set: function (value) { throw 'not implemented'; },
            enumerable: true,
            configurable: true
        });
        WorkerDomAdapter.prototype.parse = function (templateHtml) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.query = function (selector) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.querySelector = function (el /** TODO #9100 */, selector) {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.querySelectorAll = function (el /** TODO #9100 */, selector) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.on = function (el /** TODO #9100 */, evt /** TODO #9100 */, listener /** TODO #9100 */) {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.onAndCancel = function (el /** TODO #9100 */, evt /** TODO #9100 */, listener /** TODO #9100 */) {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.dispatchEvent = function (el /** TODO #9100 */, evt /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.createMouseEvent = function (eventType /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.createEvent = function (eventType) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.preventDefault = function (evt /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.isPrevented = function (evt /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getInnerHTML = function (el /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getTemplateContent = function (el /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getOuterHTML = function (el /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.nodeName = function (node /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.nodeValue = function (node /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.type = function (node /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.content = function (node /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.firstChild = function (el /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.nextSibling = function (el /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.parentElement = function (el /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.childNodes = function (el /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.childNodesAsList = function (el /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.clearNodes = function (el /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.appendChild = function (el /** TODO #9100 */, node /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.removeChild = function (el /** TODO #9100 */, node /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.replaceChild = function (el /** TODO #9100 */, newNode /** TODO #9100 */, oldNode /** TODO #9100 */) {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.remove = function (el /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.insertBefore = function (el /** TODO #9100 */, node /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.insertAllBefore = function (el /** TODO #9100 */, nodes /** TODO #9100 */) {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.insertAfter = function (el /** TODO #9100 */, node /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.setInnerHTML = function (el /** TODO #9100 */, value /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getText = function (el /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.setText = function (el /** TODO #9100 */, value) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getValue = function (el /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.setValue = function (el /** TODO #9100 */, value) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getChecked = function (el /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.setChecked = function (el /** TODO #9100 */, value) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.createComment = function (text) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.createTemplate = function (html /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.createElement = function (tagName /** TODO #9100 */, doc /** TODO #9100 */) {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.createElementNS = function (ns, tagName, doc /** TODO #9100 */) {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.createTextNode = function (text, doc /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.createScriptTag = function (attrName, attrValue, doc /** TODO #9100 */) {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.createStyleElement = function (css, doc /** TODO #9100 */) {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.createShadowRoot = function (el /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getShadowRoot = function (el /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getHost = function (el /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getDistributedNodes = function (el /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.clone = function (node) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getElementsByClassName = function (element /** TODO #9100 */, name) {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.getElementsByTagName = function (element /** TODO #9100 */, name) {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.classList = function (element /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.addClass = function (element /** TODO #9100 */, className) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.removeClass = function (element /** TODO #9100 */, className) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.hasClass = function (element /** TODO #9100 */, className) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.setStyle = function (element /** TODO #9100 */, styleName, styleValue) {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.removeStyle = function (element /** TODO #9100 */, styleName) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getStyle = function (element /** TODO #9100 */, styleName) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.hasStyle = function (element /** TODO #9100 */, styleName, styleValue) {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.tagName = function (element /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.attributeMap = function (element /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.hasAttribute = function (element /** TODO #9100 */, attribute) {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.hasAttributeNS = function (element /** TODO #9100 */, ns, attribute) {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.getAttribute = function (element /** TODO #9100 */, attribute) {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.getAttributeNS = function (element /** TODO #9100 */, ns, attribute) {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.setAttribute = function (element /** TODO #9100 */, name, value) {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.setAttributeNS = function (element /** TODO #9100 */, ns, name, value) {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.removeAttribute = function (element /** TODO #9100 */, attribute) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.removeAttributeNS = function (element /** TODO #9100 */, ns, attribute) {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.templateAwareRoot = function (el /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.createHtmlDocument = function () { throw 'not implemented'; };
        WorkerDomAdapter.prototype.defaultDoc = function () { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getBoundingClientRect = function (el /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getTitle = function () { throw 'not implemented'; };
        WorkerDomAdapter.prototype.setTitle = function (newTitle) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.elementMatches = function (n /** TODO #9100 */, selector) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.isTemplateElement = function (el) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.isTextNode = function (node /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.isCommentNode = function (node /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.isElementNode = function (node /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.hasShadowRoot = function (node /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.isShadowRoot = function (node /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.importIntoDoc = function (node) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.adoptNode = function (node) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getHref = function (element /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getEventKey = function (event /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.resolveAndSetHref = function (element /** TODO #9100 */, baseUrl, href) {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.supportsDOMEvents = function () { throw 'not implemented'; };
        WorkerDomAdapter.prototype.supportsNativeShadowDOM = function () { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getGlobalEventTarget = function (target) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getHistory = function () { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getLocation = function () { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getBaseHref = function () { throw 'not implemented'; };
        WorkerDomAdapter.prototype.resetBaseElement = function () { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getUserAgent = function () { throw 'not implemented'; };
        WorkerDomAdapter.prototype.setData = function (element /** TODO #9100 */, name, value) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getComputedStyle = function (element /** TODO #9100 */) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getData = function (element /** TODO #9100 */, name) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.setGlobalVar = function (name, value) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.performanceNow = function () { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getAnimationPrefix = function () { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getTransitionEnd = function () { throw 'not implemented'; };
        WorkerDomAdapter.prototype.supportsAnimation = function () { throw 'not implemented'; };
        WorkerDomAdapter.prototype.supportsWebAnimation = function () { throw 'not implemented'; };
        WorkerDomAdapter.prototype.supportsCookies = function () { return false; };
        WorkerDomAdapter.prototype.getCookie = function (name) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.setCookie = function (name, value) { throw 'not implemented'; };
        return WorkerDomAdapter;
    }(DomAdapter));

    /**
     * @experimental
     */
    var platformWorkerApp = _angular_core.createPlatformFactory(_angular_core.platformCore, 'workerApp');
    function errorHandler() {
        return new _angular_core.ErrorHandler();
    }
    // TODO(jteplitz602) remove this and compile with lib.webworker.d.ts (#3492)
    var _postMessage = {
        postMessage: function (message, transferrables) {
            postMessage(message, transferrables);
        }
    };
    function createMessageBus(zone) {
        var sink = new PostMessageBusSink(_postMessage);
        var source = new PostMessageBusSource();
        var bus = new PostMessageBus(sink, source);
        bus.attachToZone(zone);
        return bus;
    }
    function setupWebWorker() {
        WorkerDomAdapter.makeCurrent();
    }
    /**
     * The ng module for the worker app side.
     *
     * @experimental
     */
    var WorkerAppModule = (function () {
        function WorkerAppModule() {
        }
        WorkerAppModule.decorators = [
            { type: _angular_core.NgModule, args: [{
                        providers: [
                            BROWSER_SANITIZATION_PROVIDERS, Serializer,
                            { provide: ClientMessageBrokerFactory, useClass: ClientMessageBrokerFactory_ },
                            { provide: ServiceMessageBrokerFactory, useClass: ServiceMessageBrokerFactory_ },
                            WebWorkerRootRenderer, { provide: _angular_core.RootRenderer, useExisting: WebWorkerRootRenderer },
                            { provide: ON_WEB_WORKER, useValue: true }, RenderStore,
                            { provide: _angular_core.ErrorHandler, useFactory: errorHandler, deps: [] },
                            { provide: MessageBus, useFactory: createMessageBus, deps: [_angular_core.NgZone] },
                            { provide: _angular_core.APP_INITIALIZER, useValue: setupWebWorker, multi: true }
                        ],
                        exports: [_angular_common.CommonModule, _angular_core.ApplicationModule]
                    },] },
        ];
        /** @nocollapse */
        WorkerAppModule.ctorParameters = [];
        return WorkerAppModule;
    }());

    /**
     * Bootstraps the worker ui.
     *
     * @experimental
     */
    function bootstrapWorkerUi(workerScriptUri, customProviders) {
        if (customProviders === void 0) { customProviders = []; }
        // For now, just creates the worker ui platform...
        return Promise.resolve(platformWorkerUi([{
                provide: WORKER_SCRIPT,
                useValue: workerScriptUri,
            }]
            .concat(customProviders)));
    }

    exports.bootstrapWorkerUi = bootstrapWorkerUi;
    exports.ClientMessageBroker = ClientMessageBroker;
    exports.ClientMessageBrokerFactory = ClientMessageBrokerFactory;
    exports.FnArg = FnArg;
    exports.UiArguments = UiArguments;
    exports.MessageBus = MessageBus;
    exports.PRIMITIVE = PRIMITIVE;
    exports.ReceivedMessage = ReceivedMessage;
    exports.ServiceMessageBroker = ServiceMessageBroker;
    exports.ServiceMessageBrokerFactory = ServiceMessageBrokerFactory;
    exports.WORKER_UI_LOCATION_PROVIDERS = WORKER_UI_LOCATION_PROVIDERS;
    exports.WORKER_APP_LOCATION_PROVIDERS = WORKER_APP_LOCATION_PROVIDERS;
    exports.WorkerAppModule = WorkerAppModule;
    exports.platformWorkerApp = platformWorkerApp;
    exports.platformWorkerUi = platformWorkerUi;

}));