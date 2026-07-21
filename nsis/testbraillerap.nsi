; TestBrailleRAP.nsi
;
; This script is based on example1.nsi, but it remember the directory, 
; has uninstall support and (optionally) installs start menu shortcuts.
;
; This script will install TestBrailleRAP software and necessary drivers
; to control UART for BrailleRAP communication.
;
; This file is licensed under GPL V3 as TestBrailleRAP software
; .

;--------------------------------
!include "LogicLib.nsh"

!include "MUI2.nsh"

; The name of the installer
Name "TestBrailleRAP"

; The file to write
OutFile "TestBrailleRAP_Windows_Setup.exe"

; Build Unicode installer
Unicode True

; The default installation directory
InstallDir $PROGRAMFILES\TestBrailleRAP

; Request application privileges for Windows Vista and higher
RequestExecutionLevel admin

; Registry key to check for directory (so if you install again, it will 
; overwrite the old one automatically)
InstallDirRegKey HKLM "Software\TestBrailleRAP" "Install_Dir"

;--------------------------------
; Pages configuration
;!define MUI_HEADERIMAGE 1
;!define MUI_HEADERIMAGE_BITMAP "InstallerLogo.bmp"
;!define MUI_BRANDING
;!define MUI_BRANDING_BITMAP "InstallerLogo.bmp"
;!define MUI_HEADERIMAGE_RIGHT
!define MUI_ICON "brap.ico"
!define MUI_HEADERIMAGE
!define MUI_HEADERIMAGE_BITMAP "${NSISDIR}\Contrib\Graphics\Header\win.bmp" ; optional
;!define MUI_ABORTWARNING

!define UNINSTKEY "Software\Microsoft\Windows\CurrentVersion\Uninstall\$(^Name)"
!define MULTIUSER_INSTALLMODE_DEFAULT_REGISTRY_KEY "${UNINSTKEY}"
!define MULTIUSER_INSTALLMODE_DEFAULT_REGISTRY_VALUENAME "CurrentUser"
!define MULTIUSER_INSTALLMODE_INSTDIR "$(^Name)"
!define MULTIUSER_INSTALLMODE_COMMANDLINE
!define MULTIUSER_EXECUTIONLEVEL Admin
!define MULTIUSER_MUI

!include "MultiUser.nsh"


; Pages
!insertmacro MUI_PAGE_WELCOME
;!insertmacro MUI_PAGE_LICENSE "${NSISDIR}\Docs\Modern UI\License.txt"
;!insertmacro MUI_PAGE_LICENSE "${NSISDIR}\Docs\Modern UI\License.txt"
!insertmacro MULTIUSER_PAGE_INSTALLMODE
!insertmacro MUI_PAGE_COMPONENTS
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
  
!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES

!insertmacro MUI_LANGUAGE "English"
!addplugindir ".\"
Function .onInit
  !insertmacro MULTIUSER_INIT
FunctionEnd

Function un.onInit
  !insertmacro MULTIUSER_UNINIT
FunctionEnd


;--------------------------------

; The stuff to install
Section "TestBrailleRAP (required)"
  InitPluginsDir
  SectionIn RO
  
    ; Set output path to the installation directory.
    SetOutPath $INSTDIR
    
    ; Put file there
    File "TestBrailleRAP.exe"
    SetOverwrite off
    File "test_brap__parameters.json"
    SetOverwrite on
    File "_internal.zip"
   
  
  
   AccessControl::GrantOnFile \
    "$INSTDIR\test_brap__parameters.json" "(BU)" "GenericRead + GenericWrite"
    Pop $0 ; "error" on errors

  ; Write the installation path into the registry
  WriteRegStr HKLM SOFTWARE\TestBrailleRAP "Install_Dir" "$INSTDIR"
  
  ; Write the uninstall keys for Windows
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\TestBrailleRAP" "DisplayName" "TestBrailleRAP"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\TestBrailleRAP" "UninstallString" '"$INSTDIR\uninstall.exe"'
  WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\TestBrailleRAP" "NoModify" 1
  WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\TestBrailleRAP" "NoRepair" 1
  WriteUninstaller "$INSTDIR\uninstall.exe"
  
  RMDir /r $INSTDIR\_internal
  Pop $0
  nsisunz::UnzipToLog "$INSTDIR\_internal.zip" "$INSTDIR"
  ; Always check result on stack
  Pop $0
  StrCmp $0 "success" ok
  DetailPrint "$0" ;print error message to log
ok:
  SectionEnd

Section "USB Drivers"
  
  ; drivers
  File "CDM212364_Setup.exe"
  File "CH341SER.EXE"

  ExecWait '"$INSTDIR\CDM212364_Setup.exe"'
  ExecWait '"$INSTDIR\CH341SER.exe"'

SectionEnd

; Optional section (can be disabled by the user)
Section "Start Menu Shortcuts"

  CreateDirectory "$SMPROGRAMS\TestBrailleRAP"
  CreateShortcut "$SMPROGRAMS\TestBrailleRAP\Uninstall.lnk" "$INSTDIR\uninstall.exe"
  CreateShortcut "$SMPROGRAMS\TestBrailleRAP\TestBrailleRAP.lnk" "$INSTDIR\TestBrailleRAP.exe"

SectionEnd

Section "Desktop Shortcuts"
  SetShellVarContext current
  CreateShortCut "$DESKTOP\TestBrailleRAP.lnk" "$INSTDIR\TestBrailleRAP.exe"
  
SectionEnd



;--------------------------------
;Descriptions

  ;Language strings
  ;LangString DESC_SecDummy ${LANG_ENGLISH} "A test section."

  ;Assign language strings to sections
  !insertmacro MUI_FUNCTION_DESCRIPTION_BEGIN
  ;!insertmacro MUI_DESCRIPTION_TEXT ${SecDummy} $(DESC_SecDummy)
  !insertmacro MUI_FUNCTION_DESCRIPTION_END

;--------------------------------

; Uninstaller

Section "Uninstall"
  
  ; Remove registry keys
  DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\TestBrailleRAP"
  DeleteRegKey HKLM SOFTWARE\TestBrailleRAP

  ; Remove files and uninstaller
  Delete $INSTDIR\TestBrailleRAP.exe
  Delete $INSTDIR\test_brap__parameters.json
  Delete $INSTDIR\uninstall.exe
  Delete $INSTDIR\CDM212364_Setup.exe
  Delete $INSTDIR\CH341SER.EXE
  Delete $INSTDIR\_internal.zip
  RMDir $INSTDIR\_internal

  ; Remove shortcuts, if any
  Delete "$SMPROGRAMS\TestBrailleRAP\*.lnk"
    
  ; Remove directories
  RMDir "$SMPROGRAMS\TestBrailleRAP"
  RMDir /r $INSTDIR\_internal
  RMDir "$INSTDIR"

  SetShellVarContext current
  Delete "$DESKTOP\TestBrailleRAP.lnk" 

SectionEnd
