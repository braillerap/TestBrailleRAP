
class BackendPyWebview {
    async confirm_dialog (title, message)
    {
        let ret = await window.pywebview.api.confirm_dialog(title,message);
        console.log ("return from pywebview confirm_dialog: ", ret)
        if (ret)
            return true;
        else
            return false;
    }
    async readParameters ()
    {
        let option = await window.pywebview.api.get_parameters();
        
        return option;
    }

    writeAppParameters (opt)
    {
        window.pywebview.api.gcode_set_parameters(opt);
    }
    async getSerialPorts ()
    {
        let list = await window.pywebview.api.gcode_get_serial();
        return list;    
    }

    async gcode_open (port)
    {
        return await window.pywebview.api.openCom (port);
    }
    async gcode_M119()
    {
        return await window.pywebview.api.M119 ();
    }

    async gcode_M3 (s)
    {
        return await window.pywebview.api.M3 (s);
    }
    async gcode_move_rel (x,y)
    {
        return await window.pywebview.api.MoveRel(x,y);
    }
    async gcode_G28 (axis)
    {
        return await window.pywebview.api.G28 (axis);

    }
};

class Backend {
    constructor() {
        this.backendready = false;   
        
        this.backend = new BackendPyWebview();
    }

    isbackendready() 
    { 
        return this.backendready; 
    }

    setbackendready (status)
    {
        this.backendready = status;
    }

    async readParameters ()
    {
         if (this.backendready)
        {
            return (this.backend.readParameters());
        }
        return null;
    }
    writeAppParameters (opt)
    {
        if (this.backendready)
        {
            this.backend.writeAppParameters(opt);
            
        }
    }

    async getSerialPorts ()
    {
        if (this.backendready)
            return (this.backend.getSerialPorts());
        return [];
    }
    async confirm_dialog (title, message)
    {
        if (this.backendready)
        {
            let ret = await this.backend.confirm_dialog(title, message);
            console.log ("return from backend confirm_dialog: ", ret)
            return ret;
            
        }
    }
    async gcode_open (port)
    {
        return await this.backend.gcode_open (port);
    }
    async gcode_M119 ()
    {
        return await this.backend.gcode_M119 ();
    }

    async gcode_M3 (s)
    {
        return await this.backend.gcode_M3(s);
    }

    async gcode_move_rel (x,y)
    {
        return await this.backend.gcode_move_rel(x,y);
    }
    async gcode_G28 (axis)
    {
        return await this.backend.gcode_G28(axis);
    }
}

export default Backend;
