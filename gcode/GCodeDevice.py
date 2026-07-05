import serial
import time

COM_TIMEOUT=5

class GCodeDevice :
    def __init__(self):
        self.port = None
        self.hwport = None

    def openCom (self, port):
        try:
            self.port = port
            self.hwport = serial.Serial(self.port, 250000, timeout=2, write_timeout=2) 
        except:
            return -1
        
        return 0
    def read (self):
        # Wait for response with carriage return
        tbegin = time.time()
        gcode_out = ""
        print ("start reading")
        while True:
            gcode_line = self.hwport.readline()
            print ("hw: ", gcode_line, gcode_line.decode('utf-8'))

            gcode_out = gcode_out + gcode_line.decode('utf-8')
           
            print ("out:", gcode_out)
            print(gcode_out.strip())
            if "ok" in gcode_out:
                print ("ok found")
                break
            if len(gcode_line) > 0:
                tbegin = time.time()
            if time.time() - tbegin > COM_TIMEOUT:
                print ("Raise except")
                raise Exception("Timeout in printer communication")
        return gcode_out
    
    def G28 (self, axis):
        for a in axis:
            if (a == 'x'):
                self.hwport.write ("G28 X\r\n".encode())
            if (a == 'y'):
                self.hwport.write ("G28 Y\r\n".encode())
            str = self.read ()
        return str
    
   
    def M3 (self, s):
        str = "M3 S{0}\r\n".format (s)
        self.hwport.write (str.encode())
        str = self.read ()
        return str

    def MoveRel (self, x, y):
        str = "G91\r\n"
        str += "G1 X{0} Y{1}\r\n".format(x,y)
        str += "G90\r\n"   

        self.hwport.write (str.encode())
        str = self.read ()
        return str

    def setSpeed (self, speed):
        str = "G1 F{0}\r\n".format(speed)
        self.hwport.write (str.encode ())

        str = self.read ()
        return str
    
    def M119 (self): #endstop status
        try:
            print ("M119")
            self.hwport.write(str.encode("\r\n\r\n"))   #cleanup
            self.hwport.flushInput()  # Flush startup text in serial input
            self.hwport.write (str.encode("M119\r\n"))
            ret = self.read()
            ll = ret.splitlines()
            print ('M119', ll, ret);

            res = []
            search = ['x_min', 'y_min']
            for l in ll:
                for s in search:
                    if (s in l):
                        state = l.split(':')

                        print (s)
                        if len(state) > 1:
                            res.append({state[0]: state[1].strip()})
               
            return res

        except Exception as e:
            print ("Exception raised", repr(e))
            return None
        
    def M204(self, accel):
        str = "M204 T{0}\r\n".format (accel)
        self.hwport.write (str.encode ())

        str = self.read ()
        return str
    
    def remove_comment(self, gcode):
        """Remove comments from GCode line if any"""
        if gcode.find(';') == -1:
            return gcode
        return gcode[:gcode.index(';')]
    
    def PrintGcode (self, gcode):
        global cancel_print
        try:
            cancel_print = False
           

            # Hit enter a few times to wake up          
            self.hwport.write(str.encode("\r\n\r\n"))   #cleanup
            
            time.sleep(1) # Wait for initialization
            self.hwport.flushInput()  # Flush startup text in serial input
            
            gcodelines = gcode.split("\r\n")
            for line in gcodelines:
                cmd_gcode = self.remove_comment(line)
                cmd_gcode = (
                    cmd_gcode.strip()
                )  # Strip all EOL characters for streaming
                if cmd_gcode.isspace() is False and len(cmd_gcode) > 0:
                    print("Sending: " + cmd_gcode)
                    self.hwport.write(
                        cmd_gcode.encode() + str.encode("\n")
                    )  # Send g-code block
                    # Wait for response with carriage return
                    tbegin = time.time()
                    while True:
                        grbl_out = self.hwport.readline()
                        print(grbl_out.strip().decode("utf-8"))
                        if str.encode("ok") in grbl_out:
                            break
                        if len(grbl_out) > 0:
                            tbegin = time.time()
                        if time.time() - tbegin > COM_TIMEOUT:
                            raise Exception("Timeout in printer communication")

                if cancel_print:
                    self.hwport.write(
                        str.encode("M84;\n") # disable motor
                    )  
                    self.hwport.readline()
                    break

                print("End of printing")
                
        except Exception as e:
            print(e)
            
            return "Erreur d'impression :" + str(e)
        
        return " "