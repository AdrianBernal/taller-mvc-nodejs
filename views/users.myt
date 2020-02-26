<!doctype html>
<html lang="en"><meta charset="utf-8"><title>{title}</title>
<link rel="stylesheet" href="/assets/style.css" />
<h1>{pagetitle}</h1>
<form action="/user" method="post">
    First name: <input type="text" name="firstName"><br>
    Last name: <input type="text" name="lastName"><br>
    <input type="submit" value="Save">
</form>
<div id="content">{content}</div>