# JS-Pure-DnD-Editor
JavaScript Pure Drag &amp; Drop Editor

A simple Drag and Drop editor made with JavaScript

Compatible with Internet Explorer 8

Using html2canvas and hermite to snapshot the available components and draw them in the palette.
The editor itself uses no libraries.

All the components are listed in conponents/components.json, as a name/url value.
Each component has this structure:
  - fields: a map of field/default value with all the fields the component supports.
    + if the field exists in the component, it is an array with its possible values.
  - functions: an array with all the function names (not including draw).
    + each function must be a property in the component, as an array of ["parameters", "function code"] to invoke new Function with them.
    + alternatively, it may be a function. But compatibility is not assured in this case.
  -draw: code of a function with parameters 'id' (id for the component or prefix for its elements), 'container' (the element to draw this component inside), 'location' (its url) and 'params' (a map of field/value pairs, with all the keys defined in "fields" fulfilled) which draws the component itself.
