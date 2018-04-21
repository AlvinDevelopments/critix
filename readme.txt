README


FOLDER STRUCTURE:


bin:

controllers:
  - This is where the routing functions are stored
  - Used for functionality between client and server

models:
  - Here we store out schemas
  - Representation of the database collections

views:
  - Files which are outputted to the user
  - To be kept in .ejs files (EJS Javascript Template Engine)

  scripts:
    - Client-side .js files (file path is "/scripts/insert-script-name.js")

  css:
    - All css styling files (file path is "/css/insert-stylesheet-name.css")

lib:
  - Server-side .js scripts and functions


public:
  uploads:
    images:
      - Where the uploads are stored
