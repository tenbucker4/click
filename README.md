Click is a private messaging application built using React and Firebase. Features include user account creation and authentication, ability to send text and image files to other users, real time message updates and online user status, a modifiable profile picture that is seen by other users, private routing, unread message indicators and previews of most recent messages, and responsive design.

Some of the more notable features that I learned/practiced when building this project:

-   Creating, querying for, updating and deleting items within a database.
-   Addition of dynamic classNames according to state values. Super useful when styling things like the message log between two users.
-   Using React Moment to fetch the created date of a piece of data in firestore, and displaying how long ago it was created. Useful for formatting messages.
-   Uploading image files into a database, the difference between a url and path url, and displaying them on the page.
-   React useRef, which I didn't have too much experience with before. I specifically only used it once in this project (to scroll the chat down when a new message is received), but now that I'm more comfortable I can see potential for it in my other projects.
-   Checking for user authentication and using it to restrict routing to certain paths
-   More comfortable with ternary operators and using them to perform DOM manipulation. Very useful.
