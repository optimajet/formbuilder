<!--Stay on the edge of our innovations and learn about the changes made to DWKit with each of our releases.-->

# Release Notes

## 1.8.3

- Improve adaptation for large screen sizes
- Prevent validation for hidden (by visibility-condition) controls

## 1.8.2

- Bug fix and minor improvements

## 1.8.1

- Bug fix and minor improvements

## 1.8

- Added possibility to change tabs in Tab control
- The Files control now supports validation and can be disabled
- Bug fix and minor improvements

## 1.7

- Camera and Signature controls have been added.
- Minor improvements.

## 1.6

- Separation of basic functionality and library of controls (SemanticUI).
- Minor improvements.

## 1.5

- Printing forms feature.
- New features for creating forms by repeater and container controls

## 1.4

- New FormBuilder design.

## 1.3

- Some minor bugs have been fixed.

## 1.2

- New collection component Repeater added. It draws a specified set of components for each collection entity and supports server paging.
- Settings for adaptive layout added for components. For example there can be 2 components in the form which display the same list - grid and repeater. You can set the grid to be displayed in the desktop mode, and repeater to be displayed in the mobile mode. If component is not displayed, it is not rendered, that is why even if there are 2 heavy components on the page, it does not affect performance.
- Component can be bound to any Property Name from form data.
- Substitutions now work in component collections. Use {row.propertyName} expression to access current item data.
- Dates and numbers formatting added in substitutions. For example, {row.TransitionTime:DD.MM.YYYY HH:mm:ss} or {Amount:0,000.00}. moment.js is used to format dates. numeral.js is used to format numbers. If you need to use the formatting string set in localization, write {row.TransitionTime:local}.
- Interface performance optimized.

## 1.1

- Some minor bugs have been fixed.

## 1.0

- The first release of OptimaJet FormBuilder.
