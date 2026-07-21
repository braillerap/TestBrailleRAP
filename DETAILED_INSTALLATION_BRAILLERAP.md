# Detailed Installation Guide for TestBrailleRAP

This guide provides comprehensive instructions for installing TestBrailleRAP by building from source or using Docker. These methods are suitable for users who require more control over their installation, are developing the software, or are using specific system configurations not covered by the pre-built binaries.



## 1. Building from Source

Building TestBrailleRAP from its source code requires a basic understanding of command-line operations and development environments. Choose the section relevant to your operating system.

### 1.1. For Windows

**Prerequisites:**

* **Python 3.10 or later:** Ensure it's added to your system's PATH during installation.
* **Node.js 20.12 or later:** Install from the official Node.js website.
* **Git:** Install Git to clone the repository.

**Step-by-Step Instructions:**

1. **Open a Command Prompt or PowerShell.**

2. **Clone the AccessBrailleRAP Repository:**
   
   ```bash
   git clone https://github.com/braillerap/TestBrailleRAP.git
   ```

3. **Navigate into the Project Directory:**
   
   ```bash
   cd TestBrailleRAP
   ```

4. **Create a Python Virtual Environment:** This isolates project dependencies.
   
   ```bash
   python -m venv venv
   ```

5. **Activate the Python Virtual Environment:**
   
   ```bash
   .\venv\Scripts\activate
   ```

6. **Install Python Dependencies:**
   
   ```bash
   pip install -r requirements.txt
   ```

7. **Install Node.js Dependencies:**
   
   ```bash
   npm install
   ```

8. **Build the Windows Executable:** This will create a standalone `.exe` file.
   
   ```bash
   npm run buildview
   ```
   
   The compiled executable (`.exe`) will be found in the `dist` folder within your project directory.

![A screenshot of TestBrailleRAP in the dist folder](./screenshot/screen1.png)
*A screenshot of TestBrailleRAP in the dist folder*

### 1.2. For Linux Debian 13

**Prerequisites:**

* **Python 3 and Python 3 `venv` module.**
* **Node.js 20.x and npm.**
* **GCC and general build tools:** `git-extras`, `lintian`.
* **Additional Python development headers and GTK/WebKit dependencies:** `python3-pyqt6`, `python3-tk`, `libqt6webchannel6`, `libqt6webview6`.

**Step-by-Step Instructions:**

1. **Open a Terminal.**

2. **Update your package list and install general system dependencies:**
   
   ```bash
   sudo apt update
   ```
   ```bash
   sudo apt install -y git git-extras lintian python3-venv python3-pyqt6 python3-tk libqt6webchannel6 libqt6webview6
   ```

3. **Install Node.js 20.x:**
   
   ```bash
   sudo apt install nodejs npm
   ```

4. **Clone the TestBrailleRAP Repository:**
   
   ```bash
   git clone https://github.com/braillerap/TestBrailleRAP.git
   ```

5. **Navigate into the Project Directory:**
   
   ```bash
   cd TestBrailleRAP
   ```

6. **Create a Python Virtual Environment:**
   
   ```bash
   python3 -m venv venv
   ```

7. **Activate the Python Virtual Environment:**
   
   ```bash
   source ./venv/bin/activate
   ```

8. **Install Python Dependencies:**
   
   ```bash
   pip install -r requirement_debian13.txt
   ```

9. **Install Node.js Dependencies:**
   
   ```bash
   npm install
   ```

10. **Build the Debian Package:** This will create a `.deb` package for easy installation.
    
    ```bash
    npm run builddebian13
    ```
    
    The compiled `.deb` package will be found in the `dist` folder.

11. **Install the Debian Package:**
    
    ```bash
    sudo dpkg -i <package-name>.deb
    ```
    
    (Replace `<package-name>.deb` with the actual file name, e.g., `testbraillerap-debian13_1.0.0_amd64.deb`).

    *(Screenshot: Example of `dpkg` command and successful installation output)*

    ```bash
    sudo dpkg -i ./dist/testbraillerap-debian13_0.1.0.deb 
    [sudo] password for usertest: 
    Selecting previously unselected package testbraillerap-debian.
    (Reading database ... 182615 files and directories currently installed.)
    Preparing to unpack .../testbraillerap-debian13-0.1.0.deb ...
    Unpacking testbraillerap-debian13 (0.8.1) ...
    Setting up testbraillerap-debian (0.8.1) ...
    Processing triggers for mailcap (3.74) ...
    Processing triggers for gnome-menus (3.36.0-3) ...
    Processing triggers for desktop-file-utils (0.28-1) ...
    (venv) usertest@debiantest:~/TestBrailleRAP$
    ```

12. **Run TestBrailleRAP**
    ```bash
    usertest@debiantest:~$TestBrailleRAP-debian &
    ```

    ![TestBrailleRAP screenshot](./screenshot/screen1.png)

### 1.3. For Ubuntu 26.04

**Prerequisites:**

* **Python 3 and Python 3 `venv` module.**
* **Node.js 20.x and npm.**
* **GCC and general build tools:** `git-extras`, `lintian`.
* **Additional Python development headers and GTK/WebKit dependencies:** `python3-pyqt6`, `python3-tk`, `libqt6webchannel6`, `libqt6webview6`.

**Step-by-Step Instructions:**

1. **Open a Terminal.**

2. **Update your package list and install general system dependencies:**
   
   ```bash
   sudo apt update
   ```
   ```bash
   sudo apt install -y git git-extras lintian python3-venv python3-pyqt6 python3-tk libqt6webchannel6 libqt6webview6
   ```

3. **Install Node.js 20.x:**
   
   ```bash
   sudo apt install nodejs npm
   ```

4. **Clone the TestBrailleRAP Repository:**
   
   ```bash
   git clone https://github.com/braillerap/TestBrailleRAP.git
   ```

5. **Navigate into the Project Directory:**
   
   ```bash
   cd TestBrailleRAP
   ```

6. **Create a Python Virtual Environment:**
   
   ```bash
   python3 -m venv venv
   ```

7. **Activate the Python Virtual Environment:**
   
   ```bash
   source ./venv/bin/activate
   ```

8. **Install Python Dependencies:**
   
   ```bash
   pip install -r requirement_ubuntu26.txt
   ```

9. **Install Node.js Dependencies:**
   
   ```bash
   npm install
   ```

10. **Build the Debian Package:** This will create a `.deb` package for easy installation.
    
    ```bash
    npm run buildubuntu
    ```
    
    The compiled `.deb` package will be found in the `dist` folder.

11. **Install the Debian Package:**
    
    ```bash
    sudo dpkg -i <package-name>.deb
    ```
    
    (Replace `<package-name>.deb` with the actual file name, e.g., `testbraillerap-ubuntu_1.0.0_amd64.deb`).

    *(Screenshot: Example of `dpkg` command and successful installation output)*

    ```bash
    sudo dpkg -i ./dist/testbraillerap-ubuntu_0.1.0.deb 
    [sudo] password for usertest: 
    Selecting previously unselected package testbraillerap-ubuntu.
    (Reading database ... 182615 files and directories currently installed.)
    Preparing to unpack .../testbraillerap-ubuntu-0.1.0.deb ...
    Unpacking testbraillerap-ubuntu (0.1.0) ...
    Setting up testbraillerap-ubuntu (0.1.0) ...
    Processing triggers for mailcap (3.74) ...
    Processing triggers for gnome-menus (3.36.0-3) ...
    Processing triggers for desktop-file-utils (0.28-1) ...
    (venv) usertest@ubuntu:~/TestBrailleRAP$
    ```

12. **Run TestBrailleRAP**
    ```bash
    usertest@ubuntu:~$TestBrailleRAP-debian &
    ```

    ![TestBrailleRAP screenshot](./screenshot/screen1.png)




# Building for Linux using Docker
You can use Docker configuration to build TestBrailleRAP for a Linux distribution. 

Docker configuration to build TestBrailleRAP for Debian or Ubuntu are available here:


[Debian13](https://github.com/braillerap/BuildTestBrailleRAPDebian13)

 
   

## 3. Running from Source (Development Mode)

If you have built TestBrailleRAP from source and wish to run it in a development environment for testing or contribution:

1. **Navigate to the TestBrailleRAP project directory.**

2. **Activate your Python virtual environment:**
   
   * Windows: `.\venv\Scripts\activate`
   * Linux/Raspberry Pi: `source ./venv/bin/activate`

3. **Start the application:**
   
   ```bash
   npm run startview
   ```
   or
   ```bash
   npm run debugview
   ```

   This command will launch the TestBrailleRAP interface, allowing you to test changes or use the application directly from your development setup.

## 4. Serial Port Permissions (Linux Specific)

When using a BrailleRAP embosser with AccessBrailleRAP on Linux, your user account needs permission to access the serial port where the embosser is connected.

**Step-by-Step Instructions:**

1. **Open a Terminal.**

2. **Add your user to the `dialout` group:**
   
   ```bash
   sudo usermod -a -G dialout $USER
   ```
   
   (Replace `$USER` with your actual username if you are not currently logged in as the target user).

3. **Log out and log back in:** This is necessary for the group changes to take effect.

