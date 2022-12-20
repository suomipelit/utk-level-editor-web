import { write_file } from './snippets/utk-level-editor-web-dee991730142acfd/src/js/file.js';

let wasm;

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

const cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = new Uint8Array();

function getUint8Memory0() {
    if (cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedInt32Memory0 = new Int32Array();

function getInt32Memory0() {
    if (cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1);
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}
/**
*/
export const MouseButton = Object.freeze({ Left:0,"0":"Left",Right:1,"1":"Right", });
/**
*/
export const Keycode = Object.freeze({ Escape:0,"0":"Escape",Backspace:1,"1":"Backspace",Return:2,"2":"Return",Space:3,"3":"Space",PageDown:4,"4":"PageDown",PageUp:5,"5":"PageUp",Up:6,"6":"Up",Down:7,"7":"Down",Left:8,"8":"Left",Right:9,"9":"Right",KpEnter:10,"10":"KpEnter",KpMinus:11,"11":"KpMinus",KpPlus:12,"12":"KpPlus",Minus:13,"13":"Minus",Plus:14,"14":"Plus",A:15,"15":"A",C:16,"16":"C",Q:17,"17":"Q",S:18,"18":"S",W:19,"19":"W",X:20,"20":"X",Y:21,"21":"Y",Z:22,"22":"Z",Num1:23,"23":"Num1",Num2:24,"24":"Num2",F1:25,"25":"F1",F2:26,"26":"F2",F3:27,"27":"F3",F4:28,"28":"F4",F6:29,"29":"F6",F7:30,"30":"F7",F8:31,"31":"F8",F9:32,"32":"F9", });
/**
*/
export class LevelEditor {

    static __wrap(ptr) {
        const obj = Object.create(LevelEditor.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_leveleditor_free(ptr);
    }
    /**
    * @param {WebImage} floor_texture
    * @param {WebImage} walls_texture
    * @param {WebImage} shadows_alpha_texture
    * @param {Uint8Array} font_data
    * @param {Function} show_file_upload
    * @param {Function} hide_file_upload
    * @returns {LevelEditor}
    */
    static new(floor_texture, walls_texture, shadows_alpha_texture, font_data, show_file_upload, hide_file_upload) {
        _assertClass(floor_texture, WebImage);
        var ptr0 = floor_texture.ptr;
        floor_texture.ptr = 0;
        _assertClass(walls_texture, WebImage);
        var ptr1 = walls_texture.ptr;
        walls_texture.ptr = 0;
        _assertClass(shadows_alpha_texture, WebImage);
        var ptr2 = shadows_alpha_texture.ptr;
        shadows_alpha_texture.ptr = 0;
        const ptr3 = passArray8ToWasm0(font_data, wasm.__wbindgen_malloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.leveleditor_new(ptr0, ptr1, ptr2, ptr3, len3, addHeapObject(show_file_upload), addHeapObject(hide_file_upload));
        return LevelEditor.__wrap(ret);
    }
    /**
    * @returns {number}
    */
    screen() {
        const ret = wasm.leveleditor_screen(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    screen_width() {
        const ret = wasm.leveleditor_screen_width(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    screen_height() {
        const ret = wasm.leveleditor_screen_height(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} x
    * @param {number} y
    * @returns {boolean}
    */
    mouse_move(x, y) {
        const ret = wasm.leveleditor_mouse_move(this.ptr, x, y);
        return ret !== 0;
    }
    /**
    * @param {number} button
    * @returns {boolean}
    */
    mouse_down(button) {
        const ret = wasm.leveleditor_mouse_down(this.ptr, button);
        return ret !== 0;
    }
    /**
    * @param {number} button
    * @returns {boolean}
    */
    mouse_up(button) {
        const ret = wasm.leveleditor_mouse_up(this.ptr, button);
        return ret !== 0;
    }
    /**
    * @param {number | undefined} key
    * @param {string | undefined} text
    * @returns {boolean}
    */
    key_down(key, text) {
        var ptr0 = isLikeNone(text) ? 0 : passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.leveleditor_key_down(this.ptr, isLikeNone(key) ? 33 : key, ptr0, len0);
        return ret !== 0;
    }
    /**
    * @param {string} name
    * @param {Uint8Array} data
    */
    add_level_file(name, data) {
        const ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        wasm.leveleditor_add_level_file(this.ptr, ptr0, len0, ptr1, len1);
    }
    /**
    */
    frame() {
        wasm.leveleditor_frame(this.ptr);
    }
}
/**
*/
export class WebImage {

    static __wrap(ptr) {
        const obj = Object.create(WebImage.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_webimage_free(ptr);
    }
    /**
    * @param {number} width
    * @param {number} height
    * @param {Uint8Array} data
    * @returns {WebImage}
    */
    static new(width, height, data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.webimage_new(width, height, ptr0, len0);
        return WebImage.__wrap(ret);
    }
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function getImports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_writefile_6d2bd49408189961 = function(arg0, arg1, arg2, arg3) {
        write_file(getStringFromWasm0(arg0, arg1), getArrayU8FromWasm0(arg2, arg3));
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_debug_f15cb542ea509609 = function(arg0) {
        console.debug(getObject(arg0));
    };
    imports.wbg.__wbg_error_ef9a0be47931175f = function(arg0) {
        console.error(getObject(arg0));
    };
    imports.wbg.__wbg_info_2874fdd5393f35ce = function(arg0) {
        console.info(getObject(arg0));
    };
    imports.wbg.__wbg_log_4b5638ad60bdc54a = function(arg0) {
        console.log(getObject(arg0));
    };
    imports.wbg.__wbg_warn_58110c4a199df084 = function(arg0) {
        console.warn(getObject(arg0));
    };
    imports.wbg.__wbg_call_97ae9d8645dc388b = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        const ret = debugString(getObject(arg1));
        const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function initMemory(imports, maybe_memory) {

}

function finalizeInit(instance, module) {
    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;
    cachedInt32Memory0 = new Int32Array();
    cachedUint8Memory0 = new Uint8Array();


    return wasm;
}

function initSync(module) {
    const imports = getImports();

    initMemory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return finalizeInit(instance, module);
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = new URL('utk-level-editor_bg.wasm', import.meta.url);
    }
    const imports = getImports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    initMemory(imports);

    const { instance, module } = await load(await input, imports);

    return finalizeInit(instance, module);
}

export { initSync }
export default init;
