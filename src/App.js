/**
 * \file            app.js
 * \brief           Main entry 
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
import { Component } from 'react';
import AppOption from "./components/AppOption";
import AppContext from "./components/AppContext";



class App extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = (
      {
        connected: false,
        webviewready: false,
        params: AppOption,
        listport: [],
        limitx: 0,
        limity: 0,
        speed: 3000,
        accel: 1500,
        theme: "normal",
        comevent: "",
        localedata: []
      }
    );

    // available acceleration values
    this.accel_option = [
      '50',
      '500',
      '1000',
      '1500',
      '2000',
      '2500',
      '3000',
      '3500',
      '4000',
      '5000',
      '6000',
      '8000'
    ];

    // available speed values
    this.speed_option = [
      '1000',
      '1500',
      '2000',
      '2500',
      '3000',
      '4000',
      '6000',
      '8000',
      '9000',
      '10000',
      '11000',
      '12000'
    ];

    this.handleChangePort = this.handleChangePort.bind(this);
    this.webviewloaded = this.webviewloaded.bind(this);

    this.setConnectedState = this.setConnectedState.bind(this);
    this.setDisconnectedState = this.setDisconnectedState.bind(this);
    this.voidfunc = this.voidfunc.bind(this);

    this.handleChangeAcc = this.handleChangeAcc.bind(this);
    this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
    this.handleChangeSpeed = this.handleChangeSpeed.bind(this);
    this.handleChangeTheme = this.handleChangeTheme.bind(this);
    this.handleEmboss = this.handleEmboss.bind(this);
    this.handleHome = this.handleHome.bind(this);
    this.handleLimitStatus = this.handleLimitStatus.bind(this);
    this.handleRefreshPort = this.handleRefreshPort.bind(this);
    this.handleOpenCom = this.handleOpenCom.bind(this);
    this.handleQuit = this.handleQuit.bind(this);


  }

  async webviewloaded() {

    // save webview state
    this.setState({ webviewready: true });
    window.pywebview.state = {};
    let Backend = this.context.GetBackend();
    Backend.setbackendready(true);

    // loading app parameters
    let option = await Backend.readParameters();
    console.log("webviewloaded pywebview ready :", option);
    if (option) {
      let params = JSON.parse(option);
      // save app parameters
      this.setState({ params: params });
      this.context.setParams(params);
      console.log("set locale", params.lang);
      this.context.SetAppLocale(params.lang);

      this.setState({ theme: params.theme });

    }

    // update com ports
    let list = await Backend.getSerialPorts();
    if (list) {
      console.log("gcode_get_serial" + list)
      let portinfo = JSON.parse(list);
      this.setState({ listport: portinfo })
    }

  }

  async componentDidMount() {
    window.addEventListener('pywebviewready', this.webviewloaded);

    // get locale list for IHM
    let localedata = this.context.GetLocaleData().getLocaleList();
    this.setState({ localedata: localedata });
  }

  /*!
     *\brief Communication port select callback.
     *
     */
  handleChangePort(event) {
    let option = {
      ...this.context.Params,
      comport: event.target.value
    };
    this.context.SetOption(option);
  }

  setConnectedState() {
    this.setState({ connected: true });
  }

  setDisconnectedState() {
    this.setState({ connected: false });
  }

  voidfunc() {

  }

  /*!
     *\brief Emboss a dot button callback. Instruct the BrailleRAP to execute a homing reference course on the selected axis.
     *
     */
  async handleEmboss() {
    let ret = await this.context.GetBackend().gcode_M3(1);
    console.log(ret);
  }

  /*!
     *\brief Homing button callback. Instruct the BrailleRAP to execute a homing reference course on the selected axis.
     *
     */
  async handleHome(axis) {
    let ret = await this.context.GetBackend().gcode_G28(axis);
    console.log(ret);
  }

  /*!
     *\brief Refresh endstop button callback. Update the state of BrailleRAP endstop.
     *
     */
  async handleLimitStatus() {
    let s = await this.context.GetBackend().gcode_M119();
    console.log(s);
    console.log(typeof (s));

    if (s) {
      s.map((limit) => {
        console.log(limit);
        let state = 0;
        if ("x_min" in limit) {
          if (limit['x_min'] === 'open')
            state = 2;
          else if (limit['x_min'] === 'TRIGGERED')
            state = 1;
          this.setState({ limitx: state });
        }
        if ("y_min" in limit) {
          if (limit['y_min'] === 'open')
            state = 2;
          else if (limit['y_min'] === 'TRIGGERED')
            state = 1;
          this.setState({ limity: state });
        }
        return (0);
      }

      )
    }
  }

  /*!
     *\brief Connect button callback. Open the selected serial communication port.
     *
     */
  handleOpenCom() {
    this.context.GetBackend().gcode_open(this.context.Params.comport);
    this.setState({ connected: true });
  }

  /*!
     *\brief Refresh port button callback. Call backend to update the communication port list
     *
     */
  handleRefreshPort() {
    if (this.state.webviewready) {
      let msg = this.context.GetLocaleString("app.wait");
      this.setState({ comevent: msg })
      window.pywebview.api.gcode_get_serial().then(list => {
        let portinfo = JSON.parse(list);
        let success = this.context.GetLocaleString("param.comportrefreshed");
        this.setState({ listport: portinfo, comevent: success })
      }
      );
    }
  }

  /*!
     *\brief Change acceleration select callback. Change the acceleration ramp when moving the BrailleRAP head.
     *
     */
  async handleChangeAcc(evt) {
    this.context.GetBackend().gcode_set_accel(evt.target.value);
    this.setState({ accel: evt.target.value });
  }

  /*!
     *\brief Change language select callback. Change the Application locale and save parameters.
     *
     */
  handleChangeLanguage(evt) {
    let param = {
      ...this.context.Params,
      lang: evt.target.value
    };
    this.context.SetOption(param);
    this.context.SetAppLocale(evt.target.value);
  }

  /*!
     *\brief Change speed select callback. Change the moving speed of the BrailleRAP
     *
     */
  async handleChangeSpeed(evt) {
    console.log(evt);
    console.log(evt.target.value);
    this.context.GetBackend().gcode_set_speed(evt.target.value);
    this.setState({ speed: evt.target.value });
  }

  /*!
     *\brief Theme select calback. Apply theme and save parameters
     *
     */
  async handleChangeTheme(evt) {
    let param = {
      ...this.context.Params,
      theme: evt.target.value
    };
    this.context.SetOption(param);
    this.setState({ theme: evt.target.value });
  }

  /*!
     *\brief Move button calback. Relative move the BrailleRAP head in desired x,y direction 
     *
     */
  async handleMove(x, y) {
    let ret = await this.context.GetBackend().gcode_move_rel(x, y);
    console.log(ret);
  }

  /*!
     *\brief Quit button, exit the app
     *
     */
  async handleQuit(e) {
    e.preventDefault();
    await this.context.GetBackend().confirm_dialog("TestBrailleRAP", this.context.GetLocaleString("app.confirquit")).then((ret) => {
      if (ret === true)
        this.context.GetBackend().quit();
    });

  }

  /*!
     *\brief Build html display from endstop status
     *
     */
  GetLimitStatus(name, state) {

    if (state === 1)
      return (<p className='labellimit'>{name} : <span className='limiton'>On</span></p>);
    if (state === 2)
      return (<p className='labellimit'>{name} : <span className='limitoff'>Off</span></p>);

    return (<p className='labellimit'>{name} : <span className='limitunknown'>???</span></p>);
  }

  render() {
    return (
      <div className={this.state.theme + " App"}>

        <div className='min-w-80 mx-auto text-center' >
          <h1 className="text-3xl font-bold">
            TestBrailleRAP
          </h1>
          <h2>Version:{`${process.env.REACT_APP_VERSION}`}</h2>
          
        </div>

        <div className='lg:flex'>
          <button className="btn btn-blue"
            disabled={this.state.connected}
            onClick={this.handleOpenCom}>
            {this.context.GetLocaleString("param.connect")}
          </button>
          <div>
            <label className='labelelm'
              htmlFor='selectport'>
              &nbsp;{this.context.GetLocaleString("param.labelport")}:
            </label>

            <select className='select'
              onChange={this.handleChangePort}
              value={this.context.Params.comport}
              id="selectport"
              name="selectport"
              disabled={this.state.connected}>

              {this.state.listport.map((line, index) => {
                if (line.device === this.context.Params.comport)
                  return (<option aria-selected={true} key={line.device} value={line.device}>{line.device} {line.description} </option>);
                else
                  return (<option aria-selected={false} key={line.device} value={line.device}>{line.device} {line.description} </option>);
              })
              }
            </select>
          </div>
          <button
            disabled={this.state.connected}
            className="btn btn-blue"
            onClick={this.handleRefreshPort}>
            {this.context.GetLocaleString("param.buttonrefresh")}
          </button>
          <p className='labelelm'>{this.state.comevent}</p>
        </div>

        <div className='flex'>
          <button className="btn btn-blue"
            disabled={!this.state.connected}
            onClick={this.setDisconnectedState}>
            {this.context.GetLocaleString("param.disconnect")}

          </button>

        </div>
        <div>
          <hr className='hseparator' />
        </div>
        <div className='flex'>
          <button className="btn btn-blue"
            disabled={!this.state.connected}
            onClick={this.handleLimitStatus}>
            {this.context.GetLocaleString("param.endstopstatus")}

          </button>
          {this.GetLimitStatus('X', this.state.limitx)}
          {this.GetLimitStatus('Y (Paper)', this.state.limity)}
        </div>
        <div className='flex'>
          <button className="btn btn-blue"
            disabled={!this.state.connected}
            onClick={() => { this.handleHome(['x']) }}>
            {this.context.GetLocaleString("param.homex")}

          </button>
          <button className="btn btn-blue"
            disabled={!this.state.connected}
            onClick={() => { this.handleHome(['y']) }}>
            {this.context.GetLocaleString("param.homey")}

          </button>
          <button className="btn btn-blue"
            disabled={!this.state.connected}
            onClick={() => { this.handleHome(['x', 'y']) }}>
            {this.context.GetLocaleString("param.homexy")}

          </button>
        </div>
        <div className="centralgrid">
          <div className=""></div>
          <div className=""></div>
          <button className="btn btn-blue"
            disabled={!this.state.connected}
            onClick={() => { this.handleMove(0, +10) }}>

            Y++
          </button>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <button className="btn btn-blue"
            disabled={!this.state.connected}
            onClick={() => { this.handleMove(0, +1) }}>

            Y+
          </button>
          <div className=""></div>
          <div className=""></div>

          <button className="btn btn-blue"
            disabled={!this.state.connected}
            onClick={() => { this.handleMove(-10, 0) }}>

            X--
          </button>
          <button className="btn btn-blue"
            disabled={!this.state.connected}
            onClick={() => { this.handleMove(-1, 0) }}>

            X-
          </button>

          <button className="btn btn-blue"
            disabled={!this.state.connected}
            onClick={() => { this.handleEmboss() }}>
            {this.context.GetLocaleString("param.makedot")}

          </button>

          <button className="btn btn-blue"
            disabled={!this.state.connected}
            onClick={() => { this.handleMove(1, 0) }}>

            X+
          </button>
          <button className="btn btn-blue"
            disabled={!this.state.connected}
            onClick={() => { this.handleMove(10, 0) }}>

            X++
          </button>

          <div className=""></div>

          <div className=""></div>
          <button className="btn btn-blue"
            disabled={!this.state.connected}
            onClick={() => { this.handleMove(0, -1) }}>

            Y-
          </button>
          <div className="">  </div>
          <div className="">  </div>
          <div className=""></div>
          <div className=""></div>
          <button className="btn btn-blue"
            disabled={!this.state.connected}
            onClick={() => { this.handleMove(0, -10) }}>

            Y--
          </button>
          <div className="">  </div>
          <div className="">  </div>
        </div>
        <div className='flex'>


          <label className='labelelm'
            htmlFor='selectspeed'>
            {this.context.GetLocaleString("param.speed")}:
          </label>
          <select className='selectnum'
            onChange={this.handleChangeSpeed}
            value={this.state.speed}
            id="selectspeed"
            name="selectspeed"
            disabled={!this.state.connected}>
            {
              this.speed_option.map((speed) => {
                if (speed === this.state.speed)
                  return (<option aria-selected={true} value={speed}>{speed} </option>);
                else
                  return (<option aria-selected={false} value={speed}>{speed} </option>);
              })
            }

          </select>

          <label className='labelelm'
            htmlFor='selectaccel'>
            {this.context.GetLocaleString("param.accel")}:
          </label>

          <select className='selectnum'
            onChange={this.handleChangeAcc}
            value={this.state.accel}
            id="selectaccel"
            name="selectaccel"
            disabled={!this.state.connected}>
              {
              this.accel_option.map((accel) => {
                if (accel === this.state.accel)
                  return (<option aria-selected={true} value={accel}>{accel} </option>);
                else
                  return (<option aria-selected={false} value={accel}>{accel} </option>);
              })
            }

            
          </select>


        </div>


        <div className='flex'>
          <input type="text" className='textedit'></input>
          <button className="btn btn-blue"
            disabled={!this.state.connected}
            onClick={this.voidfunc}>
            {this.context.GetLocaleString("param.send-gcode")}

          </button>
        </div>
        <div >
          
          <hr className='hseparator' />
        </div>
        <div className='lg:flex'>
          <div>
            <label className='labelelm'
              htmlFor='themeselect'
            >
              {this.context.GetLocaleString("param.theme")}
            </label>
            <select className='select'
              name="themeselect" id="themeselect"
              onChange={this.handleChangeTheme}
              value={this.state.theme}
            >
              <option value="normal">{this.context.GetLocaleString("param.theme-normal")}</option>
              <option value="thdark">{this.context.GetLocaleString("param.theme-wb")}</option>
              <option value="thlight">{this.context.GetLocaleString("param.theme-bw")}</option>
            </select>
          </div>
          <div>
            <label
              className='labelelm'
              htmlFor='langid' name="langid">
              {this.context.GetLocaleString("param.locale")}
            </label>


            <select id="langid"
              value={this.context.Locale}
              onChange={this.handleChangeLanguage}
              className='select'
            >
              {this.state.localedata.map((item, index) => {
                if (this.context.Locale === item.lang)
                  return (<option aria-selected={true} key={item.lang} value={item.lang}>{item.desc}</option>);
                else
                  return (<option aria-selected={false} key={item.lang} value={item.lang}>{item.desc}</option>);
              })
              }


            </select>
          </div>
        </div>


        <div className='flex content-end'>
          <div className=' min-w-4/5'></div>
          <button className="btn btn-blue mr-8"

            onClick={this.handleQuit}>
            {this.context.GetLocaleString("app.quit")}

          </button>

        </div>
      </div>
    );
  }
}

export default App;
