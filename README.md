# rn-auto-trip-log
An automatic car mile tracker in react native, this will be using activity recognition API from google to detect if a user is:

- IN_VEHICLE.
- WALKING.
- STILL.
- RUNNING.

Once the 'IN_VEHICLE' state is detected, the app will start tracking the vehicle and the miles traveled.

**Note**: It is not perfect though, there might be some issues with the app such as not pausing the tracking if the user reverts to a state other than 'IN_VEHICLE'.


