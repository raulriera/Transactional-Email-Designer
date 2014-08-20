# Responsive transactional email designer

Extending the wonderful [Responsive Transactional HTML email templates](https://github.com/mailgun/transactional-email-templates) project. I created a quick jQuery plugin to edit the content of the email in a simple and straight forward manner.

## How to use

* Download the [Responsive Transactional HTML email templates](https://github.com/mailgun/transactional-email-templates) project.
* Include jQuery and jQuery UI.
* Include FontAwesome
* Include the CSS and Javascript provided in this repository
* Insert the following code into a template

```html
<form id="transactional-email-designer-buttons">
    <button id="title-button" class="fa fa-header"></button>
    <button id="text-button" class="fa fa-paragraph"></button>
    <button id="url-button" class="fa fa-link"></button>
    <button id="clear-button" class="fa fa-trash-o" id="clear-all"></button>
</form>

<script>

  $( document ).ready(function() {
    // Init the library
    $("td.content-wrap > table").transactionalEmailDesigner();
  });

</script>
```

## Demo

If you want to [see how this works](http://raulriera.github.io/Transactional-Email-Designer).

## Why so many dependencies?

Yeah that sucks, but that is why it's Open Source, let's make it better.

## About:
Created by Raul Riera, [@raulriera](http://twitter.com/raulriera)
