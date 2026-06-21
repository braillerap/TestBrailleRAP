/**
 * \file            AppContextWrapper.js
 * \brief           Global application context
 */

/*
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS LICENSED UNDER
 *                  GNU GENERAL PUBLIC LICENSE
 *                   Version 3, 29 June 2007
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE
 * AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 * This file is part of TestBrailleRAP software.
 *
 * SPDX-FileCopyrightText: 2025-2026 Stephane GODIN <stephane@braillerap.org>
 * 
 * SPDX-License-Identifier: GPL-3.0 
 */

import React, { useState } from 'react';
import AppContext from './AppContext';
import AppOption from './AppOption.js';
import LocaleString from './localestring.js';
import Backend from './backend.js';




let params = AppOption;

let pywebviewready = false;
let locale = "fr";
let localedata = new LocaleString();

let _backend = new Backend();


const AppContextWrapper = (props) => {
    
    const [Params, setParams] = useState(params);
    const [PyWebViewReady, setPyWebViewReady] = useState(pywebviewready);
    const [Locale, setLocale] = useState(locale);
    

    
    function getLocaleData() {
        console.log("localedata in context:" + localedata);

        return (localedata);
    }
    function setAppLocale(localecode) {
        console.log("setAppLocale:" + localecode);
        localedata.setLocaleCode(localecode);
        setLocale(localedata.getLocaleCode());
    }

    
    function setOption(opt) {
        setParams(opt);
        if (window.pywebview)
            window.pywebview.api.gcode_set_parameters(opt);

    }

    function getLocaleString(id) {
        return localedata.getLocaleString(id);

    }
    function getLocaleDir() {
        return localedata.getLocaleDir();
    }
    function getBackend () {
        console.log ("getBackend");
        return _backend;
    }

    return (
        <AppContext.Provider value={{
            message: "message",
            
            SetOption: setOption,
            GetLocaleData: getLocaleData,
            SetAppLocale: setAppLocale,
            GetLocaleString: getLocaleString,
            GetLocaleDir: getLocaleDir,
            GetBackend: getBackend,
            Params, setParams,
            PyWebViewReady, setPyWebViewReady,
            Locale, setLocale,
            
        }} >
            {props.children}
        </AppContext.Provider>
    );
}

export default AppContextWrapper;
