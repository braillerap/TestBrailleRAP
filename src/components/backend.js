
class BackendPyWebview {
    /*!
     *\brief Display a confirmation dialog
     *
     */
    async confirm_dialog (title, message)
    {
        let ret = await window.pywebview.api.confirm_dialog(title,message);
        console.log ("return from pywebview confirm_dialog: ", ret)
        if (ret)
            return true;
        else
            return false;
    }

    /*!
     *\brief Read application parameters file
     *
     */
    async readParameters ()
    {
        let option = await window.pywebview.api.get_parameters();
        
        return option;
    }

    /*!
     *\brief Write application parameters file
     *
     */
    writeAppParameters (opt)
    {
        window.pywebview.api.gcode_set_parameters(opt);
    }

    /*!
     *\brief Get serial communication port list
     *
     */
    async getSerialPorts ()
    {
        let list = await window.pywebview.api.gcode_get_serial();
        return list;    
    }

    /*!
     *\brief Open a serial communication port
     *
     */
    async gcode_open (port)
    {
        return await window.pywebview.api.openCom (port);
    }

    /*!
     *\brief Run a M119 (enstop status) on the connected BrailleRAP
     *
     */
    async gcode_M119()
    {
        return await window.pywebview.api.M119 ();
    }

    /*!
     *\brief Run a M3 (Activate solenoid) on the connected BrailleRAP
     *
     */
    async gcode_M3 (s)
    {
        return await window.pywebview.api.M3 (s);
    }

    /*!
     *\brief Run a relative move command on the connected BrailleRAP
     *
     */
    async gcode_move_rel (x,y)
    {
        return await window.pywebview.api.MoveRel(x,y);
    }

    /*!
     *\brief Set move acceleration on the connected BrailleRAP
     *
     */
     async gcode_set_accel (accel)
    {
        return await window.pywebview.api.M204 (accel);
    }
    
    /*!
     *\brief Set move speed on the connected BrailleRAP
     *
     */
    async gcode_set_speed (speed)
    {
        return await window.pywebview.api.setSpeed (speed);
    }

    /*!
     *\brief Run a homing reference course for selected axis on the connected BrailleRAP
     *
     */
    async gcode_G28 (axis)
    {
        return await window.pywebview.api.G28 (axis);

    }

    /*!
     *\brief Request application exit
     *
     */
    quit ()
    {
        return window.pywebview.api.quit ();
    }
};

class Backend {
    constructor() {
        this.backendready = false;   
        
        // build a pywebview backend
        this.backend = new BackendPyWebview();
    }

    /*!
     *\brief Return backend status
     *
     */
    isbackendready() 
    { 
        return this.backendready; 
    }

    /*!
     *\brief Set backend status
     *
     */
    setbackendready (status)
    {
        this.backendready = status;
    }

    /*!
     *\brief Read application parameters file
     *
     */
    async readParameters ()
    {
         if (this.backendready)
        {
            return (this.backend.readParameters());
        }
        return null;
    }

     /*!
     *\brief Write application parameters file
     *
     */
    writeAppParameters (opt)
    {
        if (this.backendready)
        {
            this.backend.writeAppParameters(opt);
            
        }
    }

     /*!
     *\brief Get serial communication port list
     *
     */
    async getSerialPorts ()
    {
        if (this.backendready)
            return (this.backend.getSerialPorts());
        return [];
    }

    /*!
     *\brief Display a confirmation dialog
     *
     */
    async confirm_dialog (title, message)
    {
        if (this.backendready)
        {
            let ret = await this.backend.confirm_dialog(title, message);
            console.log ("return from backend confirm_dialog: ", ret)
            return ret;
            
        }
    }

    /*!
     *\brief Run a homing reference course for selected axis on the connected BrailleRAP
     *
     */
    async gcode_G28 (axis)
    {
        if (this.backendready)
            return await this.backend.gcode_G28(axis);

        return '';
    }

    /*!
     *\brief Open a serial communication port
     *
     */
    async gcode_open (port)
    {
        if (this.backendready)
            return await this.backend.gcode_open (port);
        return -1;
    }
    
    /*!
     *\brief Run a M119 (enstop status) on the connected BrailleRAP
     *
     */
    async gcode_M119 ()
    {
        if (this.backendready)
            return await this.backend.gcode_M119 ();
        
        return '';
    }

    /*!
     *\brief Run a M3 (Activate solenoid) on the connected BrailleRAP
     *
     */
    async gcode_M3 (s)
    {
        if (this.backendready)
            return await this.backend.gcode_M3(s);
        return '';
    }

    /*!
     *\brief Run a relative move command on the connected BrailleRAP
     *
     */
    async gcode_move_rel (x,y)
    {
        if (this.backendready)
            return await this.backend.gcode_move_rel(x,y);
        return '';
    }

    /*!
     *\brief Set move acceleration on the connected BrailleRAP
     *
     */
    async gcode_set_accel (accel)
    {
        if (this.backendready)
            return await this.backend.gcode_set_accel (accel);
        return '';
    }

    /*!
     *\brief Set move speed on the connected BrailleRAP
     *
     */
    async gcode_set_speed (speed)
    {
        if (this.backendready)
            return await this.backend.gcode_set_speed (speed);
        return '';
    }
    
    /*!
     *\brief Display a confirmation dialog
     *
     */
    async confirm_dialog (title, message)
    {
        if (this.backendready)
            return await this.backend.confirm_dialog (title, message);

        return false;
    }
    
    /*!
     *\brief Request application exit
     *
     */
    quit ()
    {
        if (this.backendready)
            this.backend.quit ();
    }
    
}

export default Backend;
