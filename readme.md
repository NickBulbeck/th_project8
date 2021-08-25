Step 9.1    Create skeleton layout.pug file
Step 9.2    Create skeleton index.pug file
Step 9.3    Create skeleton new-book.pug file
Step 9.4    Create skeleton update-book.pug file
Step 9.5    Create skeleton error.pug file
Step 9.6    Create skeleton not-found.pug file
Step 9.7    Create skeleton clickwall.pug file



Copy normalise.css over and add it to layout.       DONE
Convert index to pug.
Work out how to pipe all the findAll into index.
Convert error to pug.                               

So: in error.pug:
 - set locals.title to be "Server error"
 - set locals.message to be "${status}: Server error"
 - set locals.error to be the error itself
 - res.render('error',locals);
In not-found.pug:
 - set locals.title to be "Page not found"
 - set locals.message to be error.message
 - update the not-found message to reflect a book that isn't found - make the variables more general, IOW.

 FRIDAY SCRIBBLES 

 Setting up layout and index: 
  - Firstly, look through the async handler pattern in the ORM express course.
  - Secondly, base the kata on setting this up.
  - That'll do for the noo.

EXPLANATORY NOTES
  - in an example .html file, the href "all_books.html" corresponds to a pug "/all_books". Clicking on a hyperlink (here, the href) implicitly sends a GET request.
  - in a general form, the submit event creates a POST request from the URL that the form is written on.

  TEMP SCRIBBLES
  1) Read through the instruction steps again.
  2) Acknowledge that you might have to re-factor your pug templates as you go.
  3) Stop starting bullet-points or profound sentences and not finishing them.
  4) Remember that locals just has to be an {}. Key-value pairs can be set up immediately inside. 