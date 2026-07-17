

from . import GCTestHelloWorld
from . import GCTestElephant


class GCodeTests:
    def __init__(self):
        self.tests = [
            {"name":"hello world",  "gcode":GCTestHelloWorld.HELLOWORLD_GCODE},
            {"name":"elephant",     "gcode":GCTestElephant.ELEPHANT_GCODE}
        ]

    def getList (self):
        list = [test['name'] for test in self.tests]
        print (list)
        return list

    def getTest (self, name):
        test = ""
        for gcode in self.tests:
            if gcode["name"] == name:
                test = gcode["gcode"]
                break
        print ("getTest", test)
        return test