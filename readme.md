Notes:
you can have app.use(cookieRoutes) with no '/route' as the first yin,
because it will go through there no matter what the route. 

FEATURES TO ADD
 - make the 'are-you-sure' div an include
 - asyncHandler function
 - upgrade counter to use fs to count the number of image files (and rename it to imgCounter)
 - use a counter in all of the pages
 - use asyncHandler in all of the routes
 - add alt text to all the images
 - add a "no results" hingmy
 - create a border and background class for the headings and other text
 - beef up the database with mair books
 - create a seed data file
 - add cookies
 - add douglas adams function

NEXT STEP

 - while I'm at it, do a files/read to remove the hard-coded 12 counter.js
 - and re-name it imageCounter

TEMP DELETE!
  - work out why     .background(style=`background-image: url('/static/images/${url}.jpg');`) is
    removing the scroll bars
