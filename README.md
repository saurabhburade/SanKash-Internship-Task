## SanKash Internship Task


### `Problem Statement` 
Creating a simple app on web / Android interface, which allows existing user to login and new users to sign up.
User info - username, password, type

Username and password are of user choice entered at the time of sign up.
Type can be A, B or C. This is also entered at the time of sign up by user himself.
Password can be same for multiple users.
Username has to be unique.

This sign up information is collected and stored in the db.

Upon logging in, username and password are checked and his type is retrieved. 
Depending on three types the screen is shown as follows.

Type A : image 1 is displayed.
Type B: Screen is divided in left and right halves. Image 1 on left and image 2 on right.
Type C : Screen is divided in top and bottom halves. Image 2 on tope and image 3 on bottom.

Incase username does not exist - take him to sign up page.
Incase username exists but password does not match - show error message “wrong password”.


#### This task is deployed at
#### **https://sankash-task.herokuapp.com/**