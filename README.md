# cache
Cache API
Please find the following steps to run the code.
1) NPM install.
2) NPM start
3) NPM test

Configurations of cache time can be increased inside app/constants. (Timer is in seconds).

Following are the functionalities included in this CACHE Project.

1) Limiting the entries of cache by setting maximum to 10 dcouments.

2) Old entry cache field will be reset based on last updated date, on a scale of 1 to n if any of the record get updated
    the record will take the nth position and the previous one will be at n-1, by reseting every 5 records the whole stack gets updated.
    
3) Using "mycache module" regenerate cache with random string upon expire of time call update to regenerate token. Time can be changed from APP Config.
