# Changelog

## [1.4.0] 2022-08-02
- Only sort columns when clicking the th element, not when clicking child elements inside the th element (this was previously listed as a 1.3.0 feature but it wasn't actually implemented yet)

## [1.3.0] 2022-07-26
- Add support for complex tables with colspan and rowspan. Columns in thead that span multiple columns in the tbody will not sort anything when clicked
- Add support for case-insensitive sorting
- Fix bug that caused tables to break when a page contained more than one sortable table

## [1.2.0] 2014-03-04
- Add support for grouping rows and having them sort together

## [1.1.0] 2014-03-03
- Add ability to force a specific sorting
- Only sort when clicking th elements inside the thead element


## [1.0.0] 2012-10-30
- Initial release