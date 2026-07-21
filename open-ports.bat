@echo off
echo Opening firewall ports 3001 and 5000 for I-Grid Viewer...
netsh advfirewall firewall add rule name="I-Grid Frontend 3001" dir=in action=allow protocol=tcp localport=3001
netsh advfirewall firewall add rule name="I-Grid Backend 5000" dir=in action=allow protocol=tcp localport=5000
echo Done! Ports are now open.
pause
