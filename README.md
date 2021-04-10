# rn-auto-trip-log
An automatic car mile tracker in react native, this uses the activity recognition API from google to detect if a user is:

- IN_VEHICLE.
- WALKING.
- STILL.
- RUNNING.

Once the 'IN_VEHICLE' state is detected, the app will start tracking the vehicle and the miles traveled.

**Only Works with Android.**

**Note**: It is not perfect though, there might be some issues with the app such as not pausing the tracking if the user reverts to a state other than 'IN_VEHICLE'.

The emulator will always show the 'STILL' state as it might prove difficult to simulate other states such as 'WALKING' or 'IN_VEHICLE'.

![react-native-activity-recognition](https://user-images.githubusercontent.com/34800863/114266950-edc9c400-9a01-11eb-90ff-4df083f99ee5.PNG)
![rn-trip-logger](https://user-images.githubusercontent.com/34800863/114267015-2bc6e800-9a02-11eb-9e7e-0c084e7cbaee.png)


# Dependancies:
- react-native: 0.63.4
- react-native-activity-recognition: 3.2.0 (Check the latest release of https://github.com/Aminoid/react-native-activity-recognition or use https://github.com/xchwarze/react-native-activity-recognition).
- react-native-permissions: ^3.0.1
- haversine: ^1.1.1
- react: 16.13.1
